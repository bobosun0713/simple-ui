import type { StorybookConfig } from "@storybook/vue3-vite";
import { mergeConfig } from "vite";
import vue from "@vitejs/plugin-vue";

const config: StorybookConfig = {
  stories: ["../stories/**/*.mdx", "../stories/**/*.stories.@(js|jsx|mjs|ts|tsx)"],
  addons: [
    "@storybook/addon-essentials",
    "@storybook/addon-onboarding",
    "@chromatic-com/storybook",
    "@storybook/addon-interactions"
  ],
  viteFinal(config) {
    return mergeConfig(config, {
      plugins: [vue()]
    });
  },
  framework: {
    name: "@storybook/vue3-vite",
    options: {}
  }
};
export default config;
