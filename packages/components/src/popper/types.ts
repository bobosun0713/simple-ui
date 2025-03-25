import type { ArrowOptions, Placement } from "@floating-ui/vue";
import type { StyleValue } from "vue";

export type PopperTrigger = "hover" | "click";

export interface PopperProps {
  content?: string;
  offset?: number;
  trigger?: PopperTrigger | PopperTrigger[];
  placement?: Placement;
  allowPlacement?: Placement | Placement[];
  transition?: string;
  arrowOptions?: ArrowOptions;
  hasShift?: boolean;
  appendToBody?: boolean;
}

export interface PopperSlots {
  reference?: () => unknown;
  content?: (prop: { arrowStyle: StyleValue; placement: Placement }) => unknown;
}

export interface PopperArrowData {
  style: StyleValue;
  placement: Placement;
}
