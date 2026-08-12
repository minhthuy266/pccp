# Advanced Graph canonical — `GR-01..05`

[← Chương 13](../../13_Advanced_Graph.md) · [PF15](../../../docs/pccp-700-roadmap/pattern-families/PF15_MST_DSU.md) · [PF16](../../../docs/pccp-700-roadmap/pattern-families/PF16_EULER_TRAIL.md) · [PF17](../../../docs/pccp-700-roadmap/pattern-families/PF17_REACHABILITY_CLOSURE.md) · [PF18](../../../docs/pccp-700-roadmap/pattern-families/PF18_PLANAR_TOPOLOGY.md) · [PF22](../../../docs/pccp-700-roadmap/pattern-families/PF22_DIJKSTRA.md)

## `[GR-01]` — Dijkstra và stale min-heap record

### Core problem, recognition và brute force bottleneck

Tìm shortest distance từ một source trên graph có trọng số **không âm**. BFS tối ưu số cạnh chứ không tối ưu tổng weight: cạnh `A→B=10` thua đường `A→C=1,C→B=1`. Scan toàn bộ node chưa chốt để lấy distance nhỏ nhất cho `O(V²)`; min-heap giảm graph thưa xuống `O((V+E)log V)`.

Counter-signal: equal weight dùng BFS; weight 0/1 cân nhắc 0-1 BFS; negative edge phá proof Dijkstra; minimum total network là MST.

### State sentence, transition và invariant

`distance[v]` là upper bound tốt nhất đã biết từ source tới v. Heap chứa record `[candidateDistance,node]`; một node có thể có nhiều record. Pop record, bỏ nếu `cost !== distance[node]`; nếu còn mới, relax mỗi edge `(node,next,weight)`.

Invariant: khi pop record không stale có distance nhỏ nhất toàn frontier, distance đó là tối ưu. Vì mọi edge không âm, đi qua một frontier node chưa pop không thể quay lại tạo path nhỏ hơn.

### Template JavaScript — `TEMPLATE`

```js
function dijkstra(adjacency, source, heap) {
  const distance = Array(adjacency.length).fill(Infinity);
  distance[source] = 0; heap.push([0, source]);
  while (heap.size()) {
    const [cost, node] = heap.pop();
    if (cost !== distance[node]) continue;
    for (const [next, weight] of adjacency[node]) {
      const candidate = cost + weight;
      if (candidate >= distance[next]) continue;
      distance[next] = candidate;
      heap.push([candidate, next]);
    }
  }
  return distance;
}
```

### Dry run, complexity, variants và transfer

`0→1(10),0→2(1),2→1(1)`: heap từng có `[10,1]`, sau đó `[2,1]`; pop 2 chốt node 1, record 10 bị skip stale. Time `O((V+E)log V)`, space `O(V+E)` kể adjacency/heap.

Biến thể: directed/undirected; parallel edge; parent để dựng path; state `(node,couponUsed)`; multi-source seed nhiều distance 0. Counterexample mark visited lúc push sẽ khóa node 1 ở cost 10. Transfer OF059.

### Recall Card / Blank Page / Explain Back

- Recall: “nonnegative, min frontier, relax, stale skip”.
- Blank page: dựng `distance`, heap và strict improvement.
- Explain back: tại sao pop mới được final, push thì chưa.

## `[GR-02]` — Kruskal minimum spanning tree và DSU

### Core problem, recognition và brute force bottleneck

Chọn các edge để mọi vertex connected với **tổng edge cost nhỏ nhất**. Đây không phải shortest path từ source: MST có thể làm đường source→node dài để tổng network nhỏ. Brute force thử subsets cạnh là exponential.

Kruskal sort edge tăng dần; DSU trả lời nhanh hai endpoint đã cùng component chưa. Counter-signal: cần route ngắn nhất từ một source thì Dijkstra; graph directed cần mô hình khác.

### State sentence, transition và invariant

DSU giữ partition các component do edge đã nhận tạo thành. Với edge tăng dần `(u,v,w)`: nếu `find(u)!==find(v)`, union và cộng cost; nếu cùng root, edge tạo cycle nên bỏ.

Cut invariant: trước mỗi bước tồn tại một MST chứa toàn bộ edge đã chọn. Edge rẻ nhất nối qua một cut giữa hai component là safe; có thể exchange nó với edge đắt hơn trong MST mà không tăng cost.

### Template JavaScript — `TEMPLATE`

