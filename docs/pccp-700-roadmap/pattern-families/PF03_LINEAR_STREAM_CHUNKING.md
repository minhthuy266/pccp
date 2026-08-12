# PF03 — Linear stream reduction và chunking

Nguồn: [OF006](../official-lessons/OF006.md), [OF019](../official-lessons/OF019.md), [SR002](../official-lessons/SR002.md).

## 1. Tín hiệu nhận dạng

Input được đọc trái→phải, quyết định tại vị trí mới chỉ phụ thuộc một state nhỏ của prefix: output cuối, phần tử/run trước, index trong chu kỳ. Đề có các từ “liên tiếp”, “lặp theo mẫu”, “nén theo đơn vị”, “giữ thứ tự”.

## 2. Không dùng khi

- Quyết định hiện tại cần nhìn xa và có thể phải rút lại nhiều lựa chọn: cân nhắc stack/backtracking/DP.
- Cần query mọi subarray: prefix/window phù hợp hơn.
- Group không liên tiếp: frequency Map, không phải run-length state.
- Chunk boundary không cố định và phải tối ưu toàn cục: có thể là DP parsing.

## 3. Decision tree

```text
Chỉ so với output cuối?            → output-as-state reduction
Pattern có chu kỳ cố định?         → index % period
Nhóm phần tử bằng nhau liên tiếp?  → previous + runCount + final flush
Phải thử mọi fixed chunk width?     → outer enumerate width, inner RLE
Boundary được chọn tự do?           → không còn fixed-chunk pattern; xem DP
```

## 4. Knobs tạo biến thể

- Equal theo value, normalized value hay custom predicate.
- Giữ một đại diện, giữ tối đa `k`, hay thay run bằng `{count,value}`.
- Chunk size cố định, được enumerate, hoặc thay đổi.
- Run count `1` có được in không.
- Stream finite hay online; online cần API `feed()` và `finish()` để flush.
- Cycle bắt đầu offset khác 0 hoặc pattern của mỗi người khác nhau.

## 5. Invariant

Reduction: sau prefix `0..i`, output là kết quả đúng của chính prefix đó. `output.at(-1)` là representative của run mở.

Chunk RLE: `encodedLength` mô tả mọi run đã đóng; `previous,count` mô tả duy nhất run đang mở. Vì thế khi gặp chunk khác phải flush run cũ trước khi reset. Hết input vẫn còn run mở nên final flush là transition bắt buộc.

## 6. Code core đáng thuộc

```js
function removeConsecutiveDuplicates(values) {
  const output = [];
  for (const value of values) {
    if (output.length === 0 || output.at(-1) !== value) output.push(value);
  }
  return output;
}
```

```js
function encodedLengthForUnit(text, unit) {
  let previous = text.slice(0, unit);
  let count = 1;
  let length = 0;
  const flush = () => previous.length + (count > 1 ? String(count).length : 0);

  for (let start = unit; start < text.length; start += unit) {
    const current = text.slice(start, start + unit);
    if (current === previous) count++;
    else {
      length += flush();
      previous = current;
      count = 1;
    }
  }
  return length + flush();
}
```

## 7. Counterexamples bóc lỗi

- `[1,1,2,1]` phải giữ `[1,2,1]`: Set sẽ xóa nhầm số 1 cuối.
- `aaaaaaaaaaa` có count 11: encoded count dài 2 digit, không được cộng cố định 1.
- Text có phần dư ngắn hơn unit: `slice` vẫn tạo chunk và phải flush.
- Quên final flush làm mất run cuối, lỗi không lộ nếu chỉ test empty/single transition.
- Cycle length 3 mà dùng `% answers.length` thay `% pattern.length` sẽ index sai.

## 8. Drills biến thể

### Drill A — giữ tối đa k phần tử mỗi run

Thay điều kiện emit bằng theo dõi `runCount`; reset khi value đổi, emit khi `runCount <= k`. Đây vẫn là stream state, không cần Map toàn cục.

### Drill B — online compressor

Viết object có `feed(chunk)` và `finish()`. Không được flush run chỉ vì một network chunk kết thúc; boundary dữ liệu vận chuyển không phải boundary logic.

### Drill C — wildcard equality

Nếu `?` match mọi ký tự, relation “hai chunk bằng nhau” có thể không bắc cầu. Hỏi lại liệu grouping greedy còn tạo equivalence class hợp lệ không; nếu không, core RLE cũ hỏng.

## 9. Câu hỏi mở tư duy

- State nhỏ nhất đủ quyết định item mới là output cuối hay cả count?
- Khi nào phải flush: value đổi, unit đổi, hay end-of-input?
- Có cần materialize output hay chỉ cần length/count?
- Quan hệ “giống nhau” có bắc cầu không?

## 10. Checklist 15 giây

Chốt: **stream unit, state của run mở, điều kiện flush, xử lý phần dư/cuối input, và lý do không dùng Set cho duplicate liên tiếp**.
