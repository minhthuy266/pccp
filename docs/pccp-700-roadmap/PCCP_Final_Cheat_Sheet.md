# PCCP JavaScript — Final Cheat Sheet

**Mục tiêu:** đọc lại trong 15–20 phút trước kỳ thi. Không học thuật toán mới từ tài liệu này.  
**Quy ước:** `R = số hàng`, `C = số cột`, `V = số đỉnh`, `E = số cạnh`.

## Trang 1/4 — Complexity và JavaScript nền tảng

### Chọn complexity theo constraints

| Kích thước gần đúng | Mức nên nghĩ tới |
|---:|---|
| `N ≤ 9–10` | full permutation có thể cân nhắc; `N = 11–12` chỉ khi pruning/cấu trúc rất mạnh |
| `N ≤ 20` | `O(2^N)` có thể phù hợp |
| `N ≤ 500` | `O(N²)` thường có thể cân nhắc |
| `N ≤ 100,000` | ưu tiên `O(N log N)` hoặc `O(N)` |
| Grid `R×C` lớn | BFS/DFS `O(R×C)`, tránh duyệt lại |

Đây chỉ là quy tắc ước lượng. Luôn đọc giới hạn thời gian, số test và hằng số thực tế.

### Array, sort, clone

```js
for (let index = 0; index < arr.length; index++) {
  const value = arr[index];
}

const ascending = [...arr].sort((a, b) => a - b);
const descending = [...arr].sort((a, b) => b - a);

const copy1D = [...arr];
const copy2D = matrix.map((row) => [...row]);
```

- `sort()` mặc định so sánh như chuỗi và **mutate** array.
- Spread và `slice()` chỉ shallow copy; object lồng bên trong vẫn dùng chung reference.
- Không dùng `JSON.parse(JSON.stringify(...))` một cách máy móc: chậm và làm mất một số kiểu dữ liệu.

### Matrix

```js
const rows = 3;
const cols = 4;
const matrix = Array.from(
  { length: rows },
  () => Array(cols).fill(0)
);

for (let row = 0; row < matrix.length; row++) {
  for (let col = 0; col < matrix[row].length; col++) {
    const value = matrix[row][col];
  }
}
```

**Ghi nhớ tuyệt đối**

- Đúng: `matrix[row][col]`.
- Sai: `matrix[row, col]`.
- Số hàng và số cột có thể khác nhau.
- Sai: `Array(rows).fill(Array(cols).fill(0))` vì các hàng dùng chung reference.

### Map, Set, frequency

```js
const count = new Map();
for (const value of arr) {
  count.set(value, (count.get(value) ?? 0) + 1);
}

const seen = new Set();
if (!seen.has(value)) {
  seen.add(value);
}
```

- `Map`: key bất kỳ, cần value/count.
- `Set`: chỉ cần tồn tại/không trùng.
- Object: ổn cho key chuỗi đơn giản, nhưng để tránh coercion/prototype bất ngờ trong bài thi, ưu tiên `Map` khi không chắc.

---

## Trang 2/4 — Stack, queue, graph traversal

### Stack — LIFO

```js
const stack = [];
stack.push(value);
const top = stack[stack.length - 1];
const removed = stack.pop();
```

Dấu hiệu: ngoặc, undo, đường đi hiện tại, “phần tử gần nhất”, monotonic stack.

### Queue — FIFO, dùng head index

```js
const queue = [start];
let head = 0;

while (head < queue.length) {
  const current = queue[head++];
  // queue.push(next);
}
```

Không dùng `shift()` liên tục cho queue lớn: mỗi lần có thể phải dịch các phần tử còn lại.

### BFS grid — đường ngắn nhất không trọng số

