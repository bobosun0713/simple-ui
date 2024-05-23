import { fileURLToPath } from "node:url";
import { resolve } from "path";
import { configDefaults, defineConfig } from "vitest/config";
import vue from "@vitejs/plugin-vue";

export default defineConfig({
  plugins: [vue()],
  test: {
    globals: true,
    environment: "jsdom",
    exclude: [...configDefaults.exclude],
    root: fileURLToPath(new URL("./", import.meta.url)),
    coverage: {
      provider: "v8",
      exclude: [
        "**/{index,types}.ts",
        "**/svg/*.vue",
        "**/src/index.ts",
        "**/*.d.ts",
        "**/utils/**",
        "docs/**",
        "examples/**",
        ".eslintrc.js",
        ".prettierrc.js",
        ".lintstagedrc.js"
      ]
    }
  },
  resolve: {
    alias: {
      "@use": resolve(__dirname, "./use/src"),
      "@components": resolve(__dirname, "./components/src"),
      "@utils": resolve(__dirname, "./utils")
    }
  }
});
