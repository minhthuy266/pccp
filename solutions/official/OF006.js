function removeConsecutiveDuplicates(array) {
  const reduced = [];
  for (const value of array) {
    if (reduced.length === 0 || reduced.at(-1) !== value) reduced.push(value);
  }
  return reduced;
}

module.exports = { removeConsecutiveDuplicates };
