import type { ComponentInternalInstance } from "vue";
import { createComponent } from "@simple/utils";
import Loading from "./Loading.vue";

export default () => {
  const { vNode, component } = createComponent(Loading);
  const props = (vNode.component as ComponentInternalInstance).props;
  let clearTimer: number;

  function show(spinner?: string) {
    if (clearTimer) clearTimeout(clearTimer);
    if (spinner) Object.assign(props, { spinner });
    props.visible = true;

    document.body.appendChild(component as HTMLElement);
  }

  function close() {
    if (clearTimer) clearTimeout(clearTimer);
    if (!props.visible) return;
    props.visible = false;

    clearTimer = window.setTimeout(() => {
      document.body.removeChild(component as HTMLElement);
    }, 1000);
  }

  return {
    show,
    close
  };
};
