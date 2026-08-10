const solution = (array1, array2) => {
  const sumArray = [];

  for (let row = 0; row < array1.length; row++) {
    sumArray[row] = [];

    for (let col = 0; col < array1[row].length; col++) {
      sumArray[row][col] = array1[row][col] + array2[row][col];
    }
  }

  return sumArray;
};

console.log(
  solution(
    [
      [1, 2],
      [2, 3],
    ],
    [
      [3, 4],
      [5, 6],
    ],
  ),
);

// 1. Duyệt ma trận
// for(let row = 0; row < matrix.length; row++) {
//     for(let col = 0; col < matrix[row].length; col++){
//         console.log(matrix[row][col])
//     }
// }

// Câu 1

// Duyệt và in toàn bộ phần tử:

// const matrix = [
//     [1, 2, 3],
//     [4, 5, 6]
// ]

const printMatrix = (matrix) => {
  let sum = 0;
  for (let row = 0; row < matrix.length; row++) {
    for (let col = 0; col < matrix[row].length; col++) {
      console.log(matrix[row][col]);
      sum = sum + matrix[row][col];
    }
  }

  console.log(sum);
  return sum;
};

printMatrix([
  [1, 2, 3],
  [4, 5, 6],
]);

// Câu 3

// Tạo ma trận mới trong đó mỗi phần tử được nhân đôi:

// [
//     [2, 4, 6],
//     [8, 10, 12]
// ]

const multipleMatrix = (matrix) => {
  let newMatrix = [];

  for (let row = 0; row < matrix.length; row++) {
    newMatrix[row] = [];

    for (let col = 0; col < matrix[row].length; col++) {
      newMatrix[row][col] = 2 * matrix[row][col];
    }
  }

  return newMatrix;
};

console.log(
  multipleMatrix([
    [1, 2],
    [2, 3],
  ]),
);

const addTenMatrix = (matrix) => {
  let newMatrix = [];

  for (let row = 0; row < matrix.length; row++) {
    newMatrix[row] = [];

    for (let col = 0; col < matrix[row].length; col++) {
      newMatrix[row][col] = matrix[row][col] + 10;
    }
  }

  return newMatrix;
};

console.log(
  addTenMatrix([
    [1, 2],
    [2, 3],
  ]),
);

const solutionTriangle = (n) => {
  const triangle = [];

  for (let row = 0; row < n; row++) {
    triangle[row] = Array(row + 1).fill(0);
  }

  let row = -1;
  let col = 0;
  let number = 1;

  for (let direction = 0; direction < n; direction++) {
    const moveCount = n - direction;

    for (let step = 0; step < moveCount; step++) {
      if (direction % 3 === 0) {
        row++;
      } else if (direction % 3 === 1) {
        col++;
      } else if (direction % 3 === 2) {
        row--;
        col--;
      }

      triangle[row][col] = number;

      number++;
    }
  }

  return triangle;
};

console.log(solutionTriangle(4));

const twoSum = (nums, target) => {
  const map = new Map();

  for (let i = 0; i < nums.length; i++) {
    const current = nums[i];
    const needed = target - nums[i];

    if (map.has(needed)) {
      return [map.get(needed), i];
    }

    map.set(current, i);
  }

  return [];
};

console.log("TWO SUM", twoSum([2, 5, 6, 8], 7));

// [2, 5, 11, 15]

const twoSumPointer = (array, target) => {
  let left = 0;
  let right = array.length - 1;

  while (left < right) {
    let sum = array[left] + array[right];

    if (sum === target) {
      return [left, right];
    }

    if (sum < target) {
      left++;
    } else {
      right--;
    }
  }

  return [];
};

console.log("TWO SUM POINTER", twoSumPointer([2, 5, 11, 15], 17));

const twoSumValue = (array, target) => {
  const map = new Map();

  for (let i = 0; i < array.length; i++) {
    const current = array[i];
    const needed = target - current;

    if (map.has(needed)) {
      return [map.get(needed), current];
    }

    map.set(current, array[i]);
  }

  return [];
};

console.log("TWO SUM", twoSumValue([2, 5, 6, 8], 10));

const hasTwoSum = (array, target) => {
  const set = new Set();

  for (let i = 0; i < array.length; i++) {
    const current = array[i];
    const needed = target - current;

    if (set.has(needed)) {
      return true;
    }

    set.add(current);
  }

  return false;
};

