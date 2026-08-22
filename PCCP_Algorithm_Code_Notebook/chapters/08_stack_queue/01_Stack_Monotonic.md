# Stack và monotonic stack — `SQ-01..02`

[← Index](../../08_Stack_Queue.md) · [Tiếp →](02_Queue_Circular_BFS.md)

## Dạng 1 `[SQ-01]` — Stack matching và undo

**Dấu hiệu nhận dạng:** thao tác mới nhất chưa khép phải được xử lý trước: opening/closing lồng nhau, undo/rollback hoặc postfix evaluation. **Brute force bottleneck:** liên tục tìm/xóa opening gần nhất hay replay lịch sử có thể thành `O(n²)`; stack giữ đúng frontier chưa khép. **Transition:** opening/action mới thì push; closing/undo phải check top rồi pop; cuối contract matching yêu cầu stack rỗng.

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

### Gold standard — Dry run → Code reconstruction: Giá cổ phiếu / 주식가격

**Bài toán cụ thể.** Với mỗi giây `i`, trả số giây giá `prices[i]` không giảm. Nếu lần đầu giảm ở `j`, đáp án là `j - i`; nếu không bao giờ giảm, đáp án là `n - 1 - i`. Dùng input thật của đề:

```text
prices = [1, 2, 3, 2, 3]
answer = [4, 3, 1, 1, 0]
```

Stack ghi `index:price`. Một index nằm trong stack nghĩa là: “đã thấy giá ở index này, nhưng chưa thấy giá tương lai thấp hơn nó”.

#### 1. Dry run chi tiết của traversal

| Lượt / current | State trước | Điều kiện chính xác được xét | Hành động | State sau | Answer đổi |
| --- | --- | --- | --- | --- | --- |
| `i=0`, giá `1` | stack `[]`; answer `[0,0,0,0,0]` | `stack.length > 0` là `false` | Không vào `while`; push `0` | `[0:1]` | Chưa đổi |
| `i=1`, giá `2` | `[0:1]` | `2 < prices[0]` → `2 < 1` là `false` | Không pop; push `1` | `[0:1,1:2]` | Chưa đổi |
| `i=2`, giá `3` | `[0:1,1:2]` | `3 < prices[1]` → `3 < 2` là `false` | Không pop; push `2` | `[0:1,1:2,2:3]` | Chưa đổi |
| `i=3`, giá `2` | `[0:1,1:2,2:3]` | `2 < prices[2]` → `2 < 3` là `true` | Pop `2`; gán `answer[2]=3-2=1` | `[0:1,1:2]` | `[0,0,1,0,0]` |
| vẫn `i=3`, giá `2` | `[0:1,1:2]` | `2 < prices[1]` → `2 < 2` là `false` | Dừng `while`; giá bằng nhau không phải giảm; push `3` | `[0:1,1:2,3:2]` | Không đổi |
| `i=4`, giá `3` | `[0:1,1:2,3:2]` | `3 < prices[3]` → `3 < 2` là `false` | Không pop; push `4` | `[0:1,1:2,3:2,4:3]` | Chưa đổi |

Traversal đã hết nhưng các index `0,1,3,4` vẫn chưa gặp giá thấp hơn. Chỉ lúc này mới cleanup:

| Cleanup | State trước | Điều kiện chính xác | Hành động | State sau | Answer đổi |
| --- | --- | --- | --- | --- | --- |
| 1 | `[0:1,1:2,3:2,4:3]` | `stack.length > 0` → `true` | pop `4`; `answer[4]=4-4=0` | `[0:1,1:2,3:2]` | `[0,0,1,0,0]` (gán ô 4) |
| 2 | `[0:1,1:2,3:2]` | `true` | pop `3`; `answer[3]=4-3=1` | `[0:1,1:2]` | `[0,0,1,1,0]` |
| 3 | `[0:1,1:2]` | `true` | pop `1`; `answer[1]=4-1=3` | `[0:1]` | `[0,3,1,1,0]` |
| 4 | `[0:1]` | `true` | pop `0`; `answer[0]=4-0=4` | `[]` | `[4,3,1,1,0]` |
| dừng | `[]` | `stack.length > 0` → `false` | thoát cleanup | `[]` | hoàn tất |

