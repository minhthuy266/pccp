# Queue, circular queue và BFS — `SQ-03..05`

[← Trước](01_Stack_Monotonic.md) · [Index](../../08_Stack_Queue.md)

## Dạng 3 `[SQ-03]` — Queue bằng head index

**Dấu hiệu nhận dạng:** item đến trước phải xử lý trước và item mới có thể nối vào tail trong lúc chạy. **Brute force bottleneck:** JavaScript `shift()` reindex phần còn lại nên lặp có thể `O(n²)`; transition dequeue bằng `current=queue[head++]`, enqueue bằng `push`, pending interval luôn là `[head,queue.length)`.

### A. Bản chất

Queue xử lý FIFO. JavaScript enqueue bằng `push`, dequeue logic bằng `queue[head++]`; `shift()` O(length) do reindex. Với batch/layer, chụp pending count trước vòng con.

### B. Mental model

Số thứ tự: người đến trước được phục vụ trước; `head` là số đang gọi.

### C. Template tư duy

```text
Pending interval là [head, queue.length).
Enqueue push; dequeue đọc queue[head++] nếu còn pending.
Batch: levelSize = queue.length - head trước vòng con.
Invariant: item trước head đã xử lý đúng một lần và đúng FIFO.
```

### D. Template code

```js
const queue = [start];
let head = 0;
while (head < queue.length) {
  const current = queue[head++];
  for (const next of expand(current)) queue.push(next);
}
```

### E. Bài mẫu — Completion time FIFO

1. **Đề:** jobs duration xử lý theo order, trả completion time. 2. `[3,1,2]→[3,4,6]`. 3. Tất cả đã đến. 4. `shift()` đúng logic nhưng chậm. 5. Chỉ cần cursor. 6. Head-index queue. 7. `head,time,output`. 8. Dequeue, cộng, emit. 9. `[0,head)` đã xử lý; time là tổng prefix. 10. While pending. 11. Code:

```js
function completionTimes(durations) {
  const output = [];
  let head = 0;
  let time = 0;
  while (head < durations.length) {
    time += durations[head++];
    output.push(time);
  }
  return output;
}
```

12. Head tăng đúng một lần. 13. Dry run:

| Bước | Item/head | State trước | Điều kiện | Hành động | State sau |
| --- | --- | --- | --- | --- | --- |
| 1 | h0→3 | time0 | pending | +3 | h1,time3 |
| 2 | h1→1 | time3 | pending | +1 | h2,time4 |
| 3 | h2→2 | time4 | pending | +2 | h3,time6 |

14. O(n), O(n) output. 15. `shift()`; head vượt length; dùng stack. 16. Round-robin: unfinished job enqueue lại tail.

**Recall Card `[SQ-03]`:** pending `[head,length)`. **Blank Page:** queue loop. **Mutation:** batching. **Explain Back:** vì sao item push thêm vẫn được xử lý?

## Dạng 4 `[SQ-04]` — Circular queue

**Dấu hiệu nhận dạng:** capacity cố định, cần enqueue/dequeue `O(1)` và tái sử dụng slot sau khi head đi qua. **Brute force bottleneck:** dồn/copy buffer sau mỗi dequeue là tuyến tính; transition guard full/empty trước, read/write tại pointer hiện tại rồi modulo pointer và update `size`.

### A. Bản chất

Buffer capacity cố định tái sử dụng ô bằng modulo. `head` là front, `tail` là ô enqueue kế, `size` phân biệt empty/full khi hai index bằng nhau.

### B. Mental model

Băng chuyền vòng: qua ô cuối quay về 0; bộ đếm cho biết số kiện thật.

### C. Template tư duy

```text
buffer(capacity), head=tail=size=0.
enqueue: guard full, write tail, modulo tail, size++.
dequeue: guard empty, read head, modulo head, size--.
Invariant: size item FIFO bắt đầu tại head; tail là ô write kế.
```

### D. Template code

