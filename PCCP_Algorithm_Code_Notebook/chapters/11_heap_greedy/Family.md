# HEAP & PRIORITY QUEUE PATTERN HANDBOOK

> JavaScript · PCCP · Từ nhận diện đề đến dựng code

---

## 0. Phạm vi của tài liệu

Tài liệu này bao phủ các **họ bài Heap/Priority Queue chuẩn** thường gặp trong coding test và những biến thể có giá trị cho PCCP.

Không nên hiểu là:

```text
Mọi bài Heap trong tương lai chắc chắn nằm nguyên xi trong file.
```

Nên hiểu là:

```text
Gặp bài mới
→ nhận ra nó thuộc họ nào
→ lấy skeleton của họ đó
→ thay state, comparator và điều kiện theo đề.
```

Mức ưu tiên:

- **CORE**: phải tự viết và áp dụng được.
- **TRANSFER**: phải hiểu skeleton và sửa được cho bài mới.
- **AWARENESS**: biết tồn tại, học sâu sau nếu còn thời gian.

---

# 1. Heap sinh ra để giải quyết việc gì?

> Heap là cái máy quản lý một tập ứng viên luôn thay đổi và mỗi lần trả ra ứng viên tốt nhất theo quy tắc mình cài đặt.

```text
push(value) → đưa ứng viên vào máy
peek()      → xem ứng viên tốt nhất, không xóa
pop()       → lấy và xóa ứng viên tốt nhất
compare     → định nghĩa “tốt nhất” là gì
```

## 1.1 Dấu hiệu nhận diện

```text
Dữ liệu liên tục được thêm/xóa
+
Mỗi lượt cần lấy min/max/ứng viên ưu tiên nhất
=
Nghĩ đến Heap
```

Không nhất thiết dùng Heap khi:

- Chỉ cần tìm min/max đúng một lần: quét mảng.
- Dữ liệu cố định và cần toàn bộ thứ tự: sort một lần.
- Xử lý đúng thứ tự đến trước: queue.
- Chỉ cần membership/lookup: Set/Map.

## 1.2 Complexity

| Thao tác | Complexity |
|---|---:|
| `peek()` | `O(1)` |
| `push()` | `O(log n)` |
| `pop()` | `O(log n)` |
| Push lần lượt `n` phần tử | `O(n log n)` |
| Bộ nhớ | `O(n)` |

---

# 2. Binary Heap được lưu trong Array

Với node ở `index`:

```js
const parentIndex = Math.floor((index - 1) / 2);
const leftIndex = index * 2 + 1;
const rightIndex = index * 2 + 2;
```

Min-heap chỉ đảm bảo:

```text
Mỗi cha <= các con trực tiếp.
```

Max-heap chỉ đảm bảo:

```text
Mỗi cha >= các con trực tiếp.
```

Heap **không phải mảng được sort hoàn chỉnh**. Nó chỉ đảm bảo phần tử ưu tiên nhất nằm ở index `0`.

---

# 3. Template Heap dùng lại cho các bài

```js
class Heap {
  constructor(compare) {
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
    [this.heap[i], this.heap[j]] =
      [this.heap[j], this.heap[i]];
  }

  push(value) {
    this.heap.push(value);

    let index = this.heap.length - 1;

    while (index > 0) {
      const parentIndex =
        Math.floor((index - 1) / 2);

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
    if (this.heap.length === 0) {
      return undefined;
    }

    if (this.heap.length === 1) {
      return this.heap.pop();
    }

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

      if (bestIndex === index) {
        break;
      }

      this.swap(index, bestIndex);
      index = bestIndex;
    }

    return top;
  }
}
```

## 3.1 Hai câu thần chú

```text
PUSH:
CUỐI → CHA → KHÔNG TỐT HƠN THÌ DỪNG
→ TỐT HƠN THÌ ĐỔI → ĐI LÊN

POP:
GIỮ GỐC → CUỐI THẾ GỐC
→ CHỌN TỐT NHẤT TRONG CHA/TRÁI/PHẢI
→ ĐỔI → ĐI XUỐNG → TRẢ GỐC CŨ
```

