# QA — Chapter 01 Array, String và Loop

Ngày kiểm gần nhất: 10/08/2026.

## Đợt viết lại learner-first

- Hai file theory đã bỏ cách trình bày A–E và danh sách 16 bước dồn dập.
- Mỗi dạng hiện đi theo luồng: bài nhỏ → tìm biến cần lưu → code có giải thích → chạy tay → cách nhận diện → lỗi → tự kiểm tra.
- Thuật ngữ `state` và `invariant` chỉ được gọi tên sau khi ý nghĩa cụ thể đã xuất hiện.
- Index chương và phần mở đầu Practice Ladder đã được đổi thành hướng dẫn học có thể làm theo từng buổi.
- Giữ nguyên `ARR-01..07` và mọi mã bài tập để không làm gãy liên kết với practice, solution và tracker.

## Coverage

- 7/7 dạng `ARR-01..07` có giải thích từ ví dụ, code đầy đủ, dry run, lỗi hay gặp và bài tự kiểm tra.
- Practice: R12 / F3 / L3 / P3 / C3 / V3 / M1 (3 câu con) + 2 Transfer Test.
- Mọi mã `A01-*` khớp giữa Practice Ladder và solution.
- Cả 7 ID xuất hiện trong theory, practice, solution và Recall Card.
- Hai Transfer Test chia đúng cụm `ARR-01..04` và `ARR-05..07`, có gợi ý đóng/mở theo nhu cầu.

## Kiểm tra kỹ thuật

- [x] 16/16 behavioral assertions cho code theory viết lại đều qua.
- [x] 42 JavaScript fence trong theory, practice và solution của chương parse hợp lệ.
- [x] 12 local links trong index, theory và practice không gãy.
- [x] `git diff --check` không phát hiện whitespace error.
- [x] Tie `>`/`>=`, strict/inclusive suffix và flush/reset có revealing test.
- [x] Full code chỉ nằm trong bài mẫu lý thuyết hoặc file solution; Practice không lộ đáp án.
- [x] Coverage Matrix chỉ đổi `ARR-01..07` sang `FULL` sau QA.

## Điểm dừng

Chương 01 là chương mẫu đầu tiên theo văn phong learner-first. Khi viết lại các chương sau, ưu tiên khả năng đọc và tự làm trước quota hình thức; không quay lại kiểu liệt kê 16 mục trong một bài mẫu.
