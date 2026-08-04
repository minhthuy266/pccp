# Scan và quyết định — `ARR-01..04`

[← Index](../../01_Array_String_Loop.md) · [Tiếp: sequence →](02_Sequences.md)

## Dạng 1 `[ARR-01]` — Accumulator tổng/tích

### A. Bản chất

Mỗi phần tử đóng góp vào một kết quả gộp. Nếu không giữ kết quả của prefix, ta phải cộng/tính lại phần đã đi qua. Dấu hiệu: tổng, tích, checksum, tổng có trọng số. Không dùng một accumulator khi output cần từng prefix hoặc khi transition phụ thuộc thêm ngữ cảnh chưa lưu.

### B. Mental model

Một đồng hồ công-tơ: mỗi item đi qua làm số hiện tại đổi đúng một lần.

### C. Template tư duy

```text
Duyệt: từng value hoặc index nếu công thức dùng vị trí.
State: accumulator là kết quả gộp của prefix đã xử lý.
Khởi tạo: phần tử đơn vị của phép gộp (0 cho tổng, 1 cho tích).
Transition: accumulator = combine(accumulator, current).
Invariant đầu vòng i: accumulator đúng cho [0..i-1].
Return: accumulator sau khi xử lý hết.
```

### D. Template code JavaScript

```js
let accumulator = identityValue;
for (let index = 0; index < values.length; index += 1) {
  const currentValue = values[index];
  accumulator = combine(accumulator, currentValue, index);
}
return accumulator;
```

`identityValue` phải làm empty input đúng theo contract. Với tích, khởi tạo 0 khiến mọi kết quả thành 0; với tổng, khởi tạo bằng phần tử đầu lại buộc loop bắt đầu ở 1 và cần xử lý empty riêng.

### E. Bài mẫu — Tổng có trọng số theo vị trí

1. **Đề:** trả `values[0]*1 + values[1]*2 + ... + values[i]*(i+1)`.  
2. **I/O:** `[3,1,2] → 11`; `[] → 0`.  
3. **Kể lại:** mỗi số đóng góp số đó nhân vị trí 1-based.  
4. **Brute force:** công thức này vốn chỉ cần một lượt; array trung gian `map` rồi `reduce` vẫn đúng nhưng không cần thiết.  
5. **Bottleneck:** không có bottleneck độ phức tạp; rủi ro là nhầm index 0-based/1-based.  
6. **Vì sao pattern hợp:** đóng góp current tính được độc lập từ value và index.  
7. **State:** `weightedSum` là tổng đúng của prefix.  
8. **Transition:** cộng `values[index] * (index + 1)`.  
9. **Invariant:** đầu vòng `index`, sum chứa đóng góp của index `0..index-1`.  
10. **Pseudocode:** sum=0; scan index; contribution=value*(index+1); cộng; return.  
11. **Full code:**

```js
function weightedSum(values) {
  let total = 0;
  for (let index = 0; index < values.length; index += 1) {
    const position = index + 1;
    const contribution = values[index] * position;
    total += contribution;
  }
  return total;
}
```

12. `position` tách riêng để lộ chuyển đổi 0→1-based; bỏ `+1` làm `[3]` trả 0. Khởi tạo 0 khiến empty trả đúng.  
13. **Dry run:**

| Bước | Phần tử/index | State trước | Điều kiện | Hành động | State sau |
| --- | --- | --- | --- | --- | --- |
| 0 | 3/0 | total=0 | position=1 | +3×1 | 3 |
| 1 | 1/1 | total=3 | position=2 | +1×2 | 5 |
| 2 | 2/2 | total=5 | position=3 | +2×3 | 11 |

14. **Complexity:** `O(n)` time, `O(1)` extra space.  
15. **Lỗi:** dùng `index` thay `index+1`; reset total trong loop; Number không an toàn nếu bound tích lớn.  
16. **Biến thể:** chỉ cộng index chẵn: condition đổi, nghĩa accumulator vẫn là tổng đóng góp hợp lệ trong prefix.

**Recall Card `[ARR-01]`:** identity → scan → combine → return; state là kết quả prefix. **Blank Page:** viết tổng chữ số của số nguyên không nhìn. **Mutation:** tổng có điều kiện; tích modulo; prefix outputs. **Explain Back:** identity là gì? Vì sao loop từ 0? Khi nào cần BigInt?

## Dạng 2 `[ARR-02]` — Min/max, index và tie-break

### A. Bản chất

Ta giữ ứng viên tốt nhất trong prefix. “Tốt hơn” phải là một comparator hoàn chỉnh, gồm cả luật hòa. Không nên sort toàn array chỉ để lấy một cực trị vì sort làm `O(n log n)`, mutate input và có thể mất index gốc.

### B. Mental model

