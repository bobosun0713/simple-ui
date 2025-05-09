import type { h } from "vue";

export type MessageSlot = Parameters<typeof h>[2];

export interface MessageProps {
  width?: string | number;
  offsetTop?: string | number;
  eleSpacing?: string | number;
  duration?: string | number;
  showClose?: boolean;
}

export interface MessageContentProps extends Omit<MessageProps, "width"> {
  id?: string | number;
  type?: string;
  message?: string | number;
}

export type MessageContentEmits = (e: "close", value: string | number) => void;

export type MessageServiceOpen = Pick<MessageContentProps, "type" | "message">;

export interface MessageServiceSlot {
  content?: MessageSlot;
  cancel?: MessageSlot;
}

export interface MessageServiceProps extends MessageProps, MessageServiceSlot {}

export interface MessageServiceReturnType {
  open: (data: MessageServiceOpen) => void;
  info: (message: string) => void;
  success: (message: string) => void;
  warning: (message: string) => void;
  error: (message: string) => void;
  closeAll: () => void;
}
