# PCCP 700+ — Tổng hợp toàn bộ kiến thức đã học

> Ngôn ngữ: JavaScript  
> Mục tiêu: PCCP 700+  
> Thời gian thi: 120 phút / 4 bài  
> Cập nhật: 10/08/2026

---

## 0. File này dùng để làm gì?

Đây là **một nguồn tổng hợp duy nhất** cho những gì đã học: cách tư duy, JavaScript dùng trong coding test, cấu trúc dữ liệu, pattern, bài đã làm, lỗi từng mắc và cách ôn để tự gọi lại code.

Không học file này bằng cách đọc từ đầu đến cuối nhiều lần. Với mỗi mục:

1. Đọc để hiểu lần đầu.
2. Đóng lời giải.
3. Tự kể logic bằng tiếng Việt.
4. Dry run bằng tay.
5. Tự viết code.
6. So sánh, ghi lỗi và viết lại sau 1–3–7 ngày.

Mục tiêu cuối cùng:

```text
Đọc đề
→ hiểu chính xác input/output
→ dùng constraint loại lời giải quá chậm
→ nghĩ ra brute force
→ phát hiện phần tính toán bị lặp
→ chọn pattern
→ xác định state, transition, invariant
→ tự dựng code
→ kiểm tra edge case và complexity
```

---

# PHẦN I — HỆ ĐIỀU HÀNH TƯ DUY

## 1. Khung phân tích đầy đủ cho mọi bài

### Bản 9 mục đã thống nhất

```text
1. Contract    — Đề cho gì và bắt trả chính xác cái gì?
2. Bound       — Constraint cho phép độ phức tạp nào?
3. Brute force — Cách trực tiếp, chắc chắn đúng là gì?
4. Bottleneck  — Brute force chậm vì lặp lại việc gì?
5. Pattern     — Pattern nào loại được phần lặp đó?
6. State       — Cần ghi nhớ tối thiểu thông tin gì?
7. Transition  — Mỗi bước state thay đổi ra sao?
8. Invariant   — Sau mỗi bước, điều gì luôn phải đúng?
9. Complexity  — Thời gian và bộ nhớ là bao nhiêu?
```

### Bản mở rộng để triển khai và kiểm tra

```text
Parse → Bound → Brute → Detect → Model → Prove → Implement → Verify
```

- **Parse:** hiểu input, output, quy tắc, tie-break.
- **Bound:** đọc giới hạn dữ liệu.
- **Brute:** nghĩ lời giải dễ nhất trước.
- **Detect:** tìm bottleneck và pattern ứng viên.
- **Model:** chọn state và data structure.
- **Prove:** nói invariant, lý do lời giải đúng.
- **Implement:** biến từng khối logic thành code.
- **Verify:** dry run, edge case, complexity, rủi ro JavaScript.

## 2. Năm câu hỏi rút gọn khi đang thi

```text
1. Tôi đang giữ gì?
2. Tôi được phép làm gì ở bước này?
3. State tiếp theo là gì?
4. State đó có hợp lệ không?
5. Tôi cập nhật và dừng khi nào?
```

## 3. Ý nghĩa thật của State – Transition – Invariant

### State

Thông tin tối thiểu cần nhớ để xử lý bước tiếp theo mà không phải đọc lại toàn bộ quá khứ.

Ví dụ:

- Tìm max: `maxValue`, `maxIndex`.
- Two pointers: `left`, `right`.
- BFS: `queue`, `head`, `visited`.
- Mô phỏng vị trí: `row`, `col`.
- Monotonic stack: các index vẫn đang chờ đáp án.

### Transition

Quy tắc biến state hiện tại thành state tiếp theo.

Ví dụ:

```text
Giá trị mới lớn hơn max → cập nhật max và index.
Tổng quá nhỏ → tăng left.
Ô kề hợp lệ → đánh visited và enqueue.
Current lớn hơn top stack → pop và ghi đáp án.
```

### Invariant

Điều luôn đúng sau mỗi vòng lặp. Invariant không phải câu trang trí; nó giúp tự suy ra code.

Ví dụ monotonic stack:

> Stack chứa đúng index của những phần tử đã đi qua nhưng chưa tìm được phần tử lớn hơn đầu tiên bên phải.

Từ đó tự suy ra:

```text
Chưa có đáp án → ở trong stack.
Có đáp án → pop khỏi stack.
Current chưa có đáp án → push vào stack.
```

## 4. Brute force không phải thứ đáng xấu hổ

Brute force có ba tác dụng:

1. Chứng minh rằng ta hiểu đề.
2. Làm mốc để thấy phần nào đang bị lặp.
3. Tạo lời giải đối chiếu cho input nhỏ.

Ví dụ Two Sum:

```text
Brute force: thử mọi cặp → O(n²).
Bottleneck: với mỗi số lại đi tìm phần bù từ đầu.
Tối ưu: dùng Map nhớ số đã thấy → O(n).
```

## 5. Đọc constraint để loại thuật toán

Đây là heuristic, không phải luật tuyệt đối:

| N | Hướng complexity thường cân nhắc |
|---:|---|
| `≤ 20` | backtracking, `O(2^N)` có thể được |
| `≤ 100` | `O(N³)` đôi khi được |
| `≤ 1.000` | `O(N²)` có thể được |
| `≤ 100.000` | thường cần `O(N log N)` hoặc `O(N)` |
| `≤ 1.000.000` | ưu tiên `O(N)` và kiểm soát bộ nhớ |

Các mức thường gặp:

```text
O(1) < O(log N) < O(N) < O(N log N) < O(N²) < O(2^N) < O(N!)
```

Đừng chỉ đếm số vòng lặp. Hai vòng nối tiếp là `O(N + N) = O(N)`, còn hai vòng lồng nhau thường là `O(N²)`.

## 6. Cổng kiểm tra trước khi Submit

```text
[ ] Output đúng kiểu và đúng thứ tự chưa?
[ ] Tie-break đã viết thành điều kiện rõ ràng chưa?
[ ] Mỗi vòng lặp có tiến triển và chắc chắn dừng không?
[ ] Có off-by-one, index 0/1-based hay endpoint không?
[ ] Empty/single/equal/all-invalid đã xét chưa?
[ ] Complexity có chịu được constraint không?
[ ] JavaScript có sort số đúng comparator không?
[ ] Có dùng shift() trong vòng lặp lớn không?
[ ] Có lẫn string với number không?
```

