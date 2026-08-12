function kthNumbers(array, commands) {
  return commands.map(([start, end, rank]) => {
    const sorted = array.slice(start - 1, end).sort((a, b) => a - b);
    return sorted[rank - 1];
  });
}

module.exports = { kthNumbers };
