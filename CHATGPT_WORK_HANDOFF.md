# Handoff học PCCP cho ChatGPT Work

## 1. Mục tiêu hiện tại

- Người học ôn **PCCP bằng JavaScript**, mục tiêu **700+**.
- Ngày thi do người học cập nhật: **12/09/2026**.
- Ưu tiên khả năng nhận diện pattern, tự dựng state và code được trong timebox; không cố hoàn thành mọi bài trong notebook.
- Người học thiếu thời gian, vì vậy phải dạy đúng trọng tâm của lịch chính, không tự mở rộng thành khóa học exhaustive.

## 2. Nguồn sự thật trong repo

Luôn bắt đầu từ:

1. [`README.md`](README.md)
2. [`TRACKER_PCCP_REBUILD_2026.csv`](TRACKER_PCCP_REBUILD_2026.csv)
3. [`PLAN_PCCP_700_REBUILD_2026-09-12.md`](PLAN_PCCP_700_REBUILD_2026-09-12.md)
4. [`docs/pccp-700-roadmap/PCCP_Thinking_Curriculum.md`](docs/pccp-700-roadmap/PCCP_Thinking_Curriculum.md)
5. [`PROBLEM_BANK.csv`](PROBLEM_BANK.csv)
6. [`docs/pccp-700-roadmap/PCCP_JavaScript_Templates.md`](docs/pccp-700-roadmap/PCCP_JavaScript_Templates.md) chỉ để tra/recode đúng mục được plan yêu cầu.

`PCCP_Algorithm_Code_Notebook/` là tài liệu giải thích và tham khảo sâu, không phải lịch học chính. Không bắt người học đọc tuần tự toàn bộ chapter hoặc giải toàn bộ problem set.

## 3. Trạng thái lịch

- Đang học **D8 — Stack và queue-head**, ngày neo lại là **10/08/2026**.
- D8 trong plan:
  - Đọc Chương 5 §5.1–5.3.
  - Làm `P27 — Tiến trình/Process`.
  - Recode `P19 — Game gắp thú bằng cần cẩu`.
  - Chỉ tra template §8–9 nếu cần.
- D9 mới học monotonic stack và heap nhập môn. Không đưa monotonic stack, BFS hoặc circular queue vào D8 nếu P27 chưa xong.
- Lịch mới có các ngày repair `R15`, `R22`, `R30`; taper ngày 11/09 và thi ngày 12/09.
- Tracker hiện chưa được điền kết quả thực tế cho D1–D7. Không tự đánh dấu hoàn thành hoặc bịa kết quả; hỏi người học khi cần đồng bộ tracker.

## 4. Tiến độ cụ thể trong D8

### P19 — Game gắp thú

Đã dạy từ đầu:

- Tách bài thành hai phần:
  - Matrix: mỗi move tìm phần tử khác `0` đầu tiên từ trên xuống trong cột.
  - Stack: `basket` chứa các con thú còn sống sau khi xử lý các move trước; doll mới chỉ so với top.
- Người học đã tự viết code gần đúng.
- Lỗi vừa gặp:

```js
board[row][col] === 0
```

thay vì:

```js
board[row][col] = 0
```

Do dùng phép so sánh thay cho phép gán, doll không bị xóa khỏi board và bị gắp lại khi chọn cùng cột. Sau khi sửa, sample trả `4` đúng.

Nếu người học chưa tự recode lại từ file trắng sau lỗi này, yêu cầu recode ngắn hoặc ít nhất giải thích được:

```text
basket chứa gì?
vì sao chỉ so với top?
vì sao phải board[row][col] = 0?
vì sao phải break sau khi lấy được một doll?
```

### Việc tiếp theo

Dạy **P27 — Process/Tiến trình** từ đầu. Không bắt đầu bằng template tổng hợp.

Trình tự nên dùng:

1. Kể lại cơ chế hàng đợi bằng một ví dụ nhỏ có tên process.
2. Dry-run thật chậm với `priorities = [1,1,9,1,1,1]`, `location = 0`.
3. Làm rõ hai luật khác nhau:
   - queue quyết định process nào được lấy ra xét tiếp theo;
   - priority quyết định process đó được execute hay re-enqueue.
4. Chỉ sau khi người học hiểu trace mới giới thiệu queue bằng array + `head`.
5. Giải thích vì sao mỗi item phải giữ `originalIndex`.
6. Cho người học tự dựng code; review code và test bẫy.
7. Chỉ kết thúc D8 khi người học tự code được P27 và nói được state/transition bằng lời.

Các test tối thiểu cho P27:

```js
solution([2, 1, 3, 2], 2) === 1
solution([1, 1, 9, 1, 1, 1], 0) === 5
solution([5], 0) === 1
solution([2, 2, 2], 1) === 2
```

## 5. Cách dạy phù hợp với người học

Người học đã phản hồi rằng kiểu trình bày tóm tắt bằng nhiều heading, invariant, bảng và pseudocode ngay từ đầu là khó hiểu. Không lặp lại cách đó.

Phải dạy theo nhịp:

```text
một ý nhỏ
→ ví dụ cụ thể
→ trace từng bước
→ hỏi một câu kiểm tra
→ giải thích chỗ sai
→ mới chuyển sang code
```

Yêu cầu cụ thể:

- Dùng tiếng Việt đời thường; có thể xưng `tao/mày` theo đúng giọng người học.
- Không ném cả buổi học 210 phút vào một câu trả lời.
- Không đưa một “cheat sheet” rồi coi đó là bài giảng.
- Không dùng jargon như `invariant`, `state graph`, `amortized` trước khi giải thích trực giác bằng tiếng Việt.
- Khi đưa code, giải thích vì sao từng biến tồn tại và state thay đổi ra sao.
- Mỗi lượt chỉ dạy một bài hoặc một khái niệm nhỏ, rồi chờ người học dry-run/code.
- Khi code sai, chỉ rõ dòng gây lỗi, mô phỏng hậu quả của lỗi và tạo test bắt lỗi.
- Sau khi người học hiểu mới chốt lại pattern bằng 2–4 câu ngắn.

## 6. Phạm vi Stack/Queue cho mục tiêu 700+

Không học hết 22 bài của chapter 08. Trong lịch chính chỉ cần:

- P19 để củng cố local-top/reduction stack.
- P27 để học queue-head và re-enqueue.
- P36 ở D9 để học monotonic stack.

BFS được học riêng ở D16–D19. Circular queue, toàn bộ bộ 22 bài và các bài BFS đặc thù trong chapter 08 chỉ là tài liệu tham khảo khi cần.

## 7. Bảo vệ mock

Không mở hoặc tiết lộ nội dung trong `locked/` trước đúng thời điểm ghi trong plan.

- Không xem roster, tên bài, pattern hoặc phân tích của mock sớm.
- Chỉ mở `locked/MIXED_MOCK_D29.csv` khi bắt đầu timer D29.
- Chỉ mở phần tương ứng trong `locked/POST_MOCK_ANALYSIS.csv` sau khi mock đã kết thúc và kết quả thô đã được ghi vào tracker.

## 8. Prompt tiếp tục ngắn

Nếu cần bắt đầu phiên dạy ngay, dùng:

> Tiếp tục D8 từ P27 Process. Dạy chậm từ câu chuyện và dry-run `[1,1,9,1,1,1]`, chưa đưa full template ngay. Sau khi tao hiểu queue/re-enqueue thì để tao tự code và review code cho tao.
