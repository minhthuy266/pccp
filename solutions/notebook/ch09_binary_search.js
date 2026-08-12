function exactBinarySearch(values, target) {
  let low = 0;
  let high = values.length - 1;
  while (low <= high) {
    const middle = low + Math.floor((high - low) / 2);
    if (values[middle] === target) return middle;
    if (values[middle] < target) low = middle + 1;
    else high = middle - 1;
  }
  return -1;
}

function lowerBound(values, target) {
  let low = 0;
  let high = values.length;
  while (low < high) {
    const middle = low + Math.floor((high - low) / 2);
    if (values[middle] >= target) high = middle;
    else low = middle + 1;
  }
  return low;
}

function upperBound(values, target) {
  let low = 0;
  let high = values.length;
  while (low < high) {
    const middle = low + Math.floor((high - low) / 2);
    if (values[middle] > target) high = middle;
    else low = middle + 1;
  }
  return low;
}

function firstTrue(low, high, predicate) {
  while (low < high) {
    const middle = low + Math.floor((high - low) / 2);
    if (predicate(middle)) high = middle;
    else low = middle + 1;
  }
  return low;
}

function lastTrue(low, high, predicate) {
  while (low < high) {
    const middle = low + Math.floor((high - low + 1) / 2);
    if (predicate(middle)) low = middle;
    else high = middle - 1;
  }
  return low;
}

function firstTrueBigInt(low, high, predicate) {
  while (low < high) {
    const middle = low + (high - low) / 2n;
    if (predicate(middle)) high = middle;
    else low = middle + 1n;
  }
  return low;
}

function minimumProcessingTime(targetCount, processingTimes) {
  const target = BigInt(targetCount);
  const times = processingTimes.map(BigInt);
  const fastest = times.reduce((minimum, time) => time < minimum ? time : minimum);
  return firstTrueBigInt(0n, fastest * target, (candidate) => {
    let processed = 0n;
    for (const time of times) {
      processed += candidate / time;
      if (processed >= target) return true;
    }
    return false;
  });
}

function maximumMinimumDistance(distance, rocks, removableCount) {
  const positions = [...rocks, distance].sort((a, b) => a - b);
  return lastTrue(0, distance, (minimumGap) => {
    let removed = 0;
    let previous = 0;
    for (const position of positions) {
      if (position - previous < minimumGap) removed++;
      else previous = position;
    }
    return removed <= removableCount;
  });
}

module.exports = {
  exactBinarySearch,
  firstTrue,
  firstTrueBigInt,
  lastTrue,
  lowerBound,
  maximumMinimumDistance,
  minimumProcessingTime,
  upperBound,
};
