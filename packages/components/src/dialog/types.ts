import type { VNode, Ref } from "vue";

export interface DialogProps {
  visible: boolean | Ref<boolean>;
  id?: string;
  size?: string;
  showClose?: boolean;
  appendToBody?: boolean;
  closeOnOverlay?: boolean;
  resolve?: (arg: boolean) => void;
  reject?: (arg: boolean) => void;
}

export interface DialogServiceProps extends Omit<DialogProps, "visible" | "appendToBody"> {
  header?: string | number | VNode | (() => VNode | string | number);
  body?: string | number | VNode | (() => VNode | string | number);
  footer?: string | number | VNode | (() => VNode | string | number);
}

export interface DialogService {
  confirm: (prop: DialogServiceProps) => Promise<unknown>;
  showDialog: (id: string | number) => void;
  closeDialog: (id: string | number) => void;
  closeAll: () => void;
}