```js
const directions = [[1, 0], [-1, 0], [0, 1], [0, -1]];
const queue = [[startRow, startCol, 0]];
let head = 0;
const visited = grid.map(
  (row) => Array(row.length).fill(false)
);
visited[startRow][startCol] = true;

while (head < queue.length) {
  const [row, col, distance] = queue[head++];

  for (const [dr, dc] of directions) {
    const nextRow = row + dr;
    const nextCol = col + dc;
    const inside =
      0 <= nextRow && nextRow < grid.length &&
      0 <= nextCol && nextCol < grid[nextRow].length;

    if (!inside || visited[nextRow][nextCol]) continue;
    if (grid[nextRow][nextCol] === 0) continue;

    visited[nextRow][nextCol] = true; // đánh dấu khi enqueue
    queue.push([nextRow, nextCol, distance + 1]);
  }
}
```

### DFS lặp — vùng liên thông, tránh call stack sâu

```js
const stack = [start];
visited[start] = true;

while (stack.length > 0) {
  const current = stack.pop();

  for (const next of graph[current]) {
    if (visited[next]) continue;
    visited[next] = true;
    stack.push(next);
  }
}
```

### Adjacency list

```js
const graph = Array.from({ length: nodeCount }, () => []);
for (const [from, to] of edges) {
  graph[from].push(to);
  graph[to].push(from); // bỏ dòng này nếu graph có hướng
}
```

**Checklist traversal**

- Grid là chữ nhật hay ragged?
- `visited` đánh dấu lúc enqueue/push, không chờ đến lúc pop.
- Có cần reset `visited` giữa các lượt tìm kiếm?
- BFS chỉ cho shortest path trực tiếp khi mỗi cạnh cùng trọng số.
- Độ sâu recursion của JavaScript phụ thuộc runtime; graph sâu thì dùng iterative DFS.

---

## Trang 3/4 — Binary search, heap, prefix và DP

### Binary search: giá trị nhỏ nhất thỏa điều kiện

```js
function firstTrue(left, right, isPossible) {
  let answer = right + 1;

  while (left <= right) {
    const mid = Math.floor((left + right) / 2);

    if (isPossible(mid)) {
      answer = mid;
      right = mid - 1;
    } else {
      left = mid + 1;
    }
  }

  return answer;
}
```

Trước khi code, viết một câu: “Nếu `x` làm được thì mọi giá trị ___ `x` cũng làm được.” Nếu không có tính đơn điệu, chưa được binary search.

### Min-heap/Priority Queue — API cần nhớ

```js
const pq = new PriorityQueue((a, b) => a.cost - b.cost);
pq.push({ node: start, cost: 0 });

while (!pq.isEmpty()) {
  const current = pq.pop();
  // Bỏ stale entry nếu current.cost !== distance[current.node]
}
```

Class đầy đủ nằm trong `PCCP_JavaScript_Templates.md`. Dấu hiệu: liên tục lấy min/max, scheduling, Dijkstra. `sort()` lại cả array sau mỗi lần chèn thường quá chậm.

### Prefix sum

```js
const prefix = Array(arr.length + 1).fill(0);
for (let index = 0; index < arr.length; index++) {
  prefix[index + 1] = prefix[index] + arr[index];
}

// Tổng inclusive [left, right]
const rangeSum = prefix[right + 1] - prefix[left];
```

### Two pointer / sliding window

```js
let left = 0;
let sum = 0;

for (let right = 0; right < arr.length; right++) {
  sum += arr[right];

  while (left <= right && sum > target) {
    sum -= arr[left++];
  }

  // kiểm tra cửa sổ [left, right]
}
```

Không áp dụng công thức “sum quá lớn thì tăng left” nếu có số âm mà chưa chứng minh tính đơn điệu.

### DP

1. Viết rõ `dp[state]` nghĩa là gì.
2. Xác định base case.
3. Viết transition từ state nhỏ hơn.
4. Chọn thứ tự duyệt để dependency đã có.
5. Kiểm tra unreachable, modulo, overflow.

