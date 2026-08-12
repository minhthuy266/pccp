function networkCount(n, computers) {
  const visited = Array(n).fill(false);
  let networks = 0;

  for (let start = 0; start < n; start++) {
    if (visited[start]) continue;
    networks++;
    visited[start] = true;
    const stack = [start];

    while (stack.length > 0) {
      const node = stack.pop();
      for (let neighbor = 0; neighbor < n; neighbor++) {
        if (computers[node][neighbor] === 0 || visited[neighbor]) continue;
        visited[neighbor] = true;
        stack.push(neighbor);
      }
    }
  }

  return networks;
}

module.exports = { networkCount };
