export interface LinkProps {
  type?: "success" | "warning" | "danger" | "default";
  target?: "_blank" | "_self" | "_parent" | "_top";
  underline?: boolean;
  disabled?: boolean;
  href?: string;
  icon?: string;
  iconPosition?: "left" | "right";
  block?: boolean;
  loading?: boolean;
}
