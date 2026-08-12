class DisjointSet {
  constructor(size) {
    this.parent = Array.from({ length: size }, (_, index) => index);
    this.rank = Array(size).fill(0);
  }

  find(node) {
    if (this.parent[node] !== node) this.parent[node] = this.find(this.parent[node]);
    return this.parent[node];
  }

  union(first, second) {
    let firstRoot = this.find(first);
    let secondRoot = this.find(second);
    if (firstRoot === secondRoot) return false;

    if (this.rank[firstRoot] < this.rank[secondRoot]) {
      [firstRoot, secondRoot] = [secondRoot, firstRoot];
    }
    this.parent[secondRoot] = firstRoot;
    if (this.rank[firstRoot] === this.rank[secondRoot]) this.rank[firstRoot]++;
    return true;
  }
}

function minimumIslandConnectionCost(n, costs) {
  const sorted = [...costs].sort((a, b) => a[2] - b[2]);
  const disjointSet = new DisjointSet(n);
  let selectedEdges = 0;
  let totalCost = 0;

  for (const [from, to, cost] of sorted) {
    if (!disjointSet.union(from, to)) continue;
    totalCost += cost;
    selectedEdges++;
    if (selectedEdges === n - 1) break;
  }

  return totalCost;
}

module.exports = { DisjointSet, minimumIslandConnectionCost };
