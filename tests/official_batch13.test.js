const test = require("node:test");
const assert = require("node:assert/strict");

const { maximumCircularRobbery } = require("../solutions/official/OF035.js");
const { itemPickupDistance } = require("../solutions/official/OF040.js");
const { travelItinerary } = require("../solutions/official/OF041.js");
const { extractComponents, filledPuzzleCells, rotateShape } = require("../solutions/official/OF042.js");
const { maximumMinimumRockDistance } = require("../solutions/official/OF044.js");
const { roomCount } = require("../solutions/official/OF047.js");

test("OF035 — circular case split không chọn đồng thời nhà đầu/cuối", () => {
  assert.equal(maximumCircularRobbery([1, 2, 3, 1]), 4);
  assert.equal(maximumCircularRobbery([1, 2, 3]), 3);
  assert.equal(maximumCircularRobbery([5]), 5);
  assert.equal(maximumCircularRobbery([2, 3]), 3);
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
  assert.deepEqual(travelItinerary([["ICN","B"],["ICN","A"],["A","ICN"]]), ["ICN","A","ICN","B"]);
});

test("OF041 — xử lý chain 10,000 ticket mà không tràn call stack", () => {
  const airportCode = (index) => String.fromCharCode(
    65 + Math.floor(index / (26 * 26)),
    65 + Math.floor(index / 26) % 26,
    65 + index % 26,
  );
  const ticketCount = 10_000;
  const airports = ["ICN"];
  for (let index = 0; airports.length <= ticketCount; index += 1) {
    const airport = airportCode(index);
    if (airport !== "ICN") airports.push(airport);
  }
  const tickets = Array.from(
    { length: ticketCount },
    (_, index) => [airports[index], airports[index + 1]],
  );

  assert.deepEqual(travelItinerary(tickets), airports);
});

test("OF042 — component normalize và bốn rotation match hole", () => {
  assert.deepEqual(rotateShape([[0,0],[1,0],[1,1]]), [[0,0],[0,1],[1,0]]);
  assert.equal(extractComponents([[1,0],[0,1]], 1).length, 2);
  assert.equal(filledPuzzleCells(
    [[1,1,0,0,1,0],[0,0,1,0,1,0],[0,1,1,0,0,1],[1,1,0,1,1,1],[1,0,0,0,1,0],[0,1,1,1,0,0]],
    [[1,0,0,1,1,0],[1,0,1,0,1,0],[0,1,1,0,1,1],[0,0,1,0,0,0],[1,1,0,1,1,0],[0,1,0,0,0,0]],
  ), 14);
  assert.equal(filledPuzzleCells([[0]], [[1]]), 1);
});

test("OF044 — last feasible gap qua greedy removal predicate", () => {
  const rocks = [2, 14, 11, 21, 17];

  assert.equal(maximumMinimumRockDistance(25, rocks, 2), 4);
  assert.equal(maximumMinimumRockDistance(10, [], 0), 10);
  assert.equal(maximumMinimumRockDistance(10, [5], 1), 10);
  assert.equal(maximumMinimumRockDistance(10, [5], 0), 5);
  assert.equal(maximumMinimumRockDistance(10, [2, 3, 7], 1), 3);
  assert.equal(maximumMinimumRockDistance(10, [2, 3, 7], 3), 10);
  assert.deepEqual(rocks, [2, 14, 11, 21, 17]);
});

test("OF047 — node cũ qua edge mới tạo room, half-step bắt diagonal crossing", () => {
  assert.equal(roomCount([0, 2, 4, 6]), 1);
  assert.equal(roomCount([6,6,6,4,4,4,2,2,2,0,0,0,1,6,5,5,3,6,0]), 3);
  assert.equal(roomCount([0, 4, 0, 4]), 0);
});
