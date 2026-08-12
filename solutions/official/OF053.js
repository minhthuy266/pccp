function shortestSubsequenceWithSum(sequence, target) {
  let left = 0;
  let sum = 0;
  let bestStart = 0;
  let bestEnd = sequence.length - 1;
  let bestLength = Infinity;

  for (let right = 0; right < sequence.length; right++) {
    sum += sequence[right];

    while (sum > target && left <= right) {
      sum -= sequence[left];
      left++;
    }

    if (sum === target) {
      const length = right - left + 1;
      if (length < bestLength) {
        bestLength = length;
        bestStart = left;
        bestEnd = right;
      }
    }
  }

  return [bestStart, bestEnd];
}

module.exports = { shortestSubsequenceWithSum };
