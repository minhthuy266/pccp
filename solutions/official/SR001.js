function addMatrices(first, second) {
  return first.map((row, rowIndex) =>
    row.map((value, columnIndex) => value + second[rowIndex][columnIndex]),
  );
}

module.exports = { addMatrices };
