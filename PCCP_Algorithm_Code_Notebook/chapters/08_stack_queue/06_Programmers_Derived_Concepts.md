# Concept Stack/Queue rút ra từ 22 bài Programmers/PCCP

[← Index](../../08_Stack_Queue.md) · [22 đề](04_Programmers_PCCP_Set.md) · [22 lời giải](../../solutions/08_Stack_Queue_Programmers_Solutions.md)

## Kết luận trước

Hai từ “stack” và “queue” chưa phải concept giải bài. Từ 22 bài thật, ta rút được 10 bộ xương:

1. Output/reduction stack.
2. Matching và nested unfinished state.
3. Monotonic unresolved stack.
4. Auxiliary physical stack.
5. FIFO bằng head index.
6. Batch/capacity/time queue.
7. Re-enqueue scheduling.
8. Hai queue và invariant bảo toàn.
9. BFS shortest/layer queue.
10. BFS component và multi-phase modeling.

## 1. Decision tree

```text
Phần tử nào bắt buộc được lấy tiếp?
├─ Mới nhất → Stack
│  ├─ Current ghép/top gần nhất? → matching/reduction
│  ├─ Current loại nhiều top bị dominated? → monotonic stack
│  └─ Chỉ top của kho phụ lấy được? → auxiliary stack
├─ Cũ nhất → Queue
│  ├─ Xử lý một lần theo arrival? → head-index FIFO
│  ├─ Có batch/capacity/time? → queue + boundary state
│  └─ Item chưa xong quay lại? → re-enqueue simulation
└─ Distance/layer nhỏ nhất trước → BFS
   ├─ Tìm shortest? → distance + mark-on-enqueue
   ├─ Đếm component? → seed BFS cho mỗi unvisited state
   └─ Nhiều phase? → chạy lại cùng skeleton với contract mới
```

Sau đó mới hỏi:

```text
Stack/queue chứa value, index hay object?
Pop/dequeue xảy ra trước hay sau condition?
Item được push/enqueue tối đa bao nhiêu lần?
Termination dựa vào stack rỗng, head==length hay bound khác?
```

---

## 2. Concept 1 — Output/reduction stack

### Tín hiệu

```text
xóa cặp liền nhau, rút gọn prefix, chỉ cần so current với kết quả gần nhất
```

### Skeleton

```js
const reduced = [];

for (const current of values) {
  if (reduced.length > 0 && canCancel(reduced.at(-1), current)) {
    reduced.pop();
  } else if (shouldAppend(reduced.at(-1), current)) {
    reduced.push(current);
  }
}
```

### Invariant

`reduced` là kết quả đã rút gọn hoàn toàn của prefix đã đọc.

### Bài

- Không thích số giống nhau: skip current nếu bằng top.
- Xóa cặp liền nhau: bằng top thì pop cả cặp.
- Game gắp thú: basket top bằng doll mới thì pop và cộng 2.

### Bẫy

- Dùng Set làm mất thứ tự và xóa duplicate không liền nhau.
- Chỉ xử lý một cặp rồi không nhận ra cascade; stack tự xử lý cascade qua các vòng tiếp theo.
- Không viết rõ output có đồng thời là state hay không.

---

## 3. Concept 2 — Matching và unfinished state

### Mental model

Stack chứa các việc đã mở nhưng chưa đóng. Closing hiện tại chỉ được khép việc gần nhất.

```js
const stack = [];

for (const token of tokens) {
  if (isOpening(token)) {
    stack.push(token);
  } else {
    if (stack.length === 0 || !matches(stack.pop(), token)) {
      return false;
    }
  }
}

return stack.length === 0;
```

### Invariant

Stack chứa đúng opening chưa match của prefix, theo thứ tự từ cũ đến mới.

### Bài

- Dấu ngoặc đúng.
- Xoay dấu ngoặc.
- Undo/simplify path trong practice nền.

### Bẫy

