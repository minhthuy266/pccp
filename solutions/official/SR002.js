function compressedLengthForUnit(string, unit) {
  let length = 0;
  let previous = string.slice(0, unit);
  let repetitions = 1;

  for (let start = unit; start < string.length; start += unit) {
    const current = string.slice(start, start + unit);
    if (current === previous) {
      repetitions++;
      continue;
    }
    length += previous.length + (repetitions > 1 ? String(repetitions).length : 0);
    previous = current;
    repetitions = 1;
  }

  return length + previous.length + (repetitions > 1 ? String(repetitions).length : 0);
}

function shortestCompressedLength(string) {
  if (string.length <= 1) return string.length;
  let best = string.length;
  for (let unit = 1; unit <= Math.floor(string.length / 2); unit++) {
    best = Math.min(best, compressedLengthForUnit(string, unit));
  }
  return best;
}

module.exports = { compressedLengthForUnit, shortestCompressedLength };
