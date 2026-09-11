# PCCP FINAL RECALL — BFS / Graph

> Representative cho shortest path unweighted grid/graph.

## Bài trong file

- Bài 27 — 게임 맵 최단거리 (Đường ngắn nhất bản đồ game)
- Bài 28 — 미로 탈출 (Thoát mê cung)
- Bài 29 — 네트워크 (Mạng lưới)
- Bài 30 — 단어 변환 (Chuyển đổi từ)
- Bài 31 — 가장 먼 노드 (Node xa nhất)
- Bài 32 — 배달 (Giao hàng)
- Bài 36 — 숫자 변환하기 (Biến đổi số)

---

---

# Bài 27 — 게임 맵 최단거리 (Đường ngắn nhất bản đồ game)

🔗 **Đề chính thức (Programmers):** https://school.programmers.co.kr/learn/courses/30/lessons/1844

**Pattern:** BFS Grid / Unweighted Shortest Path  
**Trigger:** `grid + đi 4 hướng + mỗi bước cost = 1 + cần shortest path`

---

## 1. Dịch đề tiếng Việt

Ta có một bản đồ `n x m`:

```text
1 = ô đi được
0 = tường
```

Nhân vật bắt đầu ở:

```text
(0, 0)
```

và cần tới:

```text
(n - 1, m - 1)
```

Mỗi bước chỉ được đi:

```text
lên / xuống / trái / phải
```

Mỗi lần di chuyển sang một ô kề tốn đúng:

```text
1 bước
```

Hãy trả về **số ô trên đường đi ngắn nhất**, tính cả ô bắt đầu và ô đích.

Nếu không thể tới đích:

```text
return -1
```

---

## 2. Phân tích 9 bước

### STEP 1 — CONTRACT

State của một node trong graph:

```text
(row, col)
```

Transition:

```text
4 ô kề
```

Điều kiện hợp lệ:

- trong boundary
- `maps[nr][nc] === 1`
- chưa visited

Goal:

```text
row === n - 1 && col === m - 1
```

---

### STEP 2 — BOUND

```text
1 <= n,m <= 100
```

Tối đa:

```text
10,000 ô
```

BFS mỗi ô enqueue tối đa 1 lần:

```text
O(n*m)
```

rất nhẹ.

---

### STEP 3 — BRUTE FORCE

DFS có thể tìm được đường đi, nhưng không đảm bảo đường đầu tiên là shortest.

Nếu enumerate mọi path thì cực dư.

Vì mỗi edge đều có cost 1:

> BFS chính là shortest path chuẩn.

---

### STEP 4 — BOTTLENECK

Ta cần tránh:

```text
đi vòng / enqueue cùng một ô nhiều lần
```

Do đó phải mark visited **ngay khi enqueue**, không phải chờ dequeue.

Nếu mark muộn, cùng một ô có thể bị nhiều parent đẩy vào queue.

---

### STEP 5 — STATE

Ta có thể lưu riêng:

```js
dist[row][col]
```

hoặc tận dụng `maps` để ghi distance.

Để recall rõ ràng, dùng `dist`:

```js
const dist = Array.from(
  { length: n },
  () => Array(m).fill(0)
)
```

Start:

```js
dist[0][0] = 1
```

Queue:

```js
[[0,0]]
```

và:

```js
let head = 0
```

---

### STEP 6 — TRANSITION

BFS:

```js
while (head < queue.length) {
  const [r, c] = queue[head++]

  for (const [dr, dc] of dirs) {
    const nr = r + dr
    const nc = c + dc
```

Check boundary.

Skip wall.

Skip visited:

```js
if (dist[nr][nc] !== 0) continue
```

Mark **trước khi enqueue**:

```js
dist[nr][nc] = dist[r][c] + 1
queue.push([nr, nc])
```

---

### STEP 7 — INVARIANT

Khi một ô được enqueue lần đầu:

> `dist[row][col]` đã là khoảng cách ngắn nhất từ start tới ô đó.

Vì BFS xử lý theo từng layer khoảng cách:

```text
1 bước
2 bước
3 bước
...
```

Nên không cần relax lại như Dijkstra.

---

### STEP 8 — PATTERN

**Pattern:** BFS trên grid / shortest path khi mọi edge có cùng cost.

Dấu hiệu:

- grid
- 4 hoặc 8 hướng
- mỗi bước cost bằng nhau
- hỏi minimum moves / shortest distance

Trigger sentence:

> **“Unweighted shortest path → BFS.”**

---

### STEP 9 — COMPLEXITY

Mỗi ô enqueue tối đa một lần:

```text
O(n*m)
```

Mỗi ô check tối đa 4 neighbors:

```text
O(4*n*m) = O(n*m)
```

Space:

```text
O(n*m)
```

cho queue + dist.

### JS safety

Không dùng:

```js
queue.shift()
```

lặp nhiều lần.

Dùng:

```js
let head = 0
queue[head++]
```

để queue O(1) amortized.

---

## 3. Dry Run — 7 cột chuyển tư duy thành code

Ví dụ mini:

```text
1 1 0
0 1 1
0 0 1
```

Start:

```text
(0,0), dist=1
```

BFS:

| Pop | Neighbor hợp lệ | Dist mới | Queue |
|---|---|---:|---|
| (0,0) | (0,1) | 2 | [(0,1)] |
| (0,1) | (1,1) | 3 | [(1,1)] |
| (1,1) | (1,2) | 4 | [(1,2)] |
| (1,2) | (2,2) | 5 | [(2,2)] |

Answer:

```text
5
```

---

## 4. Bộ phim hình ảnh

BFS giống như đổ nước từ ô start.

```text
layer 1: start
layer 2: các ô cách 1 bước
layer 3: các ô cách 2 bước
...
```

Nước lan đều theo mọi hướng.

Ô đích được chạm lần đầu chính là shortest path.

---

## 5. Code Skeleton Recall

```js
function solution(maps) {
  const n = maps.length
  const m = maps[0].length

  const dist = Array.from(
    { length: n },
    () => Array(m).fill(0)
  )

  const dirs = [
    [1, 0],
    [-1, 0],
    [0, 1],
    [0, -1],
  ]

  const queue = [[0, 0]]
  let head = 0

  dist[0][0] = 1

  while (head < queue.length) {
    const [r, c] = queue[head++]

    for (const [dr, dc] of dirs) {
      const nr = r + dr
      const nc = c + dc

      if (
        nr < 0 ||
        nr >= n ||
        nc < 0 ||
        nc >= m
      ) {
        continue
      }

      if (maps[nr][nc] === 0) {
        continue
      }

      if (dist[nr][nc] !== 0) {
        continue
      }

      dist[nr][nc] =
        dist[r][c] + 1

      queue.push([nr, nc])
    }
  }

  return dist[n - 1][m - 1] || -1
}
```

---

## 6. 4 câu thần chú trước khi code

### LOOP LEVELS

```text
while queue not exhausted
    pop by head
    for 4 directions
        validate
        mark visited/dist
        enqueue
```

### RESET WHEN

Không reset gì trong một BFS.

Nếu bài có nhiều phase BFS khác nhau thì phải reset visited/dist theo phase.

