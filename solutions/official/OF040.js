const BORDER_DIRECTIONS = [[-1, 0], [1, 0], [0, -1], [0, 1]];

function itemPickupDistance(rectangles, characterX, characterY, itemX, itemY) {
  const SIZE = 102;
  const board = Array.from({ length: SIZE }, () => new Uint8Array(SIZE));

  for (const [x1, y1, x2, y2] of rectangles) {
    for (let row = y1 * 2; row <= y2 * 2; row++) {
      for (let column = x1 * 2; column <= x2 * 2; column++) {
        board[row][column] = 1;
      }
    }
  }
  for (const [x1, y1, x2, y2] of rectangles) {
    for (let row = y1 * 2 + 1; row < y2 * 2; row++) {
      for (let column = x1 * 2 + 1; column < x2 * 2; column++) {
        board[row][column] = 0;
      }
    }
  }

  const start = [characterY * 2, characterX * 2];
  const targetRow = itemY * 2;
  const targetColumn = itemX * 2;
  const distance = Array.from({ length: SIZE }, () => new Int16Array(SIZE).fill(-1));
  const queue = [start];
  let head = 0;
  distance[start[0]][start[1]] = 0;

  while (head < queue.length) {
    const [row, column] = queue[head++];
    if (row === targetRow && column === targetColumn) {
      return distance[row][column] / 2;
    }
    for (const [deltaRow, deltaColumn] of BORDER_DIRECTIONS) {
      const nextRow = row + deltaRow;
      const nextColumn = column + deltaColumn;
      if (
        nextRow < 0 || nextRow >= SIZE || nextColumn < 0 || nextColumn >= SIZE ||
        board[nextRow][nextColumn] !== 1 || distance[nextRow][nextColumn] !== -1
      ) {
        continue;
      }
      distance[nextRow][nextColumn] = distance[row][column] + 1;
      queue.push([nextRow, nextColumn]);
    }
  }
  return -1;
}

module.exports = { itemPickupDistance };
