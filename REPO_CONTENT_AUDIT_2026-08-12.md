# Audit toàn repo PCCP 700+ — 12/08/2026

## Kết luận điều hành

Repo có nhiều tài liệu tốt nhưng từng phát triển theo nhiều hướng, khiến người học có thể mở nhầm một notebook dang dở, một cheatsheet tra cứu hoặc một bản kế hoạch cũ và tưởng đó là giáo trình chính. Từ audit này, người học chỉ bookmark **một file điều hướng**: `PCCP_700_MASTER_NAVIGATOR.md`.

```text
PCCP_700_MASTER_NAVIGATOR.md
→ dòng đầu tiên chưa completed
→ đúng mục trong PCCP_Thinking_Curriculum.md
→ bài OFxxx trong PCCP_OFFICIAL_PRACTICE_BANK.csv
→ PCCP_JavaScript_Templates.md khi cần implementation
```

`PCCP_Thinking_Curriculum.md` là **handbook canonical duy nhất**. Các file khác chỉ làm một trong bốn việc: điều phối lịch, cung cấp code executable, theo dõi lỗi, hoặc lưu tham khảo cũ.

## Chuẩn nguồn

### Được phép quyết định curriculum

- `certi.programmers.co.kr`: cấu trúc, phạm vi, cấp độ, quy trình thi.
- `business.programmers.co.kr`: brochure chính thức.
- `school.programmers.co.kr`: course PCCP, sample/past paper và bài luyện chính thức.

### Không được phép quyết định curriculum

- blog/review người thi;
- roadmap cộng đồng;
- LeetCode, BOJ hoặc sách ngoài;
- suy đoán điểm từng câu;
- tên pattern do repo tự đặt mà không map được về phạm vi/course/bài official.

Review người thi chỉ được giữ ở research audit để biết rủi ro vận hành. Nó không được thêm/bớt cluster, gán xác suất ra đề hoặc thay đổi scoring claim.

Code JavaScript trong repo là implementation tự viết từ contract và constraints của bài official. Nó không được gọi là “lời giải chính thức” nếu Programmers không công bố JavaScript solution. Mỗi implementation canonical phải parse được, có test, invariant, complexity và edge case.

## KEEP — dùng trực tiếp

| File/nhóm | Quyết định | Vai trò |
|---|---|---|
| `README.md` | KEEP | Redirect tối thiểu tới Master Navigator |
| `PCCP_700_MASTER_NAVIGATOR.md` | KEEP | Cổng duy nhất: thứ tự học + 100% syllabus/course/Kit public |
| `PCCP_OFFICIAL_ONLY_CURRICULUM.md` | KEEP | Phạm vi, priority và gate dựa trên nguồn official |
| `PCCP_OFFICIAL_PRACTICE_BANK.csv` | KEEP | 69 bài official; không tự thêm bài ngoài nguồn |
| `PCCP_OFFICIAL_SYLLABUS_RESERVE.csv` | KEEP | 6 bài Programmers official bịt các khe coverage; chỉ mở theo điều kiện trong Navigator |
| `PLAN_PCCP_700_REBUILD_2026-09-12.md` | KEEP | Lịch ngày duy nhất |
| `TRACKER_PCCP_REBUILD_2026.csv` | KEEP | Tiến độ thực tế duy nhất |
| `docs/pccp-700-roadmap/PCCP_Thinking_Curriculum.md` | KEEP + DEEP REWRITE | Handbook học sâu duy nhất |
| `docs/pccp-700-roadmap/PCCP_JavaScript_Templates.md` | KEEP + VERIFY | Giải thích implementation đầy đủ |
| `docs/JS_TEMPLATES_PCCP.js` | KEEP + TEST | Code executable canonical |
| `docs/pccp-700-roadmap/PCCP_Final_Cheat_Sheet.md` | KEEP | Chỉ dùng taper/ôn cuối |
| `docs/pccp-700-roadmap/PCCP_Error_Log.csv` | KEEP | Chỉ ghi lỗi đã gặp thật |
| `docs/pccp-700-roadmap/OFFICIAL_RESEARCH_AUDIT_2026-08-12.md` | KEEP | Evidence ledger và giới hạn suy luận |
| `locked/OFFICIAL_MOCK_BANK.md` | KEEP/LOCKED | URL mock; không mở trước timer |
| `locked/POST_MOCK_ANALYSIS.csv` | KEEP/LOCKED | Spoiler hậu kiểm; chỉ mở sau mock |
| `tests/`, `tools/`, `package*.json` | KEEP | Kiểm tra code, link và integrity |

