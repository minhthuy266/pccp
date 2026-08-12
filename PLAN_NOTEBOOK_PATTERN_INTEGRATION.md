# Plan hợp nhất PCCP Algorithm Code Notebook với 24 Pattern Families

Ngày lập: 12/08/2026  
Mục tiêu: biến repo thành một hệ thống học 700+ có một đường đi duy nhất từ lý thuyết → nhận dạng pattern → bài official → biến thể → kiểm tra trộn.

## 1. Kết luận audit hiện tại

Ba tầng vừa hoàn thành và notebook không được dùng thay vai trò của nhau:

| Tầng | Vai trò chuẩn | Hiện trạng |
|---|---|---|
| `PCCP_Algorithm_Code_Notebook` | Dạy từ gốc: mental model, state, transition, invariant, template và bài luyện tăng dần | 83 Coverage ID; 47 `FULL` lịch sử, 36 `PLANNED`; chỉ 1/83 đạt audit `FRAMEWORK-FULL` |
| `pattern-families` | Chọn đúng pattern và xử lý khi đề thay knobs/constraint | 24/24 family chi tiết; 67/67 bài đã map |
| `official-lessons` | Áp dụng vào đề Programmers thật | 67/67 bài public có lesson 18 phần, module và test |

Các lỗ hổng rõ nhất:

1. Chương 07 mới có phần Prefix Sum; `SW-01..06` chưa có canonical lesson/practice/solution.
2. Chương 09–12 chỉ là file khung 22 dòng; solution tương ứng chỉ là placeholder 4 dòng.
3. Mixed Pattern Tests chưa có tám đề trộn và rubric thực tế.
4. 46 Coverage ID mang nhãn `FULL` cũ nhưng chưa đủ standard canonical mới (Recognition, Brute force, Invariant, Variants hoặc Transfer còn thiếu tùy ID).
5. Taxonomy 83 ID chưa biểu diễn riêng năm pattern official quan trọng: Dijkstra, MST/DSU, transitive closure, Euler trail và planar topology. Parent-chain tree propagation cũng chưa có canonical riêng.
6. Chưa có crosswalk duy nhất nối `Coverage ID ↔ PFxx ↔ OF/SR ↔ template ↔ practice ↔ solution`.

## 2. Kiến trúc đích — không sao chép ba lần

### Notebook là nguồn lý thuyết canonical

Mỗi Coverage ID chỉ có một canonical lesson tại `chapters/`. Nó giải thích từ zero và chứa template có thể tự viết từ trắng.

### Pattern Family là lớp quyết định và transfer

Không chép lại toàn bộ lý thuyết. Mỗi `PFxx` link về canonical ID, tập trung vào decision tree, knobs, counter-pattern và drill đổi điều kiện.

### Official Lesson là case study

Không biến mỗi bài official thành chương lý thuyết mới. Lesson phải ghi:

```text
Canonical ID chính:
Pattern Family:
Knobs của bài này:
Phần giữ nguyên từ template:
Phần phải suy ra theo contract:
```

### Một navigator duy nhất

`PCCP_700_MASTER_NAVIGATOR.md` vẫn là entrypoint. Notebook README không tạo lộ trình cạnh tranh; nó chỉ phục vụ link “học lý thuyết” từ navigator.

## 3. Schema bắt buộc cho canonical lesson

Mỗi ID đạt `FRAMEWORK-FULL` khi có đủ:

1. Core problem nhỏ và bottleneck của brute force.
2. Dấu hiệu nhận dạng và counter-signal.
3. State sentence: mỗi biến mang nghĩa gì.
4. Transition và thứ tự check/update.
5. Invariant + proof không bỏ sót.
6. Complexity theo số lần transition.
7. Template JavaScript chạy được; đánh dấu `TEMPLATE`/`VARIANT`.
8. Variant knobs và ít nhất một counterexample cho mỗi knob quan trọng.
9. Dry-run dạng bảng.
10. Practice ladder: recognition → fill → logic → pseudocode → blank-page code → transfer.
11. Solution riêng, test executable và QA/link audit.
12. Recall Card, Blank Page Test và Explain Back.

Không bắt mọi bài official lặp lại schema này; bài official chỉ link về ID rồi phân tích knobs riêng.

## 4. Crosswalk 24 Pattern Families → chương notebook

