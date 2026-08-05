# Solutions — Chapter 06 Two Pointers

[← Practice](../chapters/06_two_pointers/03_Practice_Ladder.md) · [Index](../06_Two_Pointers.md)

> Mỗi lời giải dùng nhãn `signal → state → check/update → invariant`. Đóng file rồi code lại từ trắng.

## Tầng 1 — Nhận diện

### S06-R01 `[TP-01]`
**Signal:** sorted + pair target. **State:** `left,right,sum`. **Move:** sum nhỏ tăng left, lớn giảm right. **Invariant:** nếu có đáp án, một đáp án còn trong đoạn; value tại biên bị bỏ đã thất bại ngay cả với đối tác cực trị.

### S06-R02 `[TP-01]`
**Signal:** đối xứng hai biên, không phải order số. **State:** `left,right`. Mismatch false; match dịch cả hai. **Invariant:** mọi cặp ký tự ngoài đoạn đã bằng nhau.

### S06-R03 `[TP-02]`
**Signal:** in-place + stable filter. `read` duyệt, `write` là valid length; nonnegative thì copy. Prefix output là filter đúng của input prefix.

### S06-R04 `[TP-02]`
Compact các số khác 0 rồi có thể điền zero vào tail. Swap hai đầu phá order; vì contract stable nên chọn read/write.

### S06-R05 `[TP-03]`
Sorted làm duplicate kề nhau. Seed `write=1`; chỉ copy khi current khác `values[write-1]`. Empty trả 0.

### S06-R06 `[TP-03]`
Giữ current nếu `write < 2 || current !== values[write-2]`. Nếu bằng ô cách hai vị trí, prefix đã có đủ hai bản sao.

### S06-R07 `[TP-04]`
`i,j,out`; emit smaller, equal có thể chọn A trước, sau loop nối tail. Output là merge đúng của hai prefix đã tiêu thụ.

### S06-R08 `[TP-04]`
Equal emit và tăng cả hai; smaller tăng phía đó. Mỗi occurrence được dùng tối đa một lần nên multiplicity là min count.

### S06-R09 `[TP-05]`
Clone + numeric sort; fixed outer, left/right inner; skip fixed duplicate và hai phía sau hit. O(n²), clone giữ input.

### S06-R10 `[TP-01/TP-05]`
Ngoài `left,right,sum` giữ `{difference,pair}`. Sau khi xét candidate: sum nhỏ tăng left, ngược lại giảm right; tie so lexicographic.

### S06-R11 `[TP-06]`
Hai pointer tìm hai item sai vùng rồi swap. Prefix âm và suffix không âm là invariant; không stable.

### S06-R12 `[TP-02]`
Phải stable nên không dùng partition hai đầu. Có thể tạo output `evens.concat(odds)`; nếu buộc in-place với O(1) thì bài khó hơn compact đơn pass vì cần bảo toàn cả hai nhóm.

## Tầng 2 — Điền khuyết

### S06-F01 `[TP-01]`
`left += 1` và `right -= 1`. Sum nhỏ loại left; sum lớn loại right.

### S06-F02 `[TP-02]`
Ba chỗ là `write`, `write`. Full core: `values[write] = values[read]; write += 1;`.

### S06-F03 `[TP-04]`
Equal: `i += 1; j += 1`; smaller: `i += 1`; else `j += 1`.

## Tầng 3 — Dựng logic

### S06-L01 `[TP-03]`
**State:** `write` valid length, `read` current. **Check:** giữ nếu `write < k || current !== values[write-k]`. **Update:** copy rồi tăng. **Invariant:** prefix chứa đúng `min(k,count)` của mỗi value đã đọc. `k<=0` trả 0.

```js
function keepAtMostK(sortedValues, k) {
  if (k <= 0) return 0;
  let write = 0;
  for (let read = 0; read < sortedValues.length; read += 1) {
    if (write >= k && sortedValues[read] === sortedValues[write - k]) continue;
    sortedValues[write++] = sortedValues[read];
  }
  return write;
}
```

### S06-L02 `[TP-04]`
Emit candidate chỉ khi khác output cuối; advance smaller hoặc both khi equal. Invariant: output là union unique của prefixes.

