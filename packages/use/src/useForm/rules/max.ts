export function max(value: unknown, message: string, length: string | number): string | boolean {
  if (!value || String(value).length > Number(length)) {
    return message || false;
  }
  return true;
}

export default max;
