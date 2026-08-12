# Practice Ladder — Chapter 13

[← Chapter](../../13_Advanced_Graph.md) · [Solutions](../../solutions/13_Advanced_Graph_Solutions.md)

## Recognition

### P13-R01 — `GR-01`
Graph weighted nonnegative, cần shortest từ source: vì sao BFS sai?
### P13-R02 — `GR-01`
Weight có cạnh âm: Dijkstra còn proof không, engine nào cần cân nhắc?
### P13-R03 — `GR-02`
Cần nối mọi đảo với tổng cost nhỏ nhất: objective khác shortest-source thế nào?
### P13-R04 — `GR-02`
Graph disconnected: output/gate nào ngăn trả partial forest cost?
### P13-R05 — `GR-03`
Hỏi mọi cặp có quan hệ gián tiếp, không hỏi distance: state matrix là gì?
### P13-R06 — `GR-03`
Khi nào traversal từ mỗi source hợp hơn closure `O(V³)`?
### P13-R07 — `GR-04`
Dùng mọi ticket đúng một lần: visited node hay edge occurrence?
### P13-R08 — `GR-04`
Parallel tickets làm Set adjacency sai ra sao?
### P13-R09 — `GR-05`
Đi lại cạnh cũ tới vertex cũ có tạo room không?
### P13-R10 — `GR-05`
Vì sao tám hướng chéo cần hai half-step?

## Fill

### P13-F01 — `GR-01`
Điền stale check và strict relaxation trong Dijkstra.
### P13-F02 — `GR-02`
Điền path compression, union khác root và điều kiện đủ `n-1` edge.
### P13-F03 — `GR-03/04`
Điền loop order closure và thời điểm append node của Hierholzer.

## Logic

### P13-L01 — `GR-01/02`
Tạo một graph mà MST path từ source không phải shortest path.
### P13-L02 — `GR-03/04`
Chứng minh closure invariant theo middle và Euler invariant theo consumed edge.
### P13-L03 — `GR-05`
Trace square, retrace và diagonal crossing theo vertex/edge sets.

## Pseudocode

### P13-P01 — `GR-01`
Viết adjacency, distance, heap pop/stale/relax và unreachable result.
### P13-P02 — `GR-02/03`
Viết Kruskal có disconnected gate và transitive closure.
### P13-P03 — `GR-04/05`
Viết edge-once postorder và planar atomic-step update.

## Code

### P13-C01 — `GR-01`
Code Dijkstra; test parallel edge, stale record, unreachable và negative rejection.
### P13-C02 — `GR-02/03`
Code DSU/Kruskal và closure; test cycle, disconnected, directed chain.
### P13-C03 — `GR-04/05`
Code Euler lexical trail và room count; test parallel edge, impossible edge, retrace, diagonal crossing.

## Variants

### P13-V01 — `GR-01/02`
Mở rộng Dijkstra với coupon-used state và Kruskal với pre-connected components.
### P13-V02 — `GR-03/04/05`
Đổi closure boolean thành Floyd distance; Euler recursion thành iterative; planar single-component thành nhiều component.

## Mini-test

### P13-M01 — Mixed
Trong 60 phút giải năm contract ngắn không gắn pattern. Nộp objective, engine, state, invariant/proof, code skeleton, counterexample và complexity. Rubric: recognition 2, state 2, transition 2, proof 2, revealing test 1, complexity 1.
