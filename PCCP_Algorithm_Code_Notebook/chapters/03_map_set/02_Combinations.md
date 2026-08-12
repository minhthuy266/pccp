# Map/Set phần kết hợp — Complement, group và simulation

[← Phần lõi](01_Core.md) · [Practice Ladder →](03_Practice_Ladder.md)

## Dạng 7 `[MAP-07]` — Phần bù / Two Sum

**Dấu hiệu nhận dạng:** cần pair với `other = target-current`; Map/Set prefix trả lời complement tồn tại mà không thử mọi cặp.

### A. Bản chất

Brute force thử mọi cặp. Khi đang ở `current`, ta không cần hỏi mọi phần tử cũ; chỉ hỏi đúng `target-current` đã xuất hiện chưa. Dấu hiệu: cặp có quan hệ xác định được đối tác. Không dùng khi đối tác không tính trực tiếp được hoặc cần liệt kê số cặp rất lớn mà output tự nó đã lớn.

### B. Mental model

Mỗi số mới mang một “mảnh ghép còn thiếu”; tra sổ xem mảnh đó đã đến trước chưa.

### C. Template tư duy

```text
Duyệt: index từ trái sang phải.
Key: value đã thấy. Value: index cần trả.
Thông tin cũ: index của target-current.
Check: has(needed) trước update.
Update: set(current,index).
Invariant: đầu vòng, Map chỉ chứa index ở bên trái i.
```

### D. Template code

```js
for (let index = 0; index < values.length; index += 1) {
  const needed = target - values[index];
  if (indexByValue.has(needed)) return [indexByValue.get(needed), index];
  indexByValue.set(values[index], index);
}
```

### E. Bài mẫu — Hai index có tổng target

1. Đề: trả một cặp index khác nhau, không có `[-1,-1]`. 2. `[3,3],6→[0,1]`. 3. tìm đối tác bên trái. 4. hai loop. 5. `O(n²)`. 6. complement duy nhất. 7. `indexByValue`. 8. check needed rồi set current. 9. Map chỉ chứa prefix. 10. scan/compute/check/return/set. 11. **Code:**

```js
function twoSum(values, target) {
  const indexByValue = new Map();
  for (let index = 0; index < values.length; index += 1) {
    const currentValue = values[index];
    const neededValue = target - currentValue;
    if (indexByValue.has(neededValue)) {
      return [indexByValue.get(neededValue), index];
    }
    indexByValue.set(currentValue, index);
  }
  return [-1, -1];
}
```

12. Check trước set ngăn dùng index hiện tại hai lần; `[3,3]` vẫn đúng vì lần hai thấy lần một. 13. **Dry run:**

| Bước | Phần tử/index | State trước | Điều kiện | Hành động | State sau |
| --- | --- | --- | --- | --- | --- |
| 0 | 3/0 | `{}` | cần 3, absent | set 3→0 | `{3:0}` |
| 1 | 3/1 | `{3:0}` | cần 3, present | return `[0,1]` | không đổi |

14. `O(n)`/`O(n)`. 15. set trước check; dùng `get` truthiness làm mất index 0; return value khi đề cần index. 16. Biến thể đếm số cặp index: Map lưu count; cộng `count(needed)` trước khi tăng current.

**Recall Card `[MAP-07]`:** tính needed; check old; update current. **Blank Page:** test `[3,3]`. **Mutation:** difference target; count pairs; earliest pair. **Explain Back:** vì sao không dùng cùng phần tử? Map cần index hay count? Duplicate xử lý ra sao?

## Dạng 8 `[MAP-08]` — So sánh tần suất

**Dấu hiệu nhận dạng:** hai collection tương đương theo multiplicity. **Brute force bottleneck:** xóa/tìm matching item lặp lại là `O(n²)`; transition tăng count phía A, giảm theo B và xóa key khi về zero.

### A. Bản chất

Ta so “multiset”, không chỉ tập phần tử. Set sai với `['a','a']` và `['a']`.

### B. Mental model

Kiểm kho: hai kho phải có cùng loại và cùng số lượng từng loại.

### C. Template tư duy

```text
State: balanceByKey.
Update lượt A +1; lượt B -1 (hoặc decrement và fail nếu thiếu).
Invariant: balance là count(A prefix/full) - count(B prefix).
Return: mọi balance 0, hoặc Map rỗng sau khi xóa key 0.
```

### D. Template code JavaScript

