# PF02 — Sort, normalize và ordering

Nguồn: [OF003](../official-lessons/OF003.md), [OF015](../official-lessons/OF015.md), [OF016](../official-lessons/OF016.md), [OF017](../official-lessons/OF017.md), [OF018](../official-lessons/OF018.md).

## 1. Tín hiệu nhận dạng

Sort hữu ích khi đổi thứ tự làm một quan hệ toàn cục trở thành **local/boundary**: prefix chỉ cần nhìn hàng xóm, rank nằm ở index, hai chiều vật thể được normalize để lấy maxima, hoặc mọi item cần xếp theo comparator phục vụ objective.

Sort không phải mục tiêu; câu hỏi là: “sau sort, tính chất nào trở nên dễ kiểm tra/chứng minh?”

## 2. Không dùng khi

- Phải giữ original order và không được copy/mutate.
- Chỉ cần min/max một lần: scan `O(n)` tốt hơn sort `O(n log n)`.
- Comparator không tạo thứ tự nhất quán.
- Data đến online và query xen kẽ: có thể cần heap/balanced tree.

## 3. Decision tree

```text
Cần rank/subarray sorted?       → copy/slice + numeric sort
Cần canonical orientation?      → normalize từng item rồi extrema
Cần phát hiện quan hệ prefix?   → lexicographic sort + adjacent check
Cần tối ưu chuỗi ghép?          → comparator dựa trên a+b và b+a
Cần threshold theo rank?        → sort rồi scan boundary
Chỉ cần cực trị?                → linear scan, không sort
```

## 4. Knobs tạo biến thể

- **Ascending/descending** phụ thuộc boundary muốn tìm.
- **Numeric/string:** JavaScript mặc định sort theo chuỗi; số cần `(a,b)=>a-b`.
- **Stable tie:** nếu tie-break theo input order, lưu `originalIndex` rõ ràng.
- **Mutability:** `toSorted()`/`[...array].sort()` khi input phải giữ nguyên.
- **Canonical form:** rectangle `(w,h)` thành `(max,min)`; shape phức tạp hơn cần translate/rotate rồi serialize.
- **Comparator objective:** `a+b > b+a` chỉ đúng cho tối đa hóa concatenation, không phải mọi bài ghép chuỗi.

## 5. Invariant và proof

OF003: sau lexicographic sort, nếu `x` là prefix của bất kỳ chuỗi dài hơn nào, ít nhất một chuỗi có prefix `x` nằm ngay sau block bắt đầu bằng `x`; vì vậy adjacent scan đủ.

OF018: sau normalize, cạnh lớn của mọi card chỉ cạnh tranh trong một trục và cạnh nhỏ trong trục còn lại. Kích thước cần thiết là `maxLong × maxShort`.

Comparator phải trả thứ tự dựa trên cặp đang so và có tính nhất quán; không dùng state thay đổi bên ngoài.

## 6. Code core đáng thuộc

```js
function numericSortedCopy(values) {
  return [...values].sort((left, right) => left - right);
}

function normalizePair(first, second) {
  return [Math.max(first, second), Math.min(first, second)];
}
```

```js
function largestConcatenation(numbers) {
  const ordered = numbers.map(String).sort((a, b) =>
    (b + a).localeCompare(a + b)
  );
  const joined = ordered.join("");
  return joined[0] === "0" ? "0" : joined;
}
```

## 7. Counterexamples bóc lỗi

- `[2,10]` với `.sort()` thành `[10,2]`, chứng minh cần numeric comparator.
- Comparator số lớn dùng `Number(b+a)-Number(a+b)` có thể mất precision; so chuỗi an toàn hơn.
- Prefix check mọi cặp là đúng nhưng `O(n²)`; chỉ check `includes` lại sai vì substring khác prefix.
- Rectangle `(2,100),(99,3)` nếu không normalize độc lập sẽ chọn orientation thiếu nhất quán.
- Largest number toàn zero phải trả `"0"`, không phải `"000"`.

## 8. Drills biến thể

### Drill A — sort theo nhiều khóa

Student `{score,time,index}`: score giảm, time tăng, index tăng. Viết comparator thành chuỗi fallback, rồi tạo test tie ở từng tầng.

```js
const compare = (a, b) =>
  b.score - a.score || a.time - b.time || a.index - b.index;
```

### Drill B — prefix chuyển thành interval

Sau sort, trả toàn bộ nhóm có prefix `p`. Dùng lower-bound vị trí đầu `>= p`, rồi scan tới khi `startsWith(p)` sai; nếu query nhiều, học tiếp binary search range/trie.

### Drill C — top-k thay vì full sort

Nếu `n` rất lớn, `k` nhỏ và chỉ cần k phần tử tốt nhất, full sort có thể nhường min-heap size `k`. Knob “cần toàn order hay chỉ top-k” quyết định PF02 hay PF06.

## 9. Câu hỏi mở tư duy

- Sort làm mất thông tin nào, có cần gắn index gốc không?
- Quan hệ cần kiểm tra có thật sự trở thành adjacent sau sort không?
- Comparator đang mô tả objective hay chỉ là cảm giác greedy?
- Bound có cho phép `O(n log n)` không; counting sort có phù hợp miền key nhỏ?

## 10. Checklist 15 giây

Trước code phải nói được: **sort key, direction, tie-break, mutation policy, quan hệ được local hóa sau sort và counterexample nếu comparator sai**.
