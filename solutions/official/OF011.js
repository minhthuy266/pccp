function stockPriceDurations(prices) {
  const answer = prices.map((_, index) => prices.length - 1 - index);
  const unresolved = [];

  for (let current = 0; current < prices.length; current++) {
    while (
      unresolved.length > 0 &&
      prices[unresolved.at(-1)] > prices[current]
    ) {
      const previous = unresolved.pop();
      answer[previous] = current - previous;
    }
    unresolved.push(current);
  }

  return answer;
}

module.exports = { stockPriceDurations };
