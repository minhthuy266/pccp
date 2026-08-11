# Context tiếp tục xây PCCP Algorithm Code Notebook

> Cập nhật: 09/08/2026 — Asia/Ho_Chi_Minh  
> Đây là file handoff có tính chỉ dẫn. Phiên sau phải đọc **toàn bộ file này** trước khi lập kế hoạch hoặc sửa notebook.

> Standard canonical khóa ngày 11/08/2026: đọc [00_CORE_TEMPLATE_VARIANTS_FRAMEWORK.md](00_CORE_TEMPLATE_VARIANTS_FRAMEWORK.md) và [FRAMEWORK_COVERAGE_AUDIT.md](FRAMEWORK_COVERAGE_AUDIT.md). Framework 11 phần áp dụng ở cấp pattern; không copy vào mọi lời giải. `SQ-02` là golden example và phải qua QA Chapter 08 trước khi batch-refactor chapter khác.

## 1. Mục tiêu của người học

Hoàn thiện `PCCP_Algorithm_Code_Notebook` thành bộ tài liệu tự học và luyện thi PCCP bằng JavaScript, đủ để:

- học từ nền tảng đến bài kết hợp;
- nhận diện pattern từ đề mới;
- nói được state, invariant và transition;
- tự code từ trang trắng thay vì học thuộc lời giải;
- luyện bằng bài Programmers công khai và đề PCCP đã công khai;
- có lời giải chi tiết để tự kiểm sau khi đã thử làm;
- quay lại sau nhiều ngày vẫn hiểu code nhờ comment từng bước.

Người học thích cách giải thích bằng tiếng Việt, trực tiếp, dễ đọc và có ví dụ cụ thể. Không giả định người học đã biết thuật ngữ nâng cao; khi dùng thuật ngữ phải giải thích bằng mental model hoặc state cụ thể.

### Mục tiêu coverage đề thật (cập nhật 10/08/2026)

Người học đã làm rõ rằng mục tiêu là **thành thạo mọi đề PCCP công khai được theo dõi**, không phải hoàn tất một danh sách pattern. [PCCP_PUBLIC_PROBLEM_CATALOG.md](PCCP_PUBLIC_PROBLEM_CATALOG.md) là nguồn sự thật cho 40 đề công khai trong `PROBLEM_BANK.csv`; mọi đề phải lần lượt có lesson từ gốc, solution JavaScript, recall/biến thể và trạng thái xác thực. Không gọi notebook “hoàn chỉnh” khi catalog vẫn còn `Cần viết` hoặc `Có tham chiếu`.

Chuẩn mastery nằm tại [00_MASTERY_STANDARD.md](00_MASTERY_STANDARD.md). [PCCP_EXAM_PATTERN_ATLAS.md](PCCP_EXAM_PATTERN_ATLAS.md) là entrypoint học chính: phải giải thích từ gốc các pattern rút ra từ đề thật trước khi catalog/coverage được dùng để audit. Tài liệu/coverage pattern chỉ là công cụ để giải đề thật, không phải đích.

## 2. Yêu cầu quan trọng nhất: concept-first

Từ chương Map/Set trở đi, không được chỉ thu thập đề và viết lời giải. Mỗi thuật toán/chương phải có ba tầng:

```text
Tầng 1 — Bài thật:
đề tự chứa → contract → constraints → ví dụ → full solution có comment

Tầng 2 — Tổng hợp:
gom nhiều bài thành một số ít concept/bộ xương tái sử dụng

Tầng 3 — Transfer:
decision tree → state → invariant → transition → bẫy → bài đại diện
```

Mục tiêu cuối không phải “có nhiều lời giải”, mà là trả lời được:

```text
Các bài này giống nhau ở state nào?
Condition nào thay đổi?
Transition nào tái sử dụng?
Thuật toán nào điều khiển thứ tự duyệt?
Cấu trúc dữ liệu nào chỉ giữ state phụ?
```

