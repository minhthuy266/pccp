# PF14 — Unweighted shortest path BFS

Nguồn: [OF038](../official-lessons/OF038.md), [OF039](../official-lessons/OF039.md), [OF040](../official-lessons/OF040.md), [OF045](../official-lessons/OF045.md), [OF055](../official-lessons/OF055.md), [OF056](../official-lessons/OF056.md).

## 1. Tín hiệu nhận dạng

Mỗi thao tác/cạnh có cùng cost và đề hỏi ít bước/cạnh nhất, distance layer, hoặc mọi node xa nhất. BFS duyệt state theo distance không giảm nên lần đầu discover một state là shortest.

Graph không nhất thiết được cho sẵn: word transformation, phép toán số và grid đều là implicit graph nếu ta định nghĩa được `neighbors(state)`.

## 2. Không dùng khi

- Edge có weight khác nhau: PF22 Dijkstra; weight 0/1 có 0-1 BFS.
- Cần khám phá component nhưng không cần distance: PF13 đủ.
- State space vô hạn mà không có bound hợp lệ.
- Có negative weight: Dijkstra/BFS đều sai.
- Cần dùng tất cả edge: Euler trail, không phải shortest path.

## 3. Decision tree

```text
Mọi edge cost 1?                  → BFS
Nhiều source cùng distance 0?     → enqueue tất cả source ban đầu
Bắt buộc đi qua waypoint?         → BFS từng phase và cộng; visited riêng
Graph implicit?                   → viết neighbor generator + bound
Chỉ weight 0/1?                   → deque 0-1 BFS
Weight nonnegative bất kỳ?        → Dijkstra
```

## 4. Knobs tạo biến thể

- Distance tính edge, node count hay time.
- Single-source/multi-source.
- Một target, mọi distance, hay count shortest paths.
- State có thêm key/mask/direction/time parity.
- Waypoint theo thứ tự bắt buộc hay chọn tự do.
- Grid geometry cần scale để tránh corner shortcut.
- Visited boolean hay `distance`; có được revisit khi có đường bằng/ngắn hơn.

## 5. Invariant và proof

Queue chứa state theo distance không giảm. Khi neighbor chưa thăm được enqueue với `distance[current]+1`, không đường ngắn hơn tới neighbor có thể xuất hiện sau vì mọi node trước đó hoặc cùng layer đã/đang được xử lý. Vì vậy mark lúc enqueue và lần discover đầu là shortest.

Multi-phase: đường hợp lệ bắt buộc `S→L→E` có length bằng shortest `S→L` cộng shortest `L→E`; visited phải mới cho mỗi phase vì reachability từ source mới là bài toán mới.

Implicit graph: proof chỉ đúng nếu neighbor generator sinh **mọi và chỉ** transition hợp lệ.

## 6. Code core đáng thuộc

```js
function bfsDistance(start, isTarget, neighbors) {
  const queue = [start];
  let head = 0;
  const distance = new Map([[start, 0]]);

  while (head < queue.length) {
    const state = queue[head++];
    if (isTarget(state)) return distance.get(state);
    for (const next of neighbors(state)) {
      if (distance.has(next)) continue;
      distance.set(next, distance.get(state) + 1);
      queue.push(next);
    }
  }
  return -1;
}
```

```js
function seedMultiSource(sources) {
  const queue = [];
  const distance = new Map();
  for (const source of sources) {
    if (distance.has(source)) continue;
    distance.set(source, 0);
    queue.push(source);
  }
  return { queue, distance };
}
```

## 7. Counterexamples bóc lỗi

- Mark lúc dequeue trên graph hội tụ làm enqueue duplicate hàng loạt.
- Dùng `shift()` khiến queue JavaScript có chi phí dời phần tử; dùng head pointer.
- OF055 dùng chung visited cho phase hai có thể khóa đường hợp lệ.
- Word graph cho phép khác “không quá một” ký tự sẽ tạo self/edge sai; contract là đúng một.
- Numeric BFS không bound state có thể chạy vô hạn hoặc tốn memory.
- OF040 không scale coordinate cho phép đi tắt tại corner/cạnh chồng.
- Trả distance 0/edge count khi đề tính số ô path cần cộng 1 đúng contract.

## 8. Drills biến thể

### Drill A — count shortest paths

Lưu `distance` và `ways`. Discover lần đầu: set distance, copy ways; gặp lại với cùng `distance+1`: cộng ways nhưng không enqueue lại nếu neighbor đã có layer đúng.

### Drill B — key and door

State không chỉ là cell mà là `(row,column,keyMask)`. Visited theo cell riêng sẽ gộp hai future khác nhau và sai.

### Drill C — 0-1 BFS

Edge cost 0 push front, cost 1 push back của deque. Distance có thể relax lại; boolean visited đơn giản không đủ.

### Drill D — bidirectional BFS

Khi branching lớn và biết target, BFS từ hai đầu có thể giảm độ sâu frontier. Phải giữ hai distance map và detect giao; implicit transition có hướng phải có reverse-neighbor đúng.

## 9. Câu hỏi mở tư duy

- Một state đầy đủ gồm những biến nào ảnh hưởng future?
- Mọi transition có cùng cost không?
- Neighbor generator và bound có bỏ/lấy thừa edge nào?
- Distance output tính theo gì?
- Có phase/source nào cần visited độc lập?

## 10. Checklist 15 giây

Ghi: **state encoding, source(s), neighbor rule, bound, queue/head, mark-at-enqueue, distance meaning, target/unreachable và lý do edge đồng cost**.
