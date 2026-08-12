const ROUTE_MODULO = 1_000_000_007;

function schoolRouteCount(width, height, puddles) {
  const blocked = new Set(puddles.map(([x, y]) => `${y - 1},${x - 1}`));
  const dp = Array.from({ length: height }, () => new Uint32Array(width));
  dp[0][0] = 1;

  for (let row = 0; row < height; row++) {
    for (let column = 0; column < width; column++) {
      if (row === 0 && column === 0) continue;
      if (blocked.has(`${row},${column}`)) {
        dp[row][column] = 0;
        continue;
      }
      const fromTop = row > 0 ? dp[row - 1][column] : 0;
      const fromLeft = column > 0 ? dp[row][column - 1] : 0;
      dp[row][column] = (fromTop + fromLeft) % ROUTE_MODULO;
    }
  }

  return dp[height - 1][width - 1];
}

module.exports = { ROUTE_MODULO, schoolRouteCount };
