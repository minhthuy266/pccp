# Solutions — Chapter 08 Stack và Queue

[← Practice](../chapters/08_stack_queue/03_Practice_Ladder.md) · [Index](../08_Stack_Queue.md)

## Tầng 1 — Nhận diện

### S08-R01 `[SQ-01]`
**Signal/state:** matching lồng nhau; stack openings. **Check/update:** open push, close phải match top rồi pop. **Invariant:** stack là openings chưa đóng của prefix. **Trace:** `([)]`: push `(`, push `[`, gặp `)` nhưng top `[` nên false. **Complexity:** O(n)/O(n). **Trap/recall:** chỉ đếm số lượng không phát hiện sai thứ tự lồng.
### S08-R02 `[SQ-01]`
**Signal/state:** rollback mới nhất; stack thao tác. **Check/update:** lệnh mới push, `UNDO` pop nếu có. **Invariant:** stack là lịch sử hiệu lực theo order. **Trace:** `ADD1,ADD2,UNDO→[1]`. **Complexity:** O(1) mỗi lệnh, O(n) space. **Trap/recall:** empty undo phải có contract rõ.
### S08-R03 `[SQ-02]`
**Signal/state:** next greater + distance; stack indices chưa resolve. **Check/update:** current lớn hơn top thì pop và ghi `i-top`. **Invariant:** stack index tăng, value giảm không nghiêm. **Trace:** `[2,1,3]` resolve index1 rồi0 tại value3. **Complexity:** O(n)/O(n). **Trap/recall:** push value sẽ mất index tính distance.
### S08-R04 `[SQ-02]`
**Signal/state:** greater-or-equal; stack indices. **Check/update:** dùng `current >= topValue`. **Invariant:** item còn chờ chưa gặp value `>=` bên phải. **Trace:** `[2,2]→[1,0]`, strict trả `[0,0]`. **Complexity:** O(n)/O(n). **Trap/recall:** một ký hiệu `>`/`>=` đổi contract.
### S08-R05 `[SQ-03]`
**Signal/state:** ticket cũ nhất trước; `queue,head`. **Check/update:** đọc `queue[head++]`, ticket mới `push`. **Invariant:** pending interval `[head,length)` đúng FIFO. **Trace:** A sinh C trong `[A,B]` cho order A,B,C. **Complexity:** O(items)/O(items). **Trap/recall:** không chụp length cố định nếu muốn xử lý cả item mới.
### S08-R06 `[SQ-03]`
**Signal/state:** layer/batch; queue + head + `batchSize`. **Check/update:** chụp `queue.length-head`, xử lý đúng số đó. **Invariant:** item sinh trong batch nằm sau boundary. **Trace:** `[A,B]`, A sinh C → batch1 A,B; batch2 C. **Complexity:** O(total items). **Trap/recall:** đọc dynamic length trong vòng con sẽ trộn batch.
### S08-R07 `[SQ-04]`
**Signal/state:** capacity cố định; buffer/head/tail/size. **Check/update:** full reject trước write; modulo sau access. **Invariant:** `size` item FIFO bắt đầu tại head. **Trace:** cap1 enqueue7 rồi enqueue8=false. **Complexity:** O(1) operation/O(capacity). **Trap/recall:** overwrite trước guard làm mất oldest.
### S08-R08 `[SQ-04]`
**Signal/state:** circular empty/full; head/tail/size. **Check:** `size===0` empty, `size===capacity` full. **Invariant:** size luôn trong `[0,capacity]`. **Trace:** cap3 sau ba enqueue có head=tail=0 nhưng full; ban đầu cũng bằng mà empty. **Complexity:** O(1). **Trap/recall:** `head===tail` một mình mơ hồ.
### S08-R09 `[SQ-05]`
**Signal/state:** unweighted shortest; queue/head/distance. **Check/update:** neighbor distance -1 thì gán `d+1` và enqueue. **Invariant:** queue có distance không giảm; first discovery shortest. **Trace:** 0 nối 1,2; cả hai distance1. **Complexity:** O(V+E)/O(V). **Trap/recall:** weighted graph cần Dijkstra.
### S08-R10 `[SQ-05]`
**Signal/state:** nhiều nguồn đồng thời; queue + distance. **Check/update:** seed mọi source chưa seen ở distance0. **Invariant:** queue khởi đầu là toàn layer0. **Trace:** path 0-1-2-3, sources0,3 → `[0,1,1,0]`. **Complexity:** O(V+E). **Trap/recall:** chạy BFS riêng từng nguồn tốn lặp.
### S08-R11 `[SQ-05]`
**Signal/state:** duplicate state trong queue; visited/distance. **Check/update:** mark ngay trước enqueue. **Invariant:** mỗi state vào queue tối đa một lần. **Trace:** node3 chung neighbor của1,2 chỉ được1 enqueue. **Complexity:** O(V+E). **Trap/recall:** mark khi dequeue quá muộn.
### S08-R12 `[SQ-01/SQ-03]`
**Signal/state:** order lấy task quyết định cấu trúc. **Check/update:** mới nhất `push/pop`; cũ nhất `push/head++`. **Invariant:** container pending giữ đúng priority thời gian. **Trace:** A rồi B → stack lấy B, queue lấy A. **Complexity:** O(1) amortized/operation. **Trap/recall:** không chọn theo tên “task”.