---

# PHẦN II — JAVASCRIPT CHO CODING TEST

## 7. Array: thao tác phải thuộc

```js
const arr = [];

arr.push(x);     // thêm cuối
arr.pop();       // lấy và xóa cuối
arr.unshift(x);  // thêm đầu, thường O(n)
arr.shift();     // lấy và xóa đầu, thường O(n)

arr.at(-1);      // phần tử cuối
arr.length;
```

Câu nhớ:

> `push` cái gì thì `pop` lấy đúng cái đó.

### Stack bằng Array

```js
const stack = [];
stack.push(value);
const top = stack.at(-1);
const removed = stack.pop();
```

### Queue không dùng `shift()` liên tục

```js
const queue = [start];
let head = 0;

while (head < queue.length) {
  const current = queue[head];
  head++;

  // queue.push(next)
}
```

`head` cho biết phần tử tiếp theo cần xử lý. Các phần tử cũ vẫn nằm trong mảng nhưng không được đọc lại.

## 8. Vòng lặp

```js
for (let i = 0; i < arr.length; i++) {
  // cần index
}

for (const value of arr) {
  // cần value
}

for (const [index, value] of arr.entries()) {
  // cần cả index và value
}
```

Phân biệt:

- `for...of`: duyệt **giá trị**.
- `for...in`: duyệt **key/index dạng string**, thường không dùng cho array trong coding test.

## 9. Destructuring

```js
const item = ["hat", "headgear"];
const [name, type] = item;
```

Tương đương:

```js
const name = item[0];
const type = item[1];
```

Trong vòng lặp:

```js
for (const [name, type] of clothes) {
  // dùng name và type
}
```

Trong callback:

```js
jobs.map(([jobName, time]) => {
  // ...
});
```

## 10. Map

Map dùng khi cần tra cứu theo key, đếm, nhóm dữ liệu hoặc lưu index.

```js
const map = new Map();

map.set(key, value);
map.get(key);
map.has(key);
map.delete(key);
map.size;
```

### Đếm tần suất

```js
const counts = new Map();

for (const value of values) {
  counts.set(value, (counts.get(value) ?? 0) + 1);
}
```

Có thể dùng `|| 0`, nhưng `?? 0` diễn đạt chính xác hơn: chỉ dùng 0 khi giá trị là `null` hoặc `undefined`.

### Bẫy `get()` và `has()`

```js-fill
if (map.get(key)) { ... }
```

Sai khi value hợp lệ có thể là `0`, `false` hoặc chuỗi rỗng. Khi cần kiểm tra key tồn tại, dùng:

```js-fill
if (map.has(key)) { ... }
```

## 11. Set

Set dùng khi chỉ cần biết một giá trị đã xuất hiện hay chưa, hoặc cần loại trùng.

```js
const seen = new Set();

seen.add(value);
seen.has(value);
seen.delete(value);
seen.size;
```

Loại trùng:

```js
const unique = [...new Set(values)];
```

Map và Set:

| Nhu cầu | Dùng |
|---|---|
| Đã gặp chưa? | `Set` |
| Có bao nhiêu lần? | `Map` |
| Key này gắn với value nào? | `Map` |
| Quan hệ trùng chỉ tính một lần | `Set` |

## 12. Sort

JavaScript mặc định sort theo chuỗi:

```js
[10, 2, 3].sort(); // không dùng cho sort số
```

Sort tăng:

```js
numbers.sort((a, b) => a - b);
```

Sort giảm:

```js
numbers.sort((a, b) => b - a);
```

Sort object/row theo field:

```js
rows.sort((a, b) => a[index] - b[index]);
```

Tie-break:

```js
items.sort((a, b) => {
  if (a.score !== b.score) return b.score - a.score;
  return a.index - b.index;
});
```

## 13. Chuyển string ↔ number

```js
Number("12");
"12".split("").map(Number);
String(7).padStart(2, "0"); // "07"
```

Đừng cộng string khi muốn cộng số:

```js
"2" + "3" // "23"
2 + 3     // 5
```

---

# PHẦN III — PATTERN CỐT LÕI ĐÃ HỌC

## 14. Array/String Traversal — duyệt một lần và giữ state

Đây là gốc của rất nhiều bài Level 1.

### Template tổng quát

```js-fill
let state = initialValue;

for (let i = 0; i < values.length; i++) {
  const current = values[i];

  if (/* current làm state tốt hơn */) {
    state = /* state mới */;
  }
}

return state;
```

### Min + index + tie-break

Ví dụ cần lấy giá trị nhỏ nhất; nếu bằng nhau, giữ index xuất hiện trước:

```js
let minValue = values[0];
let minIndex = 0;

for (let i = 1; i < values.length; i++) {
  if (values[i] < minValue) {
    minValue = values[i];
    minIndex = i;
  }
}
```

Invariant:

> Sau khi xử lý đến index `i`, `minValue` và `minIndex` là đáp án đúng của đoạn `0..i`.

Nếu muốn lấy index cuối cùng khi hòa, đổi `<` thành `<=`.

### Đếm số âm từng hàng

```js
function countNegativesByRow(matrix) {
  const answer = [];

  for (const row of matrix) {
    let count = 0;

    for (const value of row) {
      if (value < 0) count++;
    }

    answer.push(count);
  }

  return answer;
}
```

Invariant vòng trong:

> `count` là số phần tử âm đã thấy trong phần đầu của hàng hiện tại.

### Tổng hai đường chéo ma trận vuông

```js
function sumDiagonals(matrix) {
  const n = matrix.length;
  let sum = 0;

  for (let row = 0; row < n; row++) {
    sum += matrix[row][row];
    sum += matrix[row][n - 1 - row];
  }

  if (n % 2 === 1) {
    const middle = Math.floor(n / 2);
    sum -= matrix[middle][middle];
  }

  return sum;
}
```

Ô giữa của ma trận lẻ nằm trên cả hai đường chéo nên phải trừ một lần.

## 15. Frequency Counter — đếm thay vì so từng cặp

Dấu hiệu:

```text
đếm số lần xuất hiện
kiểm tra trùng
phân nhóm theo loại
so sánh tần suất
```

Template:

```js
const counts = new Map();

for (const item of items) {
  const key = getKey(item);
  counts.set(key, (counts.get(key) ?? 0) + 1);
}
```

