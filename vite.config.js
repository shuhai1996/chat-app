import { fileURLToPath, URL } from "node:url";

import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", import.meta.url)),
    },
  },
  server: {
    open: true,
    overlay: {
      warnings: false,
      errors: true,
    },
    proxy: {
      "/game": {
        target: "http://127.0.0.1:8899", // 代理到 目标路径
        changeOrigin: true,
        pathRewrite: {
        },
      }
    },
  },
});
