# PCCP JavaScript — Toàn bộ các họ DFS và Backtracking trọng tâm

> Mục tiêu: nhìn đề và xác định được **DFS đang đi qua cái gì**, **mỗi tầng quyết định gì**, **state là gì**, và **có phải hoàn tác hay không**.
>
> Tài liệu đồng hành: `pccp-grid-stack-visited-all-variants.md` trình bày chi tiết riêng họ bài duyệt vùng liên thông trên grid.

---

## 1. DFS thật ra là gì?

DFS là cách khám phá một nhánh thật sâu trước, sau đó quay lại để thử nhánh khác.

Khung tư duy:

```text
State hiện tại
→ chọn một phương án
→ đi sâu sang state tiếp theo
→ quay lại
→ thử phương án khác
```

DFS không chỉ có một template. Template phụ thuộc vào cách một state sinh ra các state tiếp theo.

---

## 2. Bản đồ toàn bộ các họ DFS

| Họ bài | Mỗi tầng biểu diễn | Cách sinh nhánh | Công cụ nhận biết |
| --- | --- | --- | --- |
| Lấy/bỏ | Một phần tử | Hai lời gọi cố định | `dfs(index + 1, ...)` hai lần |
| Chọn một trong nhiều lựa chọn | Một vị trí/công việc | Vòng `for` | `for` bên trong DFS |
| Tổ hợp | Số món đã chọn | Chỉ xét phần tử phía sau | Tham số `start` |
| Hoán vị | Vị trí đang điền | Chọn mọi phần tử chưa dùng | `used[]` + hoàn tác |
| Phân công | Công việc/vị trí | Chọn ứng viên chưa dùng | `used[]` + điểm số |
| Graph | Một đỉnh | Duyệt danh sách kề | `adj[node]` + `visited` |
| Tree | Một node | Duyệt các node con | base case node rỗng/lá |
| Vùng trên grid | Một ô | Bốn/tám hàng xóm | `visited` vĩnh viễn |
| Đường đi trên grid | Một ô trong đường hiện tại | Các hàng xóm hợp lệ | `visited` rồi hoàn tác |
| Ràng buộc | Một vị trí cần đặt | Thử lựa chọn không xung đột | choose → dfs → restore |
| DFS + memo | Một state có thể lặp lại | Tái sử dụng kết quả state | `memo` / cache |

---

## 3. Bảng quan trọng nhất: dùng thứ gì để chống chọn sai?

| Tình huống | Công cụ | Có hoàn tác không? |
| --- | --- | --- |
| Mỗi phần tử xử lý theo thứ tự | `index` | Không |
| Chỉ chọn các phần tử phía sau | `start` | Không |
| Một phần tử chỉ dùng một lần trong phương án | `used[]` | Có |
| Một ô chỉ thuộc một thành phần liên thông | `visited[][]` | Không |
| Một ô không được lặp trong đường hiện tại | `visited[][]` | Có |
| Một đỉnh graph chỉ cần duyệt một lần | `visited[]` | Không |
| Một state tính toán lặp lại | `memo` | Không phải hoàn tác |

Câu hỏi quyết định:

> Sau khi kết thúc nhánh hiện tại, nhánh khác có được dùng lại lựa chọn này không?

- Có → phải hoàn tác.
- Không → giữ nguyên trạng thái đã đánh dấu.

---

# HỌ 1 — LẤY / BỎ

## 4. Cách nhận diện

Mỗi phần tử có đúng hai quyết định:

```text
lấy phần tử này
hoặc
không lấy phần tử này
```

Các cách diễn đạt thường gặp:

- chọn hoặc không chọn;
- cộng hoặc trừ;
- bật hoặc tắt;
- đưa vào nhóm A hoặc nhóm B;
- tạo tất cả tập con;
- đếm số cách đạt target.

---

## 5. State chuẩn

```js
dfs(index, state)
```

- `index`: đang quyết định phần tử nào.
- `state`: kết quả tạm thời, ví dụ `sum`, `score`, `difference`.

Base case:

```js
if (index === numbers.length) {
  // Đã quyết định xong tất cả phần tử
  return;
}
```

---

## 6. Template Target Number: cộng hoặc trừ

```js
function solution(numbers, target) {
  let count = 0;

  function dfs(index, sum) {
    if (index === numbers.length) {
      if (sum === target) {
        count++;
      }
      return;
    }

    dfs(index + 1, sum + numbers[index]);
    dfs(index + 1, sum - numbers[index]);
  }

  dfs(0, 0);
  return count;
}
```

Cây quyết định:

```text
                         dfs(0, 0)
                       /           \
                   cộng n[0]     trừ n[0]
                   /    \          /    \
              cộng/bớt n[1]   cộng/bớt n[1]
```

Không cần `used` vì `index` tự đảm bảo mỗi phần tử chỉ được quyết định một lần.

---

## 7. Các biến thể của lấy/bỏ

### 7.1. Đếm số tập con có tổng bằng target

