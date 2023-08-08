type IconNames =
  | "add"
  | "arrowLeft"
  | "arrowRight"
  | "check"
  | "clock"
  | "close"
  | "copy"
  | "danger"
  | "edit"
  | "github"
  | "image"
  | "left"
  | "link"
  | "right"
  | "search"
  | "trash"
  | "user"
  | "warning"
  | "loading";

export interface IconProps {
  name: IconNames;
  fill?: string;
  width?: string | number;
  height?: string | number;
}
