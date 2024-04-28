import { customRef } from "vue";

export function useDebounceValue<T>(value: T, delay = 300) {
  let timer: number | null = null;

  const clearTimer = () => {
    if (timer) clearTimeout(timer);
  };

  return customRef((track, trigger) => {
    return {
      get() {
        track();
        return value;
      },
      set(newValue: T) {
        clearTimer();
        timer = window.setTimeout(() => {
          value = newValue;
          trigger();
        }, delay);
      }
    };
  });
}
