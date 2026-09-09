# PCCP JavaScript — Toàn bộ họ bài Grid + Stack + Visited

> Phạm vi của tài liệu: các biến thể trọng tâm của **duyệt vùng liên thông trên bảng 2 chiều** bằng stack và `visited`.
>
> Đây không phải toàn bộ mọi dạng thuật toán PCCP. Đây là một **họ bài** thường xuất hiện dưới các tên: đảo, vùng, khối, khu vực, dầu, đất, ô cùng màu, mạng lưới trên bản đồ.

---

## 1. Bản chất của dạng bài

Ta có một bảng hai chiều:

```js
const grid = [
  [1, 1, 0, 0],
  [1, 0, 0, 1],
  [0, 0, 1, 1],
];
```

Các ô thỏa điều kiện và nối với nhau tạo thành một **khối liên thông**.

Nếu chỉ được đi trên, phải, dưới, trái:

```js
const DIRECTIONS = [
  [-1, 0], // trên
  [0, 1],  // phải
  [1, 0],  // dưới
  [0, -1], // trái
];
```

Mục tiêu chung:

1. Quét toàn bộ bảng.
2. Gặp một ô hợp lệ chưa thăm → tìm thấy một khối mới.
3. Dùng stack để duyệt hết khối đó.
4. Trong lúc duyệt, thu thập thông tin đề bài yêu cầu.

---

## 2. Dấu hiệu nhận diện

Nghĩ đến `grid + stack + visited` khi đề có các dấu hiệu:

- Dữ liệu là bảng hai chiều.
- Các ô nối nhau theo 4 hướng hoặc 8 hướng.
- Cần tìm đảo, vùng, khối, khu vực hoặc thành phần liên thông.
- Mỗi ô chỉ cần xử lý một lần.
- Cần đếm số vùng, kích thước vùng, tổng giá trị vùng hoặc vùng có chạm một hàng/cột nào đó.

Không nên dùng mẫu này một cách máy móc nếu đề hỏi:

- Đường đi ngắn nhất → thường dùng **BFS**.
- Liệt kê hoặc đếm mọi đường đi không lặp ô → dùng **backtracking và hoàn tác `visited`**.
- Đường đi có trọng số → có thể cần Dijkstra.

---

## 3. Ba loại tọa độ phải phân biệt

| Tên | Ý nghĩa |
| --- | --- |
| `row`, `col` | Ô đang được vòng lặp ngoài kiểm tra; có thể trở thành điểm bắt đầu khối mới |
| `currentRow`, `currentCol` | Ô vừa lấy ra khỏi stack để xử lý |
| `nextRow`, `nextCol` | Một ô hàng xóm đang được kiểm tra |

Công thức tạo hàng xóm:

```js
const nextRow = currentRow + dr;
const nextCol = currentCol + dc;
```

Sai phổ biến: tính hàng xóm từ `row`, `col` thay vì từ ô vừa `pop()`.

---

## 4. Stack chứa gì?

Stack chứa các tọa độ:

```js
const stack = [[row, col]];
```

Ý nghĩa:

> Đã phát hiện ô này thuộc khối, nhưng vẫn đang chờ lấy ra để kiểm tra các hàng xóm của nó.

Cơ chế LIFO:

```js
stack.push([nextRow, nextCol]);
const [currentRow, currentCol] = stack.pop();
```

---

## 5. `visited` có ý nghĩa gì?

Khởi tạo:

```js
const visited = Array.from(
  { length: rows },
  () => Array(cols).fill(false)
);
```

- `false`: chưa được phát hiện.
- `true`: đã được phát hiện và đã/đang chờ xử lý.

Phải đánh dấu **trước khi push**:

```js
visited[nextRow][nextCol] = true;
stack.push([nextRow, nextCol]);
```

Nếu đợi đến khi `pop()` mới đánh dấu, cùng một ô có thể bị nhiều hàng xóm push vào stack nhiều lần.

Trong bài duyệt khối liên thông, không hoàn tác:

```js
// Không làm việc này:
visited[nextRow][nextCol] = false;
```

Lý do: ô đã thuộc một khối rồi thì không được tính lại ở khối khác.

---

## 6. Khung gốc cần thuộc

