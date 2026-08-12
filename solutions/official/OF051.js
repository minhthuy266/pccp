function craneGame(board, moves) {
  const basket = [];
  let removed = 0;

  for (const move of moves) {
    const column = move - 1;

    for (let row = 0; row < board.length; row++) {
      if (board[row][column] === 0) continue;

      const doll = board[row][column];
      board[row][column] = 0;

      if (basket.length > 0 && basket.at(-1) === doll) {
        basket.pop();
        removed += 2;
      } else {
        basket.push(doll);
      }

      break;
    }
  }

  return removed;
}

module.exports = { craneGame };
