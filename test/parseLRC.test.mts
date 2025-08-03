import assert from "node:assert/strict";
import test from "node:test";

import {
  parseLRC,
  parseTimeString,
  parseWords,
  stripMetaTags
} from "../dist/index.js";

const content = `[length: 0:09]
[ti:Test]
[ar:Artist Name]
[re:lrc-parser]
[ve:1.0.0]
[00:01.00]hello[00:02.00]world[00:03.00]

[00:04.00]this[00:05.00]is[00:06.00]an example[00:08.00]LRC file
`;

test("stripMetaTags removes meta tags and returns them as a record", () => {
  const { meta } = stripMetaTags(content);
  assert.deepEqual(meta, {
    length: " 0:09",
    ti: "Test",
    ar: "Artist Name",
    re: "lrc-parser",
    ve: "1.0.0"
  });
});

test("stripMetaTags and parseTimeString convert length to seconds", () => {
  const { meta } = stripMetaTags(content);
  assert.strictEqual(parseTimeString(meta.length), 9);
});

test("parseLRC parses LRC content correctly", () => {
  const { items } = parseLRC(content);
  assert.strictEqual(items.length, 13);
  assert.strictEqual(items.filter((item) => item.type === "tag").length, 7);
  assert.deepEqual(items.filter((item) => item.type === "text").length, 6);
});

test("parseWords parses LRC content correctly", () => {
  const parsed = parseLRC(content);
  const words = parseWords(
    parsed.items,
    parsed.meta.length ? parseTimeString(parsed.meta.length) : undefined
  );
  assert.strictEqual(words.length, 8);
  assert.deepStrictEqual(
    words.map((w) => w.length),
    [0, 0, 0, 0, 0, 2, 0, 4]
  );
  assert.strictEqual(words[5][0].word, "hello");
  assert.strictEqual(words[7][3].word, "LRC file");
  assert.strictEqual(words[5][0].startTime, 1.0);
  assert.strictEqual(words[7][3].endTime, 9.0);
});
