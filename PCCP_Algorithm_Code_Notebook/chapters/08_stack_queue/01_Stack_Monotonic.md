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

## `[SQ-02]` — Monotonic stack: các index chưa được giải quyết

> Golden example của [Core → Template → Variants Framework](../../00_CORE_TEMPLATE_VARIANTS_FRAMEWORK.md). Phần này là canonical lesson; các bài cụ thể phía dưới chỉ chọn variant knobs.

### Core — current giải quyết hoặc loại các top cũ

Xét bài nhỏ: với mỗi số, tìm số **lớn hơn đầu tiên bên phải**.

```text
[2, 1, 3] → [3, 3, -1]
```

Khi đọc `2`, ta chưa biết đáp án nên giữ vị trí của nó. Đọc `1` vẫn chưa giải quyết được `2`, nên `1` cũng chờ. Đến `3`, current giải quyết `1` trước rồi tiếp tục giải quyết `2`. Cả hai rời stack; `3` vào chờ một số lớn hơn về sau.

Điểm cốt lõi không phải “stack giữ số lớn nhất”. Stack giữ các ứng viên **chưa được giải quyết**. Current nhìn top gần nhất:

- nếu current là đáp án đầu tiên của top, pop và ghi đáp án;
- nếu top bị current làm cho không còn cơ hội tối ưu, pop để loại ứng viên;
- nếu top là biên đã hoàn tất khi scan ngược, pop để chốt biên.

Pattern loại bỏ việc mỗi index quét lại cùng một suffix. Mỗi index chờ một lần rồi rời stack một lần.

### Dấu hiệu nhận dạng

- **Câu chữ:** “đầu tiên bên trái/phải”, “gần nhất lớn hơn/nhỏ hơn”, “bao lâu cho tới khi…”, “loại phần tử đứng trước bị current thống trị”, “biên gần nhất”.
- **Constraint:** `n` lớn khiến quét phần còn lại cho từng vị trí không kịp; thường cần từ `O(n²)` xuống `O(n)`.
- **Cấu trúc:** đáp án của nhiều vị trí cũ có thể được quyết định bởi cùng một current; chỉ ứng viên gần nhất chưa bị loại cần được xét trước.
- **Không phải cứ min/max là dùng:** tìm maximum toàn mảng chỉ cần một biến. Nếu cần arbitrary range minimum, monotonic stack không tự trả lời mọi query.

### Brute force và phần công việc bị lặp

Với next greater right, cách tự nhiên là tại mỗi `i`, quét `j=i+1..n-1` tới khi gặp `values[j] > values[i]`.

```text
[5, 4, 3, 2, 1]
i=0 quét 4 ô; i=1 quét lại 3 ô; i=2 quét lại 2 ô...
```

Không có vị trí nào tìm được đáp án, nên tổng so sánh là `4+3+2+1 = O(n²)`. Phần bị lặp chính là các suffix đã được những index trước quét qua. Stack nén suffix đó thành đúng các index còn có thể cần current tương lai.

### State — vì sao thường lưu index?

| Representation | Lưu khi nào | Lấy được gì | Mất gì |
| --- | --- | --- | --- |
| `index` | lựa chọn mặc định | value qua `values[index]`, vị trí, distance, ghi `answer[index]` | cần giữ input |
| `value` | chỉ cần so/pop và output chính là stack | code ngắn | không biết vị trí hay distance |
| `{value, count}` | gom các value bằng nhau để đếm span/frequency | multiplicity mà không giữ từng index | không trả lời riêng từng vị trí |

Trong template tìm phần tử cho từng vị trí, `stack` lưu **unresolved indices**. `answer` lưu kết quả đã chốt. Default (`-1`, `0`, `n-index-1`, `null`) là một variant của contract, không phải luật của stack.

### Invariant

Với next strictly greater right, ngay sau khi push `index`:

