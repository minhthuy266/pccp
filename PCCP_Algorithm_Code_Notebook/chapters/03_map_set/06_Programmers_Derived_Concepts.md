# Concept Map/Set rút ra từ 29 bài Programmers/PCCP

[← Index](../../03_Map_Set.md) · [29 đề](04_Programmers_PCCP_Set.md) · [29 lời giải](../../solutions/03_Map_Set_Programmers_Solutions.md)

## Kết luận trước

Không có 29 cách giải khác nhau. Phần Map/Set của 29 bài thu về 10 bộ xương:

1. Membership và uniqueness.
2. Frequency và multiset.
3. Lookup theo key.
4. Index/state đồng bộ hai chiều.
5. Group rồi aggregate/rank.
6. Quan hệ `Map<key, Set>`.
7. Event state theo thực thể.
8. Frequency trong cửa sổ.
9. Canonical signature để loại trạng thái tương đương.
10. Map/Set làm state phụ cho DP, graph và simulation.

Đi thi không hỏi “bài này giống tên bài nào?”. Hãy hỏi:

```text
Tương lai cần truy vấn điều gì về dữ liệu đã đi qua?
```

Đáp án của câu hỏi đó quyết định cấu trúc state.

---

## 1. Decision tree chọn cấu trúc

```text
Có cần nhớ quá khứ để trả lời nhanh không?
├─ Không → có thể chỉ cần biến, array, sort, two pointers...
└─ Có
   ├─ Chỉ cần biết key tồn tại? → Set
   ├─ Cần số lần xuất hiện? → Map<key, count>
   ├─ Cần thuộc tính/index/state của key? → Map<key, value>
   ├─ Một key có nhiều item? → Map<key, array>
   ├─ Một key liên hệ với nhiều key không trùng? → Map<key, Set>
   ├─ Cần phân biệt tổ hợp/hình/trạng thái? → canonical key + Set/Map
   └─ State chỉ đúng trong đoạn hiện tại? → Map count + add/remove đối xứng
```

Sau khi chọn cấu trúc, hỏi thêm:

```text
Check trước update hay sau update?
Value cần giữ lần đầu, lần gần nhất hay cộng dồn?
Count về 0 có phải delete key không?
Hai state khác thứ tự nhưng cùng ý nghĩa có cần gộp không?
```

---

## 2. Concept 1 — Membership và uniqueness

### Tín hiệu đề

```text
đã xuất hiện, tồn tại, trùng, khác nhau, visited, dùng rồi
```

### State chung

```js
const seen = new Set();

for (const value of values) {
  if (seen.has(value)) {
    // value đã xuất hiện trong phần quá khứ được xử lý.
  }
  seen.add(value);
}
```

### Invariant

Trước khi xử lý `values[i]`, `seen` chứa đúng các giá trị thuộc prefix `values[0..i-1]`.

### Bài quy về concept này

| Bài | Set đang trả lời câu hỏi gì? |
| --- | --- |
| Ponketmon | Có bao nhiêu loại khác nhau? |
| Danh bạ điện thoại | Prefix này có phải số hoàn chỉnh không? |
| Nối từ tiếng Anh | Từ này đã được nói chưa? |
| Tuple | Phần tử nào trong group dài hơn chưa xuất hiện? |
| Tìm số nguyên tố | Số tạo ra đã được đếm chưa? |
| Áo thể dục | Người này còn mất áo/còn áo dư không? |

### Bẫy chung

- `add` trước `has` khi current không được dùng lại chính nó.
- Dùng Set khi thực ra cần count/index.
- Quên rằng array/object được so theo reference.
- Nhầm `set.length` với `set.size`.

---

## 3. Concept 2 — Frequency và multiset

### Tín hiệu đề

```text
bao nhiêu lần, số lượng theo loại, bản sao, còn lại, nhiều nhất/ít nhất
```

### Transition cơ bản

```js
const countByValue = new Map();

for (const value of values) {
  const oldCount = countByValue.get(value) ?? 0;
  countByValue.set(value, oldCount + 1);
}
```

### Invariant

Sau khi xử lý prefix kết thúc ở `i`, `countByValue.get(x)` bằng số lần `x` xuất hiện trong prefix đó.

### Ba biến thể phải phân biệt

#### Chỉ tăng

Người chưa hoàn thành, Trang phục, Chọn quýt.

```js
count.set(key, (count.get(key) ?? 0) + 1);
```

#### Tăng rồi giảm

Người chưa hoàn thành, Chia bánh cuộn, cửa sổ.

```js
const nextCount = count.get(key) - 1;
if (nextCount === 0) count.delete(key);
else count.set(key, nextCount);
```

