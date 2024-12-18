import type { ArrowOptions, Placement } from "@floating-ui/vue";
import type { StyleValue } from "vue";

export type PopperPlacement = "top" | "bottom" | "left" | "right";
export type PopperTrigger = "hover" | "click";

export interface PopperProps {
  content?: string;
  offset?: number;
  trigger?: PopperTrigger | PopperTrigger[];
  placement?: PopperPlacement;
  allowPlacement?: PopperPlacement[] | PopperPlacement[][number];
  transition?: string;
  arrowOptions?: ArrowOptions;
  hasShift?: boolean;
}

export interface PopperSlots {
  reference?: () => unknown;
  content?: (prop: { arrowStyle: StyleValue; placement: Placement }) => unknown;
}

export interface PopperArrowData {
  style: StyleValue;
  placement: Placement;
}
