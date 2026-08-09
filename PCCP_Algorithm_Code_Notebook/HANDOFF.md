# Handoff — PCCP Algorithm Code Notebook

> **Context tiếp tục mới nhất:** đọc toàn bộ [CONTINUATION_CONTEXT.md](CONTINUATION_CONTEXT.md) trước khi sửa notebook. File đó là nguồn chỉ dẫn chính cho các phiên sau và ghi lại workflow concept-first được người học yêu cầu.

> Cập nhật: 2026-08-05 (Asia/Ho_Chi_Minh)

## Mục tiêu còn hiệu lực

Hoàn thiện notebook theo `PATTERN_COVERAGE_MATRIX.md`, từng chương một. Chỉ đổi ID sang `FULL` sau khi theory → practice → solution → recall và QA đều đạt.

## Trạng thái đã khóa

- Chapter 01–06 đã **Hoàn thiện v1**.
- Coverage: **47/83 FULL**, **36 PLANNED**.
- Nội dung: **211 nhiệm vụ + 15 Transfer Tests**.
- Chapter 06 có đủ `12R/3F/3L/3P/3C/3V/1M + 2 Transfer Tests`.
- QA Chapter 06: 143 JavaScript fences, 0 syntax error; 16/16 behavioral assertions pass; Practice/Solution khớp 32 ID; local links không gãy.

## Điểm dừng hiện tại

Theo ưu tiên mới, Chapter 08 — Stack/Queue đã hoàn tất và có QA: 32/32 Practice–Solution IDs, 167 JS fences không lỗi, 16/16 behavioral assertions. `SQ-01..05` đã `FULL`. Chapter 07 vẫn là stub; `PRE-01..05`, `SW-01..06` còn `PLANNED`.

## Scope vừa hoàn tất — Chapter 08

Chapter 08 đã khóa tại `chapters/08_stack_queue/QA.md`. Không sửa trạng thái `SQ-*` nếu chưa chạy lại QA sau thay đổi code.

## Scope kế tiếp khi quay lại Chapter 07

1. `PRE-01..05`: prefix sum 1D, range query, prefix frequency/count, difference array và boundary/index convention.
2. `SW-01..06`: fixed window, variable window, count state, deque preview, invariant add/remove, contrast window với two pointers/prefix.
3. Giữ quota Manifest tối thiểu; ưu tiên chuẩn `12R/3F/3L/3P/3C/3V/1M + 2 Transfer Tests`.
4. Tách theory thành cụm Prefix và Sliding Window; mỗi ID vẫn phải có A–E, bài mẫu 16 bước, dry run sáu cột, recall drills.
5. Chỉ tạo QA và đổi `FULL` sau syntax, behavioral, ID-set và link audits.

## Quy ước chất lượng

- Full JavaScript dùng `js`; bài khuyết dùng `js-fill`.
- Solution không được chỉ trỏ ngược về theory; bài code phải có implementation tự chứa.
- Nêu rõ mutation, empty/singleton, duplicate/tie, boundary và termination.
- Invariant phải giải thích tính đúng, không chỉ kể lại code.
- Giữ nguyên mọi thay đổi ngoài notebook; không tự commit hoặc publish.

## Kế hoạch còn lại

- Hoàn thiện PRE/SW.
- Hoàn thiện SQ/BS/BFS.
- Hoàn thiện HG/BTD/Mixed Tests.
- Completion audit đủ 83 IDs trước khi gọi goal complete.