```js
dfs(index + 1, sum + numbers[index]); // lấy
dfs(index + 1, sum);                  // bỏ
```

Base case:

```js
if (index === numbers.length) {
  if (sum === target) count++;
  return;
}
```

### 7.2. Kiểm tra có tồn tại cách đạt target

```js
function canReach(numbers, target) {
  function dfs(index, sum) {
    if (index === numbers.length) {
      return sum === target;
    }

    return (
      dfs(index + 1, sum + numbers[index]) ||
      dfs(index + 1, sum)
    );
  }

  return dfs(0, 0);
}
```

### 7.3. Tìm tổng lớn nhất không vượt target

```js
function bestSubsetSum(numbers, target) {
  let best = 0;

  function dfs(index, sum) {
    if (sum > target) return;

    if (index === numbers.length) {
      best = Math.max(best, sum);
      return;
    }

    dfs(index + 1, sum + numbers[index]);
    dfs(index + 1, sum);
  }

  dfs(0, 0);
  return best;
}
```

### 7.4. Chia mỗi phần tử vào nhóm A hoặc B

```js
dfs(index + 1, sumA + numbers[index], sumB);
dfs(index + 1, sumA, sumB + numbers[index]);
```

### 7.5. Liệt kê tất cả tập con

Lúc này có một `path` và cần hoàn tác nội dung `path`:

```js
function subsets(numbers) {
  const result = [];
  const path = [];

  function dfs(index) {
    if (index === numbers.length) {
      result.push([...path]);
      return;
    }

    path.push(numbers[index]);
    dfs(index + 1);
    path.pop();

    dfs(index + 1);
  }

  dfs(0);
  return result;
}
```

---

# HỌ 2 — CHỌN MỘT TRONG NHIỀU LỰA CHỌN

## 8. Cách nhận diện

Tại mỗi tầng, không chỉ có lấy/bỏ mà có nhiều phương án:

```text
vị trí hiện tại có thể chọn A, B, C, D...
```

Template:

```js
function dfs(level, state) {
  if (level === totalLevels) {
    // Ghi nhận đáp án
    return;
  }

  for (const choice of choices) {
    if (!isValid(choice)) continue;

    choose(choice);
    dfs(level + 1, nextState);
    restore(choice);
  }
}
```

---

# HỌ 3 — HOÁN VỊ

## 9. Cách nhận diện

- Sắp xếp tất cả phần tử theo mọi thứ tự.
- Mỗi phần tử chỉ xuất hiện một lần.
- Thứ tự khác nhau được tính là phương án khác.

Ví dụ:

```text
[1, 2] và [2, 1] là hai phương án khác nhau.
```

---

## 10. Template hoán vị đầy đủ

```js
function permutations(numbers) {
  const result = [];
  const path = [];
  const used = Array(numbers.length).fill(false);

  function dfs() {
    if (path.length === numbers.length) {
      result.push([...path]);
      return;
    }

    for (let i = 0; i < numbers.length; i++) {
      if (used[i]) continue;

      used[i] = true;
      path.push(numbers[i]);

      dfs();

      path.pop();
      used[i] = false;
    }
  }

  dfs();
  return result;
}
```

Công thức phải nhớ:

```text
đánh dấu lựa chọn
→ thêm vào phương án
→ đi sâu
→ bỏ khỏi phương án
→ trả đánh dấu
```

---

## 11. Hoán vị có phần tử trùng nhau

Ví dụ input:

```js
[1, 1, 2]
```

Nếu không xử lý, cùng một hoán vị có thể được sinh nhiều lần.

Sau khi sort:

```js
numbers.sort((a, b) => a - b);
```

Bỏ lựa chọn trùng ở cùng một tầng:

```js
if (i > 0 && numbers[i] === numbers[i - 1] && !used[i - 1]) {
  continue;
}
```

Template phần vòng lặp:

```js
for (let i = 0; i < numbers.length; i++) {
  if (used[i]) continue;

  if (i > 0 && numbers[i] === numbers[i - 1] && !used[i - 1]) {
    continue;
  }

  used[i] = true;
  path.push(numbers[i]);
  dfs();
  path.pop();
  used[i] = false;
}
```

---

# HỌ 4 — PHÂN CÔNG

## 12. Cách nhận diện

- Có nhiều vị trí/công việc/môn thi.
- Mỗi vị trí phải chọn đúng một ứng viên.
- Một ứng viên không được dùng lại.
- Cần tối đa hoặc tối thiểu hóa tổng điểm/chi phí.

State:

```js
dfs(position, total)
```

- `position`: vị trí bắt buộc đang cần lấp.
- `total`: tổng kết quả của các lựa chọn trước.
- `used[candidate]`: ứng viên đã được dùng chưa.

---

## 13. Full code phân công tìm tổng lớn nhất

