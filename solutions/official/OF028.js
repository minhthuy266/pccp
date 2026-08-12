function minimumLifeboats(people, limit) {
  const sorted = [...people].sort((a, b) => a - b);
  let lightest = 0;
  let heaviest = sorted.length - 1;
  let boats = 0;

  while (lightest <= heaviest) {
    if (lightest === heaviest) {
      boats++;
      break;
    }

    if (sorted[lightest] + sorted[heaviest] <= limit) {
      lightest++;
    }

    heaviest--;
    boats++;
  }

  return boats;
}

module.exports = { minimumLifeboats };
