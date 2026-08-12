const test = require("node:test");
const assert = require("node:assert/strict");
const d = require("../solutions/notebook/ch12_backtracking_dp.js");

test("BTD-01 — combination không xét order, clone path và k=0", () => {
  const result = d.combinations([1, 2, 3], 2);
  assert.deepEqual(result, [[1, 2], [1, 3], [2, 3]]);
  result[0][0] = 99;
  assert.deepEqual(result[1], [1, 3]);
  assert.deepEqual(d.combinations([1, 2], 0), [[]]);
});

test("BTD-02 — permutation chống duplicate đúng cùng tầng", () => {
  assert.deepEqual(d.uniquePermutations([1, 1, 2]), [[1, 1, 2], [1, 2, 1], [2, 1, 1]]);
  assert.deepEqual(d.uniquePermutations([]), [[]]);
});

test("BTD-03 — pruning hợp lệ chỉ cho miền non-negative", () => {
  assert.equal(d.subsetSumExistsNonNegative([3, 5, 6], 8), true);
  assert.equal(d.subsetSumExistsNonNegative([4, 6], 5), false);
  assert.throws(() => d.subsetSumExistsNonNegative([10, -4], 6), RangeError);
});

test("BTD-04 — bitmask sinh mỗi subset một lần", () => {
  assert.deepEqual(d.subsetSumsByMask([2, 3]), [0, 2, 3, 5]);
  assert.equal(d.subsetSumsByMask([1, 2, 4]).length, 8);
});

test("BTD-05 — memo min coin phân biệt impossible và base zero", () => {
  assert.equal(d.minCoinsMemo([1, 3, 4], 6), 2);
  assert.equal(d.minCoinsMemo([2], 3), -1);
  assert.equal(d.minCoinsMemo([2], 0), 0);
  assert.throws(() => d.minCoinsMemo([0, 2], 4), RangeError);
});

test("BTD-06 — 0/1 loop không tái sử dụng cùng item", () => {
  assert.equal(d.canMakeSum01([2], 4), false);
  assert.equal(d.canMakeSum01([2, 3], 5), true);
  assert.equal(d.canMakeSum01([], 0), true);
});

test("BTD-07 — grid base, obstacle và rectangular contract", () => {
  assert.equal(d.countGridPaths([[0]]), 1);
  assert.equal(d.countGridPaths([[1]]), 0);
  assert.equal(d.countGridPaths([[0, 0], [0, 0]]), 2);
  assert.equal(d.countGridPaths([[0, 1], [0, 0]]), 1);
  assert.throws(() => d.countGridPaths([[0], [0, 0]]), RangeError);
});

test("BTD-08 — engine contrast theo overlap/order/proof", () => {
  assert.equal(d.chooseSearchEngine({ mustEnumerate: true }), "BACKTRACKING");
  assert.equal(d.chooseSearchEngine({ repeatedState: true }), "MEMOIZATION");
  assert.equal(d.chooseSearchEngine({ repeatedState: true, acyclicOrder: true }), "BOTTOM_UP_DP");
  assert.equal(d.chooseSearchEngine({ exchangeProof: true }), "GREEDY");
});
