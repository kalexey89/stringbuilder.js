export function insert(value: any, str: string): string;
export function insert(index: number, value: any, str: string): string;
export function insert(...args: any[]): string {
  if (args.length === 2) {
    const [value, str] = args;

    return ''
      .concat(value)
      .concat(str);
  }
  else if (args.length === 3) {
    const [index, value, str] = args;

    return ''
      .concat(str.slice(0, Math.floor(index)))
      .concat(value)
      .concat(str.slice(Math.floor(index)));
  }

  throw new TypeError('Invalid agruments');
}