```js
function solution(ability) {
  const candidateCount = ability.length;
  const positionCount = ability[0].length;

  const used = Array(candidateCount).fill(false);
  let maxScore = 0;

  function dfs(position, score) {
    if (position === positionCount) {
      maxScore = Math.max(maxScore, score);
      return;
    }

    for (let candidate = 0; candidate < candidateCount; candidate++) {
      if (used[candidate]) continue;

      used[candidate] = true;

      dfs(
        position + 1,
        score + ability[candidate][position]
      );

      used[candidate] = false;
    }
  }

  dfs(0, 0);
  return maxScore;
}
```

### Đổi sang tìm nhỏ nhất

```js
let minCost = Infinity;
```

Base case:

```js
minCost = Math.min(minCost, cost);
```

### Đếm số cách phân công hợp lệ

Base case:

```js
count++;
```

### Có cặp không được phép phân công

Trong vòng lặp:

```js
if (!allowed[candidate][position]) continue;
```

---

# HỌ 5 — TỔ HỢP

## 14. Hoán vị và tổ hợp khác nhau thế nào?

| | Hoán vị | Tổ hợp |
| --- | --- | --- |
| `[1, 2]` và `[2, 1]` | Khác nhau | Giống nhau |
| Công cụ | `used[]` | `start` |
| Lựa chọn tiếp theo | Mọi phần tử chưa dùng | Chỉ phần tử phía sau |

---

## 15. Chọn đúng `k` phần tử

```js
function combinations(numbers, k) {
  const result = [];
  const path = [];

  function dfs(start) {
    if (path.length === k) {
      result.push([...path]);
      return;
    }

    for (let i = start; i < numbers.length; i++) {
      path.push(numbers[i]);
      dfs(i + 1);
      path.pop();
    }
  }

  dfs(0);
  return result;
}
```

Tại sao gọi `dfs(i + 1)`?

Vì sau khi chọn phần tử `i`, ta chỉ được chọn các phần tử đứng sau nó. Nhờ vậy không sinh lại cùng tổ hợp theo thứ tự ngược.

---

## 16. Tổ hợp có tổng bằng target

```js
function countCombinations(numbers, k, target) {
  let count = 0;

  function dfs(start, selectedCount, sum) {
    if (selectedCount === k) {
      if (sum === target) count++;
      return;
    }

    for (let i = start; i < numbers.length; i++) {
      dfs(i + 1, selectedCount + 1, sum + numbers[i]);
    }
  }

  dfs(0, 0, 0);
  return count;
}
```

### Cắt nhánh vì không còn đủ phần tử

```js
const need = k - selectedCount;

for (let i = start; i <= numbers.length - need; i++) {
  // ...
}
```

---

## 17. Tổ hợp cho phép dùng lại phần tử

Nếu được chọn lại chính phần tử `i`:

```js
dfs(i, nextState);
```

Nếu mỗi phần tử chỉ dùng một lần:

```js
dfs(i + 1, nextState);
```

Đây là khác biệt chỉ một ký tự nhưng thay đổi hoàn toàn tập phương án.

---

# HỌ 6 — SINH CHUỖI / DÃY THEO TỪNG VỊ TRÍ

## 18. Cách nhận diện

- Tạo chuỗi có độ dài `n`.
- Mỗi vị trí chọn một ký tự hoặc số.
- Có thể có điều kiện giữa vị trí hiện tại và các vị trí trước.

Ví dụ sinh tất cả chuỗi nhị phân độ dài `n`:

```js
function binaryStrings(n) {
  const result = [];
  const path = [];

  function dfs(index) {
    if (index === n) {
      result.push(path.join(""));
      return;
    }

    for (const value of [0, 1]) {
      path.push(value);
      dfs(index + 1);
      path.pop();
    }
  }

  dfs(0);
  return result;
}
```

Nếu không được có hai số `1` liên tiếp:

```js
if (value === 1 && path[path.length - 1] === 1) {
  continue;
}
```

---

# HỌ 7 — DFS TRÊN GRAPH

## 19. Cách nhận diện

- Đề có node/đỉnh và edge/cạnh.
- Quan hệ bạn bè, máy tính, thành phố, đường nối, mạng lưới.
- Input có thể là danh sách cạnh hoặc ma trận kết nối.

Danh sách kề:

```js
const graph = [
  [1, 2], // node 0 nối 1 và 2
  [0, 3],
  [0],
  [1],
];
```

---

## 20. DFS graph bằng đệ quy

```js
function traverseGraph(graph, start) {
  const visited = Array(graph.length).fill(false);
  const order = [];

  function dfs(node) {
    visited[node] = true;
    order.push(node);

    for (const nextNode of graph[node]) {
      if (visited[nextNode]) continue;
      dfs(nextNode);
    }
  }

  dfs(start);
  return order;
}
```

`visited` không hoàn tác vì mỗi node chỉ cần được duyệt một lần.

---

## 21. Đếm thành phần liên thông trong graph

