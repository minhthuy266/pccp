const addMatrices = (array1, array2) => {
  // Bước 1: Tạo ma trận kết quả rỗng.
  // Bước 2: Duyệt từng hàng và từng cột của hai ma trận.
  // Bước 3: Cộng hai phần tử cùng vị trí rồi trả về ma trận mới.
  const sumArray = [];

  for (let row = 0; row < array1.length; row++) {
    sumArray[row] = [];

    for (let col = 0; col < array1[row].length; col++) {
      sumArray[row][col] = array1[row][col] + array2[row][col];
    }
  }

  return sumArray;
};

// console.log(
//   addMatrices(
//     [
//       [1, 2],
//       [2, 3],
//     ],
//     [
//       [3, 4],
//       [5, 6],
//     ],
//   ),
// );

// // 1. Duyệt ma trận
// // for(let row = 0; row < matrix.length; row++) {
// //     for(let col = 0; col < matrix[row].length; col++){
// //         console.log(matrix[row][col])
// //     }
// // }

// // Câu 1

// // Duyệt và in toàn bộ phần tử:

// // const matrix = [
// //     [1, 2, 3],
// //     [4, 5, 6]
// // ]

const printMatrix = (matrix) => {
  // Bước 1: Khởi tạo tổng bằng 0.
  // Bước 2: Duyệt từng phần tử, in ra và cộng dồn.
  // Bước 3: In và trả về tổng của toàn bộ ma trận.
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

// printMatrix([
//   [1, 2, 3],
//   [4, 5, 6],
// ]);

// // Câu 3

// // Tạo ma trận mới trong đó mỗi phần tử được nhân đôi:

// // [
// //     [2, 4, 6],
// //     [8, 10, 12]
// // ]

const multiplyMatrixByTwo = (matrix) => {
  // Bước 1: Tạo ma trận mới để không sửa dữ liệu đầu vào.
  // Bước 2: Duyệt từng ô và nhân giá trị hiện tại với 2.
  // Bước 3: Trả về ma trận đã nhân đôi.
  let newMatrix = [];

  for (let row = 0; row < matrix.length; row++) {
    newMatrix[row] = [];

    for (let col = 0; col < matrix[row].length; col++) {
      newMatrix[row][col] = 2 * matrix[row][col];
    }
  }

  return newMatrix;
};

// console.log(
//   multiplyMatrixByTwo([
//     [1, 2],
//     [2, 3],
//   ]),
// );

const addTenMatrix = (matrix) => {
  // Bước 1: Tạo ma trận kết quả rỗng.
  // Bước 2: Duyệt từng ô và cộng thêm 10.
  // Bước 3: Trả về ma trận mới.
  let newMatrix = [];

  for (let row = 0; row < matrix.length; row++) {
    newMatrix[row] = [];

    for (let col = 0; col < matrix[row].length; col++) {
      newMatrix[row][col] = matrix[row][col] + 10;
    }
  }

  return newMatrix;
};

// console.log(
//   addTenMatrix([
//     [1, 2],
//     [2, 3],
//   ]),
// );

const buildTriangleSnail = (n) => {
  // Bước 1: Tạo tam giác gồm các ô ban đầu bằng 0.
  // Bước 2: Di chuyển lần lượt xuống, sang phải, rồi chéo lên trái.
  // Bước 3: Điền số tăng dần và trả về tam giác hai chiều.
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

// console.log(buildTriangleSnail(4));

const twoSum = (nums, target) => {
  // Bước 1: Lưu giá trị đã gặp cùng chỉ số của nó vào Map.
  // Bước 2: Với mỗi số, tính phần còn thiếu để đạt target.
  // Bước 3: Nếu phần còn thiếu đã xuất hiện, trả về hai chỉ số.
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

// console.log("TWO SUM", twoSum([2, 5, 6, 8], 7));

// // [2, 5, 11, 15]

const twoSumPointer = (array, target) => {
  // Bước 1: Đặt hai con trỏ ở hai đầu mảng đã sắp xếp.
  // Bước 2: So sánh tổng với target để dịch con trỏ phù hợp.
  // Bước 3: Trả về hai chỉ số khi tìm thấy, nếu không trả về mảng rỗng.
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

// console.log("TWO SUM POINTER", twoSumPointer([2, 5, 11, 15], 17));

const twoSumValue = (array, target) => {
  // Bước 1: Dùng Map ghi lại các giá trị đã duyệt.
  // Bước 2: Tìm giá trị bù để tổng bằng target.
  // Bước 3: Trả về hai giá trị tạo thành target.
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

// console.log("TWO SUM", twoSumValue([2, 5, 6, 8], 10));

const hasTwoSum = (array, target) => {
  // Bước 1: Dùng Set lưu các số đã gặp.
  // Bước 2: Kiểm tra số bù của từng phần tử.
  // Bước 3: Trả về true nếu có một cặp phù hợp, ngược lại trả về false.
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

// console.log("TWO SUM", hasTwoSum([2, 5, 6, 8], 10));

const removeDuplicate = (array) => {
  // Bước 1: Đưa toàn bộ phần tử vào Set để loại giá trị lặp.
  // Bước 2: Chuyển Set trở lại thành mảng.
  // Bước 3: Trả về mảng không trùng lặp.
  const set = new Set(array);
  const newArray = [...set];

  return newArray;
};

// console.log("REMOVE DUPLICATE", removeDuplicate([1, 2, 4, 5, 5, 10, 10]));

const removeDuplicatePointer = (array) => {
  // Bước 1: Giữ con trỏ write tại vị trí phần tử duy nhất cuối cùng.
  // Bước 2: Dùng read duyệt mảng đã sắp xếp và chép giá trị mới.
  // Bước 3: Cắt mảng đến phần đã ghi rồi trả về.
  let write = 0;
  for (let read = 1; read < array.length; read++) {
    if (array[read] !== array[write]) {
      write++;
      array[write] = array[read];
    }
  }

  return array.slice(0, write + 1);
};

// console.log(
//   "REMOVE DUPLICATE",
//   removeDuplicatePointer([1, 2, 4, 5, 5, 10, 10]),
// );

// // [0, 1, 0, 3, 12]

const flattenTriangleSnail = (n) => {
  // Bước 1: Tạo tam giác và bảng thay đổi hàng/cột cho ba hướng.
  // Bước 2: Điền số theo từng đoạn có độ dài giảm dần.
  // Bước 3: Làm phẳng tam giác thành mảng một chiều rồi trả về.
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

// flattenTriangleSnail(4);
