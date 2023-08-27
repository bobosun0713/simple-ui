import type { ComponentInternalInstance } from "vue";
import type { LoadingProvideProps } from "./types";
import { dynamicCreate, destroyDynamicCreate } from "@simple/utils";
import Loading from "./Loading.vue";

export default (options?: LoadingProvideProps) => {
  const { vNode, component } = dynamicCreate(Loading, options);
  const props = (vNode.component as ComponentInternalInstance).props;

  let timer: number;

  function show() {
    if (timer) clearTimeout(timer);
    props.visible = true;
    document.body.appendChild(component as HTMLElement);
  }

  function close() {
    if (timer) clearTimeout(timer);
    if (!props.visible) return;
    props.visible = false;

    timer = window.setTimeout(() => {
      destroyDynamicCreate(component as HTMLDivElement);
    }, 1000);
  }

  return {
    instance: props,
    show,
    close
  };
};
