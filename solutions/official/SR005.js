function toMinutes(time) {
  const [hour, minute] = time.split(":").map(Number);
  return hour * 60 + minute;
}

function homeworkCompletionOrder(plans) {
  const tasks = [];

  for (const [name, start, duration] of plans) {
    tasks.push({
      name,
      start: toMinutes(start),
      remaining: Number(duration),
    });
  }

  tasks.sort((left, right) => {
    return left.start - right.start;
  });

  const paused = [];
  const completed = [];

  for (let index = 0; index < tasks.length - 1; index++) {
    const current = tasks[index];
    let available = tasks[index + 1].start - current.start;

    if (current.remaining > available) {
      paused.push({ name: current.name, remaining: current.remaining - available });
      continue;
    }

    completed.push(current.name);
    available -= current.remaining;

    while (available > 0 && paused.length > 0) {
      const resumed = paused.pop();
      if (resumed.remaining <= available) {
        available -= resumed.remaining;
        completed.push(resumed.name);
      } else {
        resumed.remaining -= available;
        paused.push(resumed);
        available = 0;
      }
    }
  }

  completed.push(tasks.at(-1).name);
  while (paused.length > 0) {
    const resumed = paused.pop();
    completed.push(resumed.name);
  }

  return completed;
}

module.exports = { toMinutes, homeworkCompletionOrder };
