/* eslint-disable @typescript-eslint/no-empty-function */
import { createApp, type Component, type App } from "vue";
import { mount, type VueWrapper } from "@vue/test-utils";

export function withSetup(composable: any): [any, App] {
  let result;
  const app = createApp({
    setup() {
      result = composable();
      return (): void => {};
    }
  });
  app.mount(document.createElement("div"));
  return [result, app];
}

export function createComponent(
  components: Component | string,
  componentOptions?: {
    components?: Record<string, Component>;
    props?: Record<string, unknown> | unknown[];
  },
  config?: Record<string, unknown>
): VueWrapper<typeof components> {
  return mount(
    {
      template: components,
      ...componentOptions
    },
    { ...config }
  );
}
