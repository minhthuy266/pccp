# PCCP FINAL INDEX — 36 BÀI

> **ĐÂY LÀ FILE ĐỌC CHÍNH TỐI NAY / SÁNG MAI.**
> Full 9-step, dry run và code nằm trong các file pattern bên dưới.

## File map

- [Simulation / String / Parsing](01_SIMULATION_STRING.md) — Bài 1, 3, 18, 19
- [Hash / Sorting / Greedy](02_HASH_SORTING_GREEDY.md) — Bài 2, 5, 6, 7, 8, 14
- [Stack / Queue / Monotonic Stack](03_STACK_QUEUE_MONOTONIC.md) — Bài 4, 11, 12, 13, 15, 16, 17
- [Two Pointers / Sliding Window](04_TWO_POINTERS_WINDOW.md) — Bài 9, 10, 35
- [Heap / Priority Queue](05_HEAP_PRIORITY_QUEUE.md) — Bài 20, 21
- [DFS / Brute Force / Backtracking](06_DFS_BRUTE_FORCE_BACKTRACKING.md) — Bài 22, 23
- [Graph / Tree / Greedy](07_GRAPH_TREE_GREEDY.md) — Bài 24, 25
- [Binary Search on Answer](08_BINARY_SEARCH_ON_ANSWER.md) — Bài 26
- [BFS / Graph](09_BFS_GRAPH.md) — Bài 27, 28, 29, 30, 31, 32, 36
- [Dynamic Programming](10_DP.md) — Bài 33, 34
- GAPS còn lại — prefix sum

## Cách recall 20–30 giây / bài

1. Nhìn tên → nói **Pattern**.
2. Nói **State**.
3. Nói **Transition / code shape**.
4. Nói **1 trap chết người**.
5. Nếu code shape bật ra được → **đi tiếp, không đọc full bài**.

## 36 bài — Quick Recall

