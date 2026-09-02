# Progressive Training — Implementation Checkpoint

Ngày cập nhật: 02/09/2026
Baseline đã audit: `c805fa2924c4197631bc6ac87b3e02c77b33e4dd`  
Ngày thi: 12/09/2026

## CURRENT BATCH

`CONTENT BATCH A6 — COMPLETE`

Hai lesson P0 mới chạy end-to-end cho F13: OF037 connected components và rooted-tree parent/depth/subtree bằng forward traversal + reverse fold. Cùng OF023 tree edge-cut, variants đã phủ matrix/list/grid components, iterative DFS và level aggregation nên F13 được nâng lên `COMPLETE`.

## BATCH 0 AUDIT

### STACK FOUND

- App hiện hữu ở `review-app/`: React, TypeScript, Vite và Vitest; npm + `package-lock.json`.
- Routing hash, layout và navigation nằm trong `review-app/src/App.tsx`; Progressive Training dùng route `#/training` và `#/training/:lessonId`.
- Supabase client/auth hiện hữu nằm trong `review-app/src/cloud/`; không tạo client hoặc auth flow mới.
- Editor dùng component hiện hữu `CodeEditor`; code chạy qua Web Worker với timeout mặc định 2 giây.
- Root repository có Node test suite riêng cho notebook, official lessons và templates.

### EXISTING TRAINING FLOW

- Vertical slice trước Batch 1 có năm bước cố định: `PATTERN_CHOICE → BLOCK_ORDERING → CODE_FILL → FULL_CODE → VARIANT`.
- Chỉ authenticated user mới mount training hook; signed-out gate không tạo local progress.
- Draft debounce 600 ms lên Supabase; attempt dùng UUID phía client để retry idempotent.
- Hai lesson P0 đang active: DFS take/skip và backtracking assignment.

### EXISTING LESSON MODEL

- `ProgressiveLesson` có metadata, version, nguồn, constraints và tuple năm step.
- Full-code và mỗi variant có canonical solution cùng deterministic tests.
- Sau Batch 1, block ordering có `canonicalOnly`, deterministic tests và pipeline validate → assemble → execute.
- Model chưa có blueprint schema theo family, logic ordering tiếng Việt, block writing, debug challenge hoặc adaptive route.

### EXISTING TAXONOMY

- Canonical corpus audit hiện tại xác nhận 24 family `F01–F24`, đúng danh sách và priority trong master prompt:
  - P0: F01–F07, F09, F11–F15.
  - P1: F08, F10, F16, F17, F20–F22.
  - P2: F18, F19, F23.
  - P3: F24.
- Repo còn có linked layer `PF01–PF24` cho 67 public official lessons. Đây là taxonomy theo family bài public cũ, không đồng nhất ID với taxonomy corpus `F01–F24`; khi lập coverage matrix phải map theo semantic/provenance, không theo số thứ tự.
- Hai training lesson hiện tại cùng thuộc F11; chưa có executable Progressive Training lesson cho 23 family còn lại.

### EXISTING SUPABASE MODEL

- `progressive_training_progress`: khóa `(user_id, lesson_id)`, lesson version, current/completed steps, mastery đơn giản, full/variant flags, hint/viewed-solution, attempt count, JSON draft, review timestamps.
- `progressive_training_attempts`: UUID idempotency key, user/lesson/version/step, answer, pass, test results, hint và duration.
- RLS bật trên cả hai table; policy giới hạn `auth.uid() = user_id`; anon bị revoke.
- Hai RPC security-invoker ghi draft và attempt; attempt insert + progress upsert nằm trong cùng transaction.
- Database types đã có hai table và hai RPC. Batch 1 không đổi schema.

### EXISTING RUNNER

- `runCodeCases` tạo Web Worker từ `runnerWorkerSource`, chạy từng expression và so JSON-normalized output.
- Worker bị terminate và blob URL bị revoke khi hoàn tất/error/timeout; timeout mặc định 2 giây.
- Supabase không thực thi code.
- Batch 1 tái sử dụng đúng runner này cho block ordering.

