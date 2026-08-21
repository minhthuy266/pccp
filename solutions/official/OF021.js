function carpetDimensions(brown, yellow) {
  const total = brown + yellow;

  for (let height = 3; height * height <= total; height++) {
    if (total % height !== 0) {
      continue;
    }
    const width = total / height;
    if ((width - 2) * (height - 2) === yellow) {
      return [width, height];
    }
  }

  return [];
}

module.exports = { carpetDimensions };
