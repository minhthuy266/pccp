# 04 — Simulation: từ câu chuyện thành state machine

> Trạng thái: `SIM-01..05` hoàn thiện v1 và đã qua QA.

## Điều hướng

1. [State machine, hướng và thời gian](chapters/04_simulation/01_State_Time.md): `SIM-01..03`.
2. [Event đồng thời và integration](chapters/04_simulation/02_Events_Integration.md): `SIM-04..05`.
3. [Practice Ladder](chapters/04_simulation/03_Practice_Ladder.md).
4. [Lời giải](solutions/04_Simulation_Solutions.md).
5. [QA](chapters/04_simulation/QA.md).

## Phiếu simulation bắt buộc

```text
State tối thiểu:
Event/command tiếp theo:
State cũ cần đọc:
Candidate/next state:
Validation và thứ tự rule:
Commit transition:
Các event cùng time xử lý thế nào:
Stop/return:
Invariant sau mỗi event:
```

Không biến mọi câu trong đề thành một biến. State chỉ giữ thông tin tương lai còn cần. Nếu giữa hai event không có thay đổi đáng quan tâm, nhảy thẳng tới event kế tiếp thay vì lặp từng giây.

## Bản đồ chọn dạng

| Tín hiệu | ID | Skeleton |
| --- | --- | --- |
| Luật tuần tự, trạng thái đổi theo command | `SIM-01` | read old → candidate → validate → commit |
| Tọa độ và hướng | `SIM-02` | direction index/delta + movement |
| `mm:ss`, clamp, interval time | `SIM-03` | parse scalar → simulate → format |
| Cùng time/vị trí, collision | `SIM-04` | collect batch → resolve → commit |
| Nhiều resource/entity/data structure | `SIM-05` | simulation orchestration + delegated state |

## Template Contrast

| Dạng | Ai quyết định event tiếp? | State đặc trưng | Bẫy chính |
| --- | --- | --- | --- |
| `SIM-01` | input order | minimal machine state | rule order |
| `SIM-02` | command | position/direction | candidate vs commit |
| `SIM-03` | command/timestamp | normalized scalar time | inclusive/clamp/format |
| `SIM-04` | timestamp batch | snapshot occupancy | mutate trong lúc collect |
| `SIM-05` | event loop | nhiều subsystem | invariant liên cấu trúc |

## Mastery Gate

Qua khi 4/5 ID đạt mức 3, 3/5 đạt mức 4, hai Transfer/Mixed Test liên tiếp đạt rubric; tự tạo được test cho event đầu/cuối, idle gap, cùng timestamp, invalid transition và resource vừa được giải phóng. Sai thứ tự rule quay lại dry run; state thiếu quay lại phiếu simulation; integration lệch quay lại invariant liên cấu trúc.
