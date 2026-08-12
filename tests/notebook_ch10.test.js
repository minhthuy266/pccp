const test = require("node:test");
const assert = require("node:assert/strict");
const graph = require("../solutions/notebook/ch10_graph_tree.js");

test("BFS-01 — adjacency giữ direction và isolated node", () => {
  assert.deepEqual(graph.buildAdjacency(3, [[0, 1]], false), [[1], [0], []]);
  assert.deepEqual(graph.buildAdjacency(2, [[0, 1]], true), [[1], []]);
});

test("BFS-02 — flood fill dùng 4-neighbor và outer components", () => {
  assert.equal(graph.countGridComponents([[1, 0, 1], [0, 1, 0]]), 3);
  assert.equal(graph.countGridComponents([[1, 1], [1, 1]]), 1);
});

test("BFS-03 — shortest unweighted và unreachable", () => {
  const adjacency = graph.buildAdjacency(5, [[0, 1], [1, 2], [0, 3]]);
  assert.equal(graph.shortestUnweighted(adjacency, 0, 2), 2);
  assert.equal(graph.shortestUnweighted(adjacency, 0, 4), -1);
});

test("BFS-04 — multi-source seed dedupe và nearest distance", () => {
  const adjacency = graph.buildAdjacency(4, [[0, 1], [1, 2], [2, 3]]);
  assert.deepEqual(graph.multiSourceDistances(adjacency, [0, 3, 3]), [0, 1, 1, 0]);
});

test("BFS-05 — iterative DFS push reverse giữ preorder", () => {
  assert.deepEqual(graph.iterativeDfs([[1, 2], [3], [], []], 0), [0, 1, 3, 2]);
});

test("BFS-06 — cùng cell khác break-state không bị gộp", () => {
  assert.equal(graph.shortestPathWithOneBreak([[0, 1], [1, 0]]), 2);
  assert.equal(graph.shortestPathWithOneBreak([[0, 1, 1], [1, 1, 1], [1, 1, 0]]), -1);
});

test("BFS-07 — postorder subtree size trên rooted tree", () => {
  const tree = graph.buildAdjacency(4, [[0, 1], [0, 2], [1, 3]]);
  assert.deepEqual(graph.subtreeSizes(tree, 0).size, [4, 2, 1, 1]);
});

test("TREE-01 — mỗi tầng floor 10% từ khoản vừa nhận", () => {
  const parent = new Map([["child", "parent"], ["parent", "-"]]);
  const earnings = new Map([["child", 0], ["parent", 0]]);
  graph.propagateToRoot("child", 105, parent, earnings);
  assert.deepEqual([...earnings.values()], [95, 9]);
});
