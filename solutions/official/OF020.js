function isPrime(number) {
  if (number < 2) return false;
  if (number % 2 === 0) return number === 2;
  for (let divisor = 3; divisor * divisor <= number; divisor += 2) {
    if (number % divisor === 0) return false;
  }
  return true;
}

function primePermutationCount(numbers) {
  const digits = [...numbers];
  const used = Array(digits.length).fill(false);
  const candidates = new Set();

  function dfs(current) {
    for (let index = 0; index < digits.length; index++) {
      if (used[index]) continue;
      used[index] = true;
      const next = current + digits[index];
      candidates.add(Number(next));
      dfs(next);
      used[index] = false;
    }
  }

  dfs("");
  let answer = 0;
  for (const candidate of candidates) if (isPrime(candidate)) answer++;
  return answer;
}

module.exports = { isPrime, primePermutationCount };
