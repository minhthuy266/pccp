# Audit toàn repo PCCP 700+ — 12/08/2026

> **Loại tài liệu:** quyết định kiến trúc và biên bản baseline ngày 12/08/2026; cập nhật snapshot hiện hành ngày 15/08/2026. Đây không phải dashboard tiến độ. Khi số liệu trong prose và audit máy khác nhau, lấy kết quả của `npm run check:all` làm chuẩn.

## Kết luận điều hành

Repo có nhiều lớp nội dung tốt nhưng từng phát triển theo nhiều hướng. Kiến trúc hiện hành chỉ có **một entrypoint** để người học bookmark: `PCCP_700_MASTER_NAVIGATOR.md`.

```text
PCCP_700_MASTER_NAVIGATOR.md
├─ PCCP_Thinking_Curriculum.md: lớp handbook/khái niệm
├─ official-lessons/: lớp transfer theo 67 bài official đã kiểm chứng
├─ pattern-families/: lớp tổng hợp 24 family
├─ PCCP_Algorithm_Code_Notebook/: lớp luyện sâu 89 Coverage ID
└─ template, tracker và mock: chỉ mở tại điểm Navigator chỉ định
```

`PCCP_Thinking_Curriculum.md`, notebook và từng official lesson là các **linked learning layer**, không phải ba cổng canonical cạnh tranh. Từ “canonical” bên trong một layer chỉ nói về nội dung/ID đã được audit; nó không cấp quyền tự điều hướng ngoài Navigator.

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

## KEEP — kiến trúc hiện hành

| File/nhóm | Disposition | Vai trò |
|---|---|---|
| `README.md` | REDIRECT | Chỉ chuyển người học tới Master Navigator |
| `PCCP_700_MASTER_NAVIGATOR.md` | ENTRYPOINT | **Cổng duy nhất** quyết định thứ tự và thời điểm mở mọi layer |
| `PCCP_OFFICIAL_ONLY_CURRICULUM.md` | LINKED LAYER | Phạm vi, priority và gate dựa trên nguồn official |
| `PCCP_OFFICIAL_PRACTICE_BANK.csv` | GOVERNANCE | 69 ID official, gồm 61 bài mở và 8 past-paper khóa |
| `PCCP_OFFICIAL_SYLLABUS_RESERVE.csv` | GOVERNANCE | 6 bài reserve mở; cùng 61 bài bank tạo tập 67 official lesson hiện hành |
| `PLAN_PCCP_700_REBUILD_2026-09-12.md` | LINKED LAYER | Lịch ngày được Navigator dẫn tới |
| `TRACKER_PCCP_REBUILD_2026.csv` | LINKED LAYER | Tiến độ thực tế được Navigator dẫn tới |
| `docs/pccp-700-roadmap/PCCP_Thinking_Curriculum.md` | LINKED LAYER | Handbook/khái niệm; không phải entrypoint độc lập |
| `docs/pccp-700-roadmap/official-lessons/` | LINKED LAYER | 67/67 lesson có solution/test và được pattern + notebook anchor |
| `docs/pccp-700-roadmap/pattern-families/` | LINKED LAYER | 24/24 family sở hữu đủ 67 lesson |
| `PCCP_Algorithm_Code_Notebook/` | LINKED LAYER | Luyện sâu 89/89 Coverage ID; chỉ vào từ link đúng ngày/chủ đề |
| `docs/pccp-700-roadmap/PCCP_JavaScript_Templates.md` | LINKED LAYER | Giải thích implementation đầy đủ |
| `docs/JS_TEMPLATES_PCCP.js` | LINKED LAYER + TEST | Code executable được lesson/handbook dẫn tới |
| `docs/pccp-700-roadmap/PCCP_Final_Cheat_Sheet.md` | LINKED LAYER | Chỉ dùng taper/ôn cuối |
| `docs/pccp-700-roadmap/PCCP_Error_Log.csv` | LINKED LAYER | Chỉ ghi lỗi đã gặp thật |
| `docs/pccp-700-roadmap/OFFICIAL_RESEARCH_AUDIT_2026-08-12.md` | GOVERNANCE | Evidence ledger và giới hạn suy luận |
| `locked/OFFICIAL_MOCK_BANK.md` | LOCKED | URL mock; không mở trước timer |
| `locked/POST_MOCK_ANALYSIS.csv` | LOCKED | Spoiler hậu kiểm; chỉ mở sau mock |
| `tests/`, `tools/`, `package*.json` | SUPPORT | Kiểm tra code, link và integrity |

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
| `PROBLEM_BANK.csv` | Bank legacy để map mã Pxx; không được chọn bài mới từ đây |
| Các DOCX/PDF Level 1 ở root | Corpus/generated output; quá rộng và không bám lịch 700+ hiện tại |
| `docs/pccp-700-roadmap/*.docx`, `*.pdf` | Snapshot xuất bản cũ; không phải nguồn sự thật sau các thay đổi Markdown |

