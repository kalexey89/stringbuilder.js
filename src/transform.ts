export function transform(transformer: (str: string) => string, str: string): string {
  return transformer(str);
}

export function truncate(from: number, str: string): string {
  return str.slice(0, Math.floor(from));
}

export function trim(ch: string, str: string): string {
  return trimLeft(ch, trimRight(ch, str));
}

export function trimLeft(ch: string, str: string): string {
  return str.replace(new RegExp(`^${ ch.charAt(0) }*`), '');
}

export function trimRight(ch: string, str: string): string {
  return str.replace(new RegExp(`${ ch.charAt(0) }*$`), '');
}

export function toLowerCase(str: string): string {
  return str.toLowerCase();
}

export function toUpperCase(str: string): string {
  return str.toUpperCase();
}

export function reverse(str: string): string {
  return str
    .split('')
    .reverse()
    .join('');
}

export function repeat(count: number, str: string): string {
  const repeatCount = Math.floor(count);

  if (repeatCount < 0) {
    throw new RangeError('repeat count must be non-negative')
  }

  if (repeatCount === Infinity) {
    throw new RangeError('repeat count must be less than infinity')
  }

  if (str.length * repeatCount >= 1 << 28) {
    throw new RangeError('repeat count must not overflow maximum string size')
  }

  return new Array(repeatCount)
    .map(() => str)
    .join('');
}
