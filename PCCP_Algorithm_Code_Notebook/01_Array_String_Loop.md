# 01 — Array, String và Loop: học cách nghĩ trước khi học pattern

> Trạng thái: `ARR-01..07` hoàn thiện v1. Không mở solutions trước khi lưu nỗ lực.

## Bắt đầu như thế nào?

Nếu bạn mới học, đừng đọc bảng ID rồi cố nhớ. Đi theo thứ tự này:

1. Đọc [Quét mảng một lần](chapters/01_array_string_loop/01_Scan.md). Phần này dùng bài nhỏ để tự tìm ra biến cần lưu, sau đó mới gọi tên `state` và `invariant`.
2. Tự làm các mục **Tự kiểm tra** ngay trong bài. Chưa cần mở lời giải.
3. Đọc [Tạo kết quả, duyệt ngược và đoạn liên tiếp](chapters/01_array_string_loop/02_Sequences.md).
4. Làm [Practice Ladder](chapters/01_array_string_loop/03_Practice_Ladder.md) theo từng tầng; chỉ mở [lời giải](solutions/01_Array_String_Loop_Solutions.md) sau khi đã lưu cách mình thử.

[QA chương](chapters/01_array_string_loop/QA.md) là ghi chép kiểm tra kỹ thuật của người viết, không phải nội dung cần học.

## Một ý duy nhất cần mang theo

Vòng lặp chỉ đọc dữ liệu. Chính các biến được giữ lại giữa hai vòng mới quyết định thuật toán.

Ví dụ khi đi qua `[4, 2, 7]`:

- hỏi tổng → giữ `total`;
- hỏi số lớn nhất → giữ `bestValue`;
- hỏi có bao nhiêu số chẵn → giữ `count`;
- hỏi có số âm không → gặp số âm thì kết luận ngay.

Đó là lý do cùng một vòng `for` nhưng có thể giải nhiều dạng bài khác nhau.

## Bản đồ bảy dạng của chương

| Contract | Coverage ID | State tối thiểu |
| --- | --- | --- |
| Gộp mọi phần tử thành một giá trị | `ARR-01` | accumulator |
| Chọn phần tử tốt nhất và xử lý hòa | `ARR-02` | best value + best index |
| Đếm phần tử thỏa độc lập | `ARR-03` | count |
| Chỉ cần biết tồn tại/tất cả | `ARR-04` | early return hoặc boolean |
| Tạo/lọc output | `ARR-05` | result array/string |
| Tương lai của current nằm bên phải | `ARR-06` | suffix state, scan ngược |
| Đo/chốt đoạn liên tiếp | `ARR-07` | current run + best + flush |

Các mã `ARR-01..07` chỉ giúp nối lý thuyết với bài tập và lời giải. Bạn không cần thuộc mã để làm bài.

## Năm câu hỏi trước khi code

```text
1. Đề bắt trả về cái gì?
2. Sau khi đọc một phần tử, mình cần nhớ lại điều gì?
3. Khi nào biến đó thay đổi?
4. Mảng rỗng hoặc chỉ có một phần tử trả gì?
5. Có trường hợp nào biết chắc đáp án và dừng sớm không?
```

Sau khi trả lời bằng tiếng Việt, mới đổi câu trả lời thành tên biến và code.

## So sánh nhanh

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

- [ ] Nhìn đề và nói được “mình cần lưu biến gì” trước khi code.
- [ ] Tự viết bảy khung từ trang trắng, không chép lại ví dụ.
- [ ] Tự tạo được test rỗng, test một phần tử và test làm lộ luật hòa.
- [ ] Làm đúng 3 bài cơ bản liên tiếp.
- [ ] Sau 3 ngày vẫn viết lại được mà không mở tài liệu.

## Khi nào nên học chương tiếp theo?

Bạn chưa cần chờ “thuộc hết”. Hãy sang chương tiếp theo khi tự giải được phần lớn bài cơ bản và giải thích được ý nghĩa các biến trong code. Nếu thường sai luật hòa, ôn lại `ARR-02`; nếu sai đầu/cuối mảng, ôn `ARR-06/07`; nếu nhìn lời giải thì hiểu nhưng đóng lại không viết được, quay về bài **Tự kiểm tra** thay vì đọc thêm lý thuyết.
