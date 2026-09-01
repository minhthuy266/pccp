# Layer C — Concept Lookup

Reference breadth; không đưa vào active recall bắt buộc trước 12/09 nếu Layer A/P0 chưa chắc. “Corpus liên quan” không có nghĩa concept đó là lời giải duy nhất.

| Concept | Dấu hiệu | Mục đích | Complexity | Skeleton tham khảo | Bài/corpus liên quan | Priority |
|---|---|---|---|---|---|---|
| Dijkstra | cạnh có trọng số không âm; BFS sai | shortest weighted path | `O((V+E)logV)` | [Template §22](../../PCCP_JavaScript_Templates.md#22-dijkstra-cơ-bản), C11+B58 | Không observed trực tiếp trong 16; official syllabus graph | P2 |
| Union-Find | nhiều union/connectivity query; Kruskal | theo dõi component động | gần `O(α(n))`/op | `find` path compression + `union` by size | Transfer repo PF15; không observed 16 | P2 |
| Kruskal MST | nối tất cả node với tổng edge cost nhỏ nhất | MST | `O(ElogE)` | sort edges + DSU | Transfer Programmers Kit | P2 |
| Topological sort | prerequisite/DAG/order; indegree | linearize partial order | `O(V+E)` | adjacency + indegree + queue | Không observed 16 | P3 |
| Trie | nhiều prefix query trên string | prefix insert/search | `O(total chars)` | node children Map + terminal | Không observed 16 | P3 |
| Coordinate compression | coordinate lớn nhưng ít distinct; chỉ order quan trọng | map values về rank | `O(nlogn)` | sorted unique + Map rank | Không observed 16 | P2 |
| Bitmask state | n nhỏ; subset là state | encode chosen set | `O(2^n·poly(n))` | `mask`, bit test/set | Transfer C15+B81; không observed 16 | P2 |
| Deque | cần push/pop ở cả hai đầu | `O(1)` logical ends | `O(1)` amortized | [Template §23](../../PCCP_JavaScript_Templates.md#23-deque-hai-đầu-không-dùng-shift) | Official syllabus nêu Deque; không observed 16 | P2 |
| Tree traversal | unique path/no cycle/root-parent relation | subtree/depth/parent aggregate | `O(V)` | [Template §26](../../PCCP_JavaScript_Templates.md#26-tree-traversal-thực-chiến) | Transfer; M1Q3 có parent-chain nhưng không graph tree walk | P2 |
| Euler trail | dùng mọi edge đúng một lần | itinerary/path using all edges | `O(ElogE)` nếu sort | Hierholzer + stack | Repo PF16; không observed 16 | P3 |
| Transitive closure | cần biết reachability mọi cặp; n nhỏ | all-pairs reachability | `O(V^3)` | Floyd boolean | Repo PF17; không observed 16 | P3 |
| Lazy deletion | heap không hỗ trợ xóa arbitrary item | bỏ stale entries khi lên top | `O(logn)` mỗi push/pop | C13+B71 | Heap transfer, không observed trực tiếp | P2 |
| Multi-resource scheduling | nhiều phòng/máy có available time | assign earliest resource | `O(nlogm)` | C13+B70 | Transfer từ M1Q4/M2Q3 | P1 lookup nếu thiếu thời gian |
| 2D difference | nhiều rectangle update rồi đọc final grid | range update nhanh | `O(Q+RC)` | C07+B30 | Repo official lesson `Tòa nhà không bị phá`; không PCCP observed 16 | P2 |
| Memoization | recursion lặp lại cùng state | cache subproblem | số state × transition | C15+B79 | Official syllabus DP | P1 lookup |
| Modular normalization | subtraction/rotation có thể âm trong JS | đưa về `[0,m)` | `O(1)` | `((x % m) + m) % m` | M2Q1 quay trái dùng `+m` shortcut | P1 lookup |
| Number/BigInt safety | bound/intermediate vượt `2^53-1` | exact integer arithmetic | phụ thuộc algorithm | [Template §0](../../PCCP_JavaScript_Templates.md#number-bigint-và-bitwise) | B-Q2 limit `10^15`; heap totals | P1 lookup |
| Canonical component shape | component phải so khớp sau rotate/translate | normalize representation | `O(klogk)`/shape | translate to origin + sort coordinates | Transfer repo PF13; không observed 16 | P3 |
| Planar topology | đường đi tạo cycle/room; crossing edge | count faces/cycles | problem-specific | scale coordinates + edge Set | Repo PF18; không observed 16 | P3 |

## Lookup rule

- Nếu đề khớp một dòng P2/P3 nhưng còn thời gian ít, mở skeleton tham khảo thay vì cố thuộc trước.
- Nếu một concept P2 xuất hiện lặp lại trong mock/error log cá nhân, nâng riêng lên P1; không nâng cả Layer C theo cảm giác.
