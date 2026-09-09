// const tree = {
//   A: ["B", "C"],
//   B: ["D", "E"],
//   C: ["F"],
//   D: [],
//   E: [],
//   F: [],
// };

// function dfs(node) {
//   console.log(node);

//   for (const child of tree[node]) {
//     dfs(child);
//   }
// }

// dfs("A");

// function generate() {
//   function dfs(step, path) {
//     if (step === 2) {
//       console.log(path);
//       return;
//     }

//     dfs(step + 1, path + "A");
//     dfs(step + 1, path + "B");
//   }

//   dfs(0, "");
// }

// generate();

// function solution(numbers, target) {
//   function dfs(index, sum) {
//     // TODO:
//     // Nếu index bằng numbers.length:
//     //   Nếu sum bằng target → return 1
//     //   Nếu không → return 0

//     // Phần thử cộng/trừ: lát nữa viết

//     if (index === numbers.length) {
//       if (sum === target) {
//         return 1
//       }

//       return 0
//     }

//     const plus = dfs(index + 1, sum + numbers[index])
//     const minus = dfs(index + 1, sum - numbers[index])

//     return plus + minus
//   }

//   return dfs(0, 0);
// }

// function solution(numbers, target) {
//   function dfs(index, sum) {
//     if (index === numbers.length) {
//       return sum === target ? 1 : 0;
//     }

//     // Lấy số hiện tại
//     const take = dfs(index + 1, sum + numbers[index])

//     // Bỏ số hiện tại
//     const skip = dfs(index + 1, sum)

//     // Tổng số cách đúng từ hai nhánh
//     return take + skip
//   }

//   return dfs(0, 0);
// }

// console.log(solution([1, 2, 3], 3)); // 2

// const people = ["An", "Bình", "Chi"]
// const used = Array(people.length).fill(false)

const people = ["An", "Bình", "Chi"];
const used = Array(people.length).fill(false);
const picked = [];

function dfs() {
  // Chọn đủ hai người: người chạy, rồi người bơi
  if (picked.length === 2) {
    console.log([...picked]);
    return;
  }

  for (let i = 0; i < people.length; i++) {
    // Người đang được dùng thì bỏ qua
    if (used[i]) continue;

    // Chọn người này
    used[i] = true;
    picked.push(people[i]);

    // Đi chọn người cho vị trí tiếp theo
    dfs();

    // Thử xong: bỏ lựa chọn để thử người khác
    picked.pop();
    used[i] = false;
  }
}

dfs();

function solution(ability) {
  const studentCount = ability.length;
  const sportCount = ability[0].length;

  const used = Array(studentCount).fill(false);

  let maxScore = 0;

  function dfs(sport, score) {
    // Đã phân công đủ tất cả các môn
    if (sport === sportCount) {
      maxScore = Math.max(maxScore, score);

      return;
    }

    // Thử từng học sinh cho môn hiện tại
    for (let student = 0; student < studentCount; student++) {
      // Người này đã thi môn trước
      if (used[student]) {
        continue;
      }

      // CHỌN
      used[student] = true;

      // ĐI SÂU
      dfs(sport + 1, score + ability[student][sport]);

      // HOÀN TÁC
      used[student] = false;
    }
  }

  dfs(0, 0);

  return maxScore;
}

const solutionMetmoi = (k, dungeons) => {
  const used = Array(dungeons.length).fill(false);

  let answer;

  function dfs(currentFatigue, count) {
    // 1. Ghi nhận số dungeon đã đi

    const used = Array(dungeons).fill(false);
    // 2. Thử từng dungeon

    for (let i = 0; i < dungeons.length; i++) {
      const [required, consumed] = dungeons[i];
      if (used[i]) continue;

      if (currentFatigue < required) continue;

      used[i] = true;

      dfs(currentFatigue - required, count + 1);

      used[i] = false;
    }

    dfs(k, 0);

    return answer;

    // 3. Bỏ qua nếu đã dùng hoặc không đủ fatigue

    // 4. Chọn

    // 5. Đi sâu với fatigue mới và count mới

    // 6. Restore
  }
};
function solution(ability) {
  const studentCount = ability.length;
  const sportCount = ability[0].length;

  const used = Array(studentCount).fill(false);
  let maxScore = 0;

  function dfs(sport, score) {
    if (sport === sportCount) {
      maxScore = Math.max(maxScore, score);
      return;
    }

    for (let student = 0; student < studentCount; student++) {
      if (used[student]) continue;

      used[student] = true;

      dfs(sport + 1, score + ability[student][sport]);

      used[student] = false;
    }
  } // đóng dfs tại đây

  dfs(0, 0); // khởi động DFS đúng một lần
  return maxScore;
}