### Chuẩn trình bày learner-first (cập nhật 10/08/2026)

Phản hồi trực tiếp của người học: bản cũ có cấu trúc đầy đủ nhưng nội dung lủng củng, giống đặc tả cho người đã biết thuật toán. Không được dồn các mục dưới đây thành checklist 14–16 bước trong mỗi bài mẫu.

Thứ tự trình bày bắt buộc là:

```text
1. Một bài toán nhỏ, input/output cụ thể
2. Chạy bằng lời để người học tự thấy thông tin cần nhớ
3. Đặt tên biến và giải thích vì sao khởi tạo như vậy
4. Full code ngắn, comment ở đúng chỗ quyết định
5. Dry run chỉ giữ các cột thật sự giúp nhìn state đổi
6. Sau khi đã hiểu ví dụ mới gọi tên state/invariant/transition
7. Dấu hiệu nhận diện và code skeleton
8. Lỗi hay gặp gắn với test làm lộ lỗi
9. Một bài tự kiểm tra hoặc transfer có gợi ý đóng/mở
```

Vẫn phải bao phủ contract, state, invariant, thứ tự check/update, complexity, edge case và transfer, nhưng đặt chúng tại nơi giúp giải thích bài. Không đưa thuật ngữ trước trực giác; không dùng quota hình thức thay cho mạch giải thích. Chương 01 learner-first là chuẩn gần nhất để tham khảo.

## 3. Thành quả Map/Set làm chuẩn tham chiếu

Chương Map/Set hiện là mẫu cho các chương tiếp theo.

### File nhập môn

- [03_Map_Set.md](03_Map_Set.md): index và bản đồ chọn cấu trúc.
- [00_Beginner_Guide.md](chapters/03_map_set/00_Beginner_Guide.md): giải thích từ trực giác, cú pháp và ví dụ đơn giản.

### Theory và practice nền

- [01_Core.md](chapters/03_map_set/01_Core.md): `MAP-01..06`.
- [02_Combinations.md](chapters/03_map_set/02_Combinations.md): `MAP-07..14`.
- [03_Practice_Ladder.md](chapters/03_map_set/03_Practice_Ladder.md).
- [03_Map_Set_Solutions.md](solutions/03_Map_Set_Solutions.md).

### Bài Programmers/PCCP và concept tổng hợp

- [04_Programmers_PCCP_Set.md](chapters/03_map_set/04_Programmers_PCCP_Set.md): 29 đề tự chứa, mỗi đề có nguồn chính thức.
- [03_Map_Set_Programmers_Solutions.md](solutions/03_Map_Set_Programmers_Solutions.md): 29 full solutions có comment.
- [05_Programmers_Kit_Audit.md](chapters/03_map_set/05_Programmers_Kit_Audit.md): audit đủ 47 bài trong 10 Algorithm Practice Kit.
- [06_Programmers_Derived_Concepts.md](chapters/03_map_set/06_Programmers_Derived_Concepts.md): nén 29 bài thành 10 concept dùng lại.

### Mười concept Map/Set đã rút ra

1. Membership và uniqueness.
2. Frequency và multiset.
3. Lookup theo key.
4. Đồng bộ index/state hai chiều.
5. Group rồi aggregate/rank.
6. Quan hệ `Map<key, Set>`.
7. Event state theo thực thể.
8. Frequency trong cửa sổ.
9. Canonical signature.
10. Map/Set làm state phụ cho DP, graph và simulation.

Các chương tiếp theo phải tạo được tài liệu tổng hợp có chất lượng tương đương `06_Programmers_Derived_Concepts.md`.

## 4. Trạng thái toàn notebook

Theo handoff trước:

- Chương 01–06 đã hoàn thiện v1.
- Chương 08 Stack/Queue đã hoàn tất concept-first: beginner guide, 22 bài thật, 22 solutions, audit 47 bài Kit, 10 derived concepts và QA mở rộng.
- Chương 07 Prefix Sum/Sliding Window còn cần hoàn thiện theo workflow mới.
- Các chương Binary Search, BFS/DFS, Heap/Greedy, Backtracking/DP và Mixed Tests cần được audit lại mức concept-first, kể cả khi đã có file khung hoặc nội dung cũ.

