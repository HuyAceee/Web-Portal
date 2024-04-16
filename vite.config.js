import { fileURLToPath, URL } from 'node:url'
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tsconfigPaths from "vite-tsconfig-paths";

export default defineConfig({
  server: {
    port: 3000,
    proxy: {
      "/api": {
        changeOrigin: true,
      },
    }
  },
  plugins: [react(), tsconfigPaths()],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  },
});