### EXISTING TESTS

- Trước Batch 1 đã có unit tests cho evaluator, runner, canonical full-code/variant solutions, auth gate, repository/error và static migration/RLS/idempotency checks.
- Root suite kiểm notebook/templates/67 official lessons.
- Không có local Supabase integration environment trong CI; RLS/RPC mới chỉ được kiểm tĩnh.

### KNOWN BUGS

- Đã sửa: block `close` của assignment đóng outer function trước `dfs(0, 0); return best;`.
- Đã sửa: block grader chỉ so `order IDs === correctOrder`, không assemble/compile/execute.
- Còn lại ngoài Batch 1: migration/mastery cũ có thể gán `MASTERED` ngay khi variant pass; chưa yêu cầu full recall ngày khác và chưa áp đủ rule viewed-solution.
- Còn lại ngoài Batch 1: flow/database chỉ hỗ trợ năm step, chưa phải sáu level thích ứng.

### MISSING LEARNING BRIDGES

- Chưa có family-specific blueprint recall.
- Chưa có logic ordering tiếng Việt.
- `CODE_FILL` hiện là token/fragment fill, chưa phải tự viết từng block.
- Full recall còn starter skeleton mặc định, chưa phải trang trắng + hint ladder đầy đủ.
- Chưa có debug challenge riêng và contract-variant preflight questions.
- Chưa có adaptive routing, deterministic mastery D+1/D+3/D+7, LEARN/RECALL/EXAM modes hoặc “Hôm nay nên luyện gì” cho Progressive Training.

### PROPOSED BATCH ORDER

1. Batch 2A: data model/runtime validator cho sáu level và migration tương thích.
2. Batch 2B: adaptive routing, hint/mastery/review logic và tests.
3. Batch 2C: UI/draft restore cho blueprint, logic ordering, block writing, debug/variant và exam mode tối thiểu.
4. Batch 3: coverage matrix F01–F24 với provenance/status thật.
5. Content Batch A theo sub-batch 3–4 executable lessons, rồi Content Batch B; chỉ sau đó mới Content Batch C.

## COMPLETED FEATURES

- Flow UI/data canonical có sáu level: Pattern + Blueprint, Logic Ordering, Code Block Ordering, Block Writing, Full Recall, Debug + Variant.
- Mọi lesson hiển thị đề bài đầy đủ trước Level 1: rule/contract, input, output, constraints, function signature, ví dụ và giải thích; kèm link Programmers chính thức được phân loại `ĐỀ CHÍNH XÁC` hoặc `BÀI LIÊN QUAN` để không đánh đồng drill nền với nguyên đề.
- Training index được xếp thành chín module prerequisite: representation → linear/Map/Set/sorting → grid/atomic simulation → queue/timeline simulation → decision tree/backtracking → tree/graph traversal → heap selection/scheduling → interval greedy → binary search on answer. Mỗi module ghi tín hiệu nhận dạng, invariant và thứ tự lesson từ nền tới transfer.
- Blueprint theo family; logic/code ordering random ban đầu, kéo-thả và có nút lên/xuống; mọi draft tiếp tục lưu Supabase.
- Level 4 dùng một editor viết trọn lời giải có checklist subgoal; chỉ pass khi full source compile/chạy deterministic tests. Draft từng-block cũ được tự ghép vào editor để không mất dữ liệu.
- Full Recall bắt đầu editor trống, có hint ladder năm mức; mở solution không tính clean recall.
- Mỗi lesson có ít nhất hai debug challenge và hai contract variants; OF043 có sáu variants tương ứng sáu drill Lab C. Variant yêu cầu trả lời STATE/BASE CASE/TRANSITION/INVARIANT/OUTPUT trước khi pass.
- Adaptive route deterministic; fail Level 5 quay về Level 4.
- Mastery không còn đạt trong ngày đầu: clean full recall ngày khác + transfer evidence mới đạt `MASTERED`; lịch review D+1/D+3/D+7.
- Migration map dữ liệu năm step sang sáu level, giữ attempt cũ và hạ mastery cũ thiếu evidence về `TRANSFER_READY`.
- Block ordering kiểm tra đủ/thiếu/thừa/trùng/unknown ID.
- Block order hợp lệ được ghép thành JavaScript source thật và chạy toàn bộ deterministic tests qua Web Worker.
- Exercise khai báo rõ `canonicalOnly`; canonical order không còn là điều kiện duy nhất.
- Assignment blocks tách đóng loop, đóng DFS và đóng outer function; initial call/return nằm đúng scope.
- Hai lesson tăng version từ 1 lên 2; progress cũ không bị xóa, draft assignment tám block cũ tự fallback sang inventory mười block mới.
- GitHub Actions tối thiểu dùng npm lockfiles: install, root tests, app tests, typecheck/build.
- D10: OF036 luyện cây quyết định cộng/trừ và search space `2^n`; OF022 luyện permutation backtracking, feasibility, choose/explore/unchoose và restore.
- D11: OF023 luyện tree edge cut, skip cạnh hai hướng và visited riêng từng traversal; OF057 luyện interval mở, earliest-end và exchange argument, kèm Lab E.
- D12: OF043 dùng closed first-feasible search với BigInt; sáu drill Lab C phủ ba first true và ba last true bằng code/tests thực thi.

