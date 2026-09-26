// sum.js：对齐求和：同名值相加（缺侧按零），再乘倍率
import { mergeKeys } from "./merge.js";

function badScale(message) {
  const error = new Error(message);
  error.code = "E_BAD_SCALE";
  return error;
}

// 一次扫描收进映射：同名后值覆盖前值，同时校验非负整数。
function indexRows(rows) {
  const byName = new Map();
  for (const item of rows) {
    if (!Number.isInteger(item.value) || item.value < 0) {
      throw badScale("value of " + item.name + " must be a non-negative integer");
    }
    byName.set(item.name, item.value);
  }
  return byName;
}

export function alignedSums(left, right, scale) {
  if (typeof scale !== "number" || !Number.isFinite(scale) || scale < 1) {
    throw badScale("scale must be >= 1");
  }
  const leftByName = indexRows(left);
  const rightByName = indexRows(right);
  const keys = mergeKeys(left, right);
  const totals = keys.map((name) => {
    const sum = (leftByName.get(name) || 0) + (rightByName.get(name) || 0);
    return sum * scale;
  });
  return { keys: keys, totals: totals };
}