```js
function solution(grid) {
  const rows = grid.length;
  const cols = grid[0].length;

  const DIRECTIONS = [
    [-1, 0],
    [0, 1],
    [1, 0],
    [0, -1],
  ];

  const visited = Array.from(
    { length: rows },
    () => Array(cols).fill(false)
  );

  for (let row = 0; row < rows; row++) {
    for (let col = 0; col < cols; col++) {
      if (grid[row][col] !== 1 || visited[row][col]) {
        continue;
      }

      const stack = [[row, col]];
      visited[row][col] = true;

      while (stack.length > 0) {
        const [currentRow, currentCol] = stack.pop();

        for (const [dr, dc] of DIRECTIONS) {
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

          if (
            grid[nextRow][nextCol] !== 1 ||
            visited[nextRow][nextCol]
          ) {
            continue;
          }

          visited[nextRow][nextCol] = true;
          stack.push([nextRow, nextCol]);
        }
      }
    }
  }
}
```

Câu thần chú:

```text
Quét bảng
→ gặp ô hợp lệ chưa thăm
→ tạo stack và đánh dấu ô đầu
→ pop ô hiện tại
→ xét các hàng xóm
→ hàng xóm hợp lệ: đánh dấu rồi push
```

---

# CÁC BIẾN THỂ

## 7. Biến thể 1 — Đếm số khối liên thông

### Yêu cầu

Đếm có bao nhiêu khối `1` riêng biệt.

### Thay đổi so với khung gốc

```js
let count = 0;
```

Mỗi khi vòng lặp ngoài phát hiện một ô hợp lệ chưa thăm:

```js
count++;
```

### Full code

```js
function solution(land) {
  const rows = land.length;
  const cols = land[0].length;

  const DIRECTIONS = [
    [-1, 0],
    [0, 1],
    [1, 0],
    [0, -1],
  ];

  const visited = Array.from(
    { length: rows },
    () => Array(cols).fill(false)
  );

  let count = 0;

  for (let row = 0; row < rows; row++) {
    for (let col = 0; col < cols; col++) {
      if (land[row][col] !== 1 || visited[row][col]) {
        continue;
      }

      count++;

      const stack = [[row, col]];
      visited[row][col] = true;

      while (stack.length > 0) {
        const [currentRow, currentCol] = stack.pop();

        for (const [dr, dc] of DIRECTIONS) {
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

          if (
            land[nextRow][nextCol] !== 1 ||
            visited[nextRow][nextCol]
          ) {
            continue;
          }

          visited[nextRow][nextCol] = true;
          stack.push([nextRow, nextCol]);
        }
      }
    }
  }

  return count;
}
```

---

## 8. Biến thể 2 — Tính kích thước từng khối

### Yêu cầu

Tìm số ô của mỗi khối.

### State của một khối

```js
let size = 0;
```

Mỗi lần lấy một ô ra xử lý:

```js
const [currentRow, currentCol] = stack.pop();
size++;
```

Sau khi `while` kết thúc, `size` là kích thước của đúng một khối.

Ví dụ lưu tất cả kích thước:

```js
const sizes = [];

// Trước while:
let size = 0;

// Trong while, sau pop:
size++;

// Sau while:
sizes.push(size);
```

---

## 9. Biến thể 3 — Tìm khối lớn nhất

### Yêu cầu

Trả về số ô của khối liên thông lớn nhất.

### Full code

```js
function solution(land) {
  const rows = land.length;
  const cols = land[0].length;

  const DIRECTIONS = [
    [-1, 0],
    [0, 1],
    [1, 0],
    [0, -1],
  ];

  const visited = Array.from(
    { length: rows },
    () => Array(cols).fill(false)
  );

  let maxSize = 0;

  for (let row = 0; row < rows; row++) {
    for (let col = 0; col < cols; col++) {
      if (land[row][col] !== 1 || visited[row][col]) {
        continue;
      }

      let size = 0;
      const stack = [[row, col]];
      visited[row][col] = true;

      while (stack.length > 0) {
        const [currentRow, currentCol] = stack.pop();
        size++;

        for (const [dr, dc] of DIRECTIONS) {
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

          if (
            land[nextRow][nextCol] !== 1 ||
            visited[nextRow][nextCol]
          ) {
            continue;
          }

          visited[nextRow][nextCol] = true;
          stack.push([nextRow, nextCol]);
        }
      }

      maxSize = Math.max(maxSize, size);
    }
  }

  return maxSize;
}
```

Điểm cần nhớ:

- `size` reset về `0` cho từng khối.
- `maxSize` tồn tại xuyên suốt toàn bộ bài.

---

## 10. Biến thể 4 — Đếm khối thỏa điều kiện kích thước

Ví dụ: đếm số khối có ít nhất `k` ô.

