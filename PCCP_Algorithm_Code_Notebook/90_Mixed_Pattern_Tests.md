# 90 — Mixed Pattern Tests

> Đây là bài kiểm tra chọn engine, không phải chương học thêm. Tên bài cố ý không ghi pattern, Coverage ID hay lời giải.

[Tracker](MIXED_TEST_TRACKER.csv) · [Solutions — chỉ mở sau khi nộp](solutions/90_Mixed_Pattern_Tests_Solutions.md)

## Luật làm

Trước code, nộp sáu dòng:

```text
1. Tín hiệu quyết định:
2. Pattern/engine dự đoán:
3. State sentence:
4. Transition + thứ tự check/update:
5. Invariant/proof:
6. Complexity + revealing test:
```

Mỗi đề tối đa 35 phút. Không tìm theo câu chữ của đề trong repo. Sau khi làm, ghi `predicted_ids`, `actual_ids`, thời gian và lỗi vào tracker.

## Tám đề trộn

### MX01 — Bảng điểm trực tiếp

Nhận `events`, mỗi event là `[name, delta]`. Điểm ban đầu của mọi người là 0. Áp dụng event theo thứ tự, rồi trả danh sách tên xếp theo:

1. điểm giảm dần;
2. bằng điểm thì tên tăng dần.

Mỗi tên chỉ xuất hiện trong kết quả nếu từng có event. Không được sửa input.

```text
events = [["an",5],["binh",7],["an",2],["chi",7]]
output = ["an","binh","chi"]
```

Constraints: `1 ≤ events.length ≤ 200000`; delta có thể âm hoặc bằng 0.

### MX02 — Bao nhiêu đoạn đạt chỉ tiêu?

Cho mảng integer có thể chứa số âm và target. Đếm số subarray liên tiếp có tổng đúng target.

```text
values = [1,-1,1], target = 1
output = 3
```

Constraints: `n ≤ 200000`. Đáp án có thể lớn; dùng `Number` khi đề bảo đảm trong safe integer. Revealing test bắt buộc phải có số âm.

### MX03 — Ca sản xuất đầu tiên

Mỗi máy mất `times[i]` phút cho một sản phẩm và hoạt động song song từ phút 0. Tìm thời gian nguyên nhỏ nhất để hoàn thành ít nhất `goal` sản phẩm.

```text
times = [7,10], goal = 6
output = 28
```

`times` và `goal` là positive integers; phép nhân có thể vượt `Number.MAX_SAFE_INTEGER`, implementation dùng `BigInt` và trả `BigInt`.

### MX04 — Phí giao hàng thấp nhất

Cho graph directed có `n` node `0..n-1`, edges `[from,to,cost]`, cost không âm. Trả shortest distance từ `source` tới mọi node; unreachable là `Infinity`. Parallel edge được phép.

```text
n=4, edges=[[0,1,10],[0,2,1],[2,1,1]], source=0
output=[0,2,1,Infinity]
```

Nếu có negative edge, function phải reject thay vì trả answer không được chứng minh.

### MX05 — Kéo cáp cho toàn khu

Cho graph undirected có `n` node và candidate cables `[u,v,cost]`. Chọn cables để mọi node connected với tổng cost nhỏ nhất. Trả `null` nếu không thể nối toàn bộ.

```text
n=3, cables=[[0,1,1],[1,2,2],[0,2,10]]
output=3
```

Không được giả sử graph connected. Phải nói objective này khác MX04 ở đâu.

### MX06 — Đặt trạm kiểm tra

Mỗi interval đóng `[start,end]` là thời gian một xe xuất hiện. Một trạm đặt tại time `t` kiểm được mọi interval chứa t. Trả số trạm ít nhất để chạm mọi interval.

```text
intervals=[[1,3],[2,4],[5,6]]
output=2
```

Endpoint thuộc interval. Không mutate input. Trong proof phải giải thích vì sao chọn endpoint nào là safe; “greedy vì sort” không được điểm proof.

### MX07 — Lịch trực không kề nhau

Cho mảng reward không âm. Chọn một số ngày sao cho không chọn hai ngày kề nhau và tổng reward lớn nhất.

```text
rewards=[2,7,9,3,1]
output=12
```

Mảng rỗng trả 0. Phải nêu hai predecessor states; không dùng greedy “luôn lấy reward lớn nhất hiện tại”.

### MX08 — Chuỗi bàn giao

