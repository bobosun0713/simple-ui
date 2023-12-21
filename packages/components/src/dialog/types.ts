import type { VNode, Ref } from "vue";

export type DialogId = string | number;

export interface DialogProps {
  visible: boolean | Ref<boolean>;
  id?: string;
  size?: string;
  showClose?: boolean;
  appendToBody?: boolean;
  closeOnOverlay?: boolean;
  onConfirm?: () => void;
  onClose?: () => void;
  onCancel?: () => void;
  vanish?: () => void;
}

export interface DialogExposeAction {
  handleToggle?: (arg: boolean) => void;
  handleCancel?: () => void;
  handleConfirm?: () => void;
  handleClose?: () => void;
}

export type DialogSlotScope = string | number | VNode | (() => string | number | VNode);
export interface DialogServiceSlots {
  header?: DialogSlotScope;
  body?: DialogSlotScope;
  footer?: DialogSlotScope | ((fn: DialogExposeAction) => string | number | VNode);
}

export interface DialogServiceProps extends Omit<DialogProps, "id" | "visible">, DialogServiceSlots {}

export interface DialogServiceReturnType {
  confirm: (props: DialogServiceProps) => Promise<string>;
  showDialog: (id: string | number) => void;
  closeDialog: (id: string | number) => void;
  closeAll: () => void;
}
