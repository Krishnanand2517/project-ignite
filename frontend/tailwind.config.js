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
    },
  },
  plugins: [],
};
