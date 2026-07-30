# Lộ trình PCCP JavaScript trong 37 ngày

**Khoảng học:** 30/07/2026–04/09/2026  
**Ngày thi người học cung cấp:** 05/09/2026  
**Mục tiêu vận hành:** viết JavaScript trôi chảy, giải chắc các dạng phổ biến, hoàn thành 5 lần thi thử 120 phút và giảm lỗi hidden test. Đây là kế hoạch tối ưu xác suất đạt 700+, không phải cam kết điểm.

> Lưu ý lịch thi: tại thời điểm kiểm tra 30/07/2026, lịch PCCP công khai không hiển thị kỳ thi thường lệ ngày 05/09/2026. Kế hoạch vẫn giữ đúng ngày người học cung cấp; hãy kiểm tra thư mời hoặc trang đăng ký riêng.

## Cách dùng lịch

- Mỗi mã `Pxx` trỏ tới đúng một dòng trong `PCCP_Problem_Tracker.csv`.
- Một buổi thường: **20 phút recall → 35 phút học → 30 phút viết template → 50–70 phút làm bài → 25–35 phút review/Error Log**.
- Review `R1/R3/R7` là tự nói lại invariant và code lại đoạn cốt lõi, không chỉ đọc lời giải. Cột ngày là mốc recall mặc định; `redo_rule` trong tracker quyết định khi nào phải code lại trọn vẹn.
- Với bài mới: dễ tự nghĩ 20–30 phút; trung bình 40–60 phút. Chỉ xem hint sau khi đã ghi bottleneck, brute force và độ phức tạp. Trong mock: không hint, không tài liệu, không AI.
- Hai bộ mock chính thức phải được giữ **chưa mở trang bài** đến 29/08 và 31/08. Roadmap/tracker buộc phải liệt kê tên và pattern để quản lý phạm vi; không bấm link, đọc đề, sample, discussion hay lời giải P09–P16 trước timer.
- Một số mốc toán học D+3/D+7 rơi vào hoặc sau 05/09. Chúng được giữ trong tracker để đúng chu kỳ nhưng là review hậu kỳ tùy chọn; không chen chúng vào buổi thi.
- Nếu thiếu thời gian, giữ thứ tự: **review đến hạn → template bắt buộc → bài nhóm A → bài nhóm B → bài nhóm C**.

## Cổng năng lực theo giai đoạn

| Hạn | Phải đạt |
|---|---|
| 02/08 | Viết được loop, matrix chữ nhật, `Map`, `Set`, numeric sort không nhìn tài liệu |
| 09/08 | Mô phỏng/đếm/sort chắc; tự tạo test biên; timed set 60 phút |
| 16/08 | Dùng stack, queue-head, heap, binary search; hoàn thành mock nền tảng 120 phút |
| 23/08 | Duyệt grid/graph bằng BFS/DFS lặp; hoàn thành mock graph 120 phút |
| 28/08 | Nhận diện greedy/DP/prefix/two-pointer và biết phần nào chỉ cần nhận diện |
| 04/09 | Hoàn thành 5 mock, khóa Error Log, không học thuật toán mới |

## Giai đoạn 1 — JavaScript syntax rescue (30/07–02/08)

| Ngày | Chủ đề và mục tiêu | Học + template phải viết lại | Bài/hoạt động | Thời lượng | Tiêu chí hoàn thành | Review đến hạn |
|---|---|---|---|---:|---|---|
| **D1 · 30/07** | Array, loop, function, numeric sort; tạo baseline | `for`, `for...of`, `map`/`filter` ở mức đọc; array traversal; clone 1D; `(a,b)=>a-b`; tự sửa ví dụ matrix sai của người học | **P25 – Số thứ K** | 180 phút | Code P25 không lỗi sort; viết 8 test nhỏ; ghi ít nhất 3 lỗi vào Error Log; array template không nhìn | Chưa có |
| **D2 · 31/07** | Matrix chữ nhật, index và boundary | Matrix traversal; `Array.from`; clone 2D; luôn dùng `arr[row][col]`; số cột là `arr[row].length` | Không mở bài mới; 6 drill matrix tự tạo | 170 phút | Tự viết cộng hai matrix chữ nhật 2×3; chứng minh không dùng chung reference; vượt bộ test 1×1, 1×N, N×1 | **R1:** P25 |
| **D3 · 01/08** | String, Set, tọa độ grid | String immutable; `Set.has/add`; matrix movement; boundary helper | **P18 – Dạo công viên**, **P22 – Ponketmon** | 190 phút | P18/P22 tự giải; giải thích khi dùng Set thay Map; không đổi row/column | Chưa có |
| **D4 · 02/08** | Map/frequency, stack cơ bản, tổng ôn tuần | `Map.get(key) ?? 0`; Object vs Map vs Set; stack `push/pop`; recode 8 template Tầng 1 | **P19 – Game gắp thú**, **P21 – Người chưa hoàn thành** | 210 phút | 8 template nền tảng viết không nhìn; 4 bài D1–D4 có Error Log; timed set 45 phút không tra cứu | **R1:** P18, P22 · **R3:** P25 |

