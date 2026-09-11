# PCCP FINAL RECALL — Graph / Tree / Greedy

> Tree traversal, connected components và greedy interval sẽ nằm trong file này.

## Bài trong file

- Bài 24 — 전력망을 둘로 나누기 (Chia lưới điện)
- Bài 25 — 요격 시스템 (Hệ thống đánh chặn)

---

---

# Bài 24 — 전력망을 둘로 나누기 (Chia lưới điện)

🔗 **Đề chính thức (Programmers):** https://school.programmers.co.kr/learn/courses/30/lessons/86971

**Pattern:** Tree / Graph Traversal + Remove One Edge  
**Trigger:** `input là tree + thử bỏ đúng 1 edge + cần biết kích thước 2 component`

---

## 1. Dịch đề tiếng Việt

Có `n` cột điện được nối với nhau bằng `n - 1` dây điện và toàn bộ mạng tạo thành **một cây (tree)**.

Ta phải:

```text
cắt đúng 1 dây
```

Sau khi cắt, tree sẽ tách thành đúng:

```text
2 component
```

Mục tiêu là làm số lượng cột điện ở hai component càng gần nhau càng tốt.

Return:

```text
|size1 - size2|
```

nhỏ nhất có thể.

### Giới hạn

```text
2 <= n <= 100
wires.length = n - 1
```

Input luôn là tree.

---

## 2. Phân tích 9 bước

### STEP 1 — CONTRACT

Với mỗi dây:

```text
[u, v]
```

ta giả sử dây này bị cắt.

Sau đó:

```text
component 1 size = count
component 2 size = n - count
```

Difference:

```text
|count - (n - count)|
```

hay:

```text
|n - 2 * count|
```

Ta lấy minimum qua mọi dây.

---

### STEP 2 — BOUND

```text
n <= 100
edges = n - 1 <= 99
```

Nếu mỗi edge ta traverse cả tree:

```text
O(N)
```

Có `N-1` edge:

```text
O(N²)
```

Tối đa khoảng:

```text
100 * 100
```

quá nhẹ.

---

### STEP 3 — BRUTE FORCE

Brute force đúng chính là:

```text
for mỗi dây
    cắt dây đó
    đếm 1 component
    tính component còn lại
    update answer
```

Không cần thuật toán phức tạp hơn.

---

### STEP 4 — BOTTLENECK

Không nên mỗi vòng:

- clone toàn bộ wires
- splice edge
- rebuild adjacency

Vẫn có thể pass vì N nhỏ, nhưng dễ code lỗi và mutate.

Cách sạch hơn:

> build adjacency **một lần**, DFS nhưng khi gặp đúng edge đang "cắt" thì skip.

---

### STEP 5 — STATE

Adjacency:

```js
graph[node] = neighbors
```

Cho mỗi cut edge:

```js
cutA
cutB
```

DFS state:

```js
dfs(node)
visited
count
```

---

### STEP 6 — TRANSITION

Build graph:

```js
for (const [a, b] of wires) {
  graph[a].push(b)
  graph[b].push(a)
}
```

Với mỗi edge `[cutA, cutB]`:

- reset `visited`
- DFS từ `cutA`
- nếu transition đang đi qua chính edge bị cắt thì skip

```js
if (
  (node === cutA && next === cutB) ||
  (node === cutB && next === cutA)
) {
  continue
}
```

Đếm số node reachable:

```js
count++
```

Sau DFS:

```js
const diff = Math.abs(
  count - (n - count)
)
```

---

### STEP 7 — INVARIANT

Trong một lần thử cắt `[cutA, cutB]`:

> DFS chỉ đi qua các edge còn tồn tại.

Do input là tree, bỏ một edge sẽ tạo đúng 2 component.

Nếu DFS từ `cutA` đếm được `count` node thì component còn lại **chắc chắn** có:

```text
n - count
```

Không cần traverse component thứ hai.

---

### STEP 8 — PATTERN

**Pattern:** Tree + Remove One Edge + Count Component.

Dấu hiệu:

- input nói rõ là tree
- thử bỏ một edge
- sau khi bỏ cần biết hai phía lớn cỡ nào
- N nhỏ

Trigger sentence:

> **“Tree + remove one edge → 2 components; traverse một phía là đủ.”**

---

### STEP 9 — COMPLEXITY

Build adjacency:

```text
O(N)
```

Có `N - 1` edge cần thử.

Mỗi lần DFS tối đa:

```text
O(N)
```

Total:

```text
O(N²)
```

Space:

```text
O(N)
```

graph thực tế `O(N)` vì tree có `N-1` edge.

### JS safety

```text
n <= 100
```

Recursion depth tối đa 100.

→ an toàn cho JavaScript.

---

