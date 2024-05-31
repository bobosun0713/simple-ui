import { ref, Ref } from "vue";
import { deepClone } from "@simple/utils";

type RefWithReset<T> = Ref<T> & { reset: () => void };

export function useRef<T>(target: T): RefWithReset<T> {
  const targetClone = deepClone(target);
  const initialState = ref(target) as RefWithReset<T>;

  initialState.reset = (): void => {
    if (typeof initialState.value === "object" && initialState.value !== null) {
      initialState.value = Object.assign(initialState.value, deepClone(targetClone));
    } else {
      initialState.value = targetClone;
    }
  };

  return initialState;
}
