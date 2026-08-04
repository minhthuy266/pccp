# Pattern Coverage Matrix — PCCP 700+ JavaScript

Matrix này lập bản đồ **83 bộ xương triển khai có khả năng tái sử dụng**, không tuyên bố bao phủ mọi đề PCCP. Trong đó 70 dòng là `CORE` hoặc `VARIANT`; phần còn lại là `COMBINATION`/`OPTIONAL`. Hai bối cảnh dùng cùng state–condition–transition được gộp thành một dòng.

## Cách đọc và trạng thái

- `CORE · Có`: phải tự viết template riêng từ trắng.
- `VARIANT · Có`: khác dạng gốc ở state, condition, transition, traversal hoặc return nên cần một template tương phản.
- `VARIANT · Không`: thay đổi đáng luyện nhưng skeleton gốc đủ; học bằng mutation.
- `COMBINATION · Không`: ghép các template đã có; phải phân vai pattern thay vì học code mới.
- `OPTIONAL · Có/Không`: ít quan trọng hơn với mục tiêu 700+, chỉ mở sau CORE.
- Trạng thái: `FULL` chỉ khi ID đã nối đủ lý thuyết → bài luyện → solution → recall; `PLANNED` là mới có scope.

## Coverage Matrix

| ID | Nhóm | Dạng code | Tín hiệu đề bài | State cốt lõi | Transition cốt lõi | Template riêng? | Biến thể của | Độ ưu tiên PCCP | Trạng thái |
| -- | ---- | --------- | --------------- | ------------- | ------------------ | --------------- | ------------ | --------------- | ---------- |
| ARR-01 | Array/Loop | Accumulator tổng/tích | tổng, tích, cộng dồn | `accumulator` | gộp current vào acc | CORE · Có | — | Rất cao | FULL |
| ARR-02 | Array/Loop | Min/max kèm index và tie | lớn/nhỏ nhất, vị trí, hòa | `bestValue,bestIndex` | update theo comparator/tie | CORE · Có | — | Rất cao | FULL |
| ARR-03 | Array/Loop | Count theo điều kiện | bao nhiêu phần tử thỏa | `count` | condition đúng → `count++` | CORE · Có | — | Rất cao | FULL |
| ARR-04 | Array/Loop | Every/some trong một lượt | tất cả, tồn tại | boolean/early return | gặp phản ví dụ/chứng cứ → return | CORE · Có | — | Cao | FULL |
| ARR-05 | Array/String | Map/filter/build output | biến đổi, lọc, tạo kết quả | `result` | condition → push transformed item | CORE · Có | — | Rất cao | FULL |
| ARR-06 | Array/String | Duyệt ngược / suffix state | bên phải, từ cuối | suffix state | update từ `n-1` về `0` | VARIANT · Có | ARR-01 | Cao | FULL |
| ARR-07 | Array/String | Run liên tiếp + sentinel + nhiều state | đoạn liên tiếp, chốt nhóm | current run + best | extend hoặc flush/reset | CORE · Có | — | Rất cao | FULL |
| MAT-01 | Matrix | Duyệt toàn bộ/hàng/cột và tổng | mọi ô, tổng từng hàng/cột | row/col + accumulators | nested-loop update | CORE · Có | — | Rất cao | FULL |
| MAT-02 | Matrix | Hai đường chéo | chéo chính/phụ | index + totals | dùng `[i][i]`, `[i][n-1-i]` | VARIANT · Không | MAT-01 | Trung bình | FULL |
| MAT-03 | Matrix | Láng giềng 4/8 hướng + biên | ô kề, hướng | row,col,directions | tạo next rồi bounds-check | CORE · Có | — | Rất cao | FULL |
| MAT-04 | Matrix | Biến đổi/transpose/rotate/reflect | xoay, đối xứng | output matrix | map tọa độ cũ→mới | VARIANT · Có | MAT-01 | Cao | FULL |
| MAT-05 | Matrix | Di chuyển/flood-fill bridge | command, vùng liên thông | position/direction hoặc visited | move hợp lệ; enqueue/stack neighbor | COMBINATION · Không | MAT-03 + SIM-02/BFS-02 | Rất cao | FULL |
| MAP-01 | Map/Set | Kiểm tra đã xuất hiện | đã gặp, duplicate | `Set<prefix value>` | check rồi add | CORE · Có | — | Rất cao | FULL |
| MAP-02 | Map/Set | Loại trùng giữ thứ tự | unique, giữ lần đầu | Set + output | absent → add + push | VARIANT · Có | MAP-01 | Rất cao | FULL |
| MAP-03 | Map/Set | Đếm tần suất | số lần, multiplicity | `Map<key,count>` | set old+1 | CORE · Có | — | Rất cao | FULL |
| MAP-04 | Map/Set | Index đầu tiên | lần đầu, sớm nhất | `Map<key,firstIndex>` | chỉ set khi absent | VARIANT · Có | MAP-03 | Cao | FULL |
| MAP-05 | Map/Set | Index gần nhất | lần trước/gần nhất | `Map<key,latestIndex>` | read rồi luôn overwrite | VARIANT · Có | MAP-04 | Cao | FULL |
| MAP-06 | Map/Set | Khoảng cách các lần xuất hiện | gap min/max | index Map + best | candidate rồi update index | VARIANT · Có | MAP-04/MAP-05 | Cao | FULL |
| MAP-07 | Map/Set | Phần bù / Two Sum | cặp thỏa quan hệ | value→index/count | check complement rồi add current | CORE · Có | — | Rất cao | FULL |
| MAP-08 | Map/Set | So sánh tần suất | cùng multiset/anagram | remaining counts | build rồi consume | VARIANT · Có | MAP-03 | Cao | FULL |
| MAP-09 | Map/Set | Gom nhóm `key→array` | phân nhóm, giữ records | Map of arrays | ensure group rồi push | CORE · Có | — | Cao | FULL |
| MAP-10 | Map/Set | Quan hệ `key→Set` | neighbor unique | Map of Sets | ensure Set rồi add | VARIANT · Có | MAP-09 | Cao | FULL |
| MAP-11 | Map/Set | Chọn key theo value + tie | phổ biến nhất, max/min | metric Map + best | compare value và tie | VARIANT · Có | MAP-03 | Rất cao | FULL |
| MAP-12 | Map/Set | State theo id trong simulation | event theo thực thể | `Map<id,state>` | read→validate→commit | COMBINATION · Không | MAP-03 + SIM-01 | Rất cao | FULL |
| MAP-13 | Map/Set | Frequency trong cửa sổ | đoạn hiện tại, thêm/bớt | Map count + distinct | add right, remove left | COMBINATION · Không | MAP-03 + SW-01/SW-02 | Rất cao | FULL |
| MAP-14 | Map/Set | Nhiều Map cho nhiều loại state | lookup hai chiều, metric+order | 2+ Maps cùng key | cập nhật đồng bộ theo invariant | VARIANT · Có | MAP-11/MAP-12 | Cao | FULL |
| SORT-01 | Sorting | Numeric asc/desc JS | sắp số | copied/input array | comparator `a-b`/`b-a` | CORE · Có | — | Rất cao | FULL |
| SORT-02 | Sorting | Object/tuple nhiều tiêu chí + tie | ưu tiên nhiều khóa | comparator fields | first non-zero criterion | CORE · Có | — | Rất cao | FULL |
| SORT-03 | Sorting | Giữ index gốc | cần index sau sort | decorated `{value,index}` | decorate→sort→scan | VARIANT · Có | SORT-02 | Cao | FULL |
| SORT-04 | Sorting | Sort rồi quét/adjacency/interval | hàng xóm, overlap | sorted array + scan state | sort rồi compare neighbor/merge | CORE · Có | — | Rất cao | FULL |
| SORT-05 | Sorting | Coordinate compression | rank/giá trị thưa | sorted unique + rank Map | unique sort rồi map rank | OPTIONAL · Có | SORT-01 + MAP-04 | Thấp | FULL |
| SIM-01 | Simulation | Tuần tự / state machine / command | làm theo luật theo thứ tự | minimal system state | event→validated next state | CORE · Có | — | Rất cao | FULL |
| SIM-02 | Simulation | Vị trí và hướng | trái/phải/tiến, tọa độ | row,col,direction | command đổi hướng/vị trí | CORE · Có | — | Rất cao | FULL |
| SIM-03 | Simulation | Đồng hồ/thời gian chuẩn hóa | `mm:ss`, duration | scalar time | parse→clamp/update→format | VARIANT · Có | SIM-01 | Cao | FULL |
| SIM-04 | Simulation | Va chạm/event đồng thời | cùng time/position | occupancy/event batch | collect cùng mốc rồi resolve | VARIANT · Có | SIM-01 | Cao | FULL |
| SIM-05 | Simulation | Resource/queue/Map/matrix integration | nhiều thực thể/tài nguyên | subsystem states | event order + delegated DS update | COMBINATION · Không | SIM-01 + MAP/SQ/MAT | Rất cao | FULL |
| PRE-01 | Prefix Sum | Prefix 1D | nhiều tổng prefix | `prefix[i+1]` | next=previous+value | CORE · Có | — | Rất cao | PLANNED |
| PRE-02 | Prefix Sum | Range sum | nhiều query `[l,r]` | prefix | `prefix[r+1]-prefix[l]` | VARIANT · Không | PRE-01 | Rất cao | PLANNED |
| PRE-03 | Prefix Sum | Prefix count/nhiều thuộc tính | đếm loại trong range | one/multiple prefix arrays | mỗi thuộc tính cộng indicator | VARIANT · Có | PRE-01 | Cao | PLANNED |
| PRE-04 | Prefix Sum | Prefix 2D | rectangle queries | prefix matrix | inclusion–exclusion | VARIANT · Có | PRE-01 | Trung bình | PLANNED |
| PRE-05 | Prefix Sum | Difference array / prefix+Map | range updates hoặc subarray target | diff hoặc prefix-frequency Map | mark endpoints/lookup complement prefix | COMBINATION · Không | PRE-01 + MAP-07 | Cao | PLANNED |
| TP-01 | Two Pointers | Hai đầu đi vào | sorted pair, palindrome | left,right | loại một phía theo monotonic rule | CORE · Có | — | Rất cao | PLANNED |
| TP-02 | Two Pointers | Fast/slow cùng chiều | compact/filter in-place | read,write | read scan; condition→write++ | CORE · Có | — | Cao | PLANNED |
| TP-03 | Two Pointers | Loại duplicate sorted | unique in-place | read,write,last | different→copy/advance | VARIANT · Có | TP-02 | Cao | PLANNED |
| TP-04 | Two Pointers | Merge/giao hai dãy sort | hai danh sách có thứ tự | i,j,output | advance smaller/both | CORE · Có | — | Cao | PLANNED |
| TP-05 | Two Pointers | Pair sum / Three Sum outer loop | tổng cặp/bộ ba sorted | fixed + left/right | move pointer theo sum | VARIANT · Có | TP-01 | Cao | PLANNED |
| TP-06 | Two Pointers | Partition cơ bản | chia theo predicate/pivot | left,right | swap và advance | OPTIONAL · Có | TP-01 | Thấp | PLANNED |
| SW-01 | Sliding Window | Cửa sổ cố định + aggregate | đúng K phần tử | left/right + sum/count | add right, remove expired | CORE · Có | — | Rất cao | PLANNED |
| SW-02 | Sliding Window | Co giãn tìm dài nhất | at most K/không trùng | left,right + validity state | add; while invalid remove; maximize | CORE · Có | — | Rất cao | PLANNED |
| SW-03 | Sliding Window | Co giãn tìm ngắn nhất | sum/coverage at least target | window state + best | add; while valid minimize/remove | VARIANT · Có | SW-02 | Rất cao | PLANNED |
| SW-04 | Sliding Window | Map frequency/distinct/K loại | unique, K categories | count Map + distinct | zero↔positive updates distinct | VARIANT · Có | SW-02 + MAP-03 | Rất cao | PLANNED |
| SW-05 | Sliding Window | Đếm số cửa sổ hợp lệ | bao nhiêu subarray at most/exact K | left + answer | shrink; add number ending at right | VARIANT · Có | SW-02 | Cao | PLANNED |
| SW-06 | Sliding Window | Contrast window vs TP/prefix | contiguous + monotonic update | tùy contract | chọn add/remove hoặc subtraction | COMBINATION · Không | SW-01/PRE-02/TP-01 | Rất cao | PLANNED |
| SQ-01 | Stack/Queue | Stack thao tác/matching/undo | LIFO, dấu ngoặc, rollback | stack | push current/pop match | CORE · Có | — | Rất cao | PLANNED |
| SQ-02 | Stack/Queue | Monotonic stack | next greater, bỏ ứng viên | stack indices monotonic | while dominated pop; push | CORE · Có | SQ-01 | Cao | PLANNED |
| SQ-03 | Stack/Queue | Queue head-index | FIFO, xử lý đến lượt | array + head | enqueue push; dequeue `queue[head++]` | CORE · Có | — | Rất cao | PLANNED |
| SQ-04 | Stack/Queue | Circular queue index | capacity cố định | buffer,head,tail,size | modulo advance | OPTIONAL · Có | SQ-03 | Thấp | PLANNED |
| SQ-05 | Stack/Queue | BFS queue | theo lớp/khoảng cách | queue + visited | mark khi enqueue | COMBINATION · Không | SQ-03 + BFS-01 | Rất cao | PLANNED |
| BS-01 | Binary Search | Tìm exact trong sorted | có bằng target không | low,high | discard half by comparison | CORE · Có | — | Cao | PLANNED |
| BS-02 | Binary Search | Lower bound / first true | vị trí đầu `>=`, boundary | half-open bounds | true→high, false→low | CORE · Có | — | Rất cao | PLANNED |
| BS-03 | Binary Search | Upper bound / last true | đầu `>`, cuối thỏa | bounds | condition boundary tương ứng | VARIANT · Có | BS-02 | Cao | PLANNED |
| BS-04 | Binary Search | Binary search on answer | đáp án đơn điệu, min feasible | answer bounds + predicate | feasible→keep mid side | CORE · Có | BS-02 | Rất cao | PLANNED |
| BS-05 | Binary Search | Bound/termination safety | infinite loop, off-by-one | interval convention | mid + strict interval shrink | VARIANT · Không | BS-01..04 | Rất cao | PLANNED |
| BFS-01 | BFS/DFS | Graph traversal adjacency | duyệt node/edge | adjacency + visited + frontier | visit neighbor once | CORE · Có | — | Rất cao | PLANNED |
| BFS-02 | BFS/DFS | Grid/flood fill/components | vùng liên thông | coordinate visited | 4/8-neighbor traversal | CORE · Có | BFS-01 + MAT-03 | Rất cao | PLANNED |
| BFS-03 | BFS/DFS | BFS shortest unweighted | ít bước/cạnh nhất | queue + distance | enqueue unseen with dist+1 | CORE · Có | BFS-01 | Rất cao | PLANNED |
| BFS-04 | BFS/DFS | Multi-source BFS | nhiều nguồn cùng lúc | queue seeded all sources | expand by layers | VARIANT · Có | BFS-03 | Cao | PLANNED |
| BFS-05 | BFS/DFS | DFS recursive vs iterative | explore sâu/component | call stack hoặc explicit stack | push/call neighbor | VARIANT · Có | BFS-01 | Rất cao | PLANNED |
| BFS-06 | BFS/DFS | Visited nhiều chiều theo state | cùng node, resource khác | visited tuple/state | transition đủ chiều rồi mark | VARIANT · Có | BFS-01 | Rất cao | PLANNED |
| BFS-07 | BFS/DFS | Directed/undirected/tree traversal | hướng cạnh, parent | adjacency + parent/visited | add đúng chiều; skip parent | VARIANT · Không | BFS-01 | Cao | PLANNED |
| HG-01 | Heap/Greedy | Heap lấy min/max liên tục | luôn lấy tốt nhất động | heap | push/pop root | CORE · Có | — | Cao | PLANNED |
| HG-02 | Heap/Greedy | Top K / K nhỏ-lớn nhất | chỉ giữ K ứng viên | bounded heap | push; size>K pop | VARIANT · Có | HG-01 | Cao | PLANNED |
| HG-03 | Heap/Greedy | Scheduling/priority simulation | job khả dụng theo time | sorted events + heap | add available; pop priority | COMBINATION · Không | HG-01 + SIM-01 | Cao | PLANNED |
| HG-04 | Heap/Greedy | Greedy sau sort / interval selection | chọn nhiều nhất, endpoint | sorted candidates + lastEnd | accept compatible candidate | CORE · Có | SORT-04 | Rất cao | PLANNED |
| HG-05 | Heap/Greedy | Chứng minh greedy vs cần heap | lựa chọn cục bộ | invariant/exchange argument | commit choice chỉ khi safe | VARIANT · Không | HG-04 | Rất cao | PLANNED |
| BTD-01 | Backtracking/DP | Sinh tổ hợp: choose/unchoose | chọn K, không xét order | path,start | choose→recurse next→undo | CORE · Có | — | Cao | PLANNED |
| BTD-02 | Backtracking/DP | Sinh hoán vị | mọi thứ tự, dùng mỗi item | path,used | choose unused→recurse→undo | VARIANT · Có | BTD-01 | Cao | PLANNED |
| BTD-03 | Backtracking/DP | Chọn/không chọn + pruning | subset, target | index,current state | branch include/exclude; bound prune | CORE · Có | — | Cao | PLANNED |
| BTD-04 | Backtracking/DP | Brute force loop vs backtracking | số tầng lựa chọn thay đổi | explicit loops hoặc search path | enumerate candidates | COMBINATION · Không | BTD-01/03 | Cao | PLANNED |
| BTD-05 | Backtracking/DP | Memoization | state lặp giữa nhánh | memo state→answer | cache result before return | CORE · Có | BTD-03 | Rất cao | PLANNED |
| BTD-06 | Backtracking/DP | DP 1D count/min/max | bài con theo index/value | `dp[i]` | combine predecessor states | CORE · Có | BTD-05 | Rất cao | PLANNED |
| BTD-07 | Backtracking/DP | DP 2D/grid | hai chiều state | `dp[i][j]` | combine valid prior cells | VARIANT · Có | BTD-06 | Cao | PLANNED |
| BTD-08 | Backtracking/DP | Contrast greedy/DP/search | overlap hay local proof | state/base/order/proof | chọn engine theo property | COMBINATION · Không | HG-05 + BTD-03/06 | Rất cao | PLANNED |