## 3. Dry Run — 7 cột chuyển tư duy thành code

Ví dụ:

```js
n = 4
wires = [
  [1,2],
  [2,3],
  [3,4]
]
```

Thử cắt:

```text
[2,3]
```

Tree trở thành:

```text
1 - 2    3 - 4
```

DFS từ `2`:

```text
2 → 1
```

count:

```text
2
```

Component kia:

```text
4 - 2 = 2
```

Difference:

```text
|2 - 2| = 0
```

| Cut edge | DFS start | Count phía 1 | Count phía 2 | Diff |
|---|---:|---:|---:|---:|
| `[1,2]` | 1 | 1 | 3 | 2 |
| `[2,3]` | 2 | 2 | 2 | 0 |
| `[3,4]` | 3 | 3 | 1 | 2 |

Answer:

```text
0
```

---

## 4. Bộ phim hình ảnh

Hãy tưởng tượng một cái cây điện.

Mỗi lần:

```text
chọn 1 dây
↓
dùng kéo cắt nó
↓
đứng ở một đầu dây
↓
đếm xem từ đầu đó còn đi tới được bao nhiêu node
↓
phía kia = n - count
↓
so độ lệch
```

Không cần đếm cả hai phía.

---

## 5. Code Skeleton Recall

```js
function solution(n, wires) {
  const graph =
    Array.from({ length: n + 1 }, () => [])

  for (const [a, b] of wires) {
    graph[a].push(b)
    graph[b].push(a)
  }

  let answer = Infinity

  for (const [cutA, cutB] of wires) {
    const visited =
      Array(n + 1).fill(false)

    let count = 0

    function dfs(node) {
      visited[node] = true
      count++

      for (const next of graph[node]) {
        if (visited[next]) continue

        if (
          (node === cutA && next === cutB) ||
          (node === cutB && next === cutA)
        ) {
          continue
        }

        dfs(next)
      }
    }

    dfs(cutA)

    answer = Math.min(
      answer,
      Math.abs(count - (n - count))
    )
  }

  return answer
}
```

---

## 6. 4 câu thần chú trước khi code

### LOOP LEVELS

```text
build graph once

for each edge to cut
    reset visited/count
    DFS one side while skipping cut edge
    compute diff
    update min
```

### RESET WHEN

Mỗi edge mới:

```js
visited = fresh array
count = 0
```

### INVALIDATES WHAT

Transition invalid nếu:

```text
next đã visited
```

hoặc:

```text
(node,next) chính là cut edge
```

### COMMIT WHEN

Sau khi DFS xong một phía:

```js
answer = Math.min(
  answer,
  Math.abs(count - (n - count))
)
```

---

## 7. Trap dễ chết

### Trap 1 — Quên graph là undirected

Phải push cả hai chiều:

```js
graph[a].push(b)
graph[b].push(a)
```

---

### Trap 2 — Chỉ skip một chiều của cut edge

Sai:

```js
node === cutA && next === cutB
```

chưa đủ.

Phải skip cả:

```text
A → B
B → A
```

---

### Trap 3 — Không reset visited giữa các edge

Mỗi giả thuyết cắt dây là một traversal độc lập.

Phải tạo `visited` mới.

---

### Trap 4 — Traverse cả hai component

Không cần.

Nếu một phía có `count`:

```text
phía kia = n - count
```

---

### Trap 5 — Mutate wires/graph bằng splice

Không cần và dễ làm sai iteration.

Chỉ **skip logical edge** trong DFS.

---

### Trap 6 — Quên visited vì "tree không cycle"

Tree vô hướng vẫn có edge quay lại parent:

```text
1 → 2
2 → 1
```

Không có visited thì recursion quay ngược vô hạn.

---

## 8. Recall 20 giây

> **Nhận diện:** tree + cắt đúng 1 edge + cân bằng 2 phía.

> **Outer loop:** thử từng edge.

> **Traversal:** DFS/BFS từ một đầu, skip cut edge.

> **State:** `visited`, `count`.

> **Other side:** `n - count`.

> **Commit:** `min(abs(count - (n-count)))`.

> **Complexity:** O(N²), N<=100.

### Code shape

```js
for (const [a, b] of wires) {
  visited.fill(false)
  count = 0

  dfs(a, a, b)

  answer = Math.min(
    answer,
    Math.abs(count - (n - count))
  )
}
```

## 🧠 Một câu phải khắc vào đầu

> **“Tree cắt một edge là tách đúng hai component; DFS một phía, phía còn lại = n - count.”**

---

[⬆ Quay lại INDEX](00_PCCP_FINAL_INDEX.md)

---

---

# Bài 25 — 요격 시스템 (Hệ thống đánh chặn)

