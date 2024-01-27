import { h, ref, onMounted, onUnmounted, createApp } from "vue";
import Loading from "./Loading.vue";
import type { LoadingServiceProps } from "./types";

function loadingService(props?: LoadingServiceProps) {
  const container: HTMLDivElement = document.createElement("div");
  const isVisible = ref(false);

  const { spinner, ...args } = props || {};

  const loading = createApp(() =>
    h(
      Loading,
      {
        ...(args && args),
        visible: isVisible.value,
        "onUpdate:visible": (val: boolean) => (isVisible.value = val),
        appendToBody: false
      },
      {
        spinner: () => spinner
      }
    )
  );

  onMounted(() => {
    container.setAttribute("id", `su-loading-wrap-${crypto.randomUUID()}`);
    document.body.appendChild(container);
    loading.mount(container);
  });

  onUnmounted(() => {
    loading.unmount();
    document.body.removeChild(container);
  });

  const open = () => {
    isVisible.value = true;

    console.log("open");
  };
  const close = () => {
    isVisible.value = false;

    console.log("close");
  };

  return { open, close };
}

export default loadingService;
