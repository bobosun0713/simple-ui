import type { VNode, Ref } from "vue";

export type DialogId = string | number;

export type DialogSize = "sm" | "md" | "lg" | "xl";

export interface DialogProps {
  visible: boolean | Ref<boolean>;
  id?: string;
  size?: DialogSize;
  showClose?: boolean;
  appendToBody?: boolean;
  closeOnOverlay?: boolean;
  onConfirm?: () => void;
  onClose?: () => void;
  onCancel?: () => void;
  vanish?: () => void;
}

export interface DialogExposeAction {
  handleToggle: (arg: boolean) => void;
}

export type DialogSlotScope = string | number | VNode | (() => string | number | VNode);

export interface DialogSlotAction {
  close: () => void;
  cancel: () => void;
  confirm: () => void;
}

export interface DialogServiceSlots {
  header?: DialogSlotScope;
  body?: DialogSlotScope;
  footer?: DialogSlotScope | ((fn: DialogSlotAction) => string | number | VNode);
}

export interface DialogServiceProps extends Omit<DialogProps, "id" | "visible">, DialogServiceSlots {}

export interface DialogServiceReturnType {
  confirm: (props: DialogServiceProps) => Promise<string>;
  showDialog: (id: string | number) => void;
  closeDialog: (id: string | number) => void;
  closeAll: () => void;
}
