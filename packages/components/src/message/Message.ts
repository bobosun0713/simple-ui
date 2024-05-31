import { dynamicCreate } from "@simple/utils";
import Message from "./Message.vue";
import type { VNode } from "vue";
import type { MessageServiceOpen, MessageServiceProps, MessageServiceReturnType } from "./types";

let _loadingInstances: VNode;

function message(props?: MessageServiceProps): MessageServiceReturnType {
  const { content, cancel, ...argProps } = props ?? {};

  _loadingInstances = _loadingInstances || dynamicCreate(Message, argProps, { content, cancel });

  document.body.appendChild(_loadingInstances.el as HTMLElement);

  const vm = _loadingInstances.component!;

  function open(data: MessageServiceOpen): void {
    vm.exposed!.handleAdd(data);
  }

  function info(message: string): void {
    vm.exposed!.handleAdd({ message, type: "info" });
  }

  function success(message: string): void {
    vm.exposed!.handleAdd({ message, type: "success" });
  }

  function warning(message: string): void {
    vm.exposed!.handleAdd({ message, type: "warning" });
  }

  function error(message: string): void {
    vm.exposed!.handleAdd({ message, type: "error" });
  }

  function closeAll(): void {
    vm.exposed!.handleRemoveAll();
  }

  return {
    open,
    info,
    success,
    warning,
    error,
    closeAll
  };
}

export default message;
