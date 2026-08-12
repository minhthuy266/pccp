# PF09 — Line greedy và extreme pairing

Nguồn: [OF025](../official-lessons/OF025.md), [OF028](../official-lessons/OF028.md).

## 1. Tín hiệu nhận dạng

Các đối tượng nằm trên một thứ tự tuyến tính sau sort hoặc vốn đã ở trên đường thẳng. Mỗi quyết định chỉ ghép/phân bổ với hàng xóm hoặc hai cực; một lựa chọn local có thể được chứng minh bằng exchange argument.

Hai dạng nguồn khác nhau nhưng chung lõi: OF025 phân bổ tài nguyên cho hàng xóm trên line; OF028 ghép người nhẹ nhất với nặng nhất sau sort.

## 2. Không dùng khi

- Một item ghép được với nhiều item không theo thứ tự tuyến tính: có thể là matching/graph.
- Mỗi nhóm chứa hơn hai phần tử và feasibility không còn do hai cực quyết định.
- Local choice làm thay đổi reward toàn cục không có exchange proof.
- Có trọng số khác nhau cho từng ghép; “ghép được nhiều nhất” không đồng nghĩa “lợi ích lớn nhất”.

## 3. Decision tree

```text
Quan hệ chỉ giữa i và i±1?       → normalize conflict, scan line greedy
Mỗi nhóm tối đa hai người?        → sort, cố định heaviest, thử lightest
Heaviest + lightest không fit?    → heaviest buộc đi một mình
Heaviest + lightest fit?          → ghép họ, vì giữ người nhẹ hơn không giúp hơn
Ghép tùy ý trên graph?             → không dùng two-pointer greedy
```

## 4. Knobs tạo biến thể

- Capacity cho nhóm 2 hay nhiều người.
- Objective giảm số nhóm, tăng số người được phục vụ, hay tối đa value.
- Quan hệ neighbor khoảng 1 hay bán kính `d`.
- Một người có thể vừa thiếu vừa thừa: phải normalize conflict trước.
- Equal capacity là hợp lệ hay không: `<=`/`<`.
- Tie-break ưu tiên trái hay phải; proof có phụ thuộc hướng scan không.

## 5. Invariant và exchange proof

Extreme pairing: sau mỗi vòng, mọi người ngoài đoạn `[left,right]` đã được xếp tối ưu; `right` là người nặng nhất chưa xử lý. Nếu họ không đi cùng người nhẹ nhất thì không thể đi cùng ai khác. Nếu đi cùng được người nhẹ nhất, ghép này không làm giảm số ghép tương lai vì người nhẹ nhất là partner dễ ghép nhất.

Line allocation: sau khi xử lý vị trí `i`, không còn quyết định tương lai nào có thể cải thiện các vị trí trước `i` nếu chỉ cho mượn giữa hàng xóm. Phải loại giao của lost/reserve trước; một người không thể đồng thời cần và cho.

## 6. Code core đáng thuộc

```js
function minimumPairs(weights, limit) {
  const sorted = [...weights].sort((a, b) => a - b);
  let left = 0;
  let right = sorted.length - 1;
  let groups = 0;

  while (left <= right) {
    if (left < right && sorted[left] + sorted[right] <= limit) left++;
    right--;
    groups++;
  }
  return groups;
}
```

```js
function removeConflicts(needs, reserves) {
  const need = new Set(needs);
  const reserve = new Set(reserves);
  for (const person of [...need]) {
    if (reserve.has(person)) {
      need.delete(person);
      reserve.delete(person);
    }
  }
  return { need, reserve };
}
```

## 7. Counterexamples bóc lỗi

- Không sort weights: `[70,50,50,30]`, limit 100 khiến pointer trên input order không đại diện hai cực.
- Dùng `< limit` thay `<= limit` bỏ cặp vừa đủ.
- Khi chỉ còn một người (`left===right`), không được ghép họ với chính họ.
- Đồng phục: người vừa lost vừa reserve phải tự dùng trước; nếu cho người khác trước sẽ giảm đáp án.
- Greedy “ghép hai nhẹ nhất” có thể để hai người nặng đi riêng nhiều hơn.

## 8. Drills biến thể

### Drill A — trả chính các cặp

Thay count bằng array nhóm index/value. Invariant không đổi nhưng phải giữ identity khi sort bằng record `{weight,index}`.

### Drill B — boat chứa tối đa ba người

Two-pointer proof trên không còn tự động đúng. Tạo counterexample và xét constraint: `n` nhỏ dùng bitmask DP; weight/capacity nhỏ có thể counting; không tái dùng core mù quáng.

### Drill C — cho mượn trong bán kính d

Với interval neighbor rộng hơn, scan donor/receiver sorted bằng hai pointers có thể đúng. Cần chứng minh ghép receiver sớm nhất với donor sớm nhất khả dụng không chặn tương lai.

### Drill D — tối đa tổng value

Nếu mỗi người được cứu có value khác nhau, minimum boats và maximum value là objective khác; extreme weight greedy có thể sai. Đây là knob chuyển bài sang DP/knapsack.

## 9. Câu hỏi mở tư duy

- Phần tử cực đại chưa xử lý có những lựa chọn nào?
- Nếu local choice khác optimum, có swap về greedy choice mà không xấu hơn không?
- Conflict nào phải normalize trước?
- Objective là cardinality, cost hay weighted value?
- Constraint “tối đa hai” có phải lý do proof đúng không?

## 10. Checklist 15 giây

Phải nói được: **line/order sau sort, extreme bắt buộc nào, local choice, exchange argument, equality boundary và knob nào làm proof hỏng**.
