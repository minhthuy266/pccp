# Practice Ladder — Chapter 11

[← Chapter](../../11_Heap_Greedy.md) · [Solutions](../../solutions/11_Heap_Greedy_Solutions.md)

## Recognition
### P11-R01 — `HG-01`
Stream add/delete-min liên tục: chọn cấu trúc và complexity.
### P11-R02 — `HG-01`
Cần cả min/max với duplicate: vì sao một heap/value key không đủ?
### P11-R03 — `HG-02`
K largest: min-heap hay max-heap size k?
### P11-R04 — `HG-02`
K gần nhất theo distance và tie id: thiết kế comparator.
### P11-R05 — `HG-03`
Job arrival/shortest duration: heap chứa candidate nào?
### P11-R06 — `HG-03`
Ready rỗng, arrival kế rất xa: time transition gì?
### P11-R07 — `HG-04`
Ít point chạm closed intervals: sort key và equality.
### P11-R08 — `HG-04`
Half-open intervals chạm endpoint có cover chung không?
### P11-R09 — `HG-05`
Boat tối đa hai người: viết exchange argument.
### P11-R10 — `HG-05`
Interval có reward: greedy cardinality còn đúng không?

## Fill
### P11-F01 — `HG-01`
Điền parent/left/right index và condition bubble.
### P11-F02 — `HG-02`
Điền `push; if size>k pop` và chọn comparator.
### P11-F03 — `HG-03`
Điền add-eligible loop và idle jump.

## Logic
### P11-L01 — `HG-01`
Dry-run heap khi push `3,1,2` rồi pop.
### P11-L02 — `HG-03`
Trace jobs `A(0,5),B(1,1),C(10,1)`.
### P11-L03 — `HG-04/HG-05`
Chứng minh earliest endpoint bằng exchange.

## Pseudocode
### P11-P01 — `HG-01`
Viết push/pop generic comparator.
### P11-P02 — `HG-02`
Viết top-k stream không full sort.
### P11-P03 — `HG-03`
Viết event pointer + ready heap scheduler.

## Code
### P11-C01 — `HG-01/HG-02`
Code Heap và top-k; test duplicate/k=0.
### P11-C02 — `HG-03`
Code non-preemptive shortest-job order; test idle gap/tie.
### P11-C03 — `HG-04/HG-05`
Code interval stabbing và rescue boats; test equality.

## Variants
### P11-V01 — `HG-01`
Thiết kế two-heaps lazy deletion với unique id.
### P11-V02 — `HG-05`
Đổi boat capacity từ hai thành ba; tạo counterexample cho greedy cũ.

## Mini-test
### P11-M01 — Mixed
Trong 40 phút: top-k stream, arrival scheduler, half-open interception. Nộp candidate invariant, comparator, proof và revealing test.
