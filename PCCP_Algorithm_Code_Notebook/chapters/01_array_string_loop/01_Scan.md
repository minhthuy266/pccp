# Quét mảng một lần: từ đề bài đến biến cần lưu — `ARR-01..04`

[← Trang chính Chương 01](../../01_Array_String_Loop.md) · [Phần 2: tạo kết quả và xử lý đoạn liên tiếp →](02_Sequences.md)

## Học phần này để làm gì?

Rất nhiều bài PCCP cơ bản chỉ cần đi qua mảng từ trái sang phải đúng một lần. Phần khó không nằm ở cú pháp `for`. Phần khó là trả lời được:

> Sau khi đọc một phần tử, mình phải nhớ lại điều gì để xử lý phần tử tiếp theo?

Thông tin cần nhớ đó được gọi là **trạng thái** (`state`). Tạm thời đừng cố học thuộc từ này. Trong từng bài dưới đây, ta sẽ tự tìm ra biến cần lưu trước, rồi mới gọi tên nó.

Phần này có bốn kiểu câu hỏi:

| Đề hỏi gì? | Ta cần nhớ gì khi đang duyệt? | Dạng |
| --- | --- | --- |
| Tổng hoặc tích của nhiều phần tử | Kết quả đã gộp đến hiện tại | `ARR-01` |
| Phần tử tốt nhất/lớn nhất/nhỏ nhất | Ứng viên tốt nhất hiện tại | `ARR-02` |
| Có bao nhiêu phần tử thỏa điều kiện | Số lượng đã tìm thấy | `ARR-03` |
| Có tồn tại không / tất cả có đúng không | Chỉ cần một bằng chứng để kết luận | `ARR-04` |

Hãy học từng dạng theo thứ tự: **đọc bài nhỏ → đoán biến cần lưu → xem code → chạy tay → tự viết lại**.

---

## 1. Gộp tất cả phần tử vào một kết quả `[ARR-01]`

### Bài toán mở đầu

Cho mảng điểm:

```js
const scores = [6, 8, 5];
```

Tính tổng điểm. Kết quả là `19`.

Khi đọc từ trái sang phải:

- đọc `6`: tổng đang là `6`;
- đọc thêm `8`: tổng đang là `14`;
- đọc thêm `5`: tổng đang là `19`.

Ta không cần nhớ lại từng số đã đi qua. Ta chỉ cần một biến `total` chứa tổng hiện tại.

```js
function sumScores(scores) {
  let total = 0;

  for (const score of scores) {
    total += score;
  }

  return total;
}
```

### Vì sao `total` bắt đầu bằng `0`?

Trước khi đọc số nào, tổng phải là `0`. Nhờ vậy mảng rỗng cũng trả đúng `0`.

Nếu bài hỏi tích, ta thường bắt đầu bằng `1`:

```js
function multiplyAll(numbers) {
  let product = 1;

  for (const number of numbers) {
    product *= number;
  }

  return product;
}
```

Khởi tạo tích bằng `0` là sai, vì nhân số nào với `0` cũng vẫn bằng `0`.

### Khi công thức cần vị trí

Tính tổng có trọng số:

```text
values[0] × 1 + values[1] × 2 + values[2] × 3 + ...
```

Lúc này ta cần cả giá trị và vị trí, nên dùng vòng lặp theo `index`.

```js
function weightedSum(values) {
  let total = 0;

  for (let index = 0; index < values.length; index += 1) {
    const position = index + 1;
    total += values[index] * position;
  }

  return total;
}
```

Chạy tay với `[3, 1, 2]`:

| `index` | Giá trị | Trọng số `index + 1` | `total` trước | `total` sau |
| ---: | ---: | ---: | ---: | ---: |
| 0 | 3 | 1 | 0 | 3 |
| 1 | 1 | 2 | 3 | 5 |
| 2 | 2 | 3 | 5 | 11 |

Sau mỗi vòng, `total` bằng tổng đóng góp của tất cả phần tử đã đọc. Câu này chính là **điều luôn đúng của vòng lặp** (sau này ta gọi là `invariant`). Nó giải thích vì sao đi hết mảng thì `total` là đáp án.

### Cách nhận ra dạng này

