import { reactive, type UnwrapNestedRefs } from "vue";
import { deepClone } from "@simple/utils";

export function useReactive<T extends object>(target: T): UnwrapNestedRefs<T> & { reset: () => void } {
  const targetClone = deepClone(target);
  const initialState = reactive(target) as UnwrapNestedRefs<T> & { reset: () => void };

  initialState.reset = () => Object.assign(initialState, deepClone(targetClone));

  return initialState;
}