```js
function kruskalMST(n, edges, DSUClass) {
  const dsu = new DSUClass(n); let cost = 0, used = 0;
  for (const [u, v, weight] of [...edges].sort((a,b) => a[2]-b[2])) {
    if (!dsu.union(u, v)) continue;
    cost += weight; used++;
    if (used === n - 1) return cost;
  }
  return n <= 1 ? 0 : null;
}
```

### Dry run, complexity, variants và transfer

Triangle weights 1,2,10: nhận 1, nhận 2, đủ `n-1`; edge 10 không cần xét. Sort `O(E log E)`; DSU gần `O(E α(V))`; space `O(V+E)` nếu copy sort.

Disconnected graph không có spanning tree: phải kiểm `used===n-1`, không trả partial cost. Biến thể maximum spanning tree đảo sort; pre-connected groups union trước. Counterexample nhận edge chỉ vì rẻ mà không cycle check. Transfer OF029.

### Recall Card / Blank Page / Explain Back

- Recall: “sort edge; union khác root; đủ n−1”.
- Blank page: viết `find` path compression, union by size/rank, disconnected return.
- Explain back: shortest-path tree và minimum-total tree tối ưu hai objective nào.

## `[GR-03]` — Transitive closure / all-pairs reachability

### Core problem, recognition và brute force bottleneck

Dấu hiệu nhận dạng là cần biết với mọi cặp `(u,v)`, có tồn tại **bất kỳ path** từ u tới v không. Chạy BFS/DFS từ mọi source tốn `O(V(V+E))`; với n nhỏ/dense, Floyd-style closure `O(V³)` đơn giản và khớp matrix state. Không nhầm reachability boolean với shortest distance.

### State sentence, transition và invariant

`reachable[from][to]` cho biết có path dùng các intermediate đã cho phép. Với mỗi `middle`, nếu `from→middle` và `middle→to`, mở `from→to`.

Invariant sau vòng middle k: matrix đúng cho mọi path mà intermediate thuộc tập `0..k`. Thứ tự bắt buộc là `middle` ngoài cùng để proof theo tập intermediate đứng vững.

### Template JavaScript — `TEMPLATE`

```js
function transitiveClosure(n, edges) {
  const reach = Array.from({length:n}, () => Array(n).fill(false));
  for (const [u,v] of edges) reach[u][v] = true;
  for (let middle=0; middle<n; middle++)
    for (let from=0; from<n; from++) {
      if (!reach[from][middle]) continue;
      for (let to=0; to<n; to++)
        if (reach[middle][to]) reach[from][to] = true;
    }
  return reach;
}
```

### Dry run, complexity, variants và transfer

Edges `0→1,1→2`: khi `middle=1`, mở `0→2`. Time `O(V³)`, space `O(V²)`. Nếu contract coi node tự reachable qua path rỗng, set diagonal true; bài thứ hạng thường chỉ cần quan hệ thắng/thua và bỏ self.

Biến thể: Floyd-Warshall distance đổi boolean OR/AND thành min/+; bitset tăng tốc closure; graph sparse lớn chạy traversal từng source. Counterexample chỉ lan truyền một pass theo edge input sẽ phụ thuộc order và thiếu chain dài. Transfer OF046.

### Recall Card / Blank Page / Explain Back

- Recall: “middle ngoài; from→middle AND middle→to”.
- Blank page: viết nghĩa matrix gồm tập intermediate được phép.
- Explain back: vì sao đổi thứ tự loop không còn cùng invariant Floyd.

## `[GR-04]` — Hierholzer / Euler trail dùng mọi edge occurrence

### Core problem, recognition và brute force bottleneck

Dấu hiệu nhận dạng là phải dùng mỗi **cạnh/ticket occurrence** đúng một lần và trả sequence vertex. Node có thể thăm nhiều lần; boolean `visited[node]` sai. Backtracking thử mọi thứ tự edge có thể factorial; Hierholzer consume edge rồi nối các cycle/dead-end trong `O(E)` sau khi adjacency đã sắp.

### State sentence, transition và invariant

Adjacency lưu từng occurrence, kể cả parallel edge. `stack/path recursion` là walk đang mở; khi node còn edge thì consume một edge và đi tiếp; chỉ append node vào route khi không còn outgoing edge. Route được tạo ngược.

Invariant: mỗi edge bị pop đúng một lần. Khi append một vertex lúc dead end, suffix Euler từ vertex đó đã hoàn chỉnh; reverse postorder ghép mọi consumed edge liên tục.

