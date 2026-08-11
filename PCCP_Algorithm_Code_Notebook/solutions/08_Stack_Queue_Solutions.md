# Solutions — Chapter 08 Stack và Queue

[← Practice](../chapters/08_stack_queue/03_Practice_Ladder.md) · [Index](../08_Stack_Queue.md)

Các lời giải `SQ-02` map về [canonical lesson](../chapters/08_stack_queue/01_Stack_Monotonic.md#sq-02--monotonic-stack-các-index-chưa-được-giải-quyết): ghi template right/left, variant knobs, phần giữ nguyên và phần đổi; không lặp lại 11 mục framework.

## Tầng 1 — Nhận diện

### S08-R01 `[SQ-01]`
**Signal/state:** matching lồng nhau; stack openings. Open push, close phải match top rồi pop. **Invariant:** stack là openings chưa đóng của prefix. O(n)/O(n); trap: chỉ đếm số lượng.
### S08-R02 `[SQ-01]`
Lệnh mới push; `UNDO` pop thao tác gần nhất. LIFO đúng vì chỉ thao tác mới nhất được đảo. Empty undo phải có contract rõ.
### S08-R03 `[SQ-02]`
Stack indices chưa có ngày ấm hơn; current lớn hơn top thì pop và ghi distance. Mỗi index push/pop tối đa một lần: O(n).
### S08-R04 `[SQ-02]`
Greater-or-equal dùng `current >= topValue`; revealing test `[2,2]→[1,0]`, còn strict trả `[0,0]`.
### S08-R05 `[SQ-03]`
FIFO động: `queue[head++]`, ticket sinh thêm `push`. Pending interval `[head,length)`.
### S08-R06 `[SQ-03]`
Chụp `batchSize=queue.length-head`; loop đúng số đó. Item mới nằm tail và chờ batch sau.
### S08-R07 `[SQ-04]`
Circular queue dùng buffer/head/tail/size; full thì reject trước write. Mọi operation O(1).
### S08-R08 `[SQ-04]`
`head===tail` xảy ra cả lúc size 0 và size capacity; cần `size` hoặc chừa một slot.
### S08-R09 `[SQ-05]`
Unweighted shortest → BFS FIFO + distance. First discovery shortest vì queue theo distance không giảm.
### S08-R10 `[SQ-05]`
Seed mọi source distance0 trước loop; duplicate source chỉ enqueue một lần.
### S08-R11 `[SQ-05]`
Mark khi enqueue. Mark lúc dequeue cho phép nhiều parent cùng enqueue một node, phá bound O(V+E).
### S08-R12 `[SQ-01/SQ-03]`
Mới nhất trước → stack; cũ nhất trước → queue. Contract order quyết định, không phải tên dữ liệu.

## Tầng 2 — Điền khuyết

### S08-F01 `[SQ-01]`
`push`, `pop`, `length`.
### S08-F02 `[SQ-02]`
`pop`, `index`, `push`.
### S08-F03 `[SQ-03/SQ-05]`
`head`, `head`.

## Tầng 3 — Dựng logic

### S08-L01 `[SQ-01]`
Number push. Operator pop `right` trước rồi `left`; push `left op right`. Invariant: stack là value của các biểu thức con hoàn chỉnh trong prefix.

```js
function evaluatePostfix(tokens) {
  const stack = [];
  for (const token of tokens) {
    if (![`+`, `-`, `*`].includes(token)) { stack.push(Number(token)); continue; }
    const right = stack.pop();
    const left = stack.pop();
    if (left === undefined || right === undefined) throw new Error(`invalid postfix`);
    if (token === `+`) stack.push(left + right);
    else if (token === `-`) stack.push(left - right);
    else stack.push(left * right);
  }
  if (stack.length !== 1) throw new Error(`invalid postfix`);
  return stack[0];
}
```

### S08-L02 `[SQ-03]`
```js
function roundRobin(durations, quantum) {
  const queue = durations.map((remaining, id) => ({ id, remaining }));
  const finished = [];
  let head = 0;
  while (head < queue.length) {
    const job = queue[head++];
    job.remaining -= quantum;
    if (job.remaining > 0) queue.push(job);
    else finished.push(job.id);
  }
  return finished;
}
```
Pending interval giữ đúng FIFO; mỗi lượt unfinished vào tail. Complexity theo số quantum slices.

### S08-L03 `[SQ-04]`
```js
class CircularQueue {
  constructor(capacity) {
    if (!Number.isInteger(capacity) || capacity <= 0) throw new RangeError(`capacity`);
    this.buffer = Array(capacity); this.head = 0; this.tail = 0; this.size = 0;
  }
  enqueue(value) {
    if (this.size === this.buffer.length) return false;
    this.buffer[this.tail] = value;
    this.tail = (this.tail + 1) % this.buffer.length;
    this.size += 1; return true;
  }
  dequeue() {
    if (this.size === 0) return undefined;
    const value = this.buffer[this.head];
    this.head = (this.head + 1) % this.buffer.length;
    this.size -= 1; return value;
  }
}
```
Capacity 1 vẫn đúng nhờ size; head/tail cùng 0 ở cả empty và full nhưng không mơ hồ.

## Transfer Test A

### S08-T01 — Undo có ngưỡng `[SQ-01/SQ-03]`
```js
function committedValues(commands) {
  const queue = [...commands];
  const pending = [];
  const output = [];
  let head = 0;
  while (head < queue.length) {
    const command = queue[head++];
    if (command.type === `ADD`) pending.push(command.value);
    else if (command.type === `UNDO`) pending.pop();
    else if (command.type === `COMMIT`) output.push(...pending.splice(0));
  }
  return output;
}
```
Queue bảo toàn command order; stack semantics nằm ở `pending.pop()`. Mỗi command O(1) amortized, tổng output O(n).

## Tầng 4 — Pseudocode

### S08-P01 `[SQ-02]`
**Template/knobs:** left-query; smaller, strict, index, trả index, default `-1`. **Giữ nguyên:** pop mọi top không thể trả lời rồi đọc top gần nhất. **Thay đổi:** `>=` loại cả value bằng current.
Scan trái→phải; pop khi top value `>= current` để top còn lại là previous **strictly** smaller; answer là top hoặc -1; push index.
```js
function previousSmallerIndices(values) {
  const answer = Array(values.length).fill(-1);
  const stack = [];
  for (let i = 0; i < values.length; i += 1) {
    while (stack.length && values[stack[stack.length - 1]] >= values[i]) stack.pop();
    if (stack.length) answer[i] = stack[stack.length - 1];
    stack.push(i);
  }
  return answer;
}
```

### S08-P02 `[SQ-03]`
```js
function processBatches(initial, expand) {
  const queue = [...initial];
  const batches = [];
  let head = 0;
  while (head < queue.length) {
    const size = queue.length - head;
    const batch = [];
    for (let count = 0; count < size; count += 1) {
      const item = queue[head++]; batch.push(item);
      queue.push(...expand(item));
    }
    batches.push(batch);
  }
  return batches;
}
```
Chụp size trước vòng con là ranh giới batch.

### S08-P03 `[SQ-05]`
```js
function nearestSourceDistance(grid, sources) {
  const rows = grid.length, cols = rows ? grid[0].length : 0;
  const distance = Array.from({ length: rows }, () => Array(cols).fill(-1));
  const queue = []; let head = 0;
  for (const [r, c] of sources) if (grid[r][c] && distance[r][c] === -1) {
    distance[r][c] = 0; queue.push([r, c]);
  }
  const directions = [[1,0],[-1,0],[0,1],[0,-1]];
  while (head < queue.length) {
    const [r, c] = queue[head++];
    for (const [dr, dc] of directions) {
      const nr=r+dr, nc=c+dc;
      if (nr<0||nr>=rows||nc<0||nc>=cols||!grid[nr][nc]||distance[nr][nc]!==-1) continue;
      distance[nr][nc]=distance[r][c]+1; queue.push([nr,nc]);
    }
  }
  return distance;
}
```
Multi-source seed cùng layer 0; O(rows·cols).

## Tầng 5 — Tự code

### S08-C01 `[SQ-01]`
```js
function isBalanced(text) {
  const matching = new Map([[`)`,`(`],[`]`,`[`],[`}`,`{`]]), stack=[];
  for (const char of text) {
    if (`([{`.includes(char)) stack.push(char);
    else if (matching.has(char) && stack.pop() !== matching.get(char)) return false;
  }
  return stack.length === 0;
}
```
O(n)/O(n); empty true; trap là unmatched opening cuối.

### S08-C02 `[SQ-02]`
**Template/knobs:** right-resolve; greater, strict, index, distance, default `0`, linear. **Giữ nguyên:** `while → pop → ghi → push`. **Edge case:** `[2,2]` không pop.
```js
function distanceToNextGreater(values) {
  const answer=Array(values.length).fill(0), stack=[];
  for (let i=0;i<values.length;i+=1) {
    while (stack.length && values[i] > values[stack[stack.length-1]]) {
      const previous=stack.pop(); answer[previous]=i-previous;
    }
    stack.push(i);
  }
  return answer;
}
```
Mỗi index push/pop ≤1 nên O(n).

### S08-C03 `[SQ-05]`
```js
function bfsDistances(graph, start) {
  const distance=Array(graph.length).fill(-1), queue=[start]; let head=0;
  distance[start]=0;
  while (head<queue.length) {
    const node=queue[head++];
    for (const next of graph[node]) if (distance[next]===-1) {
      distance[next]=distance[node]+1; queue.push(next);
    }
  }
  return distance;
}
```
Mark bằng distance khi enqueue; O(V+E).

## Tầng 6 — Biến thể

### S08-V01 `[SQ-02]`
**Template/knobs:** giống S08-C02, chỉ đổi strict → non-strict. **Phần thay đổi:** condition `>` thành `>=`; lifecycle và cách tính distance giữ nguyên.
```js
function distanceToNextGreaterOrEqual(values) {
  const answer=Array(values.length).fill(0), stack=[];
  for (let i=0;i<values.length;i+=1) {
    while (stack.length && values[i] >= values[stack[stack.length-1]]) {
      const previous=stack.pop(); answer[previous]=i-previous;
    }
    stack.push(i);
  }
  return answer;
}
```
Revealing test `[2,2]→[1,0]`.

### S08-V02 `[SQ-04]`
```js
class OverwritingCircularQueue extends CircularQueue {
  enqueue(value) {
    if (this.size === this.buffer.length) {
      this.buffer[this.tail] = value;
      this.tail = (this.tail + 1) % this.buffer.length;
      this.head = this.tail;
      return true;
    }
    return super.enqueue(value);
  }
}
```
Khi full, tail trỏ oldest slot; write rồi cả tail/head cùng advance, size giữ capacity.

### S08-V03 `[SQ-05]`
```js
function multiSourceDistances(graph, sources) {
  const distance=Array(graph.length).fill(-1), queue=[]; let head=0;
  for (const source of sources) if (distance[source]===-1) { distance[source]=0; queue.push(source); }
  while (head<queue.length) {
    const node=queue[head++];
    for (const next of graph[node]) if (distance[next]===-1) {
      distance[next]=distance[node]+1; queue.push(next);
    }
  }
  return distance;
}
```
Empty sources trả toàn -1; duplicate được dedupe lúc seed.

## Transfer Test B

### S08-T02 — Lan truyền có undo log `[SQ-05/SQ-01]`
```js
function bfsWithRollbackLog(graph, sources) {
  const distance=Array(graph.length).fill(-1), queue=[], history=[]; let head=0;
  for (const source of sources) if (distance[source]===-1) { distance[source]=0; queue.push(source); }
  while (head<queue.length) {
    const node=queue[head++];
    for (const next of graph[node]) if (distance[next]===-1) {
      history.push({ node: next, oldDistance: -1 });
      distance[next]=distance[node]+1; queue.push(next);
    }
  }
  const rollback = (count) => {
    while (count>0 && history.length) { const change=history.pop(); distance[change.node]=change.oldDistance; count-=1; }
  };
  return { distance, rollback };
}
```
Queue quyết định discovery order; stack history đảo discovery mới nhất trước.

## Mini-test

### S08-M01.1 `[SQ-01]`
```js
function simplifyPath(path) {
  const stack=[];
  for (const part of path.split(`/`)) {
    if (!part || part===`.`) continue;
    if (part===`..`) stack.pop(); else stack.push(part);
  }
  return `/`+stack.join(`/`);
}
```

### S08-M01.2 `[SQ-03]`
```js
function hotPotato(players, passes) {
  const queue=[...players]; let head=0;
  while (queue.length-head>1) {
    for (let count=0;count<passes;count+=1) queue.push(queue[head++]);
    head+=1;
  }
  return queue[head];
}
```

### S08-M01.3 `[SQ-05]`
```js
function shortestNumberMoves(start, target, max) {
  const distance=Array(max+1).fill(-1), queue=[start]; let head=0; distance[start]=0;
  while (head<queue.length) {
    const value=queue[head++]; if (value===target) return distance[value];
    for (const next of [value-1,value+1,value*2]) if (next>=0&&next<=max&&distance[next]===-1) {
      distance[next]=distance[value]+1; queue.push(next);
    }
  }
  return -1;
}
```
