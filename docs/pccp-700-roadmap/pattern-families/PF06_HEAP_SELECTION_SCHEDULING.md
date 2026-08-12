# PF06 — Heap selection và scheduling

Nguồn: [OF012](../official-lessons/OF012.md), [OF013](../official-lessons/OF013.md), [OF014](../official-lessons/OF014.md).

## 1. Tín hiệu nhận dạng

Trong quá trình xử lý, tập ứng viên thay đổi và mỗi bước phải lấy min/max hiện tại: hai độ cay nhỏ nhất, job ngắn nhất trong các job đã đến, hoặc xóa hai đầu priority queue. Nếu sort lại sau mỗi update là quá tốn, heap thường là lõi.

Heap chỉ bảo đảm truy cập root, không duy trì full sorted order.

## 2. Không dùng khi

- Data static và chỉ sort/scan một lần.
- Cần tìm/xóa phần tử arbitrary theo value mà không có id/index phụ.
- Priority thay đổi sau khi insert: cần push version mới + lazy deletion hoặc heap hỗ trợ decrease-key.
- Scheduling rule là FIFO/LIFO; heap sẽ phá contract.
- Cần cả min và max nhưng chỉ có một heap đơn: không thể lấy đầu kia hiệu quả.

## 3. Decision tree

```text
Repeated extract-min/max + insert? → một heap
Candidates chỉ hợp lệ sau arrival? → sort arrival + heap ready set
Cần min và max động?               → hai heap + unique id + lazy deletion
Chỉ top-k từ stream?               → heap size k
Priority key có update?            → version/id + stale check
```

## 4. Knobs tạo biến thể

- Min hay max: đảo comparator, không đảo logic tùy tiện.
- Priority đơn hay nhiều tầng: comparator tuple `(duration,start,index)`.
- Item duplicate: value không đủ định danh, cần unique id.
- Candidate availability theo thời gian.
- System idle: nhảy time tới arrival kế tiếp.
- Delete lazy: khi nào record stale và làm sạch root ra sao.
- Objective: shortest average waiting khác earliest deadline; không tự suy greedy.

## 5. Invariant và proof

Heap invariant: với min-heap, key của parent không lớn hơn key children; vì vậy root là minimum toàn heap. Push chỉ bubble-up đường tổ tiên; pop thay root bằng last rồi bubble-down một đường.

Scheduling OF013: trước mỗi selection, heap chứa **mọi và chỉ** job có arrival `<= currentTime` chưa chạy. Chọn duration nhỏ nhất trong tập sẵn sàng giảm tổng completion/waiting theo exchange argument; không được đưa job tương lai vào sớm.

Hai heap lazy deletion: một `alive[id]` là nguồn sự thật. Trước peek/pop phải bỏ root có id đã chết; duplicate value vẫn tách biệt nhờ id.

## 6. Code core đáng thuộc

```js
function push(heap, value, compare) {
  heap.push(value);
  let child = heap.length - 1;
  while (child > 0) {
    const parent = Math.floor((child - 1) / 2);
    if (compare(heap[parent], heap[child]) <= 0) break;
    [heap[parent], heap[child]] = [heap[child], heap[parent]];
    child = parent;
  }
}
```

```js
function cleanStale(heap, alive, popRoot) {
  while (heap.length > 0 && !alive[heap[0].id]) popRoot(heap);
}
```

Code heap đầy đủ dùng lại template repo; điều cần thuộc là comparator contract, không phải copy từng ký tự.

## 7. Counterexamples bóc lỗi

- OF012 trộn hai phần tử đầu array thay vì hai minimum: `[1,100,2]` lộ sai greedy.
- Scheduler đưa job chưa đến vào heap sẽ chọn duration ngắn từ tương lai.
- Khi ready heap rỗng, tăng time từng đơn vị với arrival rất xa gây TLE; phải jump.
- Double heap dùng value làm alive key sẽ xóa nhầm một trong các duplicate.
- Chỉ clean stale sau pop: peek trước đó có thể trả root đã chết.
- Comparator trả boolean thay số âm/0/dương tạo heap không ổn định.

## 8. Drills biến thể

### Drill A — top-k stream

Giữ min-heap size `k` của các phần tử lớn nhất: push item; nếu size `>k`, pop min. Root cuối là phần tử lớn thứ k. Nếu cần k nhỏ nhất, dùng max-heap size k.

### Drill B — scheduler nhiều khóa

Chọn job theo duration, rồi arrival, rồi id. Viết comparator tuple và test cả hai tie; không phụ thuộc stable sort/heap ngẫu nhiên.

### Drill C — priority update

Khi score đổi, push `{id,score,version}` mới; map lưu version hiện hành. Root có version cũ là stale. Đây là lazy invalidation tổng quát.

### Drill D — median động

Dùng max-heap nửa thấp, min-heap nửa cao; rebalance size chênh tối đa 1. Một heap không đủ vì cần boundary từ hai phía.

## 9. Câu hỏi mở tư duy

- Heap tại thời điểm chọn chứa đúng candidate nào?
- Priority có thật sự chứng minh được objective hay chỉ “có vẻ hợp lý”?
- Duplicate được định danh bằng gì?
- Khi nào root stale và mọi nơi đọc root đã clean chưa?
- Có cần full order, top một phía hay cả hai phía?

## 10. Checklist 15 giây

Nói rõ: **candidate eligibility, heap record, comparator/tie-break, thời điểm push, thời điểm pop/clean stale, idle jump và proof cho greedy selection**.