## Tầng 2 — Điền khuyết

### S08-F01 `[SQ-01]`
`push`, `pop`, `length`. **Invariant:** stack là openings chưa match. **Trace:** `()` push rồi pop, length0. **Complexity:** O(n)/O(n). **Trap:** dùng `shift` phá LIFO.
### S08-F02 `[SQ-02]`
`pop`, `index`, `push`. **Invariant:** stack chứa index chưa resolve theo monotonic value. **Trace:** current3 pop index của1 và2. **Complexity:** O(n)/O(n). **Trap:** `if` không thay được `while`.
### S08-F03 `[SQ-03/SQ-05]`
`head`, `head`. **Invariant:** `[0,head)` đã dequeue đúng một lần; BFS mark trước enqueue. **Trace:** queue `[s,a]`, head đi 0→1→2. **Complexity:** O(V+E) cho BFS. **Trap:** `shift()` gây reindex.

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

**Check/update:** number push; operator pop `right` rồi `left`, tính và push. **Invariant:** stack là giá trị các biểu thức con hoàn chỉnh của prefix. **Trace:** `5 2 -`: `[5]→[5,2]→[3]`. **Complexity:** O(n)/O(n). **Trap/recall:** đảo operand làm `2-5`.

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
**Check/update:** dequeue một job, trừ quantum; unfinished enqueue lại, finished emit id. **Invariant:** pending interval giữ đúng FIFO và mỗi job chứa remaining chính xác. **Trace:** `[3,1],q=2`: job0 còn1 vào tail; job1 xong; job0 xong → `[1,0]`. **Complexity:** O(S) với S là tổng số quantum slices, O(S) queue history. **Trap/recall:** không enqueue lại job đã xong; quantum phải dương.

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
**Check/update:** guard full/empty; access tại tail/head rồi modulo và đổi size. **Invariant:** `size` item FIFO bắt đầu ở head, tail là ô write kế. **Trace:** cap1: enqueue7 làm size1; enqueue8 false; dequeue7 về size0. **Complexity:** O(1) operation/O(capacity). **Trap/recall:** head=tail không tự nói full hay empty.

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
**Check/update:** queue đọc FIFO; ADD push pending, UNDO pop, COMMIT chuyển pending sang output. **Invariant:** pending là ADD chưa commit sau mọi undo của command prefix; output là commit đã khóa. **Trace:** `ADD1,ADD2,UNDO,COMMIT→[1]`. **Complexity:** O(n) time/O(n) space. **Trap/recall:** UNDO không được xóa value đã commit.

## Tầng 4 — Pseudocode

### S08-P01 `[SQ-02]`
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

