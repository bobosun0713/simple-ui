import { dynamicCreate } from "@simple/utils";
import Message from "./Message.vue";
import type { VNode } from "vue";
import type { MessageProps, MessageCommand, MessageTypeCommand } from "./types";

let instances: VNode;

function message(options?: MessageProps) {
  instances = instances || dynamicCreate(Message, options);

  document.body.appendChild(instances.el as HTMLElement);

  const vm = instances.component!;

  const open = (data: MessageCommand) => vm!.exposed!.handleAdd({ type: "info", ...data });
  const info = (data: MessageTypeCommand) => vm!.exposed!.handleAdd({ ...data, type: "info" });
  const success = (data: MessageTypeCommand) => vm!.exposed!.handleAdd({ ...data, type: "success" });
  const warning = (data: MessageTypeCommand) => vm!.exposed!.handleAdd({ ...data, type: "warning" });
  const error = (data: MessageTypeCommand) => vm!.exposed!.handleAdd({ ...data, type: "error" });
  const closeAll = () => vm!.exposed!.handleRemoveAll();

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