Đề thường có các từ: “tổng”, “tích”, “tổng điểm”, “tổng chi phí”, “checksum”, “tổng có trọng số”. Mỗi phần tử đóng góp vào cùng một kết quả.

Khung cần nhớ:

```js
let answer = giaTriBanDau;

for (const value of values) {
  answer = gop(answer, value);
}

return answer;
```

`gop` không phải hàm có sẵn. Nó đại diện cho phép tính mà đề yêu cầu, ví dụ `answer + value` hoặc `answer * value`.

### Lỗi hay gặp

- Khởi tạo sai: tổng bắt đầu bằng `1`, tích bắt đầu bằng `0`.
- Công thức dùng vị trí 1, 2, 3 nhưng code dùng thẳng index 0, 1, 2.
- Đặt `let total = 0` bên trong vòng lặp làm tổng bị xóa ở mỗi bước.
- Dùng `Number` khi đề cho số quá lớn; lúc đó phải xem có cần `BigInt` hoặc lấy modulo không.

### Tự kiểm tra

Đóng phần code và tự viết hàm tính tổng bình phương:

```text
[2, 3, 4] → 2² + 3² + 4² = 29
[] → 0
```

Nếu bạn chưa nói được câu “biến của mình có ý nghĩa gì sau mỗi vòng”, hãy chạy tay lại trước khi sang dạng 2.

### Framework supplement: state, transition và biến thể

**Brute force bottleneck:** nếu với mỗi prefix lại cộng từ đầu, cùng phần tử bị đọc lặp và tổng thời gian thành `O(n²)`. **State sentence:** `total` là kết quả gộp của đúng prefix đã xử lý. **Transition:** đọc một value rồi gán `total = combine(total, value)`; invariant này cho phép mỗi phần tử chỉ góp đúng một lần. Complexity là `O(n)` time, `O(1)` extra space.

**Biến thể:** tổng/tích/min/max đổi identity và phép combine; modulo phải áp dụng sau mỗi bước; `BigInt` không được trộn với `Number`. Counterexample quan trọng: product khởi tạo 0 làm mọi non-empty input trả 0. Transfer: tự đổi `sumScores` thành checksum có trọng số mà không đổi skeleton scan.

---

## 2. Giữ ứng viên tốt nhất `[ARR-02]`

### Bài toán mở đầu

Cho mảng điểm không rỗng. Trả về vị trí của điểm lớn nhất. Nếu có nhiều điểm bằng nhau, lấy vị trí xuất hiện đầu tiên.

```text
[7, 9, 9, 4] → 1
```

Ta cần trả về **vị trí**, nhưng muốn so sánh lại cần biết **điểm** của người đang dẫn đầu. Vì vậy phải lưu hai biến:

- `bestValue`: điểm lớn nhất đã thấy;
- `bestIndex`: vị trí của điểm đó.

Phần tử đầu tiên tạm thời là người dẫn đầu. Ta bắt đầu so từ phần tử thứ hai.

```js
function indexOfMaximum(values) {
  let bestValue = values[0];
  let bestIndex = 0;

  for (let index = 1; index < values.length; index += 1) {
    const currentValue = values[index];

    if (currentValue > bestValue) {
      bestValue = currentValue;
      bestIndex = index;
    }
  }

  return bestIndex;
}
```

Chạy tay:

| Vị trí đang xét | Giá trị | Người dẫn đầu trước đó | Có thay không? | Người dẫn đầu sau đó |
| ---: | ---: | --- | --- | --- |
| khởi tạo | 7 | chưa có | chọn phần tử đầu | `7` tại `0` |
| 1 | 9 | `7` tại `0` | có, vì `9 > 7` | `9` tại `1` |
| 2 | 9 | `9` tại `1` | không, vì `9 > 9` sai | `9` tại `1` |
| 3 | 4 | `9` tại `1` | không | `9` tại `1` |

### Dấu `>` hay `>=` quyết định cách xử lý hòa

Đây là chỗ rất hay sai trong phòng thi:

- dùng `>`: giá trị bằng nhau đến sau **không thay** → giữ vị trí đầu tiên;
- dùng `>=`: giá trị bằng nhau đến sau **có thay** → giữ vị trí cuối cùng.

