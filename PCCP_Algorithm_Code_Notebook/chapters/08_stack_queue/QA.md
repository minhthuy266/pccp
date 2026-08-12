# QA — Chapter 08 Stack và Queue

## Framework pilot — 11/08/2026

- [x] `SQ-02` là golden example của [Core → Template → Variants Framework](../../00_CORE_TEMPLATE_VARIANTS_FRAMEWORK.md), đủ Core, Recognition, Brute force, State, Invariant, Transition, hai Template, tám Variant knobs, hai dry run ngược relation, complexity amortized và transfer không lộ pattern.
- [x] Hai template JavaScript đánh dấu `TEMPLATE`/`VARIANT`: right-resolve và left-query.
- [x] Mapping giữ nguyên bài cũ: S08-C02/V01/P01, Giá cổ phiếu, Tạo số lớn và Số lớn hơn phía sau đều còn full solution; chỉ bổ sung knobs, phần giữ nguyên/thay đổi và edge case.
- [x] `tests/notebook_chapter08.test.js`: **20/20** behavioral assertions pass, gồm SQ-01..05, hai Transfer Tests, hai template canonical và ba bài Programmers monotonic.
- [x] `npm run check:notebook-framework`: JavaScript fences parse, Practice ID có solution, internal link/anchor, placeholder và bằng chứng FULL đều qua; audit hiện tại **1/83 FRAMEWORK-FULL**, **82/83 NEEDS-FRAMEWORK**.
- [x] `npm test`, `npm run check:templates`, `npm run check:notebook-framework` và `git diff --check` đều exit 0.

Kết luận pilot: giữ `SQ-02` ở trạng thái `FULL` lịch sử và đồng thời công nhận `FRAMEWORK-FULL`. Không đổi trạng thái 82 ID còn lại; [audit](../../FRAMEWORK_COVERAGE_AUDIT.md) ghi rõ từng ô thiếu để làm theo batch.

## Bổ sung mastery learner-first — 10/08/2026

- Entry point học mới: `00_Exam_Mastery_Guide.md` → `01_Core_From_Zero.md` → `02_Advanced_From_Zero.md` → Practice Ladder → đề thật.
- Lesson mới giải thích state và test phá lỗi cho matching/reduction, monotonic stack, FIFO/batch queue, BFS, priority re-enqueue, capacity/time queue, circular queue và BFS state nhiều chiều.
- Research được gắn trực tiếp vào mastery guide: Stack/Queue Kit chính thức, Practice Kit, PCCP preparation course và MDN `shift()`.
- Behavioral assertions của code lesson Stack/Queue mới: **28/28** pass; mọi fence JavaScript mới của hai chapter Map/Set + Stack/Queue: **30/30** parse hợp lệ.
- Coverage `SQ-*` cũ được giữ nguyên; learner vẫn phải qua Practice/Transfer/Mini-test để gọi là tự làm được.

[← Index](../../08_Stack_Queue.md)

## Coverage lock

- [x] `SQ-01`, `SQ-03..05` giữ nội dung A–E cũ; `SQ-02` đã chuyển toàn bộ giá trị sang canonical framework learner-first, không còn bài mẫu 16 bước nén.
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

`SQ-01..05` đủ điều kiện `FRAMEWORK-FULL`; toàn bộ 89 Coverage ID hiện đã qua framework audit.

## Concept-first extension — 09/08/2026

- [x] Có beginner guide riêng, giải thích LIFO/FIFO, head-index queue, monotonic stack và BFS owner/helper.
- [x] Có đủ 6/6 bài Stack/Queue Kit chính thức.
- [x] Audit đủ 47/47 bài trong 10 Algorithm Practice Kit: 13 core, 7 auxiliary, 27 none.
- [x] Bộ bài thật có 22 đề, 22 source, 22 contract và 22 full solutions.
- [x] Sáu bài Kit chính + bảy bài cross-Kit + tám bài public ngoài Kit + một đề PCCP public.
- [x] Derived concepts nén 22 bài thành 10 bộ xương và có bảng ánh xạ đủ 22 ID.
- [x] 22 JavaScript solution blocks parse độc lập; 23 behavioral assertions đại diện pass.
- [x] Comment code giải thích state/transition, không chỉ kể lại cú pháp.
- [x] Link nội bộ, Markdown fence, `git diff --check` và test repo được chạy lại.

Kết luận mới: Coverage ID `SQ-01..05` vẫn giữ `FULL`; Chapter 08 đạt thêm Definition of Done concept-first mà không xóa hoặc làm yếu theory/practice cũ.