```js
class CircularQueue {
  constructor(capacity) {
    if (!Number.isInteger(capacity) || capacity <= 0) throw new RangeError(`capacity`);
    this.buffer = Array(capacity);
    this.head = 0; this.tail = 0; this.size = 0;
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

### E. Bài mẫu — Buffer capacity ba

1. Enqueue 1,2,3; reject4; dequeue1; enqueue4; sau đó ra 2,3,4. 2. Capacity3. 3. `head===tail` mơ hồ. 4. Shift array O(capacity). 5. Tái sử dụng slot. 6. Circular + size. 7. buffer/head/tail/size. 8. Access rồi modulo/update size. 9. `size` FIFO items bắt đầu head. 10. Guard trước access. 11. Code template. 12. Move pointer sau read/write. 13. Dry run:

| Bước | Operation | State trước | Điều kiện | Hành động | State sau |
| --- | --- | --- | --- | --- | --- |
| 1 | enq1,2,3 | h0,t0,s0 | còn chỗ | write/modulo | h0,t0,s3 |
| 2 | enq4 | s3 | full | false | không đổi |
| 3 | deq | h0 | nonempty | read1 | h1,t0,s2 |
| 4 | enq4 | t0 | còn chỗ | write slot0 | h1,t1,s3 |

14. O(1) mỗi operation/O(capacity). 15. Capacity0; overwrite full; quên size; move trước read. 16. Overwrite-oldest phải chủ động advance head khi full.

**Recall Card `[SQ-04]`:** head read, tail write, size phân biệt. **Blank Page:** capacity1. **Mutation:** overwrite oldest. **Explain Back:** vì sao head=tail mơ hồ?

## Dạng 5 `[SQ-05]` — BFS queue

**Dấu hiệu nhận dạng:** shortest theo số bước/cạnh trên graph không trọng số hoặc cần lan từng layer. **Brute force bottleneck:** enumerate mọi walk lặp cycle/exponential; transition mark visited **khi enqueue**, gán `distance[next]=distance[current]+1`, rồi push để mỗi state vào queue tối đa một lần.

### A. Bản chất

BFS dùng FIFO để state distance nhỏ expand trước. Mark visited khi enqueue giúp mỗi state vào queue tối đa một lần; lần đầu gặp là shortest trong graph không trọng số.

### B. Mental model

Sóng lan từng lớp: lớp `d` sinh lớp `d+1`, lớp xa không vượt lên trước.

### C. Template tư duy

```text
Model state, neighbors và visited key.
Mark + enqueue start.
Dequeue current; neighbor hợp lệ chưa seen: mark, distance+1, enqueue.
Invariant: queue có distance không giảm; assigned distance là shortest.
```

### D. Template code

```js
function bfsDistances(graph, start) {
  const distance = Array(graph.length).fill(-1);
  const queue = [start];
  let head = 0;
  distance[start] = 0;
  while (head < queue.length) {
    const node = queue[head++];
    for (const next of graph[node]) {
      if (distance[next] !== -1) continue;
      distance[next] = distance[node] + 1;
      queue.push(next);
    }
  }
  return distance;
}
```

### E. Bài mẫu — Distance graph không trọng số

1. **Đề:** adjacency list, unreachable -1. 2. `[[1,2],[3],[3],[]],0→[0,1,1,2]`. 3. Start hợp lệ. 4. DFS không bảo đảm shortest lần đầu. 5. Cần layer order. 6. BFS. 7. queue/head/distance. 8. Mark neighbor rồi enqueue. 9. Queue distance không giảm. 10. Mark start trước loop. 11. Code template. 12. Mark sớm tránh node3 enqueue hai lần. 13. Dry run:

| Bước | Node/head | State trước | Điều kiện | Hành động | State sau |
| --- | --- | --- | --- | --- | --- |
| seed | 0 | d `[0,-1,-1,-1]` | — | enqueue | q `[0]` |
| 1 | 0 | h0 | 1,2 unseen | mark/enqueue | d `[0,1,1,-1]` |
| 2 | 1 | h1 | 3 unseen | mark2/enqueue | d3=2 |
| 3 | 2 | h2 | 3 seen | skip | không đổi |

14. O(V+E)/O(V). 15. Mark khi dequeue; dùng stack; `shift()`; weighted graph cần Dijkstra. 16. Multi-source: seed mọi nguồn distance0 trước loop.

**Recall Card `[SQ-05]`:** FIFO layer + mark on enqueue. **Blank Page:** BFS distance. **Mutation:** multi-source. **Explain Back:** vì sao first distance shortest?

## Transfer Test B

Làm [S08-T02](03_Practice_Ladder.md#s08-t02--lan-truyền-có-undo-log-sq-05sq-01).
