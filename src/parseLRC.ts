import { LRCItem } from "./LRCItem";
import { parseTimeString } from "./parseTimeString";
import { stripMetaTags } from "./stripMetaTags";
import { timeTagRegex } from "./timeTagRegex";

export function parseLRC(content: string): {
  meta: Record<string, string>;
  items: LRCItem[];
} {
  const { meta, content: cleanedContent } = stripMetaTags(content);
  const items: LRCItem[] = [];
  let offset = 0,
    ln = 0;
  for (const line of cleanedContent.split(/\r?\n/)) {
    const parts = line.split(timeTagRegex);
    const tags = [...line.matchAll(timeTagRegex)].map((m) => m[0]);

    for (let i = 0; i < parts.length; i++) {
      const text = parts[i];
      if (text) {
        items.push({ type: "text", text, offset, line: ln });
        offset += text.length;
      }
      if (i < tags.length) {
        const timeString = tags[i].slice(1, -1);
        items.push({
          type: "tag",
          time: parseTimeString(timeString),
          line: ln
        });
      }
    }
    offset++;
    ln++;
  }
  return { meta, items };
}