Không tăng `count` ngay lúc phát hiện khối, vì khi đó chưa biết kích thước.

```js
let count = 0;

// Duyệt một khối và tính size...

if (size >= k) {
  count++;
}
```

Có thể thay điều kiện:

```js
size === k
size <= k
size % 2 === 0
```

---

## 11. Biến thể 5 — Tính tổng giá trị của mỗi vùng

Giả sử ô có giá trị dương là đất, `0` là nước.

Điều kiện ô hợp lệ:

```js
grid[row][col] > 0
```

Trong lúc xử lý một ô:

```js
sum += grid[currentRow][currentCol];
```

Mẫu:

```js
let sum = 0;

while (stack.length > 0) {
  const [currentRow, currentCol] = stack.pop();
  sum += grid[currentRow][currentCol];

  // Duyệt hàng xóm như cũ
}
```

Có thể dùng `sum` để:

- tìm vùng có tổng lớn nhất;
- đếm vùng có tổng từ `k` trở lên;
- lưu tổng của từng vùng.

---

## 12. Biến thể 6 — Khối có chạm biên hay không

### Yêu cầu thường gặp

- Đếm vùng bị bao kín.
- Đếm vùng không chạm mép bản đồ.
- Loại bỏ các vùng nối với biên.

State của từng khối:

```js
let touchesBorder = false;
```

Trong lúc xử lý mỗi ô:

```js
if (
  currentRow === 0 ||
  currentRow === rows - 1 ||
  currentCol === 0 ||
  currentCol === cols - 1
) {
  touchesBorder = true;
}
```

Sau khi duyệt xong khối:

```js
if (!touchesBorder) {
  count++;
}
```

---

## 13. Biến thể 7 — Khối chạm những hàng hoặc cột nào

### Khi nào dùng?

Khi tác động vào một hàng/cột sẽ thu được toàn bộ khối mà hàng/cột đó chạm tới.

State của từng khối:

```js
const touchedColumns = new Set();
```

Trong lúc xử lý:

```js
touchedColumns.add(currentCol);
```

Tại sao dùng `Set`?

Một khối có thể có nhiều ô trong cùng một cột. Cột đó chỉ được nhận kích thước khối đúng một lần.

Nếu bài hỏi theo hàng:

```js
const touchedRows = new Set();
touchedRows.add(currentRow);
```

---

## 14. Biến thể 8 — Bài Khoan dầu hoàn chỉnh

### Ý tưởng

Với mỗi khối dầu:

1. Tính `size` của khối.
2. Tìm tất cả cột mà khối chạm tới.
3. Cộng `size` đúng một lần vào mỗi cột đó.
4. Lấy cột có tổng dầu lớn nhất.

### Full code dùng stack + visited

```js
function solution(land) {
  const rows = land.length;
  const cols = land[0].length;

  const DIRECTIONS = [
    [-1, 0],
    [0, 1],
    [1, 0],
    [0, -1],
  ];

  const visited = Array.from(
    { length: rows },
    () => Array(cols).fill(false)
  );

  const oilByColumn = Array(cols).fill(0);

  for (let row = 0; row < rows; row++) {
    for (let col = 0; col < cols; col++) {
      if (land[row][col] !== 1 || visited[row][col]) {
        continue;
      }

      let size = 0;
      const touchedColumns = new Set();

      const stack = [[row, col]];
      visited[row][col] = true;

      while (stack.length > 0) {
        const [currentRow, currentCol] = stack.pop();

        size++;
        touchedColumns.add(currentCol);

        for (const [dr, dc] of DIRECTIONS) {
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

          if (
            land[nextRow][nextCol] !== 1 ||
            visited[nextRow][nextCol]
          ) {
            continue;
          }

          visited[nextRow][nextCol] = true;
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
```

### Vì sao là `touchedColumns`, không phải `touchedRows`?

Vì mũi khoan được đặt theo chiều dọc tại **một cột**. Cần biết mỗi khối dầu chạm những cột nào.

Nếu đề đổi thành khoan ngang theo một hàng, ta mới dùng `touchedRows`.

---

## 15. Biến thể 9 — Gắn mã cho từng khối

### Yêu cầu

Mỗi khối được gắn một ID riêng:

```text
khối thứ nhất → 1
khối thứ hai → 2
khối thứ ba → 3
```

Khởi tạo:

```js
const componentId = Array.from(
  { length: rows },
  () => Array(cols).fill(0)
);

let id = 0;
```

Khi phát hiện khối mới:

```js
id++;
```

