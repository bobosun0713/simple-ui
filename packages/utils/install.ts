import type { App, AppContext, Plugin, Directive, Component } from "vue";

type SFCWithInstall<T> = T & Plugin;
type SFCInstallWithContext<T> = SFCWithInstall<T> & {
  _context: AppContext | null;
};

export const withInstall = <T>(component: T & Component): SFCWithInstall<T> => {
  (component as SFCWithInstall<T>).install = (app: App): void => {
    const { name } = component;
    if (name) app.component(name, component);
  };

  return component as SFCWithInstall<T>;
};

export const withInstallFunction = <T>(fn: T, name: string): SFCInstallWithContext<T> => {
  (fn as SFCWithInstall<T>).install = (app: App): void => {
    (fn as SFCInstallWithContext<T>)._context = app._context;
    app.config.globalProperties[name] = fn;
  };

  return fn as SFCInstallWithContext<T>;
};

export const withInstallDirective = <T extends Directive>(directive: T, name: string): SFCWithInstall<T> => {
  (directive as SFCWithInstall<T>).install = (app: App): void => {
    app.directive(name, directive);
  };

  return directive as SFCWithInstall<T>;
};
