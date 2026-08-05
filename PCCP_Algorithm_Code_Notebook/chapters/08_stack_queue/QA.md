# QA — Chapter 08 Stack và Queue

[← Index](../../08_Stack_Queue.md)

## Coverage lock

- [x] `SQ-01..05` có A–E, bài mẫu 16 bước, dry run sáu cột và recall drills.
- [x] Practice đủ `12R/3F/3L/3P/3C/3V/1M` = 30 nhiệm vụ khi mini-test tính ba phần, cộng 2 Transfer Tests.
- [x] Practice và Solution khớp đủ 32 ID `S08-*`.
- [x] Solutions phân biệt order, state, check/update, invariant, complexity và traps.
- [x] Coverage chỉ đổi sang `FULL` sau các kiểm tra dưới đây.

## JavaScript và hành vi

- [x] 167 JavaScript fences toàn notebook parse được; 0 syntax error.
- [x] Bracket/undo/postfix và strict/greater-or-equal monotonic stack qua test.
- [x] Head-index, round-robin, batching và circular wrap/full/empty/capacity-1 qua test.
- [x] BFS single/multi-source, grid và rollback log qua test; mark khi enqueue.
- [x] Hai Transfer Tests qua behavioral assertions.

Kết quả: **16/16 behavioral assertions pass**, **0 syntax error**.

## Liên kết và kết luận

- [x] 0 broken local links; root → theory → practice → solution → QA tồn tại.
- [x] `BASIC.js` ngoài notebook được khôi phục nguyên byte, không còn deletion.

`SQ-01..05` đủ điều kiện `FULL`. Chapter 07 vẫn `PLANNED` và sẽ được làm sau theo thứ tự ưu tiên mới.

