import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/app/**/*.{ts,tsx}",
    "./src/components/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}"
  ],
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
  plugins: [
    require("@tailwindcss/forms"),
  ],
};

export default config;
