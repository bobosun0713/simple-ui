import { fileURLToPath } from "node:url";
import { configDefaults, defineConfig } from "vitest/config";
import vue from "@vitejs/plugin-vue";

const getCurrentPath = (path: string): string => fileURLToPath(new URL(path, import.meta.url));

export default defineConfig({
  plugins: [vue()],
  test: {
    globals: true,
    environment: "jsdom",
    exclude: [...configDefaults.exclude],
    root: getCurrentPath("./"),
    coverage: {
      enabled: true,
      provider: "v8",
      reportsDirectory: "../.cache/coverage",
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
      "@use": getCurrentPath("./use/src"),
      "@components": getCurrentPath("./components/src"),
      "@utils": getCurrentPath("./utils")
    }
  }
});
