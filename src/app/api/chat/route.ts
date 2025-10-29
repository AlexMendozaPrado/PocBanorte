import { NextRequest } from "next/server";
import { makeChatWithDocsUseCase } from "@/composition/rag-container";
import { ChatMessage } from "@/core/domain/chat/ChatMessage";

export const runtime = "nodejs";

/**
 * POST /api/chat
 *
 * Chat with documents using RAG (Retrieval-Augmented Generation)
 * Streams the response using Vercel AI SDK
 *
 * Request Body:
 * - question: string (required)
 * - conversationHistory?: ChatMessage[]
 * - parentDocumentId?: string
 * - config?: {
 *     maxChunks?: number
 *     minSimilarity?: number
 *     model?: string
 *     temperature?: number
 *     maxTokens?: number
 *   }
 *
 * Response:
 * - Streaming text response (text/plain; charset=utf-8)
 * - X-Context-Chunks header: JSON array of relevant chunks
 */
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { question, conversationHistory, parentDocumentId, config } = body;

    // Validate required fields
    if (!question || typeof question !== "string") {
      return new Response(
        JSON.stringify({ error: "Question is required and must be a string" }),
        {
          status: 400,
          headers: { "Content-Type": "application/json" },
        }
      );
    }

    if (question.trim().length === 0) {
      return new Response(
        JSON.stringify({ error: "Question cannot be empty" }),
        {
          status: 400,
          headers: { "Content-Type": "application/json" },
        }
      );
    }

    console.log(`[API /chat] Processing question: "${question.substring(0, 50)}..."`);

    // Create use case and execute with streaming
    const chatUseCase = makeChatWithDocsUseCase();

    const result = await chatUseCase.executeStream({
      question,
      conversationHistory: conversationHistory as ChatMessage[] | undefined,
      parentDocumentId,
      config: {
        maxChunks: config?.maxChunks,
        minSimilarity: config?.minSimilarity,
        model: config?.model,
        temperature: config?.temperature,
        maxTokens: config?.maxTokens,
      },
    });

    console.log(
      `[API /chat] Found ${result.stats.relevantChunksCount} relevant chunks ` +
      `(avg similarity: ${result.stats.averageSimilarity.toFixed(3)})`
    );

    // Create headers with context metadata
    const headers = new Headers({
      "Content-Type": "text/plain; charset=utf-8",
      "X-Context-Chunks": JSON.stringify(result.contextChunks),
      "X-Relevant-Chunks-Count": result.stats.relevantChunksCount.toString(),
      "X-Average-Similarity": result.stats.averageSimilarity.toFixed(3),
      "X-Preparation-Time": result.stats.preparationTime.toString(),
    });

    // Return streaming response using Vercel AI SDK's textStream
    // The stream is already in the correct format (ReadableStream<string>)
    return new Response(result.stream, { headers });
  } catch (error) {
    console.error("[API /chat] Error:", error);

    const errorMessage = error instanceof Error ? error.message : "Internal server error";

    return new Response(
      JSON.stringify({ error: errorMessage }),
      {
        status: 500,
        headers: { "Content-Type": "application/json" },
      }
    );
  }
}
