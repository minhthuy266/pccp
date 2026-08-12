const test = require("node:test");
const assert = require("node:assert/strict");

const { shortestGameMapPath } = require("../solutions/official/OF038.js");
const { mazeEscapeTime } = require("../solutions/official/OF055.js");
const { networkCount } = require("../solutions/official/OF037.js");
const { minimumPowerGridDifference } = require("../solutions/official/OF023.js");

test("OF038 — BFS trả số ô trên shortest path và unreachable -1", () => {
  assert.equal(shortestGameMapPath([[1,0,1,1,1],[1,0,1,0,1],[1,0,1,1,1],[1,1,1,0,1],[0,0,0,0,1]]), 11);
  assert.equal(shortestGameMapPath([[1,0],[0,1]]), -1);
  assert.equal(shortestGameMapPath([[1]]), 1);
});

test("OF055 — bắt buộc S→L rồi L→E và mỗi phase có visited riêng", () => {
  assert.equal(mazeEscapeTime(["SOOOL","XXXXO","OOOOO","OXXXX","OOOOE"]), 16);
  assert.equal(mazeEscapeTime(["LOOXS","OOOOX","OOOOO","OOOOO","EOOOO"]), -1);
  assert.equal(mazeEscapeTime(["SLE"]), 2);
});

test("OF037 — outer traversal đếm cả isolated network", () => {
  assert.equal(networkCount(3, [[1,1,0],[1,1,0],[0,0,1]]), 2);
  assert.equal(networkCount(3, [[1,1,0],[1,1,1],[0,1,1]]), 1);
  assert.equal(networkCount(1, [[1]]), 1);
});

test("OF023 — bỏ từng edge cây tạo đúng hai component", () => {
  assert.equal(minimumPowerGridDifference(9, [[1,3],[2,3],[3,4],[4,5],[4,6],[4,7],[7,8],[7,9]]), 3);
  assert.equal(minimumPowerGridDifference(4, [[1,2],[2,3],[3,4]]), 0);
  assert.equal(minimumPowerGridDifference(2, [[1,2]]), 0);
});
