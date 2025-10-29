import { SupabaseClient } from "@supabase/supabase-js";
import {
  VectorStorePort,
  VectorStoreOptions,
  StoreDocumentInput,
  SearchOptions,
  SearchResult,
} from "@/core/domain/chat/ports/VectorStorePort";
import { DocumentChunk } from "@/core/domain/chat/DocumentChunk";
import {
  SupabaseDocument,
  SupabaseDocumentInsert,
  SupabaseMatchResult,
} from "./types/SupabaseDocument";

/**
 * Implementation of VectorStorePort using Supabase with pgvector
 * This implementation requires a Supabase instance with the vector extension enabled
 */
export class SupabaseVectorStore implements VectorStorePort {
  private readonly tableName: string;

  constructor(
    private readonly supabase: SupabaseClient,
    options?: { tableName?: string }
  ) {
    this.tableName = options?.tableName || "documents";
  }

  /**
   * Store document chunks with embeddings in Supabase
   */
  async storeDocuments(
    input: StoreDocumentInput,
    options?: VectorStoreOptions
  ): Promise<string[]> {
    const tableName = options?.tableName || this.tableName;

    try {
      // Prepare documents for insertion
      const documentsToInsert: SupabaseDocumentInsert[] = input.chunks.map(
        (chunk) => ({
          id: crypto.randomUUID(),
          title: chunk.title,
          content: chunk.content,
          embedding: chunk.embedding,
          chunk_index: chunk.chunkIndex,
          parent_document_id: chunk.parentDocumentId || null,
          metadata: chunk.metadata || {},
          file_name: chunk.metadata?.fileName,
          file_size: chunk.metadata?.fileSize,
          mime_type: chunk.metadata?.mimeType || "application/pdf",
        })
      );

      // Insert into Supabase
      const { data, error } = await this.supabase
        .from(tableName)
        .insert(documentsToInsert)
        .select("id");

      if (error) {
        console.error("Error storing documents in Supabase:", error);
        throw new Error(`Failed to store documents: ${error.message}`);
      }

      return data?.map((doc) => doc.id) || [];
    } catch (error) {
      console.error("Error in storeDocuments:", error);
      throw error;
    }
  }

  /**
   * Search for similar documents using vector similarity
   * Uses the match_documents function created in the migration
   */
  async searchSimilar(
    queryEmbedding: number[],
    options?: SearchOptions
  ): Promise<SearchResult> {
    const maxResults = options?.maxResults || 5;
    const similarityThreshold = options?.similarityThreshold || 0.7;

    const startTime = Date.now();

    try {
      // Call the match_documents RPC function
      const { data, error } = await this.supabase.rpc("match_documents", {
        query_embedding: queryEmbedding,
        match_threshold: similarityThreshold,
        match_count: maxResults,
      });

      if (error) {
        console.error("Error searching similar documents:", error);
        throw new Error(`Failed to search documents: ${error.message}`);
      }

      const results = (data || []) as SupabaseMatchResult[];

      // Apply parent document filter if specified
      const filteredResults = options?.parentDocumentId
        ? results.filter(
            (doc) => doc.parent_document_id === options.parentDocumentId
          )
        : results;

      // Convert to domain entities
      const chunks = filteredResults.map((doc) => ({
        chunk: this.mapToDocumentChunk(doc),
        similarity: doc.similarity,
      }));

      const timeTaken = Date.now() - startTime;

      return {
        chunks,
        metadata: {
          totalResults: chunks.length,
          timeTaken,
        },
      };
    } catch (error) {
      console.error("Error in searchSimilar:", error);
      throw error;
    }
  }

  /**
   * Delete documents by parent document ID
   */
  async deleteByParentId(parentDocumentId: string): Promise<number> {
    try {
      const { data, error } = await this.supabase
        .from(this.tableName)
        .delete()
        .eq("parent_document_id", parentDocumentId)
        .select("id");

      if (error) {
        console.error("Error deleting documents:", error);
        throw new Error(`Failed to delete documents: ${error.message}`);
      }

      return data?.length || 0;
    } catch (error) {
      console.error("Error in deleteByParentId:", error);
      throw error;
    }
  }

  /**
   * Get document chunks by parent document ID
   */
  async getByParentId(parentDocumentId: string): Promise<DocumentChunk[]> {
    try {
      const { data, error } = await this.supabase
        .from(this.tableName)
        .select("*")
        .eq("parent_document_id", parentDocumentId)
        .order("chunk_index", { ascending: true });

      if (error) {
        console.error("Error fetching documents:", error);
        throw new Error(`Failed to fetch documents: ${error.message}`);
      }

      return (data || []).map((doc) => this.mapToDocumentChunk(doc));
    } catch (error) {
      console.error("Error in getByParentId:", error);
      throw error;
    }
  }

  /**
   * Map Supabase document to domain DocumentChunk entity
   */
  private mapToDocumentChunk(doc: SupabaseDocument): DocumentChunk {
    // Parse embedding if it's in string format
    const embedding = Array.isArray(doc.embedding)
      ? doc.embedding
      : typeof doc.embedding === "string"
        ? JSON.parse(doc.embedding)
        : undefined;

    return {
      id: doc.id,
      title: doc.title,
      content: doc.content,
      embedding,
      chunkIndex: doc.chunk_index,
      parentDocumentId: doc.parent_document_id || undefined,
      metadata: {
        ...doc.metadata,
        fileName: doc.file_name || undefined,
        fileSize: doc.file_size || undefined,
        mimeType: doc.mime_type,
      },
      createdAt: new Date(doc.created_at),
      updatedAt: new Date(doc.updated_at),
    };
  }
}
