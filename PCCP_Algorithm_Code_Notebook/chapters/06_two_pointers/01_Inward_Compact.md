# Hai đầu, fast/slow và duplicate — `TP-01..03`

[← Index](../../06_Two_Pointers.md) · [Tiếp →](02_Merge_Pair_Partition.md)

## Dạng 1 `[TP-01]` — Hai đầu đi vào

**Dấu hiệu nhận dạng:** input sorted hoặc hai extreme cho phép loại chắc một phía. Transition dựa trên monotonic rule: sau so sánh, move đúng pointer có thể chứng minh không chứa đáp án bị bỏ.

### A. Bản chất

Hai pointer đứng ở hai biên của một không gian **có order**. Mỗi lần so sánh phải chứng minh được một biên không thể tham gia đáp án cần tìm, rồi mới dịch biên đó. Sorted pair dùng tính đơn điệu của tổng; palindrome dùng contract đối xứng. Không có quy tắc loại trừ thì hai pointer chỉ là brute force bị viết thiếu.

### B. Mental model

Hai cửa của một hành lang. Mỗi quan sát đóng vĩnh viễn một cửa vì mọi lựa chọn phía sau cửa ấy còn tệ hơn theo cùng một chiều.

### C. Template tư duy

```text
Order/prerequisite nào làm pointer move an toàn?
State: left, right; candidate hiện tại.
Nếu candidate quá nhỏ: chứng minh vì sao left không thể ghép tốt hơn.
Nếu quá lớn: chứng minh tương tự cho right.
Termination: left < right hay left <= right?
```

### D. Template code

```js
function hasPairWithSum(sortedValues, target) {
  let left = 0;
  let right = sortedValues.length - 1;
  while (left < right) {
    const sum = sortedValues[left] + sortedValues[right];
    if (sum === target) return true;
    if (sum < target) left += 1;
    else right -= 1;
  }
  return false;
}
```

### E. Bài mẫu — Cặp có tổng bằng target

1. **Đề:** array đã sort tăng, tìm hai index khác nhau có tổng target. 2. `[-2,1,3,6,8],9→[1,4]`. 3. Sorted là prerequisite. 4. Hai loop O(n²). 5. Nút thắt là thử lại nhiều cặp có cùng biên. 6. Nếu sum nhỏ, ngay cả value lớn nhất `right` ghép `left` vẫn nhỏ: loại `left`; sum lớn thì loại `right`. 7. State `left,right`. 8. Check sum rồi move đúng phía. 9. **Invariant:** trước mỗi vòng, nếu đáp án tồn tại thì có ít nhất một đáp án trong rectangle index `[left..right]`; move chỉ xóa một biên đã chứng minh vô vọng. 10. Loop khi hai index khác nhau. 11. **Code:**

```js
function pairSumIndices(sortedValues, target) {
  let left = 0;
  let right = sortedValues.length - 1;
  while (left < right) {
    const sum = sortedValues[left] + sortedValues[right];
    if (sum === target) return [left, right];
    if (sum < target) left += 1;
    else right -= 1;
  }
  return [-1, -1];
}
```

12. Check trước move để không bỏ candidate hiện tại; `left < right` cấm dùng cùng phần tử hai lần. 13. **Dry run:**

| Bước | Pointer/candidate | State trước | Điều kiện | Hành động | State sau |
| --- | --- | --- | --- | --- | --- |
| 1 | 0,4 → 6 | l0,r4 | 6<9 | loại left0 | l1,r4 |
| 2 | 1,4 → 9 | l1,r4 | bằng | return | `[1,4]` |

14. O(n) time, O(1) extra. 15. Input chưa sort; dùng `<=` rồi ghép một index; move cả hai khi chưa match; trả index sau khi tự sort mà quên original index. 16. Palindrome: compare hai ký tự; mismatch return false; match mới dịch cả hai.

**Recall Card `[TP-01]`:** order → candidate → loại một biên → invariant còn đáp án trong đoạn. **Blank Page:** viết pair sum trong 90 giây. **Mutation:** trả cặp gần target nhất. **Explain Back:** vì sao sum nhỏ loại left chứ không loại right?

## Dạng 2 `[TP-02]` — Fast/slow compact in-place

**Dấu hiệu nhận dạng:** phải filter/compact tại chỗ trong một scan. **Brute force bottleneck:** splice giữa array dịch suffix và thành `O(n²)`; transition read luôn tiến, item giữ lại ghi tại write rồi tăng write.

### A. Bản chất

`read` duyệt vùng chưa xử lý; `write` là độ dài vùng output hợp lệ. Khi item đạt predicate, ghi vào `values[write]` rồi tăng `write`. Đây là filter ổn định in-place: prefix `[0,write)` luôn là output đúng của prefix đã đọc.

### B. Mental model

Một băng chuyền có người kiểm tra (`read`) và ô trống tiếp theo trên kệ đạt chuẩn (`write`).

### C. Template tư duy

```text
Contract cho phép mutate không? Return length hay slice?
write = 0; read scan toàn input.
Nếu keep(value): values[write] = value; write++.
Invariant: values[0..write) là filter đúng, giữ order, của vùng đã đọc.
```

