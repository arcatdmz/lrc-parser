import { LRCItem } from "./LRCItem";
import { ParsedChar } from "./ParsedChar";
import { parseWords } from "./parseWords";

export function parseChars(items: LRCItem[], length?: number): ParsedChar[][] {
  const lines = parseWords(items, length);
  return lines.map((words) => {
    const chars: ParsedChar[] = [];
    for (const word of words) {
      const { word: text, startTime, endTime, line } = word;
      const length = text.length;
      if (length === 0) {
        continue;
      }
      if (length === 1) {
        chars.push({ char: text, startTime, endTime, line });
        continue;
      }
      const duration = endTime - startTime;
      for (let i = 0; i < length; i++) {
        const charStart = startTime + (duration * i) / length;
        const charEnd = startTime + (duration * (i + 1)) / length;
        chars.push({
          char: text[i],
          startTime: charStart,
          endTime: charEnd,
          line
        });
      }
    }
    return chars;
  });
}
