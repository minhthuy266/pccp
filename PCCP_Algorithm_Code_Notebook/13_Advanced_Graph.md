# 13 — Advanced Graph

> Năm bài toán đều dùng graph nhưng mục tiêu, state và invariant khác hẳn nhau. Đọc contract trước khi chọn thuật toán.

1. [Canonical `GR-01..05`](chapters/13_advanced_graph/01_Advanced_Graph_Canonical.md)
2. [Practice Ladder](chapters/13_advanced_graph/02_Practice_Ladder.md)
3. Sau khi tự làm mới mở [Solutions](solutions/13_Advanced_Graph_Solutions.md)
4. Chạy `node --test tests/notebook_ch13.test.js` để kiểm tra code mẫu.

## Contrast phải thuộc

| Contract | Pattern |
| --- | --- |
| Ít cạnh nhất, mọi cạnh cùng cost | BFS |
| Tổng cost từ một source nhỏ nhất, weight không âm | Dijkstra |
| Chọn cạnh nối toàn bộ node với tổng cost nhỏ nhất | Kruskal + DSU |
| Hỏi mọi cặp có đi tới nhau không | Transitive closure |
| Dùng mỗi edge occurrence đúng một lần | Euler trail |
| Đếm vùng do nét vẽ tạo trên mặt phẳng | Planar topology |

## Checklist tạm thành thạo

- [ ] Nói được objective trước khi gọi tên thuật toán.
- [ ] Dijkstra có stale-record check và không dùng với negative edge.
- [ ] Kruskal chỉ nhận cạnh nối hai component khác nhau và phát hiện disconnected.
- [ ] Closure dùng thứ tự `middle → from → to`.
- [ ] Euler quản lý edge occurrence, không dùng boolean visited theo node.
- [ ] Planar walk theo dõi cả vertex lẫn undirected edge và xử lý crossing.
- [ ] Tự tạo được một counterexample phân biệt mỗi cặp pattern gần nhau.