## KEEP — dữ liệu cá nhân, không phải giáo trình

| File/nhóm | Lý do giữ |
|---|---|
| `BASIC.js`, `BASIC copy.js`, `playground/` | Bài làm/sandbox của người học; không dùng làm mẫu chuẩn |
| `basic-drafts/` | Bản nháp luyện code; giữ lịch sử học |
| `assets/` | Font và license phục vụ tài liệu xuất bản |

Không tự động sửa code cá nhân thành lời giải đẹp: lỗi thật trong đó có giá trị cho error log.

## REFERENCE-ONLY — không đọc tuần tự

| File/nhóm | Đánh giá |
|---|---|
| `docs/CHEATSHEET_THUAT_TOAN_JS_PCCP.md` | Coverage rộng và nhiều giải thích hữu ích, nhưng trùng handbook/templates; chỉ tra cứu phụ |
| `PCCP_Algorithm_Code_Notebook/` | 89 file, giàu drill ở một số chương nhưng hệ thống dang dở; audit tự động hiện chỉ 1/83 pattern đạt `FRAMEWORK-FULL` |
| `PROBLEM_BANK.csv` | Bank legacy để map mã Pxx; không được chọn bài mới từ đây |
| Các DOCX/PDF Level 1 ở root | Corpus/generated output; quá rộng và không bám lịch 700+ hiện tại |
| `docs/pccp-700-roadmap/*.docx`, `*.pdf` | Snapshot xuất bản cũ; không phải nguồn sự thật sau các thay đổi Markdown |

### Nội dung notebook đã tốt

- `chapters/08_stack_queue/01_Stack_Monotonic.md`: pilot sâu nhất; có invariant, strictness, dry run và transfer.
- Các chương Map/Set, Array, Matrix, Sorting, Two Pointers đã có nhiều drill và solution.
- `00_CORE_TEMPLATE_VARIANTS_FRAMEWORK.md` định nghĩa chuẩn chất lượng hợp lý.

### Nội dung notebook chưa đạt

- Chapter 07, 09, 10, 11, 12 và Mixed Test vẫn là khung/stub.
- 36 pattern còn `PLANNED`; nhiều solution file chỉ 4 dòng.
- Matrix nói `FULL` lịch sử nhưng audit evidence mới chỉ xác nhận 1/83 `FRAMEWORK-FULL`; hai nhãn này dễ gây hiểu nhầm.
- Có nhiều entrypoint, manifest, handoff, continuation context và tracker riêng cạnh tranh với lộ trình root.

Quyết định: không hoàn thiện notebook như một sản phẩm thứ hai trước ngày thi. Chỉ tái sử dụng phần giải thích tốt để nâng handbook canonical.

## ARCHIVE / bỏ khỏi luồng học

| File/nhóm | Lý do |
|---|---|
| `archive/` | Đúng vai trò lịch sử; không mở khi học hiện tại |
| `locked/MIXED_MOCK_D29.csv` | Mock tự ghép cũ, đã bị official past set thay thế |
| Các dòng `Mixed Mock D29` trong `locked/POST_MOCK_ANALYSIS.csv` | Spoiler của mock cũ, không còn nằm trong plan |
| `CHATGPT_WORK_HANDOFF.md` | Handoff phiên cũ; stale sau audit mới |
| `pccp-700-curriculum.patch` | Artifact triển khai, không phải nội dung học |
| DOCX trùng byte giữa root và `archive/generated-documents/` | Chỉ giữ một bản khi dọn binary; không ảnh hưởng curriculum |
| `.DS_Store` | Metadata hệ điều hành; nên ignore/xóa ngoài nội dung học |

