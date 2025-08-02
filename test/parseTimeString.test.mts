import assert from "node:assert/strict";
import test from "node:test";

import { parseLRC, parseTimeString, stripMetaTags } from "../dist/index.js";

const content = `[length: 0:09]
[ti:Test]
[ar:Artist Name]
[re:lrc-parser]
[ve:1.0.0]

[00:01.00]hello[00:02.00]world[00:03.00]
[00:04.00]this[00:05.00]is[00:06.00]an example[00:08.00]LRC file
`;

test("parseTimeString converts time strings to seconds", () => {
  assert.strictEqual(parseTimeString("01:02.03"), 62.03);
});

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
  assert.strictEqual(items.filter((item) => item.type === "text").length, 6);
});
