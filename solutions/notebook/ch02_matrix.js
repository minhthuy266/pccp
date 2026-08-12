function shapeOf(matrix) {
  const rows = matrix.length, cols = rows ? matrix[0].length : 0;
  if (matrix.some((row) => row.length !== cols)) throw new RangeError("Matrix must be rectangular");
  return [rows, cols];
}

function matrixTotals(matrix) {
  const [rows, cols] = shapeOf(matrix);
  const rowTotals = Array(rows).fill(0), columnTotals = Array(cols).fill(0);
  let total = 0;
  for (let row = 0; row < rows; row++) for (let col = 0; col < cols; col++) {
    total += matrix[row][col];
    rowTotals[row] += matrix[row][col];
    columnTotals[col] += matrix[row][col];
  }
  return { total, rowTotals, columnTotals };
}

function diagonalSums(matrix) {
  const [rows, cols] = shapeOf(matrix);
  if (rows !== cols) throw new RangeError("Diagonal template requires a square matrix");
  let main = 0, secondary = 0;
  for (let index = 0; index < rows; index++) {
    main += matrix[index][index];
    secondary += matrix[index][rows - 1 - index];
  }
  return { main, secondary };
}

function orthogonalNeighbors(matrix, row, col) {
  const [rows, cols] = shapeOf(matrix);
  const result = [];
  for (const [dr, dc] of [[-1, 0], [1, 0], [0, -1], [0, 1]]) {
    const nextRow = row + dr, nextCol = col + dc;
    if (nextRow >= 0 && nextRow < rows && nextCol >= 0 && nextCol < cols) result.push([nextRow, nextCol]);
  }
  return result;
}

function rotateClockwise(matrix) {
  const [rows, cols] = shapeOf(matrix);
  const output = Array.from({ length: cols }, () => Array(rows));
  for (let row = 0; row < rows; row++) for (let col = 0; col < cols; col++) {
    output[col][rows - 1 - row] = matrix[row][col];
  }
  return output;
}

function componentSize(grid, startRow, startCol) {
  const [rows, cols] = shapeOf(grid);
  if (startRow < 0 || startRow >= rows || startCol < 0 || startCol >= cols) return 0;
  const target = grid[startRow][startCol], visited = Array.from({ length: rows }, () => Array(cols).fill(false));
  const queue = [[startRow, startCol]];
  visited[startRow][startCol] = true;
  for (let head = 0; head < queue.length; head++) {
    const [row, col] = queue[head];
    for (const [dr, dc] of [[-1, 0], [1, 0], [0, -1], [0, 1]]) {
      const nextRow = row + dr, nextCol = col + dc;
      if (nextRow < 0 || nextRow >= rows || nextCol < 0 || nextCol >= cols) continue;
      if (visited[nextRow][nextCol] || grid[nextRow][nextCol] !== target) continue;
      visited[nextRow][nextCol] = true;
      queue.push([nextRow, nextCol]);
    }
  }
  return queue.length;
}

module.exports = { componentSize, diagonalSums, matrixTotals, orthogonalNeighbors, rotateClockwise };
