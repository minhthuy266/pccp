# Event đồng thời và integration — `SIM-04..05`

[← State/time](01_State_Time.md) · [Practice →](03_Practice_Ladder.md)

## Dạng 4 `[SIM-04]` — Event đồng thời và collision

**Dấu hiệu nhận dạng:** nhiều event có cùng timestamp hoặc cùng target nên xử lý tuần tự sẽ làm kết quả phụ thuộc input order; cần collect → resolve → commit.

### A. Bản chất

Event cùng timestamp phải được xét trên cùng snapshot nếu contract nói xảy ra đồng thời. Mutate state sau từng event có thể làm event sau nhìn thấy “tương lai” trong cùng batch. Quy trình: collect batch → tính intents/result từ old state → resolve collision/tie → commit.

### B. Mental model

Trọng tài thu phiếu của tất cả người chơi trong một lượt, xử lý xung đột, rồi mới cập nhật bàn cờ.

### C. Template tư duy

```text
Duyệt: group events cùng time.
State trước batch: snapshot hệ thống.
Intent: mỗi event muốn thay đổi gì?
Resolve: cùng target/tie/exit-enter order.
Commit: apply resolved changes một lần.
Invariant: sau batch, state đúng sau mọi event time đó; không phụ thuộc input order nội batch ngoài rule.
```

### D. Template code

```js
let index = 0;
while (index < events.length) {
  const time = events[index].time;
  const batch = [];
  while (index < events.length && events[index].time === time) {
    batch.push(events[index]);
    index += 1;
  }
  const resolved = resolve(batch, state);
  state = commit(state, resolved);
}
```

### E. Bài mẫu — Robot cùng đích đều đứng yên

1. **Đề:** positions theo robot id; events sorted `[time,id,nextPosition]`. Cùng time, nếu ≥2 robot muốn cùng nextPosition thì tất cả intents tới đó bị hủy; các intent khác commit. Trả positions.  
2. **I/O:** A0,B2,C5; t1 A→1,B→1,C→4 ⇒ A0,B2,C4.  
3. **Kể lại:** quyết định collision từ toàn bộ mong muốn cùng lượt.  
4. **Brute sai:** xử lý event lần lượt; A chiếm1 rồi B bị chặn do occupancy, phụ thuộc order và rule khác.  
5. **Bottleneck:** mutation sớm phá snapshot đồng thời.  
6. **Pattern:** batch + frequency target + commit noncollision.  
7. **State:** Map id→position; intents; countByTarget.  
8. **Transition:** collect all target counts; count1→set id target; count>1 giữ old.  
9. **Invariant:** sau time t, positions đúng toàn batch t.  
10. **Pseudocode:** group time; build target counts; second pass commit unique targets.  
11. **Full code:**

```js
function resolveRobotMoves(initialPositions, events) {
  const positionByRobot = new Map(initialPositions);
  let index = 0;

  while (index < events.length) {
    const time = events[index][0];
    const batch = [];
    const countByTarget = new Map();
    while (index < events.length && events[index][0] === time) {
      const [, robotId, target] = events[index];
      batch.push([robotId, target]);
      countByTarget.set(target, (countByTarget.get(target) ?? 0) + 1);
      index += 1;
    }
    for (const [robotId, target] of batch) {
      if (countByTarget.get(target) === 1) positionByRobot.set(robotId, target);
    }
  }
  return positionByRobot;
}
```

12. First inner loop only collects; second commits. Count targets, not current occupancy, vì contract collision theo intents; nếu contract cấm đi vào vị trí robot đứng yên, resolve cần thêm occupancy rule.  
13. **Dry run:**

| Bước | Batch/event | State trước | Condition | Hành động | State sau |
| --- | --- | --- | --- | --- | --- |
| collect | A→1 | A0,B2,C5 | target1 count1 | chưa commit | unchanged |
| collect | B→1 | unchanged | target1 count2 | chưa commit | unchanged |
| collect | C→4 | unchanged | target4 count1 | chưa commit | unchanged |
| commit | batch t1 | old snapshot | counts 2/1 | only C moves | A0,B2,C4 |

14. `O(events)` average time, `O(batch)` space. 15. commit while collect; group comparison wrong index; conflate target collision with occupancy; input order dependence. 16. Biến thể exit-before-enter at same time: split batch by type and commit exits before validating enters.

**Recall Card `[SIM-04]`:** collect snapshot intents→resolve→commit; same time not sequential unless contract says. **Blank Page:** swap positions simultaneous. **Mutation:** exit/enter tie; collision count; same position after paths. **Explain Back:** why two passes? What rule uses target counts? When snapshot copy needed?

## Dạng 5 `[SIM-05]` — Simulation kết hợp resource/Map/Queue/Matrix

