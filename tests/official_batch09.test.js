const test = require("node:test");
const assert = require("node:assert/strict");

const { averageDiskTurnaround } = require("../solutions/official/OF013.js");
const { bestAlbumSongIndices } = require("../solutions/official/OF005.js");
const { vowelDictionaryRank } = require("../solutions/official/OF024.js");
const { determinableRankCount } = require("../solutions/official/OF046.js");

test("OF013 — jump idle time, then choose shortest arrived job", () => {
  assert.equal(averageDiskTurnaround([[0, 3], [1, 9], [2, 6]]), 9);
  assert.equal(averageDiskTurnaround([[5, 2]]), 2);
  assert.equal(averageDiskTurnaround([[0, 10], [0, 1], [0, 2]]), 5);
});

test("OF005 — genre total, song plays và original-index tie-break", () => {
  assert.deepEqual(
    bestAlbumSongIndices(
      ["classic", "pop", "classic", "classic", "pop"],
      [500, 600, 150, 800, 2500],
    ),
    [4, 1, 3, 0],
  );
  assert.deepEqual(bestAlbumSongIndices(["a", "a", "b"], [10, 10, 5]), [0, 1, 2]);
  assert.deepEqual(bestAlbumSongIndices(["a", "a", "b"], [6, 6, 10]), [0, 1, 2]);
  assert.deepEqual(bestAlbumSongIndices(["a"], [5]), [0]);
  assert.deepEqual(bestAlbumSongIndices(["a", "a", "a"], [3, 2, 1]), [0, 1]);
});

test("OF024 — DFS preorder đúng thứ tự từ điển official", () => {
  assert.equal(vowelDictionaryRank("A"), 1);
  assert.equal(vowelDictionaryRank("AAAAE"), 6);
  assert.equal(vowelDictionaryRank("I"), 1563);
  assert.equal(vowelDictionaryRank("EIO"), 1189);
});

test("OF046 — rank xác định khi comparable với mọi player khác", () => {
  assert.equal(determinableRankCount(5, [[4,3],[4,2],[3,2],[1,2],[2,5]]), 2);
  assert.equal(determinableRankCount(3, [[1,2],[2,3]]), 3);
  assert.equal(determinableRankCount(3, [[1,2]]), 0);
});
