import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./data/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        cream: "#FBF6EC",
        paper: "#FFFCF5",
        ink: "#211B15",
        "ink-soft": "#4A4038",
        marker: {
          DEFAULT: "#E8492C",
          dark: "#C13A20",
          light: "#FBD8CD",
        },
        pop: {
          DEFAULT: "#2E9E5B",
          dark: "#227944",
          light: "#D3EFDD",
        },
        sunshine: {
          DEFAULT: "#F5B700",
          dark: "#D89C00",
          light: "#FDECB0",
        },
        sticker: {
          DEFAULT: "#3B6FD4",
          dark: "#2C55AA",
          light: "#D9E4FA",
        },
        grape: {
          DEFAULT: "#7C5CBF",
          dark: "#5F4498",
          light: "#E7DFF6",
        },
      },
      fontFamily: {
        display: ["var(--font-baloo)", "system-ui", "sans-serif"],
        body: ["var(--font-inter)", "system-ui", "sans-serif"],
        tag: ["var(--font-mono)", "monospace"],
      },
      boxShadow: {
        comic: "4px 4px 0px 0px rgba(33,27,21,1)",
        "comic-sm": "2px 2px 0px 0px rgba(33,27,21,1)",
        "comic-lg": "6px 6px 0px 0px rgba(33,27,21,1)",
        "comic-hover": "6px 6px 0px 0px rgba(33,27,21,1)",
      },
      borderRadius: {
        blob: "1.5rem",
      },
      keyframes: {
        wiggle: {
          "0%, 100%": { transform: "rotate(-3deg)" },
          "50%": { transform: "rotate(3deg)" },
        },
        "pop-in": {
          "0%": { transform: "scale(0.9)", opacity: "0" },
          "100%": { transform: "scale(1)", opacity: "1" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0px) rotate(var(--rot, 0deg))" },
          "50%": { transform: "translateY(-8px) rotate(var(--rot, 0deg))" },
        },
      },
      animation: {
        wiggle: "wiggle 0.5s ease-in-out",
        "pop-in": "pop-in 0.25s ease-out",
        float: "float 4s ease-in-out infinite",
      },
      backgroundImage: {
        dots: "radial-gradient(currentColor 1px, transparent 1px)",
      },
      backgroundSize: {
        dots: "16px 16px",
      },
    },
  },
  plugins: [],
};
export default config;
