function intactBuildingCount(board, skills) {
  const rows = board.length;
  const columns = board[0].length;
  const difference = Array.from({ length: rows + 1 }, () => new Int32Array(columns + 1));

  for (const [type, row1, column1, row2, column2, degree] of skills) {
    const delta = type === 1 ? -degree : degree;
    difference[row1][column1] += delta;
    difference[row1][column2 + 1] -= delta;
    difference[row2 + 1][column1] -= delta;
    difference[row2 + 1][column2 + 1] += delta;
  }

  for (let row = 0; row <= rows; row++) {
    for (let column = 1; column <= columns; column++) {
      difference[row][column] += difference[row][column - 1];
    }
  }
  for (let column = 0; column <= columns; column++) {
    for (let row = 1; row <= rows; row++) {
      difference[row][column] += difference[row - 1][column];
    }
  }

  let answer = 0;
  for (let row = 0; row < rows; row++) {
    for (let column = 0; column < columns; column++) {
      if (board[row][column] + difference[row][column] > 0) answer++;
    }
  }
  return answer;
}

module.exports = { intactBuildingCount };
