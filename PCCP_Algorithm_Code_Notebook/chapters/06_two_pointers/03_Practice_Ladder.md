# Chapter 06 — Practice Ladder

[← Index](../../06_Two_Pointers.md) · [Lời giải](../../solutions/06_Two_Pointers_Solutions.md)

## Tầng 1 — Nhận diện (12)

Với mỗi đề, ghi ID, prerequisite, state, pointer move và một câu chứng minh move an toàn.

### S06-R01 `[TP-01]`
Sorted array, tìm hai index khác nhau có tổng target.
### S06-R02 `[TP-01]`
Kiểm tra chuỗi palindrome sau khi đã chuẩn hóa ký tự; không cần sort.
### S06-R03 `[TP-02]`
Xóa mọi số âm in-place, giữ thứ tự, return length prefix hợp lệ.
### S06-R04 `[TP-02]`
Đưa số 0 về cuối nhưng giữ order của số khác 0; phân biệt compact với swap hai đầu.
### S06-R05 `[TP-03]`
Sorted array, giữ tối đa một occurrence mỗi value.
### S06-R06 `[TP-03]`
Sorted array, giữ tối đa hai occurrence; nêu phép so với `write-2`.
### S06-R07 `[TP-04]`
Merge hai dãy sort, giữ mọi duplicate và không mutate input.
### S06-R08 `[TP-04]`
Giao đa tập của hai dãy sort; equal move cả hai.
### S06-R09 `[TP-05]`
Liệt kê bộ ba value tổng 0 không trùng bộ; input chưa sort và cấm mutate.
### S06-R10 `[TP-05]`
Tìm cặp gần target nhất trong sorted array; state cần thêm best.
### S06-R11 `[TP-06]`
Chia số âm trước, không âm sau; order không quan trọng và cho mutate.
### S06-R12 `[TP-02/TP-06]`
Đề yêu cầu số chẵn trước số lẻ **và giữ nguyên order**. Chọn compact/output hay partition hai đầu?

## Tầng 2 — Điền khuyết (3)

### S06-F01 `[TP-01]`
```js-fill
while (left < right) {
  const sum = values[left] + values[right];
  if (sum === target) return [left, right];
  if (sum < target) ___;
  else ___;
}
```

### S06-F02 `[TP-02]`
```js-fill
for (let read = 0; read < values.length; read += 1) {
  if (!keep(values[read])) continue;
  values[___] = values[read];
  ___ += 1;
}
return write;
```

### S06-F03 `[TP-04]`
```js-fill
if (a[i] === b[j]) { output.push(a[i]); ___; ___; }
else if (a[i] < b[j]) ___;
else ___;
```

## Tầng 3 — Dựng logic (3)

### S06-L01 `[TP-03]`
Viết state/check/update/invariant cho phép mỗi value xuất hiện tối đa `k` lần trong sorted array. Bao phủ `k=0`.
### S06-L02 `[TP-04]`
Union unique của hai sorted arrays. Khi equal chỉ emit một lần; duplicate liền nhau không được lọt vào output.
### S06-L03 `[TP-06]`
Partition in-place theo `< pivot` và `>= pivot`; return boundary và nêu contract về stability.

## Transfer Test A

### S06-T01 — Chuẩn hóa log `[TP-02/TP-03]`

`timestamps` đã sort. Xóa in-place mọi timestamp `< cutoff`, rồi trong phần còn lại chỉ giữ một occurrence. Return length hợp lệ; không dùng array phụ. Giải thích vì sao có thể làm trong một pass và output last nào được so sánh.

## Tầng 4 — Pseudocode (3)

### S06-P01 `[TP-01]`
Sorted values; trả cặp value có tổng gần target nhất. Tie chọn cặp lexicographic nhỏ hơn. Nêu cách xử lý length<2.
### S06-P02 `[TP-04]`
Merge hai stream record sort theo `time`; time hòa thì record stream A đứng trước. Không mutate hai input.
### S06-P03 `[TP-05]`
Three Sum target bất kỳ, output các bộ value tăng không trùng; không mutate input.

## Tầng 5 — Tự code (3)

### S06-C01 `[TP-02]` — Compact theo predicate
Viết `compactInPlace(values, keep)` giữ order, mutate, return valid length. Test empty, all keep, none keep và callback dựa trên value.

### S06-C02 `[TP-04]` — Giao đa tập
Hai array tăng dần; trả intersection giữ multiplicity nhỏ hơn. Không mutate input.

### S06-C03 `[TP-05]` — Three Sum zero
Trả các triplet value duy nhất có tổng 0; mỗi triplet tăng dần; output không trùng; input không mutate.

## Tầng 6 — Biến thể (3)

### S06-V01 `[TP-03]`
Từ unique in-place đổi sang giữ tối đa `k` bản sao. Viết implementation hoàn chỉnh.
### S06-V02 `[TP-04]`
Viết symmetric difference unique của hai sorted arrays: value chỉ có ở đúng một bên, output tăng và không trùng.
### S06-V03 `[TP-06]`
Partition odd trước even in-place; return boundary. Chứng minh empty/all-odd/all-even không out-of-bounds.

## Transfer Test B

### S06-T02 — Ghép và lọc lịch sử `[TP-04/TP-02]`

Hai dãy event đã sort theo `time`, mỗi event `{time,id,valid}`. Merge ổn định (time hòa: dãy A trước), đồng thời bỏ event `valid === false`. Không mutate input; O(n+m), không sort lại output.

## Mini-test S06-M01 — 50 phút

1. **S06-M01.1 `[TP-01]`:** palindrome phrase, bỏ ký tự không phải chữ/số và không phân biệt hoa thường; O(n), không tạo reverse string.
2. **S06-M01.2 `[TP-04]`:** trả union unique của hai sorted integer arrays trong O(n+m).
3. **S06-M01.3 `[TP-06]`:** partition values theo `< pivot` và `>= pivot`, mutate, return boundary; order không quan trọng.

