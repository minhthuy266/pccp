const ANSWER_PATTERNS = [
  [1, 2, 3, 4, 5],
  [2, 1, 2, 3, 2, 4, 2, 5],
  [3, 3, 1, 1, 2, 2, 4, 4, 5, 5],
];

function topMockExamScorers(answers) {
  const scores = Array(ANSWER_PATTERNS.length).fill(0);

  for (let question = 0; question < answers.length; question++) {
    for (let student = 0; student < ANSWER_PATTERNS.length; student++) {
      const pattern = ANSWER_PATTERNS[student];
      if (pattern[question % pattern.length] === answers[question]) {
        scores[student] += 1;
      }
    }
  }

  const best = Math.max(...scores);
  const winners = [];
  for (let student = 0; student < scores.length; student++) {
    if (scores[student] === best) {
      winners.push(student + 1);
    }
  }
  return winners;
}

module.exports = { ANSWER_PATTERNS, topMockExamScorers };
