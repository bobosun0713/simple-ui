import type { App, Plugin, Directive } from "vue";
type SFCWithInstall<T> = T & Plugin;
type SFCOptions = {
  provide?: Record<string, any>;
  directive?: Directive;
};

export const withInstall = <T>(component: T, options?: SFCOptions) => {
  (component as SFCWithInstall<T>).install = (app: App) => {
    const name = (component as any).name;
    app.component(name, component as SFCWithInstall<T>);

    if (options?.directive) app.directive(name, options.directive);
    if (options?.provide) app.provide("$" + name, options.provide);
  };
  return component as SFCWithInstall<T>;
};