**Check/update:** pop mọi top `>= current`, đọc top còn lại rồi push current. **Invariant:** stack index tăng và value tăng nghiêm; mọi top bị pop không thể là previous smaller cho current hay ứng viên tốt hơn về sau. **Trace:** `[3,1,2]→[-1,-1,1]`. **Complexity:** O(n)/O(n). **Trap/recall:** không pop equal thì trả value không strictly smaller.

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
**Check/update:** chụp pending size trước vòng con; mỗi item expand vào tail. **Invariant:** batch hiện tại chứa đúng các item pending tại thời điểm batch bắt đầu. **Trace:** `[A,B]`, A→C: batches `[A,B]`, rồi `[C]`. **Complexity:** O(N+K) với N item xử lý và K output expand, O(N) queue. **Trap/recall:** expand vô hạn thì thuật toán không terminate; contract phải hữu hạn.

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
**Check/update:** seed nguồn hợp lệ chưa seen; neighbor passable có distance -1 thì mark `d+1` trước enqueue. **Invariant:** queue distance không giảm và assigned distance là khoảng cách nguồn gần nhất. **Trace:** grid 2×2 từ `(0,0)` cho `[[0,1],[1,2]]`. **Complexity:** O(rows·cols) time/space. **Trap/recall:** kiểm tra bounds trước truy cập grid; obstacle giữ -1.

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
**Check/update:** open push; closing phải pop đúng expected. **Invariant:** stack là opening chưa match của prefix. **Trace:** `([)]` fail tại `)` vì top `[`. **Complexity:** O(n)/O(n). **Trap/recall:** empty true nhưng unmatched opening cuối false.

### S08-C02 `[SQ-02]`
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
**Check/update:** while current strict greater, pop và ghi distance; rồi push current. **Invariant:** stack chứa index chưa resolve với value giảm không nghiêm. **Trace:** `[2,1,3]`: index2 resolve index1 distance1 rồi index0 distance2. **Complexity:** O(n)/O(n). **Trap/recall:** strict `>`; dùng `>=` đổi bài.

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
**Check/update:** neighbor có distance -1 thì gán `distance[node]+1` và enqueue. **Invariant:** queue theo distance không giảm; state được enqueue một lần. **Trace:** diamond 0→1,2→3 chỉ enqueue3 từ parent gặp trước. **Complexity:** O(V+E)/O(V). **Trap/recall:** start phải hợp lệ; weighted edge không dùng BFS này.

## Tầng 6 — Biến thể

### S08-V01 `[SQ-02]`
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
**Check/update:** pop khi `current >= topValue`. **Invariant:** stack chứa index chưa gặp value lớn hơn **hoặc bằng** bên phải. **Trace:** `[2,2]→[1,0]`. **Complexity:** O(n)/O(n). **Trap/recall:** đây là mutation duy nhất so với strict template; khóa bằng duplicate test.

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
**Check/update:** nếu full, write tại tail (cũng là oldest), advance tail và đặt head=tail; size giữ capacity. **Invariant:** buffer chứa đúng capacity item mới nhất theo FIFO. **Trace:** cap2 `[1,2]`, enqueue3 → dequeue order2,3. **Complexity:** O(1) operation/O(capacity). **Trap/recall:** tăng size khi full sẽ phá invariant.

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
**Check/update:** source chưa seen mới seed; neighbor unseen mark rồi enqueue. **Invariant:** queue distance không giảm từ tập nguồn; mỗi node một lần. **Trace:** path0-1-2-3, sources0,3,3 → `[0,1,1,0]`. **Complexity:** O(V+E)/O(V). **Trap/recall:** empty sources hợp lệ và trả toàn -1.

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
**Check/update:** BFS discovery push `{node,oldDistance}`; rollback pop history và restore. **Invariant:** queue quyết định discovery FIFO, history chứa đúng mutation chưa rollback theo thời gian. **Trace:** path0-1-2 discover1 rồi2; rollback1 đặt node2 về -1. **Complexity:** BFS O(V+E), rollback O(k), space O(V). **Trap/recall:** source không nằm history; sau rollback không tiếp tục BFS theo contract bài.

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

**Check/update:** segment thường push, `..` pop, empty/`.` skip. **Invariant:** stack là canonical segments của prefix. **Trace:** `/a/./b/../c→[a,c]`. **Complexity:** O(n) time/space. **Trap/recall:** `..` ở root pop empty là vô hại.

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

**Check/update:** rotate `passes` lần bằng dequeue/enqueue rồi loại front. **Invariant:** pending interval giữ circular order của người còn sống. **Trace:** `[A,B,C],passes=1`: rotate A, loại B, còn C,A. **Complexity:** O(players·passes) time, O(players·passes) backing array trong bản head-index không compact. **Trap/recall:** phải chốt nghĩa `passes` để tránh off-by-one.

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

**Check/update:** neighbor trong bound và unseen thì mark `d+1` rồi enqueue. **Invariant:** queue distance không giảm; first target distance shortest. **Trace:** `5→10→9→18→17` cho distance4 trong max20. **Complexity:** O(max) time/space. **Trap/recall:** kiểm tra start/target trong bound; mark trước enqueue.
