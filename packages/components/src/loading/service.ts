import type { LoadingProvideProps } from "./types";
import { dynamicCreate, destroyDynamicCreate } from "@simple/utils";
import Loading from "./Loading.vue";

export default (options?: LoadingProvideProps) => {
  const vm = dynamicCreate(Loading, options);
  const props = vm.component!.props;

  let timer: number;

  function show() {
    if (timer) clearTimeout(timer);
    props.visible = true;
    document.body.appendChild(vm.el as HTMLElement);
  }

  function close() {
    if (timer) clearTimeout(timer);
    if (!props.visible) return;
    props.visible = false;

    timer = window.setTimeout(() => {
      destroyDynamicCreate(vm.el as HTMLDivElement);
    }, 1000);
  }

  return {
    instance: props,
    show,
    close
  };
};