Mỗi ticket directed `[from,to]` phải dùng đúng một lần, bắt đầu tại `start`. Nếu có nhiều route hợp lệ, trả route lexical nhỏ nhất. Nếu không dùng được toàn bộ ticket thành một trail liên tục, trả `null`. Parallel ticket là hai occurrence riêng.

```text
tickets=[["A","B"],["A","B"],["B","A"]], start="A"
output=["A","B","A","B"]
```

Boolean visited theo node không hợp lệ. Test phải có parallel ticket và một graph vô nghiệm.

## Rubric mỗi đề — 10 điểm

| Trục | Điểm | Điều kiện |
| --- | ---: | --- |
| Recognition | 2 | Chọn đúng engine và loại được ít nhất một counter-pattern |
| State | 2 | Mỗi biến/key có nghĩa chính xác; không gộp state có future khác |
| Transition | 2 | Đúng thứ tự check/update và termination |
| Invariant/proof | 2 | Giải thích không bỏ sót; greedy/graph có proof phù hợp |
| Revealing test | 1 | Bắt đúng lỗi đặc trưng, không chỉ lặp sample |
| Complexity | 1 | Tính theo state/transition thật |

Ngưỡng qua: ít nhất `7/10`, code đúng behavioral tests và không trục nào 0. Hai đề liên tiếp dưới 7 thì quay lại canonical ID tương ứng trước khi làm đề mới.

## Bốn gate mô phỏng — 4 bài/120 phút

Các gate chỉ dùng official public đã certified. Không mở lesson/solution trong 120 phút; mở link bài trên Programmers, submit như thi thật. Tên pattern không xuất hiện trong bảng.

### GATE-01 — Foundation

| Thời gian gợi ý | Bài |
| ---: | --- |
| 20 phút | [OF048](../docs/pccp-700-roadmap/official-lessons/OF048.md) |
| 25 phút | [OF052](../docs/pccp-700-roadmap/official-lessons/OF052.md) |
| 25 phút | [OF008](../docs/pccp-700-roadmap/official-lessons/OF008.md) |
| 40 phút | [OF036](../docs/pccp-700-roadmap/official-lessons/OF036.md) |
| 10 phút | Review test/submit |

### GATE-02 — Boundary

| Thời gian gợi ý | Bài |
| ---: | --- |
| 20 phút | [OF015](../docs/pccp-700-roadmap/official-lessons/OF015.md) |
| 30 phút | [OF028](../docs/pccp-700-roadmap/official-lessons/OF028.md) |
| 35 phút | [OF055](../docs/pccp-700-roadmap/official-lessons/OF055.md) |
| 25 phút | [OF043](../docs/pccp-700-roadmap/official-lessons/OF043.md) |
| 10 phút | Review test/submit |

### GATE-03 — Integration

| Thời gian gợi ý | Bài |
| ---: | --- |
| 20 phút | [OF050](../docs/pccp-700-roadmap/official-lessons/OF050.md) |
| 30 phút | [OF011](../docs/pccp-700-roadmap/official-lessons/OF011.md) |
| 35 phút | [OF013](../docs/pccp-700-roadmap/official-lessons/OF013.md) |
| 25 phút | [OF033](../docs/pccp-700-roadmap/official-lessons/OF033.md) |
| 10 phút | Review test/submit |

### GATE-04 — Transfer

| Thời gian gợi ý | Bài |
| ---: | --- |
| 30 phút | [OF058](../docs/pccp-700-roadmap/official-lessons/OF058.md) |
| 30 phút | [OF059](../docs/pccp-700-roadmap/official-lessons/OF059.md) |
| 25 phút | [OF029](../docs/pccp-700-roadmap/official-lessons/OF029.md) |
| 25 phút | [OF041](../docs/pccp-700-roadmap/official-lessons/OF041.md) |
| 10 phút | Review test/submit |

## Cách chấm gate

- Correctness: submit pass là bằng chứng chính; không tự cho điểm bằng việc “ý tưởng giống”.
- Process: mỗi bài vẫn chấm rubric 10 điểm ở trên sau khi hết giờ.
- Gate qua khi: ít nhất 3/4 bài submit pass, tổng rubric ít nhất 28/40, không vi phạm 120 phút.
- Hai gate gần nhất đều qua mới coi là sẵn sàng mục tiêu; đây là gate nội bộ, không quy đổi thành điểm PCCP chính thức.
- Sau gate mới mở phần mapping trong solution và ghi postmortem vào tracker/error log.
