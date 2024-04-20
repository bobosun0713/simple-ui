import { createApp, type Component } from "vue";
import { mount } from "@vue/test-utils";

export function withSetup(composable: any) {
  let result;
  const app = createApp({
    setup() {
      result = composable();
      return () => {};
    }
  });
  app.mount(document.createElement("div"));
  return [result, app];
}

export function createComponent(components: Component, options?: object) {
  const wrapper = mount(components, { ...options });
  return wrapper;
}
