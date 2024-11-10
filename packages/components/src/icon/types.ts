export type IconNames =
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
  | "loading"
  | "eye"
  | "success"
  | "info"
  | "asc"
  | "desc"
  | "home"
  | "notification"
  | "setting"
  | "heart";

export interface IconProps {
  name?: IconNames;
  width?: number | string;
  height?: number | string;
  fill?: string;
}
