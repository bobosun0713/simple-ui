import { h, render } from "vue";
import type { Component, VNode } from "vue";

export function dynamicCreate(component: Component, props = {}, slots = {}): VNode {
  const container = document.createElement("div");
  const vNode = h(component, props, slots);
  render(vNode, container);
  return vNode;
}

export function destroyDynamicCreate(container: HTMLDivElement): void {
  render(null, container);
  document.body.removeChild(container);
}
