# Template Contrasts — Chọn đúng bộ xương gần nhau

Coverage ID tham chiếu [PATTERN_COVERAGE_MATRIX.md](PATTERN_COVERAGE_MATRIX.md). Bảng này là lớp nhận diện; khi chương tương ứng được hoàn thiện, contrast chi tiết sẽ nằm ngay sau cụm dạng. Phần cố định/biến đổi trong code dùng quy ước `TEMPLATE`/`VARIANT` của [framework canonical](00_CORE_TEMPLATE_VARIANTS_FRAMEWORK.md).

## Monotonic stack: bên phải resolve top và bên trái đọc top

Canonical golden example: [`SQ-02`](chapters/08_stack_queue/01_Stack_Monotonic.md#sq-02--monotonic-stack-các-index-chưa-được-giải-quyết).

| Dạng | State giống nhau | Transition quyết định | Answer được ghi khi nào | Dấu hiệu chọn |
| --- | --- | --- | --- | --- |
| First greater/smaller **right** | stack index chưa được giải quyết | current thỏa relation → pop nhiều top | ghi cho index vừa pop | “đầu tiên bên phải”, “bao lâu tới khi” |
| Previous greater/smaller **left** | stack ứng viên của prefix | pop top không thể trả lời current | sau while, đọc top cho current | “gần nhất bên trái” |
| Tạo số lớn | output stack + budget | current tốt hơn → pop top khi còn budget | không có answer array; stack là output | xóa k phần tử, giữ order |
| Histogram *(preview)* | stack index height tăng | current thấp hơn → pop chốt biên phải | lúc pop, dùng top mới làm biên trái | diện tích rectangle theo cột |

Phản ví dụ `[3,1,2]`: previous greater của `2` là `3`; nếu dùng right-resolve và ghi answer cho item pop, ta đang trả một contract khác.

## Set membership và Map frequency

| Dạng | State khác nhau ở đâu? | Condition khác nhau ở đâu? | Transition khác nhau ở đâu? | Dấu hiệu chọn dạng |
| ---- | ---------------------- | -------------------------- | --------------------------- | ------------------ |
| `MAP-01` Seen Set | chỉ biết key có/không | `seen.has(key)` | `add(key)` không đổi khi lặp | đã gặp, tồn tại, duplicate |
| `MAP-03` Frequency | key→số lần | thường đọc `oldCount` | `set(key, old+1)` | bao nhiêu, multiplicity, tỷ lệ |

Phản ví dụ: `['a','a']` và `['a']` có Set giống nhau nhưng frequency khác nhau.

## First index và latest index

| Dạng | State khác nhau ở đâu? | Condition khác nhau ở đâu? | Transition khác nhau ở đâu? | Dấu hiệu chọn dạng |
| ---- | ---------------------- | -------------------------- | --------------------------- | ------------------ |
| `MAP-04` First | index nhỏ nhất | chỉ ghi khi absent | conditional set | đầu tiên, sớm nhất |
| `MAP-05` Latest | index lớn nhất trong prefix | đọc old trước current | unconditional overwrite | gần nhất, lần trước |

Một dấu `if (!has)` là khác biệt quyết định, không phải chi tiết cú pháp.

## Two Pointers và Sliding Window

| Dạng | State khác nhau ở đâu? | Condition khác nhau ở đâu? | Transition khác nhau ở đâu? | Dấu hiệu chọn dạng |
| ---- | ---------------------- | -------------------------- | --------------------------- | ------------------ |
| `TP-01/04` | hai ứng viên/biên trên dữ liệu có order | so sánh hai value hoặc target | loại một phía theo tính đơn điệu | pair, merge, palindrome, sorted |
| `SW-02/03` | toàn bộ đoạn liên tiếp `[left..right]` | window valid/invalid | right mở rộng; left co và remove state | longest/shortest contiguous segment |

Sliding Window là một họ two-pointer cùng chiều, nhưng cần state của **toàn cửa sổ** và transition add/remove; vì vậy học template riêng.

## Sliding Window và Prefix Sum

| Dạng | State khác nhau ở đâu? | Condition khác nhau ở đâu? | Transition khác nhau ở đâu? | Dấu hiệu chọn dạng |
| ---- | ---------------------- | -------------------------- | --------------------------- | ------------------ |
| `SW-01..05` | state mutable của một window | validity thường cho phép co | add right/remove left | tìm đoạn tối ưu, boundary thay đổi đơn điệu |
| `PRE-01/02` | snapshot tích lũy ở mọi prefix | query dùng hai mốc | build một lần, query bằng subtraction | nhiều range query, không cần co online |

Nếu số âm làm “tăng right thì sum không giảm” sai, sliding window theo sum có thể hỏng; prefix vẫn dùng được để tính range.

## BFS và DFS

| Dạng | State khác nhau ở đâu? | Condition khác nhau ở đâu? | Transition khác nhau ở đâu? | Dấu hiệu chọn dạng |
| ---- | ---------------------- | -------------------------- | --------------------------- | ------------------ |
| `BFS-03` | queue + distance/layer | goal gặp theo layer đầu | FIFO enqueue neighbor | shortest path không trọng số |
| `BFS-05` DFS | call/explicit stack | chỉ cần reach/component/path search | đi sâu rồi quay lại | component, exhaustive traversal |

Cả hai có thể tìm reachability; chỉ BFS có bảo đảm khoảng cách cạnh nhỏ nhất từ thứ tự FIFO.

## Greedy và Dynamic Programming

| Dạng | State khác nhau ở đâu? | Condition khác nhau ở đâu? | Transition khác nhau ở đâu? | Dấu hiệu chọn dạng |
| ---- | ---------------------- | -------------------------- | --------------------------- | ------------------ |
| `HG-04/05` | đáp án đã commit + frontier | local choice phải có exchange/invariant proof | chọn một lần, không quay lại | lựa chọn cục bộ an toàn |
| `BTD-06/07` | đáp án của bài toán con | xét mọi predecessor hợp lệ | min/max/count từ nhiều state | subproblem lặp; local choice chưa chắc đúng |

Không có proof greedy thì “chọn lớn nhất/nhỏ nhất” chỉ là phỏng đoán.

## Binary search giá trị và binary search đáp án

| Dạng | State khác nhau ở đâu? | Condition khác nhau ở đâu? | Transition khác nhau ở đâu? | Dấu hiệu chọn dạng |
| ---- | ---------------------- | -------------------------- | --------------------------- | ------------------ |
| `BS-01` Exact | khoảng index của sorted data | compare `array[mid]` với target | bỏ nửa theo value | target nằm trong array |
| `BS-04` Answer | khoảng **giá trị đáp án** | predicate feasible(mid) đơn điệu | giữ phía còn chứa min/max feasible | “nhỏ nhất/lớn nhất có thể” |

Trong `BS-04`, array đầu vào không nhất thiết sorted; thứ cần sorted logic là truth values của predicate trên answer space.

## Backtracking và brute force vòng lặp

| Dạng | State khác nhau ở đâu? | Condition khác nhau ở đâu? | Transition khác nhau ở đâu? | Dấu hiệu chọn dạng |
| ---- | ---------------------- | -------------------------- | --------------------------- | ------------------ |
| Loop brute force | số tầng cố định, ít | nested loop bounds | tăng loop variables | thử cặp/bộ ba cố định |
| `BTD-01..03` | path/index/used thay đổi theo depth | base case + pruning | choose→explore→undo | số quyết định phụ thuộc input, cần sinh cây |

Backtracking vẫn là brute force có cấu trúc; template riêng cần thiết vì shared state phải được hoàn tác.
