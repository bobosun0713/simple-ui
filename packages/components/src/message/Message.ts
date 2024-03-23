import { dynamicCreate } from "@simple/utils";
import Message from "./Message.vue";
import type { VNode } from "vue";
import type { MessageServiceOpen, MessageServiceProps } from "./types";

let instances: VNode;

function message(props?: MessageServiceProps) {
  const { content, cancel, ...argProps } = props || {};
  instances = instances || dynamicCreate(Message, argProps, { content, cancel });

  document.body.appendChild(instances.el as HTMLElement);

  const vm = instances.component!;

  const open = (data: MessageServiceOpen) => vm.exposed!.handleAdd(data);
  const info = (message: string) => vm.exposed!.handleAdd({ message, type: "info" });
  const success = (message: string) => vm.exposed!.handleAdd({ message, type: "success" });
  const warning = (message: string) => vm.exposed!.handleAdd({ message, type: "warning" });
  const error = (message: string) => vm.exposed!.handleAdd({ message, type: "error" });
  const closeAll = () => vm.exposed!.handleRemoveAll();

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
