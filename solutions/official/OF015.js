function kthNumbers(array, commands) {
  const answer = [];

  for (const [start, end, rank] of commands) {
    const sorted = array.slice(start - 1, end).sort((a, b) => a - b);
    answer.push(sorted[rank - 1]);
  }

  return answer;
}

module.exports = { kthNumbers };
