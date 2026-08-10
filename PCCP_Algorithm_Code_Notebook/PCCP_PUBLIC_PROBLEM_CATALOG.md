# Danh mục đề PCCP công khai — học đến khi tự giải được

[← README](README.md) · [Chuẩn thành thạo](00_MASTERY_STANDARD.md)

## Cam kết phạm vi

Notebook này không được gọi là tài liệu PCCP hoàn chỉnh chỉ vì đã có các tên pattern. Mỗi đề PCCP công khai được theo dõi trong [PROBLEM_BANK.csv](../PROBLEM_BANK.csv) phải có đủ bốn lớp trước khi mang trạng thái **Đã hoàn tất**:

1. Link chính thức và bản diễn giải tiếng Việt tự chứa.
2. Bài học từ gốc: điều đề đang mô phỏng/tối ưu, ví dụ nhỏ, state, rule order, dry run, bẫy.
3. Lời giải JavaScript độc lập, có comment ở transition quan trọng, test biên và complexity.
4. Bài recall/biến thể, cùng bằng chứng người học đã tự làm sau ít nhất một lần ôn lại.

Không sao chép nội dung mock chưa công khai. Hiện danh mục có **40 bài công khai** và **8 bài mock bị khóa**; mock chỉ được ghi metadata, không ghi hay suy đoán nội dung.

## Cách đọc trạng thái

| Trạng thái | Nghĩa chính xác |
| --- | --- |
| `Cần viết` | Chưa có bài học PCCP tự chứa và lời giải riêng. |
| `Có tham chiếu` | Xuất hiện trong audit/khái niệm hoặc có lời giải ở một bộ khác; chưa đủ chuẩn từng đề. |
| `Đang viết` | Đã có trang đề/hướng dẫn hoặc solution riêng, còn thiếu một lớp. |
| `Đã hoàn tất` | Đủ cả bốn lớp phía trên và qua kiểm tra code/link. |

Không được đổi sang `Đã hoàn tất` chỉ vì pattern liên quan đã `FULL`.

## Toàn bộ đề công khai đang theo dõi

| ID | Đề | Trọng tâm chính | Nơi phải học | Trạng thái hiện tại |
| --- | --- | --- | --- | --- |
| P01 | Băng bó | simulation theo thời gian, reset combo | [Simulation — P01](chapters/04_simulation/04_PCCP_Public_Problems.md#p01--băng-bó) | Đang viết |
| P02 | Khai thác dầu | BFS component + cộng theo cột | BFS/DFS | Có tham chiếu |
| P03 | Đồng hồ analog | mô phỏng/giao điểm thời gian | Simulation/Math | Có tham chiếu |
| P04 | Di chuyển xe kéo | backtracking hai thực thể | Backtracking | Có tham chiếu |
| P05 | Trình phát video | parse thời gian, interval rule | Simulation | Có tham chiếu |
| P06 | Thử thách game xếp hình | binary search đáp án | Binary Search | Có tham chiếu |
| P07 | Tìm nguy cơ va chạm | batch time + Map count | Simulation + Map | Có tham chiếu |
| P08 | Khôi phục biểu thức | parsing + brute force | Backtracking/Parsing | Có tham chiếu |
| P17 | Hạn lưu trữ dữ liệu cá nhân | parse date + Map | Map/Simulation | Cần viết |
| P18 | Dạo công viên | grid move + bounds | Matrix/Simulation | Có tham chiếu |
| P19 | Game gắp thú bằng cần cẩu | matrix + stack reduction | Matrix/Stack | Cần viết |
| P20 | Cuộc đua chạy | array order + Map index | Map/Array | Có tham chiếu |
| P21 | Người chưa hoàn thành | frequency Map | Map/Set | Có tham chiếu |
| P22 | Ponketmon | Set và giới hạn chọn | Map/Set | Có tham chiếu |
| P23 | Danh bạ điện thoại | prefix + sort/Set | Map/Set/Sort | Có tham chiếu |
| P24 | Trang phục | frequency + tổ hợp | Map/Set | Có tham chiếu |
| P25 | Số thứ K | slice, sort, index | Sorting | Cần viết |
| P26 | Phát triển tính năng | queue batch | Stack/Queue | Có tham chiếu |
| P27 | Tiến trình | queue + priority | Stack/Queue | Cần viết |
| P28 | Cay hơn | min-heap | Heap | Cần viết |
| P29 | Xuồng cứu sinh | greedy + two pointers | Two Pointers/Greedy | Cần viết |
| P30 | Số mục tiêu | choose/undo | Backtracking | Cần viết |
| P31 | Đường ngắn nhất trên bản đồ game | BFS shortest path | BFS/DFS | Cần viết |
| P32 | Sự kiện giảm giá | fixed sliding window + frequency | Sliding Window | Có tham chiếu |
| P33 | Tổng dãy con liên tiếp | two pointers, tie | Two Pointers | Cần viết |
| P34 | Số lớn nhất | comparator proof | Sorting | Cần viết |
| P35 | Xe tải qua cầu | queue + capacity state | Stack/Queue | Có tham chiếu |
| P36 | Giá cổ phiếu | monotonic stack | Stack/Queue | Có tham chiếu |
| P37 | Tạo số lớn | greedy monotonic stack | Stack/Queue/Greedy | Có tham chiếu |
| P38 | Hệ thống đánh chặn | interval greedy | Greedy | Cần viết |
| P39 | Độ mệt mỏi | backtracking | Backtracking | Có tham chiếu |
| P40 | Mạng lưới | DFS/BFS component | BFS/DFS | Có tham chiếu |
| P41 | Thoát mê cung | BFS có checkpoint | BFS/DFS | Có tham chiếu |
| P42 | Biến đổi số | BFS/DP state | BFS/DFS/DP | Có tham chiếu |
| P43 | Tam giác số nguyên | DP bottom-up | DP | Cần viết |
| P44 | Đường đến trường | grid DP | DP | Có tham chiếu |
| P45 | Bộ điều khiển đĩa | scheduling heap | Heap | Cần viết |
| P46 | Chuyển đổi từ | BFS word graph | BFS/DFS | Có tham chiếu |
| P47 | Kiểm tra nhập cảnh | binary search feasibility | Binary Search | Cần viết |
| P48 | Node xa nhất | BFS distance | BFS/DFS | Có tham chiếu |

## Thứ tự lấp lỗ hổng

Học viên cần làm được câu 1–2 trước, sau đó mới ổn định câu 3–4. Vì vậy thứ tự viết không theo alphabet mà theo dependency:

```text
P01, P05, P17, P18, P19
→ P20–P27
→ P29, P32–P38
→ P02, P31, P40–P48
→ P03, P04, P06–P08 (đề nặng, nhiều concept kết hợp)
```

Mỗi lần thêm một đề, cập nhật trạng thái ở bảng này và thêm link tới lesson/solution. Bảng này là nguồn sự thật cho coverage đề thật; `PATTERN_COVERAGE_MATRIX.md` chỉ là coverage kỹ thuật.
