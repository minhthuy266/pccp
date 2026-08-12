function largestConcatenatedNumber(numbers) {
  const ordered = numbers
    .map(String)
    .sort((a, b) => (b + a).localeCompare(a + b));

  if (ordered[0] === "0") return "0";
  return ordered.join("");
}

module.exports = { largestConcatenatedNumber };
