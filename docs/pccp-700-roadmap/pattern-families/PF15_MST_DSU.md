# PF15 — Minimum spanning tree và DSU

Nguồn: [OF029](../official-lessons/OF029.md).

## 1. Tín hiệu nhận dạng

Cần kết nối tất cả vertex với tổng cost cạnh nhỏ nhất; đường đi cụ thể giữa từng cặp không quan trọng, chỉ connectivity toàn hệ thống. Nếu graph vô hướng và được chọn subset edge, đây là minimum spanning tree.

Kruskal biến bài toán thành: xét edge từ rẻ đến đắt, nhận edge nếu nó nối hai component khác nhau. DSU trả lời component nhanh.

## 2. Không dùng khi

- Cần shortest path từ source tới node: Dijkstra/BFS.
- Graph có hướng: MST chuẩn không áp dụng trực tiếp.
- Cần minimum arborescence, Steiner tree hoặc giới hạn bậc: bài khác khó hơn.
- Graph đã là tree và chỉ query ancestor/path: không cần Kruskal.
- Cần connectivity sau deletion online: DSU thường không hỗ trợ split.

## 3. Decision tree

```text
Kết nối mọi vertex, graph vô hướng, minimize sum edge? → MST
Edge list thuận tiện?                                  → Kruskal + DSU
Graph dense/adjacency matrix?                          → Prim có thể tiện hơn
Chỉ hỏi connectivity khi thêm edge?                    → DSU
Cần shortest source→all?                               → PF22
```

## 4. Knobs tạo biến thể

- Graph đã connected hay có thể disconnected; khi đó trả impossible hoặc minimum spanning forest.
- Có duplicate/parallel edge, self-loop, negative cost.
- Cần total cost hay chính edge được chọn.
- Vertex label 0-based, 1-based hoặc string cần mapping.
- Query online add-edge/connectivity.
- Cần maximum spanning tree: đảo order, proof cut property tương tự.

## 5. Invariant và proof

Sau khi xét một prefix edge đã sort, DSU component đúng bằng các component tạo bởi edge đã chọn. Chỉ union hai root khác nhau nên chosen luôn là forest.

Cut property: edge nhẹ nhất bắc qua một cut có thể nằm trong một MST. Khi Kruskal chọn edge nối hai component, đó là edge chưa xét nhẹ nhất bắc qua cut của component; thêm nó là an toàn. Khi đã chọn `n-1` edge và connected, forest trở thành tree.

## 6. Code core đáng thuộc

```js
class DisjointSet {
  constructor(size) {
    this.parent = Array.from({ length: size }, (_, index) => index);
    this.rank = Array(size).fill(0);
  }

  find(node) {
    if (this.parent[node] !== node) {
      this.parent[node] = this.find(this.parent[node]);
    }
    return this.parent[node];
  }

  union(first, second) {
    let rootA = this.find(first);
    let rootB = this.find(second);
    if (rootA === rootB) return false;
    if (this.rank[rootA] < this.rank[rootB]) [rootA, rootB] = [rootB, rootA];
    this.parent[rootB] = rootA;
    if (this.rank[rootA] === this.rank[rootB]) this.rank[rootA]++;
    return true;
  }
}
```

```js
function kruskal(vertexCount, edges) {
  const dsu = new DisjointSet(vertexCount);
  let cost = 0;
  let selected = 0;
  for (const [from, to, weight] of [...edges].sort((a, b) => a[2] - b[2])) {
    if (!dsu.union(from, to)) continue;
    cost += weight;
    selected++;
    if (selected === vertexCount - 1) break;
  }
  return selected === vertexCount - 1 ? cost : null;
}
```

## 7. Counterexamples bóc lỗi

- Cộng mọi edge rẻ mà không reject cycle tạo graph thừa edge.
- Dừng sau `n` edge thay vì `n-1`.
- Graph disconnected nhưng trả partial forest cost như MST hợp lệ.
- Dùng parent trực tiếp thay `find()` sẽ nhầm node cùng component qua nhiều tầng.
- Sort edge theo string/cột sai.
- Union không theo root phá cấu trúc DSU.

## 8. Drills biến thể

### Drill A — trả chosen edges

Khi union thành công, push edge vào result. Test result có `n-1` edge, connected, acyclic và sum đúng.

### Drill B — maximum spanning tree

Sort weight giảm. Cut argument đổi “nhẹ nhất” thành “nặng nhất”. Dùng cho maximize bottleneck/tổng tùy contract, không áp dụng cho longest simple path.

### Drill C — online connectivity

Với commands `union(a,b)` và `connected(a,b)`, DSU xử lý gần `O(α(n))`. Nếu có `remove edge`, DSU thường không đủ; cần offline reverse processing hoặc dynamic connectivity.

### Drill D — điểm trong mặt phẳng

Complete graph có `O(n²)` edge; Kruskal materialize tất cả có thể quá lớn. Constraint/geometry quyết định Prim `O(n²)` hoặc kỹ thuật chuyên biệt.

## 9. Câu hỏi mở tư duy

- Objective là connectivity total cost hay path distance?
- Graph có vô hướng và connected không?
- DSU invariant nằm ở root nào?
- Khi nào union trả false và tại sao edge đó không cần?
- Có thể dừng ở bao nhiêu edge?

## 10. Checklist 15 giây

Chốt: **MST contract, sort weight, DSU find compression, union roots, cycle rejection, `n-1` termination và disconnected handling**.
