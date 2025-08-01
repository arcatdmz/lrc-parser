import { ParsedChar } from "./ParsedChar";
import { ParsedWord } from "./ParsedWord";
import { parseChars } from "./parseChars";
import { parseLRC } from "./parseLRC";
import { parseTimeString } from "./parseTimeString";
import { parseWords } from "./parseWords";

export function parse(content: string, char: true): ParsedChar[][];
export function parse(content: string, char: false): ParsedWord[][];

export function parse(content: string, char: boolean) {
  const { meta, items } = parseLRC(content);
  const length = meta.length ? parseTimeString(meta.length) : undefined;
  return char ? parseChars(items, length) : parseWords(items, length);
}
