# Prefix Sum từ gốc: biến quá khứ thành phép trừ — `PRE-01..05`

[← Chương 07](../../07_Sliding_Window_Prefix_Sum.md)

## Ý tưởng một câu

Nếu đề hỏi tổng của nhiều đoạn trong cùng một mảng, đừng cộng lại từng đoạn. Hãy cộng từ đầu mảng một lần, rồi lấy **hai tổng đã biết trừ nhau**.

Không cần thuộc tên Prefix Sum trước. Hãy xem bài nhỏ này.

## 1. Vì sao cộng lại từng đoạn là lãng phí? `[PRE-01]`

Cho:

```js
const sales = [3, 1, 4, 1, 5];
```

Bạn được hỏi liên tiếp:

```text
Tổng từ index 1 đến 3?  1 + 4 + 1 = 6
Tổng từ index 0 đến 4?  3 + 1 + 4 + 1 + 5 = 14
Tổng từ index 2 đến 4?  4 + 1 + 5 = 10
```

Nếu mỗi query lại chạy một vòng lặp, các số `1`, `4`, `1` bị cộng đi cộng lại. Khi query nhiều, phần lặp đó rất tốn.

### Ta lưu lịch sử gì?

Tạo `prefix`, trong đó `prefix[k]` nghĩa là:

> tổng của **k phần tử đầu tiên**: `values[0]` đến `values[k - 1]`.

Vì vậy:

| `k` | Những phần tử đã tính | `prefix[k]` |
| ---: | --- | ---: |
| 0 | chưa có phần tử nào | 0 |
| 1 | `[3]` | 3 |
| 2 | `[3, 1]` | 4 |
| 3 | `[3, 1, 4]` | 8 |
| 4 | `[3, 1, 4, 1]` | 9 |
| 5 | toàn bộ mảng | 14 |

Code xây `prefix`:

```js
function buildPrefixSums(values) {
  const prefix = Array(values.length + 1).fill(0);

  for (let index = 0; index < values.length; index += 1) {
    prefix[index + 1] = prefix[index] + values[index];
  }

  return prefix;
}
```

`prefix` dài hơn `values` đúng một ô. Ô `prefix[0] = 0` không thừa: nó biểu diễn “tổng trước khi lấy phần tử nào”, giúp mọi công thức dùng chung, kể cả đoạn bắt đầu tại index 0.

## 2. Tổng đoạn bằng hiệu hai lịch sử `[PRE-02]`

Muốn tổng đoạn đóng `[left..right]`:

```text
prefix[right + 1] = tổng từ đầu đến right
prefix[left]      = tổng từ đầu đến trước left
------------------------------------------------ trừ
                   = tổng từ left đến right
```

Ví dụ `sales`, đoạn `[1..3]`:

```js
const prefix = [0, 3, 4, 8, 9, 14];
const sum = prefix[3 + 1] - prefix[1]; // 9 - 3 = 6
```

Không phải là `prefix[right] - prefix[left]`: công thức đó bỏ mất `values[right]`.

```js
function rangeSum(prefix, left, right) {
  return prefix[right + 1] - prefix[left];
}
```

### Chạy tay một query đầu mảng

Đoạn `[0..2]` là `3 + 1 + 4 = 8`:

```js
prefix[2 + 1] - prefix[0] // 8 - 0 = 8
```

Đây là lý do phải có ô 0. Nếu prefix bắt đầu bằng `values[0]`, đoạn bắt đầu tại 0 luôn cần một nhánh đặc biệt; nhánh đặc biệt là nơi sinh off-by-one.

### Khi nào dùng được?

Prefix sum hợp nhất khi:

- mảng không đổi;
- có nhiều query tổng/đếm trên đoạn;
- phép gộp có thể lấy hiệu, như tổng, số lượng, XOR (theo phép đảo phù hợp).

Nếu mảng bị update xen kẽ với query, prefix đơn giản không còn đủ vì một update làm sai mọi prefix phía sau. Đề đó cần cấu trúc khác hoặc đề chỉ cho update trước rồi query sau.

### Tự kiểm tra

Với `values = [2, -1, 3, 0, 4]`, tự dựng prefix và trả lời:

```text
[0..0] = ?
[1..3] = ?
[0..4] = ?
```

Đừng mở code. Vẽ hàng `prefix` trước.

---

## 3. Prefix không chỉ dùng cho tổng `[PRE-03]`

Bạn có thể lưu số lượng phần tử thuộc một loại trong prefix.

Ví dụ query: “trong đoạn `[left..right]` có bao nhiêu số chẵn?”

```js
function buildEvenPrefix(values) {
  const evenPrefix = Array(values.length + 1).fill(0);

  for (let index = 0; index < values.length; index += 1) {
    const isEven = values[index] % 2 === 0;
    evenPrefix[index + 1] = evenPrefix[index] + (isEven ? 1 : 0);
  }

  return evenPrefix;
}

function countEvenInRange(evenPrefix, left, right) {
  return evenPrefix[right + 1] - evenPrefix[left];
}
```

Điểm quan trọng: `evenPrefix[k]` không phải tổng số chẵn; nó là **số phần tử chẵn trong k phần tử đầu**. Sau đó vẫn trừ hai lịch sử như tổng bình thường.

Nếu query hỏi cả số chẵn, số âm và số bằng 0, bạn có thể có ba prefix arrays. Đừng dùng một prefix mơ hồ rồi đoán ý nghĩa nó ở mỗi chỗ.

---

## 4. Bài “tổng đoạn bằng target” — Prefix Sum + Map `[PRE-05]`