## Giai đoạn 2 — Implementation, simulation, array/string/hash/sort (03/08–09/08)

| Ngày | Chủ đề và mục tiêu | Học + template phải viết lại | Bài/hoạt động | Thời lượng | Tiêu chí hoàn thành | Review đến hạn |
|---|---|---|---|---:|---|---|
| **D5 · 03/08** | Simulation theo sự kiện | Vẽ timeline; state transition; cập nhật theo đúng thứ tự; array loop | **P01 – Băng bó** | 190 phút | Tự mô phỏng sample bằng bảng thời gian; code O(số đòn đánh); test chết đúng thời điểm và bonus heal | **R1:** P19, P21 |
| **D6 · 04/08** | Simulation với interval và string parsing | Parse `"mm:ss"`; clamp; xử lý command theo thứ tự | **P05 – Trình phát video** | 180 phút | Viết helper đổi giây hai chiều; test biên 00:00, cuối video, interval opening | **R1:** P01 · **R3:** P18, P22 |
| **D7 · 05/08** | Map trạng thái động | `Map` từ tên→thứ hạng; swap và cập nhật hai chiều | **P20 – Cuộc đua chạy** | 180 phút | Không dùng `indexOf` trong vòng lặp; nêu đúng complexity; test gọi lặp cùng người | **R1:** P05 · **R3:** P19, P21 |
| **D8 · 06/08** | Frequency counter và tổ hợp đếm | Map frequency; tích các lựa chọn; Number safety | **P24 – Trang phục** | 180 phút | Tự suy ra công thức; test một loại/nhiều loại; kiểm tra kết quả có trong safe integer | **R1:** P20 · **R3:** P01 · **R7:** P25 |
| **D9 · 07/08** | Sort + quan hệ prefix | Numeric vs lexicographic sort; `startsWith`; adjacent invariant | **P23 – Danh bạ điện thoại** | 185 phút | Giải thích vì sao chỉ cần cặp kề sau sort; không nhầm prefix với substring | **R1:** P24 · **R3:** P05 |
| **D10 · 08/08** | Greedy nhập môn | Sort, two pointer hai đầu; lập luận lựa chọn cục bộ | **P29 – Xuồng cứu sinh** | 190 phút | Tự chứng minh ghép người nặng nhất; test mọi người bằng nhau, một người, không ghép được | **R1:** P23 · **R3:** P20 · **R7:** P18, P22 |
| **D11 · 09/08** | Tổng ôn tuần + timed practice | Viết lại array/matrix/Map/Set/sort/simulation không nhìn; audit Error Log | Timed set 60 phút: làm lại 2 bài yếu nhất trong P01/P05/P20/P23/P29 | 210 phút | Hai bài chạy trong 60 phút; tự tạo ≥5 test/bài; chốt 3 quy tắc lỗi hay lặp | **R1:** P29 · **R3:** P24 · **R7:** P19, P21 |

## Giai đoạn 3 — Stack, queue, heap, binary search (10/08–16/08)