```js
const dp = Array(n + 1).fill(Infinity);
dp[0] = 0;

for (let state = 1; state <= n; state++) {
  // dp[state] = Math.min(dp[state], dp[previous] + cost);
}
```

### Number safety

- Số nguyên chỉ an toàn tuyệt đối đến `Number.MAX_SAFE_INTEGER`.
- Chỉ dùng `BigInt` khi phép toán nguyên có thể vượt giới hạn; không trộn `number` và `bigint`.
- Với comparator hoặc `Math.*`, kiểm tra kỹ vì nhiều API không nhận `BigInt`.

---

## Trang 4/4 — Hidden test và chiến thuật 120 phút

### 60 giây đọc đề

1. Input lớn nhất? `O(N²)` có khả thi?
2. Mô phỏng hay tối ưu?
3. Cần đếm/tồn tại (`Map/Set`)?
4. Đoạn liên tiếp (`window/prefix`)?
5. Grid/graph? Cần `visited`?
6. Tối thiểu/tối đa với predicate đơn điệu (`binary search`)?
7. State lặp lại (`DP`)?
8. Input nhỏ đủ brute force/backtracking?
9. Output là giá trị, số cách hay đường đi?

### Hidden-test checklist trước submit

- [ ] Input nhỏ nhất: rỗng nếu được phép, một phần tử, hàng/cột bằng 1.
- [ ] Tất cả giống nhau; nhiều giá trị trùng; zero; số âm nếu được phép.
- [ ] Giá trị cực đại; tổng có vượt safe integer? Có thật sự cần `BigInt`?
- [ ] Matrix không vuông; đúng `matrix[row][col]`; đúng boundary từng hàng.
- [ ] Start = end; không có đáp án; có nhiều đáp án/tie-break.
- [ ] Numeric sort có comparator; có mutate input ngoài ý muốn?
- [ ] State có reset giữa test/lượt? Closure có giữ state cũ?
- [ ] BFS đánh dấu visited đúng lúc; queue không `shift()` liên tục.
- [ ] DFS có thể sâu? Nếu có, chuyển iterative.
- [ ] `<` hay `<=`; binary search có tiến cận và thoát?
- [ ] Complexity phù hợp constraints; không có loop ẩn như `indexOf`/`includes` bên trong loop lớn?
- [ ] Return đúng kiểu, đúng thứ tự và đúng format?
- [ ] Sample pass chưa đủ: đã tự tạo test làm lộ invariant chưa?

### Chiến thuật 120 phút

| Mốc | Việc cần làm |
|---:|---|
| **0–8** | Scan cả 4 bài; ghi pattern, constraints, rủi ro; xếp theo độ phù hợp với bản thân |
| **8–28** | Bài chắc nhất; code rõ; submit; kiểm test biên |
| **28–58** | Bài thứ hai |
| **58–92** | Bài thứ ba khả thi nhất |
| **92–102** | Bài còn lại hoặc hoàn thiện bài gần xong; chỉ code partial khi có hướng rõ |
| **102–116** | Audit hidden test, complexity, index, state, sort, Number |
| **116–120** | Chạy lại sample, kiểm return và submit từng bài |

**Quy tắc tạm bỏ bài**

- Sau 10–12 phút chưa có brute force hoặc pattern: park, chuyển bài.
- Sau 30–35 phút chưa có code chạy hoặc invariant rõ: lưu code và chuyển.
- Lỗi nối tiếp mà không biết invariant nào bị phá: quay lại test tối thiểu; nếu vẫn mù, park.
- Không hy sinh hai bài khả thi cho một bài khó.

Chiến lược “ba bài hoàn chỉnh rồi tiến thêm ở bài còn lại” là một **heuristic luyện thi**, không phải công thức điểm. PCCP không công bố trọng số cố định từng câu hay bảo đảm rằng ba bài tương đương 700 điểm.

### Trước khi bấm Submit

> Constraints → complexity → boundary → state → mutation → number safety → return type.
