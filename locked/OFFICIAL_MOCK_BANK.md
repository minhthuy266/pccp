# Official PCCP mock bank — honor-system spoiler boundary

> Policy sync: 15/08/2026 · Sprint 28 ngày: 15/08–11/09/2026 · Exam: 12/09/2026

[`PCCP_700_MASTER_NAVIGATOR.md`](../PCCP_700_MASTER_NAVIGATOR.md) là **entrypoint duy nhất**. Chỉ mở file này từ đúng dòng D18/D20/D22/D24 khi external timer đã sẵn sàng; không dùng file này để tự đổi thứ tự hoặc thêm mock.

“Locked” ở đây là **honor-system**, không phải mã hóa hay access control. URL/raw bank vẫn tồn tại để audit. Trước ngày unlock, không mở course, dòng bank, tên bài, pattern, lesson mirror, solution hoặc post-analysis của set đó.

## Bốn set chính và thời điểm honor-unlock

| Navigator | Set | Entrypoint chỉ mở sau khi bật timer | Boundary |
|---|---|---|---|
| D18 · 01/09 | Free Official Mock 1 | [Course 15008](https://school.programmers.co.kr/learn/courses/15008) | 120 phút do curriculum tự áp |
| D20 · 03/09 | Free Official Mock 2 | [Course 15009](https://school.programmers.co.kr/learn/courses/15009) | 120 phút do curriculum tự áp |
| D22 · 05/09 | Public Past Set A | [Launcher A — bốn link đề](PAST_SET_A_LAUNCH.md) | Chỉ mở launcher sau khi timer chạy |
| D24 · 07/09 | Public Past Set B | [Launcher B — bốn link đề](PAST_SET_B_LAUNCH.md) | Chỉ mở launcher sau khi timer chạy |

Trang 15008/15009 công bố bốn coding exercises. Repo **không tuyên bố hai public course có timer 120 phút tích hợp**: timer, milestone, đóng tài liệu và tracker là điều kiện mô phỏng do curriculum áp đặt.

Sau mỗi set phải có một ngày postmortem/recode theo Navigator. Không mở lesson/solution trước khi đã ghi raw result, expected complexity và confidence của đủ bốn câu vào [Mock Attempts Tracker](../TRACKER_PCCP_MOCK_ATTEMPTS.csv).

## Course optional, không thay bốn set chính

- [Legacy practice course 20847](https://school.programmers.co.kr/learn/courses/20847) và [20848](https://school.programmers.co.kr/learn/courses/20848) chỉ dùng nếu đã xong bốn set chính và vẫn cần unseen practice.
- Public metadata quảng bá bốn coding exercises, nhưng outline public hiện chỉ lộ ba lesson hậu kiểm. **Không bao giờ ghép ba lesson rời rồi gọi là full mock.** Chỉ tính là mock nếu course test entrypoint thực sự mở được một phiên nguyên khối; nếu không, mỗi lesson chỉ là bài practice riêng.
- [Khóa PCCP 14760](https://school.programmers.co.kr/learn/courses/14760) có hai mock trong course trả phí/Python nhưng hoàn toàn optional; không mua chỉ để hoàn thành curriculum.

## Protocol 120 phút duy nhất

Các milestone sau là policy của curriculum, không phải tuyên bố về UI, timer hoặc trọng số điểm chính thức:

| Mốc | Việc |
|---:|---|
| `0–5` | Scan cả bốn câu; ghi constraint, complexity, rủi ro và confidence |
| `5–25` | Làm bài chắc nhất, test boundary và bấm `Submit Code` |
| `25–55` | Làm bài thứ hai |
| `55–90` | Làm bài thứ ba khả thi nhất |
| `90–102` | Bài còn lại hoặc hoàn thiện bài gần xong; partial chỉ khi có cơ sở |
| `102–116` | Audit hidden edge, index, state, mutation, precision và complexity |
| `116–120` | Chạy lại test cần thiết; kiểm trạng thái `Submit Code` của cả bốn câu |

Theo [coding-test UI guide](https://user-guide.grepp.co/en/articles/ProgrammingCoding-Test-161a992a), `Run Test` không thay thế thao tác nộp. Phải bấm **`Submit Code` riêng cho từng câu**; curriculum không dựa vào và không tuyên bố có auto-submit khi hết giờ.

Trong timer: không AI, hint, solution, template, external IDE hoặc search. Mỗi câu ghi `start_minute`, các lần submit, expected complexity và confidence trước khi xem result. Hết timer, ghi raw result trước; chỉ sau đó mới mở lesson mirror và post-analysis.

## Candidate rehearsal bắt buộc

Quy định live luôn ưu tiên [Candidate Guide hiện hành](https://certi.programmers.co.kr/guide/main?tab=entrance). Khi mô phỏng set cuối và ngày thi:

- một tờ A4 trắng + bút; không mang cheat sheet;
- không external IDE/search/tài liệu/AI;
- vào được từ `T−60`, cutoff vào phòng `T−20`; không chờ sát cutoff;
- từ cutoff `T−20`, không được rời phòng/khung giám sát cho tới khi bài thi kết thúc;
- hoàn tất official pre-test trong `T−7..T−1`;
- kiểm webcam, camera mobile, ID, browser/network/charger và one-screen; xử lý màn hình phụ theo guide;
- trước khi hết giờ, xác nhận `Submit Code` của từng câu, không trông chờ auto-submit.

## Postmortem unlock

1. Dừng timer đúng 120 phút; không sửa thêm rồi ghi như kết quả trong giờ.
2. Điền đủ bốn dòng session trong [Mock Attempts Tracker](../TRACKER_PCCP_MOCK_ATTEMPTS.csv).
3. Ghi raw result, root cause, revealing test và prevention rule trước khi xem lời giải.
4. Chỉ lúc đó mới mở lesson/solution hoặc [`POST_MOCK_ANALYSIS.csv`](POST_MOCK_ANALYSIS.csv).
5. Recode tối đa ba lỗi lớn nhất; không lấy ngày postmortem để học topic mới.