```js
function countComponents(graph) {
  const visited = Array(graph.length).fill(false);
  let count = 0;

  function dfs(node) {
    visited[node] = true;

    for (const nextNode of graph[node]) {
      if (visited[nextNode]) continue;
      dfs(nextNode);
    }
  }

  for (let node = 0; node < graph.length; node++) {
    if (visited[node]) continue;

    count++;
    dfs(node);
  }

  return count;
}
```

Cơ chế giống đếm số đảo:

```text
quét tất cả node
→ gặp node chưa thăm
→ tăng số component
→ DFS đánh dấu cả component
```

---

## 22. Phát hiện chu trình trong graph vô hướng

Cần nhớ node cha để không coi cạnh quay về cha là chu trình.

```js
function hasCycle(graph) {
  const visited = Array(graph.length).fill(false);

  function dfs(node, parent) {
    visited[node] = true;

    for (const nextNode of graph[node]) {
      if (!visited[nextNode]) {
        if (dfs(nextNode, node)) return true;
      } else if (nextNode !== parent) {
        return true;
      }
    }

    return false;
  }

  for (let node = 0; node < graph.length; node++) {
    if (!visited[node] && dfs(node, -1)) {
      return true;
    }
  }

  return false;
}
```

---

## 23. Phát hiện chu trình trong graph có hướng

Dùng ba màu:

```text
0 = chưa thăm
1 = đang nằm trên đường DFS hiện tại
2 = đã xử lý xong
```

```js
function hasDirectedCycle(graph) {
  const state = Array(graph.length).fill(0);

  function dfs(node) {
    if (state[node] === 1) return true;
    if (state[node] === 2) return false;

    state[node] = 1;

    for (const nextNode of graph[node]) {
      if (dfs(nextNode)) return true;
    }

    state[node] = 2;
    return false;
  }

  for (let node = 0; node < graph.length; node++) {
    if (state[node] === 0 && dfs(node)) {
      return true;
    }
  }

  return false;
}
```

---

# HỌ 8 — DFS TRÊN TREE

## 24. Tree khác graph ở đâu?

Tree không có chu trình nếu dữ liệu đúng chuẩn. Khi node đã biết sẵn các node con, thường không cần `visited`.

Node mẫu:

```js
const node = {
  value: 10,
  left: null,
  right: null,
};
```

---

## 25. Ba thứ tự DFS trên cây

### Preorder: node trước, con sau

```js
function preorder(node, result = []) {
  if (node === null) return result;

  result.push(node.value);
  preorder(node.left, result);
  preorder(node.right, result);

  return result;
}
```

### Inorder: trái, node, phải

```js
function inorder(node, result = []) {
  if (node === null) return result;

  inorder(node.left, result);
  result.push(node.value);
  inorder(node.right, result);

  return result;
}
```

### Postorder: con trước, node sau

```js
function postorder(node, result = []) {
  if (node === null) return result;

  postorder(node.left, result);
  postorder(node.right, result);
  result.push(node.value);

  return result;
}
```

---

## 26. Tính chiều cao cây

```js
function maxDepth(node) {
  if (node === null) return 0;

  const leftDepth = maxDepth(node.left);
  const rightDepth = maxDepth(node.right);

  return 1 + Math.max(leftDepth, rightDepth);
}
```

Tư duy postorder:

```text
lấy kết quả từ cây con
→ ghép thành kết quả của node hiện tại
```

---

## 27. Tính tổng của mỗi cây con

```js
function subtreeSum(node) {
  if (node === null) return 0;

  const leftSum = subtreeSum(node.left);
  const rightSum = subtreeSum(node.right);

  return node.value + leftSum + rightSum;
}
```

Các biến thể:

- đếm số node trong subtree;
- tìm subtree lớn nhất;
- kiểm tra cây cân bằng;
- tính đường đi từ gốc đến lá.

---

# HỌ 9 — VÙNG LIÊN THÔNG TRÊN GRID

## 28. Bản chất

```text
quét toàn bảng
→ gặp ô hợp lệ chưa thăm
→ DFS/stack duyệt hết một vùng
→ visited giữ nguyên vĩnh viễn
```

Các biến thể:

- đếm số khối;
- kích thước khối;
- khối lớn nhất;
- tổng giá trị vùng;
- vùng kín/chạm biên;
- gắn ID component;
- chạm hàng/cột;
- bài Khoan dầu;
- 4 hướng/8 hướng;
- các ô cùng màu.

Toàn bộ code và lỗi thường gặp nằm trong:

```text
pccp-grid-stack-visited-all-variants.md
```

Điểm quyết định:

```js
visited[nextRow][nextCol] = true;
stack.push([nextRow, nextCol]);

// Không trả visited về false.
```

---

# HỌ 10 — TÌM ĐƯỜNG CÓ HOÀN TÁC

## 29. Cách nhận diện

- Tìm hoặc đếm mọi đường đi.
- Không được đi lại một ô trong cùng đường.
- Một ô vẫn có thể được sử dụng bởi đường khác.
- Mỗi nhánh DFS đại diện cho một đường đi.

Khác hoàn toàn với duyệt vùng:

```text
Duyệt vùng: ô đã thăm không bao giờ dùng lại.
Tìm đường: kết thúc một nhánh thì ô được mở lại cho nhánh khác.
```

---

## 30. Đếm tất cả đường đi từ đầu đến đích

Quy ước:

- `0`: đi được.
- `1`: tường.
- Bắt đầu tại `(0, 0)`.
- Đích tại `(rows - 1, cols - 1)`.

```js
function countPaths(maze) {
  const rows = maze.length;
  const cols = maze[0].length;

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

  function dfs(row, col) {
    if (row === rows - 1 && col === cols - 1) {
      count++;
      return;
    }

    for (const [dr, dc] of DIRECTIONS) {
      const nextRow = row + dr;
      const nextCol = col + dc;

      if (
        nextRow < 0 ||
        nextRow >= rows ||
        nextCol < 0 ||
        nextCol >= cols
      ) {
        continue;
      }

      if (
        maze[nextRow][nextCol] === 1 ||
        visited[nextRow][nextCol]
      ) {
        continue;
      }

      visited[nextRow][nextCol] = true;
      dfs(nextRow, nextCol);
      visited[nextRow][nextCol] = false;
    }
  }

  if (maze[0][0] === 1 || maze[rows - 1][cols - 1] === 1) {
    return 0;
  }

  visited[0][0] = true;
  dfs(0, 0);

  return count;
}
```

Câu thần chú:

```text
đánh dấu hàng xóm
→ đi sang hàng xóm
→ quay lại
→ bỏ đánh dấu hàng xóm
```

---

## 31. Tìm một đường bất kỳ

Có thể trả về `true` ngay khi tìm thấy đích:

```js
function dfs(row, col) {
  if (row === targetRow && col === targetCol) {
    return true;
  }

  for (const [dr, dc] of DIRECTIONS) {
    // Tạo và kiểm tra nextRow, nextCol...

    visited[nextRow][nextCol] = true;

    if (dfs(nextRow, nextCol)) {
      return true;
    }

    visited[nextRow][nextCol] = false;
  }

  return false;
}
```

Nếu chỉ cần biết có đường hay không, có thể dùng visited vĩnh viễn. Nếu cần lưu chính xác đường đang thử hoặc liệt kê mọi đường, dùng hoàn tác theo nhánh.

---

## 32. Tìm đường tốt nhất bằng backtracking

Ví dụ tối đa hóa tổng điểm trên đường:

```js
let best = -Infinity;

function dfs(row, col, score) {
  if (row === targetRow && col === targetCol) {
    best = Math.max(best, score);
    return;
  }

  for (const [dr, dc] of DIRECTIONS) {
    // Kiểm tra hàng xóm...

    visited[nextRow][nextCol] = true;
    dfs(nextRow, nextCol, score + board[nextRow][nextCol]);
    visited[nextRow][nextCol] = false;
  }
}
```

Cảnh báo: nếu bài hỏi đường ngắn nhất trên grid không trọng số, ưu tiên BFS thay vì liệt kê mọi đường.

---

# HỌ 11 — BÀI TOÁN RÀNG BUỘC

## 33. Cách nhận diện

- Phải đặt/chọn lần lượt vào từng vị trí.
- Mỗi lựa chọn phải thỏa các điều kiện với lựa chọn trước.
- Nếu vi phạm thì cắt nhánh ngay.

Khung:

```js
function dfs(position) {
  if (position === totalPositions) {
    answer++;
    return;
  }

  for (const choice of choices) {
    if (conflicts(choice)) continue;

    choose(choice);
    dfs(position + 1);
    restore(choice);
  }
}
```

---

## 34. N-Queens

Mỗi hàng đặt đúng một quân hậu. Không được trùng cột hoặc đường chéo.

```js
function nQueens(n) {
  const columns = new Set();
  const diagonal1 = new Set(); // row - col
  const diagonal2 = new Set(); // row + col

  let count = 0;

  function dfs(row) {
    if (row === n) {
      count++;
      return;
    }

    for (let col = 0; col < n; col++) {
      const d1 = row - col;
      const d2 = row + col;

      if (
        columns.has(col) ||
        diagonal1.has(d1) ||
        diagonal2.has(d2)
      ) {
        continue;
      }

      columns.add(col);
      diagonal1.add(d1);
      diagonal2.add(d2);

      dfs(row + 1);

      columns.delete(col);
      diagonal1.delete(d1);
      diagonal2.delete(d2);
    }
  }

  dfs(0);
  return count;
}
```

N-Queens thực chất vẫn là:

```text
mỗi hàng = một tầng
mỗi cột = một lựa chọn
Set = các ràng buộc đang được dùng
```

---

## 35. Sudoku và các bài tương tự

State thường là vị trí trống thứ `index`:

```js
function dfs(index) {
  if (index === emptyCells.length) {
    return true;
  }

  const [row, col] = emptyCells[index];

  for (let value = 1; value <= 9; value++) {
    if (!canPlace(row, col, value)) continue;

    board[row][col] = value;

    if (dfs(index + 1)) return true;

    board[row][col] = 0;
  }

  return false;
}
```

