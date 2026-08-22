function isValidParentheses(string) {
  let balance = 0;
  for (const character of string) {
    if (character === "(") {
      balance += 1;
    } else {
      balance -= 1;
    }
    if (balance < 0) {
      return false;
    }
  }
  return balance === 0;
}

module.exports = { isValidParentheses };
