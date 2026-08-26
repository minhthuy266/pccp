# Chuẩn canonical: từ đề bài đến code

[← Navigator](../PCCP_700_MASTER_NAVIGATOR.md) · [Tracker](PROBLEM_EXPLANATION_TRACKER.md) · [Learning System](00_Learning_System.md)

Đây là **chuẩn duy nhất ở cấp bài có full solution**. Framework
[Core → Template → Variants](00_CORE_TEMPLATE_VARIANTS_FRAMEWORK.md) vẫn là chuẩn ở cấp
pattern; tài liệu này không tạo lộ trình mới. Một bài chỉ được tracker ghi `COMPLETE` khi
các mục dưới đây có nội dung riêng, kiểm chứng được; heading rỗng hoặc một câu chung chung
không được tính.

## Mạch học bắt buộc

```text
Đề → làm tay → brute force → bottleneck → pattern → state/init
→ loop → transition → invariant → blueprint → code → test → recall
```

### 1. Contract

Diễn giải ngắn bằng tiếng Việt, không chép dài đề: input/output, đại lượng phải tính,
điều kiện đúng, tie-break, indexing, mutation và trường hợp đặc biệt. Contract quyết định
kiểu cũng như giá trị khởi tạo của `answer`.

### 2. Bound

Ghi kích thước tối đa, miền giá trị và tính chất dữ liệu (sorted, positive, duplicate,
contiguous...). Phải kết luận `O(n²)` có đủ nhanh không và complexity cần hướng tới;
constraint là lý do chọn engine, không phải danh sách để trang trí.

### 3. Làm bằng tay

Dùng ví dụ nhỏ, kể đúng thao tác một người làm trước khi biết thuật toán. Bước này phải dẫn
tự nhiên tới brute force, không được nhảy thẳng sang tên pattern.

### 4. Brute force

Phải có logic tiếng Việt, pseudocode, **full JavaScript dễ đọc**, dry run ngắn, chứng minh
đúng và complexity. Nếu bound cho phép thì nói rõ brute force là lời giải cuối; không tối ưu
chỉ để trông “cao cấp”.

### 5. Bottleneck

Chỉ đúng thao tác bị tính lại, số lần lặp, vì sao timeout, và thông tin có thể giữ qua lượt
sau. Không chấp nhận câu đơn lẻ “brute force chậm”.

### 6. Pattern

Ghi pattern, tín hiệu trong đề, cách nó bỏ bottleneck, lý do đúng, và một counterexample gần
giống nhưng không dùng được pattern đó.

### 7. State và init

| State | Kiểu dữ liệu | Lưu chính xác cái gì | Tại sao cần | Giá trị ban đầu | Vì sao init như vậy | Scope |
| --- | --- | --- | --- | --- | --- | --- |
| `answer` | theo contract | output đã chốt | nơi trả kết quả | theo contract | chưa có kết quả | toàn hàm |

Mỗi bài thay dòng mẫu bằng state thật và phân biệt output, pointer, dữ liệu đang chờ,
current item, state toàn thuật toán và state reset mỗi iteration. Quy tắc init:

- cần giữ sang lượt sau → ngoài loop; mỗi lượt tính lại → trong loop;
- chưa đếm gì `0`; danh sách chưa có gì `[]`; mỗi vị trí cần đáp án
  `Array(n).fill(default)`;
- chưa có min/max → `Infinity`/`-Infinity`;
- boolean bắt đầu `true` hay `false` phải theo invariant, không theo thói quen.

### 8. Transition

Viết thành phép gán theo đúng thứ tự: lấy current → check → branch → update state → move
pointer/index → `break`/`continue`/`return`. Không viết “xử lý stack” hay “move phù hợp”.
Ví dụ đủ cụ thể: pop `previousIndex`; gán
`answer[previousIndex] = currentIndex - previousIndex`; giảm count của `leaving`; count về
0 thì xóa key; rồi tăng `left` vì item đó đã rời cửa sổ.

### 9. Invariant

Nêu thời điểm invariant đúng (đầu/cuối iteration), nghĩa chính xác của từng state, transition
bảo toàn nó ra sao, và vì sao không bỏ sót/đếm trùng. Invariant phải đối chiếu được với code.