| # | Bài | Pattern | Core flow | Trap |
|---:|---|---|---|---|
| 1 | K번째수 (Số thứ K) | Array / Simulation | `command → slice → numeric sort → pick` | 1-based→0-based; slice end exclusive |
| 2 | 달리기 경주 (Cuộc đua chạy) | Array + Map | `name→index; call → swap với người trước → update cả 2 map` | mọi read/write phải cùng working array |
| 3 | 공원 산책 (Đi dạo trong công viên) | Grid Simulation | `COPY → TRY từng step → all valid mới COMMIT` | 1 step fail → cancel cả route |
| 4 | 크레인 인형뽑기 게임 (Trò gắp thú bằng cần cẩu) | Grid + Stack | `scan cột top-down → pick first nonzero → compare stack top` | break chỉ sau khi pick |
| 5 | 완주하지 못한 선수 (Vận động viên không hoàn thành) | Hash Frequency | `participant +1 → completion -1 → còn dư` | duplicates → không dùng Set |
| 6 | 전화번호 목록 (Danh bạ điện thoại) | Hash Set / Prefix | `Set full numbers → bóc prefix ngắn hơn → has()` | len < phone.length; không check chính nó |
| 7 | 의상 (Clothes) | Hash Counting | `count theo type → ∏(count+1) - 1` | trừ all-none |
| 8 | 가장 큰 수 (Số lớn nhất) | Custom Sort | `so b+a với a+b → join` | all zero → '0' |
| 9 | 할인 행사 (Sự kiện giảm giá) | Fixed Window | `init 10 → compare → remove outgoing + add incoming` | N-10+1 windows |
| 10 | 연속된 부분 수열의 합 (Tổng dãy con liên tiếp) | Two Pointers | `right add → while sum>k shrink → sum==k commit` | positive numbers mới monotonic |
| 11 | 기능개발 (Phát triển chức năng) | Queue / Batching | `finishDays → compare với releaseDay của batch` | không compare với task ngay trước |
| 12 | Dấu ngoặc hợp lệ | Stack / Balance | `( +1, ) -1; prefix không âm; cuối = 0` | final=0 thôi chưa đủ |
| 13 | Process / Tiến trình | Queue + Priority | `pop đầu → còn higher thì push lại → else execute` | giữ original index |
| 14 | 구명보트 (Xuồng cứu sinh) | Greedy + 2P | `sort → heaviest luôn đi → thử ghép lightest` | right-- và boats++ luôn chạy |
| 15 | 주식가격 (Giá cổ phiếu) | Monotonic Stack | `current thấp hơn top → pop + answer=i-idx` | < chứ không <= |
| 16 | 큰 수 만들기 (Tạo số lớn nhất) | Greedy + Mono Stack | `current>top + còn k → pop; cuối còn k → cắt đuôi` | while, không if |
| 17 | 다리를 지나는 트럭 (Xe tải qua cầu) | Queue Simulation | `time++ → EXIT → ENTER` | exit trước enter |
| 18 | 개인정보 수집 유효기간 (Thời hạn lưu trữ thông tin cá nhân) | Date + Map | `date→totalDays; expiry=collected+months*28` | today >= expiry |
| 19 | 문자열 압축 (Nén chuỗi) | Brute Force + String | `for unit → run chunks → different: commit+reset → commit cuối` | quên group cuối |
| 20 | 더 맵게 (Trộn đồ cay hơn) | Min-Heap | `peek<K → pop 2 min → mix → push` | size<2 mà min<K → -1 |
| 21 | 디스크 컨트롤러 (Disk Controller) | Sort + Min-Heap | `push arrived≤time → pop best; empty → jump next request` | heap chỉ chứa job đã tới |
| 22 | 피로도 (Mệt mỏi / Dungeons) | DFS / Backtracking | `N<=8 → for candidate → choose → dfs(next) → unchoose` | required chỉ check; trừ cost; nhớ backtrack |
| 23 | 타겟 넘버 (Target Number) | DFS / Binary Choice Tree | `dfs(index,sum) → branch + / branch - → index==n check target` | không cần visited; chỉ count ở leaf |
| 24 | 전력망을 둘로 나누기 (Chia lưới điện) | Tree + DFS / Remove Edge | `for each edge → DFS one side skipping edge → diff=|count-(n-count)|` | graph undirected; reset visited; skip cả 2 chiều |
| 25 | 요격 시스템 (Hệ thống đánh chặn) | Greedy Interval | `sort end↑ → if start >= lastEnd: count++, lastEnd=end` | open interval: equality cũng cần phát mới |
| 26 | 입국심사 (Kiểm tra nhập cảnh) | Binary Search on Answer | `predicate(T)=Σ floor(T/time) >= n → first feasible` | JS dùng BigInt; feasible thì đi trái |
| 27 | 게임 맵 최단거리 (Đường ngắn nhất bản đồ game) | BFS Grid | `queue+head → pop → 4 dirs → mark dist khi enqueue` | shortest unweighted; không shift(); start dist=1 |
| 28 | 미로 탈출 (Thoát mê cung) | BFS 2 Phase | `bfs(S,L) → reset → bfs(L,E) → sum` | E vẫn đi qua trước lever; reset visited; start dist=0 |
| 29 | 네트워크 (Mạng lưới) | Connected Components | `for node chưa visited → answer++ → DFS/BFS mark cả component` | count ở outer loop; không reset visited |
| 30 | 단어 변환 (Chuyển đổi từ) | Implicit Graph + BFS | `word node → scan words → diff exactly 1 → enqueue step+1` | target absent→0; mark khi enqueue |
| 31 | 가장 먼 노드 (Node xa nhất) | BFS Graph / Distance | `BFS từ 1 → dist[next]=dist[cur]+1 → max dist → count` | adjacency list; không Dijkstra; không shift() |
| 32 | 배달 (Giao hàng) | Dijkstra | `pop min → stale skip → relax weighted edges → count dist<=K` | weighted ≠ BFS; parallel edges okay |
| 33 | 정수 삼각형 (Tam giác số nguyên) | DP Triangle | `dp[r][c]=value+max(parent-left,parent-right)` | xử lý 2 mép; answer=max hàng cuối |
| 34 | 등굣길 (Đường đến trường) | Grid DP / Count Paths | `dp[r][c]=top+left mod M; puddle skip` | puddles [x,y]→[y][x]; m=cols,n=rows |
| 35 | 두 큐 합 같게 만들기 (Hai queue bằng tổng) | Circular Two Pointers | `target=total/2; sum1>target→left++; sum1<target→right++` | không shift(); total lẻ→-1; Number safe |
| 36 | 숫자 변환하기 (Biến đổi số) | BFS State Space | `cur → [cur+n,cur*2,cur*3]; next<=y; mark enqueue` | min operations; bound ở y; x==y→0 |

## Kernel phải bật ra trong đầu

### Fixed / Variable Window
```js
for (let right = 0; right < n; right++) {
  add(right)
  while (invalid()) {
    remove(left)
    left++
  }
  if (valid()) commit()
}
```

### Monotonic Stack
```js
for (let i = 0; i < n; i++) {
  while (stack.length && currentResolvesTop()) {
    const idx = stack.pop()
    commit(idx, i)
  }
  stack.push(i)
}
```

### Queue with head pointer
```js
const queue = [start]
let head = 0
while (head < queue.length) {
  const cur = queue[head++]
  // process / enqueue
}
```

### Event + Heap
```js
while (notDone) {
  while (nextEventArrived()) heap.push(next())
  if (heap.size()) process(heap.pop())
  else jumpToNextEvent()
}
```

## Đừng tự lừa mình về coverage

36 bài hiện tại **chưa phải toàn bộ PCCP core**. Full representative problem vẫn còn thiếu cho:

- BFS / Grid BFS
- prefix sum
- binary search / binary search on answer
- DP
