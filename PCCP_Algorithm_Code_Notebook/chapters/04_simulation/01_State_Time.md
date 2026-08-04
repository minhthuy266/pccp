# State machine, hướng và thời gian — `SIM-01..03`

[← Index](../../04_Simulation.md) · [Tiếp →](02_Events_Integration.md)

## Dạng 1 `[SIM-01]` — Simulation tuần tự / state machine

### A. Bản chất

Đề cho một state ban đầu và chuỗi event có thứ tự. Mỗi event đọc state cũ, tạo candidate, áp dụng rule theo đúng thứ tự rồi commit. Không dùng brute-force theo từng giây nếu state chỉ đổi ở event.

### B. Mental model

Sổ cái: mỗi giao dịch phải đọc số dư cũ, kiểm tra giao dịch hợp lệ rồi mới ghi số dư mới.

### C. Template tư duy

```text
Duyệt: events theo order contract.
State: thông tin tối thiểu sau prefix events.
Candidate: nextState = transition(oldState,event).
Check: validation trên old/candidate, trước commit.
Invariant: sau event i, state đúng hệ thống sau prefix 0..i.
Return/stop: final state hoặc first invalid.
```

### D. Template code

```js
for (let index = 0; index < events.length; index += 1) {
  const event = events[index];
  const candidate = transition(state, event);
  if (!isValid(candidate, state, event)) return invalid(index, state);
  state = candidate;
}
return buildResult(state);
```

### E. Bài mẫu — Quầy xử lý tuần tự

1. **Đề:** requests `[arrival,duration]` tăng theo arrival; một quầy xử lý một request; trả completion times.  
2. **I/O:** `[[0,3],[1,2],[10,1]] → [3,5,11]`.  
3. **Kể lại:** request bắt đầu khi cả nó đã tới và quầy rảnh.  
4. **Brute:** mô phỏng từng đơn vị thời gian.  
5. **Bottleneck:** idle time lớn bị lặp vô ích.  
6. **Pattern:** nhảy theo event; `start=max(arrival,finishTime)`.  
7. **State:** `finishTime` của request đã xử lý cuối.  
8. **Transition:** start max; finish=start+duration; push.  
9. **Invariant:** sau request i, finishTime là lúc quầy rảnh và result đúng prefix.  
10. **Pseudocode:** finish0; for request compute start/finish; output; return.  
11. **Full code:**

```js
function completionTimes(requests) {
  const result = [];
  let finishTime = 0;
  for (const [arrivalTime, duration] of requests) {
    const startTime = Math.max(arrivalTime, finishTime);
    finishTime = startTime + duration;
    result.push(finishTime);
  }
  return result;
}
```

12. `max` xử lý cả busy và idle; chỉ `finishTime += duration` làm request ở t=10 kết thúc 6. Push sau update vì output là completion.  
13. **Dry run:**

| Bước | Event | State trước | Điều kiện/candidate | Hành động | State sau |
| --- | --- | --- | --- | --- | --- |
| 0 | [0,3] | finish0 | start=max(0,0)=0 | finish3,push | 3/[3] |
| 1 | [1,2] | 3 | start=3 | finish5,push | 5/[3,5] |
| 2 | [10,1] | 5 | start=10 idle jump | finish11,push | 11/[3,5,11] |

14. `O(n)` time, output space. 15. lặp từng time; không jump idle; nhầm arrival với start; push start. 16. Biến thể reject request nếu wait>limit: compute start/wait, validate rồi mới update finish.

**Recall Card `[SIM-01]`:** state/event/candidate/check/commit/stop; nhảy idle. **Blank Page:** account transactions. **Mutation:** invalid ignored; rollback; output state before event. **Explain Back:** state tối thiểu vì sao chỉ finishTime? Rule order? Event loop khác time loop?

## Dạng 2 `[SIM-02]` — Vị trí và hướng

### A. Bản chất

Hướng nên chuẩn hóa thành index trong direction array; turn chỉ đổi index, move dùng delta hiện tại. Candidate coordinate phải được validate trước commit. Không cần direction state nếu command đã cho delta tuyệt đối.

### B. Mental model

Kim la bàn có bốn nấc; quay đổi nấc, tiến mới đổi tọa độ.

### C. Template tư duy

```text
State: row,col,directionIndex.
Turn: (directionIndex ± 1 + directionCount) % directionCount.
Move: candidate = position + directions[directionIndex].
Check: bounds/obstacle trước commit.
Invariant: state đúng sau command prefix.
```

### D. Template code

```js
if (command === "L") directionIndex = (directionIndex + 3) % 4;
else if (command === "R") directionIndex = (directionIndex + 1) % 4;
else {
  const [dr, dc] = directions[directionIndex];
  const nextRow = row + dr;
  const nextCol = col + dc;
  if (isValid(nextRow, nextCol)) { row = nextRow; col = nextCol; }
}
```

### E. Bài mẫu — Robot quay và tiến trên grid

1. **Đề:** start `(r,c)` hướng North; commands L/R/F; F ra biên/tường thì đứng. Trả `[r,c,direction]`.  
2. **I/O:** grid `[['.','.'],['.','#']]`, start `[1,0]`, `['R','F','L','F'] → [0,0,0]`.  
3. **Kể lại:** R quay east, F gặp wall; L quay north; F tới row0.  
4. **Brute:** switch bốn hướng với code move lặp.  
5. **Bottleneck:** duplication và modulo âm.  
6. **Pattern:** direction index + common candidate validation.  
7. **State:** row,col,directionIndex (0=N).  
8. **Transition:** turn commit ngay; forward candidate then validate.  
9. **Invariant:** state đúng sau prefix commands.  
10. **Pseudocode:** directions; for cmd turn or candidate; bounds/wall; commit; return.  
11. **Full code:**

