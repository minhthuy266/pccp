# Lời giải — 09 — Binary Search

[← Practice](../chapters/09_binary_search/02_Practice_Ladder.md) · Code chạy được: [ch09_binary_search.js](../../solutions/notebook/ch09_binary_search.js)

## Tầng R

### P09-R01 — `BS-01`

Exact search giữ miền candidate và trả một index match hoặc `-1`. Sorted order cho phép loại nửa miền.

### P09-R02 — `BS-01`

Một query: scan `O(n)` thường tốt hơn sort `O(n log n)` + search. Binary search không tự bù chi phí preprocessing.

### P09-R03 — `BS-02`

Predicate `values[index] >= target`: false rồi true. Boundary đầu true chính là insertion index.

### P09-R04 — `BS-02`

Equal chỉ chứng minh mid là một candidate; phía trái vẫn có thể equal nên phải `high=mid`.

### P09-R05 — `BS-03`

`upperBound(target)-lowerBound(target)`.

### P09-R06 — `BS-03`

Upper-mid `low+floor((high-low+1)/2)`; true gán low=mid. Lower-mid có thể giữ nguyên low.

### P09-R07 — `BS-04`

Candidate là capacity. Predicate `daysNeeded(capacity)<=D`; capacity tăng không làm days tăng, tạo F→T.

### P09-R08 — `BS-04`

Predicate `canPlace(distance)` là T→F khi distance tăng; tìm last true.

### P09-R09 — `BS-05`

Khi bound/intermediate product có thể vượt `Number.MAX_SAFE_INTEGER`, parse và tính bằng BigInt từ đầu; không chuyển sau khi Number đã mất precision.

### P09-R10 — `BS-05`

Float có vô hạn representable transitions/rounding; dùng số iteration cố định hoặc epsilon và output rounding theo contract.

## Tầng F

### P09-F01 — `BS-01`

Nhánh nhỏ hơn: `low=middle+1`; lớn hơn: `high=middle-1`.

### P09-F02 — `BS-02`

True `high=middle`; false `low=middle+1`.

### P09-F03 — `BS-03`

`middle=low+Math.floor((high-low+1)/2)`.

## Tầng L

### P09-L01 — `BS-02`

`[0,4)`, mid2 true → `[0,2)`; mid1 true → `[0,1)`; mid0 false → `[1,1)`, return1.

### P09-L02 — `BS-04`

At time t, processed `sum(floor(t/time_i))`. Nếu t đủ thì mọi t lớn hơn cũng đủ. High `fastest*n` luôn feasible vì fastest inspector một mình xử lý n người.

### P09-L03 — `BS-04/BS-05`

Greedy giữ điểm trước; nếu `gap < candidate` thì bỏ current. Gap bằng candidate là hợp lệ. Feasible khi removed≤m; candidate tăng chỉ có thể cần bỏ nhiều hơn.

## Tầng P

### P09-P01 — `BS-01..03`

Exact inclusive return on equal; lower/upper half-open không return equal. Lower predicate `>=`, upper predicate `>`.

### P09-P02 — `BS-04`

Invariant answer trong `[low,high]`, high feasible; lower-mid; true giữ high=mid, false low=mid+1.

### P09-P03 — `BS-05`

BigInt dùng `/2n`, `+1n`; predicate cộng count và return true ngay khi đạt target để tránh việc thừa.

## Tầng C

### P09-C01 — `BS-01..03`

Xem `exactBinarySearch`, `lowerBound`, `upperBound` trong module. Tests bao phủ empty, duplicate và insertion n.

### P09-C02 — `BS-04`

`minimumProcessingTime` dùng `firstTrueBigInt`; sample trả `28n`.

### P09-C03 — `BS-04/BS-05`

`maximumMinimumDistance` dùng last true, sort rock cộng destination và kiểm mọi gap.

## Tầng V

### P09-V01 — `BS-02 ↔ BS-03`

Upper bound đổi predicate từ `>=` sang `>`. Last `<=target` là `upperBound(target)-1`; nếu kết quả -1 nghĩa không có candidate.

### P09-V02 — `BS-04`

Search chỉ tìm value. Sau đó chạy lại greedy predicate ở optimum và ghi decisions; không nhồi reconstruction vào predicate stateful vì binary search gọi predicate nhiều lần.

## Tầng M

### P09-M01 — Mixed boundary test

1. `upperBound(b)-lowerBound(a)`.
2. First feasible speed.
3. Last feasible spacing.

Rubric 10 điểm/bài: truth sequence 2, bounds 2, invariant 2, transition 2, revealing tests 1, complexity/numeric safety 1.