### INVALIDATES WHAT

Neighbor invalid nếu:

```text
out of bounds
wall
already visited
```

### COMMIT WHEN

Khi discover neighbor:

```js
dist[nr][nc] =
  dist[r][c] + 1
```

và mark ngay trước enqueue.

---

## 7. Trap dễ chết

### Trap 1 — Dùng DFS để tìm shortest

DFS không đảm bảo shortest trong unweighted graph.

---

### Trap 2 — `queue.shift()`

Có thể gây O(N²) behavior do reindex array.

Dùng head pointer.

---

### Trap 3 — Mark visited khi dequeue

Sai kiểu performance / duplicate queue.

Phải mark khi enqueue.

---

### Trap 4 — Quên start distance = 1

Đề đếm số ô đi qua, tính cả start.

Phải:

```js
dist[0][0] = 1
```

---

### Trap 5 — Quên unreachable

Nếu:

```js
dist[n - 1][m - 1] === 0
```

return:

```text
-1
```

---

### Trap 6 — Nhầm row/col boundary

```text
row ∈ [0, n)
col ∈ [0, m)
```

---

## 8. Recall 20 giây

> **Nhận diện:** grid + shortest + mỗi move cost 1 → BFS.

> **State:** `(row,col)` + distance.

> **Queue:** array + `head`.

> **Mark:** ngay khi enqueue.

> **Transition:** 4 directions.

> **Goal:** bottom-right.

> **Unreachable:** -1.

> **Complexity:** O(n*m).

### Code shape

```js
const queue = [[0,0]]
let head = 0
dist[0][0] = 1

while (head < queue.length) {
  const [r,c] = queue[head++]

  for (const [dr,dc] of dirs) {
    const nr = r + dr
    const nc = c + dc

    if (invalid) continue
    if (wall) continue
    if (visited) continue

    dist[nr][nc] = dist[r][c] + 1
    queue.push([nr,nc])
  }
}
```

## 🧠 Một câu phải khắc vào đầu

> **“Grid shortest + mỗi bước cost 1 → BFS; mark ngay khi enqueue; queue dùng head.”**

---

[⬆ Quay lại INDEX](00_PCCP_FINAL_INDEX.md)

---

---

# Bài 28 — 미로 탈출 (Thoát mê cung)

🔗 **Đề chính thức (Programmers):** https://school.programmers.co.kr/learn/courses/30/lessons/159993

**Pattern:** BFS Grid — Two Phases  
**Trigger:** `phải đi qua checkpoint bắt buộc trước rồi mới tới đích → shortest(S→L) + shortest(L→E)`

---

## 1. Dịch đề tiếng Việt

Ta có một mê cung dạng grid gồm các ký tự:

```text
S = Start
E = Exit
L = Lever
O = đường đi
X = tường
```

Muốn thoát mê cung bắt buộc phải:

```text
S → L → E
```

Ta phải tới lever `L` trước để kéo cần, sau đó mới được tính là có thể thoát qua `E`.

Nhưng lưu ý cực quan trọng:

> **Trước khi kéo lever, ô `E` vẫn có thể đi xuyên qua bình thường.**

Mỗi bước sang 1 ô kề 4 hướng tốn:

```text
1 giây
```

Return thời gian nhỏ nhất để:

```text
S → L → E
```

Nếu không thể tới `L`, hoặc từ `L` không thể tới `E`:

```text
return -1
```

---

## 2. Phân tích 9 bước

### STEP 1 — CONTRACT

Bài toán thật sự là tổng của 2 shortest path độc lập:

```text
dist(S, L) + dist(L, E)
```

Nếu một trong hai bằng unreachable:

```text
-1
```

thì answer = `-1`.

---

### STEP 2 — BOUND

```text
rows <= 100
cols <= 100
```

Tối đa:

```text
10,000 ô
```

Một BFS:

```text
O(R*C)
```

Hai BFS:

```text
O(R*C)
```

vì constant 2 bỏ qua.

---

### STEP 3 — BRUTE FORCE

Không cần DFS enumerate mọi path.

Mỗi bước có cost bằng nhau:

```text
1
```

→ BFS là shortest path chuẩn.

---

### STEP 4 — BOTTLENECK

Điểm dễ chết không nằm ở BFS, mà nằm ở **state reset giữa hai phase**.

Phase 1:

```text
S → L
```

Phase 2:

```text
L → E
```

Nếu reuse visited của phase 1 thì phase 2 có thể bị block sai.

→ mỗi BFS phải có visited/dist riêng.

---

### STEP 5 — STATE

Ta viết helper:

```js
bfs(start, target)
```

State trong helper:

```text
queue
head
visited/dist
```

Và cần biết tọa độ:

```text
S
L
E
```

---

### STEP 6 — TRANSITION

Trong BFS:

```text
pop current
→ thử 4 hướng
→ out of bounds? skip
→ X? skip
→ visited? skip
→ mark + enqueue
```

Quan trọng:

```text
S, E, L, O đều là ô đi được
```

Chỉ:

```text
X
```

là tường.

---

### STEP 7 — INVARIANT

Trong mỗi BFS:

> Lần đầu một ô được enqueue là ta đã tìm được shortest distance tới ô đó.

Hai phase độc lập nên:

```text
visited phase 1
```

không được ảnh hưởng:

```text
visited phase 2
```

---

### STEP 8 — PATTERN

**Pattern:** BFS multiple phases / mandatory checkpoint.

Dấu hiệu:

- shortest path trên grid
- phải ghé qua checkpoint bắt buộc
- mọi edge cost = 1

Trigger sentence:

> **“Shortest path qua checkpoint bắt buộc → tách thành các BFS liên tiếp.”**

---

### STEP 9 — COMPLEXITY

Tìm S/L/E:

```text
O(R*C)
```

Hai BFS:

```text
2 * O(R*C)
```

Total:

```text
O(R*C)
```

Space:

```text
O(R*C)
```

### JS safety

Queue dùng:

```js
let head = 0
queue[head++]
```

Không dùng `shift()` lặp.

---

## 3. Dry Run — 7 cột chuyển tư duy thành code

Ví dụ:

```js
maps = [
  "SOOOL",
  "XXXXO",
  "OOOOO",
  "OXXXX",
  "OOOOE"
]
```

Phase 1:

```text
S → L = 4
```

Phase 2:

```text
L → E = 12
```

Total:

```text
4 + 12 = 16
```

| Phase | Start | Target | Result |
|---|---|---|---:|
| 1 | S | L | 4 |
| 2 | L | E | 12 |
| Total | - | - | 16 |

Nếu phase 1 fail:

```text
S không tới được L
```

→ return `-1` ngay.

Nếu phase 1 ok nhưng phase 2 fail:

```text
L không tới được E
```

→ return `-1`.

---

## 4. Bộ phim hình ảnh

Đừng nghĩ là một BFS có state lever phức tạp.

Hãy chia phim thành 2 cảnh:

```text
CẢNH 1
S ~~~~~> L

RESET visited

CẢNH 2
L ~~~~~> E
```

Sau đó:

```text
answer = scene1 + scene2
```

---

