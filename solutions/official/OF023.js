function minimumPowerGridDifference(n, wires) {
  const adjacency = Array.from({ length: n + 1 }, () => []);
  for (const [from, to] of wires) {
    adjacency[from].push(to);
    adjacency[to].push(from);
  }

  let best = Infinity;

  for (const [cutFrom, cutTo] of wires) {
    const visited = Array(n + 1).fill(false);
    const stack = [1];
    visited[1] = true;
    let componentSize = 0;

    while (stack.length > 0) {
      const node = stack.pop();
      componentSize++;

      for (const neighbor of adjacency[node]) {
        const isCutEdge =
          (node === cutFrom && neighbor === cutTo) ||
          (node === cutTo && neighbor === cutFrom);
        if (isCutEdge || visited[neighbor]) continue;
        visited[neighbor] = true;
        stack.push(neighbor);
      }
    }

    best = Math.min(best, Math.abs(n - 2 * componentSize));
  }

  return best;
}

module.exports = { minimumPowerGridDifference };
