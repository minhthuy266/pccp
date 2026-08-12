function largestNumberAfterRemovingDigits(number, removeCount) {
  const stack = [];
  let remainingRemovals = removeCount;

  for (const digit of number) {
    while (
      remainingRemovals > 0 &&
      stack.length > 0 &&
      stack.at(-1) < digit
    ) {
      stack.pop();
      remainingRemovals--;
    }
    stack.push(digit);
  }

  if (remainingRemovals > 0) stack.length -= remainingRemovals;
  return stack.join("");
}

module.exports = { largestNumberAfterRemovingDigits };