```js
function navigateRobot(grid, start, commands) {
  const directions = [[-1, 0], [0, 1], [1, 0], [0, -1]];
  let [row, col] = start;
  let directionIndex = 0;

  for (const command of commands) {
    if (command === "L") {
      directionIndex = (directionIndex + 3) % 4;
      continue;
    }
    if (command === "R") {
      directionIndex = (directionIndex + 1) % 4;
      continue;
    }
    const [rowDelta, colDelta] = directions[directionIndex];
    const nextRow = row + rowDelta;
    const nextCol = col + colDelta;
    const isInside = nextRow >= 0 && nextRow < grid.length
      && nextCol >= 0 && nextCol < grid[0].length;
    if (isInside && grid[nextRow][nextCol] !== "#") {
      row = nextRow;
      col = nextCol;
    }
  }
  return [row, col, directionIndex];
}
```

12. Left dùng +3 tránh remainder âm của JS. `continue` ngăn turn rơi xuống move. Bounds short-circuit trước grid access.  
13. **Dry run:**

| Bước | Command | State trước | Điều kiện/candidate | Hành động | State sau |
| --- | --- | --- | --- | --- | --- |
| 0 | R | (1,0,N) | turn | dir=E | (1,0,E) |
| 1 | F | (1,0,E) | (1,1) wall | skip | (1,0,E) |
| 2 | L | (1,0,E) | turn | dir=N | (1,0,N) |
| 3 | F | (1,0,N) | (0,0) valid | commit | (0,0,N) |

14. `O(commands)`/`O(1)`. 15. JS negative modulo; turn also moves; mutate row before col validation; direction order inconsistent. 16. Biến thể F k steps all-or-nothing: simulate temp, commit after all valid.

**Recall Card `[SIM-02]`:** direction index; turn modulo; move candidate→validate→commit. **Blank Page:** trace L from North. **Mutation:** wrap grid; backwards; commands with steps. **Explain Back:** when direction state unnecessary? Why +3? Atomic multi-step khác single step?

## Dạng 3 `[SIM-03]` — Chuẩn hóa thời gian

### A. Bản chất

Chuỗi thời gian là representation hiển thị; phép toán nên dùng một scalar (thường total seconds). Parse một lần, simulate bằng number, clamp theo bounds, format cuối. Phải chốt interval inclusive/exclusive.

### B. Mental model

Đổi tiền về cùng một đơn vị trước khi cộng trừ; chỉ đổi lại định dạng khi trả kết quả.

### C. Template tư duy

```text
Parse: mm:ss → minutes*60+seconds.
State: currentSeconds.
Transition: command delta; clamp [0,duration].
Special interval: check trước/sau command theo contract.
Format: floor/%, padStart.
Invariant: current luôn normalized và trong bounds.
```

### D. Template code

```js
const parse = (text) => Number(text.slice(0, 2)) * 60 + Number(text.slice(3));
const format = (seconds) => {
  const minutes = String(Math.floor(seconds / 60)).padStart(2, "0");
  const rest = String(seconds % 60).padStart(2, "0");
  return `${minutes}:${rest}`;
};
```

### E. Bài mẫu — Bộ đếm tiến/lùi

1. **Đề:** duration và start `mm:ss`; mỗi `NEXT/PREV` ±10 giây, clamp; trả time.  
2. **I/O:** duration `01:00`, start `00:55`, `[NEXT,PREV,PREV] → 00:40`.  
3. **Kể lại:** 55→60→50→40.  
4. **Brute:** sửa minute/second riêng và xử lý carry/borrow.  
5. **Bottleneck:** nhiều branch representation.  
6. **Pattern:** normalize scalar time.  
7. **State:** durationSeconds,currentSeconds.  
8. **Transition:** next min(duration,current+10); prev max(0,current-10).  
9. **Invariant:** current trong `[0,duration]` sau mọi command.  
10. **Pseudocode:** parse; scan command clamp; format.  
11. **Full code:**

```js
function movePlayback(durationText, startText, commands) {
  function parseTime(text) {
    const [minutes, seconds] = text.split(":").map(Number);
    return minutes * 60 + seconds;
  }
  function formatTime(totalSeconds) {
    const minutes = String(Math.floor(totalSeconds / 60)).padStart(2, "0");
    const seconds = String(totalSeconds % 60).padStart(2, "0");
    return `${minutes}:${seconds}`;
  }

  const duration = parseTime(durationText);
  let current = parseTime(startText);
  for (const command of commands) {
    if (command === "NEXT") current = Math.min(duration, current + 10);
    else current = Math.max(0, current - 10);
  }
  return formatTime(current);
}
```

12. Parse trước loop; format sau loop. Clamp diễn ra mỗi command, không chỉ cuối, vì subsequent command phụ thuộc bounded state.  
13. **Dry run:**

| Bước | Command | State trước | Candidate | Hành động | State sau |
| --- | --- | --- | --- | --- | --- |
| init | — | `00:55` | parse | — | 55 |
| 0 | NEXT | 55 | 65 | min60 | 60 |
| 1 | PREV | 60 | 50 | max0 | 50 |
| 2 | PREV | 50 | 40 | max0 | 40→`00:40` |

14. `O(commands)` time, `O(1)` extra. 15. string arithmetic; clamp only cuối; format thiếu pad; seconds overflow. 16. Biến thể skip inclusive interval: helper applied before first and after every command.

**Recall Card `[SIM-03]`:** parse once→scalar state→clamp each transition→format once. **Blank Page:** parse/format. **Mutation:** HH:MM:SS; opening skip; wrap 24h. **Explain Back:** why clamp each step? Inclusive interval check where? Number safety?

## Transfer Test A

Làm [S04-T01](03_Practice_Ladder.md#s04-t01--thang-máy).

