function unfinishedParticipant(participant, completion) {
  const remainingByName = new Map();

  for (const name of participant) {
    remainingByName.set(name, (remainingByName.get(name) ?? 0) + 1);
  }

  for (const name of completion) {
    remainingByName.set(name, remainingByName.get(name) - 1);
  }

  for (const [name, remaining] of remainingByName) {
    if (remaining > 0) return name;
  }

  return "";
}

module.exports = { unfinishedParticipant };
