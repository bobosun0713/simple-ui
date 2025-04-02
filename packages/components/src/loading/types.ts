import type { h } from "vue";

export interface LoadingProps {
  visible?: boolean;
  duration?: number;
}

export type LoadingEmits = (e: "update:visible", value: boolean) => void;

export interface LoadingServiceProps extends Pick<LoadingProps, "duration"> {
  // TODO: Define a global type for the h function
  spinner?: Parameters<typeof h>[2];
}

export interface LoadingServiceReturnType {
  open: (props?: LoadingServiceProps) => void;
  close: () => void;
}
