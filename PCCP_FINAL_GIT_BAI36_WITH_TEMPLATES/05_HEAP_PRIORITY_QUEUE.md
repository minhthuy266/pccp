# PCCP FINAL RECALL — Heap / Priority Queue

> Repeated current-min operations and event scheduling with available-job heap.

## Bài trong file

- Bài 20 — 더 맵게 (Trộn đồ cay hơn)
- Bài 21 — 디스크 컨트롤러 (Disk Controller)

---
# Bài 20 — 더 맵게 (Trộn đồ cay hơn)

🔗 **Đề chính thức (Programmers):** https://school.programmers.co.kr/learn/courses/30/lessons/42626

**Pattern:** Min-Heap / Priority Queue  
**Trigger:** `lặp đi lặp lại: lấy 2 phần tử nhỏ nhất hiện tại → tạo phần tử mới → đưa ngược vào tập`

---

## 1. Dịch đề tiếng Việt

Leo muốn tất cả món ăn có chỉ số Scoville ít nhất là `K`.

Mỗi lần, Leo lấy **hai món ít cay nhất hiện tại**:

```text
first = nhỏ nhất
second = nhỏ thứ hai
```

rồi trộn:

```text
mixed = first + second * 2
```

Sau đó món mới lại được đưa vào tập thức ăn.

Lặp cho đến khi:

```text
mọi món >= K
```

Hãy trả về số lần trộn ít nhất.

Nếu không thể đạt được thì return:

```text
-1
```

Ví dụ:

```js
scoville = [1,2,3,9,10,12]
K = 7
```

Lần 1:

```text
1 + 2*2 = 5
```

Tập mới:

```text
[3,5,9,10,12]
```

Lần 2:

```text
3 + 5*2 = 13
```

Tập mới:

```text
[9,10,12,13]
```

Tất cả >= 7.

Kết quả:

```text
2
```

---

## 2. Phân tích 9 bước

### STEP 1 — CONTRACT

Mỗi vòng bắt buộc lấy:

```text
2 phần tử nhỏ nhất HIỆN TẠI
```

Không phải 2 phần tử nhỏ nhất ban đầu.

Sau khi tạo `mixed`, phải đưa nó quay lại tập.

**Một câu chốt**

> Khi mỗi vòng đều cần min hiện tại và có insert động, nghĩ ngay đến Min-Heap.

---

### STEP 2 — BOUND

```text
N <= 1,000,000
```

Nếu mỗi vòng sort lại:

```text
O(N log N) mỗi vòng
```

quá chậm.

Cần:

```text
pop min: O(log N)
push: O(log N)
peek min: O(1)
```

→ Min-Heap.

---

### STEP 3 — BRUTE FORCE

Cách ngây thơ:

```text
while min < K:
    sort array
    shift 2 phần tử
    push mixed
```

Vấn đề:

```text
sort lại liên tục
```

rất tốn.

---

### STEP 4 — BOTTLENECK

Sau mỗi lần mix:

```text
mixed
```

có thể nằm ở bất kỳ vị trí nào nếu array được sort.

Ta cần data structure duy trì:

```text
phần tử nhỏ nhất
```

sau insert/delete động.

→ Priority Queue / Min-Heap.

---

### STEP 5 — STATE

Cần:

```js
heap
count
```

Trong heap là tất cả giá trị Scoville hiện tại.

Ta chỉ cần nhìn:

```js
heap.peek()
```

để biết đã đạt mục tiêu chưa.

---

### STEP 6 — TRANSITION

Trong khi min hiện tại còn `< K`:

```js
while (heap.peek() < K) {
```

Trước tiên phải đảm bảo còn ít nhất 2 phần tử:

```js
if (heap.size() < 2) return -1
```

Sau đó:

```js
const first = heap.pop()
const second = heap.pop()

const mixed = first + second * 2

heap.push(mixed)
count++
```

---

### STEP 7 — INVARIANT

Trước mỗi vòng:

> Heap chứa chính xác toàn bộ giá trị Scoville hiện tại.

> `heap.peek()` luôn là giá trị nhỏ nhất hiện tại.

Do đó:

```text
heap.peek() >= K
```

suy ra:

```text
mọi phần tử >= K
```

không cần scan toàn heap.

---

### STEP 8 — PATTERN

**Pattern:** Priority Queue / Min-Heap.

Dấu hiệu nhận diện:

- lặp nhiều lần
- mỗi vòng lấy smallest/largest hiện tại
- xóa phần tử
- tạo phần tử mới
- insert ngược lại
- dữ liệu thay đổi động

