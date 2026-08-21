function minimumImmigrationTimeBigInt(people, times) {
  const target = BigInt(people);
  const durations = [];
  for (const time of times) {
    durations.push(BigInt(time));
  }

  let fastest = durations[0];
  for (const duration of durations) {
    if (duration < fastest) {
      fastest = duration;
    }
  }

  let low = 0n;
  let high = fastest * target;

  while (low < high) {
    const middle = (low + high) / 2n;
    let processed = 0n;

    for (const duration of durations) {
      processed += middle / duration;
      if (processed >= target) {
        break;
      }
    }

    if (processed >= target) {
      high = middle;
    } else {
      low = middle + 1n;
    }
  }

  return low;
}

function minimumImmigrationTime(people, times) {
  return Number(minimumImmigrationTimeBigInt(people, times));
}

module.exports = { minimumImmigrationTime, minimumImmigrationTimeBigInt };
