# 08 — Stack và Queue

> Trạng thái: **Hoàn thiện concept-first**; theory nền, 22 bài thật, audit 47 bài Kit, derived concepts và bằng chứng tại [QA.md](chapters/08_stack_queue/QA.md).

## Mục tiêu

Chọn cấu trúc theo thứ tự state phải lấy ra: stack lấy mới nhất (LIFO), queue lấy cũ nhất (FIFO), monotonic stack giữ ứng viên chưa bị loại. Không dùng `Array.shift()` cho queue dài vì mỗi lần phải reindex phần còn lại.

## Bản đồ chọn dạng

| Tín hiệu | State | Dạng |
| --- | --- | --- |
| Matching lồng nhau, undo, rollback | `push/pop/top` | [SQ-01](chapters/08_stack_queue/01_Stack_Monotonic.md#dạng-1-sq-01--stack-matching-và-undo) |
| Next greater/smaller, ứng viên bị value mới thống trị | stack index monotonic | [SQ-02](chapters/08_stack_queue/01_Stack_Monotonic.md#dạng-2-sq-02--monotonic-stack) |
| FIFO, xử lý theo lượt, batching | array + `head` | [SQ-03](chapters/08_stack_queue/02_Queue_Circular_BFS.md#dạng-3-sq-03--queue-bằng-head-index) |
| Capacity cố định, tái sử dụng buffer | `buffer,head,tail,size` | [SQ-04](chapters/08_stack_queue/02_Queue_Circular_BFS.md#dạng-4-sq-04--circular-queue) |
| Shortest unweighted/theo lớp | queue + visited/distance | [SQ-05](chapters/08_stack_queue/02_Queue_Circular_BFS.md#dạng-5-sq-05--bfs-queue) |

## JavaScript notes

- Stack dùng `push`, `pop`, `stack[stack.length - 1]`.
- Queue dùng `queue.push(value)` và `queue[head++]`, không `shift()`.
- BFS mark visited khi enqueue để mỗi state vào queue tối đa một lần.
- Circular queue cần `size` để phân biệt empty/full khi `head === tail`.

## Lộ trình

1. [Nhập môn Stack/Queue](chapters/08_stack_queue/00_Beginner_Guide.md)
2. [Stack và monotonic stack](chapters/08_stack_queue/01_Stack_Monotonic.md)
3. [Queue, circular queue và BFS](chapters/08_stack_queue/02_Queue_Circular_BFS.md)
4. [Practice Ladder](chapters/08_stack_queue/03_Practice_Ladder.md)
5. [Bộ 22 bài Programmers/PCCP](chapters/08_stack_queue/04_Programmers_PCCP_Set.md)
6. [Audit Practice Kit](chapters/08_stack_queue/05_Programmers_Kit_Audit.md)
7. [Concept rút ra từ bài thật](chapters/08_stack_queue/06_Programmers_Derived_Concepts.md)
8. [Solutions nền](solutions/08_Stack_Queue_Solutions.md) và [solutions bộ bài thật](solutions/08_Stack_Queue_Programmers_Solutions.md) — chỉ mở sau nỗ lực.
9. [QA và coverage lock](chapters/08_stack_queue/QA.md)

## Mastery Gate

- [ ] Nhận diện đúng ít nhất 10/12 bài không nhìn ID.
- [ ] Viết từ trắng bracket matching, next greater, head-index queue, circular queue và BFS.
- [ ] Nói được invariant trước mỗi push/pop/enqueue/dequeue.
- [ ] Chứng minh mỗi index monotonic stack chỉ push/pop tối đa một lần.
- [ ] Không dùng `shift()`; BFS mark khi enqueue.
- [ ] Practice, solutions, behavioral tests và recall D3 đều đạt.
