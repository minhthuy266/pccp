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

  const used = Array(
    studentCount
  ).fill(false);

  let maxScore = 0;

  function dfs(sport, score) {
    // Đã phân công đủ tất cả các môn
    if (sport === sportCount) {
      maxScore = Math.max(
        maxScore,
        score
      );

      return;
    }

    // Thử từng học sinh cho môn hiện tại
    for (
      let student = 0;
      student < studentCount;
      student++
    ) {
      // Người này đã thi môn trước
      if (used[student]) {
        continue;
      }

      // CHỌN
      used[student] = true;

      // ĐI SÂU
      dfs(
        sport + 1,
        score + ability[student][sport]
      );

      // HOÀN TÁC
      used[student] = false;
    }
  }

  dfs(0, 0);

  return maxScore;
}