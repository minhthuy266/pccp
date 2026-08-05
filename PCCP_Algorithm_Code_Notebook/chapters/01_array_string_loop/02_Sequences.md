# Xây output, duyệt ngược và đoạn liên tiếp — `ARR-05..07`

[← Scan](01_Scan.md) · [Practice →](03_Practice_Ladder.md)

## Dạng 5 `[ARR-05]` — Biến đổi/lọc và xây output

### A. Bản chất

Input và output không còn là một scalar; mỗi current có thể tạo 0, 1 hoặc nhiều phần tử output. State phải nói rõ output chứa kết quả của prefix nào. Không mutate input nếu đề không yêu cầu, vì alias/reference có thể làm test sau sai.

### B. Mental model

Dây chuyền: item đi qua bộ lọc, rồi nếu được nhận thì được đóng gói thành representation mới.

### C. Template tư duy

```text
Duyệt: input theo order cần giữ.
State: result chứa output đúng của prefix.
Condition: current có được đưa vào không?
Transform: output item được tạo từ current thế nào?
Transition: result.push(transformed).
Invariant: result đúng và đúng order cho prefix.
Return: result; quyết định new collection hay in-place.
```

### D. Template code

```js
const result = [];
for (let index = 0; index < values.length; index += 1) {
  const currentValue = values[index];
  if (!shouldInclude(currentValue, index)) continue;
  result.push(transform(currentValue, index));
}
return result;
```

### E. Bài mẫu — Chuẩn hóa điểm hợp lệ

1. **Đề:** bỏ điểm ngoài `[0,100]`; với điểm hợp lệ trả object `{index, grade}` trong đó grade A nếu ≥90, B nếu ≥80, còn lại C.  
2. **I/O:** `[95,-1,82,70,120] → [{index:0,grade:'A'},{index:2,grade:'B'},{index:3,grade:'C'}]`.  
3. **Kể lại:** filter invalid, transform valid, giữ index gốc.  
4. **Brute:** filter rồi map; đúng nhưng index sau filter không còn index gốc nếu dùng callback thứ hai.  
5. **Bottleneck:** representation/index, không phải runtime.  
6. **Vì sao hợp:** một lượt vừa biết original index vừa xây output.  
7. **State:** `result`.  
8. **Transition:** invalid skip; valid compute grade rồi push object.  
9. **Invariant:** result là output đúng cho scores `[0..i]`, order giữ nguyên.  
10. **Pseudocode:** scan index; range check; derive grade; push index+grade.  
11. **Full code:**

```js
function normalizeValidScores(scores) {
  const result = [];
  for (let index = 0; index < scores.length; index += 1) {
    const score = scores[index];
    if (score < 0 || score > 100) continue;

    let grade;
    if (score >= 90) grade = "A";
    else if (score >= 80) grade = "B";
    else grade = "C";

    result.push({ index, grade });
  }
  return result;
}
```

12. Range check trước grade ngăn invalid 120 thành A. Grade conditions đi từ cao xuống; đảo thứ tự làm 95 nhận B nếu check ≥80 trước. Index lấy từ input loop.  
13. **Dry run:**

| Bước | Phần tử/index | State trước | Điều kiện | Hành động | State sau |
| --- | --- | --- | --- | --- | --- |
| 0 | 95/0 | `[]` | valid, ≥90 | push A/0 | `[A0]` |
| 1 | -1/1 | `[A0]` | invalid | skip | `[A0]` |
| 2 | 82/2 | `[A0]` | valid, ≥80 | push B/2 | `[A0,B2]` |
| 3 | 70/3 | ... | valid | push C/3 | `[...,C3]` |
| 4 | 120/4 | ... | invalid | skip | không đổi |

14. `O(n)` time, `O(m)` output. 15. mất original index; mutate input; grade condition sai order; push trước filter. 16. Biến thể in-place compact chỉ value hợp lệ: chuyển sang `TP-02` vì có read/write indices.

**Recall Card `[ARR-05]`:** filter quyết định 0/1 output; transform quyết định representation; push giữ order. **Blank Page:** normalize chuỗi trim + bỏ empty. **Mutation:** flatMap 0..many; output string; giữ reason của invalid. **Explain Back:** vì sao không chain filter/map? Invariant output là gì? Khi nào in-place tốt hơn?

