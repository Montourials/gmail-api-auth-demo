import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

import { chunkSplitPlugin } from "vite-plugin-chunk-split";
import Icons from "unplugin-icons/vite";

// https://vitejs.dev/config/
export default defineConfig({
  optimizeDeps: {
    include: ["@emotion/styled"],
  },
  plugins: [
    react(),
    Icons({ compiler: "jsx", jsx: "react" }),
    chunkSplitPlugin(),
  ],
  resolve: {
    alias: {
      src: "/src",
    },
  }
});
