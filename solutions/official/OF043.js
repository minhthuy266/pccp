function minimumImmigrationTimeBigInt(people, times) {
  const target = BigInt(people);
  const durations = times.map(BigInt);
  let low = 0n;
  let high = durations.reduce((minimum, value) => value < minimum ? value : minimum) * target;

  while (low < high) {
    const middle = (low + high) / 2n;
    let processed = 0n;

    for (const duration of durations) {
      processed += middle / duration;
      if (processed >= target) break;
    }

    if (processed >= target) high = middle;
    else low = middle + 1n;
  }

  return low;
}

function minimumImmigrationTime(people, times) {
  return Number(minimumImmigrationTimeBigInt(people, times));
}

module.exports = { minimumImmigrationTime, minimumImmigrationTimeBigInt };
