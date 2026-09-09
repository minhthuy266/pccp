# PCCP — 6 Bộ Xương Control Flow

> Mục đích: nhìn đề, chọn đúng hình dạng chương trình, rồi điền `state` và điều kiện của đề vào.  
> Không học thuộc lời giải từng bài. Không coi đây là sáu thuật toán duy nhất; đây là sáu **hình dạng control flow** bao phủ phần lớn bài PCCP.

---

## 0. Quy trình dùng trong phòng thi

```text
ĐỀ BÀI
→ CONTRACT + BOUND
→ viết BRUTE FORCE bằng lời
→ tìm BOTTLENECK
→ nhận diện PATTERN
→ chọn 1 trong 6 SKELETON
→ xác định STATE + ONE UNIT + STOP
→ dry run bằng bảng nếu bị loạn
→ điền block code
→ kiểm tra EXIT STATE + EDGE
```

### Năm câu bắt buộc trước khi code

```text
STATE:   Máy phải nhớ tối thiểu những gì?
UNIT:    Một vòng/call xử lý hoàn chỉnh cái gì?
MOVE:    State thay đổi như thế nào?
STOP:    Khi nào không còn việc để làm?
ANSWER:  Khi nào và bằng gì cập nhật đáp án?
```

### Bảng dry run duy nhất

| Unit | State trước | Input / Choice | Transition / Control | Answer Update | Next | State sau |
|---|---|---|---|---|---|---|

Khung ngoài bảng:

```text
CONTRACT:
BOUND:
ONE UNIT:
INIT:
CONTINUE / STOP:
INVARIANT:

EXIT STATE:
RETURN:
COMPLEXITY:
EDGE:
```

### Map bảng sang block code

```text
State trước  → biến/tham số, được tạo bởi INIT
Unit         → thân loop hoặc một function/call
Input/Choice → đọc/chọn dữ liệu hiện tại
Transition   → statement / if / while / recursion
Answer       → count/min/max/result
Next         → pointer++, head++, pop/push, recurse/return
State sau    → verify đã update đủ và sẵn sàng cho unit sau
```

Quy tắc dựng control flow:

```text
Chắc chắn đúng 1 lần             → statement
Có thể xảy ra 0 hoặc 1 lần       → if
Lặp đến khi state hợp lệ         → while
Chọn đúng một trong các khả năng → if/else
Làm với từng item                → for
Thử lựa chọn rồi quay lại        → recurse + undo
```

> Dry run theo **hàng** để kiểm tra. Đọc theo **cột** để sinh code.

---

# 1. SCAN — Array / Hash / Simulation

## Dấu hiệu

- Xử lý lần lượt từng phần tử, command hoặc thời điểm.
- Kết quả hiện tại phụ thuộc vào state đã tích lũy.
- Không cần quay lại phần tử cũ để thử nhánh khác.

## Mental flow

```text
READ → UPDATE STATE → CHECK → RECORD
```

## Bộ xương

```js
function solution(items) {
    // INIT
    let answer = 0;
    // const map = new Map();
    // const set = new Set();

    // ONE UNIT: một item
    for (const item of items) {
        // READ

        // UPDATE STATE

        // CHECK + RECORD
    }

    return answer;
}
```

## Hash kernels đặt vào `UPDATE STATE`

### Set — tồn tại / khác nhau

```js
const set = new Set();

for (const item of items) {
    if (set.has(item)) {
        // item đã xuất hiện
    }

    set.add(item);
}
```

### Map count — tần suất

```js
const countByKey = new Map();

for (const key of items) {
    countByKey.set(key, (countByKey.get(key) ?? 0) + 1);
}
```

### Map grouping — gom nhóm

```js
const itemsByGroup = new Map();

for (const item of items) {
    const key = getGroup(item);

    if (!itemsByGroup.has(key)) {
        itemsByGroup.set(key, []);
    }

    itemsByGroup.get(key).push(item);
}
```

### Direct lookup

```js
const valueByKey = new Map();

for (let i = 0; i < items.length; i++) {
    const item = items[i];
    const needed = getNeeded(item);

    if (valueByKey.has(needed)) {
        return [valueByKey.get(needed), i];
    }

    valueByKey.set(item, i);
}
```

## Simulation nhiều bước: COPY → TRY → COMMIT

