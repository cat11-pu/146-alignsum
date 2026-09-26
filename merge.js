// merge.js：合并两边的键：取并集、去重，按名字升序返回
export function mergeKeys(left, right) {
  const names = new Set();
  for (const item of left) names.add(item.name);
  for (const item of right) names.add(item.name);
  return Array.from(names).sort();
}
