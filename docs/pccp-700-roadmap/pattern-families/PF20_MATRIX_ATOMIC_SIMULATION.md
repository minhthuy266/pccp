# PF20 — Matrix và atomic simulation

Nguồn: [OF049](../official-lessons/OF049.md), [SR001](../official-lessons/SR001.md).

## 1. Tín hiệu nhận dạng

Đề chủ yếu yêu cầu dịch contract thành index/state transition: duyệt matrix giữ đúng shape, tìm vị trí, thực hiện command nhiều bước nhưng chỉ commit nếu toàn command hợp lệ. Không phải bài nào cũng cần thuật toán cao cấp; độ khó nằm ở representation và mutation boundary.

## 2. Không dùng khi

- Có hàng loạt rectangle update/query: prefix/difference array.
- Cần shortest route: BFS.
- Transition tương tác đồng thời giữa nhiều entity; có thể cần next-state buffer.
- Matrix thưa rất lớn: dense 2D array không phù hợp.

## 3. Decision tree

```text
Mỗi cell output độc lập?             → nested loop/map giữ shape
Command gồm nhiều atomic steps?       → validate path trước, commit sau
Move từng bước và partial move cho phép? → commit mỗi atomic step
Mọi entity update đồng thời?          → read old state, write next state
Nhiều range update offline?           → PF23 difference array
```

## 4. Knobs tạo biến thể

- Row/column order và coordinate input `(x,y)`.
- Mutation input được phép hay phải pure.
- Command atomic toàn đoạn hay từng step.
- Boundary/obstacle policy.
- Sequential update hay simultaneous update.
- Rectangular matrix, jagged array, empty dimensions.
- Output same shape hay aggregate scalar.

## 5. Invariant và transaction proof

Shape traversal: trước cell `(r,c)`, mọi cell trước nó theo row-major đã được ghi đúng và output có đúng số row/column tương ứng.

Validate-then-commit: trong khi thử command, `(trialRow,trialColumn)` là vị trí giả định sau các bước đã validate; vị trí thật chưa đổi. Nếu mọi step hợp lệ, gán position thật bằng trial. Nếu một step fail, bỏ trial nên command rollback toàn bộ.

Simultaneous update: mọi transition phải đọc cùng snapshot cũ; ghi trực tiếp vào matrix đang đọc sẽ làm entity sau nhìn “tương lai”.

## 6. Code core đáng thuộc

```js
function zipMatrices(first, second, combine) {
  return first.map((row, rowIndex) =>
    row.map((value, columnIndex) =>
      combine(value, second[rowIndex][columnIndex]),
    ),
  );
}
```

```js
function tryMove(position, direction, steps, isValid) {
  let [trialRow, trialColumn] = position;
  for (let step = 0; step < steps; step++) {
    trialRow += direction[0];
    trialColumn += direction[1];
    if (!isValid(trialRow, trialColumn)) return position;
  }
  return [trialRow, trialColumn];
}
```

## 7. Counterexamples bóc lỗi

- Dùng `matrix.length` cho cả column count sai ở matrix không vuông.
- Đọc input `(x,y)` thành `[row,column]` mà không đổi.
- Commit từng step rồi gặp obstacle khiến command bị thực hiện một phần trái contract.
- Copy matrix bằng `[...matrix]` chỉ shallow-copy rows; mutate row vẫn đổi input.
- Dùng `Array(rows).fill(Array(columns).fill(0))` làm mọi row cùng reference.
- Simultaneous cellular update ghi in-place làm kết quả phụ thuộc traversal order.

## 8. Drills biến thể

### Drill A — rotate rectangular matrix

Output 90° có shape `columns × rows`; mapping `(r,c)→(c,rows-1-r)`. Test `1×N`, `N×1`, không chỉ square.

### Drill B — partial movement

Đổi contract: robot đi được tới trước obstacle thay vì rollback. Khi đó commit từng atomic step hoặc trả trial cuối hợp lệ; cùng parser nhưng transaction boundary đổi.

### Drill C — simultaneous spread

Tính `next` từ `current`, rồi swap reference sau mỗi tick. Nếu chỉ một số cell đổi, event list có thể tối ưu nhưng vẫn phải giữ snapshot semantics.

### Drill D — sparse board

Kích thước tọa độ rất lớn nhưng chỉ ít obstacle/entity: dùng Set/Map key coordinate thay dense matrix. Neighbor/bound vẫn dựa contract.

## 9. Câu hỏi mở tư duy

- Row/column và input coordinate được định nghĩa ra sao?
- Operation atomic ở cấp command hay step?
- Có được mutate input không?
- Update sequential hay simultaneous?
- Shape output và edge dimensions là gì?

## 10. Checklist 15 giây

Chốt: **representation, row/column bounds, coordinate conversion, mutation policy, transaction boundary, snapshot semantics và tests 1×N/N×1**.
