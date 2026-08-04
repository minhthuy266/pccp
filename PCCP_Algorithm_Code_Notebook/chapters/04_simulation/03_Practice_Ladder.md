# Chapter 04 — Practice Ladder

[← Index](../../04_Simulation.md) · [Lời giải](../../solutions/04_Simulation_Solutions.md)

## Tầng 1 — Nhận diện (12)

Ghi ID, state/event/transition/stop và chi tiết gây nhiễu.

### S04-R01 `[SIM-01]`
Số dư thay đổi theo deposit/withdraw; invalid withdrawal dừng.
### S04-R02 `[SIM-01]`
Máy có mode ON/OFF; command chỉ hợp lệ theo mode.
### S04-R03 `[SIM-02]`
Robot quay trái/phải và tiến.
### S04-R04 `[SIM-02]`
Con trỏ đi theo delta tuyệt đối; không cần direction state.
### S04-R05 `[SIM-03]`
Thời gian video `mm:ss`, next/prev và clamp.
### S04-R06 `[SIM-03]`
Tính khoảng yên giữa attacks; nhảy event.
### S04-R07 `[SIM-04]`
Nhiều entry/exit cùng timestamp, exit xử lý trước.
### S04-R08 `[SIM-04]`
Đếm collision cùng time và position.
### S04-R09 `[SIM-05]`
Requests dùng queue và server availability.
### S04-R10 `[SIM-05]`
Entity id→state trên matrix.
### S04-R11 `[SIM-01]`
Chuỗi operations có UNDO một bước: cần thêm history stack.
### S04-R12 `[SIM-04]`
Hai người swap vị trí cùng lượt; sequential occupancy check sẽ sai.

## Tầng 2 — Điền khuyết (3)

### S04-F01 `[SIM-01]`
```js-fill
const start = Math.___(arrival, finishTime);
finishTime = ___ + duration;
result.___(finishTime);
```

### S04-F02 `[SIM-02]`
```js-fill
directionIndex = (directionIndex + ___) % 4; // left
const nextRow = row + directions[directionIndex][___];
const nextCol = col + directions[directionIndex][___];
```

### S04-F03 `[SIM-03]`
```js-fill
const total = minutes * ___ + seconds;
const outputMinutes = Math.___(total / 60);
const outputSeconds = total % ___;
```

## Tầng 3 — Dựng logic (3)

### S04-L01 `[SIM-01]`
Inventory event invalid bị bỏ qua nhưng processing tiếp tục; trả invalid indices và final stock.
### S04-L02 `[SIM-04]`
Event cùng time gồm RELEASE và ACQUIRE; release phải xảy ra trước acquire.
### S04-L03 `[SIM-05]`
Hai printer; job chọn printer rảnh sớm nhất, tie id nhỏ. Ghi invariant liên resource/output.

## Tầng 4 — Pseudocode (3)

### S04-P01 `[SIM-02]`
Command F k bước: dừng tại bước invalid nhưng giữ các bước hợp lệ trước.
### S04-P02 `[SIM-03]`
Skip opening inclusive trước command đầu và sau từng command.
### S04-P03 `[SIM-04]`
Từ paths của nhiều robot theo time, đếm `(time,row,col)` có ≥2 robot; mỗi collision cell/time chỉ đếm một.

## Tầng 5 — Tự code (3)

### S04-C01 `[SIM-01]` — Bộ điều nhiệt
State temperature. Commands `[delta]`; candidate ngoài `[min,max]` bị bỏ; trả temperatures sau từng command, kể cả command invalid (state lặp lại).

### S04-C02 `[SIM-03]` — Đồng hồ vòng
Thời gian `HH:MM:SS`; commands delta seconds có thể âm; wrap trong 24h; trả formatted.

### S04-C03 `[SIM-04]` — Batch đấu giá
Events `[time,user,bid]`; trong mỗi time chỉ bid cao nhất được xét, hòa bid thì user từ điển nhỏ; candidate chỉ commit nếu lớn hơn currentPrice. Trả winners theo batch.

## Tầng 6 — Biến thể (3)

### S04-V01 `[SIM-01]`
Invalid từ “dừng” thành “skip và log”; stop/return/commit đổi gì?
### S04-V02 `[SIM-03]`
Clamp timeline thành wrap timeline; transition khác ở đâu?
### S04-V03 `[SIM-04]`
Cùng time từ collision-cancel thành priority winner; collect giữ, resolve đổi thế nào?

## Transfer Tests

### S04-T01 — Thang máy
Requests `[timestamp,floor]`; thang bắt đầu floor0 lúc0, đi 1 floor/second, xử lý theo input order. Request tới khi thang bận chờ; trả completion times. `timestamp` không phải duration. Tự suy state tối thiểu.

### S04-T02 — Cổng sạc
Có `k` cổng. Sessions `[arrival,duration,carId]`; chọn cổng rảnh sớm nhất, tie id nhỏ; car không được có hai session overlap—nếu overlap, session mới invalid và không chiếm cổng. Trả invalid carIds và completion Map. Phân vai simulation, Map và resource state.

## Mini-test S04-M01 — 40 phút

1. **S04-M01.1:** Counter nhận ADD/MULTIPLY/RESET; trả state trước mỗi RESET.
2. **S04-M01.2:** Robot trên grid torus (ra cạnh này vào cạnh kia), có direction và F.
3. **S04-M01.3:** Events `[time,id,delta]` cùng time phải cộng gộp delta theo id rồi mới clamp state mỗi id về `[0,100]`.

