const closingToOpening = new Map([
  [")", "("],
  ["]", "["],
  ["}", "{"],
]);

function isValidBracketSequence(sequence) {
  const stack = [];

  for (const bracket of sequence) {
    if (!closingToOpening.has(bracket)) {
      stack.push(bracket);
      continue;
    }

    if (stack.pop() !== closingToOpening.get(bracket)) return false;
  }

  return stack.length === 0;
}

function countValidBracketRotations(sequence) {
  let count = 0;
  const doubled = sequence + sequence;

  for (let offset = 0; offset < sequence.length; offset++) {
    const rotation = doubled.slice(offset, offset + sequence.length);
    if (isValidBracketSequence(rotation)) count++;
  }

  return count;
}

module.exports = { isValidBracketSequence, countValidBracketRotations };
