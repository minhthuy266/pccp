# QA — Chapter 05 Sorting

[← Index](../../05_Sorting.md)

## Coverage lock

- [x] `SORT-01..05` đều có bản chất, mental model, template tư duy, JavaScript template và bài mẫu 16 bước.
- [x] Mỗi ID có Recall Card, Blank Page, Mutation và Explain Back.
- [x] Practice đủ `12R/3F/3L/3P/3C/3V/1M` = 30 nhiệm vụ và 2 Transfer Tests.
- [x] Mọi ID bài tập `S05-*` có heading lời giải tương ứng; không có lời giải thừa.
- [x] Mỗi lời giải nêu signal/pattern, state hoặc comparator, invariant, full code, dry run, complexity và bẫy/recall.
- [x] Coverage Matrix chỉ đổi `SORT-01..05` sang `FULL` sau các kiểm tra dưới đây.

## JavaScript và hành vi

- [x] 119 JavaScript fences toàn notebook parse được; fill-in dùng `js-fill` nên không bị tính là code hoàn chỉnh.
- [x] Numeric comparator qua ca `[2,10,-1]`; default-sort trap được ghi rõ.
- [x] Multi-key ranking qua tie score/penalty/name.
- [x] Decoration qua duplicate và tie original index.
- [x] Closed interval merge qua overlap bắc cầu, endpoint và không mutate nested input.
- [x] Dense compression qua negative/duplicate và giữ original order.
- [x] Hai Transfer Tests qua kiểm thử hành vi; timestamp/deviceId gây nhiễu không lọt vào comparator/rank.
- [x] Self-code closest-pair tie và interval coverage qua kiểm thử hành vi.

Kết quả chạy: **9/9 behavioral assertions pass**, **0 syntax error**.

## Liên kết và biên tập

- [x] Practice IDs và solution IDs khớp tập hợp.
- [x] Điều hướng root → theory → practice → solution → QA tồn tại.
- [x] Local Markdown link toàn notebook không còn broken link sau khi tạo QA.
- [x] Thuật ngữ phân biệt rõ stable tie, decoration, dense rank, competition rank và closed/half-open interval.

## Kết luận

`SORT-01..05` đủ điều kiện `FULL`. Chương kế tiếp được phép triển khai là `06_Two_Pointers.md` (`TP-01..06`).
