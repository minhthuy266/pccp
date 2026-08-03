# PCCP 700+ — Bắt đầu tại đây

Đây là **cổng bắt đầu duy nhất** của bộ tài liệu. Không chọn lịch từ tên file hoặc ngày trên lịch.

## Tiếp tục học

1. Mở [`TRACKER_PCCP_REBUILD_2026.csv`](TRACKER_PCCP_REBUILD_2026.csv).
2. Tiếp tục từ ngày gần nhất chưa hoàn thành. Không tự nhảy ngày chỉ để khớp lịch.
3. Mở đúng dòng ngày đó trong [`PLAN_PCCP_700_REBUILD_2026-09-05.md`](PLAN_PCCP_700_REBUILD_2026-09-05.md). Đây là **lịch học chính duy nhất**.
4. Chỉ đọc chương/mục được chỉ định trong plan từ [`PCCP_Thinking_Curriculum.md`](docs/pccp-700-roadmap/PCCP_Thinking_Curriculum.md). Một chương có thể kéo dài nhiều ngày; một ngày có thể chỉ ôn hoặc tra template.
5. Lấy thông tin bài luyện từ [`PROBLEM_BANK.csv`](PROBLEM_BANK.csv); tra cú pháp trong [`PCCP_JavaScript_Templates.md`](docs/pccp-700-roadmap/PCCP_JavaScript_Templates.md) khi plan yêu cầu.
6. Sau buổi học, chỉ cập nhật tiến độ thực tế trong tracker. Nếu có lỗi thật, ghi vào [`PCCP_Error_Log.csv`](docs/pccp-700-roadmap/PCCP_Error_Log.csv).

## Vai trò từng file

| File | Vai trò duy nhất |
|---|---|
| `README.md` | Cổng bắt đầu và quy tắc điều hướng |
| `PLAN_PCCP_700_REBUILD_2026-09-05.md` | Lịch học chính 37 ngày, bài luyện và gate |
| `PCCP_Thinking_Curriculum.md` | 12 chương tư duy; chỉ đọc mục plan chỉ định |
| `PCCP_JavaScript_Templates.md` | Tra cứu/recode template, không phải lịch học |
| `PROBLEM_BANK.csv` | Danh mục bài; không chứa tiến độ, lời giải hoặc hậu kiểm |
| `TRACKER_PCCP_REBUILD_2026.csv` | Kế hoạch theo ngày và kết quả thực tế duy nhất |
| `PCCP_Error_Log.csv` | Lỗi đã thực sự gặp và quy tắc phòng tránh |
| `PCCP_Final_Cheat_Sheet.md` | Ôn nhanh ở giai đoạn cuối |
| `archive/` | Tài liệu cũ, không dùng làm lịch hiện tại |

## Quy tắc bảo vệ mock

- Trước khi hoàn thành một mock, không mở tên bài, link, pattern, state, invariant, thuật toán, bẫy hoặc hidden-test risks của bộ đó.
- Plan chỉ ghi tên buổi `Official Mock 1`, `Official Mock 2` hoặc `Mixed Mock`, thời lượng và luật làm bài.
- `locked/MIXED_MOCK_D29.csv` chỉ chứa roster D29; chỉ mở khi bắt đầu timer D29.
- `locked/POST_MOCK_ANALYSIS.csv` là vùng có spoiler phân tích. **Chỉ mở sau khi đã hết 120 phút của mock tương ứng và đã ghi kết quả thô vào tracker.** Các file locked được nhắc bằng tên nhưng cố ý không tạo liên kết.
- Điểm mock đã biết trước nội dung không được dùng làm bằng chứng độc lập cho mục tiêu 700+.

## Chuẩn hoàn thành một bài

- Nói được lý do chọn thuật toán và time/space complexity.
- Tự tạo ít nhất ba edge case.
- AC trong timebox của plan; ghi số lần submit và mức hint vào tracker.
- Nếu đã xem hint/pseudocode/code, đóng tài liệu và code lại từ file trắng.
- Mọi lỗi lặp lại phải có revealing test và quy tắc phòng tránh trong error log.