Không mặc định “có file” đồng nghĩa “đã hoàn thiện”. Một chương chỉ hoàn thiện khi đủ:

```text
theory
practice ladder
solutions
real public problems
derived concepts
recall/transfer
syntax + behavioral QA
```

## 5. Thứ tự làm tiếp đề nghị

### Ưu tiên 1 — Chương 07 Prefix Sum và Sliding Window

Coverage cần hoàn thiện:

- `PRE-01..05`: prefix sum 1D, range query, prefix frequency, difference array, prefix + Map.
- `SW-01..06`: fixed window, variable window, frequency state, distinct count, deque preview, add/remove invariant.

Concept tối thiểu cần rút ra:

```text
Prefix as accumulated history
Range query by subtraction
Prefix frequency/complement lookup
Difference array as boundary events
Fixed window rolling state
Variable window validity invariant
Window frequency and zero-count deletion
Contrast: prefix vs sliding window vs two pointers
```

Sliding Window phải cross-link với Map/Set Concept 8, nhưng không copy nguyên nội dung. Cần giải thích:

```text
Algorithm owner = window điều khiển left/right
State helper = Map giữ multiplicity/distinct trong window
```

### Ưu tiên 2 — Chương 09 Binary Search

Phải rút ra ít nhất:

- tìm exact/lower bound/upper bound;
- binary search trên đáp án;
- monotonic predicate;
- invariant của `lo/hi` theo closed và half-open interval;
- infeasible/feasible boundary;
- overflow và termination.

### Ưu tiên 3 — Chương 10 BFS/DFS

Phải phân biệt:

- traversal vs search path;
- BFS shortest unweighted;
- DFS component/backtracking;
- visited lúc enqueue hay dequeue;
- graph adjacency vs implicit grid;
- multi-source BFS;
- state `(position, extraState)`;
- Map/Set chỉ là visited/adjacency helper khi graph mới là algorithm owner.

### Ưu tiên 4 — Heap/Greedy và Backtracking/DP

Không gom Heap với Greedy thành một concept mơ hồ. Phải tách:

- Heap: top-k, streaming best, scheduling, two heaps/lazy deletion.
- Greedy: exchange argument, sort key, interval choice, counterexample.
- Backtracking: choose/explore/unchoose, pruning, duplicate state.
- DP: state meaning, recurrence, base case, order, Set-valued DP.

### Ưu tiên 5 — Mixed Tests

Mixed test phải yêu cầu chọn pattern, không ghi sẵn tên chương. Sau mỗi test cần phân tích:

```text
signal → chosen owner algorithm → helper state → invariant → complexity
```

## 6. Workflow bắt buộc cho mỗi chương tiếp theo

### Bước A — Audit nội dung hiện tại

1. Đọc index chương, theory, practice, solutions và QA hiện có.
2. Không xóa nội dung cũ.
3. Ghi phần đã đủ, phần thiếu và phần trùng.
4. Kiểm tra Coverage ID trong `PATTERN_COVERAGE_MATRIX.md`.

### Bước B — Audit nguồn bài thật

1. Lấy toàn bộ bài trong Practice Kit chính thức tương ứng.
2. Rà các Kit khác để tìm bài cross-pattern.
3. Rà đề PCCP public trong `PROBLEM_BANK.csv`.
4. Bổ sung bài Programmers công khai ngoài Kit nếu pattern thực sự quan trọng cho PCCP.
5. Phân loại mỗi bài:
   - `core`: thuật toán/cấu trúc là state quyết định;
   - `auxiliary`: chỉ là helper như visited;
   - `none`: không nên đưa vào chương.

Không gọi một bài là Hash chỉ vì code có `new Set()`. Luôn xác định **algorithm owner** và **state helper**.