Ví dụ cần vị trí cuối cùng của số lớn nhất:

```js
if (currentValue >= bestValue) {
  bestValue = currentValue;
  bestIndex = index;
}
```

### Khi có nhiều luật ưu tiên

Cho danh sách đơn hàng `{id, priority, distance}`. Chọn đơn có:

1. `priority` lớn hơn;
2. nếu bằng `priority`, chọn `distance` nhỏ hơn;
3. nếu vẫn bằng nhau, giữ đơn xuất hiện trước.

Đừng viết ba lần cập nhật rời rạc. Hãy gom toàn bộ luật vào một biến `isBetter`, rồi thay cả ứng viên trong một lần.

```js
function chooseOrder(orders) {
  if (orders.length === 0) return null;

  let bestOrder = orders[0];

  for (let index = 1; index < orders.length; index += 1) {
    const currentOrder = orders[index];
    const hasHigherPriority = currentOrder.priority > bestOrder.priority;
    const samePriorityButNearer =
      currentOrder.priority === bestOrder.priority &&
      currentOrder.distance < bestOrder.distance;

    const isBetter = hasHigherPriority || samePriorityButNearer;

    if (isBetter) {
      bestOrder = currentOrder;
    }
  }

  return bestOrder.id;
}
```

Ta không thêm điều kiện “bằng hết thì lấy phần tử trước”, vì chỉ cập nhật khi ứng viên mới tốt hơn. Khi hòa hoàn toàn, `bestOrder` cũ tự động được giữ lại.

### Cách nhận ra dạng này

Đề hỏi “lớn nhất”, “nhỏ nhất”, “tốt nhất”, “ưu tiên nhất”, hoặc “trả vị trí/phần tử thắng cuộc”. Đặc biệt chú ý các câu bắt đầu bằng “nếu bằng nhau thì...”.

Khung cần nhớ:

```js
let best = values[0];

for (let index = 1; index < values.length; index += 1) {
  const current = values[index];
  if (currentTotHonBest) {
    best = current;
  }
}

return best;
```

### Vì sao không sort rồi lấy phần tử đầu?

Sort vẫn có thể cho đáp án, nhưng thường không cần thiết:

- quét một lần mất `O(n)` thời gian;
- sort mất `O(n log n)`;
- `sort()` của JavaScript còn sửa trực tiếp mảng ban đầu;
- sau khi sort, vị trí ban đầu có thể bị mất.

### Lỗi hay gặp

- Đề cho mảng rỗng nhưng vẫn đọc `values[0]`.
- Cập nhật `bestIndex` mà quên cập nhật `bestValue`, hoặc ngược lại.
- Dùng `>=` khi đề muốn giữ lần xuất hiện đầu tiên.
- Chỉ so luật ưu tiên thứ nhất và quên luật xử lý hòa.

### Tự kiểm tra

Viết hàm trả vị trí **cuối cùng** chứa giá trị **nhỏ nhất**.

```text
[4, 2, 7, 2] → 3
```

Tự trả lời trước khi code: khởi tạo ở đâu, vòng lặp bắt đầu từ đâu, dùng `<` hay `<=`?

### Framework supplement: state, invariant và biến thể

**Brute force bottleneck:** sort để lấy một winner làm thừa full order `O(n log n)` và có thể mất index gốc. **State sentence:** `bestValue/bestIndex` là ứng viên thắng theo toàn bộ comparator trên prefix đã đọc. **Transition:** chỉ replace cả record khi current tốt hơn; equality update hay không chính là luật tie. Invariant bảo đảm mọi phần tử đã xét đều không tốt hơn best. Complexity `O(n)` time, `O(1)` extra space.

**Biến thể:** min/max, first/last tie và comparator nhiều key chỉ đổi predicate `isBetter`. Counterexample cập nhật value mà quên index tạo một record không từng tồn tại trong input. Transfer: chọn record theo score giảm, time tăng, index tăng.

---

## 3. Đếm phần tử thỏa điều kiện `[ARR-03]`

### Bài toán mở đầu

Đếm số dương nằm ở vị trí chẵn.

