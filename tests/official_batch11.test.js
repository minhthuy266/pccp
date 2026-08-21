const test = require("node:test");
const assert = require("node:assert/strict");

const { minimumWalletArea } = require("../solutions/official/OF018.js");
const { isPrime, primePermutationCount } = require("../solutions/official/OF020.js");
const { carpetDimensions } = require("../solutions/official/OF021.js");
const { maximumGymClassAttendance } = require("../solutions/official/OF025.js");
const { largestNumberAfterRemovingDigits } = require("../solutions/official/OF027.js");

test("OF018 — normalize mỗi card thành cạnh dài/cạnh ngắn", () => {
  assert.equal(minimumWalletArea([[60, 50], [30, 70], [60, 30], [80, 40]]), 4000);
  assert.equal(minimumWalletArea([[10, 7], [12, 3], [8, 15], [14, 7], [5, 15]]), 120);
  assert.equal(minimumWalletArea([[1, 1]]), 1);
  assert.equal(minimumWalletArea([[10, 100], [90, 20]]), 2000);
});

test("OF020 — permutation theo index và Set loại duplicate/leading-zero", () => {
  assert.equal(isPrime(2), true);
  assert.equal(isPrime(1), false);
  assert.equal(isPrime(49), false);
  assert.equal(primePermutationCount("17"), 3);
  assert.equal(primePermutationCount("011"), 2);
  assert.equal(primePermutationCount("000"), 0);
});

test("OF021 — factor pair phải khớp cả total lẫn yellow interior", () => {
  assert.deepEqual(carpetDimensions(10, 2), [4, 3]);
  assert.deepEqual(carpetDimensions(8, 1), [3, 3]);
  assert.deepEqual(carpetDimensions(24, 24), [8, 6]);
});

test("OF025 — overlap tự dùng reserve trước, sau đó cho mượn hàng xóm", () => {
  assert.equal(maximumGymClassAttendance(5, [2, 4], [1, 3, 5]), 5);
  assert.equal(maximumGymClassAttendance(5, [2, 4], [3]), 4);
  assert.equal(maximumGymClassAttendance(3, [3], [1]), 2);
  assert.equal(maximumGymClassAttendance(5, [2, 3], [3, 4]), 4);
});

test("OF027 — monotonic stack xóa digit nhỏ gần nhất bên trái", () => {
  assert.equal(largestNumberAfterRemovingDigits("1924", 2), "94");
  assert.equal(largestNumberAfterRemovingDigits("1231234", 3), "3234");
  assert.equal(largestNumberAfterRemovingDigits("4177252841", 4), "775841");
  assert.equal(largestNumberAfterRemovingDigits("9876", 2), "98");
});
