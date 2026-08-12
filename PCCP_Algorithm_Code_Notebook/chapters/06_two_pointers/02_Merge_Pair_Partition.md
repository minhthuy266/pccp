# Merge, pair/three sum và partition — `TP-04..06`

[← Trước](01_Inward_Compact.md) · [Index](../../06_Two_Pointers.md)

## Dạng 4 `[TP-04]` — Merge hoặc giao hai dãy sort

**Dấu hiệu nhận dạng:** hai input đã sorted và cần merge/intersection. **Brute force bottleneck:** concat+sort làm `O((n+m)log(n+m))`; transition advance pointer có value nhỏ hơn, equality xử lý cả hai theo multiplicity contract.

### A. Bản chất

Mỗi pointer là phần tử nhỏ nhất chưa xử lý của một dãy. Với merge, lấy phần tử nhỏ hơn; với intersection, nhỏ hơn không thể match về sau nên bỏ nó, bằng nhau thì lấy và dịch cả hai.

### B. Mental model

Hai hàng đã xếp thứ tự; chỉ cần nhìn người đầu hàng để biết ai chắc chắn đi tiếp.

### C. Template tư duy

```text
i,j trỏ phần tử chưa xử lý đầu tiên.
Merge: push smaller; equal chọn theo stability contract.
Intersection: smaller advance; equal emit + advance both.
Sau loop: merge nối tail; intersection kết thúc.
Invariant: output đúng cho hai prefix đã tiêu thụ.
```

### D. Template code

```js
function mergeSorted(first, second) {
  const output = [];
  let i = 0;
  let j = 0;
  while (i < first.length && j < second.length) {
    if (first[i] <= second[j]) output.push(first[i++]);
    else output.push(second[j++]);
  }
  while (i < first.length) output.push(first[i++]);
  while (j < second.length) output.push(second[j++]);
  return output;
}
```

### E. Bài mẫu — Giao đa tập

1. **Đề:** hai array sort tăng; trả intersection, duplicate theo `min(countA,countB)`. 2. `[1,2,2,5]` và `[2,2,3]→[2,2]`. 3. Order sẵn. 4. Nested loop O(nm). 5. Phần tử nhỏ hơn current bên kia không thể match. 6. Two cursors. 7. `i,j,out`. 8. Equal emit; smaller advance. 9. Output là giao đúng của prefix đã bỏ. 10. Loop tới khi một dãy hết. 11. **Code:**

```js
function intersectSorted(first, second) {
  const output = [];
  let i = 0;
  let j = 0;
  while (i < first.length && j < second.length) {
    if (first[i] === second[j]) {
      output.push(first[i]);
      i += 1;
      j += 1;
    } else if (first[i] < second[j]) i += 1;
    else j += 1;
  }
  return output;
}
```

12. Equal phải dịch cả hai để mỗi occurrence dùng một lần. 13. **Dry run:**

| Bước | Pointer/value | State trước | Điều kiện | Hành động | State sau |
| --- | --- | --- | --- | --- | --- |
| 1 | 1 vs2 | i0,j0,out[] | left nhỏ | i++ | i1 |
| 2 | 2 vs2 | i1,j0 | equal | emit, both++ | out[2],i2,j1 |
| 3 | 2 vs2 | i2,j1 | equal | emit, both++ | out[2,2] |
| 4 | 5 vs3 | i3,j2 | right nhỏ | j++ | end |

14. O(n+m), output space O(k). 15. Quên tail khi merge; advance sai phía; dùng Set làm mất multiplicity; input chưa sort. 16. Unique intersection: khi emit, skip whole equal groups.

**Recall Card `[TP-04]`:** smallest unprocessed of two sorted streams. **Blank Page:** merge with empty tail. **Mutation:** union unique. **Explain Back:** vì sao advance smaller an toàn?

## Dạng 5 `[TP-05]` — Pair sum và Three Sum

**Dấu hiệu nhận dạng:** sorted values, sum so với target cho biết phải tăng left hay giảm right. **Brute force bottleneck:** thử mọi pair là `O(n²)`; transition loại cả một dải candidate nhờ monotonic sum.

### A. Bản chất

Pair sum là TP-01. Three Sum cố định một phần tử rồi giải pair sum trên suffix; sort tạo tính đơn điệu và cho phép skip duplicate. Việc skip phải ở đúng tầng: outer duplicate sau lần đầu; inner duplicate sau khi đã ghi một nghiệm.

### B. Mental model

Đóng đinh một góc tam giác, hai góc còn lại trượt trên một thước đã sắp.

### C. Template tư duy

```text
Clone + numeric sort nếu không được mutate.
For fixed; skip same fixed.
left=fixed+1,right=n-1.
sum nhỏ→left++; lớn→right--; bằng→emit rồi skip duplicate hai phía.
Invariant inner: mọi cặp ngoài [left,right] đã bị loại hoặc đã emit.
```

### D. Template code

```js
function threeSumZero(values) {
  const sorted = [...values].sort((a, b) => a - b);
  const output = [];
  for (let fixed = 0; fixed < sorted.length - 2; fixed += 1) {
    if (fixed > 0 && sorted[fixed] === sorted[fixed - 1]) continue;
    let left = fixed + 1;
    let right = sorted.length - 1;
    while (left < right) {
      const sum = sorted[fixed] + sorted[left] + sorted[right];
      if (sum < 0) left += 1;
      else if (sum > 0) right -= 1;
      else {
        output.push([sorted[fixed], sorted[left], sorted[right]]);
        const leftValue = sorted[left];
        const rightValue = sorted[right];
        while (left < right && sorted[left] === leftValue) left += 1;
        while (left < right && sorted[right] === rightValue) right -= 1;
      }
    }
  }
  return output;
}
```

