function targetProcessOrder(priorities, location) {
  const queue = priorities.map((priority, index) => ({ priority, index }));
  const remainingByPriority = Array(10).fill(0);
  let highestRemaining = 0;
  let head = 0;
  let executed = 0;

  for (const priority of priorities) {
    remainingByPriority[priority]++;
    highestRemaining = Math.max(highestRemaining, priority);
  }

  while (head < queue.length) {
    const process = queue[head++];

    if (process.priority < highestRemaining) {
      queue.push(process);
      continue;
    }

    remainingByPriority[process.priority]--;
    executed++;

    while (highestRemaining > 0 && remainingByPriority[highestRemaining] === 0) {
      highestRemaining--;
    }

    if (process.index === location) return executed;
  }

  return -1;
}

module.exports = { targetProcessOrder };