### Bài quần áo

Mỗi loại có thể:

- Không chọn món nào: `+1` lựa chọn.
- Hoặc chọn đúng một món trong loại đó.

Vì thế:

```text
Tổng = (áo + 1) × (mũ + 1) × (quần + 1) × ... − 1
```

Trừ `1` vì trường hợp không mặc món nào ở mọi loại không hợp lệ.

```js
function solution(clothes) {
  const counts = new Map();

  for (const [, type] of clothes) {
    counts.set(type, (counts.get(type) ?? 0) + 1);
  }

  let answer = 1;

  for (const count of counts.values()) {
    answer *= count + 1;
  }

  return answer - 1;
}
```

## 16. Two Sum với Map

Contract: tìm hai số có tổng bằng `target`.

Brute force: thử mọi cặp `O(n²)`.

Pattern: khi đang ở `numbers[i]`, cần biết `target - numbers[i]` đã xuất hiện chưa.

```js
function twoSum(numbers, target) {
  const seenIndex = new Map();

  for (let i = 0; i < numbers.length; i++) {
    const current = numbers[i];
    const needed = target - current;

    if (seenIndex.has(needed)) {
      return [seenIndex.get(needed), i];
    }

    seenIndex.set(current, i);
  }

  return [];
}
```

Invariant:

> Trước khi xử lý index `i`, Map chứa số và index của các phần tử bên trái `i`.

Thứ tự **check trước, set sau** giúp không dùng cùng một phần tử hai lần.

## 17. Two Pointers

### Dấu hiệu

- Array đã sort.
- Tìm pair theo tổng.
- Thu hẹp từ hai đầu.
- Hai con trỏ cùng chiều để đọc/ghi.

### Hai đầu — tìm cặp tổng bằng target

```js
function hasPairWithSum(numbers, target) {
  let left = 0;
  let right = numbers.length - 1;

  while (left < right) {
    const sum = numbers[left] + numbers[right];

    if (sum === target) return true;
    if (sum < target) left++;
    else right--;
  }

  return false;
}
```

Logic:

```text
Tổng quá nhỏ → cần số lớn hơn → left đi sang phải.
Tổng quá lớn → cần số nhỏ hơn → right đi sang trái.
```

Điều này đúng nhờ array đã sort.

### Cùng chiều — xóa phần tử trùng trong array đã sort

```js
function removeDuplicates(numbers) {
  if (numbers.length === 0) return 0;

  let write = 1;

  for (let read = 1; read < numbers.length; read++) {
    if (numbers[read] !== numbers[write - 1]) {
      numbers[write] = numbers[read];
      write++;
    }
  }

  return write;
}
```

- `read`: đi tìm giá trị mới.
- `write`: ô tiếp theo để ghi giá trị không trùng.
- `numbers[write - 1]`: giá trị duy nhất gần nhất đã giữ lại.

Invariant:

> Đoạn `0..write-1` luôn chứa đúng các giá trị duy nhất của phần đã đọc.

## 18. Sliding Window

Sliding Window xử lý **đoạn liên tiếp** mà không tính lại toàn bộ đoạn sau mỗi bước.

### Fixed window

Ví dụ max tổng của đoạn dài `k`:

```js
function maxWindowSum(numbers, k) {
  if (numbers.length < k) return null;

  let windowSum = 0;

  for (let i = 0; i < k; i++) {
    windowSum += numbers[i];
  }

  let best = windowSum;

  for (let right = k; right < numbers.length; right++) {
    windowSum += numbers[right];
    windowSum -= numbers[right - k];
    best = Math.max(best, windowSum);
  }

  return best;
}
```

### Variable window

```js
let left = 0;

for (let right = 0; right < values.length; right++) {
  add(values[right]);

  while (windowIsInvalid()) {
    remove(values[left]);
    left++;
  }

  updateAnswer(left, right);
}
```

Invariant thường là:

> Sau vòng `while`, window `[left..right]` hợp lệ.

Bẫy: không dùng sliding window theo tổng một cách máy móc nếu có số âm, vì mở rộng/thu nhỏ có thể không còn đơn điệu.

## 19. Prefix Sum

Dùng khi có nhiều truy vấn tổng đoạn.

```js
const prefix = Array(numbers.length + 1).fill(0);

for (let i = 0; i < numbers.length; i++) {
  prefix[i + 1] = prefix[i] + numbers[i];
}
```

Tổng đoạn `left..right`:

```js
const rangeSum = prefix[right + 1] - prefix[left];
```

Ý nghĩa:

```text
Tổng từ đầu đến right
− tổng từ đầu đến trước left
= tổng left..right
```

## 20. Binary Search

Không phải cứ “tìm kiếm” là Binary Search. Cần một miền có tính đơn điệu.

### Tìm chính xác trong array sort

```js
function binarySearch(numbers, target) {
  let left = 0;
  let right = numbers.length - 1;

  while (left <= right) {
    const mid = Math.floor((left + right) / 2);

    if (numbers[mid] === target) return mid;
    if (numbers[mid] < target) left = mid + 1;
    else right = mid - 1;
  }

  return -1;
}
```

### Binary Search on Answer

Dấu hiệu:

```text
Tìm giá trị nhỏ nhất/lớn nhất thỏa điều kiện.
Với giá trị x, có thể viết hàm can(x) trả true/false.
Khi x tăng, kết quả chỉ chuyển trạng thái một lần.
```

Template tìm giá trị nhỏ nhất thỏa điều kiện:

```js
function findMinimumAnswer(low, high) {
  let answer = high;

  while (low <= high) {
    const mid = Math.floor((low + high) / 2);

    if (can(mid)) {
      answer = mid;
      high = mid - 1;
    } else {
      low = mid + 1;
    }
  }

  return answer;
}
```

Câu nhớ:

```text
mid làm được → lưu mid, thử nhỏ hơn.
mid chưa làm được → phải thử lớn hơn.
```

### Bài độ khó câu đố

Với một `level`, tổng thời gian giải có thể tính được. `level` càng cao thì tổng thời gian không tăng. Vì vậy có miền đơn điệu:

```text
level thấp  → có thể quá thời gian → false
level cao   → đủ thời gian         → true
```

Mục tiêu: tìm `level` nhỏ nhất làm tổng thời gian `≤ limit`.

