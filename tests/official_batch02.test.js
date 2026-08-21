const test = require("node:test");
const assert = require("node:assert/strict");

const { unfinishedParticipant } = require("../solutions/official/OF001.js");
const { maxPokemonKinds } = require("../solutions/official/OF002.js");
const { hasNoPhonePrefix } = require("../solutions/official/OF003.js");
const { clothingCombinations } = require("../solutions/official/OF004.js");

test("OF001 — frequency giữ được duplicate name", () => {
  assert.equal(unfinishedParticipant(["leo", "kiki", "eden"], ["eden", "kiki"]), "leo");
  assert.equal(
    unfinishedParticipant(["mislav", "stanko", "mislav", "ana"], ["stanko", "ana", "mislav"]),
    "mislav",
  );
  assert.equal(unfinishedParticipant(["a"], []), "a");
  assert.equal(unfinishedParticipant(["a", "a", "b"], ["a", "b"]), "a");
});

test("OF002 — đáp án bị chặn bởi số slot và số loại distinct", () => {
  assert.equal(maxPokemonKinds([3, 1, 2, 3]), 2);
  assert.equal(maxPokemonKinds([3, 3, 3, 2, 2, 4]), 3);
  assert.equal(maxPokemonKinds([1, 1]), 1);
  assert.equal(maxPokemonKinds([1, 2, 3, 4]), 2);
  assert.equal(maxPokemonKinds([1, 1, 1, 1]), 1);
});

test("OF003 — chỉ cần kiểm adjacent sau lexicographic sort", () => {
  assert.equal(hasNoPhonePrefix(["119", "97674223", "1195524421"]), false);
  assert.equal(hasNoPhonePrefix(["123", "456", "789"]), true);
  assert.equal(hasNoPhonePrefix(["12", "123", "1235", "567", "88"]), false);
  assert.equal(hasNoPhonePrefix(["911", "91"]), false);
  assert.equal(hasNoPhonePrefix(["12", "312"]), true);

  const originalPhoneBook = ["2", "1"];
  hasNoPhonePrefix(originalPhoneBook);
  assert.deepEqual(originalPhoneBook, ["2", "1"]);
});

test("OF004 — nhân (count + 1) rồi loại outfit rỗng", () => {
  assert.equal(
    clothingCombinations([
      ["yellow_hat", "headgear"],
      ["blue_sunglasses", "eyewear"],
      ["green_turban", "headgear"],
    ]),
    5,
  );
  assert.equal(
    clothingCombinations([
      ["crow_mask", "face"],
      ["blue_sunglasses", "face"],
      ["smoky_makeup", "face"],
    ]),
    3,
  );
  assert.equal(clothingCombinations([["hat", "head"]]), 1);
  assert.equal(
    clothingCombinations([
      ["hat", "head"],
      ["cap", "head"],
      ["glasses", "face"],
    ]),
    5,
  );
});
