# PCCP 700+ — Design rationale cho sprint 15/08 → 12/09/2026

> File này giải thích **vì sao** lộ trình được thiết kế như vậy. Nó không phải một Navigator thứ hai. Mọi quyết định “hôm nay làm gì” phải bắt đầu tại [`PCCP_700_MASTER_NAVIGATOR.md`](PCCP_700_MASTER_NAVIGATOR.md), còn tiến độ thật chỉ được ghi vào [`TRACKER_PCCP_REBUILD_2026.csv`](TRACKER_PCCP_REBUILD_2026.csv).

**Ngày thi 12/09/2026 là ngày người học cung cấp.** Phải xác nhận lại trong tài khoản/phiếu dự thi Programmers trước khi khóa lịch cá nhân.

## 1. Vì sao lộ trình được nén còn 28 ngày

Audit ngày 15/08/2026 xác nhận tracker chưa có `completed_at`. Lịch cũ gồm 37 buổi chính và ba buổi repair nhưng chỉ còn 28 ngày từ 15/08 đến 11/09, nên không còn khả thi theo nhịp một buổi/ngày.

Release hiện tại dùng đúng 28 buổi:

- `D1–D16`: đi qua toàn bộ **32/32 CORE**, thêm `SR002` để đóng String và `OF059` để thực hành Dijkstra;
- `D17`: foundation gate 120 phút bằng `OF054`, `OF056` và bài fail lớn nhất;
- `D18–D25`: bốn mock/past set 120 phút, mỗi set luôn có một ngày postmortem ngay sau đó;
- `D26`: conversion/repair theo dữ liệu thật;
- `D27`: confidence set, official pre-test và kiểm tra thiết bị;
- `D28`: taper 60–90 phút; không học mới.

Không có STRETCH trong lịch bắt buộc. TRANSFER chỉ xuất hiện khi nó kiểm một khe syllabus hoặc là bài gate. Nếu người học đã có bằng chứng hoàn thành bài trước 15/08, vẫn đánh dấu vào tracker rồi dùng thời gian tiết kiệm để recode/repair; không tự thêm bài khó.

## 2. Ba tầng và quyền quyết định

```text
README
→ MASTER NAVIGATOR: duy nhất quyết định buổi học, link đọc và bài làm
→ TRACKER: duy nhất lưu tiến độ/kết quả thật
→ handbook / lesson / pattern / template: tài nguyên được Navigator gọi đúng lúc
```

- [`PCCP_Thinking_Curriculum.md`](docs/pccp-700-roadmap/PCCP_Thinking_Curriculum.md): handbook tư duy theo dependency.
- [`official-lessons/`](docs/pccp-700-roadmap/official-lessons): bài-specific contract, proof, code và edge case.
- [`pattern-families/`](docs/pccp-700-roadmap/pattern-families/README.md): transfer/variant sau khi đã tự làm bài chính.
- [`PCCP_Algorithm_Code_Notebook/`](PCCP_Algorithm_Code_Notebook/README.md): thư viện drill sâu được Navigator link khi cần; không phải entrypoint cạnh tranh.

Các báo cáo audit chỉ mô tả trạng thái release. Chúng không được dùng để chọn bài học.

## 3. Ngân sách một buổi

- Ngày core: tối đa 210 phút, mở bằng 15 phút recall đúng một mục đến hạn rồi đọc có mục tiêu, tự làm, submit và postmortem ngắn.
- Gate/mock: 120 phút đóng tài liệu; review chi tiết chuyển sang ngày hôm sau.
- D26–D27: tối đa 180 phút.
- D28: 60–90 phút rồi dừng.

Một bài chỉ được tính hoàn thành khi đã ghi contract, bound, complexity, ít nhất ba test phá lỗi, kết quả submit và mức hint. Sample pass không phải completion.

Spaced repair dùng có chọn lọc, không tăng volume vô hạn: bài cần hint/WA đặt `retry_date` D+1 trong Error Log; chưa sạch thì D+3; sau lần sạch kiểm skeleton + revealing test ở D+7. Mỗi ngày core chỉ lấy một mục đến hạn. Full recode thất bại được ưu tiên ở D19/D21/D23/D25 hoặc D26, không đẩy mock khỏi lịch.

## 4. Protocol 120 phút duy nhất

| Mốc | Hành động |
|---:|---|
| `0–5` | Scan đủ bốn câu; ghi constraint, complexity budget và confidence |
| `5–25` | Khóa bài chắc nhất và submit lần đầu |
| `25–55` | Bài thứ hai |
| `55–90` | Bài thứ ba khả thi nhất; không mặc định câu 4 khó nhất |
| `90–102` | Hoàn thiện bài gần AC nhất hoặc partial có cơ sở |
| `102–116` | Audit hidden case, index, tie, mutation, precision và complexity |
| `116–120` | Chạy lại sample và kiểm `Submit Code` của cả bốn bài |

Đổi bài nếu 10–12 phút không tạo thêm brute force, state, invariant hoặc code hữu ích. Coding answer không được giả định tự submit khi hết giờ.

## 5. Mock và spoiler boundary

Thứ tự bắt buộc nằm trong Navigator:

1. Free Official Mock 1 — course 15008.
2. Free Official Mock 2 — course 15009.
3. Public Past Set A — OF062–OF065.
4. Public Past Set B — OF066–OF069.

`locked/` là **honor-system spoiler boundary**, không phải bảo mật filesystem. Không mở raw bank, lesson con hoặc post-analysis trước timer. Timer 120 phút của free course là mô phỏng do curriculum áp đặt; public page chỉ xác nhận course có bốn coding exercises. Legacy 20847/20848 là optional: nếu course không còn full-test entrypoint thì không ghép ba lesson rồi gọi là official full mock.

Mỗi mock ghi một dòng/bài vào [`TRACKER_PCCP_MOCK_ATTEMPTS.csv`](TRACKER_PCCP_MOCK_ATTEMPTS.csv) trước khi mở post-analysis.

## 6. Rescue rule

- Trượt một ngày core: ngày kế tiếp giữ bài CORE chưa qua, bỏ bài reserve/transfer trước.
- Trượt D17: vẫn làm Mock 1 đúng lịch để lấy baseline thật; D19 repair hai root cause lớn nhất thay vì xem lời giải thụ động.
- Cùng root cause lặp ở hai mock: D26 chỉ repair cluster đó, không mở pattern mới.
- Hai mock cuối không ổn định: bỏ legacy mock và mọi stretch; giữ implementation, String, hash, sort, queue, BFS cùng template yếu nhất.

## 7. Điều kiện release “best-of-best”

Lộ trình chỉ được gọi là release-ready khi:

1. Toàn bộ CORE xuất hiện trong schedule và tracker.
2. Mọi assignment/drill được link thật và tồn tại.
3. Code qua test nhỏ lẫn regression sát bound chính thức.
4. Heap/queue/entrypoint JavaScript có một API thống nhất.
5. Navigator chứa quy định thi, pre-test và submit protocol hiện hành.
6. Audit kiểm semantic route/boundary, không chỉ đếm heading hoặc parse code.
7. `npm run check:all` và `git diff --check` đều pass.
