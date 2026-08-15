# Solutions — Mixed Pattern Tests

[← Đề](../90_Mixed_Pattern_Tests.md) · [Executable module](../../solutions/notebook/ch90_mixed.js)

Chỉ mở từng mục sau khi đã lưu sáu dòng phân tích và code attempt.

### MX01 — Mapping và lời giải

Signal: entity update theo event rồi ranking nhiều tiêu chí. Pattern chính `MAP-12`; phụ `SORT-02`. State `scoreByName[name]` là điểm sau prefix event. Transition cộng delta; sau simulation sort entries score giảm/name tăng. Invariant Map đúng state mọi entity đã thấy. `O(E + U log U)` time, `O(U)` space. Revealing test: negative delta tạo tie lexical.

### MX02 — Mapping và lời giải

Signal: exact subarray sum nhưng có số âm. ID `PRE-05`, phụ `MAP-03`; positive sliding window là counter-pattern. State `frequency[p]` là số prefix sum trước current bằng p. Trước update, cộng `frequency[prefix-target]`, rồi tăng current prefix để không đếm sai empty/future. `O(n)` expected time, `O(n)` space. Revealing test `[1,-1,1],1→3`.

### MX03 — Mapping và lời giải

Signal: minimum integer answer và predicate “sản xuất đủ” monotonic. `BS-04/05`. `produced(time)=Σ floor(time/machine)`; first feasible. Invariant answer luôn trong `[low,high]`, half-open hoặc inclusive convention phải shrink strict. `O(m log answer)` time. BigInt toàn đường tính. Revealing test goal 1 và value vượt safe integer.

### MX04 — Mapping và lời giải

Signal: weighted nonnegative shortest từ source. `GR-01`, phụ `HG-01/BFS-01`. State distance + min-heap record; stale check trước relax. BFS sai ở cạnh 10 so với hai cạnh tổng 2. Với `E` tính từng edge record kể cả parallel edge và lazy heap: `O(V + E log(E+1))` time, `O(V+E)` space. Negative edge bị reject.

### MX05 — Mapping và lời giải

Signal: minimum total network, không phải route từ source. `GR-02`. Sort edge, DSU union hai component khác nhau; cut argument chứng minh edge safe. Đủ đúng `n-1` edge, nếu không return null. `O(E log E)` time.

### MX06 — Mapping và lời giải

Signal: ít point chạm mọi closed interval. `HG-04/05`, phụ `SORT-04`. Sort end; interval chưa cover có end sớm nhất buộc mọi nghiệm đặt point trong nó, exchange point về end không làm hỏng interval tương lai. Uncovered condition `point < start`. `O(n log n)`.

### MX07 — Mapping và lời giải

Signal: chọn/bỏ với xung đột kề và overlap bài toán con. `BTD-06/08`. Sau prefix, `skip` là best không chọn current; `take` là best chọn current. Transition `nextTake=skip+reward`, `nextSkip=max(skip,take)` phải dùng state cũ. `O(n)` time, `O(1)` space. Greedy max-current sai với `[4,5,4]`: lấy 5 thay vì 8.

### MX08 — Mapping và lời giải

Signal: dùng mọi edge occurrence đúng một lần. `GR-04`, phụ `SORT-02`. Adjacency giữ multiplicity; consume edge, append vertex khi dead end, reverse. Validate route length và multiset consecutive edges. Sort reverse để pop lexical smallest. `O(E log E)` do sort.

## Gate mapping — chỉ xem sau 120 phút

| Gate | Official IDs | Mục tiêu transfer chính |
| --- | --- | --- |
| GATE-01 | OF048, OF052, OF008, OF036 | implementation → window → stack → choice tree |
| GATE-02 | OF015, OF028, OF055, OF043 | boundary/index → extremes → multi-phase traversal → answer search |
| GATE-03 | OF050, OF011, OF013, OF033 | synchronized state → unresolved indices → event priority → table dependency |
| GATE-04 | OF058, OF059, OF029, OF041 | variable validity → weighted shortest → minimum network → edge-once trail |

Không quy đổi số bài pass thành điểm PCCP vì nguồn chính thức không công bố trọng số cố định từng câu. Gate chỉ đo độ ổn định nội bộ.
