import { h, render, nextTick, ref, type Component } from "vue";
import { dialogInstances } from "./instance";
import SDialog from "./Dialog.vue";
import type {
  DialogServiceProps,
  DialogServiceReturnType,
  DialogSlot,
  DialogExposeAction,
  DialogSlotAction
} from "./types";

// TODO: Does it need to be a global type?
// eslint-disable-next-line @typescript-eslint/ban-types
type NonFunction<T> = T extends Function ? never : T;

function renderDialog(constructor: Component, props: Record<string, any>, slots?: Record<string, any>): void {
  const container = document.createElement("div");

  props.vanish = () => {
    render(null, container);
  };

  const VNode = h(constructor, props, slots);
  render(VNode, container);

  document.body.appendChild(container.firstElementChild!);
}

function executeExposeAction(id: string | number, action: (exposed: DialogExposeAction) => void): void {
  nextTick(() => {
    const dialog = dialogInstances.find(item => item.props.id === id);
    if (dialog && dialog.exposed) action(dialog.exposed as DialogExposeAction);
    else console.warn(`[Dialog] dialog with id '${id}' not found`);
  });
}

function dialogService(): DialogServiceReturnType {
  const confirm = (props?: DialogServiceProps): Promise<string> => {
    const isVisible = ref(true);

    const { header, body, footer, ...args } = props || {};

    return new Promise(resolve => {
      const createSlot = (slot: DialogSlot): ((fn?: DialogSlotAction) => NonFunction<typeof slot>) =>
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

  const showDialog = (id: string | number) => executeExposeAction(id, exposed => exposed.handleToggle(true));

  const closeDialog = (id: string | number) => executeExposeAction(id, exposed => exposed.handleToggle(false));

  const closeAll = () => dialogInstances.forEach(item => item.exposed?.handleToggle(false));

  return { confirm, showDialog, closeDialog, closeAll };
}

export default dialogService;
