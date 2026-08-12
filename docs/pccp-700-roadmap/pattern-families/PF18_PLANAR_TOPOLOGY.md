# PF18 — Planar traversal và topology

Nguồn: [OF047](../official-lessons/OF047.md).

## 1. Tín hiệu nhận dạng

Một đường đi vẽ các segment trên mặt phẳng và đề hỏi số vùng/phòng/chu trình hình học tạo ra. State không chỉ là vertex đã thăm; **edge đã vẽ** cũng quyết định việc quay lại vertex có tạo vùng mới hay chỉ đi lại cạnh cũ.

## 2. Không dùng khi

- Graph đã cho abstract, không có crossing hình học giữa cạnh: graph cycle/DSU có thể đủ.
- Chỉ cần vị trí cuối hoặc số node visited.
- Segment tùy ý với giao điểm tổng quát lớn: cần geometry sweep/intersection, scale bước đơn giản không đủ.
- Đường có bridge/overlap phức tạp ngoài lattice move contract.

## 3. Decision tree

```text
Walk trên lattice, cạnh có thể cắt chéo ở nửa bước? → scale coordinate ×2
Mỗi move tạo edge unit sau scale?                    → track visited vertices + undirected edges
Tới vertex cũ qua edge mới?                          → thêm một room
Đi lại edge cũ?                                      → không thêm room
Segment arbitrary?                                   → explicit intersection processing
```

## 4. Knobs tạo biến thể

- Directed command nhưng geometric edge thường undirected.
- Diagonal crossing tại midpoint.
- Edge overlap/retrace.
- Step length lớn hơn 1: phải chia thành unit segments qua mọi intersection candidate.
- Coordinate âm: key serialization phải không collision.
- Count bounded faces hay mọi cycle abstract.

## 5. Invariant và topology proof

Sau mỗi unit step, `visitedVertices` chứa mọi điểm của planar graph đã vẽ và `visitedEdges` chứa mọi cạnh vô hướng đã vẽ. Khi thêm một edge mới:

- Nếu endpoint mới: graph tăng một vertex và một edge, không tạo face.
- Nếu endpoint cũ: edge nối hai vertex đã trong cùng connected drawing, tạo đúng một cycle/face mới.
- Nếu edge đã tồn tại: graph không đổi.

Scale ×2 biến giao điểm giữa hai diagonal ở tọa độ nửa nguyên thành vertex nguyên được thăm, tránh bỏ phòng tạo bởi crossing.

## 6. Code core đáng thuộc

```js
function vertexKey(row, column) {
  return `${row},${column}`;
}

function edgeKey(fromRow, fromColumn, toRow, toColumn) {
  const first = vertexKey(fromRow, fromColumn);
  const second = vertexKey(toRow, toColumn);
  return first < second ? `${first}|${second}` : `${second}|${first}`;
}
```

```js
function applyUnitEdge(state, nextRow, nextColumn) {
  const nextVertex = vertexKey(nextRow, nextColumn);
  const edge = edgeKey(state.row, state.column, nextRow, nextColumn);
  if (!state.edges.has(edge)) {
    if (state.vertices.has(nextVertex)) state.rooms++;
    state.edges.add(edge);
  }
  state.vertices.add(nextVertex);
  state.row = nextRow;
  state.column = nextColumn;
}
```

## 7. Counterexamples bóc lỗi

- Chỉ track vertex: đi lại cạnh tới vertex cũ sẽ đếm phòng giả.
- Chỉ track edge: edge mới tới endpoint cũ cần biết vertex đã tồn tại để tăng room.
- Không scale: hai diagonal cắt nhau giữa ô nhưng không share endpoint, bỏ mất room.
- Edge key có hướng coi `A→B` và `B→A` khác nhau, đếm retrace là edge mới.
- Serialize bằng `row+column` gây collision như `(1,23)` và `(12,3)`.
- Scale coordinate nhưng chỉ đi một bước thay vì hai unit substeps vẫn bỏ midpoint.

## 8. Drills biến thể

### Drill A — trả thời điểm tạo room

Mỗi khi điều kiện endpoint old + edge new đúng, push command index. Nếu một command sau scale gồm hai subedge, xác định output muốn command index hay substep index.

### Drill B — đếm component và faces

Với nhiều nét bắt đầu rời nhau, công thức Euler tổng quát cho planar graph là `V-E+F=1+C`. Incremental “old endpoint” cần xét component merge; DSU vertices giúp biết edge nối cùng component hay hai component.

### Drill C — segment dài

Chia segment thành các bước nguyên nhỏ nhất theo `gcd(|dx|,|dy|)`. Nhưng crossing không-lattice vẫn cần intersection insertion; scale 2 chỉ đủ cho direction contract hữu hạn của bài gốc.

### Drill D — abstract cycle detection

Nếu bỏ geometry và chỉ stream undirected edges, DSU báo cycle khi endpoints đã connected. So với planar rooms: crossing không được biểu diễn thành vertex thì abstract DSU không đếm đúng face.

## 9. Câu hỏi mở tư duy

- Geometry tạo giao điểm ở đâu ngoài endpoint input?
- Edge có directed hay undirected về mặt topology?
- Một move phải chia thành bao nhiêu atomic segment?
- Event tạo vùng là “vertex cũ” hay “cùng component” trong biến thể?
- Contract hỏi cycle graph hay bounded face mặt phẳng?

## 10. Checklist 15 giây

Chốt: **coordinate scaling, atomic substep, collision-safe vertex key, canonical undirected edge key, edge-new/vertex-old condition và phạm vi geometry mà proof bao phủ**.
