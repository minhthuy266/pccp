function maximumTrianglePath(triangle) {
  const best = [...triangle.at(-1)];

  for (let row = triangle.length - 2; row >= 0; row--) {
    for (let column = 0; column < triangle[row].length; column++) {
      best[column] = triangle[row][column] + Math.max(best[column], best[column + 1]);
    }
  }

  return best[0];
}

module.exports = { maximumTrianglePath };