```js
for (const command of commands) {
    // COPY
    let nextState = copyState(state);
    let valid = true;

    // TRY
    for (let step = 0; step < command.distance; step++) {
        nextState = move(nextState, command.direction);

        if (!isValid(nextState)) {
            valid = false;
            break;
        }
    }

    // COMMIT
    if (valid) {
        state = nextState;
    }
}
```

## Invariant cần kiểm tra

```text
Sau mỗi unit, state phản ánh chính xác mọi item/command đã xử lý.
```

## Hidden cases

- Input một phần tử.
- Duplicate có ý nghĩa hay không?
- Map chưa có key.
- Value bằng `0` vẫn hợp lệ: ưu tiên `??`, không tùy tiện dùng `||`.
- Command sai ở bước cuối: không được commit một phần state.

---

# 2. TWO POINTERS / SLIDING WINDOW

## Dấu hiệu

- Hai biên của một đoạn hoặc hai đầu của mảng.
- Mảng đã có thứ tự, hoặc điều kiện thay đổi đơn điệu khi con trỏ di chuyển.
- Đề hỏi đoạn liên tiếp, cặp phần tử, hoặc cần thu hẹp phạm vi.

## 2A. Hai đầu

### Mental flow

```text
COMPARE ENDS → DECIDE → MOVE ONE/BOTH ENDS
```

### Bộ xương

```js
function solution(values) {
    const sorted = [...values].sort((a, b) => a - b);

    let left = 0;
    let right = sorted.length - 1;
    let answer = 0;

    // ONE UNIT: một quyết định xử lý hai đầu
    while (left < right) {
        const current = combine(sorted[left], sorted[right]);

        if (/* trường hợp A */) {
            left++;
        } else {
            // hành động của trường hợp B
        }

        // Hành động chung của mọi nhánh, nếu có
        right--;
        answer++;
    }

    // EXIT: có thể còn một phần tử
    if (left === right) {
        // xử lý phần tử còn lại nếu đề yêu cầu
    }

    return answer;
}
```

### Kernel thuyền cứu hộ

```js
while (left < right) {
    if (people[left] + people[right] <= limit) {
        left++;
    }

    right--;
    boats++;
}

if (left === right) {
    boats++;
}
```

## 2B. Sliding Window dương / điều kiện đơn điệu

### Mental flow

```text
ADD RIGHT → REPAIR LEFT → CHECK → RECORD
```

### Bộ xương

```js
function solution(values, target) {
    let left = 0;
    let state = 0;
    let answer = null;

    // ONE UNIT: xử lý hoàn chỉnh một right
    for (let right = 0; right < values.length; right++) {
        // ADD RIGHT — đúng 1 lần
        state += values[right];

        // REPAIR LEFT — 0..N lần
        while (/* state không hợp lệ */) {
            state -= values[left];
            left++;
        }

        // CHECK + RECORD — 0/1 lần
        if (/* state tạo đáp án */) {
            // update answer bằng [left, right]
        }
    }

    return answer;
}
```

## Invariant cần kiểm tra

```text
state luôn mô tả chính xác đoạn [left..right].
Sau REPAIR, cửa sổ phải hợp lệ.
```

## Hidden cases

- `right = 0` và cửa sổ một phần tử.
- Repair phải chạy nhiều lần, không chỉ một lần.
- Khi `left` di chuyển phải loại giá trị cũ khỏi state ngay.
- Sau `while`, điều kiện có thể đổi từ `>` thành `===`; không dùng `else if` ngăn CHECK.
- Phương pháp tổng dương có thể sai nếu dãy chứa số âm.
- Tie: đoạn ngắn nhất, rồi index nhỏ nhất.

---

# 3. WORKLIST — Stack / Queue / Heap / BFS

## Ý tưởng chung

```text
Có một tập công việc đang chờ
→ TAKE một việc theo quy tắc
→ PROCESS
→ sinh công việc mới
→ PUSH trở lại
```

## Bộ xương tổng quát

```js
while (/* còn công việc */) {
    const current = takeNext();

    // PROCESS current

    for (const next of generateNext(current)) {
        if (/* next không hợp lệ */) continue;

        // MARK / UPDATE
        addWork(next);
    }
}
```

## Chọn cơ chế lấy

```text
Stack → vào sau, ra trước
Queue → vào trước, ra trước
Heap  → phần tử ưu tiên nhất ra trước
```

## 3A. Stack

