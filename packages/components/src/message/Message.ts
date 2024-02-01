import { dynamicCreate } from "@simple/utils";
import Message from "./Message.vue";
import type { VNode } from "vue";
import type { MessageProps, MessageCommand } from "./types";

let instances: VNode;

function message(options?: MessageProps) {
  instances = instances || dynamicCreate(Message, options);

  document.body.appendChild(instances.el as HTMLElement);

  const vm = instances.component!;

  const open = (data: MessageCommand) => vm.exposed!.handleAdd(data);
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