#### 2. Câu hành động bằng tiếng Việt

> Giá hiện tại đi vào lượt xử lý → nhìn index trên đỉnh đang chờ → nếu giá hiện tại thấp hơn thì pop và chốt thời lượng, rồi kiểm tra tiếp đỉnh mới → khi không còn giá cũ nào bị giảm, push index hiện tại → tăng `i`. Sau khi không còn giá tương lai nào để đọc, pop toàn bộ index còn chờ và tính thời lượng tới giây cuối.

Ở `i=3`, một current có thể xử lý nhiều giá cũ nên câu “rồi kiểm tra tiếp đỉnh mới” là bắt buộc, dù input này chỉ pop một index ở lượt đó.

#### 3. Suy ra state, không đoán biến

| Thông tin phải sống sang lượt sau | Biến lưu | Vì sao khởi tạo như vậy |
| --- | --- | --- |
| Những thời điểm chưa gặp giá thấp hơn | `stack` chứa index | Ban đầu chưa đọc giá nào nên `[]`; lưu index để vừa đọc lại giá vừa tính `i - previousIndex` |
| Thời lượng đã chốt của từng giây | `answer` | `Array(n).fill(0)` đúng contract của phần tử cuối và là chỗ để ghi theo index; các ô chưa chốt vẫn được phân biệt bằng việc index còn trong stack |
| Vị trí/giá đang đến | `i`, `prices[i]` | `i` bắt đầu `0` vì traversal phải đọc mọi giá từ trái sang phải; current không cần sống ngoài iteration |
| Mốc cuối dùng cho phần chưa giảm | `n - 1` | Không cần biến mutable: sau traversal, mọi survivor kéo dài từ index của nó đến đúng index cuối |

Invariant sống qua hai iteration: ngay trước khi xử lý `i`, stack chỉ chứa index `< i` chưa gặp giá thấp hơn; giá từ đáy đến đỉnh không giảm.

#### 4. Suy ra loop

- Hành động lặp đúng một lần cho mỗi giá hiện tại trở thành `for (let i = 0; i < prices.length; i += 1)`.
- Hành động “current còn thấp hơn đỉnh thì tiếp tục giải quyết đỉnh” trở thành `while`. `if` không đủ: với `[3,4,2]` tại `i=2`, giá `2` phải pop cả index `1` **và** `0`; `if` chỉ gán một trong hai.
- Hành động lặp với mọi survivor sau khi đã đọc hết input trở thành một `while` thứ hai **sau** `for`. Nó không thuộc một current cụ thể.

#### 5. Ánh xạ logic Việt → code

| Logic của bài Giá cổ phiếu | JavaScript tương ứng |
| --- | --- |
| Tạo nơi ghi thời lượng cho đúng `n` giây | `const answer = Array(prices.length).fill(0);` |
| Giữ các thời điểm còn chờ tương lai | `const stack = [];` |
| Cho từng giá hiện tại đi vào | `for (let i = 0; i < prices.length; i += 1)` |
| Vẫn còn thời điểm đang chờ | `stack.length > 0` |
| Giá hiện tại thật sự thấp hơn giá cũ | `prices[i] < prices[stack.at(-1)]` |
| Lấy thời điểm vừa bị giảm ra khỏi nhóm chờ | `const previousIndex = stack.pop();` |
| Chốt số giây tới lần giảm đầu tiên | `answer[previousIndex] = i - previousIndex;` |
| Current chưa biết tương lai nên cho vào chờ | `stack.push(i);` |
| Đã hết input, survivor kéo dài tới cuối | `answer[index] = prices.length - 1 - index;` |
| Trả đủ thời lượng theo thứ tự ban đầu | `return answer;` |

#### 6. Dựng code tăng dần

Không chép thẳng đáp án. Mỗi bước dưới đây lặp lại **toàn bộ function đã dựng tới thời điểm đó**. Nhìn các comment `MAIN FOR MỞ/ĐÓNG`, `WHILE BÊN TRONG FOR`, `CLEANUP SAU FOR` và `RETURN SAU CLEANUP` để luyện đặt dấu `}`.

