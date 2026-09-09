// const solutionRobot = (cost) => {
//   const robotCount = cost.length;
//   const workCount = cost[0].length;

//   const used = Array(robotCount).fill(false);
//   let minCost = Infinity;

//   const dfs = (work, currentCost) => {
//     if (work === workCount) {
//       minCost = Math.min(minCost, currentCost);
//       return;
//     }

//     for (let robot = 0; robot < robotCount; robot++) {
//       if (used[robot]) continue;

//       used[robot] = true;

//       dfs(work + 1, currentCost + cost[robot][work]);

//       used[robot] = false;
//     }
//   };
//   dfs(0, 0);

//   return minCost;
// };

// console.log(
//   solutionRobot([
//     [1, 2],
//     [2, 1],
//   ]),
// );

// const combinations = (numbers, k) => {
//   const result = [];
//   const path = [];

//   const dfs = (start) => {
//     if (path.length === k) {
//       result.push([...path]);
//       return;
//     }

//     for (let i = start; i < numbers.length; i++) {
//       path.push(numbers[i]);

//       dfs(i + 1);

//       path.pop();
//     }
//   };

//   dfs(0, 0);

//   return result;
// };

// console.log(combinations([1, 2, 3], 2));

// const solution1 = (numbers, target) => {
//   let count = 0;

//   const dfs = (index, sum) => {
//     if (index === numbers.length) {
//       if (sum === target) {
//         count++;
//       }
//       return;
//     }

//     dfs(index + 1, sum + numbers[index]);
//     dfs(index + 1, sum - numbers[index]);
//   };

//   dfs(0, 0);

//   return count;
// };

// console.log(solution1([1, -1, 2], 0));

// // const dfs = (state) => {
// //     // ANSWER

// //     for (const choice of choices) {
// //         if (INVALID) continue;

// //         // CHOOSE

// //         dfs(NEXT_STATE)

// //         UNDO
// //     }
// // }

// const solutionMet = (k, dungeons) => {
//   let best = 0;
//   const visited = Array(dungeons.length).fill(false);

//   const dfs = (currrentHealth, count) => {
//     best = Math.max(best, count);

//     for (let item = 0; item < dungeons.length; item++) {
//       const [minRequired, consumed] = dungeons[item];

//       if (visited[item] || currrentHealth < minRequired) {
//         continue;
//       }

//       visited[item] = true;

//       dfs(currrentHealth - consumed, count + 1);

//       visited[item] = false;
//     }
//   };

//   dfs(k, 0);

//   return best;
// };

// console.log(
//   "SOLUTION MET MOI",
//   solutionMet(80, [
//     [80, 20],
//     [50, 40],
//     [30, 10],
//   ]),
// );

// const solutionMetMoi = (k, dungeons) => {
//   const visited = Array(dungeons.length).fill(false);
//   let best = 0;

//   const dfs = (currentEnergy, count) => {
//     best = Math.max(count, best);

//     for (let item = 0; item < dungeons.length; item++) {
//       const [minRequired, consumed] = dungeons[item];

//       if (visited[item] === true || currentEnergy < minRequired) continue;

//       visited[item] = true;

//       dfs(currentEnergy - consumed, count + 1);

//       visited[item] = false;
//     }
//   };

//   dfs(k, 0);

//   return best;
// };

// console.log(
//   "SOLUTION MET MOI",
//   solutionMetMoi(80, [
//     [80, 20],
//     [50, 40],
//     [30, 10],
//   ]),
// );

// const solutionNumber = (numbers, target) => {
//   let way = 0;

//   const dfs = (index, sum) => {
//     if (index === numbers.length) {
//       if (sum === target) {
//         way++;
//       }

//       return;
//     }

//     dfs(index + 1, sum + numbers[index]);
//     dfs(index + 1, sum - numbers[index]);
//   };

//   dfs(0, 0);

//   return way;
// };

// const solutionRatMetMoi = (k, dungeons) => {
//   let best = 0;

//   const visited = Array(dungeons.length).fill(false);

//   const dfs = (currentHealth, count) => {
//     best = Math.max(best, count);

//     for (let i = 0; i < dungeons.length; i++) {
//       const [minRequired, consumed] = dungeons[i];

//       if (currentHealth < minRequired || visited[i]) {
//         continue;
//       }

//       visited[i] = true;

//       dfs(currentHealth - consumed, count + 1);

//       visited[i] = false;
//     }
//   };

//   dfs(k, 0);

//   return best;
// };