Đây là bước nhiều người chỉ nhớ mẹo `sum - target`, nhưng không hiểu vì sao.

### Bài toán

Đếm có bao nhiêu đoạn con liên tiếp có tổng bằng `target`.

```text
values = [1, 2, 1, 2], target = 3
Các đoạn đúng: [1,2] ở index 0..1, [2,1] ở 1..2, [1,2] ở 2..3
Đáp án: 3
```

Gọi `currentPrefix` là tổng từ đầu mảng đến current index. Nếu một đoạn `[start..end]` có tổng target:

```text
prefix[end + 1] - prefix[start] = target
prefix[start] = prefix[end + 1] - target
```

Khi đang đứng ở `end`, ta chỉ cần hỏi:

> Trước đây đã có bao nhiêu prefix bằng `currentPrefix - target`?

Mỗi prefix như vậy tạo đúng một đoạn kết thúc tại `end` có tổng target.

### Vì sao Map phải bắt đầu với `0 → 1`?

Trước khi đọc mảng, đã tồn tại một prefix rỗng có tổng 0. Nó cho phép bắt được đoạn bắt đầu tại index 0.

Ví dụ `[3, 1]`, target 3. Khi đọc `3`, currentPrefix là 3. Cần tìm prefix `3 - 3 = 0`; `0 → 1` giúp đếm đoạn `[0..0]`.

```js
function countSubarraysWithTargetSum(values, target) {
  const countByPrefix = new Map();
  countByPrefix.set(0, 1);

  let currentPrefix = 0;
  let answer = 0;

  for (const value of values) {
    currentPrefix += value;

    const neededPrefix = currentPrefix - target;
    answer += countByPrefix.get(neededPrefix) ?? 0;

    countByPrefix.set(
      currentPrefix,
      (countByPrefix.get(currentPrefix) ?? 0) + 1,
    );
  }

  return answer;
}
```

Thứ tự **check trước, rồi mới ghi currentPrefix** là rất quan trọng. Ta đang tìm prefix nằm trước đoạn hiện tại. Nếu ghi current trước, khi `target = 0` bạn có thể đếm sai một prefix rỗng ở vị trí không hợp lệ.

### Khi nào nên chọn prefix + Map thay vì sliding window?

Nếu mảng có số âm, tổng cửa sổ không còn tăng/giảm đều khi dịch biên. Sliding window không có quy tắc an toàn để biết nên co trái hay mở phải. Prefix + Map vẫn đúng vì nó dựa vào đẳng thức tổng, không dựa vào tính đơn điệu.

---

## 5. Nhiều update trên đoạn, cuối mới cần kết quả `[PRE-04]`

Ví dụ có mảng 5 ô toàn 0. Mỗi lệnh “cộng `delta` cho mọi index từ `left` đến `right`”. Nếu mỗi lệnh sửa từng ô, nhiều lệnh dài sẽ lặp rất nhiều.

Thay vì sửa toàn đoạn ngay, ta chỉ ghi **biên nơi hiệu lực bắt đầu và kết thúc**:

```text
update [left..right] thêm delta
diff[left]      += delta     // từ đây trở đi bắt đầu thêm
diff[right + 1] -= delta     // sau right thì ngừng thêm
```

Sau tất cả update, lấy prefix sum của `diff` để khôi phục giá trị từng ô.

```js
function applyRangeAdds(length, updates) {
  const diff = Array(length + 1).fill(0);

  for (const [left, right, delta] of updates) {
    diff[left] += delta;
    if (right + 1 < diff.length) {
      diff[right + 1] -= delta;
    }
  }

  const result = Array(length);
  let runningDelta = 0;

  for (let index = 0; index < length; index += 1) {
    runningDelta += diff[index];
    result[index] = runningDelta;
  }

  return result;
}
```

Ví dụ `length=5`, updates `[[1,3,10], [2,4,2]]`:

```text
index:        0   1   2   3   4
kết quả:      0  10  12  12   2
```

Đây là dạng ngược với range query:

- query nhiều, array cố định → xây prefix rồi trừ;
- update nhiều, cuối mới hỏi → ghi boundary vào diff rồi prefix lại.

## 6. Bảng chọn nhanh và lỗi phải thuộc bằng hiểu

| Nếu đề nói… | Chọn | Bẫy chính |
| --- | --- | --- |
| nhiều tổng đoạn trên mảng cố định | prefix array | nhầm `right` với `right + 1` |
| đếm item loại X trong nhiều đoạn | prefix count | prefix không nói rõ đang đếm gì |
| số đoạn có tổng target, có số âm | prefix + Map | quên `0 → 1`, sai check/update order |
| nhiều lần cộng đoạn, cuối trả array | difference array | quên dừng hiệu lực tại `right + 1` |
| một cửa sổ đang dịch và thêm/bớt rẻ | sliding window | chưa định nghĩa cửa sổ hiện tại |

## 7. Bài recall không xem tài liệu

1. Viết `rangeSum` từ `prefix` cho đoạn đóng `[left..right]`.
2. Với `[1, -1, 1]`, target `0`, chạy tay `countSubarraysWithTargetSum`. Vì sao phải lưu count chứ không chỉ lưu Set prefix?
3. Mảng length 6, update `[0..5] += 4`, sau đó `[2..3] += -1`: viết `diff` trước khi lấy prefix.

Bạn sẵn sàng qua Sliding Window khi làm được ba câu trên và giải thích được: “Prefix sum là lịch sử của cái gì?”
