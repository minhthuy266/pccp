# Bộ 22 bài Stack/Queue trên Programmers phục vụ PCCP

[← Index](../../08_Stack_Queue.md) · [Lời giải đầy đủ →](../../solutions/08_Stack_Queue_Programmers_Solutions.md)

> Cập nhật 09/08/2026. Đây là bản diễn giải tiếng Việt tự chứa, không sao chép nguyên văn đề. Mỗi bài có link Programmers chính thức để đối chiếu.

## Phạm vi

- `SQ-P01..06`: đủ 6/6 bài Stack/Queue Kit chính thức.
- `SQ-P07..13`: bài công khai ngoài Kit có stack/queue là state chính.
- `SQ-B01..08`: bài BFS/graph mà queue quyết định thứ tự frontier.
- `SQ-C01`: đề PCCP public dùng queue để duyệt component.

---

## A. Toàn bộ Stack/Queue Kit chính thức

### SQ-P01 — Không thích số giống nhau · Level 1

Nguồn: [Programmers 12906](https://school.programmers.co.kr/learn/courses/30/lessons/12906?language=javascript)

**Đề:** Từ mảng số, xóa các phần tử trùng **liên tiếp**, giữ thứ tự. **Contract:** `solution(arr) -> number[]`. **Ví dụ riêng:** `[1,1,2,2,1] -> [1,2,1]`. **Pattern:** output đóng vai trò stack; chỉ push khi current khác top.

### SQ-P02 — Phát triển tính năng · Level 2

Nguồn: [Programmers 42586](https://school.programmers.co.kr/learn/courses/30/lessons/42586?language=javascript)

**Đề:** `progresses[i]` là tiến độ và `speeds[i]` là tốc độ ngày. Tính ngày hoàn thành từng chức năng. Chức năng sau dù xong sớm vẫn phải chờ chức năng trước để phát hành cùng batch. Trả số chức năng trong mỗi batch. **Contract:** `solution(progresses, speeds) -> number[]`. **Pattern:** FIFO order + gom batch theo mốc release đầu queue.

### SQ-P03 — Dấu ngoặc đúng · Level 2

Nguồn: [Programmers 12909](https://school.programmers.co.kr/learn/courses/30/lessons/12909?language=javascript)

**Đề:** Chuỗi chỉ gồm `(` và `)`. Trả `true` nếu mọi prefix không có nhiều dấu đóng hơn dấu mở và cuối cùng số lượng cân bằng. **Contract:** `solution(s) -> boolean`. **Pattern:** stack/counter; stack thể hiện opening chưa khép.

### SQ-P04 — Process · Level 2

Nguồn: [Programmers 42587](https://school.programmers.co.kr/learn/courses/30/lessons/42587?language=javascript)

**Đề:** Queue chứa các process và priority. Lấy process đầu; nếu còn process có priority cao hơn thì đưa nó về cuối, nếu không thì thực thi. Trả thứ tự thực thi 1-based của process tại `location`. **Contract:** `solution(priorities, location) -> number`. **Pattern:** queue simulation; mỗi item phải giữ original index.

### SQ-P05 — Xe tải qua cầu · Level 2

Nguồn: [Programmers 42583](https://school.programmers.co.kr/learn/courses/30/lessons/42583?language=javascript)

**Đề:** Cầu dài `bridgeLength`, chịu tối đa `weight`. Mỗi giây tối đa một xe vào; mỗi xe cần đúng `bridgeLength` giây để qua. Xe chờ theo FIFO. Trả thời điểm tất cả xe qua. **Contract:** `solution(bridgeLength, weight, truckWeights) -> number`. **Pattern:** queue xe trên cầu với thời điểm ra hoặc circular time slots.

### SQ-P06 — Giá cổ phiếu · Level 2

Nguồn: [Programmers 42584](https://school.programmers.co.kr/learn/courses/30/lessons/42584?language=javascript)

**Đề:** Với mỗi thời điểm, trả số giây cho đến khi giá giảm; nếu không giảm thì tính đến cuối dữ liệu. **Contract:** `solution(prices) -> number[]`. **Pattern:** monotonic stack các index chưa gặp giá thấp hơn.

---

## B. Stack/Queue công khai sát PCCP

### SQ-P07 — Tạo số lớn · Level 2

Nguồn: [Programmers 42883](https://school.programmers.co.kr/learn/courses/30/lessons/42883?language=javascript)

**Đề:** Xóa đúng `k` chữ số khỏi chuỗi số để số còn lại lớn nhất, giữ nguyên thứ tự tương đối. **Contract:** `solution(number, k) -> string`. **Pattern:** monotonic decreasing stack; digit lớn hiện tại loại digit nhỏ gần nhất bên trái khi còn quyền xóa.

### SQ-P08 — Game gắp thú · Level 1

Nguồn: [Programmers 64061](https://school.programmers.co.kr/learn/courses/30/lessons/64061?language=javascript)

**Đề:** Với mỗi cột trong `moves`, lấy con thú khác 0 trên cùng và đặt vào giỏ. Hai thú giống nhau liền nhau trong giỏ biến mất. Trả tổng số thú biến mất. **Contract:** `solution(board, moves) -> number`. **Pattern:** mỗi cột là stack và giỏ là stack.

### SQ-P09 — Xóa cặp liền nhau · Level 2

Nguồn: [Programmers 12973](https://school.programmers.co.kr/learn/courses/30/lessons/12973?language=javascript)

**Đề:** Liên tục xóa hai ký tự giống nhau đứng cạnh. Trả `1` nếu cuối cùng chuỗi rỗng, ngược lại `0`. **Contract:** `solution(s) -> 0 | 1`. **Pattern:** stack giữ chuỗi đã rút gọn của prefix.

### SQ-P10 — Xoay dấu ngoặc · Level 2

Nguồn: [Programmers 76502](https://school.programmers.co.kr/learn/courses/30/lessons/76502?language=javascript)

**Đề:** Xoay trái chuỗi gồm `()[]{}` từ 0 đến `n-1` vị trí. Đếm số rotation tạo chuỗi ngoặc đúng. **Contract:** `solution(s) -> number`. **Pattern:** thử rotation + stack matching ba loại.

### SQ-P11 — Hộp hàng · Level 2

Nguồn: [Programmers 131704](https://school.programmers.co.kr/learn/courses/30/lessons/131704?language=javascript)

**Đề:** Băng chuyền chính đưa hộp theo thứ tự `1..n`; xe cần thứ tự `order`. Có băng chuyền phụ chỉ cho lấy hộp đặt vào sau cùng trước. Trả số hộp xếp được liên tiếp. **Contract:** `solution(order) -> number`. **Pattern:** main pointer + auxiliary stack.

### SQ-P12 — Làm hai queue có tổng bằng nhau · Level 2

Nguồn: [Programmers 118667](https://school.programmers.co.kr/learn/courses/30/lessons/118667?language=javascript)

**Đề:** Một thao tác lấy đầu queue này và đưa về cuối queue kia. Tìm số thao tác ít nhất để hai tổng bằng nhau; không thể thì `-1`. **Contract:** `solution(queue1, queue2) -> number`. **Pattern:** hai head pointer trên array nối + invariant tổng bảo toàn.

### SQ-P13 — Số lớn hơn phía sau · Level 2

Nguồn: [Programmers 154539](https://school.programmers.co.kr/learn/courses/30/lessons/154539?language=javascript)

**Đề:** Với mỗi phần tử, tìm phần tử lớn hơn đầu tiên bên phải; không có trả `-1`. **Contract:** `solution(numbers) -> number[]`. **Pattern:** monotonic stack index unresolved.

---

## C. BFS/Graph — Queue là frontier state

### SQ-B01 — Đường ngắn nhất bản đồ game · Level 2

Nguồn: [Programmers 1844](https://school.programmers.co.kr/learn/courses/30/lessons/1844?language=javascript)

**Đề:** Grid `0/1`, đi bốn hướng qua ô `1` từ góc trên trái đến góc dưới phải. Trả số ô trên đường ngắn nhất, không đến được trả `-1`. **Contract:** `solution(maps) -> number`. **Pattern:** BFS queue + distance/visited khi enqueue.

### SQ-B02 — Network · Level 3

Nguồn: [Programmers 43162](https://school.programmers.co.kr/learn/courses/30/lessons/43162?language=javascript)

**Đề:** Ma trận kết nối `computers`; hai máy cùng network nếu nối trực tiếp hoặc gián tiếp. Trả số connected components. **Contract:** `solution(n, computers) -> number`. **Pattern:** với mỗi node chưa visited, BFS một component.

### SQ-B03 — Biến đổi từ · Level 3

Nguồn: [Programmers 43163](https://school.programmers.co.kr/learn/courses/30/lessons/43163?language=javascript)

**Đề:** Mỗi bước đổi đúng một ký tự và từ mới phải thuộc `words`. Tìm số bước ít nhất từ `begin` đến `target`; không thể trả `0`. **Contract:** `solution(begin, target, words) -> number`. **Pattern:** BFS trên implicit graph của các từ.

### SQ-B04 — Nhặt vật phẩm · Level 3

Nguồn: [Programmers 87694](https://school.programmers.co.kr/learn/courses/30/lessons/87694?language=javascript)

**Đề:** Các hình chữ nhật tạo vùng; chỉ được đi trên đường biên để từ nhân vật đến vật phẩm. Trả khoảng cách ngắn nhất. **Contract:** `solution(rectangle, characterX, characterY, itemX, itemY) -> number`. **Pattern:** scale tọa độ ×2 để xử lý góc, dựng border, BFS queue.

### SQ-B05 — Ghép mảnh puzzle · Level 3

Nguồn: [Programmers 84021](https://school.programmers.co.kr/learn/courses/30/lessons/84021?language=javascript)

**Đề:** Tách component lỗ và mảnh bằng kết nối bốn hướng, cho phép xoay mảnh, ghép đúng hình và tối đa số ô lấp. **Contract:** `solution(gameBoard, table) -> number`. **Pattern:** BFS queue extract component; canonical shape Map là helper.

### SQ-B06 — Node xa nhất · Level 3

Nguồn: [Programmers 49189](https://school.programmers.co.kr/learn/courses/30/lessons/49189?language=javascript)

**Đề:** Graph vô hướng, từ node 1 tìm shortest distance đến mọi node. Trả số node có distance lớn nhất. **Contract:** `solution(n, edge) -> number`. **Pattern:** adjacency list + BFS queue.

### SQ-B07 — Thoát mê cung · Level 2

Nguồn: [Programmers 159993](https://school.programmers.co.kr/learn/courses/30/lessons/159993?language=javascript)

**Đề:** Grid có `S`, cần đi tới cần gạt `L`, sau đó tới exit `E`; `X` là tường. Trả tổng shortest distance của hai chặng, nếu một chặng không tới được trả `-1`. **Contract:** `solution(maps) -> number`. **Pattern:** chạy BFS hai lần với contract start/target khác nhau.

### SQ-B08 — Biến đổi số · Level 2

Nguồn: [Programmers 154538](https://school.programmers.co.kr/learn/courses/30/lessons/154538?language=javascript)

**Đề:** Từ `x`, mỗi bước được `+n`, `*2` hoặc `*3`. Tìm số bước ít nhất để đạt `y`; không thể trả `-1`. **Contract:** `solution(x, y, n) -> number`. **Pattern:** BFS queue trên state số, bound `<= y`.

---

## D. PCCP public

### SQ-C01 — Khai thác dầu · PCCP public

Nguồn: [Programmers 250136](https://school.programmers.co.kr/learn/courses/30/lessons/250136?language=javascript)

**Đề:** Các ô dầu `1` nối bốn hướng tạo component. Khoan một cột thu toàn bộ các component chạm cột đó, mỗi component tính một lần. Trả lượng dầu lớn nhất. **Contract:** `solution(land) -> number`. **Pattern:** BFS queue xử lý mỗi component một lần; Set cột là helper để phân phối contribution.

---

## Phiếu làm bài trước khi xem lời giải

```text
Algorithm owner:
LIFO/FIFO/layer order cần bảo toàn:
Stack/queue đang chứa chính xác gì:
Invariant trước mỗi iteration:
Thời điểm push/pop/enqueue/dequeue:
Termination:
Complexity mục tiêu:
Revealing test:
```
