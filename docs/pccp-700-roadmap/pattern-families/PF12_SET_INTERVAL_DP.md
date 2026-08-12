# PF12 — Set-DP và interval-DP

Nguồn: [OF031](../official-lessons/OF031.md), [OF034](../official-lessons/OF034.md).

## 1. Tín hiệu nhận dạng

State không thể tóm thành một scalar tốt nhất. Với cùng resource count có nhiều giá trị trung gian cần giữ; hoặc một đoạn biểu thức có cả minimum lẫn maximum vì phép trừ làm giá trị nhỏ trở nên hữu ích cho maximum phía ngoài.

Đây là dấu hiệu phải giữ **tập frontier** hoặc nhiều extrema trên một interval.

## 2. Không dùng khi

- Chỉ best scalar của subproblem là đủ và operator monotone.
- Tập giá trị bùng nổ không có bound/prune.
- Thứ tự phần tử có thể đổi tự do; interval DP giả định đoạn liên tiếp.
- Biểu thức chỉ có phép cộng số dương, min/max kép là dư thừa.

## 3. Decision tree

```text
Cùng số tài nguyên tạo nhiều value hữu ích? → Set-DP theo count
Kết quả đoạn phụ thuộc điểm chia?           → interval DP
Operator không monotone như subtraction?    → giữ min và max
Chỉ cần reachable boolean trong miền nhỏ?   → boolean/bitset DP
Frontier quá lớn?                           → tìm dominance/pruning hoặc state khác
```

## 4. Knobs tạo biến thể

- Resource count exact hay at most.
- Phép toán cho phép và closure của value.
- Division integer: trunc/floor, chia 0.
- Value bound và deduplication.
- Interval operator associative hay không.
- Cần min/max hay toàn Set kết quả.
- Parenthesization giữ operand order hay được permutation.

## 5. Invariant và completeness proof

Set-DP: `dp[k]` chứa đúng mọi giá trị tạo được bằng **chính xác k** tài nguyên. Mỗi biểu thức có root operator chia tài nguyên thành `leftCount + rightCount = k`; combine mọi cặp hai Set nên không thiếu. Set loại duplicate state tương đương.

Interval DP: `min[i][j]` và `max[i][j]` là extrema của mọi cách đặt ngoặc cho đoạn operand `i..j`. Mọi cây biểu thức có một root split `k`; enumerate mọi split. Với `a-b`, maximum có thể là `maxLeft-minRight`, minimum là `minLeft-maxRight`.

## 6. Code core đáng thuộc

```js
function combineSets(leftValues, rightValues, operations) {
  const output = new Set();
  for (const left of leftValues) {
    for (const right of rightValues) {
      for (const operation of operations) {
        const value = operation(left, right);
        if (value !== null && Number.isFinite(value)) output.add(value);
      }
    }
  }
  return output;
}
```

```js
function subtractionExtremes(leftMin, leftMax, rightMin, rightMax) {
  return {
    minimum: leftMin - rightMax,
    maximum: leftMax - rightMin,
  };
}
```

## 7. Counterexamples bóc lỗi

- Chỉ giữ maximum cho `1-(2-100)`: giá trị minimum/max của đoạn phải phối hợp đúng dấu.
- Division JavaScript `/` tạo số thực; nếu contract integer division cần `Math.trunc` và cấm divisor 0.
- Set-DP dùng “tối đa k” rồi combine sẽ đếm sai resource và có thể báo target quá sớm.
- Chỉ combine split `(1,k-1)` bỏ biểu thức có root chia `(2,k-2)`.
- Interval DP cho phép reorder operand sẽ giải bài khác.

## 8. Drills biến thể

### Drill A — reachable sums bằng bitset

Nếu chỉ phép cộng và value range nhỏ, Set có thể thay bằng boolean array/bitset. So complexity theo số state thực và miền maximum.

### Drill B — Pareto frontier

Mỗi state có `(cost,value)`. Loại state bị dominance: cost lớn hơn hoặc bằng và value nhỏ hơn hoặc bằng. Đây là generalization của Set dedupe.

### Drill C — interval nhân số âm

Để lấy extrema của multiplication, phải xét bốn tích `min*min`, `min*max`, `max*min`, `max*max`; không dùng một công thức subtraction.

### Drill D — đếm số parenthesization

Thay extrema bằng Map `value→ways`; tại mỗi split combine count. State lớn hơn nhưng giữ đủ multiplicity thay vì Set.

## 9. Câu hỏi mở tư duy

- Vì sao một best scalar chưa đủ? Cho counterexample cụ thể.
- State là exact-resource hay at-most-resource?
- Mọi nghiệm có root split như thế nào?
- Operator cần tổ hợp extrema nào?
- Frontier có bound/pruning nào tránh bùng nổ?

## 10. Checklist 15 giây

Chốt: **ý nghĩa Set/extrema, exactness, base singleton, mọi split, mọi operand order, invalid operation, dedupe/prune và vị trí đọc answer**.
