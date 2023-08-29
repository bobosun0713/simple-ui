import { h, render } from "vue";
import type { Component } from "vue";

export function dynamicCreate(component: Component, props = {}) {
  const container = document.createElement("div");
  const vNode = h(component, props);
  render(vNode, container);
  return vNode;
}

export function destroyDynamicCreate(container: HTMLDivElement) {
  render(null, container);
  document.body.removeChild(container);
}
