# PF24 — Parent-chain propagation

Nguồn: [SR006](../official-lessons/SR006.md).

## 1. Tín hiệu nhận dạng

Mỗi node có đúng một parent và mỗi event tác động dọc đường từ node lên ancestor/root: chia hoa hồng, cập nhật tổ tiên, tìm ancestor đầu thỏa điều kiện. Không cần traverse toàn subtree; follow parent pointers đúng hướng event.

## 2. Không dùng khi

- Event tác động xuống mọi descendant: cần children adjacency + DFS/order flattening.
- Node có nhiều parent: đây là DAG, propagation có branching và duplicate paths.
- Có rất nhiều path update/query trên tree lớn: naive `O(height)` có thể cần heavy-light decomposition/binary lifting.
- Parent thay đổi động; preprocessing cũ có thể stale.

## 3. Decision tree

```text
Một event đi node→root, height nhỏ?      → while parent chain
Chỉ cần kth ancestor/LCA nhiều query?    → binary lifting
Path add/query nhiều trên static tree?    → HLD / Euler tour + tree structure
Tác động toàn subtree?                    → DFS order interval
Tiền/value giảm tới zero nhanh?           → early stop propagation
```

## 4. Knobs tạo biến thể

- Parent label/index và root sentinel.
- Propagate toàn value, percentage, remainder hay aggregate khác.
- Rounding ở mỗi tầng hay cuối cùng.
- Stop tại root, zero, threshold hoặc ancestor đặc biệt.
- Cộng dồn nhiều event.
- Output theo enroll/input order hay traversal order.
- Tree height bound và recursion risk.

## 5. Invariant và proof

Trước iteration, `value` là chính xác khoản/state node `current` vừa nhận từ child/event. Transition tách phần node giữ và phần duy nhất truyền cho parent; sau đó mọi node đã đi qua có aggregate đúng, phần chưa xử lý chỉ nằm trong `value` hiện tại.

Vì mỗi node có đúng một parent, đường lên root là duy nhất: không bỏ nhánh và không đếm đôi. Nếu propagated value bằng 0 và transition của 0 luôn ra 0, early stop là an toàn.

## 6. Code core đáng thuộc

```js
function propagate(start, initialValue, parentOf, applyAtNode) {
  let current = start;
  let value = initialValue;
  while (current !== null && value !== 0) {
    const { kept, upward } = applyAtNode(current, value);
    // Caller cộng `kept` vào aggregate của current trong applyAtNode.
    value = upward;
    current = parentOf(current);
  }
}
```

```js
function splitCommission(value) {
  const upward = Math.floor(value * 0.1);
  return { kept: value - upward, upward };
}
```

Trong implementation thực, tránh callback nếu làm code khó đọc; điều cần giữ là transition `receive→keep+upward→parent`.

## 7. Counterexamples bóc lỗi

- Tính 10% từ sale gốc ở mọi tầng thay vì khoản vừa nhận.
- Dùng floating `value*0.9` thay integer `value-floor(value/10)`.
- `Math.round` thay `Math.floor` làm 45 truyền 5 thay vì 4.
- Reset aggregate giữa hai sale thay vì cộng dồn.
- Output theo Map iteration/seller order thay vì enroll order.
- Duyệt children từ root cho mỗi sale làm việc ở node không liên quan.

## 8. Drills biến thể

### Drill A — first marked ancestor

Đi parent tới khi gặp marked node; không cần aggregate. Nếu query nhiều và marked static, có thể preprocess nearest marked ancestor; nếu dynamic, bài khó hơn.

### Drill B — kth ancestor

Naive đi `k` bước. Khi `n,q` lớn, build `up[node][power]`; nâng theo bit của k trong `O(log n)`. Knob query volume đổi pattern implementation.

### Drill C — subtree bonus

Bonus cho node và mọi descendant không phải parent-chain. Euler tour biến subtree thành interval `[tin,tout]`, rồi range update/point query bằng PF23/Fenwick.

### Drill D — nhiều parent DAG

Nếu value chia cho mọi parent, một ancestor có thể nhận qua nhiều path. Cần topo/DP và semantics merge; while một parent không còn đủ.

## 9. Câu hỏi mở tư duy

- Event lan lên ancestor hay xuống descendant?
- Mỗi node có đúng một parent không?
- Value truyền tiếp được tính từ khoản nào và rounding lúc nào?
- Điều kiện early stop có closure không?
- Height × events có đủ bound hay cần preprocessing?

## 10. Checklist 15 giây

Chốt: **parent representation, root sentinel, event initial value, per-node split/update, rounding, stop condition, complexity theo height và output order**.