1. mọi index trong stack thuộc prefix đã đọc và chưa có greater bên phải;
2. index tăng từ đáy lên đỉnh;
3. value **không tăng** từ đáy lên đỉnh. Nếu một top nhỏ hơn current tồn tại, nó đã bị pop;
4. mọi index đã pop đã nhận đúng greater đầu tiên, vì current là phần tử đầu tiên đủ điều kiện được gặp khi scan trái → phải.

Với first smaller right, dấu so sánh đảo lại và value trong stack không giảm. “Increasing/decreasing stack” phải nói rõ theo hướng đáy → đỉnh và theo strictness; chỉ gọi tên mà không viết invariant là chưa đủ.

### Transition — thứ tự không được đảo

```text
1. while current resolve/loại được top:
2.     pop top để lấy index cũ
3.     ghi answer nếu bài yêu cầu resolve
4. push current sau khi mọi top bị thống trị đã rời stack
```

Phải lấy index bằng `pop()` trước khi ghi hoặc lưu top vào biến rồi pop; nếu chỉ pop và quên index, ta mất vị trí cần cập nhật. Phải dùng `while`, không dùng `if`, vì một current có thể giải quyết nhiều index cũ.

### Template tìm phần tử bên phải — current resolve top

```js
function firstMatchingOnRight(values, options) {
  const {
    notFound,
    currentResolvesTop,
    buildAnswer,
  } = options;
  const answer = Array(values.length).fill(notFound);
  const stack = [];

  // TEMPLATE: scan trái → phải; stack chứa unresolved indices.
  for (let index = 0; index < values.length; index += 1) {
    // VARIANT: greater/smaller và strict/non-strict nằm trong predicate.
    while (
      stack.length > 0
      && currentResolvesTop(values[index], values[stack.at(-1)])
    ) {
      const previousIndex = stack.pop();
      // VARIANT: trả value/index/distance/count do builder quyết định.
      answer[previousIndex] = buildAnswer(previousIndex, index, values);
    }

    // TEMPLATE: current chỉ vào stack sau khi resolve hết top phù hợp.
    stack.push(index);
  }

  // VARIANT: default đã fill; vài đề cần flush stack theo suffix tới cuối.
  return answer;
}
```

Ví dụ next strictly greater value chọn:

```js
const nextGreater = firstMatchingOnRight([2, 1, 3], {
  notFound: -1,
  // VARIANT: strict greater; greater-or-equal đổi > thành >=.
  currentResolvesTop: (current, top) => current > top,
  // VARIANT: bài này trả value, không trả distance.
  buildAnswer: (_previousIndex, index, values) => values[index],
});
```

### Template tìm phần tử bên trái — pop ứng viên rồi đọc top

Previous greater/smaller thường không chờ current tương lai trả lời. Tại current, ta loại các top không thể là đáp án; top còn lại chính là phần tử gần nhất bên trái.

```js
function firstMatchingOnLeft(values, options) {
  const {
    notFound,
    topCannotAnswerCurrent,
    buildAnswer,
  } = options;
  const answer = Array(values.length).fill(notFound);
  const stack = [];

  // TEMPLATE: scan trái → phải; current hỏi state của prefix.
  for (let index = 0; index < values.length; index += 1) {
    // VARIANT: pop các top sai relation/strictness.
    while (
      stack.length > 0
      && topCannotAnswerCurrent(values[stack.at(-1)], values[index])
    ) {
      stack.pop();
    }

    // TEMPLATE: sau while, top gần nhất là đáp án nếu tồn tại.
    if (stack.length > 0) {
      // VARIANT: trả value/index/distance.
      answer[index] = buildAnswer(stack.at(-1), index, values);
    }

    stack.push(index);
  }

  return answer;
}
```

Previous strictly greater dùng `topCannotAnswerCurrent: (top, current) => top <= current`. Dấu bằng phải bị pop vì value bằng current không “strictly greater”.

### Tám variant knobs

