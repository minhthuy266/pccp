function numericSorted(values, descending = false) {
  return [...values].sort((a, b) => descending ? b - a : a - b);
}

function sortRecords(records) {
  return [...records].sort((a, b) => b.score - a.score || a.time - b.time || a.id.localeCompare(b.id));
}

function sortWithOriginalIndex(values) {
  return values.map((value, index) => ({ value, index })).sort((a, b) => a.value - b.value || a.index - b.index);
}

function minimumAdjacentDifference(values) {
  if (values.length < 2) return null;
  const sorted = numericSorted(values); let best = Infinity;
  for (let index = 1; index < sorted.length; index++) best = Math.min(best, sorted[index] - sorted[index - 1]);
  return best;
}

function compressCoordinates(values) {
  const unique = [...new Set(values)].sort((a, b) => a - b);
  const rank = new Map(unique.map((value, index) => [value, index]));
  return values.map((value) => rank.get(value));
}

module.exports = { compressCoordinates, minimumAdjacentDifference, numericSorted, sortRecords, sortWithOriginalIndex };
