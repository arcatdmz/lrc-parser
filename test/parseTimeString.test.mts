import test from "node:test";
import assert from "node:assert/strict";

import { parseTimeString } from "../dist/index.js";

test("parseTimeString converts time strings to seconds", () => {
  assert.strictEqual(parseTimeString("01:02.03"), 62.03);
});
