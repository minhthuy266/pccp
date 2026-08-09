# Audit Stack/Queue trong toàn bộ Algorithm Practice Kit

[← Index](../../08_Stack_Queue.md) · [Bộ 22 bài →](04_Programmers_PCCP_Set.md)

> Audit ngày 09/08/2026 trên 47/47 bài thuộc 10 nhóm [Algorithm Practice Kit](https://school.programmers.co.kr/learn/challenges?tab=algorithm_practice_kit).

## Kết luận

- `13` bài có stack/queue là state cốt lõi hoặc queue là frontier bắt buộc của BFS.
- `7` bài có thể dùng stack/queue phụ trợ nhưng algorithm owner là backtracking/graph/DSU.
- `27` bài không nên xếp vào chương Stack/Queue.
- Ngoài Kit, thêm 8 bài công khai sát PCCP và 1 đề PCCP public, tạo bộ 22 bài.

## 1. Core trong Practice Kit

| ID | Bài | Kit | Vai trò |
| --- | --- | --- | --- |
| 12906 | Không thích số giống nhau | Stack/Queue | output stack/top |
| 42586 | Phát triển tính năng | Stack/Queue | FIFO release batches |
| 12909 | Dấu ngoặc đúng | Stack/Queue | unmatched openings |
| 42587 | Process | Stack/Queue | queue re-enqueue |
| 42583 | Xe tải qua cầu | Stack/Queue | time/capacity queue |
| 42584 | Giá cổ phiếu | Stack/Queue | monotonic unresolved indices |
| 42883 | Tạo số lớn | Greedy | monotonic stack + greedy pop |
| 43162 | Network | DFS/BFS | BFS component queue |
| 1844 | Đường ngắn nhất game map | DFS/BFS | BFS shortest queue |
| 43163 | Biến đổi từ | DFS/BFS | implicit graph BFS |
| 87694 | Nhặt vật phẩm | DFS/BFS | border BFS |
| 84021 | Ghép mảnh puzzle | DFS/BFS | component BFS |
| 49189 | Node xa nhất | Graph | shortest distance BFS |

## 2. Stack/Queue chỉ là phụ trợ

| ID | Bài | Algorithm owner | Vì sao không gọi là bài Stack/Queue chính |
| --- | --- | --- | --- |
| 87946 | Độ mệt mỏi | backtracking | recursion/call stack chỉ thực thi search tree |
| 86971 | Chia lưới điện | graph cut/traversal | queue/stack chỉ duyệt sau khi bỏ cạnh |
| 42861 | Nối đảo | MST/DSU | queue không quyết định lựa chọn greedy |
| 43165 | Target Number | DFS/backtracking | call stack là cơ chế recursion |
| 43164 | Hành trình du lịch | Euler path/DFS | adjacency/order quyết định; có thể dùng stack tường minh |
| 49191 | Thứ hạng | reachability/Floyd | queue chỉ là một cách tính closure |
| 49190 | Đếm phòng | graph cycle | Set đỉnh/cạnh mới là state quyết định |

Quy tắc: không gọi mọi recursion là “bài Stack”, và không gọi mọi BFS là “bài Queue” nếu mục tiêu chương đang dạy graph modeling. Trong bộ bài thật vẫn giữ các BFS đại diện để luyện queue invariant, nhưng derived concepts phải ghi rõ algorithm owner là BFS.

## 3. Audit theo Kit

| Kit | Tổng | Core | Auxiliary | None |
| --- | ---: | ---: | ---: | ---: |
| Hash `12077` | 5 | 0 | 0 | 5 |
| Stack/Queue `12081` | 6 | 6 | 0 | 0 |
| Heap `12117` | 3 | 0 | 0 | 3 |
| Sorting `12198` | 3 | 0 | 0 | 3 |
| Exhaustive Search `12230` | 7 | 0 | 2 | 5 |
| Greedy `12244` | 6 | 1 | 1 | 4 |
| DP `12263` | 5 | 0 | 0 | 5 |
| DFS/BFS `12421` | 7 | 5 | 2 | 0 |
| Binary Search `12486` | 2 | 0 | 0 | 2 |
| Graph `14393` | 3 | 1 | 2 | 0 |
| **Tổng** | **47** | **13** | **7** | **27** |

## 4. Bài ngoài Kit được thêm

| ID | Bài | Lý do |
| --- | --- | --- |
| 64061 | Game gắp thú | stack pair elimination |
| 12973 | Xóa cặp | reduced-prefix stack |
| 76502 | Xoay ngoặc | matching stack |
| 131704 | Hộp hàng | auxiliary LIFO belt |
| 118667 | Hai queue bằng tổng | queue head pointers |
| 154539 | Số lớn hơn phía sau | monotonic stack |
| 159993 | Thoát mê cung | two-stage BFS |
| 154538 | Biến đổi số | bounded-state BFS |
| 250136 | Khai thác dầu | PCCP public, component BFS |

## 5. Giới hạn

Có thể khẳng định đủ đối với 47 bài trong 10 Practice Kit và các đề PCCP public hiện có trong `PROBLEM_BANK.csv`. Không tuyên bố bộ 22 là toàn bộ mọi bài Stack/Queue trên trang All Challenges, vì catalog đó không cung cấp tag exhaustive cho truy cập ẩn danh.

## 6. Cách audit lại

1. Crawl mọi `parts/{id}` từ Algorithm Practice Kit.
2. So tập `lessons/{id}` với bảng này.
3. Với ID mới, hỏi thứ tự state nào quyết định: LIFO, FIFO, priority hay graph layer.
4. Phân loại `core/auxiliary/none` theo invariant, không theo việc code tình cờ dùng array.
