function hasDuplicate(values) {
  const seen = new Set();
  for (const value of values) { if (seen.has(value)) return true; seen.add(value); }
  return false;
}

function uniquePreserveOrder(values) {
  const seen = new Set(), result = [];
  for (const value of values) if (!seen.has(value)) { seen.add(value); result.push(value); }
  return result;
}

function frequencyMap(values) {
  const count = new Map();
  for (const value of values) count.set(value, (count.get(value) ?? 0) + 1);
  return count;
}

function firstIndices(values) {
  const first = new Map();
  for (let index = 0; index < values.length; index++) if (!first.has(values[index])) first.set(values[index], index);
  return first;
}

function previousIndices(values) {
  const last = new Map(), result = [];
  for (let index = 0; index < values.length; index++) { result.push(last.get(values[index]) ?? -1); last.set(values[index], index); }
  return result;
}

function distancesToPrevious(values) {
  const previous = previousIndices(values);
  return previous.map((index, current) => index === -1 ? -1 : current - index);
}

function twoSumIndices(values, target) {
  const indexByValue = new Map();
  for (let index = 0; index < values.length; index++) {
    const complement = target - values[index];
    if (indexByValue.has(complement)) return [indexByValue.get(complement), index];
    if (!indexByValue.has(values[index])) indexByValue.set(values[index], index);
  }
  return null;
}

function sameMultiset(first, second) {
  if (first.length !== second.length) return false;
  const count = frequencyMap(first);
  for (const value of second) {
    const next = (count.get(value) ?? 0) - 1;
    if (next < 0) return false;
    if (next === 0) count.delete(value); else count.set(value, next);
  }
  return count.size === 0;
}

function groupBy(values, keyOf) {
  const groups = new Map();
  for (const value of values) { const key=keyOf(value); if (!groups.has(key)) groups.set(key, []); groups.get(key).push(value); }
  return groups;
}

function relationMap(pairs) {
  const relation = new Map();
  for (const [key, value] of pairs) { if (!relation.has(key)) relation.set(key, new Set()); relation.get(key).add(value); }
  return relation;
}

function keyWithMaximumValue(entries) {
  let answer = null, best = -Infinity;
  for (const [key, value] of entries) if (value > best || (value === best && String(key) < String(answer))) { answer = key; best = value; }
  return answer;
}

function simulateBalances(events) {
  const balance = new Map();
  for (const [id, delta] of events) balance.set(id, (balance.get(id) ?? 0) + delta);
  return balance;
}

function longestAtMostKDistinct(values, k) {
  if (k < 0) return 0;
  const count = new Map(); let left = 0, best = 0;
  for (let right = 0; right < values.length; right++) {
    count.set(values[right], (count.get(values[right]) ?? 0) + 1);
    while (count.size > k) { const value=values[left++], next=count.get(value)-1; if (next===0) count.delete(value); else count.set(value,next); }
    best = Math.max(best, right - left + 1);
  }
  return best;
}

function buildStateIndexes(records) {
  const byId = new Map(), idsByGroup = new Map();
  for (const record of records) {
    byId.set(record.id, record);
    if (!idsByGroup.has(record.group)) idsByGroup.set(record.group, new Set());
    idsByGroup.get(record.group).add(record.id);
  }
  return { byId, idsByGroup };
}

module.exports = { buildStateIndexes, distancesToPrevious, firstIndices, frequencyMap, groupBy, hasDuplicate, keyWithMaximumValue, longestAtMostKDistinct, previousIndices, relationMap, sameMultiset, simulateBalances, twoSumIndices, uniquePreserveOrder };
