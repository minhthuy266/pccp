# Map/Set phần lõi — Từ membership đến khoảng cách

[← Index](../../03_Map_Set.md) · [Tiếp: phần kết hợp →](02_Combinations.md)

Mỗi bài mẫu đi theo 16 mục. Code “khung” mô tả họ bài; “full code” chỉ giải bài mẫu.

## Dạng 1 `[MAP-01]` — Kiểm tra đã xuất hiện (`Set` membership)

### A. Bản chất

Ta cần trả lời lặp lại câu “giá trị này đã nằm trong phần bên trái chưa?”. Không có Set, mỗi phần tử phải quét lại prefix, thành `O(n²)`. Dấu hiệu: duplicate, visited, đã dùng, tồn tại. Không nên dùng khi cần count/index hoặc miền số nhỏ dùng boolean array rõ hơn.

### B. Mental model

Set là sổ điểm danh: chỉ ghi tên đã đến, không ghi số lần hay ghế ngồi.

### C. Template tư duy

```text
Duyệt: từ trái sang phải.
State: seen chứa đúng các value trước index hiện tại.
Check: seen.has(current)?
Update: seen.add(current).
Invariant: đầu vòng i, seen = values[0..i-1].
Return: theo contract; true khi gặp lại, false sau vòng.
```

### D. Template code

```js
const seen = new Set();
for (const currentValue of values) {
  if (seen.has(currentValue)) return true; // đọc quá khứ
  seen.add(currentValue);                  // rồi mới ghi hiện tại
}
return false;
```

Nếu `add` trước `has`, phần tử luôn tìm thấy chính nó và test một phần tử cũng trả sai.

### E. Bài mẫu — Có phần tử lặp không?

1. **Đề:** trả `true` nếu array có hai vị trí khác nhau cùng value.  
2. **I/O:** `[4,2,4] → true`, `[4,2] → false`.  
3. **Kể lại:** tìm lần gặp thứ hai của bất kỳ value nào.  
4. **Brute force:** so mọi cặp `i < j`.  
5. **Bottleneck:** cùng câu hỏi membership bị quét lại.  
6. **Vì sao hợp:** Set trả lời membership trung bình `O(1)`.  
7. **State:** `seen`, chỉ chứa prefix đã xử lý.  
8. **Transition:** nếu chưa thấy thì thêm current.  
9. **Invariant:** trước index `i`, Set chứa đúng `values[0..i-1]`.  
10. **Pseudocode:** tạo Set; với mỗi value: nếu có thì true, nếu không thêm; hết vòng false.  
11. **Full code:**

```js
function hasDuplicate(values) {
  const seen = new Set();
  for (const currentValue of values) {
    if (seen.has(currentValue)) return true;
    seen.add(currentValue);
  }
  return false;
}
```

12. **Luồng code:** `has` đọc prefix; `add` mở rộng prefix. Bỏ `add` thì `[4,4]` sai; đổi thứ tự thì `[4]` sai.  
13. **Dry run:**

| Bước | Phần tử/index | State trước | Điều kiện | Hành động | State sau |
| --- | --- | --- | --- | --- | --- |
| 0 | `4/0` | `{}` | chưa có 4 | add 4 | `{4}` |
| 1 | `2/1` | `{4}` | chưa có 2 | add 2 | `{4,2}` |
| 2 | `4/2` | `{4,2}` | có 4 | return true | không đổi |

14. **Complexity:** trung bình `O(n)` time, `O(n)` space.  
15. **Lỗi:** check sau add; dùng `.includes` trong loop; object key theo reference.  
16. **Biến thể:** cần value lặp đầu tiên thì return `currentValue`, không đổi state.

**Recall Card `[MAP-01]`:** dùng khi hỏi đã thấy; state là Set prefix; check rồi add; lỗi: sai thứ tự, nhầm reference, cần count nhưng dùng Set.  
**Blank Page Test:** đóng file, viết ý tưởng/state/pseudocode/template và test `[0,0]`.  
**Mutation Drill:** trả index lần lặp; bỏ qua duplicate liên tiếp; xóa value khi gặp event `leave`. Phần return/transition thay đổi.  
**Explain Back:** Vì sao hai index khác nhau? Vì sao check trước add? Khi boolean array tốt hơn?

