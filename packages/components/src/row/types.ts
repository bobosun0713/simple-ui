import { InjectionKey, Ref } from "vue";

export interface RowProps {
  justify?: "end" | "center" | "between" | "around";
  align?: "center" | "bottom";
  gutter?: number;
}

export const rowGutterKey: InjectionKey<Ref<number>> = Symbol("gutter");
