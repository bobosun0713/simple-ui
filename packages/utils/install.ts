import type { App, AppContext, Plugin, Directive, Component } from "vue";

type SFCWithInstall<T> = T & Plugin;
type SFCInstallWithContext<T> = SFCWithInstall<T> & {
  _context: AppContext | null;
};

export const withInstall = <T>(component: T & Component) => {
  (component as SFCWithInstall<T>).install = (app: App) => {
    const { name } = component;
    if (name) {
      app.component(name, component as SFCWithInstall<T>);
    }
  };

  return component as SFCWithInstall<T>;
};

export const withInstallFunction = <T>(fn: T, name: string) => {
  (fn as SFCWithInstall<T>).install = (app: App) => {
    (fn as SFCInstallWithContext<T>)._context = app._context;
    app.config.globalProperties[name] = fn;
  };

  return fn as SFCInstallWithContext<T>;
};

export const withInstallDirective = <T extends Directive>(directive: T, name: string) => {
  (directive as SFCWithInstall<T>).install = (app: App): void => {
    app.directive(name, directive);
  };

  return directive as SFCWithInstall<T>;
};
