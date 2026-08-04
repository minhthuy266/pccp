# Chapter 05 — Practice Ladder

[← Index](../../05_Sorting.md) · [Lời giải](../../solutions/05_Sorting_Solutions.md)

## Tầng 1 — Nhận diện (12)

Với mỗi đề, ghi ID, comparator/sort key, state sau sort và lý do sort có ích.

### S05-R01 `[SORT-01]`
Sắp `[2,10,-1]` tăng dần; chỉ ra lỗi nếu bỏ comparator.
### S05-R02 `[SORT-01]`
Lấy ba số lớn nhất nhưng không được đổi input; chọn clone/sort hay scan tùy contract.
### S05-R03 `[SORT-02]`
Xếp sinh viên theo điểm giảm, thời gian tăng, tên tăng.
### S05-R04 `[SORT-02]`
Xếp task theo category tùy chỉnh HIGH,MEDIUM,LOW rồi deadline tăng.
### S05-R05 `[SORT-03]`
Trả index gốc của values sau sort; duplicate làm `indexOf` sai.
### S05-R06 `[SORT-03]`
Equal score phải giữ input order một cách explicit.
### S05-R07 `[SORT-04]`
Sau sort, phát hiện có duplicate bằng hai hàng xóm.
### S05-R08 `[SORT-04]`
Gộp interval đóng; endpoint chạm nhau được gộp.
### S05-R09 `[SORT-04]`
Kiểm tra có string nào là prefix của string kế tiếp sau lexicographic sort.
### S05-R10 `[SORT-05]`
Đổi các tọa độ thưa thành dense rank 0-based.
### S05-R11 `[SORT-01/SORT-03]`
Đề cấm mutate và cần original index: clone values rồi `indexOf`, hay decorate trước?
### S05-R12 `[SORT-01]`
Chỉ cần min/max của toàn array; giải thích vì sao sort không phải lựa chọn tốt nhất.

## Tầng 2 — Điền khuyết (3)

### S05-F01 `[SORT-01]`
```js-fill
const ascending = [...values].sort((first, second) => ___);
const descending = [...values].sort((first, second) => ___);
```

### S05-F02 `[SORT-02]`
```js-fill
records.sort((a, b) => {
  if (a.score !== b.score) return ___;
  if (a.time !== b.time) return ___;
  return a.name.___(b.name);
});
```
Yêu cầu score giảm, time tăng, name tăng.

### S05-F03 `[SORT-05]`
```js-fill
const unique = [...new ___(values)].sort((a, b) => a - b);
const rank = new Map(unique.map((value, index) => [value, ___]));
return values.map((value) => rank.___(value));
```

## Tầng 3 — Dựng logic (3)

### S05-L01 `[SORT-03]`
Trả original indices theo value tăng; hòa value thì index giảm. Viết invariant về identity của duplicate.
### S05-L02 `[SORT-04]`
Gộp interval đóng, không mutate cả outer array lẫn pair con. Nêu điều kiện overlap.
### S05-L03 `[SORT-05]`
Compression rank 1-based; equal value cùng rank; output theo thứ tự gốc.

## Transfer Test A — sau ba dạng đầu

### S05-T01 — Hồ sơ giao hàng `[SORT-02/SORT-03]`

Mỗi record `{id, priority, distance, timestamp}`. Xếp `priority` giảm, `distance` tăng, nếu vẫn hòa thì input đến trước. Trả `id` theo thứ tự mới. `timestamp` chỉ là dữ liệu gây nhiễu, không dùng. Input không được mutate.

## Tầng 4 — Pseudocode (3)

### S05-P01 `[SORT-04]`
Trả minimum absolute difference và cặp original indices tạo ra nó; nếu nhiều cặp, chọn tuple indices đã sort tăng nhỏ nhất theo lexicographic.
### S05-P02 `[SORT-04]`
Cho interval nửa mở `[start,end)`, đếm số nhóm sau khi gộp; hai đoạn `[1,3)` và `[3,5)` không overlap.
### S05-P03 `[SORT-02]`
Xếp file theo extension custom rank (`js`, `ts`, `md`, còn lại), rồi size giảm, name tăng.

## Tầng 5 — Tự code (3)

### S05-C01 `[SORT-02]` — Hạng thi đấu
Records `{name, score, penalty}`. Sort score giảm, penalty tăng, name tăng; trả object kèm `position` 1-based. Mọi record chiếm một vị trí riêng.

### S05-C02 `[SORT-04]` — Lịch bảo trì
Gộp các khoảng thời gian đóng `[start,end]`; trả tổng độ dài phủ theo công thức mỗi đoạn `end-start` sau merge. Empty trả 0 và không mutate input.

### S05-C03 `[SORT-03/SORT-04]` — Cặp gần nhất có nguồn
Trả `{difference, indices}` của hai value gần nhất. `indices` luôn tăng; tie chọn tuple indices lexicographic nhỏ nhất. Input có duplicate và không được mutate.

## Tầng 6 — Biến thể (3)

### S05-V01 `[SORT-02]`
Đổi final tie từ name tăng sang original input order. State/comparator thêm gì?
### S05-V02 `[SORT-04]`
Đổi interval đóng sang nửa mở. Chính xác ký hiệu nào trong overlap condition phải đổi?
### S05-V03 `[SORT-05]`
Đổi dense rank `10,20,20,30 → 0,1,1,2` sang competition rank `1,2,2,4`. Cách gán rank đổi ra sao?

## Transfer Test B — sau hai dạng cuối

### S05-T02 — Mã cảm biến `[SORT-05]`

Mỗi reading `{deviceId, raw}`; chuẩn hóa value bằng `Math.round(raw / 5) * 5`, rồi gán dense rank 0-based cho normalized values. Trả `{deviceId, normalized, rank}` theo input order. `deviceId` không tham gia rank; input không mutate.

## Mini-test S05-M01 — 45 phút

1. **S05-M01.1 `[SORT-02]`:** ghép các số không âm thành chuỗi lớn nhất; comparator so `b+a` với `a+b`; nếu kết quả toàn zero trả `"0"`.
2. **S05-M01.2 `[SORT-04]`:** đếm số phòng tối thiểu cho meetings nửa mở `[start,end)`; meeting kết thúc đúng lúc meeting khác bắt đầu có thể dùng lại phòng.
3. **S05-M01.3 `[SORT-02]`:** sort words theo length tăng rồi lexicographic tăng, trả array mới và chứng minh input giữ nguyên.
