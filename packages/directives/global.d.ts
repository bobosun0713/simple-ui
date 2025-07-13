import * as directives from "./src";

declare module "vue" {
  export interface GlobalDirectives {
    SClickOutSide: (typeof directives)["SClickOutSide"];
  }
}
