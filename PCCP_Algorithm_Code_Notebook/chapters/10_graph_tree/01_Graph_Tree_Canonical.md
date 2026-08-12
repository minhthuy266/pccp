# Graph Traversal và Tree canonical — `BFS-01..07`, `TREE-01`

[← Chương 10](../../10_BFS_DFS.md) · [PF13](../../../docs/pccp-700-roadmap/pattern-families/PF13_DFS_COMPONENT_TREE_SHAPE.md) · [PF14](../../../docs/pccp-700-roadmap/pattern-families/PF14_UNWEIGHTED_BFS.md) · [PF24](../../../docs/pccp-700-roadmap/pattern-families/PF24_PARENT_CHAIN_PROPAGATION.md)

## `[BFS-01]` — Graph modeling và adjacency traversal

### Core, dấu hiệu nhận dạng và brute force bottleneck

Graph xuất hiện khi object là node và quan hệ hợp lệ là edge. Brute force scan toàn edge list để tìm neighbor mỗi lần lặp công việc `O(VE)`; adjacency list đưa traversal về `O(V+E)`. Counter-signal: nếu chỉ là array order/range, đừng dựng graph giả.

### State, invariant và transition

State gồm adjacency, frontier và visited. Invariant: visited chứa đúng node đã discover; frontier chứa node đã discover chưa xử lý. Transition lấy một node, sinh mọi neighbor hợp lệ, mark trước khi đưa frontier để không duplicate.

### Template JavaScript

```js
function buildAdjacency(vertexCount, edges, directed = false) {
  const graph = Array.from({ length: vertexCount }, () => []);
  for (const [from, to] of edges) {
    graph[from].push(to);
    if (!directed) graph[to].push(from);
  }
  return graph;
}
```

### Dry run, complexity, biến thể và transfer

Edge `0-1,1-2`: adjacency `[[1],[0,2],[1]]`; từ 0 discover 1 rồi 2. Build/traverse `O(V+E)`, space `O(V+E)`. Variants: directed chỉ add một chiều; implicit graph sinh neighbor khi cần. Transfer: OF037, OF045. Revealing test có isolated node.

## `[BFS-02]` — Grid flood fill và connected components

### Core, dấu hiệu nhận dạng và brute force bottleneck

Đề hỏi số vùng/kích thước island/component, không hỏi shortest route. Brute force bắt đầu traversal lại từ mọi cell và không chia sẻ visited gây lặp; outer scan chỉ flood-fill cell hợp lệ chưa thăm.

### State, invariant và transition

State `(row,column)`, global visited, direction 4/8. Invariant sau một flood fill: mọi và chỉ cell reachable cùng component đã mark. Outer scan đếm đúng một lần vì chỉ seed cell unseen. Transition tạo next → bounds → cell predicate → mark → push.

### Template JavaScript

```js
function countGridComponents(grid) {
  const rows = grid.length, columns = grid[0]?.length ?? 0;
  const seen = Array.from({ length: rows }, () => Array(columns).fill(false));
  const directions = [[1,0],[-1,0],[0,1],[0,-1]];
  let count = 0;
  for (let r = 0; r < rows; r++) for (let c = 0; c < columns; c++) {
    if (grid[r][c] !== 1 || seen[r][c]) continue;
    count++;
    const stack = [[r,c]]; seen[r][c] = true;
    while (stack.length) {
      const [cr,cc] = stack.pop();
      for (const [dr,dc] of directions) {
        const nr=cr+dr,nc=cc+dc;
        if (nr<0||nr>=rows||nc<0||nc>=columns||seen[nr][nc]||grid[nr][nc]!==1) continue;
        seen[nr][nc]=true; stack.push([nr,nc]);
      }
    }
  }
  return count;
}
```

### Dry run, complexity, biến thể và transfer

Hai cell chỉ chạm góc là hai component với 4-neighbor nhưng một với 8-neighbor. Mỗi cell/edge grid xử lý hằng lần: `O(RC)` time/space. Variants trả size/member/canonical shape. Transfer: OF037, OF042; counterexample chỉ traverse từ `(0,0)` bỏ component khác.

