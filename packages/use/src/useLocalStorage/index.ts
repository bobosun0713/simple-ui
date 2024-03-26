import { useStorage, type UseStorage } from "../useStorage";

export function useLocalStorage<T>(key: string, value: T): UseStorage<T> {
  return useStorage(key, value, localStorage);
}