| Ngày | Chủ đề và mục tiêu | Học + template phải viết lại | Bài/hoạt động | Thời lượng | Tiêu chí hoàn thành | Review đến hạn |
|---|---|---|---|---:|---|---|
| **D12 · 10/08** | Queue-head và stack/state | Queue bằng array + `head`; không `shift()` lặp; stack LIFO | **P27 – Tiến trình**, **P36 – Giá cổ phiếu** | 210 phút | Cả hai bài đúng; giải thích FIFO/LIFO; nêu vì sao queue-head tránh dịch phần tử | **R3:** P23 · **R7:** P01 |
| **D13 · 11/08** | Greedy stack | Monotonic/selection stack; invariant “còn lượt xóa” | **P37 – Tạo số lớn** | 190 phút | Tự nói invariant trước khi code; test chữ số tăng/giảm/bằng nhau; xử lý phần xóa còn lại | **R1:** P27, P36 · **R3:** P29 · **R7:** P05 |
| **D14 · 12/08** | Binary search trên đáp án | `firstTrue`; miền tìm kiếm; predicate đơn điệu; tránh loop vô hạn | **P06 – Thử thách game xếp hình** | 210 phút | Viết predicate tách biệt; chứng minh đơn điệu; test min/max; dùng `Math.floor((lo+hi)/2)` an toàn trong miền | **R1:** P37 · **R7:** P20 |
| **D15 · 13/08** | Heap/Priority Queue từ đầu | Viết class min-heap; `push`, `pop`, `peek`; so sánh bằng callback | Không mở bài mới; 3 drill heap + 3 drill binary | 190 phút | Min-heap vượt chuỗi chèn/xóa tự tạo; binary `firstTrue` viết không nhìn; không dùng `shift()` | **R1:** P06 · **R3:** P27, P36 · **R7:** P24 |
| **D16 · 14/08** | Binary search mức trung bình | Chọn upper bound; Big O; predicate dựa trên tổng | **P47 – Kiểm tra nhập cảnh** *(nhóm C, bỏ nếu backlog)* | 190 phút | Nếu làm: xác định cận trên và predicate đúng; nếu bỏ: recode P06 + 2 drill; không dùng BigInt nếu constraints không cần | **R3:** P37 · **R7:** P23 |
| **D17 · 15/08** | Cổng template tuần + chuẩn bị mock | Viết không nhìn: stack, queue-head, heap, exact binary, `firstTrue`; audit syntax | Không mở bài mock; recode bài yếu P27/P36/P37/P06 | 210 phút | 5 template chạy bộ smoke test; chọn thứ tự scan đề; chuẩn bị phiếu mock; ngủ đúng giờ | **R1:** P47 nếu đã làm · **R3:** P06 · **R7:** P29 |
| **D18 · 16/08** | **Mock 1 – nền tảng, 120 phút** | Không học trước; dùng môi trường giống thi | **P26 – Phát triển tính năng**, **P28 – Cay hơn**, **P34 – Số lớn nhất**, **P35 – Xe tải qua cầu** | 120 phút mock + 90 phút hậu kiểm | Ngồi đủ 120 phút; không hint/tài liệu/AI; ghi thời gian từng bài và submit; sau giờ mới xem lỗi | Chỉ review ngắn bài yếu; không chen bài cũ vào 120 phút |

## Giai đoạn 4 — DFS, BFS, grid, graph, backtracking (17/08–23/08)

