const test = require("node:test");
const assert = require("node:assert/strict");

const { differsByOneCharacter, minimumWordTransformations } = require("../solutions/official/OF039.js");
const { farthestNodeCount } = require("../solutions/official/OF045.js");
const { deliverableVillageCount } = require("../solutions/official/OF059.js");
const { maximumTrianglePath } = require("../solutions/official/OF032.js");
const { schoolRouteCount } = require("../solutions/official/OF033.js");

test("OF039 — implicit edge cần khác đúng một ký tự", () => {
  assert.equal(differsByOneCharacter("hit", "hot"), true);
  assert.equal(differsByOneCharacter("hit", "hit"), false);
  assert.equal(differsByOneCharacter("hit", "cog"), false);
  assert.equal(minimumWordTransformations("hit", "cog", ["hot", "dot", "dog", "lot", "log", "cog"]), 4);
  assert.equal(minimumWordTransformations("hit", "cog", ["hot", "dot", "dog", "lot", "log"]), 0);
  assert.equal(minimumWordTransformations("aaa", "bbb", ["aab", "aba", "abb", "bbb"]), 3);
});

test("OF045 — BFS đếm mọi node ở maximum shortest distance", () => {
  assert.equal(farthestNodeCount(6, [[3,6],[4,3],[3,2],[1,3],[1,2],[2,4],[5,2]]), 3);
  assert.equal(farthestNodeCount(2, [[1,2]]), 1);
  assert.equal(farthestNodeCount(1, []), 1);
});

test("OF059 — Dijkstra xử lý parallel edge và stale heap entry", () => {
  assert.equal(deliverableVillageCount(5, [[1,2,1],[2,3,3],[5,2,2],[1,4,2],[5,3,1],[5,4,2]], 3), 4);
  assert.equal(deliverableVillageCount(3, [[1,2,10],[1,2,1],[2,3,1]], 2), 3);
});

test("OF059 — 2,000 parallel road ở official bound vẫn xử lý hết stale heap entry", () => {
  const roads = Array.from(
    { length: 2_000 },
    (_, index) => [1, 2, 2_000 - index],
  );
  assert.equal(deliverableVillageCount(2, roads, 1), 2);
});

test("OF032 — bottom-up DP chọn child tốt nhất", () => {
  assert.equal(maximumTrianglePath([[7],[3,8],[8,1,0],[2,7,4,4],[4,5,2,6,5]]), 30);
  assert.equal(maximumTrianglePath([[5]]), 5);
  assert.equal(maximumTrianglePath([[-1],[-2,-3]]), -3);
});

test("OF033 — puddle coordinate x,y được đổi thành row,column", () => {
  assert.equal(schoolRouteCount(4, 3, [[2, 2]]), 4);
  assert.equal(schoolRouteCount(2, 2, []), 2);
  assert.equal(schoolRouteCount(3, 2, [[2, 1]]), 1);
});
