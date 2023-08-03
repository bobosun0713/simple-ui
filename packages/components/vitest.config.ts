import { fileURLToPath } from "node:url";
import { mergeConfig } from "vite";
import { configDefaults, defineConfig } from "vitest/config";
import viteConfig from "./vite.config";

import type { InlineConfig } from "vitest";
import type { UserConfig } from "vite";
interface VitestConfigExport extends UserConfig {
  test: InlineConfig;
}

export default mergeConfig(
  viteConfig as VitestConfigExport,
  defineConfig({
    test: {
      globals: true,
      environment: "jsdom",
      exclude: [...configDefaults.exclude, "e2e/*"],
      root: fileURLToPath(new URL("./", import.meta.url)),
      transformMode: {
        web: [/\.[jt]sx$/]
      },
      coverage: {
        provider: "v8"
      }
    }
  }) as VitestConfigExport
);
