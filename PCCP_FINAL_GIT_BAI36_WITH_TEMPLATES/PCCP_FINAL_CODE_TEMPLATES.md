# PCCP FINAL CODE TEMPLATES — LAST NIGHT RECALL

> Mục tiêu: nhìn trigger → bật ra code shape.
> Không đọc như tài liệu. Che code và tự viết lại từ trí nhớ.

---

## 0. EXAM META

### Queue
```js
const queue = [start]
let head = 0

while (head < queue.length) {
  const cur = queue[head++]
}
```

**Không `shift()` khi input lớn.**

### Visited
- BFS: mark **khi enqueue**
- DFS: mark trước recursion / unmark nếu backtracking

### Number safety
- `Number.MAX_SAFE_INTEGER ≈ 9e15`
- Immigration answer có thể ~`1e18` → **BigInt**
- Two Queue Equal Sum max tổng ~`6e14` → **Number safe**

---

# 1. HASH FREQUENCY

**Trigger:** count / duplicate / matching / frequency.

```js
const map = new Map()

for (const x of arr) {
  map.set(x, (map.get(x) ?? 0) + 1)
}
```

Subtract:

```js
for (const x of arr2) {
  map.set(x, map.get(x) - 1)
}
```

---

# 2. ARRAY + INVERSE MAP SWAP

**Trigger:** update order repeatedly, need O(1) lookup position.

```js
const pos = new Map()

for (let i = 0; i < arr.length; i++) {
  pos.set(arr[i], i)
}

for (const x of calls) {
  const i = pos.get(x)
  const j = i - 1
  const y = arr[j]

  arr[j] = x
  arr[i] = y

  pos.set(x, j)
  pos.set(y, i)
}
```

**Invariant:** `pos.get(arr[i]) === i`.

---

# 3. FIXED SLIDING WINDOW

**Trigger:** mọi subarray/window có độ dài cố định K.

```js
const freq = new Map()

for (let i = 0; i < k; i++) {
  add(arr[i])
}

for (let left = 0; left + k <= arr.length; left++) {
  check()

  if (left + k < arr.length) {
    remove(arr[left])
    add(arr[left + k])
  }
}
```

---

# 4. VARIABLE SLIDING WINDOW

**Trigger:** contiguous + expand right + shrink while invalid.

```js
let left = 0

for (let right = 0; right < arr.length; right++) {
  add(arr[right])

  while (invalid()) {
    remove(arr[left])
    left++
  }

  if (valid()) {
    commit(left, right)
  }
}
```

**Mantra:** `EXPAND → while INVALID SHRINK → COMMIT`.

---

# 5. TWO POINTERS — POSITIVE SUM

**Trigger:** positive numbers + contiguous target sum / shortest.

```js
let left = 0
let sum = 0

for (let right = 0; right < arr.length; right++) {
  sum += arr[right]

  while (sum > target && left <= right) {
    sum -= arr[left]
    left++
  }

  if (sum === target) {
    commit(left, right)
  }
}
```

---

# 6. CIRCULAR TWO POINTERS — TWO QUEUES EQUAL SUM

**Trigger:** move front q1↔q2, all positive, equalize sum.

```js
const arr = queue1.concat(queue2)
const len = arr.length

let sum1 = queue1.reduce((a, b) => a + b, 0)
let sum2 = queue2.reduce((a, b) => a + b, 0)

const total = sum1 + sum2
if (total % 2) return -1

const target = total / 2

let left = 0
let right = queue1.length
let ops = 0
const limit = 4 * queue1.length

while (ops < limit) {
  if (sum1 === target) return ops

  if (sum1 > target) {
    sum1 -= arr[left % len]
    left++
  } else {
    sum1 += arr[right % len]
    right++
  }

  ops++
}

return -1
```

---

# 7. STACK — VALID PARENTHESES / BALANCE

```js
let balance = 0

for (const ch of s) {
  if (ch === '(') balance++
  else balance--

  if (balance < 0) return false
}

return balance === 0
```

---

# 8. MONOTONIC STACK — NEXT GREATER/SMALLER

**Trigger:** future first event resolves previous indices.

```js
const stack = []
const answer = Array(arr.length).fill(-1)

for (let i = 0; i < arr.length; i++) {
  while (
    stack.length &&
    arr[i] > arr[stack[stack.length - 1]]
  ) {
    const idx = stack.pop()
    answer[idx] = arr[i]
  }

  stack.push(i)
}
```

**Mantra:** `CURRENT resolves STACK TOP → pop → commit`.

---

# 9. GREEDY MONOTONIC STACK — REMOVE K DIGITS

```js
const stack = []

for (const ch of number) {
  while (
    k > 0 &&
    stack.length &&
    stack[stack.length - 1] < ch
  ) {
    stack.pop()
    k--
  }

  stack.push(ch)
}

while (k > 0) {
  stack.pop()
  k--
}

return stack.join('')
```

---

# 10. QUEUE SIMULATION WITH HEAD

```js
const queue = []
let head = 0

queue.push(start)

while (head < queue.length) {
  const cur = queue[head++]

  // process
  // queue.push(next)
}
```

---