## 21. Matrix và tọa độ

### Duyệt ma trận

```js
for (let row = 0; row < matrix.length; row++) {
  for (let col = 0; col < matrix[0].length; col++) {
    const value = matrix[row][col];
  }
}
```

### Bốn hướng

```js
const dr = [-1, 1, 0, 0];
const dc = [0, 0, -1, 1];

for (let direction = 0; direction < 4; direction++) {
  const nextRow = row + dr[direction];
  const nextCol = col + dc[direction];
}
```

### Check bounds

```js
const inBounds =
  nextRow >= 0 &&
  nextRow < rowCount &&
  nextCol >= 0 &&
  nextCol < colCount;
```

Câu nhớ:

```text
row so với số hàng.
col so với số cột.
```

## 22. Simulation

Simulation không nhất thiết cần thuật toán “cao siêu”. Khó ở việc biến luật đề thành đúng thứ tự thao tác.

Khung:

```text
1. Chuẩn hóa input.
2. Khởi tạo state.
3. Duyệt từng command/event.
4. Tạo state thử nếu cần.
5. Validate.
6. Commit state hợp lệ.
7. Format output.
```

### Nguyên tắc “thử trước, commit sau”

Nếu một lệnh chỉ được thực hiện khi **toàn bộ** các bước hợp lệ:

```js
let nextRow = row;
let nextCol = col;
let valid = true;

// di chuyển trên biến thử

if (valid) {
  row = nextRow;
  col = nextCol;
}
```

Không cập nhật state thật rồi rollback; cách đó dễ sai.

## 23. Stack cơ bản

Stack là LIFO: vào sau, ra trước.

Dấu hiệu:

- Matching dấu ngoặc.
- Undo.
- Xóa phần tử kề nhau.
- Phần tử gần nhất chưa xử lý.
- Next greater/smaller.

### Xóa ký tự kề nhau giống nhau

```js
function removeAdjacentDuplicates(text) {
  const stack = [];

  for (const char of text) {
    if (stack.length > 0 && stack.at(-1) === char) {
      stack.pop();
    } else {
      stack.push(char);
    }
  }

  return stack.join("");
}
```

Invariant:

> Stack là kết quả đã rút gọn đúng của phần chuỗi đã duyệt.

### Reverse bằng stack

```js
const stack = [...values];
const reversed = [];

while (stack.length > 0) {
  reversed.push(stack.pop());
}
```

## 24. Monotonic Stack — phần tử lớn hơn đầu tiên bên phải

### Dấu hiệu nhận dạng

```text
phần tử đầu tiên bên phải lớn hơn
phần tử đầu tiên bên phải nhỏ hơn
ngày/giá tiếp theo thỏa điều kiện
mỗi phần tử đang chờ một phần tử tương lai
```

### Mental model: người đang chờ người cao hơn

```text
Người mới xuất hiện
→ cứu liên tiếp những người thấp hơn trên đỉnh stack
→ pop từng người và ghi người mới làm đáp án
→ cứu xong thì chính người mới vào chờ.
```

Ví dụ stack value `[4, 3, 2, 1]`, current là `5`:

```text
5 > 1 → pop 1
5 > 2 → pop 2
5 > 3 → pop 3
5 > 4 → pop 4
stack rỗng
5 vào chờ
```

### Invariant

> Stack chứa index của những số đã đi qua nhưng chưa tìm được số lớn hơn đầu tiên bên phải.

### Full template

```js
function nextGreaterValues(numbers) {
  const results = Array(numbers.length).fill(-1);
  const stack = [];

  for (let index = 0; index < numbers.length; index++) {
    const currentNumber = numbers[index];

    while (
      stack.length > 0 &&
      currentNumber > numbers[stack.at(-1)]
    ) {
      const waitingIndex = stack.pop();
      results[waitingIndex] = currentNumber;
    }

    stack.push(index);
  }

  return results;
}
```

### Câu thần chú

```text
Stack lưu INDEX đang chờ.
Current > giá trị của TOP
→ POP top
→ ghi CURRENT làm đáp án cho top.
Cứu xong → PUSH index của current.
```

### Vì sao lưu index?

Vì phải biết ghi kết quả vào ô nào:

```js
results[waitingIndex] = currentNumber;
```

Câu nhớ:

> Giá trị dùng để so sánh; index dùng để ghi đáp án.

### Ba tầng truy cập dễ nhầm

```js
stack.at(-1)                  // index nằm trên đỉnh
numbers[stack.at(-1)]         // giá trị của phần tử trên đỉnh
results[waitingIndex]         // ô đáp án cần ghi
```

Stack giữ **địa chỉ**; muốn so sánh **giá trị** thì lấy địa chỉ từ stack rồi quay về `numbers`.

### Bug đã từng mắc: giữ top ngoài while

Sai:

```js
const topIndex = stack.at(-1);

while (stack.length > 0 && current > numbers[topIndex]) {
  stack.pop();
}
```

Sau mỗi `pop`, top đã đổi nhưng `topIndex` cũ không đổi. Một test như `[2, 3, 3, 5]` có thể vô tình vẫn đúng vì `5` cần pop sạch. Test `[4, 2, 3]` sẽ làm lộ bug.

Đúng:

```js
while (
  stack.length > 0 &&
  current > numbers[stack.at(-1)]
) {
  // mỗi lượt lấy top mới
}
```

### Biến thể

```text
Next smaller value  → đổi > thành <.
Trả khoảng cách     → answer[waitingIndex] = index - waitingIndex.
Trả index           → answer[waitingIndex] = index.
```

## 25. Queue và BFS

Queue là FIFO: vào trước, ra trước.

BFS dùng khi:

- Lan theo từng lớp.
- Duyệt graph/grid.
- Tìm đường đi ngắn nhất trong graph không trọng số.
- Đếm vùng liên thông.

### BFS grid template