| Nút | Lựa chọn | Phần code đổi | Test phân biệt |
| --- | --- | --- | --- |
| 1. Quan hệ | greater / smaller | hướng comparison | `[2,1,3]` |
| 2. Strictness | `>`/`<` hoặc `>=`/`<=` | có pop value bằng nhau không | `[2,2]` |
| 3. Hướng | left / right | current đọc top hay resolve top; đôi khi đổi chiều scan | `[3,1,2]` |
| 4. State | index / value / `{value,count}` | representation và khả năng truy hồi | duplicate + yêu cầu distance |
| 5. Return | value / index / distance / count | `buildAnswer` hoặc cách aggregate | cùng input, bốn contract |
| 6. Not found | `-1` / `0` / `null` / tới cuối | khởi tạo hoặc flush cuối | phần tử cuối |
| 7. Topology | linear / circular | scan `n` hay `2n`, chỉ push index vòng đầu | `[5,1,2]` vòng tròn |
| 8. Vai trò pop | resolve / loại ứng viên / chốt biên | có ghi answer lúc pop hay đọc top sau pop | next greater / tạo số lớn / histogram |

Circular không có nghĩa push mỗi index hai lần. Một template phổ biến scan `0..2n-1`, dùng `index % n` để resolve các index vòng đầu và chỉ push khi `index < n`; nếu không, state duplicate và proof “push một lần” không còn đúng.

### Bảng so sánh các bài cùng họ

| Bài | Hướng và invariant | Pop khi | Lưu / trả | Vai trò pop |
| --- | --- | --- | --- | --- |
| Next Greater Element | trái→phải; stack value không tăng | `current > top` | index / value hoặc distance | current resolve top |
| Giá cổ phiếu / First Smaller Right | trái→phải; stack value không giảm | `current < top` | index / duration | current resolve top; phần còn lại kéo tới cuối |
| Previous Greater | trái→phải; bỏ top `<= current` | `top <= current` | index / value/index/distance | loại ứng viên, rồi đọc top |
| Tạo số lớn | output stack giảm, k là budget | `top < current && k>0` | value / chuỗi | loại chữ số kém; không ghi answer riêng |
| Histogram *(preview)* | stack index cột tăng theo height | `topHeight > currentHeight` | index / max area | pop để chốt right boundary; top mới cho left boundary |

Histogram chỉ là preview vì invariant về biên và sentinel cần một canonical lesson riêng nếu sau này có Coverage ID; không suy ra công thức diện tích chỉ từ template next greater.

### Dry run 1 — pop vì current lớn hơn

Next greater value, `[2,1,3]`, stack hiển thị `index:value`:

| current | stack trước | pop và ghi | stack sau |
| --- | --- | --- | --- |
| `0:2` | `[]` | — | `[0:2]` |
| `1:1` | `[0:2]` | — | `[0:2, 1:1]` |
| `2:3` | `[0:2, 1:1]` | `1→3`, `0→3` | `[2:3]` |

Kết quả `answer = [3,3,-1]`. Stack giảm theo value từ đáy lên đỉnh trước khi `3` đến.

### Dry run 2 — pop theo hướng ngược vì current nhỏ hơn

First smaller right distance, `[3,4,2]`:

| current | stack trước | pop và ghi distance | stack sau |
| --- | --- | --- | --- |
| `0:3` | `[]` | — | `[0:3]` |
| `1:4` | `[0:3]` | — | `[0:3, 1:4]` |
| `2:2` | `[0:3, 1:4]` | `1→1`, `0→2` | `[2:2]` |

Kết quả `[2,1,0]`. Lần này stack tăng theo value và `current < top` mới pop. Hai dry run giống lifecycle `while → pop → ghi → push`, nhưng relation ngược nhau.

### Complexity — vì sao nested `while` vẫn `O(n)`?

Vòng `for` chạy `n` lần. Một iteration có thể pop nhiều item, nhưng một index đã pop sẽ không bao giờ quay lại stack. Với bản linear chuẩn, mỗi index push đúng một lần và pop tối đa một lần: tổng push ≤ `n`, tổng pop ≤ `n`. Vì vậy toàn bộ thân `while` chạy tối đa `n` lần trên cả chương trình, time `O(n)`, không phải `O(n²)`. Stack và answer cùng có thể giữ `n` phần tử nên auxiliary space `O(n)` (không tính output thì riêng stack vẫn tệ nhất `O(n)`).