Một ghế dẫn đầu: current chỉ thay người ngồi khi thắng đúng luật, kể cả luật hòa.

### C. Template tư duy

```text
Duyệt: index vì cần trả index/tie.
State: bestValue, bestIndex.
Condition: current tốt hơn, hoặc hòa và thắng tie.
Transition: cập nhật value và index cùng nhau.
Invariant: best là đáp án đúng của prefix đã xử lý.
Return: bestValue, bestIndex hoặc object theo contract.
```

### D. Template code JavaScript

```js
if (isBetter(currentValue, index, bestValue, bestIndex)) {
  bestValue = currentValue;
  bestIndex = index;
}
```

Nếu input không rỗng, khởi tạo từ index 0 rồi loop từ 1 giúp best luôn là phần tử thật. Sentinel `-Infinity` hữu ích khi empty có contract riêng, nhưng không tự cung cấp index hợp lệ.

### E. Bài mẫu — Điểm lớn nhất, hòa lấy index nhỏ nhất

1. **Đề:** array không rỗng; trả index của max, hòa lấy index nhỏ hơn.  
2. **I/O:** `[7,9,9,4] → 1`.  
3. **Kể lại:** giữ người dẫn đầu; người bằng điểm đến sau không thay.  
4. **Brute force:** tìm max rồi `indexOf`; đúng hai lượt.  
5. **Bottleneck:** không lớn, nhưng một lượt thể hiện tie và mở rộng tốt hơn.  
6. **Vì sao pattern hợp:** đáp án prefix cập nhật từ đúng một current.  
7. **State:** `bestValue`, `bestIndex`.  
8. **Transition:** chỉ update khi `currentValue > bestValue`.  
9. **Invariant:** sau index i, bestIndex là index nhỏ nhất đạt max của `[0..i]`.  
10. **Pseudocode:** best=index0; loop i=1; nếu current lớn hơn update cả hai; return index.  
11. **Full code:**