## `[BFS-03]` — BFS shortest path không trọng số

### Core, dấu hiệu nhận dạng và brute force bottleneck

Mỗi edge cost bằng nhau, cần ít bước/cạnh nhất. DFS brute force có thể enumerate nhiều path; BFS đi theo layer nên lần discover đầu là shortest. Có weight khác nhau là counter-signal chuyển Dijkstra.

### State, invariant và transition

State queue head-index và distance/visited. Invariant: queue có distance không giảm; khi enqueue unseen neighbor với `dist+1`, không đường ngắn hơn có thể xuất hiện sau. Mark lúc enqueue.

### Template JavaScript

```js
function shortestUnweighted(graph, source, target) {
  const distance = Array(graph.length).fill(-1);
  const queue = [source]; let head = 0; distance[source] = 0;
  while (head < queue.length) {
    const node = queue[head++];
    if (node === target) return distance[node];
    for (const next of graph[node]) if (distance[next] === -1) {
      distance[next] = distance[node] + 1;
      queue.push(next);
    }
  }
  return -1;
}
```

### Dry run, complexity, biến thể và transfer

Chain `0-1-2` cho distance 0,1,2. `O(V+E)` time, `O(V)` state ngoài graph. Variants: distance tính edge hay số cell; implicit word/numeric graph. Transfer OF038–OF040, OF045, OF056. `shift()` lặp và mark-at-pop là lỗi JS/performance.

## `[BFS-04]` — Multi-source BFS

### Core, dấu hiệu nhận dạng và brute force bottleneck

Cần khoảng cách tới nguồn gần nhất hoặc nhiều điểm lan đồng thời. Chạy BFS riêng từng source là brute force lặp graph; seed mọi source ở distance 0 tạo một super-source logic.

### State, invariant và transition

Invariant: trước layer d, mọi state distance nhỏ hơn d đã cố định; queue ban đầu chứa mọi source unique với distance 0. Transition giống BFS-03, không seed duplicate.

### Template JavaScript

```js
function multiSourceDistances(graph, sources) {
  const distance = Array(graph.length).fill(-1), queue=[]; let head=0;
  for (const source of sources) if (distance[source] === -1) {
    distance[source]=0; queue.push(source);
  }
  while (head<queue.length) {
    const node=queue[head++];
    for (const next of graph[node]) if (distance[next]===-1) {
      distance[next]=distance[node]+1; queue.push(next);
    }
  }
  return distance;
}
```

### Dry run, complexity, biến thể và transfer

Chain 0-1-2-3, sources 0 và 3 cho `[0,1,1,0]`. Vẫn `O(V+E)`, không nhân số source. Variant weighted multi-source dùng Dijkstra seeded nhiều record. Transfer: nearest facility/ripening; counterexample enqueue cùng source hai lần mà không dedupe.

## `[BFS-05]` — DFS recursive và iterative

### Core, dấu hiệu nhận dạng và brute force bottleneck

DFS phù hợp reachability/component/postorder khi không cần shortest. Recursive code dựa call stack; JavaScript có thể overflow trên path sâu, nên explicit stack là template an toàn. Brute force không visited lặp cycle vô hạn.

### State, invariant và transition

Stack chứa node discovered chưa xử lý; visited ngăn quay lại. Invariant giống traversal nhưng order là LIFO. Muốn iterative giữ đúng preorder của recursive adjacency order, push neighbors theo thứ tự ngược.

### Template JavaScript

```js
function iterativeDfs(graph, source) {
  const order=[], stack=[source], seen=Array(graph.length).fill(false);
  seen[source]=true;
  while (stack.length) {
    const node=stack.pop(); order.push(node);
    for (let i=graph[node].length-1;i>=0;i--) {
      const next=graph[node][i];
      if (!seen[next]) { seen[next]=true; stack.push(next); }
    }
  }
  return order;
}
```

### Dry run, complexity, biến thể và transfer

Graph 0→[1,2], push 2 rồi 1 để visit 1 trước. `O(V+E)` time, `O(V)` stack. Variants preorder/postorder require different frames; recursive DFS simpler for backtracking but depth-bound required. Transfer OF023/OF037. Counterexample đánh visited quá muộn push duplicate.

