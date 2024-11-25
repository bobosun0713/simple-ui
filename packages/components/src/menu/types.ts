import type { InjectionKey, Ref } from "vue";
import type { IconNames } from "../icon/types";

export interface MenuProvide {
  rootActiveIds: Ref<(string | number)[]>;
  rooSetActiveIds: (ids: (string | number)[]) => void;
}

export interface MenuItem {
  id: string | number;
  name: string | number;
  icon?: IconNames;
  children?: MenuItem[];
}

export interface MenuProps {
  mode?: "vertical" | "horizontal";
  items: MenuItem[];
  isExpand?: boolean;
  placement?: "left" | "center" | "right";
}

export interface MenuItemProps extends Pick<MenuProps, "mode" | "isExpand"> {
  item: MenuItem;
  activeIds: (string | number)[];
}

export const MENU_INJECT_KEY: InjectionKey<MenuProvide> = Symbol("menu");