Phải `delete` nếu dùng `map.size` để đại diện số loại đang tồn tại.

#### Multiset intersection/union

Ghép tin tức:

```text
count giao của key = min(countA, countB)
count hợp của key = max(countA, countB)
```

### Bài quy về concept này

| Bài | Ý nghĩa count |
| --- | --- |
| Người chưa hoàn thành | số lượt đăng ký chưa ghép completion |
| Trang phục | số món theo loại |
| Chọn quýt | số quả theo kích thước |
| Chia bánh cuộn | số topping từng loại còn bên phải |
| Ghép tin tức | multiplicity của từng bigram |

### Bẫy chung

- Dùng Set làm mất bản sao.
- Dùng `get(key) || 0` mà không hiểu falsy; với count nên ưu tiên `?? 0`.
- Count bằng 0 vẫn giữ trong Map làm `size` sai.
- Đếm đúng nhưng quên bước tiếp theo: sort count, filter hoặc áp quy tắc nhân.

---

## 4. Concept 3 — Lookup theo key

### Tín hiệu đề

```text
biết tên/id thì cần lấy ngay điểm, thời hạn, nickname, tọa độ...
```

### Template

```js
const valueByKey = new Map();

for (const item of referenceData) {
  valueByKey.set(getKey(item), getValue(item));
}

for (const query of queries) {
  const value = valueByKey.get(getQueryKey(query));
  // dùng value để xử lý query
}
```

### Bài quy về concept này

| Bài | Quan hệ key → value |
| --- | --- |
| Điểm kỷ niệm | name → score |
| Hạn dữ liệu cá nhân | term type → số tháng |
| Tìm nguy cơ va chạm | point id → coordinate |
| Phòng chat mở | uid → nickname mới nhất |

### First, latest và aggregate

Ba câu lệnh `set` nhìn giống nhau nhưng ý nghĩa khác:

```js
// First: chỉ ghi khi chưa có.
if (!map.has(key)) map.set(key, value);

// Latest: luôn ghi đè.
map.set(key, value);

// Aggregate: đọc cũ rồi kết hợp.
map.set(key, combine(map.get(key), value));
```

Phòng chat dùng **latest**. Frequency dùng **aggregate**. Lưu index đầu tiên dùng **first**.

---

## 5. Concept 4 — Index/state đồng bộ hai chiều

### Bài đại diện

Cuộc đua chạy.

Array trả lời `index → player`, còn Map trả lời `player → index`.

```text
ranking[index] = player
indexByPlayer.get(player) = index
```

Hai biểu diễn phải luôn thống nhất. Khi swap hai người, cần bốn update:

```js
ranking[indexA] = playerB;
ranking[indexB] = playerA;
indexByPlayer.set(playerA, indexB);
indexByPlayer.set(playerB, indexA);
```

### Invariant

Với mọi `index`, nếu `ranking[index] = player` thì `indexByPlayer.get(player) = index`.

### Concept tổng quát

Đây không chỉ là Map lookup. Đây là **nhiều state biểu diễn cùng một sự thật**. Mọi transition phải commit đồng bộ hoặc kết quả sau sẽ đọc dữ liệu cũ.

Các bài simulation có `Map<id,state>` cũng thường gặp lỗi tương tự.

---

## 6. Concept 5 — Group rồi aggregate/rank

### Tín hiệu đề

```text
theo thể loại, theo đội, theo category, chọn top trong mỗi nhóm
```

### Template

```js
const itemsByGroup = new Map();
const totalByGroup = new Map();

for (const item of items) {
  const group = getGroup(item);

  if (!itemsByGroup.has(group)) {
    itemsByGroup.set(group, []);
  }
  itemsByGroup.get(group).push(item);

  totalByGroup.set(
    group,
    (totalByGroup.get(group) ?? 0) + getScore(item),
  );
}
```

### Bài đại diện

- Album hay nhất: group bài theo genre, aggregate tổng plays, sort genre, sort bài trong genre.
- Hành trình du lịch: group destination theo origin; sau đó graph traversal.

### Bẫy chung

- Một Map cố giữ quá nhiều ý nghĩa.
- Sort item toàn cục trong khi rule là sort group trước.
- Không viết tie-break rõ ràng.
- Dùng Set thay array dù cần giữ nhiều item hoặc thứ tự.

---

## 7. Concept 6 — Quan hệ `Map<key, Set>`

### Bài đại diện

Nhận kết quả báo cáo.

```js
const reportersByTarget = new Map();

if (!reportersByTarget.has(target)) {
  reportersByTarget.set(target, new Set());
}
reportersByTarget.get(target).add(reporter);
```

