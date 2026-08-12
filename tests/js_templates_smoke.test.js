const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");
const test = require("node:test");

const templatePath = path.join(__dirname, "..", "docs", "JS_TEMPLATES_PCCP.js");
const source = fs.readFileSync(templatePath, "utf8");
const moduleUnderTest = { exports: {} };

new Function(
  "module",
  "exports",
  `${source}\nmodule.exports = {
    makeGrid, countFrequency, sortedAscending, craneGame,
    buildPrefixSum, rangeSum, buildPrefixSum2D, rectangleSum,
    applyRectangleUpdates, longestWindowAtMostKDistinct,
    Deque, Heap, lowerBound, upperBound, firstFeasible, lastFeasible,
    nextGreaterValues,
    permutations, combinations, buildUndirectedGraph, dfsGraph, bfsGraph,
    bfsGrid, multiSourceBfs, dijkstra, UnionFind, maxNonAdjacentSum, knapsack01,
    maximumNonOverlappingIntervals, countGridPaths
  };`,
)(moduleUnderTest, moduleUnderTest.exports);

const templates = moduleUnderTest.exports;

test("array and prefix-sum helpers", () => {
  assert.deepEqual(templates.makeGrid(2, 3, 0), [
    [0, 0, 0],
    [0, 0, 0],
  ]);
  assert.deepEqual(
    [...templates.countFrequency(["a", "b", "a"])],
    [
      ["a", 2],
      ["b", 1],
    ],
  );
  assert.deepEqual(templates.sortedAscending([3, 1, 2]), [1, 2, 3]);

  const craneBoard = [[1], [1]];
  assert.equal(templates.craneGame(craneBoard, [1, 1, 1]), 2);
  assert.deepEqual(craneBoard, [[0], [0]]);

  const prefix = templates.buildPrefixSum([2, 4, 6]);
  assert.equal(templates.rangeSum(prefix, 1, 2), 10);

  const prefix2D = templates.buildPrefixSum2D([
    [1, 2],
    [3, 4],
  ]);
  assert.equal(templates.rectangleSum(prefix2D, 0, 1, 1, 1), 6);

  assert.deepEqual(
    templates.applyRectangleUpdates(3, 3, [
      [0, 0, 1, 1, 2],
      [1, 1, 2, 2, 3],
    ]),
    [
      [2, 2, 0],
      [2, 5, 3],
      [0, 3, 3],
    ],
  );

  assert.equal(
    templates.longestWindowAtMostKDistinct([1, 2, 1, 3, 4, 3], 2),
    3,
  );
  assert.equal(templates.longestWindowAtMostKDistinct([1, 1], 0), 0);
});

test("deque, heap and binary-search helpers", () => {
  const deque = new templates.Deque();
  deque.pushBack(2);
  deque.pushFront(1);
  deque.pushBack(3);
  assert.deepEqual(
    [deque.popFront(), deque.popBack(), deque.front()],
    [1, 3, 2],
  );

  const heap = new templates.Heap((a, b) => a - b);
  [4, 1, 3, 2].forEach((value) => heap.push(value));
  assert.deepEqual(
    [heap.pop(), heap.pop(), heap.pop(), heap.pop()],
    [1, 2, 3, 4],
  );

  const values = [1, 2, 2, 4];
  assert.equal(templates.lowerBound(values, 2), 1);
  assert.equal(templates.upperBound(values, 2), 3);
  assert.equal(
    templates.firstFeasible(0, 10, (x) => x >= 7),
    7,
  );
  assert.equal(
    templates.lastFeasible(0, 10, (x) => x <= 7),
    7,
  );

  assert.deepEqual(
    templates.nextGreaterValues([2, 1, 2, 4, 3]),
    [4, 2, 4, -1, -1],
  );
});

test("combinatorics helpers document duplicate-input behavior", () => {
  assert.deepEqual(templates.permutations([1, 2], 2), [
    [1, 2],
    [2, 1],
  ]);
  assert.equal(templates.permutations([1, 1], 2).length, 2);
  assert.deepEqual(templates.combinations([1, 2, 3], 2), [
    [1, 2],
    [1, 3],
    [2, 3],
  ]);
});

test("graph, union-find and dynamic-programming helpers", () => {
  const graph = templates.buildUndirectedGraph(4, [
    [0, 1],
    [1, 2],
    [0, 3],
  ]);
  assert.deepEqual(templates.bfsGraph(graph, 0), [0, 1, 2, 1]);
  assert.deepEqual(
    new Set(templates.dfsGraph(graph, 0)),
    new Set([0, 1, 2, 3]),
  );

  assert.deepEqual(
    templates.bfsGrid(
      [
        [1, 0],
        [1, 1],
      ],
      0,
      0,
    ),
    [
      [0, -1],
      [1, 2],
    ],
  );

  assert.deepEqual(templates.multiSourceBfs(2, 3, [[0, 0], [1, 2]]), [
    [0, 1, 1],
    [1, 1, 0],
  ]);

  const weighted = [
    [
      [1, 5],
      [2, 1],
    ],
    [],
    [[1, 2]],
  ];
  assert.deepEqual(templates.dijkstra(weighted, 0), [0, 3, 1]);

  const unionFind = new templates.UnionFind(3);
  assert.equal(unionFind.union(0, 1), true);
  assert.equal(unionFind.connected(0, 1), true);
  assert.equal(unionFind.sizeOf(0), 2);

  assert.equal(templates.maxNonAdjacentSum([-5, -2, -8]), 0);
  assert.equal(templates.maxNonAdjacentSum([2, 7, 9, 3, 1]), 12);
  assert.equal(
    templates.knapsack01(
      [
        [2, 3],
        [3, 4],
        [4, 5],
      ],
      5,
    ),
    7,
  );

  assert.equal(
    templates.maximumNonOverlappingIntervals([
      [1, 4],
      [2, 3],
      [3, 5],
      [5, 7],
    ]),
    3,
  );
  assert.equal(
    templates.countGridPaths([
      [1, 1, 1],
      [1, 0, 1],
      [1, 1, 1],
    ]),
    2,
  );
});
