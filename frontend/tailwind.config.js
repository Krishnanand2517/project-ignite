/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      backgroundColor: {
        primary: "#282C34",
        secondary: "#2D3E50",
      },
      textColor: {
        primary: "#FFFFFF",
        secondary: "#ECF0F1",
      },
      fontFamily: {
        fira: ["Fira Code", "monospace"],
        inconsolata: ["Inconsolata", "monospace"],
      },
      gradientColorStops: {
        primary: "#282C34",
        secondary: "#202C34",
      },
      animation: {
        loader: "loader 0.6s infinite alternate",
      },
      keyframes: {
        loader: {
          to: {
            opacity: 0.1,
            transform: "translate3d(0, -1rem, 0)",
          },
        },
      },
    },
  },
  plugins: [],
};
