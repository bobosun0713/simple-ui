import { customRef, type Ref } from "vue";

export function useDebounceValue<T>(value: T, delay = 300): Ref<T> {
  let timer: number | null = null;

  function clearTimer(): void {
    if (timer) clearTimeout(timer);
  }

  return customRef((track, trigger) => {
    return {
      get(): T {
        track();
        return value;
      },
      set(newValue: T): void {
        clearTimer();
        timer = window.setTimeout(() => {
          value = newValue;
          trigger();
        }, delay);
      }
    };
  });
}