**Bước 1 — function shell**

> **Prediction checkpoint:** Block function chạy per current hay bao toàn bộ thuật toán? Input nào phải có trước? Nếu đóng function trước các block còn lại thì những block đó còn truy cập được `prices` không?

```js
function stockPrices(prices) {
}
```

**Bước 2 — khai báo state**

> **Prediction checkpoint:** `answer` và `stack` phải sống trong một iteration hay qua mọi iteration? Ta đã biết kiểu state nào nhưng đã cần gán giá trị đầu chưa? Nếu khai báo chúng bên trong main `for`, lịch sử nào sẽ mất?

```js
function stockPrices(prices) {
  let answer;
  let stack;
}
```

**Bước 3 — initialization**

> **Prediction checkpoint:** Block này chạy một lần hay mỗi current? Ta đã biết `prices.length` và trạng thái “chưa có index chờ” chưa? Nếu reset `answer` hoặc `stack` trong main loop, giá tương lai còn thấy index cũ không?

```js
function stockPrices(prices) {
  const answer = Array(prices.length).fill(0);
  const stack = [];
}
```

**Bước 4 — main loop**

> **Prediction checkpoint:** Block này chạy một lần sau traversal hay một lần cho mỗi current? Ta cần biết số lượng giá nào? Dấu `}` nào phải đóng main `for` trước khi cleanup xuất hiện?

```js
function stockPrices(prices) {
  const answer = Array(prices.length).fill(0);
  const stack = [];

  // ┌── MAIN FOR MỞ: mọi code ở đây chạy cho từng current i.
  for (let i = 0; i < prices.length; i += 1) {
  }
  // └── MAIN FOR ĐÓNG: traversal đã đọc xong mọi current.
}
```

**Bước 5 — current item**

> **Prediction checkpoint:** `currentPrice` thuộc một iteration hay toàn traversal? Muốn đọc nó, `i` phải đã tồn tại ở đâu? Nếu đặt dòng này trước `for`, current có thay đổi khi `i` tăng không?

```js
function stockPrices(prices) {
  const answer = Array(prices.length).fill(0);
  const stack = [];

  // ┌── MAIN FOR MỞ
  for (let i = 0; i < prices.length; i += 1) {
    const currentPrice = prices[i];
  }
  // └── MAIN FOR ĐÓNG
}
```

**Bước 6 — condition: resolve-`while` thuộc current**

> **Prediction checkpoint:** Condition giảm giá phải chạy per current hay sau traversal? Trước khi check, ta phải biết `currentPrice` và top cũ nào? Nếu đặt `while` này sau main `for`, biến `i/currentPrice` còn đúng cho từng lần giảm không?

```js
function stockPrices(prices) {
  const answer = Array(prices.length).fill(0);
  const stack = [];

  // ┌── MAIN FOR MỞ
  for (let i = 0; i < prices.length; i += 1) {
    const currentPrice = prices[i];

    // ┌── WHILE GIẢM GIÁ: block này NẰM TRONG MAIN FOR.
    while (
      stack.length > 0
      && currentPrice < prices[stack.at(-1)]
    ) {
    }
    // └── WHILE GIẢM GIÁ ĐÓNG; vẫn còn ở trong iteration i.
  }
  // └── MAIN FOR ĐÓNG
}
```

**Bước 7 — transition: pop index vừa bị current làm giảm**

> **Prediction checkpoint:** Một lần pop thuộc resolve-`while` hay cleanup? Trước khi pop, condition nào phải bảo đảm stack không rỗng? Nếu pop nằm ngoài resolve-`while`, index không bị giảm có bị loại nhầm không?

