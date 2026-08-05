# Stack và monotonic stack — `SQ-01..02`

[← Index](../../08_Stack_Queue.md) · [Tiếp →](02_Queue_Circular_BFS.md)

## Dạng 1 `[SQ-01]` — Stack matching và undo

### A. Bản chất

Stack giữ state chưa khép lại theo LIFO. Closing token chỉ ghép opening gần nhất; undo chỉ đảo thao tác mới nhất. Nếu phần tử cũ nhất phải ra trước thì đó là queue.

### B. Mental model

Chồng đĩa: chỉ lấy được chiếc vừa đặt trên cùng.

### C. Template tư duy

```text
Opening/thao tác mới → push.
Closing/undo → kiểm tra top rồi pop.
Thiếu top hoặc sai loại → invalid.
Invariant: stack chứa đúng state chưa khép của prefix.
```

### D. Template code

```js
function isBalanced(text) {
  const matching = new Map([[`)`, `(`], [`]`, `[`], [`}`, `{`]]);
  const stack = [];
  for (const char of text) {
    if (`([{`.includes(char)) stack.push(char);
    else if (matching.has(char) && stack.pop() !== matching.get(char)) return false;
  }
  return stack.length === 0;
}
```

### E. Bài mẫu — Dấu ngoặc hợp lệ

1. **Đề:** kiểm tra `()[]{}` lồng đúng. 2. `([{}])→true`, `([)]→false`. 3. Ký tự khác bỏ qua. 4. Replace cặp lặp có thể O(n²). 5. Closing cần opening gần nhất. 6. Chọn stack. 7. State là opening chưa match. 8. Open push; close check/pop. 9. Invariant: stack đúng chuỗi opening chưa đóng của prefix. 10. Scan một lần, cuối phải rỗng. 11. Code như template. 12. `pop()` empty trả `undefined`, tự fail. 13. Dry run:

| Bước | Item | State trước | Điều kiện | Hành động | State sau |
| --- | --- | --- | --- | --- | --- |
| 1 | `(` | `[]` | open | push | `[(]` |
| 2 | `[` | `[(]` | open | push | `[(,[]` |
| 3 | `)` | `[(,[]` | top sai | false | dừng |

14. O(n) time/O(n) space. 15. Chỉ đếm; quên loại/top; quên kiểm tra stack cuối. 16. Undo editor: push thao tác, `UNDO` pop gần nhất.

**Recall Card `[SQ-01]`:** newest unfinished ở top. **Blank Page:** matcher 90 giây. **Mutation:** undo `ADD/UNDO`. **Explain Back:** vì sao đếm open/close không đủ?

## Dạng 2 `[SQ-02]` — Monotonic stack

### A. Bản chất

Stack giữ ứng viên chưa bị value mới thống trị. Với next greater, current lớn hơn top thì current là greater đầu tiên của top: resolve rồi pop. Các index còn lại monotonic theo value.

### B. Mental model

Người cao mới đến che liên tiếp những người thấp ở cuối hàng; người chưa bị che tiếp tục chờ.

### C. Template tư duy

```text
Push index nếu cần distance.
While current resolve/dominates top: ghi answer[top], pop.
Push current.
Invariant: stack là index chưa có answer theo monotonic value.
```

### D. Template code

```js
function nextGreaterValues(values) {
  const answer = Array(values.length).fill(-1);
  const stack = [];
  for (let index = 0; index < values.length; index += 1) {
    while (stack.length && values[index] > values[stack[stack.length - 1]]) {
      answer[stack.pop()] = values[index];
    }
    stack.push(index);
  }
  return answer;
}
```

### E. Bài mẫu — Khoảng cách tới phần tử lớn hơn kế tiếp

1. **Đề:** số bước tới value lớn hơn đầu tiên bên phải, không có trả 0. 2. `[2,1,3]→[2,1,0]`. 3. Strict greater. 4. Scan suffix O(n²). 5. Nhiều index cùng chờ current. 6. Monotonic stack. 7. `stack,answer`. 8. Current greater thì pop và ghi distance. 9. Stack chứa index chưa resolve, value giảm không nghiêm. 10. Mỗi index push một lần. 11. Code:

```js
function distanceToNextGreater(values) {
  const answer = Array(values.length).fill(0);
  const stack = [];
  for (let index = 0; index < values.length; index += 1) {
    while (stack.length && values[index] > values[stack[stack.length - 1]]) {
      const previous = stack.pop();
      answer[previous] = index - previous;
    }
    stack.push(index);
  }
  return answer;
}
```

12. Ghi trước khi mất index; `>` khác `>=`. 13. Dry run:

| Bước | Item/index | State trước | Điều kiện | Hành động | State sau |
| --- | --- | --- | --- | --- | --- |
| 1 | i0=2 | `[]` | — | push0 | `[0]` |
| 2 | i1=1 | top2 | không resolve | push1 | `[0,1]` |
| 3 | i2=3 | top1 rồi2 nhỏ hơn | pop hai index | ghi 1 và 2 | ans `[2,1,0]` |

14. O(n) vì mỗi index push/pop tối đa một lần; O(n) space. 15. Push value khi cần distance; dùng `if` thay `while`; sai strictness. 16. Previous smaller đổi chiều scan/condition.

**Recall Card `[SQ-02]`:** unresolved indices + dominated-pop. **Blank Page:** next greater distance. **Mutation:** greater-or-equal. **Explain Back:** vì sao nested while vẫn O(n)?

## Transfer Test A

Làm [S08-T01](03_Practice_Ladder.md#s08-t01--undo-có-ngưỡng).

