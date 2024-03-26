import { useStorage, type UseStorage } from "../useStorage";

export function useSessionStorage<T>(key: string, value: T): UseStorage<T> {
  return useStorage(key, value, sessionStorage);
}
