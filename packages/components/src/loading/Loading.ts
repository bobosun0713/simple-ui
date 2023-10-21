import { dynamicCreate } from "@simple/utils";
import Loading from "./Loading.vue";
import type { LoadingProps } from "./types";

export default (options?: LoadingProps) => {
  const vNode = dynamicCreate(Loading, options);
  const vm = vNode.component!;
  document.body.appendChild(vNode.el as HTMLElement);

  function show() {
    vm.exposed!.visible.value = true;
  }
  function close() {
    vm.exposed!.visible.value = false;
  }

  return {
    instance: vm,
    show,
    close
  };
};
