# Layer A — Core Recall

Đây là 15 skeleton phải tự viết không nhìn. Convention heap/sort: `compare(a,b) < 0` nghĩa là `a` có priority cao hơn `b`.

## C01 — Parse → canonical representation

**TRIGGER:** input mã hóa thời gian/token; cùng đại lượng được so sánh hoặc cập nhật nhiều lần.

```js
function toSeconds(text) {
  const [mm, ss] = text.split(":").map(Number);
  return mm * 60 + ss;
}

function toTime(total) {
  const mm = String(Math.floor(total / 60)).padStart(2, "0");
  const ss = String(total % 60).padStart(2, "0");
  return `${mm}:${ss}`;
}
```

Invariant: logic chính chỉ dùng representation canonical. `O(1)` mỗi token.

## C02 — Linear run/chunk scan

**TRIGGER:** đề hỏi các đoạn liên tiếp maximal hoặc cần flush đoạn cuối.

```js
function scanRuns(a, visit) {
  for (let start = 0; start < a.length; ) {
    let end = start + 1;
    while (end < a.length && a[end] === a[start]) end++;
    visit(a[start], start, end);
    start = end;
  }
}
```

Invariant: `[0,start)` đã xử lý; `start` là đầu run tiếp theo. `O(n)`.

## C03 — Frequency Map / multiset

**TRIGGER:** cần multiplicity, add/remove hoặc so sánh composition.

```js
function addCount(freq, key, delta) {
  const next = (freq.get(key) ?? 0) + delta;
  if (next === 0) freq.delete(key);
  else freq.set(key, next);
}

function buildFrequency(items) {
  const freq = new Map();
  for (const item of items) addCount(freq, item, 1);
  return freq;
}
```

Invariant: Map chứa đúng count hiện tại; không có key count 0. `O(n)` expected.

## C04 — Sort + comparator nhiều khóa

**TRIGGER:** cần tạo order toàn cục; contract có tie-break.

```js
function sortRecords(records) {
  return [...records].sort((a, b) => {
    if (a.priority !== b.priority) return a.priority - b.priority;
    if (a.arrival !== b.arrival) return a.arrival - b.arrival;
    return a.id - b.id;
  });
}
```

Invariant: comparator xét khóa theo đúng thứ tự contract. `O(n log n)`.

## C05 — Two pointers trên array đã sort

**TRIGGER:** hai đầu/cặp; array sort; thay đổi một pointer loại được một miền ứng viên.

```js
function findPair(sorted, target) {
  let left = 0, right = sorted.length - 1;
  while (left < right) {
    const sum = sorted[left] + sorted[right];
    if (sum === target) return [left, right];
    if (sum < target) left++;
    else right--;
  }
  return null;
}
```

Invariant: mọi cặp ngoài `[left,right]` đã bị loại có chứng minh. `O(n)` sau sort.

## C06 — Variable sliding window + frequency

**TRIGGER:** đoạn liên tiếp; right mở rộng, left chỉ tăng; cần longest/shortest với constraint cửa sổ.

```js
function longestAtMostKDistinct(a, k) {
  const freq = new Map();
  let left = 0, best = 0;
  for (let right = 0; right < a.length; right++) {
    addCount(freq, a[right], 1);
    while (freq.size > k) {
      addCount(freq, a[left], -1);
      left++;
    }
    best = Math.max(best, right - left + 1);
  }
  return best;
}
```

Invariant: sau shrink, `[left,right]` hợp lệ; left nhỏ nhất theo transition đã chọn. `O(n)`.

## C07 — Prefix sum

**TRIGGER:** nhiều query tổng đoạn hoặc cần biến range work thành endpoint work.

```js
function buildPrefix(a) {
  const prefix = Array(a.length + 1).fill(0);
  for (let i = 0; i < a.length; i++) {
    prefix[i + 1] = prefix[i] + a[i];
  }
  return prefix;
}

function rangeSum(prefix, left, right) {
  return prefix[right] - prefix[left];
}
```

Contract đoạn là `[left,right)`. Build `O(n)`, query `O(1)`.

## C08 — Monotonic stack theo index

**TRIGGER:** phần tử đầu tiên bên trái/phải lớn/nhỏ hơn; mỗi index chờ được giải quyết.

```js
function nextGreaterIndex(a) {
  const answer = Array(a.length).fill(-1);
  const stack = [];
  for (let i = 0; i < a.length; i++) {
    while (stack.length && a[stack.at(-1)] < a[i]) {
      answer[stack.pop()] = i;
    }
    stack.push(i);
  }
  return answer;
}
```

Invariant: stack chứa index chưa có next greater, value giảm không nghiêm ngặt. `O(n)`.

## C09 — Atomic state-machine simulation

**TRIGGER:** state ban đầu + commands/events; mỗi bước có transition xác định; invalid có thể rollback.

```js
function simulate(initial, commands, transition, isValid) {
  let state = initial;
  for (const command of commands) {
    const candidate = transition(state, command);
    if (isValid(candidate, state, command)) state = candidate;
  }
  return state;
}
```

Invariant: sau `i` commands, state đúng cho prefix `[0,i)`. `O(number of transitions)`.

