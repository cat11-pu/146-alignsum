// app.js：渲染结果
import { mergeKeys } from "./merge.js";
import { alignedSums } from "./sum.js";

export function render(spec) {
  const left = spec.left || [];
  const right = spec.right || [];
  const scale = spec.scale || 1;
  const view = alignedSums(left, right, scale);
  const keys = view.keys || [];
  const totals = view.totals || [];
  const leftNames = new Set(left.map((item) => item.name));
  const rightNames = new Set(right.map((item) => item.name));
  const onlyOne = keys.filter((name) => !leftNames.has(name) || !rightNames.has(name)).length;
  return { keys: keys, totals: totals, count: keys.length,
           grand: totals.reduce((sum, item) => sum + item, 0), only_one: onlyOne };
}
