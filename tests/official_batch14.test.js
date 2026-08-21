const test = require("node:test");
const assert = require("node:assert/strict");

const { shortestGemShoppingRange } = require("../solutions/official/OF058.js");
const { intactBuildingCount } = require("../solutions/official/OF060.js");
const { nextGreaterValues } = require("../solutions/official/OF061.js");
const { addMatrices } = require("../solutions/official/SR001.js");
const { compressedLengthForUnit, shortestCompressedLength } = require("../solutions/official/SR002.js");

test("OF058 — shrink trong khi vẫn cover đủ loại, tie giữ start sớm", () => {
  assert.deepEqual(shortestGemShoppingRange(["DIA","RUBY","RUBY","DIA","DIA","EMERALD","SAPPHIRE","DIA"]), [3, 7]);
  assert.deepEqual(shortestGemShoppingRange(["AA","AB","AC","AA","AC"]), [1, 3]);
  assert.deepEqual(shortestGemShoppingRange(["XYZ","XYZ","XYZ"]), [1, 1]);
});

test("OF060 — four-corner difference cộng đúng rectangle inclusive", () => {
  assert.equal(intactBuildingCount(
    [[5,5,5,5,5],[5,5,5,5,5],[5,5,5,5,5],[5,5,5,5,5]],
    [[1,0,0,3,4,4],[1,2,0,2,3,2],[2,1,0,3,1,2],[1,0,1,3,3,1]],
  ), 10);
  assert.equal(intactBuildingCount([[1]], [[1,0,0,0,0,1]]), 0);
  assert.equal(intactBuildingCount([[1,1]], [[2,0,0,0,1,2]]), 2);
});

test("OF061 — equal value không phải next greater", () => {
  assert.deepEqual(nextGreaterValues([2, 3, 3, 5]), [3, 5, 5, -1]);
  assert.deepEqual(nextGreaterValues([9, 1, 5, 3, 6, 2]), [-1, 5, 6, 6, -1, -1]);
  assert.deepEqual(nextGreaterValues([3, 3, 3]), [-1, -1, -1]);
});

test("SR001 — matrix addition giữ đúng shape row/column", () => {
  assert.deepEqual(addMatrices([[1,2],[2,3]], [[3,4],[5,6]]), [[4,6],[7,9]]);
  assert.deepEqual(addMatrices([[1,2,3]], [[4,5,6]]), [[5,7,9]]);
  assert.deepEqual(addMatrices([[1],[2]], [[3],[4]]), [[4],[6]]);
});

test("SR002 — chunk compression flush run cuối và phần dư", () => {
  assert.equal(compressedLengthForUnit("aabbaccc", 1), 7);
  assert.equal(compressedLengthForUnit("abababab", 2), 3);
  assert.equal(compressedLengthForUnit("abcabcab", 3), 6);
  assert.equal(compressedLengthForUnit("aaaaaaaaaaaa", 1), 3);
  assert.equal(compressedLengthForUnit("abc", 1), 3);
  assert.equal(shortestCompressedLength("aabbaccc"), 7);
  assert.equal(shortestCompressedLength("ababcdcdababcdcd"), 9);
  assert.equal(shortestCompressedLength("abcabcdede"), 8);
  assert.equal(shortestCompressedLength("abcabcabcabcdededededede"), 14);
  assert.equal(shortestCompressedLength("xababcdcdababcdcd"), 17);
  assert.equal(shortestCompressedLength("a"), 1);
});
