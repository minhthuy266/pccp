class DistanceMinHeap {
  constructor() {
    this.values = [];
  }
  get size() {
    return this.values.length;
  }
  push(entry) {
    const heap = this.values;
    heap.push(entry);
    let child = heap.length - 1;
    while (child > 0) {
      const parent = Math.floor((child - 1) / 2);
      if (heap[parent][0] <= heap[child][0]) break;
      [heap[parent], heap[child]] = [heap[child], heap[parent]];
      child = parent;
    }
  }
  pop() {
    const heap = this.values;
    if (heap.length === 1) return heap.pop();
    const minimum = heap[0];
    heap[0] = heap.pop();
    let parent = 0;
    while (true) {
      const left = parent * 2 + 1;
      const right = left + 1;
      let smallest = parent;
      if (left < heap.length && heap[left][0] < heap[smallest][0]) smallest = left;
      if (right < heap.length && heap[right][0] < heap[smallest][0]) smallest = right;
      if (smallest === parent) break;
      [heap[parent], heap[smallest]] = [heap[smallest], heap[parent]];
      parent = smallest;
    }
    return minimum;
  }
}

function deliverableVillageCount(n, roads, limit) {
  const adjacency = Array.from({ length: n + 1 }, () => []);
  for (const [from, to, cost] of roads) {
    adjacency[from].push([to, cost]);
    adjacency[to].push([from, cost]);
  }

  const distance = Array(n + 1).fill(Infinity);
  distance[1] = 0;
  const heap = new DistanceMinHeap();
  heap.push([0, 1]);

  while (heap.size > 0) {
    const [currentDistance, node] = heap.pop();
    if (currentDistance !== distance[node]) continue;

    for (const [neighbor, edgeCost] of adjacency[node]) {
      const candidate = currentDistance + edgeCost;
      if (candidate >= distance[neighbor]) continue;
      distance[neighbor] = candidate;
      heap.push([candidate, neighbor]);
    }
  }

  return distance.slice(1).filter((value) => value <= limit).length;
}

module.exports = { DistanceMinHeap, deliverableVillageCount };
