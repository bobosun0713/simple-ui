import { h, ref, onMounted, onUnmounted, createApp } from "vue";
import SDialog from "./Dialog.vue";
import type { DialogServiceProps } from "./types";

function dialogService(props?: DialogServiceProps) {
  const container: HTMLDivElement = document.createElement("div");
  const isVisible = ref(false);

  const { header, body, footer, ...args } = props || {};

  const dialog = createApp(() =>
    h(
      SDialog,
      {
        ...(args && args),
        visible: isVisible.value,
        "onUpdate:visible": (val: boolean) => (isVisible.value = val),
        appendToBody: false
      },
      {
        ...(header && { header }),
        ...(body && { body }),
        ...(footer && { footer })
      }
    )
  );

  onMounted(() => {
    container.setAttribute("id", `su-dynamic-dialog-${crypto.randomUUID()}`);
    document.body.appendChild(container);
    dialog.mount(container);
  });

  onUnmounted(() => {
    dialog.unmount();
    document.body.removeChild(container);
  });

  const open = () => (isVisible.value = true);
  const close = () => (isVisible.value = false);

  return { open, close };
}

export default dialogService;
