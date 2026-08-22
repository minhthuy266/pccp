function shortestGemShoppingRange(gems) {
  const requiredKinds = new Set(gems).size;
  const countByGem = new Map();
  let left = 0;
  let bestLeft = 0;
  let bestRight = gems.length - 1;

  for (let right = 0; right < gems.length; right++) {
    const entering = gems[right];
    countByGem.set(entering, (countByGem.get(entering) ?? 0) + 1);

    while (countByGem.size === requiredKinds) {
      if (right - left < bestRight - bestLeft) {
        bestLeft = left;
        bestRight = right;
      }

      const leaving = gems[left];
      left += 1;
      const remaining = countByGem.get(leaving) - 1;
      if (remaining === 0) countByGem.delete(leaving);
      else countByGem.set(leaving, remaining);
    }
  }

  return [bestLeft + 1, bestRight + 1];
}

module.exports = { shortestGemShoppingRange };
