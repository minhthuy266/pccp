# PF22 — Weighted shortest path: Dijkstra

Nguồn: [OF059](../official-lessons/OF059.md).

## 1. Tín hiệu nhận dạng

Graph có trọng số cạnh không âm và cần shortest distance từ một source tới một/mọi node. BFS sai khi một cạnh có thể cost 10 còn hai cạnh khác tổng cost 2; Dijkstra dùng min-heap để finalize theo distance nhỏ nhất hiện biết.

## 2. Không dùng khi

- Mọi edge cùng weight: BFS đơn giản hơn.
- Weight chỉ 0/1: 0-1 BFS có thể nhanh hơn.
- Có negative edge: Bellman-Ford hoặc DAG shortest path tùy cấu trúc.
- Cần minimum total network: MST, không phải shortest paths.
- All-pairs với n nhỏ/dense: Floyd-Warshall có thể phù hợp.

## 3. Decision tree

```text
Unweighted/equal cost?           → BFS
Weight 0/1?                      → 0-1 BFS
Weight nonnegative, sparse?      → Dijkstra + min-heap
Negative edge, no negative cycle?→ Bellman-Ford / DAG relaxation
All-pairs n nhỏ?                 → Floyd-Warshall
```

## 4. Knobs tạo biến thể

- Single-source, multi-source hay target-specific early exit.
- Directed/undirected.
- Parallel edges và self-loop.
- Chỉ distance hay reconstruct path.
- State mở rộng `(node,mask/time/couponUsed)`.
- Integer precision/BigInt; comparator heap cần hỗ trợ type.
- Cần count số shortest paths.

## 5. Invariant và proof

`distance[v]` là upper bound tốt nhất đã biết. Heap chứa candidate `(cost,node)` có thể stale. Khi pop record có `cost===distance[node]`, đây là distance nhỏ nhất chưa xử lý; vì mọi edge không âm, không path đi qua node chưa pop nào có thể quay lại tạo cost nhỏ hơn.

Relax edge `(u,v,w)`: nếu `distance[u]+w < distance[v]`, cập nhật và push record mới. Không cần decrease-key; record cũ được bỏ bằng stale check.

## 6. Code core đáng thuộc

```js
function dijkstra(vertexCount, adjacency, source, heap) {
  const distance = Array(vertexCount).fill(Infinity);
  distance[source] = 0;
  heap.push([0, source]);

  while (heap.size > 0) {
    const [cost, node] = heap.pop();
    if (cost !== distance[node]) continue;
    for (const [next, weight] of adjacency[node]) {
      const nextCost = cost + weight;
      if (nextCost >= distance[next]) continue;
      distance[next] = nextCost;
      heap.push([nextCost, next]);
    }
  }
  return distance;
}
```

Heap là min-heap comparator theo phần tử cost đầu tiên.

## 7. Counterexamples bóc lỗi

- BFS visited boolean trên cạnh weights `(A→B=10,A→C=1,C→B=1)` chốt B sai.
- Mark finalized lúc push thay vì lúc pop minimum sẽ khóa đường tốt hơn tới sau.
- Không stale-check vẫn có thể đúng nhưng xử lý thừa lớn; nếu dùng visited sai còn có thể sai.
- Graph vô hướng nhưng chỉ add một chiều.
- Parallel edges: overwrite adjacency tùy ý có thể giữ cạnh đắt hơn.
- Negative edge phá proof “pop là final”.

## 8. Drills biến thể

### Drill A — reconstruct shortest path

Khi relax tốt hơn, set `parent[next]=node`; sau search backtrack target. Với equal distance và lexical tie, cần định nghĩa update tie rõ.

### Drill B — một coupon giảm giá

State `(node,usedCoupon)`; mỗi edge có transition trả full cost và nếu chưa dùng thì discounted cost. Không thể chỉ giữ một distance per node vì future khác nhau.

### Drill C — multi-source

Set distance 0 và push mọi source. Tương đương thêm super-source với edge 0; trả khoảng cách tới source gần nhất.

### Drill D — count shortest paths

Relax nhỏ hơn: replace ways; relax bằng: cộng ways. Stale logic vẫn giữ. Chú ý zero-weight cycles có thể làm semantics count phức tạp.

## 9. Câu hỏi mở tư duy

- Weight có chắc không âm không?
- Một state chỉ là node hay cần thêm resource/mask?
- Khi nào pop record được coi final?
- Cần distance, path hay number of paths?
- Graph sparse/dense và numeric range thế nào?

## 10. Checklist 15 giây

Ghi: **state, adjacency direction, nonnegative proof, distance init, heap comparator, stale check, relaxation, unreachable và output projection**.
