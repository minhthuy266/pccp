function pairSumSorted(values, target) {
  let left = 0, right = values.length - 1;
  while (left < right) {
    const sum = values[left] + values[right];
    if (sum === target) return [left, right];
    if (sum < target) left++; else right--;
  }
  return null;
}

function compactInPlace(values, keep) {
  let write = 0;
  for (let read = 0; read < values.length; read++) if (keep(values[read])) values[write++] = values[read];
  values.length = write;
  return values;
}

function dedupeSortedInPlace(values) {
  if (!values.length) return values;
  let write = 1;
  for (let read = 1; read < values.length; read++) if (values[read] !== values[write - 1]) values[write++] = values[read];
  values.length = write;
  return values;
}

function mergeSorted(first, second) {
  const result = []; let i = 0, j = 0;
  while (i < first.length && j < second.length) result.push(first[i] <= second[j] ? first[i++] : second[j++]);
  while (i < first.length) result.push(first[i++]);
  while (j < second.length) result.push(second[j++]);
  return result;
}

function threeSumUnique(values, target = 0) {
  const sorted = [...values].sort((a, b) => a - b), result = [];
  for (let fixed = 0; fixed < sorted.length - 2; fixed++) {
    if (fixed > 0 && sorted[fixed] === sorted[fixed - 1]) continue;
    let left = fixed + 1, right = sorted.length - 1;
    while (left < right) {
      const sum = sorted[fixed] + sorted[left] + sorted[right];
      if (sum < target) left++;
      else if (sum > target) right--;
      else {
        result.push([sorted[fixed], sorted[left], sorted[right]]); left++; right--;
        while (left < right && sorted[left] === sorted[left - 1]) left++;
        while (left < right && sorted[right] === sorted[right + 1]) right--;
      }
    }
  }
  return result;
}

function partitionInPlace(values, belongsLeft) {
  let left = 0, right = values.length - 1;
  while (left <= right) {
    while (left <= right && belongsLeft(values[left])) left++;
    while (left <= right && !belongsLeft(values[right])) right--;
    if (left < right) { [values[left], values[right]] = [values[right], values[left]]; left++; right--; }
  }
  return left;
}

module.exports = { compactInPlace, dedupeSortedInPlace, mergeSorted, pairSumSorted, partitionInPlace, threeSumUnique };
