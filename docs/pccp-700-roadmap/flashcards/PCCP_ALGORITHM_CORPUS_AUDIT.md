# PCCP Algorithm Corpus Audit — nguồn cho skeleton deck

> Checkpoint Batch 0 + Batch 1, cập nhật 01/09/2026: corpus/taxonomy và 28 thẻ foundation–simulation.
>
> Phạm vi chính xác: bao phủ các họ được chứng minh bởi corpus PCCP công khai đã kiểm chứng bên dưới, rồi bổ sung kỹ thuật nền tảng và biến thể chuyển giao phù hợp syllabus. Không tuyên bố bao phủ mọi đề PCCP tương lai.

## 1. Hướng dẫn sử dụng

- `OBSERVED`: bài hoặc kỹ thuật xuất hiện trực tiếp trong 16 câu PCCP/mock chính thức công khai đã kiểm chứng.
- `CORE`: kỹ thuật nền cần để giải/biến đổi các bài đã quan sát hoặc được syllabus chính thức nêu rõ.
- `TRANSFER`: biến thể gần, có giá trị xử lý đề mới nhưng chưa thấy trực tiếp trong corpus 16 câu.
- `LOW PRIORITY`: ít bằng chứng trực tiếp hoặc chi phí học cao so với mục tiêu 700+ trước 12/09/2026.
- `P0`: phải tự viết không nhìn; `P1`: phải nhận ra và sửa skeleton; `P2`: biết tồn tại để tra; `P3`: hoãn nếu thiếu thời gian.

Batch 0 tạo evidence base; Batch 1 đã thêm 28 thẻ import trực tiếp vào Anki/Quizlet. Các batch sau tiếp tục nối vào cùng TSV.

## 2. Corpus coverage

### 2.1 Quy tắc corpus

- Chỉ gọi một bài là `OBSERVED` khi URL chính thức của Programmers School trả HTTP 200 và tiêu đề/course xác nhận là PCCP mock hoặc `[PCCP 기출문제]`.
- Hai mock công khai có course và số câu rõ ràng: course `15008` và `15009`.
- Hai nhóm lesson `250134–250137` và `340210–340213` đều mang nhãn `[PCCP 기출문제]` và có số câu 1–4. Số thứ tự kỳ của từng nhóm không hiện nhất quán trên trang bài, nên trường bộ đề được ghi `UNVERIFIED` thay vì suy từ blog.
- Course `19344` hiện chỉ liệt kê ba lesson trong outline công khai; vì vậy không dùng course này để tuyên bố corpus past-paper là đầy đủ tuyệt đối.

### 2.2 Inventory 16 bài chính thức công khai

