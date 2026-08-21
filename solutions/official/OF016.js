function largestConcatenatedNumber(numbers) {
  const ordered = [];

  for (const number of numbers) {
    ordered.push(String(number));
  }

  ordered.sort((first, second) => {
    const secondFirst = second + first;
    const firstSecond = first + second;
    return secondFirst.localeCompare(firstSecond);
  });

  if (ordered[0] === "0") {
    return "0";
  }

  return ordered.join("");
}

module.exports = { largestConcatenatedNumber };
