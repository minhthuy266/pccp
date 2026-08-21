const MAZE_DIRECTIONS = [[-1, 0], [1, 0], [0, -1], [0, 1]];

function mazeDistance(maps, start, targetCharacter) {
  const rows = maps.length;
  const columns = maps[0].length;
  const distance = Array.from({ length: rows }, () => new Int32Array(columns).fill(-1));
  const queue = [start];
  let head = 0;
  distance[start[0]][start[1]] = 0;

  while (head < queue.length) {
    const [row, column] = queue[head++];
    if (maps[row][column] === targetCharacter) {
      return { distance: distance[row][column], position: [row, column] };
    }

    for (const [deltaRow, deltaColumn] of MAZE_DIRECTIONS) {
      const nextRow = row + deltaRow;
      const nextColumn = column + deltaColumn;
      if (
        nextRow < 0 || nextRow >= rows ||
        nextColumn < 0 || nextColumn >= columns ||
        maps[nextRow][nextColumn] === "X" ||
        distance[nextRow][nextColumn] !== -1
      ) {
        continue;
      }
      distance[nextRow][nextColumn] = distance[row][column] + 1;
      queue.push([nextRow, nextColumn]);
    }
  }

  return null;
}

function mazeEscapeTime(maps) {
  let start = null;
  for (let row = 0; row < maps.length; row++) {
    const column = maps[row].indexOf("S");
    if (column !== -1) start = [row, column];
  }

  const toLever = mazeDistance(maps, start, "L");
  if (toLever === null) {
    return -1;
  }
  const toExit = mazeDistance(maps, toLever.position, "E");
  if (toExit === null) {
    return -1;
  }
  return toLever.distance + toExit.distance;
}

module.exports = { mazeDistance, mazeEscapeTime };
