# Lời giải — 11 — Heap và Greedy

[← Practice](../chapters/11_heap_greedy/02_Practice_Ladder.md) · [Module](../../solutions/notebook/ch11_heap_greedy.js)

## Recognition
### P11-R01 — `HG-01`
Min-heap: root min, update `O(log n)`.
### P11-R02 — `HG-01`
Hai heap + unique id/alive state; value không phân biệt duplicate.
### P11-R03 — `HG-02`
Min-heap size k để pop phần tử yếu nhất của k largest.
### P11-R04 — `HG-02`
Max-heap theo distance rồi tie id của phần tử tệ nhất cần loại.
### P11-R05 — `HG-03`
Mọi và chỉ job arrival≤time chưa chạy.
### P11-R06 — `HG-03`
Jump `time=next.arrival`, không tick.
### P11-R07 — `HG-04`
Sort end; point tại end; closed condition uncovered khi `point<start`.
### P11-R08 — `HG-04`
Không; `[a,b)` không chứa b nên equality cần shot mới.
### P11-R09 — `HG-05`
Heaviest không fit lightest thì buộc solo; nếu fit, dùng lightest không làm future xấu hơn.
### P11-R10 — `HG-05`
Không; weighted interval scheduling cần DP.

## Fill
### P11-F01 — `HG-01`
Parent `(i-1)>>1`, children `2i+1/2i+2`; swap khi comparator child tốt hơn.
### P11-F02 — `HG-02`
K largest dùng min comparator; size vượt k pop root.
### P11-F03 — `HG-03`
While `arrival<=time` push; nếu ready empty jump tới next arrival.

## Logic
### P11-L01 — `HG-01`
3; push1 swaps root; push2 child; pop1 moves2 thành root: outputs 1,2,3.
### P11-L02 — `HG-03`
A chạy 0–5, B 5–6, idle/jump10, C10–11.
### P11-L03 — `HG-04/HG-05`
Mọi nghiệm phải chạm interval end sớm nhất; dời point của nghiệm tới end không mất cover interval tương lai.

## Pseudocode
### P11-P01 — `HG-01`
Push-last/bubble-up; pop-root/move-last/bubble-down.
### P11-P02 — `HG-02`
Scan, push, pop khi size>k; heap invariant giữ top-k prefix.
### P11-P03 — `HG-03`
Sort arrivals; add eligible; pop priority; advance; jump idle.

## Code
### P11-C01 — `HG-01/HG-02`
Xem `Heap`, `topKLargest` trong module.
### P11-C02 — `HG-03`
Xem `shortestJobOrder`; comparator duration→arrival→index.
### P11-C03 — `HG-04/HG-05`
Xem `minimumClosedStabbingPoints`, `minimumBoats`.

## Variants
### P11-V01 — `HG-01`
Mỗi insert có id; delete đánh alive=false; trước peek/pop bỏ root stale ở cả hai heap.
### P11-V02 — `HG-05`
Capacity ba làm partner choice tương tác thêm một chiều; two-extreme exchange không còn proof, cần engine khác theo bound.

## Mini-test
### P11-M01 — Mixed
Top-k=`HG-02`; scheduler=`HG-03`; interception=`HG-04`. Rubric: state2, invariant2, transition2, proof2, tests1, complexity1.
