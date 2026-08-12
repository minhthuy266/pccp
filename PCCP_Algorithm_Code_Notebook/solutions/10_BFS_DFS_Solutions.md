# Lời giải — 10 — Graph Traversal và Tree

[← Practice](../chapters/10_graph_tree/02_Practice_Ladder.md) · [Executable module](../../solutions/notebook/ch10_graph_tree.js)

## Recognition

### P10-R01 — `BFS-01`
Friendship thường undirected: add hai chiều. Follow relation directed: add đúng một chiều.
### P10-R02 — `BFS-01`
Neighbor là từ trong bank khác current đúng một ký tự; không materialize edge nếu bound cho phép sinh khi duyệt.
### P10-R03 — `BFS-02`
Outer scan seed mọi land unseen; một seed flood-fill trọn một component.
### P10-R04 — `BFS-02`
4 hướng không nối corner; 8 hướng có nối. Contract quyết định component relation.
### P10-R05 — `BFS-03`
BFS layer không giảm nên first discovery shortest; DFS order không có guarantee distance.
### P10-R06 — `BFS-03`
Weight khác nhau phá layer=edge count; dùng Dijkstra nếu nonnegative.
### P10-R07 — `BFS-04`
Enqueue mọi hospital unique với distance 0 trước traversal.
### P10-R08 — `BFS-05`
Explicit stack tránh call-stack overflow và cho lifecycle visited rõ.
### P10-R09 — `BFS-06`
Không. `(cell,keyMask)` có future khác; visited phải đủ hai chiều state.
### P10-R10 — `BFS-07`
Directed một chiều. Parent-skip chỉ đủ trên tree; general cycle cần visited.
### P10-R11 — `TREE-01`
Event chỉ đi unique path leaf→root; root DFS chạm node không liên quan.
### P10-R12 — Contrast
Lần lượt component DFS/BFS, BFS, Dijkstra, Euler trail.

## Fill

### P10-F01 — `BFS-03`
`node=queue[head++]`; set distance/visited **trước** `queue.push(next)`.
### P10-F02 — `BFS-05`
Push adjacency từ cuối về đầu để phần tử đầu được pop trước.
### P10-F03 — `TREE-01`
`upward=floor(amount/10)`, giữ `amount-upward`, dừng root hoặc amount 0.

## Logic

### P10-L01 — `BFS-02`
Hai component: cells `(0,0),(1,0)` và `(0,2)`.
### P10-L02 — `BFS-04`
Chain sources 0,3 cho distance `[0,1,1,0]`.
### P10-L03 — `BFS-06`
State `(r,c,usedBreak)` có tối đa `2RC` state; time/space `O(RC)` với factor 2.

## Pseudocode

### P10-P01 — `BFS-01/BFS-05`
Build adjacency; for each unseen node seed stack; mark on push; pop and push unseen neighbors.
### P10-P02 — `BFS-03/BFS-06`
Queue tuple, distance keyed full tuple; next mask computed from cell; enqueue unseen state với dist+1.
### P10-P03 — `BFS-07`
Build parent/order forward, initialize size1, iterate order reverse và cộng size child vào parent.

## Code

### P10-C01 — `BFS-02/BFS-03`
Xem `countGridComponents` và `shortestUnweighted`; revealing tests chạm góc và unreachable.
### P10-C02 — `BFS-04/BFS-06`
Xem `multiSourceDistances` và `shortestPathWithOneBreak`; source duplicate phải dedupe.
### P10-C03 — `BFS-07/TREE-01`
Xem `subtreeSizes` và `propagateToRoot`; rounding diễn ra từng tầng.

## Variants

### P10-V01 — `BFS-03 → GR-01`
Queue không còn ordered theo total cost; Dijkstra dùng min-heap và relaxation/stale check.
### P10-V02 — `BFS-02`
Traversal trả coordinate cells; normalize translation, sinh rotations và serialize. PF13 chịu canonical shape.

## Mini-test

### P10-M01 — Mixed graph
Nearest source=`BFS-04`; key-door=`BFS-06`; tree split=`BFS-07`. Rubric mỗi bài: model2, state2, invariant2, code2, test1, complexity1.
