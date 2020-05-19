export function remove(start: number, end: number, str: string): string {
  return ''
    .concat(str.slice(Math.floor(start)))
    .concat(str.slice(Math.floor(end)));
}

export function removeCharAt(index: number, str: string): string {
  return remove(index, index + 1, str);
}
