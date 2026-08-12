function hasNoPhonePrefix(phoneBook) {
  const sorted = [...phoneBook].sort();

  for (let index = 0; index + 1 < sorted.length; index++) {
    if (sorted[index + 1].startsWith(sorted[index])) return false;
  }

  return true;
}

module.exports = { hasNoPhonePrefix };
