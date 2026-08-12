# Practice Ladder — Chapter 10

[← Chương 10](../../10_BFS_DFS.md) · [Solutions](../../solutions/10_BFS_DFS_Solutions.md) chỉ mở sau khi ghi state và neighbor rule.

## Recognition — 12 bài

### P10-R01 — `BFS-01`
Mô hình user/friend thành node/edge; chọn directed hay undirected.

### P10-R02 — `BFS-01`
Graph implicit phép đổi một ký tự: định nghĩa neighbor chính xác.

### P10-R03 — `BFS-02`
Đếm đảo với 4 hướng; giải thích vì sao cần outer scan.

### P10-R04 — `BFS-02`
Hai cell chạm góc: kết quả đổi thế nào nếu dùng 8 hướng?

### P10-R05 — `BFS-03`
Ít bước nhất trên edge đồng cost: vì sao BFS, không DFS?

### P10-R06 — `BFS-03`
Edge cost 1 và 5: nêu counter-signal chuyển Dijkstra.

### P10-R07 — `BFS-04`
Khoảng cách tới bệnh viện gần nhất: seed queue thế nào?

### P10-R08 — `BFS-05`
Path sâu 100.000 node trong JavaScript: recursive hay iterative?

### P10-R09 — `BFS-06`
Cùng cell nhưng khác keyMask có được dùng chung visited không?

### P10-R10 — `BFS-07`
Directed edge được add mấy chiều? Tree skip parent khác visited graph ra sao?

### P10-R11 — `TREE-01`
Sale tại leaf lan lên root: vì sao không DFS từ root?

### P10-R12 — Contrast
Gán engine: component size, shortest unweighted, weighted shortest, dùng mọi edge đúng một lần.

## Fill — 3 bài

### P10-F01 — `BFS-03`
Điền head-index queue và thời điểm mark visited.

### P10-F02 — `BFS-05`
Điền thứ tự push neighbor để iterative DFS giữ recursive preorder.

### P10-F03 — `TREE-01`
Điền `upward`, phần giữ lại và stop condition.

## Logic — 3 bài

### P10-L01 — `BFS-02`
Dry-run component labels trên `[[1,0,1],[1,0,0]]`.

### P10-L02 — `BFS-04`
Dry-run chain bốn node với source ở hai đầu.

### P10-L03 — `BFS-06`
Thiết kế state cho grid được phá tối đa một tường; nêu complexity.

## Pseudocode — 3 bài

### P10-P01 — `BFS-01/BFS-05`
Viết adjacency build và iterative component traversal.

### P10-P02 — `BFS-03/BFS-06`
Viết BFS state tuple `(row,column,keyMask)`.

### P10-P03 — `BFS-07`
Viết postorder subtree sizes không recursion.

## Blank-page code — 3 bài

### P10-C01 — `BFS-02/BFS-03`
Code component count và shortest grid; test isolated/unreachable.

### P10-C02 — `BFS-04/BFS-06`
Code multi-source và one-wall-break shortest path.

### P10-C03 — `BFS-07/TREE-01`
Code subtree sizes và commission propagation.

## Variants — 2 bài

### P10-V01 — `BFS-03 → GR-01`
Đổi edge đồng cost thành nonnegative weights; chỉ rõ invariant BFS nào bị phá.

### P10-V02 — `BFS-02`
Từ component count đổi thành canonical shape dưới rotation; phân vai traversal/normalization.

## Mini-test

### P10-M01 — Mixed graph
Trong 45 phút: nearest source, key-door shortest path, tree edge split. Nộp graph model, state, invariant, code, complexity và revealing test; tên pattern không được ghi trong đề nháp ban đầu.
