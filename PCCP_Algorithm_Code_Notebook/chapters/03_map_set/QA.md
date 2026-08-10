# QA — Chương 03 Map/Set

## Bổ sung mastery learner-first — 10/08/2026

- Entry point học mới: `00_Exam_Mastery_Guide.md` → `01_Core_From_Zero.md` → `02_Advanced_From_Zero.md` → Practice Ladder → đề thật.
- Lesson mới giải thích bằng state và test phá lỗi: frequency/duplicate, first/latest index, complement, group/rank, `Map<key, Set>`, window frequency, canonical key và state đồng bộ.
- Research được gắn trực tiếp vào mastery guide: Hash Kit chính thức, Practice Kit, PCCP preparation course và MDN Map/Set.
- Behavioral assertions của code lesson Map/Set mới: **24/24** pass; mọi fence JavaScript mới của hai chapter Map/Set + Stack/Queue: **30/30** parse hợp lệ.
- Không đổi claim coverage cũ thành “người học đã thành thạo”; learner vẫn phải qua Practice/Transfer/Mini-test và có bằng chứng riêng.

Ngày kiểm: 04/08/2026.

## Coverage

- 14/14 dạng `MAP-01..14` có đủ A–E: Bản chất, Mental model, Template tư duy, Template code, Bài mẫu.
- 14/14 bài mẫu có contract, I/O, diễn giải, brute force, bottleneck, lý do chọn pattern, state, transition, invariant, pseudocode, full code, giải thích luồng, dry run, complexity, lỗi và mutation.
- 14/14 dạng có Recall Card gắn Coverage ID, Blank Page, Mutation và Explain Back.
- Practice: R12 / F3 / L3 / P3 / C3 / V4 / M1 + 3 Transfer Test.
- Mọi mã bài trong Practice Ladder có mục lời giải tương ứng; mini-test có ba lời giải con.

## Kiểm tra chất lượng

- [x] Template phân biệt với full code bài mẫu.
- [x] `Map.has()` và `Map.get()` được giải thích bằng case value `0`.
- [x] First/latest index và check-before-update được đối chiếu trực tiếp.
- [x] Mọi dry run bài mẫu có sáu cột state trước/sau.
- [x] Đáp án chỉ nằm dưới `solutions/`; chương bài tập không chứa full answer.
- [x] Mọi khối JavaScript trong toàn notebook parse hợp lệ tại thời điểm kiểm cuối.
- [x] 11 behavioral smoke tests đã qua, gồm frequency, min gap, window frequency, multi-Map và ba Transfer Test.
- [x] Cả 14 ID `FULL` xuất hiện trong theory, practice, solution và Recall Card.
- [x] Coverage Matrix và Mastery Tracker cùng có đúng 83 ID.
- [x] Toàn bộ link Markdown nội bộ resolve.
- [x] Tài liệu cũ không bị sửa; Git chỉ báo thư mục notebook mới.

## Giới hạn có chủ đích

Các chương khác mới là khung manifest và `PLANNED` trong Coverage Matrix, chưa được đánh dấu hoàn thiện. Bài luyện là bài tự chứa trong notebook, không sao chép nguyên đề có bản quyền và không mở nội dung trong `locked/`.
