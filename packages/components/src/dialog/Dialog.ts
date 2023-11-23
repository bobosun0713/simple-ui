import { h, ref, onMounted, onUnmounted, createApp, type Ref } from "vue";
import SDialog from "./Dialog.vue";
import type { UseDialogParameters } from "./types";

const dialogStates: { isVisible: Ref }[] = [];

function useDialog(data?: UseDialogParameters) {
  let container: HTMLDivElement;
  const isVisible = ref(false);

  const dialog = createApp(() =>
    h(
      SDialog,
      {
        ...(data?.props && data.props),
        visible: isVisible.value,
        "onUpdate:visible": (val: boolean) => (isVisible.value = val),
        appendToBody: false
      },
      { ...(data?.slots && data.slots) }
    )
  );

  dialogStates.push({ isVisible });

  onMounted(() => {
    container = document.createElement("div");
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
  const closeAll = () => dialogStates.forEach(state => (state.isVisible.value = false));

  return { open, close, closeAll };
}

export default useDialog;