```js
function bfsGrid(grid, startRow, startCol) {
  const rowCount = grid.length;
  const colCount = grid[0].length;
  const visited = Array.from(
    { length: rowCount },
    () => Array(colCount).fill(false)
  );

  const dr = [-1, 1, 0, 0];
  const dc = [0, 0, -1, 1];
  const queue = [[startRow, startCol]];
  let head = 0;

  visited[startRow][startCol] = true;

  while (head < queue.length) {
    const [row, col] = queue[head];
    head++;

    for (let direction = 0; direction < 4; direction++) {
      const nextRow = row + dr[direction];
      const nextCol = col + dc[direction];

      const inBounds =
        nextRow >= 0 &&
        nextRow < rowCount &&
        nextCol >= 0 &&
        nextCol < colCount;

      if (!inBounds) continue;
      if (visited[nextRow][nextCol]) continue;
      if (grid[nextRow][nextCol] === 0) continue;

      visited[nextRow][nextCol] = true;
      queue.push([nextRow, nextCol]);
    }
  }

  return visited;
}
```

### Vì sao đánh visited trước khi enqueue?

Để một node không bị nhiều hàng xóm đẩy vào queue nhiều lần.

Invariant:

> Mọi node trong queue đã được phát hiện và đánh visited, nhưng có thể chưa được mở rộng hàng xóm.

### Queue khác result

- `queue`: danh sách công việc đang/chờ xử lý.
- `result`: thứ tự hoặc đáp án cần trả.

Trong một số BFS đơn giản, thứ tự queue cũng chính là thứ tự duyệt, nhưng hai vai trò vẫn khác nhau.

### BFS graph

```js
function bfsGraph(graph, start) {
  const visited = new Set([start]);
  const queue = [start];
  const result = [];
  let head = 0;

  while (head < queue.length) {
    const current = queue[head];
    head++;
    result.push(current);

    for (const neighbor of graph[current]) {
      if (visited.has(neighbor)) continue;

      visited.add(neighbor);
      queue.push(neighbor);
    }
  }

  return result;
}
```

Thứ tự BFS có thể khác nhau nếu thứ tự hàng xóm trong adjacency list khác nhau; cả hai vẫn đúng nếu đề không yêu cầu tie-break cụ thể.

## 26. DFS

DFS đi sâu hết một nhánh rồi quay lại.

```js
function dfs(graph, current, visited, result) {
  visited.add(current);
  result.push(current);

  for (const neighbor of graph[current]) {
    if (!visited.has(neighbor)) {
      dfs(graph, neighbor, visited, result);
    }
  }
}
```

So sánh nhanh:

| Nhu cầu | BFS | DFS |
|---|---:|---:|
| Đường ngắn nhất, graph không trọng số | tốt | không đảm bảo nếu dùng trực tiếp |
| Duyệt hết vùng liên thông | được | được |
| Lan theo lớp | tốt | không tự nhiên |
| Backtracking | không | tự nhiên |

## 27. Greedy cơ bản

Greedy chọn phương án tốt nhất hiện tại, nhưng phải có lý do rằng lựa chọn cục bộ không phá đáp án tối ưu.

Ví dụ Sơn lại:

```text
Gặp vị trí chưa được phủ sơn
→ bắt đầu sơn ngay tại đó
→ phủ xa nhất có thể sang phải.
```

```js
function solution(n, m, section) {
  let count = 0;
  let coveredUntil = 0;

  for (const position of section) {
    if (position > coveredUntil) {
      count++;
      coveredUntil = position + m - 1;
    }
  }

  return count;
}
```

Invariant:

> Mọi vị trí cần sơn đã duyệt đều được phủ bằng số lần sơn ít nhất cho phần đó.

## 28. Heap/Priority Queue — mức đã chốt

Dùng khi liên tục cần lấy min/max hiện tại:

- Top K.
- Scheduling.
- Dijkstra.
- Luôn lấy công việc nhỏ/lớn nhất tiếp theo.

Hiện cần biết nhận dạng và dùng template MinHeap cơ bản; chưa phải ưu tiên cao hơn Map/Set, simulation, BFS/DFS, Binary Search và Stack/Queue cho mục tiêu 700+.

## 29. Dynamic Programming — mức nền tảng

DP phù hợp khi:

1. Có state con bị tính lại nhiều lần.
2. Đáp án lớn được xây từ đáp án state nhỏ hơn.

Khung:

```text
State      — dp[i] có nghĩa gì?
Base case  — state nhỏ nhất đã biết đáp án.
Transition — dp[i] tính từ state nào?
Order      — phải tính state nào trước?
Answer     — lấy ở dp[n], max(dp), hay vị trí khác?
```

Không dùng DP chỉ vì đề hỏi min/max. Nếu chưa định nghĩa được `dp[state]` có nghĩa gì, chưa nên viết recurrence.

---

# PHẦN IV — CÁC BÀI ĐÃ HỌC VÀ CONCEPT MANG ĐI

## 30. Video Player — Simulation + chuẩn hóa thời gian

### Pattern

```text
mm:ss → đổi thành tổng giây
→ xử lý prev/next bằng số
→ clamp trong [0, videoLength]
→ skip opening đúng thời điểm
→ đổi lại mm:ss
```

```js
const toSeconds = (time) => {
  const [minutes, seconds] = time.split(":").map(Number);
  return minutes * 60 + seconds;
};

const toTime = (seconds) => {
  const minutes = Math.floor(seconds / 60);
  const remain = seconds % 60;

  return `${String(minutes).padStart(2, "0")}:${String(remain).padStart(2, "0")}`;
};
```

Clamp:

```js
position = Math.max(0, position - 10);
position = Math.min(videoLength, position + 10);
```

Bẫy:

- Quên skip opening ở vị trí ban đầu.
- Quên skip sau mỗi command.
- Tính trực tiếp trên string.
- Sai endpoint của opening.

## 31. Bandage/Health — duyệt theo event thay vì từng giây

### Brute force

Duyệt từng giây: hồi máu hoặc nhận attack.

### Tối ưu đã học

Chỉ duyệt các lần attack. Giữa hai attack, số giây hồi là:

```js
const recoveryTime = attackTime - previousAttackTime - 1;
```

State:

```text
currentHealth
previousAttackTime
```

Mỗi khoảng yên lặng:

```text
hồi cơ bản = recoveryTime × healPerSecond
bonus = floor(recoveryTime / castTime) × bonusHeal
health không vượt maxHealth
```

Sau đó trừ damage; nếu health `≤ 0`, kết thúc.

Concept mang đi:

> Khi input chỉ ghi các event thưa, có thể xử lý khoảng cách giữa event thay vì mô phỏng từng đơn vị thời gian.

## 32. Lonely Alphabet — đếm block, không đếm ký tự thô

