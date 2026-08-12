const test = require("node:test");
const assert = require("node:assert/strict");

const { kthNumbers } = require("../solutions/official/OF015.js");
const { parkWalk } = require("../solutions/official/OF049.js");
const { craneGame } = require("../solutions/official/OF051.js");

test("OF015 — cắt theo chỉ số 1-based, sort số và lấy rank", () => {
  assert.deepEqual(
    kthNumbers(
      [1, 5, 2, 6, 3, 7, 4],
      [
        [2, 5, 3],
        [4, 4, 1],
        [1, 7, 3],
      ],
    ),
    [5, 6, 3],
  );
  assert.deepEqual(kthNumbers([10], [[1, 1, 1]]), [10]);
  assert.deepEqual(kthNumbers([10, 2, 1], [[1, 3, 2]]), [2]);
});

test("OF049 — command phải rollback toàn bộ nếu một bước invalid", () => {
  assert.deepEqual(parkWalk(["SOO", "OOO", "OOO"], ["E 2", "S 2", "W 1"]), [2, 1]);
  assert.deepEqual(parkWalk(["SOO", "OXX", "OOO"], ["E 2", "S 1"]), [0, 2]);
  assert.deepEqual(parkWalk(["OSO", "OOO"], ["N 1", "W 1"]), [0, 0]);
});

test("OF051 — lấy một doll mỗi move, mutate ô về 0 và pop cặp", () => {
  const board = [
    [0, 0, 0, 0, 0],
    [0, 0, 1, 0, 3],
    [0, 2, 5, 0, 1],
    [4, 2, 4, 4, 2],
    [3, 5, 1, 3, 1],
  ];
  assert.equal(craneGame(board, [1, 5, 3, 5, 1, 2, 1, 4]), 4);
  assert.equal(board[3][0], 0);
  assert.equal(craneGame([[1]], [1, 1]), 0);
  assert.equal(craneGame([[1], [1]], [1, 1]), 2);
});
