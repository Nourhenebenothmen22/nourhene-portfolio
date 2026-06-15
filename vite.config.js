import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  plugins: [react(), tailwindcss()],
  base: "/nourhene-portfolio/",
  build: {
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes("node_modules/framer-motion")) return "vendor-motion";
          if (id.includes("node_modules/react-icons")) return "vendor-icons";
          if (id.includes("node_modules/react-toastify")) return "vendor-toastify";
          if (id.includes("node_modules/react-dom")) return "vendor-react";
          if (id.includes("node_modules/@emailjs")) return "vendor-emailjs";
          if (id.includes("node_modules")) return "vendor-other";
        },
      },
    },
    minify: "esbuild",
    target: "es2020",
    cssMinify: true,
    sourcemap: false,
    assetsInlineLimit: 4096,
    reportCompressedSize: false,
    chunkSizeWarningLimit: 200,
  },
});
