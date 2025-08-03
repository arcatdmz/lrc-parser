import assert from "node:assert/strict";
import test from "node:test";

import { parseTimeString } from "../dist/index.js";

test("parseTimeString converts time strings to seconds", () => {
  assert.strictEqual(parseTimeString("01:02.03"), 62.03);
});

test("parseTimeString supports time strings with milliseconds", () => {
  assert.strictEqual(parseTimeString("01:02.003"), 62.003);
});

test("parseTimeString supports time strings without milliseconds", () => {
  assert.strictEqual(parseTimeString("01:02"), 62);
});

test("parseTimeString is resillient to arbitrary white spaces before/after time strings", () => {
  assert.strictEqual(parseTimeString("   01:02.03\n"), 62.03);
});
