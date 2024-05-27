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

const argv = process.argv.slice(2);

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

async function buildFolder(folder: string) {
  for (const format of ["es", "cjs"]) {
    await build(
      getBuildConfig({
        path: resolve(filename, `${folder}/index.ts`),
        folder: folder,
        format: format as Extract<BuildConfig, "format">,
        minify: true,
        ourDir: resolve(filename, `dist/${format}/${folder}`)
      })
    );
  }
}

function runBuild() {
  try {
    const buildType = {
      cmp: () => buildFolder("components"),
      use: () => buildFolder("use"),
      dir: () => buildFolder("directives"),
      all: async () => {
        await buildType.cmp();
        await buildType.use();
        await buildType.dir();
      }
    };

    buildType[argv[0]]?.() || buildType.all();
  } catch (error) {
    throw new Error(`🔴 Error while building library - ${error}`);
  }
}

runBuild();