## 3.2 Contract của comparator

```text
compare(a, b) < 0
→ a có ưu tiên cao hơn b
→ a nên nằm phía trên b.
```

```js
// Min-heap số
const minHeap = new Heap((a, b) => a - b);

// Max-heap số
const maxHeap = new Heap((a, b) => b - a);
```

## 3.3 Comparator nhiều khóa

Quy tắc đề:

```text
Ưu tiên theo A.
Nếu A bằng nhau, ưu tiên theo B.
Nếu B cũng bằng nhau, ưu tiên theo C.
```

Code:

```js
const heap = new Heap((a, b) => {
  if (a.A !== b.A) {
    return a.A - b.A;
  }

  if (a.B !== b.B) {
    return a.B - b.B;
  }

  return a.C - b.C;
});
```

Nếu khóa nào ưu tiên số lớn hơn, đảo phép trừ ở đúng khóa đó:

```js
return b.score - a.score;
```

---

# 4. Checklist giải mọi bài Heap

Trước khi code, trả lời sáu câu:

```text
1. HEAP CHỨA GÌ?
2. AI ĐƯỢC PUSH?
3. AI TỐT NHẤT?
4. KHI NÀO POP?
5. POP XONG CẬP NHẬT GÌ?
6. DỪNG/THẤT BẠI KHI NÀO?
```

Invariant tổng quát:

> Heap chứa toàn bộ ứng viên hiện đang hợp lệ nhưng chưa được xử lý; `peek()` là ứng viên phải được chọn tiếp theo.

---

# 5. Pattern 1 — Repeated Extract / Transform / Reinsert

**Mức: CORE**

## 5.1 Dấu hiệu

```text
Lặp lại:
→ lấy một hoặc vài phần tử tốt nhất
→ tạo kết quả mới
→ đưa kết quả trở lại tập dữ liệu.
```

Ví dụ:

- Trộn hai món ít cay nhất.
- Ghép hai sợi dây có độ dài nhỏ nhất.
- Huffman coding / optimal merge cost.

## 5.2 Skeleton

```js
const heap = new Heap((a, b) => a - b);

for (const value of values) {
  heap.push(value);
}

let answer = 0;

while (chưaĐạtMụcTiêu) {
  if (heap.size < sốPhầnTửCầnLấy) {
    return -1;
  }

  const first = heap.pop();
  const second = heap.pop();

  const combined = combine(first, second);

  heap.push(combined);
  answer++;
}

return answer;
```

## 5.3 Bài Cay hơn

```js
function solution(scoville, K) {
  const heap = new Heap((a, b) => a - b);

  for (const value of scoville) {
    heap.push(value);
  }

  let count = 0;

  while (heap.peek() < K) {
    if (heap.size < 2) {
      return -1;
    }

    const first = heap.pop();
    const second = heap.pop();
    const mixed = first + second * 2;

    heap.push(mixed);
    count++;
  }

  return count;
}
```

## 5.4 Bẫy

- `count` là số lần biến đổi, không phải số phần tử.
- Kết quả mới vẫn tồn tại nên thường phải `push()` lại.
- Kiểm tra đủ phần tử trước khi pop.
- Không sort lại toàn bộ mảng sau mỗi vòng.

---

# 6. Pattern 2 — Streaming Top K

**Mức: CORE / TRANSFER**

## 6.1 Mục tiêu

Giữ lại `k` phần tử tốt nhất trong một luồng dữ liệu.

Muốn giữ `k` số lớn nhất:

```text
Dùng Min-heap kích thước k.
Gốc là phần tử nhỏ nhất trong nhóm đang giữ.
Nếu có quá k phần tử, pop phần tử nhỏ nhất.
```

## 6.2 Skeleton giữ K số lớn nhất

```js
function topKLargest(values, k) {
  const heap = new Heap((a, b) => a - b);

  for (const value of values) {
    heap.push(value);

    if (heap.size > k) {
      heap.pop();
    }
  }

  return heap.heap;
}
```

## 6.3 Quy tắc đối xứng

