# PCCP Pattern Families — 67 bài public

Đây là tầng học **sau lời giải bài gốc**. Mục tiêu không phải nhớ thêm 67 đáp án, mà biến 67 bài thành 24 mô hình có thể điều chỉnh khi đề đổi dữ kiện.

## Cách dùng một pattern family

Mỗi family trả lời cùng tám câu hỏi:

1. **Tín hiệu:** câu chữ nào trong đề gợi ra pattern?
2. **Không dùng khi:** dấu hiệu nào làm pattern mất hiệu lực?
3. **Decision tree:** từ constraint và contract chọn biến thể nào?
4. **Knobs:** đề có thể đổi những điều kiện nào?
5. **Invariant:** điều gì luôn đúng để chứng minh thuật toán?
6. **Code core:** phần code nào đáng thuộc, phần nào phải suy ra lại?
7. **Counterexample:** input nhỏ nào bóc trần cách hiểu sai?
8. **Drill:** sửa bài gốc thế nào để luyện transfer thay vì chép lại?

Không học bằng cách đọc liền 24 file. Với mỗi family: tự nói decision tree, code lại core không nhìn, rồi làm ít nhất hai drill khác nhánh.

## Bản đồ 24 family

| ID | Pattern family | Bài nguồn | Trạng thái |
|---|---|---|---|
| PF01 | [Counting, grouping và direct lookup](PF01_COUNTING_GROUPING_LOOKUP.md) | OF001, OF002, OF004, OF005, OF048, OF050 | Hoàn tất |
| PF02 | [Sort, normalize và ordering](PF02_SORT_NORMALIZE_ORDER.md) | OF003, OF015–OF018 | Hoàn tất |
| PF03 | [Linear stream reduction và chunking](PF03_LINEAR_STREAM_CHUNKING.md) | OF006, OF019, SR002 | Hoàn tất |
| PF04 | [Stack: matching, reduction, unresolved index](PF04_STACK_FAMILY.md) | OF008, OF011, OF027, OF051, OF061, SR003 | Hoàn tất |
| PF05 | [Queue order và event simulation](PF05_QUEUE_EVENT_SIMULATION.md) | OF007, OF009, OF010, OF054, SR004, SR005 | Hoàn tất |
| PF06 | [Heap selection và scheduling](PF06_HEAP_SELECTION_SCHEDULING.md) | OF012–OF014 | Hoàn tất |
| PF07 | [Choice tree, backtracking và enumeration](PF07_BACKTRACKING_ENUMERATION.md) | OF020, OF022, OF024, OF036 | Hoàn tất |
| PF08 | [Bounded candidate và case analysis](PF08_BOUNDED_CASE_ANALYSIS.md) | OF021, OF026 | Hoàn tất |
| PF09 | [Line greedy và extreme pairing](PF09_LINE_GREEDY_PAIRING.md) | OF025, OF028 | Hoàn tất |
| PF10 | [Interval greedy](PF10_INTERVAL_GREEDY.md) | OF030, OF057 | Hoàn tất |
| PF11 | [Local-state dynamic programming](PF11_LOCAL_STATE_DP.md) | OF032, OF033, OF035 | Hoàn tất |
| PF12 | [Set-DP và interval-DP](PF12_SET_INTERVAL_DP.md) | OF031, OF034 | Hoàn tất |
| PF13 | [DFS components, trees và canonical shapes](PF13_DFS_COMPONENT_TREE_SHAPE.md) | OF023, OF037, OF042 | Hoàn tất |
| PF14 | [Unweighted shortest path BFS](PF14_UNWEIGHTED_BFS.md) | OF038–OF040, OF045, OF055–OF056 | Hoàn tất |
| PF15 | [Minimum spanning tree và DSU](PF15_MST_DSU.md) | OF029 | Hoàn tất |
| PF16 | [Euler trail dùng mọi cạnh](PF16_EULER_TRAIL.md) | OF041 | Hoàn tất |
| PF17 | [Reachability và transitive closure](PF17_REACHABILITY_CLOSURE.md) | OF046 | Hoàn tất |
| PF18 | [Planar traversal và topology](PF18_PLANAR_TOPOLOGY.md) | OF047 | Hoàn tất |
| PF19 | [Binary search on answer](PF19_BINARY_SEARCH_ANSWER.md) | OF043, OF044 | Hoàn tất |
| PF20 | [Matrix và atomic simulation](PF20_MATRIX_ATOMIC_SIMULATION.md) | OF049, SR001 | Hoàn tất |
| PF21 | [Sliding window và two pointers](PF21_SLIDING_WINDOW_TWO_POINTERS.md) | OF052, OF053, OF058 | Hoàn tất |
| PF22 | [Weighted shortest path — Dijkstra](PF22_DIJKSTRA.md) | OF059 | Hoàn tất |
| PF23 | [Difference array và prefix reconstruction](PF23_DIFFERENCE_PREFIX.md) | OF060 | Hoàn tất |
| PF24 | [Parent-chain propagation](PF24_PARENT_CHAIN_PROPAGATION.md) | SR006 | Hoàn tất |

Mapping máy đọc được: [PATTERN_COVERAGE.csv](PATTERN_COVERAGE.csv). Mỗi lesson public phải xuất hiện đúng một lần với vai trò chính; một bài vẫn có thể được nhắc như transfer ở family khác.

## Thứ tự học

Học theo dependency, không theo số bài:

```text
PF01–PF04  →  cấu trúc dữ liệu tuyến tính và cách giữ invariant
PF05–PF10  →  simulation, selection, search và greedy
PF11–PF12  →  DP và cách thiết kế state
PF13–PF18  →  graph/tree/topology
PF19–PF24  →  optimization, range processing và propagation
```

Một family chỉ được đánh dấu “thuộc” khi mày làm được cả ba việc: nhận dạng từ contract, giải thích vì sao biến thể khác không dùng cùng core, và code một drill chưa từng xem.
