import type { Config } from "tailwindcss";
import forms from "@tailwindcss/forms";
import containerQueries from "@tailwindcss/container-queries";

const config: Config = {
  content: ["./src/app/**/*.{ts,tsx}", "./src/components/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#181111",
        surface1: "#382929",
        surface2: "#533c3d",
        textPrimary: "#FFFFFF",
        textSecondary: "#b89d9f",
        borderDashed: "#533c3d",
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
