import {ViteUserConfig, defineConfig} from "vitest/config";
import react from '@vitejs/plugin-react'
import path from "path"

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()] as ViteUserConfig["plugins"],
  test: {
    globals: true,
    environment: "jsdom",
    exclude: ["node_modules"],
    setupFiles: ["./src/vitest.setup.ts"],
    css: true,
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
})
