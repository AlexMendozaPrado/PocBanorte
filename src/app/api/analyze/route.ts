import { NextRequest, NextResponse } from "next/server";
import { makeAnalyzePdfUseCase } from "@/composition/container";
import { getMaxUploadMB } from "@/lib/env";

export const runtime = "nodejs";

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const file = formData.get("file") as File;
    const mode = (formData.get("mode") as string) || "generic";

    // Validate file presence
    if (!file) {
      return NextResponse.json(
        { error: "No file provided" },
        { status: 400 }
      );
    }

    // Validate file type
    if (file.type !== "application/pdf") {
      return NextResponse.json(
        { error: "Invalid file type. Only PDF files are allowed." },
        { status: 400 }
      );
    }

    // Validate file size
    const maxSizeMB = getMaxUploadMB();
    const maxSizeBytes = maxSizeMB * 1024 * 1024;
    if (file.size > maxSizeBytes) {
      return NextResponse.json(
        { error: `File size exceeds ${maxSizeMB}MB limit` },
        { status: 400 }
      );
    }

    // Validate mode
    const validModes = ["generic", "legal", "academic", "finance"];
    if (!validModes.includes(mode)) {
      return NextResponse.json(
        { error: "Invalid mode. Must be one of: generic, legal, academic, finance" },
        { status: 400 }
      );
    }

    // Convert file to buffer
    const bytes = Buffer.from(await file.arrayBuffer());

    // Execute use case
    const useCase = makeAnalyzePdfUseCase();
    const result = await useCase.execute({
      bytes,
      mime: file.type,
      mode: mode as "generic" | "legal" | "academic" | "finance"
    });

    return NextResponse.json(result);
  } catch (error) {
    console.error("Error analyzing PDF:", error);
    
    const errorMessage = error instanceof Error ? error.message : "Internal server error";
    return NextResponse.json(
      { error: errorMessage },
      { status: 500 }
    );
  }
}
