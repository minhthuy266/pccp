function combinations(values, k) {
  if (!Number.isInteger(k) || k < 0 || k > values.length) return [];
  const result = [], path = [];
  function dfs(start) {
    if (path.length === k) { result.push([...path]); return; }
    const need = k - path.length;
    for (let i = start; i <= values.length - need; i++) {
      path.push(values[i]);
      dfs(i + 1);
      path.pop();
    }
  }
  dfs(0);
  return result;
}

function uniquePermutations(values) {
  const sorted = [...values].sort((a, b) => a - b);
  const result = [], path = [], used = Array(sorted.length).fill(false);
  function dfs() {
    if (path.length === sorted.length) { result.push([...path]); return; }
    for (let i = 0; i < sorted.length; i++) {
      if (used[i]) continue;
      if (i > 0 && sorted[i] === sorted[i - 1] && !used[i - 1]) continue;
      used[i] = true;
      path.push(sorted[i]);
      dfs();
      path.pop();
      used[i] = false;
    }
  }
  dfs();
  return result;
}

function subsetSumExistsNonNegative(values, target) {
  if (target < 0 || values.some((value) => value < 0)) {
    throw new RangeError("Pruning template requires non-negative values and target");
  }
  const suffix = Array(values.length + 1).fill(0);
  for (let i = values.length - 1; i >= 0; i--) suffix[i] = suffix[i + 1] + values[i];
  function dfs(index, sum) {
    if (sum === target) return true;
    if (index === values.length || sum > target || sum + suffix[index] < target) return false;
    return dfs(index + 1, sum + values[index]) || dfs(index + 1, sum);
  }
  return dfs(0, 0);
}

function subsetSumsByMask(values) {
  const count = 2 ** values.length;
  const sums = [];
  for (let mask = 0; mask < count; mask++) {
    let sum = 0;
    for (let i = 0; i < values.length; i++) if (Math.floor(mask / (2 ** i)) % 2 === 1) sum += values[i];
    sums.push(sum);
  }
  return sums;
}

function minCoinsMemo(coins, amount) {
  if (amount < 0 || coins.some((coin) => !Number.isInteger(coin) || coin <= 0)) {
    throw new RangeError("Coins must be positive integers and amount non-negative");
  }
  const memo = new Map([[0, 0]]);
  function solve(remain) {
    if (remain < 0) return Infinity;
    if (memo.has(remain)) return memo.get(remain);
    let best = Infinity;
    for (const coin of coins) best = Math.min(best, solve(remain - coin) + 1);
    memo.set(remain, best);
    return best;
  }
  const answer = solve(amount);
  return Number.isFinite(answer) ? answer : -1;
}

function canMakeSum01(values, target) {
  if (target < 0 || values.some((value) => !Number.isInteger(value) || value < 0)) {
    throw new RangeError("1D table template requires non-negative integers");
  }
  const dp = Array(target + 1).fill(false);
  dp[0] = true;
  for (const value of values) {
    for (let sum = target; sum >= value; sum--) dp[sum] ||= dp[sum - value];
  }
  return dp[target];
}

function countGridPaths(grid) {
  if (!Array.isArray(grid) || grid.length === 0 || grid[0].length === 0) return 0;
  const rows = grid.length, cols = grid[0].length;
  if (grid.some((row) => row.length !== cols)) throw new RangeError("Grid must be rectangular");
  if (grid[0][0] === 1 || grid[rows - 1][cols - 1] === 1) return 0;
  const dp = Array.from({ length: rows }, () => Array(cols).fill(0));
  dp[0][0] = 1;
  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      if (grid[r][c] === 1 || (r === 0 && c === 0)) continue;
      dp[r][c] = (r > 0 ? dp[r - 1][c] : 0) + (c > 0 ? dp[r][c - 1] : 0);
    }
  }
  return dp[rows - 1][cols - 1];
}

function chooseSearchEngine({ mustEnumerate = false, repeatedState = false, acyclicOrder = false, exchangeProof = false }) {
  if (exchangeProof) return "GREEDY";
  if (mustEnumerate && !repeatedState) return "BACKTRACKING";
  if (repeatedState && acyclicOrder) return "BOTTOM_UP_DP";
  if (repeatedState) return "MEMOIZATION";
  return "BRUTE_FORCE_OR_REMODEL";
}

module.exports = {
  canMakeSum01,
  chooseSearchEngine,
  combinations,
  countGridPaths,
  minCoinsMemo,
  subsetSumExistsNonNegative,
  subsetSumsByMask,
  uniquePermutations,
};
