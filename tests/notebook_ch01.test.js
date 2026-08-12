const test = require("node:test");
const assert = require("node:assert/strict");
const a = require("../solutions/notebook/ch01_array_loop.js");

test("ARR-01 — accumulator identity và scan", () => { assert.equal(a.sumValues([]), 0); assert.equal(a.sumValues([3, -1, 4]), 6); });
test("ARR-02 — strict comparator giữ first tie", () => { assert.equal(a.indexOfMaximumFirst([7, 9, 9, 4]), 1); assert.equal(a.indexOfMaximumFirst([]), -1); });
test("ARR-03 — count dùng cả value và index predicate", () => { assert.equal(a.countMatching([-1, 5, 3, 2, 4], (v, i) => i % 2 === 0 && v > 0), 2); });
test("ARR-04 — every identity trên empty và counterexample sớm", () => { assert.equal(a.everyMatching([], () => false), true); assert.equal(a.everyMatching([2, 4, 5], v => v % 2 === 0), false); });
test("ARR-05 — filter trước transform và giữ index gốc", () => { assert.deepEqual(a.filterMap([10, -1, 20], v => v >= 0, (v, i) => [i, v * 2]), [[0, 20], [2, 40]]); });
test("ARR-06 — strictly-right ghi trước update và hỗ trợ số âm", () => { assert.deepEqual(a.maximumStrictlyToRight([-3, -5, -2]), [-2, -2, null]); });
test("ARR-07 — run reset về một và empty về zero", () => { assert.equal(a.longestRun([1, 2, 3, 2, 4], (x, y) => y > x), 3); assert.equal(a.longestRun([], () => true), 0); });
