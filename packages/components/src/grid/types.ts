import { InjectionKey, Ref } from "vue";

export interface GridProps {
  col?: number | Ref<number>;
  gap?: number | Ref<number>;
}

export const gridPropsKey: InjectionKey<GridProps> = Symbol("gridProps");
