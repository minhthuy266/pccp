function joystickMinimumMoves(name) {
  const length = name.length;
  let verticalMoves = 0;
  let horizontalMoves = Math.max(0, length - 1);

  for (let index = 0; index < length; index++) {
    const alphabetIndex = name.charCodeAt(index) - 65;
    verticalMoves += Math.min(alphabetIndex, 26 - alphabetIndex);

    let next = index + 1;
    while (next < length && name[next] === "A") next++;

    horizontalMoves = Math.min(
      horizontalMoves,
      index * 2 + length - next,
      index + (length - next) * 2,
    );
  }

  return verticalMoves + horizontalMoves;
}

module.exports = { joystickMinimumMoves };