```text
[-1, 5, 3, 2, 4] → 2
```

Các vị trí chẵn là `0`, `2`, `4`. Trong đó `3` và `4` là số dương, nên đáp án là `2`.

Ta cần một biến `count`:

- bắt đầu bằng `0`, vì chưa xét phần tử nào;
- tăng thêm `1` khi phần tử hiện tại thỏa **cả hai** điều kiện;
- không thay đổi khi phần tử không thỏa.

```js
function countPositiveAtEvenIndex(values) {
  let count = 0;

  for (let index = 0; index < values.length; index += 1) {
    const isEvenIndex = index % 2 === 0;
    const isPositive = values[index] > 0;

    if (isEvenIndex && isPositive) {
      count += 1;
    }
  }

  return count;
}
```

Chạy tay:

| `index` | Giá trị | Vị trí chẵn? | Số dương? | `count` sau bước này |
| ---: | ---: | --- | --- | ---: |
| 0 | -1 | có | không | 0 |
| 1 | 5 | không | có | 0 |
| 2 | 3 | có | có | 1 |
| 3 | 2 | không | có | 1 |
| 4 | 4 | có | có | 2 |

Sau mỗi vòng, `count` đúng bằng số phần tử thỏa điều kiện trong đoạn đã đọc.

### Phân biệt “đếm” và “tính tổng”

Hai dạng đều có một biến số, nhưng cách cập nhật khác nhau:

| Đề hỏi | Cập nhật |
| --- | --- |
| Có bao nhiêu phần tử hợp lệ? | `count += 1` |
| Tổng giá trị của các phần tử hợp lệ? | `total += value` |
| Tổng tiền phạt của câu sai? | `totalPenalty += penalties[index]` |

Ví dụ vừa đếm số câu sai, vừa tính tổng điểm phạt:

```js
function summarizeWrongAnswers(answers, penalties) {
  let wrongCount = 0;
  let totalPenalty = 0;

  for (let index = 0; index < answers.length; index += 1) {
    if (answers[index] === false) {
      wrongCount += 1;
      totalPenalty += penalties[index];
    }
  }

  return { wrongCount, totalPenalty };
}
```

Một vòng lặp có thể giữ nhiều biến, miễn là bạn nói rõ ý nghĩa của từng biến.

### Cách nhận ra dạng này

Đề hỏi “có bao nhiêu”, “đếm số lượng”, “số lần xuất hiện”, và việc một phần tử có được tính hay không có thể quyết định ngay khi đọc nó.

Khung cần nhớ:

```js
let count = 0;

for (const value of values) {
  if (valueThoaDieuKien) {
    count += 1;
  }
}

return count;
```

### Khi khung này chưa đủ

Nếu điều kiện phụ thuộc vào phần tử trước, một đoạn liên tiếp, hoặc những gì đã xuất hiện trước đó, chỉ có `count` là chưa đủ. Khi đó ta phải lưu thêm thông tin. Ví dụ:

- đếm số lần mảng tăng: cần nhớ phần tử trước;
- tìm đoạn số dương liên tiếp dài nhất: cần nhớ độ dài đoạn hiện tại;
- đếm giá trị khác nhau: cần `Set` để nhớ những giá trị đã gặp.

### Lỗi hay gặp

- Dùng `||` trong khi đề yêu cầu thỏa cả hai điều kiện.
- Viết `count += value` trong bài hỏi số lượng.
- Khởi tạo `count = 1` dù chưa tìm thấy phần tử hợp lệ nào.
- Dùng `for...of` rồi lại cần `index`; khi đó vòng lặp theo index dễ đọc hơn.

### Tự kiểm tra

Viết hàm đếm ký tự là chữ số trong chuỗi. Có thể kiểm tra một ký tự bằng:

```js
character >= "0" && character <= "9"
```

Test: `"a1-b20" → 3`, chuỗi rỗng trả `0`.

### Framework supplement: state, transition và biến thể

**Brute force bottleneck:** tạo một mảng filtered chỉ để lấy `.length` tốn thêm `O(n)` space. **State sentence:** `count` là số item trong prefix thỏa toàn bộ predicate. **Transition:** mỗi item đóng góp indicator 0 hoặc 1; invariant là `count` không bao giờ gồm item chưa đọc. Complexity `O(n)` time, `O(1)` space.

