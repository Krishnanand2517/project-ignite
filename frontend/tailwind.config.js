/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        base: "#0a0a0b",
        surface: "#111114",
        elevated: "#17171b",
        overlay: "#1e1e24",
        accent: "#f59e0b",
        "accent-dim": "rgba(245,158,11,0.12)",
      },
      backgroundColor: {
        primary: "#0a0a0b",
        secondary: "#111114",
      },
      textColor: {
        primary: "#f5f5f0",
        secondary: "#a8a89e",
        muted: "#5a5a54",
        accent: "#f59e0b",
      },
      fontFamily: {
        syne: ["Syne", "sans-serif"],
        mono: ["DM Mono", "monospace"],
        fira: ["DM Mono", "monospace"],
        inconsolata: ["DM Mono", "monospace"],
      },
      borderColor: {
        subtle: "rgba(255,255,255,0.06)",
        default: "rgba(255,255,255,0.10)",
        strong: "rgba(255,255,255,0.18)",
      },
      animation: {
        loader: "loader 0.6s infinite alternate",
      },
      keyframes: {
        loader: {
          to: { opacity: 0.1, transform: "translate3d(0, -1rem, 0)" },
        },
      },
    },
  },
  plugins: [],
};