### 10. Complexity

Giải thích số lần mỗi item được đọc, push/pop/add/remove; pointer có lùi không; Map/Set lớn
tối đa bao nhiêu. Nested `while` trong `for` vẫn `O(n)` khi một pointer chỉ tiến và mỗi item
bị loại tối đa một lần; phải nói rõ lập luận aggregate này.

## Code Blueprint bắt buộc

Mỗi dòng phải mang nội dung riêng của bài, không để trống:

```text
OUTPUT:
PREPARE:
GLOBAL STATE:
INIT:
MAIN LOOP:
CURRENT ITEM:
PER-ITERATION STATE:
CHECK:
BRANCH:
UPDATE:
POINTER MOVEMENT:
STOP / RETURN:
CLEANUP:
```

Ngay sau đó map blueprint sang block code:

```text
Contract       → kiểu và init của answer
State          → khai báo biến
Một lượt       → vòng lặp chính
Invariant      → điều kiện cần giữ hoặc khôi phục
Transition     → thân if/while
Stop           → break/continue/return
State tồn đọng → cleanup sau loop
```

## Quy tắc code dành cho người đang dựng code

1. Tách transition quan trọng: `const current = queue[head];` rồi `head++;`, không gộp
   `queue[head++]`.
2. Lần giảng đầu không dùng callback/arrow rút gọn che state. Viết callback có block và
   `return`; sau giải thích mới được đưa shorthand.
3. Không đặt nhiều transition quan trọng trên một dòng.
4. Dùng tên vai trò (`currentProcess`, `previousIndex`, `windowCount`), tránh
   `a`, `b`, `x`, `temp`, `data`, `item`.
5. Comment giải thích **vì sao**, không đọc lại cú pháp.
6. “với từng index/quét A→B” chọn `for`; “trong khi còn đúng/queue còn item” chọn `while`;
   một current giải quyết nhiều state chờ → `while` trong `for`.
7. Nếu có hai implementation hợp lệ, trình bày ưu/nhược: `shift()` với head pointer,
   `for + count` với nested `while`, brute force với monotonic stack, stack với counter.

## Dry run, lỗi và recall

Dry run chỉ giữ cột làm transition nhìn thấy được:

| Lượt/current | State trước | Check | Update | State sau | Answer |
| --- | --- | --- | --- | --- | --- |

Phải có case thường; case `while` chạy nhiều lần nếu có; case phân biệt `<`/`<=`; state
rỗng; phần tử cuối/cleanup. Mỗi bài liệt kê lỗi logic, off-by-one, check/update order, init,
hidden test, performance và **test nhỏ làm lộ từng lỗi**.

Cuối bài có ba tầng, không lặp full solution ở tầng 3:

```text
Recall 1 — logic: các quyết định bằng lời
Recall 2 — Blueprint: STATE / LOOP / CHECK / UPDATE / RETURN
Recall 3 — code điền khuyết: blank tại transition quyết định
```

## Template phòng thi 30 phút

```text
OUT:
LIMIT:
HAND:
BRUTE:
SLOW:
PATTERN:
STATE + INIT:
LOOP + INVARIANT:
UPDATE + STOP:

PREPARE → STATE → LOOP → CURRENT → CHECK → UPDATE → CLEANUP → RETURN
```

## Hợp đồng audit và xuất bản

- Không sửa `archive`; không xóa nội dung cũ trước khi chuyển đủ ví dụ/test/invariant.
- Nâng file canonical hiện hữu. Deep explanation tách riêng chỉ khi cần và phải link hai chiều.
- Giữ link nguồn official; không sao chép nguyên đề.
- Tracker liệt kê từng bài có full solution, đường dẫn canonical và bằng chứng từng cột.
- `COMPLETE` chỉ khi đủ standard; `PARTIAL` nếu có code nhưng thiếu một bằng chứng;
  `INDEX-ONLY` nếu chỉ là catalog; `DUPLICATE` phải trỏ về canonical; `ARCHIVE` không sửa.
- Sau mỗi batch: parse JavaScript fence, kiểm link, placeholder, test hành vi, `npm test` và
  `npm run check:all`; cập nhật tracker bằng kết quả thật.

