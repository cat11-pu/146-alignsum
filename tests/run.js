import assert from "node:assert";
import { mergeKeys } from "../merge.js";
import { alignedSums } from "../sum.js";
import { render } from "../app.js";

let failed = 0;
function check(name, fn) {
  try { fn(); console.log("ok " + name); } catch (e) { failed += 1; console.log("FAIL " + name + " :: " + e.message); }
}

check("mergeKeys returns a list", () => {
  assert.ok(Array.isArray(mergeKeys([{ name: "a", value: 1 }], [])));
});

check("alignedSums returns keys", () => {
  assert.ok(Array.isArray(alignedSums([{ name: "a", value: 1 }], [], 1).keys));
});

check("alignedSums returns totals", () => {
  assert.ok(Array.isArray(alignedSums([{ name: "a", value: 1 }], [], 1).totals));
});

check("render counts keys", () => {
  assert.strictEqual(typeof render({ left: [{ name: "a", value: 1 }], right: [], scale: 1 }).count, "number");
});

check("render exposes grand total", () => {
  assert.strictEqual(typeof render({ left: [{ name: "a", value: 1 }], right: [], scale: 1 }).grand, "number");
});

console.log("5 cases, " + failed + " failed");
process.exit(failed === 0 ? 0 : 1);
