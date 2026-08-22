const SHAPE_DIRECTIONS = [[-1, 0], [1, 0], [0, -1], [0, 1]];

function normalizeShape(cells) {
  const minimumRow = Math.min(...cells.map(([row]) => row));
  const minimumColumn = Math.min(...cells.map(([, column]) => column));
  return cells
    .map(([row, column]) => [row - minimumRow, column - minimumColumn])
    .sort((a, b) => a[0] - b[0] || a[1] - b[1]);
}

function shapeKey(cells) {
  return normalizeShape(cells).map(([row, column]) => `${row}:${column}`).join("|");
}

function rotateShape(cells) {
  return normalizeShape(cells.map(([row, column]) => [column, -row]));
}

function extractComponents(board, target) {
  const rows = board.length;
  const columns = board[0].length;
  const visited = Array.from({ length: rows }, () => new Uint8Array(columns));
  const components = [];

  for (let startRow = 0; startRow < rows; startRow++) {
    for (let startColumn = 0; startColumn < columns; startColumn++) {
      if (visited[startRow][startColumn] || board[startRow][startColumn] !== target) continue;
      const queue = [[startRow, startColumn]];
      const cells = [];
      let head = 0;
      visited[startRow][startColumn] = 1;

      while (head < queue.length) {
        const [row, column] = queue[head];
        head += 1;
        cells.push([row, column]);
        for (const [deltaRow, deltaColumn] of SHAPE_DIRECTIONS) {
          const nextRow = row + deltaRow;
          const nextColumn = column + deltaColumn;
          if (
            nextRow < 0 || nextRow >= rows || nextColumn < 0 || nextColumn >= columns ||
            visited[nextRow][nextColumn] || board[nextRow][nextColumn] !== target
          ) continue;
          visited[nextRow][nextColumn] = 1;
          queue.push([nextRow, nextColumn]);
        }
      }
      components.push(normalizeShape(cells));
    }
  }
  return components;
}

function filledPuzzleCells(gameBoard, table) {
  const holes = extractComponents(gameBoard, 0);
  const pieces = extractComponents(table, 1);
  const used = Array(pieces.length).fill(false);
  let answer = 0;

  for (const hole of holes) {
    const holeKey = shapeKey(hole);
    for (let index = 0; index < pieces.length; index++) {
      if (used[index] || pieces[index].length !== hole.length) continue;
      let rotated = pieces[index];
      let matches = false;
      for (let turn = 0; turn < 4; turn++) {
        if (shapeKey(rotated) === holeKey) {
          matches = true;
          break;
        }
        rotated = rotateShape(rotated);
      }
      if (!matches) continue;
      used[index] = true;
      answer += hole.length;
      break;
    }
  }
  return answer;
}

module.exports = { normalizeShape, rotateShape, extractComponents, filledPuzzleCells };
