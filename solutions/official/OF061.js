function nextGreaterValues(numbers) {
  const answer = Array(numbers.length).fill(-1);
  const unresolved = [];

  for (let current = 0; current < numbers.length; current++) {
    while (
      unresolved.length > 0 &&
      numbers[unresolved.at(-1)] < numbers[current]
    ) {
      answer[unresolved.pop()] = numbers[current];
    }
    unresolved.push(current);
  }
  return answer;
}

module.exports = { nextGreaterValues };