```js
function stockPrices(prices) {
  const answer = Array(prices.length).fill(0);
  const stack = [];

  // ┌── MAIN FOR MỞ
  for (let i = 0; i < prices.length; i += 1) {
    const currentPrice = prices[i];

    // ┌── WHILE GIẢM GIÁ NẰM TRONG MAIN FOR
    while (
      stack.length > 0
      && currentPrice < prices[stack.at(-1)]
    ) {
      const previousIndex = stack.pop();
    }
    // └── WHILE GIẢM GIÁ ĐÓNG

    // Current chưa biết tương lai: push đúng một lần, sau resolve-while.
    stack.push(i);
  }
  // └── MAIN FOR ĐÓNG
}
```

**Bước 8 — answer update khi tìm thấy lần giảm đầu tiên**

> **Prediction checkpoint:** Phép gán này chạy cho mỗi current hay cho mỗi index bị pop? Ta phải biết cả `i` hiện tại và `previousIndex` nào? Nếu đưa phép gán ra ngoài `while`, làm sao ghi đủ hai ô với input `[3,4,2]`?

```js
function stockPrices(prices) {
  const answer = Array(prices.length).fill(0);
  const stack = [];

  // ┌── MAIN FOR MỞ
  for (let i = 0; i < prices.length; i += 1) {
    const currentPrice = prices[i];

    // ┌── WHILE GIẢM GIÁ NẰM TRONG MAIN FOR
    while (
      stack.length > 0
      && currentPrice < prices[stack.at(-1)]
    ) {
      const previousIndex = stack.pop();
      answer[previousIndex] = i - previousIndex;
    }
    // └── WHILE GIẢM GIÁ ĐÓNG

    stack.push(i);
  }
  // └── MAIN FOR ĐÓNG
}
```

Với riêng Stock Prices `[3,4,2]`, tại `i=2` cùng một current `2` phải gán `answer[1]=1`, rồi kiểm tra top mới và gán `answer[0]=2`. Đây là lý do dùng `while`, không phải `if`; ví dụ next-greater `[2,1,3]` không được dùng để suy ra block của bài này.

**Bước 9 — cleanup sau traversal**

> **Prediction checkpoint:** Cleanup chạy per current hay đúng một lần sau traversal? Ta chỉ được biết “index này không bao giờ gặp giá thấp hơn” sau khi đã biết điều gì? Nếu block này đặt bên trong main `for`, stack còn giữ được index 2 cho giá `2` ở `i=3` không?

```js
function stockPrices(prices) {
  const answer = Array(prices.length).fill(0);
  const stack = [];

  // ┌── MAIN FOR MỞ
  for (let i = 0; i < prices.length; i += 1) {
    const currentPrice = prices[i];

    // ┌── WHILE GIẢM GIÁ NẰM TRONG MAIN FOR
    while (
      stack.length > 0
      && currentPrice < prices[stack.at(-1)]
    ) {
      const previousIndex = stack.pop();
      answer[previousIndex] = i - previousIndex;
    }
    // └── WHILE GIẢM GIÁ ĐÓNG

    stack.push(i);
  }
  // └── MAIN FOR ĐÓNG: phải đóng ở đây, trước cleanup.

  // ┌── CLEANUP WHILE: chạy một lần SAU toàn bộ MAIN FOR.
  while (stack.length > 0) {
    const index = stack.pop();
    answer[index] = prices.length - 1 - index;
  }
  // └── CLEANUP WHILE ĐÓNG
}
```

**Bước 10 — return sau cleanup**

> **Prediction checkpoint:** Return thuộc một iteration hay toàn function? Trước khi return, những survivor nào phải đã được cleanup? Nếu return nằm trong main `for` hoặc trước cleanup, answer nào còn dang dở?

```js
function stockPrices(prices) {
  const answer = Array(prices.length).fill(0);
  const stack = [];

  // ┌── MAIN FOR MỞ
  for (let i = 0; i < prices.length; i += 1) {
    const currentPrice = prices[i];

    // ┌── WHILE GIẢM GIÁ NẰM TRONG MAIN FOR
    while (
      stack.length > 0
      && currentPrice < prices[stack.at(-1)]
    ) {
      const previousIndex = stack.pop();
      answer[previousIndex] = i - previousIndex;
    }
    // └── WHILE GIẢM GIÁ ĐÓNG

    stack.push(i);
  }
  // └── MAIN FOR ĐÓNG

  // ┌── CLEANUP WHILE SAU MAIN FOR
  while (stack.length > 0) {
    const index = stack.pop();
    answer[index] = prices.length - 1 - index;
  }
  // └── CLEANUP WHILE ĐÓNG

  // RETURN SAU CLEANUP: answer lúc này mới hoàn tất mọi index.
  return answer;
}
```

