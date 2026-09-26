// merge.js：合并键（两边取并集，按名字升序，不重复）
export function mergeKeys(left, right) {
  const seen = new Map();
  for (const item of left || []) {
    if (!seen.has(item.name)) seen.set(item.name, true);
  }
  for (const item of right || []) {
    if (!seen.has(item.name)) seen.set(item.name, true);
  }
  return Array.from(seen.keys()).sort();
}
