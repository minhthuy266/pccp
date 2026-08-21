const test = require("node:test");
const assert = require("node:assert/strict");

const { isValidBracketSequence, countValidBracketRotations } = require("../solutions/official/SR003.js");
const { canBuildGoal } = require("../solutions/official/SR004.js");
const { toMinutes, homeworkCompletionOrder } = require("../solutions/official/SR005.js");
const { multiLevelProfits } = require("../solutions/official/SR006.js");

test("SR003 — rotation bên ngoài, matching stack bên trong", () => {
  assert.equal(isValidBracketSequence("([]{})"), true);
  assert.equal(isValidBracketSequence("([)]"), false);
  assert.equal(countValidBracketRotations("[](){}"), 3);
  assert.equal(countValidBracketRotations("}]()[{"), 2);
  assert.equal(countValidBracketRotations("[)(]"), 0);
  assert.equal(countValidBracketRotations("}}}"), 0);
});

test("SR004 — mỗi chồng thẻ chỉ được lấy từ front", () => {
  assert.equal(canBuildGoal(
    ["i", "drink", "water"],
    ["want", "to"],
    ["i", "want", "to", "drink", "water"],
  ), "Yes");
  assert.equal(canBuildGoal(
    ["i", "water", "drink"],
    ["want", "to"],
    ["i", "want", "to", "drink", "water"],
  ), "No");
  assert.equal(canBuildGoal(["a"], ["b"], ["a", "b"]), "Yes");
});

test("SR005 — bài mới preempt, thời gian rảnh resume theo LIFO", () => {
  assert.equal(toMinutes("12:30"), 750);
  assert.deepEqual(homeworkCompletionOrder([
    ["korean", "11:40", "30"],
    ["english", "12:10", "20"],
    ["math", "12:30", "40"],
  ]), ["korean", "english", "math"]);
  assert.deepEqual(homeworkCompletionOrder([
    ["science", "12:40", "50"],
    ["music", "12:20", "40"],
    ["history", "14:00", "30"],
    ["computer", "12:30", "100"],
  ]), ["science", "history", "computer", "music"]);
  assert.deepEqual(homeworkCompletionOrder([
    ["aaa", "12:00", "20"],
    ["bbb", "12:10", "30"],
    ["ccc", "12:40", "10"],
  ]), ["bbb", "ccc", "aaa"]);
  assert.deepEqual(homeworkCompletionOrder([
    ["d", "14:00", "1"],
    ["b", "12:10", "100"],
    ["a", "12:00", "100"],
    ["c", "12:20", "5"],
  ]), ["c", "b", "d", "a"]);
});

test("SR006 — giữ 90%, truyền floor 10% dọc parent chain", () => {
  const enroll = ["john", "mary", "edward", "sam", "emily", "jaimie", "tod", "young"];
  const referral = ["-", "-", "mary", "edward", "mary", "mary", "jaimie", "edward"];
  assert.deepEqual(multiLevelProfits(
    enroll,
    referral,
    ["young", "john", "tod", "emily", "mary"],
    [12, 4, 2, 5, 10],
  ), [360, 958, 108, 0, 450, 18, 180, 1080]);
  assert.deepEqual(multiLevelProfits(
    enroll,
    referral,
    ["sam", "emily", "jaimie", "edward"],
    [2, 3, 5, 4],
  ), [0, 110, 378, 180, 270, 450, 0, 0]);
});
