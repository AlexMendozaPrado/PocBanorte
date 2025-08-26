import type { Config } from "tailwindcss";
import forms from "@tailwindcss/forms";
import containerQueries from "@tailwindcss/container-queries";

const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#1976d2",
        surface1: "#121212",
        surface2: "#1e1e1e",
        textPrimary: "#ffffff",
        textSecondary: "#b3b3b3",
        borderDashed: "#ccc"
      },
      fontFamily: {
        sans: ["Spline Sans", "Noto Sans", "sans-serif"],
      },
      borderRadius: {
        full: "9999px",
      },
    },
  },
  plugins: [forms, containerQueries],
};

export default config;
