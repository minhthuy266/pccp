const test = require("node:test");
const assert = require("node:assert/strict");
const g = require("../solutions/notebook/ch13_advanced_graph.js");

test("GR-01 — Dijkstra xử lý better-later, stale, parallel và unreachable", () => {
  const adjacency = [
    [[1, 10], [1, 7], [2, 1]],
    [],
    [[1, 1]],
    [],
  ];
  assert.deepEqual(g.dijkstra(adjacency, 0), [0, 2, 1, Infinity]);
  assert.throws(() => g.dijkstra([[ [1, -1] ], []], 0), RangeError);
});

test("GR-02 — Kruskal reject cycle và báo disconnected", () => {
  assert.equal(g.kruskalMST(3, [[0, 1, 1], [1, 2, 2], [0, 2, 10]]), 3);
  assert.equal(g.kruskalMST(4, [[0, 1, 1], [2, 3, 1]]), null);
  assert.equal(g.kruskalMST(1, []), 0);
});

test("GR-03 — closure giữ direction, chain và reflexive knob", () => {
  const reach = g.transitiveClosure(3, [[0, 1], [1, 2]]);
  assert.equal(reach[0][2], true);
  assert.equal(reach[2][0], false);
  assert.equal(reach[0][0], false);
  assert.equal(g.transitiveClosure(2, [], true)[1][1], true);
});

test("GR-04 — Euler giữ parallel occurrence, lexical và reject unused edge", () => {
  assert.deepEqual(g.eulerTrailDirected([["A", "B"], ["A", "B"], ["B", "A"]], "A"), ["A", "B", "A", "B"]);
  assert.deepEqual(g.eulerTrailDirected([["A", "C"], ["A", "B"], ["B", "A"]], "A"), ["A", "B", "A", "C"]);
  assert.equal(g.eulerTrailDirected([["A", "B"], ["X", "Y"]], "A"), null);
  assert.equal(g.eulerTrailDirected([["A", "B"], ["A", "C"]], "A"), null);
});

test("GR-04 — Euler chain 10.000 edge không phụ thuộc call stack", () => {
  const edges = Array.from({ length: 10_000 }, (_, index) => [`N${index}`, `N${index + 1}`]);
  const route = g.eulerTrailDirected(edges, "N0");
  assert.equal(route.length, 10_001);
  assert.equal(route[10_000], "N10000");
});

test("GR-05 — planar square/retrace và midpoint crossing", () => {
  assert.equal(g.countPlanarRooms([0, 2, 4, 6]), 1);
  assert.equal(g.countPlanarRooms([0, 4]), 0);
  assert.equal(g.countPlanarRooms([1, 6, 3, 0, 5, 2, 7, 4]), 4);
  assert.throws(() => g.countPlanarRooms([8]), RangeError);
});
