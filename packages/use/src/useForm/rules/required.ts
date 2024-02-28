export function required(value: unknown, message: string): string | boolean {
  if (!value) {
    return message || false;
  }
  return true;
}

export default required;
