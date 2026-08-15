# PCCP 700+ — Official-source reference của curriculum

> Cập nhật policy: 15/08/2026 · Ngôn ngữ: JavaScript · Sprint 28 ngày: 15/08–11/09/2026 · Ngày thi người học cung cấp: 12/09/2026

[`PCCP_700_MASTER_NAVIGATOR.md`](PCCP_700_MASTER_NAVIGATOR.md) là **entrypoint duy nhất** để quyết định hôm nay đọc gì, làm bài nào và lúc nào được mở mock. File này chỉ giải thích evidence official và policy được Navigator gọi tới; không được dùng như một lịch học cạnh tranh. Nếu hai file lệch nhau, dừng ở Navigator và sửa reference này, không tự chọn một đường học thứ hai.

Không tự thêm bài từ blog, LeetCode, BOJ hoặc danh sách cộng đồng. Mọi handbook, bank, lesson, mock bank và tracker chỉ được mở qua đúng link/ngày trong Navigator.

## 1. Điều nguồn chính thức thực sự xác nhận

PCCP là bài thi code gồm **4 câu trong 120 phút**. Trang hiện hành liệt kê JavaScript trong các ngôn ngữ được chọn. Brochure chính thức mô tả phạm vi theo năm lớp:

1. Implementation đúng yêu cầu.
2. String, Array, Greedy, Sort.
3. Stack, Queue, Deque, Hash, Binary Search, DFS, BFS.
4. Graph, Tree, Heap, Dynamic Programming.
5. Chọn cấu trúc/thuật toán phù hợp và viết chương trình chính xác, không lỗi, hiệu quả.

Mốc 700 thuộc LV.3 `600–749`; LV.4 bắt đầu ở `750`.

