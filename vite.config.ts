import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

export default defineConfig({
  plugins: [react()],
  base: "/dashboard/",
  build: {
    // 1. Ensure the build folder is cleared before every build
    emptyOutDir: true,
    // 2. Control how assets are named (default is usually fine, but being explicit is safer)
    rollupOptions: {
      output: {
        entryFileNames: `assets/[name]-[hash].js`,
        chunkFileNames: `assets/[name]-[hash].js`,
        assetFileNames: `assets/[name]-[hash].[ext]`,
      },
    },
  },
});
