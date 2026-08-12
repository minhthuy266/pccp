function buildPrefixSums(values) {
  const prefix = Array(values.length + 1).fill(0);
  for (let index = 0; index < values.length; index++) {
    prefix[index + 1] = prefix[index] + values[index];
  }
  return prefix;
}

function rangeSum(prefix, left, right) {
  return prefix[right + 1] - prefix[left];
}

function buildCountPrefix(values, predicate) {
  const prefix = Array(values.length + 1).fill(0);
  for (let index = 0; index < values.length; index++) {
    prefix[index + 1] = prefix[index] + (predicate(values[index]) ? 1 : 0);
  }
  return prefix;
}

function buildPrefix2D(matrix) {
  const rows = matrix.length;
  const columns = matrix[0]?.length ?? 0;
  const prefix = Array.from({ length: rows + 1 }, () => Array(columns + 1).fill(0));
  for (let row = 0; row < rows; row++) {
    for (let column = 0; column < columns; column++) {
      prefix[row + 1][column + 1] = matrix[row][column]
        + prefix[row][column + 1]
        + prefix[row + 1][column]
        - prefix[row][column];
    }
  }
  return prefix;
}

function rectangleSum(prefix, row1, column1, row2, column2) {
  return prefix[row2 + 1][column2 + 1]
    - prefix[row1][column2 + 1]
    - prefix[row2 + 1][column1]
    + prefix[row1][column1];
}

function applyRangeAdds(length, updates) {
  const diff = Array(length + 1).fill(0);
  for (const [left, right, delta] of updates) {
    diff[left] += delta;
    diff[right + 1] -= delta;
  }
  const result = Array(length);
  let running = 0;
  for (let index = 0; index < length; index++) {
    running += diff[index];
    result[index] = running;
  }
  return result;
}

function countTargetSubarrays(values, target) {
  const frequency = new Map([[0, 1]]);
  let prefix = 0;
  let answer = 0;
  for (const value of values) {
    prefix += value;
    answer += frequency.get(prefix - target) ?? 0;
    frequency.set(prefix, (frequency.get(prefix) ?? 0) + 1);
  }
  return answer;
}

function fixedWindowSums(values, width) {
  if (width <= 0 || width > values.length) return [];
  const output = [];
  let sum = 0;
  for (let right = 0; right < values.length; right++) {
    sum += values[right];
    if (right >= width) sum -= values[right - width];
    if (right >= width - 1) output.push(sum);
  }
  return output;
}

function longestAtMostKDistinct(values, limit) {
  if (limit < 1) return 0;
  const frequency = new Map();
  let left = 0;
  let best = 0;
  for (let right = 0; right < values.length; right++) {
    const incoming = values[right];
    frequency.set(incoming, (frequency.get(incoming) ?? 0) + 1);
    while (frequency.size > limit) {
      const outgoing = values[left++];
      const count = frequency.get(outgoing) - 1;
      if (count === 0) frequency.delete(outgoing);
      else frequency.set(outgoing, count);
    }
    best = Math.max(best, right - left + 1);
  }
  return best;
}

function minimumLengthAtLeast(values, target) {
  let left = 0;
  let sum = 0;
  let best = Infinity;
  for (let right = 0; right < values.length; right++) {
    sum += values[right];
    while (sum >= target) {
      best = Math.min(best, right - left + 1);
      sum -= values[left++];
    }
  }
  return best === Infinity ? 0 : best;
}

function countAtMostKDistinct(values, limit) {
  if (limit < 0) return 0;
  const frequency = new Map();
  let left = 0;
  let answer = 0;
  for (let right = 0; right < values.length; right++) {
    const incoming = values[right];
    frequency.set(incoming, (frequency.get(incoming) ?? 0) + 1);
    while (frequency.size > limit) {
      const outgoing = values[left++];
      const count = frequency.get(outgoing) - 1;
      if (count === 0) frequency.delete(outgoing);
      else frequency.set(outgoing, count);
    }
    answer += right - left + 1;
  }
  return answer;
}

function countExactlyKDistinct(values, limit) {
  return countAtMostKDistinct(values, limit) - countAtMostKDistinct(values, limit - 1);
}

function chooseRangeEngine({ fixedWidth, manyStaticQueries, hasNegative, exactSum }) {
  if (manyStaticQueries) return "PREFIX";
  if (exactSum && hasNegative) return "PREFIX_MAP";
  if (fixedWidth) return "FIXED_WINDOW";
  return "PROVE_MONOTONE_BEFORE_VARIABLE_WINDOW";
}

module.exports = {
  applyRangeAdds,
  buildCountPrefix,
  buildPrefix2D,
  buildPrefixSums,
  chooseRangeEngine,
  countAtMostKDistinct,
  countExactlyKDistinct,
  countTargetSubarrays,
  fixedWindowSums,
  longestAtMostKDistinct,
  minimumLengthAtLeast,
  rangeSum,
  rectangleSum,
};