## 5. Code Skeleton Recall

```js
function solution(maps) {
  const rows = maps.length
  const cols = maps[0].length

  let start
  let lever
  let exit

  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      if (maps[r][c] === "S") start = [r, c]
      if (maps[r][c] === "L") lever = [r, c]
      if (maps[r][c] === "E") exit = [r, c]
    }
  }

  const dirs = [
    [1, 0],
    [-1, 0],
    [0, 1],
    [0, -1],
  ]

  function bfs(from, to) {
    const dist = Array.from(
      { length: rows },
      () => Array(cols).fill(-1)
    )

    const queue = [from]
    let head = 0

    const [sr, sc] = from
    dist[sr][sc] = 0

    while (head < queue.length) {
      const [r, c] = queue[head++]

      if (r === to[0] && c === to[1]) {
        return dist[r][c]
      }

      for (const [dr, dc] of dirs) {
        const nr = r + dr
        const nc = c + dc

        if (
          nr < 0 ||
          nr >= rows ||
          nc < 0 ||
          nc >= cols
        ) {
          continue
        }

        if (maps[nr][nc] === "X") continue
        if (dist[nr][nc] !== -1) continue

        dist[nr][nc] = dist[r][c] + 1
        queue.push([nr, nc])
      }
    }

    return -1
  }

  const toLever = bfs(start, lever)
  if (toLever === -1) return -1

  const toExit = bfs(lever, exit)
  if (toExit === -1) return -1

  return toLever + toExit
}
```

---

## 6. 4 câu thần chú trước khi code

### LOOP LEVELS

```text
find S/L/E

bfs(S,L)
if fail → -1

bfs(L,E)
if fail → -1

return sum
```

### RESET WHEN

Giữa hai phase:

```text
RESET visited/dist
RESET queue/head
```

Đây là trap chính.

### INVALIDATES WHAT

Neighbor invalid nếu:

```text
out of bounds
X
visited trong phase hiện tại
```

Không invalid `E` ở phase 1.

### COMMIT WHEN

Khi BFS chạm target:

```js
return dist[r][c]
```

Cuối cùng:

```js
return toLever + toExit
```

---

## 7. Trap dễ chết

### Trap 1 — Block E trước khi kéo lever

Sai.

Đề nói rõ:

> chưa kéo lever vẫn được đi qua ô E.

Chỉ `X` là không đi được.

---

### Trap 2 — Không reset visited giữa 2 BFS

Sai.

Một ô đi qua ở phase 1 hoàn toàn có thể phải đi lại ở phase 2.

---

### Trap 3 — Dùng một BFS rồi dừng khi gặp E trước L

Sai goal.

Goal phase 1 là:

```text
L
```

không phải E.

---

### Trap 4 — Dùng queue.shift()

Không cần.

Dùng head pointer.

---

### Trap 5 — Cộng distance theo kiểu bài Game Map

Bài này hỏi:

```text
thời gian di chuyển
```

nên start distance = 0.

Khác Bài 27 là đề đếm **số ô trên path**, nên start dist = 1.

---

## 8. Recall 20 giây

> **Nhận diện:** shortest path phải qua checkpoint L → BFS 2 phase.

> **Phase 1:** S → L.

> **RESET.**

> **Phase 2:** L → E.

> **Walkable:** S/E/L/O; chỉ X là wall.

> **Fail bất kỳ phase nào:** -1.

> **Queue:** head pointer.

> **Complexity:** O(R*C).

### Code shape

```js
const a = bfs(S, L)
if (a === -1) return -1

const b = bfs(L, E)
if (b === -1) return -1

return a + b
```

## 🧠 Một câu phải khắc vào đầu

> **“Checkpoint bắt buộc → chia shortest path thành nhiều BFS; mỗi BFS reset visited.”**

---

[⬆ Quay lại INDEX](00_PCCP_FINAL_INDEX.md)

---

---

# Bài 29 — 네트워크 (Mạng lưới)

🔗 **Đề chính thức (Programmers):** https://school.programmers.co.kr/learn/courses/30/lessons/43162

**Pattern:** Connected Components / DFS or BFS  
**Trigger:** `graph có nhiều cụm rời nhau + hỏi có bao nhiêu nhóm liên thông`

---

## 1. Dịch đề tiếng Việt

Có `n` máy tính, đánh số:

```text
0 ... n-1
```

`computers[i][j] === 1` nghĩa là:

```text
máy i kết nối trực tiếp với máy j
```

Nếu:

```text
A ↔ B
B ↔ C
```

thì A và C cũng được coi là cùng một network dù không nối trực tiếp.

Mục tiêu:

> đếm số **network độc lập**, tức số **connected components** của graph.

---

## 2. Phân tích 9 bước

### STEP 1 — CONTRACT

Mỗi computer là một node.

Hai node có edge nếu:

```js
computers[i][j] === 1
```

Mỗi lần bắt đầu traversal từ một node chưa visited:

```text
ta vừa phát hiện một component mới
```

→ `count++`

Sau đó DFS/BFS để mark toàn bộ component đó.

---

### STEP 2 — BOUND

```text
n <= 200
```

Input là adjacency matrix `n x n`.

Với mỗi node, scan toàn bộ row để tìm neighbor:

```text
O(N)
```

Toàn bộ traversal:

```text
O(N²)
```

Với N=200 thì cực nhẹ.

---

### STEP 3 — BRUTE FORCE

Không cần thử mọi cặp node để suy network thủ công.

Graph traversal đã làm đúng việc đó:

```text
start ở 1 node
→ lan ra mọi node reachable
```

---

### STEP 4 — BOTTLENECK

Điểm lõi là:

> **count component ở outer loop, không count node.**

Mỗi lần gặp:

```js
if (!visited[i])
```

thì đó là một component mới.

Sau khi DFS/BFS xong, toàn bộ node trong component đó đã visited.

---

### STEP 5 — STATE

Ta cần:

```js
const visited = Array(n).fill(false)
let count = 0
```

DFS state:

```js
dfs(node)
```

---

### STEP 6 — TRANSITION

Outer loop:

```js
for (let i = 0; i < n; i++) {
  if (visited[i]) continue

  count++
  dfs(i)
}
```

DFS:

```js
visited[node] = true

for (let next = 0; next < n; next++) {
  if (computers[node][next] !== 1) continue
  if (visited[next]) continue

  dfs(next)
}
```

---

### STEP 7 — INVARIANT

Sau khi `dfs(start)` kết thúc:

> tất cả computer thuộc cùng network với `start` đã được mark visited.

Do đó outer loop sẽ không count component đó lần nữa.

---

### STEP 8 — PATTERN

**Pattern:** Connected Components.

Dấu hiệu:

- graph có thể không connected
- hỏi có bao nhiêu nhóm / cụm / network / islands
- cần đếm số vùng liên thông

Trigger sentence:

> **“Mỗi node chưa visited ở outer loop = một component mới.”**

---

### STEP 9 — COMPLEXITY

Adjacency matrix:

```text
O(N²)
```

Space:

```text
O(N)
```

cho visited + recursion stack.

### JS safety

```text
N <= 200
```

Recursion depth tối đa 200.

