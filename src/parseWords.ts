import { LRCItem } from "./LRCItem";
import { LRCTag } from "./LRCTag";
import { ParsedWord } from "./ParsedWord";

export function parseWords(items: LRCItem[], length?: number): ParsedWord[][] {
  const words: ParsedWord[] = [];
  for (let i = 0; i < items.length; i++) {
    const item = items[i];
    if (item.type !== "text" || item.text.length === 0) continue;

    const { text, line } = item,
      prevTag = items
        .slice(0, i)
        .reverse()
        .find((item): item is LRCTag => item.type === "tag"),
      nextTag = items
        .slice(i + 1)
        .find((item): item is LRCTag => item.type === "tag"),
      startTime = prevTag?.time ?? nextTag?.time ?? 0,
      endTime = nextTag?.time ?? length ?? prevTag?.time ?? 0;
    words.push({ word: text, startTime, endTime, line });
  }

  const maxLine = Math.max(...words.map((w) => w.line));
  const lines: ParsedWord[][] = Array.from({ length: maxLine + 1 }, () => []);
  for (const word of words) {
    lines[word.line].push(word);
  }
  return lines;
}
