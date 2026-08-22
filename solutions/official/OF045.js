function farthestNodeCount(n, edges) {
  const adjacency = Array.from({ length: n + 1 }, () => []);
  for (const [from, to] of edges) {
    adjacency[from].push(to);
    adjacency[to].push(from);
  }

  const distance = new Int32Array(n + 1);
  distance.fill(-1);
  const queue = [1];
  let head = 0;
  distance[1] = 0;

  while (head < queue.length) {
    const node = queue[head];
    head += 1;
    for (const neighbor of adjacency[node]) {
      if (distance[neighbor] !== -1) {
        continue;
      }
      distance[neighbor] = distance[node] + 1;
      queue.push(neighbor);
    }
  }

  let maximumDistance = 0;
  let count = 0;
  for (let node = 1; node <= n; node++) {
    if (distance[node] > maximumDistance) {
      maximumDistance = distance[node];
      count = 1;
    } else if (distance[node] === maximumDistance) {
      count += 1;
    }
  }
  return count;
}

module.exports = { farthestNodeCount };
