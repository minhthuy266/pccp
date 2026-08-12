const VOWELS = ["A", "E", "I", "O", "U"];

function vowelDictionaryRank(word) {
  let rank = 0;
  let answer = 0;

  function dfs(prefix) {
    for (const vowel of VOWELS) {
      const next = prefix + vowel;
      rank++;
      if (next === word) {
        answer = rank;
        return true;
      }
      if (next.length < 5 && dfs(next)) return true;
    }
    return false;
  }

  dfs("");
  return answer;
}

module.exports = { VOWELS, vowelDictionaryRank };