```js
function indexOfMaximumFirstTie(values) {
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

12. Loop bắt đầu 1 vì index0 đã ở state. Dùng `>=` sẽ thay khi hòa và trả index lớn nhất. Hai biến phải update cùng nhánh; bỏ update value khiến những current sau so với leader cũ.  
13. **Dry run:**

| Bước | Phần tử/index | State trước | Điều kiện | Hành động | State sau |
| --- | --- | --- | --- | --- | --- |
| init | 7/0 | — | input nonempty | chọn 7/0 | 7/0 |
| 1 | 9/1 | 7/0 | 9>7 | thay leader | 9/1 |
| 2 | 9/2 | 9/1 | 9>9 sai | giữ tie đầu | 9/1 |
| 3 | 4/3 | 9/1 | 4>9 sai | giữ | 9/1 |

14. `O(n)`/`O(1)`.  
15. Empty input không có contract; `>=` phá tie; chỉ lưu value khi return cần index; sort mutate input.  
16. Biến thể hòa lấy index lớn nhất: condition đổi thành `>=`, invariant đổi “index lớn nhất đạt max”.

**Recall Card `[ARR-02]`:** best state + comparator hoàn chỉnh; tie nằm ở dấu so sánh. **Blank Page:** viết min hòa index cuối. **Mutation:** best object theo 3 khóa; second max; max absolute value nhưng return original. **Explain Back:** vì sao khởi tạo index0? `>`/`>=` khác gì? Vì sao cập nhật hai biến cùng nhau?

### Template Contrast — `ARR-01` và `ARR-02`

| Dạng | State | Condition | Transition | Dấu hiệu |
| --- | --- | --- | --- | --- |
| `ARR-01` | kết quả gộp của mọi item | thường không loại item | combine mọi current | tổng/tích |
| `ARR-02` | một ứng viên thắng | comparator + tie | thay toàn bộ best | tốt nhất/max/min |

## Dạng 3 `[ARR-03]` — Đếm theo điều kiện

### A. Bản chất

Mỗi phần tử được phân loại độc lập thành thỏa hoặc không; state chỉ cần số đã thỏa. Không dùng nếu điều kiện của current phụ thuộc đoạn/lịch sử mà state count không mô tả đủ.

### B. Mental model

Một máy bấm số: chỉ bấm khi item qua bộ kiểm tra.

### C. Template tư duy

```text
Duyệt: mỗi item một lần.
State: count số item thỏa trong prefix.
Condition: predicate(current,index).
Transition: true → count += 1; false → giữ.
Invariant: count đúng cho prefix.
Return: count.
```

### D. Template code

```js
let count = 0;
for (let index = 0; index < values.length; index += 1) {
  if (matches(values[index], index)) count += 1;
}
return count;
```

### E. Bài mẫu — Đếm số dương ở index chẵn

1. Đề: đếm `values[index] > 0` và index chẵn. 2. `[-1,5,3,2,4]→2`. 3. Chỉ index0,2,4 có quyền xét value dương. 4. Filter rồi length. 5. Array trung gian không cần. 6. Count condition trực tiếp. 7. `count`. 8. cả hai predicate đúng→increment. 9. count đúng prefix. 10. scan/check conjunction/increment/return. 11. **Code:**

```js
function countPositiveAtEvenIndex(values) {
  let count = 0;
  for (let index = 0; index < values.length; index += 1) {
    const isEvenIndex = index % 2 === 0;
    const isPositive = values[index] > 0;
    if (isEvenIndex && isPositive) count += 1;
  }
  return count;
}
```

12. Cần index loop thay `for...of`; `&&` diễn đạt phải thỏa cả hai. 13. **Dry run:**

| Bước | Phần tử/index | State trước | Điều kiện | Hành động | State sau |
| --- | --- | --- | --- | --- | --- |
| 0 | -1/0 | 0 | even, không positive | giữ | 0 |
| 1 | 5/1 | 0 | odd | giữ | 0 |
| 2 | 3/2 | 0 | cả hai đúng | +1 | 1 |
| 3 | 2/3 | 1 | odd | giữ | 1 |
| 4 | 4/4 | 1 | cả hai đúng | +1 | 2 |

14. `O(n)`/`O(1)`. 15. `||` thay `&&`; đếm value rồi quên index; count khởi tạo 1. 16. Biến thể đếm cặp kề tăng: loop bắt đầu 1 và predicate so `values[i] > values[i-1]`.

**Recall Card `[ARR-03]`:** predicate độc lập → conditional increment. **Blank Page:** đếm ký tự digit. **Mutation:** count pair; count transition; weighted count. **Explain Back:** khi count state thiếu? Vì sao empty trả 0? Khi filter hợp lý hơn?

## Dạng 4 `[ARR-04]` — Every/some và early return

### A. Bản chất

Với “tồn tại”, một witness đủ kết luận true. Với “tất cả”, một counterexample đủ kết luận false. Duyệt tiếp sau khi đã có kết luận là công việc thừa và làm invariant khó hơn.

### B. Mental model

Kiểm soát vé: một vé giả đủ bác bỏ “mọi vé hợp lệ”; một vé VIP đủ xác nhận “có VIP”.

### C. Template tư duy

```text
Some: gặp witness → true; hết vòng → false.
Every: gặp counterexample → false; hết vòng → true.
Invariant: trước current chưa gặp witness/counterexample quyết định.
Empty: some=false, every=true theo logic; vẫn theo contract đề.
```

### D. Template code

```js
for (const value of values) {
  if (!predicate(value)) return false;
}
return true;
```

### E. Bài mẫu — Mọi mật khẩu đều đủ dài

1. Đề: mọi string có length≥8. 2. `['abcdefgh','12345678']→true`; `[]→true`. 3. tìm password đầu tiên quá ngắn. 4. đếm valid rồi so length. 5. đếm hết dù lỗi ở đầu. 6. every/early return. 7. không cần count; trạng thái ngầm “chưa thấy lỗi”. 8. current ngắn→false. 9. đầu vòng chưa có counterexample trong prefix. 10. scan; invalid false; hết true. 11. **Code:**

```js
function areAllPasswordsLongEnough(passwords) {
  for (const password of passwords) {
    if (password.length < 8) return false;
  }
  return true;
}
```

12. Return true phải sau loop; đặt trong loop chỉ kiểm phần tử đầu. Empty không vào loop và true phù hợp mệnh đề “không có phản ví dụ”. 13. **Dry run:**

| Bước | Phần tử/index | State trước | Điều kiện | Hành động | State sau |
| --- | --- | --- | --- | --- | --- |
| 0 | `abcdefgh`/0 | chưa thấy lỗi | len=8 | tiếp tục | chưa thấy lỗi |
| 1 | `short`/1 | chưa thấy lỗi | len<8 | return false | kết thúc |

14. Best-case `O(1)`, worst `O(n)`, space `O(1)`. 15. đảo predicate; true trong loop; nghĩ empty phải false không theo logic/contract. 16. Biến thể “có password yếu”: check cùng condition nhưng witness→true, hết→false.

**Recall Card `[ARR-04]`:** some tìm witness; every tìm counterexample; terminal return nằm sau loop. **Blank Page:** viết cả some/every không dùng method. **Mutation:** trả index witness; validate và thu lỗi; predicate cần index. **Explain Back:** vì sao empty every true? Khi không nên early return? Invariant ngầm là gì?

## Transfer Test A — Sau `ARR-01..04`

Làm [A01-T01](03_Practice_Ladder.md#a01-t01--trạm-pin). Không có phiếu state/check/update và có dữ liệu thời gian gây nhiễu.

