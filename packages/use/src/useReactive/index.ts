import { reactive, type UnwrapNestedRefs } from "vue";
import { deepClone } from "@simple/utils";

type ReactiveWithReset<T> = UnwrapNestedRefs<T> & { reset: () => void };

export function useReactive<T extends object>(target: T): ReactiveWithReset<T> | T {
  if (typeof target !== "object" || target === null) {
    console.warn("[useReactive] only accepts objects");
    return target;
  }

  const targetClone = deepClone(target);
  const initialState = reactive(target) as ReactiveWithReset<T>;

  initialState.reset = (): void => {
    Object.assign(initialState, deepClone(targetClone));
  };

  return initialState;
}
