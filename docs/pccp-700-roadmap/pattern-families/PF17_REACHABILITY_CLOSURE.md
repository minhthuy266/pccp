# PF17 — Reachability và transitive closure

Nguồn: [OF046](../official-lessons/OF046.md).

## 1. Tín hiệu nhận dạng

Đề cho quan hệ trực tiếp `a→b` nhưng hỏi quan hệ suy ra qua nhiều bước: ai thắng ai gián tiếp, node nào reachable, thứ hạng nào xác định vì so sánh được với mọi node khác. Nếu cần trả lời reachability cho nhiều cặp, phải tính closure hoặc chạy traversal từ nhiều source.

## 2. Không dùng khi

- Chỉ một source và graph lớn thưa: một DFS/BFS đủ.
- Cần shortest distance, không chỉ reachable: BFS/Dijkstra/Floyd distance.
- Graph động có nhiều update/query: closure tính lại có thể quá đắt.
- Quan hệ không bắc cầu theo contract; không được tự suy `a→c` từ `a→b→c`.

## 3. Decision tree

```text
Một/few source query?             → DFS/BFS từ từng source cần hỏi
All-pairs, n nhỏ/dense?           → Floyd-Warshall boolean closure
All-pairs, graph sparse?          → traversal từ mỗi source
DAG cần descendant count?         → topo + bitset/set propagation
Dynamic add-edge?                 → incremental strategy tùy bound
```

## 4. Knobs tạo biến thể

- Directed/undirected.
- Reachability có tính self hay không.
- Chỉ boolean, count, hay list.
- `n` nhỏ/dense so với lớn/sparse.
- Cycle có tồn tại; rank trong cycle thường không phân biệt được dù reachable hai chiều.
- Query offline/online.
- Cần path witness, không chỉ boolean.

## 5. Invariant và proof

Floyd boolean invariant: sau khi xử lý intermediate vertex `0..k`, `reachable[i][j]` đúng khi có path từ `i` tới `j` chỉ dùng intermediate trong tập đó. Transition thêm khả năng đi qua `k`:

```text
reachable[i][j] ||= reachable[i][k] && reachable[k][j]
```

Rank xác định khi với mọi `other`, đúng một hướng quan hệ được biết theo semantics đề: node thắng other hoặc thua other. Nếu cả hai hướng do cycle, cần xét contract có coi là xác định không; bài ranking chuẩn giả định kết quả nhất quán.

## 6. Code core đáng thuộc

```js
function transitiveClosure(vertexCount, edges) {
  const reachable = Array.from(
    { length: vertexCount },
    () => Array(vertexCount).fill(false),
  );
  for (const [from, to] of edges) reachable[from][to] = true;

  for (let middle = 0; middle < vertexCount; middle++) {
    for (let from = 0; from < vertexCount; from++) {
      if (!reachable[from][middle]) continue;
      for (let to = 0; to < vertexCount; to++) {
        if (reachable[middle][to]) reachable[from][to] = true;
      }
    }
  }
  return reachable;
}
```

```js
function comparableWithAll(node, reachable) {
  for (let other = 0; other < reachable.length; other++) {
    if (other === node) continue;
    if (!reachable[node][other] && !reachable[other][node]) return false;
  }
  return true;
}
```

## 7. Counterexamples bóc lỗi

- Chỉ đếm direct wins/losses bỏ `a→b→c`.
- Dùng undirected adjacency cho ranking làm mọi node trong component “comparable” giả.
- Floyd loop order đặt `middle` trong cùng có thể dùng state chưa đúng theo proof.
- Chỉ kiểm `outdegree+indegree=n-1` trên edge trực tiếp.
- Cycle `a↔b` làm cả hai hướng true; nếu contract yêu cầu strict order thì phải reject ambiguity.
- Khởi tạo diagonal true rồi đếm self như một đối thủ.

## 8. Drills biến thể

### Drill A — trả witness path

Lưu `next[i][j]` khi direct edge và cập nhật qua middle; reconstruct path bằng cách đi theo next. Boolean closure một mình không cho biết đường nào chứng minh quan hệ.

### Drill B — DAG bitset closure

Xử lý node theo reverse topological order; descendant bitset của node là union bitset các child cộng child. Phù hợp n lớn hơn khi bit operations khả dụng.

### Drill C — minimum prerequisite queries

Với nhiều query “a có là prerequisite của b?”, build closure một lần. Với rất ít query và graph lớn, traversal có cache theo source có thể rẻ hơn.

### Drill D — strongly connected components

Nếu reachable hai chiều tạo equivalence group, nén SCC thành DAG trước. Đây là cách xử lý cycle có cấu trúc thay vì giả định strict ranking.

## 9. Câu hỏi mở tư duy

- Quan hệ có directed và transitive thật không?
- Cần một source hay all-pairs?
- Cycle mang ý nghĩa gì trong domain?
- Bound chọn matrix `O(n²)` memory được không?
- Output cần boolean, count hay witness?

## 10. Checklist 15 giây

Chốt: **relation direction, transitivity, query volume, graph density, closure invariant, cycle semantics và self handling**.
