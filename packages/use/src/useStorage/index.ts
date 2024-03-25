import { ref, readonly, type DeepReadonly, type Ref } from "vue";

export type UseStorage<T> = [DeepReadonly<Ref<T | null>>, (value: T) => void, () => void];

function getDefaultStorage<T>(key: string, value: T, storage: Storage): T {
  const getStorage = storage.getItem(key);
  if (getStorage) {
    try {
      return JSON.parse(getStorage);
    } catch {
      return value;
    }
  }
  return value;
}

export function useStorage<T>(key: string, value: T, storage: Storage = localStorage): UseStorage<T> {
  const currentStorage = getDefaultStorage(key, value, storage);
  const state: Ref<T | null> = ref(null);

  const setStorage = (value: T): void => {
    storage.setItem(key, JSON.stringify(value));
    state.value = value;
  };

  const removeStorage = (): void => {
    storage.removeAll(key);
    state.value = null;
  };

  setStorage(currentStorage);

  return [readonly(state), setStorage, removeStorage];
}
