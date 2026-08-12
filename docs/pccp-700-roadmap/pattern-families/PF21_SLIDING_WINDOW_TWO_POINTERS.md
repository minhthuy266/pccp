# PF21 — Sliding window và two pointers

Nguồn: [OF052](../official-lessons/OF052.md), [OF053](../official-lessons/OF053.md), [OF058](../official-lessons/OF058.md).

## 1. Tín hiệu nhận dạng

Đề hỏi một đoạn liên tiếp và khi dịch biên chỉ có một phần tử vào/ra. Cần đếm mọi window độ dài cố định, tìm đoạn ngắn nhất cover requirement, hoặc tổng dãy số dương đạt target. Thay vì tính lại đoạn từ đầu, giữ state của cửa sổ `[left,right]`.

Two pointers tuyến tính chỉ đúng khi có tính đơn điệu khiến mỗi pointer không cần lùi.

## 2. Không dùng khi

- Subarray có số âm và dựa vào tổng: tăng right không còn chỉ làm tổng tăng, shrink không còn an toàn.
- Query arbitrary ranges nhiều lần: prefix sum/tree có thể phù hợp.
- Window không liên tiếp: bài subset/DP khác.
- Predicate không duy trì được khi add/remove một item.
- Cần mọi cặp trên array sorted theo quan hệ hai đầu: vẫn là two pointers nhưng không phải sliding window frequency.

## 3. Decision tree

```text
Độ dài window cố định k?             → add incoming, remove outgoing
Tìm minimum window thỏa cover?       → expand right; while valid shrink left
Số dương, sum so với target?         → sum monotone two pointers
Array có số âm, exact sum?           → prefix sum + frequency/earliest index
Sorted pair condition?               → left/right extreme pointers
```

## 4. Knobs tạo biến thể

- Fixed/variable length.
- Predicate `sum`, distinct count, frequency requirement, max/min.
- Tìm shortest, longest, count windows hay earliest tie.
- Item dương/nonnegative/có âm.
- Requirement là có ít nhất count hay đúng count.
- Trả index 0-based/1-based và inclusive/exclusive.
- Empty window có hợp lệ không.

## 5. Invariant và proof

Fixed window: trước khi evaluate start `left`, frequency/sum mô tả đúng `values[left..left+k-1]`. Transition remove outgoing và add incoming bảo toàn state trong `O(1)` hoặc `O(log n)`.

Minimum cover: sau khi add `right`, trong lúc window valid ta ghi candidate rồi remove `left`. Khi loop dừng, window invalid và không thể shrink thêm cho right hiện tại; mỗi left/right tăng tối đa `n` lần.

Positive sum: nếu sum nhỏ target, chỉ tăng right mới có thể tăng sum; nếu lớn, chỉ tăng left mới có thể giảm. Số âm phá monotonic proof này.

## 6. Code core đáng thuộc

```js
function minimumCover(values) {
  const requiredKinds = new Set(values).size;
  const frequency = new Map();
  let coveredKinds = 0;
  let left = 0;
  let best = [0, values.length - 1];

  for (let right = 0; right < values.length; right++) {
    const value = values[right];
    const next = (frequency.get(value) ?? 0) + 1;
    frequency.set(value, next);
    if (next === 1) coveredKinds++;

    while (coveredKinds === requiredKinds) {
      if (right - left < best[1] - best[0]) best = [left, right];
      const outgoing = values[left++];
      const count = frequency.get(outgoing) - 1;
      frequency.set(outgoing, count);
      if (count === 0) coveredKinds--;
    }
  }
  return best;
}
```

```js
function fixedWindowSums(values, width) {
  if (width > values.length) return [];
  let sum = values.slice(0, width).reduce((total, value) => total + value, 0);
  const output = [sum];
  for (let right = width; right < values.length; right++) {
    sum += values[right] - values[right - width];
    output.push(sum);
  }
  return output;
}
```

## 7. Counterexamples bóc lỗi

- Exact sum với số âm: `[3,-2,3]`, target 4 làm rule sum>target→shrink bỏ nghiệm toàn đoạn.
- Frequency count về 0 nhưng `coveredKinds` không giảm khiến window invalid bị coi valid.
- Fixed window remove sai index `right-width+1` thay vì `right-width`.
- Update best sau khi shrink làm bỏ shortest valid cuối cùng.
- Tie earliest: dùng `<=` cập nhật sẽ lấy đoạn later cùng length.
- OF052 so `map.size` với số requirement nhưng giữ zero-count key báo đủ giả.

## 8. Drills biến thể

### Drill A — longest substring tối đa k distinct

Expand right; khi `map.size>k`, shrink và delete zero-count; sau khi valid, update maximum. Khác minimum cover ở vị trí update và while predicate.

### Drill B — count subarrays sum target có số âm

Dùng prefix sum frequency: tại prefix `p`, số prefix cũ `p-target` là số subarray kết thúc ở đây. Đây là counter-pattern quan trọng cho positive window.

### Drill C — minimum cover với required multiplicity

Map `need`; state `satisfiedKeys` chỉ tăng khi count vừa đạt need và giảm khi outgoing làm count xuống dưới need. Không chỉ đếm distinct.

### Drill D — window max

Nếu cần maximum của mọi fixed window, scalar sum không đủ; dùng monotonic deque giữ index ứng viên. Window framework giữ nguyên, aggregator thay đổi.

## 9. Câu hỏi mở tư duy

- Window là inclusive hay half-open?
- Khi nào expand, khi nào shrink, và proof monotone nằm ở đâu?
- State update khi item vào/ra có đối xứng không?
- Update answer trước hay sau shrink?
- Số âm/duplicate/tie làm invariant thay đổi thế nào?

## 10. Checklist 15 giây

Chốt: **window semantics, add/remove, validity predicate, expand/shrink rule, answer update point, monotonic assumption và tie/index contract**.
