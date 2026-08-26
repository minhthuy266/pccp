const ROOM_DIRECTIONS = [[0, 1], [1, 1], [1, 0], [1, -1], [0, -1], [-1, -1], [-1, 0], [-1, 1]];

function roomCount(arrows) {
  let x = 0;
  let y = 0;
  let rooms = 0;
  const visitedNodes = new Set(["0,0"]);
  const visitedEdges = new Set();

  for (const direction of arrows) {
    const [deltaX, deltaY] = ROOM_DIRECTIONS[direction];
    for (let halfStep = 0; halfStep < 2; halfStep++) {
      const nextX = x + deltaX;
      const nextY = y + deltaY;
      const currentKey = `${x},${y}`;
      const nextKey = `${nextX},${nextY}`;
      const edgeKey = currentKey < nextKey
        ? `${currentKey}|${nextKey}`
        : `${nextKey}|${currentKey}`;

      if (visitedNodes.has(nextKey) && !visitedEdges.has(edgeKey)) {
        rooms += 1;
      }
      visitedNodes.add(nextKey);
      visitedEdges.add(edgeKey);
      x = nextX;
      y = nextY;
    }
  }
  return rooms;
}

module.exports = { roomCount };
