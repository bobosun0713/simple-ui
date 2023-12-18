import { h, render, nextTick, ref, watch, type Component, type ComponentInternalInstance } from "vue";
import SDialog from "./Dialog.vue";
import type { DialogService } from "./types";

export const dialogInstances: ComponentInternalInstance[] = [];

function renderDialog(constructor: Component, props: Record<string, any>) {
  const container = document.createElement("div");

  const VNode = h(constructor, props);
  render(VNode, container);

  document.body.appendChild(container.firstElementChild!);

  watch(
    () => props.visible.value,
    val => {
      if (!val) {
        setTimeout(() => {
          render(null, container!);
        }, 100);
      }
    }
  );
}

function executeOnDialog(id: string | number, action: (exposed: Record<string, any>) => void) {
  nextTick(() => {
    const dialog = dialogInstances.find(item => item.props.id === id);
    if (dialog && dialog.exposed) {
      action(dialog.exposed);
    }
  });
}

function dialogService(): DialogService {
  const confirm: DialogService["confirm"] = props => {
    const isVisible = ref(true);
    return new Promise((resolve, reject) => {
      renderDialog(SDialog, {
        visible: isVisible,
        "onUpdate:visible": (val: boolean) => (isVisible.value = val),
        ...props,
        resolve,
        reject
      });
    });
  };

  const showDialog: DialogService["showDialog"] = id => {
    executeOnDialog(id, exposed => exposed.handleToggle?.(true));
  };

  const closeDialog: DialogService["closeDialog"] = id => {
    executeOnDialog(id, exposed => exposed.handleToggle?.(false));
  };

  const closeAll: DialogService["closeAll"] = () => {
    dialogInstances.forEach(item => {
      item.exposed?.onToggle(false);
    });
  };

  return { confirm, showDialog, closeDialog, closeAll };
}

export default dialogService;