- Chỉ đếm số opening/closing nhưng không kiểm tra nesting.
- Closing khi stack rỗng.
- Prefix đều hợp lệ nhưng cuối stack chưa rỗng.
- Với nhiều loại ngoặc, pop đúng số lượng nhưng sai loại.

---

## 4. Concept 3 — Monotonic unresolved stack

### Tín hiệu

```text
đầu tiên bên phải, next greater/smaller, thời điểm giảm đầu tiên,
current có thể giải quyết nhiều vị trí trước đó
```

### Skeleton

```js
const answer = Array(values.length).fill(defaultValue);
const unresolvedIndexes = [];

for (let index = 0; index < values.length; index++) {
  while (
    unresolvedIndexes.length > 0 &&
    currentResolvesPrevious(values, index, unresolvedIndexes.at(-1))
  ) {
    const previousIndex = unresolvedIndexes.pop();
    answer[previousIndex] = buildAnswer(previousIndex, index, values);
  }

  unresolvedIndexes.push(index);
}
```

### Invariant

Stack chứa các index chưa có đáp án. Value của chúng monotonic theo condition, vì mọi top bị current thống trị đã bị pop.

### Bài

| Bài | Condition pop | Answer |
| --- | --- | --- |
| Giá cổ phiếu | `currentPrice < topPrice` | khoảng cách |
| Số lớn hơn phía sau | `current > topValue` | current value |
| Tạo số lớn | `topDigit < currentDigit` và còn k | pop để tối ưu subsequence |

### Vì sao `while` vẫn O(n)?

Mỗi index/digit chỉ được push một lần và pop tối đa một lần. Tổng số lần chạy thân `while` qua cả chương trình không vượt số lần push.

### Bẫy

- `if` thay `while` chỉ resolve một top.
- Push value khi cần index/distance.
- Nhầm `<` với `<=` hoặc `>` với `>=`.
- Quên xử lý item còn lại cuối scan.

---

## 5. Concept 4 — Auxiliary physical stack

### Bài đại diện

Hộp hàng.

Đây không phải matching. Contract vật lý nói chỉ hộp đặt sau cùng trên băng phụ được lấy trước.

```text
Main belt: pointer chỉ tăng, đưa hộp theo 1..n.
Auxiliary belt: stack, chỉ top được lấy.
Target order: quyết định cần push thêm hay pop.
```

### Invariant

- Mọi hộp `< nextMainBox` đã nằm trên xe hoặc trong stack.
- Stack giữ đúng các hộp trên băng phụ theo thứ tự đặt.
- Không được tìm/xóa một target nằm dưới top.

### Transfer

- Kho tạm chỉ mở một đầu.
- Rail-yard/shunting.
- Undo log.
- Browser back history.

---

## 6. Concept 5 — FIFO bằng head index

### Skeleton bắt buộc trong JavaScript

```js
const queue = [...initialItems];
let head = 0;

while (head < queue.length) {
  const current = queue[head++];
  process(current);
}
```

### Invariant

Interval `[0, head)` đã xử lý đúng một lần; `[head, queue.length)` đang chờ theo FIFO.

### Bài

- Phát triển tính năng.
- Queue trong Process.
- Xe tải qua cầu.
- Tất cả BFS.

### `shift()` vì sao nguy hiểm?

`shift()` có thể reindex toàn bộ phần còn lại. `n` lần shift trên queue dài có thể thành `O(n²)`. Head index giữ dequeue logic `O(1)`.

### Khi nào cần compact?

Trong bài thi, queue thường sống trong một function và tối đa `O(n)` item nên không cần. Với service chạy lâu, có thể định kỳ cắt phần trước khi `head` rất lớn.

---

## 7. Concept 6 — Batch/capacity/time queue

Queue cơ bản chỉ bảo toàn order. Bài thật thường thêm một boundary.

### Batch boundary

Phát triển tính năng:

```text
Feature đầu batch đặt releaseDay.
Các feature liên tiếp có finishDay <= releaseDay vào cùng batch.
Feature đầu tiên muộn hơn mở batch mới.
```

Queue dynamic theo layer:

