function maximumArithmeticExpressionValue(tokens) {
  const numbers = tokens.filter((_, index) => index % 2 === 0).map(Number);
  const operators = tokens.filter((_, index) => index % 2 === 1);
  const count = numbers.length;
  const minimum = Array.from({ length: count }, () => Array(count).fill(Infinity));
  const maximum = Array.from({ length: count }, () => Array(count).fill(-Infinity));

  for (let index = 0; index < count; index++) {
    minimum[index][index] = numbers[index];
    maximum[index][index] = numbers[index];
  }

  for (let length = 2; length <= count; length++) {
    for (let left = 0; left + length <= count; left++) {
      const right = left + length - 1;

      for (let split = left; split < right; split++) {
        if (operators[split] === "+") {
          maximum[left][right] = Math.max(
            maximum[left][right],
            maximum[left][split] + maximum[split + 1][right],
          );
          minimum[left][right] = Math.min(
            minimum[left][right],
            minimum[left][split] + minimum[split + 1][right],
          );
        } else {
          maximum[left][right] = Math.max(
            maximum[left][right],
            maximum[left][split] - minimum[split + 1][right],
          );
          minimum[left][right] = Math.min(
            minimum[left][right],
            minimum[left][split] - maximum[split + 1][right],
          );
        }
      }
    }
  }

  return maximum[0][count - 1];
}

module.exports = { maximumArithmeticExpressionValue };
