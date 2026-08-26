function encodedRunLength(chunk, repetitions) {
  let encodedLength = chunk.length;

  if (repetitions > 1) {
    encodedLength += String(repetitions).length;
  }

  return encodedLength;
}

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
    length += encodedRunLength(previous, repetitions);
    previous = current;
    repetitions = 1;
  }

  length += encodedRunLength(previous, repetitions);
  return length;
}

function shortestCompressedLength(string) {
  if (string.length <= 1) return string.length;
  let best = string.length;
  for (let unit = 1; unit <= Math.floor(string.length / 2); unit++) {
    best = Math.min(best, compressedLengthForUnit(string, unit));
  }
  return best;
}

module.exports = { encodedRunLength, compressedLengthForUnit, shortestCompressedLength };
