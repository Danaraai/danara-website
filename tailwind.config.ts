import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        paper: {
          DEFAULT: "#F7F3EA",
          warm: "#F6F1E8",
          cool: "#F7F3EA",
          edge: "#F0E9D8",
        },
        bg: "#F7F3EA",
        surface: "#FDFAF4",
        border: "#E3D8C8",
        ink: {
          DEFAULT: "#25202B",
          secondary: "#5A4D63",
          muted: "#9B9187",
          faint: "#C9BFB3",
        },
        accent: {
          purple: "#9B7AE5",
          blue: "#7DAFD3",
        },
        violet: {
          DEFAULT: "#9B7AE5",
          soft: "#B39EEF",
          deep: "#7E63A0",
          fill: "#E8DEF8",
          chip: "#F5F1E6",
          ring: "#D4C8E5",
        },
        rose: {
          DEFAULT: "#BD8AA0",
          soft: "#D4A8BC",
          fill: "#F0DCE2",
        },
        teal: {
          DEFAULT: "#7DAFD3",
          soft: "#99C1DD",
          fill: "#D8E6DD",
          stroke: "#5A8E7A",
        },
      },
      fontFamily: {
        sans: ["var(--font-inter)", "ui-sans-serif", "system-ui", "sans-serif"],
        serif: ["var(--font-serif)", "ui-serif", "Georgia", "serif"],
        mono: [
          "var(--font-mono)",
          "ui-monospace",
          "SFMono-Regular",
          "Menlo",
          "monospace",
        ],
      },
      boxShadow: {
        card: "0 1px 0 rgba(50,40,70,0.04)",
        cardHover: "0 2px 0 rgba(50,40,70,0.06)",
        chat: "0 4px 24px rgba(140,100,200,0.10)",
      },
      borderRadius: {
        card: "10px",
        pill: "20px",
      },
      letterSpacing: {
        brand: "0.06em",
        eyebrow: "0.1em",
        label: "0.08em",
      },
    },
  },
  plugins: [],
};

export default config;
