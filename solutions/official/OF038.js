const GRID_DIRECTIONS = [[-1, 0], [1, 0], [0, -1], [0, 1]];

function shortestGameMapPath(maps) {
  const rows = maps.length;
  const columns = maps[0].length;
  const distance = Array.from({ length: rows }, () => new Int32Array(columns));
  const queue = [[0, 0]];
  let head = 0;
  distance[0][0] = 1;

  while (head < queue.length) {
    const [row, column] = queue[head++];
    if (row === rows - 1 && column === columns - 1) return distance[row][column];

    for (const [deltaRow, deltaColumn] of GRID_DIRECTIONS) {
      const nextRow = row + deltaRow;
      const nextColumn = column + deltaColumn;
      if (
        nextRow < 0 || nextRow >= rows ||
        nextColumn < 0 || nextColumn >= columns ||
        maps[nextRow][nextColumn] === 0 ||
        distance[nextRow][nextColumn] !== 0
      ) continue;

      distance[nextRow][nextColumn] = distance[row][column] + 1;
      queue.push([nextRow, nextColumn]);
    }
  }

  return -1;
}

module.exports = { shortestGameMapPath };