## C10 — Backtracking permutation/assignment

**TRIGGER:** chọn một candidate chưa dùng cho mỗi depth; cần thử toàn bộ và restore.

```js
function maximizeAssignment(score) {
  const used = Array(score.length).fill(false);
  let best = -Infinity;

  function dfs(depth, sum) {
    if (depth === score[0].length) {
      best = Math.max(best, sum);
      return;
    }
    for (let person = 0; person < score.length; person++) {
      if (used[person]) continue;
      used[person] = true;
      dfs(depth + 1, sum + score[person][depth]);
      used[person] = false;
    }
  }

  dfs(0, 0);
  return best;
}
```

Invariant: `used` đúng với path hiện tại; restore sau đúng nhánh. Worst case `O(P(n,m))`.

## C11 — BFS grid shortest path

**TRIGGER:** graph/grid không trọng số; cần minimum number of transitions.

```js
function bfsGrid(grid, start, target) {
  const rows = grid.length, cols = grid[0].length;
  const dist = Array.from({ length: rows }, () => Array(cols).fill(-1));
  const queue = [start];
  dist[start[0]][start[1]] = 0;
  const dirs = [[-1, 0], [1, 0], [0, -1], [0, 1]];

  for (let head = 0; head < queue.length; head++) {
    const [r, c] = queue[head];
    if (r === target[0] && c === target[1]) return dist[r][c];
    for (const [dr, dc] of dirs) {
      const nr = r + dr, nc = c + dc;
      if (nr < 0 || nr >= rows || nc < 0 || nc >= cols) continue;
      if (grid[nr][nc] === 1 || dist[nr][nc] !== -1) continue;
      dist[nr][nc] = dist[r][c] + 1;
      queue.push([nr, nc]);
    }
  }
  return -1;
}
```

Invariant: đánh dấu khi enqueue; queue theo distance không giảm. `O(rows*cols)`.

## C12 — Binary search first true

**TRIGGER:** answer space có predicate `false...false,true...true`; cần minimum feasible.

```js
function firstTrue(low, high, feasible) {
  let left = low, right = high;
  while (left < right) {
    const mid = left + Math.floor((right - left) / 2);
    if (feasible(mid)) right = mid;
    else left = mid + 1;
  }
  return left;
}
```

Invariant: answer nằm trong `[left,right]`; `right` luôn giữ một feasible candidate. `O(log range * predicate)`.

## C13 — Generic binary heap

**TRIGGER:** lặp lại thao tác lấy phần tử priority cao nhất, insert động, Top K hoặc scheduling.

```js
class Heap {
  constructor(compare = (a, b) => a - b) {
    this.data = [];
    this.compare = compare;
  }

  get size() { return this.data.length; }
  peek() { return this.data[0]; }

  push(value) {
    const a = this.data;
    a.push(value);
    let i = a.length - 1;
    while (i > 0) {
      const p = Math.floor((i - 1) / 2);
      if (this.compare(a[p], a[i]) <= 0) break;
      [a[p], a[i]] = [a[i], a[p]];
      i = p;
    }
  }

  pop() {
    const a = this.data;
    if (!a.length) return undefined;
    const top = a[0];
    const last = a.pop();
    if (a.length) {
      a[0] = last;
      let i = 0;
      while (true) {
        let best = i;
        const left = i * 2 + 1, right = left + 1;
        if (left < a.length && this.compare(a[left], a[best]) < 0) best = left;
        if (right < a.length && this.compare(a[right], a[best]) < 0) best = right;
        if (best === i) break;
        [a[i], a[best]] = [a[best], a[i]];
        i = best;
      }
    }
    return top;
  }
}
```

Invariant: parent không có priority thấp hơn child. Push/pop `O(log n)`, peek `O(1)`.

## C14 — Sort + interval greedy

**TRIGGER:** chọn nhiều interval không chồng lấn nhất hoặc đặt điểm theo endpoint sớm nhất.

```js
function maxNonOverlapping(intervals) {
  intervals.sort((a, b) => a[1] - b[1] || a[0] - b[0]);
  let count = 0, lastEnd = -Infinity;
  for (const [start, end] of intervals) {
    if (start < lastEnd) continue;
    count++;
    lastEnd = end;
  }
  return count;
}
```

Invariant: sau mỗi chọn, `lastEnd` nhỏ nhất có thể trong số solution cùng size. `O(n log n)`.

## C15 — 2D local-state DP

**TRIGGER:** answer tại cell/state phụ thuộc vào một số state trước đã hoàn tất.

```js
function countGridPaths(rows, cols, blocked) {
  const dp = Array.from({ length: rows }, () => Array(cols).fill(0));
  if (!blocked[0][0]) dp[0][0] = 1;
  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      if (blocked[r][c] || (r === 0 && c === 0)) continue;
      if (r > 0) dp[r][c] += dp[r - 1][c];
      if (c > 0) dp[r][c] += dp[r][c - 1];
    }
  }
  return dp[rows - 1][cols - 1];
}
```

Invariant: khi tính `(r,c)`, mọi predecessor đã final. `O(rows*cols)`.