**Biến thể:** đếm theo nhiều loại cần nhiều counter/Map; tổng item hợp lệ đổi update từ `+1` thành `+value`. Counterexample dùng `||` thay `&&` làm tính cả item chỉ thỏa một nửa contract. Transfer: vừa đếm lỗi vừa cộng penalty bằng hai accumulator có nghĩa độc lập.

---

## 4. Kết luận sớm khi đã có đủ bằng chứng `[ARR-04]`

### Bài toán A — “Có ít nhất một”

Kiểm tra mảng có số âm hay không.

```text
[4, 2, -3, 8] → true
```

Ngay khi gặp `-3`, ta đã biết chắc đáp án là `true`. Không cần xem tiếp `8`.

```js
function containsNegative(values) {
  for (const value of values) {
    if (value < 0) {
      return true;
    }
  }

  return false;
}
```

Hãy để ý hai vị trí `return`:

- `return true` nằm trong vòng lặp vì chỉ cần gặp một bằng chứng;
- `return false` nằm sau vòng lặp vì phải xem hết mà vẫn không gặp số âm.

Mảng rỗng trả `false`: không có phần tử nào làm bằng chứng rằng “có số âm”.

### Bài toán B — “Tất cả”

Kiểm tra mọi mật khẩu đều có ít nhất 8 ký tự.

```js
function areAllPasswordsLongEnough(passwords) {
  for (const password of passwords) {
    if (password.length < 8) {
      return false;
    }
  }

  return true;
}
```

Ở đây ta đi tìm một phần tử **làm hỏng** kết luận “tất cả đều đúng”:

- gặp một mật khẩu ngắn → trả `false` ngay;
- xem hết mà không gặp mật khẩu ngắn → trả `true`.

Mảng rỗng trả `true` theo cách hiểu logic: không có phần tử nào vi phạm. Tuy nhiên, nếu đề quy định khác thì phải theo đề.

### Hai bộ xương đối xứng

```js
// Có ít nhất một phần tử thỏa?
for (const value of values) {
  if (thoaDieuKien(value)) return true;
}
return false;
```

```js
// Tất cả phần tử đều thỏa?
for (const value of values) {
  if (!thoaDieuKien(value)) return false;
}
return true;
```

`thoaDieuKien` chỉ là tên đại diện cho điều kiện của đề, không phải hàm JavaScript có sẵn.

### Tại sao không đếm rồi so sánh?

Ta có thể đếm số phần tử hợp lệ rồi so với độ dài mảng, nhưng cách đó thường làm việc thừa. Nếu phần tử đầu tiên đã sai, kết luận sớm chỉ chạy một bước; cách đếm vẫn phải duyệt hết mảng.

### Cách nhận ra dạng này

- “có ít nhất một”, “có tồn tại”, “có chứa” → tìm một bằng chứng đúng;
- “mọi”, “tất cả”, “không có phần tử nào sai” → tìm một bằng chứng sai.

Trong JavaScript, `some()` và `every()` cũng biểu diễn hai ý này. Khi mới học, viết vòng lặp đầy đủ giúp nhìn rõ vị trí kết luận hơn.

### Lỗi hay gặp

- Đặt kết quả mặc định sai: bài “có tồn tại” lại trả `true` sau vòng lặp.
- Gặp một phần tử đúng liền trả `true` trong bài hỏi “tất cả”.
- Gán boolean rồi vẫn duyệt hết dù đã biết chắc đáp án.
- Quên xác định hành vi với mảng rỗng.

### Tự kiểm tra

Viết hai hàm:

1. `containsZero(values)`: có ít nhất một số `0` hay không;
2. `isNonDecreasing(values)`: mọi cặp kề đều thỏa `values[i] >= values[i - 1]`.

Với bài 2, vòng lặp phải bắt đầu từ `index = 1`, vì phần tử đầu tiên không có phần tử đứng trước để so sánh.

### Bản chất và framework supplement

