function minimumNumberTransforms(x, y, n) {
  if (x === y) {
    return 0;
  }

  const queue = [x];
  const distance = new Int32Array(y + 1);
  distance.fill(-1);
  distance[x] = 0;
  let head = 0;

  while (head < queue.length) {
    const current = queue[head];
    head += 1;
    const nextValues = [current + n, current * 2, current * 3];

    for (const next of nextValues) {
      if (next > y || distance[next] !== -1) {
        continue;
      }
      distance[next] = distance[current] + 1;
      if (next === y) {
        return distance[next];
      }
      queue.push(next);
    }
  }

  return -1;
}

module.exports = { minimumNumberTransforms };
