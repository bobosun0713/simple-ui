type ButtonTypes = "success" | "warning" | "info" | "danger";
type ButtonSizes = "sm" | "dft" | "md" | "lg";

export interface ButtonProps {
  type: ButtonTypes;
  size: ButtonSizes;
  outlined?: boolean;
  loading?: boolean;
  rounded?: boolean;
  disabled?: boolean;
}