Điểm chung không phải là Sudoku, mà là cơ chế:

```text
tìm vị trí chưa hoàn thành
→ thử lựa chọn hợp lệ
→ đi sâu
→ thất bại thì hoàn tác
```

---

# HỌ 12 — HAI ĐỐI TƯỢNG CÙNG DI CHUYỂN

## 36. Cách nhận diện

- Hai quân/xe/người cùng có vị trí riêng.
- Mỗi lượt cả hai có thể tạo ra nhiều cặp lựa chọn.
- Có ràng buộc giữa vị trí mới của hai đối tượng.
- Mỗi đối tượng có thể có `visited` riêng.

State có thể là:

```js
dfs(redRow, redCol, blueRow, blueCol, turn)
```

Hoặc mã hóa vị trí:

```js
dfs(redPosition, bluePosition, turn)
```

---

## 37. Khung tư duy hai đối tượng

```js
function dfs(redRow, redCol, blueRow, blueCol, turn) {
  if (bothReachedGoal) {
    answer = Math.min(answer, turn);
    return;
  }

  for (const redMove of redChoices) {
    const nextRed = getNextRed(redMove);
    if (!isValidRed(nextRed)) continue;

    for (const blueMove of blueChoices) {
      const nextBlue = getNextBlue(blueMove);
      if (!isValidBlue(nextBlue)) continue;

      if (sameCell(nextRed, nextBlue)) continue;
      if (swappedPositions(nextRed, nextBlue)) continue;

      markRedAndBlue();
      dfs(nextRed.row, nextRed.col, nextBlue.row, nextBlue.col, turn + 1);
      restoreRedAndBlue();
    }
  }
}
```

Đây là dạng nâng cao vì số nhánh là tích các lựa chọn:

```text
4 hướng của đỏ × 4 hướng của xanh = tối đa 16 cặp/lượt
```

Các ràng buộc hay gặp:

- ra ngoài biên;
- đi vào tường;
- đi lại ô cũ của chính mình;
- hai quân tới cùng một ô;
- hai quân đổi chỗ trực tiếp;
- quân đã đến đích thì đứng yên.

Đây là bước phát triển tự nhiên sau khi thành thạo tìm đường một đối tượng.

---

# HỌ 13 — DFS + MEMOIZATION

## 38. Khi nào DFS thuần bị lặp?

Nếu nhiều nhánh khác nhau dẫn tới cùng một state, DFS có thể tính lại state đó nhiều lần.

Ví dụ Fibonacci:

```text
f(5)
→ f(4) + f(3)
→ f(3) bị tính lại
```

Khi kết quả chỉ phụ thuộc vào state, có thể cache lại.

---

## 39. Template memoization

```js
const memo = new Map();

function dfs(state) {
  const key = makeKey(state);

  if (memo.has(key)) {
    return memo.get(key);
  }

  if (isBaseCase(state)) {
    return baseResult;
  }

  const result = combineNextStates(state);
  memo.set(key, result);

  return result;
}
```

State nhiều biến có thể tạo key:

```js
const key = `${index},${sum}`;
```

---

## 40. Đếm số cách đạt tổng bằng DFS + memo

Giả sử mỗi lần được dùng các số trong `coins` và thứ tự được tính là khác nhau:

```js
function countWays(coins, target) {
  const memo = new Map();

  function dfs(sum) {
    if (sum === target) return 1;
    if (sum > target) return 0;

    if (memo.has(sum)) {
      return memo.get(sum);
    }

    let ways = 0;

    for (const coin of coins) {
      ways += dfs(sum + coin);
    }

    memo.set(sum, ways);
    return ways;
  }

  return dfs(0);
}
```

Không phải DFS nào cũng memo được.

Nếu kết quả còn phụ thuộc vào tập phần tử đã dùng hoặc đường đi hiện tại, key phải chứa đủ thông tin đó. Thiếu state trong key sẽ cho đáp án sai.

---

## 41. DFS trên DAG + memo

Ví dụ tìm độ dài đường dài nhất từ một node đến node kết thúc trong DAG:

```js
function longestPath(graph) {
  const memo = Array(graph.length).fill(undefined);

  function dfs(node) {
    if (memo[node] !== undefined) {
      return memo[node];
    }

    let best = 0;

    for (const nextNode of graph[node]) {
      best = Math.max(best, 1 + dfs(nextNode));
    }

    memo[node] = best;
    return best;
  }

  let answer = 0;

  for (let node = 0; node < graph.length; node++) {
    answer = Math.max(answer, dfs(node));
  }

  return answer;
}
```

Chỉ dùng trực tiếp như vậy khi graph không có chu trình.

---

# CẮT NHÁNH

## 42. Pruning là gì?

Nếu biết chắc nhánh hiện tại không thể tạo ra đáp án tốt hơn, dừng sớm.

```js
if (cannotBeatBest) {
  return;
}
```

