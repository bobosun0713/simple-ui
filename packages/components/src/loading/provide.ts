import type { ComponentInternalInstance } from "vue";
import type { LoadingProvideProps } from "./types";
import { createComponent } from "@simple/utils";
import Loading from "./Loading.vue";

export default (options?: LoadingProvideProps) => {
  const { vNode, component } = createComponent(Loading);
  const props = (vNode.component as ComponentInternalInstance).props;

  if (options) Object.assign(props, options);

  let clearTimer: number;

  function show() {
    if (clearTimer) clearTimeout(clearTimer);
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
    instance: props,
    show,
    close
  };
};