🔗 **Đề chính thức (Programmers):** https://school.programmers.co.kr/learn/courses/30/lessons/181188

**Pattern:** Greedy Interval / Earliest Finish Point  
**Trigger:** `nhiều khoảng trên trục số + 1 điểm có thể cover nhiều khoảng + cần ít điểm nhất`

---

## 1. Dịch đề tiếng Việt

Mỗi tên lửa tấn công chiếm một **khoảng mở**:

```text
(s, e)
```

Ta có thể bắn một tên lửa đánh chặn tại một tọa độ thực `x`.

Một phát bắn sẽ chặn được mọi target mà:

```text
s < x < e
```

Vì interval là **open interval**, bắn đúng tại:

```text
x = s
```

hoặc:

```text
x = e
```

thì **không chặn được** target đó.

Mục tiêu:

> dùng ít phát bắn nhất để cover tất cả interval.

### Giới hạn

```text
1 <= targets.length <= 500,000
```

N rất lớn → cần khoảng:

```text
O(N log N)
```

---

## 2. Phân tích 9 bước

### STEP 1 — CONTRACT

Mỗi phát bắn là một điểm `x`.

Ta cần chọn ít điểm nhất sao cho mỗi interval `(s,e)` chứa ít nhất một điểm đã chọn.

Đây là bài:

```text
minimum points to stab all intervals
```

---

### STEP 2 — BOUND

```text
N <= 500,000
```

Không được:

- so từng cặp interval
- thử candidate point theo brute force
- nested loop O(N²)

Sort một lần:

```text
O(N log N)
```

rồi scan:

```text
O(N)
```

là chuẩn.

---

### STEP 3 — BRUTE FORCE

Naive:

- chọn một target
- thử nhiều điểm bắn
- xem cover được bao nhiêu
- backtrack

Không thể với 500k interval.

---

### STEP 4 — BOTTLENECK

Câu hỏi greedy:

> Nếu buộc phải bắn để cover interval hiện tại, bắn ở đâu để cơ hội cover các interval sau lớn nhất?

Đáp án:

> **càng sát end nhỏ nhất càng tốt.**

Nên sort theo:

```text
e tăng dần
```

Interval kết thúc sớm nhất là thằng "gấp" nhất.

Ta chọn một điểm ngay trước `e`.

Trong code không cần số thực `e - epsilon`; chỉ cần lưu mốc:

```js
lastEnd = e
```

và hiểu rằng phát bắn đang nằm ở:

```text
x < e, cực sát e
```

---

### STEP 5 — STATE

Sau sort theo `end`:

```js
targets.sort((a, b) => a[1] - b[1])
```

State:

```js
count
lastEnd
```

`lastEnd` đại diện cho phát bắn gần nhất được đặt **ngay trước end này**.

---

### STEP 6 — TRANSITION

Duyệt mỗi interval:

```js
for (const [start, end] of targets)
```

Nếu:

```js
start >= lastEnd
```

thì phát bắn cũ **không nằm bên trong** interval mới.

Phải bắn thêm:

```js
count++
lastEnd = end
```

Ngược lại:

```js
start < lastEnd
```

thì điểm ngay trước `lastEnd` vẫn nằm trong interval hiện tại.

Không cần bắn thêm.

---

### STEP 7 — INVARIANT

Sau khi xử lý các interval đã duyệt:

> `count` là số phát tối thiểu cần dùng cho prefix đó.

> Phát mới nhất được đặt ngay trước `lastEnd`, với `lastEnd` là end nhỏ nhất có thể của nhóm interval đang được cover chung.

Do sort theo end tăng dần, chọn điểm gần end sớm nhất không làm mất cơ hội cover interval nào mà một điểm khác cho interval hiện tại có thể cover tốt hơn ở bên phải.

---

### STEP 8 — PATTERN

**Pattern:** Greedy Interval / Earliest Finish.

Dấu hiệu:

- nhiều interval
- muốn dùng ít điểm/tài nguyên nhất để cover chúng
- một action có thể cover nhiều interval
- interval có thứ tự trái → phải

Trigger sentence:

> **“Minimum points to hit intervals → sort by end, shoot as late as possible.”**

---

### STEP 9 — COMPLEXITY

Sort:

```text
O(N log N)
```

Scan:

```text
O(N)
```

Total:

```text
O(N log N)
```

Space phụ:

```text
O(1)
```

ngoài sort implementation.

Với:

```text
N <= 500,000
```

đây là complexity phù hợp cho JavaScript.

---

## 3. Dry Run — 7 cột chuyển tư duy thành code

Input:

```js
[
  [4,5],
  [4,8],
  [10,14],
  [11,13],
  [5,12],
  [3,7],
  [1,4]
]
```

Sort theo end:

