# PCCP 700+ — JavaScript Curriculum

Bộ tài liệu này có **một luồng học duy nhất** cho mục tiêu PCCP 700+ bằng JavaScript. Không cần đọc mọi file trong repo theo thứ tự tên.

## Bắt đầu ở đây

1. Đọc [cách tư duy từ đề đến code](docs/pccp-700-roadmap/PCCP_Thinking_Curriculum.md), mỗi ngày đúng một chương.
2. Học theo [kế hoạch chính đến 05/09/2026](PLAN_PCCP_700_REBUILD_2026-09-05.md).
3. Khi cần cú pháp, tra [bộ template JavaScript](docs/pccp-700-roadmap/PCCP_JavaScript_Templates.md), không học thuộc cả file.
4. Chọn bài trong [problem bank 48 bài](docs/pccp-700-roadmap/PCCP_Problem_Tracker.csv).
5. Ghi kết quả thật vào [tracker duy nhất](TRACKER_PCCP_REBUILD_2026.csv) và lỗi thật vào [error log](docs/pccp-700-roadmap/PCCP_Error_Log.csv).
6. Trước mock/thi, dùng [final cheat sheet](docs/pccp-700-roadmap/PCCP_Final_Cheat_Sheet.md).

## Luồng học một bài

```text
Contract → Bound → Brute force → Bottleneck → State → Invariant
        → Transition → Complexity → Code → Counterexample → Re-code
```

- **Contract:** input là gì, output là gì, tie-break và trường hợp vô nghiệm là gì?
- **Bound:** kích thước lớn nhất cho phép độ phức tạp nào?
- **Brute force:** cách đúng đơn giản nhất là gì?
- **Bottleneck:** bước nào khiến brute force quá chậm?
- **State:** tại một thời điểm cần nhớ tối thiểu thông tin nào?
- **Invariant:** điều gì luôn đúng trước và sau mỗi bước?
- **Transition:** state thay đổi thế nào khi đọc thêm một phần tử/trạng thái?
- **Complexity:** thời gian và bộ nhớ có qua bound không?
- **Counterexample:** input nhỏ nào làm cách sai lộ lỗi?
- **Re-code:** đóng lời giải và viết lại từ trang trắng.

## Tiêu chuẩn “đã học xong”

Một bài chỉ được đánh dấu hoàn thành khi đáp ứng đủ:

- tự nói được vì sao chọn thuật toán;
- nêu đúng time/space complexity;
- có ít nhất ba edge case;
- code AC trong time cap;
- nếu từng xem hint, đã code lại từ trắng;
- làm lại đúng hạn D+1 hoặc D+7 nếu bài từng sai.

## Gate mục tiêu 700+

| Gate | Điều kiện qua |
|---|---|
| Nền tảng | Viết không nhìn: array/matrix, `Map`/`Set`, sort, stack, queue-head |
| Chuyển hóa | Easy mới AC ≤20 phút; medium quen ≤35–45 phút |
| Thuật toán | Tự dựng được BFS, binary search on answer, heap và DP cơ bản |
| Mock | Hai mock chưa biết trước pattern ở vùng 750+ hoặc Q1 + hai medium rất ổn định |
| Lỗi | Không lặp cùng một root cause trong hai mock liên tiếp |

Không dùng số trang đã đọc hoặc số bài đã “xem hiểu” làm thước đo sẵn sàng.

## Vai trò của các file còn lại

- [Roadmap tham khảo chi tiết](docs/pccp-700-roadmap/PCCP_700_Roadmap_JavaScript_2026.md): knowledge map, nguồn và danh sách bài; không phải plan hằng ngày.
- [Daily plan cũ](docs/pccp-700-roadmap/PCCP_37_Day_Daily_Plan.md) và [plan chẩn đoán cũ](PLAN_PCCP_700_2026-09-05.md): chỉ lưu để đối chiếu lịch sử; không cập nhật tiến độ tại đây.
- `TRACKER_PCCP_2026.csv`: tracker cũ; không sử dụng.
- `BASIC.js`: sandbox luyện cú pháp, không phải bằng chứng bao phủ toàn bộ PCCP.

## Quy tắc bảo vệ mock

Không đọc tên bài, pattern, lời giải hoặc lesson mirror của bộ mock định dùng để đo năng lực. Nếu đã biết trước pattern, vẫn có thể dùng bộ đó để luyện implementation có giờ, nhưng không dùng điểm làm bằng chứng chắc chắn đã sẵn sàng 700+.
