import { h, render } from "vue";
export function createComponent(component: object, props = {}) {
  const container = document.createElement("div");
  const vNode = h(component, props);
  render(vNode, container);
  return { vNode, component: container.firstChild };
}
