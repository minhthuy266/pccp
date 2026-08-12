function hIndex(citations) {
  const sorted = [...citations].sort((a, b) => b - a);
  let answer = 0;
  for (let index = 0; index < sorted.length; index++) {
    const papers = index + 1;
    if (sorted[index] < papers) break;
    answer = papers;
  }
  return answer;
}

module.exports = { hIndex };