# 11. BFS GRID — SHORTEST PATH

**Trigger:** grid + 4 dirs + every move cost 1 + shortest.

```js
const rows = grid.length
const cols = grid[0].length

const dist = Array.from(
  { length: rows },
  () => Array(cols).fill(-1)
)

const dirs = [
  [1, 0],
  [-1, 0],
  [0, 1],
  [0, -1],
]

const queue = [[sr, sc]]
let head = 0

dist[sr][sc] = 0

while (head < queue.length) {
  const [r, c] = queue[head++]

  for (const [dr, dc] of dirs) {
    const nr = r + dr
    const nc = c + dc

    if (
      nr < 0 || nr >= rows ||
      nc < 0 || nc >= cols
    ) continue

    if (isWall(nr, nc)) continue
    if (dist[nr][nc] !== -1) continue

    dist[nr][nc] = dist[r][c] + 1
    queue.push([nr, nc])
  }
}
```

**Mark khi enqueue.**

---

# 12. BFS 2 PHASES / MANDATORY CHECKPOINT

**Trigger:** shortest path bắt buộc qua checkpoint.

```js
const a = bfs(start, checkpoint)
if (a === -1) return -1

const b = bfs(checkpoint, end)
if (b === -1) return -1

return a + b
```

**RESET visited/dist trong mỗi `bfs()`.**

---

# 13. CONNECTED COMPONENTS

**Trigger:** hỏi số network / islands / groups.

```js
const visited = Array(n).fill(false)

function dfs(node) {
  visited[node] = true

  for (const next of graph[node]) {
    if (visited[next]) continue
    dfs(next)
  }
}

let count = 0

for (let i = 0; i < n; i++) {
  if (visited[i]) continue

  count++
  dfs(i)
}

return count
```

**Count ở outer loop.**

---

# 14. BFS GRAPH — DISTANCE FROM ONE SOURCE

```js
const dist = Array(n + 1).fill(-1)
const queue = [1]
let head = 0

dist[1] = 0

while (head < queue.length) {
  const node = queue[head++]

  for (const next of graph[node]) {
    if (dist[next] !== -1) continue

    dist[next] = dist[node] + 1
    queue.push(next)
  }
}
```

---

# 15. IMPLICIT GRAPH BFS — WORD / STATE TRANSFORM

**Trigger:** graph không cho sẵn, rule tự tạo neighbor, mỗi bước cost 1.

```js
const queue = [[start, 0]]
let head = 0

while (head < queue.length) {
  const [cur, step] = queue[head++]

  if (cur === target) return step

  for (const next of candidates(cur)) {
    if (visited(next)) continue

    mark(next)
    queue.push([next, step + 1])
  }
}
```

---

# 16. DFS / BACKTRACKING

**Trigger:** N nhỏ, order/choice matters, enumerate possibilities.

```js
function dfs(state) {
  commit(state)

  for (const candidate of candidates) {
    if (invalid(candidate)) continue

    choose(candidate)
    dfs(nextState)
    unchoose(candidate)
  }
}
```

**Mantra:** `CHOOSE → EXPLORE → UNCHOOSE`.

---

# 17. BINARY SEARCH ON ANSWER

**Trigger:** min/max answer + feasible(x) monotonic.

```js
let left = minAnswer
let right = maxAnswer
let answer = right

while (left <= right) {
  const mid = Math.floor((left + right) / 2)

  if (feasible(mid)) {
    answer = mid
    right = mid - 1
  } else {
    left = mid + 1
  }
}

return answer
```

**Minimum feasible → feasible thì đi trái.**

---

# 18. BINARY SEARCH ON ANSWER — BIGINT

Immigration:

```js
const people = BigInt(n)
const timesBig = times.map(BigInt)

let minTime = timesBig[0]
for (const t of timesBig) {
  if (t < minTime) minTime = t
}

let left = 1n
let right = minTime * people
let answer = right

while (left <= right) {
  const mid = (left + right) / 2n

  let processed = 0n

  for (const t of timesBig) {
    processed += mid / t

    if (processed >= people) break
  }

  if (processed >= people) {
    answer = mid
    right = mid - 1n
  } else {
    left = mid + 1n
  }
}

return answer
```

**Không mix `1` với `1n`.**

---

# 19. MIN HEAP

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
    const h = this.heap
    h.push(value)

    let i = h.length - 1

    while (i > 0) {
      const p = Math.floor((i - 1) / 2)

      if (h[p][0] <= h[i][0]) break

      ;[h[p], h[i]] = [h[i], h[p]]
      i = p
    }
  }

  pop() {
    const h = this.heap

    if (h.length === 1) {
      return h.pop()
    }

    const root = h[0]
    h[0] = h.pop()

    let i = 0

    while (true) {
      let smallest = i
      const l = i * 2 + 1
      const r = i * 2 + 2

      if (
        l < h.length &&
        h[l][0] < h[smallest][0]
      ) {
        smallest = l
      }

      if (
        r < h.length &&
        h[r][0] < h[smallest][0]
      ) {
        smallest = r
      }

      if (smallest === i) break

      ;[h[i], h[smallest]] =
        [h[smallest], h[i]]

      i = smallest
    }

    return root
  }
}
```

---

# 20. DIJKSTRA

**Trigger:** weighted graph + non-negative weights + shortest path.

```js
const dist = Array(n + 1).fill(Infinity)
const heap = new MinHeap()

