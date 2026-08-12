# PF13 — DFS components, trees và canonical shapes

Nguồn: [OF023](../official-lessons/OF023.md), [OF037](../official-lessons/OF037.md), [OF042](../official-lessons/OF042.md).

## 1. Tín hiệu nhận dạng

Đề hỏi có bao nhiêu vùng/mạng, kích thước component, kết quả khi bỏ một cạnh của cây, hoặc cần lấy toàn bộ hình liên thông để so khớp. Mục tiêu là **khám phá trọn component**, không phải tìm đường ngắn nhất.

DFS/BFS đều có thể flood-fill component; chọn DFS iterative nếu lo call-stack JavaScript, BFS nếu cần layer/distance kèm theo.

## 2. Không dùng khi

- Cần shortest path trong graph không trọng số: PF14 BFS với distance.
- Cần nối mọi node với tổng cost nhỏ nhất: PF15 MST.
- Phải dùng từng edge đúng một lần: PF16 Euler trail.
- Graph thay đổi và hỏi connectivity online nhiều lần: DSU có thể phù hợp hơn.
- Shape được phép scale/reflection mà canonicalization hiện tại chỉ xử lý translation/rotation.

## 3. Decision tree

```text
Đếm component toàn graph?          → outer loop + flood fill mỗi node chưa thăm
Cây bỏ một edge?                   → skip edge + count một component; phần kia n-size
Cần lấy cell của từng vùng?         → flood fill trả coordinate list
So shape bất kể vị trí?             → translate về origin + sort + serialize
Cho phép rotation?                  → generate/canonicalize 4 rotations
Cho phép reflection?                → thêm mirrored transforms
```

## 4. Knobs tạo biến thể

- Graph adjacency matrix, adjacency list hay implicit grid.
- 4-neighbor hay 8-neighbor connectivity.
- Mark visited lúc push hay pop; push-time tránh duplicate frontier.
- Tree hay general graph; bỏ một edge trên general graph không nhất thiết tách đôi.
- Shape equivalence: translation, rotation, reflection, scale.
- Cần count, size, members, perimeter hay canonical signature.

## 5. Invariant cốt lõi

Flood fill: frontier chứa node đã phát hiện nhưng chưa xử lý; visited chứa mọi node đã phát hiện. Khi kết thúc traversal từ source, visited mới thêm đúng toàn bộ node reachable từ source.

Outer loop: trước index hiện tại, mọi component có node đại diện trong prefix đã được đếm đúng một lần. Chỉ bắt đầu traversal khi node chưa visited nên không đếm trùng.

Tree edge cut: cây có `n-1` edge và duy nhất một path giữa hai node; bỏ một edge luôn tạo đúng hai component. Nếu DFS một phía có size `s`, chênh lệch là `|s-(n-s)|`.

Shape normalization: sau khi trừ minimum row/column và sort coordinate, signature không phụ thuộc vị trí tuyệt đối.

## 6. Code core đáng thuộc

```js
function componentFrom(start, neighbors, visited) {
  const stack = [start];
  visited.add(start);
  const members = [];
  while (stack.length > 0) {
    const node = stack.pop();
    members.push(node);
    for (const next of neighbors(node)) {
      if (visited.has(next)) continue;
      visited.add(next);
      stack.push(next);
    }
  }
  return members;
}
```

```js
function normalizeShape(cells) {
  const minimumRow = Math.min(...cells.map(([row]) => row));
  const minimumColumn = Math.min(...cells.map(([, column]) => column));
  return cells
    .map(([row, column]) => [row - minimumRow, column - minimumColumn])
    .sort(([r1, c1], [r2, c2]) => r1 - r2 || c1 - c2)
    .map(([row, column]) => `${row}:${column}`)
    .join("|");
}
```

## 7. Counterexamples bóc lỗi

- Chỉ DFS từ node 0 sẽ bỏ isolated/component khác.
- Mark lúc pop khiến cùng node có thể được push nhiều lần trên graph dày.
- Dùng 8 hướng khi contract chỉ nối cạnh sẽ ghép chéo hai vùng riêng.
- So raw coordinate của hai shape giống nhau ở vị trí khác sẽ báo khác.
- Rotate quanh origin nhưng không normalize lại tạo coordinate âm/signature khác.
- Áp dụng `n-size` sau cut trên graph có cycle là sai vì graph có thể vẫn connected.

## 8. Drills biến thể

### Drill A — perimeter component

Khi thăm mỗi cell, với bốn hướng: neighbor ngoài grid hoặc khác loại đóng góp một cạnh perimeter; neighbor cùng loại chưa thăm thì đưa vào frontier.

### Drill B — largest island sau đổi một ô

Label mọi component và size. Với mỗi ô nước, cộng size các component neighbor **khác id** rồi thêm 1. Set id tránh đếm cùng đảo nhiều phía.

### Drill C — canonical reflection

Sinh shape gốc và mirror, với mỗi bản sinh bốn rotation, normalize tất cả rồi lấy signature lexicographically nhỏ nhất. Knob equivalence group quyết định số transform.

### Drill D — subtree sizes thay thử từng edge

Root tree một lần, tính subtree size bằng postorder; cạnh parent-child tạo split `subtree[child]` và `n-subtree[child]`. Từ `O(n²)` xuống `O(n)`.

## 9. Câu hỏi mở tư duy

- Reachability relation/neighbor rule chính xác là gì?
- Visited là global giữa component hay reset cho từng phase có mục đích khác?
- Tree property nào đang được dùng trong proof?
- Shape được coi giống nhau dưới những transform nào?
- Cần lưu toàn member hay chỉ aggregate khi traverse?

## 10. Checklist 15 giây

Chốt: **node/state, neighbor generator, thời điểm mark, outer traversal, output của một component, tree assumption và canonical transforms**.