// const ability = [
//   [10, 20], // học sinh 0
//   [30, 5]   // học sinh 1
// ];

const solution = (ability) => {
  const studentCount = ability.length;
  const sportCount = ability[0].length;

  const used = Array(studentCount).fill(false);
  let maxScore = 0;

  const dfs = (sport, score) => {
    if (sport === sportCount) {
      maxScore = Math.max(score, maxScore);
      return;
    }

    for (let student = 0; student < studentCount; student++) {
      if (used[student]) continue;

      used[student] = true;

      dfs(sport + 1, score + ability[student][sport]);

      used[student] = false;
    }
  };

  dfs(0, 0);

  return maxScore;
};

function solution(land) {
  // TODO 1: rows
  const rows = land.length;

  // TODO 2: cols
  const cols = land[0].length;

  // TODO 3: visited kích thước rows × cols
  const oilByColumn = Array(cols).fill(0);
  const visited = Array.from({ length: rows }, () => Array(cols).fill(false));

  // TODO 4: bốn hướng
  const DIRECTIONS = [
    [-1, 0], // top
    [0, 1], // right
    [1, 0], // bottom
    [0, -1], //left
  ];

  let size = 0;
  let touchedColumns = new Set();

  const dfs = (row, col) => {
    visited[row][col] = true;
    size++;
    touchedColumns.add(col);

    for (const [dr, dc] of DIRECTIONS) {
      const nextRow = row + dr;
      const nextCol = col + dc;

      if (nextRow < 0 || nextRow >= rows || nextCol < 0 || nextCol >= cols) {
        continue;
      }

      if (land[nextRow][nextCol] === 0) {
        continue;
      }

      if (visited[nextRow][nextCol]) {
        continue;
      }

      dfs(nextRow, nextCol);
    }
  };

  for (let row = 0; row < rows; row++) {
    for (let col = 0; col < cols; col++) {
      if (land[row][col] === 0) {
        continue;
      }

      if (visited[row][col]) {
        continue;
      }

      size = 0;
      touchedColumns = new Set();
      dfs(row, col);

      for (const touchedCol of touchedColumns) {
        oilByColumn[touchedCol] += size;
      }

      console.log("Kich thuoc khoi", size);
    }
  }

  return Math.max(...oilByColumn);
}

function solution(land) {
  const rows = land.length;
  const cols = land[0].length;

  const oilByColumn = Array(cols).fill(0);

  const directions = [
    [-1, 0],
    [1, 0],
    [0, -1],
    [0, 1],
  ];

  for (let row = 0; row < rows; row++) {
    for (let col = 0; col < cols; col++) {
      if (land[row][col] === 0) continue;

      let size = 0;
      const touchedColumns = new Set();
      const stack = [[row, col]];

      // Đánh dấu ngay khi cho vào stack
      land[row][col] = 0;

      while (stack.length > 0) {
        const [currentRow, currentCol] = stack.pop();

        size++;
        touchedColumns.add(currentCol);

        for (const [dr, dc] of directions) {
          const nextRow = currentRow + dr;
          const nextCol = currentCol + dc;

          if (
            nextRow < 0 ||
            nextRow >= rows ||
            nextCol < 0 ||
            nextCol >= cols
          ) {
            continue;
          }

          if (land[nextRow][nextCol] === 0) {
            continue;
          }

          land[nextRow][nextCol] = 0;
          stack.push([nextRow, nextCol]);
        }
      }

      for (const touchedCol of touchedColumns) {
        oilByColumn[touchedCol] += size;
      }
    }
  }

  return Math.max(...oilByColumn);
}