## COMPLETED FAMILIES

- F01 — `COMPLETE` với lesson chuẩn hóa thời gian và variants representation/interval.
- F02 — `COMPLETE` với lesson maximal run scan và variants RLE/optimization.
- F03 — `COMPLETE` với lesson grid chữ nhật và variants 8-neighbor/atomic path.
- F04 — `COMPLETE` với frequency multiset, stable Set dedupe, grouping buckets và first-index lookup.
- F05 — `COMPLETE` với comparator score/time/id, numeric normalization và concatenation comparator.
- F06 — `COMPLETE` với Robot thực hành R/L/G/B, bounded validate-before-commit và inventory transaction.
- F07 — `COMPLETE` với same-time collision batches, half-open events và FIFO server timeline.
- F09 — `COMPLETE` với array+head, re-enqueue metadata, release batches và deque transfers.
- F11 có bốn lesson chạy đủ sáu level, gồm OF036 và OF022; vẫn `PARTIAL` vì family còn rộng.
- F12 — `COMPLETE` với graph/grid shortest path, farthest layer, target distance, multi-source graph/grid, 8-neighbor và expanded state one/K-break cùng key-door.
- F13 — `COMPLETE` với OF037 matrix components, adjacency-list/grid transfer, iterative DFS, rooted-tree parent/depth/subtree/level count và OF023 tree edge-cut.
- F14 — `COMPLETE` với OF043 BigInt, first/last feasible và đủ sáu predicate drills Lab C.
- F15 — `COMPLETE` với min/max heap, repeated transform/reinsert, bounded Top K, object comparator, event scheduling và resource availability heap.
- F16 có OF057 và Lab E executable; vẫn `PARTIAL` vì greedy family còn nhiều proof shape khác.

## COMPLETED LESSONS