| Ngày | Chủ đề và mục tiêu | Học + template phải viết lại | Bài/hoạt động | Thời lượng | Tiêu chí hoàn thành | Review đến hạn |
|---|---|---|---|---:|---|---|
| **D19 · 17/08** | Connected component trên grid | BFS/iterative DFS; visited đúng lúc; thu thập cột duy nhất | **P02 – Khai thác dầu** | 220 phút | O(R×C); mỗi component chỉ duyệt một lần; test matrix chữ nhật và component chạm nhiều cột | **R1:** P26, P28, P34, P35 · **R3:** P47 · **R7:** P27, P36 |
| **D20 · 18/08** | BFS nhiều chặng + state | Queue-head; khoảng cách; reset visited theo chặng | **P41 – Thoát mê cung** | 190 phút | Tách BFS thành helper; xử lý không tới lever/exit; visited không rò giữa hai lượt | **R1:** P02 · **R7:** P37 |
| **D21 · 19/08** | BFS trên word graph | Tạo neighbor; visited; branching và pruning | **P46 – Chuyển đổi từ** *(nhóm C)* | 190 phút | Tìm shortest steps; không tái thăm; test target vắng; nếu backlog, thay bằng recode P41 | **R1:** P41 · **R3:** P26, P28, P34, P35 · **R7:** P06 |
| **D22 · 20/08** | Backtracking nhiều tác nhân | State đầy đủ; apply/undo; collision; pruning | **P04 – Di chuyển xe kéo** *(nhóm C, bài khó)* | 220 phút | Sau 60 phút phải có state/pseudocode; nếu chưa, xem 1 hint rồi code lại; không để bài này phá lịch | **R1:** P46 · **R3:** P02 |
| **D23 · 21/08** | Graph BFS theo lớp | Adjacency list; distance; đếm node xa nhất | **P48 – Node xa nhất** *(nhóm C)* | 190 phút | Dựng graph vô hướng đúng; đánh dấu khi enqueue; test graph nhánh và node mức cuối | **R1:** P04 · **R3:** P41 · **R7:** P47 |
| **D24 · 22/08** | Tổng ôn graph + cổng template | Recode BFS grid, iterative DFS, adjacency list, backtracking skeleton | Không mở bài mock; làm lại bài yếu P02/P41/P04 | 210 phút | 4 template không nhìn; phân biệt đường ngắn nhất/vùng liên thông/thử lựa chọn; audit Error Log tuần | **R1:** P48 · **R3:** P46 |
| **D25 · 23/08** | **Mock 2 – graph/mixed, 120 phút** | Không học trước | **P30 – Số mục tiêu**, **P31 – Đường ngắn nhất bản đồ**, **P39 – Độ mệt mỏi**, **P40 – Mạng lưới** | 120 phút mock + 90 phút hậu kiểm | Đủ 120 phút, không hint/tài liệu/AI; ghi thời gian và số submit; chọn bài theo fit, không theo số thứ tự | **R3:** P04 · **R7:** P26, P28, P34, P35 sau mock |

## Giai đoạn 5 — Greedy, DP cơ bản và bài PCCP tổng hợp (24/08–28/08)

| Ngày | Chủ đề và mục tiêu | Học + template phải viết lại | Bài/hoạt động | Thời lượng | Tiêu chí hoàn thành | Review đến hạn |
|---|---|---|---|---:|---|---|
| **D26 · 24/08** | Event/sweep + greedy interval | Sort sự kiện; interval overlap; state theo thời gian | **P03 – Đồng hồ analog**, **P38 – Hệ thống đánh chặn** | 220 phút | P38 tự chứng minh greedy; P03 có bảng sự kiện/biên trước code; không brute force theo mili-giây | **R1:** P30, P31, P39, P40 · **R3:** P48 · **R7:** P02 |
| **D27 · 25/08** | Simulation nhiều đối tượng + BFS/DP | Lập lịch theo tick; tránh đếm trùng; BFS/DP trạng thái số | **P07 – Nguy cơ va chạm**, **P42 – Biến đổi số** | 220 phút | P07 xử lý va chạm cùng thời điểm; P42 không tái tính state; kiểm tra unreachable | **R1:** P03, P38 · **R7:** P41 |
| **D28 · 26/08** | DP 2D cơ bản | Định nghĩa `dp[row][col]`; base case; modulo; obstacle | **P44 – Đường đến trường** | 190 phút | Nói được ý nghĩa mỗi ô trước code; test 1×1, hàng/cột đơn, puddle; modulo đúng chỗ | **R1:** P07, P42 · **R3:** P30, P31, P39, P40 · **R7:** P46 |
| **D29 · 27/08** | Two pointer/prefix trên đoạn liên tiếp | Prefix sum; two pointer với số dương; tie-break | **P33 – Tổng dãy con liên tiếp** | 190 phút | Giải thích vì sao cửa sổ chỉ tiến tới; đúng tie-break ngắn nhất rồi vị trí nhỏ nhất | **R1:** P44 · **R3:** P03, P38 · **R7:** P04 |
| **D30 · 28/08** | Parsing + suy luận biểu thức | String/token; thử hệ cơ số hợp lệ; nhất quán giả thuyết | **P08 – Khôi phục biểu thức** | 220 phút | Liệt kê constraints của hệ cơ số; không chọn bừa khi nhiều đáp án; chốt gate DP/greedy/prefix | **R1:** P33 · **R3:** P07, P42 · **R7:** P48 |

## Giai đoạn 6 — Mock, sửa lỗi và taper (29/08–04/09)

