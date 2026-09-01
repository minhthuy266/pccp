# PCCP Algorithm Deck — Core, Adapters, Lookup

> Snapshot 01/09/2026. Bao phủ corpus PCCP công khai đã kiểm chứng và các biến thể chuyển giao hợp lý; không tuyên bố bao phủ tuyệt đối đề tương lai.

## 1. Hướng dẫn sử dụng

- **Layer A — Core Recall:** 15 skeleton phải viết không nhìn. Học theo `TRIGGER → FULL_CODE → invariant → test`.
- **Layer B — Variant Adapters:** không thuộc full code mới; trả lời bốn ô `BASE / ADD STATE / CHANGE TRANSITION / CHANGE BASE-UPDATE`, rồi patch code gốc.
- **Layer C — Concept Lookup:** chỉ tra khi đề/error log chạm tới; không đưa vào active recall bắt buộc.
- TSV chỉ chứa Layer A và adapter P0/P1. Layer C không làm phình lịch ôn.

Files:

- [Layer A — 15 core skeletons](layers/LAYER_A_CORE_RECALL.md)
- [Layer B — 81 variant adapters](layers/LAYER_B_VARIANT_ADAPTERS.md)
- [Layer C — concept lookup](layers/LAYER_C_CONCEPT_LOOKUP.md)
- [Corpus audit và nguồn chính thức](PCCP_ALGORITHM_CORPUS_AUDIT.md)
- Quizlet imports: [15 core](quizlet/LAYER_A_CORE_RECALL.txt), [34 P0 adapters](quizlet/LAYER_B_P0_ADAPTERS.txt), [40 P1 adapters](quizlet/LAYER_B_P1_ADAPTERS.txt)

## 2. Corpus coverage

Corpus verified có 16 official public problems: 8 câu PCCP 모의고사 #1/#2 và 8 lesson `[PCCP 기출문제]`. Inventory/constraints/URL nằm trong [audit](PCCP_ALGORITHM_CORPUS_AUDIT.md#2-corpus-coverage).

Không đồng nhất “Programmers official practice” với “PCCP observed”: 61 lesson repo vẫn là CORE/TRANSFER bank, không làm tăng observed count.

## 3. Taxonomy

| Core | Family hợp nhất | Variants absorb |
|---|---|---|
| C01 | Parsing/canonical representation | time, tokens, base decode/encode |
| C02 | Linear run/chunk scan | run, chunk, cyclic pattern |
| C03 | Map/Set aggregation | frequency, multiset, grouping, inverse index, dedupe |
| C04 | Sort/comparator | min/max, multi-key, heap comparator, concatenation |
| C05 | Two pointers | pair, merge, extreme pairing, read/write |
| C06 | Sliding window | fixed, variable, frequency, cover, min length, count |
| C07 | Prefix/difference | 1D/2D query and range update |
| C08 | Stack | matching, reduction, monotonic, greedy deletion |
| C09 | Simulation/state machine | command, timeline, interval, tie, rollback, collision |
| C10 | DFS/backtracking | ±, take/skip, combination, permutation, assignment, path, pruning |
| C11 | BFS | shortest, component, multi-source, expanded state, special power |
| C12 | Binary search answer | first/last true, min/max feasible, simulation predicate |
| C13 | Heap | min/max, object, transform, Top K, scheduling, resources, lazy deletion |
| C14 | Greedy | interval, stabbing, extreme pairing, reconsider with heap |
| C15 | DP/memoization | 1D, 2D, memo, rolling, bitmask state |

`frequency/counting/multiset Map` là C03. `event+heap/arrival+priority queue/waiting room` là C13+B69, dùng C09 làm timeline prerequisite. Weighted BFS không tạo BFS variant giả; adapter B58 chuyển sang Dijkstra lookup.

## 4. Priority map

- `P0`: viết core liên quan không nhìn và patch adapter trong 2–3 phút.
- `P1`: nhận ra, nêu đủ bốn ô và sửa được khi có core trước mặt.
- `P2`: biết tồn tại để tra; không ép active recall trước kỳ thi.
- Layer A: C01–C13 là P0/P1 theo điểm yếu cá nhân; C14–C15 tối thiểu P1.
- Layer B: 34 adapter P0 + 40 adapter P1 vào TSV; 7 adapter P2 chỉ ở Markdown.
- Layer C: lookup P1/P2/P3; không vào TSV.

## 5. Flashcards theo pattern

### Layer A

Mỗi core có `TRIGGER`, `FULL_CODE`, invariant và complexity trong [Layer A](layers/LAYER_A_CORE_RECALL.md). Không nhân bản full code cho variants.

### Layer B — Variant matrices bắt buộc

