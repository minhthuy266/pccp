# PF04 — Stack: matching, reduction và unresolved indices

Nguồn: [OF008](../official-lessons/OF008.md), [OF011](../official-lessons/OF011.md), [OF027](../official-lessons/OF027.md), [OF051](../official-lessons/OF051.md), [OF061](../official-lessons/OF061.md), [SR003](../official-lessons/SR003.md).

## 1. Tín hiệu nhận dạng

Stack xuất hiện khi phần tử mới chỉ tương tác với **ứng viên gần nhất còn sống**: ngoặc đóng match ngoặc mở gần nhất, hai item giống nhau cancel, giá mới resolve các index chưa tìm được đáp án, hoặc digit mới tốt hơn khiến lựa chọn gần nhất bị loại.

Không hỏi “đề có chữ stack không”; hỏi “sau khi phần tử bị pop, nó có bao giờ cần quay lại không?”. Nếu không, amortized linear thường xuất hiện.

## 2. Bốn nhánh phải phân biệt

| Nhánh | Stack lưu | Điều kiện pop | Output |
|---|---|---|---|
| Matching | opener | closer khớp top | valid/invalid |
| Reduction | output sống | top và current tạo cặp xóa | reduced sequence/count |
| Unresolved query | index chưa có answer | current resolve top | answer cho index bị pop |
| Greedy deletion | lựa chọn đã giữ | current tốt hơn top và còn budget | sequence tối ưu |

OF011/OF061 là unresolved; OF027 là greedy deletion. Cùng monotonic stack nhưng mục tiêu và thời điểm ghi đáp án khác nhau.

## 3. Không dùng khi

- Cần phần tử tốt nhất toàn cục bất kể gần/xa: heap.
- Item bị pop có thể trở lại hợp lệ sau này: stack elimination không an toàn.
- Cần lấy cả hai đầu: deque.
- Rule resolve không monotone, một current phải tìm giữa stack: cần cấu trúc khác.

## 4. Knobs tạo biến thể

- Next hay previous: scan trái→phải và hỏi bên nào?
- Greater/smaller; strict `>` hay non-strict `>=`.
- Trả value, index, distance hay default.
- Circular array: scan `2n`, chỉ push index ở lượt đầu.
- Pop tất cả phần tử được resolve hay chỉ cancel một cặp.
- Greedy có deletion budget hay không; budget dư phải xóa từ tail.
- Bracket một loại có thể balance scalar; nhiều loại cần lưu type trên stack.

## 5. Decision tree

```text
Open/close theo nesting? → matching stack
Current và top triệt tiêu lặp? → reduction stack
Mỗi index chờ phần tử đầu tiên bên phải? → unresolved monotonic stack
Được xóa k phần tử để tối ưu lexicographic? → greedy monotonic stack + budget
Chỉ một loại ngoặc và chỉ cần validity? → prefix balance có thể nén stack thành số
```

## 6. Invariant và amortized proof

Unresolved stack chứa index chưa có đáp án, theo thứ tự monotone khiến current chỉ cần so với top. Khi current resolve top, top đã gặp **phần tử đầu tiên** thỏa điều kiện: các phần tử giữa đã được scan nhưng không resolve nó.

Mỗi index push một lần, pop tối đa một lần ⇒ tổng số lần pop `O(n)`, dù có `while` lồng trong `for`.

Greedy deletion: stack là prefix tốt nhất có thể sau số deletion đã dùng. Khi current tốt hơn top và còn budget, giữ top sẽ tạo khác biệt xấu sớm hơn; pop là exchange an toàn.

## 7. Code core đáng thuộc

```js
function nextGreaterValues(values) {
  const answer = Array(values.length).fill(-1);
  const unresolved = [];
  for (let index = 0; index < values.length; index++) {
    while (
      unresolved.length > 0 &&
      values[unresolved.at(-1)] < values[index]
    ) {
      answer[unresolved.pop()] = values[index];
    }
    unresolved.push(index);
  }
  return answer;
}
```

```js
function validBrackets(text) {
  const required = new Map([[")", "("], ["]", "["], ["}", "{"]]);
  const stack = [];
  for (const token of text) {
    if (!required.has(token)) stack.push(token);
    else if (stack.pop() !== required.get(token)) return false;
  }
  return stack.length === 0;
}
```

## 8. Counterexamples bóc lỗi

- Strict greater: `[3,3,4]` phải cho hai số 3 cùng được resolve bởi 4; không pop bằng nhau sớm.
- Next greater cần lưu index nếu output là distance; lưu value làm mất vị trí.
- Bracket `([)]` có balance theo từng loại bằng 0 nhưng nesting sai.
- Greedy deletion input giảm dần không pop trong scan; budget dư phải xóa tail.
- Pair cancellation `aaa`: chỉ cặp đầu cancel, ký tự thứ ba còn lại; không xóa cả run một lần nếu rule là adjacent pair.

## 9. Drills biến thể

### Drill A — next greater distance

Giữ cùng stack index, đổi lúc resolve thành `answer[top] = index - top`. Pattern không đổi; output projection đổi.

### Drill B — previous smaller-or-equal

Trước khi query top, pop các value `>` current; top còn lại là previous `<=`. Chú ý đây là **left query**: ghi answer cho current, khác next-query ghi answer cho phần tử bị pop.

### Drill C — circular next greater

Scan `index=0..2n-1`, đọc `real=index%n`; chỉ push khi `index<n`, nhưng lượt hai vẫn được phép pop/resolve. Không push lần hai để tránh duplicate state.

### Drill D — wildcard bracket

Một wildcard có thể là opener/closer khiến một deterministic stack không đủ. Với một loại ngoặc có thể giữ khoảng `[minOpen,maxOpen]`; nhiều loại thường cần DP/backtracking tùy bound. Đây là ví dụ knob làm pattern cũ mất hiệu lực.

## 10. Câu hỏi mở tư duy

- Stack lưu value hay index? Output cần gì?
- Equal có pop không? Viết counterexample duplicate trước khi code.
- Answer được ghi cho current hay cho item bị pop?
- Item đã pop có chắc không bao giờ hữu ích lại?
- Sau vòng lặp, stack còn lại nhận default hay phải dùng deletion budget?

## 11. Checklist 15 giây

Nói thành câu: **stack chứa ai, monotone theo chiều nào, current pop top khi nào, strictness ra sao, pop xong ghi đáp án cho ai, và xử lý stack còn lại thế nào**.