```js
for (const value of leftValues) increment(value);
for (const value of rightValues) {
  if (remaining(value) === 0) return false;
  decrement(value);
}
```

### E. Bài mẫu — Hai array có cùng multiset

1. Đề: cùng value với cùng multiplicity. 2. `[a,a,b]` và `[b,a,a]→true`. 3. thứ tự không quan trọng, số lần quan trọng. 4. match từng phần tử với phần tử chưa dùng. 5. scan lặp. 6. frequency comparison. 7. countByValue. 8. count A; với B kiểm count>0 rồi decrement. 9. trước mỗi B, Map là số bản sao A chưa ghép. 10. length check/build/decrement/final true. 11. **Code:**

```js
function sameFrequencies(leftValues, rightValues) {
  if (leftValues.length !== rightValues.length) return false;
  const remaining = new Map();
  for (const value of leftValues) {
    remaining.set(value, (remaining.get(value) ?? 0) + 1);
  }
  for (const value of rightValues) {
    const oldCount = remaining.get(value) ?? 0;
    if (oldCount === 0) return false;
    remaining.set(value, oldCount - 1);
  }
  return true;
}
```

12. Length check + không thiếu ở lượt B suy ra không còn dư; check trước decrement tránh count âm che contract. 13. **Dry run** với A `[a,a,b]`, B `[b,a,a]`:

| Bước | Phần tử/index | State trước | Điều kiện | Hành động | State sau |
| --- | --- | --- | --- | --- | --- |
| build | A all | `{}` | — | count | `{a:2,b:1}` |
| 0 | b/0 | `{a:2,b:1}` | old=1 | -1 | `{a:2,b:0}` |
| 1 | a/1 | `{a:2,b:0}` | old=2 | -1 | `{a:1,b:0}` |
| 2 | a/2 | `{a:1,b:0}` | old=1 | -1 | `{a:0,b:0}` |

14. `O(n+m)`/`O(k)`. 15. dùng Set; quên length; nhận count âm. 16. Biến thể `right` được phép thiếu tối đa một item: tổng remaining quyết định.

**Recall Card `[MAP-08]`:** multiset = frequency, không phải Set. **Blank Page:** phản ví dụ Set. **Mutation:** subset multiset; case-insensitive; wildcard. **Explain Back:** length check làm gì? Invariant “remaining” là gì? Khi xóa key 0 hữu ích?

## Dạng 9 `[MAP-09]` — Gom nhóm `key → array`

**Dấu hiệu nhận dạng:** nhiều record chung group key và mỗi group còn cần danh sách/order. **Brute force bottleneck:** filter toàn input cho từng key lặp công việc; transition khởi tạo bucket đúng một lần rồi push record.

### A. Bản chất

Một key có nhiều record và ta cần giữ record, không chỉ count. Nếu không group, mỗi key lại filter toàn input.

### B. Mental model

Hộp thư theo phòng ban; mỗi lá thư vẫn được giữ trong đúng hộp.

### C. Template tư duy

```text
Key: group key. Value: array records theo thứ tự gặp.
Old: group hoặc undefined.
Update: tạo [] nếu absent, rồi push.
Invariant: mỗi array chứa đúng records của key trong prefix, đúng order.
```

### D. Template code JavaScript

```js
if (!groups.has(key)) groups.set(key, []);
groups.get(key).push(item);
```

### E. Bài mẫu — Gom từ theo ký tự đầu

1. Đề: Map firstChar→words. 2. `[apple,ant,bee]→a:[apple,ant],b:[bee]`. 3. bỏ từng từ vào nhóm. 4. với mỗi key filter input. 5. lặp scan. 6. group một lượt. 7. `wordsByFirstChar`. 8. ensure group rồi push. 9. groups đúng prefix. 10. scan/key/create/push/return. 11. **Code:**

```js
function groupByFirstCharacter(words) {
  const wordsByFirstCharacter = new Map();
  for (const word of words) {
    const firstCharacter = word[0];
    if (!wordsByFirstCharacter.has(firstCharacter)) {
      wordsByFirstCharacter.set(firstCharacter, []);
    }
    wordsByFirstCharacter.get(firstCharacter).push(word);
  }
  return wordsByFirstCharacter;
}
```

12. Tạo array riêng cho từng key; không dùng một `sharedGroup` cho mọi key. 13. **Dry run:**