```js
const batchSize = queue.length - head;
for (let count = 0; count < batchSize; count++) {
  const current = queue[head++];
  // item sinh mới nằm ở batch kế
}
```

### Capacity/time boundary

Xe tải qua cầu:

```text
Queue state: xe đang trên cầu theo thứ tự vào.
Extra state: currentWeight và exitTime.
Mỗi tick: remove xe hết giờ trước, rồi xét tối đa một xe vào.
```

### Bẫy

- Không chụp batch size trước vòng con.
- Batch theo ngày hoàn thành đã sort thay vì thứ tự feature.
- Xe vào trước khi xe cũ rời cùng thời điểm.
- Chỉ check capacity, quên travel time.

---

## 8. Concept 7 — Re-enqueue scheduling

### Mental model

Dequeue không luôn đồng nghĩa “hoàn tất”. Nếu item chưa đủ điều kiện, nó quay lại tail.

```js
while (head < queue.length) {
  const item = queue[head++];

  if (shouldWait(item, state)) {
    queue.push(item);
  } else {
    commit(item, state);
  }
}
```

### Bài

- Process: còn priority cao hơn thì re-enqueue.
- Round-robin practice: job chưa hết duration thì re-enqueue.
- Hot potato: người sống sót quay lại cuối.

### Câu hỏi termination

Vì `queue.length` tăng, không thể chỉ nói “head sẽ tới length”. Phải chứng minh mỗi vòng quay làm giảm một đại lượng:

- một process priority cao được thực thi;
- remaining duration giảm;
- số người giảm sau mỗi vòng.

---

## 9. Concept 8 — Hai queue và invariant bảo toàn

### Bài đại diện

Làm hai queue có tổng bằng nhau.

Không cần tạo/xóa array liên tục. Ghép hai queue thành một array vòng; queue1 hiện tại là interval `[left,right)`.

```text
sum1 < target → lấy đầu queue2, mở right.
sum1 > target → lấy đầu queue1, tăng left.
sum1 = target → đáp án.
```

### Invariant

- Tổng hai queue luôn bằng `total`.
- `currentSum` đúng bằng tổng interval queue1.
- Pointer chỉ tiến, nên cần bound để chứng minh không lặp vô hạn.

### Bẫy

- Tổng lẻ nhưng vẫn mô phỏng.
- Dùng `shift/push` vật lý.
- Không có impossibility bound.
- Quên rằng value dương cho phép quyết định tăng/giảm theo sum.

---

## 10. Concept 9 — BFS shortest/layer queue

### Algorithm owner và helper

```text
Algorithm owner: BFS bảo đảm state có distance nhỏ được mở rộng trước.
State helper: queue giữ frontier FIFO; distance/visited chống enqueue lại.
```

### Skeleton

```js
const queue = [start];
let head = 0;
distance[start] = 0;

while (head < queue.length) {
  const current = queue[head++];

  for (const next of neighbors(current)) {
    if (!isValid(next) || distance[next] !== -1) continue;

    distance[next] = distance[current] + 1; // mark khi enqueue
    queue.push(next);
  }
}
```

### Invariant

1. Distance trong queue không giảm.
2. Mỗi state enqueue tối đa một lần.
3. Distance được gán lần đầu là shortest trong graph không trọng số.

### Bài

- Đường ngắn nhất game map.
- Biến đổi từ.
- Nhặt vật phẩm.
- Node xa nhất.
- Thoát mê cung.
- Biến đổi số.

### Bẫy

- Mark visited khi dequeue.
- Dùng DFS rồi tin đường đầu tiên là shortest.
- State key thiếu thông tin phụ.
- Không bound implicit graph.
- Graph có trọng số nhưng vẫn BFS thường.

---

## 11. Concept 10 — Component và multi-phase BFS

### Component BFS

```js
for (const state of allStates) {
  if (visited[state]) continue;
  componentCount++;
  bfsMarkWholeComponent(state);
}
```

Bài:

