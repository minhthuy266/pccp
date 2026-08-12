const test = require("node:test");
const assert = require("node:assert/strict");

const { finalRunningOrder } = require("../solutions/official/OF050.js");
const { targetProcessOrder } = require("../solutions/official/OF009.js");
const { stockPriceDurations } = require("../solutions/official/OF011.js");
const { MinHeap, minimumScovilleMixes } = require("../solutions/official/OF012.js");

test("OF050 — swap order và cập nhật cả hai index", () => {
  assert.deepEqual(
    finalRunningOrder(
      ["mumu", "soe", "poe", "kai", "mine"],
      ["kai", "kai", "mine", "mine"],
    ),
    ["mumu", "kai", "mine", "soe", "poe"],
  );
  assert.deepEqual(finalRunningOrder(["a", "b", "c"], ["b", "c"]), ["b", "c", "a"]);
});

test("OF009 — re-enqueue giữ original index và priority state", () => {
  assert.equal(targetProcessOrder([2, 1, 3, 2], 2), 1);
  assert.equal(targetProcessOrder([1, 1, 9, 1, 1, 1], 0), 5);
  assert.equal(targetProcessOrder([5], 0), 1);
  assert.equal(targetProcessOrder([2, 2, 2], 1), 2);
});

test("OF011 — chỉ strict drop mới resolve duration", () => {
  assert.deepEqual(stockPriceDurations([1, 2, 3, 2, 3]), [4, 3, 1, 1, 0]);
  assert.deepEqual(stockPriceDurations([3, 3, 2]), [2, 1, 0]);
  assert.deepEqual(stockPriceDurations([5]), [0]);
  assert.deepEqual(stockPriceDurations([5, 4, 3]), [1, 1, 0]);
});

test("OF012 — min-heap giữ root nhỏ nhất qua push/pop", () => {
  const heap = new MinHeap([5, 1, 4, 1, 3]);
  assert.deepEqual([heap.pop(), heap.pop(), heap.pop(), heap.pop(), heap.pop()], [1, 1, 3, 4, 5]);
  assert.equal(heap.pop(), undefined);
});

test("OF012 — luôn trộn hai phần tử nhỏ nhất và phát hiện impossible", () => {
  assert.equal(minimumScovilleMixes([1, 2, 3, 9, 10, 12], 7), 2);
  assert.equal(minimumScovilleMixes([7, 8], 7), 0);
  assert.equal(minimumScovilleMixes([1], 7), -1);
  assert.equal(minimumScovilleMixes([1, 1], 10), -1);
});
