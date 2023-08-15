export function merge(target: object, sources: object) {
  if (!target) return;
  Object.assign({}, target, sources);
  return target;
}