## Dạng 2 `[MAP-02]` — Loại trùng, giữ thứ tự

### A. Bản chất

Ta vừa cần biết đã thấy chưa, vừa cần xây output. Không dùng `new Set(values)` khi còn rule chuẩn hóa/filter hoặc cần giữ representation gốc.

### B. Mental model

Set là danh sách kiểm soát cửa; output là hàng người đã được nhận theo thứ tự đầu tiên.

### C. Template tư duy

```text
State: seen + uniqueValues.
Check: nếu chưa có normalizedKey.
Update: add key và push giá trị cần xuất.
Invariant: output chứa đúng đại diện đầu tiên của mỗi key trong prefix.
```

### D. Template code JavaScript

```js
const seen = new Set();
const uniqueValues = [];
for (const currentValue of values) {
  if (!seen.has(currentValue)) {
    seen.add(currentValue);
    uniqueValues.push(currentValue);
  }
}
```

### E. Bài mẫu — Email duy nhất

1. **Đề:** bỏ email trùng, giữ lần đầu. 2. **I/O:** `['a','b','a'] → ['a','b']`. 3. **Kể lại:** chỉ lần đầu được vào output. 4. **Brute:** `output.includes`. 5. **Bottleneck:** quét output lặp lại. 6. **Pattern:** Set membership + array output. 7. **State:** `seen`, `result`. 8. **Transition:** chưa thấy → add và push. 9. **Invariant:** result đúng cho prefix. 10. **Pseudocode:** scan/check/add+push/return. 11. **Code:**

```js
function uniqueInOrder(emails) {
  const seen = new Set();
  const result = [];
  for (const email of emails) {
    if (seen.has(email)) continue;
    seen.add(email);
    result.push(email);
  }
  return result;
}
```

12. `continue` bảo vệ hai update đi cùng nhau; bỏ `seen.add` làm duplicate lọt. 13. **Dry run:**

| Bước | Phần tử/index | State trước | Điều kiện | Hành động | State sau |
| --- | --- | --- | --- | --- | --- |
| 0 | a/0 | `{}`, `[]` | mới | add, push | `{a}`, `[a]` |
| 1 | b/1 | `{a}`, `[a]` | mới | add, push | `{a,b}`, `[a,b]` |
| 2 | a/2 | `{a,b}`, `[a,b]` | trùng | skip | không đổi |

14. `O(n)`/`O(n)`. 15. Lỗi: chỉ Set rồi mất representation gốc; normalize sau check; push nhưng quên add. 16. Biến thể không phân biệt hoa thường: key là `email.toLowerCase()`, output vẫn push email gốc đầu tiên.

**Recall Card `[MAP-02]`:** membership + output; add và push cùng nhánh. **Blank Page:** viết bản normalize. **Mutation:** giữ lần cuối; đếm số bị loại; chỉ unique sau filter. **Explain Back:** Set và output khác vai trò gì? Normalize lúc nào? Vì sao Map không bắt buộc?

## Dạng 3 `[MAP-03]` — Đếm tần suất (`Map<key,count>`)

### A. Bản chất

Ta cần số lần, nên Set thiếu thông tin. Nếu không lưu count, mỗi truy vấn lại quét array.

### B. Mental model

Mỗi key có một ô công-tơ riêng.

### C. Template tư duy

```text
Key: value/category cần đếm.
Value: số lần key xuất hiện trong prefix.
Thông tin cũ: oldCount, mặc định 0.
Update: oldCount + 1.
Invariant: sau mỗi vòng, Map là frequency đúng của prefix đã xử lý.
```

### D. Template code JavaScript

```js
const countByValue = new Map();
for (const value of values) {
  const oldCount = countByValue.get(value) ?? 0;
  countByValue.set(value, oldCount + 1);
}
```

### E. Bài mẫu — Phần tử xuất hiện đúng một lần

