export function append(values: any[], str: string): string {
  return str.concat(...values);
}

export function appendLine(values: any[], lineBreak: string, str: string): string {
  return append([...values, lineBreak], str);
}

export function appendRepeat(value: any, count: number, str: string): string {
  return append([...new Array(count).map(() => value)], str);
}