### Bước C — Viết bộ đề

Mỗi đề công khai phải có:

- ID nội bộ ổn định;
- tên tiếng Việt;
- level/nguồn;
- link Programmers chính thức;
- bản diễn giải tiếng Việt tự chứa, không chép nguyên văn;
- contract;
- constraints quan trọng;
- ví dụ riêng;
- pattern và lý do chọn.

Không sao chép mock/lesson trả phí hoặc nội dung leak. Có thể ghi metadata công khai và giới hạn phạm vi.

### Bước D — Viết full solution

Mỗi solution JavaScript phải có:

- tên function có ý nghĩa, không dùng hàng loạt `solution` trong cùng file;
- comment `Bước 1`, `Bước 2`... tại các transition quan trọng;
- ý nghĩa state trước code;
- invariant;
- complexity;
- bẫy;
- revealing edge cases;
- không sửa input nếu contract không yêu cầu.

### Bước E — Rút concept

Sau khi có bài và lời giải:

1. Không tổng hợp theo tên bài.
2. Nhóm theo state/invariant/transition giống nhau.
3. Tạo decision tree chọn pattern.
4. Tạo bảng `bài → concept chính → concept phụ`.
5. Chọn khoảng 8–12 bài đại diện cho recall.
6. Chỉ ra bài kết hợp và algorithm owner.

### Bước F — QA

Chỉ đánh dấu hoàn thiện khi:

- mọi JavaScript fence parse được;
- có behavioral assertions cho code quan trọng;
- link Markdown nội bộ resolve;
- số problem ID = số source = số contract = số solution;
- `git diff --check` sạch;
- `npm test` pass;
- không có ID lời giải thiếu hoặc dư so với đề;
- audit report ghi rõ phạm vi và giới hạn.

## 7. Quy chuẩn viết dễ hiểu

Ưu tiên câu hỏi cụ thể:

```text
Biến này đang nhớ cái gì?
Nó đúng cho prefix, suffix, window hay toàn input?
Tại sao check diễn ra trước update?
Khi count về 0, key còn mang ý nghĩa không?
Nếu bỏ dòng này thì test nhỏ nào sai?
```

Không chỉ viết:

```text
“Dùng Map để tối ưu.”
```

Phải viết:

```text
“Map lưu value → index gần nhất trong prefix đã xử lý.
Trước current, lookup complement để không dùng current hai lần.
Sau check mới set current → index.”
```

### Comment code tốt

```js
// Bước 1: Thêm phần tử bên phải để windowCount mô tả [left..right].
changeCount(values[right], 1);

// Bước 2: Khi window hợp lệ, co left hết mức nhưng vẫn giữ invariant.
while (isValid()) {
  updateAnswer(left, right);
  changeCount(values[left], -1);
  left++;
}
```

### Comment code không đủ

```js
// Tăng right.
right++;
```

Comment phải giải thích **tại sao/ý nghĩa state**, không kể lại cú pháp.

## 8. Quy chuẩn nguồn và bản quyền

Được phép:

- crawl/read trang Programmers công khai;
- lấy ID, tên, level, link, constraints và metadata công khai;
- viết lại đề bằng tiếng Việt;
- tự viết và kiểm thử lời giải;
- audit curriculum/lesson title công khai.

Không được:

- vượt đăng nhập/paywall;
- dùng cookie/token của người học;
- tìm hoặc tái phân phối bản leak;
- chép nguyên văn đề/lesson/mock trả phí;
- tuyên bố exhaustive toàn catalog nếu chưa audit được catalog.

Ngôn ngữ chính xác khi báo cáo:

```text
“Đủ 5/5 bài Hash Kit chính thức” — được, vì đã audit part 12077.
“Đủ 47/47 bài trong 10 Practice Kit” — được, vì đã audit từng ID.
“Đủ mọi bài trên Programmers” — không được nếu All Challenges chưa audit exhaustive.
```

