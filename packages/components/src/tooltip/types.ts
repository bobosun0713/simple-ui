export type TooltipPlacement = "top" | "bottom" | "left" | "right";
export type TooltipTrigger = "hover" | "click";
export type TooltipEventName = "in" | "out" | "click";

export interface TooltipProps {
  modelValue?: boolean;
  content?: string | number;
  offset?: string | number;
  trigger?: TooltipTrigger;
  placement?: TooltipPlacement;
}
