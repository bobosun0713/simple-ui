export type Handler<T = unknown> = (event: T) => void;
export type WildcardHandler<T = Record<string, unknown>> = (type: keyof T, event: T[keyof T]) => void;

export function eventBus() {
  /**
   * event 存儲容器
   */
  const eventBus = new Map();
  return {
    $on(type: string, fn: (arg: any) => void) {
      const event = eventBus.get(type);
      const isEmpty = event && event.push(fn);
      if (!isEmpty) eventBus.set(type, [fn]);
    },

    $off(type: string, fn: (arg: any) => void) {
      const event = eventBus.get(type);
      const eventFindIndex = event.indexOf(fn);
      event.splice(eventFindIndex, 1);
    },

    $emit(type: string, args?: any) {
      const currentType = type === "$" ? "$" : type;
      eventBus.get(currentType)?.forEach((fn: (arg: any) => void) => fn && fn(args));
    },

    $clear() {
      eventBus.clear();
    }
  };
}