dist[start] = 0
heap.push([0, start])

while (heap.size() > 0) {
  const [d, node] = heap.pop()

  if (d > dist[node]) continue

  for (const [next, weight] of graph[node]) {
    const nd = d + weight

    if (nd >= dist[next]) continue

    dist[next] = nd
    heap.push([nd, next])
  }
}
```

**Mantra:** `POP MIN → STALE SKIP → RELAX`.

---

# 21. GREEDY INTERVAL — EARLIEST FINISH

```js
intervals.sort((a, b) => a[1] - b[1])

let count = 0
let lastEnd = -Infinity

for (const [start, end] of intervals) {
  if (start >= lastEnd) {
    count++
    lastEnd = end
  }
}
```

**Open interval `(s,e)` → equality cũng cần phát mới.**

---

# 22. DP TRIANGLE

```js
const dp = triangle.map(row => [...row])

for (let r = 1; r < triangle.length; r++) {
  for (let c = 0; c < triangle[r].length; c++) {
    const left =
      c > 0
        ? dp[r - 1][c - 1]
        : -Infinity

    const right =
      c < r
        ? dp[r - 1][c]
        : -Infinity

    dp[r][c] =
      triangle[r][c] +
      Math.max(left, right)
  }
}

return Math.max(...dp[dp.length - 1])
```

---

# 23. GRID DP — COUNT PATHS

**Trigger:** right/down + count ways + obstacles.

```js
const MOD = 1_000_000_007

const blocked = Array.from(
  { length: n + 1 },
  () => Array(m + 1).fill(false)
)

for (const [x, y] of puddles) {
  blocked[y][x] = true
}

const dp = Array.from(
  { length: n + 1 },
  () => Array(m + 1).fill(0)
)

dp[1][1] = 1

for (let r = 1; r <= n; r++) {
  for (let c = 1; c <= m; c++) {
    if (r === 1 && c === 1) continue
    if (blocked[r][c]) continue

    const top = r > 1 ? dp[r - 1][c] : 0
    const left = c > 1 ? dp[r][c - 1] : 0

    dp[r][c] = (top + left) % MOD
  }
}

return dp[n][m]
```

**Trap:** puddles `[x,y]` → `blocked[y][x]`.

---

# 24. PREFIX SUM

```js
const prefix = Array(arr.length + 1).fill(0)

for (let i = 0; i < arr.length; i++) {
  prefix[i + 1] =
    prefix[i] + arr[i]
}
```

Range sum `[l..r]`:

```js
prefix[r + 1] - prefix[l]
```

---

# 25. SIMULATION — TRANSACTIONAL MOVE

**Trigger:** một command gồm nhiều bước; fail 1 bước thì cancel cả command.

```js
let nr = row
let nc = col
let valid = true

for (let step = 0; step < count; step++) {
  nr += dr
  nc += dc

  if (invalid(nr, nc)) {
    valid = false
    break
  }
}

if (valid) {
  row = nr
  col = nc
}
```

**Mantra:** `COPY → TRY → ALL PASS? → COMMIT`.

---

# 26. FINAL 12 TRIGGERS

```text
1. Frequency / duplicate                 → Map
2. Repeated order swaps                  → Array + inverse Map
3. Fixed contiguous K                    → Fixed window
4. Expand/shrink contiguous              → Variable window
5. Future first resolving event          → Monotonic stack
6. FIFO simulation                       → Queue + head
7. Grid/graph shortest, unit cost        → BFS
8. Count disconnected groups             → Components DFS/BFS
9. Small N, enumerate choices            → DFS/backtracking
10. min/max + monotonic feasible         → Binary search answer
11. weighted non-negative shortest       → Dijkstra
12. overlapping subproblems / best state → DP
```

---

# 27. LAST-MINUTE BUG CHECKLIST

Before submit:

```text
[ ] 0-based / 1-based?
[ ] slice end exclusive?
[ ] numeric sort comparator?
[ ] visited mark at enqueue?
[ ] graph undirected add both ways?
[ ] queue uses head, not shift?
[ ] while vs if?
[ ] reset state per phase?
[ ] off-by-one window?
[ ] answer commit timing?
[ ] Number safe or BigInt needed?
[ ] obstacle coordinates x/y swapped?
[ ] modulo applied?
[ ] impossible case handled?
```

---

# 28. EXAM EXECUTION

For each problem:

```text
1. CONTRACT — output gì?
2. BOUND — max input?
3. BRUTE FORCE — tại sao chết?
4. BOTTLENECK — phần nào lặp / đắt?
5. STATE — cần nhớ gì?
6. TRANSITION — state đổi thế nào?
7. INVARIANT — cái gì luôn đúng?
8. PATTERN — template nào?
9. COMPLEXITY — pass max input chưa?
```

Then write:

```text
TRIGGER
→ STATE
→ TRANSITION
→ CODE SHAPE
→ TRAPS
```