## Notebook — linked layer đã kiểm chứng

### Snapshot hiện hành — 15/08/2026

- `npm run check:notebook-framework`: **89/89 `FRAMEWORK-FULL`**, 0 thiếu.
- `npm run check:notebook-integration`: **89/89** Coverage ID được map, **24/24** family có owner, **67/67** official lesson có anchor.
- Notebook là lớp luyện sâu đã hoàn tất về framework/integration, nhưng vẫn không tự quyết định lịch học; Navigator giữ quyền điều phối.

### Baseline lịch sử — 12/08/2026

Tại thời điểm audit ban đầu, notebook mới có 1/83 ID đạt framework mới, nhiều chương còn stub và các file README/handoff bên trong dễ bị hiểu nhầm thành entrypoint. Những số liệu này chỉ giải thích vì sao kiến trúc một Navigator được khóa; chúng **không còn là trạng thái live**. Các batch sau đó đã nâng matrix lên 89 ID và hoàn tất crosswalk với 24 family/67 lesson.

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

## Baseline lịch sử — độ sâu trước rewrite ngày 12/08/2026

> Bảng dưới là chẩn đoán đã kích hoạt đợt rewrite, không phải trạng thái live của các linked layer ngày 15/08/2026.

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

## Kết quả kiểm tra baseline lịch sử — 12/08/2026

- Tại thời điểm đó, `npm test`: 24/24 test pass.
- Tại thời điểm đó, `npm run check:templates`: pass.
- Tại thời điểm đó, `npm run check:notebook-framework`: không có lỗi integrity, nhưng chỉ 1/83 pattern `FRAMEWORK-FULL`.
- Tại thời điểm đó, bank có 32 CORE, 22 TRANSFER, 7 STRETCH, 8 RESERVED_MOCK; không lệch số cột.

Baseline pass không có nghĩa nội dung đã đủ sâu; nó chỉ chứng minh code lúc đó được test và link/framework không gãy theo các rule của thời điểm ấy.

## Nâng cấp đã thực hiện ở baseline 12/08/2026

- Khóa Master Navigator làm entrypoint duy nhất; handbook, lesson, family và notebook là các layer được liên kết, không phải các cổng cạnh tranh.
- Bổ sung tám lab sâu: implementation/mutation, variable window, monotonic stack, binary search on answer, multi-source BFS, interval greedy, difference array 2D và grid DP.
- Thêm implementation executable tương ứng vào `docs/JS_TEMPLATES_PCCP.js`.
- Mở rộng smoke test bằng các assertion cho duplicate, zero-window, overlap rectangle, multi-source distance, interval boundary và obstacle DP.
- Gắn lab vào đúng ngày D6, D9, D13, D14, D16 và D20 trong plan.
- Thêm `npm run check:canonical`: kiểm bank official-domain/count/ID, OF reference, reserved mock, link Markdown, JavaScript fence và allowlist nguồn.
- Thêm `npm run inventory`: xuất disposition của từng file vào `REPO_FILE_INVENTORY.csv`.
