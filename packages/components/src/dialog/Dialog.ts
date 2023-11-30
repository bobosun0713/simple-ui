import { h, ref, onMounted, onUnmounted, createApp, nextTick, type ComponentInternalInstance } from "vue";
import SDialog from "./Dialog.vue";
import type { DialogServiceProps } from "./types";

export const dialogInstances: ComponentInternalInstance[] = [];

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

    dialogInstances.push(dialog._instance!);
  });

  onUnmounted(() => {
    dialog.unmount();
    document.body.removeChild(container);
  });

  const open = () => (isVisible.value = true);
  const close = () => (isVisible.value = false);

  return { open, close };
}

function toggleDialog(id: string, visible: boolean) {
  nextTick(() => {
    const instance = dialogInstances.find(item => item.props.id === id);
    if (instance) instance!.exposed?.handleToggle(visible);
  });
}

function closeAll() {
  nextTick(() => {
    dialogInstances.forEach(item => item.exposed?.handleToggle(false));
  });
}

dialogService.toggleDialog = toggleDialog;
dialogService.closeAll = closeAll;

export default dialogService;
