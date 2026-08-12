# PF10 — Interval greedy

Nguồn: [OF030](../official-lessons/OF030.md), [OF057](../official-lessons/OF057.md).

## 1. Tín hiệu nhận dạng

Input là các khoảng và cần ít điểm/tài nguyên nhất để chạm tất cả, chọn nhiều interval không giao nhau nhất, hoặc cover một trục. Endpoint order thường làm quyết định local trở nên bắt buộc.

Trước code phải xác định interval là đóng `[start,end]`, mở `(start,end)`, hay nửa mở `[start,end)`; chỉ một dấu bằng có thể đổi đáp án.

## 2. Không dùng khi

- Interval có reward/weight khác nhau và cần tối đa tổng reward: weighted interval scheduling DP.
- Có nhiều chiều; rectangle không còn total order endpoint đơn giản.
- Điểm đặt bị giới hạn vào tập vị trí đặc biệt mà endpoint greedy không luôn khả dụng.
- Chi phí điểm khác nhau hoặc một điểm có capacity.

## 3. Decision tree

```text
Ít điểm nhất chạm mọi interval?      → sort end, đặt điểm ở end phù hợp
Nhiều interval không overlap nhất?   → sort end, nhận interval compatible
Cover target segment bằng interval?  → sort start, mở rộng farthest reach
Interval có weight?                   → DP sau sort
Open endpoint?                        → equality không được coi là covered
```

## 4. Knobs tạo biến thể

- Open/closed/half-open endpoint.
- Chọn point hay chọn interval.
- Min số lượng hay max cardinality/reward.
- Touching endpoints tính overlap hay không.
- Coordinate integer hay real; “đặt ngay trước end” đôi khi chỉ là biểu diễn logic.
- Một point cover không giới hạn interval hay có capacity.

## 5. Invariant và exchange proof

Interval stabbing: xét interval chưa được cover có end sớm nhất. Mọi nghiệm phải đặt một point trong interval đó. Dời point tương ứng sang vị trí muộn nhất vẫn nằm trong interval không làm mất khả năng cover interval tương lai có end muộn hơn; do đó greedy endpoint an toàn.

Với half-open `[s,e)`, projectile tại `e` không chạm interval. Có thể lưu boundary logic là `lastShot <= start` thì cần shot mới và coi shot nằm sát trái `e`; không dùng arithmetic epsilon.

## 6. Code core đáng thuộc

```js
function minimumClosedIntervalPoints(intervals) {
  const ordered = [...intervals].sort((a, b) => a[1] - b[1]);
  let lastPoint = -Infinity;
  let count = 0;
  for (const [start, end] of ordered) {
    if (lastPoint < start) {
      lastPoint = end;
      count++;
    }
  }
  return count;
}
```

```js
function minimumHalfOpenShots(targets) {
  const ordered = [...targets].sort((a, b) => a[1] - b[1]);
  let boundary = -Infinity;
  let count = 0;
  for (const [start, end] of ordered) {
    if (boundary <= start) {
      boundary = end;
      count++;
    }
  }
  return count;
}
```

`boundary=end` đại diện shot ngay trước end, không khẳng định point `end` thuộc khoảng.

## 7. Counterexamples bóc lỗi

- Half-open `[1,2)` và `[2,3)` cần hai shot; closed intervals tương ứng có thể dùng point 2.
- Sort theo start rồi đặt tùy ý có thể chặn nhiều interval kết thúc sớm.
- Dùng epsilon số thực dễ lỗi precision; encode comparison theo contract.
- Weighted intervals: chọn nhiều interval ngắn có thể thua một interval reward lớn.
- Mutate input bằng `.sort()` có thể phá caller nếu contract cần giữ nguyên.

## 8. Drills biến thể

### Drill A — maximum non-overlapping

Sort end, chọn interval nếu start compatible với end cuối đã chọn. Đổi `<`/`<=` theo việc touching có overlap.

### Drill B — cover đoạn `[0,L]`

Sort start. Trong mọi interval bắt đầu không quá current reach, chọn interval có end xa nhất; nếu không mở rộng được thì impossible. Đây là greedy khác, không dùng earliest-end stabbing.

### Drill C — weighted interval scheduling

Sort end, tính `previous[i]` bằng binary search, DP `best[i]=max(best[i-1], reward[i]+best[previous[i]])`. Knob weight phá cardinality greedy.

### Drill D — trả vị trí bắn

Nếu coordinate integer và interval half-open, có thể chọn `end-1` chỉ khi contract bảo đảm integer points. Với real coordinate, trả symbolic boundary hoặc một value nằm trong khoảng theo spec.

## 9. Câu hỏi mở tư duy

- Interval semantics chính xác là gì?
- Ta chọn point hay chọn interval?
- Endpoint nào tạo exchange argument?
- Equality tại boundary là covered hay uncovered?
- Weight/capacity có phá greedy không?

## 10. Checklist 15 giây

Ghi rõ: **loại interval, objective, sort key, điều kiện interval mới chưa cover, vị trí greedy chọn và exchange proof**.
