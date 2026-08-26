const test = require("node:test");
const assert = require("node:assert/strict");

const { removeConsecutiveDuplicates } = require("../solutions/official/OF006.js");
const { featureDeploymentBatches } = require("../solutions/official/OF007.js");
const { isValidParentheses } = require("../solutions/official/OF008.js");
const { doublePriorityQueue } = require("../solutions/official/OF014.js");
const { hIndex } = require("../solutions/official/OF017.js");

test("OF006 — chỉ loại duplicate liên tiếp, giữ duplicate cách nhau", () => {
  assert.deepEqual(removeConsecutiveDuplicates([1, 1, 3, 3, 0, 1, 1]), [1, 3, 0, 1]);
  assert.deepEqual(removeConsecutiveDuplicates([4, 4, 4, 3, 3]), [4, 3]);
  assert.deepEqual(removeConsecutiveDuplicates([1, 2, 1]), [1, 2, 1]);
});

test("OF007 — feature đầu queue khóa release day của batch", () => {
  assert.deepEqual(featureDeploymentBatches([93, 30, 55], [1, 30, 5]), [2, 1]);
  assert.deepEqual(featureDeploymentBatches([95, 90, 99, 99, 80, 99], [1, 1, 1, 1, 1, 1]), [1, 3, 2]);
  assert.deepEqual(featureDeploymentBatches([99], [1]), [1]);
});

test("OF008 — mọi prefix không âm và balance cuối bằng zero", () => {
  assert.equal(isValidParentheses("()()"), true);
  assert.equal(isValidParentheses("(())()"), true);
  assert.equal(isValidParentheses(")()("), false);
  assert.equal(isValidParentheses("(()("), false);
});

test("OF014 — hai heap lazy deletion giữ duplicate bằng unique id", () => {
  assert.deepEqual(doublePriorityQueue(["I 16", "I -5643", "D -1", "D 1", "D 1", "I 123", "D -1"]), [0, 0]);
  assert.deepEqual(doublePriorityQueue(["I -45", "I 653", "D 1", "I -642", "I 45", "I 97", "D 1", "D -1", "I 333"]), [333, -45]);
  assert.deepEqual(doublePriorityQueue(["I 5", "I 5", "D 1"]), [5, 5]);
  assert.deepEqual(doublePriorityQueue(["D -1", "D 1", "I 3"]), [3, 3]);
  assert.deepEqual(doublePriorityQueue(["I 1", "I 2", "D -1", "I 3"]), [3, 2]);
  assert.deepEqual(doublePriorityQueue(["I 5", "I 5", "D 1", "D -1"]), [0, 0]);
});

test("OF017 — descending boundary papers >= rank", () => {
  assert.equal(hIndex([3, 0, 6, 1, 5]), 3);
  assert.equal(hIndex([0, 0, 0]), 0);
  assert.equal(hIndex([10, 10, 10]), 3);
  assert.equal(hIndex([1]), 1);
  assert.equal(hIndex([3, 3, 3]), 3);
  assert.equal(hIndex([100]), 1);
});
