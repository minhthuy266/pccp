function targetNumberWays(numbers, target) {
  let ways = 0;

  function dfs(index, sum) {
    if (index === numbers.length) {
      if (sum === target) {
        ways += 1;
      }
      return;
    }

    dfs(index + 1, sum + numbers[index]);
    dfs(index + 1, sum - numbers[index]);
  }

  dfs(0, 0);
  return ways;
}

module.exports = { targetNumberWays };
