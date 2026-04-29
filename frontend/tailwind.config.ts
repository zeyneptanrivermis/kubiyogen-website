import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}"
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          50: "#f5efff",
          100: "#ebddff",
          200: "#d7bbff",
          300: "#be90ff",
          400: "#a161ff",
          500: "#8b3dff",
          600: "#7a1fff",
          700: "#6b16e2",
          800: "#5715b5",
          900: "#491591"
        },
        ink: "#1e1b2e",
        soft: "#f7f5fb",
        line: "#e7e1f2"
      },
      boxShadow: {
        card: "0 16px 40px rgba(88, 28, 135, 0.08)"
      }
    }
  },
  plugins: []
};

export default config;
