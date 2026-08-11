# Core → Template → Variants Framework

[← README](README.md) · [Coverage Matrix](PATTERN_COVERAGE_MATRIX.md) · [Learning System](00_Learning_System.md)

Tài liệu này là hợp đồng nội dung canonical của notebook. Framework được áp dụng ở cấp **pattern/concept**; bài cụ thể chỉ ánh xạ vào pattern và chọn các nút biến thể. Không sao chép 11 mục vào mọi lời giải.

## 1. Framework canonical

Một canonical pattern phải dẫn người học qua mạch sau:

1. **Core** — mở bằng ví dụ nhỏ, rồi chỉ ra chính xác phần công việc lặp mà pattern loại bỏ.
2. **Dấu hiệu nhận dạng** — câu chữ, constraint và cấu trúc dữ liệu khiến pattern đáng cân nhắc; kèm ít nhất một phản ví dụ dễ chọn nhầm.
3. **Brute force và phần việc bị lặp** — cách tự nhiên, complexity, bottleneck và vì sao constraint buộc đổi cách.
4. **State** — cấu trúc dữ liệu lưu điều gì; giải thích lựa chọn value, index, count hoặc object.
5. **Invariant** — câu kiểm chứng được, đúng tại một thời điểm xác định trước/sau mỗi vòng.
6. **Transition** — thứ tự check/update, item nào vào/ra state và khi nào ghi answer.
7. **Template** — code skeleton có placeholder, đánh dấu phần cố định và phần do đề quyết định.
8. **Các nút biến thể** — những lựa chọn làm đổi condition, traversal, representation hoặc return.
9. **Dry run** — chỉ giữ các cột làm state/answer thay đổi nhìn thấy được; không dùng bảng sáu cột theo quán tính.
10. **Complexity** — giải thích số lần mỗi item được duyệt/thêm/xóa, không chỉ ghi `O(...)`.
11. **Bài luyện nhận dạng/transfer** — đổi vỏ đề, không ghi sẵn tên pattern; buộc người học chọn state và variant knobs.

Mạch viết vẫn learner-first: ví dụ cụ thể → chạy bằng lời → đặt tên state → code ngắn → dry run → sau đó mới gọi tên thuật ngữ và tổng quát hóa.

## 2. Template Markdown cho một canonical pattern

````markdown
## `[ID]` — Tên pattern

### Core — ví dụ nhỏ trước

Đề mini, input/output và chạy bằng lời. Chốt một câu:
“Pattern loại bỏ việc ... bị làm lặp lại ...”.

### Dấu hiệu nhận dạng

- Câu chữ:
- Constraint:
- Cấu trúc:
- Phản ví dụ không dùng pattern này:

### Brute force và bottleneck

Cách tự nhiên → complexity → phần suffix/prefix/state bị tính lại.

### State

| Thành phần | Lưu gì | Vì sao representation này |
| --- | --- | --- |
| ... | ... | value/index/count/object |

### Invariant

Trước/sau mỗi iteration, ... luôn đúng.

### Transition

1. Check ...
2. Update/resolve ...
3. Đưa current vào state ...

### Template

```js
function solve(values) {
  // TEMPLATE: traversal và lifecycle cố định của pattern.
  const state = [];

  for (let index = 0; index < values.length; index++) {
    // VARIANT: condition do contract quyết định.
    while (state.length > 0 && SHOULD_REMOVE_TOP(values, state, index)) {
      const previous = state.pop();
      // VARIANT: value/index/distance/count và default.
      WRITE_ANSWER(previous, index, values);
    }

    // TEMPLATE: current bước vào state sau khi xử lý top.
    state.push(index);
  }

  return answer;
}
```

### Variant knobs

| Nút | Các lựa chọn | Dòng template bị ảnh hưởng | Test phân biệt |
| --- | --- | --- | --- |
| ... | ... | ... | ... |

### Dry run

| current | state trước | pop/update | state sau |
| --- | --- | --- | --- |

### Complexity

Giải thích aggregate/amortized và space sống đồng thời.

### Bài luyện nhận dạng/transfer

1. Đề đổi vỏ, không lộ pattern.
2. Đề gần giống nhưng cần pattern khác.
````

## 3. Template Markdown cho một bài cụ thể

Bài cụ thể không lặp lại toàn bộ canonical lesson. Nó phải đủ tự chứa để làm và kiểm thử, rồi map rõ về pattern:

````markdown
### `[Problem ID]` — Tên bài

**Contract:** input/output/constraint/ví dụ riêng.

