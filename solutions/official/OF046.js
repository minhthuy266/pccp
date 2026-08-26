function determinableRankCount(n, results) {
  const beats = Array.from({ length: n }, () => new Uint8Array(n));
  for (const [winner, loser] of results) {
    beats[winner - 1][loser - 1] = 1;
  }

  for (let middle = 0; middle < n; middle++) {
    for (let from = 0; from < n; from++) {
      if (beats[from][middle] === 0) {
        continue;
      }
      for (let to = 0; to < n; to++) {
        if (beats[middle][to]) {
          beats[from][to] = 1;
        }
      }
    }
  }

  let answer = 0;
  for (let player = 0; player < n; player++) {
    let comparable = 0;
    for (let other = 0; other < n; other++) {
      if (player !== other && (beats[player][other] || beats[other][player])) {
        comparable += 1;
      }
    }
    if (comparable === n - 1) {
      answer += 1;
    }
  }
  return answer;
}

module.exports = { determinableRankCount };
