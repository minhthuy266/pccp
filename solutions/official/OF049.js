const DIRECTION = {
  N: [-1, 0],
  S: [1, 0],
  W: [0, -1],
  E: [0, 1],
};

function parkWalk(park, routes) {
  const rows = park.length;
  const columns = park[0].length;
  let row = 0;
  let column = 0;

  for (let currentRow = 0; currentRow < rows; currentRow++) {
    const startColumn = park[currentRow].indexOf("S");
    if (startColumn !== -1) {
      row = currentRow;
      column = startColumn;
      break;
    }
  }

  for (const route of routes) {
    const [direction, rawDistance] = route.split(" ");
    const distance = Number(rawDistance);
    const [deltaRow, deltaColumn] = DIRECTION[direction];
    let candidateRow = row;
    let candidateColumn = column;
    let valid = true;

    for (let step = 0; step < distance; step++) {
      candidateRow += deltaRow;
      candidateColumn += deltaColumn;

      const outside =
        candidateRow < 0 ||
        candidateRow >= rows ||
        candidateColumn < 0 ||
        candidateColumn >= columns;

      if (outside || park[candidateRow][candidateColumn] === "X") {
        valid = false;
        break;
      }
    }

    if (valid) {
      row = candidateRow;
      column = candidateColumn;
    }
  }

  return [row, column];
}

module.exports = { parkWalk };