## Dạng 6 `[ARR-06]` — Duyệt ngược và suffix state

### A. Bản chất

Khi câu hỏi tại index `i` cần thông tin ở bên phải, scan trái→phải chưa có dữ liệu tương lai. Đảo hướng biến suffix thành “quá khứ đã xử lý”. Không dùng duyệt ngược chỉ vì đề nói “cuối cùng”; hướng phải khớp dependency.

### B. Mental model

Đứng từ cuối hàng nhìn ngược: mọi người “phía sau” current đã được ghi nhận.

### C. Template tư duy

```text
Duyệt: i từ n-1 xuống 0.
State: summary của suffix [i+1..n-1].
Check/output current dựa trên suffix cũ.
Update suffix bằng current sau khi tạo output nếu không được dùng chính current.
Invariant đầu vòng: state không chứa index i.
```

### D. Template code

```js
const result = Array(values.length);
let suffixState = initialSuffix;
for (let index = values.length - 1; index >= 0; index -= 1) {
  result[index] = answerFrom(values[index], suffixState);
  suffixState = updateSuffix(suffixState, values[index]);
}
return result;
```

### E. Bài mẫu — Max nghiêm ngặt bên phải

1. **Đề:** output[i] là max của `values[i+1..]`; index cuối trả `null`.  
2. **I/O:** `[3,1,5,2] → [5,5,2,null]`.  
3. **Kể lại:** trước khi đưa current vào suffix, ghi max hiện có bên phải.  
4. **Brute:** với mỗi i quét suffix.  
5. **Bottleneck:** cùng suffix bị quét lặp `O(n²)`.  
6. **Vì sao hợp:** suffixMax update được bằng max cũ và current.  
7. **State:** `suffixMaximum`, ban đầu `null`; result fixed length.  
8. **Transition:** result[i]=old suffix; rồi suffix=max(old,current).  
9. **Invariant:** đầu vòng i, suffixMaximum là max nghiêm ngặt bên phải i.  
10. **Pseudocode:** result n; suffix null; scan reverse; write result; update suffix.  
11. **Full code:**

```js
function maximumStrictlyToRight(values) {
  const result = Array(values.length);
  let suffixMaximum = null;

  for (let index = values.length - 1; index >= 0; index -= 1) {
    result[index] = suffixMaximum;
    const currentValue = values[index];
    if (suffixMaximum === null || currentValue > suffixMaximum) {
      suffixMaximum = currentValue;
    }
  }
  return result;
}
```

12. Write output trước update để suffix là “nghiêm ngặt bên phải”; đổi thứ tự làm output gồm current. `null` thay `-Infinity` vì return contract yêu cầu null và values có thể là `-Infinity`.  
13. **Dry run:**

| Bước | Phần tử/index | State trước | Điều kiện | Hành động | State sau |
| --- | --- | --- | --- | --- | --- |
| 3 | 2/3 | suffix=null | cuối | result[3]=null; update | suffix=2 |
| 2 | 5/2 | suffix=2 | 5>2 | result[2]=2; update | suffix=5 |
| 1 | 1/1 | suffix=5 | 1>5 sai | result[1]=5 | suffix=5 |
| 0 | 3/0 | suffix=5 | 3>5 sai | result[0]=5 | suffix=5 |

14. `O(n)` time, `O(n)` output, `O(1)` extra. 15. loop condition `index>0` bỏ index0; update trước output; sentinel đụng dữ liệu; `push` làm reverse output. 16. Biến thể max kể cả current: update trước rồi ghi output.

**Recall Card `[ARR-06]`:** dependency bên phải → scan reverse; output-before-update cho strict suffix. **Blank Page:** suffix sum array. **Mutation:** next nonzero; min right; scan reverse build string. **Explain Back:** hướng scan do gì quyết định? Vì sao index>=0? Khi nào push rồi reverse được?

## Dạng 7 `[ARR-07]` — Đoạn liên tiếp, sentinel và nhiều state

### A. Bản chất

Một run là nhóm phần tử kề nhau cùng quan hệ. State cần run đang mở và best/output đã chốt. Run cuối không có phần tử khác để kích hoạt flush, nên phải xử lý sau loop hoặc dùng sentinel có chứng minh không xung đột.

### B. Mental model

Ghi biên bản theo ca: khi loại công việc đổi, chốt ca cũ rồi mở ca mới; hết ngày cũng phải chốt ca cuối.

