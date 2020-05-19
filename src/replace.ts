import { insert } from './insert';
import { remove } from './remove';

export function replaceRange(start: number, end: number, value: any, str: string): string {
  return insert(value, remove(start, end, str));
}

export function replacePattern(pattern: string, value: any, str: string): string;
export function replacePattern(pattern: RegExp, value: any, str: string): string;
export function replacePattern(pattern: string | RegExp, value: any, str: string): string {
  return str.replace(pattern, value);
}

export function replaceAll(pattern: string, value: any, ignoreCase: boolean, str: string): string {
  return str.replace(new RegExp(pattern, ignoreCase ? 'gi' : 'g'), value);
}

export function replaceFirst(pattern: string, value: any, ignoreCase: boolean, str: string): string {
  const index = ignoreCase
    ? str.toLocaleLowerCase().indexOf(pattern.toLocaleLowerCase())
    : str.indexOf(pattern);

  return index >= 0 ? replaceRange(index, index + String(value).length, value, str) : str;
}

export function replaceLast(pattern: string, value: any, ignoreCase: boolean, str: string): string {
  const index = ignoreCase
    ? str.toLocaleLowerCase().lastIndexOf(pattern.toLocaleLowerCase())
    : str.lastIndexOf(pattern);

  return index >= 0 ? replaceRange(index, index + String(value).length, value, str) : str;
}
