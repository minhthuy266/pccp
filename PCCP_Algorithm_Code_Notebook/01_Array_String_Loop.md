# 01 — Array, String và Loop: dựng state trong một lượt quét

> Trạng thái: `ARR-01..07` hoàn thiện v1. Không mở solutions trước khi lưu nỗ lực.

## Điều hướng

1. [Scan và quyết định](chapters/01_array_string_loop/01_Scan.md): `ARR-01..04`.
2. [Xây output, duyệt ngược và run](chapters/01_array_string_loop/02_Sequences.md): `ARR-05..07`.
3. [Practice Ladder](chapters/01_array_string_loop/03_Practice_Ladder.md).
4. [Lời giải](solutions/01_Array_String_Loop_Solutions.md).
5. [QA chương](chapters/01_array_string_loop/QA.md).

## Câu hỏi chọn bộ xương

| Contract | Coverage ID | State tối thiểu |
| --- | --- | --- |
| Gộp mọi phần tử thành một giá trị | `ARR-01` | accumulator |
| Chọn phần tử tốt nhất và xử lý hòa | `ARR-02` | best value + best index |
| Đếm phần tử thỏa độc lập | `ARR-03` | count |
| Chỉ cần biết tồn tại/tất cả | `ARR-04` | early return hoặc boolean |
| Tạo/lọc output | `ARR-05` | result array/string |
| Tương lai của current nằm bên phải | `ARR-06` | suffix state, scan ngược |
| Đo/chốt đoạn liên tiếp | `ARR-07` | current run + best + flush |

Loop không phải pattern “thấp cấp”: vị trí invariant được chọn ở đầu hay cuối vòng quyết định khởi tạo, biên và thứ tự update. `map`, `filter`, `reduce` chỉ là cú pháp; trong phòng thi hãy dùng cách làm khiến state và edge case dễ kiểm tra nhất.

## Template tư duy chung

```text
Duyệt index hay value? Có cần vị trí/tie không?
State trước vòng i mô tả prefix/suffix nào?
Current được đọc trước hay sau condition?
Transition có thay một biến hay nhiều biến đồng bộ?
Có thể early return không?
Empty input trả gì theo contract?
Vòng bắt đầu/kết thúc ở đâu và vì sao?
```

## Template Contrast nhanh

| Dạng | State | Condition | Transition | Return |
| --- | --- | --- | --- | --- |
| `ARR-01` | giá trị gộp | thường không branch | combine | accumulator |
| `ARR-02` | ứng viên tốt nhất | better/tie | replace best | value/index |
| `ARR-03` | số lượng | predicate | increment | count |
| `ARR-04` | chưa có chứng cứ ngược | witness/counterexample | early return | boolean |
| `ARR-05` | output đã xây | include/transform | push/append | collection |
| `ARR-06` | thông tin suffix | phụ thuộc bên phải | scan phải→trái | array/value |
| `ARR-07` | run hiện tại | same/continue? | extend hoặc flush/reset | best/runs |

## Checklist tạm thành thạo

- [ ] Nhận diện đúng ít nhất 80% bài cơ bản.
- [ ] Tự nói được state và transition.
- [ ] Viết bảy skeleton từ trang trắng.
- [ ] Làm đúng 3 bài cơ bản liên tiếp.
- [ ] Làm được ít nhất 2 bài biến thể.
- [ ] Sau 3 ngày vẫn tự viết lại được.
- [ ] Giải thích được invariant và biên vòng lặp.

## Mastery Gate

Chương chỉ tạm thành thạo khi ít nhất 6/7 ID đạt mức 3, ít nhất 5/7 đạt mức 4, qua hai Transfer/Mixed Test liên tiếp, không xem full code và giải thích được invariant. Nếu sai tie quay lại `ARR-02`; sai biên/sentinel quay lại `ARR-06/07`; code đúng nhưng không giải thích được thì mức tối đa là 2.
