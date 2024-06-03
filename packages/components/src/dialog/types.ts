import type { Ref, h } from "vue";

export type DialogSize = "sm" | "md" | "lg" | "xl";

export interface DialogProps {
  visible?: boolean | Ref<boolean>;
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

export type DialogSlot = Parameters<typeof h>[2];

export interface DialogSlotAction {
  close: () => void;
  cancel: () => void;
  confirm: () => void;
}

export interface DialogServiceSlots {
  header?: DialogSlot;
  body?: DialogSlot;
  footer?: DialogSlot;
}

export interface DialogServiceProps {
  size?: DialogSize;
  showClose?: boolean;
  appendToBody?: boolean;
  closeOnOverlay?: boolean;
  header?: DialogSlot;
  body?: DialogSlot;
  footer?: DialogSlot;
  vanish?: () => void;
}

export interface DialogServiceReturnType {
  confirm: (props?: DialogServiceProps) => Promise<string>;
  showDialog: (id: string | number) => void;
  closeDialog: (id: string | number) => void;
  closeAll: () => void;
}
