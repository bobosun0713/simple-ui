import type { ArrowOptions, Placement } from "@floating-ui/vue";
import type { StyleValue } from "vue";

export type PopupPlacement = "top" | "bottom" | "left" | "right";
export type PopupTrigger = "hover" | "click";

export interface PopupProps {
  content?: string;
  offset?: number;
  trigger?: PopupTrigger | PopupTrigger[];
  placement?: PopupPlacement;
  transition?: string;
  arrowOptions?: ArrowOptions;
}

export interface PopupSlots {
  reference?: () => unknown;
  content?: (prop: { arrowStyle: StyleValue; placement: Placement }) => unknown;
}
