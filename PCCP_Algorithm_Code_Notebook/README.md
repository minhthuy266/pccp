# PCCP Algorithm Code Notebook – Từ hiểu đến tự viết được

> Tiếp tục xây notebook ở phiên mới: đọc [CONTINUATION_CONTEXT.md](CONTINUATION_CONTEXT.md) trước, sau đó đọc [HANDOFF.md](HANDOFF.md).

Đây là notebook luyện **chuyển đề bài thành state, transition, invariant và code JavaScript từ trang trắng**. Nó không thay thế kho bài hay cheatsheet. Nó biến kiến thức tra cứu thành bài tập active recall có đáp án tách riêng.

> Nhìn code thấy hiểu ≠ tự viết được.  
> Nhớ lời giải ≠ hiểu pattern.  
> Chỉ được tính là đã học khi đóng đáp án và tự dựng lại được.

## Bắt đầu ở đâu

1. Đọc [00_Learning_System.md](00_Learning_System.md).
2. Xem [PATTERN_COVERAGE_MATRIX.md](PATTERN_COVERAGE_MATRIX.md), rồi học chương ưu tiên [03_Map_Set.md](03_Map_Set.md).
3. Chỉ mở [solutions/03_Map_Set_Solutions.md](solutions/03_Map_Set_Solutions.md) sau khi đã ghi lại nỗ lực của mình.
4. Đặt lịch trong [98_Review_Schedule.md](98_Review_Schedule.md) và ghi lỗi vào [99_Personal_Error_Log.md](99_Personal_Error_Log.md).

## Quy trình học một chương

| Vòng | Việc phải làm | Sản phẩm nhìn thấy được |
| --- | --- | --- |
| 1. Đọc và nhận diện | Đọc contract, constraint; chưa code | Pattern dự đoán + tín hiệu |
| 2. Dựng state | Viết `state/check/update/return` | Nghĩa chính xác của từng biến |
| 3. Dry run | Chạy tay test nhỏ và test biên | Bảng state trước/sau |
| 4. Tự code | Mở file trắng, không xem đáp án | Code chạy sample + test tự tạo |
| 5. So lời giải | So ý tưởng, invariant, thứ tự check/update | Một khác biệt quan trọng |
| 6. Đóng đáp án | Xóa/ẩn code vừa xem rồi code lại | Lần viết độc lập thứ hai |
| 7. Ôn 1–3–7–14 | Recall trước, kiểm tra sau | Review log có kết quả |
| 8. Mini-test trộn | Không đọc tên pattern | Bài timed + error log |

Nếu bí, dùng thang gợi ý: tín hiệu → câu hỏi state → invariant → pseudocode → code khuyết → full solution. Dừng ở mức đầu tiên đủ giúp đi tiếp.

## Bản đồ bộ sách và tiến độ

Chi tiết các dạng nhỏ và quota bài nằm ở [MANIFEST.md](MANIFEST.md).

ID ổn định, phân loại CORE/VARIANT/COMBINATION/OPTIONAL và trạng thái liên kết nằm trong [Coverage Matrix](PATTERN_COVERAGE_MATRIX.md). Ghi bằng chứng mức 0–4 trong [Mastery Tracker](MASTERY_TRACKER.md), và dùng [Template Contrasts](TEMPLATE_CONTRASTS.md) khi hai bộ xương dễ bị lẫn.

