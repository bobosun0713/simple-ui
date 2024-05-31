import type { h } from "vue";

// TODO: Define a global type for the h function
export interface LoadingServiceProps {
  spinner?: Parameters<typeof h>[2];
  duration?: number;
}

export interface LoadingServiceReturnType {
  open: () => void;
  close: () => void;
}
