# Sort-then-scan và coordinate compression — `SORT-04..05`

[← Comparator](01_Comparators.md) · [Practice →](03_Practice_Ladder.md)

## Dạng 4 `[SORT-04]` — Sort rồi quét hàng xóm/đoạn

### A. Bản chất

Sort không phải đích cuối mà là phép biến đổi làm quan hệ cần xét trở thành cục bộ. Sau khi sort điểm, cặp gần nhất nằm cạnh nhau; sau khi sort interval theo đầu trái, ta chỉ cần so interval mới với đoạn đã gộp cuối cùng. Chi phí thường là `O(n log n)` cho sort và `O(n)` cho scan.

### B. Mental model

Rải các mảnh giấy lộn xộn thành một hàng. Khi đầu trái tăng dần, “quá khứ có liên quan” được nén vào một biến hoặc phần tử cuối của output.

### C. Template tư duy

```text
Chọn key sort để future chỉ cần nhìn state tóm tắt của prefix.
Clone nếu không được mutate; xử lý empty trước khi đọc phần tử 0.
Khởi tạo state bằng item đầu.
Mỗi item: overlap/adjacent? merge; không thì chốt và mở nhóm mới.
Invariant: output + current mô tả chính xác prefix đã scan.
```

### D. Template code

```js
function mergeClosedIntervals(intervals) {
  if (intervals.length === 0) return [];
  const sorted = intervals.map(([left, right]) => [left, right])
    .sort((a, b) => a[0] - b[0] || a[1] - b[1]);
  const merged = [sorted[0]];
  for (let index = 1; index < sorted.length; index += 1) {
    const [left, right] = sorted[index];
    const last = merged[merged.length - 1];
    if (left <= last[1]) last[1] = Math.max(last[1], right);
    else merged.push([left, right]);
  }
  return merged;
}
```

### E. Bài mẫu — Gộp các đoạn đóng

1. **Đề:** gộp mọi interval `[left,right]` giao nhau; hai đoạn chạm endpoint cũng giao nhau. 2. `[[5,7],[1,3],[2,6],[9,10]]→[[1,7],[9,10]]`. 3. Sort đầu trái để interval tiếp theo không thể bắt đầu trước current. 4. So mọi cặp và lặp merge khó giữ transitive closure. 5. Lỗi khi `[1,4]` nối `[3,6]` rồi `[5,8]`. 6. Sort rồi scan. 7. State `merged`, đặc biệt `last`. 8. `left<=lastRight` thì kéo right; ngược lại mở đoạn mới. 9. Sau mỗi vòng, `merged` là hợp rời nhau của prefix; `last` là đoạn duy nhất còn có thể giao future. 10. empty→clone/sort→seed→scan. 11. **Code:** dùng `mergeClosedIntervals` ở trên. 12. Clone từng pair vì cập nhật `last[1]`; chỉ clone outer array vẫn mutate pair gốc. `Math.max` xử lý interval nằm trọn. 13. **Dry run:**

| Bước | Item/index | State trước | Điều kiện | Hành động | State sau |
| --- | --- | --- | --- | --- | --- |
| sort | — | input | `(left,right)` tăng | reorder | `[[1,3],[2,6],[5,7],[9,10]]` |
| seed | `[1,3]` | `[]` | first | push | `[[1,3]]` |
| 1 | `[2,6]` | last `[1,3]` | `2<=3` | extend | `[[1,6]]` |
| 2 | `[5,7]` | last `[1,6]` | `5<=6` | extend | `[[1,7]]` |
| 3 | `[9,10]` | last `[1,7]` | `9>7` | open | `[[1,7],[9,10]]` |

14. `O(n log n)` time, `O(n)` extra. 15. Empty input; `<` thay vì `<=`; chỉ gán right mới làm co đoạn; mutate nested input; sort sai key. 16. Interval nửa mở `[l,r)` đổi overlap thành `left < lastRight`; nếu chỉ đếm số nhóm có thể giữ current thay vì output.

