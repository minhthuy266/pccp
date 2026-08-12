# Binary Search canonical — `BS-01..05`

[← Chương 09](../../09_Binary_Search.md) · [PF19](../../../docs/pccp-700-roadmap/pattern-families/PF19_BINARY_SEARCH_ANSWER.md)

## `[BS-01]` — Exact search trên dữ liệu đã sort

### Core — bản chất và brute force bottleneck

Linear scan loại từng phần tử, `O(n)`. Khi array đã sort, so sánh target với middle loại được **một nửa miền chắc chắn không chứa đáp án**. Binary search không nhanh vì “chia đôi” chung chung; nó nhanh vì order cho phép chứng minh nửa bị loại là vô ích.

### Dấu hiệu nhận dạng và counter-signal

- Tìm một value trong array monotone/sorted.
- Có random access theo index.
- Không dùng nếu array chưa sort và không được phép/có lợi để sort; sort `O(n log n)` chỉ cho một query có thể đắt hơn scan.

### State, invariant và transition

Dùng miền inclusive `[low,high]`. Invariant: nếu target tồn tại, ít nhất một vị trí của nó vẫn nằm trong miền. Nếu `values[mid] < target`, mọi index `<=mid` bị loại; ngược lại loại `>=mid`.

### Template JavaScript

```js
function exactBinarySearch(values, target) {
  let low = 0;
  let high = values.length - 1;
  while (low <= high) {
    const middle = low + Math.floor((high - low) / 2);
    if (values[middle] === target) return middle;
    if (values[middle] < target) low = middle + 1;
    else high = middle - 1;
  }
  return -1;
}
```

### Dry run

`[1,4,7,9]`, target 7: miền `[0,3]`, mid 1 value 4 ⇒ low 2; miền `[2,3]`, mid 2 ⇒ found. Target 6 kết thúc khi low vượt high.

### Complexity

Mỗi transition giảm miền ít nhất một nửa: `O(log n)` time, `O(1)` space.

### Variant knobs và counterexample

- Duplicate: exact search trả một occurrence bất kỳ, không cam kết first/last.
- Descending array phải đảo comparison.
- Counterexample quên `±1`: `low=mid` trong inclusive exact search có thể không thu hẹp khi hai phần tử còn lại.

### Transfer

Mutation drill: search descending; rồi chuyển câu hỏi từ “có target” sang “vị trí đầu ≥ target” để thấy vì sao BS-02 không return ngay khi equal.

## `[BS-02]` — Lower bound và first true

### Core — bản chất và brute force bottleneck

Lower bound là index đầu tiên có `values[index] >= target`. Linear scan từ trái đúng nhưng `O(n)`. Predicate `values[i] >= target` tạo chuỗi `false...false,true...`; ta tìm boundary F→T.

### Dấu hiệu nhận dạng

“Vị trí đầu”, “ít nhất”, “first index ≥”, insertion position, hoặc first candidate thỏa predicate monotone. Nếu chỉ cần exact occurrence bất kỳ, BS-01 đơn giản hơn.

### State, invariant và transition

Dùng half-open `[low,high)` với `high=n`. Invariant: mọi index `<low` chắc chắn false; mọi index `>=high` không cần xét và boundary nằm trong `[low,high]`. Nếu mid true, giữ mid bằng `high=mid`; nếu false, bỏ mid bằng `low=mid+1`.

### Template JavaScript

```js
function lowerBound(values, target) {
  let low = 0;
  let high = values.length;
  while (low < high) {
    const middle = low + Math.floor((high - low) / 2);
    if (values[middle] >= target) high = middle;
    else low = middle + 1;
  }
  return low;
}
```

### Dry run

`[1,3,3,7]`, target 3: mid 2 true ⇒ high 2; mid 1 true ⇒ high 1; mid 0 false ⇒ low 1. Trả index 1. Target 9 trả n=4, insertion sau cuối.

### Complexity

`O(log n)` time, `O(1)` space. Không scan duplicate block.

### Variant knobs và counterexample

- First `> target` chỉ đổi predicate thành `values[mid] > target` và được gọi upper bound.
- Return n là kết quả hợp lệ, không truy cập `values[n]` trước khi kiểm.
- Counterexample return ngay khi equal trên `[3,3,3]` có thể trả index giữa, không phải first.

### Transfer

Dùng `lowerBound(target)` và `lowerBound(target+epsilon)` không an toàn cho mọi type; BS-03 cung cấp upper bound rõ predicate.

## `[BS-03]` — Upper bound và last true

### Core — hai boundary đối ngẫu

Upper bound là first index có value `> target`; số occurrence target là `upperBound-lowerBound`. Last true trên miền integer là bài đối ngẫu `true...true,false...` và cần upper-middle để tránh loop kẹt.

Brute force scan tới sau duplicate block hoặc thử từng candidate vẫn lặp tuyến tính; bottleneck được loại nhờ boundary monotone.

### Dấu hiệu nhận dạng

“Vị trí sau phần tử cuối bằng target”, “đếm duplicate”, “giá trị lớn nhất vẫn thỏa”. Phải viết truth sequence trước khi chọn template.

### State, invariant và transition

Upper bound half-open giữ invariant giống BS-02 nhưng predicate `>`. Last true inclusive giữ đáp án trong `[low,high]`; khi mid true giữ phía phải bằng `low=mid`, khi false bỏ mid bằng `high=mid-1`.

### Template JavaScript

