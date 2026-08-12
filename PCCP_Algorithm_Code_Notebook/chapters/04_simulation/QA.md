# QA — Chapter 04 Simulation

Ngày kiểm: 04/08/2026.

## Coverage

- 5/5 dạng `SIM-01..05` có A–E, bài mẫu 16 bước, dry run sáu cột và Recall/Blank/Mutation/Explain Back.
- Practice: R12 / F3 / L3 / P3 / C3 / V3 / M1 (3 câu con) + 2 Transfer Test.
- Mọi mã `S04-*` khớp giữa Practice và solution.
- Cả 5 ID xuất hiện trong theory, practice, solution và Recall Card.
- `SIM-04/05` ghi rõ collect-resolve-commit và vai trò pattern chính/phụ.

## Kiểm tra kỹ thuật

[Executable module](../../../solutions/notebook/ch04_simulation.js) · chạy `node --test tests/notebook_ch04.test.js`.

- [x] 8 behavioral tests trên các full-code fence trọng yếu đã qua.
- [x] JavaScript fences toàn notebook parse hợp lệ.
- [x] Đã test idle jump, wall rejection, negative time wrap, same-time collision, batch tie và car overlap.
- [x] Candidate được validate trước commit; invalid event không chiếm resource.
- [x] Event cùng timestamp được group trước resolve ở các contract đồng thời.

## Điểm dừng

Heap resource selection thuộc `HG-01/HG-03`; queue chi tiết thuộc `SQ-03`; chapter này chỉ giữ vai trò orchestration. File tiếp theo là Sorting theo dependency manifest.
