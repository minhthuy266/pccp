const test = require("node:test");
const assert = require("node:assert/strict");

const chapter = require("../solutions/notebook/ch07_prefix_window.js");

test("PRE-01 PRE-02 — prefix padded và range inclusive", () => {
  const prefix = chapter.buildPrefixSums([3, 1, 4, 1, 5]);
  assert.deepEqual(prefix, [0, 3, 4, 8, 9, 14]);
  assert.equal(chapter.rangeSum(prefix, 0, 0), 3);
  assert.equal(chapter.rangeSum(prefix, 1, 3), 6);
});

test("PRE-03 — prefix predicate đếm trong range", () => {
  const prefix = chapter.buildCountPrefix([2, 3, 4, 6], (value) => value % 2 === 0);
  assert.deepEqual(prefix, [0, 1, 1, 2, 3]);
  assert.equal(chapter.rangeSum(prefix, 1, 3), 2);
});

test("PRE-04 — prefix 2D inclusion-exclusion", () => {
  const prefix = chapter.buildPrefix2D([[1, 2, 3], [4, 5, 6]]);
  assert.equal(chapter.rectangleSum(prefix, 0, 1, 1, 2), 16);
  assert.equal(chapter.rectangleSum(prefix, 1, 0, 1, 0), 4);
});

test("PRE-05 — difference inclusive và prefix Map giữ multiplicity", () => {
  assert.deepEqual(chapter.applyRangeAdds(5, [[1, 3, 10], [2, 4, 2]]), [0, 10, 12, 12, 2]);
  assert.equal(chapter.countTargetSubarrays([1, -1, 1], 0), 2);
  assert.equal(chapter.countTargetSubarrays([0, 0], 0), 3);
});

test("SW-01 — fixed window add/remove đúng outgoing", () => {
  assert.deepEqual(chapter.fixedWindowSums([2, 1, 3, 4], 3), [6, 8]);
  assert.deepEqual(chapter.fixedWindowSums([1], 2), []);
});

test("SW-02 SW-04 — longest at most k distinct và xóa zero count", () => {
  assert.equal(chapter.longestAtMostKDistinct(["a", "b", "a", "c", "c"], 2), 3);
  assert.equal(chapter.longestAtMostKDistinct(["a"], 0), 0);
});

test("SW-03 — shortest positive window update trước shrink", () => {
  assert.equal(chapter.minimumLengthAtLeast([2, 3, 1, 2, 4, 3], 7), 2);
  assert.equal(chapter.minimumLengthAtLeast([1, 1], 5), 0);
});

test("SW-05 — count exactly k bằng hiệu hai at-most", () => {
  assert.equal(chapter.countAtMostKDistinct([1, 2, 1], 2), 6);
  assert.equal(chapter.countExactlyKDistinct([1, 2, 1, 2, 3], 2), 7);
});

test("SW-06 — decision contrast không gọi window khi số âm exact sum", () => {
  assert.equal(chapter.chooseRangeEngine({ manyStaticQueries: true }), "PREFIX");
  assert.equal(chapter.chooseRangeEngine({ exactSum: true, hasNegative: true }), "PREFIX_MAP");
  assert.equal(chapter.chooseRangeEngine({ fixedWidth: true }), "FIXED_WINDOW");
});
