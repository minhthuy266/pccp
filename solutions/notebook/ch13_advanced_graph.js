class MinHeap {
  constructor(compare = (a, b) => a - b) { this.data = []; this.compare = compare; }
  size() { return this.data.length; }
  push(value) {
    this.data.push(value);
    for (let child = this.data.length - 1; child > 0;) {
      const parent = Math.floor((child - 1) / 2);
      if (this.compare(this.data[parent], this.data[child]) <= 0) break;
      [this.data[parent], this.data[child]] = [this.data[child], this.data[parent]];
      child = parent;
    }
  }
  pop() {
    if (!this.data.length) return undefined;
    const root = this.data[0], last = this.data.pop();
    if (this.data.length) {
      this.data[0] = last;
      for (let parent = 0;;) {
        let best = parent;
        const left = parent * 2 + 1, right = left + 1;
        if (left < this.data.length && this.compare(this.data[left], this.data[best]) < 0) best = left;
        if (right < this.data.length && this.compare(this.data[right], this.data[best]) < 0) best = right;
        if (best === parent) break;
        [this.data[parent], this.data[best]] = [this.data[best], this.data[parent]];
        parent = best;
      }
    }
    return root;
  }
}

function dijkstra(adjacency, source) {
  if (!Number.isInteger(source) || source < 0 || source >= adjacency.length) throw new RangeError("Invalid source");
  for (const edges of adjacency) for (const [, weight] of edges) {
    if (weight < 0) throw new RangeError("Dijkstra requires non-negative weights");
  }
  const distance = Array(adjacency.length).fill(Infinity);
  const heap = new MinHeap((a, b) => a[0] - b[0]);
  distance[source] = 0;
  heap.push([0, source]);
  while (heap.size()) {
    const [cost, node] = heap.pop();
    if (cost !== distance[node]) continue;
    for (const [next, weight] of adjacency[node]) {
      const candidate = cost + weight;
      if (candidate >= distance[next]) continue;
      distance[next] = candidate;
      heap.push([candidate, next]);
    }
  }
  return distance;
}

class DisjointSet {
  constructor(size) {
    this.parent = Array.from({ length: size }, (_, index) => index);
    this.size = Array(size).fill(1);
  }
  find(node) {
    if (this.parent[node] !== node) this.parent[node] = this.find(this.parent[node]);
    return this.parent[node];
  }
  union(first, second) {
    let a = this.find(first), b = this.find(second);
    if (a === b) return false;
    if (this.size[a] < this.size[b]) [a, b] = [b, a];
    this.parent[b] = a;
    this.size[a] += this.size[b];
    return true;
  }
}

function kruskalMST(vertexCount, edges) {
  if (!Number.isInteger(vertexCount) || vertexCount < 0) throw new RangeError("Invalid vertex count");
  if (vertexCount <= 1) return 0;
  const dsu = new DisjointSet(vertexCount);
  let total = 0, used = 0;
  for (const [from, to, weight] of [...edges].sort((a, b) => a[2] - b[2])) {
    if (!dsu.union(from, to)) continue;
    total += weight;
    used++;
    if (used === vertexCount - 1) return total;
  }
  return null;
}

function transitiveClosure(vertexCount, edges, reflexive = false) {
  const reachable = Array.from({ length: vertexCount }, () => Array(vertexCount).fill(false));
  if (reflexive) for (let node = 0; node < vertexCount; node++) reachable[node][node] = true;
  for (const [from, to] of edges) reachable[from][to] = true;
  for (let middle = 0; middle < vertexCount; middle++) {
    for (let from = 0; from < vertexCount; from++) {
      if (!reachable[from][middle]) continue;
      for (let to = 0; to < vertexCount; to++) {
        if (reachable[middle][to]) reachable[from][to] = true;
      }
    }
  }
  return reachable;
}

function eulerTrailDirected(edges, start) {
  const graph = new Map();
  const remaining = new Map();
  for (const [from, to] of edges) {
    if (!graph.has(from)) graph.set(from, []);
    graph.get(from).push(to);
    const key = JSON.stringify([from, to]);
    remaining.set(key, (remaining.get(key) ?? 0) + 1);
  }
  for (const list of graph.values()) list.sort((a, b) => b.localeCompare(a));
  const stack = [start], reversed = [];
  while (stack.length) {
    const node = stack[stack.length - 1];
    const outgoing = graph.get(node);
    if (outgoing?.length) stack.push(outgoing.pop());
    else reversed.push(stack.pop());
  }
  const route = reversed.reverse();
  if (route.length !== edges.length + 1) return null;
  for (let index = 1; index < route.length; index++) {
    const key = JSON.stringify([route[index - 1], route[index]]);
    const count = remaining.get(key) ?? 0;
    if (count === 0) return null;
    remaining.set(key, count - 1);
  }
  return route;
}

const DIRECTIONS = [[0, 1], [1, 1], [1, 0], [1, -1], [0, -1], [-1, -1], [-1, 0], [-1, 1]];

function canonicalEdge(first, second) { return first < second ? `${first}|${second}` : `${second}|${first}`; }

function countPlanarRooms(arrows) {
  let x = 0, y = 0, rooms = 0;
  const vertices = new Set(["0,0"]), edges = new Set();
  for (const direction of arrows) {
    if (!Number.isInteger(direction) || direction < 0 || direction >= DIRECTIONS.length) throw new RangeError("Invalid direction");
    const [dx, dy] = DIRECTIONS[direction];
    for (let substep = 0; substep < 2; substep++) {
      const nextX = x + dx, nextY = y + dy;
      const from = `${x},${y}`, to = `${nextX},${nextY}`;
      const edge = canonicalEdge(from, to);
      if (!edges.has(edge)) {
        if (vertices.has(to)) rooms++;
        edges.add(edge);
      }
      vertices.add(to);
      x = nextX;
      y = nextY;
    }
  }
  return rooms;
}

module.exports = { DisjointSet, MinHeap, countPlanarRooms, dijkstra, eulerTrailDirected, kruskalMST, transitiveClosure };