### C. Template tư duy

```text
State: currentRunValue/start/length và best hoặc runs.
Start: empty cần return riêng; nonempty mở run từ index0.
Condition: current tiếp tục run cũ?
Transition: đúng→extend; sai→flush old rồi reset new.
After loop: flush run cuối.
Invariant: mọi run kết thúc trước current đã chốt; state là run mở duy nhất.
```

### D. Template code

```js
if (values.length === 0) return emptyResult;
let currentLength = 1;
for (let index = 1; index < values.length; index += 1) {
  if (continues(values[index - 1], values[index])) currentLength += 1;
  else {
    flush(currentLength);
    currentLength = 1;
  }
}
flush(currentLength);
```

### E. Bài mẫu — Đoạn tăng nghiêm ngặt dài nhất

1. **Đề:** length đoạn kề nhau dài nhất thỏa mỗi số lớn hơn số trước; empty trả 0.  
2. **I/O:** `[1,2,3,2,4] → 3`; `[5]→1`.  
3. **Kể lại:** kéo dài run khi tăng; khi giảm/bằng thì chốt và bắt đầu lại tại current.  
4. **Brute:** thử mọi start rồi kéo end, `O(n²)`.  
5. **Bottleneck:** cùng quan hệ kề bị kiểm tra lại.  
6. **Vì sao hợp:** run hiện tại chỉ cần length và previous value.  
7. **State:** `currentLength`, `bestLength`.  
8. **Transition:** tăng→current++; không→current=1; sau đó best=max.  
9. **Invariant:** sau xử lý i, current là run tăng kết thúc tại i; best là max trong prefix.  
10. **Pseudocode:** empty0; current=best=1; loop i=1; extend/reset; update best; return.  
11. **Full code:**

```js
function longestStrictlyIncreasingRun(values) {
  if (values.length === 0) return 0;
  let currentLength = 1;
  let bestLength = 1;

  for (let index = 1; index < values.length; index += 1) {
    if (values[index] > values[index - 1]) {
      currentLength += 1;
    } else {
      currentLength = 1;
    }
    bestLength = Math.max(bestLength, currentLength);
  }
  return bestLength;
}
```

12. Loop từ 1 vì cần `i-1`; current reset 1 vì current tự tạo run length1. Update best sau extend/reset để gồm run kết thúc tại current; cách này không cần flush riêng vì best được cập nhật từng bước.  
13. **Dry run:**

| Bước | Phần tử/index | State trước | Điều kiện | Hành động | State sau |
| --- | --- | --- | --- | --- | --- |
| init | 1/0 | — | nonempty | current=best=1 | 1/1 |
| 1 | 2/1 | 1/1 | 2>1 | extend, update | 2/2 |
| 2 | 3/2 | 2/2 | 3>2 | extend, update | 3/3 |
| 3 | 2/3 | 3/3 | 2>3 sai | reset, keep best | 1/3 |
| 4 | 4/4 | 1/3 | 4>2 | extend | 2/3 |

14. `O(n)`/`O(1)`. 15. reset0; loop từ0 đọc index-1; dùng `>=` đổi strict; quên empty. 16. Biến thể longest equal run: condition đổi `===`; nếu cần value thắng tie, state thêm runValue/bestValue và comparator lúc flush.

**Recall Card `[ARR-07]`:** open run + best; continue→extend, break→reset/flush; run cuối phải được tính. **Blank Page:** run ký tự giống nhau dài nhất. **Mutation:** run alternating; trả start/end; run-length encoding. **Explain Back:** vì sao reset1? Khi cần flush cuối? Sentinel có thể xung đột thế nào?

### Template Contrast — `ARR-03` và `ARR-07`

| Dạng | State | Condition | Transition | Dấu hiệu |
| --- | --- | --- | --- | --- |
| `ARR-03` | count độc lập | predicate current | true→count++ | bao nhiêu item |
| `ARR-07` | run phụ thuộc kề nhau | relation previous/current | extend hoặc reset | đoạn liên tiếp |

## Transfer Test B — Sau `ARR-05..07`

Làm [A01-T02](03_Practice_Ladder.md#a01-t02--chuỗi-tín-hiệu). Đề yêu cầu return khác bài mẫu và có mã thiết bị gây nhiễu.