Khi phát hiện một ô thuộc khối:

```js
componentId[nextRow][nextCol] = id;
```

Biến thể này hữu ích khi các bước sau cần biết hai ô có thuộc cùng một khối hay không.

---

## 16. Biến thể 10 — Vùng gồm các ô có cùng giá trị hoặc màu

Không còn cố định ô hợp lệ phải bằng `1`.

Khi bắt đầu một vùng:

```js
const targetValue = grid[row][col];
```

Điều kiện hàng xóm:

```js
if (
  grid[nextRow][nextCol] !== targetValue ||
  visited[nextRow][nextCol]
) {
  continue;
}
```

Ứng dụng:

- đếm vùng màu;
- đếm khu vực cùng loại đất;
- tìm vùng lớn nhất của từng loại ký tự;
- bài mù màu với quy tắc hai màu được xem như nhau.

---

## 17. Biến thể 11 — Duyệt tám hướng

Nếu ô chéo cũng được xem là liên thông:

```js
const DIRECTIONS = [
  [-1, 0],
  [-1, 1],
  [0, 1],
  [1, 1],
  [1, 0],
  [1, -1],
  [0, -1],
  [-1, -1],
];
```

Các phần còn lại giữ nguyên.

Không tự thêm hướng chéo nếu đề chỉ cho trên, dưới, trái, phải.

---

## 18. Biến thể 12 — Grid ký tự

Grid có thể chứa chuỗi:

```js
const grid = [
  ["X", "X", "."],
  [".", "X", "."],
];
```

Chỉ cần đổi điều kiện:

```js
if (grid[row][col] !== "X" || visited[row][col]) {
  continue;
}
```

Thuật toán không phụ thuộc ô là số hay chuỗi. Nó phụ thuộc vào định nghĩa **ô hợp lệ**.

---

## 19. Biến thể 13 — Không dùng `visited`, sửa trực tiếp grid

Có thể đánh dấu bằng cách đổi ô `1` thành `0`:

```js
land[row][col] = 0;
```

Khi phát hiện hàng xóm:

```js
land[nextRow][nextCol] = 0;
stack.push([nextRow, nextCol]);
```

### Ưu điểm

- Ít code hơn.
- Không cần mảng `visited`.

### Nhược điểm

- Làm thay đổi input.
- Không dùng được nếu sau đó còn cần dữ liệu ban đầu.
- Có thể gây lỗi nếu đề hoặc hệ thống không cho phép sửa input.

Khi luyện để hiểu rõ cơ chế, ưu tiên phiên bản `visited`.

---

## 20. Biến thể 14 — BFS thay cho stack

Nếu chỉ cần duyệt hết một khối, DFS bằng stack và BFS bằng queue đều được.

DFS:

```js
const current = stack.pop();
```

BFS:

```js
const queue = [[row, col]];
let head = 0;

while (head < queue.length) {
  const [currentRow, currentCol] = queue[head++];

  // Khi tìm thấy hàng xóm hợp lệ:
  visited[nextRow][nextCol] = true;
  queue.push([nextRow, nextCol]);
}
```

Trong JavaScript không nên dùng `queue.shift()` liên tục vì có thể tốn thời gian dịch chuyển phần tử. Dùng biến `head`.

### Khi nào bắt buộc nghĩ đến BFS?

Khi đề hỏi **số bước ngắn nhất** trên grid không trọng số.

Lúc đó queue thường chứa thêm khoảng cách:

```js
const queue = [[startRow, startCol, 0]];
```

Đây đã là họ **tìm đường ngắn nhất**, không còn chỉ là thống kê khối liên thông.

---

## 21. Biến thể 15 — Tìm mọi đường đi: phải hoàn tác `visited`

Nếu đề hỏi đếm hoặc liệt kê mọi đường đi không lặp ô, `visited` mang nghĩa khác:

> Ô đang được dùng trong đường đi hiện tại.

Khi thử đi vào hàng xóm:

```js
visited[nextRow][nextCol] = true;
dfs(nextRow, nextCol);
visited[nextRow][nextCol] = false;
```

So sánh:

| Dạng | Có trả `visited` về `false` không? |
| --- | --- |
| Duyệt một khối liên thông | Không |
| Tìm tất cả đường đi | Có |

Đây là ranh giới rất quan trọng giữa **flood fill** và **backtracking trên grid**.

---

## 22. Một khung tổng quát để phân tích đề

Trước khi code, trả lời sáu câu:

### Câu 1 — Ô nào được phép đi vào?

Ví dụ:

```js
grid[row][col] === 1
grid[row][col] > 0
grid[row][col] === targetValue
grid[row][col] !== "X"
```

### Câu 2 — Các ô nối nhau theo hướng nào?

- 4 hướng?
- 8 hướng?
- hướng đặc biệt như quân mã?

### Câu 3 — Khi nào bắt đầu một khối mới?

```js
if (isValidStart && !visited[row][col])
```

### Câu 4 — Trong lúc duyệt một khối cần thu thập gì?

| Đề hỏi | State của một khối |
| --- | --- |
| Kích thước | `size` |
| Tổng | `sum` |
| Có chạm biên | `touchesBorder` |
| Chạm cột nào | `touchedColumns` |
| Chạm hàng nào | `touchedRows` |
| Giá trị lớn nhất trong khối | `componentMax` |

### Câu 5 — Sau khi duyệt xong một khối làm gì?

Ví dụ:

```js
count++;
maxSize = Math.max(maxSize, size);
sizes.push(size);
if (!touchesBorder) enclosedCount++;
```

### Câu 6 — `visited` là vĩnh viễn hay theo một nhánh?

- Chia bảng thành các vùng → vĩnh viễn, không hoàn tác.
- Thử nhiều đường đi → theo nhánh, phải hoàn tác.

---

## 23. Những dòng thường thay đổi giữa các đề

Khung duyệt gần như giữ nguyên. Tập trung tìm các chỗ này:

```js
// 1. Điều kiện ô bắt đầu
if (grid[row][col] !== 1 || visited[row][col]) continue;

// 2. State của một khối
let size = 0;
let sum = 0;
let touchesBorder = false;
const touchedColumns = new Set();

// 3. Việc làm khi pop một ô
size++;
sum += grid[currentRow][currentCol];
touchedColumns.add(currentCol);

// 4. Điều kiện hàng xóm
if (grid[nextRow][nextCol] !== 1 || visited[nextRow][nextCol]) continue;

// 5. Việc làm sau khi duyệt xong khối
maxSize = Math.max(maxSize, size);
```

---

## 24. Lỗi thường gặp

### Lỗi 1 — Kiểm tra biên bằng `>` thay vì `>=`

Sai:

```js
nextRow > rows
nextCol > cols
```

Đúng:

```js
nextRow >= rows
nextCol >= cols
```

Chỉ số cuối cùng hợp lệ là `rows - 1` và `cols - 1`.

### Lỗi 2 — Kiểm tra nhầm ô hiện tại

Sai:

```js
visited[row][col]
```

trong lúc đang kiểm tra hàng xóm.

Đúng:

```js
visited[nextRow][nextCol]
```

### Lỗi 3 — Đánh dấu nhầm tọa độ

Sai:

```js
visited[row][col] = true;
stack.push([nextRow, nextCol]);
```

Đúng:

```js
visited[nextRow][nextCol] = true;
stack.push([nextRow, nextCol]);
```

### Lỗi 4 — Không kiểm tra `visited` ở vòng lặp ngoài

Đúng:

```js
if (land[row][col] !== 1 || visited[row][col]) {
  continue;
}
```

Nếu thiếu, một khối có thể bị bắt đầu và tính lại nhiều lần.

### Lỗi 5 — Đánh dấu sau khi pop

Nên đánh dấu trước khi push để một ô không bị push trùng.

### Lỗi 6 — Quên reset state của từng khối

Sai:

```js
let size = 0; // đặt ngoài toàn bộ vòng lặp rồi không reset
```

Đúng:

```js
// Khi bắt đầu từng khối mới:
let size = 0;
```

### Lỗi 7 — Cộng một khối nhiều lần vào cùng cột

Trong bài Khoan dầu phải dùng `Set`:

```js
const touchedColumns = new Set();
```

### Lỗi 8 — Dùng recursive DFS cho grid rất lớn trong JavaScript

Đệ quy sâu có thể gây:

```text
RangeError: Maximum call stack size exceeded
```

Với grid lớn, ưu tiên stack tự quản lý.

---

## 25. Độ phức tạp

Với bảng `rows × cols`:

- Mỗi ô được đánh dấu tối đa một lần.
- Mỗi ô kiểm tra số hướng cố định.

Do đó:

```text
Time:  O(rows × cols)
Space: O(rows × cols)
```

`Space` gồm `visited` và stack trong trường hợp xấu nhất.

---

## 26. Bảng tổng hợp nhanh