```text
Giữ K số lớn nhất → Min-heap size K.
Giữ K số nhỏ nhất → Max-heap size K.
```

Heap giữ phần tử **tệ nhất trong nhóm đang chọn ở gốc**, để khi nhóm vượt quá `k`, ta loại nó nhanh nhất.

---

# 7. Pattern 3 — Greedy + Top K / Quyết định lại quá khứ

**Mức: TRANSFER**

## 7.1 Dấu hiệu

```text
Đi qua dữ liệu theo thứ tự cố định.
Có k quyền miễn phí / k lựa chọn đặc biệt.
Muốn dành quyền đó cho k phần tử có lợi nhất đã gặp.
```

Ví dụ: Defense Game.

## 7.2 Invariant

> Heap luôn chứa `k` round lớn nhất đã gặp, tức các round đang được chọn để sử dụng vé bất tử.

## 7.3 Skeleton

```js
function survive(resource, k, costs) {
  const protectedHeap =
    new Heap((a, b) => a - b);

  for (let i = 0; i < costs.length; i++) {
    protectedHeap.push(costs[i]);

    if (protectedHeap.size > k) {
      resource -= protectedHeap.pop();
    }

    if (resource < 0) {
      return i;
    }
  }

  return costs.length;
}
```

## 7.4 Tư duy

```text
Tạm coi round mới là được miễn phí.
Nếu đã dùng quá k vé:
→ trong các round đang miễn phí, lấy round nhỏ nhất ra
→ trả round nhỏ nhất bằng tài nguyên.
```

Đây là greedy “sửa lại lựa chọn quá khứ” nhờ Heap.

---

# 8. Pattern 4 — Event + Priority Queue

**Mức: CORE / TRANSFER**

## 8.1 Dấu hiệu

```text
Event đi vào theo thứ tự A
nhưng được xử lý theo thứ tự ưu tiên B.
```

Ví dụ:

- Job đến theo `request`, xử lý theo `duration`.
- Khách đến theo thời gian, phục vụ theo mức ưu tiên.
- Program được gọi theo thời gian, chạy theo score.

## 8.2 Hai cấu trúc, hai nhiệm vụ

```text
Mảng đã sort = cửa vào / lịch event.
Heap = phòng chờ ưu tiên.
```

| Cấu trúc | Trả lời câu hỏi |
|---|---|
| Mảng sort + `nextIndex` | Event tiếp theo đã đến chưa? |
| Heap | Trong các event đã đến, ai được xử lý tiếp? |

## 8.3 State chuẩn

```text
currentTime      → bây giờ là lúc nào?
nextIndex        → event chưa vào Heap tiếp theo là ai?
heap             → event nào đang chờ?
completedCount   → đã xử lý xong bao nhiêu?
answer           → kết quả đang tích lũy bao nhiêu?
```

## 8.4 Skeleton tổng quát

```js
events.sort((a, b) => a.time - b.time);

const heap = new Heap(priorityComparator);

let currentTime = 0;
let nextIndex = 0;
let completedCount = 0;
let answer = 0;

while (completedCount < events.length) {
  // Nhận tất cả event đã đến
  while (
    nextIndex < events.length &&
    events[nextIndex].time <= currentTime
  ) {
    heap.push(events[nextIndex]);
    nextIndex++;
  }

  // Không có event để xử lý: nhảy thời gian
  if (heap.size === 0) {
    currentTime = events[nextIndex].time;
    continue;
  }

  // Chọn event ưu tiên nhất
  const event = heap.pop();

  // Cập nhật theo contract của đề
  currentTime += event.duration;
  answer += updateAnswer(event, currentTime);
  completedCount++;
}

return finalize(answer);
```

## 8.5 Vì sao có hai vòng lặp?

```text
Vòng ngoài → xử lý từng event.
Vòng trong → trước khi chọn, nhận tất cả event đã đến.
```

Nếu chỉ push một event, Heap có thể chọn sai vì một event ưu tiên cao hơn cũng đã đến nhưng chưa được đưa vào phòng chờ.

## 8.6 Bộ điều khiển đĩa