Trigger sentence:

> “Repeatedly take current min/max + push new value → Heap.”

Các bài họ hàng:

- combine ropes
- merge files
- scheduling với min/max ưu tiên
- top K động
- Dijkstra cũng dùng min-heap, nhưng mục đích khác.

---

### STEP 9 — COMPLEXITY

Mỗi lần mix:

```text
2 pop + 1 push
```

mỗi thao tác:

```text
O(log N)
```

Tối đa khoảng `N-1` lần mix.

Tổng:

```text
O(N log N)
```

Space:

```text
O(N)
```

---

## 3. Dry Run — 7 cột chuyển tư duy thành code

```js
scoville = [1,2,3,9,10,12]
K = 7
```

| Unit | State trước | Action | Transition | Update answer? | Next | State sau |
|---|---|---|---|---|---|---|
| loop 1 | min=1 | pop 1,2 | mixed=5, push 5 | count=1 | check min | `[3,5,9,10,12]` |
| loop 2 | min=3 | pop 3,5 | mixed=13, push 13 | count=2 | check min | `[9,10,12,13]` |
| stop | min=9 | `9>=7` | done | return 2 | end | - |

---

### Dry run impossible

```js
scoville = [1,1]
K = 100
```

Mix:

```text
1 + 1*2 = 3
```

Heap:

```text
[3]
```

Min vẫn `< 100`, nhưng:

```text
size = 1
```

không còn 2 món để trộn.

→ `-1`.

---

## 4. Bộ phim hình ảnh

Hãy tưởng tượng heap là một cái máy luôn đặt món ít cay nhất lên trên cùng.

```text
        1
      /   \
     2     3
    / \   /
   9  10 12
```

Lấy:

```text
1
2
```

trộn thành:

```text
5
```

ném `5` lại vào máy.

Máy tự sắp để min mới lại lên đầu.

**Câu chuyện 1 dòng**

> “Cứ lấy hai thằng bé nhất, trộn, ném kết quả lại vào heap, nhìn min mới.”

---

## 5. Code Skeleton Recall

### MinHeap tối thiểu cho JS

```js
class MinHeap {
  constructor() {
    this.heap = []
  }

  size() {
    return this.heap.length
  }

  peek() {
    return this.heap[0]
  }

  push(value) {
    this.heap.push(value)

    let i = this.heap.length - 1

    while (i > 0) {
      const parent = Math.floor((i - 1) / 2)

      if (this.heap[parent] <= this.heap[i]) {
        break
      }

      ;[this.heap[parent], this.heap[i]] = [
        this.heap[i],
        this.heap[parent],
      ]

      i = parent
    }
  }

  pop() {
    if (this.heap.length === 1) {
      return this.heap.pop()
    }

    const root = this.heap[0]
    this.heap[0] = this.heap.pop()

    let i = 0

    while (true) {
      const left = i * 2 + 1
      const right = i * 2 + 2
      let smallest = i

      if (
        left < this.heap.length &&
        this.heap[left] < this.heap[smallest]
      ) {
        smallest = left
      }

      if (
        right < this.heap.length &&
        this.heap[right] < this.heap[smallest]
      ) {
        smallest = right
      }

      if (smallest === i) {
        break
      }

      ;[this.heap[i], this.heap[smallest]] = [
        this.heap[smallest],
        this.heap[i],
      ]

      i = smallest
    }

    return root
  }
}
```

### Solution

```js
function solution(scoville, K) {
  const heap = new MinHeap()

  for (const value of scoville) {
    heap.push(value)
  }

  let count = 0

  while (heap.peek() < K) {
    if (heap.size() < 2) {
      return -1
    }

    const first = heap.pop()
    const second = heap.pop()

    heap.push(first + second * 2)
    count++
  }

  return count
}
```

---

## 6. 4 câu thần chú trước khi code

### LOOP LEVELS

```text
build heap

while min < K
    if size < 2 → -1
    pop min
    pop second min
    mix
    push
    count++
```

### RESET WHEN

Không reset heap.

Heap là trạng thái hiện tại của toàn bộ tập thức ăn.

### INVALIDATES WHAT

Nếu:

```text
heap.peek() < K
```

nhưng:

```text
heap.size() < 2
```

→ không thể tiếp tục → `-1`.

### COMMIT WHEN

Mỗi lần mix thành công:

```js
count++
```

Và chỉ dừng khi:

