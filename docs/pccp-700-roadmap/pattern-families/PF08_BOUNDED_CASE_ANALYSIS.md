# PF08 — Bounded candidate và case analysis

Nguồn: [OF021](../official-lessons/OF021.md), [OF026](../official-lessons/OF026.md).

## 1. Tín hiệu nhận dạng

Không gian tưởng lớn nhưng contract/bound tạo ra một tập candidate hữu hạn nhỏ: ước số tới căn bậc hai, điểm quay đầu chỉ cần xét tại boundary của các đoạn, số trạng thái vật lý ít. Thay vì đoán một greedy duy nhất, enumerate **mọi cấu trúc nghiệm có thể chứng minh là đủ** rồi lấy tốt nhất.

Đây là exhaustive search trên candidate đã nén, khác backtracking trên mọi chuỗi lựa chọn.

## 2. Không dùng khi

- Không chứng minh được candidate set bao phủ optimum.
- Candidate vẫn quá lớn so với bound.
- Quyết định nhiều bước phụ thuộc nhau tạo cây lựa chọn: PF07/DP.
- Predicate monotone trên miền rất lớn: binary search on answer có thể tốt hơn.
- Công thức đóng trực tiếp tồn tại và dễ chứng minh.

## 3. Decision tree

```text
Nghiệm là factor pair của total?       → iterate divisor tới sqrt(total)
Route một chiều có các đoạn vô ích dài? → xét boundary/turning cases
Một tham số integer miền nhỏ?           → loop toàn miền
Miền lớn nhưng feasible monotone?        → PF19 binary search
Nhiều tham số độc lập?                   → nested enumeration, kiểm complexity
```

## 4. Knobs tạo biến thể

- Candidate integer, divisor, boundary index hay orientation.
- Cần nghiệm đầu tiên, mọi nghiệm hay min/max objective.
- Symmetry có cho phép chỉ xét một nửa miền.
- Constraint exact hay inequality.
- Boundary inclusive/exclusive.
- Có nhiều objective tie-break hay không.

## 5. Invariant và completeness proof

Factor enumeration: mọi cặp số nguyên dương `(w,h)` có `w·h=total` chứa ít nhất một số `<=sqrt(total)`. Duyệt mọi divisor tới căn nên không bỏ cặp nào; điều kiện inner/yellow lọc đúng contract.

Route case analysis: phải chứng minh mọi route tối ưu có thể biến đổi thành một trong các form được xét mà không tăng cost. Với OF026, phần dọc độc lập; phần ngang chỉ cần xét đi thẳng hoặc quay đầu quanh boundary của run ký tự đã hoàn thành. Không có proof này, “case analysis” chỉ là đoán.

## 6. Code core đáng thuộc

```js
function factorPairs(total) {
  const pairs = [];
  for (let height = 1; height * height <= total; height++) {
    if (total % height !== 0) continue;
    pairs.push([total / height, height]);
  }
  return pairs;
}
```

```js
function minimizeCandidates(candidates, costOf) {
  let best = Infinity;
  for (const candidate of candidates) {
    if (candidate.valid) best = Math.min(best, costOf(candidate));
  }
  return best;
}
```

Skeleton quan trọng là generate đầy đủ → validate contract → evaluate objective; candidate generation mới là phần phải suy luận theo đề.

## 7. Counterexamples bóc lỗi

- Carpet chỉ kiểm `w*h=total` sẽ nhận cặp sai số ô vàng; phải kiểm `(w-2)(h-2)=yellow`.
- Loop divisor `< sqrt(total)` bỏ nghiệm hình vuông; phải `<=`.
- Route chỉ đi thẳng bỏ trường hợp quay lại để nhảy qua đoạn `A` dài.
- Chỉ xét quay một phía bỏ nghiệm mirror; cần hai công thức đối xứng hoặc loop boundary.
- Candidate hợp lệ nhưng tie-break khác bị bỏ nếu chỉ update bằng `<` mà contract cần earliest/smaller key.

## 8. Drills biến thể

### Drill A — hộp ba chiều

Từ volume, enumerate `a` tới căn bậc ba rồi `b` tới căn phần còn lại; `c` suy ra. Complexity và symmetry khác factor pair, nhưng tư duy “n-1 biến enumerate, biến cuối derive” giữ nguyên.

### Drill B — closest factor pair

Trong các factor pair, minimize `w-h`. Vì cặp gần căn nhất tốt nhất, có thể scan tới sqrt và giữ divisor cuối. So proof/formula với bản enumerate đầy đủ.

### Drill C — turning point từ mọi index sang boundary

Viết brute force n nhỏ enumerate mọi route; so với optimized chỉ xét boundary của empty run. Random differential test giúp kiểm chứng candidate compression trước khi tin proof.

### Drill D — chuyển sang binary answer

Nếu candidate là khoảng cách từ 1 đến `10^18` và “đạt được khoảng cách d” monotone, enumerate không còn hợp lệ về thời gian; dùng PF19.

## 9. Câu hỏi mở tư duy

- Candidate set được suy ra từ constraint nào?
- Proof nào đảm bảo optimum nằm trong set?
- Có symmetry để bỏ duplicate không?
- Validate exact contract ở đâu trước khi evaluate cost?
- Bound sau khi nén là bao nhiêu, không chỉ bound input?

## 10. Checklist 15 giây

Trước code phải nói được: **candidate là gì, cách sinh không thiếu, symmetry, validity predicate, objective/tie-break, và số candidate tối đa**.
