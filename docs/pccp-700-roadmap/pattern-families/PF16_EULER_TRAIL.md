# PF16 — Euler trail dùng mọi cạnh

Nguồn: [OF041](../official-lessons/OF041.md).

## 1. Tín hiệu nhận dạng

Phải dùng **mọi edge/ticket đúng một lần** và trả thứ tự vertex/airport. Đây là Euler trail, khác Hamilton path dùng mọi vertex một lần và khác shortest path chỉ chọn một số cạnh.

Nếu còn yêu cầu route nhỏ nhất theo từ điển, phải quản lý thứ tự cạnh nhưng vẫn giữ completeness của Euler traversal.

## 2. Không dùng khi

- Phải thăm mỗi vertex đúng một lần: Hamilton/backtracking/DP tùy bound.
- Edge có thể bỏ và cần shortest cost: shortest path.
- Chỉ cần connectivity/component: DFS thường.
- Graph không thỏa điều kiện Euler và đề không guarantee solution; phải kiểm degree/connectivity.

## 3. Decision tree

```text
Dùng mọi edge đúng một lần?        → Euler trail/circuit
Graph directed?                    → in/out degree conditions
Graph undirected?                  → odd-degree conditions
Cần lexical smallest trail?        → ordered adjacency + Hierholzer
Edge count rất nhỏ, cần constraints lạ? → backtracking có thể đủ nhưng phải bound
```

## 4. Knobs tạo biến thể

- Directed/undirected.
- Trail có start/end khác nhau hay circuit.
- Start được cho hay phải suy từ degree.
- Parallel duplicate edges: phải giữ multiplicity, không dùng Set.
- Lexical/minimum edge order.
- Input có guarantee tồn tại route hay cần validate.

## 5. Invariant và proof

Hierholzer đi tiếp trong khi node hiện tại còn unused edge. Chỉ append node vào route khi không còn edge đi ra; lúc đó đoạn đã hoàn tất được chốt theo hậu tự. Vì append ngược thời gian, cuối cùng reverse route.

Mỗi edge bị pop khỏi adjacency đúng một lần. Một lựa chọn local có thể đi vào dead end sớm, nhưng postorder splice các cycle/path con đúng chỗ; đây là lý do greedy output trực tiếp theo thứ tự đi có thể sai còn Hierholzer đúng.

Route hợp lệ phải có `edges.length + 1` vertex.

## 6. Code core đáng thuộc

```js
function lexicalEulerTrail(edges, start) {
  const adjacency = new Map();
  for (const [from, to] of edges) {
    if (!adjacency.has(from)) adjacency.set(from, []);
    adjacency.get(from).push(to);
  }
  for (const destinations of adjacency.values()) {
    destinations.sort((a, b) => b.localeCompare(a));
  }

  const stack = [start];
  const reversedRoute = [];
  while (stack.length > 0) {
    const airport = stack.at(-1);
    const destinations = adjacency.get(airport);
    if (destinations?.length) stack.push(destinations.pop());
    else reversedRoute.push(stack.pop());
  }
  return reversedRoute.reverse();
}
```

Sort descending rồi `pop()` để lấy lexical nhỏ nhất với chi phí lấy cuối `O(1)`.

## 7. Counterexamples bóc lỗi

- Greedy “luôn chọn destination nhỏ nhất và ghi thẳng output” có thể mắc dead end trước khi dùng hết ticket.
- Dùng Set adjacency làm mất hai ticket trùng nhau.
- Quên reverse postorder trả route ngược.
- Route length nhỏ hơn `E+1` signal graph không reachable/không có Euler trail từ start.
- Sort ascending rồi `pop()` vô tình lấy destination lớn nhất.
- Nhầm Euler với DFS visited vertex: vertex được phép xuất hiện nhiều lần.

## 8. Drills biến thể

### Drill A — undirected Euler circuit

Mỗi edge có unique id và xuất hiện trong adjacency của hai endpoint. `usedEdge[id]` ngăn dùng hai lần; điều kiện mọi degree chẵn nếu circuit.

### Drill B — suy start directed

Nếu có trail mở, start có `out-in=1`, end có `in-out=1`, node khác cân bằng. Nếu circuit, chọn node có outgoing edge theo contract/tie-break.

### Drill C — validate existence

Ngoài degree, mọi vertex có degree khác 0 phải thuộc cùng component thích hợp khi bỏ hướng. Sau chạy, kiểm route length `E+1` là guard thực dụng.

### Drill D — streaming edge addition

Hierholzer giả định biết adjacency và dùng edge một lần sau khi build. Nếu edge đến online và phải output ngay, không thể cam kết lexical Euler trail mà không biết future; contract đã đổi bản chất.

## 9. Câu hỏi mở tư duy

- Đề nói dùng mọi edge hay mọi vertex?
- Edge duplicate được định danh thế nào?
- Degree condition directed/undirected là gì?
- Vì sao route append lúc backtrack thay vì lúc đi tới?
- Lexical order được thực thi mà không phá multiplicity ra sao?

## 10. Checklist 15 giây

Ghi: **edge-once contract, graph direction, start/degree, adjacency multiplicity/order, postorder append, reverse và `E+1` validation**.