1. Đề: trả các value có count 1 theo thứ tự đầu vào. 2. `[2,1,2,3] → [1,3]`. 3. Đếm rồi lọc. 4. Với mỗi value, đếm lại cả array. 5. `O(n²)`. 6. Frequency Map tái dùng count. 7. `countByValue`. 8. tăng count; lượt hai filter. 9. Sau lượt một count đúng toàn array. 10. build count; filter count 1. 11. **Code:**

```js
function valuesAppearingOnce(values) {
  const countByValue = new Map();
  for (const value of values) {
    const oldCount = countByValue.get(value) ?? 0;
    countByValue.set(value, oldCount + 1);
  }
  return values.filter((value) => countByValue.get(value) === 1);
}
```

12. Lượt hai chỉ hợp lệ sau khi đã biết count toàn cục; cố return ở lần gặp đầu chưa biết tương lai. 13. **Dry run lượt đếm:**

| Bước | Phần tử/index | State trước | Điều kiện | Hành động | State sau |
| --- | --- | --- | --- | --- | --- |
| 0 | 2/0 | `{}` | old=0 | set 1 | `{2:1}` |
| 1 | 1/1 | `{2:1}` | old=0 | set 1 | `{2:1,1:1}` |
| 2 | 2/2 | `{2:1,1:1}` | old=1 | set 2 | `{2:2,1:1}` |
| 3 | 3/3 | `{2:2,1:1}` | old=0 | set 1 | `{2:2,1:1,3:1}` |

14. `O(n)` time/space. 15. `get(key) || 0` chỉ an toàn vì count không âm nhưng `??` diễn đạt đúng “chưa có”; lọc trên Map làm đổi order mong muốn; quên lượt hai. 16. Biến thể trả index ký tự unique đầu tiên: lượt hai scan index rồi return.

**Recall Card `[MAP-03]`:** cần “bao nhiêu” → Map count; old default 0. **Blank Page:** build frequency không nhìn. **Mutation:** decrement inventory; count theo key biến đổi; tìm count max. **Explain Back:** Vì sao Set thiếu? Vì sao hai lượt? `??` khác `||` ra sao?

### Template Contrast — `MAP-01` và `MAP-03`

| Dạng | State khác nhau ở đâu? | Condition khác nhau ở đâu? | Transition khác nhau ở đâu? | Dấu hiệu chọn dạng |
| --- | --- | --- | --- | --- |
| `MAP-01` | Set chỉ có membership | `has` đủ quyết định | `add` | đã gặp/tồn tại |
| `MAP-03` | Map giữ multiplicity | đọc count cũ | `set(old+1)` | bao nhiêu lần |

## Dạng 4 `[MAP-04]` — Lưu index đầu tiên

### A. Bản chất

Mục tiêu là lịch sử sớm nhất; ghi đè sẽ phá dữ liệu cần giữ. Không dùng dạng này khi tương lai cần lần gần nhất.

### B. Mental model

Đóng dấu ngày đăng ký đầu tiên; hồ sơ đến sau không được sửa dấu.

### C. Template tư duy

```text
Key: value. Value: firstIndex.
Check: !map.has(value).
Update: chỉ set khi chưa có.
Invariant: mỗi entry là index nhỏ nhất của key trong prefix.
```

### D. Template code JavaScript

```js
if (!firstIndexByValue.has(value)) {
  firstIndexByValue.set(value, index);
}
```

### E. Bài mẫu — Vị trí đầu tiên của từng từ

1. Đề: trả Map word→first index. 2. `['a','b','a'] → a:0,b:1`. 3. lần sau không sửa. 4. Với mỗi word quét từ đầu. 5. lặp scan. 6. Map cache đáp án. 7. firstIndexByWord. 8. set nếu absent. 9. entry luôn là min index. 10. scan, has, conditional set. 11. **Code:**

```js
function firstPositions(words) {
  const firstIndexByWord = new Map();
  for (let index = 0; index < words.length; index += 1) {
    const word = words[index];
    if (!firstIndexByWord.has(word)) firstIndexByWord.set(word, index);
  }
  return firstIndexByWord;
}
```

