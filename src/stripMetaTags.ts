const tagPattern = /\[([a-z]{2,}):([^\]]+)\]/g;

export function stripMetaTags(content: string) {
  const meta: Record<string, string> = {},
    cleaned: string[] = [];
  content.split(/\r?\n/).forEach((line) => {
    for (const match of line.matchAll(tagPattern)) {
      const [, key, value] = match;
      meta[key] = value;
    }
    cleaned.push(line.replace(tagPattern, "").trim());
  });
  return { meta, content: cleaned.join("\n") };
}
