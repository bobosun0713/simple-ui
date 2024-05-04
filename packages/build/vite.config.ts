import { build, type InlineConfig } from "vite";
import { resolve } from "path";

import vue from "@vitejs/plugin-vue";
import dts from "vite-plugin-dts";

interface BuildConfig {
  path: string;
  folder: string;
  format: "es" | "cjs";
  minify: boolean;
  ourDir: string;
}

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
        tsconfigPath: resolve(__dirname, `../${folder}/tsconfig.json`)
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
        path: resolve(__dirname, "../components/index.ts"),
        folder: "components",
        format: "es",
        minify: true,
        ourDir: resolve(__dirname, "../../dist/es/components")
      })
    );

    await build(
      getBuildConfig({
        path: resolve(__dirname, "../components/index.ts"),
        folder: "components",
        format: "cjs",
        minify: true,
        ourDir: resolve(__dirname, "../../dist/cjs/components")
      })
    );

    // Build the ES and CJS versions of the directives
    await build(
      getBuildConfig({
        path: resolve(__dirname, "../directives/index.ts"),
        folder: "directives",
        format: "es",
        minify: true,
        ourDir: resolve(__dirname, "../../dist/es/directives")
      })
    );

    await build(
      getBuildConfig({
        path: resolve(__dirname, "../directives/index.ts"),
        folder: "directives",
        format: "cjs",
        minify: true,
        ourDir: resolve(__dirname, "../../dist/cjs/directives")
      })
    );

    // Build the ES and CJS versions of the use
    await build(
      getBuildConfig({
        path: resolve(__dirname, "../use/index.ts"),
        folder: "use",
        format: "es",
        minify: true,
        ourDir: resolve(__dirname, "../../dist/es/use")
      })
    );

    await build(
      getBuildConfig({
        path: resolve(__dirname, "../use/index.ts"),
        folder: "use",
        format: "cjs",
        minify: true,
        ourDir: resolve(__dirname, "../../dist/cjs/use")
      })
    );
  } catch (error) {
    console.log("13123123 ->", error);
  }
}

runBuild();
