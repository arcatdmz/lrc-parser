import { ParsedChar } from "./ParsedChar";
import { LRCItem } from "./LRCItem";
import { LRCTag } from "./LRCTag";

export function parseChars(items: LRCItem[], length?: number): ParsedChar[][] {
  const chars: ParsedChar[] = [];
  for (let i = 0; i < items.length; i++) {
    const item = items[i];
    if (item.type !== "text" || item.text.length === 0) continue;

    const { text, line } = item,
      numChars = text.length,
      prevTag = items
        .slice(0, i)
        .reverse()
        .find((item): item is LRCTag => item.type === "tag"),
      nextTag = items
        .slice(i + 1)
        .find((item): item is LRCTag => item.type === "tag"),
      prevTagTime = prevTag?.time ?? nextTag?.time ?? 0,
      nextTagTime = nextTag?.time ?? length ?? prevTag?.time ?? 0,
      duration = nextTagTime - prevTagTime;
    for (let j = 0; j < numChars; j++) {
      const startTime =
          duration === 0
            ? prevTagTime
            : prevTagTime + (duration * j) / numChars,
        endTime =
          duration === 0
            ? nextTagTime
            : prevTagTime + (duration * (j + 1)) / numChars;
      chars.push({ char: text.charAt(j), startTime, endTime, line });
    }
  }

  const maxLine = Math.max(...chars.map((c) => c.line));
  const lines: ParsedChar[][] = Array.from({ length: maxLine + 1 }, () => []);
  for (const char of chars) {
    lines[char.line].push(char);
  }
  return lines;
}
