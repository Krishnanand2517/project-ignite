import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          react: ["react", "react-dom", "react-router-dom"],
          editor: ["@uiw/react-md-editor", "prismjs"],
          redux: ["@reduxjs/toolkit", "react-redux", "redux-persist"],
          ui: ["react-select"],
          cropper: ["react-cropper"],
        },
      },
    },
  },
  server: {
    proxy: {
      "/api": {
        target: "https://project-ignite-server.vercel.app/api/v1",
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ""),
      },
    },
  },
});
