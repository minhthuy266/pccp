function maxPokemonKinds(nums) {
  const selectableCount = nums.length / 2;
  const distinctKindCount = new Set(nums).size;
  return Math.min(selectableCount, distinctKindCount);
}

module.exports = { maxPokemonKinds };