### Mapping bài cụ thể vào canonical pattern

| Bài | Pattern ID / template | Knobs chọn | Giữ nguyên | Thay đổi và edge case |
| --- | --- | --- | --- | --- |
| [S08-C02](03_Practice_Ladder.md#s08-c02-sq-02--next-greater-distance) | `SQ-02` / right-resolve | greater, strict, right, index, distance, `0`, linear, resolve | while→pop→write→push; unresolved invariant | `buildAnswer=i-previous`; `[2,2]→[0,0]` |
| [SQ-P06 Giá cổ phiếu](04_Programmers_PCCP_Set.md#sq-p06--giá-cổ-phiếu--level-2) | `SQ-02` / right-resolve + flush | smaller, strict, right, index, distance tới cuối | unresolved indices; amortized proof | stack còn lại nhận `n-1-index`; equal không giảm |
| [SQ-P13 Số lớn hơn phía sau](04_Programmers_PCCP_Set.md#sq-p13--số-lớn-hơn-phía-sau--level-2) | `SQ-02` / right-resolve | greater, strict, right, index, value, `-1` | lifecycle canonical | ghi current value; singleton `[-1]` |
| [SQ-P07 Tạo số lớn](04_Programmers_PCCP_Set.md#sq-p07--tạo-số-lớn--level-2) | `SQ-02` / dominated-pop | greater, strict, left-prefix, value, output, linear, eliminate | while-pop-push và monotonic candidate state | thêm budget `k`; input giảm dần phải xóa đuôi |

Full implementations và tests nằm ở [practice solutions](../../solutions/08_Stack_Queue_Solutions.md) và [Programmers solutions](../../solutions/08_Stack_Queue_Programmers_Solutions.md).

### Lỗi thường gặp và test làm lộ lỗi

- Dùng `if` thay `while`: `[2,1,3]` sẽ chỉ resolve `1`, bỏ sót `2`.
- Lưu value khi cần distance: `[5,1,6]` không còn index để tính `2` và `1`.
- Sai strictness: `[2,2]` phân biệt greater với greater-or-equal.
- Quên flush contract “tính tới cuối”: Giá cổ phiếu `[1,2,3]` phải trả `[2,1,0]`.
- Pop đúng relation nhưng đọc answer trước/sau sai: previous greater phải pop ứng viên sai **rồi đọc top**, không ghi answer cho item vừa pop.

### Bài luyện nhận dạng/transfer — không ghi sẵn tên pattern

1. Mỗi tòa nhà cần biết khoảng cách tới tòa đầu tiên bên phải thấp hơn nó; nếu không có, tính tới rìa khu đất. Viết state bằng lời và chọn default.
2. Một tín hiệu tại vị trí `i` chỉ nhận được từ trạm gần nhất bên trái có công suất **lớn hơn hoặc bằng** nó. Trả index trạm, không có trả `-1`. Duplicate nào phân biệt strictness?
3. Xóa tối đa `k` ký tự khỏi một chuỗi để chuỗi còn lại nhỏ nhất theo thứ tự từ điển, không đổi thứ tự tương đối. Phần nào của template giữ nguyên, condition nào đảo?
4. Dữ liệu chạy vòng tròn; với mỗi sensor tìm sensor mạnh hơn đầu tiên khi đi sang phải, không được dùng chính nó. Làm sao scan hai vòng mà mỗi index chỉ nằm trong state một lần?
5. Cho nhiều truy vấn minimum trên đoạn bất kỳ. Giải thích vì sao dấu hiệu “nhỏ hơn” chưa đủ để dùng bộ xương này.

**Recall Card `[SQ-02]`:** unresolved indices + `while → pop → resolve/eliminate → push`. **Blank Page:** viết hai template right/left và chỉ ra dòng `VARIANT`. **Explain Back:** dùng accounting push/pop để chứng minh tuyến tính.

## Transfer Test A

Làm [S08-T01](03_Practice_Ladder.md#s08-t01--undo-có-ngưỡng-sq-01sq-03).