```js
function solution(jobs) {
  const orderedJobs = jobs
    .map(([request, duration], index) => ({
      request,
      duration,
      index,
    }))
    .sort((a, b) => a.request - b.request);

  const heap = new Heap((a, b) => {
    if (a.duration !== b.duration) {
      return a.duration - b.duration;
    }

    if (a.request !== b.request) {
      return a.request - b.request;
    }

    return a.index - b.index;
  });

  let currentTime = 0;
  let nextIndex = 0;
  let completedCount = 0;
  let totalTurnaround = 0;

  while (completedCount < orderedJobs.length) {
    while (
      nextIndex < orderedJobs.length &&
      orderedJobs[nextIndex].request <= currentTime
    ) {
      heap.push(orderedJobs[nextIndex]);
      nextIndex++;
    }

    if (heap.size === 0) {
      currentTime =
        orderedJobs[nextIndex].request;
      continue;
    }

    const job = heap.pop();

    currentTime += job.duration;
    totalTurnaround +=
      currentTime - job.request;
    completedCount++;
  }

  return Math.floor(
    totalTurnaround / jobs.length
  );
}
```

## 8.7 Những chỗ thường biến đổi

| Thành phần | Biến thể |
|---|---|
| Điều kiện vào Heap | `request <= time`, `start <= time`, `level <= currentLevel` |
| Comparator | duration, score, deadline, priority, nhiều tie-break |
| Khi Heap rỗng | nhảy time, dừng, return thất bại |
| Update time | cộng duration, lấy max, lấy end time |
| Update answer | turnaround, waiting time, số job, cost |

## 8.8 Bẫy

- Push tất cả job ngay từ đầu dù chúng chưa đến.
- Pop trước khi push hết event đã đến.
- Quên nhảy thời gian khi Heap rỗng.
- `currentTime++` thay vì cộng đúng `duration`.
- Nhầm waiting time với turnaround time.
- Comparator thiếu tie-break theo đề.

---

# 9. Pattern 5 — Nhiều máy / phòng / tài nguyên

**Mức: TRANSFER**

## 9.1 Dấu hiệu

```text
Có nhiều tài nguyên hoạt động song song.
Mỗi lượt cần biết tài nguyên nào rảnh sớm nhất.
```

Ví dụ:

- Số phòng họp tối thiểu.
- Phân job cho server/máy.
- Nhân viên nào sẵn sàng tiếp theo.

## 9.2 Heap chứa gì?

Thông thường Heap chứa:

```text
thời điểm kết thúc / thời điểm rảnh của tài nguyên.
```

Comparator:

```js
const endTimeHeap =
  new Heap((a, b) => a - b);
```

## 9.3 Skeleton phòng họp

```js
intervals.sort((a, b) => a.start - b.start);

const endTimes = new Heap((a, b) => a - b);

for (const interval of intervals) {
  if (
    endTimes.size > 0 &&
    endTimes.peek() <= interval.start
  ) {
    endTimes.pop();
  }

  endTimes.push(interval.end);
}

return endTimes.size;
```

Nếu một thời điểm có thể giải phóng nhiều tài nguyên, dùng `while` thay `if` theo contract bài.

---

# 10. Pattern 6 — Active Set / Expire Event

**Mức: TRANSFER / AWARENESS**

## 10.1 Dấu hiệu

```text
Event bắt đầu được thêm vào.
Sau một thời điểm, event hết hiệu lực và phải bị loại.
Luôn cần biết event hết hạn sớm nhất.
```

Heap thường chứa `endTime`:

```js
const active = new Heap(
  (a, b) => a.end - b.end
);
```

Skeleton:

```js
events.sort((a, b) => a.start - b.start);

for (const event of events) {
  while (
    active.size > 0 &&
    active.peek().end <= event.start
  ) {
    active.pop();
  }

  active.push(event);

  answer = Math.max(answer, active.size);
}
```

Ứng dụng:

- Số event chồng nhau lớn nhất.
- Số tài nguyên đồng thời cần dùng.
- Sweep line theo start/end.

---

# 11. Pattern 7 — K-way Merge

