import { h, render, nextTick, ref, type Component } from "vue";
import { dialogInstances } from "./instance";
import SDialog from "./Dialog.vue";
import type { DialogServiceProps, DialogServiceReturnType, DialogId } from "./types";

function renderDialog(constructor: Component, props: Record<string, any>) {
  const container = document.createElement("div");

  props.vanish = () => {
    render(null, container);
  };

  const VNode = h(constructor, props);
  render(VNode, container);

  document.body.appendChild(container.firstElementChild!);
}

function executeOnDialog(id: string | number, action: (exposed: Record<string, any>) => void) {
  nextTick(() => {
    const dialog = dialogInstances.find(item => item.props.id === id);
    if (dialog && dialog.exposed) {
      action(dialog.exposed);
    }
  });
}

function dialogService(): DialogServiceReturnType {
  const confirm = (props: DialogServiceProps): Promise<boolean> => {
    const isVisible = ref(true);
    return new Promise(resolve => {
      renderDialog(SDialog, {
        visible: isVisible,
        "onUpdate:visible": (val: boolean) => (isVisible.value = val),
        ...props,
        promiseToResolve: resolve
      });
    });
  };

  const showDialog = (id: DialogId) => {
    executeOnDialog(id, exposed => exposed.handleToggle?.(true));
  };

  const closeDialog = (id: DialogId) => {
    executeOnDialog(id, exposed => exposed.handleToggle?.(false));
  };

  const closeAll = () => {
    dialogInstances.forEach(item => {
      item.exposed?.onToggle(false);
    });
  };

  return { confirm, showDialog, closeDialog, closeAll };
}

export default dialogService;
