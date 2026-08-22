function equalQueueSumOperations(queue1, queue2) {
  const total = [...queue1, ...queue2].reduce((sum, value) => sum + value, 0);
  if (total % 2 !== 0) return -1;

  const target = total / 2;
  const combined = [...queue1, ...queue2];
  let current = queue1.reduce((sum, value) => sum + value, 0);
  let left = 0;
  let right = queue1.length;
  let operations = 0;

  while (left < combined.length) {
    if (current === target) return operations;

    if (current < target) {
      if (right >= combined.length) break;
      const enteringValue = combined[right];
      current += enteringValue;
      right += 1;
    } else {
      const leavingValue = combined[left];
      current -= leavingValue;
      left += 1;
    }
    operations += 1;
  }

  return -1;
}

module.exports = { equalQueueSumOperations };