function solution(land) {
  // 1. rows, cols
  const rows = land.length;
  const cols = land[0].length;

  // 2. bốn directions
  const DIRECTIONS = [
    [-1, 0],
    [0, 1],
    [1, 0],
    [0, -1],
  ];

  const visited = Array.from(
    { length: rows},
    () => Array(cols).fill(false)
  )

  // 3. count = 0
  let count = 0;

  for (let row = 0; row < rows; row++) {
    for (let col = 0; col < cols; col++) {
      if (land[row][col] !== 1 || visited[row][col]) {
        continue;
      }

      if (land[row][col] === 1) {
        count++;
      }

      const stack = [[row, col]];
      visited[row][col] = true;

      while (stack.length > 0) {
        const [poppedRow, poppedCol] = stack.pop();

        for (const [dr, dc] of DIRECTIONS) {
          const nextRow = poppedRow + dr;
          const nextCol = poppedCol + dc;

          if (nextRow < 0 || nextRow >= rows || nextCol < 0 || nextCol >= cols) {
            continue;
          }

          if (land[nextRow][nextCol] !== 1 || visited[nextRow][nextCol]) {
            continue;
          }

          visited[nextRow][nextCol] = true
          stack.push([nextRow, nextCol])
        }
      }

      // 4. quét từng row, col

      // Không phải ô 1 → continue

      // Tìm thấy khối mới → count++

      // Tạo stack chứa ô bắt đầu

      // Đánh dấu ô bắt đầu

      // 5. Trong khi stack còn phần tử

      // Pop một ô

      // Duyệt bốn hướng

      // Tạo nextRow, nextCol

      // Ngoài biên → continue

      // Không phải ô 1 → continue

      // Đánh dấu hàng xóm

      // Push hàng xóm

      // 6. return count
    }
  }

  return count
}

function solution(land) {
  const rows = land.length;
  const cols = land[0].length;

  const DIRECTIONS = [
    [-1, 0], // trên
    [0, 1],  // phải
    [1, 0],  // dưới
    [0, -1], // trái
  ];

  const visited = Array.from(
    { length: rows },
    () => Array(cols).fill(false)
  );

  let count = 0;

  for (let row = 0; row < rows; row++) {
    for (let col = 0; col < cols; col++) {
      // Chỉ bắt đầu khi gặp ô dầu chưa được thăm
      if (land[row][col] !== 1 || visited[row][col]) {
        continue;
      }

      // Tìm thấy một khối dầu mới
      count++;

      const stack = [[row, col]];
      visited[row][col] = true;

      while (stack.length > 0) {
        const [currentRow, currentCol] = stack.pop();

        for (const [dr, dc] of DIRECTIONS) {
          const nextRow = currentRow + dr;
          const nextCol = currentCol + dc;

          // Hàng xóm nằm ngoài bản đồ
          if (
            nextRow < 0 ||
            nextRow >= rows ||
            nextCol < 0 ||
            nextCol >= cols
          ) {
            continue;
          }

          // Không có dầu hoặc đã được đưa vào stack
          if (
            land[nextRow][nextCol] !== 1 ||
            visited[nextRow][nextCol]
          ) {
            continue;
          }

          // Đánh dấu ngay trước khi push để không bị push trùng
          visited[nextRow][nextCol] = true;
          stack.push([nextRow, nextCol]);
        }
      }
    }
  }

  return count;
}

const solution = (list) => {
  const compare = list.sort((a, b) => b[1] - a[1])
  return compare
}

console.log(solution([[1, 2, 8], [3,4], [7, 1]]))

// list.sort(a, b => (a - b ))

const solutionRobot = (cost) => {
  const robotCount = cost.length
  const workCount = cost[0].length

  const used = Array.from(
    {length: robotCount},
    () => Array(workCount).fill(false)
  )
}

console.log(solutionRobot([1,2,1], [2,1,0]))
