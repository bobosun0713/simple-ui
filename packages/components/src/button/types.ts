import type { PropType } from "vue";

export type ButtonTypes = "success" | "warning" | "info" | "error";
export type ButtonSizes = "sm" | "md" | "lg" | "xl";

export const buttonProps = {
  type: {
    type: String as PropType<ButtonTypes>,
    default: "info"
  },
  size: {
    type: String as PropType<ButtonSizes>,
    default: "md"
  },
  outlined: {
    type: Boolean,
    default: false
  },
  loading: {
    type: Boolean,
    default: false
  },
  rounded: {
    type: Boolean,
    default: false
  },
  disabled: {
    type: Boolean,
    default: false
  }
};
