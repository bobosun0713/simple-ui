import type { PropType } from "vue";

export type TooltipPlacement = "top" | "bottom" | "left" | "right";
export type TooltipTrigger = "hover" | "click";
export type TooltipEventName = "in" | "out" | "click";

export const tooltipProps = {
  modelValue: {
    type: Boolean,
    default: false
  },
  content: {
    type: [String, Number],
    default: "Tooltip!"
  },
  offset: {
    type: [String, Number],
    default: 4
  },
  trigger: {
    type: String as PropType<TooltipTrigger>,
    default: "hover"
  },
  placement: {
    type: String as PropType<TooltipPlacement>,
    default: "bottom"
  }
};
