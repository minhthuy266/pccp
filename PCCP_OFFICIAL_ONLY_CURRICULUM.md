# PCCP 700+ — Curriculum source-first duy nhất

> Cập nhật research: 12/08/2026 · Ngôn ngữ: JavaScript · Ngày thi người học cung cấp: 12/09/2026

Đây là danh mục duy nhất để chọn **kiến thức và bài tập**. Không tự thêm bài từ blog, LeetCode, BOJ hoặc danh sách cộng đồng. Tài liệu khác trong repo chỉ được mở khi dòng học hiện tại trỏ đến nó.

## 1. Điều nguồn chính thức thực sự xác nhận

PCCP là bài thi code gồm **4 câu trong 120 phút**. Trang hiện hành liệt kê JavaScript trong các ngôn ngữ được chọn. Brochure chính thức mô tả phạm vi theo bốn lớp:

1. Implementation đúng yêu cầu.
2. String, Array, Greedy, Sort.
3. Stack, Queue, Deque, Hash, Binary Search, DFS, BFS.
4. Graph, Tree, Heap, Dynamic Programming.

Ngoài việc biết tên thuật toán, kỳ thi đánh giá khả năng chọn giải pháp đúng và hiệu quả. Mốc 700 thuộc LV.3 `600–749`; LV.4 bắt đầu ở `750`.

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

Khóa luyện do Programmers phát hành có các module: **Hashing, Array implementation, Two pointers, Sorting & Greedy, DFS, BFS, Graph**, sau đó là hai mock 4 câu/120 phút. Đây là bằng chứng mạnh để ưu tiên khả năng implementation và traversal, nhưng không dùng nó để loại heap/binary search/DP khỏi syllabus.

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

Sáu bài official trong [`PCCP_OFFICIAL_SYLLABUS_RESERVE.csv`](PCCP_OFFICIAL_SYLLABUS_RESERVE.csv) không làm bank/lịch phình ra. Chúng chỉ đóng các coverage mỏng của String compression, Matrix, Deque/Queue, event-stack và Tree parent propagation; điều kiện mở từng bài nằm trong [Master Navigator](PCCP_700_MASTER_NAVIGATOR.md#51-ma-trận-đóng-kín-syllabus).

Nhãn có nghĩa:

- `CORE`: bắt buộc học và tự code. Có thể bỏ qua một bài warmup chỉ khi code lại từ trắng trong timebox.
- `TRANSFER`: không học lời giải trước; dùng làm bài unseen/gate hoặc bỏ khi thiếu thời gian.
- `STRETCH`: chỉ làm khi các gate core đạt. Không hy sinh độ chắc Q1–Q3 để cày bài này.
- `RESERVED_MOCK`: cấm mở trước buổi 120 phút đã định.
- `SRxxx`: reserve có điều kiện; không tự động làm chỉ để tăng số lượng bài.

Một bài chỉ được coi là xong khi:

1. Viết được contract và complexity trước code.
2. Tự tạo ba edge case.
3. AC trong timebox: warmup 20 phút, Level 2 core 35 phút, Level 3 core 50 phút.
4. Nếu xem hint/pseudocode/code, đóng lại và recode từ trắng.
5. Lỗi lặp phải ghi vào error log cùng test bắt lỗi.

## 5. Thứ tự học bắt buộc

Không học theo thứ tự ID. Đi theo dependency này:

### Gate 1 — Implementation không được phép mất điểm

Core: `OF015, OF048, OF049, OF050, OF051`.

Recall/transfer: `OF018, OF019`.

Qua gate khi ba bài mới liên tiếp không mắc lỗi index, mutation, sort số, row/column hoặc event order.

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

Số lượng không phải mục tiêu. `CORE` có bài warmup và bài representative; nếu một warmup quá dễ, dùng nó làm recall 10–15 phút chứ không thay bằng bài ngoài bank.

## 7. Mock bank

Mock canonical và thứ tự mở nằm trong [`locked/OFFICIAL_MOCK_BANK.md`](locked/OFFICIAL_MOCK_BANK.md). File chỉ chứa metadata/course URL, không chứa lời giải. Trước buổi mock không mở lesson mirror, tên bài, pattern hay post-analysis.

Thứ tự:

1. Official Mock 1 — 120 phút.
2. Review/recode tối đa ba lỗi.
3. Official Mock 2 — 120 phút.
4. Public Past Set A — 120 phút.
5. Public Past Set B — 120 phút.
6. Legacy official practice test A/B nếu còn thời gian và vẫn cần unseen set.

Hai mock trong khóa PCCP trả phí là optional, không phải điều kiện hoàn thành vì curriculum không giả định người học đã mua khóa.

## 8. Chiến thuật 120 phút

Review nhiều thí sinh cho thấy số câu họ *tưởng* đã giải có thể lệch mạnh với điểm cuối do hidden edge case/efficiency, và câu sau đôi khi dễ hơn câu trước. Đây là tín hiệu cộng đồng chứ không phải công bố về cách chấm; hệ quả thực hành là:

1. `0–5`: scan **đủ bốn câu**; ghi constraint, complexity mục tiêu và độ chắc chắn. Không giả định câu 4 khó nhất.
2. `5–25`: khóa câu dễ nhất.
3. `25–90`: làm hai câu phù hợp nhất; đổi bài nếu 12–15 phút không tạo thêm state/transition/code hữu ích.
4. `90–105`: hoàn thiện bài gần AC nhất hoặc lấy partial có cơ sở.
5. `105–120`: không tin sample test là đủ; audit empty/singleton, index, tie, mutation, overflow/precision và complexity.

Trong mock, với từng bài phải ghi hai giá trị trước khi xem kết quả: `confidence 0–100%` và complexity đã chứng minh. Nếu confidence cao nhưng hidden result thấp, repair quy trình test/proof chứ không chỉ học thêm pattern.

## 9. Chuẩn bị môi trường thi

Review cũ chỉ dùng để biết rủi ro; quy định hiện hành phải lấy từ trang PCCP/guide ở sát ngày thi. Trước kỳ thi:

1. Chạy pre-test chính thức trong cửa sổ Programmers cho phép.
2. Kiểm tra browser, mạng, webcam, camera điện thoại, nguồn điện và giấy tờ.
3. Làm ít nhất một mock trong đúng editor/browser, không IDE phụ và không tra tài liệu.
4. Xử lý màn hình phụ/vật dụng/phạm vi camera theo guide hiện hành, không dựa vào blog cũ.

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
- [Official public past-problem course](https://school.programmers.co.kr/learn/courses/19344)
- [Official public explanation course](https://school.programmers.co.kr/learn/courses/24542)

Chi tiết audit và giới hạn suy luận: [`docs/pccp-700-roadmap/OFFICIAL_RESEARCH_AUDIT_2026-08-12.md`](docs/pccp-700-roadmap/OFFICIAL_RESEARCH_AUDIT_2026-08-12.md).