| ID | Tên tiếng Việt · tên gốc | Nguồn/bộ | Câu | Giới hạn quyết định | Họ chính | Kỹ thuật phụ | Representation/state quan trọng | Bẫy contract | Mức | URL chính thức | Lý do phân loại |
|---|---|---|---:|---|---|---|---|---|---|---|---|
| M1Q1 | Chữ cái cô lập · 외톨이 알파벳 | PCCP 모의고사 #1 | 1 | `|s| ≤ 2,600` | F02 scan run/chunk | F04 Set; F05 sort output | ký tự hiện tại, ký tự đã đóng block, tập lỗi | đếm block, không phải tổng frequency; không có thì `N` | OBSERVED | [121683](https://school.programmers.co.kr/learn/courses/15008/lessons/121683?language=javascript) | Một ký tự thành đáp án khi tái xuất hiện sau khi block của nó đã đóng. |
| M1Q2 | Đại hội thể thao · 체육대회 | PCCP 모의고사 #1 | 2 | học sinh `≤10`; môn `≤` học sinh | F11 backtracking assignment | pruning/bound | `sport`, `usedStudent`, `sum`, `best` | một học sinh tối đa một môn; phải restore | OBSERVED | [121684](https://school.programmers.co.kr/learn/courses/15008/lessons/121684?language=javascript) | Mỗi cột chọn đúng một hàng chưa dùng để tối đa tổng. |
| M1Q3 | Quy luật di truyền · 유전법칙 | PCCP 모의고사 #1 | 3 | query `≤5`; `n≤16`; `p≤4^(n-1)` | F21 mathematical recursion/indexing | F22 base-4 path | `(generation, position)` hoặc các chữ số đường đi | `p` là 1-based; node thuần làm toàn bộ hậu duệ cố định | OBSERVED | [121685](https://school.programmers.co.kr/learn/courses/15008/lessons/121685?language=javascript) | Không sinh cây; truy ngược vị trí qua các nhóm bốn. |
| M1Q4 | Hệ điều hành · 운영체제 | PCCP 모의고사 #1 | 4 | chương trình `≤100,000` | F15 event + heap scheduling | F05 comparator; F07 timeline | `time`, con trỏ arrival, heap job sẵn sàng, tổng wait theo priority | không preempt; nạp đủ arrival `≤time`; idle phải nhảy thời gian | OBSERVED | [121686](https://school.programmers.co.kr/learn/courses/15008/lessons/121686?language=javascript) | Arrival list và priority queue phối hợp chọn job kế tiếp. |
| M2Q1 | Robot thực hành · 실습용 로봇 | PCCP 모의고사 #2 | 1 | lệnh `≤1,000,000` | F06 state-machine simulation | F03 coordinate | `(x,y,dir)`, vector bốn hướng | đảo trục; quay trái từ 0; tiến/lùi khác dấu | OBSERVED | [121687](https://school.programmers.co.kr/learn/courses/15009/lessons/121687?language=javascript) | Mỗi token là transition xác định trên state nhỏ. |
| M2Q2 | Đào tạo nhân viên mới · 신입사원 교육 | PCCP 모의고사 #2 | 2 | `ability≤1,000,000`; lần ghép `≤10,000` | F15 repeated heap transform | greedy exchange argument | min-heap các năng lực, tổng hiện tại | lấy đúng hai min; đưa tổng trở lại hai lần | OBSERVED | [121688](https://school.programmers.co.kr/learn/courses/15009/lessons/121688?language=javascript) | Mỗi vòng extract hai min, transform, reinsert để giữ tổng nhỏ nhất. |
| M2Q3 | Mở rộng quán cà phê · 카페 확장 | PCCP 모의고사 #2 | 3 | menu `≤100`; order `≤10,000` | F07 queue/timeline simulation | interval endpoint order | arrival `i*k`, `finish=max(arrival,freeAt)+service`, active count | cùng lúc rời/đến: rời trước; quầy chỉ xử lý tuần tự | OBSERVED | [121689](https://school.programmers.co.kr/learn/courses/15009/lessons/121689?language=javascript) | Bài đếm số khách đồng thời từ chuỗi arrival và finish. |
| M2Q4 | Bản đồ kho báu · 보물 지도 | PCCP 모의고사 #2 | 4 | `n,m≤1,000`; `n*m≥3` | F12 expanded-state BFS | F03 grid | `(x,y,shoeUsed)`, distance/visited ba chiều | cùng ô với hai trạng thái không tương đương; jump dài 2 cost 1 | OBSERVED | [121690](https://school.programmers.co.kr/learn/courses/15009/lessons/121690?language=javascript) | Đường đi không trọng số nhưng state phải chứa quyền đặc biệt. |
| A-Q1 | Băng bó · 붕대 감기 | PCCP past group 250xxx (`UNVERIFIED` ordinal) | 1 | attack `≤100`; time `≤1,000` | F07 event simulation | F06 state machine | `health`, streak, previous attack time | giây bị đánh không hồi; streak reset; cap max health; chết ngay | OBSERVED | [250137](https://school.programmers.co.kr/learn/courses/30/lessons/250137?language=javascript) | State tiến theo event/gap và contract hồi máu–tấn công. |
| A-Q2 | Khai thác dầu · 석유 시추 | PCCP past group 250xxx (`UNVERIFIED` ordinal) | 2 | grid `≤500×500` | F13 grid components/contribution | F04 per-column dedupe | component id/size; tập cột component chạm tới | một component chỉ cộng một lần cho mỗi cột; tránh DFS recursive sâu | OBSERVED | [250136](https://school.programmers.co.kr/learn/courses/30/lessons/250136?language=javascript) | Duyệt mỗi component một lần rồi phân phối size vào các cột. |
| A-Q3 | Đồng hồ analog · 아날로그 시계 | PCCP past group 250xxx (`UNVERIFIED` ordinal) | 3 | thời gian trong một ngày; start `<` end | F21 math/time events | F06 bounded simulation | giây tuyệt đối; góc hoặc hàm đếm tới thời điểm | endpoint inclusive; ba kim trùng chỉ tính một; wrap 12/24h | OBSERVED | [250135](https://school.programmers.co.kr/learn/courses/30/lessons/250135?language=javascript) | Đếm các thời điểm giao nhau của chuyển động tuần hoàn. |
| A-Q4 | Di chuyển xe kéo · 수레 움직이기 | PCCP past group 250xxx (`UNVERIFIED` ordinal) | 4 | grid `≤4×4` | F11 multi-agent backtracking | F03 grid; pruning | hai vị trí, hai visited riêng, turn/best | không chung ô, không đổi chỗ; xe tới đích đứng yên; restore riêng | OBSERVED | [250134](https://school.programmers.co.kr/learn/courses/30/lessons/250134?language=javascript) | Bound nhỏ cho phép duyệt cây chuyển động đồng thời có ràng buộc. |
| B-Q1 | Trình phát video · 동영상 재생기 | PCCP past group 340xxx (`UNVERIFIED` ordinal) | 1 | command `≤100`; thời gian `mm:ss` | F01 contract-first parsing | F06 simulation; F20 interval | mọi thời gian đổi sang giây; `pos` | opening là đoạn đóng; phải skip trước lệnh đầu và sau mỗi lệnh | OBSERVED | [340213](https://school.programmers.co.kr/learn/courses/30/lessons/340213?language=javascript) | Chuẩn hóa representation rồi áp transition đúng thứ tự contract. |
| B-Q2 | Thử thách game xếp hình · 퍼즐 게임 챌린지 | PCCP past group 340xxx (`UNVERIFIED` ordinal) | 2 | `n≤300,000`; `limit≤10^15` | F14 binary search on answer | monotonic predicate; numeric safety | skill candidate; total time capped at limit | trả first feasible; overflow/intermediate; công thức dùng puzzle trước | OBSERVED | [340212](https://school.programmers.co.kr/learn/courses/30/lessons/340212?language=javascript) | Predicate “skill này hoàn tất trong limit” đơn điệu false→true. |
| B-Q3 | Tìm nguy cơ va chạm · 충돌위험 찾기 | PCCP past group 340xxx (`UNVERIFIED` ordinal) | 3 | point/robot/route length đều `≤100` | F07 time-batch simulation | F04 frequency Map; F03 coordinate | path theo time hoặc state robot; Map tọa độ→count mỗi tick | đi trục `r` trước `c`; ≥2 robot tại một ô chỉ là một risk; robot rời ngay | OBSERVED | [340211](https://school.programmers.co.kr/learn/courses/30/lessons/340211?language=javascript) | Cần group vị trí theo cùng timestamp rồi đếm ô xung đột. |
| B-Q4 | Khôi phục biểu thức · 수식 복원하기 | PCCP past group 340xxx (`UNVERIFIED` ordinal) | 4 | `2≤expressions≤100`; base `2..9` | F22 base conversion/candidate filtering | F01 parsing; F11 bounded brute force | tập base hợp lệ; parsed `(A,op,B,C)` | base phải lớn hơn mọi digit; mọi base hợp lệ phải cho cùng output, nếu không `?` | OBSERVED | [340210](https://school.programmers.co.kr/learn/courses/30/lessons/340210?language=javascript) | Candidate space 2–9 nhỏ; lọc bằng biểu thức biết kết quả rồi tổng hợp đáp án. |

Kết quả link check ngày 01/09/2026: **16/16 URL lesson và 6/6 URL course/syllabus trả HTTP 200**. Duplicate check theo lesson ID và URL: **0 trùng**.

## 3. Taxonomy

Taxonomy hợp nhất có **24 họ**. “Frequency/counting/multiset Map” nằm trong F04; “arrival list/priority queue/waiting room” nằm trong F15 khi cần chọn priority và trong F07 khi chỉ cần tiến timeline/FIFO. Không tạo pattern mới chỉ vì đổi tên application.

| ID | Họ hợp nhất | Bao gồm | Evidence | Priority |
|---|---|---|---|---|
| F01 | Contract-first parsing & normalization | token, delimiter, parse time once, interval contract | OBSERVED | P0 |
| F02 | Linear scan, string, chunk & run | array traversal, token/chunk/run, final flush | OBSERVED | P0 |
| F03 | Matrix/grid & coordinate representation | row/col traversal, direction vector, encode coordinate/state | OBSERVED | P0 |
| F04 | Map/Set counting, grouping & lookup | frequency/counting/multiset Map, dedupe, inverse index | OBSERVED | P0 |
| F05 | Sorting & comparator contract | numeric sort, multi-key tie-break, normalize order | OBSERVED | P0 |
| F06 | Atomic simulation & state machine | state, transition, validate-then-commit, command loop | OBSERVED | P0 |
| F07 | Timeline/event/queue simulation | events, arrival/finish, FIFO, same-time ordering | OBSERVED | P0 |
| F08 | Stack & monotonic stack | matching, reduction, unresolved indices | CORE (official syllabus/repo), not in corpus 16 | P1 |
| F09 | Queue/deque mechanics | array+head, layer queue, deque only when both ends required | CORE | P0 |
| F10 | Two pointers, sliding window & prefix sums | inward pointers; fixed/variable window; frequency window; 1D/2D prefix | CORE/TRANSFER | P1 |
| F11 | Brute force, DFS choice tree & backtracking | cộng/trừ, chọn/bỏ, combination, permutation, visited/restore, pruning | OBSERVED | P0 |
| F12 | Unweighted BFS & expanded state | graph/grid, shortest path, multi-source, `(node,resource)` | OBSERVED | P0 |
| F13 | DFS/BFS components & tree traversal | component size/shape, iterative DFS, basic tree walk | OBSERVED | P0 |
| F14 | Binary search on answer | first/last feasible, monotonic predicate | OBSERVED | P0 |
| F15 | Heap selection, Top K & scheduling | min/max heap, object comparator, repeated transform, event+heap, resources | OBSERVED | P0 |
| F16 | Greedy with proof | sort+greedy, interval greedy, Top K, reconsider past choice | CORE/TRANSFER | P1 |
| F17 | Dynamic programming & memoization | 1D/2D DP, local state, memoization | CORE (official syllabus) | P1 |
| F18 | Weighted shortest path | Dijkstra, stale-entry/lazy skip | TRANSFER (official syllabus graph; repo lesson) | P2 |
| F19 | Connectivity structures | Union-Find, MST/Kruskal | TRANSFER | P2 |
| F20 | Interval/event representation | closed/half-open interval, endpoint order, difference event | OBSERVED as representation; TRANSFER as standalone | P1 |
| F21 | Mathematical recursion & periodic events | parent-chain/index recursion, cyclic time, exact boundary counting | OBSERVED | P1 |
| F22 | Base conversion & modular normalization | candidate bases, encode/decode, positive modulo | OBSERVED | P1 |
| F23 | State compression | bitmask state, coordinate compression | TRANSFER | P2 |
| F24 | Specialized structures/order | trie, topological sort, advanced tree ordering | LOW PRIORITY | P3 |

### Taxonomy decisions that prevent duplicates

- `frequency Map = counting Map = multiset bằng Map` → F04.
- `event + heap = arrival list + priority queue = priority waiting-room simulation` → F15, dùng F07 như prerequisite timeline.
- `BFS grid = BFS graph trên graph ẩn của các ô`; multi-source/expanded-state là variants → F12.
- `fixed/variable window/window+Map` → variants của F10, không phải ba core rời.
- `DFS cộng-trừ/chọn-bỏ/combination/permutation` → variants của cây quyết định F11.
- `simulation`, `state machine` và `timeline` chỉ tách F06/F07 khi có khác biệt thật: F06 chuyển state theo lệnh; F07 phải quản lý thời gian, arrival/finish và tie.

## 4. Priority map

Priority dựa trên corpus 16 câu, syllabus chính thức, giá trị chuyển giao và tài sản repo; không phải dự đoán xác suất kỳ thi tới.

| Mức | Patterns | Chuẩn trước thi |
|---|---|---|
| P0 | F01–F07, F09, F11–F15 | Tự dựng state/invariant và skeleton không nhìn; sửa được tie/boundary theo contract. |
| P1 | F08, F10, F16, F17, F20–F22 | Nhận dạng nhanh, viết/sửa skeleton đại diện, nêu được bẫy quyết định. |
| P2 | F18, F19, F23 | Biết dấu hiệu và API/skeleton tối thiểu; học sau P0/P1. |
| P3 | F24 | Hoãn trước kỳ thi nếu P0/P1 chưa chắc. |

## 5. Flashcards theo pattern

Mỗi thẻ chỉ hỏi một việc, trả lời trong 10–40 giây. Với thẻ `SKELETON`, phải tự viết trước khi lật.

Import vào app:

- **Anki:** `File → Import` → chọn TSV → separator `Tab` → map cột 1=`Front`, cột 2=`Back`, cột 3=`Tags`.
- TSV cố ý **không có header**, nên import xong không sinh thẻ rác “Front/Back/Tags”.
- Học `P0` trước, tối đa 15 thẻ mới/ngày; thẻ `SKELETON` phải viết lại trước khi xem đáp án.

### Batch 1 — Foundation và simulation (28 thẻ)

#### F01 — Contract-first parsing

**B1-01 · RECOGNITION · P0 · OBSERVED**

- Trước: Đề cho nhiều thời điểm `mm:ss`, sau đó liên tục so sánh, cộng/trừ và chặn biên. Việc đầu tiên nên làm gì?
- Sau: Đổi tất cả thời điểm sang **một số giây** đúng một lần. Tính toán trên số; chỉ format lại khi trả kết quả.

**B1-02 · SKELETON · P0 · OBSERVED**

- Trước: Viết hàm tối thiểu đổi `mm:ss` thành tổng số giây.
- Sau:

```js
function toSeconds(text) {
  const [mm, ss] = text.split(":").map(Number);
  return mm * 60 + ss;
}
```

**B1-03 · INVARIANT · P0 · CORE**

- Trước: Invariant representation sau khi parse input là gì?
- Sau: Mỗi đại lượng chỉ có **một representation canonical**; logic chính không parse lại chuỗi.

**B1-04 · TRAP · P0 · OBSERVED**

- Trước: Điều kiện “đang ở opening nếu `start ≤ pos ≤ end`” phải viết thế nào?
- Sau: `start <= pos && pos <= end`. Đây là đoạn đóng; đổi một dấu thành `<` sẽ sai tại endpoint.

**B1-05 · TRANSFER · P1 · TRANSFER**

- Trước: Skeleton parse `mm:ss` phải đổi gì nếu đề chuyển sang `hh:mm:ss`?
- Sau: Chỉ đổi hàm parse/format thành `hh * 3600 + mm * 60 + ss`; state và transition dùng giây giữ nguyên.

#### F02 — String, chunk và run

**B1-06 · RECOGNITION · P0 · OBSERVED**

- Trước: Đề quan tâm một ký tự xuất hiện thành bao nhiêu **đoạn liên tiếp**, không phải bao nhiêu lần. Pattern nào?
- Sau: Scan theo run/chunk; xử lý khi giá trị đổi hoặc khi kết thúc input.

**B1-07 · STATE · P0 · OBSERVED**

- Trước: Scan các run liên tiếp cần state tối thiểu gì?
- Sau: `start` của run hiện tại hoặc `prev`; khi gặp giá trị mới, run cũ `[start, i)` đã hoàn tất.

**B1-08 · SKELETON · P0 · CORE**

- Trước: Viết skeleton duyệt mọi run mà không cần flush cuối riêng.
- Sau:

```js
function visitRuns(a, visit) {
  for (let start = 0; start < a.length; ) {
    let end = start + 1;
    while (end < a.length && a[end] === a[start]) end++;
    visit(a[start], start, end);
    start = end;
  }
}
```

**B1-09 · TRAP · P0 · CORE**

- Trước: Vì sao scan “chỉ xử lý khi giá trị thay đổi” thường mất run cuối?
- Sau: Sau phần tử cuối không còn giá trị mới kích hoạt xử lý. Phải flush sau loop hoặc dùng đoạn `[start,end)` như B1-08.

#### F03 — Array, matrix và coordinate

**B1-10 · STATE · P0 · OBSERVED**

- Trước: Khi duyệt grid chữ nhật, state tọa độ và kiểm tra biên chuẩn là gì?
- Sau: State `(r,c)`; hợp lệ khi `0 <= r < rows` và `0 <= c < cols`. Không dùng `grid.length` cho cả hai chiều.

**B1-11 · SKELETON · P0 · CORE**

- Trước: Viết skeleton duyệt bốn ô kề của `(r,c)` trong grid chữ nhật.
- Sau:

```js
function neighbors4(grid, r, c) {
  const dirs = [[-1, 0], [1, 0], [0, -1], [0, 1]];
  const out = [];
  for (const [dr, dc] of dirs) {
    const nr = r + dr, nc = c + dc;
    if (0 <= nr && nr < grid.length && 0 <= nc && nc < grid[0].length) {
      out.push([nr, nc]);
    }
  }
  return out;
}
```

**B1-12 · INVARIANT · P0 · CORE**

- Trước: Một lệnh yêu cầu “nếu bất kỳ ô nào trên đường đi bị chặn thì bỏ toàn bộ”. Invariant cập nhật là gì?
- Sau: Validate toàn bộ candidate path trước; commit vị trí đúng một lần sau khi tất cả điều kiện đều hợp lệ.

**B1-13 · TRAP · P0 · CORE**

- Trước: Vì sao `Array(rows).fill(Array(cols).fill(false))` làm visited grid sai?
- Sau: Mọi hàng trỏ tới cùng một array. Dùng `Array.from({length: rows}, () => Array(cols).fill(false))`.

#### F04 — Map/Set, frequency và multiset

**B1-14 · RECOGNITION · P0 · CORE**

- Trước: Đề hỏi “mỗi giá trị còn bao nhiêu bản sao?” và phải thêm/bớt khi scan. Cấu trúc nào?
- Sau: `Map<value,count>`; frequency/counting/multiset Map là cùng một core.

**B1-15 · SKELETON · P0 · CORE**

- Trước: Viết thao tác tăng/giảm frequency và xóa key khi count về 0.
- Sau:

```js
function addCount(freq, key, delta) {
  const next = (freq.get(key) ?? 0) + delta;
  if (next === 0) freq.delete(key);
  else freq.set(key, next);
}
```

**B1-16 · INVARIANT · P0 · CORE**

- Trước: Invariant của frequency Map cho cửa sổ `[left,right]` là gì?
- Sau: Mỗi count đúng bằng số lần key xuất hiện trong cửa sổ hiện tại; key có count 0 không tồn tại.

**B1-17 · TRANSFER · P1 · TRANSFER**

- Trước: Khi nào thay frequency Map bằng Set mà không đổi loop scan?
- Sau: Khi chỉ cần “đã có/chưa” hoặc số loại, không cần multiplicity. Nếu bỏ một bản sao mà có thể vẫn còn bản khác, phải giữ Map.

#### F08 — Stack

**B1-18 · RECOGNITION · P1 · CORE**

- Trước: Mỗi phần tử mới chỉ tương tác với phần tử **chưa giải quyết gần nhất**. Dùng cấu trúc nào?
- Sau: Stack; top là candidate gần nhất còn chờ ghép, loại hoặc được giải quyết.

**B1-19 · INVARIANT · P1 · CORE**

- Trước: Invariant chung của stack reduction là gì?
- Sau: Stack chỉ chứa các phần tử của prefix đã đọc nhưng chưa thể kết luận/triệt tiêu bằng dữ liệu đã thấy.

**B1-20 · SKELETON · P1 · CORE**

- Trước: Viết skeleton kiểm tra chuỗi ngoặc tròn hợp lệ.
- Sau:

```js
function validParentheses(s) {
  let balance = 0;
  for (const ch of s) {
    balance += ch === "(" ? 1 : -1;
    if (balance < 0) return false;
  }
  return balance === 0;
}
```

#### F09 — Queue bằng head index

**B1-21 · SKELETON · P0 · CORE**

- Trước: Viết API queue JavaScript tối thiểu không dùng `shift()`.
- Sau:

```js
function consumeQueue(initial, visit) {
  const queue = [...initial];
  for (let head = 0; head < queue.length; head++) {
    visit(queue[head], queue);
  }
}
```

**B1-22 · TRAP · P0 · CORE**

- Trước: Vì sao tránh `queue.shift()` trong BFS lớn?
- Sau: Xóa đầu array phải dời/reindex phần còn lại; lặp nhiều lần có thể thành gần bậc hai. Dùng `head++`.

#### F06 — Atomic simulation và state machine

**B1-23 · RECOGNITION · P0 · OBSERVED**

- Trước: Đề cho state ban đầu, chuỗi lệnh và quy tắc state đổi sau mỗi lệnh. Pattern nào?
- Sau: State-machine simulation: xác định state nhỏ nhất, viết transition cho từng loại lệnh, áp dụng đúng thứ tự.

**B1-24 · TRANSITION · P0 · CORE**

- Trước: Transition an toàn cho một command có thể bị hủy toàn bộ là gì?
- Sau:

```js
function applyCommand(state, command, isValid, transition) {
  const candidate = transition(state, command);
  return isValid(candidate, state, command) ? candidate : state;
}
```

#### F07/F20 — Timeline, event và endpoint order

**B1-25 · RECOGNITION · P0 · OBSERVED**

- Trước: Input có arrival time, duration và server có lúc rảnh; không cần chạy từng giây. Pattern nào?
- Sau: Event/timeline simulation; giữ arrival order, nhảy `time` tới event kế tiếp và quản lý waiting state.

**B1-26 · INVARIANT · P0 · OBSERVED**

- Trước: Trước khi chọn job tại `time`, invariant là gì?
- Sau: Mọi event có `arrival <= time` đã được nạp đúng một lần; chưa event tương lai nào nằm trong waiting structure.

**B1-27 · TRAP · P0 · OBSERVED**

- Trước: Khách rời đúng lúc khách khác đến và contract nói “rời trước”. Event order thế nào?
- Sau: Xử lý mọi exit tại `t` trước arrival tại `t`. Tie order là contract, không phải chi tiết tùy ý.

#### F05 — Comparator và tie-break

**B1-28 · SKELETON/TRAP · P0 · OBSERVED**

- Trước: Viết comparator “priority tăng, arrival tăng, id tăng”. Convention: `compare(a,b) < 0` nghĩa là `a` ưu tiên hơn.
- Sau:

```js
function compare(a, b) {
  if (a.priority !== b.priority) return a.priority - b.priority;
  if (a.arrival !== b.arrival) return a.arrival - b.arrival;
  return a.id - b.id;
}
```

Không trả boolean vì boolean không đáp ứng comparator contract.

## 6. Revealing tests

1. Parsing: `pos === op_start` có bị skip không?
2. Run: Với `"aabbaa"`, `a` có một hay hai run? Skeleton có xử lý run cuối không?
3. Matrix: Grid `2×5`, tại `(1,4)`, điều kiện nào dùng rows và điều kiện nào dùng cols?
4. Map: Bỏ một `x` khi count từ 2 xuống 1 có được delete key không?
5. Stack: `")("` có tổng balance cuối bằng 0; tại sao vẫn invalid?
6. Queue: Enqueue trong lúc duyệt thì `head < queue.length` có lấy node mới không?
7. Atomic simulation: Candidate đi qua ô cấm nhưng kết thúc ở ô hợp lệ có commit không?
8. Timeline: Heap rỗng, arrival tiếp theo ở 100: tăng từng giây hay gán `time=100`?
9. Event tie: Đổi arrival trước exit có làm peak occupancy tăng giả không?
10. Comparator: Hai job cùng priority và arrival cần field nào để deterministic?

## 7. Coverage matrix

### 7.1 Corpus → pattern

| Corpus | Pattern chính | Patterns phụ | Trạng thái flashcard |
|---|---|---|---|
| M1Q1 | F02 | F04, F05 | foundation covered Batch 1 |
| M1Q2 | F11 | F03 | planned Batch 3 |
| M1Q3 | F21 | F22 | planned Batch 6 |
| M1Q4 | F15 | F05, F07 | prerequisites covered Batch 1; heap Batch 5 |
| M2Q1 | F06 | F03 | covered Batch 1 |
| M2Q2 | F15 | F16 | planned Batch 5 |
| M2Q3 | F07 | F09, F20 | covered Batch 1 |
| M2Q4 | F12 | F03, F09 | planned Batch 4 |
| A-Q1 | F07 | F06 | covered Batch 1 |
| A-Q2 | F13 | F03, F04 | planned Batch 4 |
| A-Q3 | F21 | F06 | planned Batch 6 |
| A-Q4 | F11 | F03 | planned Batch 3 |
| B-Q1 | F01 | F06, F20 | covered Batch 1 |
| B-Q2 | F14 | numeric safety | planned Batch 4/search boundary audit |
| B-Q3 | F07 | F03, F04 | covered Batch 1 |
| B-Q4 | F22 | F01, F11 | parsing covered Batch 1; base/search Batch 6 |

Kết quả: **16/16 bài OBSERVED đã map vào ít nhất một family; 0 ô OBSERVED chưa giải thích**.

### 7.2 Taxonomy → repo asset → batch

| Families | Nội dung repo có thể tái sử dụng | Khoảng trống cần flashcard hóa | Batch |
|---|---|---|---|
| F01–F07, F09, F20 | Thinking Curriculum Ch.0–6/Lab H; `basic-drafts` array, map, robot, stack-queue, energy/health; PF01–PF05/PF20 | active-recall card nhỏ; parser contract; same-time ordering; queue head; comparator convention thống nhất | 1 |
| F10, F16 | Curriculum Ch.3–4/8, Lab A/E/F; PF09/PF10/PF21/PF23; `two-pointer.js` | tách fixed/variable/window+Map; proof greedy; revealing boundaries | 2 |
| F11 | Curriculum Ch.7; PF07/PF08; `dfs.js` | combination/permutation skeleton tách riêng; restore/pruning/search-space cards | 3 |
| F12–F14 | Curriculum Ch.9–10/Lab C/D; PF13/PF14/PF19 | multi-source và expanded-state cards; visited-at-enqueue; binary-search boundary | 4 |
| F15 | Curriculum Ch.11; PF06; `heap.js` | chia Heap class thành API/comparator/push/pop/application/traps; nhiều tài nguyên/lazy deletion | 5 |
| F17–F19, F21–F24 | Curriculum Ch.10–11; PF11–PF18/PF22/PF24; notebook advanced graph | phân ưu tiên nghiêm; memo/DP state; base conversion; low-priority cards không lấn P0 | 6 |
| all | coverage files và validators hiện có | dedupe semantic, compile JS blocks, TSV/front uniqueness, transfer audit | 7 |

### 7.3 Audit repository và khoảng trống

Đã audit trực tiếp:

- `docs/pccp-700-roadmap/PCCP_Thinking_Curriculum.md` (1.735 dòng): đã có contract/bound/invariant, foundation, simulation, search, graph, heap, DP và các lab transfer.
- `docs/pccp-700-roadmap/official-lessons/` (61 `OF` + 6 `SR`): lesson luyện chính thức rộng, nhưng phần lớn là Programmers Kit/public transfer chứ không phải PCCP observed corpus.
- `docs/pccp-700-roadmap/pattern-families/` (24 family cũ): nền taxonomy tốt, nhưng trộn family tổng quát với special-case (`Euler trail`, `planar topology`, `parent chain`) và chưa phục vụ card types.
- `basic-drafts/` (10 file, 2.318 dòng): có code đang học cho matrix, DFS, health/event, heap, Map/Set, movement, stack/queue, two pointers; không sửa/ghi đè.
- `PCCP_OFFICIAL_PRACTICE_BANK.csv`, public problem catalog và locked mock metadata: dùng để cross-check ID, không coi toàn bộ 61 lesson là corpus PCCP.

Khoảng trống chính:

1. Chưa có một inventory tách sạch 16 `OBSERVED` khỏi bank luyện `CORE/TRANSFER`.
2. Batch 1 đã có flashcard atomic cho foundation/simulation; các family Batch 2–6 chưa có đủ card types.
3. Heap draft dài và nhiều phiên bản; chưa khóa convention `compare(a,b) < 0` nghĩa là `a` ưu tiên cao hơn.
4. Taxonomy cũ có các family special-case mang trọng lượng ngang family nền; cần gom/giảm ưu tiên như F21/F24.
5. Chưa có TSV import ba cột, semantic dedupe front và validation code-block theo từng batch.
6. Chưa có revealing test cho mỗi family và chưa có ma trận card-type bắt buộc cho mọi P0/P1.
7. Kế hoạch 12 ngày thuộc definition-of-done toàn bộ bộ thẻ, chỉ tạo sau khi card inventory Batch 1–6 ổn định.

## 8. Known limitations

- Inventory là snapshot nguồn công khai kiểm tra ngày 01/09/2026, không chứng minh không tồn tại tài nguyên PCCP công khai khác bị search/index bỏ sót.
- Ordinal của hai nhóm past `250xxx` và `340xxx` là `UNVERIFIED`; chỉ số câu trong từng nhóm là verified từ tiêu đề lesson.
- Course `19344` hiện lộ ba mục trong outline dù có bốn lesson `250xxx` mang nhãn PCCP; không suy diễn nguyên nhân.
- Algorithm family là phân tích từ contract/constraint chính thức, không phải tag do Programmers bảo đảm là lời giải duy nhất.
- `CORE/TRANSFER/P0–P3` là quyết định curriculum dựa trên evidence, không phải phân bố xác suất hay trọng số điểm official.
- Batch 1 mới cover foundation/simulation; chưa cover toàn bộ taxonomy và chưa có kế hoạch 12 ngày cuối.

### Nguồn chính thức cấp corpus

- [PCCP 모의고사 #1](https://school.programmers.co.kr/learn/courses/15008)
- [PCCP 모의고사 #2](https://school.programmers.co.kr/learn/courses/15009)
- [PCCP 기출문제 course](https://school.programmers.co.kr/learn/courses/19344)
- [PCCP 기출문제 해설 강의](https://school.programmers.co.kr/learn/courses/24542)
- [Phạm vi PCCP hiện hành](https://certi.programmers.co.kr/about/pccp?tab=range)
- [Brochure chứng chỉ Programmers](https://business.programmers.co.kr/static/business/certification_intro.pdf)