**Recall Card `[SORT-04]`:** sort key → prefix summary → local check. **Blank Page:** merge `[[1,4],[4,5],[-2,0]]`. **Mutation:** half-open; count groups; nearest adjacent. **Explain Back:** vì sao chỉ so `last`? Vì sao cần `Math.max`? Khi sort không đáng giá?

## Dạng 5 `[SORT-05]` — Coordinate compression

### A. Bản chất

Compression thay mỗi value bằng rank trong tập value phân biệt, bảo toàn thứ tự và quan hệ bằng nhau. Nó không phải chia tỷ lệ: khoảng cách số học thường bị mất. Dùng khi value rất lớn/thưa nhưng thuật toán sau chỉ cần order/equality hoặc index gọn.

### B. Mental model

Đổi tên các tầng nhà đang mang số `-100, 50, 1_000_000` thành tầng `0,1,2`; thứ tự giữ nguyên, khoảng cách mét không giữ.

### C. Template tư duy

```text
Clone + numeric sort values.
Loại duplicate để có sortedUnique.
Map value -> dense rank 0..k-1.
Transform input theo original order.
Invariant: x<y iff rank(x)<rank(y); x=y iff rank(x)=rank(y).
```

### D. Template code

```js
function compressCoordinates(values) {
  const sortedUnique = [...new Set(values)].sort((a, b) => a - b);
  const rankByValue = new Map(
    sortedUnique.map((value, rank) => [value, rank])
  );
  return values.map((value) => rankByValue.get(value));
}
```

### E. Bài mẫu — Rank dày theo thứ tự gốc

1. **Đề:** rank nhỏ nhất là 0; equal value cùng rank; output theo input order. 2. `[50,-10,50,7]→[2,0,2,1]`. 3. Cần hai order: sorted order để gán rank, original order để output. 4. Với mỗi value đếm số distinct nhỏ hơn O(n²). 5. Duplicate dễ bị rank cách quãng. 6. sorted unique + Map. 7. `sortedUnique`, `rankByValue`, output. 8. map mỗi original value. 9. Map chứa đúng bijection giữa distinct values và ranks `0..k-1`; output prefix tra đúng map. 10. dedupe→numeric sort→build map→transform. 11. **Code:** dùng `compressCoordinates` ở trên. 12. Dedupe trước hay sau sort đều được; `Set` dùng SameValueZero, phù hợp số hữu hạn thông thường. Output không phụ thuộc thứ tự `Set` vì ta sort. 13. **Dry run:**

| Bước | Item/index | State trước | Điều kiện | Hành động | State sau |
| --- | --- | --- | --- | --- | --- |
| unique | — | `[50,-10,50,7]` | remove equal | build | `[50,-10,7]` |
| sort | — | unique | numeric asc | reorder | `[-10,7,50]` |
| rank | `-10,7,50` | empty Map | index rank | set | `-10→0,7→1,50→2` |
| output | originals | `[]` | lookup | map | `[2,0,2,1]` |

14. `O(n log n)` time, `O(n)` space. 15. Default sort; không dedupe; trả sorted ranks thay original order; dùng object key gây coercion; tưởng rank difference là value difference. 16. Rank 1-based cộng 1; competition ranking cần rank theo sorted positions nên có khoảng trống và là contract khác.

**Recall Card `[SORT-05]`:** distinct → sorted → rank Map → original order. **Blank Page:** `[100,100,-5,20]`. **Mutation:** 1-based; strings; competition rank. **Explain Back:** thuộc tính nào được bảo toàn? Vì sao cần original pass? Khi Map rank hữu ích?

## Template Contrast

| Dấu hiệu | `SORT-03` decoration | `SORT-05` compression |
| --- | --- | --- |
| Cần giữ identity từng occurrence | Có | Không, duplicate chung rank |
| Output thường dựa trên | metadata gắn từng item | rank của value |
| Duplicate | vẫn là nhiều record | co về một coordinate |
| Câu hỏi tự kiểm | “item này từ đâu?” | “value này đứng thứ mấy?” |

## Transfer Test B

Làm [S05-T02](03_Practice_Ladder.md#s05-t02--mã-cảm-biến).