→ an toàn.

---

## 3. Dry Run — 7 cột chuyển tư duy thành code

Input:

```js
n = 3
computers = [
  [1,1,0],
  [1,1,0],
  [0,0,1]
]
```

Start outer loop:

| i | visited trước | Action | count | Sau DFS |
|---:|---|---|---:|---|
| 0 | false | component mới → dfs(0) | 1 | 0,1 visited |
| 1 | true | skip | 1 | giữ nguyên |
| 2 | false | component mới → dfs(2) | 2 | 2 visited |

Answer:

```text
2
```

---

## 4. Bộ phim hình ảnh

Tưởng tượng các computer là các hòn đảo người đứng trên đó nối bằng cầu.

Mày đi từ computer 0:

```text
0 → các node nối với 0
→ các node nối tiếp nữa
→ đi cho tới hết cụm
```

Xong quay lại outer loop.

Gặp node nào chưa từng đặt chân tới:

```text
đó là một hòn đảo/network mới
```

→ `count++`.

---

## 5. Code Skeleton Recall — DFS

```js
function solution(n, computers) {
  const visited = Array(n).fill(false)

  function dfs(node) {
    visited[node] = true

    for (let next = 0; next < n; next++) {
      if (computers[node][next] !== 1) {
        continue
      }

      if (visited[next]) {
        continue
      }

      dfs(next)
    }
  }

  let answer = 0

  for (let i = 0; i < n; i++) {
    if (visited[i]) continue

    answer++
    dfs(i)
  }

  return answer
}
```

---

## 6. BFS version để nhận dạng tương đương

```js
function bfs(start) {
  const queue = [start]
  let head = 0

  visited[start] = true

  while (head < queue.length) {
    const node = queue[head++]

    for (let next = 0; next < n; next++) {
      if (computers[node][next] !== 1) continue
      if (visited[next]) continue

      visited[next] = true
      queue.push(next)
    }
  }
}
```

DFS hay BFS đều đúng vì bài chỉ cần traverse component, không cần shortest path.

---

## 7. 4 câu thần chú trước khi code

### LOOP LEVELS

```text
for every node
    if already visited → skip

    answer++
    traverse entire component
```

### RESET WHEN

Không reset visited giữa các component.

`visited` phải sống xuyên suốt toàn bài để nhớ component nào đã xử lý.

### INVALIDATES WHAT

Neighbor invalid nếu:

```text
không có edge
hoặc đã visited
```

### COMMIT WHEN

Commit component count ở:

```js
if (!visited[i]) {
  answer++
  dfs(i)
}
```

Không count trong DFS.

---

## 8. Trap dễ chết

### Trap 1 — Count mỗi lần dfs recursion

Sai.

Ta cần count **component**, không phải node.

Chỉ count ở outer loop khi gặp node chưa visited.

---

### Trap 2 — Reset visited mỗi component

Sai.

Nếu reset thì component cũ sẽ bị count lại.

---

### Trap 3 — Bỏ visited vì matrix có diagonal 1

`computers[i][i] = 1`.

Không visited thì node sẽ tự gọi lại chính nó / cycle.

---

### Trap 4 — Nghĩ chỉ direct connection mới cùng network

Sai.

Connected component tính cả kết nối gián tiếp.

---

### Trap 5 — Nhầm với shortest path BFS

Bài này không hỏi distance.

DFS đơn giản là đủ.

---

## 9. Recall 20 giây

> **Nhận diện:** hỏi số network/cụm liên thông → Connected Components.

> **Outer loop:** gặp node chưa visited → `answer++`.

> **Traversal:** DFS/BFS mark hết component đó.

> **State:** `visited`.

> **Matrix neighbor:** `computers[node][next] === 1`.

> **Complexity:** O(N²).

### Code shape

```js
for (let i = 0; i < n; i++) {
  if (visited[i]) continue

  answer++
  dfs(i)
}
```

## 🧠 Một câu phải khắc vào đầu

> **“Component count nằm ở outer loop: gặp node chưa visited → +1 rồi flood-fill cả cụm.”**

---

[⬆ Quay lại INDEX](00_PCCP_FINAL_INDEX.md)

---

---

# Bài 30 — 단어 변환 (Chuyển đổi từ)

🔗 **Đề chính thức (Programmers):** https://school.programmers.co.kr/learn/courses/30/lessons/43163

**Pattern:** Implicit Graph + BFS Shortest Path  
**Trigger:** `state là word + rule tự tạo cạnh + mỗi lần đổi 1 bước + cần minimum steps`

---

## 1. Dịch đề tiếng Việt

Có:

```text
begin
target
words
```

Quy tắc:

1. Mỗi lần chỉ được đổi **đúng 1 ký tự**.
2. Sau khi đổi, từ mới phải nằm trong `words`.

Ví dụ:

```text
hit → hot → dot → dog → cog
```

cần 4 bước.

Mục tiêu:

> tìm số bước ít nhất để đổi `begin` thành `target`.

Nếu không thể:

```text
return 0
```

---

## 2. Phân tích 9 bước

### STEP 1 — CONTRACT

Mỗi word là một node.

Giữa hai word có edge nếu:

```text
chúng khác đúng 1 ký tự
```

Mỗi edge có cost:

```text
1
```

Ta cần shortest path từ:

```text
begin
```

đến:

```text
target
```

→ BFS.

---

### STEP 2 — BOUND

```text
words.length <= 50
word.length <= 10
```

Nếu từ mỗi current word ta scan toàn bộ words và so từng ký tự:

```text
O(N² * L)
```

Tối đa khoảng:

```text
50 * 50 * 10 = 25,000
```

quá nhẹ.

Không cần prebuild graph phức tạp.

---

### STEP 3 — BRUTE FORCE

DFS có thể thử path, nhưng không đảm bảo path đầu tiên là shortest.

Vì mỗi transformation cost 1:

```text
BFS = shortest path
```

---

### STEP 4 — BOTTLENECK

Điểm đặc biệt là graph **không được cho sẵn**.

Ta phải tự xác định:

```text
current word có thể đi sang word nào?
```

Rule:

```text
khác đúng 1 ký tự
```

Đó là **implicit graph**.

---

### STEP 5 — STATE

Queue state:

```js
[word, steps]
```

Visited:

```js
const visited = Array(words.length).fill(false)
```

Có thể visited theo index vì `words` không duplicate.

---

### STEP 6 — TRANSITION

Helper:

```js
function canTransform(a, b) {
  let diff = 0

  for (let i = 0; i < a.length; i++) {
    if (a[i] !== b[i]) {
      diff++

      if (diff > 1) {
        return false
      }
    }
  }

  return diff === 1
}
```

BFS:

```text
pop current
→ scan all words chưa visited
→ nếu khác đúng 1 ký tự
→ mark visited
→ enqueue với steps+1
```

---

### STEP 7 — INVARIANT

Khi một word được enqueue lần đầu:

> số `steps` đi cùng nó là shortest distance từ begin tới word đó.

Vì mọi transformation cost bằng 1.

---

### STEP 8 — PATTERN

**Pattern:** Implicit Graph + BFS.

Dấu hiệu:

- không có adjacency list/matrix
- đề cho một **rule chuyển trạng thái**
- mỗi transition cost như nhau
- hỏi minimum number of transitions

Trigger sentence:

> **“Không có graph sẵn nhưng có rule tạo neighbor + mỗi bước cost 1 → BFS trên implicit graph.”**

---

### STEP 9 — COMPLEXITY

Có tối đa `N` word.

Mỗi word pop ra có thể scan `N` candidates.

Mỗi comparison tốn `L`.

```text
O(N² * L)
```

Với:

```text
N <= 50
L <= 10
```

→ rất nhỏ.

Space:

```text
O(N)
```

---

## 3. Dry Run — 7 cột chuyển tư duy thành code

```js
begin = "hit"
target = "cog"

words = [
  "hot",
  "dot",
  "dog",
  "lot",
  "log",
  "cog"
]
```

BFS:

```text
hit
↓
hot          step 1
↓
dot / lot    step 2
↓
dog / log    step 3
↓
cog          step 4
```

Lần đầu gặp:

```text
cog
```

→ answer = 4.

---

## 4. Bộ phim hình ảnh

Mỗi word là một căn phòng.

Không có bản đồ nối phòng sẵn.

Mỗi lần đứng ở một phòng:

```text
current
```

mày nhìn toàn bộ `words` và hỏi:

```text
word nào khác current đúng 1 ký tự?
```

Những word đó là phòng kề.

BFS lan theo layer:

```text
1 lần đổi
2 lần đổi
3 lần đổi
...
```

Target xuất hiện lần đầu = shortest.

---

## 5. Code Skeleton Recall

```js
function solution(begin, target, words) {
  if (!words.includes(target)) {
    return 0
  }

  function canTransform(a, b) {
    let diff = 0

    for (let i = 0; i < a.length; i++) {
      if (a[i] !== b[i]) {
        diff++

        if (diff > 1) {
          return false
        }
      }
    }

    return diff === 1
  }

  const visited =
    Array(words.length).fill(false)

  const queue = [[begin, 0]]
  let head = 0

  while (head < queue.length) {
    const [current, steps] =
      queue[head++]

    if (current === target) {
      return steps
    }

    for (let i = 0; i < words.length; i++) {
      if (visited[i]) continue

      if (!canTransform(current, words[i])) {
        continue
      }

      visited[i] = true

      queue.push([
        words[i],
        steps + 1
      ])
    }
  }

  return 0
}
```

---

## 6. 4 câu thần chú trước khi code

### LOOP LEVELS

```text
while queue not exhausted
    pop current
    for every word
        if unvisited
        if differs exactly 1 char
            mark
            enqueue steps+1
```

### RESET WHEN

Không reset visited trong BFS.

### INVALIDATES WHAT

Candidate invalid nếu:

```text
đã visited
hoặc khác không đúng 1 ký tự
```

### COMMIT WHEN

Khi:

```js
current === target
```

return ngay `steps`.

---

## 7. Trap dễ chết

### Trap 1 — target không có trong words

Theo rule chỉ được đổi thành từ trong `words`.

Nếu target không tồn tại:

```js
return 0
```

ngay.

---

### Trap 2 — Cho phép khác 0 ký tự

Sai.

Edge chỉ tồn tại khi:

```text
diff === 1
```

không phải `<= 1`.

---

### Trap 3 — DFS rồi lấy path đầu tiên

Không đảm bảo shortest.

BFS.

---

### Trap 4 — Prebuild graph quá phức tạp

N chỉ 50.

Scan toàn bộ words trực tiếp trong BFS vừa sạch vừa an toàn.

---

### Trap 5 — Mark visited khi dequeue

Có thể enqueue cùng một word nhiều lần.

Phải mark ngay khi enqueue.

---

### Trap 6 — Dùng queue.shift()

Không cần.

Dùng head pointer.

---

## 8. Recall 20 giây

> **Nhận diện:** rule tạo neighbor + min transitions → implicit graph BFS.

> **Node:** word.

> **Edge:** khác đúng 1 ký tự.

> **Queue state:** `[word, steps]`.

> **Visited:** word/index mark khi enqueue.

> **Target absent:** return 0.

> **Complexity:** O(N²L).

### Code shape

```js
queue = [[begin, 0]]

while (head < queue.length) {
  const [cur, step] = queue[head++]

  if (cur === target) {
    return step
  }

  for (each word) {
    if (visited) continue
    if (diff(cur, word) !== 1) continue

    visited = true
    queue.push([word, step + 1])
  }
}
```

## 🧠 Một câu phải khắc vào đầu

> **“Graph không cho sẵn thì tự định nghĩa neighbor; mỗi step cost 1 và hỏi min → BFS.”**

---

[⬆ Quay lại INDEX](00_PCCP_FINAL_INDEX.md)

---

---

# Bài 31 — 가장 먼 노드 (Node xa nhất)

🔗 **Đề chính thức (Programmers):** https://school.programmers.co.kr/learn/courses/30/lessons/49189

**Pattern:** BFS Graph / Distance Layers  
**Trigger:** `graph vô hướng + mọi edge cost = 1 + cần shortest distance từ 1 tới mọi node`

---

## 1. Dịch đề tiếng Việt

Có một graph gồm `n` node, đánh số:

```text
1 ... n
```

Ta cần tìm:

> có bao nhiêu node nằm **xa node 1 nhất**, trong đó “xa” được tính bằng **số edge của shortest path** từ node 1 tới node đó.

Input:

```text
vertex = [[a,b], ...]
```

mỗi `[a,b]` là một edge hai chiều.

Return:

```text
số node có shortest distance lớn nhất từ node 1
```

---

## 2. Phân tích 9 bước

### STEP 1 — CONTRACT

Ta cần biết:

```text
dist[1 → node]
```

cho mọi node.

Sau đó:

```text
maxDistance = max(dist)
answer = số node có dist === maxDistance
```

---

### STEP 2 — BOUND

```text
n <= 20,000
edges <= 50,000
```

Phải dùng:

```text
adjacency list
```

Không dùng adjacency matrix vì:

```text
20,000² = 400,000,000 ô
```

quá lớn.

BFS adjacency list:

```text
O(N + E)
```

---

### STEP 3 — BRUTE FORCE

Sai:

```text
từ node 1 chạy shortest path riêng tới từng node
```

BFS một lần đã cho shortest distance tới tất cả node.

---

### STEP 4 — BOTTLENECK

Mọi edge đều có weight:

```text
1
```

nên BFS theo layer:

```text
dist = 0
dist = 1
dist = 2
...
```

Lần đầu tới node là shortest.

Không cần Dijkstra.

---

### STEP 5 — STATE

Adjacency:

```js
const graph =
  Array.from({ length: n + 1 }, () => [])
```

Distance:

```js
const dist = Array(n + 1).fill(-1)
```

Queue:

```js
const queue = [1]
let head = 0
```

Start:

```js
dist[1] = 0
```

---

### STEP 6 — TRANSITION

Build graph hai chiều:

```js
for (const [a,b] of edge) {
  graph[a].push(b)
  graph[b].push(a)
}
```