console.log("TWO SUM", hasTwoSum([2, 5, 6, 8], 10));

const removeDuplicate = (array) => {
  const set = new Set(array);
  const newArray = [...set];

  return newArray;
};

console.log("REMOVE DUPLICATE", removeDuplicate([1, 2, 4, 5, 5, 10, 10]));

const removeDuplicatePointer = (array) => {
  let write = 0;
  for (let read = 1; read < array.length; read++) {
    if (array[read] !== array[write]) {
      write++;
      array[write] = array[read];
    }
  }

  return array.slice(0, write + 1);
};

console.log(
  "REMOVE DUPLICATE",
  removeDuplicatePointer([1, 2, 4, 5, 5, 10, 10]),
);

// [0, 1, 0, 3, 12]

const solutionNew = (n) => {
  const triangle = Array.from({ length: n }, (_, row) =>
    Array(row + 1).fill(0),
  );

  const dr = [1, 0, -1];
  const dc = [0, 1, -1];

  let row = -1;
  let col = 0;
  let number = 1;
  let direction = 0;

  for (let segmentLength = n; segmentLength > 0; segmentLength--) {
    for (let step = 0; step < segmentLength; step++) {
      row = row + dr[direction];
      col = col + dc[direction];

      triangle[row][col] = number++;
    }

    direction = (direction + 1) % 3;
  }

  console.log("=======", triangle.flat());

  return triangle.flat();
};

solutionNew(4);

/* -------------------------------------------------------------------------- */
/*                                   DIVIDER                                  */
/* -------------------------------------------------------------------------- */
const stack = [];

stack.push("A"); // thêm vào cuối
stack.push("B");
stack.pop();
stack.push("C");
stack.push("D");

stack.pop(); // lấy khỏi cuối

console.log(stack);

// Bài 2 — Kiểm tra dấu ngoặc tròn

// Viết hàm kiểm tra chuỗi ngoặc có hợp lệ không:

// "(()())" → true
// "(()"    → false
// ")("     → false
// "())("   → false

const isValidParenthses = (text) => {
  const stack = [];

  for (const character of text) {
    if (character === "(") {
      stack.push(character);
    } else {
      if (stack.length === 0) {
        return false;
      }

      stack.pop();
    }
  }

  return stack.length === 0;
};

console.log("isValidParenthses", isValidParenthses("(()"));

// Bài 3 — Xóa hai ký tự giống nhau đứng cạnh nhau
// Cho một chuỗi. Nếu hai ký tự giống nhau đứng cạnh nhau thì xóa chúng. Tiếp tục cho đến khi không xóa được nữa.
// "abbaca" → "ca"
// Giải thích:
// abbaca
//  ↓
// aaca       // xóa bb
// aaca
// ↓
// ca         // xóa aa

const removeAdjacentDuplicates = (text) => {
  const stack = [];

  for (const character of text) {
    const top = stack[stack.length - 1];

    if (top === character) {
      stack.pop();
    } else {
      stack.push(character);
    }
  }

  return stack.join("");
};

console.log("removeAdjacentDuplicates", removeAdjacentDuplicates("abbaca"));

// Bài 4 — Queue xử lý khách theo thứ tự đến
// Danh sách khách:
// ["An", "Bình", "Chi", "Dung"]

// Hãy phục vụ khách theo đúng thứ tự họ đến và trả về thứ tự phục vụ.

// Cách nghĩ
// An đến trước → phục vụ trước
// Bình đến sau → phục vụ sau

// Ta cần phần tử cũ nhất đang chờ, nên dùng Queue.

const serveCustomers = (customers) => {
  const queue = [...customers];
  const served = [];
  let head = 0;

  while (head < queue.length) {
    const currentCustomer = queue[head];
    head += 1;

    served.push(currentCustomer);
  }

  return served;
};

console.log("serveCustomers", serveCustomers(["An", "Bình", "Chi", "Dung"]));

// Bài 5 — Xử lý rồi đưa lại cuối Queue

// Có ba công việc:

// [
//   ["A", 2],
//   ["B", 1],
//   ["C", 2]
// ]

// Mỗi lượt:

// Lấy công việc đầu Queue.
// Làm giảm thời gian còn lại đi 1.
// Nếu chưa xong, đưa lại cuối Queue.
// Nếu đã xong, ghi vào kết quả.

// Hỏi thứ tự hoàn thành.

