# PCCP Algorithm Code Notebook – Từ hiểu đến tự viết được

> **Đây là tầng drill sâu, không phải entrypoint học. Chỉ mở từ D26, sau khi đã hoàn tất Past Set B ở D24.** Quay về [PCCP 700+ Master Navigator](../PCCP_700_MASTER_NAVIGATOR.md) để biết đúng pattern cần repair. Các atlas/catalog/solution bên dưới có thể làm lộ tên hoặc pattern của past set; `CONTINUATION_CONTEXT.md`/`HANDOFF.md` chỉ là baseline authoring lịch sử.

Đây là notebook luyện **chuyển đề bài thành state, transition, invariant và code JavaScript từ trang trắng**. Nó không thay thế kho bài hay cheatsheet. Nó biến kiến thức tra cứu thành bài tập active recall có đáp án tách riêng.

## Đích thực sự: tự giải đề PCCP

Không gọi notebook là hoàn thiện khi chỉ có template. Đọc [Chuẩn thành thạo PCCP](00_MASTERY_STANDARD.md) để biết mỗi bài phải học đến mức nào, và dùng [Danh mục đề PCCP công khai](PCCP_PUBLIC_PROBLEM_CATALOG.md) để biết chính xác đề nào đã có bài học/lời giải, đề nào còn thiếu.

**Khi Navigator giao một drill notebook:** dùng [Bản đồ pattern PCCP](PCCP_EXAM_PATTERN_ATLAS.md) hoặc chapter được link để tra đúng cluster. Trang này giải thích pattern theo dấu hiệu của đề thật, state cần giữ và các đề PCCP tương ứng; catalog chỉ dùng để kiểm tra coverage sau đó.

> Nhìn code thấy hiểu ≠ tự viết được.  
> Nhớ lời giải ≠ hiểu pattern.  
> Chỉ được tính là đã học khi đóng đáp án và tự dựng lại được.

## Khi Navigator giao notebook drill

1. Đọc nhanh [00_Learning_System.md](00_Learning_System.md) và hợp đồng [Core → Template → Variants](00_CORE_TEMPLATE_VARIANTS_FRAMEWORK.md) ở lần đầu dùng notebook.
2. Chỉ mở chapter/pattern được Navigator hoặc Error Log chỉ định; không tự học tuần tự toàn bộ notebook.
3. Tự làm practice trước, rồi mới mở solution cùng ID sau khi đã ghi nỗ lực và test.
4. Tiến độ sprint vẫn ghi ở tracker/error log root; review schedule notebook chỉ dùng cho drill sâu được chọn.

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

Crosswalk máy đọc được nối toàn bộ 89 Coverage ID với 24 Pattern Family và 67 bài official nằm tại [Notebook–Pattern–Official Crosswalk](NOTEBOOK_PATTERN_OFFICIAL_CROSSWALK.csv). `npm run check:notebook-integration` sẽ fail nếu một ID, family hoặc bài official bị rơi/map sai.

Release hiện tại đã đạt `89/89 FRAMEWORK-FULL`, có [8 Mixed Tests + 4 gate 120 phút](90_Mixed_Pattern_Tests.md). Số behavioral test hiện hành lấy từ `npm test`, không hardcode trong Navigator; chạy `npm run check:all` để kiểm toàn bộ framework, crosswalk, pattern, official lesson, release boundary, JavaScript và test suite.

Từ 11/08/2026, `FULL` lịch sử và `FRAMEWORK-FULL` được audit riêng. Một pattern chỉ đạt standard mới khi đủ Core, Recognition, Brute force, State, Invariant, Transition, Template, Variants, Dry run, Complexity, Transfer cùng practice/solution/QA; xem [Framework Coverage Audit](FRAMEWORK_COVERAGE_AUDIT.md). Pilot chuẩn là [`SQ-02`](chapters/08_stack_queue/01_Stack_Monotonic.md#sq-02--monotonic-stack-các-index-chưa-được-giải-quyết).

| File | Trọng tâm | Trạng thái |
| --- | --- | --- |
| [00_Learning_System.md](00_Learning_System.md) | Active recall, blank-page, review, cách dùng lời giải | Hoàn thiện v1 |
| [00_CORE_TEMPLATE_VARIANTS_FRAMEWORK.md](00_CORE_TEMPLATE_VARIANTS_FRAMEWORK.md) | Hợp đồng canonical pattern, bài cụ thể và tiêu chí FRAMEWORK-FULL | **Standard đã khóa** |
| [01_Array_String_Loop.md](01_Array_String_Loop.md) | `ARR-01..07` | **7/7 FRAMEWORK-FULL** |
| [02_Matrix.md](02_Matrix.md) | `MAT-01..05` | **5/5 FRAMEWORK-FULL** |
| [03_Map_Set.md](03_Map_Set.md) | `MAP-01..14` | **14/14 FRAMEWORK-FULL** |
| [04_Simulation.md](04_Simulation.md) | `SIM-01..05` | **5/5 FRAMEWORK-FULL** |
| [05_Sorting.md](05_Sorting.md) | `SORT-01..05` | **5/5 FRAMEWORK-FULL** |
| [06_Two_Pointers.md](06_Two_Pointers.md) | `TP-01..06`: hai con trỏ và chứng minh không bỏ sót | **6/6 FRAMEWORK-FULL** |
| [07_Sliding_Window_Prefix_Sum.md](07_Sliding_Window_Prefix_Sum.md) | `PRE-01..05`, `SW-01..06`: prefix, difference và cửa sổ | **11/11 FRAMEWORK-FULL** |
| [08_Stack_Queue.md](08_Stack_Queue.md) | `SQ-01..05`: LIFO, monotonic stack, FIFO, circular queue, BFS queue | **5/5 FRAMEWORK-FULL** |
| [09_Binary_Search.md](09_Binary_Search.md) | `BS-01..05`: exact, boundary và answer space | **5/5 FRAMEWORK-FULL** |
| [10_BFS_DFS.md](10_BFS_DFS.md) | `BFS-01..07`, `TREE-01`: traversal, shortest và tree | **8/8 FRAMEWORK-FULL** |
| [11_Heap_Greedy.md](11_Heap_Greedy.md) | `HG-01..05`: heap, scheduling và greedy proof | **5/5 FRAMEWORK-FULL** |
| [12_Backtracking_DP_Basic.md](12_Backtracking_DP_Basic.md) | `BTD-01..08`: search tree, memo, DP và engine contrast | **8/8 FRAMEWORK-FULL** |
| [13_Advanced_Graph.md](13_Advanced_Graph.md) | `GR-01..05`: Dijkstra, MST/DSU, closure, Euler và planar topology | **5/5 FRAMEWORK-FULL** |
| [90_Mixed_Pattern_Tests.md](90_Mixed_Pattern_Tests.md) | 8 đề trộn + 4 gate official public, không báo pattern | **Hoàn thiện v1** |

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

**Nguồn đã rà:** `README.md`, `PLAN_PCCP_700_REBUILD_2026-09-12.md`, `PROBLEM_BANK.csv`, tracker/error-log CSV, `docs/CHEATSHEET_THUAT_TOAN_JS_PCCP.md`, ba tài liệu trong `docs/pccp-700-roadmap/`, `BASIC.js`, ba bộ Level 1 DOCX/PDF và archive. Các file `locked/` không được mở để bảo vệ mock.