- BFS: shortest, component, multi-source, expanded state, special power, multiple agents, weighted→Dijkstra (`B52–B58`).
- Sliding window: fixed, positive sum, at most K distinct, cover all, min length, count valid (`B22–B27`).
- DFS/backtracking: plus/minus, take/skip, combination, permutation, assignment, path, pruning, multi-agent, mathematical recursion, bounded bases (`B42–B51`).
- Heap: min/max, object comparator, repeated transform, Top K, event scheduling, resources, lazy deletion (`B64–B71`).
- Binary search: first/last true, min/max feasible, simulation predicate (`B59–B63`).
- Simulation: command, timeline, interval, event ties, rollback, collision, periodic events (`B35–B41`).

Toàn bộ 81 adapter và before/after delta nằm trong [Layer B](layers/LAYER_B_VARIANT_ADAPTERS.md).

### Layer C

Dijkstra, DSU/MST, topological sort, trie, coordinate compression, bitmask, deque, tree, Euler trail, closure, lazy deletion, 2D difference, memoization, modular/Number safety và special modeling nằm trong [Layer C](layers/LAYER_C_CONCEPT_LOOKUP.md).

## 6. Revealing tests

- C03: count `2→1` có delete key không? Chỉ `1→0` mới delete.
- C06: left tăng khi nào; update answer trước hay sau shrink?
- C08: đổi `<` thành `<=` làm strict contract đổi ra sao?
- C09: exit và arrival cùng `t` xử lý thứ tự nào?
- C10: bỏ restore làm mất/ô nhiễm nhánh nào?
- C11: tại sao visited khi enqueue; cùng cell khác `usedPower` có là cùng state không?
- C12: predicate `false...true` trả left hay right; high đã feasible chưa?
- C13: pop phải so hai child rồi chọn child priority cao hơn vì sao?
- C14: greedy choice giữ invariant/exchange argument nào?
- C15: iteration order đã final mọi predecessor chưa?

## 7. Coverage matrix

| Official problem | Observed concepts | Core skeleton | Variant adapter | Corresponding cards | Uncovered gap |
|---|---|---|---|---|---|
| M1Q1 Chữ cái cô lập | run, Set, sort output | C02, C03, C04 | B05, B09 | A-C02/A-C03/A-C04; B05/B09 | none |
| M1Q2 Đại hội thể thao | assignment backtracking | C10 | B46, B48 | A-C10; B46/B48 | none |
| M1Q3 Quy luật di truyền | parent/index recursion, base-4 path | C10 | B50 | A-C10; B50 | exact closed-form alternative is lookup only |
| M1Q4 Hệ điều hành | event+heap, comparator, idle jump | C09, C13, C04 | B38, B66, B69 | A-C09/A-C13/A-C04; B38/B66/B69 | none |
| M2Q1 Robot thực hành | command state, direction/modulo | C09 | B35 | A-C09; B35 | none |
| M2Q2 Đào tạo nhân viên | repeated min transform | C13 | B64, B67 | A-C13; B64/B67 | none |
| M2Q3 Mở rộng quán cà phê | timeline, interval tie | C09 | B36, B38 | A-C09; B36/B38 | none |
| M2Q4 Bản đồ kho báu | shortest path, expanded state, power once | C11 | B52, B55, B56 | A-C11; B52/B55/B56 | none |
| A-Q1 Băng bó | event gaps, state machine | C09 | B36 | A-C09; B36 | none |
| A-Q2 Khai thác dầu | component, contribution dedupe | C11, C03 | B53, B13 | A-C11/A-C03; B53/B13 | none |
| A-Q3 Đồng hồ analog | periodic time/math events | C09 | B41 | A-C09; B41 | exact formula variant remains adapter-level |
| A-Q4 Di chuyển xe kéo | multi-agent path backtracking | C10 | B47, B49 | A-C10; B47/B49 | none |
| B-Q1 Trình phát video | time parsing, interval, commands | C01, C09 | B01, B37, B39 | A-C01/A-C09; B01/B37/B39 | none |
| B-Q2 Thử thách game xếp hình | minimum feasible, simulation predicate | C12 | B61, B63 | A-C12; B61/B63 | none |
| B-Q3 Tìm nguy cơ va chạm | time batches, coordinate frequency | C09, C03 | B40, B12 | A-C09/A-C03; B40/B12 | none |
| B-Q4 Khôi phục biểu thức | token parsing, bounded bases, encode/decode | C01, C10 | B02, B03, B04, B51 | A-C01/A-C10; B02/B03/B04/B51 | none |

Coverage result: 16/16 official problems mapped; every observed concept has a core or adapter. “None” means no deck-level gap found, not a guarantee against future problem variants.

## 8. Known limitations

- Core/adapter classification is curriculum analysis from official contracts and constraints, not an official solution taxonomy.
- Corpus snapshot can miss a public resource not indexed/discovered; it does not prove future completeness.
- Two past groups `250xxx`/`340xxx` retain `UNVERIFIED` ordinal as documented in the audit.
- Layer C skeletons are references, not mastery claims.
- TSV validation proves structure/syntax, not that a learner has mastered the cards.
