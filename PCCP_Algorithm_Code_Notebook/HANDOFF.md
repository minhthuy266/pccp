# Handoff — PCCP Algorithm Code Notebook

> **Context tiếp tục mới nhất:** đọc toàn bộ [CONTINUATION_CONTEXT.md](CONTINUATION_CONTEXT.md) trước khi sửa notebook. File đó là nguồn chỉ dẫn chính cho các phiên sau và ghi lại workflow concept-first được người học yêu cầu.

> Cập nhật: 2026-08-09 (Asia/Ho_Chi_Minh)

> Cập nhật standard 2026-08-11: hợp đồng canonical nằm tại [00_CORE_TEMPLATE_VARIANTS_FRAMEWORK.md](00_CORE_TEMPLATE_VARIANTS_FRAMEWORK.md), audit toàn bộ ID tại [FRAMEWORK_COVERAGE_AUDIT.md](FRAMEWORK_COVERAGE_AUDIT.md), và `SQ-02` là pilot. Không đồng nhất `FULL` lịch sử với `FRAMEWORK-FULL`; không rewrite hàng loạt chapter khác trước khi pilot/QA đạt.

## Mục tiêu còn hiệu lực

Hoàn thiện notebook để người học tự giải được mọi đề PCCP công khai trong `PROBLEM_BANK.csv`. Theo dõi tiến độ từng đề ở [PCCP_PUBLIC_PROBLEM_CATALOG.md](PCCP_PUBLIC_PROBLEM_CATALOG.md), không chỉ theo `PATTERN_COVERAGE_MATRIX.md`. Chỉ đổi trạng thái một đề sang `Đã hoàn tất` khi lesson → solution → recall → QA đều đạt; `FULL` của pattern không thay thế điều đó.

## Trạng thái đã khóa

- Chapter 01–06 đã **Hoàn thiện v1**.
- Coverage: **47/83 FULL**, **36 PLANNED**.
- Nội dung: **211 nhiệm vụ + 15 Transfer Tests**.
- Chapter 06 có đủ `12R/3F/3L/3P/3C/3V/1M + 2 Transfer Tests`.
- QA Chapter 06: 143 JavaScript fences, 0 syntax error; 16/16 behavioral assertions pass; Practice/Solution khớp 32 ID; local links không gãy.

## Điểm dừng hiện tại

Đã tạo catalog legacy 40 bài non-mock (8 bài PCCP public + 32 bài luyện) và bài học/lời giải đầu tiên theo chuẩn mới: `P01 — Băng bó` tại `chapters/04_simulation/04_PCCP_Public_Problems.md` và `solutions/04_Simulation_PCCP_Solutions.md`. Chapter 07 vẫn là stub; `PRE-01..05`, `SW-01..06` còn `PLANNED`.

## Scope vừa hoàn tất — Chapter 08

Chapter 08 đã được nâng từ v1 lên concept-first và khóa lại tại `chapters/08_stack_queue/QA.md`: beginner guide, bộ 22 bài Programmers/PCCP, 22 full solutions, audit 47/47 bài Practice Kit và 10 derived concepts. `SQ-01..05` vẫn `FULL`. Không sửa trạng thái `SQ-*` nếu chưa chạy lại QA sau thay đổi code.

## Scope kế tiếp khi quay lại Chapter 07

1. `PRE-01..05`: prefix sum 1D, range query, prefix frequency/count, difference array và boundary/index convention.
2. `SW-01..06`: fixed window, variable window, count state, deque preview, invariant add/remove, contrast window với two pointers/prefix.
3. Giữ quota Manifest tối thiểu; ưu tiên chuẩn `12R/3F/3L/3P/3C/3V/1M + 2 Transfer Tests`.
4. Tách theory thành cụm Prefix và Sliding Window; viết theo chuẩn learner-first trong `CONTINUATION_CONTEXT.md`: bài nhỏ → tìm biến → code → dry run → thuật ngữ/nhận diện → lỗi → tự kiểm tra. Không quay lại A–E hoặc bài mẫu 16 bước.
5. Chỉ tạo QA và đổi `FULL` sau syntax, behavioral, ID-set và link audits.

## Quy ước chất lượng

- Full JavaScript dùng `js`; bài khuyết dùng `js-fill`.
- Solution không được chỉ trỏ ngược về theory; bài code phải có implementation tự chứa.
- Nêu rõ mutation, empty/singleton, duplicate/tie, boundary và termination.
- Invariant phải giải thích tính đúng, không chỉ kể lại code.
- Giữ nguyên mọi thay đổi ngoài notebook; không tự commit hoặc publish.

## Kế hoạch còn lại

- Lấp từng đề `Cần viết` trong public catalog, bắt đầu từ P05/P17/P18/P19 và đồng thời viết các chapter nền còn thiếu theo chuẩn learner-first.
- Hoàn thiện PRE/SW, BS, BFS, Heap/Greedy, Backtracking/DP để các đề P02–P48 có nền giải thích từ gốc.
- Completion audit legacy phải có 40/40 bài non-mock `Đã hoàn tất`, không chỉ đủ 83 IDs; curriculum học hiện hành dùng bank source-first ở root repo.
