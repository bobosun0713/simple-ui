export type RowJustify = "end" | "center" | "between" | "around";
export type RowAlign = "center" | "bottom";

export interface RowProps {
  justify?: RowJustify;
  align?: RowAlign;
  gutter?: string | number;
}