BFS:

```js
while (head < queue.length) {
  const node = queue[head++]

  for (const next of graph[node]) {
    if (dist[next] !== -1) continue

    dist[next] = dist[node] + 1
    queue.push(next)
  }
}
```

Sau BFS:

```js
const maxDistance = Math.max(...dist.slice(1))
```

Nhưng với N=20,000 thì spread vẫn thường ổn, song recall thi chắc tay hơn là scan loop:

```js
let maxDistance = 0
for (let i=1; i<=n; i++) {
  maxDistance = Math.max(maxDistance, dist[i])
}
```

Rồi count.

---

### STEP 7 — INVARIANT

Khi một node được enqueue lần đầu:

> `dist[node]` là shortest distance từ node 1 tới node đó.

BFS xử lý theo increasing distance layer.

---

### STEP 8 — PATTERN

**Pattern:** BFS shortest path in unweighted graph.

Dấu hiệu:

- graph
- edge hai chiều / vô hướng
- mọi edge cost bằng nhau
- hỏi shortest distance / level từ một source

Trigger sentence:

> **“Unweighted graph + shortest distance từ một source → BFS.”**

---

### STEP 9 — COMPLEXITY

Build graph:

```text
O(E)
```

BFS:

```text
O(N + E)
```

Final scan:

```text
O(N)
```

Total:

```text
O(N + E)
```

Space:

```text
O(N + E)
```

### JS safety

Không dùng:

```js
queue.shift()
```

Dùng head pointer.

Adjacency list bắt buộc với N=20,000.

---

## 3. Dry Run

Ví dụ:

```js
n = 6
vertex = [
  [3,6],
  [4,3],
  [3,2],
  [1,3],
  [1,2],
  [2,4],
  [5,2]
]
```

BFS từ 1:

```text
dist[1] = 0

layer 1:
2, 3

layer 2:
4, 5, 6
```

Distance:

```text
1 → 0
2 → 1
3 → 1
4 → 2
5 → 2
6 → 2
```

Max:

```text
2
```

Có 3 node:

```text
4,5,6
```

→ answer = 3.

---

## 4. Bộ phim hình ảnh

Tưởng tượng node 1 phát sóng:

```text
vòng 0: node 1
vòng 1: hàng xóm của 1
vòng 2: hàng xóm chưa thăm của vòng 1
...
```

Vòng xa nhất chính là layer cuối có node.

Ta chỉ cần đếm số node ở layer đó.

---

## 5. Code Skeleton Recall

```js
function solution(n, edge) {
  const graph =
    Array.from({ length: n + 1 }, () => [])

  for (const [a, b] of edge) {
    graph[a].push(b)
    graph[b].push(a)
  }

  const dist =
    Array(n + 1).fill(-1)

  const queue = [1]
  let head = 0

  dist[1] = 0

  while (head < queue.length) {
    const node = queue[head++]

    for (const next of graph[node]) {
      if (dist[next] !== -1) {
        continue
      }

      dist[next] = dist[node] + 1
      queue.push(next)
    }
  }

  let maxDistance = 0

  for (let i = 1; i <= n; i++) {
    if (dist[i] > maxDistance) {
      maxDistance = dist[i]
    }
  }

  let answer = 0

  for (let i = 1; i <= n; i++) {
    if (dist[i] === maxDistance) {
      answer++
    }
  }

  return answer
}
```

---

## 6. 4 câu thần chú trước khi code

### LOOP LEVELS

```text
build graph

BFS from 1
    pop
    for neighbors
        if unvisited
            dist = parent + 1
            enqueue

scan max
scan count
```

### RESET WHEN

Không reset distance.

Một BFS duy nhất từ source 1.

### INVALIDATES WHAT

Neighbor invalid nếu:

```text
đã có dist != -1
```

### COMMIT WHEN

Khi discover:

```js
dist[next] = dist[node] + 1
```

Cuối cùng mới commit answer bằng count của `maxDistance`.

---

## 7. Trap dễ chết

### Trap 1 — Dùng adjacency matrix

N tới 20,000.

Không nên.

Dùng adjacency list.

---

### Trap 2 — Dùng Dijkstra

Không cần.

Edge cost đồng đều = 1.

BFS đủ.

---

### Trap 3 — queue.shift()

Không dùng cho queue lớn.

Head pointer.

---

### Trap 4 — Mark visited quá muộn

`dist[next] = ...` ngay khi enqueue.

---

### Trap 5 — Đếm node xa nhất trong lúc BFS nhưng update lộn

Cách ít lỗi nhất:

```text
BFS xong → tìm max → count
```

Đừng tối ưu state khi chưa cần.

---

## 8. Recall 20 giây

> **Nhận diện:** graph unweighted + distance từ node 1 → BFS.

> **Graph:** adjacency list 2 chiều.

> **State:** `dist[node]`.

> **Queue:** array + head.

> **Transition:** `dist[next] = dist[cur] + 1`.

> **Cuối:** max dist → count số node bằng max.

> **Complexity:** O(N+E).

### Code shape

```js
dist[1] = 0
queue = [1]

while (head < queue.length) {
  cur = queue[head++]

  for (next of graph[cur]) {
    if (dist[next] !== -1) continue

    dist[next] = dist[cur] + 1
    queue.push(next)
  }
}
```

## 🧠 Một câu phải khắc vào đầu

> **“Unweighted graph → BFS một lần từ source cho shortest distance tới tất cả node; cuối cùng lấy layer xa nhất.”**

---

[⬆ Quay lại INDEX](00_PCCP_FINAL_INDEX.md)

---

---

# Bài 32 — 배달 (Giao hàng)

🔗 **Đề chính thức (Programmers):** https://school.programmers.co.kr/learn/courses/30/lessons/12978

**Pattern:** Dijkstra / Weighted Shortest Path  
**Trigger:** `graph + edge weight khác nhau + cần shortest distance từ 1 tới mọi node`

---

## 1. Dịch đề tiếng Việt

Có `N` thị trấn, đánh số:

```text
1 ... N
```

Các thị trấn nối với nhau bằng đường hai chiều.

Mỗi road:

```js
[a, b, cost]
```

nghĩa là:

```text
a ↔ b
```

và đi qua road đó tốn:

```text
cost
```

Nhà hàng nằm ở town `1`.

Ta cần đếm số town có thể giao hàng trong thời gian:

```text
<= K
```

Nói cách khác:

> đếm số node có **shortest weighted distance từ node 1 <= K**.

---

## 2. Phân tích 9 bước

### STEP 1 — CONTRACT

Ta cần shortest distance:

```text
dist[1 → town]
```

nhưng edge có weight khác nhau.

Không thể chỉ đếm số edge.

---

### STEP 2 — BOUND

```text
N <= 50
road.length <= 2000
```

Dijkstra:

```text
O((N + E) log N)
```

quá nhẹ.

---

### STEP 3 — BRUTE FORCE

Sai:

```text
thử mọi path
```

Có thể cycle và số path bùng nổ.

Sai khác:

```text
BFS theo số edge
```

vì:

```text
1 edge nặng 100
```

có thể tệ hơn:

```text
3 edge tổng 3
```

