function minimumInterceptors(targets) {
  const sorted = [...targets].sort((a, b) => a[1] - b[1]);
  let shots = 0;
  let lastEnd = -Infinity;

  for (const [start, end] of sorted) {
    if (start >= lastEnd) {
      shots++;
      lastEnd = end;
    }
  }

  return shots;
}

module.exports = { minimumInterceptors };
