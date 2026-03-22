import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        display: ["Georgia", "Times New Roman", "serif"],
        body: ["Trebuchet MS", "Verdana", "sans-serif"],
      },
      colors: {
        blush: "#f8bfd0",
        cream: "#fff6eb",
        rose: "#cc5f88",
        berry: "#8f4162",
        gold: "#f0c977",
      },
      boxShadow: {
        soft: "0 12px 28px rgba(120, 64, 90, 0.12)",
      },
      backgroundImage: {
        sparkles:
          "radial-gradient(circle at top, rgba(255,255,255,0.38), transparent 34%), radial-gradient(circle at bottom, rgba(255,221,236,0.24), transparent 28%)",
      },
    },
  },
  plugins: [],
};

export default config;