Nguồn: [trang PCCP hiện hành](https://certi.programmers.co.kr/about/pccp), [brochure chính thức](https://business.programmers.co.kr/static/business/certification_intro.pdf), [sample hub](https://certi.programmers.co.kr/about/sample).

Không có nguồn chính thức nào bảo đảm:

- mỗi câu có một mức điểm cố định;
- giải đúng ba câu chắc chắn được 700 hoặc 750;
- một pattern cụ thể chắc chắn xuất hiện ở kỳ thi kế tiếp;
- danh sách trong brochure là taxonomy đóng, vì nguồn dùng cách diễn đạt “v.v.”.

Vì vậy chiến lược 700+ là tăng xác suất giải chắc phần implementation và medium, đồng thời đủ graph/DP/heap để nhận partial hoặc hoàn thành câu khó phù hợp.

## 2. Bằng chứng dùng để ưu tiên pattern

### Lớp A — phạm vi PCCP chính thức

Không được bỏ hoàn toàn: implementation, string/array, greedy/sort, stack/queue/deque, hash, binary search, DFS/BFS, graph/tree, heap và DP.

### Lớp B — khóa luyện PCCP chính thức

Khóa luyện do Programmers phát hành có các module: **Hashing, Array implementation, Two pointers, Sorting & Greedy, DFS, BFS, Graph**, sau đó là hai practice test bốn câu và phần review. Đây là bằng chứng mạnh để ưu tiên khả năng implementation và traversal, nhưng không phải bằng chứng về timer tích hợp; curriculum tự áp 120 phút và không dùng outline này để loại heap/binary search/DP khỏi syllabus.

Nguồn: [PCCP preparation course](https://school.programmers.co.kr/learn/courses/14760).

### Lớp C — High-score Kit chính thức

Programmers mô tả Kit là các dạng thường xuất hiện hoặc hay bị sai trong coding test. Metadata hiện hành ghi:

| Nhóm | Metadata của Kit | Cách dùng trong curriculum |
|---|---|---|
| Hash | tần suất cao | Core |
| Sort | tần suất cao | Core |
| Exhaustive Search | tần suất cao | Core |
| DFS/BFS | tần suất cao | Core |
| Stack/Queue | tần suất trung bình | Core |
| Heap | tần suất trung bình | Core |
| Greedy | tần suất thấp | Core representative + transfer |
| DP | tần suất thấp | DP cơ bản core; L4 stretch |
| Binary Search | tần suất thấp | Một template answer-search core |
| Graph | tần suất thấp | BFS graph core; MST/reachability transfer |

Đây là thống kê cho coding test trên Programmers, **không phải xác suất câu PCCP**.

Nguồn: [Algorithm Practice Kit](https://school.programmers.co.kr/learn/challenges?tab=algorithm_practice_kit).

## 3. Toàn bộ pattern phải cover

| Cluster | Phải tự làm được | Chỉ cần nhận diện/transfer |
|---|---|---|
| Implementation | scan, parsing, matrix, state update, event order, tie/boundary | nhảy theo event thay vì mô phỏng từng tick |
| String | tokenization/whitespace, prefix/suffix, chunk/run + phần dư, base conversion, long requirement | rotation + matching stack; scan chuỗi dài tuyến tính |
| Hash/Set | frequency, membership, key→metadata, composite key | group + sort; sliding window frequency |
| Sort | numeric sort, custom comparator, sort để lộ boundary | interval sort; sort + two pointers |
| Two pointers/window/prefix | hai pointer đơn điệu, fixed window, prefix/difference cơ bản | variable window; difference array 2D |
| Stack/Queue/Deque | matching/reduction stack, queue bằng head, re-enqueue | monotonic stack, capacity/time queue, two queue pointers |
| Heap | min-heap API và comparator, lấy phần tử tốt nhất liên tục | event + heap; double priority queue |
| Exhaustive/backtracking | tính search space, choose/explore/unchoose, restore | permutation, tree edge cut, nhiều thực thể |
| Greedy | viết lý do lựa chọn an toàn, two pointers, interval end | MST/DSU và case analysis khó |
| Binary search | first true/last true trên answer, predicate đơn điệu | cận số lớn và cutoff sớm |
| BFS/DFS | grid shortest, component, implicit graph, visited đúng thời điểm | multi-phase/state nhiều chiều |
| Graph/Tree | adjacency list, parent/visited, unweighted distance | Dijkstra, MST/DSU, reachability |
| DP | state, transition, base, iteration order; 1D/2D cơ bản | Set-DP; circular/interval DP |

## 4. Cách dùng bank

Bank canonical: [`PCCP_OFFICIAL_PRACTICE_BANK.csv`](PCCP_OFFICIAL_PRACTICE_BANK.csv).

Bank có 69 bài: **32 CORE**, 22 TRANSFER, 7 STRETCH và 8 RESERVED_MOCK. Mục tiêu tối thiểu không phải làm đủ 69 bài; mục tiêu là qua đủ sáu gate bằng nhóm CORE rồi dùng TRANSFER để kiểm tra khả năng nhận dạng bài chưa gặp.

Sáu bài official trong [`PCCP_OFFICIAL_SYLLABUS_RESERVE.csv`](PCCP_OFFICIAL_SYLLABUS_RESERVE.csv) đóng các coverage mỏng của String compression, Matrix, Deque/Queue, event-stack và Tree parent propagation. **SR002 — Nén chuỗi là ngoại lệ bắt buộc ở D8** để đóng String gate; năm reserve còn lại chỉ mở theo điều kiện trong [Master Navigator](PCCP_700_MASTER_NAVIGATOR.md#51-ma-trận-đóng-kín-syllabus).

Nhãn có nghĩa:

- `CORE`: bắt buộc học và tự code. Có thể bỏ qua một bài warmup chỉ khi code lại từ trắng trong timebox.
- `TRANSFER`: không học lời giải trước; dùng làm bài unseen/gate hoặc bỏ khi thiếu thời gian.
- `STRETCH`: chỉ làm khi các gate core đạt. Không hy sinh độ chắc Q1–Q3 để cày bài này.
- `RESERVED_MOCK`: cấm mở trước buổi 120 phút đã định.
- `SRxxx`: reserve có điều kiện, ngoại trừ **SR002 bắt buộc**; không tự động làm các reserve khác chỉ để tăng số lượng bài.

Một bài chỉ được coi là xong khi:

1. Viết được contract và complexity trước code.
2. Tự tạo ba edge case.
3. AC trong timebox: warmup 20 phút, Level 2 core 35 phút, Level 3 core 50 phút.
4. Nếu xem hint/pseudocode/code, đóng lại và recode từ trắng.
5. Lỗi lặp phải ghi vào error log cùng test bắt lỗi.
6. Bài từng cần hint/WA đặt retry D+1; fail thì D+3, sau lần sạch kiểm skeleton + revealing test ở D+7.

## 5. Dependency gate tham chiếu

Lịch thực thi duy nhất là **D1–D28, 15/08–11/09/2026** trong Navigator. Các gate dưới đây chỉ giải thích dependency và tiêu chuẩn giảm tải; không dùng chúng để tự tạo lịch khác hoặc kéo mock/taper sang ngày mới.

Không học theo thứ tự ID. Trong phạm vi ngày Navigator đã giao, ưu tiên dependency này:

### Gate 1 — Implementation và String không được phép mất điểm

Core: `OF015, OF048, OF049, OF050, OF051` và **`SR002` bắt buộc tại D8**.

Recall/transfer: `OF018, OF019`.

Qua gate khi ba bài mới liên tiếp không mắc lỗi index, mutation, sort số, row/column hoặc event order, đồng thời tự code được token/chunk/run, flush phần dư và long requirement của SR002.

### Gate 2 — Hash, sort và đoạn liên tiếp

Core: `OF001, OF003–OF004, OF016, OF028, OF052–OF053`.

Transfer: `OF002, OF005, OF017, OF058, OF060`.

Qua gate khi tự phân biệt được Map/Set; fixed/variable window; two pointers chỉ tiến; comparator có lý do.

### Gate 3 — Stack, queue và heap

Core: `OF007–OF013, OF027`.

Transfer: `OF006, OF014, OF054, OF061`.

Qua gate khi code queue bằng `head`, min-heap từ template nhớ được, monotonic stack giải thích được mỗi index push/pop tối đa một lần.

### Gate 4 — Brute force, backtracking, greedy và binary search

Core: `OF022–OF023, OF027–OF028, OF036, OF043, OF057`.

Transfer: `OF020–OF021, OF024–OF025, OF029–OF031`.

Qua gate khi luôn tính search space trước backtracking; restore state đúng; binary search nói được predicate và boundary; greedy có proof/counterexample.

### Gate 5 — BFS, graph và tree

Core: `OF037–OF039, OF045, OF055`. Bài bridge tree `OF023` đã hoàn thành ở Gate 4.

Transfer: `OF041, OF046, OF056, OF059`.

Qua gate khi mark visited lúc enqueue, state key đủ chiều, dựng adjacency list đúng và phân biệt BFS thường với Dijkstra.

### Gate 6 — DP cơ bản

Core: `OF032–OF033`.

Transfer: `OF031`.

Qua gate khi viết state/transition/base/order trước code và recode được grid DP hoặc triangle DP từ trắng.

### Stretch gate

Chỉ sau khi Gate 1–6 đều đạt: `OF026, OF034–OF035, OF040, OF042, OF044, OF047`.

## 6. Luật giảm tải cho mục tiêu 700+

Nếu thiếu thời gian:

1. Không bỏ Gate 1–3.
2. Gate 4–6 giữ toàn bộ core nhưng có thể bỏ transfer.
3. Bỏ toàn bộ stretch.
4. Không lấy thời gian mock để bù bài lẻ.
5. Sau hai mock mà cùng root cause lặp lại, dừng học pattern mới và repair đúng cluster đó.

`SR002` thuộc String gate bắt buộc, không bị hạ thành optional khi giảm tải. Nếu trễ lịch, bỏ STRETCH rồi TRANSFER trước; giữ bốn ngày mock/past, postmortem và taper đúng mốc Navigator.

Số lượng không phải mục tiêu. `CORE` có bài warmup và bài representative; nếu một warmup quá dễ, dùng nó làm recall 10–15 phút chứ không thay bằng bài ngoài bank.

## 7. Mock bank

Thứ tự mở authoritative nằm trong Navigator; metadata nằm ở [`locked/OFFICIAL_MOCK_BANK.md`](locked/OFFICIAL_MOCK_BANK.md). Bốn set chính là **honor-system spoiler boundary**, không phải khóa kỹ thuật: raw URL/bank vẫn tồn tại để audit, còn người học cam kết không mở course, tên bài, pattern, lesson mirror hoặc post-analysis trước timer/ngày unlock.

| Ngày Navigator | Set honor-locked | Policy |
|---|---|---|
| D18 · 01/09 | Free Official Mock 1 — course 15008 | Curriculum tự áp timer 120 phút |
| D20 · 03/09 | Free Official Mock 2 — course 15009 | Curriculum tự áp timer 120 phút |
| D22 · 05/09 | Public Past Set A — `OF062–OF065` | Chỉ honor-unlock khi timer bắt đầu |
| D24 · 07/09 | Public Past Set B — `OF066–OF069` | Chỉ honor-unlock khi timer bắt đầu |

Course 15008/15009 công bố bốn coding exercises, nhưng tài liệu này **không tuyên bố public course có timer 120 phút tích hợp**. Timer 120 phút, milestone và kỷ luật đóng tài liệu là quyết định mô phỏng của curriculum.

Course 20847/20848 chỉ là nguồn optional nếu còn thời gian sau bốn set chính. Public metadata quảng bá bốn exercises nhưng outline public hiện chỉ lộ ba lesson hậu kiểm; **không bao giờ ghép ba lesson rời rồi gọi đó là full mock**. Chỉ tính là mock nếu course test entrypoint thực sự mở được một phiên test nguyên khối; nếu không, dùng các lesson như bài practice riêng.

Hai mock trong khóa PCCP trả phí 14760 cũng optional; curriculum không giả định người học đã mua khóa.

## 8. Chiến thuật 120 phút

Đây là protocol duy nhất dùng cho cả bốn mock/past set và ngày thi. Các milestone là **quyết định chiến lược của curriculum**, không phải quy định/chia điểm do Programmers công bố.

| Mốc | Việc |
|---:|---|
| `0–5` | Scan đủ bốn câu; ghi constraint, complexity mục tiêu, rủi ro và confidence; không mặc định câu 4 khó nhất |
| `5–25` | Làm bài chắc nhất, chạy boundary test và bấm **`Submit Code`** cho riêng bài đó |
| `25–55` | Làm bài thứ hai; nếu park thì ghi state hiện tại trước khi đổi |
| `55–90` | Làm bài thứ ba khả thi nhất; không hy sinh hai bài tốt cho một bài khó |
| `90–102` | Bài còn lại hoặc hoàn thiện bài gần xong; chỉ code partial khi có invariant/complexity có cơ sở |
| `102–116` | Audit hidden edge, index, empty/singleton, duplicate, tie, mutation, overflow/precision và complexity |
| `116–120` | Chạy lại sample cần thiết và kiểm trạng thái **`Submit Code` của cả bốn câu** |

`Run Test`/sample pass không thay thế submit. Theo [coding-test UI guide](https://user-guide.grepp.co/en/articles/ProgrammingCoding-Test-161a992a), mỗi câu có luồng submit riêng; curriculum tuyệt đối **không trông chờ auto-submit khi hết giờ**. Code chưa bấm `Submit Code` không được coi là đã nộp.

Trong mock, với từng bài phải ghi trước khi xem kết quả: start minute, submit minute/count, expected complexity và `confidence 0–100%` vào [`TRACKER_PCCP_MOCK_ATTEMPTS.csv`](TRACKER_PCCP_MOCK_ATTEMPTS.csv). Nếu confidence cao nhưng result thấp, repair test/proof thay vì chỉ học thêm pattern.

## 9. Chuẩn bị môi trường thi

Quy định live luôn lấy từ [Candidate Guide hiện hành](https://certi.programmers.co.kr/guide/main?tab=entrance); [coding-test UI guide](https://user-guide.grepp.co/en/articles/ProgrammingCoding-Test-161a992a) quyết định thao tác trong editor. Checklist khóa tại ngày 15/08/2026:

- chỉ chuẩn bị **một tờ A4 trắng và bút**; cheat sheet của repo chỉ ôn trước thi, không mang vào;
- trong kỳ thi không dùng IDE ngoài, search, AI, tài liệu hoặc thiết bị không được phép;
- có thể vào phòng từ **T−60** và cutoff vào phòng là **T−20**; không chờ tới sát cutoff;
- từ cutoff **T−20**, **không được rời phòng/khung giám sát cho tới khi bài thi kết thúc**;
- hoàn tất official pre-test trong cửa sổ **T−7 đến T−1**;
- kiểm đủ browser/network/charger, **webcam, camera mobile, giấy tờ ID và cấu hình one-screen**; xử lý màn hình phụ theo guide;
- trong editor, chạy custom/sample test khi cần nhưng phải bấm **`Submit Code` từng câu**; không có policy auto-submit để dựa vào.

Ít nhất một mock phải được tập trong đúng browser/editor, một màn hình, A4 trắng, không IDE phụ và không search. Kiểm lại guide ngay trước pre-test và ngày thi vì quy định vận hành có thể thay đổi.

Điểm mock chỉ là proxy. Không suy ra điểm PCCP từ số bài AC vì Programmers không công bố công thức điểm cố định theo câu.

## 10. Những thứ cố ý không nằm trong curriculum

- Bài cộng đồng không có mirror chính thức trên Programmers.
- Cày toàn bộ Level 1 hoặc toàn bộ Kit theo thứ tự.
- Thuộc solution của past paper trước mock.
- Segment tree, suffix array, flow, geometry nâng cao và DP Level 4 nếu core chưa vững.
- Tin rằng “ba câu chắc chắn 750”.

## 11. Nguồn research

- [PCCP current page](https://certi.programmers.co.kr/about/pccp)
- [Official certification brochure](https://business.programmers.co.kr/static/business/certification_intro.pdf)
- [Official sample hub](https://certi.programmers.co.kr/about/sample)
- [Official education resources](https://certi.programmers.co.kr/education-info/education)
- [Official PCCP preparation course](https://school.programmers.co.kr/learn/courses/14760)
- [Algorithm Practice Kit](https://school.programmers.co.kr/learn/challenges?tab=algorithm_practice_kit)
- [Official Candidate Guide](https://certi.programmers.co.kr/guide/main?tab=entrance)
- [Coding-test UI guide — Run Test và Submit Code](https://user-guide.grepp.co/en/articles/ProgrammingCoding-Test-161a992a)
- [Free Official Mock 1 — course 15008](https://school.programmers.co.kr/learn/courses/15008)
- [Free Official Mock 2 — course 15009](https://school.programmers.co.kr/learn/courses/15009)
- [Legacy practice course 20847](https://school.programmers.co.kr/learn/courses/20847)
- [Legacy practice course 20848](https://school.programmers.co.kr/learn/courses/20848)
- [Official public past-problem course](https://school.programmers.co.kr/learn/courses/19344)
- [Official public explanation course](https://school.programmers.co.kr/learn/courses/24542)

Chi tiết audit và giới hạn suy luận: [`docs/pccp-700-roadmap/OFFICIAL_RESEARCH_AUDIT_2026-08-12.md`](docs/pccp-700-roadmap/OFFICIAL_RESEARCH_AUDIT_2026-08-12.md).
