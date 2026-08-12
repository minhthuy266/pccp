const test = require("node:test");
const assert = require("node:assert/strict");

const { bridgeCrossingTime } = require("../solutions/official/OF010.js");
const { topMockExamScorers } = require("../solutions/official/OF019.js");
const { dateToSerial, expiredPrivacyIndices } = require("../solutions/official/OF048.js");
const { targetNumberWays } = require("../solutions/official/OF036.js");
const { maximumDungeonCount } = require("../solutions/official/OF022.js");

test("OF010 — exit được xử lý trước enter trong cùng giây", () => {
  assert.equal(bridgeCrossingTime(2, 10, [7, 4, 5, 6]), 8);
  assert.equal(bridgeCrossingTime(100, 100, [10]), 101);
  assert.equal(bridgeCrossingTime(1, 10, [5, 5, 5]), 4);
});

test("OF019 — cycle bằng modulo và trả mọi người hòa theo thứ tự", () => {
  assert.deepEqual(topMockExamScorers([1, 2, 3, 4, 5]), [1]);
  assert.deepEqual(topMockExamScorers([1, 3, 2, 4, 2]), [1, 2, 3]);
  assert.deepEqual(topMockExamScorers([2]), [2]);
});

test("OF048 — serial date dùng tháng 28 ngày và expiry-exclusive", () => {
  assert.equal(dateToSerial("2022.01.01") + 28, dateToSerial("2022.02.01"));
  assert.deepEqual(
    expiredPrivacyIndices(
      "2022.05.19",
      ["A 6", "B 12", "C 3"],
      ["2021.05.02 A", "2021.07.01 B", "2022.02.19 C", "2022.02.20 C"],
    ),
    [1, 3],
  );
  assert.deepEqual(expiredPrivacyIndices("2022.02.01", ["A 1"], ["2022.01.01 A"]), [1]);
});

test("OF036 — mỗi index tạo đúng hai nhánh cộng/trừ", () => {
  assert.equal(targetNumberWays([1, 1, 1, 1, 1], 3), 5);
  assert.equal(targetNumberWays([4, 1, 2, 1], 4), 2);
  assert.equal(targetNumberWays([1], -1), 1);
});

test("OF022 — backtracking restore visited sau mỗi choice", () => {
  assert.equal(maximumDungeonCount(80, [[80, 20], [50, 40], [30, 10]]), 3);
  assert.equal(maximumDungeonCount(10, [[11, 1], [20, 1]]), 0);
  assert.equal(maximumDungeonCount(5, [[5, 5], [5, 1]]), 1);
});
