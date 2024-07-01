interface UseEventBusReturnType {
  on: (name: string, fn: () => void) => void;
  off: (name: string, fn: () => void) => void;
  emit: (name: string, ...args: unknown[]) => void;
  clear: () => void;
}

type OnType = UseEventBusReturnType["on"];
type OffType = UseEventBusReturnType["off"];
type EmitType = UseEventBusReturnType["emit"];
type ClearType = UseEventBusReturnType["clear"];

const _eventBus = new Map<string, ((param?: unknown) => void)[]>();

export function useEventBus(): UseEventBusReturnType {
  const on: OnType = (name, fn) => {
    const event = _eventBus.get(name);

    const isEmpty = event?.push(fn);
    if (!isEmpty) _eventBus.set(name, [fn]);
  };

  const off: OffType = (name, fn) => {
    const event = _eventBus.get(name);
    if (!event) return;

    const eventFindIndex = event.findIndex(f => f.name === fn.name);
    event.splice(eventFindIndex, 1);
  };

  const emit: EmitType = (name, ...args) => _eventBus.get(name)?.forEach(fn => fn && fn(args));

  const clear: ClearType = () => _eventBus.clear();

  return {
    on,
    off,
    emit,
    clear
  };
}