```js
heap.peek() >= K
```

---

## 7. Trap dễ chết

### Trap 1 — Sort một lần rồi two pointers

Sai.

Sau mỗi mix có phần tử mới:

```text
mixed
```

cần được tái chèn đúng vị trí ưu tiên.

---

### Trap 2 — Sort lại mỗi vòng

Logic có thể đúng nhưng với:

```text
N = 1,000,000
```

rất nguy hiểm về performance.

---

### Trap 3 — Check impossible quá muộn

Nếu min < K mà heap chỉ còn 1 phần tử:

```js
return -1
```

ngay.

---

### Trap 4 — Sai công thức

Đúng:

```js
first + second * 2
```

không phải:

```js
(first + second) * 2
```

---

### Trap 5 — Check tất cả phần tử mỗi vòng

Không cần.

Nếu heap là min-heap:

```js
heap.peek() >= K
```

thì chắc chắn tất cả phần tử đều >= K.

---

### Trap 6 — Quên heap trong JS thường phải tự cài

Programmers JavaScript không có built-in `PriorityQueue`.

Cần thuộc một MinHeap tối thiểu hoặc template đã luyện.

---

## 8. Recall 20 giây

> **Nhận diện:** repeatedly take 2 current minimums + insert new value → Min-Heap.

> **State:** `heap`, `count`.

> **Stop:** `heap.peek() >= K`.

> **Impossible:** min < K nhưng `heap.size() < 2` → `-1`.

> **Transition:** `a=pop()`, `b=pop()`, `push(a + 2*b)`, `count++`.

> **Complexity:** O(N log N).

### Code shape

```js
while (heap.peek() < K) {
  if (heap.size() < 2) {
    return -1
  }

  const a = heap.pop()
  const b = heap.pop()

  heap.push(a + b * 2)
  count++
}
```

## 🧠 Một câu phải khắc vào đầu

> **“Mỗi vòng cần 2 min hiện tại và lại insert kết quả → Min-Heap; min đạt K thì tất cả đạt K.”**

---