**Bản chất:** existential cần một witness đúng; universal cần một counterexample sai. **Brute force bottleneck:** đếm hết rồi mới kết luận làm việc thừa sau khi answer đã chắc chắn. **State sentence và invariant:** trước mỗi vòng chưa có witness/counterexample đủ để kết luận ngược lại. **Transition:** gặp bằng chứng thì return ngay; đi hết mới trả identity (`some([])=false`, `every([])=true`). Complexity worst-case `O(n)`, best-case `O(1)`, extra space `O(1)`.

**Dry run:** `[4,-1,9]` cho `containsNegative`: đọc 4 chưa kết luận; đọc -1 return true, không đọc 9. **Biến thể:** predicate theo cặp kề bắt đầu index 1; nếu cần vị trí witness thì return index thay boolean. Counterexample return true khi gặp một item đúng trong bài `every` chưa chứng minh phần còn lại. Transfer: kiểm tra non-decreasing bằng cách tìm cặp kề vi phạm đầu tiên.

---

## Chọn dạng nào trong phòng thi?

Đừng chọn theo tên hàm hay loại dữ liệu. Hãy nhìn thứ đề yêu cầu trả về:

```text
Một giá trị được gộp từ mọi phần tử?
└─ ARR-01: giữ tổng/tích hiện tại

Một phần tử hoặc vị trí thắng cuộc?
└─ ARR-02: giữ ứng viên tốt nhất và luật xử lý hòa

Một con số biểu thị số lượng phần tử hợp lệ?
└─ ARR-03: giữ count, đúng thì tăng 1

Chỉ cần trả true/false cho “có” hoặc “tất cả”?
└─ ARR-04: tìm bằng chứng và kết luận sớm
```

Một bài có thể kết hợp nhiều dạng. Ví dụ `{wrongCount, totalPenalty}` dùng cùng lúc:

- `ARR-03` cho số câu sai;
- `ARR-01` cho tổng điểm phạt.

Điều quan trọng không phải gắn đúng một nhãn, mà là chọn đủ các biến để trả được kết quả.

## Bài kiểm tra chuyển giao

Không xem lại code ở trên. Cho danh sách giao dịch:

```js
[
  { type: "income", amount: 100 },
  { type: "expense", amount: 30 },
  { type: "expense", amount: 80 }
]
```

Hãy trả:

```js
const expectedResult = {
  balance: -10,
  expenseCount: 2,
  hasLargeExpense: true
};
```

Trong đó giao dịch chi từ `50` trở lên là khoản chi lớn.

Gợi ý chỉ mở khi bí:

<details>
<summary>Gợi ý 1 — Cần lưu gì?</summary>

Bạn cần ba biến: số dư hiện tại, số giao dịch chi, và thông tin đã gặp khoản chi lớn hay chưa.

</details>

<details>
<summary>Gợi ý 2 — Mỗi phần tử cập nhật ra sao?</summary>

`income` cộng vào số dư. `expense` trừ khỏi số dư và tăng bộ đếm. Nếu expense có `amount >= 50`, đánh dấu đã gặp khoản chi lớn.

</details>

Sau khi tự code, hãy giải thích bằng lời:

1. Mỗi biến có ý nghĩa gì sau khi xử lý `i` giao dịch đầu?
2. Vì sao `expenseCount` bắt đầu bằng `0`?
3. Nếu đề chỉ hỏi `hasLargeExpense`, có thể dừng vòng lặp ở đâu?

## Phiếu nhớ nhanh

| Dạng | Câu hỏi tự hỏi | Biến thường dùng | Cập nhật chính |
| --- | --- | --- | --- |
| `ARR-01` | Kết quả đã gộp đến đâu? | `total`, `product` | cộng/nhân đóng góp hiện tại |
| `ARR-02` | Ai đang thắng và vì sao? | `bestValue`, `bestIndex`, `bestItem` | thay khi current tốt hơn |
| `ARR-03` | Đã có bao nhiêu phần tử đúng? | `count` | điều kiện đúng thì `+1` |
| `ARR-04` | Bằng chứng nào đủ kết luận? | thường không cần biến | gặp bằng chứng thì `return` |

Bạn đã sẵn sàng sang phần 2 khi có thể tự viết lại bốn bộ xương mà không nhìn và nói được ý nghĩa của từng biến.