---

### STEP 4 — BOTTLENECK

Khác Bài 31:

```text
Bài 31:
mọi edge cost = 1
→ BFS

Bài 32:
edge cost khác nhau
→ Dijkstra
```

Ta luôn muốn xử lý node có:

```text
distance nhỏ nhất hiện tại
```

→ Min-Heap.

---

### STEP 5 — STATE

Adjacency list:

```js
graph[node] = [
  [next, cost],
  ...
]
```

Distance:

```js
dist[node]
```

Heap entry:

```js
[distance, node]
```

Start:

```js
dist[1] = 0
heap.push([0, 1])
```

---

### STEP 6 — TRANSITION

Pop:

```js
const [currentDist, node] = heap.pop()
```

Nếu stale:

```js
if (currentDist > dist[node]) {
  continue
}
```

Relax mỗi edge:

```js
const nextDist =
  currentDist + cost

if (nextDist < dist[next]) {
  dist[next] = nextDist
  heap.push([nextDist, next])
}
```

---

### STEP 7 — INVARIANT

`dist[x]` luôn là:

> khoảng cách tốt nhất đã biết hiện tại từ node 1 tới x.

Khi pop heap entry có:

```js
currentDist === dist[node]
```

thì đó là candidate tốt nhất hiện tại để relax neighbors.

Stale entry cũ phải bỏ qua.

---

### STEP 8 — PATTERN

**Pattern:** Dijkstra.

Dấu hiệu:

- graph
- edge weight không âm
- cost khác nhau
- shortest distance từ một source

Trigger sentence:

> **“Weighted graph + non-negative edges + shortest path → Dijkstra.”**

---

### STEP 9 — COMPLEXITY

Adjacency list:

```text
O(E)
```

Dijkstra:

```text
O((N + E) log N)
```

Final count:

```text
O(N)
```

Space:

```text
O(N + E)
```

---

## 3. Parallel edge — trap riêng của bài này

Có thể có nhiều road giữa cùng hai town:

```text
1 ↔ 2 cost 5
1 ↔ 2 cost 2
```

Không sao cả.

Cứ add cả hai vào adjacency list:

```js
graph[a].push([b, cost])
graph[b].push([a, cost])
```

Dijkstra tự relax đường tốt hơn.

Không cần dedupe trước.

---

## 4. Dry Run

Ví dụ:

```js
N = 5
K = 3
```

Giả sử sau Dijkstra:

```text
dist[1] = 0
dist[2] = 1
dist[3] = 4
dist[4] = 2
dist[5] = 3
```

Town deliver được:

```text
1,2,4,5
```

vì:

```text
dist <= 3
```

→ answer = 4.

---

## 5. Bộ phim hình ảnh

Tưởng tượng mỗi town có một tờ giấy ghi:

```text
best distance known
```

Ban đầu:

```text
town 1 = 0
các town khác = Infinity
```

Heap luôn lấy town rẻ nhất hiện tại ra.

Từ town đó:

```text
thử đi sang neighbor
```

Nếu tìm được đường ngắn hơn:

```text
update dist
push candidate mới vào heap
```

---

## 6. Min-Heap dùng cho Dijkstra

```js
class MinHeap {
  constructor() {
    this.heap = []
  }

  size() {
    return this.heap.length
  }

  push(value) {
    const heap = this.heap
    heap.push(value)

    let i = heap.length - 1

    while (i > 0) {
      const parent =
        Math.floor((i - 1) / 2)

      if (heap[parent][0] <= heap[i][0]) {
        break
      }

      ;[heap[parent], heap[i]] =
        [heap[i], heap[parent]]

      i = parent
    }
  }

  pop() {
    const heap = this.heap

    if (heap.length === 1) {
      return heap.pop()
    }

    const root = heap[0]
    heap[0] = heap.pop()

    let i = 0

    while (true) {
      let smallest = i
      const left = i * 2 + 1
      const right = i * 2 + 2

      if (
        left < heap.length &&
        heap[left][0] < heap[smallest][0]
      ) {
        smallest = left
      }

      if (
        right < heap.length &&
        heap[right][0] < heap[smallest][0]
      ) {
        smallest = right
      }

      if (smallest === i) {
        break
      }

      ;[heap[i], heap[smallest]] =
        [heap[smallest], heap[i]]

      i = smallest
    }

    return root
  }
}
```

---

## 7. Code Skeleton Recall

```js
function solution(N, road, K) {
  const graph =
    Array.from({ length: N + 1 }, () => [])

  for (const [a, b, cost] of road) {
    graph[a].push([b, cost])
    graph[b].push([a, cost])
  }

  const dist =
    Array(N + 1).fill(Infinity)

  const heap = new MinHeap()

  dist[1] = 0
  heap.push([0, 1])

  while (heap.size() > 0) {
    const [currentDist, node] =
      heap.pop()

    if (currentDist > dist[node]) {
      continue
    }

    for (const [next, cost] of graph[node]) {
      const nextDist =
        currentDist + cost

      if (nextDist >= dist[next]) {
        continue
      }

      dist[next] = nextDist
      heap.push([nextDist, next])
    }
  }

  let answer = 0

  for (let town = 1; town <= N; town++) {
    if (dist[town] <= K) {
      answer++
    }
  }

  return answer
}
```

---

## 8. 4 câu thần chú trước khi code

### LOOP LEVELS

```text
build weighted graph

while heap not empty
    pop min-distance state
    stale? skip

    for each edge
        calculate nextDist
        if better
            update
            push
```

### RESET WHEN

Không reset dist.

Một source duy nhất:

```text
town 1
```

### INVALIDATES WHAT

Heap state invalid nếu stale:

```js
currentDist > dist[node]
```

Relax invalid nếu:

```js
nextDist >= dist[next]
```

### COMMIT WHEN

Khi tìm được shorter path:

```js
dist[next] = nextDist
heap.push([nextDist, next])
```

---

## 9. Trap dễ chết

### Trap 1 — Dùng BFS

Sai vì edge weights khác nhau.

---

### Trap 2 — Không check stale heap entry

Một node có thể được push nhiều lần.

Entry cũ phải skip:

```js
if (currentDist > dist[node]) continue
```

---

### Trap 3 — Quên road hai chiều

Phải add:

```js
a → b
b → a
```

---

### Trap 4 — Parallel edges

Có thể có nhiều road cùng cặp node.

Đừng overwrite.

Add hết; Dijkstra tự chọn đường tốt hơn.

---

### Trap 5 — Đếm `< K` thay vì `<= K`

Đề là giao trong thời gian không vượt quá K.

Phải:

```js
dist[town] <= K
```

---

## 10. Recall 20 giây

> **Nhận diện:** weighted graph + shortest → Dijkstra.

> **State:** `dist[node]`.

> **PQ:** min by distance.

> **Pop stale:** skip.

> **Relax:** nếu `current + weight < dist[next]`.

> **Graph:** undirected, parallel edges okay.

> **Cuối:** count `dist <= K`.

> **Complexity:** O((N+E)logN).

### Code shape

