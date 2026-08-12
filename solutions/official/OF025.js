function maximumGymClassAttendance(n, lost, reserve) {
  const lostSet = new Set(lost);
  const reserveSet = new Set(reserve);

  for (const student of [...lostSet]) {
    if (!reserveSet.has(student)) continue;
    lostSet.delete(student);
    reserveSet.delete(student);
  }

  const borrowers = [...lostSet].sort((a, b) => a - b);
  for (const student of borrowers) {
    if (reserveSet.has(student - 1)) reserveSet.delete(student - 1);
    else if (reserveSet.has(student + 1)) reserveSet.delete(student + 1);
    else continue;
    lostSet.delete(student);
  }

  return n - lostSet.size;
}

module.exports = { maximumGymClassAttendance };