```js
function upperBound(values, target) {
  let low = 0;
  let high = values.length;
  while (low < high) {
    const middle = low + Math.floor((high - low) / 2);
    if (values[middle] > target) high = middle;
    else low = middle + 1;
  }
  return low;
}
```

```js
function lastTrue(low, high, predicate) {
  while (low < high) {
    const middle = low + Math.floor((high - low + 1) / 2);
    if (predicate(middle)) low = middle;
    else high = middle - 1;
  }
  return low;
}
```

### Dry run

`[1,3,3,7]`, upper bound 3 trả 3; lower bound trả 1 nên count bằng 2. Last true với miền `[0,1]` dùng upper-mid 1; nếu true, low tiến thẳng 1 và loop kết thúc.

### Complexity

Mọi boundary search `O(log range)` time, `O(1)` space.

### Variant knobs và counterexample

- Last `< target` là `lowerBound(target)-1` nếu index tồn tại.
- Last `<= target` là `upperBound(target)-1`.
- Counterexample dùng lower-mid và `low=mid`: miền `[0,1]`, predicate(0)=true sẽ lặp vô hạn tại mid 0.

### Transfer

Mutation drill: đếm số phần tử trong value range `[a,b]` bằng `upperBound(b)-lowerBound(a)`. Qua BS-04 để search một đại lượng không nằm trực tiếp trong input.

## `[BS-04]` — Binary search on answer

### Core — bản chất và brute force bottleneck

Candidate answer nằm trong miền số lớn. Brute force thử từng value; binary search được khi `feasible(x)` monotone. OF043 tìm minimum time đủ xử lý (`F→T`); OF044 tìm maximum minimum-gap còn đạt (`T→F`).

### Dấu hiệu nhận dạng

“Giá trị nhỏ nhất/lớn nhất có thể”, miền integer lớn, và có thể kiểm một candidate nhanh hơn xây trực tiếp optimum. Nếu predicate true/false xen kẽ, không được binary search.

### State, invariant và transition

First feasible: high phải feasible, answer nằm trong `[low,high]`; true giữ left half, false bỏ through mid. Last feasible: low phải feasible; dùng upper-mid và giữ right half khi true.

### Template JavaScript

```js
function firstTrue(low, high, predicate) {
  while (low < high) {
    const middle = low + Math.floor((high - low) / 2);
    if (predicate(middle)) high = middle;
    else low = middle + 1;
  }
  return low;
}
```

### Dry run

Truth sequence cho minimum capacity: `F F F T T`. Mid true không return vì có thể còn true nhỏ hơn; giữ `high=mid`. Kết thúc tại boundary đầu true.

### Complexity

Nếu predicate `O(n)` và miền width `R`, tổng `O(n log R)` time, `O(1)` ngoài state predicate.

### Variant knobs và counterexample

- First/last feasible chọn template khác.
- Bounds phải có proof; high không feasible phá invariant.
- Equality trong greedy predicate quyết định truth boundary.
- Counterexample “binary search vì n lớn” nhưng predicate không monotone là sai abstraction.

### Transfer

Official anchors: OF043, OF044. Mutation drill: ship capacity minimum và aggressive placement maximum distance; viết truth sequence trước code.

## `[BS-05]` — Bounds, termination và numeric safety

### Core — correctness guard

Binary search thường sai không phải ở ý tưởng mà ở interval convention, midpoint và numeric type. Đây là VARIANT guard: mọi iteration phải thu hẹp strict, bounds phải bao answer, arithmetic phải chính xác.

Cách chậm thử từng integer vừa không đạt miền lớn vừa che mất bottleneck; binary search chỉ thay nó khi predicate đơn điệu đã được chứng minh.

### Dấu hiệu nhận dạng

Loop kẹt ở hai candidate, off-by-one tại equality, high được đoán, hoặc product/count vượt safe integer. Nếu answer real, integer termination không áp dụng.

### State, invariant và transition

Trước loop ghi rõ:

```text
domain integer hay real
interval inclusive hay half-open
low/high known true/false gì
truth sequence F→T hay T→F
```

Invariant termination: sau transition, miền mới là subset strict của miền cũ và vẫn chứa answer.

### Template BigInt

```js
function firstTrueBigInt(low, high, predicate) {
  while (low < high) {
    const middle = low + (high - low) / 2n;
    if (predicate(middle)) high = middle;
    else low = middle + 1n;
  }
  return low;
}
```

### Dry run

First true `[0,1]`: lower-mid 0. False ⇒ low 1. Last true `[0,1]`: upper-mid 1. True ⇒ low 1. Cả hai giảm miền; dùng sai mid có thể giữ nguyên `[0,1]`.

### Complexity

`O(log R)` predicate calls. BigInt arithmetic chính xác nhưng chậm hơn Number; chỉ dùng khi bound có thể vượt `Number.MAX_SAFE_INTEGER`.

### Variant knobs và counterexample

- Không trộn `1` với `1n`; JavaScript ném TypeError.
- Chuyển Number đã mất precision sang BigInt không khôi phục dữ liệu.
- Real search dùng số iteration/epsilon và rounding theo contract.
- Predicate có thể early stop khi count đã đạt target để tránh overflow/công việc thừa.

### Transfer

Blank Page Test: viết first true, last true và BigInt first true; giải thích bằng miền `[0,1]`. Revealing test luôn gồm answer ở low, ở high và không có exact target trong array.
