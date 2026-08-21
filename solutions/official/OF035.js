function robLinear(money, start, endExclusive) {
  let twoBack = 0;
  let oneBack = 0;
  for (let index = start; index < endExclusive; index++) {
    const current = Math.max(oneBack, twoBack + money[index]);
    twoBack = oneBack;
    oneBack = current;
  }
  return oneBack;
}

function maximumCircularRobbery(money) {
  if (money.length === 1) {
    return money[0];
  }
  return Math.max(
    robLinear(money, 0, money.length - 1),
    robLinear(money, 1, money.length),
  );
}

module.exports = { robLinear, maximumCircularRobbery };