**Mức: TRANSFER**

## 11.1 Dấu hiệu

```text
Có nhiều dãy đã được sort.
Cần trộn thành một dãy sort hoặc lấy phần tử nhỏ thứ k.
```

Heap không chứa toàn bộ dữ liệu. Nó chỉ chứa phần tử đầu hiện tại của mỗi dãy.

## 11.2 State của phần tử Heap

```js
{
  value,
  listIndex,
  elementIndex,
}
```

## 11.3 Skeleton

```js
const heap = new Heap(
  (a, b) => a.value - b.value
);

for (let listIndex = 0;
  listIndex < lists.length;
  listIndex++) {
  if (lists[listIndex].length > 0) {
    heap.push({
      value: lists[listIndex][0],
      listIndex,
      elementIndex: 0,
    });
  }
}

const result = [];

while (heap.size > 0) {
  const current = heap.pop();
  result.push(current.value);

  const nextElementIndex =
    current.elementIndex + 1;

  if (
    nextElementIndex <
    lists[current.listIndex].length
  ) {
    heap.push({
      value:
        lists[current.listIndex][nextElementIndex],
      listIndex: current.listIndex,
      elementIndex: nextElementIndex,
    });
  }
}

return result;
```

Invariant:

> Heap chứa ứng viên nhỏ nhất chưa lấy của mỗi dãy.

---

# 12. Pattern 8 — Dijkstra / Best-first Search

**Mức: TRANSFER, học cùng Graph**

## 12.1 Dấu hiệu

```text
Có nhiều state đang chờ mở rộng.
Luôn cần mở state có cost nhỏ nhất hiện tại.
```

Heap chứa:

```js
{ node, cost }
```

Comparator:

```js
const heap = new Heap(
  (a, b) => a.cost - b.cost
);
```

## 12.2 Skeleton Dijkstra

```js
function dijkstra(graph, start) {
  const distance = Array(graph.length)
    .fill(Infinity);

  const heap = new Heap(
    (a, b) => a.cost - b.cost
  );

  distance[start] = 0;
  heap.push({ node: start, cost: 0 });

  while (heap.size > 0) {
    const current = heap.pop();

    if (
      current.cost !== distance[current.node]
    ) {
      continue;
    }

    for (const edge of graph[current.node]) {
      const nextCost =
        current.cost + edge.weight;

      if (nextCost < distance[edge.to]) {
        distance[edge.to] = nextCost;

        heap.push({
          node: edge.to,
          cost: nextCost,
        });
      }
    }
  }

  return distance;
}
```

## 12.3 Stale entry

Một node có thể được push nhiều lần với các cost khác nhau. Khi pop một entry cũ:

```js
if (current.cost !== distance[current.node]) {
  continue;
}
```

Đây là lazy deletion đơn giản: không xóa entry cũ giữa Heap, chỉ bỏ qua khi nó lên gốc.

---

# 13. Pattern 9 — Prim / Minimum Spanning Tree

**Mức: AWARENESS, học cùng Graph**

Heap chứa cạnh có thể nối từ cây hiện tại sang node chưa thăm:

```js
{ to, cost }
```

Mỗi lượt:

```text
pop cạnh rẻ nhất
→ nếu node đã thăm thì bỏ qua
→ nếu chưa, thêm node vào cây
→ push các cạnh mới.
```

Skeleton tư duy gần Dijkstra, nhưng invariant khác:

- Dijkstra tối ưu khoảng cách từ nguồn.
- Prim tối ưu tổng trọng số nối toàn bộ cây.

---

# 14. Pattern 10 — Frequency Greedy

**Mức: TRANSFER / AWARENESS**

## 14.1 Dấu hiệu

```text
Mỗi lượt cần lấy phần tử còn tần suất lớn nhất.
Sau khi dùng, tần suất giảm rồi có thể push lại.
```

Ví dụ:

- Sắp xếp lại chuỗi để ký tự giống nhau không đứng cạnh nhau.
- Chọn task có frequency cao nhất.
- Scheduling có cooldown.

Heap chứa:

```js
{ value, count }
```

Comparator:

```js
const heap = new Heap(
  (a, b) => b.count - a.count
);
```

Nhịp:

```text
pop frequency lớn nhất
→ sử dụng
→ count--
→ nếu còn, push lại khi hợp lệ.
```

Nếu có cooldown, thường kết hợp Heap với Queue/Event time.

---

# 15. Pattern 11 — Deadline Scheduling

**Mức: TRANSFER / AWARENESS**

Một họ phổ biến:

```text
Sort theo deadline.
Tạm nhận tất cả job.
Nếu tổng thời gian vượt deadline:
→ loại job tốn thời gian lớn nhất.
```

Dùng Max-heap theo duration:

```js
jobs.sort((a, b) => a.deadline - b.deadline);

const selected = new Heap(
  (a, b) => b.duration - a.duration
);

let totalTime = 0;

for (const job of jobs) {
  selected.push(job);
  totalTime += job.duration;

  if (totalTime > job.deadline) {
    const removed = selected.pop();
    totalTime -= removed.duration;
  }
}

return selected.size;
```

Tư duy giống Top K nhưng giới hạn là deadline/tổng tài nguyên, không phải kích thước cố định.

---

# 16. Pattern 12 — Running Median bằng Hai Heap

**Mức: AWARENESS**

Mục tiêu:

```text
Dữ liệu đến liên tục.
Sau mỗi lần thêm, cần median hiện tại.
```

Dùng:

```text
Max-heap `lower` giữ nửa nhỏ.
Min-heap `upper` giữ nửa lớn.
```

Invariant:

```text
Mọi phần tử lower <= mọi phần tử upper.
Chênh lệch size không quá 1.
```

Median nằm ở gốc một hoặc hai Heap.

Đây là dạng nâng cao; chỉ học sâu khi roadmap yêu cầu.

---

# 17. Pattern 13 — Double-ended Priority Queue

**Mức: AWARENESS**

Yêu cầu:

```text
Lấy/xóa cả min và max nhiều lần.
```

Một Binary Heap đơn không hỗ trợ tốt cả hai đầu.

Cách phổ biến:

```text
Min-heap
+ Max-heap
+ Map đếm phần tử còn hợp lệ
+ lazy deletion.
```

Mỗi giá trị được push vào cả hai Heap. Khi xóa ở một Heap, cập nhật `Map`; khi gốc của Heap kia đã hết hiệu lực, pop bỏ.

Không dùng template đơn một cách máy móc cho dạng này.

---

# 18. Pattern 14 — Lazy Deletion / Stale State

**Mức: AWARENESS / TRANSFER**

## 18.1 Khi nào cần?

- Heap không hỗ trợ xóa phần tử bất kỳ.
- Một state được cập nhật bằng cách push phiên bản mới.
- Phiên bản cũ vẫn còn trong Heap.

## 18.2 Skeleton

```js
while (heap.size > 0) {
  const top = heap.peek();

  if (isValid(top)) {
    break;
  }

  heap.pop();
}
```

Hoặc sau khi pop:

```js
const current = heap.pop();

if (!isValid(current)) {
  continue;
}
```

Ứng dụng:

- Dijkstra.
- Double Priority Queue.
- Task bị hủy/cập nhật priority.
- Sliding window dùng Heap.

---

# 19. Sliding Window + Heap

**Mức: AWARENESS**

Mục tiêu:

```text
Tìm max/min trong mỗi cửa sổ đang trượt.
```

Heap có thể dùng index để nhận biết phần tử đã ra khỏi cửa sổ:

```js
const heap = new Heap(
  (a, b) => b.value - a.value
);

for (let right = 0; right < values.length; right++) {
  heap.push({
    value: values[right],
    index: right,
  });

  const left = right - windowSize + 1;

  while (
    heap.size > 0 &&
    heap.peek().index < left
  ) {
    heap.pop();
  }

  if (left >= 0) {
    answer.push(heap.peek().value);
  }
}
```

Tuy nhiên, monotonic deque thường tối ưu hơn với `O(n)` cho sliding-window max/min.

