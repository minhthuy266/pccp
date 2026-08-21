const test = require("node:test");
const assert = require("node:assert/strict");

const { minimumInterceptors } = require("../solutions/official/OF057.js");
const {
  minimumImmigrationTime,
  minimumImmigrationTimeBigInt,
} = require("../solutions/official/OF043.js");
const { equalQueueSumOperations } = require("../solutions/official/OF054.js");
const { minimumNumberTransforms } = require("../solutions/official/OF056.js");

test("OF057 — interval mở chạm endpoint vẫn cần phát bắn mới", () => {
  assert.equal(minimumInterceptors([[4, 5], [4, 8], [10, 14], [11, 13], [5, 12], [3, 7], [1, 4]]), 3);
  assert.equal(minimumInterceptors([[1, 2], [2, 3]]), 2);
  assert.equal(minimumInterceptors([[1, 10], [2, 3], [3, 4]]), 2);
});

test("OF043 — first feasible time và BigInt precision path", () => {
  assert.equal(minimumImmigrationTime(6, [7, 10]), 28);
  assert.equal(minimumImmigrationTime(1, [5, 10]), 5);
  assert.equal(minimumImmigrationTime(4, [2, 2]), 4);
  assert.equal(minimumImmigrationTimeBigInt(1_000_000_000, [1_000_000_000]), 1_000_000_000_000_000_000n);
});

test("OF054 — logical window thực hiện move front-to-back tối thiểu", () => {
  assert.equal(equalQueueSumOperations([3, 2, 7, 2], [4, 6, 5, 1]), 2);
  assert.equal(equalQueueSumOperations([1, 2, 1, 2], [1, 10, 1, 2]), 7);
  assert.equal(equalQueueSumOperations([1, 1], [1, 5]), -1);
  assert.equal(equalQueueSumOperations([1, 2], [2, 1]), 0);
});

test("OF056 — BFS trả shortest và chặn state vượt y", () => {
  assert.equal(minimumNumberTransforms(10, 40, 5), 2);
  assert.equal(minimumNumberTransforms(10, 40, 30), 1);
  assert.equal(minimumNumberTransforms(2, 5, 4), -1);
  assert.equal(minimumNumberTransforms(7, 7, 3), 0);
});
