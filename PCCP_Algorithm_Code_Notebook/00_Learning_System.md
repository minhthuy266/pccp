# 00 — Learning System

## 1. Đơn vị học không phải là “một đoạn code”

Một template chỉ được coi là đã học khi bạn có thể phục hồi chuỗi sau mà không nhìn:

```text
Tín hiệu đề → bottleneck của brute force → state tối thiểu
→ check → update/transition → invariant → return → test làm lộ lỗi
```

`State` là phần quá khứ tối thiểu mà tương lai còn cần. `Transition` là quy tắc biến state cũ thành state mới khi đọc một phần tử/event. `Invariant` là câu luôn đúng tại một vị trí xác định trong vòng lặp; nó giải thích vì sao code không bỏ sót hoặc đếm trùng.

Mỗi phiên phải ghi Coverage ID (ví dụ `MAP-05`), không chỉ ghi “Map”. ID nối cùng một skeleton giữa lý thuyết, practice, solution, recall, error log và mixed test.

## 2. Phiếu trang trắng trước khi code

```text
Contract/return:
Constraint và complexity cho phép:
Brute force:
Việc nào bị lặp lại?
Duyệt qua:
State (nghĩa từng biến):
Check:
Update:
Invariant (trước hoặc sau mỗi vòng):
Edge cases:
```

Nếu không điền được “nghĩa từng biến”, chưa được gõ code. Tên pattern đúng nhưng state mơ hồ chưa phải là lời giải.

## 3. Active recall trong một phiên

1. Đọc đề tối đa hai lượt; tự diễn giải contract bằng một câu.
2. Đóng phần lý thuyết, điền phiếu trang trắng trong 5–10 phút.
3. Tự tạo test nhỏ nhất, test trùng lặp và test biên.
4. Dry run bằng `state trước → check → action → state sau`.
5. Code từ file trắng; không sửa ý tưởng ngẫu nhiên theo sample.
6. Khi sai, thu nhỏ test tới bước đầu tiên invariant bị phá.
7. Chỉ mở đúng mức gợi ý cần thiết; ghi mức gợi ý vào log.
8. So lời giải, rồi đóng nó và viết lại đoạn xương.

## 4. Cách dùng Practice Ladder

- **Tầng 1 – Nhận diện:** chưa cần thuật toán hoàn chỉnh; chọn pattern và thông tin phải nhớ.
- **Tầng 2 – Điền khuyết:** luyện điểm dễ sai của template: khởi tạo, check, update, return.
- **Tầng 3 – Dựng logic:** không code; bắt buộc viết state bằng câu có nghĩa.
- **Tầng 4 – Pseudocode:** biến state thành thứ tự thao tác, đặc biệt check/update.
- **Tầng 5 – Tự code:** đề không ghi pattern; đo cả thời gian và test tự tạo.
- **Tầng 6 – Biến thể/trộn:** sửa state thay vì chép template.

Chỉ lên tầng khi làm đúng ít nhất 80% tầng hiện tại mà không nhìn gợi ý.

## 5. Giao thức xem lời giải

Trước khi mở `solutions/`, phải lưu lại: ý tưởng đã thử, state đã chọn, test đang sai và bước đầu tiên state lệch. Sau khi xem:

1. Đánh dấu **khác biệt đầu tiên** giữa hai cách nghĩ.
2. Nói tại sao dòng check nằm trước/sau update.
3. Đóng đáp án và viết lại pseudocode.
4. Sau ít nhất 20 phút, code lại từ trang trắng.
5. Nếu vẫn cần nhìn, đặt lại lịch D1 và ghi lỗi “không tự dựng lại được”.

## 6. Spaced review có hành động

| Mốc | Không nhìn tài liệu | Sau đó kiểm tra | Điều kiện qua |
| --- | --- | --- | --- |
| Ngay sau học | Nói 5 ô Recall Card; code xương | So invariant và thứ tự check/update | Không thiếu state |
| D+1 | Blank Page Test + một test tự tạo | Chạy test, mở tối đa pseudocode | Xương đúng trong 12 phút |
| D+3 | Một bài cơ bản mới | So solution; ghi error log | Đúng không quá hint 2 |
| D+7 | Một mutation drill + giải thích bằng lời | Kiểm tra counterexample | Sửa đúng state/check/update |
| D+14 | Mini-test trộn timed | Chấm rubric | ≥80%, tự chứng minh invariant |

Mỗi lần ôn phải đổi ít nhất một yếu tố: input, tên biến, kiểu return, tie-break, điều kiện hợp lệ, index/value, tìm một→đếm tất cả, dữ liệu thường→đã sort, hoặc pattern đơn→combination. Không chép lại cùng một lời giải như một bài luyện mới.

## 7. Rubric tự chấm 10 điểm

| Hạng mục | Điểm |
| --- | ---: |
| Contract và edge case đúng | 1 |
| Chọn pattern có lý do | 1 |
| State đủ, nghĩa biến rõ | 2 |
| Check/update đúng thứ tự | 2 |
| Invariant kiểm chứng được | 1 |
| Code và complexity đúng | 2 |
| Tự tạo test làm lộ bẫy | 1 |

8/10 mới tính là qua. Code AC nhưng không nói được state/invariant tối đa 7/10.

## 8. Mastery level cho từng Coverage ID

| Mức | Bằng chứng |
| ---: | --- |
| 0 | Chưa nhận diện được |
| 1 | Nhìn lời giải thì hiểu |
| 2 | Tự dựng state và pseudocode |
| 3 | Tự code bài cơ bản |
| 4 | Làm biến thể/đề trộn sau 3–7 ngày |

Chỉ tính ID “đã học” từ mức 3. Chỉ mở khóa chương kế khi ≥80% CORE đạt 3, ≥60% CORE đạt 4, qua hai Transfer/Mixed Test liên tiếp, không xem full code và giải thích được invariant.

## 9. Khi bị kẹt

- Không nhận diện được: viết brute force và khoanh thao tác lặp.
- Biết Map/Set nhưng không biết lưu gì: hỏi “tương lai cần truy vấn câu gì về quá khứ?”.
- Sample sai: trace từ state ban đầu, không vá output.
- Hidden test sai: thử empty/minimum, tất cả giống nhau, không có đáp án, đáp án ở đầu/cuối, số 0, key có value 0, tie.
- Xem lời giải thấy hiểu nhưng không viết lại được: đây là lỗi recall, không phải đã học; quay về Tầng 2–3.
