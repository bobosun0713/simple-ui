import type { VNode } from "vue";

export interface DialogProps {
  visible: boolean;
  size?: string;
  showClose?: boolean;
  appendToBody?: boolean;
  closeOnOverlay?: boolean;
}

export interface UseDialogProps extends Omit<DialogProps, "visible" | "appendToBody"> {}

export interface UseDialogSlots {
  header?: VNode | string | number;
  body?: VNode | string | number;
  footer?: VNode | string | number;
}

export interface UseDialogParameters {
  props?: UseDialogProps;
  slots?: UseDialogSlots;
}