Một chữ “cô độc” phụ thuộc vào số **nhóm liên tiếp**, không phải tổng số ký tự.

Ví dụ ý tưởng:

```text
aaabbbaca
a xuất hiện ở nhiều block khác nhau.
```

Khi một ký tự khác `previousChar`, một block mới bắt đầu.

```js
function lonelyLetters(text) {
  const blockCounts = new Map();
  let previousChar = null;

  for (const currentChar of text) {
    if (currentChar !== previousChar) {
      blockCounts.set(
        currentChar,
        (blockCounts.get(currentChar) ?? 0) + 1
      );
    }

    previousChar = currentChar;
  }

  const answer = [];

  for (const [char, count] of blockCounts) {
    if (count >= 2) answer.push(char);
  }

  return answer.length === 0 ? "N" : answer.sort().join("");
}
```

Concept:

> Nếu đề nói về các đoạn/nhóm liên tiếp, transition thường xảy ra ở ranh giới `current !== previous`.

## 33. Triangle Snail — hướng + số bước giảm dần

Ba hướng:

```js
const dr = [1, 0, -1];
const dc = [0, 1, -1];
```

Ý nghĩa:

```text
0: đi xuống
1: đi sang phải
2: đi chéo lên trái
```

Đổi hướng:

```js
direction = (direction + 1) % 3;
```

Độ dài mỗi đoạn giảm từ `n` về `1`. Hai vòng lặp có hai vai trò:

- Vòng ngoài: mỗi đoạn/hướng.
- Vòng trong: đi đủ số bước của đoạn đó.

Concept:

> Simulation theo hướng thường cần `dr/dc`, state tọa độ, direction và quy tắc đổi hướng.

## 34. Dạo công viên — state tạm rồi commit

Phần cần giữ:

```text
State:      row, col
Transition: N/S/E/W → dr, dc
Validation: biên và vật cản
Commit:     thử đủ route; hợp lệ hết mới cập nhật vị trí thật
```

Concept quan trọng hơn việc thuộc nguyên code:

> Một command chỉ được chấp nhận nếu toàn bộ đường đi đúng → chạy trên state tạm, rồi commit một lần.

Trạng thái hiện tại: đã hiểu khi nhìn code nhưng chưa cần quay lại ép học thuộc ngay; ưu tiên hoàn thiện bản đồ PCCP trước.

## 35. Báo cáo kết quả xử lý — Map of Set

Dấu hiệu:

```text
Cùng một quan hệ chỉ tính một lần.
Cần biết ai đã báo cáo ai.
```

Model:

```js
const reportedBy = new Map(
  idList.map((id) => [id, new Set()])
);
```

Concept:

- `Set` khử report trùng.
- `Map target → Set reporters` biểu diễn quan hệ.
- Kết quả phải map theo thứ tự `idList`, không phụ thuộc thứ tự Map tình cờ.

## 36. Trắc nghiệm tính cách — score + tie-break

Mỗi choice đóng góp điểm cho một trong hai ký tự. Sau đó xét các cặp `RT`, `CF`, `JM`, `AN`.

Concept:

```text
choice < 4 → cộng 4 - choice cho bên trái
choice > 4 → cộng choice - 4 cho bên phải
choice = 4 → không cộng
```

Khi hòa, chọn ký tự trước theo alphabet. Vì các cặp đã đặt theo đúng thứ tự, có thể dùng `>=` để giữ bên trái.

> Tie-break phải biến thành toán tử cụ thể; không để đến cuối mới xử lý mơ hồ.

## 37. Thời hạn thông tin cá nhân — chuẩn hóa ngày thành số

Vì đề quy định mỗi tháng đúng 28 ngày, không dùng lịch thật.

```js
const toDays = (date) => {
  const [year, month, day] = date.split(".").map(Number);
  return year * 12 * 28 + month * 28 + day;
};
```

Hết hạn khi:

```js
collectedDays + termMonths * 28 <= todayDays
```

Bẫy:

- Nhầm `<` với `<=`.
- Trả index 0-based thay vì 1-based.
- Dùng `Date` dù lịch đề bài là lịch giả lập.

## 38. Người nhận quà nhiều nhất — Map + Matrix + xét pair một lần

Model:

```text
Map name → index
matrix[i][j] = số quà i đã tặng j
giftIndex[i] = đã tặng − đã nhận
```

Xét mỗi cặp đúng một lần bằng:

```js
for (let i = 0; i < n; i++) {
  for (let j = i + 1; j < n; j++) {
    // quyết định i hay j nhận quà
  }
}
```

Concept:

> Khi cần so sánh mọi cặp không thứ tự, duyệt `i < j` để không xét `(i,j)` và `(j,i)` hai lần.

## 39. Phân tích dữ liệu — ánh xạ tên cột

```js
const columns = {
  code: 0,
  date: 1,
  maximum: 2,
  remain: 3,
};
```

Sau đó:

```js
return data
  .filter((row) => row[columns[filterColumn]] < value)
  .sort((a, b) => a[columns[sortColumn]] - b[columns[sortColumn]]);
```

Concept:

> Khi đề đưa tên field dưới dạng string nhưng dữ liệu là array, tạo một bảng ánh xạ field → index.

## 40. Hall of Fame — giữ top K

Mức đơn giản khi `k` nhỏ:

```js
const hall = [];

for (const score of scores) {
  hall.push(score);
  hall.sort((a, b) => b - a);

  if (hall.length > k) hall.pop();

  answer.push(hall.at(-1));
}
```

Nếu dữ liệu lớn và liên tục cần min của top K, đây là tín hiệu cân nhắc MinHeap.

---

# PHẦN V — NHỮNG LỖI ĐÃ MẮC VÀ BÀI HỌC

## 41. Lẫn index và value

Ví dụ monotonic stack:

```js
stack.push(index);
```

Vậy:

```js
stack.at(-1)          // index
numbers[stack.at(-1)] // value
```

Nguyên nhân lỗi: stack chứa một lớp gián tiếp — **địa chỉ**, không phải dữ liệu gốc.

Cách chống nhầm: trước khi code, ghi rõ kiểu logic:

```text
stack: number[] nhưng mỗi number có ý nghĩa là INDEX
numbers[index]: VALUE
results[index]: ANSWER
```

## 42. Chụp state động vào biến tĩnh quá sớm

Nếu top stack thay đổi sau mỗi `pop`, không được lấy top một lần ngoài `while`.

