# PF05 — Queue order và event simulation

Nguồn: [OF007](../official-lessons/OF007.md), [OF009](../official-lessons/OF009.md), [OF010](../official-lessons/OF010.md), [OF054](../official-lessons/OF054.md), [SR004](../official-lessons/SR004.md), [SR005](../official-lessons/SR005.md).

## 1. Tín hiệu nhận dạng

Đề có một hoặc nhiều luồng mà thứ tự đến phải được giữ: “đầu hàng”, “vào trước”, “chờ”, “đến thời điểm”, “xử lý rồi đưa lại cuối”, “không được vượt qua”. Queue phù hợp khi phần tử hợp lệ tiếp theo nằm ở front; event simulation phù hợp khi state chỉ đổi tại các mốc rời rạc.

Đầu tiên phải viết **scheduling rule**, rồi mới chọn cấu trúc: FIFO, round-robin, priority, hay LIFO resume là bốn luật khác nhau.

## 2. Không dùng khi

- Luôn chọn min/max tốt nhất trong toàn bộ tập đang chờ: heap, không phải queue thuần.
- Công việc bị ngắt gần nhất được làm lại trước: stack như nhánh resume của SR005.
- Cần thêm/xóa cả hai đầu: deque thực sự.
- Có thể nhảy thẳng giữa event nhưng vẫn mô phỏng từng giây: logic có thể đúng nhưng chậm và dễ sai tie.

## 3. Decision tree

```text
Chỉ lấy front của một/nhiều nguồn? → head pointer cho mỗi nguồn
Xử lý xong chưa đạt thì về cuối?    → circular queue / re-enqueue
Front khóa cả batch phía sau?        → scan boundary theo front
Có duration/capacity/exit time?      → queue record + event simulation
Hai queue chỉ chuyển front qua lại?  → logical concatenated array + pointers
Bị preempt và resume gần nhất?        → event sort + paused stack
Chọn priority toàn cục?               → PF06 heap
```

## 4. Knobs tạo biến thể

- Arrival có sẵn thứ tự hay phải sort.
- Xử lý một lần hay re-enqueue.
- Time chạy từng tick hay nhảy tới event tiếp theo.
- Tie cùng thời điểm: exit, completion, arrival, start—thứ tự nào theo contract?
- Capacity tính theo số item hay tổng weight.
- Queue một nguồn, hai nguồn độc lập, hay chuyển item giữa hai queue.
- Preemption có hay không; resume FIFO, LIFO hay priority.

## 5. Invariant cốt lõi

Với head pointer, vùng `[0,head)` đã được tiêu thụ và vùng `[head,length)` giữ nguyên thứ tự FIFO. Không splice/shift nên mỗi item được đọc `O(1)`.

Event simulation phải có invariant thời gian: ngay trước khi xử lý event tại `t`, mọi event có thời điểm `< t` đã được áp dụng, không event `> t` bị áp dụng sớm. Với bridge queue, queue chứa đúng xe đang trên cầu theo thứ tự vào; tổng weight bằng tổng record trong queue.

Hai queue tổng bằng nhau dựa trên conserved sum: move chỉ chuyển phần tử, không đổi tổng toàn hệ thống. Khi sum queue1 lớn target, chỉ move front queue1→queue2; khi nhỏ làm ngược lại.

## 6. Code core đáng thuộc

```js
function consumeTwoFifo(firstDeck, secondDeck, goal) {
  let first = 0;
  let second = 0;
  for (const wanted of goal) {
    if (firstDeck[first] === wanted) first++;
    else if (secondDeck[second] === wanted) second++;
    else return false;
  }
  return true;
}
```

```js
function processRoundRobin(items, done) {
  const queue = [...items];
  let head = 0;
  while (head < queue.length) {
    const item = queue[head++];
    if (done(item)) return item;
    queue.push(item);
  }
  return null;
}
```

Trong bài thật cần bound/guarantee termination; core trên chỉ minh họa transition re-enqueue.

## 7. Counterexamples bóc lỗi

- Dùng `includes`: deck `[water,drink]` không thể lấy `drink` trước.
- OF007: task đầu chưa xong dù task sau xong vẫn khóa batch sau.
- Xe rời cầu đúng giây xe mới xét vào: nếu enter trước exit có thể báo quá tải giả.
- Round-robin quên original index sẽ không biết target đã được xử lý.
- Hai queue có tổng lẻ thì impossible ngay; loop không bound có thể chạy mãi.
- SR005 có khoảng trống đủ hoàn thành nhiều paused task: phải `while`, không chỉ pop một lần.

## 8. Drills biến thể

### Drill A — event jump thay tick

Mỗi job có `finishTime`. Thay tăng `time++`, nhảy tới min(nextArrival, front.finishTime), rồi xử lý tie theo contract. So số iteration giữa hai bản với duration rất lớn.

### Drill B — queue có timeout

Trước khi phục vụ ở time `t`, bỏ mọi front có deadline `< t`. Nếu deadline không monotone theo arrival, front-only removal không đủ; cần heap deadline hoặc cấu trúc khác.

### Drill C — weighted round-robin

Mỗi item được chạy tối đa quantum `q`; trừ remaining và re-enqueue nếu còn. Thêm arrival giữa chừng buộc tách pending-by-time và ready queue.

### Drill D — đổi resume rule

SR005 resume gần nhất nên stack. Nếu đề đổi thành bài bị dừng sớm nhất resume trước, chỉ thay paused stack thành queue; event engine giữ nguyên. Nếu resume task ngắn nhất, chuyển paused state thành min-heap.

## 9. Câu hỏi mở tư duy

- “Next” được quyết định bởi arrival order hay priority?
- Có thể nhảy qua khoảng không có event không?
- Event đồng thời xử lý theo thứ tự nào và test tie nhỏ nhất là gì?
- Item rời queue có quay lại không?
- Pointer tiến tối đa bao nhiêu lần; termination bound là gì?

## 10. Checklist 15 giây

Chốt năm thứ: **record trong queue, ý nghĩa head, scheduling rule, event order khi tie, và điều kiện mỗi item được dequeue/re-enqueue tối đa bao nhiêu lần**.
