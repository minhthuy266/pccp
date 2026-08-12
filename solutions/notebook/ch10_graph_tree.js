function buildAdjacency(vertexCount, edges, directed = false) {
  const graph = Array.from({ length: vertexCount }, () => []);
  for (const [from, to] of edges) {
    graph[from].push(to);
    if (!directed) graph[to].push(from);
  }
  return graph;
}

function countGridComponents(grid) {
  const rows = grid.length;
  const columns = grid[0]?.length ?? 0;
  const seen = Array.from({ length: rows }, () => Array(columns).fill(false));
  const directions = [[1, 0], [-1, 0], [0, 1], [0, -1]];
  let count = 0;
  for (let row = 0; row < rows; row++) {
    for (let column = 0; column < columns; column++) {
      if (grid[row][column] !== 1 || seen[row][column]) continue;
      count++;
      const stack = [[row, column]];
      seen[row][column] = true;
      while (stack.length > 0) {
        const [currentRow, currentColumn] = stack.pop();
        for (const [deltaRow, deltaColumn] of directions) {
          const nextRow = currentRow + deltaRow;
          const nextColumn = currentColumn + deltaColumn;
          if (
            nextRow < 0 || nextRow >= rows || nextColumn < 0 || nextColumn >= columns ||
            seen[nextRow][nextColumn] || grid[nextRow][nextColumn] !== 1
          ) continue;
          seen[nextRow][nextColumn] = true;
          stack.push([nextRow, nextColumn]);
        }
      }
    }
  }
  return count;
}

function shortestUnweighted(graph, source, target) {
  const distance = Array(graph.length).fill(-1);
  const queue = [source];
  let head = 0;
  distance[source] = 0;
  while (head < queue.length) {
    const node = queue[head++];
    if (node === target) return distance[node];
    for (const next of graph[node]) {
      if (distance[next] !== -1) continue;
      distance[next] = distance[node] + 1;
      queue.push(next);
    }
  }
  return -1;
}

function multiSourceDistances(graph, sources) {
  const distance = Array(graph.length).fill(-1);
  const queue = [];
  let head = 0;
  for (const source of sources) {
    if (distance[source] !== -1) continue;
    distance[source] = 0;
    queue.push(source);
  }
  while (head < queue.length) {
    const node = queue[head++];
    for (const next of graph[node]) {
      if (distance[next] !== -1) continue;
      distance[next] = distance[node] + 1;
      queue.push(next);
    }
  }
  return distance;
}

function iterativeDfs(graph, source) {
  const order = [];
  const stack = [source];
  const seen = Array(graph.length).fill(false);
  seen[source] = true;
  while (stack.length > 0) {
    const node = stack.pop();
    order.push(node);
    for (let index = graph[node].length - 1; index >= 0; index--) {
      const next = graph[node][index];
      if (seen[next]) continue;
      seen[next] = true;
      stack.push(next);
    }
  }
  return order;
}

function shortestPathWithOneBreak(grid) {
  const rows = grid.length;
  const columns = grid[0]?.length ?? 0;
  if (rows === 0 || columns === 0) return -1;
  const distance = Array.from({ length: rows }, () =>
    Array.from({ length: columns }, () => [-1, -1]));
  const queue = [[0, 0, 0]];
  const directions = [[1, 0], [-1, 0], [0, 1], [0, -1]];
  let head = 0;
  distance[0][0][0] = 0;
  while (head < queue.length) {
    const [row, column, usedBreak] = queue[head++];
    if (row === rows - 1 && column === columns - 1) return distance[row][column][usedBreak];
    for (const [deltaRow, deltaColumn] of directions) {
      const nextRow = row + deltaRow;
      const nextColumn = column + deltaColumn;
      if (nextRow < 0 || nextRow >= rows || nextColumn < 0 || nextColumn >= columns) continue;
      const nextUsedBreak = usedBreak + grid[nextRow][nextColumn];
      if (nextUsedBreak > 1 || distance[nextRow][nextColumn][nextUsedBreak] !== -1) continue;
      distance[nextRow][nextColumn][nextUsedBreak] = distance[row][column][usedBreak] + 1;
      queue.push([nextRow, nextColumn, nextUsedBreak]);
    }
  }
  return -1;
}

function subtreeSizes(tree, root = 0) {
  const parent = Array(tree.length).fill(-1);
  const order = [root];
  for (let index = 0; index < order.length; index++) {
    const node = order[index];
    for (const next of tree[node]) {
      if (next === parent[node]) continue;
      parent[next] = node;
      order.push(next);
    }
  }
  const size = Array(tree.length).fill(1);
  for (let index = order.length - 1; index > 0; index--) {
    size[parent[order[index]]] += size[order[index]];
  }
  return { parent, size };
}

function propagateToRoot(start, value, parent, earnings) {
  let current = start;
  let amount = value;
  while (current !== "-" && amount > 0) {
    const upward = Math.floor(amount / 10);
    earnings.set(current, earnings.get(current) + amount - upward);
    current = parent.get(current);
    amount = upward;
  }
}

module.exports = {
  buildAdjacency,
  countGridComponents,
  iterativeDfs,
  multiSourceDistances,
  propagateToRoot,
  shortestPathWithOneBreak,
  shortestUnweighted,
  subtreeSizes,
};