Quy tắc:

> Giá trị nào có thể thay đổi trong vòng lặp thì phải được đọc lại ở mỗi lượt, hoặc cập nhật rõ ràng trong vòng lặp.

## 43. Một test đúng không chứng minh code đúng

Test `[2,3,3,5]` không làm lộ bug top stack vì khi gặp `5`, đúng là phải pop toàn bộ hai số `3`.

Phải tạo **counterexample có phân nhánh**:

```text
[4,2,3]
```

Khi gặp `3`, phải pop `2` nhưng dừng trước `4`. Test kiểu này kiểm tra việc đỉnh stack có được cập nhật không.

## 44. Đọc hiểu khác với tự làm được

Có bốn mức năng lực:

```text
0 = chưa biết.
1 = hiểu khi xem lời giải.
2 = tự viết được khi đã biết pattern.
3 = tự nhận ra pattern và giải đề lạ.
```

“Nhìn code thấy hiểu” mới là mức 1. Mục tiêu thi là đưa các pattern cốt lõi lên mức 2–3.

## 45. Học thuộc ký tự thay vì nhớ cấu trúc

Không thuộc nguyên hàm. Nhớ bộ xương.

Ví dụ monotonic stack:

```text
-1 → stack → for current → while pop/ghi → push current
```

Từ bộ xương dựng lại code. Nếu quên một dòng, quay lại invariant để suy ra.

## 46. Quên endpoint và off-by-one

Các bẫy từng gặp:

- `i < length`, không phải lúc nào cũng là `i <= length`.
- Index trả về có thể 1-based.
- Ngày hết hạn dùng `<=`.
- Thời gian hồi giữa hai attack phải trừ `1` giây attack.
- Ô giữa hai đường chéo bị cộng hai lần.
- `left < right` khi cần hai phần tử khác nhau.

## 47. Dùng cấu trúc dữ liệu đúng tên nhưng sai vai trò

Trước mỗi bài, không chỉ nói “dùng stack” hay “dùng Map”. Phải nói:

```text
Stack lưu cái gì?
Map key là gì, value là gì?
Queue chứa state gì?
Visited được đánh dấu lúc nào?
Answer được cập nhật khi nào?
```

---

# PHẦN VI — CÁCH HỌC ĐỂ LOGIC VÀ CODE IN SÂU

## 48. Chu trình học một pattern

### Cửa 1 — Nói đề bằng tiếng người

Không dùng thuật ngữ trước. Tự kể input, output và quy tắc.

### Cửa 2 — Nói brute force

Nếu không nghĩ được brute force, thường là chưa hiểu đủ đề.

### Cửa 3 — Chỉ ra bottleneck

Không được nhảy từ đề thẳng đến tên thuật toán.

### Cửa 4 — Nói state và invariant

Phải nói được data structure đang lưu gì.

### Cửa 5 — Dry run

Lập bảng:

| Current | State trước | Hành động | State sau | Answer |
|---|---|---|---|---|

### Cửa 6 — Đóng lời giải và tự code

Chỉ nhìn sáu từ khóa hoặc tên các khối.

### Cửa 7 — Làm biến thể

Ví dụ:

- Đổi greater thành smaller.
- Đổi trả value thành index/distance.
- Thay điều kiện tie-break.
- Thử empty, equal, tăng dần, giảm dần.

## 49. Active recall ba cấp

### Cấp 1 — Điền chỗ trống

```js
const answer = Array(numbers.length).fill(____);

while (
  stack.length > 0 &&
  numbers[i] > numbers[stack.____]
) {
  const waitingIndex = stack.____();
  answer[waitingIndex] = numbers[____];
}

stack.____(i);
```

### Cấp 2 — Chỉ nhìn bộ xương

```text
answer mặc định
stack chờ
duyệt current
current giải quyết top
pop + ghi
push current
```

### Cấp 3 — Chỉ nhìn đề

Tự nhận pattern, phân tích và viết full code.

## 50. Lịch ôn cách quãng

```text
Lần 1: ngay sau khi hiểu.
Lần 2: sau khoảng 20 phút hoặc cuối buổi.
Lần 3: ngày hôm sau.
Lần 4: sau 3 ngày.
Lần 5: sau 7 ngày.
```

Không nhìn code trước khi thử. Nếu mắc, chỉ mở đúng phần cần gợi ý.

## 51. Error Log

Mỗi lỗi ghi theo format:

```md
### Tên bài / pattern

- Tôi đã nghĩ gì?
- Sai ở dòng/quyết định nào?
- Vì sao test mẫu không làm lộ lỗi?
- Counterexample nhỏ nhất là gì?
- Invariant đúng phải là gì?
- Câu nhắc lần sau:
```

Ví dụ:

```text
Lỗi: lấy top stack ngoài while.
Nguyên nhân: tưởng top không đổi sau pop.
Counterexample: [4,2,3].
Câu nhắc: pop xong phải nhìn đỉnh mới.
```

## 52. Người giỏi thuật toán học như thế nào?

Người giỏi cũng đi qua:

```text
hiểu logic → tự nhớ lại → tự code → làm biến thể → ôn cách quãng
```

Khác biệt là họ có kho pattern đã luyện nhiều lần, nên quá trình diễn ra rất nhanh. Họ không nhất thiết thuộc từng ký tự; họ nhớ:

```text
trigger → state → invariant → transition → template
```

---

# PHẦN VII — BẢN ĐỒ PCCP 700+

## 53. Nhóm A — phải làm được

1. Array/String và vòng lặp.
2. Map/Set, tần suất, grouping.
3. Sort và comparator.
4. Simulation với một hoặc nhiều state.
5. Matrix 2D, tọa độ, kiểm tra biên.
6. Brute Force và Backtracking cơ bản.
7. BFS/DFS trên graph và grid.
8. Binary Search thường và on Answer.
9. Stack/Queue, gồm monotonic stack cơ bản.
10. Constraint và complexity.

## 54. Nhóm B — nhận dạng và làm bản cơ bản

- Greedy.
- Heap/Priority Queue.
- Tree traversal.
- DP 1D và DP grid đơn giản.
- Prefix Sum.
- Two Pointers.
- Sliding Window.

## 55. Nhóm C — chưa ưu tiên cho mục tiêu 700+