## 9. Các nguồn và dữ liệu địa phương quan trọng

- `PROBLEM_BANK.csv`: problem bank PCCP public và bài luyện ưu tiên.
- `PATTERN_COVERAGE_MATRIX.md`: Coverage ID và trạng thái.
- `MASTERY_TRACKER.md`: mức thành thạo từng ID.
- `TEMPLATE_CONTRASTS.md`: so sánh các skeleton dễ nhầm.
- `HANDOFF.md`: lịch sử handoff cũ; file hiện tại là context mới hơn.
- `package.json`: lệnh test repo.

Nguồn web chính:

- Algorithm Practice Kit: `https://school.programmers.co.kr/learn/challenges?tab=algorithm_practice_kit`
- Lesson: `https://school.programmers.co.kr/learn/courses/30/lessons/{id}?language=javascript`
- Part: `https://school.programmers.co.kr/learn/courses/30/parts/{id}`
- Khóa luyện PCCP metadata: `https://school.programmers.co.kr/learn/courses/14760`

## 10. Lệnh QA thường dùng

### Kiểm tra JavaScript file

```bash
node --check path/to/file.js
```

### Chạy test repo

```bash
npm test
```

### Kiểm tra whitespace/diff

```bash
git diff --check
git status --short
```

### Đếm problem/source/contract/solution

```bash
rg -c '^### ' path/to/problems.md
rg -c '^Nguồn:' path/to/problems.md
rg -c '^\*\*Contract:' path/to/problems.md
rg -c '^```js$' path/to/solutions.md
```

### Kiểm tra JavaScript fence trong Markdown

Dùng Node `vm.Script` để parse độc lập từng JavaScript fence trong Markdown. Không nối các code block nếu chúng đều khai báo `solution`, vì việc nối có thể tạo duplicate declaration giả.

## 11. Trạng thái working tree cần tôn trọng

Tại thời điểm tạo context, working tree có thay đổi chưa commit của người học:

- `BASIC.js` đã được tách thành `basic-drafts/`.
- Chương Map/Set có các file mới chưa commit.
- Không reset, checkout hoặc xóa các thay đổi này.
- Không tự commit/push nếu người học chưa yêu cầu.

Luôn chạy `git status --short` trước khi sửa và tránh đụng nội dung ngoài scope.

## 12. Definition of Done cho một chương

Một chương chỉ được gọi là hoàn thiện khi trả lời “có” cho tất cả:

- [ ] Có beginner entry dễ đọc.
- [ ] Có taxonomy concept rõ ràng.
- [ ] Mỗi concept có state/invariant/transition.
- [ ] Có practice từ nhận diện đến tự code và transfer.
- [ ] Có full solution tách khỏi đề.
- [ ] Có bộ bài Programmers/PCCP công khai phù hợp.
- [ ] Có audit core/auxiliary/none.
- [ ] Có tài liệu derived concepts từ bài thật.
- [ ] Có bảng bài → concept.
- [ ] Có recall set 8–12 bài đại diện.
- [ ] Code parse và behavioral tests pass.
- [ ] Link, ID và số lượng khớp.
- [ ] QA ghi rõ phạm vi và giới hạn.

## 13. Prompt ngắn cho phiên sau

Người học chỉ cần nói:

```text
Tiếp tục hoàn thiện PCCP notebook theo context.
```

Agent phải:

1. Đọc `CONTINUATION_CONTEXT.md` toàn bộ.
2. Đọc `HANDOFF.md` và chapter đang làm.
3. Chạy `git status --short`.
4. Báo ngắn chương sẽ tiếp tục và phần thiếu.
5. Làm theo workflow concept-first.
6. QA trước khi bàn giao.

Nếu người học chỉ nói “làm thuật toán tiếp theo”, mặc định bắt đầu từ **Chương 07 Prefix Sum/Sliding Window**, trừ khi trạng thái repo lúc đó cho thấy chương này đã hoàn tất theo Definition of Done.