| Notebook | Pattern Families dùng làm khung transfer |
|---|---|
| 01 Array/String/Loop | PF03 |
| 02 Matrix | PF20, PF23 |
| 03 Map/Set | PF01 |
| 04 Simulation | PF05, PF20, PF24 |
| 05 Sorting | PF02, PF09, PF10 |
| 06 Two Pointers | PF09, PF21 |
| 07 Prefix/Window | PF21, PF23 |
| 08 Stack/Queue | PF04, PF05, PF14 |
| 09 Binary Search | PF19 |
| 10 Graph Traversal/Tree | PF13, PF14, PF24 |
| 11 Heap/Greedy | PF06, PF09, PF10 |
| 12 Backtracking/DP | PF07, PF08, PF11, PF12 |
| 13 Advanced Graph (mới) | PF15, PF16, PF17, PF18, PF22 |

## 5. Mở rộng taxonomy có chủ đích

Thêm sáu canonical ID vì skeleton/invariant khác hẳn các ID hiện có:

| ID mới | Nội dung | Family | Bài official neo |
|---|---|---|---|
| `GR-01` | Dijkstra + stale heap | PF22 | OF059 |
| `GR-02` | DSU + Kruskal MST | PF15 | OF029 |
| `GR-03` | Transitive closure/reachability | PF17 | OF046 |
| `GR-04` | Hierholzer/Euler trail | PF16 | OF041 |
| `GR-05` | Planar edge/vertex topology | PF18 | OF047 |
| `TREE-01` | Parent-chain propagation | PF24 | SR006 |

`PRE-05` được mở rộng rõ thành difference 1D/2D + prefix reconstruction, không tạo ID mới cho OF060. Tổng taxonomy mục tiêu: 89 ID.

## 6. Kế hoạch triển khai theo batch

### Batch 0 — khóa kiến trúc và crosswalk

- Tạo `NOTEBOOK_PATTERN_OFFICIAL_CROSSWALK.csv` cho 89 ID.
- Mỗi ID có: priority, chapter, PF, official anchors, canonical, practice, solution, test, status.
- Sửa navigator/README để chỉ còn một luồng điều hướng.
- Nâng audit phát hiện PF/OF không có canonical mapping và mapping trùng.

**Gate:** 24/24 PF và 67/67 bài official đều nối được tới ít nhất một canonical ID; không link gãy.

### Batch 1 — Chapter 07: Prefix, Window, Difference

- Hoàn thiện `PRE-01..05`, `SW-01..06`.
- Dùng PF21/PF23 làm contrast: fixed vs variable vs prefix+Map vs difference.
- Neo bài official: OF052, OF053, OF058, OF060.
- Viết practice ladder, solution executable, QA.

**Gate:** 11/11 ID Chapter 07 `FRAMEWORK-FULL`; tự phân biệt được số âm làm positive window sai.

### Batch 2 — Chapter 09: Binary Search

- Hoàn thiện `BS-01..05`.
- Dạy exact search, lower/upper bound trước answer space.
- First feasible/last feasible, loop termination, Number/BigInt.
- Neo OF043 và OF044; dùng PF19 cho variant knobs.

**Gate:** 5/5 ID `FRAMEWORK-FULL`; test bắt infinite-loop và equality boundary.

### Batch 3 — Chapter 10: Graph Traversal và Tree

- Hoàn thiện `BFS-01..07` và `TREE-01`.
- Modeling, adjacency, component, DFS iterative, shortest BFS, multi-source, state nhiều chiều, tree parent/subtree.
- Neo OF023, OF037–OF040, OF042, OF045, OF055–OF056, SR006.

**Gate:** 8/8 ID pass; learner nói được khi nào DFS/BFS interchangeable và khi nào shortest bắt buộc BFS.

### Batch 4 — Chapter 11: Heap và Greedy

- Hoàn thiện `HG-01..05`.
- Heap implementation, comparator, top-k, scheduling eligibility, interval/exchange proof.
- Neo OF012–OF014, OF025, OF028, OF030, OF057.
- Contrast queue scheduling với heap scheduling.

**Gate:** 5/5 ID pass; mọi greedy có exchange/cut argument, không chấp nhận “có vẻ đúng”.

### Batch 5 — Chapter 12: Backtracking và DP

- Hoàn thiện `BTD-01..08`.
- Combination/permutation/dedupe, pruning, memoization, state/base/order, 1D/grid/interval/Set-DP.
- Neo OF020, OF022, OF024, OF031–OF036.
- Dùng PF07/PF08/PF11/PF12 để chỉ rõ điểm chuyển backtracking → memo → DP.