- Segment Tree, Fenwick Tree.
- Trie, KMP nâng cao.
- SCC, Network Flow.
- DP bitmask khó.
- Hình học tính toán.
- Graph nâng cao hiếm gặp.

Nguyên tắc: không học thêm chủ đề chỉ để danh sách trông đầy đủ. Chỉ mở rộng khi mock test hoặc error log chứng minh đó là lỗ hổng đáng ưu tiên.

## 56. Bảng tự đánh giá hiện tại

Tự cập nhật bằng bằng chứng, không bằng cảm giác:

| Pattern | 0–3 | Bằng chứng cần có |
|---|---:|---|
| Array traversal |  | Tự viết one-pass state + invariant |
| Map/Set |  | Tự giải frequency/lookup/grouping |
| Sort |  | Tự viết comparator + tie-break |
| Simulation |  | Tự dựng state/validate/commit |
| Matrix |  | Không đảo row/col, check bounds đúng |
| Two Pointers |  | Giải pair sort và read/write |
| Sliding Window |  | Nói rõ invariant và shrink rule |
| Prefix Sum |  | Tự dựng prefix `n+1`, query đúng |
| Binary Search |  | Tự viết loop và giải thích biên |
| Stack |  | Tự viết matching/remove adjacent |
| Monotonic Stack |  | Tự nhận next greater và dựng code |
| Queue/BFS |  | Tự viết queue head + visited |
| DFS |  | Tự viết graph/grid traversal |
| Greedy |  | Giải thích vì sao lựa chọn cục bộ đúng |
| Heap |  | Nhận ra repeated min/max |
| DP |  | Định nghĩa được state/base/transition |

## 57. Chiến thuật 120 phút

### Vòng đầu

```text
Đọc nhanh cả 4 bài.
Xác định bài chắc điểm nhất.
Ghi pattern ứng viên và constraint.
Không mắc kẹt quá lâu chỉ vì đã viết dở.
```

### Với từng bài

```text
Contract → Bound → Brute → Pattern → State → Invariant
→ code theo khối → test nhỏ → edge case → submit
```

### Khi bí

1. Viết brute force hoặc mô phỏng input nhỏ.
2. Hỏi phần nào đang bị tính lại.
3. Hỏi có thể lưu quá khứ bằng Map/Set/Stack/Queue không.
4. Hỏi đáp án có tính đơn điệu để Binary Search không.
5. Nếu vẫn bí, chuyển bài và bảo toàn thời gian.

Hai tuần cuối: luyện mock đủ 120 phút, không phụ thuộc autocomplete, sau mỗi mock liên kết lỗi về đúng pattern trong file này.

---

# PHẦN VIII — CHEATSHEET NHẬN DẠNG SIÊU NGẮN

## 58. Từ đề → pattern ứng viên

| Tín hiệu | Pattern đầu tiên cần nghĩ |
|---|---|
| Đã gặp chưa, đếm, nhóm | Map / Set |
| Pair, array sort, hai đầu | Two Pointers |
| Đoạn liên tiếp | Sliding Window / Prefix Sum |
| Nhiều truy vấn tổng đoạn | Prefix Sum |
| Min/max thỏa điều kiện đơn điệu | Binary Search on Answer |
| Gần nhất chưa xử lý, matching | Stack |
| Đầu tiên lớn hơn/nhỏ hơn bên phải | Monotonic Stack |
| Xử lý theo thứ tự đến | Queue |
| Lan theo lớp, đường ngắn không trọng số | BFS |
| Duyệt vùng/nhánh, backtracking | DFS |
| Grid, lệnh, thời gian, trạng thái | Simulation |
| Liên tục lấy min/max | Heap |
| Chọn cục bộ có thể chứng minh | Greedy |
| State con lặp lại | DP |

Từ khóa chỉ tạo **ứng viên**. Chỉ chốt pattern khi nói được state, invariant và complexity.

## 59. Template tối thiểu cần gọi ra được

### Map count

```js
map.set(key, (map.get(key) ?? 0) + 1);
```

### Queue

```js
let head = 0;
while (head < queue.length) {
  const current = queue[head++];
}
```

### Matrix bounds

```js-fill
if (nr < 0 || nr >= H || nc < 0 || nc >= W) continue;
```

### Binary Search

```js
while (left <= right) {
  const mid = Math.floor((left + right) / 2);
}
```

### Monotonic Stack

```js
while (
  stack.length > 0 &&
  numbers[i] > numbers[stack.at(-1)]
) {
  const waitingIndex = stack.pop();
  answer[waitingIndex] = numbers[i];
}
stack.push(i);
```

---

# PHẦN IX — BƯỚC TIẾP THEO ĐÃ CHỐT

## 60. Việc tiếp theo

1. Hoàn thiện bảng pattern PCCP 700+ bằng bằng chứng.
2. Chấm mỗi pattern theo thang `0–3`.
3. Chọn bài tiếp theo theo lỗ hổng lớn nhất, không học ngẫu nhiên.
4. Xây bộ khoảng `40–60` bài phủ pattern nhưng tránh trùng lặp vô ích.
5. Có bài luyện **không báo trước pattern**.
6. Chưa quay lại ép thuộc toàn bộ code **Dạo công viên** cho đến khi bản đồ tổng thể ổn.

## 61. Chuẩn hoàn thành một pattern

Một pattern chỉ được đánh dấu “đã học” khi có đủ:

```text
[ ] Mental model bằng tiếng Việt.
[ ] Dấu hiệu nhận dạng và dấu hiệu không nên dùng.
[ ] Brute force và bottleneck.
[ ] State, transition, invariant.
[ ] Template tự viết được.
[ ] Một dry run.
[ ] Edge cases và failure modes.
[ ] Complexity.
[ ] Ít nhất một bài biến thể.
[ ] Ôn lại sau 1–3–7 ngày.
```

---

# KẾT LUẬN

Không cần biến mình thành người thuộc hàng trăm lời giải. Cần biến quy trình sau thành phản xạ:

```text
Đề lạ
→ brute force
→ thấy phần lặp
→ nhận pattern
→ xác định state
→ nói invariant
→ viết transition
→ dựng code theo khối
→ tự tạo counterexample
→ kiểm tra complexity
```

Câu chốt của toàn bộ quá trình học:

> Không học thuộc code từ trên trời rơi xuống. Mỗi dòng code phải được suy ra từ state, transition và invariant.
