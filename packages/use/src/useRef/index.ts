import { ref, type Ref } from "vue";
import { deepClone } from "@simple/utils";

export function useRef<T>(target: T): Ref & { reset: () => void } {
  const targetClone = deepClone(target);
  const initialState = ref(target) as Ref & { reset: () => void };

  initialState.reset = () => Object.assign(initialState.value, targetClone);

  return initialState;
}
