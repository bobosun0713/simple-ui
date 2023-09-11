import { dynamicCreate } from "@simple/utils";
import Loading from "./Loading.vue";
import type { LoadingProps } from "./types";

export default (options?: LoadingProps) => {
  const vnode = dynamicCreate(Loading, options);

  const vm = vnode.component!;

  document.body.appendChild(vnode.el as HTMLElement);

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
