import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        paper: {
          DEFAULT: "#FFFCF5",
          warm: "#FBF6EA",
          cool: "#F7F3EA",
          edge: "#F0E9D8",
        },
        bg: "#FFFCF5",
        surface: "#FFFFFF",
        border: "#E8E0D2",
        ink: {
          DEFAULT: "#2A2233",
          secondary: "#6B5F75",
          muted: "#A89E94",
          faint: "#C8BFB3",
        },
        violet: {
          DEFAULT: "#9479B5",
          soft: "#A892C0",
          deep: "#7E63A0",
          fill: "#D6C8E8",
          chip: "#EFE7DD",
          ring: "#C9BBD8",
        },
        rose: {
          DEFAULT: "#BD8AA0",
          soft: "#D4A8BC",
          fill: "#F0DCE2",
        },
        teal: {
          DEFAULT: "#7AAB9D",
          soft: "#94BAA8",
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