```js
function unionSortedUnique(a, b) {
  const output = [];
  let i = 0, j = 0;
  const emit = (value) => {
    if (output.length === 0 || output[output.length - 1] !== value) output.push(value);
  };
  while (i < a.length || j < b.length) {
    if (j >= b.length || (i < a.length && a[i] < b[j])) emit(a[i++]);
    else if (i >= a.length || b[j] < a[i]) emit(b[j++]);
    else { emit(a[i]); i += 1; j += 1; }
  }
  return output;
}
```

### S06-L03 `[TP-06]`
Prefix `<pivot`, suffix `>=pivot`; swap hai item sai. Không stable.

```js
function partitionByPivot(values, pivot) {
  let left = 0, right = values.length - 1;
  while (left <= right) {
    while (left <= right && values[left] < pivot) left += 1;
    while (left <= right && values[right] >= pivot) right -= 1;
    if (left <= right) {
      [values[left], values[right]] = [values[right], values[left]];
      left += 1; right -= 1;
    }
  }
  return left;
}
```

## Transfer Test A

### S06-T01 — Chuẩn hóa log `[TP-02/TP-03]`
**Signal:** stable filter + sorted duplicate groups. **State:** `read,write`; giữ khi `value>=cutoff` và khác output last. **Invariant:** output prefix là sequence unique đúng của các timestamp hợp lệ đã đọc.

```js
function normalizeTimestamps(timestamps, cutoff) {
  let write = 0;
  for (let read = 0; read < timestamps.length; read += 1) {
    const value = timestamps[read];
    if (value < cutoff) continue;
    if (write > 0 && timestamps[write - 1] === value) continue;
    timestamps[write++] = value;
  }
  return write;
}
```

## Tầng 4 — Pseudocode

### S06-P01 `[TP-01]`
Length<2 trả `null`. Xét candidate trước move; update nếu distance nhỏ hơn hoặc tie pair lexicographic nhỏ hơn. Sorted pair tự tăng nên pair `[leftValue,rightValue]` đã canonical. O(n)/O(1).

```js
function closestPair(sortedValues, target) {
  if (sortedValues.length < 2) return null;
  let left = 0, right = sortedValues.length - 1;
  let best = null;
  while (left < right) {
    const pair = [sortedValues[left], sortedValues[right]];
    const sum = pair[0] + pair[1];
    const difference = Math.abs(sum - target);
    if (!best || difference < best.difference ||
        (difference === best.difference && (pair[0] < best.pair[0] ||
         (pair[0] === best.pair[0] && pair[1] < best.pair[1])))) {
      best = { difference, pair };
    }
    if (sum < target) left += 1;
    else right -= 1;
  }
  return best.pair;
}
```

### S06-P02 `[TP-04]`
Time nhỏ hơn emit phía đó; hòa dùng A vì stability contract; nối tail. Output đúng merge của prefixes; O(n+m).

```js
function mergeRecords(a, b) {
  const output = [];
  let i = 0, j = 0;
  while (i < a.length && j < b.length) {
    if (a[i].time <= b[j].time) output.push(a[i++]);
    else output.push(b[j++]);
  }
  return output.concat(a.slice(i), b.slice(j));
}
```

### S06-P03 `[TP-05]`
Giống Three Sum zero nhưng so với `target`. Clone/sort, skip fixed duplicate, hit thì emit và skip cả hai groups. Complexity O(n²), không mutate.

```js
function threeSumTarget(values, target) {
  const a = [...values].sort((x, y) => x - y);
  const output = [];
  for (let fixed = 0; fixed < a.length - 2; fixed += 1) {
    if (fixed > 0 && a[fixed] === a[fixed - 1]) continue;
    let left = fixed + 1, right = a.length - 1;
    while (left < right) {
      const sum = a[fixed] + a[left] + a[right];
      if (sum < target) left += 1;
      else if (sum > target) right -= 1;
      else {
        output.push([a[fixed], a[left], a[right]]);
        const lv = a[left], rv = a[right];
        while (left < right && a[left] === lv) left += 1;
        while (left < right && a[right] === rv) right -= 1;
      }
    }
  }
  return output;
}
```

## Tầng 5 — Tự code

### S06-C01 `[TP-02]`
```js
function compactInPlace(values, keep) {
  let write = 0;
  for (let read = 0; read < values.length; read += 1) {
    if (!keep(values[read])) continue;
    values[write++] = values[read];
  }
  return write;
}
```
**Invariant:** prefix là stable filter của phần đã đọc. O(n)/O(1); tail không có contract.