---

# 20. Bảng chọn Heap nhanh

| Đề cần | Cấu trúc nên nghĩ |
|---|---|
| Liên tục lấy min | Min-heap |
| Liên tục lấy max | Max-heap |
| Giữ K số lớn nhất | Min-heap size K |
| Giữ K số nhỏ nhất | Max-heap size K |
| Event vào theo time, xử lý theo priority | Sort + pointer + Heap |
| Tài nguyên rảnh sớm nhất | Min-heap end time |
| Nhiều dãy đã sort | K-way merge Min-heap |
| State cost nhỏ nhất | Dijkstra / Min-heap |
| Frequency lớn nhất | Max-heap count |
| Cả min và max | Hai Heap + lazy deletion |
| Median động | Max-heap + Min-heap |
| Max/min cửa sổ | Deque ưu tiên; Heap + lazy nếu phù hợp |

---

# 21. Ma trận biến thể: bài mới thường đổi cái gì?

Khi gặp bài mới, không tìm một template mới hoàn toàn. Kiểm tra sáu trục:

| Trục | Câu hỏi |
|---|---|
| Item | Heap chứa number, object, event hay state? |
| Eligibility | Khi nào item được phép push? |
| Priority | Comparator chính và tie-break là gì? |
| Extraction | Mỗi lượt pop một hay nhiều phần tử? |
| Transition | Pop xong time/cost/count/state đổi thế nào? |
| Termination | Thành công/thất bại/hết dữ liệu khi nào? |

Đây là chỗ đề tạo biến thể. `push()` và `pop()` của class thường không đổi.

---

# 22. Những lỗi JavaScript hay gặp

## 22.1 Nhầm value và index

```js
this.swap(index, parentIndex); // đúng
```

Không truyền giá trị:

```js
this.swap(
  this.heap[index],
  this.heap[parentIndex]
); // sai
```

## 22.2 Nhầm dấu comparator

```text
compare(a, b) < 0
→ a tốt hơn b.
```

## 22.3 Sai ngoặc

```js
this.compare(a, b) < 0 // đúng
this.compare(a, b < 0) // sai
```

## 22.4 Quên cập nhật index

```js
// Bubble-up
index = parentIndex;

// Bubble-down
index = bestIndex;
```

## 22.5 Không check child tồn tại

```js
leftIndex < this.heap.length
rightIndex < this.heap.length
```

Không dùng:

```js
if (this.heap[leftIndex])
```

vì giá trị `0` là hợp lệ nhưng falsy.

## 22.6 Quên edge cases của pop

```js
if (this.heap.length === 0) {
  return undefined;
}

if (this.heap.length === 1) {
  return this.heap.pop();
}
```

## 22.7 Event + Heap bị infinite loop

Khi Heap rỗng và event tiếp theo chưa đến, phải nhảy `currentTime`. Nếu state không thay đổi, vòng `while` sẽ chạy mãi.

## 22.8 Push tất cả event quá sớm

Chỉ push item đã hợp lệ theo thời gian/điều kiện. Không cho Heap chọn một ứng viên chưa được phép xuất hiện.

---

# 23. Test tối thiểu cho template Heap

## 23.1 Min-heap

```js
const minHeap = new Heap((a, b) => a - b);

[7, 4, 9, 2, 6, 8, 5].forEach(
  value => minHeap.push(value)
);

console.log(minHeap.peek()); // 2
console.log(minHeap.pop());  // 2
console.log(minHeap.peek()); // 4
```

## 23.2 Max-heap

```js
const maxHeap = new Heap((a, b) => b - a);

[7, 4, 9, 2].forEach(
  value => maxHeap.push(value)
);

console.log(maxHeap.peek()); // 9
console.log(maxHeap.pop());  // 9
console.log(maxHeap.peek()); // 7
```

## 23.3 Object + tie-break

```js
const jobs = new Heap((a, b) => {
  if (a.duration !== b.duration) {
    return a.duration - b.duration;
  }

  if (a.request !== b.request) {
    return a.request - b.request;
  }

  return a.index - b.index;
});
```