### E. Bài mẫu — Ba số tổng 0 không trùng bộ

1. `[-1,0,1,2,-1,-4]→[[-1,-1,2],[-1,0,1]]`. 2. Output theo value. 3. Clone để không mutate. 4. O(n³). 5. Sau fixed còn pair target. 6. Sort + outer + inward. 7. fixed,left,right. 8. Compare sum và skip duplicates sau hit. 9. Outer values trước fixed đã xử lý; inner rectangle giữ mọi pair chưa loại. 10. Code như template. 11. Check exact trước moves. 12. Store values trước skip để không lệch comparison. 13. **Dry run trọng tâm:**

| Bước | Pointer/candidate | State trước | Điều kiện | Hành động | State sau |
| --- | --- | --- | --- | --- | --- |
| 1 | f0=-4,l1=-1,r5=2 | sum=-3 | nhỏ hơn 0 | left++ | l2 |
| 2 | f1=-1,l2=-1,r5=2 | sum=0 | bằng | emit, skip groups | out `[-1,-1,2]`, l3,r4 |
| 3 | f1=-1,l3=0,r4=1 | sum=0 | bằng | emit, skip groups | thêm `[-1,0,1]` |
| 4 | f2=-1 | previous fixed=-1 | duplicate | skip fixed | f3 |

14. O(n²), O(n) do clone/output. 15. Default sort; duplicate triplets; move một phía sau hit; return indices mà đã mất mapping. 16. Three Sum closest: giữ best distance, không skip bắt buộc.

**Recall Card `[TP-05]`:** fix one → pair sum suffix → duplicate discipline. **Blank Page:** three sum zero. **Mutation:** target bất kỳ. **Explain Back:** vì sao O(n²), và skip ở đâu?

## Dạng 6 `[TP-06]` — Partition cơ bản

**Dấu hiệu nhận dạng:** cần chia array quanh predicate/pivot, thường cho phép mutation. **Brute force bottleneck:** build/copy nhiều subarray làm thừa memory; transition advance hai phía, swap khi cả hai đứng sai vùng rồi tiếp tục.

### A. Bản chất

Partition chia array thành hai vùng theo predicate mà không cần giữ order. Pointer trái tìm item sai ở vùng trái; pointer phải tìm item sai ở vùng phải; swap sửa đồng thời hai lỗi. Khác compact: compact ổn định nhưng chỉ cam kết prefix; partition thường không ổn định và cam kết boundary hai vùng.

### B. Mental model

Hai kiểm soát viên đi từ hai cửa, dừng ở hai người đứng nhầm khu rồi đổi chỗ.

### C. Template tư duy

```text
Contract có cho mutate và phá order không?
left skip item thuộc left group; right skip item thuộc right group.
Nếu left<=right, swap rồi both move.
Return left = index đầu của right group.
Invariant: [0,left) đúng left group; (right,n) đúng right group.
```

### D. Template code

```js
function partitionInPlace(values, belongsLeft) {
  let left = 0;
  let right = values.length - 1;
  while (left <= right) {
    while (left <= right && belongsLeft(values[left])) left += 1;
    while (left <= right && !belongsLeft(values[right])) right -= 1;
    if (left > right) break;
    [values[left], values[right]] = [values[right], values[left]];
    left += 1;
    right -= 1;
  }
  return left;
}
```

### E. Bài mẫu — Số âm đứng trước

1. **Đề:** mutate, âm trước không âm; order không quan trọng; return boundary. 2. `[3,-1,0,-2]→prefix âm, suffix không âm`. 3. Empty hợp lệ. 4. Extra arrays O(n). 5. Hai item sai phía sửa bằng một swap. 6. Partition. 7. `left,right`. 8. Skip đúng vùng, swap sai vùng. 9. Prefix trước left toàn âm; suffix sau right toàn không âm. 10. Guard `left<=right` trong inner loops. 11. **Code:**

```js
function partitionNegatives(values) {
  return partitionInPlace(values, (value) => value < 0);
}
```

12. Boundary có thể 0 hoặc n; tail/prefix đều được xác định. 13. **Dry run:**

| Bước | Pointer/value | State trước | Điều kiện | Hành động | State sau |
| --- | --- | --- | --- | --- | --- |
| 1 | l0=3,r3=-2 | l0,r3 | cả hai sai vùng | swap | `[-2,-1,0,3]`,l1,r2 |
| 2 | l1=-1 | l1,r2 | đúng trái | l++ | l2 |
| 3 | r2=0 | l2,r2 | đúng phải | r-- | r1,end |

14. O(n)/O(1). 15. Mong giữ order; thiếu bounds trong inner loop; không move sau swap gây lặp; predicate pivot với equal không nhất quán. 16. Dutch national flag cần ba vùng/pointer, không còn template hai vùng đơn giản.

**Recall Card `[TP-06]`:** find two misplaced → swap → boundary. **Blank Page:** odd/even partition. **Mutation:** pivot `< pivot` và `>= pivot`. **Explain Back:** partition khác compact ở stability và return contract thế nào?

## Transfer Test B

Làm [S06-T02](03_Practice_Ladder.md#s06-t02--ghép-và-lọc-lịch-sử-tp-04tp-02).
