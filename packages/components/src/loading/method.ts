import { ref, h } from "vue";
import { mountInstance } from "@simple/utils";
import SLoading from "./Loading.vue";
import type { LoadingServiceProps, LoadingServiceReturnType } from "./types";

let _loadingInstances: ReturnType<typeof mountInstance>;

function loadingService(): LoadingServiceReturnType {
  const isVisible = ref(false);

  const open = (props?: LoadingServiceProps): void => {
    const { spinner, ...args } = props ?? {};

    _loadingInstances =
      _loadingInstances ||
      mountInstance(() =>
        h(
          SLoading,
          {
            ...args,
            visible: isVisible.value,
            "onUpdate:visible": (val: boolean) => {
              isVisible.value = val;
            }
          },
          {
            spinner: typeof spinner === "function" ? spinner : (): unknown => spinner
          }
        )
      );

    isVisible.value = true;
  };

  const close = (): void => {
    isVisible.value = false;
  };

  return { open, close };
}

export default loadingService;
