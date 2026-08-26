function differsByOneCharacter(first, second) {
  let differences = 0;
  for (let index = 0; index < first.length; index++) {
    if (first[index] !== second[index]) {
      differences += 1;
      if (differences > 1) {
        return false;
      }
    }
  }
  return differences === 1;
}

function minimumWordTransformations(begin, target, words) {
  if (!words.includes(target)) return 0;

  const visited = Array(words.length).fill(false);
  const queue = [{ word: begin, steps: 0 }];
  let head = 0;

  while (head < queue.length) {
    const { word, steps } = queue[head];
    head += 1;
    if (word === target) {
      return steps;
    }

    for (let index = 0; index < words.length; index++) {
      if (visited[index] || !differsByOneCharacter(word, words[index])) continue;
      visited[index] = true;
      queue.push({ word: words[index], steps: steps + 1 });
    }
  }

  return 0;
}

module.exports = { differsByOneCharacter, minimumWordTransformations };