| Bước | Phần tử/index | State trước | Điều kiện | Hành động | State sau |
| --- | --- | --- | --- | --- | --- |
| 0 | apple/0 | `{}` | a absent | create,push | `{a:[apple]}` |
| 1 | ant/1 | `{a:[apple]}` | a present | push | `{a:[apple,ant]}` |
| 2 | bee/2 | ... | b absent | create,push | thêm `b:[bee]` |

14. `O(n)` time + output space. 15. quên create; dùng chung array; group key sai normalize. 16. Biến thể output chỉ count: value đổi thành number, không giữ records.

**Recall Card `[MAP-09]`:** group giữ items; count chỉ giữ số. **Blank Page:** implement generic groupBy. **Mutation:** sort trong group; unique group; group hai tầng. **Explain Back:** Vì sao count không đủ? Array nào được mutate? Output order đến từ đâu?

## Dạng 10 `[MAP-10]` — Quan hệ `key → Set`

**Dấu hiệu nhận dạng:** mỗi key liên hệ nhiều value nhưng duplicate relation không có ý nghĩa. **Brute force bottleneck:** array bucket làm membership lặp tuyến tính; nested Set cho expected `O(1)` add/has.

### A. Bản chất

Mỗi key có nhiều liên hệ nhưng cặp trùng không được tính lại. `key→array` giữ duplicate; `key→Set` loại duplicate.

### B. Mental model

Mỗi người có danh bạ; một người bạn chỉ được ghi một lần.

### C. Template tư duy

```text
Key: entity. Value: Set các neighbor duy nhất.
Update: ensure Set, add neighbor; nếu hai chiều làm cả hai phía.
Invariant: sau prefix edges, Set chứa đúng neighbor đã xuất hiện.
```

### D. Template code JavaScript

```js
if (!relations.has(key)) relations.set(key, new Set());
relations.get(key).add(neighbor);
```

### E. Bài mẫu — Dựng danh sách bạn bè hai chiều

1. Đề: pairs có thể trùng; dựng Map person→unique friends. 2. `[[a,b],[a,b],[b,c]]`. 3. mỗi edge cập nhật hai danh bạ. 4. arrays + includes. 5. duplicate check tuyến tính. 6. nested Set. 7. friendsByPerson. 8. ensure hai Set rồi add đối tác. 9. graph đúng prefix edges. 10. helper ensure/add both. 11. **Code:**

```js
function buildFriendships(pairs) {
  const friendsByPerson = new Map();
  function addFriend(person, friend) {
    if (!friendsByPerson.has(person)) friendsByPerson.set(person, new Set());
    friendsByPerson.get(person).add(friend);
  }
  for (const [firstPerson, secondPerson] of pairs) {
    addFriend(firstPerson, secondPerson);
    addFriend(secondPerson, firstPerson);
  }
  return friendsByPerson;
}
```

12. Hai lời gọi thể hiện quan hệ hai chiều; bỏ một lời gọi thành directed. Mỗi key phải có `new Set()` riêng. 13. **Dry run:**

| Bước | Phần tử/index | State trước | Điều kiện | Hành động | State sau |
| --- | --- | --- | --- | --- | --- |
| 0 | a-b | `{}` | hai key absent | add hai chiều | `a:{b},b:{a}` |
| 1 | a-b | như trên | đã có edge | Set add no-op | không đổi |
| 2 | b-c | ... | c absent | add hai chiều | `b:{a,c},c:{b}` |

14. trung bình `O(e)` time, `O(v+e)` space. 15. chỉ cập nhật một chiều; shared Set; dùng array rồi đếm duplicate. 16. Biến thể directed follow: chỉ add `from→to`.

**Recall Card `[MAP-10]`:** one-to-many unique → Set. **Blank Page:** two-way helper. **Mutation:** directed; remove edge; mutual friends. **Explain Back:** nested Set khác group array gì? Vì sao duplicate no-op? Self-edge xử lý theo contract nào?

### Template Contrast — `MAP-09` và `MAP-10`

| Dạng | State khác nhau ở đâu? | Condition khác nhau ở đâu? | Transition khác nhau ở đâu? | Dấu hiệu chọn dạng |
| --- | --- | --- | --- | --- |
| `MAP-09` | group array giữ mọi record | chỉ cần group tồn tại | `push`, gồm duplicate | cần order/mọi record |
| `MAP-10` | group Set giữ neighbor unique | membership do Set xử lý | `add`, duplicate no-op | quan hệ/phần tử khác nhau |

