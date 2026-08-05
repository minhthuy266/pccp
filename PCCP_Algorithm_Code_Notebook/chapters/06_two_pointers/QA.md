# QA — Chapter 06 Two Pointers

[← Index](../../06_Two_Pointers.md)

## Coverage lock

- [x] `TP-01..06` đều có A–E: bản chất, mental model, template tư duy/code và bài mẫu 16 bước.
- [x] Mỗi ID có dry run sáu cột, Recall Card, Blank Page, Mutation và Explain Back.
- [x] Practice đủ `12R/3F/3L/3P/3C/3V/1M` = 30 nhiệm vụ khi mini-test tính ba phần, cộng 2 Transfer Tests.
- [x] Tập 32 ID `S06-*` trong Practice và heading Solution khớp tuyệt đối.
- [x] Mutation, empty/singleton, duplicate, termination và sorted prerequisite được nói rõ.
- [x] Coverage Matrix chỉ đổi `TP-01..06` sang `FULL` sau các kiểm tra bên dưới.

## JavaScript và hành vi

- [x] 143 JavaScript fences toàn notebook parse được; bài điền khuyết dùng `js-fill`.
- [x] Pair/palindrome, compact, unique-at-most-k, merge/intersection, Three Sum và partition qua test.
- [x] Boundary cases qua test: empty, all-kept/all-removed, all-one-partition, duplicate groups và tie.
- [x] Hai Transfer Tests qua test: filter+unique một pass và stable filtered merge.
- [x] Input không bị mutate ở các bài đã cam kết clone/read-only; compact/partition trả đúng boundary.

Kết quả chạy: **16/16 behavioral assertions pass**, **0 syntax error**.

## Liên kết và biên tập

- [x] Root → theory → practice → solution → QA đều tồn tại.
- [x] Toàn bộ local Markdown links resolve.
- [x] Mọi pointer move có elimination proof hoặc invariant vùng đã xử lý.
- [x] Phân biệt rõ compact stable với partition không stable; pair indices với value triplets.

## Kết luận

`TP-01..06` đủ điều kiện `FULL`. Chương tiếp theo được phép triển khai là `07_Sliding_Window_Prefix_Sum.md` cho `PRE-01..05` và `SW-01..06`.