---

# 24. Roadmap học Heap cho PCCP

## Phải tự viết

```text
1. Generic Heap class.
2. Min/Max comparator.
3. Comparator nhiều khóa.
4. Repeated extract/transform/reinsert.
5. Event + Heap skeleton.
6. Top K skeleton.
```

## Phải nhận diện và sửa được

```text
1. Nhiều tài nguyên / end-time Heap.
2. Active interval / expire event.
3. K-way merge.
4. Dijkstra stale state.
5. Frequency greedy.
6. Deadline scheduling.
```

## Biết tồn tại, học sau

```text
1. Running median bằng hai Heap.
2. Double-ended Priority Queue.
3. Lazy deletion phức tạp.
4. Sliding Window + Heap.
5. Arbitrary deletion / priority update.
```

---

# 25. Bài luyện tối thiểu

## CORE

1. Cay hơn — repeated extract/transform/reinsert.
2. Bộ điều khiển đĩa — event + priority queue.
3. Defense Game — Top K / sửa quyết định quá khứ.

## TRANSFER

4. Một bài phòng họp hoặc tài nguyên rảnh sớm nhất.
5. Một bài Dijkstra cơ bản.
6. Một bài K-way merge hoặc frequency max-heap.

Không cần làm hàng chục bài giống hệt nhau. Mỗi họ cần:

```text
1 bài học có hướng dẫn
→ 1 lần viết lại không nhìn
→ 1 bài biến thể để kiểm tra transfer.
```

---

# 26. Active Recall để nhớ template

## Lịch ôn

```text
Sau 20–30 phút
→ viết lại push/pop không nhìn.

Ngày hôm sau
→ dựng cả class + test Min/Max.

Sau 3 ngày
→ dựng class + một solution Heap.

Sau 7 ngày
→ dựng Event + Heap skeleton.

Trước kỳ thi
→ viết template sạch trong 6–8 phút.
```

## Tiêu chuẩn “đã thành thạo”

```text
1. Viết class Heap không nhìn.
2. Test đúng Min-heap và Max-heap.
3. Giải thích được comparator âm nghĩa là gì.
4. Trả lời được sáu câu Heap cho bài mới.
5. Nhận ra ít nhất ba họ:
   repeated, Top K, event + Heap.
6. Dựng skeleton phù hợp mà không cần xem lời giải nguyên xi.
```

---

# 27. Cheat Sheet một màn hình

```text
HEAP = tập ứng viên thay đổi
     + luôn cần ứng viên tốt nhất.

COMPARE(a, b) < 0
→ a tốt hơn b.

MIN: (a, b) => a - b
MAX: (a, b) => b - a

6 CÂU:
1. Heap chứa gì?
2. Ai được push?
3. Ai tốt nhất?
4. Khi nào pop?
5. Pop xong cập nhật gì?
6. Dừng/thất bại khi nào?

PUSH:
CUỐI → CHA → ĐỔI → LÊN

POP:
GIỮ GỐC → CUỐI THẾ GỐC
→ CHỌN TỐT NHẤT → ĐỔI → XUỐNG

REPEATED:
POP → BIẾN ĐỔI → PUSH LẠI

TOP K:
PUSH → SIZE > K → POP PHẦN TỬ TỆ NHẤT

EVENT + HEAP:
SORT EVENT
→ PUSH TẤT CẢ EVENT ĐÃ ĐẾN
→ RỖNG THÌ NHẢY TIME
→ POP BEST
→ UPDATE STATE

DIJKSTRA:
POP COST NHỎ NHẤT
→ BỎ STALE
→ RELAX
→ PUSH COST MỚI
```

---

# 28. Kết luận

Không học Heap bằng cách ghi nhớ tên bài. Học bằng cách nhận ra:

```text
Ứng viên nào đang hợp lệ?
Ai có priority cao nhất?
Khi nào tập ứng viên thay đổi?
Sau khi lấy best, state chuyển thế nào?
```

Class Heap là máy. Comparator là luật ưu tiên. Skeleton của từng họ là cách vận hành máy trong câu chuyện của đề.

