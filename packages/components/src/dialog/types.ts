import type { VNode, Ref } from "vue";

export type DialogId = string | number;

export interface DialogProps {
  visible: boolean | Ref<boolean>;
  id?: string;
  size?: string;
  showClose?: boolean;
  appendToBody?: boolean;
  closeOnOverlay?: boolean;
  promiseToResolve?: (arg: boolean) => void;
  vanish?: () => void;
}

export interface DialogServiceProps extends Omit<DialogProps, "visible" | "appendToBody"> {
  header?: string | number | VNode | (() => VNode | string | number);
  body?: string | number | VNode | (() => VNode | string | number);
  footer?: string | number | VNode | (() => VNode | string | number);
}

export interface DialogServiceReturnType {
  confirm: (prop: DialogServiceProps) => Promise<boolean>;
  showDialog: (id: string | number) => void;
  closeDialog: (id: string | number) => void;
  closeAll: () => void;
}
