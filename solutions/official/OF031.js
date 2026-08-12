function minimumNExpressionCount(n, target) {
  const valuesByCount = Array.from({ length: 9 }, () => new Set());

  for (let count = 1; count <= 8; count++) {
    valuesByCount[count].add(Number(String(n).repeat(count)));

    for (let leftCount = 1; leftCount < count; leftCount++) {
      const rightCount = count - leftCount;
      for (const left of valuesByCount[leftCount]) {
        for (const right of valuesByCount[rightCount]) {
          valuesByCount[count].add(left + right);
          valuesByCount[count].add(left - right);
          valuesByCount[count].add(left * right);
          if (right !== 0) valuesByCount[count].add(Math.trunc(left / right));
        }
      }
    }

    if (valuesByCount[count].has(target)) return count;
  }

  return -1;
}

module.exports = { minimumNExpressionCount };
