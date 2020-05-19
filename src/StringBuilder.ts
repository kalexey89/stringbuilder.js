import { append, appendLine, appendRepeat } from './append';
import { insert } from './insert';
import { prepend, prependLine, prependRepeat } from './prepend';
import { remove, removeCharAt } from './remove';
import {
  replaceAll,
  replaceFirst,
  replaceLast,
  replacePattern,
  replaceRange
} from './replace';
import {
  repeat,
  reverse,
  toLowerCase,
  toUpperCase,
  transform,
  trim,
  trimLeft,
  trimRight,
  truncate
} from './transform';

type Operation = (...args: any[]) => string;

interface Options {
  lineBreak?: string;
}

export default class StringBuilder {

  private static readonly DEFAULT_LINE_BREAK = '\n';

  private readonly lineBreak: string = StringBuilder.DEFAULT_LINE_BREAK;

  private initialString: string = '';
  private operationalPipeline: Operation[] = [];

  constructor();
  constructor(str: string);
  constructor(options: Options);
  constructor(str: string, options: Options);
  constructor(...args: any[]) {
    if (args.length === 2) {
      this.initialString = String(args[0]);
      this.lineBreak = args[1]?.lineBreak || StringBuilder.DEFAULT_LINE_BREAK;
    }
    else if (args.length === 1 && typeof args[0] === 'string') {
      this.initialString = String(args[0]);
    }
    else if (args.length === 1 && typeof args[0] === 'object') {
      this.lineBreak = args[0]?.lineBreak || StringBuilder.DEFAULT_LINE_BREAK;
    }
  }

  public append(...values: any[]): this {
    return this.scheduleOperation(append, values);
  }

  public appendLine(...values: any[]): this {
    return this.scheduleOperation(appendLine, values, this.lineBreak);
  }

  public appendRepeat(value: any, count: number): this {
    return this.scheduleOperation(appendRepeat, value, count);
  }

  public build(): string {
    return this.operationalPipeline
      .reduce((str: string, operation: Operation) => operation(str), this.initialString);
  }

  public clear(): this {
    this.initialString = '';
    this.operationalPipeline.length = 0;

    return this;
  }

  public prepend(...values: any[]): this {
    return this.scheduleOperation(prepend, values);
  }

  public prependLine(...values: any[]): this {
    return this.scheduleOperation(prependLine, values, this.lineBreak);
  }

  public prependRepeat(value: any, count: number): this {
    return this.scheduleOperation(prependRepeat, value, count);
  }

  public insert(value: any): this;
  public insert(index: number, value: any): this;
  public insert(...args: any[]): this {
    return this.scheduleOperation(insert, ...args);
  }

  public remove(start: number, end: number): this {
    return this.scheduleOperation(remove, start, end);
  }

  public removeCharAt(index: number): this {
    return this.scheduleOperation(removeCharAt, index);
  }

  public replaceRange(start: number, end: number, value: any): this {
    return this.scheduleOperation(replaceRange, start, end, value);
  }

  public replacePattern(pattern: string, value: any): this;
  public replacePattern(pattern: RegExp, value: any): this;
  public replacePattern(pattern: string | RegExp, value: any): this {
    return this.scheduleOperation(replacePattern, pattern, value);
  }

  public replaceAll(pattern: string, value: any): this {
    return this.scheduleOperation(replaceAll, pattern, value);
  }

  public replaceFirst(pattern: string, value: any): this {
    return this.scheduleOperation(replaceFirst, pattern, value);
  }

  public replaceLast(pattern: string, value: any): this {
    return this.scheduleOperation(replaceLast, pattern, value);
  }

  public transform(transformer: (str: string) => string): this {
    return this.scheduleOperation(transform, transformer);
  }

  public truncate(from: number): this {
    return this.scheduleOperation(truncate, from);
  }

  public trim(ch: string = ' '): this {
    return this.scheduleOperation(trim, ch);
  }

  public trimLeft(ch: string = ' '): this {
    return this.scheduleOperation(trimLeft, ch);
  }

  public trimRight(ch: string = ' '): this {
    return this.scheduleOperation(trimRight, ch);
  }

  public toLowerCase(): this {
    return this.scheduleOperation(toLowerCase);
  }

  public toUpperCase(): this {
    return this.scheduleOperation(toUpperCase);
  }

  public reverse(): this {
    return this.scheduleOperation(reverse);
  }

  public repeat(count: number): this {
    return this.scheduleOperation(repeat, count);
  }

  protected scheduleOperation(operation: Operation, ...args: any[]): this {
    this.operationalPipeline.push(operation.bind(null, ...args));

    return this;
  }

}