### S06-C02 `[TP-04]`
```js
function intersectSorted(a, b) {
  const output = [];
  let i = 0, j = 0;
  while (i < a.length && j < b.length) {
    if (a[i] === b[j]) { output.push(a[i]); i += 1; j += 1; }
    else if (a[i] < b[j]) i += 1;
    else j += 1;
  }
  return output;
}
```
Smaller không thể match current/later value bên kia; equal tiêu thụ một occurrence mỗi bên. O(n+m).

### S06-C03 `[TP-05]`
```js
function threeSumZero(values) {
  return threeSumTarget(values, 0);
}
```
Dùng implementation tự chứa của S06-P03. Signal/sort/state/invariant và duplicate discipline giữ nguyên; O(n²), O(n) clone/output.

## Tầng 6 — Biến thể

### S06-V01 `[TP-03]`
Implementation là `keepAtMostK` tại S06-L01. Revealing tests: `([],2)→0`, `([1,1,1],2)→prefix[1,1]`, `k=0→0`. O(n)/O(1).

### S06-V02 `[TP-04]`
```js
function symmetricDifferenceSorted(a, b) {
  const output = [];
  let i = 0, j = 0;
  const skip = (array, index) => {
    const value = array[index];
    while (index < array.length && array[index] === value) index += 1;
    return index;
  };
  while (i < a.length && j < b.length) {
    if (a[i] === b[j]) { i = skip(a, i); j = skip(b, j); }
    else if (a[i] < b[j]) { output.push(a[i]); i = skip(a, i); }
    else { output.push(b[j]); j = skip(b, j); }
  }
  while (i < a.length) { output.push(a[i]); i = skip(a, i); }
  while (j < b.length) { output.push(b[j]); j = skip(b, j); }
  return output;
}
```
Equal groups biến mất; smaller group chỉ có ở một bên nên emit một lần. O(n+m).

### S06-V03 `[TP-06]`
```js
function partitionOddFirst(values) {
  let left = 0, right = values.length - 1;
  while (left <= right) {
    while (left <= right && Math.abs(values[left] % 2) === 1) left += 1;
    while (left <= right && values[right] % 2 === 0) right -= 1;
    if (left <= right) {
      [values[left], values[right]] = [values[right], values[left]];
      left += 1; right -= 1;
    }
  }
  return left;
}
```
Mọi inner access có guard `left<=right`; do đó empty/all-one-group đều kết thúc an toàn. Không stable, O(n)/O(1).

## Transfer Test B

### S06-T02 — Ghép và lọc lịch sử `[TP-04/TP-02]`
**Signal:** sorted streams + filter. **State:** `i,j,output`; chọn next theo time/A-first, rồi chỉ push nếu valid. **Invariant:** output là stable filtered merge của prefixes đã tiêu thụ.

```js
function mergeValidEvents(a, b) {
  const output = [];
  let i = 0, j = 0;
  while (i < a.length || j < b.length) {
    let event;
    if (j >= b.length || (i < a.length && a[i].time <= b[j].time)) event = a[i++];
    else event = b[j++];
    if (event.valid) output.push(event);
  }
  return output;
}
```

## Mini-test

### S06-M01.1 `[TP-01]`
```js
function isPhrasePalindrome(text) {
  let left = 0, right = text.length - 1;
  const isAlphaNumeric = (char) => /[a-z0-9]/i.test(char);
  while (left < right) {
    while (left < right && !isAlphaNumeric(text[left])) left += 1;
    while (left < right && !isAlphaNumeric(text[right])) right -= 1;
    if (text[left].toLowerCase() !== text[right].toLowerCase()) return false;
    left += 1; right -= 1;
  }
  return true;
}
```
Invariant: các ký tự alphanumeric đã vượt qua hai biên khớp đối xứng. O(n), regex theo contract ASCII.

### S06-M01.2 `[TP-04]`
Dùng `unionSortedUnique` tại S06-L02; O(n+m), output tăng/unique nhờ emit guard.

### S06-M01.3 `[TP-06]`
Dùng `partitionByPivot` tại S06-L03; prefix `<pivot`, suffix `>=pivot`, boundary là `left`.

