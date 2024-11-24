import type { InjectionKey, Ref } from "vue";

export interface MenuProvide {
  rootActiveIds: Ref<string[]>;
  rooSetActiveIds: (ids: string[]) => void;
}

export interface Item {
  id: string | number;
  name: string | number;
  icon?: string;
  children?: Item[];
}

export interface MenuProps {
  mode?: "vertical" | "horizontal";
  placement?: "left" | "center" | "right";
  items: Item[];
  isExpand?: boolean;
}

export interface MenuItemProps extends Pick<MenuProps, "mode" | "isExpand"> {
  item: Item;
  activeIds: (string | number)[];
}

export const MENU_INJECT_KEY: InjectionKey<MenuProvide> = Symbol("menu");
