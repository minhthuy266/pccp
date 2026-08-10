# Manifest — PCCP Algorithm Code Notebook

Manifest này là hợp đồng nội dung của bộ sách. `Dạng` là đơn vị học nhỏ; `R/F/L/P/C/V/M` lần lượt là số bài nhận diện, điền khuyết, dựng logic, pseudocode, tự code, biến thể và mini-test. Mỗi chương khi hoàn thiện phải có tối thiểu `10/3/3/3/3/2/1`; bài pseudocode có thể dùng chung đề với tầng dựng logic nhưng phải là một nhiệm vụ riêng.

| Chương | Các dạng nhỏ bắt buộc | R/F/L/P/C/V/M | Trạng thái |
| --- | --- | ---: | --- |
| 01 Array, String, Loop | `ARR-01..07`: accumulator; min/max + tie; count; every/some; build output; reverse/suffix; run + sentinel | 12/3/3/3/3/3/1 + 2 Transfer | **Hoàn thiện v1** |
| 02 Matrix | `MAT-01..05`: traversal/totals; diagonals; directions/bounds; transform; movement/flood-fill bridge | 12/3/3/3/3/3/1 + 2 Transfer | **Hoàn thiện v1** |
| 03 Map, Set | `MAP-01..14`: membership; deduplicate; frequency; first/latest index; distance; complement; compare frequency; group array/Set; argmax; simulation; window frequency; nhiều Map | 12/3/3/3/3/4/1 + 3 Transfer | **Hoàn thiện v1** |
| 04 Simulation | `SIM-01..05`: state machine; direction; normalized time; simultaneous batch; resource integration | 12/3/3/3/3/3/1 + 2 Transfer | **Hoàn thiện v1** |
| 05 Sorting | `SORT-01..05`: numeric comparator; multi-key tie; decoration/index; sort-then-scan/interval; coordinate compression; mutation | 12/3/3/3/3/3/1 + 2 Transfer | **Hoàn thiện v1** |
| 06 Two Pointers | `TP-01..06`: opposite ends; fast/slow compact; sorted duplicate; merge/intersection; pair/three sum; partition | 12/3/3/3/3/3/1 + 2 Transfer | **Hoàn thiện v1** |
| 07 Sliding Window, Prefix Sum | fixed window; variable window; count state; deque preview; prefix 1D; range query; prefix frequency; difference array | 12/3/3/3/3/2/1 | Khung |
| 08 Stack, Queue | `SQ-01..05`: matching/undo; monotonic stack; FIFO/head index/batching; circular queue; BFS queue | 12/3/3/3/3/3/1 + 2 Transfer; 22 bài thật + audit + derived concepts | **Hoàn thiện concept-first** |
| 09 Binary Search | exact search; lower/upper bound; first/last true; answer space; feasibility; bounds; overflow and termination | 10/3/3/3/3/2/1 | Khung |
| 10 BFS, DFS | graph modeling; grid; shortest unweighted; components; adjacency list; iterative DFS; multi-source; multi-dimensional state; tree | 12/3/3/3/3/2/1 | Khung |
| 11 Heap, Greedy | min/max heap; top-k; scheduling; k-way processing; local choice; interval greedy; exchange argument; heap + simulation | 12/3/3/3/3/2/1 | Khung |
| 12 Backtracking, DP Basic | choose/explore/unchoose; permutation/combination; pruning; memoization; 1D DP; 2D/grid DP; state/base/transition/order | 12/3/3/3/3/2/1 | Khung |
| 90 Mixed Pattern Tests | 8 đề trộn theo mức; không gắn nhãn pattern; chấm nhận diện/state/proof/code/test | — | Khung |

## Hợp đồng của một dạng đã hoàn thiện

Mỗi dạng phải giúp người mới đi được từ đề đến code theo mạch: bài nhỏ có I/O → chạy bằng lời → tìm biến cần lưu và lý do khởi tạo → full code → dry run vừa đủ → gọi tên state/invariant/transition → nhận diện và skeleton → lỗi gắn với test → bài tự kiểm tra/transfer. Complexity, edge case và thứ tự check/update phải được giải thích ngay cạnh phần code liên quan.

Không bắt người học đi qua A–E hoặc checklist 16 bước trong từng bài mẫu. Các quota ở bảng trên dùng để kiểm tra độ phủ bài luyện, không được dùng thay cho chất lượng giải thích.

Mỗi dạng dùng ID ổn định từ [PATTERN_COVERAGE_MATRIX.md](PATTERN_COVERAGE_MATRIX.md). Sau mỗi 3–5 dạng phải có một Transfer Test không lộ ID/pattern; sau mỗi cụm gần nhau phải có Template Contrast hoặc liên kết tới [TEMPLATE_CONTRASTS.md](TEMPLATE_CONTRASTS.md).

## Hợp đồng lời giải

Mỗi mã bài trong Practice Ladder phải xuất hiện đúng một lần trong file solution tương ứng với: tín hiệu, pattern, state và nghĩa biến, check, update, invariant, pseudocode, code (nếu nhiệm vụ yêu cầu code), dry run/trace trọng tâm, complexity, bẫy và cách recall. Tầng nhận diện có lời giải ngắn theo cùng nhãn; các tầng code có phân tích đầy đủ hơn.

## Thứ tự hoàn thiện

`03 → 01 → 02 → 04 → 05 → 06 → 07 → 08 → 09 → 10 → 11 → 12 → 90`.
