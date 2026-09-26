// merge.js：合并键（基线：只取左表的键）
export function mergeKeys(left, right) {
  return left.map((item) => item.name);
}
