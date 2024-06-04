export interface ButtonProps {
  type?: "success" | "warning" | "info" | "error";
  size?: "sm" | "md" | "lg" | "xl";
  outlined?: boolean;
  loading?: boolean;
  rounded?: boolean;
  disabled?: boolean;
}
