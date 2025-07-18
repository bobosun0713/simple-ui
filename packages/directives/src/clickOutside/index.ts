import { withInstallDirective } from "@simple/utils";
import type { DirectiveBinding, ObjectDirective } from "vue";

const _nodeList = new Map();

function outsideHandler(el: HTMLElement, binding: DirectiveBinding): (e: MouseEvent) => void {
  return function (e) {
    const target = e.target as HTMLElement;
    if (el.contains(target)) return;
    if (binding.value && typeof binding.value === "function") binding.value(e);
  };
}

function createHandler(e: MouseEvent): void {
  for (const fn of _nodeList.values()) {
    fn?.(e);
  }
}

window.addEventListener("click", createHandler);

const clickOutSide: ObjectDirective = {
  mounted(el, binding) {
    _nodeList.set(el, outsideHandler(el, binding));
  },
  updated(el, binding) {
    _nodeList.set(el, outsideHandler(el, binding));
  },
  unmounted(el) {
    _nodeList.delete(el);
    window.removeEventListener("click", createHandler);
  }
};

export const SClickOutSide = withInstallDirective(clickOutSide, "click-outside");
export default SClickOutSide;
