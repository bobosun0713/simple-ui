import { h, nextTick, ref } from "vue";
import { mountInstance } from "@simple/utils";
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
type NonFunction<T> = T extends () => void ? never : T;

function executeExposeAction(id: string | number, action: (exposed: DialogExposeAction) => void): void {
  void nextTick(() => {
    const dialog = dialogInstances.find(item => item.props.id === id);
    if (dialog?.exposed) action(dialog.exposed as DialogExposeAction);
    else console.warn(`[Dialog] dialog with id '${id}' not found`);
  });
}

function dialogService(): DialogServiceReturnType {
  const confirm = (props?: DialogServiceProps): Promise<string> => {
    const isVisible = ref(true);

    const { header, body, footer, ...args } = props ?? {};

    return new Promise(resolve => {
      const createSlot = (slot: DialogSlot): ((fn?: DialogSlotAction) => NonFunction<typeof slot>) =>
        typeof slot === "function" ? slot : (): unknown => slot;

      const { unmount } = mountInstance(() =>
        h(
          SDialog,
          {
            ...args,
            visible: isVisible,
            appendToBody: false,
            "onUpdate:visible": (val: boolean) => (isVisible.value = val),
            onConfirm: () => resolve("confirm"),
            onCancel: () => resolve("cancel"),
            onClose: () => resolve("close"),
            vanish: () => unmount()
          },
          {
            header: createSlot(header),
            body: createSlot(body),
            footer: createSlot(footer)
          }
        )
      );
    });
  };

  const showDialog = (id: string | number): void => executeExposeAction(id, exposed => exposed.handleToggle(true));

  const closeDialog = (id: string | number): void => executeExposeAction(id, exposed => exposed.handleToggle(false));

  const closeAll = (): void =>
    dialogInstances.forEach(item => (item.exposed as DialogExposeAction).handleToggle(false));

  return { confirm, showDialog, closeDialog, closeAll };
}

export default dialogService;
