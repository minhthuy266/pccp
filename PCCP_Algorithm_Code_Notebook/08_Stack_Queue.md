# 08 — Stack và Queue

> Trạng thái: **Hoàn thiện concept-first**; theory nền, 22 bài thật, audit 47 bài Kit, derived concepts và bằng chứng tại [QA.md](chapters/08_stack_queue/QA.md).

## Mục tiêu

Chọn cấu trúc theo thứ tự state phải lấy ra: stack lấy mới nhất (LIFO), queue lấy cũ nhất (FIFO), monotonic stack giữ ứng viên chưa bị loại. Không dùng `Array.shift()` cho queue dài vì mỗi lần phải reindex phần còn lại.

## Bản đồ: 5 bộ xương, nhưng nhiều tình huống đề thật

`SQ-01..05` là 5 bộ xương implementation có thể tái sử dụng. Chúng **không** có nghĩa là Stack/Queue chỉ có 5 kiểu đề. Một đề thật thường là biến thể hoặc kết hợp của các bộ xương này.

| Tín hiệu | State | Dạng |
| --- | --- | --- |
| Matching lồng nhau, undo, rollback | `push/pop/top` | [SQ-01](chapters/08_stack_queue/01_Stack_Monotonic.md#dạng-1-sq-01--stack-matching-và-undo) |
| Next greater/smaller, ứng viên bị value mới thống trị | stack index monotonic | [SQ-02](chapters/08_stack_queue/01_Stack_Monotonic.md#dạng-2-sq-02--monotonic-stack) |
| FIFO, xử lý theo lượt, batching | array + `head` | [SQ-03](chapters/08_stack_queue/02_Queue_Circular_BFS.md#dạng-3-sq-03--queue-bằng-head-index) |
| Capacity cố định, tái sử dụng buffer | `buffer,head,tail,size` | [SQ-04](chapters/08_stack_queue/02_Queue_Circular_BFS.md#dạng-4-sq-04--circular-queue) |
| Shortest unweighted/theo lớp | queue + visited/distance | [SQ-05](chapters/08_stack_queue/02_Queue_Circular_BFS.md#dạng-5-sq-05--bfs-queue) |

## Những tình huống bạn phải thật sự làm được

| Tình huống đề thật | Bộ xương gốc | Điểm khác phải hiểu |
| --- | --- | --- |
| Dấu ngoặc lồng nhau | `SQ-01` stack matching | top phải là opening chưa đóng gần nhất |
| Xóa cặp kề nhau/Game gắp thú | `SQ-01` reduction stack | pop có thể làm hai item cũ trở thành kề nhau |
| Undo/rollback | `SQ-01` stack snapshot | push **state cũ**, không phải state mới |
| Next greater/smaller, giá cổ phiếu | `SQ-02` monotonic stack | stack giữ index chưa có đáp án; dấu `<`/`<=` là luật đề |
| Tạo số lớn | `SQ-02` monotonic stack + budget | vừa pop phần tử bị thống trị vừa đếm quyền xóa còn lại |
| FIFO đơn thuần | `SQ-03` head-index queue | dequeue bằng `queue[head++]`, không `shift()` |
| Phát triển tính năng | `SQ-03` batch queue | task sau không được vượt task trước; phải chốt batch |
| Process/printer | `SQ-03` re-enqueue queue | job chưa đủ priority quay lại cuối hàng |
| Xe tải qua cầu | `SQ-03` capacity/time queue | queue giữ event rời đi + state weight/time |
| Circular buffer cố định | `SQ-04` | cần `size` để phân biệt full/empty khi `head === tail` |
| BFS đường ngắn nhất | `SQ-05` | visited lúc enqueue, queue đi theo layer |
| BFS component | `SQ-05` | mỗi BFS phủ đúng một vùng/node group chưa visited |
| Multi-source BFS | `SQ-05` | enqueue toàn bộ nguồn ở distance 0 trước khi chạy |
| BFS có chìa khóa/phá tường/lever | `SQ-05` + state nhiều chiều | queue và visited phải chứa cả tài nguyên/trạng thái phụ |

Hai lesson cần học theo bảng này là [phần lõi từ gốc](chapters/08_stack_queue/01_Core_From_Zero.md) và [phần nâng cao từ gốc](chapters/08_stack_queue/02_Advanced_From_Zero.md). Đây mới là phạm vi thực tế cần nắm trước khi nói “biết Stack/Queue”.

## Coverage checklist: 10 concept đã có ở đâu?

| Concept cần bao trọn | Lesson giải từ gốc | Bài thật để kiểm tra |
| --- | --- | --- |
| Reduction/output stack | [Core §1](chapters/08_stack_queue/01_Core_From_Zero.md#1-matching-và-reduction-vì-sao-phải-nhìn-đúng-phần-tử-gần-nhất) | Không thích số giống nhau, Game gắp thú, Xóa cặp |
| Matching stack | [Core §1](chapters/08_stack_queue/01_Core_From_Zero.md#1-matching-và-reduction-vì-sao-phải-nhìn-đúng-phần-tử-gần-nhất) | Dấu ngoặc đúng, Xoay ngoặc |
| Undo/rollback snapshot | [Mastery guide §1](chapters/08_stack_queue/00_Exam_Mastery_Guide.md#1-stack-thường--unfinished-state-nằm-trên-đỉnh) | Hộp hàng, Transfer Undo |
| Monotonic unresolved stack | [Core §2](chapters/08_stack_queue/01_Core_From_Zero.md#2-monotonic-stack-không-giữ-lớn-nhất-mà-giữ-người-chưa-có-đáp-án) | Giá cổ phiếu, Số lớn hơn phía sau |
| Monotonic stack + deletion budget | [Mastery guide §2](chapters/08_stack_queue/00_Exam_Mastery_Guide.md#2-monotonic-stack--các-ứng-viên-chưa-có-đáp-án) | Tạo số lớn |
| FIFO queue/head index | [Core §3](chapters/08_stack_queue/01_Core_From_Zero.md#3-queue-arrival-order-và-head-index) | FIFO cơ bản, hot potato |
| Batch và re-enqueue scheduling | [Core §3](chapters/08_stack_queue/01_Core_From_Zero.md#3-queue-arrival-order-và-head-index) + [Advanced §1](chapters/08_stack_queue/02_Advanced_From_Zero.md#1-re-enqueue-scheduling-không-đến-lượt-thì-quay-lại-cuối-hàng) | Phát triển tính năng, Process |
| Capacity/time queue | [Advanced §2](chapters/08_stack_queue/02_Advanced_From_Zero.md#2-capacitytime-queue-queue-giữ-event-rời-đi) | Xe tải qua cầu |
| Circular buffer | [Advanced §3](chapters/08_stack_queue/02_Advanced_From_Zero.md#3-circular-queue-head--tail-chưa-nói-được-empty-hay-full) | Circular queue drill |
| BFS queue: shortest/component/multi-state | [Core §4](chapters/08_stack_queue/01_Core_From_Zero.md#4-bfs-queue-là-lý-do-khoảng-cách-ngắn-nhất) + [Advanced §4](chapters/08_stack_queue/02_Advanced_From_Zero.md#4-bfs-component-và-state-nhiều-chiều) | Đường ngắn nhất bản đồ game, Khai thác dầu, Thoát mê cung |

**Kết luận coverage:** đủ 10/10 concept Stack/Queue. Mỗi concept đã có lesson, code/dry run hoặc test bẫy, và ít nhất một bài thật/drill để transfer. Đừng bỏ qua Practice Ladder: coverage tài liệu đủ không có nghĩa người học đã đạt mastery.

## JavaScript notes

- Stack dùng `push`, `pop`, `stack[stack.length - 1]`.
- Queue dùng `queue.push(value)` và `queue[head++]`, không `shift()`.
- BFS mark visited khi enqueue để mỗi state vào queue tối đa một lần.
- Circular queue cần `size` để phân biệt empty/full khi `head === tail`.

## Lộ trình: cứ đi theo thứ tự này

### Lượt 1 — Hiểu cách nghĩ trước

1. [Lộ trình mastery Stack/Queue](chapters/08_stack_queue/00_Exam_Mastery_Guide.md): đọc để biết phải nhận diện state nào; không cần thuộc code.
2. [Nhập môn Stack/Queue](chapters/08_stack_queue/00_Beginner_Guide.md): chỉ bắt buộc nếu bạn chưa tự viết được `push/pop/top` và queue `head` index.
3. [Stack/Queue phần lõi từ gốc](chapters/08_stack_queue/01_Core_From_Zero.md): matching/reduction, monotonic stack, FIFO batch, BFS.
4. [Queue/BFS nâng cao từ gốc](chapters/08_stack_queue/02_Advanced_From_Zero.md): scheduling, capacity/time queue, circular buffer, BFS nhiều state.

Hai file theory cũ — [Stack/monotonic](chapters/08_stack_queue/01_Stack_Monotonic.md) và [Queue/circular/BFS](chapters/08_stack_queue/02_Queue_Circular_BFS.md) — là **tài liệu tham chiếu**. Chỉ mở đúng mục liên quan khi bạn bí ở một concept hoặc cần thêm biến thể; không đọc nối tiếp ngay lượt đầu.

### Lượt 2 — Biến cách nghĩ thành phản xạ

5. [Practice Ladder](chapters/08_stack_queue/03_Practice_Ladder.md): làm theo tầng, không xem solution trước.
6. [Bộ 22 bài Programmers/PCCP](chapters/08_stack_queue/04_Programmers_PCCP_Set.md): làm theo thứ tự ở mastery guide; mỗi bài phải ghi state và test bẫy trước code.
7. Chỉ sau nỗ lực mới mở [solutions nền](solutions/08_Stack_Queue_Solutions.md) hoặc [solutions bộ bài thật](solutions/08_Stack_Queue_Programmers_Solutions.md).

### Lượt 3 — Kiểm tra transfer

8. [Concept rút ra từ bài thật](chapters/08_stack_queue/06_Programmers_Derived_Concepts.md): đọc sau khi đã làm vài bài để tự đối chiếu “các bài này giống nhau ở state nào”.
9. [Audit Practice Kit](chapters/08_stack_queue/05_Programmers_Kit_Audit.md) và [QA](chapters/08_stack_queue/QA.md) chỉ để kiểm tra coverage/kỹ thuật; không phải bài học cần đọc.

## Mastery Gate

- [ ] Nhận diện đúng ít nhất 10/12 bài không nhìn ID.
- [ ] Viết từ trắng bracket matching, next greater, head-index queue, circular queue và BFS.
- [ ] Nói được invariant trước mỗi push/pop/enqueue/dequeue.
- [ ] Chứng minh mỗi index monotonic stack chỉ push/pop tối đa một lần.
- [ ] Không dùng `shift()`; BFS mark khi enqueue.
- [ ] Practice, solutions, behavioral tests và recall D3 đều đạt.
