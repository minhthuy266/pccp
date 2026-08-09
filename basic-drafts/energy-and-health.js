const simulateEnergyBySecondV1 = (maxEnergy, initEnergy, recovery, tasks) => {
  // Bước 1: Khởi tạo năng lượng hiện tại và vị trí nhiệm vụ.
  // Bước 2: Mô phỏng từng giây; làm nhiệm vụ hoặc hồi năng lượng.
  // Bước 3: Giới hạn năng lượng ở maxEnergy rồi trả về kết quả.
  let currentEnergy = initEnergy;
  let taskIndex = 0;

  for (let t = 1; t <= tasks[tasks.length - 1][0]; t++) {
    if (taskIndex < tasks.length && t === tasks[taskIndex][0]) {
      currentEnergy = currentEnergy - tasks[taskIndex][1];
      taskIndex++;
    } else {
      currentEnergy = Math.min(maxEnergy, currentEnergy + recovery);
    }
  }

  return currentEnergy;
};

// console.log(
//   "simulateEnergyBySecondV1",
//   simulateEnergyBySecondV1(20, 10, 5, [
//     [2, 5],
//     [5, 4],
//   ]),
// );

const simulateEnergyBySecondV2 = (maxEnergy, initEnergy, recovery, tasks) => {
  // Bước 1: Theo dõi năng lượng và nhiệm vụ kế tiếp.
  // Bước 2: Duyệt từng mốc thời gian để trừ hoặc hồi năng lượng.
  // Bước 3: Trả về năng lượng còn lại sau nhiệm vụ cuối.
  let currentEnergy = initEnergy;
  let taskIndex = 0;

  for (let time = 1; time <= tasks[tasks.length - 1][0]; time++) {
    if (taskIndex < tasks.length && time === tasks[taskIndex][0]) {
      console.log("===99==", time);
      currentEnergy -= tasks[taskIndex][1];
      taskIndex++;
    } else {
      currentEnergy = Math.min(maxEnergy, currentEnergy + recovery);
    }
  }

  return currentEnergy;
};

// console.log(
//   "simulateEnergyBySecondV1",
//   simulateEnergyBySecondV2(20, 8, 2, [
//     [3, 4],
//     [6, 7],
//   ]),
// );

const simulateEnergyBySecondV3 = (maxEnergy, initEnergy, recovery, tasks) => {
  // Bước 1: Khởi tạo trạng thái mô phỏng.
  // Bước 2: Tách điều kiện có nhiệm vụ thành biến hasTask để dễ đọc.
  // Bước 3: Cập nhật năng lượng và trả về trạng thái cuối.
  let currentEnergy = initEnergy;
  let taskIndex = 0;

  for (let time = 1; time <= tasks[tasks.length - 1][0]; time++) {
    const hasTask = taskIndex < tasks.length && time === tasks[taskIndex][0];

    if (hasTask) {
      currentEnergy -= tasks[taskIndex][1];
      taskIndex++;
    } else {
      currentEnergy = Math.min(currentEnergy + recovery, maxEnergy);
    }
  }

  return currentEnergy;
};

// console.log(
//   "simulateEnergyBySecondV1====",
//   simulateEnergyBySecondV3(20, 8, 2, [
//     [3, 4],
//     [6, 7],
//   ]),
// );

const simulateHealthBySecond = (maxHealth, initHealth, recovery, attacks) => {
  // Bước 1: Khởi tạo máu hiện tại và chỉ số đòn đánh.
  // Bước 2: Mỗi giây, nhận sát thương hoặc hồi máu.
  // Bước 3: Trả về -1 nếu chết; nếu sống thì trả về máu còn lại.
  let currentHealth = initHealth;
  let attackIndex = 0;

  for (let time = 1; time <= attacks[attacks.length - 1][0]; time++) {
    const hasAttacks =
      attackIndex < attacks.length && time === attacks[attackIndex][0];

    if (hasAttacks) {
      currentHealth -= attacks[attackIndex][1];
      attackIndex++;

      if (currentHealth <= 0) {
        return -1;
      }
    } else {
      currentHealth = Math.min(currentHealth + recovery, maxHealth);
    }
  }

  return currentHealth;
};

// console.log(
//   "simulateHealthBySecond====",
//   simulateHealthBySecond(20, 8, 2, [
//     [3, 4],
//     [6, 7],
//   ]),
// );

const simulateHealthWithSameTimeAttacks = (maxHealth, initHealth, recovery, attacks) => {
  // Bước 1: Theo dõi máu và đòn đánh chưa xử lý.
  // Bước 2: Dùng while để nhận hết các đòn xảy ra cùng một thời điểm.
  // Bước 3: Chỉ hồi máu khi thời điểm đó không có đòn đánh.
  let currentHealth = initHealth;
  let attackIndex = 0;

  for (let time = 1; time <= attacks[attacks.length - 1][0]; time++) {
    let hasAttack = false;

    while (attackIndex < attacks.length && time === attacks[attackIndex][0]) {
      hasAttack = true;

      currentHealth -= attacks[attackIndex][1];
      attackIndex++;

      if (currentHealth <= 0) return -1;

      // 1. Trừ máu
      // 2. attackIndex++
      // 3. Kiểm tra chết
    }

    if (!hasAttack) {
      currentHealth = Math.min(currentHealth + recovery, maxHealth);
    }
  }

  return currentHealth;
};

const calculateHealthByAttackEvents = (maxHealth, initHealth, recovery, attacks) => {
  // Bước 1: Ghi nhớ thời gian của đòn đánh trước.
  // Bước 2: Tính thẳng lượng máu hồi giữa hai đòn rồi trừ sát thương.
  // Bước 3: Kiểm tra tử vong và trả về lượng máu cuối.
  let currentHealth = initHealth;
  let previousAttackTime = 0;

  for (const [attackTime, damage] of attacks) {
    const recoveryTime = attackTime - previousAttackTime - 1;

    currentHealth = Math.min(
      currentHealth + recoveryTime * recovery,
      maxHealth,
    );

    currentHealth -= damage;

    if (currentHealth <= 0) {
      return -1;
    }

    previousAttackTime = attackTime;
  }

  return currentHealth;
};

// console.log(
//   calculateHealthByAttackEvents(20, 8, 2, [
//     [3, 4],
//     [6, 7],
//   ]),
// );

const calculateHealthByAttackEventsV2 = (maxHealth, initHealth, recovery, attacks) => {
  // Bước 1: Duyệt trực tiếp từng sự kiện tấn công.
  // Bước 2: Hồi máu cho khoảng trống giữa hai sự kiện và trừ damage.
  // Bước 3: Dừng nếu chết, nếu không trả về máu sau sự kiện cuối.
  let currentHealth = initHealth;
  let previousAttackTime = 0;

  for (const [attackTime, damage] of attacks) {
    const recoveryTime = attackTime - previousAttackTime - 1;

    currentHealth = Math.min(
      currentHealth + recoveryTime * recovery,
      maxHealth,
    );

    currentHealth -= damage;

    if (currentHealth <= 0) {
      return -1;
    }

    previousAttackTime = attackTime;
  }

  return currentHealth;
};

// console.log(
//   calculateHealthByAttackEventsV2(20, 8, 2, [
//     [3, 4],
//     [6, 7],
//   ]),
// );