### Template JavaScript — `TEMPLATE`

```js
function eulerTrailDirected(edges, start) {
  const graph = new Map();
  for (const [from,to] of edges) {
    if (!graph.has(from)) graph.set(from, []);
    graph.get(from).push(to);
  }
  for (const list of graph.values()) list.sort((a,b) => b.localeCompare(a));
  const reversed=[];
  function visit(node) {
    const list=graph.get(node);
    while (list?.length) visit(list.pop());
    reversed.push(node);
  }
  visit(start);
  const route=reversed.reverse();
  return route.length===edges.length+1 ? route : null;
}
```

### Dry run, complexity, variants và transfer

Tickets `A→B, A→B, B→A`: cả hai occurrence `A→B` phải nằm riêng trong adjacency; route có 4 vertex. Sort adjacency `O(E log E)`, consume `O(E)`, space `O(E)`. Recursive depth E có thể overflow; iterative stack là variant an toàn.

Biến thể lexical-smallest route cần sort reverse rồi pop nhỏ nhất; recursive depth lớn đổi sang iterative stack. Phải validate route length và degree/connectivity contract; Hierholzer skeleton không tự biến input vô nghiệm thành hợp lệ. Counterexample Set adjacency làm mất parallel ticket. Transfer OF041.

### Recall Card / Blank Page / Explain Back

- Recall: “visit edge once; append khi dead end; reverse”.
- Blank page: test parallel edges và impossible/disconnected edges.
- Explain back: tại sao đây là edge-state, không phải node-state DFS.

## `[GR-05]` — Planar walk: vertex, edge và room

### Core problem, recognition và brute force bottleneck

Dấu hiệu nhận dạng là một walk vẽ segment trên mặt phẳng và hỏi số vùng kín. Abstract cycle detection chưa đủ nếu hai diagonal cắt nhau giữa ô nhưng input không ghi vertex giao. Chỉ track vertex đếm retrace sai; chỉ track edge không biết endpoint cũ tạo face.

### State sentence, transition và invariant

Scale mỗi command thành hai unit substeps để midpoint diagonal trở thành integer vertex. State `(x,y,visitedVertices,visitedUndirectedEdges,rooms)`. Một edge mới đi tới vertex cũ tạo đúng một bounded face mới; edge đã tồn tại không đổi graph.

Invariant sau mỗi atomic substep: sets biểu diễn đúng planar graph đã vẽ. Với một connected drawing, thêm edge mới nối hai vertex đã có tăng `E` mà không tăng `V`, nên số bounded face tăng một; endpoint mới tăng cả `E,V`, không tăng face.

### Template JavaScript — `TEMPLATE`

```js
function canonicalEdge(a, b) { return a < b ? `${a}|${b}` : `${b}|${a}`; }

function applyPlanarStep(state, nextX, nextY) {
  const from=`${state.x},${state.y}`, to=`${nextX},${nextY}`;
  const edge=canonicalEdge(from,to);
  if (!state.edges.has(edge)) {
    if (state.vertices.has(to)) state.rooms++;
    state.edges.add(edge);
  }
  state.vertices.add(to); state.x=nextX; state.y=nextY;
}
```

### Dry run, complexity, variants và transfer

Đi quanh hình vuông: ba edge đầu tới vertex mới; edge cuối mới nhưng endpoint origin cũ nên rooms tăng 1. Mỗi command tạo hai substeps: time/space `O(numberOfCommands)` expected với Set.

Edge key phải vô hướng để A→B rồi B→A không thành edge mới. Scale ×2 chỉ đủ cho contract tám hướng đơn vị; segment tùy ý cần xử lý giao điểm tổng quát. Biến thể nhiều component cần Euler formula/DSU; có thể trả creation timestamps. Counterexample bỏ half-step làm mất diagonal crossing. Transfer OF047.

### Recall Card / Blank Page / Explain Back

- Recall: “atomic substep; edge mới + vertex cũ = room”.
- Blank page: viết collision-safe vertex key và canonical undirected edge.
- Explain back: dùng biến đổi `V,E,F` giải thích ba trường hợp endpoint mới/cũ/retrace.

## Blank Page Test toàn chương

Trong 60 phút, tự viết năm skeleton không nhìn tài liệu. Mỗi skeleton phải có: objective một câu, full state, invariant, một counterexample phân biệt pattern gần nhất, complexity và một revealing test. Nếu chỉ nhớ code nhưng không nói được objective/proof thì chưa qua.