- `PT-DFS-TAKE-SKIP` — executable reference lesson sáu level.
- `PT-BT-ASSIGNMENT` — executable reference lesson sáu level.
- `PT-F01-TIME-NORMALIZATION` — complete executable lesson sáu level.
- `PT-F02-RUN-SCAN` — complete executable lesson sáu level.
- `PT-F03-GRID-NEIGHBORS` — complete executable lesson sáu level.
- `PT-F04-FREQUENCY-MULTISET` — Map multiplicity/delete-zero cùng Set, grouping và inverse lookup transfers.
- `PT-F05-MULTIKEY-SORT` — comparator số nhiều khóa, explicit ties và input-copy contract.
- `PT-F06-ATOMIC-ROBOT` — PCCP Robot thực hành cùng atomic validation/commit variants.
- `PT-F07-COLLISION-TIMELINE` — PCCP collision risk time-batch simulation.
- `PT-F09-QUEUE-HEAD` — process queue với head index và original identity.
- `PT-F11-COMBINATION` — combination start-index cùng target/repetition transfers.
- `PT-F12-GRAPH-BFS` — OF045 graph BFS với distance layer, farthest tie count, target và multi-source transfers.
- `PT-F12-GRID-BFS` — OF038 grid shortest-path, rectangular bounds, multi-source grid và 8-neighbor transfer.
- `PT-F12-EXPANDED-STATE-BFS` — visited theo position × resource, one/K-break và key-door transfer.
- `PT-F15-SCOVILLE-HEAP` — OF012 min-heap repeated transform, reinsert, max-heap và optimal merge.
- `PT-F15-BOUNDED-TOP-K` — Hall of Fame streaming Top K, bounded heap và object-frequency comparator.
- `PT-F15-EVENT-HEAP-SCHEDULING` — OF013 sorted arrivals + ready heap, idle jump và resource availability transfer.
- `PT-F13-NETWORK-COMPONENTS` — OF037 outer unseen-root traversal, isolated node và component size/grid transfers.
- `PT-F13-ROOTED-TREE-PROFILE` — iterative parent/depth traversal, reverse-order subtree aggregation và level counts.
- `PT-OF036-TARGET-NUMBER` — D10 DFS cộng/trừ, hai debug và hai contract variants.
- `PT-OF022-FATIGUE` — D10 permutation backtracking, restore và required/cost contract.
- `PT-OF023-POWER-GRID` — D11 tree edge cut/component traversal.
- `PT-OF057-INTERCEPTION` — D11 earliest-end cho interval mở và Lab E.
- `PT-OF043-IMMIGRATION-BIGINT` — D12 first feasible BigInt cùng sáu drill Lab C.

Hai mươi bốn lesson pass validator/content execution và draft fields được lưu qua JSON payload. Supabase RLS vẫn chỉ static-tested, vì vậy completion claim không bao gồm local-Supabase integration.

## PLANNED LESSONS

- Content Batch A7: hoàn thiện gap còn lại của F11, ưu tiên grid/multi-agent backtracking và duplicate-choice pruning.
- Các lesson tiếp theo tiếp tục theo sub-batch tối đa 3–4 lesson.

## KNOWN BUGS

- Không còn known failure trong phạm vi Batch 1.
- Các gap engine/mastery/content nêu trong audit là limitation đã biết, không được coi là coverage hoàn chỉnh.

## TEST STATUS

- `cd review-app && npm test`: PASS — 23 files, 87 tests.
- `npm test` tại root: PASS — 187 tests.
- `cd review-app && npx tsc -b --pretty false`: PASS.
- Tests mới chứng minh: schema sáu level; blueprint/logic graders; adaptive routes; hint/mastery evidence; D+1/D+3/D+7; assembled code/block-writing/full-recall pass; mọi debug starter có revealing test; mọi debug/variant solution pass; đủ sáu binary-search drills; migration tương thích; auth gate và RLS static checks.
- Supabase local integration: NOT RUN; migration/RLS chỉ static-tested.

## BUILD STATUS

- `cd review-app && npm run build`: PASS.
- Vite còn warning chunk chính khoảng 3.10 MB (>500 kB); đây là performance warning, không phải build failure.

## COVERAGE MATRIX STATUS

- Matrix canonical có đúng 24 row và được validator kiểm tra trong CI.
- `COMPLETE`: F01–F07, F09, F12–F15.
- `PARTIAL`: F11, F16.
- `PLANNED`: F08, F10, F17–F24.

## NEXT EXACT TASK

Thực hiện Content Batch A7: thêm executable F11 grid/multi-agent backtracking và duplicate-choice pruning; chỉ nâng F11 khi các search-space shape còn thiếu có deterministic evidence.