**Pattern ID:** `[Coverage ID]` — link tới canonical lesson.
**Template dùng:** tên/hướng template.
**Variant knobs đã chọn:** strict/non-strict, traversal, representation, return, default...
**Phần giữ nguyên:** lifecycle/traversal/invariant nào lấy từ template.
**Phần thay đổi:** condition, state phụ, answer hoặc termination.
**Edge case riêng:** test làm lộ khác biệt.

```js
// Full solution có comment ở transition quyết định.
```

**Tests:** sample + revealing edge case.
**Complexity:** giải thích theo số transition, không chỉ nêu ký hiệu.
````

## 4. CORE, VARIANT, COMBINATION, OPTIONAL

| Loại | Ý nghĩa | Hợp đồng template |
| --- | --- | --- |
| `CORE` | Bộ xương nền, tự loại bỏ một bottleneck lặp lại quan trọng | Phải có canonical lesson và template tự viết từ trắng |
| `VARIANT` | Đổi state, condition, traversal hoặc return đủ lớn để dễ dùng sai core | `Có`: template tương phản riêng; `Không`: mutation rõ trên template gốc |
| `COMBINATION` | Ghép từ hai pattern trở lên | Không tạo skeleton giả; ghi owner duyệt, helper state, phần nào dùng từ mỗi template |
| `OPTIONAL` | Pattern ít ưu tiên hơn mục tiêu hiện tại | Vẫn phải đạt cùng chuẩn nếu ghi FULL; chỉ học sau CORE |

Loại pattern không nói về độ khó của bài. `COMBINATION` có thể khó hơn `CORE`, nhưng giá trị học nằm ở phân vai đúng chứ không phải học thuộc thêm một đoạn code.

## 5. Đánh dấu phần cố định và variant knobs

Trong code/pseudocode canonical:

- `TEMPLATE:` đánh dấu traversal, lifecycle state và invariant giữ nguyên giữa các bài.
- `VARIANT:` đánh dấu comparison, strictness, hướng, representation, answer, default hoặc termination do contract quyết định.
- Placeholder dùng tên có nghĩa như `SHOULD_POP`, `BUILD_ANSWER`, `NOT_FOUND`; không để code giả trông như implementation chạy được.

Trong bài cụ thể, không cần gắn nhãn mọi dòng. Phần mapping trước code phải nói phần nào giữ nguyên và phần nào thay đổi. Nếu đổi một nút làm invariant đổi, đó không còn là “thay dấu” nhỏ: phải viết lại invariant tương ứng.

## 6. Acceptance criteria để Coverage ID là FRAMEWORK-FULL

Trạng thái `FULL` lịch sử trong Coverage Matrix chỉ phản ánh hợp đồng cũ. Từ standard này, audit dùng trạng thái riêng `FRAMEWORK-FULL`; chỉ đồng bộ hai trạng thái sau khi validation đạt.

Một ID đạt `FRAMEWORK-FULL` khi có bằng chứng file/section cho tất cả:

- canonical lesson đủ Core, Recognition, Brute force, State, Invariant, Transition, Template (nếu loại yêu cầu), Variants, Dry run, Complexity và Transfer;
- practice có ít nhất một nhiệm vụ nhận dạng/transfer không lộ pattern trong câu hỏi;
- mọi Practice ID có đúng một solution; bài code có full solution và test;
- recall/transfer nối ngược về canonical lesson;
- QA của chapter xác nhận link, JavaScript parse, test hành vi và tập ID;
- không có internal Markdown link gãy, JavaScript fence lỗi parse hoặc placeholder nội dung dang dở;
- `CORE · Có` và `VARIANT · Có` có template; `COMBINATION` ghi rõ owner/helper; `OPTIONAL` không được giảm chuẩn chỉ vì ít ưu tiên.

Nếu thiếu một ô, audit giữ nguyên dữ liệu lịch sử nhưng báo `NEEDS-FRAMEWORK` và liệt kê bằng chứng thiếu. Không hạ/nâng trạng thái Coverage Matrix tự động.

## 7. Hợp đồng audit và thay đổi

- [Framework Coverage Audit](FRAMEWORK_COVERAGE_AUDIT.md) là snapshot toàn bộ Coverage ID theo 14 cột yêu cầu.
- `npm run check:notebook-framework` tái tạo snapshot, kiểm tra link, JavaScript fence, Practice/Solution, template bắt buộc, placeholder và bằng chứng FULL.
- Pilot chuẩn là [`SQ-02`](chapters/08_stack_queue/01_Stack_Monotonic.md#sq-02--monotonic-stack-các-index-chưa-được-giải-quyết). Các chapter khác chỉ được batch-refactor sau khi pilot và QA Chapter 08 đạt.
- Không xóa nội dung cũ trước khi ví dụ, test, invariant hoặc bài luyện của nó đã được chuyển sang cấu trúc mới.
