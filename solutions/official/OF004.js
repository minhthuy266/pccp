function clothingCombinations(clothes) {
  const countByCategory = new Map();

  for (const [, category] of clothes) {
    countByCategory.set(category, (countByCategory.get(category) ?? 0) + 1);
  }

  let combinationsIncludingEmpty = 1;
  for (const itemCount of countByCategory.values()) {
    combinationsIncludingEmpty *= itemCount + 1;
  }

  return combinationsIncludingEmpty - 1;
}

module.exports = { clothingCombinations };
