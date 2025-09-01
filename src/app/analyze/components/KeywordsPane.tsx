"use client";

import React, { useEffect, useState } from "react";
import { Box, Typography, Paper, TextField } from "@mui/material";
import { Search } from "@mui/icons-material";
import { Keyword } from "@/core/domain/documents/Keyword";

interface KeywordsPaneProps {
  keywords: Keyword[];
}

export default function KeywordsPane({ keywords }: KeywordsPaneProps) {
  const [formValues, setFormValues] = useState<Record<number, string>>({});

  useEffect(() => {
    const initialValues: Record<number, string> = {};
    keywords.forEach((keyword, index) => {
      initialValues[index] = keyword.phrase;
    });
    setFormValues(initialValues);
  }, [keywords]);

  const handleChange = (index: number, value: string) => {
    setFormValues((prev) => ({ ...prev, [index]: value }));
  };

  return (
    <Paper
      elevation={2}
      sx={{
        height: "100%",
        display: "flex",
        flexDirection: "column",
        overflow: "hidden"
      }}
    >
      {/* Header */}
      <Box
        sx={{
          p: 3,
          borderBottom: 1,
          borderColor: "divider",
          backgroundColor: "#f8f9fa"
        }}
      >
        <Box sx={{ display: "flex", alignItems: "center", gap: 2, mb: 2 }}>
          <Search sx={{ fontSize: 32, color: "primary.main" }} />
          <Typography variant="h5" fontWeight="bold">
            Palabras Clave
          </Typography>
        </Box>
        <Typography variant="body2" color="text.secondary">
          Sube un documento para ver las palabras clave
        </Typography>
        <Typography variant="caption" color="text.secondary" display="block" sx={{ mt: 1 }}>
          Las palabras clave se extraerán automáticamente utilizando un modelo de IA.
        </Typography>
      </Box>

      {/* Keywords Content */}
      <Box sx={{ flex: 1, overflow: "auto", p: 3 }}>
        {keywords.length === 0 ? (
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              height: "100%",
              textAlign: "center",
              gap: 2
            }}
          >
            <Search sx={{ fontSize: 64, color: "text.disabled" }} />
            <Typography variant="h6" color="text.secondary">
              No hay palabras clave
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Sube un documento PDF para comenzar el análisis
            </Typography>
          </Box>
        ) : (
          <>
            <Box sx={{ mb: 2 }}>
              <Typography variant="h6" gutterBottom>
                Análisis
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Extracción
              </Typography>
            </Box>
            <Box
              component="form"
              sx={{
                display: "flex",
                flexDirection: "column",
                gap: 2
              }}
            >
              {keywords.map((keyword, index) => (
                <TextField
                  key={index}
                  placeholder={keyword.phrase}
                  label={keyword.kind ?? `Keyword ${index + 1}`}
                  value={formValues[index] ?? ""}
                  onChange={(e) => handleChange(index, e.target.value)}
                  fullWidth
                  size="small"
                />
              ))}
            </Box>
          </>
        )}
      </Box>
    </Paper>
  );
}