```text
(1,4)
(4,5)
(3,7)
(4,8)
(5,12)
(11,13)
(10,14)
```

Scan:

| Interval | lastEnd trước | Check | Action | count | lastEnd sau |
|---|---:|---|---|---:|---:|
| (1,4) | -∞ | new | bắn gần 4 | 1 | 4 |
| (4,5) | 4 | `4 >= 4` | bắn mới gần 5 | 2 | 5 |
| (3,7) | 5 | `3 < 5` | dùng phát cũ | 2 | 5 |
| (4,8) | 5 | `4 < 5` | dùng phát cũ | 2 | 5 |
| (5,12) | 5 | `5 >= 5` | bắn mới gần 12 | 3 | 12 |
| (11,13) | 12 | `11 < 12` | dùng phát cũ | 3 | 12 |
| (10,14) | 12 | `10 < 12` | dùng phát cũ | 3 | 12 |

Answer:

```text
3
```

---

## 4. Vì sao phải là `start >= lastEnd`?

Đây là trap quan trọng nhất của bài.

Giả sử phát cũ được đặt:

```text
ngay trước x = 4
```

Interval mới là:

```text
(4,5)
```

Phát cũ nằm ở:

```text
x < 4
```

nên **không nằm trong (4,5)**.

Vì vậy nếu:

```text
start === lastEnd
```

vẫn phải bắn mới.

Đó là lý do condition phải là:

```js
start >= lastEnd
```

không phải:

```js
start > lastEnd
```

---

## 5. Bộ phim hình ảnh

Tưởng tượng mỗi interval là một đoạn hở:

```text
(---------)
```

Mày đi từ trái sang phải theo **điểm kết thúc sớm nhất**.

Gặp interval đầu:

```text
(------e)
```

→ đặt phát bắn sát bên trái `e`.

Sau đó tất cả interval nào vẫn bắt đầu trước mốc đó:

```text
start < lastEnd
```

đều bị phát này xuyên qua.

Khi gặp interval bắt đầu từ hoặc sau mốc:

```text
start >= lastEnd
```

→ phát cũ không còn dùng được → bắn phát mới.

---

## 6. Code Skeleton Recall

```js
function solution(targets) {
  targets.sort(
    (a, b) => a[1] - b[1]
  )

  let count = 0
  let lastEnd = -Infinity

  for (const [start, end] of targets) {
    if (start >= lastEnd) {
      count++
      lastEnd = end
    }
  }

  return count
}
```

---

## 7. 4 câu thần chú trước khi code

### LOOP LEVELS

```text
sort by end

for each interval
    if previous shot cannot cover
        shoot new
```

### RESET WHEN

Không reset gì.

Chỉ cập nhật:

```js
lastEnd = end
```

khi bắn phát mới.

### INVALIDATES WHAT

Phát cũ invalid nếu:

```js
start >= lastEnd
```

Do interval mở.

### COMMIT WHEN

Khi phát cũ không cover được:

```js
count++
lastEnd = end
```

---

## 8. Trap dễ chết

### Trap 1 — Sort theo start

Không phải greedy chuẩn cho minimum stabbing points.

Phải ưu tiên interval **kết thúc sớm nhất**.

---

### Trap 2 — Dùng `start > lastEnd`

Sai vì interval mở.

Nếu:

```text
start === lastEnd
```

phát cũ nằm ngay trước `lastEnd`, không nằm trong interval mới.

Phải:

```js
start >= lastEnd
```

---

### Trap 3 — Thực sự dùng `end - 0.1`

Không cần và dễ dính precision.

Chỉ lưu:

```js
lastEnd = end
```

và encode open-interval logic bằng condition.

---

### Trap 4 — Mỗi interval bắn một phát

Không tối ưu.

Một phát có thể cover nhiều interval overlap.

---

### Trap 5 — Nested overlap checking

N tới 500,000.

Phải sort + scan.

---

## 9. Recall 20 giây

> **Nhận diện:** minimum points hit all intervals → greedy interval.

> **Sort:** theo `end` tăng.

> **Shot:** conceptual point ngay trước `end`.

> **New shot condition:** `start >= lastEnd`.

> **Commit:** `count++`, `lastEnd = end`.

> **Complexity:** O(N log N).

### Code shape

```js
targets.sort((a, b) => a[1] - b[1])

let answer = 0
let lastEnd = -Infinity

for (const [s, e] of targets) {
  if (s >= lastEnd) {
    answer++
    lastEnd = e
  }
}

return answer
```

## 🧠 Một câu phải khắc vào đầu

> **“Interval stabbing: sort end tăng, đặt phát sát end; open interval nên `start >= lastEnd` thì phải bắn mới.”**

---

[⬆ Quay lại INDEX](00_PCCP_FINAL_INDEX.md)
