import { ref } from "vue";
import { dynamicCreate } from "@simple/utils";
import Loading from "./Loading.vue";
import type { VNode } from "vue";
import type { LoadingServiceProps, LoadingServiceReturnType } from "./types";

let _loadingInstances: VNode;

function loadingService(props?: LoadingServiceProps): LoadingServiceReturnType {
  const { spinner, ...args } = props ?? {};
  const isVisible = ref(false);

  _loadingInstances =
    _loadingInstances ||
    dynamicCreate(
      Loading,
      {
        ...args,
        visible: isVisible,
        "onUpdate:visible": (val: boolean) => (isVisible.value = val)
      },
      { spinner }
    );

  document.body.appendChild(_loadingInstances.el as HTMLElement);

  const open = (): void => {
    isVisible.value = true;
  };

  const close = (): void => {
    isVisible.value = false;
  };

  return { open, close };
}

export default loadingService;