Ví dụ tổng đã vượt target với toàn số dương:

```js
if (sum > target) return;
```

Ví dụ chi phí hiện tại đã không thể tốt hơn đáp án nhỏ nhất:

```js
if (cost >= minCost) return;
```

Ví dụ không còn đủ phần tử để chọn đủ `k`:

```js
if (selectedCount + (numbers.length - start) < k) {
  return;
}
```

Cảnh báo: chỉ cắt khi có chứng minh. Nếu còn số âm, `sum > target` chưa chắc là vô vọng vì phía sau có thể trừ xuống.

---

# CÁCH ĐỌC ĐỀ VÀ TỰ VIẾT

## 43. Chín câu hỏi trước khi code

### 1. DFS đang đi qua cái gì?

- index của mảng?
- vị trí cần phân công?
- node graph/tree?
- ô grid?
- một state tổng hợp?

### 2. Một tầng DFS nghĩa là gì?

Ví dụ:

```text
đã quyết định xong index phần tử
đang phân công môn thứ position
đang đứng tại ô row, col
đang đặt quân ở hàng row
```

### 3. Các lựa chọn tại một tầng là gì?

- đúng hai nhánh cố định?
- mọi ứng viên trong vòng `for`?
- mọi hàng xóm?

### 4. Base case là khi nào?

- `index === numbers.length`;
- `position === positionCount`;
- tới đích;
- đã chọn đủ `k`;
- node rỗng.

### 5. State tối thiểu cần mang theo là gì?

- `sum`;
- `score`;
- `selectedCount`;
- tọa độ;
- số lượt.

### 6. Điều kiện nào làm lựa chọn không hợp lệ?

- đã dùng;
- ngoài biên;
- tường;
- vượt target;
- xung đột ràng buộc.

### 7. Dùng `index`, `start`, `used` hay `visited`?

Tra lại bảng ở mục 3.

### 8. Có phải hoàn tác không?

Nhánh khác có cần dùng lại lựa chọn đó không?

### 9. Có state nào bị tính lặp lại không?

Nếu có và kết quả chỉ phụ thuộc state, nghĩ đến memoization.

---

## 44. Công thức viết code từ giấy trắng

Đừng cố nhớ toàn bộ code. Viết theo thứ tự:

```text
1. Xác định state của dfs(...)
2. Viết base case
3. Liệt kê các lựa chọn
4. Viết điều kiện bỏ qua
5. Choose
6. Explore
7. Restore nếu cần
8. Gọi DFS ban đầu
9. Return đáp án
```

Khung backtracking:

```js
function dfs(state) {
  if (baseCase) {
    recordAnswer();
    return;
  }

  for (const choice of choices) {
    if (!isValid(choice)) continue;

    choose(choice);
    dfs(nextState);
    restore(choice);
  }
}
```

Khung DFS không hoàn tác:

```js
function dfs(node) {
  visited[node] = true;

  for (const nextNode of graph[node]) {
    if (visited[nextNode]) continue;
    dfs(nextNode);
  }
}
```

---

## 45. Cách phân biệt nhanh các template

### Câu hỏi 1

Mỗi phần tử có đúng hai quyết định độc lập?

```text
Có → lấy/bỏ.
```

### Câu hỏi 2

Cần sắp thứ tự tất cả phần tử, mỗi phần tử dùng một lần?

```text
Có → hoán vị + used.
```

### Câu hỏi 3

Cần chọn một nhóm nhưng thứ tự không quan trọng?

```text
Có → tổ hợp + start.
```

### Câu hỏi 4

Có các vị trí bắt buộc và mỗi vị trí chọn một ứng viên không trùng?

```text
Có → phân công + used.
```

### Câu hỏi 5

Cần duyệt hết một mạng/vùng và mỗi node chỉ xử lý một lần?

```text
Có → graph/grid DFS + visited không hoàn tác.
```

### Câu hỏi 6

Cần thử mọi đường và nhánh khác được dùng lại ô?

```text
Có → path backtracking + visited có hoàn tác.
```

### Câu hỏi 7

Nhiều nhánh dẫn về đúng cùng một state?

```text
Có → cân nhắc DFS + memoization.
```

---

## 46. Những lỗi hay gặp nhất

### Lỗi 1 — Không phân biệt `index` và `start`

- `index`: đang quyết định một phần tử cụ thể.
- `start`: vị trí đầu tiên được phép chọn ở tầng hiện tại.

### Lỗi 2 — Dùng `used` cho bài tổ hợp

Không sai về mặt khả năng sinh phương án, nhưng dễ sinh trùng. Tổ hợp nên dùng `start`.

### Lỗi 3 — Quên hoàn tác

```js
used[i] = true;
dfs(...);
used[i] = false;
```

Nếu thiếu dòng cuối, các nhánh sau tưởng rằng phần tử vẫn đang bị dùng.

### Lỗi 4 — Hoàn tác trong bài duyệt component

Nếu đặt `visited = false` sau khi duyệt một component, component đó có thể bị tính lại.

