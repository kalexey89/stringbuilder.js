export function prepend(values: any[], str: string): string {
  return ''.concat(...values, str);
}

export function prependLine(values: any[], lineBreak: string, str: string): string {
  return prepend([...values, lineBreak], str);
}

export function prependRepeat(value: any, count: number, str: string): string {
  return prepend([...new Array(count).map(() => value)], str);
}
