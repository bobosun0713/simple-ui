import { build, type InlineConfig } from "vite";
import { fileURLToPath } from "node:url";
import { resolve } from "node:path";

import vue from "@vitejs/plugin-vue";
import dts from "vite-plugin-dts";

interface BuildConfig {
  path: string;
  folder: string;
  format: "es" | "cjs";
  minify: boolean;
  ourDir: string;
}

const filename = fileURLToPath(new URL("./", import.meta.url));

function getBuildConfig(buildConfig: BuildConfig): InlineConfig {
  const { path, folder, format, minify, ourDir } = buildConfig;

  const formatToExt = {
    es: "mjs",
    cjs: "cjs"
  };

  return {
    plugins: [
      vue(),
      dts({
        entryRoot: `packages/${folder}`,
        outDir: [ourDir],
        tsconfigPath: resolve(filename, "../tsconfig.web.json")
      })
    ],
    build: {
      minify,
      rollupOptions: {
        external: ["vue"],
        input: path,
        output: {
          format,
          entryFileNames: `[name].${formatToExt[format]}`,
          dir: ourDir,
          exports: "named",
          inlineDynamicImports: false,
          preserveModules: true,
          preserveModulesRoot: `packages/${folder}`,
          globals: {
            vue: "Vue"
          }
        }
      },
      lib: {
        entry: path,
        formats: [format],
        name: "simple-ui"
      }
    }
  };
}

async function runBuild() {
  try {
    // Build the ES and CJS versions of the components
    await build(
      getBuildConfig({
        path: resolve(filename, "components/index.ts"),
        folder: "components",
        format: "es",
        minify: true,
        ourDir: resolve(filename, "dist/es/components")
      })
    );

    await build(
      getBuildConfig({
        path: resolve(filename, "components/index.ts"),
        folder: "components",
        format: "cjs",
        minify: true,
        ourDir: resolve(filename, "dist/cjs/components")
      })
    );

    // Build the ES and CJS versions of the directives
    await build(
      getBuildConfig({
        path: resolve(filename, "directives/index.ts"),
        folder: "directives",
        format: "es",
        minify: true,
        ourDir: resolve(filename, "dist/es/directives")
      })
    );

    await build(
      getBuildConfig({
        path: resolve(filename, "directives/index.ts"),
        folder: "directives",
        format: "cjs",
        minify: true,
        ourDir: resolve(filename, "dist/cjs/directives")
      })
    );

    // Build the ES and CJS versions of the use
    await build(
      getBuildConfig({
        path: resolve(filename, "use/index.ts"),
        folder: "use",
        format: "es",
        minify: true,
        ourDir: resolve(filename, "dist/es/use")
      })
    );

    await build(
      getBuildConfig({
        path: resolve(filename, "use/index.ts"),
        folder: "use",
        format: "cjs",
        minify: true,
        ourDir: resolve(filename, "dist/cjs/use")
      })
    );
  } catch (error) {
    throw new Error(`🔴 Error while building library - ${error}`);
  }
}

runBuild();
