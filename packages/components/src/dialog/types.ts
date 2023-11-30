import type { VNode } from "vue";

export interface DialogProps {
  visible: boolean;
  id?: string;
  size?: string;
  showClose?: boolean;
  appendToBody?: boolean;
  closeOnOverlay?: boolean;
}

export interface DialogServiceProps extends Omit<DialogProps, "visible" | "appendToBody"> {
  header?: string | number | VNode | (() => VNode | string | number);
  body?: string | number | VNode | (() => VNode | string | number);
  footer?: string | number | VNode | (() => VNode | string | number);
}
