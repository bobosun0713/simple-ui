export type LinkType = "success" | "warning" | "danger" | "default";
export type LinkTarget = "_blank" | "_self" | "_parent" | "_top";

export interface LinkProps {
  type?: LinkType;
  target?: LinkTarget;
  underline?: boolean;
  disabled?: boolean;
  href?: string;
  icon?: string;
  iconPosition?: "left" | "right";
  block?: boolean;
  loading?: boolean;
}