### Lỗi 5 — Ghi `path` trực tiếp vào kết quả

Sai:

```js
result.push(path);
```

Đúng:

```js
result.push([...path]);
```

Phải copy vì `path` còn tiếp tục thay đổi.

### Lỗi 6 — Base case thiếu `return`

```js
if (baseCase) {
  answer++;
  return;
}
```

Nếu không return, code có thể tiếp tục sinh nhánh ngoài phạm vi.

### Lỗi 7 — Memo key thiếu state

Nếu kết quả phụ thuộc cả `index` và `sum`, không được cache chỉ bằng `index`.

### Lỗi 8 — DFS cho bài đường ngắn nhất

Grid không trọng số hỏi ít bước nhất → ưu tiên BFS.

### Lỗi 9 — Không kiểm tra constraints

DFS có thể là `2^n`, `n!` hoặc `4^(rows×cols)`. Chỉ dùng khi kích thước cho phép hoặc có pruning/memoization.

### Lỗi 10 — Recursive DFS quá sâu trong JavaScript

Graph/grid rất lớn có thể vượt call stack. Khi đó dùng stack tự quản lý.

---

## 47. Độ phức tạp thường gặp

| Họ bài | Độ phức tạp thô |
| --- | --- |
| Lấy/bỏ `n` phần tử | `O(2^n)` |
| Hoán vị `n` phần tử | `O(n!)` |
| Chọn `k` từ `n` | `O(C(n, k))` phương án |
| Graph traversal | `O(V + E)` |
| Grid component | `O(rows × cols)` |
| Tất cả đường đơn trên grid | Có thể tăng theo cấp số mũ |
| DFS + memo | Phụ thuộc số state khác nhau × số chuyển trạng thái |

Luôn nhìn constraints trước khi chọn DFS.

---

## 48. Bảng chốt toàn bộ các họ

| Họ | State điển hình | Base case | Sinh nhánh | Restore |
| --- | --- | --- | --- | --- |
| Lấy/bỏ | `index, sum` | hết mảng | 2 lời gọi | Không với state truyền bằng số |
| Tập con có path | `index` + `path` | hết mảng | lấy/bỏ | `path.pop()` |
| Hoán vị | `path` | đủ `n` | mọi `i` chưa dùng | Có |
| Phân công | `position, score` | đủ vị trí | mọi ứng viên chưa dùng | Có |
| Tổ hợp | `start, path` | đủ `k` | `i` từ `start` | `path.pop()` |
| Graph | `node` | không còn node mới | danh sách kề | Không |
| Tree | `node` | node rỗng/lá | các node con | Không |
| Grid component | `row, col` | stack hết | các hàng xóm | Không |
| Grid path | `row, col` | đến đích | các hàng xóm | Có |
| Ràng buộc | `position` | đặt đủ | lựa chọn hợp lệ | Có |
| Memoized DFS | state đầy đủ | state kết thúc | state tiếp theo | Cache kết quả |

---

## 49. Thứ tự học phù hợp cho PCCP

```text
1. Lấy/bỏ — đếm số cách
2. Lấy/bỏ — tồn tại/max/min
3. Phân công — used + restore
4. Hoán vị
5. Tổ hợp — start
6. Grid component — visited vĩnh viễn
7. Graph component
8. Tìm đường một đối tượng — visited hoàn tác
9. Bài ràng buộc
10. Hai đối tượng cùng di chuyển
11. Pruning
12. DFS + memoization
```

---

## 50. Bài luyện theo từng họ

### Bài 1 — Lấy/bỏ

Cho `numbers` và `target`, đếm số tập con có tổng bằng `target`.

### Bài 2 — Biến thể lấy/bỏ

Tìm tổng lớn nhất không vượt `target`.

### Bài 3 — Hoán vị

Trả về tất cả cách sắp xếp một mảng không có phần tử trùng.

### Bài 4 — Phân công

Mỗi công việc chọn một người không trùng, tìm tổng chi phí nhỏ nhất.

### Bài 5 — Tổ hợp

Chọn đúng `k` phần tử sao cho tổng bằng `target`.

### Bài 6 — Graph

Đếm số nhóm node liên thông.

### Bài 7 — Grid component

Tìm kích thước vùng `1` lớn nhất.

### Bài 8 — Grid path

Đếm mọi đường từ góc trái trên đến góc phải dưới mà không lặp ô.

### Bài 9 — Ràng buộc

Đếm số cách đặt `n` quân hậu.

### Bài 10 — Memoization

Đếm số cách tạo target bằng các bước cho trước khi cùng một state có thể xuất hiện nhiều lần.

---

## 51. Câu chốt để ghi nhớ

> DFS chỉ là **đi sâu rồi quay lại**. Muốn chọn đúng template, hãy hỏi: **mỗi tầng đang quyết định cái gì, các lựa chọn được sinh ra thế nào, và nhánh sau có được dùng lại lựa chọn của nhánh trước không?**
