# Handoff — PCCP Algorithm Code Notebook

> Cập nhật: 2026-08-05 (Asia/Ho_Chi_Minh)

## Mục tiêu còn hiệu lực

Hoàn thiện toàn bộ notebook theo `PATTERN_COVERAGE_MATRIX.md`, lần lượt từng chương, với lý thuyết sâu, Practice Ladder, lời giải, Transfer Test, Mastery Gate và QA. Chỉ đổi một ID sang `FULL` sau khi đã chứng minh đủ liên kết theory → practice → solution → recall và các kiểm tra chương đều đạt.

## Trạng thái đã khóa

- Chapter 01: `ARR-01..07` — **FULL**.
- Chapter 02: `MAT-01..05` — **FULL**.
- Chapter 03: `MAP-01..14` — **FULL**.
- Chapter 04: `SIM-01..05` — **FULL**.
- Chapter 05: `SORT-01..05` — **FULL**, có QA tại `chapters/05_sorting/QA.md`.
- Coverage hiện tại: **36/83 FULL**, **47 PLANNED**.
- Nội dung hiện có: **151 nhiệm vụ + 11 Transfer Tests**.
- QA gần nhất: 54 Markdown files, 6.797 lines, 119 JavaScript fences, 0 syntax error, 111 local links, 0 broken link.

Không đánh dấu toàn bộ goal hoàn thành; các chương 06–12 và Mixed Tests vẫn còn thiếu.

## Điểm dừng hiện tại

Đã bắt đầu Chapter 06 — Two Pointers nhưng chưa viết nội dung:

- Đã tạo thư mục rỗng `chapters/06_two_pointers/`.
- `06_Two_Pointers.md` và `solutions/06_Two_Pointers_Solutions.md` vẫn là stub.
- `TP-01..06` vẫn đúng là `PLANNED`; không có trạng thái `FULL` sớm.
- Plan hiện tại đang ở bước viết theory `TP-01..06` và Mastery Gate.

## Scope bắt buộc của Chapter 06

Theo Coverage Matrix:

1. `TP-01` — hai đầu đi vào; sorted pair/palindrome; chứng minh loại một phía theo monotonic rule.
2. `TP-02` — fast/slow cùng chiều; compact/filter in-place.
3. `TP-03` — loại duplicate trên sorted array; read/write/last.
4. `TP-04` — merge hoặc giao hai dãy đã sort; advance smaller/both.
5. `TP-05` — pair sum và Three Sum với outer loop + left/right.
6. `TP-06` — partition cơ bản theo predicate/pivot.

Quota tối thiểu theo Manifest: `10R/3F/3L/3P/3C/2V/1M`. Nên giữ chuẩn các chương gần nhất là **12R/3F/3L/3P/3C/3V/1M + 2 Transfer Tests**, trừ khi có lý do nội dung rõ ràng để khác.

## Trình tự làm tiếp

1. Thay root stub `06_Two_Pointers.md` bằng index, map chọn dạng, JavaScript notes và Mastery Gate; vẫn ghi “đang hoàn thiện” cho tới QA.
2. Viết hai theory files, gợi ý:
   - `chapters/06_two_pointers/01_Inward_Compact.md` cho `TP-01..03`.
   - `chapters/06_two_pointers/02_Merge_Pair_Partition.md` cho `TP-04..06`.
3. Mỗi ID phải có A–E, bài mẫu 16 bước, bảng dry run 6 cột, Recall Card, Blank Page, Mutation và Explain Back.
4. Viết `03_Practice_Ladder.md`, đủ quota và hai Transfer Tests; mọi ID bài dùng prefix `S06-*`.
5. Thay solution stub bằng lời giải cho toàn bộ `S06-*`; mỗi lời giải có signal/pattern, state, check/update, invariant, full code, dry run, complexity, traps/recall.
6. So khớp tập Practice IDs và Solution IDs; parse toàn bộ `js` fences; chạy behavioral tests cho cả sáu dạng và hai Transfer Tests; kiểm tra mọi local link.
7. Tạo `chapters/06_two_pointers/QA.md` chỉ sau khi test đạt.
8. Sau QA mới đổi `TP-01..06` sang `FULL`, cập nhật README, MANIFEST và báo cáo Coverage Matrix. Khi đó dự kiến **42/83 FULL**, **41 PLANNED**; cộng số bài thực tế của Chapter 06 vào báo cáo.
9. Chương tiếp sau: Chapter 07, xử lý `PRE-01..05` và `SW-01..06` theo ranh giới nội dung rõ ràng.

## Quy ước chất lượng cần giữ

- JavaScript code hoàn chỉnh dùng fence `js`; bài điền khuyết dùng `js-fill` để parser không xem là code hợp lệ.
- Không dùng lời giải kiểu “xem theory”; mỗi exercise phải có implementation đầy đủ hoặc lời giải tự chứa tương đương.
- Nêu rõ input mutation, empty/singleton, duplicate/tie, pointer termination và điều kiện tiên quyết “array đã sort”.
- Với Two Pointers, invariant phải giải thích vì sao bước dịch pointer không bỏ sót đáp án; không chỉ mô tả code.
- Dùng `apply_patch` cho mọi chỉnh sửa file; giữ nguyên các thay đổi ngoài notebook của người dùng.
- Notebook hiện là untracked directory (`?? PCCP_Algorithm_Code_Notebook/`); chưa commit và không tự ý publish.

## Kế hoạch cấp cao còn lại

- Hoàn thiện Chapter 06 và QA.
- Hoàn thiện PRE/SW.
- Hoàn thiện SQ/BS/BFS.
- Hoàn thiện HG/BTD/Mixed Tests.
- Chạy completion audit cuối cho đủ 83 IDs trước khi gọi goal complete.
