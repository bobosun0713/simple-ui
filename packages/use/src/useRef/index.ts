import { ref, Ref } from "vue";
import { deepClone } from "@simple/utils";

type RefWithReset<T> = Ref<T> & { reset: () => void };

export function useRef<T>(target: T): RefWithReset<T> {
  const resetState = deepClone(target);
  const initialState = ref(deepClone(target)) as unknown as RefWithReset<T>;

  initialState.reset = (): void => {
    if (typeof initialState.value === "object" && initialState.value !== null) initialState.value = { ...resetState };
    else initialState.value = resetState;
  };

  return initialState;
}
