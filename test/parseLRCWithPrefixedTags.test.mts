import assert from "node:assert/strict";
import test from "node:test";

import { parseLRC, parseTimeString, parseWords } from "../dist/index.js";

const content = `[length: 0:03]
[ti:Test]
[ar:Artist Name]
[re:lrc-parser]
[ve:1.0.0]
[00:01.00][00:01.10][00:01.15][00:01.20][00:01.30]hello
[00:01.90][00:02.00][00:02.05][00:02.17][00:02.30][00:02.40]world!
`;

test("parseWords parses LRC content with prefixed tags correctly", () => {
  const parsed = parseLRC(content);
  const words = parseWords(
    parsed.items,
    parsed.meta.length ? parseTimeString(parsed.meta.length) : undefined
  );
  assert.strictEqual(words.length, 7);
  assert.deepStrictEqual(
    words.map((w) => w.length),
    [0, 0, 0, 0, 0, 5, 6]
  );
  assert.strictEqual(words[5][0].word, "h");
  assert.strictEqual(words[5][0].startTime, 1.0);
  assert.strictEqual(words[5][0].endTime, 1.1);
  assert.strictEqual(words[6][5].word, "!");
  assert.strictEqual(words[6][5].startTime, 2.4);
  assert.strictEqual(words[6][5].endTime, 3.0);
});
