function sumValues(values) {
  let total = 0;
  for (const value of values) total += value;
  return total;
}

function indexOfMaximumFirst(values) {
  if (!values.length) return -1;
  let bestIndex = 0;
  for (let index = 1; index < values.length; index++) {
    if (values[index] > values[bestIndex]) bestIndex = index;
  }
  return bestIndex;
}

function countMatching(values, predicate) {
  let count = 0;
  for (let index = 0; index < values.length; index++) if (predicate(values[index], index)) count++;
  return count;
}

function everyMatching(values, predicate) {
  for (let index = 0; index < values.length; index++) if (!predicate(values[index], index)) return false;
  return true;
}

function filterMap(values, predicate, transform) {
  const result = [];
  for (let index = 0; index < values.length; index++) {
    if (predicate(values[index], index)) result.push(transform(values[index], index));
  }
  return result;
}

function maximumStrictlyToRight(values) {
  const result = Array(values.length);
  let maximum = null;
  for (let index = values.length - 1; index >= 0; index--) {
    result[index] = maximum;
    if (maximum === null || values[index] > maximum) maximum = values[index];
  }
  return result;
}

function longestRun(values, continues) {
  if (!values.length) return 0;
  let current = 1, best = 1;
  for (let index = 1; index < values.length; index++) {
    current = continues(values[index - 1], values[index]) ? current + 1 : 1;
    best = Math.max(best, current);
  }
  return best;
}

module.exports = { countMatching, everyMatching, filterMap, indexOfMaximumFirst, longestRun, maximumStrictlyToRight, sumValues };
