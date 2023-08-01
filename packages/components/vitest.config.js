import { fileURLToPath } from "node:url";
import { mergeConfig } from "vite";
import viteConfig from "./vite.config";
import { configDefaults, defineConfig } from "vitest/config";

export default mergeConfig(
  viteConfig,
  defineConfig({
    test: {
      globals: true,
      environment: "jsdom",
      provider: "v8",
      exclude: [...configDefaults.exclude, "e2e/*"],
      root: fileURLToPath(new URL("./", import.meta.url)),
      transformMode: {
        web: [/\.[jt]sx$/]
      }
    }
  })
);