## `[BFS-06]` — Visited nhiều chiều theo full state

### Core, dấu hiệu nhận dạng và brute force bottleneck

Cùng node/cell nhưng có key, wall-break, direction hoặc resource khác thì future khác. Boolean visited theo node gộp state không tương đương và bỏ nghiệm; brute force không visited lại bùng nổ. State phải chứa mọi biến ảnh hưởng transition tương lai.

### State, invariant và transition

Ví dụ `(row,column,breaksUsed)`. Invariant: `distance[r][c][b]` là shortest tới đúng state đó; hai state cùng cell khác b không thay thế nhau. Transition tính next resource trước khi bounds/state check rồi mark-at-enqueue.

### Template JavaScript

```js
function stateKey(row, column, resource) {
  return `${row},${column},${resource}`;
}
```

### Dry run, complexity, biến thể và transfer

Tới cell X chưa dùng break và đã dùng break phải giữ hai record: bản chưa dùng có nhiều future hơn nhưng có thể distance khác. Complexity `O(numberOfStates + transitions)`, thường `O(RC·K)`. Variants key bitmask/time parity. Transfer OF055 hai phase dùng visited riêng; counterexample visited chỉ `[r][c]`.

## `[BFS-07]` — Directed, undirected và tree traversal

### Core, dấu hiệu nhận dạng và brute force bottleneck

Direction là contract của edge. Tree có duy nhất một path và `n-1` edge nên parent có thể thay visited; general graph cần visited. Brute force bỏ từng edge rồi rebuild/traverse có thể `O(n²)`; subtree postorder xử lý mọi split một lần.

### State, invariant và transition

Rooted tree state `parent[node]`, `subtree[node]`. Invariant postorder: trước khi chốt node, subtree mọi child đã đúng; `subtree[node]=1+sum(child)`. Transition skip parent, không add reverse edge cho directed graph.

### Template JavaScript

```js
function subtreeSizes(tree, root=0) {
  const parent=Array(tree.length).fill(-1), order=[root];
  for (let i=0;i<order.length;i++) for (const next of tree[order[i]]) {
    if (next===parent[order[i]]) continue;
    parent[next]=order[i]; order.push(next);
  }
  const size=Array(tree.length).fill(1);
  for (let i=order.length-1;i>0;i--) size[parent[order[i]]]+=size[order[i]];
  return { parent, size };
}
```

### Dry run, complexity, biến thể và transfer

Tree 0-[1,2], 1-[3] có reverse order chốt 3→1→2→0, sizes `[4,2,1,1]`. `O(V+E)`. Variants reroot/ancestor; directed indegree/outdegree. Transfer OF023. Counterexample dùng parent-skip trên general cycle không đủ visited.

## `[TREE-01]` — Parent-chain propagation

### Core, dấu hiệu nhận dạng và brute force bottleneck

Mỗi event đi từ node lên root duy nhất: hoa hồng, ancestor update. DFS toàn cây cho mỗi event là brute force xử lý node không liên quan; parent Map cho `O(height)`. Counter-signal: update toàn subtree cần Euler interval, không đi parent chain.

### State, invariant và transition

State `current,value,parent,aggregate`. Invariant trước iteration: value là đúng khoản current vừa nhận; ancestor chưa xử lý không nhận gì khác. Transition split giữ/truyền, cộng aggregate, gán parent. Dừng ở root hoặc khi upward bằng 0.

### Template JavaScript

```js
function propagateToRoot(start, value, parent, earnings) {
  let current=start, amount=value;
  while (current!=="-" && amount>0) {
    const upward=Math.floor(amount/10);
    earnings.set(current, earnings.get(current)+amount-upward);
    current=parent.get(current); amount=upward;
  }
}
```

### Dry run, complexity, biến thể và transfer

1000 truyền 100, giữ 900; parent nhận 100 truyền 10 giữ 90. `O(events·height)` time, `O(nodes)` maps. Variants kth ancestor cần binary lifting; subtree update khác engine. Transfer SR006. Counterexample tính 10% từ sale gốc ở mọi tầng hoặc round thay floor.
