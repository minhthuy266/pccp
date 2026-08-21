const test = require("node:test");
const assert = require("node:assert/strict");

const { joystickMinimumMoves } = require("../solutions/official/OF026.js");
const { DisjointSet, minimumIslandConnectionCost } = require("../solutions/official/OF029.js");
const { minimumSpeedCameras } = require("../solutions/official/OF030.js");
const { minimumNExpressionCount } = require("../solutions/official/OF031.js");
const { maximumArithmeticExpressionValue } = require("../solutions/official/OF034.js");

test("OF026 — vertical độc lập, horizontal xét quay đầu qua A-run", () => {
  assert.equal(joystickMinimumMoves("JEROEN"), 56);
  assert.equal(joystickMinimumMoves("JAN"), 23);
  assert.equal(joystickMinimumMoves("A"), 0);
  assert.equal(joystickMinimumMoves("Z"), 1);
  assert.equal(joystickMinimumMoves("AAAA"), 0);
  assert.equal(joystickMinimumMoves("ABAAAAAAAAABB"), 7);
});

test("OF029 — DSU reject cycle và Kruskal lấy n-1 edge", () => {
  const costs = [[0,1,1],[0,2,2],[1,2,5],[1,3,1],[2,3,8]];
  const set = new DisjointSet(4);
  assert.equal(set.union(0, 1), true);
  assert.equal(set.union(1, 2), true);
  assert.equal(set.union(0, 2), false);
  assert.equal(minimumIslandConnectionCost(4, costs), 4);
  assert.equal(minimumIslandConnectionCost(2, [[0,1,7]]), 7);
  assert.equal(minimumIslandConnectionCost(3, [[0,1,10],[0,1,1],[1,2,2],[0,2,9]]), 3);
  assert.deepEqual(costs, [[0,1,1],[0,2,2],[1,2,5],[1,3,1],[2,3,8]]);
});

test("OF030 — closed interval chạm camera endpoint vẫn được cover", () => {
  assert.equal(minimumSpeedCameras([[-20,-15],[-14,-5],[-18,-13],[-5,-3]]), 2);
  assert.equal(minimumSpeedCameras([[1,2],[2,3]]), 1);
  assert.equal(minimumSpeedCameras([[1,10],[2,3],[4,5]]), 2);
});

test("OF031 — Set DP dùng đúng count N và trunc division", () => {
  assert.equal(minimumNExpressionCount(5, 12), 4);
  assert.equal(minimumNExpressionCount(2, 11), 3);
  assert.equal(minimumNExpressionCount(5, 5), 1);
  assert.equal(minimumNExpressionCount(5, 55), 2);
  assert.equal(minimumNExpressionCount(1, 31168), -1);
});

test("OF034 — interval DP phải giữ cả minimum để tối đa phép trừ", () => {
  assert.equal(maximumArithmeticExpressionValue(["1", "-", "3", "+", "5", "-", "8"]), 1);
  assert.equal(maximumArithmeticExpressionValue(["5", "-", "3", "+", "1", "+", "2", "-", "4"]), 3);
  assert.equal(maximumArithmeticExpressionValue(["7"]), 7);
  assert.equal(maximumArithmeticExpressionValue(["1", "+", "2", "+", "3"]), 6);
});