#### 7. Block scope: vị trí là một phần của thuật toán

| Block | Đặt ở đâu | Vì sao | Nếu chuyển sai chỗ |
| --- | --- | --- | --- |
| `answer`, `stack` | Trước `for` | Phải sống qua mọi giá | Khai báo trong `for` làm mất toàn bộ lịch sử sau mỗi lượt |
| Đọc `currentPrice` | Trong mỗi iteration | Nó phụ thuộc `i` hiện tại | Đặt trước loop chỉ đọc một giá; cập nhật answer sai current |
| `while` giảm giá | Trong iteration, trước push current | Current phải resolve hết index cũ trước khi tự vào chờ | Đặt sau `stack.push(i)` làm current tự so với chính nó và chặn các top cũ |
| Pop + gán `i - previousIndex` | Bên trong `while` | Mỗi top được pop cần một phép gán riêng với cùng current | Đưa phép gán ra ngoài chỉ còn index cuối hoặc dùng biến ngoài scope |
| `stack.push(i)` | Trong `for`, sau `while` | Mỗi current vào chờ đúng một lần | Đặt trong `while` có thể push nhiều lần hoặc không push khi không có giảm |
| Cleanup | Sau toàn bộ `for` | Chỉ khi hết traversal mới biết survivor “không bao giờ giảm” | Đặt trong `for` kết luận quá sớm và xóa lịch sử cần cho tương lai |
| `return` | Sau cleanup | Cần hoàn tất mọi ô answer | Return trong loop dừng ngay ở giá đầu |

**Đúng lỗi thật của người học.** Main `for/while` đã đúng, nhưng cleanup bị đặt trong `for`:

```js
for (let i = 0; i < prices.length; i += 1) {
  while (stack.length > 0 && prices[i] < prices[stack.at(-1)]) {
    const previousIndex = stack.pop();
    answer[previousIndex] = i - previousIndex;
  }
  stack.push(i);

  // SAI: block này vẫn nằm trong for.
  while (stack.length > 0) {
    const index = stack.pop();
    answer[index] = prices.length - 1 - index;
  }
}
```

Ngay cuối `i=0`, code vừa push `0` rồi cleanup chạy tới khi `stack=[]`; `answer[0]` bị gán `4` dựa trên giả định chưa hề kiểm chứng rằng giá `1` không giảm. Cuối `i=1`, index `1` cũng bị pop; cứ mỗi iteration, cleanup làm rỗng toàn bộ stack. Vì vậy ở `i=3`, giá `2` không còn thấy index `2` (giá `3`) để chốt lần giảm ở khoảng cách `1`: các index trước đã bị xóa khỏi state. Giá tương lai chỉ có thể resolve index còn tồn tại trong stack; đã pop thì không còn đường tham chiếu tới index đó trong main `while`.

Sửa đúng là đóng `}` của `for` **trước** cleanup (đây là fragment vị trí block, không phải chương trình độc lập):

```text
  stack.push(i);
} // hết traversal trước

while (stack.length > 0) {
  const index = stack.pop();
  answer[index] = prices.length - 1 - index;
}
```

#### 8. Code hoàn chỉnh và dry run theo từng phép gán answer

```js
function stockPrices(prices) {
  const answer = Array(prices.length).fill(0);
  const stack = [];

  // ┌── MAIN FOR MỞ
  for (let i = 0; i < prices.length; i += 1) {
    const currentPrice = prices[i];

    // ┌── WHILE GIẢM GIÁ NẰM TRONG MAIN FOR
    while (
      stack.length > 0
      && currentPrice < prices[stack.at(-1)]
    ) {
      const previousIndex = stack.pop();
      answer[previousIndex] = i - previousIndex;
    }
    // └── WHILE GIẢM GIÁ ĐÓNG

    stack.push(i);
  }
  // └── MAIN FOR ĐÓNG TRƯỚC CLEANUP

  // ┌── CLEANUP WHILE NẰM SAU MAIN FOR
  while (stack.length > 0) {
    const index = stack.pop();
    answer[index] = prices.length - 1 - index;
  }
  // └── CLEANUP WHILE ĐÓNG

  // RETURN NẰM SAU CLEANUP
  return answer;
}
```

