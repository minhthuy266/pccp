# Lời giải — 13 — Advanced Graph

[← Practice](../chapters/13_advanced_graph/02_Practice_Ladder.md) · [Module chạy được](../../solutions/notebook/ch13_advanced_graph.js)

## Recognition

### P13-R01 — `GR-01`
BFS minimize số edge. Graph `A→B=10,A→C=1,C→B=1`: BFS thấy B qua một edge nhưng cost 10; Dijkstra relax được cost 2. State là best distance, không phải level.
### P13-R02 — `GR-01`
Negative edge phá lập luận “record nhỏ nhất pop ra là final”. Dùng Bellman-Ford, hoặc topological relaxation nếu graph là DAG; negative cycle reachable còn có thể làm shortest không xác định.
### P13-R03 — `GR-02`
MST minimize tổng cost các edge được chọn để connect toàn mạng. Shortest path minimize từng route từ source; shortest-path tree không nhất thiết có tổng cost nhỏ nhất.
### P13-R04 — `GR-02`
Đếm edge nhận. Chỉ có spanning tree khi `n<=1` hoặc nhận đúng `n-1` edge; nếu hết edge sớm phải trả `null`/impossible theo contract.
### P13-R05 — `GR-03`
`reachable[u][v]` là có path directed u→v. Transition OR thêm path qua middle; không cần lưu length/cost.
### P13-R06 — `GR-03`
Graph sparse và V lớn: traversal mỗi source `O(V(V+E))` có thể tốt hơn `O(V³)` và không cần dense matrix. Nếu chỉ vài source/query, chỉ traverse source cần hỏi.
### P13-R07 — `GR-04`
Edge occurrence. Một airport có thể xuất hiện nhiều lần trong route; mỗi ticket là resource riêng bị consume đúng một lần.
### P13-R08 — `GR-04`
Set gộp hai ticket cùng `(from,to)` thành một, làm route thiếu một edge. Adjacency phải giữ multiplicity hoặc unique edge id.
### P13-R09 — `GR-05`
Không. Edge đã tồn tại nghĩa planar graph không đổi; dù endpoint cũ cũng không tăng `E`, nên không có face mới.
### P13-R10 — `GR-05`
Hai diagonal có thể cắt tại tọa độ nửa nguyên. Scale ×2 và đi hai unit substeps biến midpoint thành vertex, để edge-new/vertex-old bắt được room.

## Fill

### P13-F01 — `GR-01`
Sau pop: `if (cost !== distance[node]) continue`. Relax chỉ khi `cost+weight < distance[next]`; update trước rồi push record mới.
### P13-F02 — `GR-02`
`find` gán `parent[x]=find(parent[x])`; `union` trả false khi cùng root. Mỗi true tăng `used`; return cost khi `used===n-1`, nếu hết loop thì disconnected.
### P13-F03 — `GR-03/04`
Closure: `middle → from → to`. Hierholzer: consume hết outgoing edge trước, append node khi dead end, cuối cùng reverse.

## Logic

### P13-L01 — `GR-01/02`
Edges `0-1=2, 0-2=2, 1-2=1`. Shortest từ 0 dùng hai edge cost 2+2 tổng tree 4; MST chọn `1-2=1` và một edge từ 0 cost 2, tổng 3, nhưng route 0 tới endpoint còn lại có cost 3 thay vì shortest 2.
### P13-L02 — `GR-03/04`
Closure: sau middle k, mọi path có internal vertices trong `0..k`; path mới hoặc không qua k, hoặc tách thành from→k và k→to. Euler: mỗi adjacency pop consume một occurrence; postorder chỉ chốt node khi suffix không còn edge, reverse nối các suffix thành trail.
### P13-L03 — `GR-05`
Square: edge cuối mới tới origin cũ, +1 room. Retrace: canonical edge đã có, +0. Crossing: half-step tạo midpoint vertex; edge mới tới midpoint cũ thỏa +1 tại đúng thời điểm.

## Pseudocode

### P13-P01 — `GR-01`
Build adjacency đúng direction; reject negative; distance source 0; heap min; pop stale skip; relax strict; cuối giữ Infinity cho unreachable hoặc project theo contract.
### P13-P02 — `GR-02/03`
Kruskal sort edges, union safe edges, count n−1. Closure seed directed edges rồi middle/from/to OR composition.
### P13-P03 — `GR-04/05`
Euler giữ mọi edge occurrence, sort reverse nếu lexical, consume rồi postorder. Planar scale command thành hai substeps, canonicalize undirected edge, tăng room chỉ edge-new/vertex-old.

## Code

### P13-C01 — `GR-01`
Xem `dijkstra` trong module. Negative edge bị reject trước search; parallel edge cùng tồn tại; stale record bị bỏ; unreachable giữ `Infinity`.
### P13-C02 — `GR-02/03`
Xem `DisjointSet`, `kruskalMST`, `transitiveClosure`. Revealing tests là triangle cycle, graph thiếu bridge và directed chain dài hai.
### P13-C03 — `GR-04/05`
Xem `eulerTrailDirected`, `countPlanarRooms`. Route phải dài `E+1` và mỗi cặp liên tiếp phải consume đúng một occurrence trong multiset cạnh; parallel edges không bị gộp. Planar edge key vô hướng để retrace không tăng room.

## Variants

### P13-V01 — `GR-01/02`
Dijkstra coupon: `distance[node][used]`, mỗi edge có transition trả full và nếu `used=0` thêm transition discount. Pre-connected MST: union các cặp có sẵn trước, rồi Kruskal; số component/edge cần thêm thay đổi tương ứng.
### P13-V02 — `GR-03/04/05`
Floyd distance dùng `dist[i][j]=min(dist[i][j],dist[i][k]+dist[k][j])` với diagonal 0. Euler iterative dùng stack và append khi top hết edge. Nhiều planar component dùng Euler formula `V-E+F=1+C` hoặc DSU để biết edge nối cùng component.

## Mini-test

### P13-M01 — Mixed
Mapping: weighted shortest=`GR-01`; minimum network=`GR-02`; all-pairs relation=`GR-03`; edge-once itinerary=`GR-04`; geometric rooms=`GR-05`. Chấm 10: recognition 2, state 2, transition 2, proof 2, test 1, complexity 1.