| Biến thể | Thêm state | Khi cập nhật |
| --- | --- | --- |
| Đếm số khối | `count` | Khi bắt đầu khối mới |
| Kích thước khối | `size` | Mỗi lần pop |
| Khối lớn nhất | `maxSize` | Sau khi duyệt xong khối |
| Tổng vùng | `sum` | Mỗi lần pop |
| Vùng kín | `touchesBorder` | Mỗi lần pop; kiểm tra sau khối |
| Chạm cột nào | `touchedColumns` | Mỗi lần pop |
| Chạm hàng nào | `touchedRows` | Mỗi lần pop |
| Gắn mã vùng | `componentId` | Khi phát hiện/push ô |
| Cùng màu | `targetValue` | So sánh khi xét hàng xóm |
| 8 hướng | 8 `DIRECTIONS` | Chỉ đổi danh sách hướng |
| Đường ngắn nhất | queue + distance | BFS theo từng lớp |
| Mọi đường đi | visited theo nhánh | Chọn → đệ quy → hoàn tác |

---

## 27. Bản đồ tư duy trong phòng thi

```text
Đề cho grid
│
├─ Hỏi vùng/khối liên thông?
│  └─ Quét bảng + stack + visited vĩnh viễn
│
├─ Hỏi kích thước/tổng/chạm biên/chạm cột?
│  └─ Thêm state trong lúc duyệt từng khối
│
├─ Hỏi số bước ngắn nhất?
│  └─ BFS + queue + distance
│
└─ Hỏi tất cả cách đi?
   └─ Backtracking + hoàn tác visited
```

---

## 28. Lộ trình luyện từ dễ đến khó

1. Đếm số khối `1`.
2. Tìm kích thước khối lớn nhất.
3. Trả về danh sách kích thước các khối.
4. Đếm khối có kích thước ít nhất `k`.
5. Tính tổng từng vùng giá trị dương.
6. Đếm vùng không chạm biên.
7. Đếm vùng cùng màu.
8. Duyệt theo tám hướng.
9. Gắn ID cho từng khối.
10. Bài Khoan dầu.
11. BFS tìm đường ngắn nhất.
12. Backtracking đếm mọi đường đi.

---

## 29. Bài tự kiểm tra

### Bài A — Đếm số khối

```js
const land = [
  [1, 1, 0],
  [0, 1, 0],
  [1, 0, 1],
];
```

Expected:

```js
3
```

### Bài B — Khối lớn nhất

Với `land` trên, expected:

```js
3
```

### Bài C — Danh sách kích thước

Với `land` trên, nếu sắp tăng dần:

```js
[1, 1, 3]
```

### Bài D — Đổi sang tám hướng

Với cùng `land`, nếu các ô chéo cũng nối nhau, hãy tự xác định lại số khối.

### Bài E — Vùng kín

Đếm số khối `0` không chạm biên trong grid:

```js
const grid = [
  [1, 1, 1, 1, 1],
  [1, 0, 0, 0, 1],
  [1, 0, 1, 0, 1],
  [1, 1, 1, 1, 1],
];
```

Expected:

```js
1
```

---

## 30. Template siêu ngắn để viết lại từ trí nhớ

```js
const rows = grid.length;
const cols = grid[0].length;
const dirs = [[-1, 0], [0, 1], [1, 0], [0, -1]];
const visited = Array.from({ length: rows }, () => Array(cols).fill(false));

for (let row = 0; row < rows; row++) {
  for (let col = 0; col < cols; col++) {
    if (!isValidCell(row, col) || visited[row][col]) continue;

    // Bắt đầu một khối mới
    const stack = [[row, col]];
    visited[row][col] = true;

    while (stack.length > 0) {
      const [currentRow, currentCol] = stack.pop();

      // Thu thập thông tin của khối tại đây

      for (const [dr, dc] of dirs) {
        const nextRow = currentRow + dr;
        const nextCol = currentCol + dc;

        if (nextRow < 0 || nextRow >= rows || nextCol < 0 || nextCol >= cols) {
          continue;
        }

        if (!isValidCell(nextRow, nextCol) || visited[nextRow][nextCol]) {
          continue;
        }

        visited[nextRow][nextCol] = true;
        stack.push([nextRow, nextCol]);
      }
    }

    // Tổng hợp kết quả của khối tại đây
  }
}
```

## 31. Một câu chốt để nhớ cả họ bài

> Vòng lặp ngoài **tìm từng khối**, stack **đi hết một khối**, còn đề bài quyết định ta phải **thu thập gì trong khối đó**.
