export function deepClone<T>(obj: T) {
  if (typeof obj !== "object" || obj === null) return obj;

  const cloneObj = Array.isArray(obj) ? ([] as T) : ({} as T);
  for (const key in obj) {
    cloneObj[key] = deepClone(obj[key]);
  }

  return cloneObj;
}