| Ngày | Chủ đề và mục tiêu | Học + template phải viết lại | Bài/hoạt động | Thời lượng | Tiêu chí hoàn thành | Review đến hạn |
|---|---|---|---|---:|---|---|
| **D31 · 29/08** | **Mock 3 – PCCP chính thức bộ 1** | Mở bộ mock lần đầu khi bấm giờ | **P09–P12** | 120 phút mock + 90 phút hậu kiểm | Đủ 120 phút, không hint/tài liệu/AI; báo cáo đủ đọc/nghĩ/code/debug/submit; chưa đọc lời giải trước khi hết giờ | **R1:** P08 · **R3:** P44 |
| **D32 · 30/08** | Review Mock 3 — bộ chính thức 1 | Phân loại mọi lỗi; đóng lời giải rồi recode; chọn 2 template yếu | Không mở bộ chính thức 2; làm lại 2 bài sai quan trọng của P09–P12 | 210 phút | Mỗi lỗi có root cause + revealing test + rule; hai bài chạy lại từ file trống | **R1:** P09–P12 · **R3:** P33 · **R7:** P30, P31, P39, P40 |
| **D33 · 31/08** | **Mock 4 – PCCP chính thức bộ 2** | Mở bộ mock lần đầu khi bấm giờ | **P13–P16** | 120 phút mock + 90 phút hậu kiểm | Quy trình như thi thật; không mang nhận định điểm từ Mock 1 sang; ghi số test/submission nếu nền tảng hiển thị | **R3:** P08 · **R7:** P03, P38 sau mock |
| **D34 · 01/09** | Review Mock 4 — bộ chính thức 2 | Recode bài sai; viết 5 template yếu nhất; gom lỗi theo pattern | Không mở bài mới | 220 phút | P13–P16 đều có postmortem; top-3 rủi ro cuối cùng và test chống lỗi tương ứng | **R1:** P13–P16 · **R3:** P09–P12 · **R7:** P07, P42 |
| **D35 · 02/09** | **Mock 5 – tổng duyệt cuối** | Môi trường, giờ bắt đầu và vật dụng giống thi | **P17 – Hạn lưu trữ**, **P32 – Giảm giá**, **P43 – Tam giác số**, **P45 – Bộ điều khiển đĩa** *(P45 là C nhưng khóa cho mock này)* | 120 phút mock + 75 phút hậu kiểm | Giữ 15–18 phút cuối audit; không hint; chỉ xem lỗi sau khi hết 120 phút; chốt chiến thuật cá nhân | **R7:** P44 |
| **D36 · 03/09** | Sửa lỗi cuối, không học mới | Recode bài yếu nhất Mock 5; viết template liên quan; đọc toàn Error Log | Không bài mới | 180 phút | Không còn lỗi syntax/index chưa có rule; chốt 3 revealing test cuối | **R1:** P17/P32/P43/P45 · **R3:** P13–P16 · **R7:** P33 |
| **D37 · 04/09** | Taper: giữ đầu óc tỉnh | Đọc cheat sheet; viết từ nhớ 8 template Tầng 1; xem chiến thuật 120 phút; kiểm tra hướng dẫn thi riêng | Không submit bài mới | 60–90 phút | Dừng đúng giờ; chuẩn bị thiết bị/giấy tờ; xác nhận giờ và múi giờ; ngủ đủ | Chỉ **R7:** P08 ở mức recall |

## Quy tắc xử lý backlog

1. Không dồn bài nhóm C vào ngày kế tiếp. Bỏ P04/P46/P47/P48 trước khi đụng lịch mock; **P45 là ngoại lệ đã khóa trong Mock 5**.
2. Không hoãn review của bài từng sai syntax/index/boundary; rút bài mới thay vì rút review.
3. Không thay mock 120 phút bằng bốn phiên rời.
4. Nếu nghỉ một ngày, tiếp tục theo **ngày lịch**, đưa bài mới bị lỡ vào backlog nhóm tương ứng; giữ nguyên 29/08, 31/08 và 02/09.
5. Từ 29/08 không học pattern mới. Mọi thời gian thêm dùng cho recode, test biên và Error Log.

## Mẫu một phiên review 15–25 phút

1. Không mở code cũ: nói lại dấu hiệu, invariant và complexity.
2. Viết pseudocode trong 3 phút.
3. Code đoạn cốt lõi hoặc toàn bài từ file trống.
4. Chạy sample và ít nhất 3 hidden-test tự tạo.
5. Nếu vẫn sai, cập nhật Error Log và đặt lại review vào ngày hôm sau.