“Archive” ở đây nghĩa là bỏ khỏi đường học canonical. Không xóa code cá nhân hoặc binary hàng loạt trong audit này để tránh mất dữ liệu; dọn vật lý có thể làm sau khi người học xác nhận.

## Đánh giá độ sâu của tài liệu canonical trước rewrite

| Phần | Trạng thái trước audit | Việc cần làm |
|---|---|---|
| Hệ điều hành giải bài | Tốt | Thêm provenance và rubric output |
| Array/matrix | Quá ngắn | Thêm contract, dry run, mutation và official mapping |
| Hash/sort/two pointers | Khá | Thêm `Map.has` vs `get`, proof comparator/two-pointer |
| Prefix/window | Khá | Thêm điều kiện hợp lệ của variable window và prefix 2D/difference |
| Stack/queue | Khá | Thêm queue batching, deque implementation và counterexample |
| Simulation | Khá | Thêm event order, commit atomic và bài official mapping |
| Backtracking | Ngắn | Thêm search-space math, pruning proof và duplicate handling |
| Greedy | Ngắn | Thêm exchange argument và tiêu chí bác bỏ greedy |
| Binary search | Khá | Thêm first/last feasible, bound proof, numeric safety |
| BFS/DFS/tree | Khá | Thêm component, multi-source, state graph và Dijkstra boundary |
| Heap | Thiếu implementation | Nhúng heap đầy đủ hoặc trỏ chính xác tới code executable |
| DP | Quá ngắn | Thêm memo vs tabulation, 1D/2D, iteration-order proof |
| JavaScript safety | Phân tán | Gom checklist number/sort/mutation/queue/recursion |

## Definition of done mới

Một pattern chỉ được dạy trong handbook khi có đủ:

1. Nguồn official chứng minh nó nằm trong scope/course/bank.
2. Dấu hiệu nhận dạng và trường hợp không được dùng.
3. Brute force cùng bottleneck.
4. State, invariant và transition.
5. Full JavaScript implementation, không pseudocode giả dạng code.
6. Dry run ít nhất một test nhỏ.
7. Chứng minh đúng ở mức đủ dùng.
8. Time/space complexity.
9. Edge case và lỗi JavaScript.
10. Ít nhất một bài `OFxxx` official để luyện transfer.
11. Code canonical có automated test hoặc bài-specific solution được recode/submit trên Programmers.

## Kết quả kiểm tra baseline

- `npm test`: 24/24 test pass.
- `npm run check:templates`: pass.
- `npm run check:notebook-framework`: không có lỗi integrity, nhưng chỉ 1/83 pattern `FRAMEWORK-FULL`.
- CSV canonical: 32 CORE, 22 TRANSFER, 7 STRETCH, 8 RESERVED_MOCK; không lệch số cột.

Baseline pass không có nghĩa nội dung đã đủ sâu; nó chỉ chứng minh code hiện được test và link/framework không gãy theo các rule hiện có.

## Nâng cấp thực hiện trong audit này

- Khóa một handbook canonical và ghi rõ provenance của syllabus, bài official và code tự viết.
- Bổ sung tám lab sâu: implementation/mutation, variable window, monotonic stack, binary search on answer, multi-source BFS, interval greedy, difference array 2D và grid DP.
- Thêm implementation executable tương ứng vào `docs/JS_TEMPLATES_PCCP.js`.
- Mở rộng smoke test bằng các assertion cho duplicate, zero-window, overlap rectangle, multi-source distance, interval boundary và obstacle DP.
- Gắn lab vào đúng ngày D6, D9, D13, D14, D16 và D20 trong plan.
- Thêm `npm run check:canonical`: kiểm bank official-domain/count/ID, OF reference, reserved mock, link Markdown, JavaScript fence và allowlist nguồn.
- Thêm `npm run inventory`: xuất disposition của từng file vào `REPO_FILE_INVENTORY.csv`.
