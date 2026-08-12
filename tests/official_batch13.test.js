const test = require("node:test");
const assert = require("node:assert/strict");

const { maximumCircularRobbery } = require("../solutions/official/OF035.js");
const { itemPickupDistance } = require("../solutions/official/OF040.js");
const { travelItinerary } = require("../solutions/official/OF041.js");
const { filledPuzzleCells, rotateShape } = require("../solutions/official/OF042.js");
const { maximumMinimumRockDistance } = require("../solutions/official/OF044.js");
const { roomCount } = require("../solutions/official/OF047.js");

test("OF035 — circular case split không chọn đồng thời nhà đầu/cuối", () => {
  assert.equal(maximumCircularRobbery([1, 2, 3, 1]), 4);
  assert.equal(maximumCircularRobbery([1, 2, 3]), 3);
  assert.equal(maximumCircularRobbery([5]), 5);
  assert.equal(maximumCircularRobbery([10, 1, 1, 10]), 11);
});

test("OF040 — scale x2 giữ đúng border tại corner/crossing", () => {
  assert.equal(itemPickupDistance([[1,1,7,4],[3,2,5,5],[4,3,6,9],[2,6,8,8]], 1, 3, 7, 8), 17);
  assert.equal(itemPickupDistance([[1,1,2,2]], 1, 1, 2, 2), 2);
});

test("OF041 — dùng mọi ticket đúng một lần và lexical Euler route", () => {
  assert.deepEqual(travelItinerary([["ICN","JFK"],["HND","IAD"],["JFK","HND"]]), ["ICN","JFK","HND","IAD"]);
  assert.deepEqual(travelItinerary([["ICN","SFO"],["ICN","ATL"],["SFO","ATL"],["ATL","ICN"],["ATL","SFO"]]), ["ICN","ATL","ICN","SFO","ATL","SFO"]);
  assert.deepEqual(travelItinerary([["ICN","A"],["ICN","A"],["A","ICN"]]), ["ICN","A","ICN","A"]);
});

test("OF042 — component normalize và bốn rotation match hole", () => {
  assert.deepEqual(rotateShape([[0,0],[1,0],[1,1]]), [[0,0],[0,1],[1,0]]);
  assert.equal(filledPuzzleCells(
    [[1,1,0,0,1,0],[0,0,1,0,1,0],[0,1,1,0,0,1],[1,1,0,1,1,1],[1,0,0,0,1,0],[0,1,1,1,0,0]],
    [[1,0,0,1,1,0],[1,0,1,0,1,0],[0,1,1,0,1,1],[0,0,1,0,0,0],[1,1,0,1,1,0],[0,1,0,0,0,0]],
  ), 14);
  assert.equal(filledPuzzleCells([[0]], [[1]]), 1);
});

test("OF044 — last feasible gap qua greedy removal predicate", () => {
  assert.equal(maximumMinimumRockDistance(25, [2, 14, 11, 21, 17], 2), 4);
  assert.equal(maximumMinimumRockDistance(10, [], 0), 10);
  assert.equal(maximumMinimumRockDistance(10, [5], 1), 10);
});

test("OF047 — node cũ qua edge mới tạo room, half-step bắt diagonal crossing", () => {
  assert.equal(roomCount([0, 2, 4, 6]), 1);
  assert.equal(roomCount([6,6,6,4,4,4,2,2,2,0,0,0,1,6,5,5,3,6,0]), 3);
  assert.equal(roomCount([0, 4, 0, 4]), 0);
});