```js
const stack = [];

for (const item of items) {
    while (
        stack.length > 0 &&
        shouldPop(stack[stack.length - 1], item)
    ) {
        stack.pop();
    }

    stack.push(item);
}
```

## 3B. Queue

```js
const queue = [start];
let head = 0;

while (head < queue.length) {
    const current = queue[head++];

    // xử lý current
    // queue.push(next)
}
```

Không dùng `shift()` lặp lại cho queue lớn.

## 3C. BFS

### Mental flow

```text
POP → EXPAND → FILTER → MARK → PUSH
```

```js
const queue = [start];
let head = 0;

const visited = new Set([keyOf(start)]);

while (head < queue.length) {
    const current = queue[head++];

    for (const next of getNeighbors(current)) {
        const key = keyOf(next);

        if (!isValid(next) || visited.has(key)) {
            continue;
        }

        // MARK khi enqueue, không chờ đến khi dequeue
        visited.add(key);
        queue.push(next);
    }
}
```

## 3D. Heap / Priority Queue

### Mental flow

```text
PUSH: thêm cuối → nổi lên
POP:  lấy root → cuối lên root → chìm xuống
```

### Bộ xương bài toán dùng Heap

```js
const heap = new MinHeap((a, b) => a - b);

for (const value of values) {
    heap.push(value);
}

while (/* còn operation */) {
    const best = heap.pop();

    // PROCESS

    heap.push(/* state mới */);
}
```

### MinHeap dùng comparator

```js
class MinHeap {
    constructor(compare = (a, b) => a - b) {
        this.heap = [];
        this.compare = compare;
    }

    get size() {
        return this.heap.length;
    }

    peek() {
        return this.heap[0];
    }

    swap(i, j) {
        [this.heap[i], this.heap[j]] = [this.heap[j], this.heap[i]];
    }

    push(value) {
        this.heap.push(value);
        let index = this.heap.length - 1;

        while (index > 0) {
            const parentIndex = Math.floor((index - 1) / 2);

            if (
                this.compare(
                    this.heap[index],
                    this.heap[parentIndex]
                ) >= 0
            ) {
                break;
            }

            this.swap(index, parentIndex);
            index = parentIndex;
        }
    }

    pop() {
        if (this.heap.length === 0) return undefined;
        if (this.heap.length === 1) return this.heap.pop();

        const top = this.heap[0];
        const last = this.heap.pop();
        this.heap[0] = last;

        let index = 0;

        while (true) {
            const leftIndex = index * 2 + 1;
            const rightIndex = index * 2 + 2;
            let bestIndex = index;

            if (
                leftIndex < this.heap.length &&
                this.compare(
                    this.heap[leftIndex],
                    this.heap[bestIndex]
                ) < 0
            ) {
                bestIndex = leftIndex;
            }

            if (
                rightIndex < this.heap.length &&
                this.compare(
                    this.heap[rightIndex],
                    this.heap[bestIndex]
                ) < 0
            ) {
                bestIndex = rightIndex;
            }

            if (bestIndex === index) break;

            this.swap(index, bestIndex);
            index = bestIndex;
        }

        return top;
    }
}
```

## Invariant cần kiểm tra

```text
Stack: phần tử chưa bị loại vẫn đúng thứ tự cần thiết.
Queue/BFS: queue chứa các state đã phát hiện nhưng chưa xử lý.
Heap: root luôn là phần tử ưu tiên nhất; mỗi cha đúng thứ tự với con.
```

## Hidden cases

- Pop cấu trúc rỗng hoặc chỉ có một phần tử.
- Queue bị chậm vì `shift()`.
- BFS đánh dấu visited quá muộn làm enqueue trùng.
- Heap node chỉ có con trái.
- Comparator Min/Max bị viết ngược.
- Push lại sai số phần tử sau khi xử lý.

---

# 4. DFS / BACKTRACKING

## Dấu hiệu

- Phải thử nhiều lựa chọn hoặc nhiều thứ tự.
- Input nhỏ, thường đủ để duyệt permutation/subset/path.
- Một lựa chọn làm thay đổi các lựa chọn còn lại.
- Cần quay lại state cũ để thử nhánh khác.

## Mental flow

```text
BASE/ANSWER → FOR EACH CHOICE → FILTER → CHOOSE → RECURSE → UNDO
```

## Bộ xương

