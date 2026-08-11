# Chuẩn thành thạo PCCP: không học thuộc code

[← README](README.md) · [Framework canonical](00_CORE_TEMPLATE_VARIANTS_FRAMEWORK.md) · [Danh mục đề thật](PCCP_PUBLIC_PROBLEM_CATALOG.md)

Mục tiêu của notebook là giúp người học nhìn một đề mới và tự dựng được lời giải. Một bài chỉ được xem là **đã thành thạo** khi người học làm được cả chuỗi sau, không nhìn đáp án:

```text
Kể lại đề bằng lời đơn giản
→ chỉ ra dữ liệu thay đổi theo thời gian hoặc theo vòng lặp
→ chọn đúng biến cần lưu
→ nói thứ tự kiểm tra/cập nhật
→ dry run test nhỏ
→ code JavaScript
→ tự tạo test phá lỗi biên
→ quay lại sau vài ngày vẫn làm được biến thể
```

## Một bài PCCP phải được dạy như thế nào?

Không bắt đầu bằng tên thuật toán. Bắt đầu bằng việc đang xảy ra trong đề.

Ví dụ nếu đề kể nhân vật hồi máu rồi bị tấn công, câu đầu phải là: “ở mỗi giây, máu và chuỗi hồi liên tiếp thay đổi thế nào?” Chỉ sau khi học viên thấy hai thông tin đó mới giới thiệu nó là state machine.

Mỗi lesson phải lần lượt có:

1. Bản diễn giải đề, input/output và từ ngữ dễ nhầm.
2. Ví dụ cực nhỏ, xử lý từng bước bằng lời.
3. Lý do brute force có/không đủ nhanh theo constraint.
4. Danh sách biến, ý nghĩa đời thường và giá trị khởi tạo.
5. Rule order: điều gì phải check trước, điều gì update sau.
6. Pseudocode và full code có comment đúng chỗ khó.
7. Dry run gồm cả một edge case làm lộ bug.
8. Lý do code đúng, độ phức tạp, các cách sai thường gặp.
9. Gợi ý theo tầng, bài recall và biến thể.

Danh sách trên áp dụng cho lesson tự chứa của đề thật. Với pattern dùng lại, canonical lesson phải đạt đủ 11 thành phần của framework; bài cụ thể map vào pattern và chỉ giải thích các variant knobs đã chọn. `FULL` trong Coverage Matrix không tự động đồng nghĩa `FRAMEWORK-FULL`; snapshot bằng chứng nằm ở [Framework Coverage Audit](FRAMEWORK_COVERAGE_AUDIT.md).

## Bốn mức thành thạo cho từng đề

| Mức | Bằng chứng |
| --- | --- |
| 0 — Chưa biết | Không kể lại được đề hoặc không biết bắt đầu từ đâu. |
| 1 — Hiểu khi xem | Đọc lời giải thì theo được, nhưng chưa tự chọn state. |
| 2 — Dựng được | Tự viết state, rule order và pseudocode; còn cần tra cú pháp. |
| 3 — Tự giải | Code đúng đề gốc, có test rỗng/biên hoặc test luật hòa phù hợp. |
| 4 — Chuyển giao | Sau 3–7 ngày tự giải được biến thể/đề trộn và giải thích vì sao code đúng. |

Muốn thi ổn định, các đề Level 1–2 công khai phải đạt tối thiểu mức 3; các đề Level 3 và đề kết hợp phải được làm lại đến mức 4. Ghi bằng chứng vào `MASTERY_TRACKER.md` hoặc error log; không tự tăng mức chỉ vì đã đọc.

## Khi kẹt phải làm gì?

Đừng nhảy vào lời giải. Dừng ở câu đầu tiên chưa trả lời được:

| Đang kẹt ở đâu? | Việc làm tiếp theo |
| --- | --- |
| Không hiểu đề | Tự viết lại input, output và một ví dụ 3–5 phần tử. |
| Không biết biến nào | Hỏi: “phần tử/sự kiện tiếp theo cần biết điều gì về quá khứ?” |
| Không biết thứ tự code | Vẽ một dòng thời gian `state trước → check → update → state sau`. |
| Sai hidden test | Thử empty, một phần tử, event đầu/cuối, trùng lặp, max/min, và tie. |
| Xem code thì hiểu nhưng tự viết không được | Chỉ xem pseudocode, đóng lại, code lại sau 20 phút. |

## Điều kiện hoàn thành notebook

Notebook chỉ được gọi là hoàn thành khi:

- [Bản đồ pattern PCCP](PCCP_EXAM_PATTERN_ATLAS.md) và các chapter nền giải thích được mọi pattern xuất hiện trong đề thật trước khi trỏ sang solution;
- mọi dòng công khai trong [Danh mục đề PCCP](PCCP_PUBLIC_PROBLEM_CATALOG.md) đạt `Đã hoàn tất`;
- mọi đề có lesson và solution độc lập, không chỉ một link audit;
- code examples parse được, test hành vi và links đều qua;
- learner tracker có bằng chứng mức 3/4 thay vì toàn số 0;
- có đủ mock trộn 4 bài/120 phút và post-mortem cho từng lần làm.

Đó là đích làm việc. Số file, số pattern hay một bảng đẹp không thay thế được các điều kiện này.