| Thời điểm gán | Ô được gán | Lý do chính xác | Answer ngay sau gán |
| --- | --- | --- | --- |
| khởi tạo | mọi ô nhận default `0` | tạo output; chưa phải kết luận cho index 0..3 | `[0,0,0,0,0]` |
| traversal `i=3` | `answer[2]=1` | `prices[3]=2 < prices[2]=3`; lần giảm đầu tiên của index 2 | `[0,0,1,0,0]` |
| cleanup pop 4 | `answer[4]=0` | từ index 4 tới cuối là 0 giây | `[0,0,1,0,0]` |
| cleanup pop 3 | `answer[3]=1` | không giảm sau index 3; tới cuối 1 giây | `[0,0,1,1,0]` |
| cleanup pop 1 | `answer[1]=3` | không có giá `<2` sau index 1; giá bằng 2 không tính giảm | `[0,3,1,1,0]` |
| cleanup pop 0 | `answer[0]=4` | không có giá `<1`; kéo tới index 4 | `[4,3,1,1,0]` |

#### 9. Ba cách viết sai thực tế

| Code sai | Input làm lộ lỗi | Lượt state sai đầu tiên | Nguyên nhân | Block sửa |
| --- | --- | --- | --- | --- |
| Cleanup nằm trong `for` | `[1,2,3,2,3]` | cuối `i=0`: stack từ `[0]` thành `[]`; đến `i=3` không còn index 2 | Kết luận “tới cuối” trước khi đọc tương lai | Đưa toàn bộ cleanup ra sau dấu `}` của `for` như block ở mục 7 |
| `if (condition)` thay `while` | `[3,4,2]` | `i=2`: chỉ pop index 1, stack còn `[0]` dù `2 < 3` | Một current có thể làm giảm nhiều giá cũ | Dùng `while (stack.length > 0 && prices[i] < prices[stack.at(-1)]) { pop; assign; }` |
| Dùng `<=` thay `<` | `[2,2]` | `i=1`: index 0 bị pop và gán 1 vì `2 <= 2` | Giá bằng nhau không phải “giảm” | Condition đúng: `prices[i] < prices[stack.at(-1)]` |
| Push current trước `while` | `[3,2]` | `i=1`: top là chính index 1; `2 < 2` false, index 0 bị che | Current tự chặn việc nhìn top cũ | Đặt toàn bộ resolve-`while` trước `stack.push(i)` |

#### 10. Ba bài reconstruction

1. **Chỉ nhìn bảng mapping:** che toàn bộ code; dựng lại `stockPrices` theo từng hàng của mục 5. Sau mỗi dòng, nói biến đó phải sống tới block nào.
2. **Chỉ nhìn hành động Việt:** dùng đúng câu ở mục 2, tự quyết định chỗ mở/đóng ngoặc. Test bắt buộc `[3,4,2]` và giải thích vì sao có hai lần pop trong một `i`.
3. **Chỉ nhìn đề:** “với mỗi giá, tính thời gian đến lần đầu giá thấp hơn; nếu không có thì đến cuối”. Không xem từ khóa stack. Tự viết brute force, chỉ ra suffix bị quét lại, rồi dựng state “index chưa được giải quyết” và code hoàn chỉnh.

### Lỗi thường gặp và test làm lộ lỗi

- Riêng Giá cổ phiếu, dùng `if` thay `while`: với `[3,4,2]` tại `i=2`, code chỉ resolve index `1` và bỏ sót index `0`. Ví dụ `[2,1,3]` phía trên thuộc next-greater, không phải dry run của Giá cổ phiếu.
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