const proccessJobs = (jobs) => {
  const queue = jobs.map(([jobName, time]) => [jobName, time]);

  console.log("QUEUE", queue);

  const completed = [];
  let head = 0;

  while (head < queue.length) {
    const [name, time] = queue[head];
    head += 1;

    const remainingTime = time - 1;

    if (remainingTime === 0) {
      completed.push(name);
    } else {
      queue.push([name, remainingTime]);
    }
  }

  return completed;
};

proccessJobs([
  ["A", 2],
  ["B", 1],
  ["C", 2],
]);

// TEMPLATE

const storage = [];
let head = 0; // Stack không dùng biến này

// Đưa dữ liệu ban đầu vào
// storage.push(start);

while (
  storage.length > 0 // Stack
  // head < storage.length // Queue
) {
  // Lấy phần tử cần xử lý
  const current = /* Stack */ storage.pop();
  /* Queue */ storage[head++];

  // Xử lý current

  // Nếu phát hiện phần tử mới
  storage.push(next);
}

// STACK: phần tử MỚI NHẤT được xử lý trước
const stackTemplate = [];

// stackTemplate.push(start);

while (stackTemplate.length > 0) {
  const current = stackTemplate.pop();

  // xử lý current

  stackTemplate.push(next);
}

// QUEUE: phần tử CŨ NHẤT được xử lý trước
const queue = [];
let headQueue = 0;

// queue.push(start);

while (headQueue < queue.length) {
  const current = queue[headQueue];
  headQueue += 1;

  // xử lý current

  queue.push(next);
}

// Công thức chung để đóng đinh vào đầu:

// 1. Tạo nơi chứa
// 2. Cho dữ liệu ban đầu vào bằng push
// 3. Khi vẫn còn phần tử chưa xử lý:
//    → lấy một phần tử
//    → xử lý nó
//    → push phần tử mới vào

// Bài tiếp theo — phân biệt bằng code

const numbers = [10, 20, 30];

const proccessByStack = (numbers) => {
  const stack = [...numbers];
  const results = [];

  while (stack.length > 0) {
    const current = stack.pop();
    results.push(current);
  }

  return results;
};

console.log("=====", proccessByStack(numbers));

const processByQueue = (numbers) => {
  const queue = [...numbers];
  const results = [];
  let head = 0;

  while (head < queue.length) {
    const current = queue[head];
    console.log("CURRENT", current);
    results.push(current);

    head++;
  }
};

processByQueue(numbers);
// BFS

const graph = {
  A: ["B", "C"],
  B: ["A", "D"],
  C: ["A"],
  D: ["B"],
};

const bfs = (graph, start) => {
  const queue = [start];
  const visited = new Set([start]);
  const result = [];

  console.log(queue);
  console.log(visited);

  let head = 0;

  while (head < queue.length) {
    const current = queue[head];
    head += 1;

    result.push(current);

    for (const neighbor of graph[current]) {
      if (!visited.has(neighbor)) {
        visited.add(neighbor);
        queue.push(neighbor);
      }
    }
  }

  return result;
};

console.log(bfs(graph, "B"));

const countArea = (land, startRow, startCol) => {
  const rowCount = land.length;
  const colCount = land[0].length;
  const directions = [
    [-1, 0],
    [1, 0],
    [0, -1],
    [0, 1],
  ];

  const visited = Array.from({ length: rowCount }, (_, row) =>
    Array(colCount).fill(false),
  );

  const queue = [[startRow, startCol]];
  let head = 0;
  let count = 0;

  visited[startRow][startCol] = true;

  while (head < queue.length) {
    const [currentRow, currentCol] = queue[head];
    head++;
    count++;

    for (const [dr, dc] of directions) {
      const nextRow = currentRow + dr;
      const nextCol = currentCol + dc;

      const isInside =
        nextRow >= 0 &&
        nextRow < rowCount &&
        nextCol >= 0 &&
        nextCol < colCount;

      if (
        isInside &&
        land[nextRow][nextCol] === 1 &&
        !visited[nextRow][nextCol]
      ) {
        visited[nextRow][nextCol] = true;
        queue.push([nextRow, nextCol]);
      }
    }
  }

  return count;
};

console.log(
  countArea(
    [
      [1, 1, 0],
      [0, 1, 1],
      [1, 1, 0],
    ],
    1,
    0,
  ),
);
