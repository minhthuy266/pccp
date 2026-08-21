function multiLevelProfits(enroll, referral, seller, amount) {
  const parent = new Map();
  const earnings = new Map();

  for (let index = 0; index < enroll.length; index++) {
    parent.set(enroll[index], referral[index]);
    earnings.set(enroll[index], 0);
  }

  for (let sale = 0; sale < seller.length; sale++) {
    let member = seller[sale];
    let profit = amount[sale] * 100;

    while (member !== "-" && profit > 0) {
      const commission = Math.floor(profit * 0.1);
      earnings.set(member, earnings.get(member) + profit - commission);
      member = parent.get(member);
      profit = commission;
    }
  }

  const result = [];
  for (const member of enroll) {
    result.push(earnings.get(member));
  }
  return result;
}

module.exports = { multiLevelProfits };