[⬆ Quay lại Navigator](#-navigator--mobile-first)


---

---

# Bài 21 — 디스크 컨트롤러 (Disk Controller)

🔗 **Đề chính thức (Programmers):** https://school.programmers.co.kr/learn/courses/30/lessons/42627

**Pattern:** Sort by Request Time + Min-Heap / Priority Queue + Event Simulation  
**Trigger:** `job đến theo thời gian + chỉ chọn trong những job đã tới + chọn duration ngắn nhất + hệ thống có thể idle`

---

## 1. Dịch đề tiếng Việt

Ổ cứng chỉ xử lý **một job tại một thời điểm**.

Mỗi job có:

```text
[requestTime, duration]
```

Khi ổ cứng rảnh:

- chỉ các job đã request rồi mới được đưa vào waiting queue
- trong waiting queue, ưu tiên theo:
  1. `duration` nhỏ hơn
  2. nếu bằng nhau, `requestTime` nhỏ hơn
  3. nếu vẫn bằng nhau, `job index` nhỏ hơn

Một khi bắt đầu job thì phải chạy tới khi xong, không preempt.

Turnaround time:

```text
finishTime - requestTime
```

Mục tiêu:

> tính phần nguyên của turnaround time trung bình.

---

## 2. Phân tích 9 bước

### STEP 1 — CONTRACT

Input:

```text
jobs[i] = [requestTime, duration]
```

Cần trả về:

```text
Math.floor(
  totalTurnaround / jobs.length
)
```

### STEP 2 — BOUND

```text
N <= 500
requestTime <= 1000
duration <= 1000
```

Performance không căng, nhưng implementation phải đúng rule priority và idle gap.

### STEP 3 — BRUTE FORCE

Có thể mỗi lần disk rảnh:

- scan toàn bộ jobs chưa xử lý
- tìm các job đã tới
- chọn job ưu tiên cao nhất

Với N=500 vẫn có thể qua, nhưng code vừa rối vừa O(N²).

Heap cho control-flow rõ hơn.

### STEP 4 — BOTTLENECK

Có 2 timeline:

```text
1. jobs chưa tới
2. jobs đã tới và đang chờ
```

Ta cần:

- sort jobs theo request time để biết job nào tiếp theo sẽ tới
- heap giữ đúng waiting queue hiện tại

Điểm cực quan trọng:

> **không được push job chưa tới vào heap.**

Nếu làm vậy, heap có thể chọn một job duration ngắn dù requestTime còn ở tương lai.

---

### STEP 5 — STATE

Mỗi job giữ:

```js
{
  request,
  duration,
  index
}
```

State chính:

```js
sortedJobs
nextIndex
currentTime
totalTurnaround
completed
minHeap
```

Heap comparator đúng spec:

```text
duration
→ requestTime
→ originalIndex
```

---

### STEP 6 — TRANSITION

Loop tới khi hoàn thành hết jobs.

#### A. Đưa mọi job đã tới vào heap

```js
while (
  nextIndex < jobs.length &&
  jobs[nextIndex].request <= currentTime
) {
  heap.push(jobs[nextIndex])
  nextIndex++
}
```

#### B. Nếu heap có job

Pop job ưu tiên cao nhất:

```js
const job = heap.pop()
```

Chạy tới xong:

```js
currentTime += job.duration
```

Turnaround:

```js
totalTurnaround += currentTime - job.request
```

#### C. Nếu heap rỗng

Disk idle.

Không tick từng ms.

Jump thẳng:

```js
currentTime = jobs[nextIndex].request
```

Sau đó loop lại để push job vừa tới.

---

### STEP 7 — INVARIANT

Trước mỗi lần pop heap:

> Heap chứa **tất cả và chỉ** những job đã request nhưng chưa xử lý.

Và:

> Root heap là job có priority cao nhất theo `duration → request → index`.

---

### STEP 8 — PATTERN

**Pattern:** Event Simulation + Priority Queue.

Dấu hiệu:

- entities arrive over time
- chỉ chọn among currently available
- priority changes dynamically because new jobs arrive
- machine can become idle
- when idle, next meaningful time is next event

Trigger sentence:

> “Sort arrivals, heap available jobs, jump over idle time.”

---

### STEP 9 — COMPLEXITY

Sort:

```text
O(N log N)
```

Mỗi job push/pop heap đúng 1 lần:

```text
O(N log N)
```

Total:

```text
O(N log N)
```

Space:

```text
O(N)
```

---

## 3. Dry Run — 7 cột chuyển tư duy thành code

```js
jobs = [[0,3], [1,9], [3,5]]
```

Gắn index:

```text
0: [0,3]
1: [1,9]
2: [3,5]
```

| Time trước | Jobs mới vào heap | Heap chọn | Time sau | Turnaround thêm | Completed |
|---:|---|---|---:|---:|---:|
| 0 | job0 | job0 dur=3 | 3 | `3-0=3` | 1 |
| 3 | job1, job2 | job2 dur=5 | 8 | `8-3=5` | 2 |
| 8 | none | job1 dur=9 | 17 | `17-1=16` | 3 |

Total:

```text
3 + 5 + 16 = 24
```

Average:

```text
24 / 3 = 8
```

---

### Dry run idle gap

```js
jobs = [[5,2]]
```

Ban đầu:

```text
currentTime = 0
heap = []
```

Không có job nào request <= 0.

Heap rỗng → jump:

```text
currentTime = 5
```

Push job.

Run tới:

```text
7
```

Turnaround:

```text
7 - 5 = 2
```

---

## 4. Bộ phim hình ảnh

Hãy tưởng tượng có 2 khu vực:

```text
FUTURE JOBS
(sorted by request time)

        ↓ request <= currentTime

WAITING ROOM
(min-heap by duration/request/index)

        ↓ pop best job

DISK
(run to completion)
```

Nếu waiting room rỗng:

```text
không ngồi đếm từng ms
→ nhảy thẳng tới thời điểm job tiếp theo đến
```

---

## 5. Code Skeleton Recall

### MinHeap generic comparator

```js
class MinHeap {
  constructor(compare) {
    this.heap = []
    this.compare = compare
  }

  size() {
    return this.heap.length
  }

  push(value) {
    this.heap.push(value)
    let i = this.heap.length - 1

    while (i > 0) {
      const parent = Math.floor((i - 1) / 2)

      if (
        this.compare(
          this.heap[parent],
          this.heap[i]
        ) <= 0
      ) {
        break
      }

      ;[this.heap[parent], this.heap[i]] = [
        this.heap[i],
        this.heap[parent],
      ]

      i = parent
    }
  }

  pop() {
    if (this.heap.length === 1) {
      return this.heap.pop()
    }

    const root = this.heap[0]
    this.heap[0] = this.heap.pop()

    let i = 0

    while (true) {
      const left = i * 2 + 1
      const right = i * 2 + 2
      let best = i

      if (
        left < this.heap.length &&
        this.compare(
          this.heap[left],
          this.heap[best]
        ) < 0
      ) {
        best = left
      }

      if (
        right < this.heap.length &&
        this.compare(
          this.heap[right],
          this.heap[best]
        ) < 0
      ) {
        best = right
      }

      if (best === i) break

      ;[this.heap[i], this.heap[best]] = [
        this.heap[best],
        this.heap[i],
      ]

      i = best
    }

    return root
  }
}
```

### Solution

```js
function solution(jobs) {
  const sorted = jobs
    .map(([request, duration], index) => ({
      request,
      duration,
      index,
    }))
    .sort(
      (a, b) =>
        a.request - b.request ||
        a.index - b.index
    )

  const heap = new MinHeap(
    (a, b) =>
      a.duration - b.duration ||
      a.request - b.request ||
      a.index - b.index
  )

  let nextIndex = 0
  let currentTime = 0
  let completed = 0
  let totalTurnaround = 0

  while (completed < sorted.length) {
    while (
      nextIndex < sorted.length &&
      sorted[nextIndex].request <= currentTime
    ) {
      heap.push(sorted[nextIndex])
      nextIndex++
    }

    if (heap.size() > 0) {
      const job = heap.pop()

      currentTime += job.duration
      totalTurnaround +=
        currentTime - job.request

      completed++
    } else {
      currentTime =
        sorted[nextIndex].request
    }
  }

  return Math.floor(
    totalTurnaround / sorted.length
  )
}
```

---

## 6. 4 câu thần chú trước khi code

### LOOP LEVELS

```text
while completed < N
    while jobs arrived <= currentTime
        push heap

    if heap not empty
        pop + run + commit turnaround
    else
        jump time to next request
```

### RESET WHEN

Không reset heap.

`nextIndex` chỉ tăng.

`currentTime` chỉ tăng hoặc jump về phía trước.

### INVALIDATES WHAT

Không được đưa job vào heap nếu:

```text
requestTime > currentTime
```

Nó chưa tồn tại trong waiting queue.

### COMMIT WHEN

Khi job chạy xong:

```js
currentTime += duration
totalTurnaround +=
  currentTime - request
completed++
```

---

## 7. Trap dễ chết

### Trap 1 — Push tất cả jobs vào heap ngay từ đầu

Sai spec.

Job chưa tới không được cạnh tranh priority.

---

### Trap 2 — Comparator thiếu tie-break

Spec mới nêu rõ:

```text
duration
→ requestTime
→ job number
```

Heap comparator phải phản ánh đủ 3 tầng.

---

### Trap 3 — Tick từng ms khi idle

Không cần.

Nếu heap rỗng:

```js
currentTime = sorted[nextIndex].request
```

---

### Trap 4 — Dùng `currentTime - request` trước khi cộng duration

Turnaround tính lúc job **kết thúc**.

Phải:

```js
currentTime += duration
total += currentTime - request
```

---

### Trap 5 — Quên jobs đến đúng lúc job vừa kết thúc

Nếu job mới có:

```text
request === currentTime
```

thì phải được push vào heap **trước khi chọn job tiếp theo**.

Điều kiện đúng:

```js
request <= currentTime
```

---

### Trap 6 — Chỉ sort jobs theo duration

Sai.

Sort ngoài chỉ để stream theo request time.

Priority duration chỉ áp dụng trong heap của các job **đã tới**.

---

## 8. Recall 20 giây

> **Nhận diện:** jobs arrive over time + choose shortest among arrived → sort arrivals + min-heap.

> **Heap comparator:** `duration → request → index`.

> **Push condition:** `request <= currentTime`.

> **Run job:** `currentTime += duration`.

> **Turnaround:** `currentTime - request`.

> **Heap empty:** jump `currentTime` tới next request.

> **Complexity:** O(N log N).

### Code shape

```js
while (completed < N) {
  while (
    next < N &&
    jobs[next].request <= time
  ) {
    heap.push(jobs[next++])
  }

  if (heap.size()) {
    const job = heap.pop()

    time += job.duration
    total += time - job.request
    completed++
  } else {
    time = jobs[next].request
  }
}
```

## 🧠 Một câu phải khắc vào đầu

> **“Sort job theo lúc đến; heap chỉ chứa job đã đến; chọn duration ngắn nhất; heap rỗng thì nhảy thời gian tới event tiếp theo.”**

---

[⬆ Quay lại Navigator](#-navigator--mobile-first)
