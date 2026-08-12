const test = require("node:test");
const assert = require("node:assert/strict");

const { largestConcatenatedNumber } = require("../solutions/official/OF016.js");
const { minimumLifeboats } = require("../solutions/official/OF028.js");
const { discountSignupDays } = require("../solutions/official/OF052.js");
const { shortestSubsequenceWithSum } = require("../solutions/official/OF053.js");

test("OF016 — comparator chọn thứ tự theo hai phép nối", () => {
  assert.equal(largestConcatenatedNumber([6, 10, 2]), "6210");
  assert.equal(largestConcatenatedNumber([3, 30, 34, 5, 9]), "9534330");
  assert.equal(largestConcatenatedNumber([0, 0, 0]), "0");
  assert.equal(largestConcatenatedNumber([12, 121]), "12121");
});

test("OF028 — mỗi lượt xử lý người nặng nhất và ghép nhẹ nhất khi được", () => {
  assert.equal(minimumLifeboats([70, 50, 80, 50], 100), 3);
  assert.equal(minimumLifeboats([70, 80, 50], 100), 3);
  assert.equal(minimumLifeboats([40, 40, 40, 40], 80), 2);
  assert.equal(minimumLifeboats([50], 100), 1);
});

test("OF052 — fixed window cập nhật matched state khi phần tử vào và ra", () => {
  assert.equal(
    discountSignupDays(
      ["banana", "apple", "rice", "pork", "pot"],
      [3, 2, 2, 2, 1],
      [
        "chicken", "apple", "apple", "banana", "rice", "apple", "pork", "banana",
        "pork", "rice", "pot", "banana", "apple", "banana",
      ],
    ),
    3,
  );
  assert.equal(
    discountSignupDays(["apple"], [10], Array(10).fill("apple")),
    1,
  );
  assert.equal(discountSignupDays(["apple"], [10], Array(9).fill("apple")), 0);
});

test("OF053 — positive sliding window giữ shortest rồi earliest", () => {
  assert.deepEqual(shortestSubsequenceWithSum([1, 2, 3, 4, 5], 7), [2, 3]);
  assert.deepEqual(shortestSubsequenceWithSum([1, 1, 1, 2, 3, 4, 5], 5), [6, 6]);
  assert.deepEqual(shortestSubsequenceWithSum([2, 2, 2, 2, 2], 6), [0, 2]);
  assert.deepEqual(shortestSubsequenceWithSum([5], 5), [0, 0]);
});
