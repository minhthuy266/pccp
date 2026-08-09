# Audit Map/Set trong toàn bộ Algorithm Practice Kit

[← Index Map/Set](../../03_Map_Set.md) · [Bộ 29 bài →](04_Programmers_PCCP_Set.md)

> Audit ngày 09/08/2026, dựa trên toàn bộ 47 bài đang được Programmers liệt kê trong 10 nhóm của [Algorithm Practice Kit](https://school.programmers.co.kr/learn/challenges?tab=algorithm_practice_kit).

## Kết luận

- `47/47` bài trong 10 Kit đã được rà theo ID, không chỉ theo tên nhóm.
- `11` bài có Map/Set là state cốt lõi hoặc giúp loại duplicate bắt buộc: 5 Hash Kit + 6 bài Cross-Kit.
- `9` bài có thể dùng Set/Map phụ trợ (`visited`, blocked lookup, lazy deletion…), nhưng pattern quyết định vẫn là queue/graph/DP/heap.
- `27` bài còn lại không có lý do đáng kể để xếp vào chương Map/Set.

## 1. Các bài Map/Set cốt lõi

| ID | Bài | Nằm trong Kit | Vai trò Hash |
| --- | --- | --- | --- |
| 42576 | Người chạy chưa về đích | Hash | frequency Map giữ tên trùng |
| 1845 | Ponketmon | Hash | Set đếm số loại |
| 42577 | Danh bạ điện thoại | Hash | Set membership hoặc sort |
| 42578 | Trang phục | Hash | Map count theo loại |
| 42579 | Album hay nhất | Hash | Map group + Map tổng |
| 42839 | Tìm số nguyên tố | Exhaustive Search | Set loại số trùng từ permutation |
| 42862 | Áo thể dục | Greedy | Set lost/reserve và delete sau match |
| 42895 | Biểu diễn bằng N | Dynamic Programming | `dp[i]` là Set các giá trị đạt được |
| 43164 | Hành trình du lịch | DFS/BFS | adjacency Map theo sân bay |
| 84021 | Ghép mảnh puzzle | DFS/BFS | Map count canonical shape |
| 49190 | Đếm số phòng | Graph | Set đỉnh và cạnh đã đi |

Sáu bài Cross-Kit đã được thêm thành `PK-X01..06` trong [bộ đề](04_Programmers_PCCP_Set.md) và có full code trong [lời giải](../../solutions/03_Map_Set_Programmers_Solutions.md).

## 2. Các bài chỉ dùng Map/Set phụ trợ

Không chuyển các bài này thành “bài Hash”, vì bỏ Map/Set vẫn không thay đổi pattern chính.

| ID | Bài | Pattern chính | Map/Set có thể hỗ trợ |
| --- | --- | --- | --- |
| 42628 | Double Priority Queue | two heaps / priority queue | Map lazy-deletion nếu tự cài hai heap |
| 87946 | Độ mệt mỏi | backtracking | Set/boolean visited dungeon |
| 42898 | Đường đến trường | DP | Set các tọa độ vũng nước thay cho matrix |
| 43162 | Mạng lưới | graph traversal | Set visited node |
| 1844 | Đường ngắn nhất game map | BFS | Set visited, nhưng sửa matrix/boolean array rõ hơn |
| 43163 | Chuyển đổi từ | BFS/DFS | Set visited word |
| 87694 | Nhặt vật phẩm | BFS | Set visited coordinate |
| 49189 | Node xa nhất | BFS | Set visited node |
| 49191 | Thứ hạng | transitive closure/graph | Set reachable opponents là một implementation |

Quy tắc phân loại: nếu Set chỉ thay `visited[]` hoặc `visited[][]`, Coverage ID vẫn thuộc graph/BFS/backtracking; chỉ gắn Map/Set như pattern phụ.

## 3. Audit theo từng Kit

| Kit | Số bài | Core Hash | Hash phụ trợ | Không đáng kể |
| --- | ---: | --- | --- | --- |
| Hash `12077` | 5 | 42576, 1845, 42577, 42578, 42579 | — | — |
| Stack/Queue `12081` | 6 | — | — | 12906, 42586, 12909, 42587, 42583, 42584 |
| Heap `12117` | 3 | — | 42628 | 42626, 42627 |
| Sorting `12198` | 3 | — | — | 42748, 42746, 42747 |
| Exhaustive Search `12230` | 7 | 42839 | 87946 | 86491, 42840, 42842, 86971, 84512 |
| Greedy `12244` | 6 | 42862 | — | 42860, 42883, 42885, 42861, 42884 |
| DP `12263` | 5 | 42895 | 42898 | 43105, 1843, 42897 |
| DFS/BFS `12421` | 7 | 43164, 84021 | 43162, 1844, 43163, 87694 | 43165 |
| Binary Search `12486` | 2 | — | — | 43238, 43236 |
| Graph `14393` | 3 | 49190 | 49189, 49191 | — |
| **Tổng** | **47** | **11** | **9** | **27** |

## 4. Audit đề PCCP công khai trong repo

Tám bài PCCP public đang có trong `PROBLEM_BANK.csv` được rà lại:

| ID | Bài | Kết luận Map/Set |
| --- | --- | --- |
| 250137 | Băng bó | không cần Hash; simulation scalar state |
| 250136 | Khai thác dầu | Set cột là state kết hợp quan trọng |
| 250135 | Đồng hồ analog | không cần Hash |
| 250134 | Di chuyển xe kéo | visited state, nhưng backtracking/matrix là chính |
| 340213 | Trình phát video | không cần Hash |
| 340212 | Thử thách game xếp hình | không cần Hash; binary search |
| 340211 | Tìm nguy cơ va chạm | Map composite key `time,row,col` quan trọng |
| 340210 | Khôi phục biểu thức | Set các cơ số/kết quả ứng viên quan trọng |

Ba bài được giữ trong nhóm `PCCP-MS01..03`; năm bài còn lại không bị bỏ sót mà được loại có chủ đích.

## 5. Giới hạn của audit

Audit này có thể khẳng định đầy đủ đối với **47 bài trong 10 Algorithm Practice Kit công khai** và **8 đề PCCP public đã có trong problem bank**.

Không thể dùng câu “toàn bộ mọi bài trên Programmers” vì trang All Challenges hiện chỉ trả shell frontend cho truy cập ẩn danh và Programmers không cung cấp tag Hash tuyệt đối cho mọi bài. Các bài ngoài Kit trong bộ `PK-M01..15` là danh sách PCCP-oriented đã tuyển chọn, không phải proof rằng toàn catalog không còn bài dùng Map/Set.

## 6. Cách tái kiểm sau này

1. Mở trang Algorithm Practice Kit.
2. Lấy toàn bộ `parts/{id}`.
3. Trong từng part, lấy mọi `lessons/{id}`, tên và level.
4. So ID với bảng audit này.
5. Nếu có ID mới, đọc contract và phân loại `core / auxiliary / none` theo ý nghĩa state, không theo việc code có chữ `Set` hay không.
6. Với đề PCCP public mới, thêm vào problem bank trước rồi audit tương tự.