## Những mục đã gộp có chủ đích

- Max, min, index và tie dùng chung comparator state nên gộp vào `ARR-02`.
- Transform và filter cùng skeleton build-output; condition chỉ quyết định có push nên gộp `ARR-05`.
- Matching brackets và undo đều là LIFO push/pop, nằm trong `SQ-01`; monotonic stack tách riêng vì transition có vòng `while pop`.
- Sort object, tuple, nhiều tiêu chí và tie gộp `SORT-02`; giữ index gốc tách `SORT-03` vì state representation đổi.
- Four/eight-neighbor chỉ đổi bảng direction, không tạo hai ID.
- Counting/min/max DP gộp `BTD-06`: state meaning và phép combine là mutation, không phải ba skeleton độc lập.

## Quy tắc cho bài `COMBINATION`

Mọi lời giải phải ghi bốn vai trò:

```text
Pattern chính:
Pattern phụ:
Pattern chịu trách nhiệm duyệt:
Pattern chịu trách nhiệm lưu state/tối ưu:
```

Ví dụ `MAP-13`: Sliding Window chịu trách nhiệm biên duyệt; frequency Map giữ multiplicity của cửa sổ; zero-count transition duy trì số loại khác nhau.

## Đối chiếu phạm vi và giới hạn

- Giới thiệu chính thức mô tả PCCP gồm 4 bài code/120 phút, hỗ trợ JavaScript và nêu phạm vi từ string/array/greedy/sort đến stack/queue/deque/hash/binary search/DFS/BFS/graph/tree/heap/DP: [Programmers Certification Introduction](https://business.programmers.co.kr/static/business/certification_intro.pdf).
- Khóa luyện PCCP chính thức tổ chức nội dung quanh Hashing, Array implementation, Two Pointers, Sorting & Greedy, DFS, BFS và Graph, đồng thời dùng mock 4 bài/120 phút: [PCCP preparation course](https://school.programmers.co.kr/learn/courses/14760/14760-%ED%94%84%EB%A1%9C%EA%B7%B8%EB%9E%98%EB%A8%B8%EC%8A%94%EC%99%80-%ED%95%A8%EA%BB%98%ED%95%98%EB%8A%94-pccp-%ED%95%A9%EA%B2%A9-%EB%8C%80%EB%B9%84-%EC%8B%A4%EC%A0%84-%EB%AA%A8%EC%9D%98%EA%B3%A0%EC%82%AC-%ED%95%B4%EC%84%A4-%EA%B0%95%EC%9D%98python%ED%8E%B8).
- Programmers Algorithm Practice Kit đánh dấu hash, sorting, exhaustive search và DFS/BFS là các nhóm xuất hiện cao; heap/stack/queue và các nhóm khác vẫn nằm trong bộ luyện chính thức: [Algorithm Practice Kit](https://school.programmers.co.kr/learn/challenges?tab=algorithm_practice_kit).
- Workspace bổ sung bằng `PROBLEM_BANK.csv`, Thinking Curriculum, JavaScript Templates, cheatsheet và Level 1 corpus. Matrix không sử dụng nội dung mock trong `locked/`.

Đây là **ma trận học tập suy ra từ phạm vi chính thức và corpus luyện**, không phải danh sách pattern mà đơn vị tổ chức cam kết sẽ ra. Priority có thể đổi khi error log cá nhân cho thấy điểm yếu khác.

## Báo cáo tiến độ

| Chỉ số | Hiện tại |
| --- | ---: |
| Tổng số dạng | 83 |
| CORE | 38 |
| VARIANT | 32 |
| COMBINATION | 10 |
| OPTIONAL | 3 |
| CORE + VARIANT | 70 |
| Dạng đã viết đầy đủ | 36 (`ARR-01..07`, `MAT-01..05`, `MAP-01..14`, `SIM-01..05`, `SORT-01..05`) |
| Bài luyện đã viết | 151 nhiệm vụ + 11 Transfer Test |
| Transfer Test | 11 |
| Dạng còn thiếu | 47 dòng `PLANNED` |
| Mục trùng đã gộp | 6 cụm, liệt kê phía trên |
| File làm tiếp | `06_Two_Pointers.md` (`TP-01..06`) |
