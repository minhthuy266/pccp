# Cheatsheet tư duy thuật toán — JavaScript ES2021 / PCCP

> Mục tiêu của tài liệu này không phải giúp nhớ tên thật nhiều thuật toán. Mục tiêu là đi được từ **đề bài → brute force → bottleneck → tính chất → state/invariant → thuật toán → code**.
>
> Phạm vi bám theo [syllabus PCCP chính thức](https://business.programmers.co.kr/static/business/certification_intro.pdf). Các template đầy đủ, kiểm tra được bằng Node nằm trong [JS_TEMPLATES_PCCP.js](JS_TEMPLATES_PCCP.js).

---

# Tầng 1 — Bản đồ 5 phút trước khi giải bài

## 1. Đừng hỏi “bài này dùng thuật toán gì?” quá sớm

Hỏi theo thứ tự:

1. Nếu không quan tâm tốc độ, cách chắc chắn đúng là gì?
2. Cách đó tốn bao nhiêu phép tính?
3. Nó đang tìm lại hoặc tính lại thứ gì?
4. Constraint/tính chất nào cho phép bỏ phần việc lặp?
5. Cần lưu thông tin tối thiểu nào để không làm lại?
6. Điều gì phải luôn đúng sau mỗi bước?

Câu thần chú:

```text
Viết cách đúng chậm nhất
→ chỉ ra việc bị lặp
→ tìm thông tin đủ để không làm lại
→ đặt invariant
→ rồi mới chọn cấu trúc dữ liệu.
```

## 2. Pipeline hình thành thuật toán

| Bước | Câu hỏi | Thứ phải viết ra |
|---|---|---|
| Contract | Input/output chính xác là gì? | Một câu bỏ toàn bộ cốt truyện |
| Brute force | Cách ngu nhưng chắc chắn đúng? | Toàn bộ ứng viên được tạo thế nào |
| Bottleneck | Chỗ nào gây nổ? | Complexity của brute force |
| Property | Dữ liệu có gì đặc biệt? | Sorted, số không âm, cạnh cùng cost, predicate đơn điệu… |
| Pattern | Property giúp bỏ việc lặp ra sao? | Hash, prefix, heap, BFS, DP… |
| State | Tương lai cần nhớ gì từ quá khứ? | Ý nghĩa chính xác của biến/state |
| Invariant | Điều gì luôn đúng? | Một mệnh đề kiểm chứng được |
| Proof | Vì sao không sót/không nhận nhầm? | 3–5 câu |
| Complexity | Có bao nhiêu state/thao tác? | Time và space |
| Edge case | Đâu là biên dễ hỏng? | Test nhỏ trước khi submit |

Trước khi code, phải nói được một câu kiểu này:

> “Duyệt …; duy trì …; khi … thì …; vì … nên mỗi phần tử chỉ được xử lý … lần.”

Nếu chưa nói được, thường là chưa thực sự có thuật toán.

## 3. Đọc constraint để loại phương án

Đây là ước lượng thô, không phải định luật tốc độ:

| Kích thước chính | Complexity đáng cân nhắc |
|---:|---|
| `n ≤ 10` | `O(n!)` |
| `n ≤ 20–25` | `O(2^n)` |
| `n ≤ 200` | `O(n³)` có thể được |
| `n ≤ 2.000` | `O(n²)` có thể được |
| `n ≤ 100.000–200.000` | `O(n log n)` hoặc `O(n)` |
| `n ≈ 1.000.000` | Thường cần gần `O(n)` |

Đừng chỉ nhìn `n`:

- Grid có số state là `rows * cols`.
- Graph phải nhìn cả `V` và `E`.
- Có nhiều test case thì nhìn tổng kích thước.
- Hai loop lồng nhau vẫn có thể là `O(n)` nếu mỗi pointer chỉ tăng tối đa `n` lần.
- Kiểm tra tổng/tích có vượt `Number.MAX_SAFE_INTEGER` không.

## 4. Nhìn bottleneck để chọn pattern

| Việc brute force đang lặp | Tính chất cần có | Pattern |
|---|---|---|
| Quét lại để hỏi “đã thấy chưa?” | Tra cứu theo key | `Map` / `Set` |
| Tính lại tổng một đoạn | Tổng đoạn lấy bằng hiệu hai prefix | Prefix sum |
| Thử mọi cặp trong mảng sort | Một so sánh loại được cả vùng | Two pointers |
| Tính lại thống kê đoạn liên tiếp | Thêm/bớt một đầu nhanh | Sliding window |
| Tìm min/max sau mỗi cập nhật | Chỉ cần cực trị hiện tại | Heap |
| Thử mọi đáp án số | `can(x)` đơn điệu | Binary search on answer |
| Đi lại cùng state con | Tương lai chỉ phụ thuộc state | DP / memoization |
| Tìm ít bước nhất, cạnh cùng cost | Duyệt theo lớp | BFS |
| Thử mọi thứ tự/tập con nhỏ | Search tree + prune | Backtracking |

## 5. Bảng nhận dạng nhanh

| Cụm từ/dạng đề | Nghĩ tới |
|---|---|
| Đếm, tồn tại, nhóm theo khóa | `Map`, `Set` |
| So hàng xóm, gom nhóm, interval | Sort |
| Nhiều truy vấn tổng đoạn | Prefix sum |
| Cặp trong mảng đã sort | Two pointers |
| Đoạn con **liên tiếp** dài/ngắn nhất | Sliding window |
| Ngoặc, undo, gần nhất trái/phải | Stack |
| Xử lý theo thứ tự đến | Queue |
| Mỗi lần lấy nhỏ/lớn nhất | Heap |
| `false...false, true...true` | Binary search |
| Liên thông/reachability | DFS/BFS |
| Ít cạnh nhất, không trọng số | BFS |
| Thử chọn → quay lui | Backtracking |
| Chọn cục bộ có chứng minh | Greedy |
| Bài toán con lặp lại | DP |
| Đường ngắn nhất, cạnh không âm | Dijkstra |
| Gộp nhóm, hỏi cùng nhóm | Union-Find |

---

# Tầng 2 — Tư duy và template từng pattern

## 6. Nền tảng: state, invariant và proof

### State

State là **thông tin tối thiểu từ quá khứ đủ để quyết định toàn bộ tương lai**.

Câu kiểm tra:

> Nếu hai lịch sử khác nhau có cùng state, phần còn lại của bài toán có giống hệt nhau không?

- Nếu không: state thiếu thông tin.
- Nếu có nhưng state lưu cả lịch sử: state đang thừa.

Ví dụ:

- Mê cung thường: `(row, col)`.
- Mê cung có chìa khóa: `(row, col, keyMask)`.
- Đứng cùng ô nhưng có bộ chìa khóa khác nhau thì tương lai khác nhau; `visited[row][col]` là thiếu.

### Invariant

Invariant là mệnh đề luôn đúng tại một vị trí xác định trong vòng lặp.

Kiểm tra theo ba bước:

1. Initialization: nó đúng trước vòng đầu không?
2. Maintenance: một iteration có giữ nó đúng không?
3. Termination: lúc dừng, nó suy ra đáp án thế nào?

Ví dụ invariant:

- Hash scan: `seen` chứa đúng prefix đã xử lý.
- Queue: `[0, head)` đã xử lý; `[head, length)` đang chờ.
- Monotonic stack: các index trong stack chưa có đáp án và giá trị đơn điệu.
- BFS: node được lấy theo khoảng cách không giảm.
- Binary search: đáp án vẫn nằm trong interval chưa loại.
- DP: trước `dp[i]`, mọi dependency của nó đã đúng.

### Các kiểu proof cơ bản

- Exhaustive: mọi ứng viên hợp lệ đều được duyệt, không ứng viên sai nào được nhận.
- Loop invariant: khởi tạo đúng → giữ đúng → kết thúc suy ra đáp án.
- Exchange argument: đổi lựa chọn đầu của lời giải tối ưu thành lựa chọn greedy mà không xấu đi.
- Monotonicity: chứng minh `can(x)` chỉ đổi trạng thái một lần.
- Induction/DP: recurrence bao phủ mọi lựa chọn cuối và base case đúng.

## 7. Array, matrix và simulation

### Dấu hiệu

Đề mô tả luật tuần tự, di chuyển, đổi hướng, timeline, hoặc thay đổi trạng thái theo từng bước.

### Cách hình thành

1. Liệt kê state tối thiểu: vị trí, hướng, thời gian, tài nguyên…
2. Viết một transition `state hiện tại → state sau một event`.
3. Chốt thứ tự update.
4. Chốt điều kiện dừng.

Invariant:

> Sau `t` bước mô phỏng, biến trong chương trình đúng bằng trạng thái bài toán sau `t` bước.

```js
const dr = [-1, 0, 1, 0];
const dc = [0, 1, 0, -1];

for (let direction = 0; direction < 4; direction++) {
  const nextRow = row + dr[direction];
  const nextCol = col + dc[direction];

  if (
    nextRow < 0 || nextRow >= rows ||
    nextCol < 0 || nextCol >= cols
  ) {
    continue;
  }
}
```

Mapping index:

```js
const row = Math.floor(index / cols);
const col = index % cols;
const index = row * cols + col;
```

Bẫy:

- Update đồng thời hay tuần tự?
- Kiểm tra biên trước hay sau khi di chuyển?
- Đổi hướng rồi có di chuyển ngay không?
- `Array(rows).fill(Array(cols).fill(0))` làm mọi hàng trỏ cùng array.

## 8. Hash: `Map` và `Set`

### Dấu hiệu

Đếm tần suất, kiểm tra đã xuất hiện, gom nhóm, lookup theo ID/key.

### Từ brute force đến hash

Brute force thường quét lại phần đã thấy cho mỗi phần tử: `O(n²)`.

Nếu câu hỏi lặp lại là “key này đã có chưa?” hoặc “đã xuất hiện bao lần?”, lưu thẳng câu trả lời theo key.

Invariant:

> Sau khi xử lý `arr[0..i]`, map chứa đúng thông tin của prefix đó.

```js
const frequency = new Map();

for (const value of values) {
  frequency.set(value, (frequency.get(value) ?? 0) + 1);
}
```

```js
const seen = new Set();

for (const value of values) {
  if (seen.has(target - value)) return true;
  seen.add(value);
}
```

Complexity trung bình: `O(n)` time, `O(k)` space.

Bẫy JS:

- Dùng `??`, không dùng `||` khi `0` là giá trị hợp lệ.
- Object/array làm key được so theo identity.
- Tọa độ có thể encode bằng `` `${row},${col}` ``.

## 9. Sorting

### Dấu hiệu

Thứ tự input không quan trọng; cần gom phần tử giống nhau, so hàng xóm, interval hoặc tie-break nhiều tầng.

### Cách hình thành

Sort tốn `O(n log n)` nhưng thường biến quan hệ “so với tất cả” thành quan hệ cục bộ giữa hàng xóm rồi quét một lần.

Invariant khi quét:

> Prefix đã xử lý không cần xem lại vì mọi phần tử tương lai đứng sau nó theo comparator.

```js
numbers.sort((a, b) => a - b);

items.sort((a, b) => {
  return b.score - a.score || a.id - b.id;
});
```

Comparator ghép chuỗi cho bài “số lớn nhất”:

```js
strings.sort((a, b) => {
  const ab = a + b;
  const ba = b + a;

  if (ab === ba) return 0;
  return ab > ba ? -1 : 1;
});
```

Bẫy:

- `[10, 2, 30].sort()` là lexical.
- `sort()` mutate input.
- Comparator không trả boolean.
- Tie-break phải viết rõ.

## 10. Prefix sum

### Dấu hiệu

Có nhiều query tổng đoạn hoặc cùng một đoạn bị cộng lại nhiều lần.

### Cách hình thành

Nếu `prefix[i]` là tổng `arr[0..i-1]`:

```text
sum(left..right) = prefix[right + 1] - prefix[left]
```

Invariant:

> `prefix[i]` luôn là tổng đúng của `i` phần tử đầu.

```js
const prefix = Array(arr.length + 1).fill(0);

for (let i = 0; i < arr.length; i++) {
  prefix[i + 1] = prefix[i] + arr[i];
}

const sum = prefix[right + 1] - prefix[left];
```

- Build `O(n)`.
- Query `O(1)`.
- Space `O(n)`.

## 11. Two pointers

### Dấu hiệu

Mảng đã sort, tìm cặp, hoặc hai biên chỉ cần di chuyển một chiều.

### Từ `O(n²)` đến `O(n)`

Trong mảng sort, nếu tổng hiện tại quá nhỏ thì giảm `right` chỉ làm tổng nhỏ hơn nữa. Vì vậy phải tăng `left`; một so sánh loại được cả vùng ứng viên.

Invariant:

> Mọi cặp nằm ngoài `[left, right]` đã được chứng minh không thể là đáp án.

```js
arr.sort((a, b) => a - b);

let left = 0;
let right = arr.length - 1;

while (left < right) {
  const sum = arr[left] + arr[right];

  if (sum === target) return true;
  if (sum < target) left++;
  else right--;
}
```

Không được di chuyển pointer chỉ vì “thường làm thế”; phải chứng minh vùng bị bỏ không chứa đáp án.

## 12. Sliding window

### Dấu hiệu

Đoạn con phải **liên tiếp**, cần max/min length, tổng hoặc số loại.

### Cách hình thành

Hai đoạn kề nhau chỉ khác một vài phần tử. Đừng tính lại cả đoạn; chỉ `add` phần tử mới và `remove` phần tử rời cửa sổ.

Invariant:

> Biến thống kê mô tả chính xác `arr[left..right]`.

Fixed size:

```js
let sum = 0;
let best = -Infinity;

for (let right = 0; right < arr.length; right++) {
  sum += arr[right];

  if (right >= size) sum -= arr[right - size];
  if (right >= size - 1) best = Math.max(best, sum);
}
```

Variable size:

```js
let left = 0;

for (let right = 0; right < arr.length; right++) {
  add(arr[right]);

  while (!isValid() && left <= right) {
    remove(arr[left++]);
  }

  updateAnswer(left, right);
}
```

Complexity `O(n)` nếu mỗi phần tử vào/ra tối đa một lần.

Bẫy lớn: variable window cần tính đơn điệu. Với tổng và số âm, shrink chưa chắc làm tổng giảm.

## 13. Stack và monotonic stack

### Stack thường

Dùng cho ngoặc, nested structure, undo, “vào sau xử lý trước”.

Invariant:

> Stack chứa đúng các phần tử đã mở nhưng chưa được đóng/xử lý.

```js
const stack = [];

for (const char of text) {
  if (char === "(") {
    stack.push(char);
  } else {
    if (stack.length === 0) return false;
    stack.pop();
  }
}

return stack.length === 0;
```

### Monotonic stack

Dùng khi hỏi phần tử lớn/nhỏ hơn gần nhất bên trái/phải.

Brute force quét từ mỗi vị trí: `O(n²)`. Thay vào đó, giữ các index chưa có đáp án. Phần tử mới có thể giải quyết liên tiếp các index ở đỉnh stack.

```js
const answer = Array(arr.length).fill(-1);
const stack = [];

for (let i = 0; i < arr.length; i++) {
  while (
    stack.length > 0 &&
    arr[stack[stack.length - 1]] < arr[i]
  ) {
    answer[stack.pop()] = arr[i];
  }

  stack.push(i);
}
```

Mỗi index push/pop tối đa một lần → `O(n)`.

## 14. Queue và deque

### Dấu hiệu

Xử lý theo thứ tự đến, batching, timeline, hoặc BFS theo lớp.

Invariant queue bằng head pointer:

> `[0, head)` đã xử lý; `[head, queue.length)` đang chờ.

```js
const queue = [start];
let head = 0;

while (head < queue.length) {
  const current = queue[head++];
  // queue.push(next)
}
```

Không dùng `shift()` cho queue lớn vì có thể là `O(n)` mỗi lần. Deque hai đầu đầy đủ có trong file template.

## 15. Heap / Priority Queue

### Dấu hiệu

Liên tục thêm dữ liệu và mỗi bước cần min/max hiện tại, top K, scheduling hoặc shortest path.

### Từ brute force đến heap

Brute force sort/quét lại toàn bộ sau mỗi cập nhật. Nhưng bài chỉ cần phần tử cực trị, không cần toàn bộ thứ tự. Heap duy trì root là cực trị.

Invariant:

> Mỗi parent có độ ưu tiên cao hơn hoặc bằng children theo comparator.

```js
const minHeap = new Heap((a, b) => a - b);
const maxHeap = new Heap((a, b) => b - a);
const pairHeap = new Heap((a, b) => a[0] - b[0]);
```

- `peek`: `O(1)`.
- `push/pop`: `O(log n)`.

Trong JavaScript không có priority queue chuẩn sẵn cho bài này; dùng class `Heap` ở file template.

## 16. String

String JS là immutable.

```js
const part = text.slice(left, right); // [left, right)
const chars = [...text];
chars[index] = "x";
const changed = chars.join("");
```

Build nhiều mảnh bằng array rồi `join("")` thay vì nối chuỗi phức tạp trong nhiều tầng loop.

Các pattern thường ẩn trong bài string:

- Đếm ký tự → `Map`.
- Ngoặc → stack.
- Compression → brute theo chunk size + scan.
- Prefix/suffix → sort/hash/string compare.
- Parse biểu thức → tokenize + stack/permutation/simulation.

## 17. Binary search

### Lower bound trong array sort

Vị trí đầu tiên có giá trị `>= target`:

```js
function lowerBound(arr, target) {
  let left = 0;
  let right = arr.length;

  while (left < right) {
    const mid = left + Math.floor((right - left) / 2);

    if (arr[mid] < target) left = mid + 1;
    else right = mid;
  }

  return left;
}
```

Invariant:

- Mọi index `< left` chắc chắn `< target`.
- Mọi index `>= right` chắc chắn `>= target`.
- Boundary answer chưa bị loại.

### Binary search on answer

Dùng khi khó xây đáp án trực tiếp nhưng kiểm tra được “`x` có khả thi không?”.

Điều bắt buộc: `can(x)` phải có dạng đơn điệu.

```text
false false false | true true true
```

```js
function firstFeasible(low, high, can) {
  let left = low;
  let right = high; // high phải feasible

  while (left < right) {
    const mid = left + Math.floor((right - left) / 2);

    if (can(mid)) right = mid;
    else left = mid + 1;
  }

  return left;
}
```

Bẫy JS: không dùng `(left + right) >> 1`; toán tử bitwise ép về signed 32-bit.

## 18. DFS, BFS và cách biến bài thành graph

Mô hình hóa:

- Mỗi trạng thái là một node.
- Mỗi hành động hợp lệ là một edge.
- Bài toán trở thành reachability, component hoặc shortest path.

### DFS

Dùng khi cần duyệt toàn bộ nhánh/vùng, reachability, connected components.

```js
const visited = Array(graph.length).fill(false);
const stack = [start];
visited[start] = true;

while (stack.length > 0) {
  const node = stack.pop();

  for (const next of graph[node]) {
    if (visited[next]) continue;
    visited[next] = true;
    stack.push(next);
  }
}
```

### BFS

Dùng khi mọi edge có cùng cost và cần số bước ít nhất.

Invariant:

> Queue được xử lý theo khoảng cách không giảm; lần đầu enqueue một node là khoảng cách ngắn nhất tới nó.

```js
const distance = Array(graph.length).fill(-1);
const queue = [start];
let head = 0;
distance[start] = 0;

while (head < queue.length) {
  const node = queue[head++];

  for (const next of graph[node]) {
    if (distance[next] !== -1) continue;

    distance[next] = distance[node] + 1;
    queue.push(next);
  }
}
```

Đánh dấu lúc enqueue/push, không đợi dequeue/pop. Complexity `O(V + E)`.

Với grid `rows * cols`, complexity thường `O(rows * cols)`.

## 19. Backtracking

### Dấu hiệu

Phải thử permutation/combination/chọn-bỏ; `n` nhỏ; có thể loại nhánh sớm.

### Cách hình thành

Brute force tạo mọi kết quả hoàn chỉnh. Backtracking xây dần một search tree:

```text
choose → update state → recurse → undo chính xác
```

Permutation cần `used`; combination cần `start`.

```js
function search() {
  if (isComplete()) {
    updateAnswer();
    return;
  }

  for (const choice of choices) {
    if (!isValid(choice)) continue;

    choose(choice);
    search();
    undo(choice);
  }
}
```

Prune chỉ hợp lệ khi chứng minh được:

- Prefix đã vi phạm.
- Dù phần còn lại tốt nhất cũng không thắng `best`.
- Không còn đủ phần tử để hoàn thành.

## 20. Greedy

### Dấu hiệu

Cần min/max; sau lựa chọn đầu, phần còn lại vẫn là cùng loại bài toán; thường đi với sort hoặc heap.

### Cách hình thành

1. Đề xuất một lựa chọn cục bộ cụ thể.
2. Tự tìm counterexample.
3. Chứng minh lựa chọn đó có thể nằm trong một lời giải tối ưu.
4. Chứng minh phần còn lại vẫn là cùng bài toán nhỏ hơn.

Ba proof hay dùng:

- Exchange: thay lựa chọn đầu của optimal bằng greedy mà không xấu hơn.
- Stays ahead: sau mỗi prefix, greedy không thua phương án khác.
- Cut property: lựa chọn tốt nhất qua một ranh giới là an toàn.

Nếu chỉ nói được “trông hợp lý”, chưa được dùng greedy.

## 21. Dynamic Programming

### Dấu hiệu

Search tree rất lớn, nhiều nhánh quay lại cùng state, và đáp án state lớn ghép từ state nhỏ.

### Cách hình thành DP

Viết đủ năm dòng trước khi code:

```text
State: dp[...] nghĩa chính xác là gì?
Base: state nhỏ nhất biết ngay đáp án?
Transition: mọi lựa chọn cuối/đầu là gì?
Order: dependency nào phải tính trước?
Answer: nằm ở state nào?
```

Ví dụ:

```text
dp[i] = tổng lớn nhất khi xử lý đúng i phần tử đầu tiên
```

Không viết mơ hồ: “`dp[i]` là đáp án tại i”.

Invariant:

> Mỗi state đã tính chứa đúng đáp án của bài toán con được định nghĩa.

Ví dụ không chọn hai phần tử kề nhau:

```js
let previousTwo = 0;
let previousOne = 0;

for (const value of arr) {
  const current = Math.max(
    previousOne,
    previousTwo + value
  );

  previousTwo = previousOne;
  previousOne = current;
}
```

Complexity:

```text
số state × số transition thử cho mỗi state
```

Bẫy:

- State thiếu thông tin.
- Base case sai.
- Loop sai thứ tự.
- Quên state “không tới được”: `Infinity` hoặc `-Infinity`.
- Dùng recursion quá sâu trong JS.

## 22. Tree cơ bản

Tree là graph liên thông không chu trình.

Các ý cần biết:

- Chọn một root tùy ý.
- Khi DFS/BFS, `parent` ngăn quay lại cạnh vừa đi.
- Subtree DP thường tính con trước rồi gộp vào cha.
- Đường duy nhất giữa hai node giúp nhiều proof đơn giản hơn graph thường.

```js
const parent = Array(n).fill(-1);
const order = [root];

for (let head = 0; head < order.length; head++) {
  const node = order[head];

  for (const next of tree[node]) {
    if (next === parent[node]) continue;
    parent[next] = node;
    order.push(next);
  }
}

// Muốn gộp từ con lên cha: duyệt order ngược.
```

---

# Appendix — Nhận diện trước, học sâu sau

## 23. Dijkstra

Dùng cho shortest path khi cạnh có trọng số **không âm**.

BFS thất bại vì ít edge hơn chưa chắc cost nhỏ hơn. Dijkstra luôn mở rộng state có distance tạm thời nhỏ nhất bằng min-heap.

Invariant:

> Khi một entry min không stale được pop, distance đó đã tối ưu.

Complexity với adjacency list + heap: `O((V + E) log V)`.

Không dùng khi có cạnh âm. Template đầy đủ nằm trong file JS.

## 24. Union-Find

Dùng khi liên tục gộp hai nhóm và hỏi hai node có cùng component không.

Mỗi component có một root đại diện. Hai tối ưu:

- Path compression khi `find`.
- Union by size/rank khi `union`.

Ứng dụng: phát hiện cycle, Kruskal MST, connectivity động. Amortized gần `O(1)` mỗi thao tác.

## 25. Chỉ cần nhận tên ở giai đoạn hiện tại

- Topological sort: dependency trong DAG; indegree + queue.
- Floyd–Warshall: shortest path mọi cặp, `O(V³)`, chỉ khi `V` nhỏ.
- Kruskal: sort edge + Union-Find.
- Trie/KMP: prefix hoặc pattern matching chuyên biệt.

---

# Ví dụ hình thành thuật toán từ chính lịch TF

## A. `행렬의 덧셈` — không phải bài nào cũng cần “thuật toán đặc biệt”

- Contract: output cùng kích thước; mỗi ô là tổng hai ô tương ứng.
- Brute force cũng là optimal: phải đọc mọi ô ít nhất một lần.
- State: `(row, col)`.
- Invariant: sau khi xử lý đến `(row, col)`, mọi ô trước đó đã có tổng đúng.
- Complexity: `O(rows * cols)` time và cùng lượng output space.

Bài học: đừng cố nhét hash/DP vào một bài mà duyệt thẳng đã tối ưu.

## B. `삼각 달팽이` — luật dài trở thành state + direction

- Brute force đúng chính là simulation.
- State tối thiểu: `row`, `col`, `number`, `direction`.
- Ba hướng lặp lại: xuống → phải → chéo lên-trái.
- Số bước mỗi lượt giảm dần: `n, n-1, ..., 1`.
- Invariant: trước mỗi bước, `(row, col)` là ô ngay trước ô cần điền tiếp; các số `1..number-1` đã nằm đúng chỗ.
- Complexity: có `n(n+1)/2` ô, nên `O(n²)` là đúng theo kích thước output.

Bài học: khi đề là chuyển động tuần tự, hãy gom các nhánh lặp thành direction và tìm quy luật số bước.

## C. `의상` — từ liệt kê subset sang quy tắc nhân

- Brute force: thử mọi tập trang phục, có thể gần `2^n`.
- Property: lựa chọn ở mỗi loại độc lập với loại khác.
- Với loại có `count` món, có `count + 1` lựa chọn: chọn một món hoặc không chọn.
- Tổng số cách: tích mọi `(count + 1)`, rồi trừ trường hợp không mặc gì.
- State cần lưu: số món theo `type`, tức `Map<type, count>`.

```js
let answer = 1;

for (const count of countByType.values()) {
  answer *= count + 1;
}

return answer - 1;
```

Bài học: hash không chỉ để lookup; nó còn biến dữ liệu thành các nhóm độc lập để dùng combinatorics.

## D. `전화번호 목록` — sort biến so mọi cặp thành so hàng xóm

- Brute force: với mỗi cặp, kiểm tra chuỗi này có là prefix chuỗi kia: `O(n² * L)`.
- Property: sau lexicographic sort, mọi chuỗi cùng prefix nằm liền nhau.
- Nếu một số là prefix của số khác, chỉ cần so nó với phần tử kế tiếp trong thứ tự sort.
- Invariant khi scan: mọi cặp có phần tử đầu nằm trước `i` đã được xác nhận an toàn.

```js
phoneBook.sort();

for (let i = 0; i + 1 < phoneBook.length; i++) {
  if (phoneBook[i + 1].startsWith(phoneBook[i])) {
    return false;
  }
}

return true;
```

Bài học: sort đáng giá khi nó làm những đối tượng liên quan trở thành hàng xóm.

## E. `기능개발` — tách “tính ngày xong” khỏi “gom batch”

- Mô phỏng tăng từng ngày vẫn đúng nhưng lặp nhiều việc.
- Với task `i`, tính thẳng ngày hoàn thành:

```js
Math.ceil((100 - progresses[i]) / speeds[i]);
```

- Sau đó bài toán trở thành gom các task liên tiếp: task sau được phát hành cùng batch nếu ngày hoàn thành của nó không lớn hơn ngày phát hành batch hiện tại.
- State tối thiểu: `releaseDay` của batch và `batchSize`.
- Invariant: mọi task trước index hiện tại đã được chia vào batch đúng thứ tự.

Bài học: trước simulation timeline, thử tính thời điểm của từng event trực tiếp.

## F. `더 맵게` — “liên tục lấy nhỏ nhất” sinh ra heap

- Brute force: sort lại sau mỗi lần trộn.
- Đề luôn yêu cầu lấy hai giá trị nhỏ nhất trong một tập đang thay đổi.
- Heap lưu đúng thứ cần thiết: min ở root; không cần biết toàn bộ thứ tự.
- Mỗi vòng: pop hai lần, tính giá trị mới, push lại.
- Invariant: heap chứa chính xác mọi món chưa xử lý và root là nhỏ nhất.
- Complexity: tối đa `O(n)` vòng, mỗi vòng `O(log n)` → `O(n log n)`.

Bài học: hễ vừa update tập dữ liệu vừa hỏi min/max lặp lại, nghĩ tới priority queue.

## G. `문자열 압축` — brute force vẫn đúng nếu không gian ứng viên nhỏ

- Không biết chunk size tốt nhất, nên thử mọi size từ `1` đến `floor(n/2)`.
- Với một size cố định, scan các chunk và run-length encode.
- State: `previousChunk`, `count`, `compressedLength`.
- Invariant: trước khi đọc chunk mới, length đã phản ánh chính xác toàn bộ chunk trước đó đã chốt.
- Có `O(n)` size và mỗi size scan `O(n)` ký tự → `O(n²)`; với `n ≤ 1.000`, đây là chủ đích hợp lý.

Bài học: tối ưu không có nghĩa luôn phải tránh mọi brute force; hãy tính số ứng viên từ constraint.

## H. `H-Index` — sort tạo threshold dễ quét

- Brute force: thử từng `h`, mỗi lần đếm số paper có citation `>= h`.
- Sort citation tăng dần.
- Ở index `i`, có `n - i` paper từ đó về sau có citation ít nhất `citations[i]`.
- Tìm threshold lớn nhất thỏa điều kiện định nghĩa.
- Invariant: sau khi qua index `i`, mọi threshold nhỏ hơn đã được đánh giá đúng dựa trên số paper còn lại.

Bài học: bài “có ít nhất `h` phần tử đạt threshold `h`” thường dễ hơn sau sort rồi đếm phần suffix.

---

# JavaScript ES2021 survival sheet

## 26. Những bẫy phải thuộc

```js
[10, 2, 30].sort((a, b) => a - b);
```

- `sort()` sửa array gốc; copy bằng `[...arr]` nếu cần.
- `push/pop`: amortized `O(1)`.
- `shift/unshift`: `O(n)`.
- `includes/indexOf`: `O(n)`.
- `Map/Set get/has/set`: trung bình `O(1)`.
- Không dùng API sau ES2021 như `.at()` hoặc `.toSorted()`.
- Không dùng bitwise để tính `mid`; bitwise ép `Number` về signed 32-bit.
- `Array(n).fill([])` tạo cùng một reference.
- String immutable.
- DFS recursion sâu có thể `RangeError`; ưu tiên stack tự quản.

### Number và BigInt

```js
Number.MAX_SAFE_INTEGER; // 9007199254740991
```

Nếu tổng/tích có thể vượt ngưỡng này, cân nhắc `BigInt`.

```js
1n + 1;  // TypeError
1n + 1n; // đúng
```

Không trộn `Number` và `BigInt`. Comparator sort `BigInt` phải trả `Number`:

```js
values.sort((a, b) => (a < b ? -1 : a > b ? 1 : 0));
```

Modulo không âm:

```js
const normalized = ((value % mod) + mod) % mod;
```

---

## 27. Debug thuật toán, không sửa code ngẫu nhiên

Tách ba loại lỗi:

1. Sai mô hình: hiểu sai input/output/đối tượng tối ưu.
2. Sai thuật toán: property sai, state thiếu, greedy không an toàn.
3. Sai implementation: off-by-one, update order, aliasing, overflow.

Khi có bản brute force đúng, dùng nó làm oracle:

1. Sinh input nhỏ.
2. So `slow(input)` và `fast(input)`.
3. In counterexample đầu tiên.
4. Thu nhỏ input cho đến khi nhìn ra invariant bị phá.

Edge cases mặc định:

- `n = 0/1` nếu cho phép.
- Tất cả giống nhau.
- Duplicate.
- Tăng dần/giảm dần.
- Toàn `0`, có số âm nếu hợp lệ.
- Không có đáp án.
- Nhiều đáp án tối ưu.
- Đáp án ở đầu/cuối.
- Kích thước/giá trị lớn nhất.

Chọn một convention interval và giữ xuyên suốt:

- `[left, right)` có length `right - left`.
- `[left, right]` có length `right - left + 1`.

---

## 28. Checklist 60 giây trước khi code

```text
[ ] Mô tả bài toán trong một câu?
[ ] Brute force là gì?
[ ] Complexity brute force?
[ ] Bottleneck chính xác nằm đâu?
[ ] Property nào cho phép tối ưu?
[ ] State có đủ nhưng không thừa?
[ ] Invariant là gì?
[ ] Vì sao không sót/không nhận nhầm?
[ ] Time/space có qua constraint?
[ ] Đã test duplicate, minimum, no-answer, maximum?
```

## Cách học cheatsheet này

Đừng đọc hết rồi cố thuộc.

Với mỗi topic trong lịch TF:

1. Đọc mục tương ứng trong 10 phút.
2. Đóng tài liệu.
3. Tự viết lại bốn thứ: dấu hiệu, brute force, invariant, complexity.
4. Làm bài.
5. Sau khi AC, bổ sung một dòng “bài này đã biến brute force thành gì?”.

Thứ tự học:

```text
Array/Simulation
→ Hash
→ Stack/Queue
→ Heap
→ String
→ Sorting
→ Prefix/Two pointers/Sliding window
→ Binary search
→ DFS/BFS
→ Backtracking
→ Greedy
→ DP
→ Dijkstra/Union-Find
```
