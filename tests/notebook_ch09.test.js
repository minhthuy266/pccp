const test = require("node:test");
const assert = require("node:assert/strict");

const binary = require("../solutions/notebook/ch09_binary_search.js");

test("BS-01 — exact inclusive search tìm thấy và not-found", () => {
  const values = [1, 4, 7, 9];
  assert.equal(binary.exactBinarySearch(values, 7), 2);
  assert.equal(binary.exactBinarySearch(values, 6), -1);
  assert.equal(binary.exactBinarySearch([], 1), -1);
});

test("BS-02 — lower bound trả first >= và n khi không có", () => {
  const values = [1, 3, 3, 7];
  assert.equal(binary.lowerBound(values, 3), 1);
  assert.equal(binary.lowerBound(values, 4), 3);
  assert.equal(binary.lowerBound(values, 9), 4);
});

test("BS-03 — upper bound và last true xử lý duplicate/two candidates", () => {
  const values = [1, 3, 3, 7];
  assert.equal(binary.upperBound(values, 3), 3);
  assert.equal(binary.upperBound(values, 7), 4);
  assert.equal(binary.lastTrue(0, 1, (candidate) => candidate <= 1), 1);
  assert.equal(binary.lastTrue(0, 10, (candidate) => candidate <= 6), 6);
});

test("BS-04 — first true giữ boundary đầu", () => {
  assert.equal(binary.firstTrue(0, 10, (candidate) => candidate >= 6), 6);
  assert.equal(binary.firstTrue(5, 5, () => true), 5);
});

test("BS-04 OF043 anchor — processing time dùng BigInt", () => {
  assert.equal(binary.minimumProcessingTime(6, [7, 10]), 28n);
  assert.equal(binary.minimumProcessingTime(1, [5]), 5n);
});

test("BS-04 OF044 anchor — last feasible gap kiểm cả destination", () => {
  assert.equal(binary.maximumMinimumDistance(25, [2, 14, 11, 21, 17], 2), 4);
  assert.equal(binary.maximumMinimumDistance(10, [], 0), 10);
});

test("BS-05 — BigInt boundary vượt safe integer vẫn exact", () => {
  const boundary = 9_007_199_254_740_993n;
  assert.equal(binary.firstTrueBigInt(0n, boundary + 10n, (value) => value >= boundary), boundary);
});
