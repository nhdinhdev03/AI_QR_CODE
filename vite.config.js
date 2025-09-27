import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173,
    open: true,
  },
  preview: {
    host: true,
    port: 4173,
    strictPort: false,
    open: false,
  },
  build: {
    outDir: "dist",
  },
});
