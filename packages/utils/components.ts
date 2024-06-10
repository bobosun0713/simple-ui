import { createApp, type Component, type App } from "vue";

export function callFn<P extends any[], R>(fn?: ((...arg: P) => R) | ((...arg: P) => R)[] | null, ...args: P): void {
  if (Array.isArray(fn)) fn.map(f => f(...args));
  else if (fn) fn(...args);
}

export function mountInstance(component: Component): {
  instance: App;
  unmount: () => void;
} {
  const app = createApp(component);
  const container = document.createElement("div");

  app.mount(container);

  document.body.appendChild(container);

  return {
    instance: app,
    unmount(): void {
      app.unmount();
      document.body.removeChild(container);
    }
  };
}
