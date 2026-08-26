function addMatrices(first, second) {
  const result = [];

  for (let row = 0; row < first.length; row++) {
    const resultRow = [];

    for (let column = 0; column < first[row].length; column++) {
      const cellSum = first[row][column] + second[row][column];
      resultRow.push(cellSum);
    }

    result.push(resultRow);
  }

  return result;
}

module.exports = { addMatrices };
