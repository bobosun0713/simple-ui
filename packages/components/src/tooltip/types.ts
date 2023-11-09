export type TooltipPlacement = "top" | "bottom" | "left" | "right";

export interface TooltipProps {
  content?: string | number;
  placement?: TooltipPlacement;
  showArrow?: boolean;
}
