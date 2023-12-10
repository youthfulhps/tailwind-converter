export function isColor(color: string) {
  return /^(#[0-9A-F]{3}|#[0-9A-F]{6})$/i.test(color);
}

export function preprocessColor(value: string) {
  if (!isColor(value)) {
    return value;
  }

  return value.toLowerCase();
}
