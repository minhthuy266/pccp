function maximumMinimumRockDistance(distance, rocks, removalsAllowed) {
  const positions = [...rocks].sort((a, b) => a - b);
  positions.push(distance);

  function feasible(minimumGap) {
    let removed = 0;
    let previous = 0;
    for (const position of positions) {
      if (position - previous < minimumGap) {
        removed += 1;
      } else {
        previous = position;
      }
    }
    return removed <= removalsAllowed;
  }

  let low = 0;
  let high = distance + 1;
  while (low < high) {
    const middle = low + Math.floor((high - low) / 2);
    if (feasible(middle)) {
      low = middle + 1;
    } else {
      high = middle;
    }
  }
  return low - 1;
}

module.exports = { maximumMinimumRockDistance };