### Vì sao không phải `Map<key,array>`?

Một người báo cùng đối tượng nhiều lần chỉ được tính một. Array giữ duplicate, Set tự duy trì uniqueness.

### Mental model

```text
Map chọn “ngăn hồ sơ” theo target.
Set trong ngăn hồ sơ giữ các reporter khác nhau.
```

### Dạng tổng quát

- person → tập bạn bè.
- course → tập học viên.
- node → tập neighbor không trùng.
- target → tập nguồn tác động.

---

## 8. Concept 7 — Event state theo thực thể

### Tín hiệu đề

```text
record/event theo thời gian, nhiều id độc lập, IN/OUT, ENTER/LEAVE/CHANGE
```

### State chung

```js
const stateById = new Map();

for (const event of events) {
  const oldState = stateById.get(event.id);
  const newState = transition(oldState, event);

  if (shouldRemove(newState)) stateById.delete(event.id);
  else stateById.set(event.id, newState);
}
```

### Bài quy về concept này

| Bài | State theo id |
| --- | --- |
| Phòng chat mở | uid → nickname mới nhất |
| Tính phí đỗ xe | car → thời điểm IN; car → tổng phút |
| Cuộc đua chạy | player → index hiện tại |

### Hai chiến lược output

1. Có đủ thông tin ngay lúc event xảy ra → tạo output ngay.
2. Output phụ thuộc state cuối cùng → lưu event trước, render lượt hai.

Phòng chat bắt buộc chiến lược 2 vì nickname tương lai phải sửa cả message quá khứ.

---

## 9. Concept 8 — Frequency trong cửa sổ

### Tín hiệu đề

```text
đoạn liên tiếp, cửa sổ, đủ loại, đúng số lượng, ngắn nhất
```

### Invariant

`windowCount` mô tả chính xác các phần tử trong đoạn `[left..right]`, không phải toàn array.

### Transition đối xứng

```js
function changeCount(map, key, delta) {
  const nextCount = (map.get(key) ?? 0) + delta;
  if (nextCount === 0) map.delete(key);
  else map.set(key, nextCount);
}
```

### Hai dạng

| Dạng | Biên | Bài đại diện |
| --- | --- | --- |
| Fixed window | độ dài cố định; add right, remove left | Sự kiện giảm giá |
| Variable window | mở right đến valid, co left hết mức | Mua đá quý |

### Bẫy chung

- Add nhưng quên remove.
- Remove count về 0 nhưng không delete.
- Condition dùng số phần tử thay vì số loại.
- Cập nhật đáp án trước hoặc sau co cửa sổ sai thời điểm.

---

## 10. Concept 9 — Canonical signature

### Vấn đề chung

Nhiều representation khác nhau có cùng ý nghĩa:

- cùng tập user nhưng chọn theo thứ tự khác;
- cùng tổ hợp cột;
- cùng hình nhưng xoay khác;
- cùng số nhưng sinh từ permutation/zero đầu khác;
- cùng tọa độ và thời gian cần dùng làm một key.

Trước khi đưa vào Map/Set, phải biến state thành **một biểu diễn chuẩn duy nhất**.

### Template

```js
function signature(values) {
  return [...values].sort().join("|");
}

const uniqueStates = new Set();
uniqueStates.add(signature(state));
```

### Bài quy về concept này

| Bài | Canonicalization |
| --- | --- |
| Người dùng bị cấm | sort user index rồi join |
| Khóa ứng viên | bitmask cột + JSON projection |
| Ghép mảnh puzzle | normalize 4 rotations, lấy key nhỏ nhất |
| Tìm số nguyên tố | đổi digit string thành Number |
| Tìm nguy cơ va chạm | key `time|row|col` |

### Bẫy chung

- Key nối chuỗi mơ hồ: `['1','23']` và `['12','3']`.
- Quên sort khi thứ tự không mang ý nghĩa.
- Sort khi thứ tự thực ra có ý nghĩa.
- Shape normalize translation nhưng quên rotation.

---

## 11. Concept 10 — Map/Set không phải thuật toán chính

Một số bài không phải “bài Hash”, dù code dùng nhiều Set/Map.

| Bài | Thuật toán chủ | Vai trò Map/Set |
| --- | --- | --- |
| Biểu diễn bằng N | DP | mỗi tầng DP là Set giá trị |
| Hành trình du lịch | Euler path/graph | Map adjacency |
| Ghép mảnh puzzle | BFS + shape matching | Map count signature |
| Đếm số phòng | graph cycle | Set vertex/edge |
| Khai thác dầu | BFS component | Set cột component chạm |
| Tìm nguy cơ va chạm | simulation | Map count theo time-position |
| Khôi phục biểu thức | brute force base | Set kết quả ứng viên |

