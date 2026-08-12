# PF23 — Difference array và prefix reconstruction

Nguồn: [OF060](../official-lessons/OF060.md).

## 1. Tín hiệu nhận dạng

Có rất nhiều update cộng cùng một delta lên đoạn/rectangle, nhưng chỉ cần giá trị cuối hoặc query sau khi gom hết update. Thay chạm mọi cell mỗi update, ghi thay đổi tại boundary rồi reconstruct một lần bằng prefix sum.

Difference array là “đạo hàm rời rạc”; prefix sum là phép tích phân khôi phục giá trị.

## 2. Không dùng khi

- Update và query online xen kẽ: Fenwick/segment tree hoặc cấu trúc 2D khác.
- Update không phải phép cộng tuyến tính, ví dụ assign/chmin tùy ý.
- Rectangle sparse trên coordinate cực lớn mà không compress.
- Chỉ vài update nhỏ: direct loop có thể đơn giản hơn và vẫn đủ bound.

## 3. Decision tree

```text
Range add 1D, offline?              → diff endpoints + one prefix
Rectangle add 2D, offline?          → four corners + prefix two axes
Range query static?                 → prefix sum, không phải difference
Update/query online?                → Fenwick/segment tree
Coordinate rất lớn nhưng ít boundary?→ coordinate compression/sweep
```

## 4. Knobs tạo biến thể

- 1D/2D/n-dimensional.
- Inclusive input boundary hay half-open.
- Range add, arithmetic progression add, rectangle toggle XOR.
- Reconstruct order trên axes.
- Padding extra row/column hay boundary checks.
- Sau reconstruction cần full matrix hay chỉ aggregate count.

## 5. Invariant và proof

1D inclusive update `[left,right] += delta` được encode `diff[left]+=delta`, `diff[right+1]-=delta`. Prefix tại index `i` chứa delta iff `left<=i<=right`.

2D inclusive rectangle `(r1,c1)..(r2,c2)` dùng bốn corner trên padded diff:

```text
+delta tại (r1,c1)
-delta tại (r1,c2+1)
-delta tại (r2+1,c1)
+delta tại (r2+1,c2+1)
```

Hai prefix axes lan `+delta` xuống/phải; ba corner còn lại triệt phần vượt ngoài rectangle bằng inclusion-exclusion.

## 6. Code core đáng thuộc

```js
function addRectangle(diff, row1, column1, row2, column2, delta) {
  diff[row1][column1] += delta;
  diff[row1][column2 + 1] -= delta;
  diff[row2 + 1][column1] -= delta;
  diff[row2 + 1][column2 + 1] += delta;
}
```

```js
function reconstruct2D(diff) {
  for (let row = 0; row < diff.length; row++) {
    for (let column = 1; column < diff[row].length; column++) {
      diff[row][column] += diff[row][column - 1];
    }
  }
  for (let column = 0; column < diff[0].length; column++) {
    for (let row = 1; row < diff.length; row++) {
      diff[row][column] += diff[row - 1][column];
    }
  }
  return diff;
}
```

Padded shape phải là `(rows+1)×(columns+1)` để `row2+1/column2+1` luôn hợp lệ.

## 7. Counterexamples bóc lỗi

- Quên corner `(+delta)` dưới-phải làm vùng ngoài bị trừ hai lần.
- Cấp đúng `rows×columns` rồi update rectangle chạm biên gây out-of-range.
- Input inclusive nhưng dùng `row2/column2` như exclusive thu hẹp rectangle.
- Chỉ prefix ngang hoặc chỉ dọc không reconstruct rectangle.
- Cộng trực tiếp damage/heal sign ngược.
- Dùng shallow-filled matrix khiến update một row đổi mọi row.

## 8. Drills biến thể

### Drill A — 1D range add và point result

Viết bản nhỏ trước: two boundary marks, một prefix. Dùng nó để tự suy bốn corner thay vì học thuộc dấu.

### Drill B — rectangle sum query static

Đây là prefix sum 2D của matrix gốc; query bằng inclusion-exclusion bốn prefix corner. So hướng “update offline” với “query static”.

### Drill C — online range add/point query

Fenwick tree lưu 1D diff động: update hai endpoints, point query là prefix. Nếu cần range add/range sum, dùng hai Fenwick.

### Drill D — coordinate compression

Với coordinate tới `10^9` nhưng ít rectangle, collect boundaries và khoảng kế cận, compress; khi tính area phải nhân cell value với độ dài segment thật.

## 9. Câu hỏi mở tư duy

- Operation tuyến tính/cộng dồn được không?
- Update và query offline hay interleaved?
- Boundary inclusive/exclusive được chuyển thế nào?
- Vì sao từng corner mang dấu đó?
- Cần padding và numeric range bao nhiêu?

## 10. Checklist 15 giây

Chốt: **dimension, boundary semantics, delta sign, corner/end markers, padded shape, prefix axes/order và final projection**.
