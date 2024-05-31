import type { Ref, h, PropType } from "vue";

export type DialogSize = "sm" | "md" | "lg" | "xl";

export const dialogProps = {
  visible: {
    type: [Boolean, Object as () => Ref<boolean>],
    default: false
  },
  id: {
    type: String,
    default: ""
  },
  size: {
    type: String as PropType<DialogSize>,
    default: "md"
  },
  showClose: {
    type: Boolean,
    default: true
  },
  appendToBody: {
    type: Boolean,
    default: true
  },
  closeOnOverlay: {
    type: Boolean,
    default: true
  },
  onConfirm: {
    type: Function
  },
  onClose: {
    type: Function
  },
  onCancel: {
    type: Function
  },
  vanish: {
    type: Function
  }
};

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