```js
while (heap.size()) {
  const [d, node] = heap.pop()

  if (d > dist[node]) continue

  for (const [next, w] of graph[node]) {
    const nd = d + w

    if (nd >= dist[next]) continue

    dist[next] = nd
    heap.push([nd, next])
  }
}
```

## 🧠 Một câu phải khắc vào đầu

> **“BFS chỉ khi edge cost bằng nhau; weighted non-negative thì Dijkstra = pop min → stale skip → relax.”**

---

[⬆ Quay lại INDEX](00_PCCP_FINAL_INDEX.md)

---

---

# Bài 36 — 숫자 변환하기 (Biến đổi số)

🔗 **Đề chính thức (Programmers):** https://school.programmers.co.kr/learn/courses/30/lessons/154538

**Pattern:** BFS on State Space / Shortest Operations  
**Trigger:** `state là một số + mỗi operation cost = 1 + hỏi minimum operations`

---

## 1. Dịch đề tiếng Việt

Ta muốn biến số tự nhiên `x` thành `y`.

Mỗi lần được chọn đúng một operation:

```text
x + n
x * 2
x * 3
```

Mỗi operation tính là:

```text
1 bước
```

Mục tiêu:

> tìm số operation ít nhất để biến `x` thành `y`.

Nếu không thể:

```text
return -1
```

---

## 2. Phân tích 9 bước

### STEP 1 — CONTRACT

Mỗi giá trị number là một state.

Từ state `value`, neighbors là:

```text
value + n
value * 2
value * 3
```

Mọi transition đều cost:

```text
1
```

→ shortest number of operations = BFS.

---

### STEP 2 — BOUND

```text
1 <= x <= y <= 1,000,000
```

Mọi operation đều làm số tăng.

Do đó nếu:

```text
next > y
```

thì không bao giờ quay lại y được.

→ không enqueue.

Visited tối đa:

```text
y + 1
```

≈ 1 triệu state.

JS vẫn ổn.

---

### STEP 3 — BRUTE FORCE

DFS có thể tạo 3 nhánh mỗi bước:

```text
3^depth
```

rất nhanh bùng nổ.

BFS + visited tránh xét lại cùng state.

---

### STEP 4 — BOTTLENECK

Ta cần:

> **minimum số operation**

và tất cả transition cost bằng nhau.

Đó là dấu hiệu BFS chuẩn.

---

### STEP 5 — STATE

Queue state có thể là:

```js
[value, steps]
```

Visited:

```js
const visited =
  Array(y + 1).fill(false)
```

Start:

```js
queue = [[x, 0]]
visited[x] = true
```

---

### STEP 6 — TRANSITION

Từ current:

```js
const nextValues = [
  current + n,
  current * 2,
  current * 3,
]
```

Mỗi next:

```text
> y → skip
visited → skip
else mark + enqueue
```

---

### STEP 7 — INVARIANT

Khi một number được enqueue lần đầu:

> số `steps` đi cùng nó là minimum operations để đi từ x tới number đó.

BFS đi theo layer:

```text
0 operations
1 operation
2 operations
...
```

---

### STEP 8 — PATTERN

**Pattern:** BFS on state transformation.

Dấu hiệu:

- state không nhất thiết là graph node có sẵn
- đề cho vài operation để sinh state mới
- mỗi operation cost như nhau
- hỏi minimum operations

Trigger sentence:

> **“Rule sinh state + mỗi bước cost 1 + hỏi min → BFS.”**

---

### STEP 9 — COMPLEXITY

Mỗi integer từ x tới y visited tối đa một lần.

Mỗi state sinh tối đa 3 neighbors.

Time:

```text
O(y - x + 1)
```

Space:

```text
O(y)
```

Worst case:

```text
~1,000,001
```

vẫn ổn.

---

## 3. Dry Run

Ví dụ:

```js
x = 10
y = 40
n = 5
```

BFS:

```text
step 0:
10

step 1:
15, 20, 30

step 2:
...
40
```

Có path:

```text
10 → 20 → 40
```

→ answer = 2.

---

## 4. Bộ phim hình ảnh

Tưởng tượng từ `x` mọc ra 3 cành:

```text
+n
*2
*3
```

BFS lan theo số operation:

```text
layer 0 = x
layer 1 = các số đạt sau 1 operation
layer 2 = các số đạt sau 2 operations
...
```

Lần đầu chạm `y` = minimum.

---

## 5. Code Skeleton Recall

```js
function solution(x, y, n) {
  if (x === y) {
    return 0
  }

  const visited =
    Array(y + 1).fill(false)

  const queue = [[x, 0]]
  let head = 0

  visited[x] = true

  while (head < queue.length) {
    const [current, steps] =
      queue[head++]

    const nextValues = [
      current + n,
      current * 2,
      current * 3,
    ]

    for (const next of nextValues) {
      if (next > y) {
        continue
      }

      if (visited[next]) {
        continue
      }

      if (next === y) {
        return steps + 1
      }

      visited[next] = true
      queue.push([
        next,
        steps + 1
      ])
    }
  }

  return -1
}
```

---

## 6. 4 câu thần chú trước khi code

### LOOP LEVELS

```text
queue BFS
    pop current
    generate 3 next states
        > y? skip
        visited? skip
        target? return
        mark + enqueue
```

### RESET WHEN

Không reset visited.

Một BFS duy nhất.

### INVALIDATES WHAT

State invalid nếu:

```text
next > y
hoặc đã visited
```

### COMMIT WHEN

Mark visited ngay trước enqueue:

```js
visited[next] = true
```

Khi hit target:

```js
return steps + 1
```

---

## 7. Trap dễ chết

### Trap 1 — Không bound `next > y`

Vì operation chỉ tăng, đi quá y là vô ích.

---

### Trap 2 — DFS rồi lấy path đầu tiên

Không đảm bảo minimum.

---

### Trap 3 — Không visited

Một state có thể tới từ nhiều path khác nhau.

Phải dedupe.

---

### Trap 4 — Mark visited khi dequeue

Có thể enqueue duplicate state nhiều lần.

Mark khi enqueue.

---

### Trap 5 — Quên case x === y

Constraints cho phép:

```text
x == y
```

Answer phải:

```text
0
```

---

## 8. Recall 20 giây

> **Nhận diện:** min operations + mỗi op cost 1 → BFS.

> **State:** current number.

> **Neighbors:** `+n`, `*2`, `*3`.

> **Bound:** `next <= y`.

> **Visited:** mark khi enqueue.

> **Hit y:** return steps+1.

> **Fail:** -1.

> **Complexity:** O(y).

### Code shape

```js
queue = [[x,0]]
visited[x] = true

while (head < queue.length) {
  const [cur, step] = queue[head++]

  for (const next of [
    cur + n,
    cur * 2,
    cur * 3
  ]) {
    if (next > y) continue
    if (visited[next]) continue

    if (next === y) {
      return step + 1
    }

    visited[next] = true
    queue.push([next, step + 1])
  }
}
```

## 🧠 Một câu phải khắc vào đầu

> **“Min operations + mỗi operation cost 1 → BFS; operation chỉ tăng thì bound ở y.”**

---

[⬆ Quay lại INDEX](00_PCCP_FINAL_INDEX.md)