**Dấu hiệu nhận dạng:** event loop điều phối nhiều subsystem; mỗi cấu trúc giữ một phần state và phải duy trì invariant liên cấu trúc sau mỗi commit.

### A. Bản chất

Simulation điều phối event order; cấu trúc phụ chịu trách nhiệm lookup/order/resource. Mỗi subsystem cần nghĩa state và invariant riêng, cộng một invariant liên kết. Không gọi combination là template mới nếu chỉ ghép skeleton đã học.

### B. Mental model

Điều phối viên gọi đúng bộ phận: Map tìm hồ sơ, queue giữ thứ tự chờ, matrix kiểm vị trí; điều phối viên quyết định lúc nào cập nhật ai.

### C. Template tư duy

```text
Pattern chính: simulation quyết định event/phase.
Pattern phụ: Map/Queue/Matrix lưu state hoặc chọn next.
State mỗi subsystem và invariant liên kết?
Một event cập nhật cấu trúc nào, thứ tự nào?
Resource release và acquire cùng time theo rule gì?
Can jump to next arrival/completion?
```

### D. Template code

```js
while (hasPendingWork()) {
  releaseCompletedResources(currentTime);
  addArrivedEvents(currentTime);
  assignAvailableResources();
  currentTime = nextRelevantTime();
}
```

### E. Bài mẫu — Phòng mượn theo event

1. **Đề:** rooms count; bookings sorted `[arrival,duration,id]`; request dùng room nhỏ nhất đang rảnh, nếu không có thì chờ tới room sớm nhất rảnh; trả completion by id.  
2. **I/O:** 1 room, `[[0,3,'A'],[1,2,'B'],[10,1,'C']] → A3,B5,C11`.  
3. **Kể lại:** với một room giống quầy; nhiều room cần chọn availability sớm nhất/tie room id.  
4. **Brute:** mỗi request scan mọi room; đủ nếu rooms nhỏ.  
5. **Bottleneck:** repeated min selection khi rooms lớn; heap là tối ưu sau.  
6. **Pattern:** simulation chính; array resource state ở bản cơ bản, heap là variant.  
7. **State:** `availableAt[room]`, completion Map.  
8. **Transition:** chọn room min `(availableAt,roomIndex)`; start max arrival; update room; set result.  
9. **Invariant:** availability đúng bookings prefix; completion đúng id đã xử lý.  
10. **Pseudocode:** for booking find best room; compute start/finish; update two structures.  
11. **Full code:**

```js
function scheduleRooms(roomCount, bookings) {
  const availableAt = Array(roomCount).fill(0);
  const completionById = new Map();

  for (const [arrival, duration, bookingId] of bookings) {
    let selectedRoom = 0;
    for (let room = 1; room < roomCount; room += 1) {
      const isEarlier = availableAt[room] < availableAt[selectedRoom];
      const winsTie = availableAt[room] === availableAt[selectedRoom]
        && room < selectedRoom;
      if (isEarlier || winsTie) selectedRoom = room;
    }
    const start = Math.max(arrival, availableAt[selectedRoom]);
    const finish = start + duration;
    availableAt[selectedRoom] = finish;
    completionById.set(bookingId, finish);
  }
  return completionById;
}
```

12. Simulation owns booking order; array owns resource availability; Map owns output lookup. Update availability before next booking. Với roomCount lớn, thay selection scan bằng min-heap nhưng transition giữ.  
13. **Dry run (1 room):**

| Bước | Booking | State trước | Candidate | Hành động | State sau |
| --- | --- | --- | --- | --- | --- |
| 0 | A 0/3 | room[0]=0 | start0 finish3 | update/set A | room3,A3 |
| 1 | B 1/2 | room3 | start3 finish5 | update/set B | room5,B5 |
| 2 | C 10/1 | room5 | start10 finish11 | update/set C | room11,C11 |

14. `O(bookings*rooms)`, space `O(rooms+bookings)`. 15. select room by id before availability; forget idle jump; overwrite output by index mismatch; heap prematurely without stable comparator. 16. Biến thể min-heap: heap entries `[availableAt,room]`; pop, update, push; `O(n log rooms)`.

**Recall Card `[SIM-05]`:** simulation orchestrates; each DS has one responsibility; state updates share invariant. **Blank Page:** label pattern roles. **Mutation:** queue wait; heap resource; Map entities on grid. **Explain Back:** which pattern controls traversal? When array scan sufficient? What linked invariant can break?

### Template Contrast — `SIM-04` và `SIM-05`

| Dạng | Core difficulty | State | Transition |
| --- | --- | --- | --- |
| `SIM-04` | simultaneity | batch snapshot/intents | collect-resolve-commit |
| `SIM-05` | subsystem coordination | multiple structures | ordered delegated updates |

## Transfer Test B

Làm [S04-T02](03_Practice_Ladder.md#s04-t02--cổng-sạc).