## Transfer Test B — Sau `MAP-06..10`

Làm [M03-T02](03_Practice_Ladder.md#m03-t02--cảm-biến-kho) trước khi học dạng chọn cực trị.

## Dạng 11 `[MAP-11]` — Key có value lớn/nhỏ nhất

**Dấu hiệu nhận dạng:** aggregate theo key xong phải chọn winner theo value/tie. **Brute force bottleneck:** sort mọi entry làm thừa full order; transition scan entries và replace best theo comparator đầy đủ.

### A. Bản chất

Map xây dữ liệu; biến `best` chọn đáp án. Không nên sort toàn bộ chỉ để lấy một cực trị.

### B. Mental model

Công-tơ từng ứng viên và một bảng dẫn đầu; hòa điểm phải có luật rõ ràng.

### C. Template tư duy

```text
State: countByKey; firstOrderByKey nếu tie cần; bestKey/bestValue khi quét.
Check: value tốt hơn, hoặc bằng và thắng tie.
Invariant: best là đáp án trong các entry đã quét.
```

### D. Template code JavaScript

```js
for (const [key, value] of valueByKey) {
  if (isBetter(key, value, bestKey, bestValue)) {
    bestKey = key;
    bestValue = value;
  }
}
```

### E. Bài mẫu — Sản phẩm phổ biến nhất

1. Đề: max count, hòa lấy xuất hiện đầu. 2. `[b,a,a,b,c]→b`. 3. đếm rồi chọn. 4. count lại mỗi unique. 5. lặp scan. 6. frequency + argmax. 7. count Map; iteration order Map là order insert đầu. 8. count, rồi update best chỉ khi `count > bestCount`. 9. best đúng các entry đã quét; không update khi hòa giữ first. 10. build; scan entries; strict greater. 11. **Code:**

```js
function mostFrequentFirstTie(values) {
  if (values.length === 0) return null;
  const countByValue = new Map();
  for (const value of values) {
    countByValue.set(value, (countByValue.get(value) ?? 0) + 1);
  }
  let bestValue = null;
  let bestCount = -1;
  for (const [value, count] of countByValue) {
    if (count > bestCount) {
      bestValue = value;
      bestCount = count;
    }
  }
  return bestValue;
}
```

12. `>` chứ không `>=` giữ entry đầu khi hòa; empty cần contract riêng. 13. **Dry run argmax** Map `{b:2,a:2,c:1}`:

| Bước | Phần tử/index | State trước | Điều kiện | Hành động | State sau |
| --- | --- | --- | --- | --- | --- |
| 0 | b:2 | null,-1 | 2>-1 | chọn b | b,2 |
| 1 | a:2 | b,2 | 2>2 sai | giữ | b,2 |
| 2 | c:1 | b,2 | 1>2 sai | giữ | b,2 |

14. `O(n)`/`O(k)`. 15. `>=` đổi tie; sort thừa; bestCount=0 khi count có thể âm ở bài khác. 16. Biến thể hòa lexicographic: condition thêm `count===bestCount && value<bestValue`.

**Recall Card `[MAP-11]`:** Map lưu metric; biến best chọn cực trị; tie nằm trong condition. **Blank Page:** viết condition bằng lời rồi code. **Mutation:** min positive; tie lexicographic; trả top-k (lúc đó sort/heap). **Explain Back:** Vì sao Map order giúp tie first? Khi cần firstOrder riêng? `>` và `>=` đổi gì?

## Dạng 12 `[MAP-12]` — Map kết hợp Simulation

**Dấu hiệu nhận dạng:** event nhắc tới entity bằng id và state phải sống qua nhiều event. **Brute force bottleneck:** tìm entity trong array mỗi command là `O(events·entities)`; transition lookup, validate candidate rồi commit đúng record.

### A. Bản chất

Event gọi đúng thực thể bằng id; Map lưu state hiện tại của từng id. Khó nhất là thứ tự validate và commit.

### B. Mental model

Mỗi tài khoản có một hồ sơ; event mở đúng hồ sơ, kiểm tra giao dịch rồi mới ghi.

### C. Template tư duy

```text
Key: entity id. Value: state hiện tại của entity.
Old: state trước event.
Check: transition có hợp lệ từ old không?
Update: chỉ commit sau khi hợp lệ; delete nếu contract yêu cầu.
Invariant: sau event i, Map phản ánh đúng hệ thống sau prefix 0..i.
```

### D. Template code JavaScript

```js
const oldState = stateById.get(id) ?? initialState;
const nextState = transition(oldState, event);
if (!isValid(nextState)) return invalidResult;
stateById.set(id, nextState);
```

### E. Bài mẫu — Event tồn kho không được âm

1. Đề: inventory ban đầu và delta events; trả index event đầu tiên làm count âm, hoặc -1. 2. `[['a',2]], [['a',-1],['a',-2]]→1`. 3. mở count item, thử delta, reject nếu âm. 4. mỗi event tìm tuyến tính inventory. 5. repeated lookup. 6. Map id→state. 7. countByItem. 8. compute next; check; rồi set. 9. đầu vòng Map là state sau mọi event trước. 10. build; for index; old; next; validate; commit. 11. **Code:**

```js
function firstInvalidInventoryEvent(initialInventory, events) {
  const countByItem = new Map(initialInventory);
  for (let index = 0; index < events.length; index += 1) {
    const [item, delta] = events[index];
    const oldCount = countByItem.get(item) ?? 0;
    const nextCount = oldCount + delta;
    if (nextCount < 0) return index;
    countByItem.set(item, nextCount);
  }
  return -1;
}
```

12. Không set trước validate: dù return ngay, thói quen commit state không hợp lệ gây lỗi khi bài yêu cầu bỏ event và tiếp tục. `??0` là rule: item chưa có coi là 0. 13. **Dry run:**

| Bước | Phần tử/index | State trước | Điều kiện | Hành động | State sau |
| --- | --- | --- | --- | --- | --- |
| init | — | — | — | build | `{a:2}` |
| 0 | a,-1 | `{a:2}` | next=1 hợp lệ | set 1 | `{a:1}` |
| 1 | a,-2 | `{a:1}` | next=-1 sai | return 1 | không commit |

14. `O(initial+events)` time, `O(k)` space. 15. commit trước validate; key chưa có rule mơ hồ; event cùng time chưa sort/tie. 16. Biến thể event invalid bị bỏ qua và tiếp tục: không return; push index lỗi, Map giữ old state.

**Recall Card `[MAP-12]`:** Map định vị entity; event tạo transition; validate rồi commit. **Blank Page:** trace một event invalid. **Mutation:** delete khi zero; cùng timestamp; state object nhiều field. **Explain Back:** old/next khác gì? Khi nào delete key? Event order ảnh hưởng invariant ra sao?

## Dạng 13 `[MAP-13]` — Frequency Map trong cửa sổ

**Dấu hiệu nhận dạng:** multiplicity chỉ tính trong interval động; pointer điều khiển biên còn Map giữ count và zero↔positive transitions.

### A. Bản chất

Map không còn mô tả toàn bộ prefix mà chỉ mô tả đoạn `[left..right]` hiện tại. Mỗi lần biên dịch chuyển phải cập nhật count đối xứng; key có count 0 phải được xóa hoặc tách khỏi `distinctCount`. Không dùng nếu đoạn không liên tiếp hoặc tính hợp lệ không thể phục hồi bằng cách bỏ từ trái.

### B. Mental model

Một phòng có cửa vào bên phải và cửa ra bên trái; bảng số người phải tăng khi vào và giảm khi ra.

### C. Template tư duy

```text
Pattern chính: Sliding Window.
Pattern phụ/lưu state: MAP-03 frequency.
Duyệt: right tăng; left tăng khi cần co.
State: countByValue, left, distinctCount/best.
Transition: add right; remove left; xóa key khi count về 0.
Invariant: Map là frequency chính xác của values[left..right].
```

### D. Template code JavaScript

```js
function addToWindow(value) {
  countByValue.set(value, (countByValue.get(value) ?? 0) + 1);
}

function removeFromWindow(value) {
  const nextCount = countByValue.get(value) - 1;
  if (nextCount === 0) countByValue.delete(value);
  else countByValue.set(value, nextCount);
}
```

### E. Bài mẫu — Số loại trong mỗi đoạn dài K

1. **Đề:** với mỗi cửa sổ liên tiếp dài `k`, trả số value khác nhau.  
2. **I/O:** `[1,2,1,3], k=3 → [2,3]`.  
3. **Kể lại:** cửa sổ trượt một ô; cần số key đang có count dương.  
4. **Brute force:** tạo Set mới cho từng cửa sổ.  
5. **Bottleneck:** `k-1` phần tử giao nhau bị đếm lại.  
6. **Vì sao hợp:** giữ frequency của cửa sổ và chỉ đổi hai biên.  
7. **State:** `countByValue`, `left`, `distinctCounts`.  
8. **Transition:** add current; nếu size vượt k, remove value tại left rồi tăng left.  
9. **Invariant:** sau co, Map đúng cửa sổ dài tối đa k kết thúc tại right.  
10. **Pseudocode:** scan right/add; nếu quá dài remove left; đủ k thì push Map.size.  
11. **Full code:**

```js
function distinctCountsInFixedWindows(values, k) {
  if (k <= 0 || k > values.length) return [];
  const countByValue = new Map();
  const result = [];
  let left = 0;

  for (let right = 0; right < values.length; right += 1) {
    const enteredValue = values[right];
    countByValue.set(enteredValue, (countByValue.get(enteredValue) ?? 0) + 1);

    if (right - left + 1 > k) {
      const exitedValue = values[left];
      const nextCount = countByValue.get(exitedValue) - 1;
      if (nextCount === 0) countByValue.delete(exitedValue);
      else countByValue.set(exitedValue, nextCount);
      left += 1;
    }

    if (right - left + 1 === k) result.push(countByValue.size);
  }
  return result;
}
```

12. Add phải xảy ra trước kiểm soát size theo invariant đã chọn; remove phải dùng `values[left]` cũ trước `left += 1`. Không delete count 0 làm `Map.size` sai.  
13. **Dry run:**

| Bước | Phần tử/index | State trước | Điều kiện | Hành động | State sau |
| --- | --- | --- | --- | --- | --- |
| 0 | 1/0 | `{}`, L0 | len<3 | add 1 | `{1:1}`, L0 |
| 1 | 2/1 | `{1:1}` | len<3 | add 2 | `{1:1,2:1}` |
| 2 | 1/2 | `{1:1,2:1}` | len=3 | add 1; push 2 | `{1:2,2:1}` |
| 3 | 3/3 | `{1:2,2:1}` | len=4 | add3; remove1; push3 | `{1:1,2:1,3:1}`, L1 |

14. **Complexity:** `O(n)` time, `O(min(k, distinct))` space.  
15. **Lỗi:** không decrement phần tử ra; giữ key count0; tăng left trước khi đọc exited; nhận `k=0`.  
16. **Biến thể:** cửa sổ co giãn không quá K loại: dùng `while (Map.size > k)` thay condition độ dài.

**Recall Card `[MAP-13]`:** Map chỉ đúng cho window; add right/remove left đối xứng; key count0 phải biến mất. **Blank Page:** trace `[1,1,2],k=2`. **Mutation:** fixed→variable; distinct→max frequency; đếm cửa sổ valid. **Explain Back:** pattern nào duyệt? Map tối ưu gì? Vì sao delete zero?

### Template Contrast — `MAP-03` và `MAP-13`

| Dạng | State khác nhau ở đâu? | Condition khác nhau ở đâu? | Transition khác nhau ở đâu? | Dấu hiệu chọn dạng |
| --- | --- | --- | --- | --- |
| `MAP-03` | frequency prefix/toàn input | không có biên trái | chỉ increment | thống kê toàn cục |
| `MAP-13` | frequency `[left..right]` | window length/validity | increment khi vào, decrement/delete khi ra | thống kê đoạn liên tiếp động |

## Dạng 14 `[MAP-14]` — Nhiều Map biểu diễn nhiều loại state

**Dấu hiệu nhận dạng:** một key cần nhiều quan hệ có nghĩa khác nhau; tách Map theo invariant thay vì nhét dữ liệu mơ hồ vào một value.

### A. Bản chất

Một Map không nên chứa value “túi hỗn hợp” khi các truy vấn cần hai ánh xạ có nghĩa độc lập, chẳng hạn `name→score` và `name→firstOrder`, hoặc hai chiều `id→position` và `position→id`. Các Map phải được cập nhật như một transaction để invariant không lệch.

### B. Mental model

Hai mục lục nhìn cùng dữ liệu theo hai hướng; sửa hồ sơ mà quên một mục lục khiến tra cứu mâu thuẫn.

### C. Template tư duy

```text
Map A trả lời câu hỏi gì? Map B trả lời câu hỏi gì?
Key chung hay ánh xạ ngược?
Event cần đọc old state từ Map nào?
Check xong phải cập nhật những Map nào cùng nhau?
Invariant liên-map là gì?
```

### D. Template code JavaScript

```js
const oldPosition = positionByName.get(name);
const occupant = nameByPosition.get(nextPosition);
if (occupant !== undefined) return false;

positionByName.set(name, nextPosition);
nameByPosition.delete(oldPosition);
nameByPosition.set(nextPosition, name);
```

### E. Bài mẫu — Di chuyển người trên dãy ghế

1. **Đề:** tên người là duy nhất, ghế là số nguyên duy nhất. Event `[name,newSeat]`; trả index event đầu tiên chuyển tới ghế đã có người, không có trả `-1`.  
2. **I/O:** `[['An',1],['Bình',2]]`, `[['An',3],['Bình',3]] → 1`.  
3. **Kể lại:** cần tra nhanh ghế của người và người ở ghế.  
4. **Brute force:** Map name→seat rồi quét mọi entry để tìm occupant.  
5. **Bottleneck:** reverse lookup lặp lại.  
6. **Vì sao hợp:** hai Map cho hai hướng lookup trung bình O(1).  
7. **State:** `seatByName`, `nameBySeat`.  
8. **Transition:** validate seat mới; delete reverse cũ; set hai hướng mới.  
9. **Invariant:** `seatByName.get(name)=seat` khi và chỉ khi `nameBySeat.get(seat)=name`.  
10. **Pseudocode:** build hai Map; mỗi event check occupant; nếu hợp lệ xóa reverse cũ và set cả hai; cuối -1.  
11. **Full code:**

```js
function firstInvalidSeatMove(initialAssignments, events) {
  const seatByName = new Map();
  const nameBySeat = new Map();
  for (const [name, seat] of initialAssignments) {
    seatByName.set(name, seat);
    nameBySeat.set(seat, name);
  }

  for (let index = 0; index < events.length; index += 1) {
    const [name, nextSeat] = events[index];
    const oldSeat = seatByName.get(name);
    const occupant = nameBySeat.get(nextSeat);
    if (occupant !== undefined && occupant !== name) return index;

    nameBySeat.delete(oldSeat);
    seatByName.set(name, nextSeat);
    nameBySeat.set(nextSeat, name);
  }
  return -1;
}
```

12. Validate trước mutation tránh làm hỏng hai Map. `occupant !== undefined` dựa trên contract tên không phải `undefined`; nếu value có thể undefined phải dùng `has`. Xóa reverse cũ trước khi ghi reverse mới.  
13. **Dry run:**

| Bước | Phần tử/index | State trước | Điều kiện | Hành động | State sau |
| --- | --- | --- | --- | --- | --- |
| init | — | An→1,B→2 / 1→An,2→B | — | build | hai Map nhất quán |
| 0 | An→3 | ghế3 trống | hợp lệ | xóa1; set An→3,3→An | B→2,An→3 |
| 1 | B→3 | ghế3 có An | invalid | return 1 | không đổi |

14. **Complexity:** `O(initial+events)` time, `O(people)` space.  
15. **Lỗi:** chỉ cập nhật một Map; mutate trước validate; không cho người “chuyển” tới ghế hiện tại của chính họ; truthiness với key/value hợp lệ.  
16. **Biến thể:** swap hai người: transition phải cập nhật bốn entry như một transaction thay vì reject occupant.

**Recall Card `[MAP-14]`:** mỗi Map trả một loại query; invariant phải nối chúng; validate rồi cập nhật đồng bộ. **Blank Page:** viết invariant hai chiều. **Mutation:** swap; score+firstOrder; cache id↔index. **Explain Back:** vì sao một Map chưa đủ? Thứ tự mutation nào an toàn? Khi nào object state tốt hơn nhiều Map?

## Transfer Test C — Sau `MAP-11..14`

Làm [M03-T03](03_Practice_Ladder.md#m03-t03--cảnh-báo-thiết-bị). Đề đổi tên biến, dùng nested state và trả một threshold count thay vì Map size trực tiếp.

## Recall tổng hợp chương

Đóng file và trả lời: câu hỏi tương lai là membership/count/first/latest/group/relation/window/entity-state? Key và value có nghĩa gì? Check có dùng dữ liệu trước current không? Transition là conditional write, overwrite, increment, push, add, add/remove đối xứng hay validate-commit?
