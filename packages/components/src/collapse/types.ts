import { InjectionKey, Ref } from "vue";

export interface CollapseProps {
  accordion?: boolean;
}

export interface CollapseItemProps {
  name?: string;
  title?: string;
  content?: string;
}

export const collapsePropsKey: InjectionKey<{ activeNames: Ref<string[]> }> = Symbol("collapseProps");