| File | Trọng tâm | Trạng thái |
| --- | --- | --- |
| [00_Learning_System.md](00_Learning_System.md) | Active recall, blank-page, review, cách dùng lời giải | Hoàn thiện v1 |
| [01_Array_String_Loop.md](01_Array_String_Loop.md) | `ARR-01..07` | **Hoàn thiện v1** |
| [02_Matrix.md](02_Matrix.md) | `MAT-01..05` | **Hoàn thiện v1** |
| [03_Map_Set.md](03_Map_Set.md) | `MAP-01..14` | **Hoàn thiện v1** |
| [04_Simulation.md](04_Simulation.md) | `SIM-01..05` | **Hoàn thiện v1** |
| [05_Sorting.md](05_Sorting.md) | `SORT-01..05` | **Hoàn thiện v1** |
| [06_Two_Pointers.md](06_Two_Pointers.md) | `TP-01..06`: hai con trỏ và chứng minh không bỏ sót | **Hoàn thiện v1** |
| [07_Sliding_Window_Prefix_Sum.md](07_Sliding_Window_Prefix_Sum.md) | Cửa sổ và tổng tiền tố | Khung |
| [08_Stack_Queue.md](08_Stack_Queue.md) | `SQ-01..05`: LIFO, monotonic stack, FIFO, circular queue, BFS queue | **Hoàn thiện v1** |
| [09_Binary_Search.md](09_Binary_Search.md) | Search theo tính đơn điệu | Khung |
| [10_BFS_DFS.md](10_BFS_DFS.md) | Duyệt graph/state | Khung |
| [11_Heap_Greedy.md](11_Heap_Greedy.md) | Chọn phần tử/lựa chọn cục bộ | Khung |
| [12_Backtracking_DP_Basic.md](12_Backtracking_DP_Basic.md) | Search tree và bài toán con | Khung |
| [90_Mixed_Pattern_Tests.md](90_Mixed_Pattern_Tests.md) | Đề trộn không báo pattern | Khung |

## Checklist tạm thành thạo

- [ ] Nhận diện đúng ít nhất 80% bài cơ bản.
- [ ] Tự nói được state và transition.
- [ ] Viết template từ trang trắng.
- [ ] Làm đúng 3 bài cơ bản liên tiếp.
- [ ] Làm được ít nhất 2 bài biến thể.
- [ ] Sau 3 ngày vẫn tự viết lại được.
- [ ] Giải thích được vì sao thuật toán không bỏ sót đáp án.

Nếu trượt nhận diện: quay lại Tầng 1. Nếu biết pattern nhưng không dựng được biến: Tầng 3. Nếu logic đúng mà code sai: Tầng 2 + Error Log. Nếu chỉ làm được bài giống mẫu: Tầng 6. Nếu sau ba ngày quên: Blank Page Test và đặt lại D1.

## Kết quả rà soát tài liệu cũ (04/08/2026)

Không tệp cũ nào bị sửa hoặc xóa.

**Có thể tái sử dụng:** pipeline `Contract → Bound → Brute force → Bottleneck → State → Invariant → Transition`; cảnh báo JavaScript; template Map/Set nền; Level 1 có contract/bound/code; problem bank và lịch review; taxonomy Error Log.

**Đang quá sơ sài cho mục tiêu tự giải:** phần Map/Set trong curriculum/cheatsheet chủ yếu có membership, frequency, Two Sum; dry run ngắn; chưa có practice ladder và mutation drill.

**Trùng lặp:** cheatsheet tổng hợp, final cheatsheet và JavaScript templates cùng lặp các khung frequency/membership; ba bộ Level 1 có phần đầu và một số bài giống nhau. Chúng vẫn hữu ích theo vai trò tra cứu, nhưng không nên đọc nối tiếp như ba giáo trình khác nhau.

**Cần viết lại:** biến template thành câu hỏi state; tách `firstIndex` với `latestIndex`; giải thích `has()` khác `get()`; bắt buộc check-before-update; tạo đề không gắn pattern và đáp án ở thư mục riêng.

**Nguồn đã rà:** `README.md`, `PLAN_PCCP_700_REBUILD_2026-09-05.md`, `PROBLEM_BANK.csv`, tracker/error-log CSV, `docs/CHEATSHEET_THUAT_TOAN_JS_PCCP.md`, ba tài liệu trong `docs/pccp-700-roadmap/`, `BASIC.js`, ba bộ Level 1 DOCX/PDF và archive. Các file `locked/` không được mở để bảo vệ mock.
