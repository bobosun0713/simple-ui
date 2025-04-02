import type { h } from "vue";

export type DialogSize = "sm" | "md" | "lg" | "xl";

export interface DialogProps {
  visible?: boolean;
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

export interface DialogEmits {
  (e: "close"): void;
  (e: "cancel"): void;
  (e: "confirm"): void;
  (e: "update:visible", value: boolean): void;
}

export interface DialogExposeAction {
  handleToggle: (arg: boolean) => void;
}

export type DialogSlot = Parameters<typeof h>[2];

export interface DialogSlotAction {
  close: () => void;
  cancel: () => void;
  confirm: () => void;
}

export interface DialogSlots {
  header?: () => void;
  body?: () => void;
  footer?: (props: DialogSlotAction) => void;
}

export interface DialogServiceSlots {
  header?: DialogSlot;
  body?: DialogSlot;
  footer?: DialogSlot;
}

export type DialogServiceAction = "confirm" | "cancel" | "close";

export interface DialogServiceProps {
  size?: DialogSize;
  showClose?: boolean;
  appendToBody?: boolean;
  closeOnOverlay?: boolean;
  header?: DialogSlot;
  body?: DialogSlot;
  footer?: DialogSlot;
  beforeClose?: (done: () => void, type?: DialogServiceAction) => void;
}

export interface DialogServiceReturnType {
  confirm: (props?: DialogServiceProps) => Promise<DialogServiceAction>;
  showDialog: (id: string | number) => void;
  closeDialog: (id: string | number) => void;
  closeAll: () => void;
}
