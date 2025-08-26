"use client";

import { useState } from "react";
import Header from "@/components/Header";
import UploadDropzone from "@/components/UploadDropzone";
import KeywordPanel from "@/components/KeywordPanel";

export default function AnalyzePage() {
  const [keywords, setKeywords] = useState<string[]>([]);

  const handleFileUpload = (file: File) => {
    // simulate async extraction
    setKeywords([]);
    setTimeout(() => {
      setKeywords(["IA", "Modelo", "Documento", "Análisis", "Extracción"]);
    }, 800);
  };

  return (
    <div className="min-h-screen flex flex-col bg-primary text-textPrimary">
      <Header />
      <div className="gap-1 px-6 flex flex-1 justify-center py-5 flex-col lg:flex-row">
        <main className="flex flex-col max-w-[920px] flex-1">
          <div className="flex flex-wrap justify-between gap-3 p-4">
            <p className="text-[32px] font-bold leading-tight tracking-tight min-w-72">Analizar Documento</p>
          </div>
          <div className="flex flex-col p-4">
            <UploadDropzone onFileUpload={handleFileUpload} />
          </div>
          <p className="text-textSecondary text-sm font-normal leading-normal pb-3 pt-1 px-4 text-center">
            Formatos de archivo admitidos: PDF
          </p>
        </main>
        <KeywordPanel keywords={keywords} />
      </div>
    </div>
  );
}