**Gate:** 8/8 ID pass; có counterexample chứng minh khi một scalar DP không đủ.

### Batch 6 — Chapter 13: Advanced Graph

- Viết `GR-01..05` từ zero.
- Neo OF029, OF041, OF046, OF047, OF059.
- Contrast bắt buộc: BFS vs Dijkstra; shortest path vs MST; DFS traversal vs Euler edge-once; abstract cycle vs planar face.

**Gate:** 5/5 ID `FRAMEWORK-FULL`; test stale heap, duplicate Euler edge, disconnected MST và diagonal crossing.

### Batch 7–9 — retrofit chương đã `FULL` lịch sử

Không viết lại từ đầu. Bổ sung đúng ô audit thiếu cho ARR/MAT/MAP/SIM/SORT/TP/SQ:

- Batch 7: ARR + MAT + SIM.
- Batch 8: MAP + SORT + TP.
- Batch 9: SQ còn lại; dùng `SQ-02` làm chuẩn mẫu.

**Gate:** không mất nội dung/bài luyện cũ; tất cả CORE ưu tiên rất cao đạt `FRAMEWORK-FULL` trước, sau đó mới VARIANT/OPTIONAL.

### Batch 10 — Mixed tests và hệ thống ôn

- Viết 8 đề trộn không lộ tên pattern.
- Mỗi đề chấm năm trục: recognition, state, invariant/proof, code, revealing test.
- Tạo 4 gate mô phỏng 120 phút, mỗi gate 4 bài lấy từ official public nhưng không hiển thị category.
- Tracker ghi `PF dự đoán`, `ID canonical`, knob bị bỏ sót và thời gian.

**Gate:** mixed tests có solution tách riêng, code/test chạy được và rubric chấm nhất quán.

### Batch 11 — hardening toàn repo

- Audit mọi Markdown link/anchor và JavaScript fence.
- Audit 89/89 ID có canonical/practice/solution/QA theo loại.
- Audit 24/24 PF ↔ 67/67 official ↔ canonical ID.
- Loại placeholder, trạng thái cũ mâu thuẫn và navigator trùng.
- Chạy `npm test`, `check:lessons`, `check:patterns`, `check:notebook-framework`, `check:canonical`, `check:templates`.

## 7. Thứ tự ưu tiên cho mục tiêu 700+

Không đợi notebook hoàn thiện 89/89 mới học. Thứ tự authoring và học nên là:

```text
P0: Chapter 07, 09, 10, 11, 12
P1: GR-01 Dijkstra, GR-02 MST, GR-03 closure, TREE-01
P2: GR-04 Euler, GR-05 topology
P3: retrofit các ID v1 còn thiếu framework
P4: OPTIONAL và biến thể hiếm
```

Mỗi ngày học dùng chuỗi duy nhất:

```text
Canonical lesson trong Notebook
→ tự code template trắng
→ Pattern Family: chọn 2 knobs khác nhánh
→ 1 bài official neo
→ 1 drill transfer không lộ pattern
→ ghi error log và ôn D1/D3/D7
```

## 8. Definition of Done cuối cùng

Bộ tài liệu chỉ được gọi là hoàn thiện khi:

- 89/89 Coverage ID có trạng thái chính xác; mọi CORE cần thiết đạt `FRAMEWORK-FULL`.
- 24/24 Pattern Family nối canonical và official anchor.
- 67/67 official public lesson nối về đúng canonical ID/PF; code/test vẫn pass.
- Không còn chương/solution chỉ có placeholder.
- Có đủ practice ladder và tám mixed tests.
- Có một navigator duy nhất và một lệnh audit tổng.
- Người học có thể đi từ đề lạ → nhận dạng → state/invariant → template → code mà không cần đọc lời giải bài tương tự trước.

## 9. Ước lượng khối lượng

- 6 batch viết mới trọng tâm (07, 09, 10, 11, 12, 13).
- 3 batch retrofit nội dung v1.
- 1 batch mixed tests.
- 1 batch hardening.
- Tổng: khoảng 11 batch triển khai; ưu tiên 5 batch đầu là đủ để bắt đầu học nghiêm túc cho mục tiêu 700+, phần retrofit chạy song song với lịch ôn.