```js
function solution(items) {
    let answer = 0;
    const visited = Array(items.length).fill(false);

    // ONE UNIT: một lời gọi dfs(state)
    function dfs(state, count) {
        // BASE hoặc ANSWER UPDATE
        answer = Math.max(answer, count);

        // Thử mọi lựa chọn tiếp theo
        for (let i = 0; i < items.length; i++) {
            // FILTER
            if (visited[i] || !canChoose(state, items[i])) {
                continue;
            }

            // CHOOSE
            visited[i] = true;

            // RECURSE
            dfs(makeNextState(state, items[i]), count + 1);

            // UNDO
            visited[i] = false;
        }
    }

    dfs(initialState, 0);
    return answer;
}
```

## Khi nào cần base case rõ ràng?

```js
function dfs(index, state) {
    if (index === items.length) {
        // ghi đáp án
        return;
    }

    // recurse
}
```

Nếu `for` tự hết khi không còn choice, function có thể tự return mà không cần base case riêng. Vẫn phải cập nhật đáp án ở vị trí bảo đảm leaf được ghi nhận.

## Undo rule

```text
Primitive truyền bằng giá trị:
dfs(energy - cost, count + 1)
→ caller tự giữ energy/count cũ.

Array/Object dùng chung:
visited[i] = true
dfs(...)
visited[i] = false
→ bắt buộc undo.
```

## Invariant cần kiểm tra

```text
Sau khi một recursive child return, state dùng chung phải giống hệt trước khi thử choice đó.
```

## Hidden cases

- Không có lựa chọn hợp lệ ngay từ root.
- Phải cho phép điều kiện bằng nhau (`energy === minRequired`).
- Duplicate item: visited theo index, không theo value.
- Quên undo làm mất các nhánh sau.
- Cập nhật answer quá muộn khiến leaf không được ghi.
- Recursion depth quá lớn; kiểm tra bound trước khi chọn DFS.

---

# 5. BINARY SEARCH

## Dấu hiệu

- Tìm giá trị nhỏ nhất/lớn nhất thỏa điều kiện.
- Miền đáp án có thứ tự.
- Viết được predicate đơn điệu:

```text
feasible(x) = có thể hoàn thành với x không?
```

- Khi một giá trị đúng, biết chắc cả một phía cũng đúng; hoặc ngược lại.

## Mental flow

```text
MID → CHECK → SAVE CANDIDATE → DISCARD HALF
```

## Bộ xương: tìm giá trị nhỏ nhất thỏa điều kiện

```js
function solution(input) {
    let left = minimumPossible;
    let right = maximumPossible;
    let answer = maximumPossible;

    while (left <= right) {
        const mid = Math.floor(left + (right - left) / 2);

        if (feasible(mid, input)) {
            // mid là candidate; thử nhỏ hơn
            answer = mid;
            right = mid - 1;
        } else {
            // mid chưa đủ; phải tăng
            left = mid + 1;
        }
    }

    return answer;
}
```

## Bộ xương: tìm giá trị lớn nhất thỏa điều kiện

```js
let left = minimumPossible;
let right = maximumPossible;
let answer = minimumPossible;

while (left <= right) {
    const mid = Math.floor(left + (right - left) / 2);

    if (feasible(mid)) {
        answer = mid;
        left = mid + 1;
    } else {
        right = mid - 1;
    }
}
```

## Invariant cần kiểm tra

```text
Nếu đang tìm min:
answer luôn là một candidate đã biết là feasible.

Sau mỗi unit, ít nhất mid bị loại khỏi miền tìm kiếm.
```

## Hidden cases

- Miền chỉ có một giá trị.
- Đáp án nằm đúng ở biên trái/phải.
- `left`, `right` không thay đổi làm infinite loop.
- Predicate không đơn điệu: không được dùng Binary Search.
- Nhầm tìm min với tìm max, cập nhật sai phía.
- Giá trị lớn: cân nhắc `BigInt` nếu vượt `Number.MAX_SAFE_INTEGER`.

---

# 6. DYNAMIC PROGRAMMING

## Dấu hiệu

- Bài lớn được cấu tạo từ các bài nhỏ lặp lại.
- Nhiều nhánh hỏi lại cùng một state.
- Cần min/max/count/possibility qua các quyết định.
- Có thể định nghĩa kết quả theo một state hữu hạn.

## Mental flow

```text
DEFINE STATE → BASE → DEPENDENCIES → TRANSITION → ORDER → ANSWER
```

## Sáu câu phải trả lời

