export type PopoverPlacement = "top" | "bottom" | "left" | "right";
export type PopoverTrigger = "hover" | "click";

export interface PopoverProps {
  content?: string;
  offset?: number;
  trigger?: PopoverTrigger | PopoverTrigger[];
  placement?: PopoverPlacement;
  hasArrow?: boolean;
}