### Bài học

Map/Set trả lời truy vấn state nhanh; nó không tự quyết định thứ tự duyệt, biên cửa sổ, đường đi graph hay recurrence DP.

Khi phân tích một bài kết hợp, ghi hai dòng:

```text
Algorithm owner: ai điều khiển thứ tự duyệt? BFS/DFS/window/simulation/DP...
State helper: Map/Set đang nhớ thông tin gì để transition nhanh?
```

---

## 12. Bảng ánh xạ toàn bộ 29 bài

| ID | Bài | Concept chính | Concept phụ |
| --- | --- | --- | --- |
| PK-H01 | Người chưa hoàn thành | Frequency | decrement |
| PK-H02 | Ponketmon | Membership/unique | bound `N/2` |
| PK-H03 | Danh bạ điện thoại | Membership | prefix generation |
| PK-H04 | Trang phục | Frequency | combinatorics |
| PK-H05 | Album hay nhất | Group/aggregate | ranking |
| PK-M01 | Cuộc đua chạy | Bidirectional index | synchronized state |
| PK-M02 | Điểm kỷ niệm | Lookup | aggregation |
| PK-M03 | Chọn quýt | Frequency | greedy sort |
| PK-M04 | Chia bánh cuộn | Frequency | left/right state |
| PK-M05 | Sự kiện giảm giá | Fixed window | frequency |
| PK-M06 | Nối từ | Membership | index conversion |
| PK-M07 | Tuple | Membership | parsing/order |
| PK-M08 | Phòng chat mở | Event/latest state | two-pass output |
| PK-M09 | Kết quả báo cáo | Map of Set | threshold |
| PK-M10 | Phí đỗ xe | Event state | aggregation/sort |
| PK-M11 | Mua đá quý | Variable window | distinct count |
| PK-M12 | Khóa ứng viên | Canonical signature | bitmask/minimality |
| PK-M13 | Người dùng bị cấm | Canonical signature | backtracking |
| PK-M14 | Ghép tin tức | Multiset | min/max count |
| PK-M15 | Hạn dữ liệu | Lookup | date normalization |
| PCCP-MS01 | Nguy cơ va chạm | Composite key | simulation count |
| PCCP-MS02 | Khai thác dầu | Component contribution | Set columns |
| PCCP-MS03 | Khôi phục biểu thức | Candidate Set | brute force base |
| PK-X01 | Tìm số nguyên tố | Canonical/unique | permutation |
| PK-X02 | Áo thể dục | Membership/delete | greedy |
| PK-X03 | Biểu diễn bằng N | Set-valued DP | deduplicate state |
| PK-X04 | Hành trình du lịch | Group adjacency | graph/Euler path |
| PK-X05 | Ghép mảnh puzzle | Shape signature Map | BFS |
| PK-X06 | Đếm số phòng | Vertex/edge Set | graph cycle |

---

## 13. Sáu invariant phải tự nói được

1. **Seen Set:** trước current, Set chứa đúng prefix đã xử lý.
2. **Frequency Map:** count bằng multiplicity thật trong phạm vi đã định nghĩa.
3. **Lookup Map:** mỗi key trỏ đúng thuộc tính theo semantics first/latest/aggregate.
4. **Window Map:** Map mô tả đúng đoạn `[left..right]` hiện tại.
5. **Synchronized state:** array và Map là hai chiều của cùng một quan hệ.
6. **Canonical Set:** hai state tương đương tạo đúng cùng một signature.

Nếu không nói được invariant của code, bạn đang nhớ lời giải chứ chưa hiểu pattern.

## 14. Lộ trình luyện lại 29 bài bằng 10 bài đại diện

Không cần làm lại cả 29 ngay. Chọn 10 bài đại diện:

1. Ponketmon — Set membership.
2. Người chưa hoàn thành — frequency.
3. Điểm kỷ niệm — lookup.
4. Cuộc đua chạy — synchronized index.
5. Album hay nhất — grouping/ranking.
6. Kết quả báo cáo — Map of Set.
7. Phí đỗ xe — event state.
8. Mua đá quý — window frequency.
9. Người dùng bị cấm — canonical signature.
10. Biểu diễn bằng N — Set kết hợp DP.

Sau mỗi bài, không chép code. Viết lại bốn dòng:

```text
Key:
Value / phần tử Set:
Invariant:
Transition:
```

Nếu làm được 10 bài này từ trắng và giải thích được state, 19 bài còn lại chủ yếu là thay contract hoặc ghép thêm thuật toán khác.