12. Phải dùng `has`: index 0 là falsy, `if (!get(word))` sẽ ghi đè. 13. **Dry run:**

| Bước | Phần tử/index | State trước | Điều kiện | Hành động | State sau |
| --- | --- | --- | --- | --- | --- |
| 0 | a/0 | `{}` | absent | set a→0 | `{a:0}` |
| 1 | b/1 | `{a:0}` | absent | set b→1 | `{a:0,b:1}` |
| 2 | a/2 | `{a:0,b:1}` | present | không ghi | không đổi |

14. `O(n)`/`O(k)`. 15. `get` thay `has`; luôn set; lưu value thay index. 16. Biến thể first index thỏa condition: chỉ set khi condition true và absent.

**Recall Card `[MAP-04]`:** first = conditional write. **Blank Page:** test key ở index 0. **Mutation:** latest index; first positive index; first pair. **Explain Back:** Tại sao `has` bắt buộc? Invariant chứng minh min thế nào? Khi không cần index?

## Dạng 5 `[MAP-05]` — Lưu index gần nhất

### A. Bản chất

Tương lai cần lần gần nhất, nên dữ liệu cũ phải bị ghi đè sau khi đã dùng. Không dùng first index vì nó ngày càng xa current.

### B. Mental model

Một bảng “lần check-in cuối”: lần mới thay lần cũ.

### C. Template tư duy

```text
Value: latestIndex trước hiện tại.
Check: đọc latest để tạo output.
Update: luôn set current index sau check.
Invariant đầu vòng: Map lưu lần cuối trong prefix [0..i-1].
```

### D. Template code JavaScript

```js
if (latestIndexByValue.has(value)) {
  usePreviousIndex(latestIndexByValue.get(value), index);
}
latestIndexByValue.set(value, index);
```

### E. Bài mẫu — Khoảng cách về lần trước

1. Đề: mỗi index trả khoảng cách tới cùng value gần nhất bên trái, chưa có `-1`. 2. `[1,2,1,1] → [-1,-1,2,1]`. 3. hỏi lần trước nằm đâu. 4. quét ngược mỗi index. 5. `O(n²)`. 6. latest Map trả lời `O(1)`. 7. latestIndexByValue + result. 8. read, push distance, set current. 9. đầu vòng latest thuộc prefix. 10. scan/read/output/update. 11. **Code:**

```js
function distanceToPrevious(values) {
  const latestIndexByValue = new Map();
  const distances = [];
  for (let index = 0; index < values.length; index += 1) {
    const value = values[index];
    if (latestIndexByValue.has(value)) {
      distances.push(index - latestIndexByValue.get(value));
    } else {
      distances.push(-1);
    }
    latestIndexByValue.set(value, index);
  }
  return distances;
}
```

12. Set sau push để `latest` là vị trí khác bên trái; set trước làm mọi distance 0. 13. **Dry run:**

| Bước | Phần tử/index | State trước | Điều kiện | Hành động | State sau |
| --- | --- | --- | --- | --- | --- |
| 0 | 1/0 | `{}` | absent | push -1; set | `{1:0}` |
| 1 | 2/1 | `{1:0}` | absent | push -1; set | `{1:0,2:1}` |
| 2 | 1/2 | `{1:0,2:1}` | latest=0 | push 2; set | `{1:2,2:1}` |
| 3 | 1/3 | `{1:2,2:1}` | latest=2 | push 1; set | `{1:3,2:1}` |

14. `O(n)`/`O(k)`. 15. update trước check; không ghi đè; truthiness với index 0. 16. Biến thể trả index trước thay vì distance: push `get(value)`.

**Recall Card `[MAP-05]`:** latest = read rồi overwrite. **Blank Page:** dry run `[0,0]`. **Mutation:** first distance; next occurrence (scan phải); max gap. **Explain Back:** Vì sao overwrite đúng? Tại sao check trước update? Scan phải đổi invariant thế nào?

### Template Contrast — `MAP-04` và `MAP-05`

