# Map/Set phần lõi từ gốc: không còn đoán biến cần lưu

[← Lộ trình mastery](00_Exam_Mastery_Guide.md) · [Phần kết hợp](02_Combinations.md) · [Lời giải bài thật](../../solutions/03_Map_Set_Programmers_Solutions.md)

Trang này thay cách học “nhìn thấy Map là dùng Map” bằng ba câu hỏi khó nhất trong đề thật: **có bao nhiêu bản sao**, **lần nào của một value đang quan trọng**, và **current cần tìm gì ở quá khứ**.

## 1. Frequency: vì sao Set sai trong bài có tên trùng?

### Bài toán

Có danh sách tất cả người tham gia và danh sách người đã hoàn thành. Chính xác một lượt xuất hiện bị thiếu trong danh sách hoàn thành. Tên có thể trùng. Trả tên còn thiếu.

```text
participants = ["an", "binh", "an"]
completions  = ["an", "binh"]
đáp án      = "an"
```

### Cách nghĩ sai rất dễ gặp

```js
const names = new Set(participants);
for (const name of completions) names.delete(name);
```

`Set` chỉ giữ mỗi tên một lần. Sau khi xóa `"an"`, nó quên mất rằng còn một `"an"` khác chưa hoàn thành. Đề không hỏi “tên này có tồn tại không?”, mà hỏi “mỗi tên còn thiếu bao nhiêu lượt?”. Đó là frequency.

### Tự dựng state

`remainingByName` có ý nghĩa:

> Với mỗi name, còn bao nhiêu lượt tham gia chưa được ghép với một lượt hoàn thành.

Ban đầu đếm toàn bộ participants. Mỗi completion tiêu thụ một lượt, nên giảm 1. Cuối cùng key còn count dương là đáp án.

```js
function findIncompleteParticipant(participants, completions) {
  const remainingByName = new Map();

  // Mỗi participant tạo thêm một lượt chưa hoàn thành.
  for (const name of participants) {
    remainingByName.set(name, (remainingByName.get(name) ?? 0) + 1);
  }

  // Mỗi completion ghép và lấy đi đúng một lượt.
  for (const name of completions) {
    remainingByName.set(name, remainingByName.get(name) - 1);
  }

  for (const [name, remaining] of remainingByName) {
    if (remaining > 0) return name;
  }

  return null;
}
```

### Chạy tay

| Bước | Name | `remainingByName` sau bước |
| --- | --- | --- |
| đếm | `an` | `an → 1` |
| đếm | `binh` | `an → 1`, `binh → 1` |
| đếm | `an` | `an → 2`, `binh → 1` |
| tiêu thụ | `an` | `an → 1`, `binh → 1` |
| tiêu thụ | `binh` | `an → 1`, `binh → 0` |

`an → 1` chính là một lượt chưa ghép. Không cần biết participant nào là người thứ mấy vì contract chỉ cần name.

### Mutation quan trọng: hai multiset có giống nhau không?

Nếu đề hỏi hai mảng có cùng số lượng mỗi value, có thể:

1. đếm mảng A;
2. đi qua B và giảm count;
3. nếu key không có hoặc count thành âm, trả false;
4. cuối cùng mọi count phải bằng 0.

Đừng chỉ so `map.size`: `a → 2, b → 0` và `a → 1, b → 1` đều có size 2 nhưng không cùng multiset.

### Test buộc phải có

```text
["a", "a"], ["a"]       → "a"
["a", "b"], ["b"]       → "a"
["a", "b", "b"], ["b","a"] → "b"
```

Nếu code hỏng test 1, bạn đã dùng Set hoặc giảm count sai.

---

## 2. First index vs latest index: Map không tự biết “lần nào”

### Bài toán A — lần đầu

Với mỗi từ, trả vị trí đầu tiên nó xuất hiện.

```text
["may", "hoc", "may", "code"]
→ may → 0, hoc → 1, code → 3
```

Map cần giữ một lời hứa:

> `firstIndexByWord.get(word)` luôn là index nhỏ nhất từng gặp của word.

Vì vậy chỉ ghi nếu key chưa tồn tại.

```js
function firstIndexByWord(words) {
  const firstIndex = new Map();

  for (let index = 0; index < words.length; index += 1) {
    const word = words[index];
    if (!firstIndex.has(word)) {
      firstIndex.set(word, index);
    }
  }

  return firstIndex;
}
```

