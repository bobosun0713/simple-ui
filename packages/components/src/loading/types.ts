import type { VNode } from "vue";
export interface LoadingProps {
  visible: boolean;
  duration?: number;
  appendToBody?: boolean;
}
export interface LoadingServiceProps extends Omit<LoadingProps, "visible" | "appendToBody"> {
  spinner?: string | number | VNode | (() => VNode | string | number);
}
