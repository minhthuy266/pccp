function discountSignupDays(want, number, discount) {
  const WINDOW_SIZE = 10;
  const need = new Map(want.map((name, index) => [name, number[index]]));
  const windowCount = new Map();
  let exactlyMatchedKinds = 0;
  let answer = 0;

  function change(name, delta) {
    if (!need.has(name)) return;

    const target = need.get(name);
    const before = windowCount.get(name) ?? 0;
    if (before === target) exactlyMatchedKinds--;

    const after = before + delta;
    windowCount.set(name, after);
    if (after === target) exactlyMatchedKinds++;
  }

  for (let index = 0; index < discount.length; index++) {
    change(discount[index], 1);

    if (index >= WINDOW_SIZE) {
      change(discount[index - WINDOW_SIZE], -1);
    }

    if (index >= WINDOW_SIZE - 1 && exactlyMatchedKinds === need.size) {
      answer++;
    }
  }

  return answer;
}

module.exports = { discountSignupDays };