```text
1. `dp[i]` hoặc `dp[row][col]` nghĩa chính xác là gì?
2. Base case là gì?
3. State hiện tại phụ thuộc state nào?
4. Công thức chuyển là gì?
5. Thứ tự tính nào bảo đảm dependency đã có?
6. Đáp án nằm ở state nào?
```

## Bộ xương bottom-up 1 chiều

```js
function solution(input) {
    const dp = Array(size).fill(initialValue);

    // BASE
    dp[baseIndex] = baseValue;

    // ONE UNIT: tính hoàn chỉnh dp[i]
    for (let i = startIndex; i < size; i++) {
        // TRANSITION từ các state đã biết
        dp[i] = chooseBest(
            dp[i],
            dp[i - 1],
            dp[i - 2]
        );
    }

    return dp[answerIndex];
}
```

## Bộ xương grid 2 chiều

```js
const dp = Array.from(
    { length: rows },
    () => Array(cols).fill(initialValue)
);

// BASE
dp[startRow][startCol] = baseValue;

for (let row = 0; row < rows; row++) {
    for (let col = 0; col < cols; col++) {
        if (row === startRow && col === startCol) continue;

        // Chỉ lấy từ các state đã được tính
        if (row > 0) {
            dp[row][col] = combine(dp[row][col], dp[row - 1][col]);
        }

        if (col > 0) {
            dp[row][col] = combine(dp[row][col], dp[row][col - 1]);
        }
    }
}
```

## Bộ xương memoization

```js
const memo = new Map();

function solve(state) {
    if (isBase(state)) {
        return baseAnswer(state);
    }

    const key = keyOf(state);

    if (memo.has(key)) {
        return memo.get(key);
    }

    const answer = combine(
        ...getNextStates(state).map(next => solve(next))
    );

    memo.set(key, answer);
    return answer;
}
```

## Invariant cần kiểm tra

```text
Khi tính một dp state, mọi dependency của nó đã đúng và sẵn sàng.
```

## Hidden cases

- Base case thiếu hoặc sai ý nghĩa.
- Index âm / vượt boundary.
- Giá trị khởi tạo sai: `0`, `Infinity`, `-Infinity`, `false` có ý nghĩa khác nhau.
- Thứ tự duyệt khiến dependency chưa được tính.
- DP state thiếu một chiều thông tin nên gộp nhầm hai trạng thái khác nhau.
- Overflow hoặc số cách quá lớn cần modulo/BigInt.

---

# Bản đồ chọn nhanh

| Câu hỏi từ đề | Bộ xương |
|---|---|
| Xử lý từng item/command, cập nhật state? | `1. SCAN` |
| Xét cặp hai đầu hoặc đoạn liên tiếp? | `2. TWO POINTERS / WINDOW` |
| Có tập công việc chờ và quy tắc lấy tiếp theo? | `3. WORKLIST` |
| Phải thử nhiều lựa chọn/thứ tự rồi quay lại? | `4. DFS / BACKTRACKING` |
| Tìm min/max trên miền đơn điệu? | `5. BINARY SEARCH` |
| Bài lớn tái sử dụng kết quả bài nhỏ? | `6. DP` |

## Pattern ghép

```text
Best Album       = Scan + Hash grouping + Sorting
Thuyền cứu hộ    = Sorting + Two Pointers
Dãy con tổng k   = Sliding Window
Đào tạo nhân viên = Greedy + Min Heap
Dungeon          = DFS + Backtracking
Shortest path    = Queue + BFS
```

---

# Recall 60 giây

```text
1. SCAN
READ → UPDATE → CHECK

2. TWO POINTERS / WINDOW
COMPARE ENDS → MOVE
ADD RIGHT → REPAIR LEFT → CHECK

3. WORKLIST
TAKE → PROCESS → GENERATE → PUSH
Stack / Queue / Heap khác nhau ở quy tắc TAKE

4. DFS
FILTER → CHOOSE → RECURSE → UNDO

5. BINARY SEARCH
MID → FEASIBLE? → SAVE → DISCARD HALF

6. DP
DEFINE → BASE → DEPENDENCIES → TRANSITION → ORDER
```

## Câu cuối trước khi submit

```text
Mỗi loop/call xử lý hoàn chỉnh unit gì?
State sau có đúng và sẵn sàng cho unit kế tiếp không?
Khi loop/call dừng, còn state nào bị bỏ sót không?
```
