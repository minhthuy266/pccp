function canBuildGoal(cardDeck1, cardDeck2, goal) {
  let first = 0;
  let second = 0;

  for (const word of goal) {
    if (cardDeck1[first] === word) {
      first++;
    } else if (cardDeck2[second] === word) {
      second++;
    } else {
      return "No";
    }
  }

  return "Yes";
}

module.exports = { canBuildGoal };