- Network: mỗi seed chưa visited là một network.
- Ghép puzzle: mỗi BFS trả danh sách cell của một shape.
- Khai thác dầu: mỗi BFS trả size và Set cột chạm.

### Multi-phase BFS

Thoát mê cung có hai contract độc lập:

```text
distance(S, L) + distance(L, E)
```

Visited của chặng một không được dùng lại cho chặng hai. Tái sử dụng **function BFS**, không tái sử dụng state mutable của một lần chạy.

### Component contribution

Khai thác dầu không BFS theo từng cột. BFS component một lần, rồi phân phối `componentSize` tới mọi cột nó chạm.

```text
Owner: BFS xác định component.
Helper: Set dedupe cột.
Post-process: contribution theo cột.
```

---

## 12. Bảng ánh xạ 22 bài

| ID | Bài | Concept chính | Concept phụ |
| --- | --- | --- | --- |
| SQ-P01 | Không thích số giống nhau | reduction/output stack | run compression |
| SQ-P02 | Phát triển tính năng | batch queue | finish-day transform |
| SQ-P03 | Dấu ngoặc đúng | matching stack | prefix validity |
| SQ-P04 | Process | re-enqueue scheduling | priority frequency |
| SQ-P05 | Xe tải qua cầu | capacity/time queue | running weight |
| SQ-P06 | Giá cổ phiếu | monotonic stack | unresolved duration |
| SQ-P07 | Tạo số lớn | monotonic stack | greedy deletion |
| SQ-P08 | Game gắp thú | reduction stack | column pointers |
| SQ-P09 | Xóa cặp | reduction stack | cancellation |
| SQ-P10 | Xoay ngoặc | matching stack | rotation |
| SQ-P11 | Hộp hàng | auxiliary stack | main pointer |
| SQ-P12 | Hai queue bằng tổng | two queues | conservation/two pointers |
| SQ-P13 | Số lớn hơn phía sau | monotonic stack | next greater |
| SQ-B01 | Game map | shortest BFS | grid bounds |
| SQ-B02 | Network | component BFS | adjacency matrix |
| SQ-B03 | Biến đổi từ | shortest BFS | implicit graph |
| SQ-B04 | Nhặt vật phẩm | shortest BFS | coordinate scaling |
| SQ-B05 | Ghép puzzle | component BFS | canonical Map |
| SQ-B06 | Node xa nhất | shortest BFS | adjacency list |
| SQ-B07 | Thoát mê cung | multi-phase BFS | two contracts |
| SQ-B08 | Biến đổi số | shortest BFS | numeric bound |
| SQ-C01 | Khai thác dầu | component BFS | Set contribution |

## 13. Invariant phải thuộc

1. **Reduction stack:** stack là kết quả rút gọn của prefix.
2. **Matching stack:** stack là opening chưa khép.
3. **Monotonic stack:** stack là index unresolved và monotonic theo value.
4. **Head queue:** `[0,head)` processed; `[head,length)` pending.
5. **Batch queue:** boundary chụp trước vòng con.
6. **Time queue:** extra aggregate đúng với item đang pending.
7. **BFS queue:** distance không giảm; mark khi enqueue.
8. **Component scan:** mỗi state thuộc đúng một BFS component.

## 14. Recall set 10 bài

1. Không thích số giống nhau — output stack.
2. Dấu ngoặc đúng — matching.
3. Giá cổ phiếu — monotonic stack.
4. Hộp hàng — physical stack.
5. Phát triển tính năng — batch queue.
6. Process — re-enqueue.
7. Xe tải qua cầu — time/capacity.
8. Hai queue bằng tổng — conservation.
9. Game map — shortest BFS.
10. Khai thác dầu — component contribution.

Sau mỗi bài, viết bốn dòng:

```text
Order cần bảo toàn:
Stack/queue chứa gì:
Invariant:
Push/pop/enqueue/dequeue condition:
```

Nếu tự dựng được 10 bài này, 12 bài còn lại chủ yếu là thay contract hoặc ghép thêm graph/Map/Set.
