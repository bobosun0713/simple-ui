export function callFn<P extends any[], R>(fn?: ((...arg: P) => R) | ((...arg: P) => R)[] | null, ...args: P): void {
  if (Array.isArray(fn)) fn.map(f => f(...args));
  else if (fn) fn(...args);
}
