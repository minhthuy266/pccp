# QA — Chapter 13

Coverage: `GR-01`, `GR-02`, `GR-03`, `GR-04`, `GR-05`.

[Canonical](01_Advanced_Graph_Canonical.md) · [Practice](02_Practice_Ladder.md) · [Solutions](../../solutions/13_Advanced_Graph_Solutions.md) · [Module](../../../solutions/notebook/ch13_advanced_graph.js)

Official anchors: OF059, OF029, OF046, OF041, OF047. Pattern families: PF22, PF15, PF17, PF16, PF18.

Behavioral gates:

- Dijkstra: stale record, parallel edge, unreachable node và negative-weight rejection.
- Kruskal: cycle rejection, exactly `n-1` accepted edges và disconnected result.
- Closure: directed transitive chain và optional reflexive diagonal.
- Euler: parallel edge occurrence, lexical order, failure khi không consume đủ edge và multiset validation cho graph sai bậc.
- Planar: square, retrace, undirected edge identity và diagonal crossing sau scale.

Chạy `node --test tests/notebook_ch13.test.js`, framework audit và integration audit. Chỉ công nhận hoàn thành khi 5/5 ID `FRAMEWORK-FULL` và mọi behavioral gate pass.
