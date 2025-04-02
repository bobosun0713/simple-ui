import { InjectionKey, Ref } from "vue";

export interface CollapseProps {
  modelValue?: string[] | string;
  accordion?: boolean;
}

export type CollapseEmits = (e: "update:modelValue", value: string[]) => void;

export interface CollapseItemProps {
  name?: string;
  title?: string;
  content?: string;
}

export type CollapseItemEmits = (e: "active", value: string) => void;

export const collapsePropsKey: InjectionKey<{ activeNames: Ref<string[]> }> = Symbol("collapseProps");
