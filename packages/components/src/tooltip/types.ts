type TooltipPosition = "top" | "bottom" | "left" | "right";

export interface TooltipProps {
  label: string | number;
  position?: TooltipPosition;
  showArrow?: boolean;
}
