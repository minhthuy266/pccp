# QA — Chapter 02 Matrix

Ngày kiểm: 04/08/2026.

## Coverage

- 5/5 dạng `MAT-01..05` có A–E, bài mẫu 16 bước, dry run sáu cột và Recall/Blank/Mutation/Explain Back.
- Practice: R12 / F3 / L3 / P3 / C3 / V3 / M1 (3 câu con) + 2 Transfer Test.
- Mọi mã `M02-*` khớp giữa Practice và solution.
- Cả 5 ID xuất hiện trong theory, practice, solution và Recall Card.
- Combination `MAT-05` phân vai Matrix bounds với Simulation/BFS-DFS frontier.

## Kiểm tra kỹ thuật

- [x] 14 behavioral tests chương qua.
- [x] JavaScript fences toàn notebook parse hợp lệ.
- [x] Đã test matrix chữ nhật 2×3, 1×1 semantics, corner neighbor, center diagonal và rotate shape.
- [x] Không dùng shared-row allocation.
- [x] Bounds được kiểm trước matrix access; movement candidate được validate trước commit.
- [x] Đáp án tách khỏi Practice Ladder.

## Điểm dừng

Không thêm prefix 2D vào chương này: skeleton đó thuộc `PRE-04`. Flood fill ở đây chỉ là bridge; engine đầy đủ thuộc `BFS-02`.

