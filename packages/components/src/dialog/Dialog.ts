import { h, render, nextTick, ref, type Component } from "vue";
import { dialogInstances } from "./instance";
import SDialog from "./Dialog.vue";
import type {
  DialogId,
  DialogServiceProps,
  DialogServiceReturnType,
  DialogExposeAction,
  DialogSlotAction
} from "./types";

function renderDialog(constructor: Component, props: Record<string, any>, slots?: Record<string, any>) {
  const container = document.createElement("div");

  props.vanish = () => {
    render(null, container);
  };

  const VNode = h(constructor, props, slots);
  render(VNode, container);

  document.body.appendChild(container.firstElementChild!);
}

function executeExposeAction(id: DialogId, action: (exposed: DialogExposeAction) => void) {
  nextTick(() => {
    const dialog = dialogInstances.find(item => item.props.id === id);
    if (dialog && dialog.exposed) action(dialog.exposed);
    else console.warn(`[Dialog] dialog with id '${id}' not found`);
  });
}

function dialogService(): DialogServiceReturnType {
  const confirm = (props: DialogServiceProps): Promise<string> => {
    const isVisible = ref(true);

    const { header, body, footer, ...args } = props || {};

    return new Promise(resolve => {
      const createSlot = <T>(slot: T | (() => T) | ((fn: DialogSlotAction) => T)) =>
        typeof slot === "function" ? slot : () => slot;

      renderDialog(
        SDialog,
        {
          ...args,
          visible: isVisible,
          "onUpdate:visible": (val: boolean) => (isVisible.value = val),
          onConfirm: () => resolve("confirm"),
          onCancel: () => resolve("cancel"),
          onClose: () => resolve("close")
        },
        {
          header: createSlot(header),
          body: createSlot(body),
          footer: createSlot(footer)
        }
      );
    });
  };

  const showDialog = (id: DialogId) => {
    executeExposeAction(id, exposed => exposed.handleToggle?.(true));
  };

  const closeDialog = (id: DialogId) => {
    executeExposeAction(id, exposed => exposed.handleToggle?.(false));
  };

  const closeAll = () => {
    dialogInstances.forEach(item => {
      item.exposed?.handleToggle(false);
    });
  };

  return { confirm, showDialog, closeDialog, closeAll };
}

export default dialogService;
