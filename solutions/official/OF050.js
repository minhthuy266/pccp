function finalRunningOrder(players, callings) {
  const order = [...players];
  const indexByPlayer = new Map(order.map((player, index) => [player, index]));

  for (const calledPlayer of callings) {
    const calledIndex = indexByPlayer.get(calledPlayer);
    const overtakenPlayer = order[calledIndex - 1];

    order[calledIndex - 1] = calledPlayer;
    order[calledIndex] = overtakenPlayer;
    indexByPlayer.set(calledPlayer, calledIndex - 1);
    indexByPlayer.set(overtakenPlayer, calledIndex);
  }

  return order;
}

module.exports = { finalRunningOrder };
