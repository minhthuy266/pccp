const DAYS_PER_MONTH = 28;
const MONTHS_PER_YEAR = 12;

function dateToSerial(date) {
  const [year, month, day] = date.split(".").map(Number);
  return (
    year * MONTHS_PER_YEAR * DAYS_PER_MONTH +
    (month - 1) * DAYS_PER_MONTH +
    (day - 1)
  );
}

function expiredPrivacyIndices(today, terms, privacies) {
  const termMonths = new Map();
  for (const term of terms) {
    const [code, rawMonths] = term.split(" ");
    termMonths.set(code, Number(rawMonths));
  }

  const todaySerial = dateToSerial(today);
  const expired = [];

  for (let index = 0; index < privacies.length; index++) {
    const [startDate, code] = privacies[index].split(" ");
    const expiryExclusive =
      dateToSerial(startDate) + termMonths.get(code) * DAYS_PER_MONTH;
    if (expiryExclusive <= todaySerial) {
      expired.push(index + 1);
    }
  }

  return expired;
}

module.exports = { dateToSerial, expiredPrivacyIndices };
