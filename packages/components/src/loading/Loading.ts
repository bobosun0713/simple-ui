import { dynamicCreate } from "@simple/utils";
import { h, ref, onMounted, onUnmounted, createApp, type Ref } from "vue";

import Loading from "./Loading.vue";
import type { LoadingProps } from "./types";

export default (options?: LoadingProps) => {
  const a = ref(12);
  const b = createApp(
    h(Loading, {
      spinner: a.value
    })
  );

  setTimeout(() => {
    a.value = 11111;
  }, 2000);

  const vNode = dynamicCreate(Loading, options);
  const vm = vNode.component!;
  document.body.appendChild(vNode.el as HTMLElement);

  console.log("b -> ", b);

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