### D. Template code

```js
function compactInPlace(values, keep) {
  let write = 0;
  for (let read = 0; read < values.length; read += 1) {
    if (!keep(values[read])) continue;
    values[write] = values[read];
    write += 1;
  }
  return write;
}
```

### E. Bài mẫu — Dồn số khác 0

1. **Đề:** mutate array để các số khác 0 nằm đầu, giữ order; return length hợp lệ. 2. `[0,3,0,2]→length2,prefix[3,2]`. 3. Tail không có nghĩa. 4. Tạo array mới O(n) space. 5. Output chỉ cần prefix. 6. Read/write. 7. `read,write`. 8. Check nonzero rồi copy. 9. Prefix trước `write` là đúng và stable. 10. Scan một lần. 11. **Code:**

```js
function moveNonZeroToFront(values) {
  let write = 0;
  for (let read = 0; read < values.length; read += 1) {
    if (values[read] === 0) continue;
    values[write] = values[read];
    write += 1;
  }
  return write;
}
```

12. Copy trước increment; self-assignment vô hại; không đọc tail sau return. 13. **Dry run:**

| Bước | Pointer/value | State trước | Điều kiện | Hành động | State sau |
| --- | --- | --- | --- | --- | --- |
| 1 | r0=0 | w0 | bỏ | none | w0 |
| 2 | r1=3 | w0 | giữ | a[0]=3 | w1, `[3,...]` |
| 3 | r2=0 | w1 | bỏ | none | w1 |
| 4 | r3=2 | w1 | giữ | a[1]=2 | w2, `[3,2,...]` |

14. O(n)/O(1). 15. Quên mutation contract; increment write khi bỏ; return cả tail; đổi order do swap. 16. Biến thể xóa đúng value, hoặc giữ item thỏa callback.

**Recall Card `[TP-02]`:** read khám phá, write cam kết prefix. **Blank Page:** compact số dương. **Mutation:** trả slice thay vì length. **Explain Back:** invariant nào bảo toàn thứ tự?

## Dạng 3 `[TP-03]` — Loại duplicate trên sorted array

**Dấu hiệu nhận dạng:** duplicate đã nằm liên tiếp nhờ sorted order. **Brute force bottleneck:** Set/output phụ tốn space khi contract yêu cầu in-place; transition copy chỉ khi current khác last unique tại `write-1`.

### A. Bản chất

Đây là compact mà predicate phụ thuộc output cuối: trên sorted array, value mới chỉ khác value duy nhất gần nhất `values[write-1]`. Sorted prerequisite làm mọi duplicate của một value nằm liên tiếp.

### B. Mental model

Người ghi biên bản chỉ ghi khi tên hiện tại khác tên cuối cùng đã ghi.

### C. Template tư duy

```text
Empty → 0. Nếu nonempty, write=1.
read từ 1; nếu current !== values[write-1], copy rồi write++.
Invariant: prefix là unique sequence đúng của input prefix.
```

### D. Template code

```js
function uniqueSortedInPlace(sortedValues) {
  if (sortedValues.length === 0) return 0;
  let write = 1;
  for (let read = 1; read < sortedValues.length; read += 1) {
    if (sortedValues[read] === sortedValues[write - 1]) continue;
    sortedValues[write] = sortedValues[read];
    write += 1;
  }
  return write;
}
```

### E. Bài mẫu — Mỗi value tối đa một lần

1. **Đề:** sorted array; mutate; return unique length. 2. `[1,1,2,2,4]→3,prefix[1,2,4]`. 3. Empty riêng. 4. Set dùng O(n) và không diễn đạt in-place contract. 5. Duplicate kề. 6. read/write/last output. 7. `read,write`. 8. Different→copy. 9. Prefix `[0,write)` chứa đúng mỗi distinct value đã đọc một lần. 10. Seed first item. 11. Code là template trên. 12. So với output last, không nhất thiết `read-1` khi mở rộng biến thể “tối đa k lần”. 13. **Dry run:**

| Bước | Pointer/value | State trước | Điều kiện | Hành động | State sau |
| --- | --- | --- | --- | --- | --- |
| seed | value1 | w1 | — | giữ | `[1]` |
| r1 | 1 | last1 | equal | skip | w1 |
| r2 | 2 | last1 | different | copy | w2 `[1,2]` |
| r3 | 2 | last2 | equal | skip | w2 |
| r4 | 4 | last2 | different | copy | w3 `[1,2,4]` |

14. O(n)/O(1). 15. Unsorted input; empty trả1; so với ô tail đã stale; coi toàn array sau compact đều hợp lệ. 16. Cho phép tối đa hai lần: giữ nếu `write < 2 || current !== values[write-2]`.

**Recall Card `[TP-03]`:** sorted groups + compare output last. **Blank Page:** empty/singleton/duplicates. **Mutation:** tối đa k bản sao. **Explain Back:** vì sao sorted là bắt buộc?

## Transfer Test A

Làm [S06-T01](03_Practice_Ladder.md#s06-t01--chuẩn-hóa-log-tp-02tp-03).
