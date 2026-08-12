# PF01 — Counting, grouping và direct lookup

Nguồn: [OF001](../official-lessons/OF001.md), [OF002](../official-lessons/OF002.md), [OF004](../official-lessons/OF004.md), [OF005](../official-lessons/OF005.md), [OF048](../official-lessons/OF048.md), [OF050](../official-lessons/OF050.md).

## 1. Tín hiệu nhận dạng

Đề liên tục hỏi theo **key**: mỗi tên xuất hiện bao nhiêu lần, có bao nhiêu loại, tổng theo nhóm, metadata của mã này là gì, phần tử này đang ở index nào. Nếu scan lại array để trả lời từng query, thường phải dựng `Map`/`Set` một lần.

Phân biệt bốn state hay bị gom nhầm:

| Câu hỏi | State đúng |
|---|---|
| key đã từng xuất hiện? | `Set` |
| key xuất hiện bao lần? | `Map<key,count>` |
| key có nhiều record nào? | `Map<key,array>` |
| object này đang ở đâu? | inverse `Map<value,index>` |

## 2. Không dùng khi

- Query phụ thuộc thứ tự/range liên tiếp: cân nhắc prefix/window.
- Cần min/max động: Map biết “có gì”, không tự biết cực trị; có thể cần heap/tree.
- Key là object/array được tạo mới: Map so identity, không so nội dung; phải serialize/canonicalize.
- Chỉ có một scan duy nhất và không query lại: một vài scalar có thể đủ.

## 3. Decision tree

```text
Cần biết membership בלבד? → Set
Cần multiplicity?          → frequency Map
Cần gom record theo key?    → grouping Map
Cần O(1) vị trí hiện tại?   → inverse index Map
Cần tra rule/config?        → lookup Map
Sau khi group còn cần top-k? → Map trước, sort/heap trong từng group sau
```

## 4. Knobs tạo biến thể

1. **Set hay multiset:** duplicate có ý nghĩa không? OF001 bắt buộc count; OF002 chỉ distinct.
2. **Static hay dynamic:** dữ liệu chỉ build một lần hay có add/remove? Dynamic frequency phải xóa key khi count về 0 nếu `map.size` mang ý nghĩa.
3. **Một chiều hay hai chiều:** OF050 vừa giữ array `rank→name`, vừa giữ Map `name→rank`; swap phải cập nhật cả hai.
4. **Aggregate hay member order:** OF005 cần total theo genre và tie-break trong từng genre.
5. **Key thô hay key chuẩn hóa:** ngày tháng ở OF048 phải parse về scalar trước khi so.

## 5. Invariant cốt lõi

Sau khi xử lý prefix `0..i`, `frequency.get(x)` bằng chính xác số lần `x` xuất hiện trong prefix. Với inverse index, luôn phải có hai chiều đồng thuận:

```text
order[position.get(name)] === name
```

Mọi mutation đổi array order phải cập nhật Map trong cùng transition; nếu cập nhật một nửa, query tiếp theo đọc state rách.

## 6. Code core đáng thuộc

```js
function frequencyOf(values) {
  const frequency = new Map();
  for (const value of values) {
    frequency.set(value, (frequency.get(value) ?? 0) + 1);
  }
  return frequency;
}

function decrement(frequency, key) {
  const next = (frequency.get(key) ?? 0) - 1;
  if (next === 0) frequency.delete(key);
  else frequency.set(key, next);
}
```

```js
function groupBy(records, keyOf) {
  const groups = new Map();
  for (const record of records) {
    const key = keyOf(record);
    if (!groups.has(key)) groups.set(key, []);
    groups.get(key).push(record);
  }
  return groups;
}
```

Không thuộc cả lời giải OF005; chỉ thuộc thao tác “get default → update” và tự thiết kế value theo query.

## 7. Counterexamples bóc lỗi

- Frequency bị thay bằng Set: `participants=[a,a], completion=[a]` phải còn `a`.
- Quên xóa zero count: window có đủ loại dựa trên `map.size` sẽ báo thừa.
- Map index stale: order `[a,b]`, swap thành `[b,a]` nhưng `position[a]=0` khiến lần gọi tiếp theo swap sai.
- Group top-k sai tie: hai record cùng score phải dùng original index nếu contract yêu cầu.

## 8. Drills biến thể

### Drill A — multiset intersection

Trả giao của hai array và giữ duplicate. Build frequency của array ngắn hơn; scan array kia, chỉ emit khi count dương rồi decrement. Biến thể “unique intersection” đổi output thành Set và không cần multiplicity.

### Drill B — bảng xếp hạng đổi chỗ xa

OF050 chỉ đổi với người ngay trước. Đổi command thành `swap(nameA,nameB)`: lấy hai index từ Map, swap array, cập nhật cả hai Map entry. Invariant hai chiều không đổi.

### Drill C — top-k mỗi nhóm động

Nếu chỉ build một lần: group rồi sort. Nếu có stream update và query top liên tục: array sort mỗi lần không còn phù hợp; chuyển value của group thành heap hoặc ordered structure. Đây là điểm pattern PF01 phải nhường PF06.

## 9. Câu hỏi mở tư duy

- Nếu key có phân biệt hoa thường, normalization diễn ra trước hay sau counting?
- Nếu cần query range `[l,r]` theo key, một global Map còn đủ không?
- Nếu count có thể âm, điều đó là contract hợp lệ hay signal dữ liệu sai?
- Cần preserve insertion order hay chỉ cần lookup?

## 10. Checklist 15 giây

Nói rõ: **key là gì, value cần lưu tối thiểu là gì, duplicate có ý nghĩa không, update có cần xóa zero không, và mutation nào phải cập nhật hai cấu trúc cùng lúc**.