// console.log(
//   "RAT LA MET MOI",
//   solutionRatMetMoi(80, [
//     [80, 20],
//     [50, 40],
//     [30, 10],
//   ]),
// );

// const targetNumberMet = (numbers, target) => {
//   let answer = 0;

//   const dfs = (index, sum) => {
//     if (index === numbers.length) {
//       if (sum === target) {
//         answer++;
//       }

//       return;
//     }

//     dfs(index + 1, sum + numbers[index]);
//     dfs(index + 1, sum - numbers[index]);
//   };

//   dfs(0, 0);

//   return answer;
// };

// console.log(targetNumberMet([1, 1, 1, 1, 1], 3));

// const solutionNetwork = (n, computers) => {
//   let answer = 0;
//   const visited = Array(n).fill(false);

//   const dfs = (node) => {
//     visited[node] = true;

//     for (let next = 0; next < n; next++) {
//       if (computers[node][next] === 1 && visited[next] === false) {
//         dfs(next);
//       }
//     }
//   };

//   for (let node = 0; node < n; node++) {
//     if (visited[node] === false) {
//       answer++;
//       dfs(node);
//     }
//   }

//   return answer;
// };

// function solution(n, computers) {
//   let answer = 0;
//   const visited = Array(n).fill(false);

//   const dfs = (node) => {
//     visited[node] = true;

//     for (let next = 0; next < n; next++) {
//       if (computers[node][next] === 1 && !visited[next]) {
//         dfs(next);
//       }
//     }
//   };

//   for (let node = 0; node < n; node++) {
//     if (!visited[node]) {
//       answer++;
//       dfs(node);
//     }
//   }

//   return answer;
// }

// const network = (n, computers) => {
//   const visited = Array(n).fill(false);
//   let answer;

//   const dfs = (node) => {
//     visited[node] = true;

//     for (let next = 0; next < n; next++) {
//       if (!visited[next] && computers[node][next] === 1) {
//         dfs(next);
//       }
//     }
//   };

//   for (let node = 0; node < n; node++) {
//     if (!visited[node]) {
//       answer++;
//       dfs(node);
//     }
//   }
// };

const solutionDao = (maps) => {
  let answer = [];
  const rows = maps.length;
  const cols = maps[0].length;
  const visited = Array.from({ length: rows }, () => Array(cols).fill(false));

  const DIRECTIONS = [
    [-1, 0],
    [0, 1],
    [1, 0],
    [0, -1],
  ];

  const dfs = (row, col) => {
    visited[row][col] = true;
    let total = Number(maps[row][col]);

    for (const [dr, dc] of DIRECTIONS) {
      const nextRow = row + dr;
      const nextCol = col + dc;

      const isOutside =
        nextRow < 0 || nextRow >= rows || nextCol < 0 || nextCol >= cols;

      if (
        isOutside ||
        maps[nextRow][nextCol] === "X" ||
        visited[nextRow][nextCol]
      ) {
        continue;
      }

      total += dfs(nextRow, nextCol);
    }
    return total;
  };

  for (let row = 0; row < rows; row++) {
    for (let col = 0; col < cols; col++) {
      if (maps[row][col] !== "X" && !visited[row][col]) {
        answer.push(dfs(row, col));
      }
    }
  }

  if (answer.length === 0) {
    return [-1];
  }

  return answer.sort((a, b) => a - b);
};

console.log(
  "========SOLUTION DAO",
  solutionDao(["X591X", "X1X5X", "X231X", "1XXX1"]),
);

const solutionBFS = (maps) => {
  const rows = maps.length
  const cols = maps[0].length

  const visited = Array.from({length: rows}, () => Array(cols).fill(false))

  const DIRECTIONS = [
    [-1, 0], // lên
    [0, 1],  // phải
    [1, 0],  // xuống
    [0, -1], // trái
];

  const queue = [[0, 0, 1]];
  let head = 0;

  visited[0][0] = true;

  while (head < queue.length) {
    // lấy current tại head
    const [row, col, distance] = queue[head];

    head++;

    if (row === rows - 1 && col === cols - 1) {
      return distance;
    }

    for (const [dr, dc] of DIRECTIONS) {
      const nextRow = row + dr;
      const nextCol = col + dc;

      const isOutside =
        nextRow < 0 || nextRow >= rows || nextCol < 0 || nextCol >= cols;

      if (
        isOutside ||
        maps[nextRow][nextCol] === 0 ||
        visited[nextRow][nextCol]
      ) {
        continue;
      }

      visited[nextRow][nextCol] = true;

      queue.push([nextRow, nextCol, distance + 1]);
    }
  }

  return -1;
};
