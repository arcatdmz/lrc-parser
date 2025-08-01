export function stripMetaTags(content: string) {
  const meta: Record<string, string> = {},
    cleaned: string[] = [];
  content.split(/\r?\n/).forEach((line) => {
    const res = /^\[([a-z]{2,}):(.+)\]$/.exec(line);
    if (res) {
      meta[res[1]] = res[2];
    } else {
      cleaned.push(line);
    }
  });
  return { meta, content: cleaned.join("\n") };
}