Nếu bỏ `if`, code vẫn chạy nhưng nghĩa biến đã đổi thành latest index. Lỗi này khó phát hiện nếu sample không có duplicate.

### Bài toán B — khoảng cách đến lần trước gần nhất

Cho mảng, trả khoảng cách lặp nhỏ nhất của cùng một value; không có lặp trả `-1`.

```text
[1, 2, 1, 1] → 1
```

Ở index 3, current `1` cần biết **lần gần nhất trước đó** là index 2, không cần biết lần đầu là 0. Vì vậy phải ghi đè sau khi dùng index cũ.

```js
function shortestRepeatGap(values) {
  const latestIndex = new Map();
  let answer = Infinity;

  for (let index = 0; index < values.length; index += 1) {
    const value = values[index];

    if (latestIndex.has(value)) {
      const previousIndex = latestIndex.get(value);
      answer = Math.min(answer, index - previousIndex);
    }

    // Từ vòng sau, current là lần gần nhất của value.
    latestIndex.set(value, index);
  }

  return answer === Infinity ? -1 : answer;
}
```

### Đặt hai code cạnh nhau

| Ý nghĩa Map | Khi key đã có |
| --- | --- |
| first index | giữ nguyên, không `set` |
| latest index | dùng index cũ xong rồi `set` index mới |

Đừng học điều này bằng `if` hay không `if`. Học bằng câu nghĩa của biến. Một dòng code là hậu quả của câu đó.

### Test buộc phải có

```text
[1, 2, 1, 1] → 1
[1, 2, 3]    → -1
[5, 5]       → 1
```

---

## 3. Complement: Two Sum không phải “Map thần kỳ”

### Bài toán

Trả hai index khác nhau có tổng bằng target; không có thì `null`.

```text
values = [2, 7, 11, 15], target = 9 → [0, 1]
```

Brute force thử current với mọi phần tử bên trái/phải. Với n lớn, cách đó `O(n²)`.

### Câu biến đề thành Map

Khi current là `value`, current chỉ cần một đối tác duy nhất:

```text
needed = target - value
```

Vậy Map phải giữ:

> `indexByValue` cho biết một value đã xuất hiện ở index nào trong prefix bên trái.

```js
function findTwoSumIndexes(values, target) {
  const indexByValue = new Map();

  for (let index = 0; index < values.length; index += 1) {
    const value = values[index];
    const needed = target - value;

    // Check quá khứ trước: needed phải thuộc prefix, không phải current.
    if (indexByValue.has(needed)) {
      return [indexByValue.get(needed), index];
    }

    indexByValue.set(value, index);
  }

  return null;
}
```

### Dry run với duplicate

`values = [3, 3]`, `target = 6`:

| index | value | needed | Map trước check | Kết quả |
| ---: | ---: | ---: | --- | --- |
| 0 | 3 | 3 | rỗng | chưa có, ghi `3 → 0` |
| 1 | 3 | 3 | `3 → 0` | trả `[0,1]` |

`values = [3]`, target 6: Map rỗng lúc check nên trả `null`. Đó là lý do check trước `set`.

### Khi nào không dùng skeleton này nguyên xi?

- Đề cần **mọi** cặp: phải quản lý duplicate/count và tránh đếm lặp.
- Mảng đã sort và chỉ cần một cặp: two pointers có thể ít bộ nhớ hơn.
- Đề cần ba số: sort + outer loop + two pointers thường rõ hơn Map ba tầng.

Pattern không phải giấy phép dùng Map ở mọi bài có chữ “sum”.

## 4. Ba bài mini không có nhãn

1. `orders` là array `{customerId, amount}`. Trả customer có tổng amount cao nhất, hòa lấy customer gặp đầu tiên. Viết rõ Map lưu gì và biến nào xử lý tie.
2. `events` là `[deviceId, status]`; status `ON` hai lần liên tiếp là invalid. Trả index invalid đầu. Map hay Set hay một biến? Giải thích.
3. Hai array strings có cùng multiset không? Viết test mà Set sẽ trả đáp án sai.

Sau khi tự làm, dùng [Practice Ladder](03_Practice_Ladder.md) để luyện không nhìn pattern. Những dạng group, `Map<key, Set>`, Map trong simulation và window tiếp tục ở [Phần kết hợp](02_Combinations.md).
