// sum.js：对齐求和（同名相加，缺侧按零，再乘倍率）
import { mergeKeys } from "./merge.js";

function badScale(message) {
  const error = new Error(message);
  error.code = "E_BAD_SCALE";
  return error;
}

// 单表收成映射：同名后出现的覆盖前面的；数值必须是非负整数。
function collect(table) {
  const values = new Map();
  for (const item of table || []) {
    if (!Number.isInteger(item.value) || item.value < 0) {
      throw badScale("数值必须是非负整数：" + item.name);
    }
    values.set(item.name, item.value);
  }
  return values;
}

export function alignedSums(left, right, scale) {
  if (typeof scale !== "number" || !(scale >= 1)) {
    throw badScale("倍率必须大于等于一：" + scale);
  }
  const leftValues = collect(left);
  const rightValues = collect(right);
  const keys = mergeKeys(left, right);
  const totals = keys.map(function (name) {
    return ((leftValues.get(name) || 0) + (rightValues.get(name) || 0)) * scale;
  });
  return { keys: keys, totals: totals };
}
