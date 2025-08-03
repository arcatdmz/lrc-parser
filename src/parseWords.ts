import { LRCItem } from "./LRCItem";
import { LRCTag } from "./LRCTag";
import { ParsedWord } from "./ParsedWord";

export function parseWords(items: LRCItem[], length?: number): ParsedWord[][] {
  const words: ParsedWord[] = [];
  let tagBuffer: LRCTag[] = [];
  for (let i = 0; i < items.length; i++) {
    const item = items[i];
    if (item.type === "tag") {
      tagBuffer.push(item);
      continue;
    }
    if (item.text.length === 0) {
      continue;
    }

    const { text, line } = item;
    if (tagBuffer.length > 1 && tagBuffer.length === text.length) {
      for (let j = 0; j < text.length; j++) {
        const startTime = tagBuffer[j].time;
        const endTime = tagBuffer[j + 1]?.time ?? length ?? startTime;
        words.push({
          word: text[j],
          startTime,
          endTime,
          line
        });
      }
      tagBuffer = [];
      continue;
    }

    const prevTag = items
        .slice(0, i)
        .reverse()
        .find((item): item is LRCTag => item.type === "tag"),
      nextTag = items
        .slice(i + 1)
        .find((item): item is LRCTag => item.type === "tag"),
      startTime = prevTag?.time ?? nextTag?.time ?? 0,
      endTime = nextTag?.time ?? length ?? prevTag?.time ?? 0;
    words.push({ word: text, startTime, endTime, line });
    tagBuffer = [];
  }

  const maxLine = Math.max(...words.map((w) => w.line));
  const lines: ParsedWord[][] = Array.from({ length: maxLine + 1 }, () => []);
  for (const word of words) {
    lines[word.line].push(word);
  }
  return lines;
}
