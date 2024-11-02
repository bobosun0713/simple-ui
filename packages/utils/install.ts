import type { App, AppContext, Plugin, Directive, Component } from "vue";

type SFCWithInstall<T> = T & Plugin;

type SFCInstallWithContext<T> = SFCWithInstall<T> & {
  _context: AppContext | null;
};

export function withInstall<T extends Component>(component: T): SFCWithInstall<T> {
  return Object.assign(component, {
    install(app: App) {
      if (component.name) app.component(component.name, component);
    }
  });
}

export function withInstallDirective<T extends Directive>(directive: T, name: string): SFCWithInstall<T> {
  return Object.assign(directive, {
    install(app: App) {
      app.directive(name, directive);
    }
  });
}

export function withInstallFunction<T>(fn: T, name: string): SFCInstallWithContext<T> {
  (fn as SFCWithInstall<T>).install = (app: App): void => {
    (fn as SFCInstallWithContext<T>)._context = app._context;
    app.config.globalProperties[name] = fn;
  };

  return fn as SFCInstallWithContext<T>;
}