| Dạng | State khác nhau ở đâu? | Condition khác nhau ở đâu? | Transition khác nhau ở đâu? | Dấu hiệu chọn dạng |
| --- | --- | --- | --- | --- |
| `MAP-04` | index nhỏ nhất | absent mới ghi | conditional set | đầu tiên/sớm nhất |
| `MAP-05` | index lớn nhất prefix | đọc old trước | luôn overwrite | gần nhất/lần trước |

## Transfer Test A — Sau `MAP-01..05`

Làm [M03-T01](03_Practice_Ladder.md#m03-t01--thẻ-ra-vào) trước khi học tiếp. Không dùng khung `state/check/update` cho sẵn.

## Dạng 6 `[MAP-06]` — Khoảng cách giữa các lần xuất hiện

### A. Bản chất

Khoảng cách liên tiếp chỉ cần latest; khoảng cách đầu-cuối cần first; mọi khoảng cách cần group indices. Chọn state theo đúng contract.

### B. Mental model

Muốn thời gian chờ gần nhất chỉ giữ lần hẹn cuối; muốn lịch sử đầy đủ mới giữ toàn bộ lịch.

### C. Template tư duy

```text
State tối thiểu cho min adjacent gap: latestIndexByValue + bestGap.
Check: nếu đã có latest, candidate = i - latest.
Update: bestGap = min; rồi latest = i.
Invariant: bestGap là nhỏ nhất trong mọi cặp liên tiếp đã hình thành trong prefix.
```

### D. Template code JavaScript

```js
if (latestIndexByValue.has(value)) {
  const candidateGap = index - latestIndexByValue.get(value);
  bestGap = Math.min(bestGap, candidateGap);
}
latestIndexByValue.set(value, index);
```

### E. Bài mẫu — Khoảng cách lặp nhỏ nhất

1. Đề: min `j-i` với `values[i]===values[j]`, không có trả -1. 2. `[5,1,5,5]→1`. 3. mỗi lần gặp lại tạo gap với lần gần nhất. 4. mọi cặp. 5. quadratic. 6. Với index hiện tại, lần gần nhất cho gap nhỏ nhất; lần cũ hơn xa hơn. 7. latest + bestGap. 8. check candidate/update best, rồi overwrite latest. 9. best đúng cho prefix. 10. scan/read candidate/min/set/return. 11. **Code:**

```js
function minimumRepeatGap(values) {
  const latestIndexByValue = new Map();
  let bestGap = Infinity;
  for (let index = 0; index < values.length; index += 1) {
    const value = values[index];
    if (latestIndexByValue.has(value)) {
      const gap = index - latestIndexByValue.get(value);
      bestGap = Math.min(bestGap, gap);
    }
    latestIndexByValue.set(value, index);
  }
  return bestGap === Infinity ? -1 : bestGap;
}
```

12. So với latest là đủ vì mọi occurrence cũ hơn có index nhỏ hơn, gap lớn hơn; bỏ overwrite sẽ chỉ đo từ first. 13. **Dry run:**

| Bước | Phần tử/index | State trước | Điều kiện | Hành động | State sau |
| --- | --- | --- | --- | --- | --- |
| 0 | 5/0 | `{}`,∞ | absent | set | `{5:0}`,∞ |
| 1 | 1/1 | `{5:0}`,∞ | absent | set | `{5:0,1:1}`,∞ |
| 2 | 5/2 | latest=0,∞ | gap=2 | best=2; set | `5:2`,2 |
| 3 | 5/3 | latest=2,2 | gap=1 | best=1; set | `5:3`,1 |

14. `O(n)`/`O(k)`. 15. giữ first; return Infinity; không chứng minh chỉ cần adjacent occurrence. 16. Biến thể max first-last gap: giữ first, candidate `i-first`, không overwrite first.

**Recall Card `[MAP-06]`:** loại gap quyết định first/latest/all indices. **Blank Page:** chứng minh latest đủ cho min. **Mutation:** max gap; gap ≤k; trả pair. **Explain Back:** Vì sao không xét mọi cặp? Khi cần group indices? Sentinel nào an toàn?
