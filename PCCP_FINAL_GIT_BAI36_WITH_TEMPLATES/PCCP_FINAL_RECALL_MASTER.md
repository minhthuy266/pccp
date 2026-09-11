# PCCP FINAL RECALL — 12/09/2026

> Mục tiêu: đọc nhanh trước khi thi và khôi phục lại **luồng suy nghĩ → state → transition → code**.
>
> Mỗi bài đều dùng cùng một cấu trúc để não nhận diện pattern nhanh.

---


# 🧭 NAVIGATOR — MOBILE FIRST

> **Cách dùng sáng mai:** mở phần này → chọn đúng pattern / bài → đọc `Recall 20 giây` trước → nếu chưa bật code trong đầu thì mới kéo lên xem 9 bước + dry run.

## ⚡ Quick Recall Index

| # | Bài | Pattern | Trigger | Link |
|---:|---|---|---|---|
| 1 | Số thứ K | Array / Simulation | `command → cut → sort → pick` | [Đi tới bài 1](#bài-1--k번째수-số-thứ-k) |
| 2 | Cuộc đua chạy | Array + Hash Map | `event nhiều + cần vị trí hiện tại` | [Đi tới bài 2](#bài-2--달리기-경주-cuộc-đua-chạy) |
| 3 | Đi dạo trong công viên | Grid Simulation | `copy → try từng bước → all valid mới commit` | [Đi tới bài 3](#bài-3--공원-산책-đi-dạo-trong-công-viên) |
| 4 | Trò gắp thú bằng cần cẩu | Grid + Stack | `scan cột → first non-zero → compare stack top` | [Đi tới bài 4](#bài-4--크레인-인형뽑기-게임-trò-gắp-thú-bằng-cần-cẩu) |
| 5 | VĐV không hoàn thành marathon | Hash Map / Frequency | `participant +1 → completion -1 → còn dư` | [Đi tới bài 5](#bài-5--완주하지-못한-선수-vận-động-viên-không-hoàn-thành) |
| 6 | Danh bạ điện thoại | Hash Set / Prefix | `Set full numbers → enumerate prefixes → has()` | [Đi tới bài 6](#bài-6--전화번호-목록-danh-bạ-điện-thoại) |
| 7 | Phối đồ | Hash Map / Counting | `đếm theo loại → nhân (count + 1) → trừ 1` | [Đi tới bài 7](#bài-7--의상-clothes) |
| 8 | Số lớn nhất | Sorting / Custom Comparator | `so b+a với a+b → join → all-zero fix` | [Đi tới bài 8](#bài-8--가장-큰-수-số-lớn-nhất) |
| 9 | Sự kiện giảm giá | Fixed Sliding Window + Map | `window 10 → add incoming → remove outgoing → compare counts` | [Đi tới bài 9](#bài-9--할인-행사-sự-kiện-giảm-giá) |
| 10 | Tổng dãy con liên tiếp | Two Pointers / Variable Sliding Window | `right add → while sum > k shrink left → sum==k commit` | [Đi tới bài 10](#bài-10--연속된-부분-수열의-합-tổng-dãy-con-liên-tiếp) |
| 11 | Phát triển chức năng | Queue / Sequential Batching | `days → gom task sau nếu days <= releaseDay` | [Đi tới bài 11](#bài-11--기능개발-phát-triển-chức-năng) |
| 12 | Dấu ngoặc hợp lệ | Stack / Balance Counter | `( → +1, ) → -1; prefix không âm; cuối = 0` | [Đi tới bài 12](#bài-12--dấu-ngoặc-hợp-lệ) |
| 13 | Process / Tiến trình | Queue + Priority Simulation | `pop đầu → có priority cao hơn thì push lại → không thì execute` | [Đi tới bài 13](#bài-13--process-tiến-trình) |
| 14 | Xuồng cứu sinh | Greedy + Two Pointers | `sort → nặng nhất luôn đi → thử ghép nhẹ nhất` | [Đi tới bài 14](#bài-14--구명보트-xuồng-cứu-sinh) |
| 15 | Giá cổ phiếu | Monotonic Stack | `stack giữ index chưa thấy giảm → current thấp hơn thì pop và chốt thời gian` | [Đi tới bài 15](#bài-15--주식가격-giá-cổ-phiếu) |
| 16 | Tạo số lớn nhất | Greedy + Monotonic Stack | `current > top và còn k → pop; cuối còn k thì cắt đuôi` | [Đi tới bài 16](#bài-16--큰-수-만들기-tạo-số-lớn-nhất) |
| 17 | Xe tải qua cầu | Queue / Time Simulation | `mỗi giây: truck rời trước → check weight → truck mới vào` | [Đi tới bài 17](#bài-17--다리를-지나는-트럭-xe-tải-qua-cầu) |
| 18 | Thời hạn lưu trữ thông tin cá nhân | Date Parsing + Hash Map | `date → totalDays; expiry = collected + months*28; today >= expiry thì xóa` | [Đi tới bài 18](#bài-18--개인정보-수집-유효기간-thời-hạn-lưu-trữ-thông-tin-cá-nhân) |
| 19 | Nén chuỗi | Brute Force + String Parsing | `thử unit 1..n/2 → scan block liên tiếp → commit count + block` | [Đi tới bài 19](#bài-19--문자열-압축-nén-chuỗi) |
| 20 | Trộn đồ cay hơn | Min-Heap / Priority Queue | `peek < K → pop 2 min → mix → push lại; thiếu 2 phần tử thì -1` | [Đi tới bài 20](#bài-20--더-맵게-trộn-đồ-cay-hơn) |
| 21 | Disk Controller | Sort + Min-Heap + Event Simulation | `push jobs arrived <= time → pop shortest duration → jump time if heap empty` | [Đi tới bài 21](#bài-21--디스크-컨트롤러-disk-controller) |

---

## 🗂️ Navigator theo Pattern

### Array / Simulation
- [Bài 1 — K번째수 (Số thứ K)](#bài-1--k번째수-số-thứ-k)
- [Bài 3 — 공원 산책 (Đi dạo trong công viên)](#bài-3--공원-산책-đi-dạo-trong-công-viên)
- [Bài 17 — Xe tải qua cầu](#bài-17--다리를-지나는-트럭-xe-tải-qua-cầu)
- [Bài 18 — Thời hạn lưu trữ thông tin cá nhân](#bài-18--개인정보-수집-유효기간-thời-hạn-lưu-trữ-thông-tin-cá-nhân)
- [Bài 19 — Nén chuỗi](#bài-19--문자열-압축-nén-chuỗi)
- [Bài 21 — Disk Controller](#bài-21--디스크-컨트롤러-disk-controller)

### String / Parsing
- [Bài 18 — Thời hạn lưu trữ thông tin cá nhân](#bài-18--개인정보-수집-유효기간-thời-hạn-lưu-trữ-thông-tin-cá-nhân)
- [Bài 19 — Nén chuỗi](#bài-19--문자열-압축-nén-chuỗi)

### Hash / Map
- [Bài 2 — 달리기 경주 (Cuộc đua chạy)](#bài-2--달리기-경주-cuộc-đua-chạy)
- [Bài 5 — 완주하지 못한 선수 (VĐV không hoàn thành)](#bài-5--완주하지-못한-선수-vận-động-viên-không-hoàn-thành)
- [Bài 7 — 의상 (Clothes)](#bài-7--의상-clothes)
- [Bài 18 — Thời hạn lưu trữ thông tin cá nhân](#bài-18--개인정보-수집-유효기간-thời-hạn-lưu-trữ-thông-tin-cá-nhân)

### Stack / Queue
- [Bài 4 — 크레인 인형뽑기 게임 (Trò gắp thú bằng cần cẩu)](#bài-4--크레인-인형뽑기-게임-trò-gắp-thú-bằng-cần-cẩu)
- [Bài 11 — Phát triển chức năng](#bài-11--기능개발-phát-triển-chức-năng)
- [Bài 12 — Dấu ngoặc hợp lệ](#bài-12--dấu-ngoặc-hợp-lệ)
- [Bài 13 — Process / Tiến trình](#bài-13--process-tiến-trình)
- [Bài 15 — Giá cổ phiếu](#bài-15--주식가격-giá-cổ-phiếu)
- [Bài 17 — Xe tải qua cầu](#bài-17--다리를-지나는-트럭-xe-tải-qua-cầu)

### Monotonic Stack
- [Bài 15 — Giá cổ phiếu](#bài-15--주식가격-giá-cổ-phiếu)
- [Bài 16 — Tạo số lớn nhất](#bài-16--큰-수-만들기-tạo-số-lớn-nhất)

### Heap / Priority Queue
_Chưa có._
- [Bài 20 — Trộn đồ cay hơn](#bài-20--더-맵게-trộn-đồ-cay-hơn)
- [Bài 21 — Disk Controller](#bài-21--디스크-컨트롤러-disk-controller)

### Greedy
- [Bài 14 — Xuồng cứu sinh](#bài-14--구명보트-xuồng-cứu-sinh)
- [Bài 16 — Tạo số lớn nhất](#bài-16--큰-수-만들기-tạo-số-lớn-nhất)

### Two Pointers / Sliding Window
- [Bài 9 — 할인 행사 (Sự kiện giảm giá)](#bài-9--할인-행사-sự-kiện-giảm-giá)
- [Bài 10 — 연속된 부분 수열의 합 (Tổng dãy con liên tiếp)](#bài-10--연속된-부분-수열의-합-tổng-dãy-con-liên-tiếp)
- [Bài 14 — Xuồng cứu sinh](#bài-14--구명보트-xuồng-cứu-sinh)

### DFS / BFS
_Chưa có._

### Binary Search
_Chưa có._

### Brute Force / Backtracking
_Chưa có._
- [Bài 19 — Nén chuỗi](#bài-19--문자열-압축-nén-chuỗi)

### Dynamic Programming
_Chưa có._

### Sorting / Comparator
- [Bài 6 — 전화번호 목록 (Danh bạ điện thoại)](#bài-6--전화번호-목록-danh-bạ-điện-thoại)
- [Bài 8 — 가장 큰 수 (Số lớn nhất)](#bài-8--가장-큰-수-số-lớn-nhất)

---

## 🧠 Navigator theo mức Recall

### 🔴 Phải nhớ code shape ngay
- [Bài 1 — Số thứ K — Array / Simulation](#8-recall-20-giây)
- [Bài 2 — Cuộc đua chạy — Array + Hash Map](#8-recall-20-giây-1)
- [Bài 3 — Đi dạo trong công viên — Grid Simulation](#8-recall-20-giây-2)
- [Bài 4 — Trò gắp thú bằng cần cẩu — Grid + Stack](#8-recall-20-giây-3)
- [Bài 5 — VĐV không hoàn thành marathon — Hash Map / Frequency](#8-recall-20-giây-4)
- [Bài 6 — Danh bạ điện thoại — Hash Set / Prefix](#8-recall-20-giây-5)
- [Bài 7 — Phối đồ — Hash Map / Counting](#8-recall-20-giây-6)
- [Bài 8 — Số lớn nhất — Sorting / Custom Comparator](#8-recall-20-giây-7)
- [Bài 9 — Sự kiện giảm giá — Fixed Sliding Window + Map](#8-recall-20-giây-8)
- [Bài 10 — Tổng dãy con liên tiếp — Two Pointers / Variable Sliding Window](#8-recall-20-giây-9)
- [Bài 11 — Phát triển chức năng — Queue / Sequential Batching](#8-recall-20-giây-10)
- [Bài 12 — Dấu ngoặc hợp lệ — Stack / Balance Counter](#8-recall-20-giây-11)
- [Bài 13 — Process / Tiến trình — Queue + Priority Simulation](#8-recall-20-giây-12)
- [Bài 14 — Xuồng cứu sinh — Greedy + Two Pointers](#8-recall-20-giây-13)
- [Bài 15 — Giá cổ phiếu — Monotonic Stack](#8-recall-20-giây-14)
- [Bài 16 — Tạo số lớn nhất — Greedy + Monotonic Stack](#8-recall-20-giây-15)
- [Bài 17 — Xe tải qua cầu — Queue / Time Simulation](#8-recall-20-giây-16)
- [Bài 18 — Thời hạn lưu trữ thông tin cá nhân — Date Parsing + Hash Map](#8-recall-20-giây-17)
- [Bài 19 — Nén chuỗi — Brute Force + String Parsing](#8-recall-20-giây-18)
- [Bài 20 — Trộn đồ cay hơn — Min-Heap / Priority Queue](#8-recall-20-giây-19)
- [Bài 21 — Disk Controller — Sort + Min-Heap + Event Simulation](#8-recall-20-giây-20)

### 🟡 Cần nhìn Dry Run nếu quên
- [Bài 1 — Số thứ K — Array / Simulation](#3-dry-run--7-cột-chuyển-tư-duy-thành-code)
- [Bài 2 — Cuộc đua chạy — Array + Hash Map](#3-dry-run--7-cột-chuyển-tư-duy-thành-code-1)
- [Bài 3 — Đi dạo trong công viên — Grid Simulation](#3-dry-run--7-cột-chuyển-tư-duy-thành-code-2)
- [Bài 4 — Trò gắp thú bằng cần cẩu — Grid + Stack](#3-dry-run--7-cột-chuyển-tư-duy-thành-code-3)
- [Bài 5 — VĐV không hoàn thành marathon — Hash Map / Frequency](#3-dry-run--7-cột-chuyển-tư-duy-thành-code-4)
- [Bài 6 — Danh bạ điện thoại — Hash Set / Prefix](#3-dry-run--7-cột-chuyển-tư-duy-thành-code-5)
- [Bài 7 — Phối đồ — Hash Map / Counting](#3-dry-run--7-cột-chuyển-tư-duy-thành-code-6)
- [Bài 8 — Số lớn nhất — Sorting / Custom Comparator](#3-dry-run--7-cột-chuyển-tư-duy-thành-code-7)
- [Bài 9 — Sự kiện giảm giá — Fixed Sliding Window + Map](#3-dry-run--7-cột-chuyển-tư-duy-thành-code-8)
- [Bài 10 — Tổng dãy con liên tiếp — Two Pointers / Variable Sliding Window](#3-dry-run--7-cột-chuyển-tư-duy-thành-code-9)
- [Bài 11 — Phát triển chức năng — Queue / Sequential Batching](#3-dry-run--7-cột-chuyển-tư-duy-thành-code-10)
- [Bài 12 — Dấu ngoặc hợp lệ — Stack / Balance Counter](#3-dry-run--7-cột-chuyển-tư-duy-thành-code-11)
- [Bài 13 — Process / Tiến trình — Queue + Priority Simulation](#3-dry-run--7-cột-chuyển-tư-duy-thành-code-12)
- [Bài 14 — Xuồng cứu sinh — Greedy + Two Pointers](#3-dry-run--7-cột-chuyển-tư-duy-thành-code-13)
- [Bài 15 — Giá cổ phiếu — Monotonic Stack](#3-dry-run--7-cột-chuyển-tư-duy-thành-code-14)
- [Bài 16 — Tạo số lớn nhất — Greedy + Monotonic Stack](#3-dry-run--7-cột-chuyển-tư-duy-thành-code-15)
- [Bài 17 — Xe tải qua cầu — Queue / Time Simulation](#3-dry-run--7-cột-chuyển-tư-duy-thành-code-16)
- [Bài 18 — Thời hạn lưu trữ thông tin cá nhân — Date Parsing + Hash Map](#3-dry-run--7-cột-chuyển-tư-duy-thành-code-17)
- [Bài 19 — Nén chuỗi — Brute Force + String Parsing](#3-dry-run--7-cột-chuyển-tư-duy-thành-code-18)
- [Bài 20 — Trộn đồ cay hơn — Min-Heap / Priority Queue](#3-dry-run--7-cột-chuyển-tư-duy-thành-code-19)
- [Bài 21 — Disk Controller — Sort + Min-Heap + Event Simulation](#3-dry-run--7-cột-chuyển-tư-duy-thành-code-20)

### 🟢 Chỉ cần nhớ trap
- [Bài 1 — Số thứ K — Array / Simulation](#7-trap-dễ-chết)
- [Bài 2 — Cuộc đua chạy — Array + Hash Map](#7-trap-dễ-chết-1)
- [Bài 3 — Đi dạo trong công viên — Grid Simulation](#7-trap-dễ-chết-2)
- [Bài 4 — Trò gắp thú bằng cần cẩu — Grid + Stack](#7-trap-dễ-chết-3)
- [Bài 5 — VĐV không hoàn thành marathon — Hash Map / Frequency](#7-trap-dễ-chết-4)
- [Bài 6 — Danh bạ điện thoại — Hash Set / Prefix](#7-trap-dễ-chết-5)
- [Bài 7 — Phối đồ — Hash Map / Counting](#7-trap-dễ-chết-6)
- [Bài 8 — Số lớn nhất — Sorting / Custom Comparator](#7-trap-dễ-chết-7)
- [Bài 9 — Sự kiện giảm giá — Fixed Sliding Window + Map](#7-trap-dễ-chết-8)
- [Bài 10 — Tổng dãy con liên tiếp — Two Pointers / Variable Sliding Window](#7-trap-dễ-chết-9)
- [Bài 11 — Phát triển chức năng — Queue / Sequential Batching](#7-trap-dễ-chết-10)
- [Bài 12 — Dấu ngoặc hợp lệ — Stack / Balance Counter](#7-trap-dễ-chết-11)
- [Bài 13 — Process / Tiến trình — Queue + Priority Simulation](#7-trap-dễ-chết-12)
- [Bài 14 — Xuồng cứu sinh — Greedy + Two Pointers](#7-trap-dễ-chết-13)
- [Bài 15 — Giá cổ phiếu — Monotonic Stack](#7-trap-dễ-chết-14)
- [Bài 16 — Tạo số lớn nhất — Greedy + Monotonic Stack](#7-trap-dễ-chết-15)
- [Bài 17 — Xe tải qua cầu — Queue / Time Simulation](#7-trap-dễ-chết-16)
- [Bài 18 — Thời hạn lưu trữ thông tin cá nhân — Date Parsing + Hash Map](#7-trap-dễ-chết-17)
- [Bài 19 — Nén chuỗi — Brute Force + String Parsing](#7-trap-dễ-chết-18)
- [Bài 20 — Trộn đồ cay hơn — Min-Heap / Priority Queue](#7-trap-dễ-chết-19)
- [Bài 21 — Disk Controller — Sort + Min-Heap + Event Simulation](#7-trap-dễ-chết-20)

---

## 📱 Quy tắc trình bày cho tất cả bài tiếp theo

Mỗi bài sẽ luôn có đúng thứ tự:

```text
[BÀI N — TÊN]
↓
1. DỊCH ĐỀ
↓
2. 9 BƯỚC PHÂN TÍCH
↓
3. DRY RUN 7 CỘT
↓
4. BỘ PHIM HÌNH ẢNH
↓
5. CODE SKELETON
↓
6. 4 CÂU THẦN CHÚ
↓
7. TRAP
↓
8. RECALL 20 GIÂY
↓
⬆ BACK TO NAVIGATOR
```

**Trên điện thoại:** ưu tiên đọc theo thứ tự ngược:

```text
Recall 20 giây
→ 4 câu thần chú
→ Bộ phim
→ Dry Run
→ 9 bước
```

Tức là **không cần đọc lại toàn bộ bài** nếu não đã bật đúng pattern.

---


## Cách dùng file này

Với mỗi bài, recall theo thứ tự:

1. **Đề đang yêu cầu cái gì?**
2. **Input nhỏ hay lớn?**
3. **Brute force tự nhiên nhất là gì?**
4. **Vì sao brute force không ổn / bottleneck nằm ở đâu?**
5. **State cần giữ là gì?**
6. **Transition làm state thay đổi thế nào?**
7. **Invariant nào luôn phải đúng?**
8. **Pattern / thuật toán nào khớp?**
9. **Complexity có qua constraint không?**
10. Nhìn **7-column dry run** và tự nói lại luồng.
11. Nhìn **Bộ phim hình ảnh** rồi nhắm mắt viết skeleton code.

---

# TEMPLATE CHUẨN CHO MỖI BÀI

## Bài N — [Tên bài]

### 1. Dịch đề tiếng Việt

- Dịch **đủ nghĩa, rõ ràng, tự nhiên**.
- Giữ nguyên toàn bộ dữ kiện, điều kiện, constraint, input/output.
- **Không gợi ý thuật toán trong phần dịch.**

---

### 2. Phân tích 9 bước

#### STEP 1 — CONTRACT

**Input**
- ...

**Output**
- ...

**Điều kiện bắt buộc**
- ...

**Một câu chốt**
> Ta cần ...

---

#### STEP 2 — BOUND

- `n <= ...`
- Giá trị phần tử: ...
- Suy ra mức complexity có thể chấp nhận:
  - `O(n)`:
  - `O(n log n)`:
  - `O(n²)`:
  - ...

---

#### STEP 3 — BRUTE FORCE

Cách nghĩ ngây thơ nhất:

1. ...
2. ...
3. ...

Complexity:
`O(...)`

---

#### STEP 4 — BOTTLENECK

Brute force chậm / khó ở đâu?

> ...

Thứ đang bị tính lại / duyệt lại / thử lại nhiều lần:

> ...

---

#### STEP 5 — STATE

Trong lúc chạy, ta thực sự cần nhớ những gì?

| State | Ý nghĩa |
|---|---|
| `...` | ... |

**State tối thiểu:**
> ...

---

#### STEP 6 — TRANSITION

Mỗi khi xử lý một `unit`, state đổi thế nào?

```text
state_trước
    ↓
đọc input / chọn action
    ↓
kiểm tra condition
    ↓
thay đổi state
    ↓
cập nhật answer nếu cần
    ↓
state_sau
```

Cụ thể:
- Nếu ... → ...
- Nếu ... → ...
- Nếu ... → ...

---

#### STEP 7 — INVARIANT

Trong toàn bộ quá trình, điều gì **luôn luôn đúng**?

> ...

Nếu invariant bị phá → code sai.

---

#### STEP 8 — PATTERN

**Pattern chính:** `...`

Dấu hiệu nhận diện từ đề:
- ...
- ...
- ...

**Trigger sentence**
> “Thấy ... → nghĩ ngay đến ...”

---

#### STEP 9 — COMPLEXITY

- Time: `O(...)`
- Space: `O(...)`

Vì:
> ...

---

### 3. Dry Run — 7 cột chuyển tư duy thành code

| Unit | State trước | Action (input / choice) | Transition | Update answer? | Next | State sau |
|---|---|---|---|---|---|---|
| ... | ... | ... | ... | ... | ... | ... |

> Mục tiêu của bảng này không phải mô phỏng cho đẹp, mà để nhìn thấy chính xác:
> **LOOP đang xử lý ai → CONDITION kiểm tra gì → STATE thay đổi ở đâu → ANSWER commit lúc nào.**

---

### 4. Bộ phim hình ảnh

#### Frame 1 — Khởi tạo
```text
[ ... ]
```

#### Frame 2 — Unit đầu tiên đi vào
```text
[ ... ]
        ↑
      current
```

#### Frame 3 — Condition được kiểm tra
```text
...
```

#### Frame 4 — Transition
```text
STATE BEFORE
    ↓
ACTION
    ↓
STATE AFTER
```

#### Frame 5 — Commit answer
```text
...
```

#### Frame 6 — Kết thúc
```text
ANSWER = ...
```

**Câu chuyện 1 dòng**
> “...”

---

### 5. Code Skeleton Recall

```js
function solution(...) {
    // 1. state

    // 2. loop / search

        // 3. condition

        // 4. transition

        // 5. commit answer

    // 6. return
}
```

---

### 6. 4 câu thần chú trước khi code

**LOOP LEVELS**
> ...

**RESET WHEN**
> ...

**INVALIDATES WHAT**
> ...

**COMMIT WHEN**
> ...

---

### 7. Trap dễ chết

- ...
- ...
- ...

---

### 8. Recall 20 giây

> **Nhận diện:** ...

> **State:** ...

> **Transition:** ...

> **Invariant:** ...

> **Code shape:** ...

---

# CÁC BÀI ĐÃ THÊM

1. K번째수 (Số thứ K) — Array / Simulation / slice-sort-pick
2. 달리기 경주 (Cuộc đua chạy) — Array + Hash Map / dynamic position
3. 공원 산책 (Đi dạo trong công viên) — Grid Simulation / try-validate-commit
4. 크레인 인형뽑기 게임 (Trò gắp thú bằng cần cẩu) — Grid + Stack / scan-pick-pop-push


---

# Bài 1 — K번째수 (Số thứ K)

🔗 **Đề chính thức (Programmers):** https://school.programmers.co.kr/learn/courses/30/lessons/42748

## 1. Dịch đề tiếng Việt

Cho một mảng `array`.

Với mỗi lệnh `[i, j, k]`, ta thực hiện các bước sau:

1. Cắt các phần tử của `array` từ **vị trí thứ `i` đến vị trí thứ `j`**.
2. Sắp xếp đoạn vừa cắt theo thứ tự tăng dần.
3. Lấy **phần tử thứ `k`** trong mảng sau khi sắp xếp.

Ví dụ:

```text
array = [1, 5, 2, 6, 3, 7, 4]
i = 2
j = 5
k = 3
```

### Bước 1 — Cắt từ vị trí thứ 2 đến vị trí thứ 5

```text
[1, 5, 2, 6, 3, 7, 4]
    └─────────┘
      5 2 6 3
```

Ta được:

```text
[5, 2, 6, 3]
```

### Bước 2 — Sắp xếp tăng dần

```text
[2, 3, 5, 6]
```

### Bước 3 — Lấy số thứ 3

```text
[2, 3, 5, 6]
       ↑
       5
```

Kết quả là `5`.

---

Cho:

- mảng `array`
- mảng hai chiều `commands`, trong đó mỗi phần tử có dạng `[i, j, k]`

Hãy thực hiện thao tác trên với **tất cả các command** và trả về một mảng chứa các kết quả.

### Giới hạn

- Độ dài `array`: từ `1` đến `100`.
- Mỗi phần tử của `array`: từ `1` đến `100`.
- Độ dài `commands`: từ `1` đến `50`.
- Mỗi phần tử của `commands` luôn có đúng `3` số.

### Ví dụ

```text
array = [1, 5, 2, 6, 3, 7, 4]

commands = [
  [2, 5, 3],
  [4, 4, 1],
  [1, 7, 3]
]
```

Kết quả:

```text
[5, 6, 3]
```

Giải thích:

```text
[2, 5, 3]
array[2..5] = [5, 2, 6, 3]
sort          = [2, 3, 5, 6]
k = 3         → 5
```

```text
[4, 4, 1]
array[4..4] = [6]
sort          = [6]
k = 1         → 6
```

```text
[1, 7, 3]
array[1..7] = [1, 5, 2, 6, 3, 7, 4]
sort          = [1, 2, 3, 4, 5, 6, 7]
k = 3         → 3
```

---

## 2. Phân tích 9 bước

### STEP 1 — CONTRACT

**Input**

```text
array
commands = [
  [i, j, k],
  ...
]
```

Mỗi command yêu cầu:

```text
CUT i → j
SORT
PICK k
```

**Output**

Một mảng gồm kết quả của từng command theo đúng thứ tự.

Ví dụ:

```text
commands[0] → 5
commands[1] → 6
commands[2] → 3

answer = [5, 6, 3]
```

**Một câu chốt**

> Với mỗi `[i, j, k]`, cắt `array` từ vị trí `i` đến `j`, sort tăng dần, rồi lấy phần tử thứ `k`.

---

### STEP 2 — BOUND

```text
array.length <= 100
commands.length <= 50
```

Mỗi command chỉ xử lý tối đa `100` phần tử.

Nếu đoạn cắt dài `m`:

```text
slice  = O(m)
sort   = O(m log m)
pick   = O(1)
```

Tối đa:

```text
50 × 100 log 100
```

Rất nhỏ.

Vì vậy không cần tối ưu phức tạp.

> Constraint nhỏ → cứ `slice + sort + index`.

---

### STEP 3 — BRUTE FORCE

Cách nghĩ tự nhiên nhất chính là lời đề:

Với từng command:

```text
1. đọc i, j, k
2. cắt array từ i đến j
3. sort đoạn cắt
4. lấy số thứ k
5. push vào answer
```

Pseudo:

```text
for each command:
    subArray = cut(array, i, j)
    sort(subArray)
    answer.push(subArray[k])
```

Ý tưởng hoàn toàn đúng.

Vấn đề duy nhất cần xử lý cẩn thận là **index**.

---

### STEP 4 — BOTTLENECK

Ở bài này không có bottleneck về hiệu năng đáng kể.

Bottleneck thật sự là **index conversion**.

Đề dùng vị trí:

```text
1, 2, 3, 4, ...
```

JavaScript dùng index:

```text
0, 1, 2, 3, ...
```

Và:

```js
array.slice(start, end)
```

sẽ lấy:

```text
start <= index < end
```

tức là **không lấy `end`**.

Do đó:

```text
đề: từ i đến j
JS : slice(i - 1, j)
```

Không phải:

```js
slice(i, j)
```

và cũng không phải:

```js
slice(i - 1, j - 1)
```

---

### STEP 5 — STATE

Mỗi command độc lập với nhau.

Ta chỉ cần state rất nhỏ:

| State | Ý nghĩa |
|---|---|
| `answer` | kết quả cuối cùng |
| `i, j, k` | command hiện tại |
| `subArray` | đoạn array sau khi cắt và sort |

**State tối thiểu**

```text
answer
current command
temporary sliced array
```

Không cần nhớ kết quả command trước.

---

### STEP 6 — TRANSITION

Một command đi qua đúng 3 transition:

```text
ORIGINAL ARRAY
      ↓
     CUT
      ↓
SUB ARRAY
      ↓
     SORT
      ↓
SORTED SUB ARRAY
      ↓
    PICK K
      ↓
    ANSWER
```

Cụ thể:

```text
[i, j, k]
    ↓
slice(i - 1, j)
    ↓
sort((a, b) => a - b)
    ↓
[k - 1]
    ↓
push vào answer
```

Hai lần đổi index:

```text
i → i - 1
k → k - 1
```

Nhưng:

```text
j giữ nguyên
```

vì `slice` loại trừ end.

Đây là điểm quan trọng nhất của bài.

---

### STEP 7 — INVARIANT

Sau khi xử lý xong command thứ `x`:

> `answer[x]` luôn là phần tử thứ `k` của đoạn `array[i..j]` sau khi đoạn đó được sort tăng dần.

Và mỗi command:

> Không được làm thay đổi `array` gốc.

`slice()` tạo mảng mới, nên sort mảng con không ảnh hưởng `array`.

Invariant hình dung:

```text
array gốc
    │
    ├── command 1 → copy → sort
    ├── command 2 → copy → sort
    └── command 3 → copy → sort

array gốc KHÔNG ĐỔI
```

---

### STEP 8 — PATTERN

**Pattern chính**

```text
Array transformation / Simulation
```

Hay nhận diện đơn giản hơn:

> “Mỗi query / command độc lập → làm đúng tuần tự thao tác đề mô tả.”

Dấu hiệu:

- Có nhiều `commands`.
- Mỗi command độc lập.
- Mỗi command yêu cầu transform một đoạn array.
- Constraint nhỏ.
- Không có dependency giữa các query.

**Trigger sentence**

> “Mỗi `[i, j, k]` đều độc lập → loop commands → slice → sort → pick.”

Code shape phải bật ra ngay:

```js
commands.map(([i, j, k]) => {
  return array
    .slice(i - 1, j)
    .sort((a, b) => a - b)[k - 1]
})
```

---

### STEP 9 — COMPLEXITY

Gọi:

```text
C = số commands
N = array.length
```

Mỗi command có thể sort tối đa `N` phần tử:

```text
O(N log N)
```

Tổng:

```text
O(C × N log N)
```

Với constraint:

```text
C <= 50
N <= 100
```

hoàn toàn an toàn.

Space:

```text
O(N)
```

cho mảng tạm được tạo bởi `slice`.

---

## 3. Dry Run — 7 cột chuyển tư duy thành code

Dữ liệu:

```text
array = [1, 5, 2, 6, 3, 7, 4]

commands = [
  [2, 5, 3],
  [4, 4, 1],
  [1, 7, 3]
]
```

| Unit | State trước | Action (input / choice) | Transition | Update answer? | Next | State sau |
|---|---|---|---|---|---|---|
| `[2,5,3]` | `answer=[]` | cắt vị trí 2→5 | `slice(1,5)` → `[5,2,6,3]` → sort → `[2,3,5,6]` | lấy `[k-1]=[2]` → `5` | command tiếp | `answer=[5]` |
| `[4,4,1]` | `answer=[5]` | cắt vị trí 4→4 | `slice(3,4)` → `[6]` → sort → `[6]` | lấy `[0]` → `6` | command tiếp | `answer=[5,6]` |
| `[1,7,3]` | `answer=[5,6]` | cắt vị trí 1→7 | `slice(0,7)` → toàn bộ array → sort → `[1,2,3,4,5,6,7]` | lấy `[2]` → `3` | hết | `answer=[5,6,3]` |

Điểm cần nhìn:

```text
Unit       = một command
Transition = slice → sort
Commit     = sorted[k - 1]
```

---

## 4. Bộ phim hình ảnh

### Frame 1 — Command đi vào

```text
COMMAND
[2, 5, 3]

 i  j  k
 │  │  │
 │  │  └── lấy số thứ 3
 │  └───── đến vị trí 5
 └──────── từ vị trí 2
```

---

### Frame 2 — Đặt số thứ tự theo kiểu đề

```text
Vị trí:    1   2   3   4   5   6   7
            ↓   ↓   ↓   ↓   ↓   ↓   ↓
array =    [1,  5,  2,  6,  3,  7,  4]
                └────────────┘
                     CUT
```

Ta muốn:

```text
[5, 2, 6, 3]
```

---

### Frame 3 — Đổi sang index JavaScript

```text
Vị trí đề:  1   2   3   4   5   6   7
JS index:   0   1   2   3   4   5   6

array =    [1,  5,  2,  6,  3,  7,  4]
                ↑               ↑
             start=1          end=5
```

Do `slice` không lấy end:

```js
array.slice(1, 5)
```

cho:

```text
index:
1 2 3 4

[5,2,6,3]
```

### Hình phải nhớ

```text
DE BAI:  i -------- j
JS:    i-1 -------- j
       ^             ^
     INCLUDED      EXCLUDED
```

---

### Frame 4 — Sort

```text
CUT

[5, 2, 6, 3]

       ↓ sort

[2, 3, 5, 6]
```

---

### Frame 5 — Chọn số thứ K

Đề nói:

```text
k = 3
```

Nhưng JS index:

```text
k - 1 = 2
```

```text
Vị trí:    1   2   3   4
JS index:  0   1   2   3

           [2,  3,  5,  6]
                    ↑
                  answer
```

```text
answer = 5
```

---

### Frame 6 — Bộ phim hoàn chỉnh

```text
[2, 5, 3]
     │
     ▼
array.slice(2 - 1, 5)

[5, 2, 6, 3]
     │
     ▼
sort

[2, 3, 5, 6]
     │
     ▼[k - 1] = [2]

5
     │
     ▼
answer.push(5)
```

**Câu chuyện 1 dòng**

> “Command vào → `i-1` để mở cửa trái → `j` giữ nguyên vì slice tự chặn bên phải → sort → `k-1` để lấy đúng số thứ K.”

---

## 5. Code Skeleton Recall

### Cách viết dễ nhớ nhất

```js
function solution(array, commands) {
  const answer = []

  for (const [i, j, k] of commands) {
    const sorted = array
      .slice(i - 1, j)
      .sort((a, b) => a - b)

    answer.push(sorted[k - 1])
  }

  return answer
}
```

### Bản `map`

```js
function solution(array, commands) {
  return commands.map(([i, j, k]) => {
    return array
      .slice(i - 1, j)
      .sort((a, b) => a - b)[k - 1]
  })
}
```

---

## 6. 4 câu thần chú trước khi code

**LOOP LEVELS**

> Loop ngoài duy nhất: mỗi lần xử lý **1 command**.

```text
commands
   ↓
[i,j,k]
```

---

**RESET WHEN**

> `subArray` reset / tạo mới ở **mỗi command**.

Không reuse mảng đã sort của command trước.

---

**INVALIDATES WHAT**

> Sai index sẽ invalidate toàn bộ kết quả.

Đặc biệt:

```text
i phải -1
k phải -1
j KHÔNG -1
```

---

**COMMIT WHEN**

> Chỉ push answer **sau khi đoạn đã được sort xong**.

```text
CUT
 ↓
SORT
 ↓
PICK
 ↓
COMMIT
```

---

## 7. Trap dễ chết

### Trap 1 — Quên đổi `i` từ 1-based sang 0-based

Sai:

```js
array.slice(i, j)
```

Đúng:

```js
array.slice(i - 1, j)
```

---

### Trap 2 — Trừ cả `j`

Sai:

```js
array.slice(i - 1, j - 1)
```

Vì `slice` vốn đã không lấy end.

Đúng:

```js
array.slice(i - 1, j)
```

---

### Trap 3 — Quên `k - 1`

Đề nói:

```text
số thứ 3
```

JS phải lấy:

```js
sorted[2]
```

Không phải:

```js
sorted[3]
```

---

### Trap 4 — Sort number nhưng quên comparator

Sai nguy hiểm:

```js
arr.sort()
```

JavaScript mặc định sort theo chuỗi.

Ví dụ:

```text
[2, 10, 3]
```

có thể thành:

```text
[10, 2, 3]
```

Đúng:

```js
arr.sort((a, b) => a - b)
```

---

### Trap 5 — Dùng `splice` làm thay đổi array gốc

`splice()` mutate array.

Không cần dùng.

Ở đây:

```js
slice()
```

an toàn hơn vì tạo mảng mới.

---

## 8. Recall 20 giây

> **Nhận diện:** nhiều command độc lập, mỗi command bảo cắt → sort → lấy.

> **State:** `answer`, `[i,j,k]`, mảng con tạm.

> **Transition:** `slice(i-1,j) → sort → [k-1]`.

> **Invariant:** mỗi `answer[x]` là số thứ `k` của đoạn tương ứng sau sort; array gốc không đổi.

> **Code shape:**

```js
commands.map(([i,j,k]) =>
  array
    .slice(i - 1, j)
    .sort((a,b) => a-b)[k - 1]
)
```

### Hình chốt cuối

```text
[i, j, k]

      CUT
 i-1 ───── j
      ↓
    SORT
      ↓
   PICK k-1
      ↓
   ANSWER
```
---

# Bài 2 — 달리기 경주 (Cuộc đua chạy)

🔗 **Đề chính thức (Programmers):** https://school.programmers.co.kr/learn/courses/30/lessons/178871

## 1. Dịch đề tiếng Việt

Ở một quốc gia nọ, hằng năm có tổ chức một cuộc đua chạy.

Trong lúc cuộc đua diễn ra, mỗi khi một vận động viên **vượt qua người đang chạy ngay phía trước mình**, bình luận viên sẽ gọi tên người vừa vượt.

Ví dụ, thứ tự hiện tại từ hạng 1 đến hạng 3 là:

```text
1. mumu
2. soe
3. poe
```

Nếu bình luận viên gọi:

```text
"soe"
```

thì điều đó có nghĩa là `soe`, đang đứng hạng 2, vừa vượt qua `mumu`, người đứng ngay phía trước.

Thứ tự mới sẽ trở thành:

```text
1. soe
2. mumu
3. poe
```

---

Cho:

- `players`: mảng tên các vận động viên theo **thứ tự xếp hạng hiện tại từ hạng 1 trở xuống**.
- `callings`: mảng tên những vận động viên được bình luận viên gọi theo đúng thứ tự thời gian.

Mỗi lần một cái tên xuất hiện trong `callings`, vận động viên đó sẽ **đổi chỗ với người đứng ngay phía trước mình**.

Hãy trả về thứ tự các vận động viên từ hạng 1 trở xuống sau khi toàn bộ cuộc đua kết thúc.

### Giới hạn

```text
5 <= players.length <= 50,000
2 <= callings.length <= 1,000,000
```

- `players[i]` là tên của vận động viên ở vị trí `i`.
- Tên chỉ gồm chữ cái thường.
- Không có tên trùng nhau trong `players`.
- Độ dài mỗi tên từ `3` đến `10`.
- Mọi phần tử trong `callings` đều là tên có trong `players`.
- Người đang đứng hạng 1 sẽ không bao giờ được gọi.

### Ví dụ

```text
players =
["mumu", "soe", "poe", "kai", "mine"]

callings =
["kai", "kai", "mine", "mine"]
```

Kết quả:

```text
["mumu", "kai", "mine", "soe", "poe"]
```

### Diễn biến

Ban đầu:

```text
mumu  soe  poe  kai  mine
 1     2    3    4     5
```

Gọi `"kai"` lần 1:

```text
mumu  soe  kai  poe  mine
 1     2    3    4     5
```

Gọi `"kai"` lần 2:

```text
mumu  kai  soe  poe  mine
 1     2    3    4     5
```

Gọi `"mine"` lần 1:

```text
mumu  kai  soe  mine  poe
 1     2    3    4     5
```

Gọi `"mine"` lần 2:

```text
mumu  kai  mine  soe  poe
 1     2     3    4    5
```

---

## 2. Phân tích 9 bước

### STEP 1 — CONTRACT

**Input**

```text
players  = thứ tự hiện tại
callings = chuỗi sự kiện vượt
```

Mỗi `calling` có nghĩa:

```text
runner được gọi
        ↑
đổi chỗ với runner ngay trước
```

**Output**

```text
players sau khi áp dụng toàn bộ callings
```

**Một câu chốt**

> Với mỗi tên được gọi, tìm vị trí hiện tại của người đó rồi swap với người ngay trước.

---

### STEP 2 — BOUND

```text
players.length  <= 50,000
callings.length <= 1,000,000
```

Đây là constraint cực kỳ quan trọng.

Nếu mỗi lần gọi ta dùng:

```js
players.indexOf(name)
```

thì mỗi lần mất:

```text
O(N)
```

và tổng:

```text
O(C × N)
```

Tệ nhất:

```text
1,000,000 × 50,000
= 50,000,000,000
```

Không ổn.

Ta cần gần:

```text
O(N + C)
```

Muốn vậy:

> Phải biết vị trí của mỗi runner trong O(1).

---

### STEP 3 — BRUTE FORCE

Cách ngây thơ:

```js
for (const name of callings) {
  const index = players.indexOf(name)

  swap(players[index], players[index - 1])
}
```

Logic đúng.

Nhưng:

```text
indexOf = O(N)
```

nên tổng:

```text
O(C × N)
```

Với `callings` tới 1 triệu → quá chậm.

---

### STEP 4 — BOTTLENECK

Bottleneck không phải là swap.

Swap chỉ:

```text
O(1)
```

Bottleneck là:

> "Tên này hiện đang đứng ở đâu?"

Nếu mỗi lần lại scan `players` để tìm:

```text
mumu
soe
poe
kai   ← mất thời gian đi tìm
mine
```

thì quá tốn.

Giải pháp:

```text
Map<name, index>
```

Ví dụ:

```text
mumu → 0
soe  → 1
poe  → 2
kai  → 3
mine → 4
```

Sau mỗi swap, cập nhật lại đúng 2 vị trí trong Map.

---

### STEP 5 — STATE

Ta cần giữ **hai representation đồng bộ**:

| State | Ý nghĩa |
|---|---|
| `players` | ai đang đứng ở từng vị trí |
| `position` | mỗi người hiện đang ở vị trí nào |

Ví dụ:

```text
players:
index:    0      1      2      3      4
        mumu    soe    poe    kai    mine
```

```text
position:
mumu → 0
soe  → 1
poe  → 2
kai  → 3
mine → 4
```

**State tối thiểu**

```text
array: index → name
map:   name  → index
```

Đây là hai chiều ngược nhau.

---

### STEP 6 — TRANSITION

Giả sử:

```text
called = "kai"
```

Map cho biết:

```text
position["kai"] = 3
```

Người ngay trước:

```text
players[2] = "poe"
```

Ta cần:

```text
BEFORE

index:  0      1      2      3      4
       mumu    soe    poe    kai    mine
                      ↑      ↑
                    front  called
```

Swap:

```text
AFTER

index:  0      1      2      3      4
       mumu    soe    kai    poe    mine
```

Sau đó update Map:

```text
kai → 2
poe → 3
```

Transition chính xác:

```text
idx = position[called]
frontIdx = idx - 1
frontName = players[frontIdx]

swap players[idx] và players[frontIdx]

position[called] = frontIdx
position[frontName] = idx
```

---

### STEP 7 — INVARIANT

Invariant quan trọng nhất:

> Sau mọi calling, `players[index]` và `position[name]` phải luôn phản ánh cùng một thứ tự.

Nói cách khác:

```text
position[players[i]] === i
```

luôn luôn đúng với mọi `i`.

Ví dụ sau swap:

```text
players[2] = "kai"
position["kai"] = 2
```

và:

```text
players[3] = "poe"
position["poe"] = 3
```

Nếu chỉ swap array mà quên update Map:

```text
players đúng
Map sai
```

→ calling tiếp theo lấy nhầm index → toàn bộ kết quả hỏng.

---

### STEP 8 — PATTERN

**Pattern chính**

```text
Array + Hash Map
```

Cụ thể hơn:

> "Dynamic positions / maintain inverse index"

Dấu hiệu nhận diện:

- Có một thứ tự đang thay đổi liên tục.
- Event chỉ thay đổi cục bộ.
- Cần biết nhanh vị trí hiện tại của một object.
- Tên / id là duy nhất.
- Số event rất lớn.
- `indexOf`, `findIndex` sẽ quá chậm.

**Trigger sentence**

> “Cần tìm vị trí hiện tại của tên rất nhiều lần → Map tên → index.”

Mental model:

```text
ARRAY = ai ở vị trí nào?
MAP   = người này ở vị trí nào?
```

Hai cấu trúc phải update cùng lúc.

---

### STEP 9 — COMPLEXITY

Khởi tạo Map:

```text
O(N)
```

Mỗi calling:

```text
lookup Map = O(1)
swap       = O(1)
update Map = O(1)
```

Có `C` callings:

```text
O(C)
```

Tổng:

```text
O(N + C)
```

Space:

```text
O(N)
```

cho Map.

Đây là độ phức tạp cần đạt với:

```text
C <= 1,000,000
```

---

## 3. Dry Run — 7 cột chuyển tư duy thành code

Input:

```text
players =
[mumu, soe, poe, kai, mine]

callings =
[kai, kai, mine, mine]
```

Ban đầu:

```text
position =
mumu→0
soe→1
poe→2
kai→3
mine→4
```

| Unit | State trước | Action (input / choice) | Transition | Update answer? | Next | State sau |
|---|---|---|---|---|---|---|
| `kai` | `[mumu,soe,poe,kai,mine]`, `kai→3` | lấy `idx=3`, trước là `poe` | swap index `3↔2`, update `kai→2`, `poe→3` | chưa, answer chính là `players` cuối | calling tiếp | `[mumu,soe,kai,poe,mine]` |
| `kai` | `[mumu,soe,kai,poe,mine]`, `kai→2` | lấy `idx=2`, trước là `soe` | swap `2↔1`, update `kai→1`, `soe→2` | chưa | calling tiếp | `[mumu,kai,soe,poe,mine]` |
| `mine` | `[mumu,kai,soe,poe,mine]`, `mine→4` | lấy `idx=4`, trước là `poe` | swap `4↔3`, update `mine→3`, `poe→4` | chưa | calling tiếp | `[mumu,kai,soe,mine,poe]` |
| `mine` | `[mumu,kai,soe,mine,poe]`, `mine→3` | lấy `idx=3`, trước là `soe` | swap `3↔2`, update `mine→2`, `soe→3` | cuối cùng return `players` | hết | `[mumu,kai,mine,soe,poe]` |

Điểm phải nhìn ra:

```text
UNIT       = một calling
STATE      = players + position
ACTION     = tìm idx O(1)
TRANSITION = swap với idx - 1
COMMIT     = update cả array và Map
```

---

## 4. Bộ phim hình ảnh

### Frame 1 — Hai tấm bản đồ song song

```text
ARRAY: vị trí → người

0      1      2      3      4
mumu   soe    poe    kai    mine
```

```text
MAP: người → vị trí

mumu → 0
soe  → 1
poe  → 2
kai  → 3
mine → 4
```

Hãy tưởng tượng:

```text
ARRAY = bảng xếp hạng
MAP   = GPS của từng runner
```

---

### Frame 2 — Bình luận viên gọi "kai"

```text
CALLING: kai
```

Không scan array.

Hỏi GPS:

```text
position.get("kai")
          ↓
          3
```

Ta biết ngay:

```text
kai đang ở index 3
```

---

### Frame 3 — Nhìn người ngay trước

```text
index:   0      1      2      3      4
        mumu    soe    poe    kai    mine
                       ↑      ↑
                     trước   kai
```

```text
idx = 3
frontIdx = 2
frontName = poe
```

---

### Frame 4 — Swap trên bảng xếp hạng

```text
BEFORE

mumu | soe | poe | kai | mine
             ↘   ↙

AFTER

mumu | soe | kai | poe | mine
```

---

### Frame 5 — GPS cũng phải đổi

Trước:

```text
poe → 2
kai → 3
```

Sau:

```text
kai → 2
poe → 3
```

Nếu không đổi Map:

```text
ARRAY: kai đang ở 2
MAP:   kai vẫn bảo đang ở 3   ❌
```

Calling tiếp theo sẽ sai.

---

### Frame 6 — Bộ phim đầy đủ

```text
CALL "kai"
     ↓
Map hỏi vị trí
     ↓
idx = 3
     ↓
front = players[2] = poe
     ↓
SWAP

poe  kai
 ↘  ↙
kai  poe

     ↓
UPDATE MAP

kai → 2
poe → 3
     ↓
NEXT CALLING
```

**Câu chuyện 1 dòng**

> “Nghe tên → hỏi GPS người đó đang ở đâu → đổi chỗ với người trước → cập nhật GPS cho cả hai.”

---

## 5. Code Skeleton Recall

```js
function solution(players, callings) {
  const position = new Map()

  for (let i = 0; i < players.length; i++) {
    position.set(players[i], i)
  }

  for (const called of callings) {
    const idx = position.get(called)
    const frontIdx = idx - 1
    const front = players[frontIdx]

    players[frontIdx] = called
    players[idx] = front

    position.set(called, frontIdx)
    position.set(front, idx)
  }

  return players
}
```

Có thể destructuring swap:

```js
[players[idx - 1], players[idx]] =
[players[idx], players[idx - 1]]
```

Nhưng trong phòng thi, bản explicit ở trên thường dễ kiểm soát Map hơn.

---

## 6. 4 câu thần chú trước khi code

**LOOP LEVELS**

> Loop 1 lần để build Map, rồi loop từng `calling`.

```text
players → build position
callings → process events
```

---

**RESET WHEN**

> Không reset Map giữa các calling.

`position` phải giữ lại trạng thái mới nhất của cuộc đua.

---

**INVALIDATES WHAT**

> Sau swap, nếu không update **cả 2 người** trong Map thì invariant hỏng.

Phải update:

```text
called
front
```

Không chỉ `called`.

---

**COMMIT WHEN**

> Một calling chỉ hoàn tất khi **array và Map đều đã được cập nhật**.

```text
swap array
+
update 2 map entries
=
1 transition hoàn chỉnh
```

---## 7. Trap dễ chết

### Trap 1 — Dùng `indexOf`

```js
const idx = players.indexOf(called)
```

Logic đúng nhưng complexity:

```text
O(C × N)
```

với 1 triệu callings → timeout.

---

### Trap 2 — Chỉ update người được gọi

Sai:

```js
position.set(called, idx - 1)
```

nhưng quên:

```js
position.set(front, idx)
```

Map lập tức sai.

---

### Trap 3 — Update Map trước khi lưu người phía trước

Nếu overwrite array trước rồi mới đọc:

```js
players[idx - 1]
```

có thể mất tên runner cũ.

An toàn nhất:

```js
const front = players[idx - 1]
```

trước khi swap.

---

### Trap 4 — Nghĩ phải xử lý hạng 1 riêng

Đề đảm bảo:

```text
người đang hạng 1 không bị gọi
```

nên:

```text
idx >= 1
```

luôn đúng.

Không cần special case.

---

### Trap 5 — Map index 1-based

Không cần.

Giữ toàn bộ internal state theo JS index:

```text
0-based
```

sẽ đơn giản hơn.

---

## 8. Recall 20 giây

> **Nhận diện:** event rất nhiều + cần biết vị trí hiện tại của tên → `Map name→index`.

> **State:** `players` = index→name, `position` = name→index.

> **Transition:** lấy `idx`, lấy `front = players[idx-1]`, swap, update Map cho **cả hai**.

> **Invariant:** `position.get(players[i]) === i`.

> **Complexity:** `O(N + C)`.

> **Code shape:**

```js
for (const called of callings) {
  const idx = position.get(called)
  const front = players[idx - 1]

  players[idx - 1] = called
  players[idx] = front

  position.set(called, idx - 1)
  position.set(front, idx)
}
```

### Hình chốt cuối

```text
        CALL NAME
            ↓
      MAP: name → idx
            ↓
front = players[idx - 1]
            ↓
       SWAP ARRAY
            ↓
   UPDATE BOTH MAP ENTRIES
            ↓
          NEXT
```

[⬆ Quay lại Navigator](#-navigator--mobile-first)

---

# Bài 3 — 공원 산책 (Đi dạo trong công viên)

🔗 **Đề chính thức (Programmers):** https://school.programmers.co.kr/learn/courses/30/lessons/172928

**Pattern:** Grid Simulation / Command Validation  
**Trigger:** `route → thử từng bước → có 1 bước invalid thì huỷ cả route`

## 1. Dịch đề tiếng Việt

Trong một công viên hình chữ nhật dạng lưới:

- `O`: ô có thể đi qua.
- `X`: chướng ngại vật.
- `S`: vị trí bắt đầu của chó robot.

Robot thực hiện các lệnh trong `routes` theo thứ tự. Mỗi lệnh có dạng `"hướng khoảng_cách"`, ví dụ `"E 5"` nghĩa là muốn đi 5 ô về phía Đông.

Trước khi thực hiện một lệnh, phải kiểm tra **toàn bộ đường đi**:

1. Có bước nào ra ngoài công viên không?
2. Có bước nào đi qua `X` không?

Nếu chỉ cần **một bước** vi phạm, bỏ **toàn bộ lệnh hiện tại** và chuyển sang lệnh tiếp theo.

Nếu công viên có chiều cao `H`, chiều rộng `W`:

```text
trên-trái   = (0, 0)
dưới-phải   = (H - 1, W - 1)
```

Tọa độ trả về theo thứ tự:

```text
[row, col]
= [vertical, horizontal]
```

Hướng di chuyển:

```text
N → row - 1
S → row + 1
W → col - 1
E → col + 1
```

### Giới hạn

```text
3 <= H <= 50
3 <= W <= 50
1 <= routes.length <= 50
1 <= distance <= 9
```

Chỉ có đúng một `S`.

### Ví dụ trọng tâm

```js
park = [
  "SOO",
  "OXX",
  "OOO"
]

routes = ["E 2", "S 2", "W 1"]
```

- `E 2`: `[0,0] → [0,1] → [0,2]`, hợp lệ → commit `[0,2]`.
- `S 2`: bước đầu tới `[1,2] = X` → huỷ **cả lệnh**, vẫn ở `[0,2]`.
- `W 1`: `[0,2] → [0,1]` → commit.

Kết quả:

```text
[0,1]
```

---

## 2. Phân tích 9 bước

### STEP 1 — CONTRACT

**Input**

```text
park   = grid
routes = danh sách command
```

Một route như `"E 2"` gồm:

```text
direction = E
distance  = 2
```

**Output**

```text
[row cuối, col cuối]
```

**Điều kiện bắt buộc**

Một route chỉ được thực hiện nếu **mọi bước** đều:

```text
inside grid
AND
không phải X
```

**Một câu chốt**

> Với mỗi route, copy vị trí hiện tại sang tọa độ tạm, thử đi từng bước; chỉ khi **toàn bộ route hợp lệ** mới commit vào vị trí thật.

---

### STEP 2 — BOUND

```text
H, W <= 50
routes <= 50
distance <= 9
```

Tối đa chỉ khoảng:

```text
50 × 9 = 450 bước di chuyển
```

Cực nhỏ.

Không cần BFS/DFS, vì đề **đã cho sẵn đường đi**. Chỉ cần simulation.

---

### STEP 3 — BRUTE FORCE

Cách tự nhiên nhất chính là lời giải chuẩn:

```text
1. tìm S
2. for từng route
3. parse hướng + số bước
4. copy current → temp
5. đi temp từng bước
6. mỗi bước check bounds + X
7. có lỗi → huỷ route
8. không lỗi → current = temp
```

Pseudo:

```text
find start

for route:
    parse op, distance
    temp = current
    valid = true

    repeat distance times:
        temp += direction
        if outside or X:
            valid = false
            break

    if valid:
        current = temp
```

---

### STEP 4 — BOTTLENECK

Không có bottleneck hiệu năng. Bottleneck là **rollback logic**.

Sai dễ gặp:

```text
update row/col thật ngay từng bước
```

Nếu command đi được 2 bước nhưng bước 3 gặp `X`, đề yêu cầu robot **quay về vị trí trước command**. Vì vậy phải tách:

```text
CURRENT = vị trí thật
TEMP    = vị trí thử
```

Mental model:

```text
CURRENT
   │ copy
   ▼
 TEMP ── thử đi từng bước
   │
   ├─ có lỗi → discard TEMP
   │
   └─ all pass → CURRENT = TEMP
```

---

### STEP 5 — STATE

| State | Ý nghĩa |
|---|---|
| `row`, `col` | vị trí thật hiện tại |
| `nextRow`, `nextCol` | vị trí tạm để thử route |
| `valid` | route hiện tại có hợp lệ không |
| `directions` | vector N/S/W/E |

Direction map:

```js
const directions = {
  N: [-1, 0],
  S: [1, 0],
  W: [0, -1],
  E: [0, 1],
}
```

**State tối thiểu**

```text
current position
+ temporary position
+ valid flag
```

---

### STEP 6 — TRANSITION

Ví dụ route:

```text
"E 2"
```

Parse:

```js
const [op, distanceText] = route.split(" ")
const distance = Number(distanceText)
const [dr, dc] = directions[op]
```

Transition:

```text
copy row,col → nextRow,nextCol

for mỗi step:
    nextRow += dr
    nextCol += dc

    if out of bounds:
        invalid
        break

    if park[nextRow][nextCol] === "X":
        invalid
        break

if valid:
    row = nextRow
    col = nextCol
```

Bounds hợp lệ:

```text
0 <= row < H
0 <= col < W
```

Invalid nếu:

```js
nextRow < 0 ||
nextRow >= H ||
nextCol < 0 ||
nextCol >= W
```

---

### STEP 7 — INVARIANT

Invariant quan trọng nhất:

> `row, col` luôn là vị trí sau command **hợp lệ hoàn chỉnh gần nhất**.

Trong lúc đang test route:

```text
row,col KHÔNG ĐỔI
```

Chỉ `nextRow,nextCol` được mutate.

Do đó nếu route fail, chỉ cần bỏ temp; state thật vẫn đúng.

---

### STEP 8 — PATTERN

**Pattern chính**

```text
Grid Simulation
+
TRY → VALIDATE → COMMIT
```

Dấu hiệu nhận diện:

- grid nhỏ;
- có vị trí hiện tại;
- có danh sách command;
- mỗi command gồm nhiều bước;
- chỉ cần một bước fail thì huỷ cả command;
- không cần tự tìm đường tối ưu.

**Trigger sentence**

> “Command nhiều bước, all-or-nothing → copy state → thử từng bước → all valid mới commit.”

Phân biệt cực quan trọng:

```text
ĐỀ CHO COMMAND → SIMULATION
ĐỀ BẢO TỰ TÌM PATH → BFS/DFS
```

---

### STEP 9 — COMPLEXITY

Gọi:

```text
H = số hàng
W = số cột
R = số routes
D = distance tối đa
```

Tìm `S`:

```text
O(H × W)
```

Xử lý routes:

```text
O(R × D)
```

Tổng:

```text
O(H × W + R × D)
```

Space phụ:

```text
O(1)
```

---

## 3. Dry Run — 7 cột chuyển tư duy thành code

```js
park = [
  "SOO",
  "OXX",
  "OOO"
]

routes = ["E 2", "S 2", "W 1"]
```

Start:

```text
row = 0
col = 0
```

| Unit | State trước | Action | Transition | Update answer? | Next | State sau |
|---|---|---|---|---|---|---|
| `E 2` | `[0,0]` | copy temp | `[0,1]` OK → `[0,2]` OK | YES, commit | route tiếp | `[0,2]` |
| `S 2` | `[0,2]` | copy temp | bước 1 → `[1,2] = X` | NO, discard | route tiếp | `[0,2]` |
| `W 1` | `[0,2]` | copy temp | `[0,1]` OK | YES, commit | hết | `[0,1]` |

Điểm phải nhìn ra:

```text
UNIT       = một route
STATE      = current + temp + valid
TRANSITION = temp đi từng bước
INVALIDATE = outside hoặc X
COMMIT     = chỉ khi ALL steps pass
```

---

## 4. Bộ phim hình ảnh

### Frame 1 — Vị trí thật

```text
REAL = [0,0]
```

### Frame 2 — Route đi vào

```text
"E 2"
  ↓
E = [0,+1]
distance = 2
```

### Frame 3 — Copy

```text
REAL [0,0]
   │ copy
   ▼
TEMP [0,0]
```

REAL đứng yên; TEMP đi thử.

### Frame 4 — TEMP đi từng bước

```text
[0,0]
   ↓ E
[0,1]  OK
   ↓ E
[0,2]  OK
```

Mỗi ô mới đều check:

```text
BOUND?
X?
```

### Frame 5 — Commit

```text
TEMP = [0,2]
all valid
   ↓
REAL = [0,2]
```

### Frame 6 — Route lỗi

```text
S 2

REAL = [0,2]
TEMP = [0,2]

TEMP ↓
[1,2] = X
```

```text
INVALID
→ discard TEMP
→ REAL vẫn [0,2]
```

**Câu chuyện 1 dòng**

> “Cho bản sao đi thử trước; đi hết đường an toàn thì robot thật mới đi theo, gặp biên hoặc X thì xé cả lệnh.”

---

## 5. Code Skeleton Recall

```js
function solution(park, routes) {
  const H = park.length
  const W = park[0].length

  let row = 0
  let col = 0

  // 1. Find start
  for (let r = 0; r < H; r++) {
    for (let c = 0; c < W; c++) {
      if (park[r][c] === "S") {
        row = r
        col = c
      }
    }
  }

  // 2. Direction map
  const directions = {
    N: [-1, 0],
    S: [1, 0],
    W: [0, -1],
    E: [0, 1],
  }

  // 3. Process commands
  for (const route of routes) {
    const [op, distanceText] = route.split(" ")
    const distance = Number(distanceText)
    const [dr, dc] = directions[op]

    let nextRow = row
    let nextCol = col
    let valid = true

    // 4. Try every step
    for (let step = 0; step < distance; step++) {
      nextRow += dr
      nextCol += dc

      const outOfBounds =
        nextRow < 0 ||
        nextRow >= H ||
        nextCol < 0 ||
        nextCol >= W

      if (outOfBounds) {
        valid = false
        break
      }

      if (park[nextRow][nextCol] === "X") {
        valid = false
        break
      }
    }

    // 5. Commit only if whole route passed
    if (valid) {
      row = nextRow
      col = nextCol
    }
  }

  return [row, col]
}
```

### Skeleton siêu ngắn

```js
for (const route of routes) {
  parse route

  let nr = row
  let nc = col
  let valid = true

  for (let i = 0; i < distance; i++) {
    nr += dr
    nc += dc

    if (outside || park[nr][nc] === "X") {
      valid = false
      break
    }
  }

  if (valid) {
    row = nr
    col = nc
  }
}
```

---

## 6. 4 câu thần chú trước khi code

**LOOP LEVELS**

> Loop ngoài = từng route. Loop trong = từng step của route.

```text
find S

for route:
    for step:
        validate
```

**RESET WHEN**

> Reset temp + `valid` ở đầu **mỗi route**.

```js
let nextRow = row
let nextCol = col
let valid = true
```

**INVALIDATES WHAT**

> Một step `out of bounds` hoặc `X` → invalidate **toàn bộ route**.

```js
valid = false
break
```

**COMMIT WHEN**

> Chỉ commit sau khi **toàn bộ distance bước đều pass**.

```js
if (valid) {
  row = nextRow
  col = nextCol
}
```

Câu chốt:

```text
TRY FIRST
COMMIT LAST
```

---

## 7. Trap dễ chết

### Trap 1 — Update vị trí thật từng bước

Sai:

```js
row += dr
col += dc
```

ngay trong loop thử route.

Nếu step sau fail thì không rollback được.

Đúng: mutate `nextRow,nextCol`, cuối route mới commit.

---

### Trap 2 — Chỉ check ô đích

Sai:

```js
const nr = row + dr * distance
const nc = col + dc * distance
```

rồi chỉ check destination.

Giữa đường có thể có `X`.

> Phải **CHECK EVERY STEP**.

---

### Trap 3 — Đảo row / col

Nhớ:

```text
park[row][col]
return [row, col]
```

```text
N = [-1, 0]
S = [+1, 0]
W = [0, -1]
E = [0, +1]
```

---

### Trap 4 — Bounds dùng `>` thay vì `>=`

Nếu `H = 3`, row hợp lệ chỉ là:

```text
0,1,2
```

Nên:

```js
nextRow >= H
nextCol >= W
```

là out.

---

### Trap 5 — Đọc grid trước khi chắc chắn còn trong bounds

Ưu tiên:

```text
check bounds
↓
check X
```

để logic rõ và an toàn.

---

### Trap 6 — Quên `Number(distance)`

`split(" ")` trả string.

```js
const distance = Number(distanceText)
```

Viết rõ, đừng dựa vào coercion.

---

### Trap 7 — Thấy grid là nghĩ BFS

Không.

```text
Có route cho sẵn → Simulation
Tự tìm đường → BFS/DFS
```

---

## 8. Recall 20 giây

> **Nhận diện:** Grid + command nhiều bước + 1 bước sai huỷ cả command → Simulation / TRY-VALIDATE-COMMIT.

> **State:** `row,col` thật + `nextRow,nextCol` tạm + `valid`.

> **Direction:** `N[-1,0] S[1,0] W[0,-1] E[0,1]`.

> **Transition:** copy current → temp → đi từng step → mỗi step check bounds + `X`.

> **Invalidation:** một step out hoặc `X` → `valid=false`, break, current giữ nguyên.

> **Invariant:** `row,col` không bao giờ chứa movement chưa validate xong.

> **Commit:**

```js
if (valid) {
  row = nextRow
  col = nextCol
}
```

> **Complexity:** `O(H×W + routes×distance)`.

### Code shape

```js
for (const route of routes) {
  const [op, n] = route.split(" ")
  const [dr, dc] = directions[op]

  let nr = row
  let nc = col
  let valid = true

  for (let i = 0; i < Number(n); i++) {
    nr += dr
    nc += dc

    if (
      nr < 0 || nr >= H ||
      nc < 0 || nc >= W ||
      park[nr][nc] === "X"
    ) {
      valid = false
      break
    }
  }

  if (valid) {
    row = nr
    col = nc
  }
}
```

### Hình chốt cuối

```text
             ROUTE
               ↓
       COPY REAL → TEMP
               ↓
        WALK ONE STEP
               ↓
      OUTSIDE or X ?
         ↙       ↘
       YES       NO
        ↓         ↓
     CANCEL    more steps?
                  ↓
              all passed
                  ↓
                COMMIT
```

## 🧠 Một câu phải khắc vào đầu

> **“Route là transaction: COPY → TRY → ALL PASS mới COMMIT.”**

[⬆ Quay lại Navigator](#-navigator--mobile-first)



---

# Bài 4 — 크레인 인형뽑기 게임 (Trò gắp thú bằng cần cẩu)

🔗 **Đề chính thức (Programmers):** https://school.programmers.co.kr/learn/courses/30/lessons/64061

## 1. Dịch đề tiếng Việt

Một trò chơi gắp thú có một bảng vuông `N x N`.

Mỗi ô:

- `0` = ô trống.
- `1..100` = một loại búp bê; cùng số nghĩa là cùng loại.

Các búp bê trong mỗi cột được xếp từ dưới lên, nên khi cần cẩu hoạt động ở một cột, nó sẽ lấy **con búp bê trên cùng còn lại** của cột đó.

Mảng `moves` chứa các vị trí cột mà cần cẩu sẽ hoạt động theo thứ tự.

Ví dụ:

```text
move = 3
```

nghĩa là cần cẩu hoạt động ở **cột số 3 theo cách đánh số 1-based của đề**.

Nếu cột đó không còn búp bê, không có gì xảy ra.

Mỗi búp bê được gắp sẽ được thả vào giỏ. Giỏ hoạt động như một chồng:

```text
bottom ... top
```

Nếu búp bê mới thả vào giống với búp bê đang ở trên cùng của giỏ, hai con sẽ nổ và biến mất.

Mỗi lần như vậy:

```text
answer += 2
```

Hãy trả về tổng số búp bê đã bị nổ sau khi xử lý toàn bộ `moves`.

### Giới hạn

```text
5 <= N <= 30
1 <= moves.length <= 1000
1 <= move <= N
```

---

## 2. Phân tích 9 bước

### STEP 1 — CONTRACT

**Input**

```text
board = grid N x N
moves = danh sách cột cần gắp
```

**Output**

```text
số búp bê đã biến mất
```

**Một câu chốt**

> Với mỗi `move`, tìm búp bê đầu tiên khác `0` từ trên xuống trong cột đó, lấy nó ra, rồi xử lý bằng Stack trong giỏ.

---

### STEP 2 — BOUND

```text
N <= 30
moves.length <= 1000
```

Nếu mỗi move scan tối đa `N` hàng:

```text
1000 × 30 = 30,000
```

rất nhỏ.

Vì vậy cách trực tiếp:

```text
for move
    for row từ trên xuống
```

hoàn toàn đủ.

Không cần tối ưu phức tạp hơn.

---

### STEP 3 — BRUTE FORCE

Cách tự nhiên nhất:

```text
for mỗi move:
    col = move - 1

    scan row = 0 → N-1

    gặp board[row][col] != 0:
        doll = board[row][col]
        board[row][col] = 0

        đưa doll vào basket
        break
```

Sau đó giỏ xử lý:

```text
if basket top == doll:
    pop
    answer += 2
else:
    push doll
```

Đây cũng chính là lời giải chuẩn.

---

### STEP 4 — BOTTLENECK

Bài này có hai chỗ dễ sai hơn là chậm:

**1. Phải lấy đúng con trên cùng của cột**

Ta phải scan:

```text
TOP
row 0
row 1
row 2
...
BOTTOM
```

và dừng ngay tại ô đầu tiên khác `0`.

**2. Sau khi lấy phải xoá khỏi board**

```js
board[row][col] = 0
```

Nếu quên, lần sau cần cẩu sẽ gắp lại cùng một con.

---

### STEP 5 — STATE

| State | Ý nghĩa |
|---|---|
| `basket` | các búp bê còn lại trong giỏ |
| `answer` | số búp bê đã nổ |
| `board` | trạng thái hiện tại sau các lần gắp |
| `col` | cột của move hiện tại |

Điểm quan trọng:

```text
basket[basket.length - 1]
```

chính là búp bê trên cùng của giỏ.

**State tối thiểu:**

```text
board + basket + answer
```

---

### STEP 6 — TRANSITION

Một `move` đi qua flow:

```text
MOVE
 ↓
convert 1-based → 0-based
 ↓
scan cột từ trên xuống
 ↓
find first non-zero doll
 ↓
remove khỏi board
 ↓
compare với basket top
 ↓
SAME?
 ├─ YES → pop + answer += 2
 └─ NO  → push
 ↓
NEXT MOVE
```

Code logic lõi:

```js
const col = move - 1

for (let row = 0; row < board.length; row++) {
  const doll = board[row][col]

  if (doll === 0) continue

  board[row][col] = 0

  if (basket.at(-1) === doll) {
    basket.pop()
    answer += 2
  } else {
    basket.push(doll)
  }

  break
}
```

`break` rất quan trọng: một move chỉ được gắp **một** con.

---

### STEP 7 — INVARIANT

Invariant của `basket`:

> Sau mỗi move, trong basket không tồn tại hai búp bê giống nhau nằm cạnh nhau ở top mà chưa được xử lý.

Vì mỗi khi con mới vào:

```text
new doll == top
```

thì cặp đó biến mất ngay.

Invariant của `board`:

> Mọi búp bê đã gắp đều đã được đổi thành `0`, nên board luôn phản ánh trạng thái còn lại thực tế.

---

### STEP 8 — PATTERN

**Pattern chính:**

```text
Grid Simulation + Stack
```

Dấu hiệu nhận diện:

- Có nhiều lệnh `moves`.
- Mỗi lệnh chọn một cột.
- Cần lấy phần tử đầu tiên còn tồn tại trong cột.
- Các phần tử được đưa vào một cấu trúc theo thứ tự.
- Chỉ cần so phần tử mới với phần tử gần nhất trước đó.
- Khi giống nhau, loại cặp gần nhất.

Đây chính là tín hiệu Stack:

> “Phần tử mới chỉ tương tác với phần tử cuối cùng chưa bị xoá.”

**Trigger sentence**

> “Gắp 1 con → nhìn top giỏ → giống thì pop, khác thì push.”

---

### STEP 9 — COMPLEXITY

Gọi:

```text
N = board.length
M = moves.length
```

Mỗi move scan tối đa `N` row:

```text
O(N)
```

Tổng:

```text
O(M × N)
```

Với:

```text
M <= 1000
N <= 30
```

hoàn toàn an toàn.

Space:

```text
O(N²)
```

worst case cho basket vì tối đa toàn bộ búp bê có thể được gắp mà không nổ.

---

## 3. Dry Run — 7 cột chuyển tư duy thành code

Ví dụ chuẩn:

```js
board = [
  [0,0,0,0,0],
  [0,0,1,0,3],
  [0,2,5,0,1],
  [4,2,4,4,2],
  [3,5,1,3,1]
]

moves = [1,5,3,5,1,2,1,4]
```

| Unit | State trước | Action | Transition | Update answer? | Next | State sau |
|---|---|---|---|---|---|---|
| `1` | `basket=[]` | cột 0, lấy `4` | top khác → push | không | move tiếp | `[4]` |
| `5` | `[4]` | cột 4, lấy `3` | top khác → push | không | move tiếp | `[4,3]` |
| `3` | `[4,3]` | cột 2, lấy `1` | top khác → push | không | move tiếp | `[4,3,1]` |
| `5` | `[4,3,1]` | cột 4, lấy `1` | top=`1` → pop | `+2` | move tiếp | `[4,3]` |
| `1` | `[4,3]` | cột 0, lấy `3` | top=`3` → pop | `+2` | move tiếp | `[4]` |
| `2` | `[4]` | cột 1, lấy `2` | push | không | move tiếp | `[4,2]` |
| `1` | `[4,2]` | cột 0, cột rỗng | không làm gì | không | move tiếp | `[4,2]` |
| `4` | `[4,2]` | cột 3, lấy `4` | push | không | hết | `[4,2,4]` |

Kết quả:

```text
answer = 4
```

Điểm cần nhìn:

```text
UNIT       = một move
SEARCH     = scan cột từ trên xuống
PICK       = first non-zero
TRANSITION = zero board cell + stack push/pop
COMMIT     = answer += 2 khi pop pair
```

---

## 4. Bộ phim hình ảnh

### Frame 1 — Cần cẩu chọn một cột

```text
move = 3

col = 3 - 1 = 2
```

```text
      ↓ crane
col:  0 1 2 3 4
      . . . . .
      . . 1 . 3
      . 2 5 . 1
      4 2 4 4 2
      3 5 1 3 1
```

---

### Frame 2 — Scan từ trên xuống

```text
board[0][2] = 0 → skip
board[1][2] = 1 → FOUND
```

Đây là con trên cùng.

---

### Frame 3 — Gắp ra khỏi board

Trước:

```text
board[1][2] = 1
```

Sau:

```text
board[1][2] = 0
```

Con `1` đang trên cần cẩu.

---

### Frame 4 — Nhìn top giỏ

Giả sử:

```text
basket = [4, 3, 1]
                  ↑
                 top
```

Con mới:

```text
1
```

So:

```text
basket top === doll
1 === 1
```

---

### Frame 5 — Nổ cặp

```text
BEFORE
[4, 3, 1] + 1
        ↑   ↑
        same

POP

AFTER
[4, 3]

answer += 2
```

Nếu khác:

```text
basket.push(doll)
```

---

### Frame 6 — Bộ phim hoàn chỉnh

```text
MOVE
 ↓
COL = move - 1
 ↓
SCAN TOP → BOTTOM
 ↓
FIRST NON-ZERO?
 ├─ NONE → NEXT MOVE
 ↓
DOLL
 ↓
board[row][col] = 0
 ↓
COMPARE WITH STACK TOP
 ↓
SAME?
 ├─ YES → POP + answer += 2
 └─ NO  → PUSH
 ↓
BREAK
 ↓
NEXT MOVE
```

**Câu chuyện 1 dòng**

> “Cần cẩu xuống cột, gắp con đầu tiên gặp được, xoá nó khỏi board, rồi đưa tới cửa giỏ: giống top thì hai con nổ, khác thì chồng lên.”

---

## 5. Code Skeleton Recall

```js
function solution(board, moves) {
  const basket = []
  let answer = 0

  for (const move of moves) {
    const col = move - 1

    for (let row = 0; row < board.length; row++) {
      const doll = board[row][col]

      if (doll === 0) continue

      board[row][col] = 0

      if (basket.length > 0 && basket.at(-1) === doll) {
        basket.pop()
        answer += 2
      } else {
        basket.push(doll)
      }

      break
    }
  }

  return answer
}
```

### Skeleton siêu ngắn

```js
for (const move of moves) {
  const col = move - 1

  for (let row = 0; row < N; row++) {
    if (board[row][col] === 0) continue

    const doll = board[row][col]
    board[row][col] = 0

    if (stack.at(-1) === doll) {
      stack.pop()
      answer += 2
    } else {
      stack.push(doll)
    }

    break
  }
}
```

---

## 6. 4 câu thần chú trước khi code

**LOOP LEVELS**

> Outer = từng `move`; inner = scan từng `row` trong cột đó.

```text
moves
  ↓
columns
  ↓
rows top → bottom
```

**RESET WHEN**

> Không reset `basket` hay `answer`; chúng sống xuyên suốt toàn bộ game.

Chỉ `col` và scan `row` thay đổi theo move.

**INVALIDATES WHAT**

> Gặp `0` không invalidate move — chỉ `continue` xuống dưới.

Nếu scan hết cột mà không thấy búp bê:

```text
move này làm nothing
```

**COMMIT WHEN**

> Ngay khi gặp first non-zero: lấy đúng một con, xử lý stack, rồi `break`.

Một move không bao giờ gắp hai con.

---

## 7. Trap dễ chết

### Trap 1 — Quên `move - 1`

Đề đánh số cột:

```text
1..N
```

JS index:

```text
0..N-1
```

Do đó:

```js
const col = move - 1
```

---

### Trap 2 — Scan từ dưới lên

Sai vì cần lấy con **trên cùng**.

Phải:

```js
for (let row = 0; row < N; row++)
```

không phải từ `N - 1` về `0`.

---

### Trap 3 — Gặp 0 thì break

Sai:

```js
if (board[row][col] === 0) break
```

`0` chỉ là khoảng trống phía trên; có thể còn búp bê ở dưới.

Đúng:

```js
if (board[row][col] === 0) continue
```

---

### Trap 4 — Quên xoá khỏi board

Sau khi lấy:

```js
board[row][col] = 0
```

Nếu quên, lần move sau sẽ lấy lại cùng búp bê.

---

### Trap 5 — Quên `break` sau khi gắp

Nếu không break, inner loop sẽ tiếp tục xuống dưới và có thể gắp nhiều con trong cùng một move.

Đúng:

```text
pick one
process one
break
```

---

### Trap 6 — Push rồi mới kiểm tra pair

Có thể làm được nhưng dễ rối.

Dễ nhớ nhất:

```text
new doll đến cửa basket
↓
compare current top
↓
same → pop
else → push
```

---

### Trap 7 — `answer++`

Mỗi lần nổ là **2 con biến mất**.

Sai:

```js
answer++
```

Đúng:

```js
answer += 2
```

---

### Trap 8 — Nghĩ Stack vì board là stack từng cột rồi build N stack

Có thể preprocess mỗi cột thành stack, nhưng constraint nhỏ nên không cần.

Bản scan trực tiếp:

```text
O(moves × N)
```

đã đủ đơn giản và an toàn.

---

## 8. Recall 20 giây

> **Nhận diện:** mỗi move chọn cột + lấy item đầu tiên còn lại + item mới chỉ so với phần tử cuối giỏ → `Grid scan + Stack`.

> **State:** `board`, `basket`, `answer`.

> **Search:** `col = move - 1`, scan row từ `0` xuống dưới, skip `0`, lấy first non-zero.

> **Transition:** lấy `doll` → `board[row][col] = 0` → compare với `basket.at(-1)`.

> **Same top:** `pop()` + `answer += 2`.

> **Different:** `push(doll)`.

> **Invariant:** basket không giữ cặp giống nhau ở top sau khi xử lý xong một move.

> **Complexity:** `O(moves.length × N)`.

### Code shape

```js
for (const move of moves) {
  const col = move - 1

  for (let row = 0; row < board.length; row++) {
    const doll = board[row][col]
    if (doll === 0) continue

    board[row][col] = 0

    if (basket.at(-1) === doll) {
      basket.pop()
      answer += 2
    } else {
      basket.push(doll)
    }

    break
  }
}
```

### Hình chốt cuối

```text
       MOVE
         ↓
    col = move-1
         ↓
SCAN TOP → BOTTOM
         ↓
 FIRST NON-ZERO
         ↓
    REMOVE BOARD
         ↓
   LOOK STACK TOP
      ↙       ↘
   SAME      DIFFERENT
    ↓            ↓
   POP          PUSH
 answer += 2
         ↓
       BREAK
         ↓
     NEXT MOVE
```

## 🧠 Một câu phải khắc vào đầu

> **“Move chọn cột → scan từ trên xuống lấy đúng một con → xoá khỏi board → nhìn top giỏ → giống pop +2, khác push → break.”**

---

[⬆ Quay lại Navigator](#-navigator--mobile-first)

---

# Bài 5 — 완주하지 못한 선수 (Vận động viên không hoàn thành)

🔗 **Đề chính thức (Programmers):** https://school.programmers.co.kr/learn/courses/30/lessons/42576

**Pattern:** Hash Map / Frequency Count / Multiset Difference  
**Trigger:** `hai danh sách gần giống nhau + có duplicate + thiếu đúng 1 phần tử`

## 1. Dịch đề tiếng Việt

Có rất nhiều vận động viên tham gia một cuộc thi marathon.

Ngoại trừ **một người duy nhất**, tất cả các vận động viên đều đã hoàn thành cuộc đua.

Cho:

- `participant`: mảng chứa tên **tất cả những người tham gia**.
- `completion`: mảng chứa tên **những người đã hoàn thành**.

Hãy trả về tên của vận động viên **không hoàn thành cuộc đua**.

### Giới hạn

- Số người tham gia: `1` đến `100,000`.
- `completion.length = participant.length - 1`.
- Mỗi tên dài từ `1` đến `20`, chỉ gồm chữ cái thường.
- **Có thể có nhiều vận động viên trùng tên.**

### Ví dụ 1

```js
participant = ["leo", "kiki", "eden"]
completion  = ["eden", "kiki"]
```

`leo` xuất hiện trong danh sách tham gia nhưng không xuất hiện trong danh sách hoàn thành.

Kết quả:

```text
"leo"
```

### Ví dụ 2

```js
participant = ["marina", "josipa", "nikola", "vinko", "filipa"]
completion  = ["josipa", "filipa", "marina", "nikola"]
```

Kết quả:

```text
"vinko"
```

### Ví dụ 3 — quan trọng nhất

```js
participant = ["mislav", "stanko", "mislav", "ana"]
completion  = ["stanko", "ana", "mislav"]
```

Trong `participant`:

```text
mislav = 2 người
```

Trong `completion`:

```text
mislav = 1 người
```

Vì vậy vẫn còn **một `mislav` chưa hoàn thành**.

Kết quả:

```text
"mislav"
```

---

## 2. Phân tích 9 bước

### STEP 1 — CONTRACT

**Input**

```text
participant = tất cả người tham gia
completion  = tất cả người hoàn thành
```

**Output**

```text
tên của đúng 1 người chưa hoàn thành
```

**Điều kiện bắt buộc**

```text
completion.length = participant.length - 1
```

và đặc biệt:

```text
CÓ THỂ TRÙNG TÊN
```

**Một câu chốt**

> Ta cần lấy **multiset participant - multiset completion**; phần tử còn dư chính là đáp án.

---

### STEP 2 — BOUND

```text
participant.length <= 100,000
```

Nếu dùng cách kiểu:

```js
completion.includes(name)
```

cho từng participant thì có thể thành:

```text
O(N²)
```

Tệ nhất khoảng:

```text
100,000 × 100,000
```

không ổn.

Ta nên hướng tới:

```text
O(N)
```

hoặc tối đa:

```text
O(N log N)
```

Với Map, lookup/update trung bình `O(1)` → tổng `O(N)`.

---

### STEP 3 — BRUTE FORCE

Cách nghĩ ngây thơ:

Với mỗi người trong `participant`:

```text
xem người đó có tồn tại trong completion không
```

Nhưng ngay lập tức gặp vấn đề duplicate.

Ví dụ:

```text
participant = [mislav, mislav]
completion  = [mislav]
```

Nếu chỉ hỏi:

```js
completion.includes("mislav")
```

thì cả hai lần đều trả `true`.

Ta không biết một `mislav` đã được “dùng” để match rồi.

Có thể xóa từng phần tử khỏi `completion`, nhưng search + splice nhiều lần sẽ chậm.

Vậy brute force cho ta thấy thứ cần nhớ thật sự không phải **có tồn tại không**, mà là:

> **Tên này còn bao nhiêu bản sao chưa được match?**

---

### STEP 4 — BOTTLENECK

Bottleneck là **duplicate accounting**.

Không thể chỉ lưu:

```text
name exists?
```

Ta phải lưu:

```text
name → count
```

Ví dụ:

```text
participant:

mislav → 2
stanko → 1
ana    → 1
```

Sau khi trừ `completion`:

```text
mislav → 1
stanko → 0
ana    → 0
```

Người còn count > 0 chính là người chưa finish.

Mental model:

```text
participant = nạp tiền +1
completion  = rút tiền  -1

ai còn số dư 1 → answer
```

---

### STEP 5 — STATE

Ta chỉ cần một state chính:

| State | Ý nghĩa |
|---|---|
| `count` | `Map<name, số lần còn dư>` |

Cách build:

```js
count.set(name, (count.get(name) ?? 0) + 1)
```

Sau đó với completion:

```js
count.set(name, count.get(name) - 1)
```

**State tối thiểu**

```text
Map name → frequency difference
```

Không cần:

```text
Set
visited
nested loop
sorting bắt buộc
```

---

### STEP 6 — TRANSITION

#### Phase 1 — participant vào Map

Mỗi participant:

```text
count[name] += 1
```

Ví dụ:

```text
mislav
→ 1

stanko
→ 1

mislav
→ 2

ana
→ 1
```

Map:

```text
mislav → 2
stanko → 1
ana    → 1
```

#### Phase 2 — completion trừ khỏi Map

Mỗi finisher:

```text
count[name] -= 1
```

```text
stanko → 0
ana    → 0
mislav → 1
```

Cuối cùng:

```text
mislav → 1
```

→ answer.

Transition code:

```js
for (const name of participant) {
  count.set(name, (count.get(name) ?? 0) + 1)
}

for (const name of completion) {
  count.set(name, count.get(name) - 1)
}
```

---

### STEP 7 — INVARIANT

Sau khi xử lý một phần dữ liệu:

> `count[name]` luôn bằng **số lần name đã xuất hiện trong participant đã xử lý − số lần name đã xuất hiện trong completion đã xử lý**.

Cuối toàn bộ quá trình:

```text
mọi người finish → count = 0
người thiếu duy nhất → count = 1
```

Ví dụ:

```text
mislav participant = 2
mislav completion  = 1

count[mislav] = 2 - 1 = 1
```

Đó là invariant giúp duplicate vẫn hoạt động chính xác.

---

### STEP 8 — PATTERN

**Pattern chính**

```text
Hash Map Frequency Count
```

Cụ thể hơn:

```text
Multiset Difference
```

Dấu hiệu nhận diện:

- Có hai collection gần giống nhau.
- Muốn tìm phần tử bị thiếu / dư.
- Có thể có duplicate.
- Cần giữ số lần xuất hiện.
- `N` lớn.

**Trigger sentence**

> “Hai danh sách lệch nhau về số lượng và có duplicate → Map frequency, một bên +1, bên kia -1.”

Phân biệt nhanh:

```text
chỉ quan tâm unique?      → Set
quan tâm số lần xuất hiện? → Map frequency
```

Bài này chắc chắn là vế 2.

---

### STEP 9 — COMPLEXITY

Gọi:

```text
N = participant.length
```

Build Map:

```text
O(N)
```

Trừ completion:

```text
O(N)
```

Tìm count còn lại:

```text
O(number of unique names) <= O(N)
```

Tổng:

```text
O(N)
```

Space:

```text
O(N)
```

cho Map trong trường hợp mọi tên đều khác nhau.

---

## 3. Dry Run — 7 cột chuyển tư duy thành code

Input:

```js
participant = ["mislav", "stanko", "mislav", "ana"]
completion  = ["stanko", "ana", "mislav"]
```

### Phase participant

| Unit | State trước | Action | Transition | Update answer? | Next | State sau |
|---|---|---|---|---|---|---|
| `mislav` | `{}` | +1 | `mislav: 0→1` | chưa | participant tiếp | `{mislav:1}` |
| `stanko` | `{mislav:1}` | +1 | `stanko: 0→1` | chưa | tiếp | `{mislav:1, stanko:1}` |
| `mislav` | `mislav:1` | +1 | `mislav:1→2` | chưa | tiếp | `mislav:2` |
| `ana` | ... | +1 | `ana:0→1` | chưa | sang completion | `mislav:2, stanko:1, ana:1` |

### Phase completion

| Unit | State trước | Action | Transition | Update answer? | Next | State sau |
|---|---|---|---|---|---|---|
| `stanko` | `stanko:1` | -1 | `1→0` | chưa | tiếp | `stanko:0` |
| `ana` | `ana:1` | -1 | `1→0` | chưa | tiếp | `ana:0` |
| `mislav` | `mislav:2` | -1 | `2→1` | chưa | scan Map | `mislav:1` |

Cuối:

```text
mislav → 1
stanko → 0
ana    → 0
```

Answer:

```text
mislav
```

---

## 4. Bộ phim hình ảnh

### Frame 1 — Danh sách participant đi qua quầy đếm

```text
mislav  → +1
stanko  → +1
mislav  → +1
ana     → +1
```

Bảng:

```text
mislav : ██ 2
stanko : █  1
ana    : █  1
```

### Frame 2 — Completion đến lấy token đi

```text
stanko → -1
ana    → -1
mislav → -1
```

Bảng trở thành:

```text
mislav : █ 1
stanko :   0
ana    :   0
```

### Frame 3 — Một token còn lại

```text
         ┌───────────┐
mislav → │ 1 TOKEN   │ ← còn dư
         └───────────┘
```

Người có token còn dư chính là người chưa finish.

### Bộ phim đầy đủ

```text
PARTICIPANT
    ↓
name +1
    ↓
FREQUENCY MAP
    ↓
COMPLETION
    ↓
name -1
    ↓
SCAN MAP
    ↓
count > 0
    ↓
ANSWER
```

**Câu chuyện 1 dòng**

> “Mỗi người tham gia bỏ một vé vào hộp tên mình; mỗi người hoàn thành lấy một vé ra; hộp nào còn đúng một vé thì chủ hộp đó chưa hoàn thành.”

---

## 5. Code Skeleton Recall

### Bản nên nhớ

```js
function solution(participant, completion) {
  const count = new Map()

  for (const name of participant) {
    count.set(name, (count.get(name) ?? 0) + 1)
  }

  for (const name of completion) {
    count.set(name, count.get(name) - 1)
  }

  for (const [name, value] of count) {
    if (value > 0) {
      return name
    }
  }
}
```

### Skeleton siêu ngắn

```js
const map = new Map()

for (const x of A) {
  map.set(x, (map.get(x) ?? 0) + 1)
}

for (const x of B) {
  map.set(x, map.get(x) - 1)
}

for (const [key, count] of map) {
  if (count > 0) return key
}
```

Đây là template tổng quát cho:

```text
A - B
```

khi có duplicate.

---

## 6. 4 câu thần chú trước khi code

### LOOP LEVELS

> Ba loop tuần tự, **không nested**.

```text
participant → +1
completion  → -1
map         → tìm dư
```

### RESET WHEN

> Không reset Map giữa hai danh sách.

Map chính là ledger chung để participant và completion triệt tiêu nhau.

### INVALIDATES WHAT

> Dùng `Set` invalidate duplicate count.

Ví dụ:

```text
participant: mislav, mislav
completion : mislav
```

Set chỉ còn:

```text
{mislav}
```

không thể biết `2 - 1 = 1`.

### COMMIT WHEN

> Khi scan Map cuối cùng và gặp `count > 0`, có thể return ngay vì đề đảm bảo chỉ thiếu đúng một người.

```js
if (value > 0) return name
```

---

## 7. Trap dễ chết

### Trap 1 — Dùng Set

Sai:

```js
const set = new Set(participant)
```

Vì duplicate bị gộp mất.

Bài này cần:

```text
frequency
```

không phải:

```text
existence
```

---

### Trap 2 — Dùng `includes` cho từng người

```js
participant.find(name => !completion.includes(name))
```

Sai cả về duplicate lẫn complexity.

`includes` không “consume” một occurrence.

---

### Trap 3 — Quên `?? 0`

Sai:

```js
count.set(name, count.get(name) + 1)
```

Nếu chưa có key:

```text
undefined + 1 = NaN
```

Đúng:

```js
count.set(name, (count.get(name) ?? 0) + 1)
```

---

### Trap 4 — Boolean hóa count

Không được nghĩ:

```text
name có hay không
```

Phải nghĩ:

```text
name còn bao nhiêu bản sao
```

Đặc biệt khi trùng tên.

---

### Trap 5 — Sorting cũng đúng nhưng không phải template Hash cần nhớ

Có thể:

```text
sort participant
sort completion
so từng index
```

Complexity:

```text
O(N log N)
```

và vẫn pass.

Nhưng nếu mục tiêu là recall pattern:

```text
duplicate + count difference
```

thì Map là template tổng quát hơn.

---

## 8. Recall 20 giây

> **Nhận diện:** hai list gần giống nhau + duplicate có thể xuất hiện + thiếu đúng một occurrence → `Map frequency`.

> **State:** `Map<name, count>`.

> **Transition:** participant `+1`, completion `-1`.

> **Invariant:** `count[name] = participant_seen(name) - completion_seen(name)`.

> **Answer:** cuối cùng key nào `count > 0`.

> **Trap lớn nhất:** **không dùng Set**, vì Set mất duplicate.

> **Complexity:** `O(N)` time, `O(N)` space.

### Code shape

```js
const count = new Map()

for (const name of participant) {
  count.set(name, (count.get(name) ?? 0) + 1)
}

for (const name of completion) {
  count.set(name, count.get(name) - 1)
}

for (const [name, value] of count) {
  if (value > 0) return name
}
```

### Hình chốt cuối

```text
PARTICIPANT
    ↓ +1
┌───────────────┐
│ name → count  │
└───────────────┘
    ↑ -1
COMPLETION

cuối cùng:

0  0  0  1
         ↑
       ANSWER
```

## 🧠 Một câu phải khắc vào đầu

> **“Có duplicate thì đừng hỏi ‘có hay không’; hãy hỏi ‘còn bao nhiêu’ — participant +1, completion -1.”**

---

[⬆ Quay lại Navigator](#-navigator--mobile-first)



---

# Bài 6 — 전화번호 목록 (Danh bạ điện thoại)

🔗 **Đề chính thức (Programmers):** https://school.programmers.co.kr/learn/courses/30/lessons/42577

**Pattern:** Hash Set + Prefix Enumeration  
**Trigger:** `N cực lớn, mỗi string ngắn → đưa full number vào Set, rồi kiểm tra mọi prefix ngắn hơn`

---

## 1. Dịch đề tiếng Việt

Ta muốn kiểm tra trong một danh bạ điện thoại xem có trường hợp **một số điện thoại là tiền tố (prefix) của một số điện thoại khác** hay không.

Ví dụ:

```text
119
97674223
1195524421
```

`119` là prefix của `1195524421`.

Nếu tồn tại ít nhất một cặp như vậy → return:

```text
false
```

Nếu không → return:

```text
true
```

### Giới hạn

```text
1 <= phone_book.length <= 1,000,000
1 <= phone_book[i].length <= 20
```

- Không có hai số giống hệt nhau.
- Số điện thoại được lưu dưới dạng string.

---

## 2. Phân tích 9 bước

### STEP 1 — CONTRACT

Cần phát hiện có tồn tại:

```text
a != b
```

sao cho:

```js
b.startsWith(a)
```

Chỉ cần tìm thấy một case là return `false`.

---

### STEP 2 — BOUND

```text
N <= 1,000,000
L <= 20
```

Điểm quan trọng:

- `N` cực lớn
- nhưng mỗi số điện thoại rất ngắn

Không nên làm:

```text
O(N²)
```

Và với JavaScript, **sort 1,000,000 string rồi scan** có thể không phải lựa chọn an toàn nhất về thời gian/memory.

Ta tận dụng:

```text
L <= 20
```

---

### STEP 3 — BRUTE FORCE

Sai vì quá chậm:

```js
for (let i = 0; i < phone_book.length; i++) {
  for (let j = 0; j < phone_book.length; j++) {
    if (
      i !== j &&
      phone_book[j].startsWith(phone_book[i])
    ) {
      return false
    }
  }
}
```

Worst case:

```text
O(N² × L)
```

---

### STEP 4 — BOTTLENECK

Ta không cần so từng số với mọi số khác.

Nếu:

```text
phone = "1195524421"
```

thì các candidate có thể là prefix của nó chỉ là:

```text
"1"
"11"
"119"
"1195"
...
```

Tối đa chỉ:

```text
L - 1 <= 19
```

prefix.

Nếu toàn bộ số điện thoại đã nằm trong:

```js
Set
```

thì mỗi prefix chỉ cần hỏi:

```js
set.has(prefix)
```

---

### STEP 5 — STATE

```js
const phoneSet = new Set(phone_book)
```

Với mỗi số:

```js
phone
```

thử mọi prefix ngắn hơn chính nó.

---

### STEP 6 — TRANSITION

```js
for (const phone of phone_book) {
  for (let len = 1; len < phone.length; len++) {
    const prefix = phone.slice(0, len)

    if (phoneSet.has(prefix)) {
      return false
    }
  }
}
```

Scan xong không thấy:

```js
return true
```

---

### STEP 7 — INVARIANT

Với một `phone` đang xét:

> Ta đã kiểm tra toàn bộ prefix có độ dài nhỏ hơn vị trí hiện tại và chưa prefix nào tồn tại trong danh bạ.

Nếu có một số khác là prefix của `phone`, nó bắt buộc phải bằng một trong:

```text
phone.slice(0, 1)
phone.slice(0, 2)
...
phone.slice(0, phone.length - 1)
```

Nên cách check là đầy đủ.

---

### STEP 8 — PATTERN

**Pattern chính:** Hash Set + Prefix Enumeration.

Dấu hiệu:

- N rất lớn
- string ngắn
- cần membership lookup
- candidate relation có thể generate trực tiếp từ từng string

Trigger sentence:

> “N lớn nhưng string ngắn → generate tối đa L prefix rồi `Set.has()`.”

### So với sort

Sort + adjacent check là **đúng về logic**, nhưng với JavaScript và N rất lớn, bản Hash Set này an toàn hơn cho recall thi.

---

### STEP 9 — COMPLEXITY

Mỗi số dài tối đa 20.

Ta tạo tối đa 19 prefix.

Về số lần lookup:

```text
O(N × L)
```

Với `L <= 20`, gần tuyến tính theo N.

Lưu ý: tạo `slice()` có cost theo độ dài prefix, nên chặt hơn có thể xem là `O(N × L²)`, nhưng `L = 20` là hằng số rất nhỏ.

Space:

```text
O(N)
```

cho `Set`.

---

## 3. Dry Run — 7 cột chuyển tư duy thành code

```js
phone_book = ["119", "97674223", "1195524421"]
```

Set:

```text
{
  "119",
  "97674223",
  "1195524421"
}
```

Xét:

```text
"1195524421"
```

| len | prefix | Set.has? | Action |
|---:|---|---|---|
| 1 | `"1"` | false | tiếp |
| 2 | `"11"` | false | tiếp |
| 3 | `"119"` | true | return false |

---

## 4. Bộ phim hình ảnh

Thay vì hỏi:

> `"119"` có phải prefix của một triệu số khác không?

Ta đảo góc nhìn.

Với mỗi số dài:

```text
1195524421
```

ta tự sinh ra:

```text
1
11
119
1195
...
```

rồi hỏi:

```text
prefix này có nằm trong danh bạ không?
```

**Câu chuyện 1 dòng**

> “Đừng đem một số đi so với cả thế giới; tự bóc từng prefix của nó rồi hỏi Set.”

---

## 5. Code Skeleton Recall

```js
function solution(phone_book) {
  const phoneSet = new Set(phone_book)

  for (const phone of phone_book) {
    for (let len = 1; len < phone.length; len++) {
      const prefix = phone.slice(0, len)

      if (phoneSet.has(prefix)) {
        return false
      }
    }
  }

  return true
}
```

---

## 6. 4 câu thần chú trước khi code

### LOOP LEVELS

```text
for each phone
    for prefix length 1 .. phone.length - 1
        check Set
```

### RESET WHEN

Mỗi `phone` bắt đầu lại:

```text
len = 1
```

Không có state phức tạp.

### INVALIDATES WHAT

Ngay khi:

```js
phoneSet.has(prefix)
```

→ tìm được prefix conflict → return `false`.

### COMMIT WHEN

Scan hết tất cả số mà không conflict:

```js
return true
```

---

## 7. Trap dễ chết

### Trap 1 — Check full string luôn

Nếu loop:

```js
len <= phone.length
```

thì `phoneSet.has(phone)` luôn true vì chính nó có trong Set.

Phải:

```js
len < phone.length
```

---

### Trap 2 — Dùng `includes`

Sai ý nghĩa.

Ta cần:

```text
prefix
```

không phải substring bất kỳ.

---

### Trap 3 — Nested pair comparison

```text
O(N²)
```

chết với N lớn.

---

### Trap 4 — Dùng Number thay string

Số điện thoại là string; convert sang number có thể làm mất leading zero và không cần thiết.

---

### Trap 5 — Nhớ nhầm bản sort là lựa chọn mặc định

Sort + adjacent vẫn đúng về mặt thuật toán, nhưng trong file recall JS cuối cùng:

> **ưu tiên Hash Set + Prefix Enumeration**

vì constraint:

```text
N <= 1,000,000
L <= 20
```

---

## 8. Recall 20 giây

> **Nhận diện:** N cực lớn nhưng mỗi string ngắn, hỏi prefix membership.

> **State:** `Set(phone_book)`.

> **Transition:** với mỗi phone, thử `slice(0, len)` cho `len = 1..length-1`.

> **Invalidation:** `set.has(prefix)` → `false`.

> **Commit:** hết tất cả → `true`.

> **Complexity:** khoảng `O(N × L)` lookup; `L <= 20`.

### Code shape

```js
const set = new Set(phone_book)

for (const phone of phone_book) {
  for (let len = 1; len < phone.length; len++) {
    if (set.has(phone.slice(0, len))) {
      return false
    }
  }
}

return true
```

## 🧠 Một câu phải khắc vào đầu

> **“N lớn, string ngắn: cho full number vào Set, rồi bóc từng prefix ngắn hơn để hỏi `has()`.”**

---

[⬆ Quay lại Navigator](#-navigator--mobile-first)

---
# Bài 7 — 의상 (Clothes)

🔗 **Đề chính thức (Programmers):** https://school.programmers.co.kr/learn/courses/30/lessons/42578

**Pattern:** Hash Map / Counting / Product Rule  
**Trigger:** `mỗi loại chọn tối đa 1 món → mỗi loại có count + 1 lựa chọn → nhân → trừ 1`

---

## 1. Dịch đề tiếng Việt

Conny thích mỗi ngày mặc một cách phối đồ khác nhau.

Ví dụ, Conny có các loại đồ như sau:

| Loại | Trang phục |
|---|---|
| Mặt | kính tròn, kính râm đen |
| Áo | áo phông xanh |
| Quần | quần jeans |
| Áo khoác | áo khoác dài |

Nếu hôm nay Conny mặc:

```text
kính tròn
+
áo khoác dài
+
áo phông xanh
```

thì ngày hôm sau chỉ cần thay đổi ít nhất một chi tiết, ví dụ:

- mặc thêm quần jeans
- hoặc đổi kính tròn thành kính râm đen
- hoặc thay đổi một món khác

thì được tính là một cách phối đồ khác.

### Quy tắc

- Với mỗi loại trang phục, Conny chỉ được mặc **tối đa 1 món** thuộc loại đó.
- Có thể có nhiều loại cùng được mặc trong một outfit.
- Hai outfit được coi là khác nhau nếu có ít nhất một món khác nhau hoặc một outfit có thêm/bớt một loại đồ.
- Mỗi ngày Conny phải mặc **ít nhất một món**.

Cho mảng hai chiều:

```text
clothes
```

trong đó mỗi phần tử có dạng:

```text
[tên_trang_phục, loại_trang_phục]
```

Hãy return số cách phối đồ khác nhau có thể tạo ra.

### Giới hạn

- `1 <= clothes.length <= 30`
- Không có hai món có cùng tên.
- Mỗi phần tử là string.
- Mỗi chuỗi dài từ `1` đến `20`.

### Ví dụ 1

```js
clothes = [
  ["yellow_hat", "headgear"],
  ["blue_sunglasses", "eyewear"],
  ["green_turban", "headgear"]
]
```

Có:

```text
headgear: 2 món
eyewear : 1 món
```

Các outfit hợp lệ:

```text
1. yellow_hat
2. green_turban
3. blue_sunglasses
4. yellow_hat + blue_sunglasses
5. green_turban + blue_sunglasses
```

Kết quả:

```text
5
```

### Ví dụ 2

```js
[
  ["crow_mask", "face"],
  ["blue_sunglasses", "face"],
  ["smoky_makeup", "face"]
]
```

Chỉ có một loại `face`, và có 3 món.

Mỗi outfit chỉ được chọn tối đa 1 món thuộc `face`.

Kết quả:

```text
3
```

---

## 2. Phân tích 9 bước

### STEP 1 — CONTRACT

**Input**

```text
clothes = [
  [name, type],
  ...
]
```

**Output**

```text
số outfit khác nhau
```

**Điều kiện bắt buộc**

Với mỗi `type`:

```text
chọn 0 món
hoặc
chọn đúng 1 món
```

Không được chọn 2 món cùng loại.

Toàn bộ outfit không được là:

```text
không mặc gì
```

**Một câu chốt**

> Đếm số món của từng loại, rồi với mỗi loại tính số lựa chọn là `count + 1` (chọn một món hoặc không chọn loại đó), nhân tất cả, cuối cùng trừ 1 trường hợp không mặc gì.

---

### STEP 2 — BOUND

```text
clothes.length <= 30
```

Rất nhỏ.

Performance không phải vấn đề.

Vấn đề thật sự là nhận ra **quy tắc đếm**.

Ta có thể brute force subset với tối đa 30 món:

```text
2^30
```

là quá lớn nếu enumerate thật.

Nhưng bài có structure theo **category**, cho phép rút gọn bằng product rule.

---

### STEP 3 — BRUTE FORCE

Cách ngây thơ:

```text
liệt kê mọi subset quần áo
↓
lọc những subset:
- không rỗng
- không có 2 món cùng loại
↓
đếm
```

Nếu có `N` món:

```text
2^N
```

subset.

Với `N = 30`:

```text
2^30 ≈ 1 tỷ
```

không cần thiết.

---

### STEP 4 — BOTTLENECK

Ta đang nghĩ theo từng món riêng lẻ, trong khi rule lại phụ thuộc vào **loại**.

Ví dụ:

```text
headgear: 2 món
eyewear : 1 món
```

Với `headgear`, các lựa chọn thực tế là:

```text
1. không mặc headgear
2. yellow_hat
3. green_turban
```

Tức:

```text
2 + 1 = 3 lựa chọn
```

Với `eyewear`:

```text
1. không mặc eyewear
2. blue_sunglasses
```

Tức:

```text
1 + 1 = 2 lựa chọn
```

Hai category độc lập với nhau.

Do đó:

```text
3 × 2 = 6
```

Nhưng một trong 6 là:

```text
không headgear
+
không eyewear
=
không mặc gì
```

không hợp lệ.

Vậy:

```text
6 - 1 = 5
```

---

### STEP 5 — STATE

Ta chỉ cần một Map:

```text
type → số món thuộc type đó
```

Ví dụ:

```text
headgear → 2
eyewear  → 1
```

và:

```text
answer
```

để nhân dần.

| State | Ý nghĩa |
|---|---|
| `countByType` | số món của mỗi loại |
| `answer` | tích số lựa chọn đã xử lý |

**State tối thiểu**

```text
frequency by category
+
running product
```

---

### STEP 6 — TRANSITION

### Phase 1 — Đếm theo loại

Với mỗi:

```js
[name, type]
```

ta chỉ quan tâm `type`:

```js
countByType.set(
  type,
  (countByType.get(type) ?? 0) + 1
)
```

### Phase 2 — Nhân số lựa chọn

Khởi tạo:

```js
let answer = 1
```

Với mỗi category có `count` món:

```js
answer *= (count + 1)
```

Tại sao `+1`?

Vì:

```text
count cách chọn 1 món
+
1 cách không chọn món nào của type này
```

Cuối cùng:

```js
return answer - 1
```

Trừ:

```text
không chọn gì ở tất cả category
```

---

### STEP 7 — INVARIANT

Sau khi xử lý `k` category:

> `answer` luôn bằng số cách chọn hợp lệ từ `k` category đó nếu **cho phép** trường hợp không mặc gì.

Ví dụ sau `headgear`:

```text
answer = 3
```

Sau thêm `eyewear`:

```text
answer = 3 × 2 = 6
```

Đến cuối mới remove đúng một invalid case:

```text
all-none
```

---

### STEP 8 — PATTERN

**Pattern chính**

```text
Group by category
+
Multiplication Principle
```

Dấu hiệu nhận diện:

- Item được chia thành nhiều loại/category.
- Mỗi category chọn tối đa 1.
- Có thể chọn đồng thời từ nhiều category.
- Các category độc lập.
- Hỏi số cách kết hợp.
- Có rule “ít nhất một món”.

**Trigger sentence**

> “Mỗi loại chọn 0 hoặc 1 món → loại có `count` món thì có `count + 1` lựa chọn → nhân tất cả → trừ 1.”

Mental model:

```text
CATEGORY A: [a1, a2]
choices = NONE, a1, a2
          = 3

CATEGORY B: [b1]
choices = NONE, b1
          = 2

TOTAL = 3 × 2 = 6
REMOVE NONE+NONE
= 5
```

---

### STEP 9 — COMPLEXITY

Đếm quần áo:

```text
O(N)
```

Duyệt các category:

```text
O(K)
```

với:

```text
K <= N
```

Tổng:

```text
O(N)
```

Space:

```text
O(K)
```

cho Map.

---

## 3. Dry Run — 7 cột chuyển tư duy thành code

Input:

```js
[
  ["yellow_hat", "headgear"],
  ["blue_sunglasses", "eyewear"],
  ["green_turban", "headgear"]
]
```

### Sau phase đếm

```text
headgear → 2
eyewear  → 1
```

### Phase nhân

| Unit | State trước | Action | Transition | Update answer? | Next | State sau |
|---|---|---|---|---|---|---|
| `headgear=2` | `answer=1` | có `2+1=3` lựa chọn | `1 × 3` | yes | category tiếp | `3` |
| `eyewear=1` | `answer=3` | có `1+1=2` lựa chọn | `3 × 2` | yes | hết | `6` |
| remove all-none | `6` | trừ outfit không mặc gì | `6 - 1` | final | — | `5` |

Kết quả:

```text
5
```

---

## 4. Bộ phim hình ảnh

### Frame 1 — Gom đồ vào từng tủ

```text
HEADGEAR
├─ yellow_hat
└─ green_turban

EYEWEAR
└─ blue_sunglasses
```

### Frame 2 — Mỗi tủ có thêm nút NONE

```text
HEADGEAR
├─ NONE
├─ yellow_hat
└─ green_turban

= 3 choices
```

```text
EYEWEAR
├─ NONE
└─ blue_sunglasses

= 2 choices
```

### Frame 3 — Ghép lựa chọn giữa các tủ

```text
3 × 2 = 6
```

### Frame 4 — Có một combo xấu

```text
HEADGEAR = NONE
EYEWEAR  = NONE
```

Đây là:

```text
không mặc gì
```

invalid.

### Frame 5 — Trừ đúng 1

```text
6 - 1 = 5
```

**Câu chuyện 1 dòng**

> “Mỗi loại là một tủ: chọn một món trong tủ hoặc đóng tủ không lấy gì; nhân số lựa chọn của các tủ rồi bỏ đúng combo tất cả tủ đều đóng.”

---

## 5. Code Skeleton Recall

### Bản nên nhớ

```js
function solution(clothes) {
  const countByType = new Map()

  for (const [name, type] of clothes) {
    countByType.set(
      type,
      (countByType.get(type) ?? 0) + 1
    )
  }

  let answer = 1

  for (const count of countByType.values()) {
    answer *= (count + 1)
  }

  return answer - 1
}
```

### Skeleton siêu ngắn

```js
const map = new Map()

for (const [, type] of clothes) {
  map.set(type, (map.get(type) ?? 0) + 1)
}

let answer = 1

for (const count of map.values()) {
  answer *= count + 1
}

return answer - 1
```

---

## 6. 4 câu thần chú trước khi code

### LOOP LEVELS

> Hai loop tuần tự.

```text
clothes → build frequency Map
map.values() → multiply choices
```

Không nested.

### RESET WHEN

> Không reset Map.

Mỗi item chỉ cộng vào category của nó.

`answer` bắt đầu từ:

```text
1
```

không phải `0`.

### INVALIDATES WHAT

> Quên `+1` sẽ bỏ mất lựa chọn “không mặc loại này”.

> Quên `-1` cuối cùng sẽ tính cả outfit “không mặc gì”.

### COMMIT WHEN

> Mỗi category được commit vào answer bằng phép nhân:

```js
answer *= count + 1
```

Sau khi xử lý hết:

```js
return answer - 1
```

---

## 7. Trap dễ chết

### Trap 1 — `answer = 0`

Sai:

```js
let answer = 0
answer *= ...
```

vì:

```text
0 × anything = 0
```

Đúng:

```js
let answer = 1
```

### Trap 2 — Quên `+1`

Nếu category có 2 món:

```text
a
b
```

không phải chỉ có 2 choices.

Có:

```text
NONE
a
b
```

→ `3`.

### Trap 3 — Quên `-1`

Product đã tính:

```text
NONE ở mọi category
```

Phải trừ đúng 1.

### Trap 4 — Cộng thay vì nhân

Sai:

```text
(countA + 1) + (countB + 1)
```

Vì lựa chọn giữa category là độc lập và kết hợp với nhau.

Phải:

```text
(countA + 1) × (countB + 1)
```

### Trap 5 — Đếm theo tên thay vì type

Tên item là unique nên không giúp group.

Key phải là:

```text
type
```

không phải:

```text
name
```

### Trap 6 — Nghĩ phải enumerate outfit

Không cần.

Bài là counting formula, không phải generate combination.

---

## 8. Recall 20 giây

> **Nhận diện:** item chia theo category + mỗi category chọn tối đa 1 + hỏi số cách phối.

> **State:** `Map<type, count>`.

> **Transition:** mỗi item → `count[type]++`.

> **Formula:** mỗi type có `count + 1` choices.

> **Combine:** nhân tất cả choices.

> **Remove invalid:** `-1` cho trường hợp không mặc gì.

> **Complexity:** `O(N)`.

### Code shape

```js
const map = new Map()

for (const [, type] of clothes) {
  map.set(type, (map.get(type) ?? 0) + 1)
}

let answer = 1

for (const count of map.values()) {
  answer *= count + 1
}

return answer - 1
```

### Hình chốt cuối

```text
TYPE A: count = a
choices = a + 1

TYPE B: count = b
choices = b + 1

TYPE C: count = c
choices = c + 1

TOTAL
=
(a+1)(b+1)(c+1)

↓
remove ALL NONE

ANSWER
=
TOTAL - 1
```

## 🧠 Một câu phải khắc vào đầu

> **“Mỗi loại: mặc một món hoặc không mặc → `count + 1`; các loại độc lập nên nhân; không được naked nên trừ 1.”**

---

[⬆ Quay lại Navigator](#-navigator--mobile-first)


---

# Bài 8 — 가장 큰 수 (Số lớn nhất)

🔗 **Đề chính thức (Programmers):** https://school.programmers.co.kr/learn/courses/30/lessons/42746

**Pattern:** Sorting / Custom Comparator  
**Trigger:** `ghép các số thành số lớn nhất → với a,b so a+b và b+a`

---

## 1. Dịch đề tiếng Việt

Cho một mảng gồm các số nguyên `0` hoặc số nguyên dương.

Hãy sắp xếp lại thứ tự các số rồi **nối chúng lại với nhau** để tạo ra số lớn nhất có thể.

Ví dụ:

```js
numbers = [6, 10, 2]
```

Ta có thể tạo ra:

```text
6102
6210
1062
1026
2610
2106
```

Trong đó số lớn nhất là:

```text
6210
```

Cho mảng:

```text
numbers
```

hãy sắp xếp lại thứ tự các phần tử để tạo ra số lớn nhất có thể và return kết quả dưới dạng **string**.

### Giới hạn

```text
1 <= numbers.length <= 100,000
0 <= numbers[i] <= 1,000
```

Kết quả có thể rất lớn nên phải return string.

### Ví dụ

```js
[6, 10, 2]
```

→

```text
"6210"
```

```js
[3, 30, 34, 5, 9]
```

→

```text
"9534330"
```

---

## 2. Phân tích 9 bước

### STEP 1 — CONTRACT

**Input**

```text
numbers = array<number>
```

**Output**

```text
string biểu diễn số lớn nhất sau khi reorder + concatenate
```

**Điều kiện bắt buộc**

Ta được phép:

```text
reorder
```

nhưng không được thay đổi chữ số bên trong từng number.

Ví dụ:

```text
34
```

phải giữ nguyên `"34"`.

**Một câu chốt**

> Ta cần tìm thứ tự giữa mọi cặp số sao cho khi ghép liên tiếp, kết quả toàn cục là lớn nhất.

---

### STEP 2 — BOUND

```text
N <= 100,000
```

Không thể thử mọi permutation:

```text
N!
```

Phải sort với một comparator đặc biệt.

Target complexity:

```text
O(N log N)
```

### Vì sao phải đổi sang string?

Bài toán không quan tâm giá trị riêng của từng số.

Nó quan tâm:

```text
cách ghép chuỗi
```

Ví dụ:

```text
3 và 30
```

không thể quyết định bằng:

```text
3 > 30
```

Ta phải nhìn:

```text
330
303
```

---

### STEP 3 — BRUTE FORCE

Cách ngây thơ:

```text
generate mọi permutation
↓
join từng permutation
↓
lấy max
```

Nếu có `N` số:

```text
N!
```

Với:

```text
N = 100,000
```

hoàn toàn không thể.

---

### STEP 4 — BOTTLENECK

Bottleneck là:

> Với hai số `a` và `b`, số nào phải đứng trước?

Không thể sort giảm dần theo numeric value.

Ví dụ:

```text
3
30
```

Numeric descending sẽ cho:

```text
30, 3
```

→

```text
303
```

Nhưng:

```text
3, 30
```

→

```text
330
```

lớn hơn.

### Quy tắc đúng

Với:

```text
a
b
```

so:

```text
a + b
```

với:

```text
b + a
```

Nếu:

```text
a+b > b+a
```

thì:

```text
a đứng trước b
```

Ngược lại:

```text
b đứng trước a
```

Ví dụ:

```text
a = "3"
b = "30"
```

Ta có:

```text
a+b = "330"
b+a = "303"
```

Vì:

```text
330 > 303
```

nên:

```text
3 đứng trước 30
```

---

### STEP 5 — STATE

Ta không cần nhiều state.

Chỉ cần:

| State | Ý nghĩa |
|---|---|
| `strings` | numbers sau khi convert sang string |
| comparator | quyết định thứ tự hai string |
| `result` | string sau join |

State quan trọng nhất nằm **bên trong comparator**:

```text
a+b
b+a
```

---

### STEP 6 — TRANSITION

### Phase 1 — Convert

```js
numbers.map(String)
```

Ví dụ:

```text
[3, 30, 34]
```

→

```text
["3", "30", "34"]
```

### Phase 2 — Sort

Comparator:

```js
(a, b) => (b + a).localeCompare(a + b)
```

Mental meaning:

```text
Nếu b+a lớn hơn a+b
→ b phải đi trước a
```

Ví dụ:

```text
a = "3"
b = "30"

b+a = "303"
a+b = "330"
```

Comparator đưa `"3"` trước `"30"`.

### Phase 3 — Join

```js
.join("")
```

### Phase 4 — Fix all-zero case

Ví dụ:

```js
[0, 0, 0]
```

Sau join:

```text
"000"
```

Nhưng answer chuẩn phải là:

```text
"0"
```

Do sort đã đưa số lớn nhất lên đầu, nếu:

```js
result[0] === "0"
```

thì toàn bộ các số đều là `0`.

Return:

```js
"0"
```

---

### STEP 7 — INVARIANT

Sau sort:

> Với mọi cặp liền kề `a,b`, đặt `a` trước `b` không làm kết quả nhỏ hơn đặt `b` trước `a`.

Tức là:

```text
a + b >= b + a
```

theo thứ tự comparator đã chọn.

### Local decision → global answer

Nếu một cặp đang đứng:

```text
b, a
```

nhưng:

```text
a+b > b+a
```

thì đổi thành:

```text
a, b
```

sẽ làm toàn bộ số lớn hơn.

Vì vậy comparator pairwise này là đủ để sort toàn cục.

---

### STEP 8 — PATTERN

**Pattern chính**

```text
Custom Comparator by concatenation
```

Dấu hiệu nhận diện:

- Cho nhiều số/string.
- Được reorder.
- Kết quả tạo bằng cách concatenate.
- Hỏi lớn nhất / nhỏ nhất.
- Numeric sort không phản ánh contribution sau ghép.

**Trigger sentence**

> “Ghép số để max → với mỗi `a,b`, hỏi `ab` hay `ba` lớn hơn.”

Code shape phải bật ra:

```js
.map(String)
.sort((a, b) => (b + a).localeCompare(a + b))
.join("")
```

---

### STEP 9 — COMPLEXITY

Convert:

```text
O(N)
```

Sort:

```text
O(N log N)
```

Mỗi comparator ghép string có độ dài rất nhỏ vì:

```text
numbers[i] <= 1000
```

Join:

```text
O(total digits)
```

Tổng:

```text
O(N log N)
```

Space:

```text
O(N)
```

cho array string / sort runtime.

---

## 3. Dry Run — 7 cột chuyển tư duy thành code

Input:

```js
numbers = [3, 30, 34, 5, 9]
```

Convert:

```text
["3", "30", "34", "5", "9"]
```

Một vài comparison quan trọng:

| Unit | State trước | Action | Transition | Update answer? | Next | State sau |
|---|---|---|---|---|---|---|
| `"3"` vs `"30"` | chưa rõ order | so `"330"` và `"303"` | `"3"` trước `"30"` | chưa | comparator khác | `3 > 30` |
| `"34"` vs `"3"` | chưa rõ order | so `"343"` và `"334"` | `"34"` trước `"3"` | chưa | tiếp | `34 > 3` |
| `"5"` vs `"34"` | chưa rõ order | so `"534"` và `"345"` | `"5"` trước `"34"` | chưa | tiếp | `5 > 34` |
| `"9"` vs `"5"` | chưa rõ order | so `"95"` và `"59"` | `"9"` trước `"5"` | chưa | sort xong | `9 > 5` |

Sorted:

```text
["9", "5", "34", "3", "30"]
```

Join:

```text
"9534330"
```

---

## 4. Bộ phim hình ảnh

### Frame 1 — Hai tấm thẻ số

```text
[ 3 ]    [ 30 ]
```

Không hỏi:

```text
3 lớn hơn 30 không?
```

Mà thử ghép theo hai hướng.

### Frame 2 — Ghép A trước B

```text
3 + 30
↓
330
```

### Frame 3 — Ghép B trước A

```text
30 + 3
↓
303
```

### Frame 4 — Chọn hướng thắng

```text
330 > 303
```

nên:

```text
[3][30]
```

### Frame 5 — Comparator làm việc với mọi cặp

```text
9
5
34
3
30
```

### Frame 6 — Join

```text
9 | 5 | 34 | 3 | 30
↓
9534330
```

**Câu chuyện 1 dòng**

> “Mỗi khi hai thẻ tranh nhau vị trí, ghép thử theo cả hai hướng; hướng nào tạo số lớn hơn thì thẻ ở đầu hướng đó được đứng trước.”

---

## 5. Code Skeleton Recall

### Bản nên nhớ

```js
function solution(numbers) {
  const result = numbers
    .map(String)
    .sort((a, b) => (b + a).localeCompare(a + b))
    .join("")

  return result[0] === "0" ? "0" : result
}
```

### Bản comparator viết rõ

```js
function solution(numbers) {
  const arr = numbers.map(String)

  arr.sort((a, b) => {
    const ab = a + b
    const ba = b + a

    return ba.localeCompare(ab)
  })

  const result = arr.join("")

  if (result[0] === "0") {
    return "0"
  }

  return result
}
```

---

## 6. 4 câu thần chú trước khi code

### LOOP LEVELS

> Không tự viết nested loop.

Shape:

```text
map String
↓
sort comparator
↓
join
↓
zero fix
```

### RESET WHEN

> Không có state phải reset.

Comparator phải luôn tính từ chính:

```text
a
b
```

của lần compare hiện tại.

### INVALIDATES WHAT

> Sort numeric hoặc lexicographic trực tiếp đều có thể sai.

Phải compare:

```text
a+b
vs
b+a
```

### COMMIT WHEN

> Sau khi sort xong mới join.

Sau join nhớ normalize all-zero case:

```js
result[0] === "0" ? "0" : result
```

---

## 7. Trap dễ chết

### Trap 1 — Sort numeric descending

Sai:

```js
numbers.sort((a, b) => b - a)
```

Ví dụ:

```text
[3, 30]
```

sẽ cho:

```text
30,3 → "303"
```

nhưng đúng:

```text
3,30 → "330"
```

---

### Trap 2 — Sort string mặc định

Sai:

```js
numbers.map(String).sort().reverse()
```

Lexicographic riêng lẻ không đủ.

Ta cần lexicographic trên:

```text
a+b
b+a
```

---

### Trap 3 — Comparator bị đảo chiều

Muốn **largest number**, code dễ nhớ:

```js
(b + a).localeCompare(a + b)
```

Nếu viết:

```js
(a + b).localeCompare(b + a)
```

thì order sẽ bị đảo.

### Cách tự kiểm tra trong 5 giây

Dùng:

```text
3 và 30
```

Expected:

```text
3 phải đứng trước 30
```

Nếu comparator của mày cho `30` trước `3` → đảo rồi.

---

### Trap 4 — Convert concatenation thành Number

Không cần:

```js
Number(a + b)
```

Giá trị kết quả cuối có thể rất lớn.

So string là đủ vì `a+b` và `b+a` có **cùng độ dài**.

---

### Trap 5 — All zeros

Input:

```js
[0, 0]
```

Join bình thường:

```text
"00"
```

Expected:

```text
"0"
```

Fix:

```js
return result[0] === "0" ? "0" : result
```

---

### Trap 6 — Nghĩ comparator phải so chữ số đầu tiên

Ví dụ:

```text
3
34
```

Cùng bắt đầu bằng `3`, nên first digit không quyết định đủ.

Phải so:

```text
334
343
```

Do:

```text
343 > 334
```

nên:

```text
34 trước 3
```

---

## 8. Recall 20 giây

> **Nhận diện:** reorder numbers rồi concatenate để tạo số lớn nhất → custom comparator.

> **State comparator:** với `a,b`, tạo `ab = a+b`, `ba = b+a`.

> **Transition:** nếu `ba` nên lớn hơn thì `b` đứng trước `a`.

> **Comparator JS:** `(b+a).localeCompare(a+b)`.

> **Commit:** sort xong → join.

> **Edge case:** nếu ký tự đầu result là `"0"` → return `"0"`.

> **Complexity:** `O(N log N)`.

### Code shape

```js
const result = numbers
  .map(String)
  .sort((a, b) => (b + a).localeCompare(a + b))
  .join("")

return result[0] === "0" ? "0" : result
```

### Hình chốt cuối

```text
a      b
 \    /
  \  /
   \/ 
 compare

a+b    b+a
 |       |
 └── MAX ┘
     ↓
winner đứng trước

SORT ALL
↓
JOIN
↓
ALL ZERO?
↓
ANSWER
```

## 🧠 Một câu phải khắc vào đầu

> **“Không hỏi a hay b lớn hơn; hỏi ghép `ab` hay `ba` lớn hơn.”**

---

[⬆ Quay lại Navigator](#-navigator--mobile-first)


---

# Bài 9 — 할인 행사 (Sự kiện giảm giá)

🔗 **Đề chính thức (Programmers):** https://school.programmers.co.kr/learn/courses/30/lessons/131127

**Pattern:** Fixed-size Sliding Window + Frequency Map  
**Trigger:** `10 ngày liên tiếp → mỗi start là một window cố định 10 → trượt cửa sổ`

---

## 1. Dịch đề tiếng Việt

XYZ Mart bán gói thành viên có thời hạn **10 ngày**.

Mỗi ngày, cửa hàng giảm giá đúng **một loại sản phẩm**, và trong ngày đó khách hàng chỉ được mua **một đơn vị** của sản phẩm đang giảm giá.

Jung-hyun muốn mua đúng những sản phẩm và số lượng mình cần trong **10 ngày liên tiếp** kể từ ngày đăng ký thành viên.

Cho:

```text
want
```

là danh sách sản phẩm Jung-hyun muốn mua,

```text
number
```

là số lượng tương ứng của từng sản phẩm,

và:

```text
discount
```

là sản phẩm được giảm giá ở từng ngày theo thứ tự thời gian.

Hãy đếm xem có bao nhiêu ngày có thể chọn làm ngày bắt đầu đăng ký sao cho trong đúng **10 ngày kể từ ngày đó**, toàn bộ sản phẩm giảm giá khớp đúng với danh sách và số lượng Jung-hyun muốn.

Nếu không có ngày nào hợp lệ, return:

```text
0
```

### Giới hạn

```text
1 <= want.length = number.length <= 10
1 <= number[i] <= 10
sum(number) = 10
10 <= discount.length <= 100,000
```

Do tổng `number` luôn bằng `10`, mỗi membership window luôn phải chứa đúng 10 item cần thiết.

### Ví dụ

```js
want = ["banana", "apple", "rice", "pork", "pot"]
number = [3, 2, 2, 2, 1]
```

Cần đúng:

```text
banana 3
apple  2
rice   2
pork   2
pot    1
```

Tổng:

```text
10
```

Nếu có 14 ngày discount thì các window 10 ngày có thể bắt đầu ở:

```text
day 1
day 2
day 3
day 4
day 5
```

Tức:

```text
14 - 10 + 1 = 5 windows
```

---

## 2. Phân tích 9 bước

### STEP 1 — CONTRACT

**Input**

```text
want[]
number[]
discount[]
```

**Output**

```text
số start index mà window 10 ngày có frequency đúng yêu cầu
```

**Điều kiện bắt buộc**

Một ngày bắt đầu hợp lệ nếu:

```text
discount[start ... start+9]
```

chứa đúng số lượng cần thiết của mọi sản phẩm.

Vì tổng nhu cầu là `10` và window cũng dài `10`, chỉ cần mọi sản phẩm wanted có count đúng thì toàn window là đúng.

**Một câu chốt**

> Đếm bao nhiêu window độ dài cố định `10` có bảng frequency trùng với bảng `want → number`.

---

### STEP 2 — BOUND

```text
discount.length <= 100,000
window size = 10
want.length <= 10
```

Brute force mỗi window 10 ngày thực ra vẫn:

```text
O(N × 10)
```

và có thể pass.

Nhưng pattern chuẩn cần nhận ra là:

```text
fixed sliding window
```

vì hai window liên tiếp share 9/10 phần tử.

Mục tiêu:

```text
O(N)
```

với update Map incremental.

---

### STEP 3 — BRUTE FORCE

Cách tự nhiên:

Với mỗi start:

```text
start = 0
start = 1
...
start = N - 10
```

ta build lại count của:

```text
discount[start ... start + 9]
```

rồi compare với want.

Pseudo:

```text
for every start:
    build count for 10 days
    if counts match:
        answer++
```

Complexity:

```text
O((N - 10 + 1) × 10)
```

Vì window size chỉ 10 nên cách này cũng hợp lệ.

Nhưng ta vẫn nên học sliding window vì đây là template tổng quát.

---

### STEP 4 — BOTTLENECK

Hai window liên tiếp:

```text
window 1:
[d0 d1 d2 d3 d4 d5 d6 d7 d8 d9]

window 2:
   [d1 d2 d3 d4 d5 d6 d7 d8 d9 d10]
```

Có tới 9 phần tử giống nhau.

Nếu build lại Map từ đầu, ta đang đếm lại 9 item cũ.

Chỉ có hai thay đổi:

```text
OUTGOING = d0
INCOMING = d10
```

Do đó:

```text
remove outgoing
add incoming
```

là đủ để biến frequency của window cũ thành window mới.

---

### STEP 5 — STATE

Ta cần:

| State | Ý nghĩa |
|---|---|
| `need` | Map sản phẩm → số lượng cần |
| `window` | Map sản phẩm → số lượng trong 10 ngày hiện tại |
| `answer` | số window hợp lệ |
| `start` / `right` | vị trí cửa sổ |

Window size cố định:

```text
10
```

Không cần `left` chạy bằng while như variable sliding window.

---

### STEP 6 — TRANSITION

### Phase 1 — Build need

```js
const need = new Map()

for (let i = 0; i < want.length; i++) {
  need.set(want[i], number[i])
}
```

### Phase 2 — Build first window

```text
discount[0 ... 9]
```

Mỗi item:

```js
window.set(item, (window.get(item) ?? 0) + 1)
```

Check window đầu.

### Phase 3 — Slide

Khi chuyển từ start `s` sang `s + 1`:

Outgoing:

```js
const out = discount[s]
```

giảm:

```js
window.set(out, window.get(out) - 1)
```

Nếu count về `0`, có thể delete để Map sạch:

```js
if (window.get(out) === 0) {
  window.delete(out)
}
```

Incoming:

```js
const incoming = discount[s + 10]
```

tăng:

```js
window.set(
  incoming,
  (window.get(incoming) ?? 0) + 1
)
```

Sau đó compare.

### Window count

Nếu:

```text
N = discount.length
K = 10
```

số start hợp lệ về mặt index:

```text
N - K + 1
```

start cuối:

```text
N - K
```

Do đó loop start có thể viết:

```js
for (let start = 0; start <= N - 10; start++)
```

hoặc:

```js
for (let start = 0; start < N - 10 + 1; start++)
```

Hai cách tương đương.

---

### STEP 7 — INVARIANT

Trước mỗi lần check:

> `window` luôn biểu diễn chính xác frequency của đúng 10 phần tử trong cửa sổ hiện tại.

Nếu window hiện tại là:

```text
[start ... start+9]
```

thì:

```text
window.get(x)
```

phải bằng số lần `x` xuất hiện trong chính đoạn đó.

Khi slide:

```text
remove discount[start]
add discount[start+10]
```

giữ invariant đúng cho window mới:

```text
[start+1 ... start+10]
```

---

### STEP 8 — PATTERN

**Pattern chính**

```text
Fixed-size Sliding Window
+
Frequency Map
```

Dấu hiệu nhận diện:

- Đề nói **10 ngày liên tiếp**.
- Window length không đổi.
- Cần evaluate mọi đoạn liên tiếp cùng độ dài.
- Window tiếp theo bỏ 1 phần tử cũ và thêm 1 phần tử mới.
- Cần biết count/frequency bên trong window.

**Trigger sentence**

> “Đoạn liên tiếp độ dài cố định K → build window đầu → mỗi lần trượt remove outgoing + add incoming.”

Phân biệt:

```text
FIXED window:
không có while shrink

VARIABLE window:
expand right → while invalid thì shrink left
```

---

### STEP 9 — COMPLEXITY

Build `need`:

```text
O(W)
```

với `W <= 10`.

Build first window:

```text
O(10)
```

Slide qua `N` ngày:

```text
O(N)
```

Mỗi window compare tối đa `want.length <= 10` key:

```text
O(N × W)
```

với W ≤ 10 → thực tế tuyến tính.

Có thể ghi:

```text
O(N)
```

vì số loại wanted bị bound rất nhỏ.

Space:

```text
O(number of distinct products in one window + want)
```

tối đa rất nhỏ quanh window size.

---

## 3. Dry Run — 7 cột chuyển tư duy thành code

Ví dụ:

```js
want   = ["banana", "apple", "rice", "pork", "pot"]
number = [3,2,2,2,1]

discount = [
  "chicken", "apple", "apple", "banana", "rice",
  "apple", "pork", "banana", "pork", "rice",
  "pot", "banana", "apple", "banana"
]
```

### Window 1 — index 0..9

Count:

```text
chicken 1
apple   3
banana  2
rice    2
pork    2
pot     0
```

Invalid.

### Slide sang window 2 — index 1..10

Remove:

```text
chicken
```

Add:

```text
pot
```

Count wanted:

```text
apple   3
banana  2
rice    2
pork    2
pot     1
```

Vẫn invalid vì apple/banana sai.

### Slide sang window 3 — index 2..11

Remove:

```text
apple
```

Add:

```text
banana
```

Count:

```text
banana 3
apple  2
rice   2
pork   2
pot    1
```

Valid → `answer++`.

| Unit | State trước | Action | Transition | Update answer? | Next | State sau |
|---|---|---|---|---|---|---|
| window 0..9 | frequency đầu | compare | thiếu pot, banana thiếu | no | slide | answer=0 |
| → 1..10 | remove chicken, add pot | update Map | apple=3 banana=2 | no | slide | answer=0 |
| → 2..11 | remove apple, add banana | update Map | all counts match | `+1` | slide | answer=1 |

Các window tiếp theo:

```text
3..12 valid
4..13 valid
```

Final:

```text
answer = 3
```

---

## 4. Bộ phim hình ảnh

### Frame 1 — Một khung 10 ngày

```text
[d0 d1 d2 d3 d4 d5 d6 d7 d8 d9]
 └────────── 10 days ──────────┘
```

### Frame 2 — Khung trượt sang phải

```text
 d0 [d1 d2 d3 d4 d5 d6 d7 d8 d9 d10]
 ↑                                   ↑
 OUT                                 IN
```

### Frame 3 — Không rebuild

```text
WINDOW MAP OLD
   ↓
- outgoing
+ incoming
   ↓
WINDOW MAP NEW
```

### Frame 4 — Compare với shopping list

```text
NEED
banana 3
apple  2
rice   2
pork   2
pot    1

        VS

WINDOW
banana 3
apple  2
rice   2
pork   2
pot    1
```

Match:

```text
answer++
```

### Câu chuyện 1 dòng

> “Một khung 10 ngày trượt trên lịch; mỗi bước chỉ đá ngày cũ ra, kéo ngày mới vào, rồi đối chiếu bảng số lượng.”

---

## 5. Code Skeleton Recall

### Bản sliding window nên nhớ

```js
function solution(want, number, discount) {
  const need = new Map()

  for (let i = 0; i < want.length; i++) {
    need.set(want[i], number[i])
  }

  const window = new Map()

  const add = (item) => {
    window.set(item, (window.get(item) ?? 0) + 1)
  }

  const remove = (item) => {
    const next = window.get(item) - 1

    if (next === 0) {
      window.delete(item)
    } else {
      window.set(item, next)
    }
  }

  const isValid = () => {
    for (const [item, count] of need) {
      if ((window.get(item) ?? 0) !== count) {
        return false
      }
    }
    return true
  }

  for (let i = 0; i < 10; i++) {
    add(discount[i])
  }

  let answer = isValid() ? 1 : 0

  for (let right = 10; right < discount.length; right++) {
    remove(discount[right - 10])
    add(discount[right])

    if (isValid()) {
      answer++
    }
  }

  return answer
}
```

### Skeleton siêu ngắn

```js
build need

build first 10-day window

check()

for (let right = 10; right < discount.length; right++) {
  remove(discount[right - 10])
  add(discount[right])

  if (check()) answer++
}

return answer
```

### Bản brute force ngắn cũng pass

Vì window chỉ 10:

```js
function solution(want, number, discount) {
  let answer = 0

  for (let start = 0; start <= discount.length - 10; start++) {
    const count = new Map()

    for (let i = start; i < start + 10; i++) {
      count.set(
        discount[i],
        (count.get(discount[i]) ?? 0) + 1
      )
    }

    let valid = true

    for (let i = 0; i < want.length; i++) {
      if ((count.get(want[i]) ?? 0) !== number[i]) {
        valid = false
        break
      }
    }

    if (valid) answer++
  }

  return answer
}
```

Bản này dễ viết nhưng không phải template tốt nhất để học sliding window.

---

## 6. 4 câu thần chú trước khi code

### LOOP LEVELS

> Fixed window có 3 phase:

```text
1. build need
2. build first window
3. slide right
```

Trong slide:

```text
REMOVE ONE
ADD ONE
CHECK
```

Không có `while`.

---

### RESET WHEN

> Không reset `window` mỗi lần trượt.

Đó chính là mục đích của sliding window.

Chỉ update 2 item:

```text
outgoing--
incoming++
```

---

### INVALIDATES WHAT

> Window invalid nếu chỉ cần một wanted item có count khác requirement.

```js
(window.get(item) ?? 0) !== needCount
```

---

### COMMIT WHEN

> Sau khi window đã đủ đúng 10 item và Map phản ánh đúng window hiện tại, mới `answer++`.

Thứ tự:

```text
REMOVE
ADD
CHECK
COMMIT
```

---

## 7. Trap dễ chết

### Trap 1 — Off-by-one số window

Nếu:

```text
N = 14
K = 10
```

số window:

```text
14 - 10 + 1 = 5
```

Start:

```text
0,1,2,3,4
```

Do đó:

```js
start <= discount.length - 10
```

ĐÚNG.

Hoặc:

```js
start < discount.length - 10 + 1
```

ĐÚNG.

Sai:

```js
start < discount.length - 10
```

vì mất window cuối.

---

### Trap 2 — Dùng `<` thay vì `<=` ở brute-force start

Sai:

```js
for (let start = 0; start < discount.length - 10; start++)
```

Với `N=14` chỉ chạy:

```text
0,1,2,3
```

mất `start=4`.

---

### Trap 3 — Sliding window remove sai index

Khi `right` là phần tử incoming:

```js
right = 10
```

window mới phải bỏ:

```text
index 0
```

Công thức:

```js
discount[right - 10]
```

Không phải:

```js
discount[right - 9]
```

---

### Trap 4 — Add incoming trước nhưng quên remove outgoing

Window sẽ thành 11 item.

Fixed window invariant phải luôn:

```text
size theo số phần tử = 10
```

---

### Trap 5 — Chỉ check `map.size`

Sai.

Ví dụ:

```text
need:
apple 2
banana 8
```

window:

```text
apple 5
banana 5
```

Map size đều 2 nhưng counts sai.

Phải compare value.

---

### Trap 6 — Check `>=` thay vì `===`

Vì tổng need = 10 và window = 10, requirement là **đúng số lượng**.

Dùng:

```js
actual === required
```

---

### Trap 7 — Reset Map mỗi window khi đang viết sliding window

Nếu reset Map rồi count lại 10 item:

```text
logic vẫn có thể đúng
```

nhưng mày đã biến nó về brute force.

Nếu đã chọn sliding window thì nhớ:

```text
OLD WINDOW
- OUT
+ IN
= NEW WINDOW
```

---

## 8. Recall 20 giây

> **Nhận diện:** mọi đoạn **10 ngày liên tiếp**, cần đếm frequency → fixed sliding window.

> **State:** `need`, `window`, `answer`.

> **First window:** add `discount[0..9]`.

> **Slide:** `remove(discount[right - 10])`, `add(discount[right])`.

> **Check:** mọi `want[i]` phải có `window count === number[i]`.

> **Off-by-one:** số window = `N - 10 + 1`; start cuối = `N - 10`.

> **Complexity:** `O(N)` nếu xem want size ≤ 10 là constant.

### Code shape

```js
for (let i = 0; i < 10; i++) {
  add(discount[i])
}

if (isValid()) answer++

for (let right = 10; right < discount.length; right++) {
  remove(discount[right - 10])
  add(discount[right])

  if (isValid()) answer++
}
```

### Hình chốt cuối

```text
[ 10 ITEMS ]
      ↓
    CHECK
      ↓
slide right

OUT ← [ 9 OLD + 1 NEW ] ← IN
      ↓
    CHECK
      ↓
   answer++
```

## 🧠 Một câu phải khắc vào đầu

> **“Fixed window: không đếm lại; đá thằng cũ ra, kéo thằng mới vào, rồi check.”**

---

[⬆ Quay lại Navigator](#-navigator--mobile-first)


---

# Bài 10 — 연속된 부분 수열의 합 (Tổng dãy con liên tiếp)

🔗 **Đề chính thức (Programmers):** https://school.programmers.co.kr/learn/courses/30/lessons/178870

**Pattern:** Two Pointers / Variable Sliding Window  
**Trigger:** `mảng số dương + contiguous sum = k → right tăng sum, left giảm sum`

---

## 1. Dịch đề tiếng Việt

Cho một dãy số đã được sắp xếp **không giảm**.

Ta cần tìm một **đoạn con liên tiếp** thỏa các điều kiện:

1. Đoạn con phải bao gồm hai index nào đó và **toàn bộ phần tử nằm giữa chúng**.
2. Tổng các phần tử trong đoạn bằng `k`.
3. Nếu có nhiều đoạn có tổng bằng `k`, chọn đoạn **ngắn nhất**.
4. Nếu vẫn có nhiều đoạn cùng độ dài ngắn nhất, chọn đoạn xuất hiện **sớm hơn**, tức có start index nhỏ hơn.

Cho:

```text
sequence
```

và:

```text
k
```

hãy return:

```text
[startIndex, endIndex]
```

của đoạn thỏa điều kiện.

Index bắt đầu từ `0`.

### Giới hạn

```text
5 <= sequence.length <= 1,000,000
1 <= sequence[i] <= 1,000
5 <= k <= 1,000,000,000
```

Quan trọng:

```text
sequence[i] > 0
```

Tức tất cả phần tử đều **dương**.

Đề đảm bảo luôn tồn tại ít nhất một đoạn có tổng bằng `k`.

### Ví dụ 1

```js
sequence = [1,2,3,4,5]
k = 7
```

Đoạn:

```text
[3,4]
```

ở index:

```text
[2,3]
```

là đáp án.

### Ví dụ 2

```js
sequence = [1,1,1,2,3,4,5]
k = 5
```

Có:

```text
[1,1,1,2]  length 4
[2,3]      length 2
[5]        length 1
```

→ chọn:

```text
[6,6]
```

### Ví dụ 3

```js
sequence = [2,2,2,2,2]
k = 6
```

Có ba đoạn độ dài 3:

```text
[0,2]
[1,3]
[2,4]
```

→ chọn start nhỏ nhất:

```text
[0,2]
```

---

## 2. Phân tích 9 bước

### STEP 1 — CONTRACT

**Input**

```text
sequence[]
k
```

**Output**

```text
[start, end]
```

sao cho:

```text
sum(sequence[start..end]) === k
```

Ưu tiên:

```text
1. length nhỏ nhất
2. nếu tie → start nhỏ nhất
```

**Một câu chốt**

> Tìm window liên tiếp tổng bằng `k`, rồi trong các window hợp lệ chọn `(length, start)` nhỏ nhất.

---

### STEP 2 — BOUND

```text
N <= 1,000,000
```

Nested loop:

```text
O(N²)
```

không thể.

Ta cần:

```text
O(N)
```

hoặc:

```text
O(N log N)
```

Điểm vàng của đề:

```text
sequence[i] >= 1
```

Tất cả đều dương.

Do đó:

```text
right++ → sum chỉ tăng
left++  → sum chỉ giảm
```

Đây chính là điều kiện để two pointers/sliding window chạy đúng.

---

### STEP 3 — BRUTE FORCE

Cách ngây thơ:

```text
for start:
    sum = 0
    for end = start..N-1:
        sum += sequence[end]

        if sum == k:
            commit candidate
        if sum > k:
            break
```

Vì số dương, có thể break khi sum > k.

Nhưng worst case vẫn:

```text
O(N²)
```

với `N = 1,000,000` → không ổn.

---

### STEP 4 — BOTTLENECK

Khi start tăng từ:

```text
left
```

sang:

```text
left + 1
```

ta không cần cộng lại toàn bộ đoạn.

Chỉ cần:

```text
sum -= sequence[left]
```

Tương tự khi right tăng:

```text
sum += sequence[right]
```

Tức window hiện tại có thể được maintain incremental.

### Vì sao positivity quan trọng?

Nếu:

```text
sum > k
```

thì thêm phần tử bên phải chỉ làm sum **lớn hơn nữa**.

Cách duy nhất để cứu window là:

```text
left++
```

và trừ phần tử bên trái.

Nếu có số âm, logic này có thể sai.

---

### STEP 5 — STATE

Ta cần:

| State | Ý nghĩa |
|---|---|
| `left` | start của window |
| `right` | end hiện tại |
| `sum` | tổng `sequence[left..right]` |
| `bestStart` | start tốt nhất hiện tại |
| `bestEnd` | end tốt nhất hiện tại |
| `bestLength` | độ dài ngắn nhất |

**State tối thiểu**

```text
left
sum
best answer
```

`right` có thể lấy từ loop.

---

### STEP 6 — TRANSITION

Pattern:

```js
let left = 0
let sum = 0

for (let right = 0; right < sequence.length; right++) {
  sum += sequence[right]

  while (sum > k) {
    sum -= sequence[left]
    left++
  }

  if (sum === k) {
    // candidate [left, right]
  }
}
```

### Vì sao `while`, không phải `if`?

Một lần bỏ bên trái có thể vẫn:

```text
sum > k
```

Ví dụ:

```text
window = [1,1,10]
k = 5
sum = 12
```

Bỏ một `1`:

```text
sum = 11
```

vẫn > 5.

Phải tiếp tục shrink.

### Candidate

Khi:

```text
sum === k
```

candidate là:

```text
[left, right]
```

length:

```js
const length = right - left + 1
```

Update nếu:

```text
length < bestLength
```

Nếu cùng length, ta cần start nhỏ hơn.

Nhưng vì `right` đang tăng từ trái sang phải, candidate cùng length thường sẽ xuất hiện theo start tăng dần.

Dù vậy code rõ nhất vẫn nên viết tie-break tường minh:

```js
if (
  length < bestLength ||
  (length === bestLength && left < bestStart)
) {
  bestStart = left
  bestEnd = right
  bestLength = length
}
```

---

### STEP 7 — INVARIANT

Sau vòng:

```js
while (sum > k)
```

ta luôn có:

```text
sum <= k
```

và `sum` chính xác bằng:

```text
sequence[left] + ... + sequence[right]
```

Do tất cả phần tử dương:

- nếu `sum < k` → chỉ có thể mở rộng right để tăng sum
- nếu `sum > k` → chỉ có thể tăng left để giảm sum
- nếu `sum == k` → candidate hợp lệ

Đây là invariant làm two pointers hoạt động.

---

### STEP 8 — PATTERN

**Pattern chính**

```text
Positive contiguous sum
→ Variable Sliding Window / Two Pointers
```

Dấu hiệu nhận diện:

- Subarray / đoạn con **liên tiếp**
- Tất cả numbers dương
- Hỏi sum bằng / ít nhất / nhiều nhất một threshold
- N rất lớn
- Expand right làm metric tăng
- Shrink left làm metric giảm

**Trigger sentence**

> “Contiguous + positive + target sum → right add, sum>k thì while shrink left.”

Phân biệt với fixed window bài 9:

```text
Bài 9:
window length luôn = 10

Bài 10:
window length thay đổi theo sum
```

---

### STEP 9 — COMPLEXITY

`right` đi từ:

```text
0 → N-1
```

mỗi index đúng một lần.

`left` cũng chỉ tăng:

```text
0 → N-1
```

không bao giờ lùi.

Tổng số movement:

```text
<= 2N
```

Do đó:

```text
Time = O(N)
```

Space:

```text
O(1)
```

---

## 3. Dry Run — 7 cột chuyển tư duy thành code

Ví dụ:

```js
sequence = [1,2,3,4,5]
k = 7
```

Ban đầu:

```text
left = 0
sum = 0
best = none
```

| Unit | State trước | Action | Transition | Update answer? | Next | State sau |
|---|---|---|---|---|---|---|
| `right=0, +1` | `left=0,sum=0` | add 1 | sum=1 | no | expand | `[0..0]` |
| `right=1, +2` | sum=1 | add 2 | sum=3 | no | expand | `[0..1]` |
| `right=2, +3` | sum=3 | add 3 | sum=6 | no | expand | `[0..2]` |
| `right=3, +4` | sum=6 | add 4 | sum=10 | no | shrink | — |
| shrink left | `left=0,sum=10` | remove 1 | sum=9,left=1 | no | still >7 | — |
| shrink left | `left=1,sum=9` | remove 2 | sum=7,left=2 | candidate | `[2,3]` | best len=2 |
| `right=4,+5` | `left=2,sum=7` | add 5 | sum=12 | no | shrink | — |
| shrink | sum=12 | remove 3 | sum=9,left=3 | no | shrink | — |
| shrink | sum=9 | remove 4 | sum=5,left=4 | no | end | — |

Final:

```text
[2,3]
```

---

## 4. Bộ phim hình ảnh

### Frame 1 — Hai tay kẹp một window

```text
L
↓
[1 2 3]
    ↑
    R

sum = 6
```

`sum < 7`

→ kéo tay phải sang phải.

### Frame 2 — Sum quá lớn

```text
L
↓
[1 2 3 4]
      ↑
      R

sum = 10
```

`10 > 7`

→ không kéo right nữa.

Phải đẩy left.

### Frame 3 — Shrink

```text
remove 1
sum = 9

remove 2
sum = 7
```

Window:

```text
[3 4]
```

### Frame 4 — Hit target

```text
sum == k
```

→ đo length:

```text
2
```

→ compare best.

### Câu chuyện 1 dòng

> “Tay phải bỏ thêm đồ vào làm tổng tăng; nếu nặng quá thì tay trái vứt đồ ra cho tới khi không quá k; đúng k thì chụp lại cửa sổ.”

---

## 5. Code Skeleton Recall

### Bản nên nhớ

```js
function solution(sequence, k) {
  let left = 0
  let sum = 0

  let bestStart = 0
  let bestEnd = sequence.length - 1
  let bestLength = Infinity

  for (let right = 0; right < sequence.length; right++) {
    sum += sequence[right]

    while (sum > k) {
      sum -= sequence[left]
      left++
    }

    if (sum === k) {
      const length = right - left + 1

      if (
        length < bestLength ||
        (length === bestLength && left < bestStart)
      ) {
        bestLength = length
        bestStart = left
        bestEnd = right
      }
    }
  }

  return [bestStart, bestEnd]
}
```

### Skeleton siêu ngắn

```js
let left = 0
let sum = 0

for (let right = 0; right < arr.length; right++) {
  sum += arr[right]

  while (sum > k) {
    sum -= arr[left]
    left++
  }

  if (sum === k) {
    commit(left, right)
  }
}
```

---

## 6. 4 câu thần chú trước khi code

### LOOP LEVELS

> Loop ngoài = `right`.

> Loop trong = `while sum > k` để shrink `left`.

Shape:

```text
for right
    add

    while invalid
        remove left

    if target
        commit
```

---

### RESET WHEN

> Không reset `sum` khi right tăng.

Đó là sliding window.

`left` cũng không reset về `0`.

Cả hai pointer chỉ đi về phía trước.

---

### INVALIDATES WHAT

> `sum > k` invalidates window hiện tại.

Vì numbers dương nên phải shrink:

```js
while (sum > k) {
  sum -= sequence[left]
  left++
}
```

Không phải reset cả window.

---

### COMMIT WHEN

> Chỉ commit khi:

```js
sum === k
```

và candidate tốt hơn best theo thứ tự:

```text
1. length nhỏ hơn
2. nếu bằng → start nhỏ hơn
```

---

## 7. Trap dễ chết

### Trap 1 — Dùng `if (sum > k)` thay vì `while`

Sai:

```js
if (sum > k) {
  sum -= sequence[left]
  left++
}
```

Một lần shrink có thể vẫn > k.

Đúng:

```js
while (sum > k) {
  ...
}
```

---

### Trap 2 — Update candidate trước khi shrink

Sai thứ tự:

```text
ADD
CHECK == k
SHRINK
```

Nếu sum đang > k, có thể shrink xong mới thành k.

Đúng:

```text
ADD
WHILE sum > k SHRINK
IF sum == k COMMIT
```

---

### Trap 3 — Quên `+1` trong length

Sai:

```js
right - left
```

Đúng:

```js
right - left + 1
```

---

### Trap 4 — Chỉ update khi tìm thấy sum=k lần đầu

Đề không hỏi first match.

Đề hỏi:

```text
shortest
then earliest
```

Phải tiếp tục scan toàn bộ.

---

### Trap 5 — Tie-break sai

Candidate A:

```text
[0,2]
length 3
```

Candidate B:

```text
[1,3]
length 3
```

Phải chọn:

```text
[0,2]
```

start nhỏ hơn.

---

### Trap 6 — Dùng variable window khi có số âm

Template này phụ thuộc vào:

```text
sequence[i] > 0
```

Nếu có âm:

```text
right++ có thể làm sum giảm
left++ có thể làm sum tăng
```

two pointers này mất monotonicity.

---

### Trap 7 — Nghĩ sorted là lý do chính

Dãy đúng là nondecreasing, nhưng two pointers ở đây chủ yếu dựa vào:

```text
mọi phần tử đều dương
```

Không cần sorted mới maintain được positive-window sum.

Đây là nuance quan trọng.

---

## 8. Recall 20 giây

> **Nhận diện:** contiguous sum = k + tất cả số dương + N rất lớn → two pointers.

> **State:** `left`, `right`, `sum`, best `[start,end]`.

> **Expand:** mỗi right → `sum += sequence[right]`.

> **Restore validity:** `while (sum > k) { sum -= sequence[left]; left++; }`.

> **Commit:** `sum === k`.

> **Ranking:** length ngắn hơn trước; tie → start nhỏ hơn.

> **Complexity:** `O(N)` vì left/right mỗi pointer chỉ tiến một chiều.

### Code shape

```js
let left = 0
let sum = 0

for (let right = 0; right < sequence.length; right++) {
  sum += sequence[right]

  while (sum > k) {
    sum -= sequence[left]
    left++
  }

  if (sum === k) {
    const len = right - left + 1

    if (
      len < bestLen ||
      (len === bestLen && left < bestStart)
    ) {
      bestLen = len
      bestStart = left
      bestEnd = right
    }
  }
}
```

### Hình chốt cuối

```text
RIGHT →
ADD
 ↓
sum > k ?
 YES
 ↓
LEFT → REMOVE
 ↺ until <= k

sum == k ?
 YES
 ↓
COMPARE
(length, start)
 ↓
COMMIT BEST
```

## 🧠 Một câu phải khắc vào đầu

> **“Số dương nên right chỉ làm tổng tăng, left chỉ làm tổng giảm: add → while quá k thì shrink → đúng k thì xét best.”**

---

[⬆ Quay lại Navigator](#-navigator--mobile-first)


---

# Bài 11 — 기능개발 (Phát triển chức năng)

🔗 **Đề chính thức (Programmers):** https://school.programmers.co.kr/learn/courses/30/lessons/42586

**Pattern:** Queue / Sequential Batching  
**Trigger:** `task sau xong sớm vẫn phải chờ task trước → tính ngày xong → gom batch theo thứ tự`

---

## 1. Dịch đề tiếng Việt

Team Programmers đang phát triển nhiều chức năng.

Mỗi chức năng chỉ có thể được đưa lên service khi tiến độ đạt:

```text
100%
```

Mỗi chức năng có tốc độ phát triển khác nhau, vì vậy có thể xảy ra trường hợp:

```text
task phía sau hoàn thành trước task phía trước
```

Tuy nhiên, task phía sau **không được deploy trước**.

Nếu task phía sau đã hoàn thành nhưng task phía trước chưa hoàn thành, task phía sau phải **chờ**, và sẽ được deploy cùng lúc khi task phía trước được deploy.

Cho:

```text
progresses
```

là tiến độ hiện tại của các task theo đúng thứ tự cần deploy,

và:

```text
speeds
```

là tốc độ phát triển mỗi ngày của từng task.

Hãy return một array cho biết:

```text
mỗi lần deploy có bao nhiêu task được deploy cùng nhau
```

### Giới hạn

```text
progresses.length <= 100
progresses[i] < 100
speeds[i] <= 100
```

Deploy chỉ diễn ra **một lần vào cuối mỗi ngày**.

Ví dụ:

```text
progress = 95
speed = 4
```

Sau 1 ngày:

```text
99
```

chưa đủ.

Sau 2 ngày:

```text
103
```

→ deploy được sau:

```text
2 ngày
```

### Ví dụ 1

```js
progresses = [93,30,55]
speeds     = [1,30,5]
```

Ngày hoàn thành riêng lẻ:

```text
7,3,9
```

Task 2 xong ngày 3 nhưng phải chờ task 1 đến ngày 7.

Do đó:

```text
day 7 → 2 tasks
day 9 → 1 task
```

Kết quả:

```js
[2,1]
```

### Ví dụ 2

```js
progresses = [95,90,99,99,80,99]
speeds     = [1,1,1,1,1,1]
```

Ngày hoàn thành:

```text
[5,10,1,1,20,1]
```

Deploy:

```text
day 5  → 1
day 10 → 3
day 20 → 2
```

Kết quả:

```js
[1,3,2]
```

---

## 2. Phân tích 9 bước

### STEP 1 — CONTRACT

**Input**

```text
progresses[i]
speeds[i]
```

**Output**

```text
array số lượng task trong từng batch deploy
```

Quan trọng:

```text
thứ tự task không thay đổi
```

Task sau không được vượt mặt task trước.

**Một câu chốt**

> Tính ngày hoàn thành của từng task, rồi duyệt từ trái sang phải và gom những task có thể chờ để đi cùng batch của task đầu tiên chưa deploy.

---

### STEP 2 — BOUND

```text
N <= 100
```

Rất nhỏ.

Ta có thể simulate từng ngày, nhưng không cần.

Thay vì:

```text
mỗi ngày tăng progress
```

ta tính thẳng:

```text
daysNeeded
```

cho từng task.

Công thức:

```js
Math.ceil((100 - progress) / speed)
```

Sau đó chỉ cần một pass.

Target:

```text
O(N)
```

---

### STEP 3 — BRUTE FORCE

Cách mô phỏng:

```text
day++
progress[i] += speed[i]
...
```

Mỗi ngày check task đầu queue đã >= 100 chưa.

Logic đúng.

Nhưng dài, dễ bug, và không cần thiết.

Ta biết chính xác ngày hoàn thành riêng lẻ nên có thể tính thẳng.

---

### STEP 4 — BOTTLENECK

Điểm khó không phải tính ngày.

Điểm khó là:

> Task sau dù xong sớm vẫn bị chặn bởi task trước.

Ví dụ:

```text
days = [7,3,9]
```

Nếu chỉ group theo ngày bằng nhau thì sai:

```text
7
3
9
```

Task ngày 3 vẫn phải đi cùng batch ngày 7.

Mental transformation:

```text
[7,3,9]
 ↓
batch 1 release day = 7
3 <= 7 → join
9 > 7  → new batch
```

---

### STEP 5 — STATE

Ta cần:

| State | Ý nghĩa |
|---|---|
| `releaseDay` | ngày deploy của batch hiện tại |
| `count` | số task trong batch hiện tại |
| `answer` | kích thước các batch |

Có thể precompute:

```text
days[]
```

hoặc tính trực tiếp trong loop.

Bản dễ recall nhất:

```text
days[]
releaseDay
count
answer
```

---

### STEP 6 — TRANSITION

Đầu tiên tính:

```js
days[i] = Math.ceil(
  (100 - progresses[i]) / speeds[i]
)
```

Khởi tạo batch bằng task đầu:

```js
let releaseDay = days[0]
let count = 1
```

Với mỗi task sau:

### Case 1

```text
days[i] <= releaseDay
```

Task này xong trước hoặc đúng ngày batch hiện tại deploy.

Nó phải chờ task trước nên:

```js
count++
```

`releaseDay` **không đổi**.

### Case 2

```text
days[i] > releaseDay
```

Task này chưa xong vào ngày batch hiện tại deploy.

Vậy batch cũ kết thúc:

```js
answer.push(count)
```

Mở batch mới:

```js
releaseDay = days[i]
count = 1
```

Sau loop nhớ:

```js
answer.push(count)
```

cho batch cuối.

---

### STEP 7 — INVARIANT

Trong khi duyệt:

> `releaseDay` là ngày deploy của toàn bộ batch hiện tại.

Và:

> mọi task đã gom vào batch hiện tại đều có `days[i] <= releaseDay`.

Khi gặp:

```text
days[i] > releaseDay
```

task đó không thể đi cùng batch hiện tại.

Nó bắt buộc trở thành leader của batch mới.

---

### STEP 8 — PATTERN

**Pattern chính**

```text
Sequential batching / Queue order constraint
```

Có thể nhìn như queue vì:

```text
chỉ task ở đầu hàng mới quyết định khi nào nhóm được release
```

Dấu hiệu nhận diện:

- Các task có thứ tự cố định.
- Task sau có thể hoàn thành trước.
- Nhưng không được vượt task trước.
- Hỏi số lượng được xử lý/deploy theo từng batch.

**Trigger sentence**

> “Task sau không được vượt mặt → task đầu chưa release đóng vai trò gate → gom những task hoàn thành không muộn hơn gate.”

Mental model:

```text
days:
7 3 9
↑
gate = 7

3 <= 7 → WAIT & JOIN
9 > 7  → NEW GATE
```

---

### STEP 9 — COMPLEXITY

Tính `days`:

```text
O(N)
```

Duyệt group:

```text
O(N)
```

Tổng:

```text
O(N)
```

Space:

```text
O(N)
```

nếu tạo `days`.

Có thể giảm xuống:

```text
O(1)
```

ngoài output nếu tính days trực tiếp.

---

## 3. Dry Run — 7 cột chuyển tư duy thành code

Ví dụ:

```js
progresses = [93,30,55]
speeds     = [1,30,5]
```

Tính:

```text
days = [7,3,9]
```

| Unit | State trước | Action | Transition | Update answer? | Next | State sau |
|---|---|---|---|---|---|---|
| task 0 | none | day=7 | mở batch | no | task 1 | releaseDay=7,count=1 |
| task 1 | day=7,count=1 | day=3 | `3 <= 7` | no | task 2 | count=2 |
| task 2 | day=7,count=2 | day=9 | `9 > 7` | push `2` | new batch | releaseDay=9,count=1 |
| end | day=9,count=1 | hết task | push batch cuối | push `1` | done | `[2,1]` |

---

### Dry run ví dụ 2

```text
days = [5,10,1,1,20,1]
```

Flow:

```text
releaseDay = 5
count = 1

10 > 5
→ push 1
→ releaseDay = 10
→ count = 1

1 <= 10 → count = 2
1 <= 10 → count = 3

20 > 10
→ push 3
→ releaseDay = 20
→ count = 1

1 <= 20
→ count = 2

end → push 2
```

Result:

```text
[1,3,2]
```

---

## 4. Bộ phim hình ảnh

### Frame 1 — Mỗi task có một tấm thẻ ngày hoàn thành

```text
Task A  Task B  Task C
  7       3       9
```

### Frame 2 — Task A đứng đầu hàng

```text
[A:7] [B:3] [C:9]
  ↑
 GATE
```

Dù B xong ngày 3:

```text
B không được vượt A
```

### Frame 3 — B phải chờ

```text
[A:7] [B:3]
   └───────┘
   deploy cùng day 7
```

### Frame 4 — C không kịp day 7

```text
C:9 > gate:7
```

→ batch mới.

### Bộ phim đầy đủ

```text
CALCULATE DAYS
      ↓
[7,3,9]
      ↓
gate = 7
      ↓
3 <= 7 → JOIN
      ↓
9 > 7 → CLOSE BATCH
      ↓
gate = 9
      ↓
END → CLOSE LAST
```

**Câu chuyện 1 dòng**

> “Người đầu hàng quyết định ngày xe chạy; ai phía sau xong trước ngày xe chạy thì lên cùng xe, ai chưa xong thì phải đợi chuyến sau.”

---

## 5. Code Skeleton Recall

### Bản nên nhớ

```js
function solution(progresses, speeds) {
  const days = progresses.map((progress, i) =>
    Math.ceil((100 - progress) / speeds[i])
  )

  const answer = []

  let releaseDay = days[0]
  let count = 1

  for (let i = 1; i < days.length; i++) {
    if (days[i] <= releaseDay) {
      count++
    } else {
      answer.push(count)

      releaseDay = days[i]
      count = 1
    }
  }

  answer.push(count)

  return answer
}
```

### Skeleton siêu ngắn

```js
const days = ...

let releaseDay = days[0]
let count = 1

for (let i = 1; i < days.length; i++) {
  if (days[i] <= releaseDay) {
    count++
  } else {
    answer.push(count)
    releaseDay = days[i]
    count = 1
  }
}

answer.push(count)
```

---

## 6. 4 câu thần chú trước khi code

### LOOP LEVELS

> Hai phase tuần tự:

```text
1. calculate days
2. scan days to batch
```

Không nested loop.

---

### RESET WHEN

> `count = 1` chỉ reset khi bắt đầu batch mới.

```js
if (days[i] > releaseDay) {
  answer.push(count)
  releaseDay = days[i]
  count = 1
}
```

---

### INVALIDATES WHAT

> Task mới invalidate batch hiện tại khi:

```text
days[i] > releaseDay
```

Nếu:

```text
days[i] <= releaseDay
```

nó vẫn join batch.

---

### COMMIT WHEN

> Khi gặp task cần muộn hơn `releaseDay`, commit batch cũ.

Và cực kỳ quan trọng:

> Sau loop phải commit **batch cuối cùng**.

```js
answer.push(count)
```

---

## 7. Trap dễ chết

### Trap 1 — Quên `Math.ceil`

Sai:

```js
(100 - progress) / speed
```

Ví dụ:

```text
95, speed 4
```

ra:

```text
1.25
```

nhưng cần:

```text
2 ngày
```

Đúng:

```js
Math.ceil((100 - progress) / speed)
```

---

### Trap 2 — So với task trước thay vì releaseDay của batch

Ví dụ:

```text
days = [10,1,9]
```

Nếu chỉ so:

```text
9 > 1
```

mày có thể tưởng phải tách batch.

Nhưng thực tế:

```text
1 <= 10
9 <= 10
```

cả 3 đều deploy ngày 10.

Phải compare với:

```text
releaseDay = 10
```

không phải `days[i - 1]`.

---

### Trap 3 — Update releaseDay khi task sau xong sớm

Sai:

```js
if (days[i] <= releaseDay) {
  releaseDay = days[i]
}
```

Không.

Leader của batch vẫn quyết định ngày deploy.

Ví dụ:

```text
7,3
```

batch vẫn deploy ngày:

```text
7
```

không phải 3.

---

### Trap 4 — Quên push batch cuối

Loop chỉ push khi gặp new batch.

Batch cuối không có task phía sau để trigger push.

Phải:

```js
answer.push(count)
```

sau loop.

---

### Trap 5 — Dùng queue với `shift()` không cần thiết

Bài có thể giải bằng queue, nhưng không cần mutate queue.

Một single pass trên `days` đơn giản hơn.

Pattern là queue/order constraint, không có nghĩa bắt buộc phải dùng `shift()`.

---

### Trap 6 — Group những task có cùng exact day

Sai tư duy:

```text
chỉ cùng ngày mới chung batch
```

Ví dụ:

```text
[7,3]
```

vẫn chung batch vì task 3 ngày phải chờ task 7 ngày.

Điều kiện là:

```text
days[i] <= releaseDay
```

không phải:

```text
days[i] === releaseDay
```

---

## 8. Recall 20 giây

> **Nhận diện:** task có thứ tự; task sau xong sớm vẫn không được vượt task trước → sequential batching / queue gate.

> **Step 1:** `days = ceil((100-progress)/speed)`.

> **State:** `releaseDay`, `count`, `answer`.

> **Join batch:** `days[i] <= releaseDay` → `count++`.

> **New batch:** `days[i] > releaseDay` → push count, `releaseDay = days[i]`, `count = 1`.

> **Final:** nhớ `answer.push(count)` sau loop.

> **Complexity:** `O(N)`.

### Code shape

```js
const days = progresses.map((p, i) =>
  Math.ceil((100 - p) / speeds[i])
)

let releaseDay = days[0]
let count = 1

for (let i = 1; i < days.length; i++) {
  if (days[i] <= releaseDay) {
    count++
  } else {
    answer.push(count)
    releaseDay = days[i]
    count = 1
  }
}

answer.push(count)
```

### Hình chốt cuối

```text
DAYS
7 3 9
↑
GATE

3 <= 7
→ JOIN

9 > 7
→ COMMIT 2
→ NEW GATE = 9

END
→ COMMIT 1
```

## 🧠 Một câu phải khắc vào đầu

> **“Task đầu là cái cổng: task sau xong trước hoặc bằng ngày cổng thì chờ đi cùng; muộn hơn cổng thì mở batch mới.”**

---

[⬆ Quay lại Navigator](#-navigator--mobile-first)


---

# Bài 12 — Dấu ngoặc hợp lệ

🔗 **Đề chính thức (Programmers):** https://school.programmers.co.kr/learn/courses/30/lessons/12909

**Pattern:** Stack / Balance Counter  
**Trigger:** `chỉ có ( và ) → balance; prefix không được âm; cuối cùng phải về 0`

---

## 1. Dịch đề tiếng Việt

Một chuỗi dấu ngoặc được gọi là **đúng / hợp lệ** nếu:

- mỗi dấu mở:

```text
(
```

đều được đóng bởi một dấu:

```text
)
```

đúng thứ tự.

Ví dụ:

```text
()()
```

và:

```text
(())()
```

là hợp lệ.

Nhưng:

```text
)()(
```

hoặc:

```text
(()(
```

là không hợp lệ.

Cho chuỗi:

```text
s
```

chỉ gồm:

```text
(
)
```

Hãy return:

```text
true
```

nếu chuỗi dấu ngoặc hợp lệ,

ngược lại return:

```text
false
```

### Giới hạn

```text
1 <= s.length < 100,000
```

---

## 2. Phân tích 9 bước

### STEP 1 — CONTRACT

**Input**

```text
string s chỉ chứa '(' và ')'
```

**Output**

```text
true / false
```

Một chuỗi hợp lệ phải thỏa cả hai điều kiện:

```text
1. Trong mọi prefix:
   số ')' không bao giờ nhiều hơn số '('.

2. Sau khi đọc hết:
   tổng '(' phải bằng tổng ')'.
```

**Một câu chốt**

> Mỗi `(` tạo một khoản nợ đóng ngoặc; mỗi `)` trả một khoản nợ. Không được trả khi chưa có nợ, và cuối cùng nợ phải bằng 0.

---

### STEP 2 — BOUND

```text
length < 100,000
```

Chỉ cần duyệt một lần:

```text
O(N)
```

Không cần nested loop.

---

### STEP 3 — BRUTE FORCE

Có thể dùng stack thật:

```js
const stack = []

for (const ch of s) {
  if (ch === "(") {
    stack.push(ch)
  } else {
    if (stack.length === 0) {
      return false
    }

    stack.pop()
  }
}

return stack.length === 0
```

Cách này hoàn toàn đúng.

Nhưng vì chỉ có **một loại dấu ngoặc**, ta không cần lưu từng `"("`.

Ta chỉ cần lưu:

```text
stack.length
```

tức là một biến `balance`.

---

### STEP 4 — BOTTLENECK

Stack thật đang lưu:

```text
(
(
(
```

nhưng nội dung các phần tử đều giống nhau.

Thông tin duy nhất ta cần là:

```text
có bao nhiêu '(' chưa được đóng?
```

Do đó:

```text
stack.length
```

có thể nén thành:

```text
balance
```

---

### STEP 5 — STATE

Ta cần đúng một state:

```js
let balance = 0
```

Ý nghĩa:

> `balance` = số dấu `(` đã gặp nhưng chưa được ghép với `)`.

Invariant mong muốn:

```text
balance >= 0
```

ở mọi thời điểm.

---

### STEP 6 — TRANSITION

Mỗi ký tự:

### Nếu là `(`

```js
balance++
```

### Nếu là `)`

```js
balance--
```

Ngay sau đó:

```js
if (balance < 0) {
  return false
}
```

Vì balance âm nghĩa là:

```text
đang có ')' không có '(' phía trước để ghép.
```

Sau loop:

```js
return balance === 0
```

---

### STEP 7 — INVARIANT

Sau khi đọc bất kỳ prefix nào:

```text
balance
=
#opening parentheses
-
#closing parentheses
```

Một chuỗi hợp lệ bắt buộc:

```text
balance >= 0
```

cho mọi prefix.

Ví dụ:

```text
")("
```

ngay ký tự đầu:

```text
balance = -1
```

→ false ngay.

Cuối cùng còn cần:

```text
balance === 0
```

Ví dụ:

```text
"(()"
```

không bao giờ âm,

nhưng cuối:

```text
balance = 1
```

→ vẫn false.

---

### STEP 8 — PATTERN

**Pattern chính**

```text
Stack validation
```

Nhưng vì chỉ có một loại bracket:

```text
Stack → compress thành counter
```

Dấu hiệu nhận diện:

- Dấu mở / đóng.
- Cần đúng thứ tự.
- Closing phải match opening trước đó.
- Chỉ có `(` và `)`.

**Trigger sentence**

> “Một loại ngoặc thôi → không cần stack thật; balance là đủ.”

Phân biệt:

```text
chỉ ()       → counter đủ
(), [], {}   → cần stack thật để nhớ loại ngoặc
```

---

### STEP 9 — COMPLEXITY

Duyệt string một lần:

```text
O(N)
```

Space:

```text
O(1)
```

với counter.

Nếu dùng stack thật:

```text
O(N)
```

space worst case.

---

## 3. Dry Run — 7 cột chuyển tư duy thành code

### Ví dụ hợp lệ

```text
s = "(())()"
```

| Unit | State trước | Action | Transition | Update answer? | Next | State sau |
|---|---|---|---|---|---|---|
| `(` | balance=0 | open | `+1` | no | tiếp | 1 |
| `(` | 1 | open | `+1` | no | tiếp | 2 |
| `)` | 2 | close | `-1` | no | tiếp | 1 |
| `)` | 1 | close | `-1` | no | tiếp | 0 |
| `(` | 0 | open | `+1` | no | tiếp | 1 |
| `)` | 1 | close | `-1` | no | end | 0 |

Final:

```text
balance = 0
```

→ `true`.

### Ví dụ fail sớm

```text
s = ")()("
```

Ký tự đầu:

```text
balance = -1
```

→ return `false` ngay.

### Ví dụ fail cuối

```text
s = "(()("
```

Không prefix nào âm,

nhưng cuối:

```text
balance = 2
```

→ false.

---

## 4. Bộ phim hình ảnh

### Frame 1 — `(` bỏ một viên gạch vào kho

```text
(
↓
balance = 1
```

### Frame 2 — thêm `(`

```text
((
↓
balance = 2
```

### Frame 3 — `)` lấy một viên ra

```text
(()
↓
balance = 1
```

### Frame 4 — Nếu lấy khi kho đang rỗng

```text
balance = 0
 gặp ')'
↓
balance = -1
```

Không có opening để ghép.

→ false ngay.

### Frame 5 — Cuối chuỗi

Nếu:

```text
balance = 0
```

→ mọi opening đã được đóng.

Nếu:

```text
balance > 0
```

→ còn opening chưa được đóng.

---

## 5. Code Skeleton Recall

### Bản nên nhớ

```js
function solution(s) {
  let balance = 0

  for (const ch of s) {
    if (ch === "(") {
      balance++
    } else {
      balance--
    }

    if (balance < 0) {
      return false
    }
  }

  return balance === 0
}
```

### Bản stack thật

```js
function solution(s) {
  const stack = []

  for (const ch of s) {
    if (ch === "(") {
      stack.push(ch)
    } else {
      if (stack.length === 0) {
        return false
      }

      stack.pop()
    }
  }

  return stack.length === 0
}
```

Trong bài này, counter ngắn hơn và sạch hơn.

---

## 6. 4 câu thần chú trước khi code

### LOOP LEVELS

> Một loop duyệt từng ký tự.

```text
for char
    update balance
    check negative
```

---

### RESET WHEN

> Không reset balance.

Nó đại diện cho toàn bộ prefix đã đọc.

---

### INVALIDATES WHAT

> `balance < 0` invalidate ngay lập tức.

Không cần đọc tiếp.

Vì không ký tự tương lai nào có thể làm dấu `)` vừa rồi có opening nằm **trước nó**.

---

### COMMIT WHEN

> Chỉ return `true` sau khi đọc hết chuỗi và:

```text
balance === 0
```

Không phải chỉ vì chưa từng âm.

---

## 7. Trap dễ chết

### Trap 1 — Chỉ check cuối cùng `balance === 0`

Sai.

Ví dụ:

```text
")("
```

Cuối:

```text
balance = 0
```

nhưng rõ ràng invalid.

Phải check:

```js
if (balance < 0) return false
```

trong loop.

---

### Trap 2 — Chỉ check không âm, quên cuối phải bằng 0

Ví dụ:

```text
"((("
```

balance không bao giờ âm.

Nhưng cuối:

```text
3
```

→ false.

---

### Trap 3 — Pop stack không check empty

Nếu dùng stack:

Sai:

```js
stack.pop()
```

cho mọi `)`.

`pop()` trên empty không crash trong JS, nhưng logic sẽ bị nuốt mất lỗi.

Phải:

```js
if (stack.length === 0) return false
```

trước khi pop.

---

### Trap 4 — Nghĩ số lượng `(` và `)` bằng nhau là đủ

Sai.

```text
")("
```

có:

```text
1 open
1 close
```

nhưng thứ tự sai.

Bài là:

```text
prefix validity + total equality
```

---

### Trap 5 — Dùng stack quá nặng cho một loại ngoặc

Không sai, nhưng unnecessary.

Với chỉ:

```text
(
)
```

balance counter là đủ.

---

## 8. Recall 20 giây

> **Nhận diện:** validate `()` → Stack; chỉ một loại ngoặc → nén stack thành balance counter.

> **State:** `balance = số '(' chưa được đóng`.

> **Transition:** `(` → `+1`, `)` → `-1`.

> **Invalid:** `balance < 0` ở bất kỳ prefix nào → false ngay.

> **Final:** `balance === 0`.

> **Complexity:** `O(N)` time, `O(1)` space.

### Code shape

```js
let balance = 0

for (const ch of s) {
  balance += ch === "(" ? 1 : -1

  if (balance < 0) {
    return false
  }
}

return balance === 0
```

### Hình chốt cuối

```text
(
↓
+1

)
↓
-1

ANY PREFIX
balance < 0
→ FALSE

END
balance == 0
→ TRUE
```

## 🧠 Một câu phải khắc vào đầu

> **“Ngoặc đúng = không prefix nào bị âm, và cuối cùng balance phải về 0.”**

---

[⬆ Quay lại Navigator](#-navigator--mobile-first)


---

# Bài 13 — Process / Tiến trình

🔗 **Đề chính thức (Programmers):** https://school.programmers.co.kr/learn/courses/30/lessons/42587

**Pattern:** Queue + Priority Simulation  
**Trigger:** `pop đầu queue → nếu còn process priority cao hơn thì đưa lại cuối → nếu không thì execute`

---

## 1. Dịch đề tiếng Việt

Hệ điều hành quản lý các process theo các quy tắc:

```text
1. Lấy process ở đầu queue ra.
2. Nếu trong queue vẫn còn process có priority cao hơn:
   → đưa process vừa lấy ra về cuối queue.
3. Nếu không còn process nào có priority cao hơn:
   → execute process đó.
   → process đã execute thì kết thúc, không quay lại queue.
```

Ví dụ:

```text
Process:   A B C D
Priority:  2 1 3 2
```

Thứ tự execute:

```text
C → D → A → B
```

Cho:

```text
priorities
```

là priority của các process theo thứ tự ban đầu trong queue,

và:

```text
location
```

là vị trí ban đầu của process mà ta muốn theo dõi.

Hãy return:

```text
process đó được execute thứ mấy
```

### Giới hạn

```text
1 <= priorities.length <= 100
1 <= priorities[i] <= 9
0 <= location < priorities.length
```

Priority càng lớn → ưu tiên càng cao.

### Ví dụ 1

```js
priorities = [2,1,3,2]
location = 2
```

Process tại `location=2` là C, priority 3.

C được execute đầu tiên.

Kết quả:

```text
1
```

### Ví dụ 2

```js
priorities = [1,1,9,1,1,1]
location = 0
```

Thứ tự:

```text
C → D → E → F → A → B
```

A được execute thứ:

```text
5
```

---

## 2. Phân tích 9 bước

### STEP 1 — CONTRACT

**Input**

```text
priorities[]
location
```

**Output**

```text
thứ tự execute của process có original index = location
```

Ta phải giữ đồng thời:

```text
priority
original index
```

Vì nhiều process có thể cùng priority.

**Một câu chốt**

> Mô phỏng queue đúng luật, và khi một process thực sự execute thì tăng `order`; nếu original index của nó bằng `location` thì return `order`.

---

### STEP 2 — BOUND

```text
N <= 100
priority <= 9
```

Rất nhỏ.

Ta có thể mô phỏng trực tiếp.

Mỗi lần pop một process rồi scan queue xem có priority cao hơn hay không:

```text
O(N)
```

Lặp tối đa cỡ:

```text
O(N²)
```

với N=100 → hoàn toàn ổn.

Không cần heap.

---

### STEP 3 — BRUTE FORCE

Cách tự nhiên nhất cũng chính là simulation:

```text
queue = all processes

while queue not empty:
    current = pop front

    if exists process with higher priority:
        push current back
    else:
        execute
        order++
```

Đây không phải brute force xấu.

N nhỏ nên simulation là pattern đúng.

---

### STEP 4 — BOTTLENECK

Điểm dễ sai nhất:

> Nếu chỉ giữ priority, ta sẽ mất identity của process cần theo dõi.

Ví dụ:

```text
priorities = [1,1,1]
location = 1
```

Ba process cùng priority.

Không thể chỉ nhìn value `1` để biết process nào là target.

Do đó queue item phải là:

```js
{
  priority,
  index
}
```

hoặc:

```js
[priority, index]
```

---

### STEP 5 — STATE

Ta cần:

| State | Ý nghĩa |
|---|---|
| `queue` | các process đang chờ |
| `current` | process vừa lấy khỏi đầu |
| `order` | đã execute bao nhiêu process |
| `location` | original index cần tìm |

Queue item:

```js
{
  priority,
  index
}
```

---

### STEP 6 — TRANSITION

Lấy process đầu:

```js
const current = queue.shift()
```

Check:

```js
const hasHigher = queue.some(
  process => process.priority > current.priority
)
```

### Case 1 — có higher priority

```js
queue.push(current)
```

Không tăng `order`.

### Case 2 — không có higher priority

Process được execute:

```js
order++
```

Nếu:

```js
current.index === location
```

thì:

```js
return order
```

---

### STEP 7 — INVARIANT

Trong queue:

> Thứ tự của các process chưa execute luôn đúng theo quy tắc FIFO sau các lần requeue.

Và:

> `order` chỉ tăng khi process thực sự execute.

Không tăng order khi:

```text
pop → phát hiện priority cao hơn → push lại
```

Đây là invariant cực quan trọng.

---

### STEP 8 — PATTERN

**Pattern chính**

```text
Queue simulation with priority condition
```

Dấu hiệu nhận diện:

- Có queue ban đầu.
- Pop đầu.
- Có thể đưa phần tử lại cuối.
- Chỉ process có điều kiện priority mới được xử lý.
- Cần theo dõi identity ban đầu.

**Trigger sentence**

> “Pop đầu; nếu còn thằng priority cao hơn thì quay lại cuối; không thì execute.”

Mental movie:

```text
FRONT
  ↓
POP
  ↓
HIGHER EXISTS?
├─ YES → PUSH BACK
└─ NO  → EXECUTE → order++
```

---

### STEP 9 — COMPLEXITY

N <= 100.

Mỗi vòng:

```text
shift + some
```

có thể O(N).

Worst case:

```text
O(N²)
```

Space:

```text
O(N)
```

cho queue.

Với constraint này hoàn toàn ổn.

---

## 3. Dry Run — 7 cột chuyển tư duy thành code

Ví dụ:

```js
priorities = [2,1,3,2]
location = 2
```

Queue ban đầu:

```text
A2 B1 C3 D2
```

| Unit | State trước | Action | Transition | Update answer? | Next | State sau |
|---|---|---|---|---|---|---|
| A2 | `A2 B1 C3 D2` | pop A2 | còn C3 > 2 | no | push back | `B1 C3 D2 A2` |
| B1 | `B1 C3 D2 A2` | pop B1 | còn C3 > 1 | no | push back | `C3 D2 A2 B1` |
| C3 | `C3 D2 A2 B1` | pop C3 | không ai > 3 | order=1 | target? yes | return 1 |

---

### Dry run ví dụ 2

```js
priorities = [1,1,9,1,1,1]
location = 0
```

Identity:

```text
A1 B1 C9 D1 E1 F1
```

Sau rotation:

```text
C9
```

execute đầu tiên.

Queue còn:

```text
D1 E1 F1 A1 B1
```

Tất cả cùng priority 1 nên execute theo FIFO:

```text
D → E → F → A → B
```

A là order:

```text
5
```

---

## 4. Bộ phim hình ảnh

### Frame 1 — Queue

```text
[A2] [B1] [C3] [D2]
 ↑
front
```

### Frame 2 — Pop A2

```text
A2
```

Nhìn phần còn lại:

```text
B1 C3 D2
```

Có:

```text
C3 > A2
```

→ A quay lại cuối.

```text
[B1] [C3] [D2] [A2]
```

### Frame 3 — Pop B1

Có C3 > B1.

→ B lại cuối.

```text
[C3] [D2] [A2] [B1]
```

### Frame 4 — Pop C3

Không ai priority > 3.

→ execute.

```text
order = 1
```

Nếu C là target:

```text
return 1
```

### Câu chuyện 1 dòng

> “Người đầu hàng bước ra hỏi còn ai VIP hơn không; có thì quay lại cuối hàng, không thì được phục vụ.”

---

## 5. Code Skeleton Recall

### Bản dễ hiểu

```js
function solution(priorities, location) {
  const queue = priorities.map((priority, index) => ({
    priority,
    index,
  }))

  let order = 0

  while (queue.length > 0) {
    const current = queue.shift()

    const hasHigher = queue.some(
      process => process.priority > current.priority
    )

    if (hasHigher) {
      queue.push(current)
      continue
    }

    order++

    if (current.index === location) {
      return order
    }
  }
}
```

### Bản array tuple

```js
function solution(priorities, location) {
  const queue = priorities.map((priority, index) => [
    priority,
    index,
  ])

  let order = 0

  while (queue.length > 0) {
    const [priority, index] = queue.shift()

    if (queue.some(([p]) => p > priority)) {
      queue.push([priority, index])
      continue
    }

    order++

    if (index === location) {
      return order
    }
  }
}
```

---

## 6. 4 câu thần chú trước khi code

### LOOP LEVELS

> Outer loop:

```text
while queue not empty
```

Bên trong:

```text
pop
→ scan higher priority
→ requeue OR execute
```

---

### RESET WHEN

> `current` reset mỗi vòng bằng process mới pop.

`order` không reset.

Queue liên tục mutate theo simulation.

---

### INVALIDATES WHAT

> Nếu tồn tại process với:

```text
priority > current.priority
```

thì current **không được execute**.

Phải:

```js
queue.push(current)
```

---

### COMMIT WHEN

> Chỉ commit execute khi **không có higher priority**.

Lúc đó mới:

```js
order++
```

và check target.

---

## 7. Trap dễ chết

### Trap 1 — Sort priorities rồi mất thứ tự queue

Sai:

```js
priorities.sort((a,b) => b-a)
```

Vì khi priority bằng nhau, order FIFO ban đầu sau các vòng requeue vẫn quan trọng.

Bài là simulation queue, không chỉ là sort.

---

### Trap 2 — Không giữ original index

Nếu chỉ queue priority:

```js
[1,1,9,1]
```

không biết `location=0` đang ở đâu sau rotation.

Phải giữ:

```text
priority + original index
```

---

### Trap 3 — Tăng order khi requeue

Sai:

```text
pop → hasHigher → order++
```

Không.

`order` chỉ tăng khi process thật sự execute.

---

### Trap 4 — Dùng `>=` thay vì `>`

Rule là:

> nếu có process **priority cao hơn**

Priority bằng nhau không chặn nhau.

Đúng:

```js
p > current.priority
```

Sai:

```js
p >= current.priority
```

---

### Trap 5 — Quên `continue` sau push back

Nếu viết:

```js
if (hasHigher) {
  queue.push(current)
}
order++
```

thì current vừa requeue lại vừa bị tính execute.

Phải:

```js
continue
```

hoặc dùng `else`.

---

### Trap 6 — `shift()` O(N) nhưng hoảng quá sớm

Đúng, JS `shift()` tốn O(N).

Nhưng:

```text
N <= 100
```

nên cực kỳ an toàn.

Không cần over-engineer queue head pointer cho bài này.

---

## 8. Recall 20 giây

> **Nhận diện:** queue + pop đầu + có thể push lại cuối + priority quyết định execute.

> **Queue item:** `{priority, originalIndex}`.

> **Transition:** pop current → `some(p > current.priority)`.

> **Nếu có higher:** push current lại cuối.

> **Nếu không:** `order++`.

> **Target:** nếu `current.index === location` sau khi execute → return order.

> **Complexity:** `O(N²)` worst case nhưng N≤100.

### Code shape

```js
const queue = priorities.map((priority, index) => ({
  priority,
  index,
}))

let order = 0

while (queue.length) {
  const current = queue.shift()

  if (
    queue.some(p => p.priority > current.priority)
  ) {
    queue.push(current)
    continue
  }

  order++

  if (current.index === location) {
    return order
  }
}
```

### Hình chốt cuối

```text
POP FRONT
   ↓
HIGHER PRIORITY EXISTS?
   ├─ YES → PUSH BACK
   │
   └─ NO  → EXECUTE
              ↓
           order++
              ↓
           TARGET?
              ↓
           RETURN
```

## 🧠 Một câu phải khắc vào đầu

> **“Pop đầu — còn thằng ưu tiên cao hơn thì quay lại cuối; không còn thì execute và mới tăng order.”**

---

[⬆ Quay lại Navigator](#-navigator--mobile-first)


---

# Bài 14 — 구명보트 (Xuồng cứu sinh)

🔗 **Đề chính thức (Programmers):** https://school.programmers.co.kr/learn/courses/30/lessons/42885

**Pattern:** Greedy + Two Pointers  
**Trigger:** `mỗi thuyền tối đa 2 người + giới hạn cân nặng → sort → xử lý người nặng nhất trước`

---

## 1. Dịch đề tiếng Việt

Ta cần cứu tất cả những người bị mắc kẹt trên đảo bằng xuồng cứu sinh.

Mỗi xuồng:

- chở tối đa **2 người**
- tổng cân nặng của những người trên xuồng không được vượt quá `limit`

Ví dụ:

```js
people = [70, 50, 80, 50]
limit = 100
```

Hai người `50 + 50` có thể đi cùng nhau.

Nhưng:

```text
70 + 80 = 150
```

vượt quá giới hạn nên không thể đi chung.

Mục tiêu là:

> dùng **ít xuồng nhất có thể** để cứu toàn bộ mọi người.

Cho:

```text
people
```

là cân nặng của mỗi người,

và:

```text
limit
```

là giới hạn cân nặng của một xuồng.

Hãy return số xuồng ít nhất cần dùng.

### Giới hạn

```text
1 <= people.length <= 50,000
40 <= people[i] <= 240
40 <= limit <= 240
```

Đề đảm bảo:

```text
max(people) <= limit
```

nên luôn có thể cứu tất cả mọi người.

### Ví dụ 1

```js
people = [70,50,80,50]
limit = 100
```

Kết quả:

```text
3
```

Một cách tối ưu:

```text
50 + 50
70
80
```

### Ví dụ 2

```js
people = [70,80,50]
limit = 100
```

Không ai ghép được với ai:

```text
70 + 50 = 120
80 + 50 = 130
```

→ mỗi người một xuồng.

Kết quả:

```text
3
```

---

## 2. Phân tích 9 bước

### STEP 1 — CONTRACT

**Input**

```text
people[]
limit
```

**Output**

```text
minimum number of boats
```

Mỗi boat:

```text
1 hoặc 2 người
```

và:

```text
sum weights <= limit
```

**Một câu chốt**

> Mỗi lượt chắc chắn phải đưa người nặng nhất còn lại đi; nếu họ còn ghép được với người nhẹ nhất thì ghép, nếu nhẹ nhất cũng không ghép được thì người nặng nhất buộc phải đi một mình.

---

### STEP 2 — BOUND

```text
N <= 50,000
```

Không thể thử mọi cách pairing:

```text
O(N²)
```

hoặc backtracking.

Ta cần:

```text
O(N log N)
```

do sort,

sau đó:

```text
O(N)
```

two pointers.

---

### STEP 3 — BRUTE FORCE

Cách ngây thơ:

```text
chọn người A
thử ghép với mọi người B
chọn pairing tốt nhất
```

Hoặc generate matching.

Nhưng số cách pair tăng rất nhanh.

Không cần thiết.

Bài có greedy structure rất rõ vì mỗi boat tối đa 2 người.

---

### STEP 4 — BOTTLENECK

Ta phải quyết định:

> người nặng nhất nên đi với ai?

Giả sử array đã sort:

```text
lightest ........ heaviest
```

Người nặng nhất:

```text
people[right]
```

chắc chắn phải đi trong một boat nào đó.

Có hai khả năng:

```text
1. đi một mình
2. đi với đúng 1 người khác
```

Nếu ngay cả người nhẹ nhất:

```text
people[left]
```

mà:

```text
people[left] + people[right] > limit
```

thì không có ai khác ghép được với heaviest.

Vì tất cả người khác đều nặng hơn hoặc bằng `people[left]`.

Do đó:

```text
heaviest buộc phải đi một mình
```

Ngược lại, nếu:

```text
lightest + heaviest <= limit
```

thì ghép lightest với heaviest là an toàn và tối ưu.

Vì người nặng nhất đã phải dùng một boat rồi; nếu có thể tận dụng chỗ trống để mang thêm người nhẹ nhất thì ta giảm được một người chưa cứu mà không tăng boat.

---

### STEP 5 — STATE

Sau sort cần:

| State | Ý nghĩa |
|---|---|
| `left` | người nhẹ nhất chưa cứu |
| `right` | người nặng nhất chưa cứu |
| `boats` | số xuồng đã dùng |

Khởi tạo:

```js
let left = 0
let right = people.length - 1
let boats = 0
```

---

### STEP 6 — TRANSITION

Mỗi vòng:

```text
heaviest = people[right]
lightest = people[left]
```

### Nếu ghép được

```js
if (people[left] + people[right] <= limit) {
  left++
}
```

Người nhẹ nhất đã được cứu cùng người nặng nhất.

### Dù ghép được hay không

Người nặng nhất luôn đi chuyến này:

```js
right--
boats++
```

Đây là chỗ phải nhớ cực rõ:

> `right--` và `boats++` xảy ra **mọi vòng**.

Loop:

```js
while (left <= right)
```

---

### STEP 7 — INVARIANT

Trước mỗi vòng:

> Mọi người ngoài đoạn `[left, right]` đã được xếp xuồng tối ưu.

Và:

> `people[right]` là người nặng nhất chưa cứu, nên chắc chắn phải được xử lý ngay trong vòng hiện tại.

Nếu:

```text
people[left] + people[right] > limit
```

thì heaviest không thể ghép với bất kỳ ai.

Nếu:

```text
<= limit
```

thì lightest + heaviest là một pairing hợp lệ và không làm hỏng phương án tối ưu.

---

### STEP 8 — PATTERN

**Pattern chính**

```text
Greedy + Two Pointers after sorting
```

Dấu hiệu nhận diện:

- Pair tối đa 2 người.
- Có capacity / weight limit.
- Muốn minimize số pair/container/boat.
- Có thể sort.
- Quyết định dựa trên cực trị nhẹ nhất / nặng nhất.

**Trigger sentence**

> “Nặng nhất chắc chắn phải đi; thử nhét nhẹ nhất cùng họ.”

Code movie:

```text
SORT
↓
L = lightest
R = heaviest
↓
L + R <= limit ?
├─ YES → L++
└─ NO  → L giữ nguyên
↓
R--
boats++
```

---

### STEP 9 — COMPLEXITY

Sort:

```text
O(N log N)
```

Two pointers:

```text
O(N)
```

Tổng:

```text
O(N log N)
```

Space:

```text
O(1) ~ O(N)
```

tuỳ implementation sort của JS.

---

## 3. Dry Run — 7 cột chuyển tư duy thành code

Ví dụ:

```js
people = [70,50,80,50]
limit = 100
```

Sort:

```text
[50,50,70,80]
```

| Unit | State trước | Action | Transition | Update answer? | Next | State sau |
|---|---|---|---|---|---|---|
| 80 | L=50,R=80 | `50+80=130>100` | 80 đi một mình | boats=1 | R-- | L=0,R=2 |
| 70 | L=50,R=70 | `50+70=120>100` | 70 đi một mình | boats=2 | R-- | L=0,R=1 |
| 50 | L=50,R=50 | `50+50=100` | ghép hai người | boats=3 | L++,R-- | done |

Kết quả:

```text
3
```

---

### Dry run case không ghép được

```js
people = [50,70,80]
limit = 100
```

Sort:

```text
50 70 80
```

- `50+80 > 100` → 80 đi một mình
- `50+70 > 100` → 70 đi một mình
- còn 50 → đi một mình

→ 3 boats.

---

## 4. Bộ phim hình ảnh

### Frame 1 — Xếp hàng theo cân nặng

```text
50   50   70   80
↑              ↑
L              R
```

### Frame 2 — Người nặng nhất bước lên xuồng

```text
80
```

Hỏi:

> Có thể kéo người nhẹ nhất lên cùng không?

```text
50 + 80 > 100
```

Không.

→ 80 đi một mình.

### Frame 3

Còn:

```text
50 50 70
↑     ↑
L     R
```

`50 + 70 > 100`

→ 70 đi một mình.

### Frame 4

Còn:

```text
50 50
↑  ↑
L  R
```

`50 + 50 = 100`

→ cùng một boat.

**Câu chuyện 1 dòng**

> “Mỗi chuyến chắc chắn chở thằng nặng nhất; còn chỗ thì nhét thằng nhẹ nhất vào cùng.”

---

## 5. Code Skeleton Recall

### Bản nên nhớ

```js
function solution(people, limit) {
  people.sort((a, b) => a - b)

  let left = 0
  let right = people.length - 1
  let boats = 0

  while (left <= right) {
    if (people[left] + people[right] <= limit) {
      left++
    }

    right--
    boats++
  }

  return boats
}
```

### Skeleton siêu ngắn

```js
sort ascending

L = 0
R = n - 1

while (L <= R) {
  if (people[L] + people[R] <= limit) {
    L++
  }

  R--
  boats++
}
```

---

## 6. 4 câu thần chú trước khi code

### LOOP LEVELS

> Một `while (left <= right)`.

Mỗi vòng xử lý chắc chắn người nặng nhất.

---

### RESET WHEN

> Không reset pointer.

```text
left chỉ tăng
right chỉ giảm
```

Không pointer nào quay lại.

---

### INVALIDATES WHAT

> Nếu:

```text
lightest + heaviest > limit
```

thì heaviest **không thể ghép với bất kỳ ai**.

Không cần thử người thứ hai, thứ ba...

Heaviest đi một mình.

---

### COMMIT WHEN

> Mỗi vòng chắc chắn dùng đúng một boat:

```js
boats++
right--
```

Nếu ghép được thêm lightest:

```js
left++
```

---

## 7. Trap dễ chết

### Trap 1 — Quên sort

Two pointers chỉ có ý nghĩa khi:

```text
left = nhẹ nhất
right = nặng nhất
```

Phải:

```js
people.sort((a, b) => a - b)
```

---

### Trap 2 — Khi không ghép được lại quên `right--`

Đây là lỗi mày từng gặp.

Sai:

```js
if (people[left] + people[right] <= limit) {
  left++
  right--
  boats++
}
```

Nếu không ghép được thì loop không tiến.

Đúng:

```js
if (sum <= limit) {
  left++
}

right--
boats++
```

`right--` và `boats++` nằm **ngoài if**.

---

### Trap 3 — Chỉ `boats++` khi ghép được

Sai.

Dù người nặng nhất đi một mình thì vẫn dùng một boat.

Mỗi vòng:

```js
boats++
```

---

### Trap 4 — Ghép hai người nhẹ nhất trước

Có thể làm lãng phí cơ hội ghép heaviest với lightest.

Greedy đúng là:

```text
fix heaviest first
```

rồi thử lightest.

---

### Trap 5 — Điều kiện loop dùng `<`

Sai:

```js
while (left < right)
```

sẽ bỏ sót trường hợp còn đúng một người:

```text
left === right
```

Đúng:

```js
while (left <= right)
```

---

### Trap 6 — Khi chỉ còn 1 người vẫn check `people[left] + people[right]`

Nếu `left === right`, biểu thức sẽ thành:

```text
2 * people[left]
```

Điều đó có thể khiến `left` không tăng, nhưng không sao vì `right--` vẫn kết thúc loop và `boats++` đúng một lần.

Nếu muốn explicit hơn có thể check:

```js
if (
  left < right &&
  people[left] + people[right] <= limit
) {
  left++
}
```

Nhưng bản ngắn ở trên vẫn trả đúng số boat.

---

## 8. Recall 20 giây

> **Nhận diện:** mỗi boat tối đa 2 người + weight limit + minimize boats → sort + greedy two pointers.

> **State:** `left`, `right`, `boats`.

> **Heaviest luôn đi:** mỗi vòng `right--`, `boats++`.

> **Pair:** nếu `people[left] + people[right] <= limit` → `left++`.

> **Nếu không pair:** left giữ nguyên; heaviest đi một mình.

> **Complexity:** `O(N log N)` vì sort.

### Code shape

```js
people.sort((a, b) => a - b)

let left = 0
let right = people.length - 1
let boats = 0

while (left <= right) {
  if (people[left] + people[right] <= limit) {
    left++
  }

  right--
  boats++
}

return boats
```

### Hình chốt cuối

```text
LIGHTEST                     HEAVIEST
   L --------------------------- R
                 ↓
            ONE BOAT NOW
                 ↓
         L + R <= limit ?
          /             \
       YES               NO
       L++              L stays
          \             /
             R--
           boats++
```

## 🧠 Một câu phải khắc vào đầu

> **“Nặng nhất luôn phải đi chuyến này; nhẹ nhất ghép được thì cho đi cùng, không thì để lại.”**

---

[⬆ Quay lại Navigator](#-navigator--mobile-first)


---

# Bài 15 — 주식가격 (Giá cổ phiếu)

🔗 **Đề chính thức (Programmers):** https://school.programmers.co.kr/learn/courses/30/lessons/42584

**Pattern:** Monotonic Stack  
**Trigger:** `với mỗi index, hỏi bao lâu nữa mới gặp phần tử nhỏ hơn đầu tiên`

---

## 1. Dịch đề tiếng Việt

Cho mảng `prices` ghi lại giá cổ phiếu theo từng giây.

Với mỗi thời điểm `i`, hãy tính số giây cho tới khi giá **lần đầu tiên thấp hơn** giá tại `i`.

Nếu từ `i` đến hết mảng không bao giờ có giá thấp hơn `prices[i]`, thì:

```text
answer[i] = lastIndex - i
```

Ví dụ:

```js
prices = [1, 2, 3, 2, 3]
```

Kết quả:

```js
[4, 3, 1, 1, 0]
```

- index 0, giá 1: không bao giờ giảm dưới 1 → 4 giây
- index 1, giá 2: không bao giờ giảm dưới 2 → 3 giây
- index 2, giá 3: sau 1 giây gặp 2 → 1 giây
- index 3, giá 2: tới hết không thấp hơn 2 → 1 giây
- index cuối → 0 giây

### Giới hạn

```text
1 <= prices[i] <= 10,000
2 <= prices.length <= 100,000
```

---

## 2. Phân tích 9 bước

### STEP 1 — CONTRACT

Với mỗi `i`, tìm index đầu tiên `j > i` sao cho:

```text
prices[j] < prices[i]
```

Nếu có:

```text
answer[i] = j - i
```

Nếu không có:

```text
answer[i] = n - 1 - i
```

**Một câu chốt**

> Mỗi index đứng chờ cho tới khi gặp giá nhỏ hơn đầu tiên ở bên phải.

---

### STEP 2 — BOUND

```text
N <= 100,000
```

Nested scan cho từng index có thể thành:

```text
O(N²)
```

Ta cần:

```text
O(N)
```

---

### STEP 3 — BRUTE FORCE

```js
for (let i = 0; i < prices.length; i++) {
  for (let j = i + 1; j < prices.length; j++) {
    if (prices[j] < prices[i]) {
      answer[i] = j - i
      break
    }
  }
}
```

Logic đúng, nhưng mảng tăng dần sẽ rất chậm.

---

### STEP 4 — BOTTLENECK

Current price có thể giải quyết nhiều index trước đó.

Ta chỉ cần giữ những index:

```text
chưa gặp giá thấp hơn đầu tiên
```

→ dùng stack.

---

### STEP 5 — STATE

```js
const stack = []
const answer = Array(prices.length).fill(0)
```

Stack lưu **index**, không phải value.

Ý nghĩa:

> Mỗi index trong stack vẫn đang unresolved: chưa gặp giá thấp hơn ở phần đã scan.

---

### STEP 6 — TRANSITION

Duyệt `i` từ trái sang phải.

Nếu current price nhỏ hơn giá của top stack:

```js
prices[i] < prices[stack.at(-1)]
```

thì current chính là lần giảm đầu tiên của top.

```js
while (
  stack.length > 0 &&
  prices[i] < prices[stack.at(-1)]
) {
  const idx = stack.pop()
  answer[idx] = i - idx
}
```

Sau đó:

```js
stack.push(i)
```

---

### STEP 7 — INVARIANT

Mọi index còn trong stack đều chưa gặp một giá nhỏ hơn ở bên phải đã duyệt.

Khi current làm:

```text
prices[i] < prices[top]
```

thì `i` chính là lần giảm đầu tiên của top, vì nếu từng có lần giảm trước đó thì top đã bị pop rồi.

---

### STEP 8 — PATTERN

**Pattern:** Monotonic Stack / Next Event.

Dấu hiệu:

- “với mỗi phần tử”
- hỏi “bao lâu nữa / index đầu tiên bên phải”
- gặp phần tử nhỏ hơn / lớn hơn đầu tiên
- cần tránh scan lại tương lai

Rất gần với **Next Greater Element**:

```text
NGE: current > arr[top]
Stock drop: current < prices[top]
```

Chỉ đổi relation.

---

### STEP 9 — COMPLEXITY

Mỗi index:

```text
push 1 lần
pop tối đa 1 lần
```

Nên:

```text
Time O(N)
Space O(N)
```

---

## 3. Dry Run — 7 cột chuyển tư duy thành code

```js
prices = [1,2,3,2,3]
```

| Unit | State trước | Action | Transition | Update answer? | Next | State sau |
|---|---|---|---|---|---|---|
| i=0,p=1 | `[]` | no top | push 0 | no | next | `[0]` |
| i=1,p=2 | `[0]` | `2<1` false | push 1 | no | next | `[0,1]` |
| i=2,p=3 | `[0,1]` | `3<2` false | push 2 | no | next | `[0,1,2]` |
| i=3,p=2 | `[0,1,2]` | `2<3` true | pop 2 | `answer[2]=1` | recheck | `[0,1]` |
| i=3,p=2 | `[0,1]` | `2<2` false | push 3 | no | next | `[0,1,3]` |
| i=4,p=3 | `[0,1,3]` | `3<2` false | push 4 | no | end | `[0,1,3,4]` |

Còn stack:

```text
0,1,3,4
```

→ không giảm tới hết.

```text
answer[0]=4
answer[1]=3
answer[3]=1
answer[4]=0
```

Final:

```js
[4,3,1,1,0]
```

---

## 4. Bộ phim hình ảnh

Mỗi index bật một chiếc đồng hồ:

```text
0: price 1 → waiting
1: price 2 → waiting
2: price 3 → waiting
```

Stack:

```text
[0,1,2]
```

Tới index 3, price 2:

```text
2 < 3
```

→ đồng hồ index 2 dừng:

```text
3 - 2 = 1
```

Pop 2.

Top mới là index 1, giá 2:

```text
2 < 2
```

false → không giảm.

Rồi push index 3.

**Câu chuyện 1 dòng**

> Stack là danh sách những index vẫn đang chờ ngày giá rơi; current thấp hơn ai thì kết thúc đồng hồ của người đó.

---

## 5. Code Skeleton Recall

```js
function solution(prices) {
  const n = prices.length
  const answer = Array(n).fill(0)
  const stack = []

  for (let i = 0; i < n; i++) {
    while (
      stack.length > 0 &&
      prices[i] < prices[stack.at(-1)]
    ) {
      const idx = stack.pop()
      answer[idx] = i - idx
    }

    stack.push(i)
  }

  while (stack.length > 0) {
    const idx = stack.pop()
    answer[idx] = n - 1 - idx
  }

  return answer
}
```

### Skeleton siêu ngắn

```js
for (let i = 0; i < n; i++) {
  while (
    stack.length &&
    arr[i] < arr[stack.at(-1)]
  ) {
    const idx = stack.pop()
    answer[idx] = i - idx
  }

  stack.push(i)
}

while (stack.length) {
  const idx = stack.pop()
  answer[idx] = n - 1 - idx
}
```

---

## 6. 4 câu thần chú trước khi code

### LOOP LEVELS

```text
for current index
    while current resolves stack top
        pop
        commit
    push current
```

### RESET WHEN

> Không reset stack. Stack mang unresolved state từ quá khứ sang hiện tại.

### INVALIDATES WHAT

```text
currentPrice < price[top]
```

→ top vừa gặp lần giảm đầu tiên → pop.

### COMMIT WHEN

Trong loop:

```js
answer[idx] = i - idx
```

Sau loop:

```js
answer[idx] = n - 1 - idx
```

cho index không bao giờ gặp giảm.

---

## 7. Trap dễ chết

### Trap 1 — `<=` thay vì `<`

Giá bằng nhau không phải giảm.

Đúng:

```js
prices[i] < prices[top]
```

### Trap 2 — Stack lưu value

Cần tính:

```text
i - idx
```

nên phải lưu **index**.

### Trap 3 — `if` thay vì `while`

Current có thể resolve nhiều index → phải `while`.

### Trap 4 — Quên xử lý stack còn lại

Ai còn stack thì sống tới cuối:

```js
n - 1 - idx
```

### Trap 5 — Nhầm dấu với Next Greater Element

```text
NGE → current > top
Stock drop → current < top
```

### Trap 6 — Nghĩ giảm ngay thì answer = 0

Sai.

Nếu giảm ở giây kế tiếp:

```text
answer = 1
```

vì khoảng thời gian là:

```text
j - i
```

---

## 8. Recall 20 giây

> **Nhận diện:** mỗi index hỏi “bao lâu nữa gặp giá thấp hơn đầu tiên?” → monotonic stack.

> **Stack:** index chưa gặp giảm.

> **Pop condition:** `prices[i] < prices[top]`.

> **Commit:** `answer[idx] = i - idx`.

> **Equal không pop.**

> **Sau loop:** `answer[idx] = n - 1 - idx`.

> **Complexity:** O(N).

### Code shape

```js
for (let i = 0; i < n; i++) {
  while (
    stack.length &&
    prices[i] < prices[stack.at(-1)]
  ) {
    const idx = stack.pop()
    answer[idx] = i - idx
  }

  stack.push(i)
}

while (stack.length) {
  const idx = stack.pop()
  answer[idx] = n - 1 - idx
}
```

## 🧠 Một câu phải khắc vào đầu

> **“Stack giữ index chưa thấy giá giảm; current thấp hơn top thì pop và chốt thời gian, ai còn lại thì sống tới hết mảng.”**

---

[⬆ Quay lại Navigator](#-navigator--mobile-first)


---

# Bài 16 — 큰 수 만들기 (Tạo số lớn nhất)

🔗 **Đề chính thức (Programmers):** https://school.programmers.co.kr/learn/courses/30/lessons/42883

**Pattern:** Greedy + Monotonic Stack  
**Trigger:** `xóa đúng k chữ số nhưng giữ nguyên thứ tự → muốn chữ số lớn hơn đứng càng sớm càng tốt`

---

## 1. Dịch đề tiếng Việt

Cho một số rất dài dưới dạng chuỗi `number`.

Ta phải **xóa đúng `k` chữ số** nhưng giữ nguyên thứ tự tương đối của các chữ số còn lại, sao cho số tạo thành là **lớn nhất có thể**.

Ví dụ:

```text
number = "1924"
k = 2
```

Có thể tạo:

```text
19, 12, 14, 92, 94, 24
```

Lớn nhất là:

```text
94
```

### Giới hạn

```text
2 <= number.length <= 1,000,000
1 <= k < number.length
```

N rất lớn → không được brute-force tổ hợp.

---

## 2. Phân tích 9 bước

### STEP 1 — CONTRACT

Input:

```text
number: string
k: số chữ số phải xóa
```

Output:

```text
string lớn nhất có thể sau khi xóa đúng k chữ số
```

Không được đổi thứ tự các chữ số còn lại.

**Một câu chốt**

> Muốn số lớn nhất thì ưu tiên làm cho các chữ số ở bên trái càng lớn càng tốt.

---

### STEP 2 — BOUND

```text
N <= 1,000,000
```

Không thể generate combinations.

Cần gần:

```text
O(N)
```

---

### STEP 3 — BRUTE FORCE

Brute force là chọn `N-k` vị trí trong N vị trí.

Số khả năng:

```text
C(N, N-k)
```

không thể chạy.

---

### STEP 4 — BOTTLENECK

Nếu đang có:

```text
1 9
```

thì giữ `1` trước `9` là tệ hơn việc xóa `1` để `9` đứng sớm hơn.

Greedy rule:

> Nếu digit hiện tại lớn hơn digit cuối đã giữ, và vẫn còn quyền xóa, hãy xóa digit nhỏ hơn ở cuối.

Vì vị trí bên trái có trọng số lớn hơn rất nhiều so với vị trí bên phải.

---

### STEP 5 — STATE

```js
const stack = []
let remove = k
```

Stack giữ các digit đã chọn cho prefix tốt nhất hiện tại.

---

### STEP 6 — TRANSITION

Với mỗi digit:

```js
for (const digit of number) {
```

Trong khi:

```text
còn quyền xóa
AND stack không rỗng
AND current digit > stack top
```

thì:

```js
stack.pop()
remove--
```

Sau đó:

```js
stack.push(digit)
```

Code lõi:

```js
while (
  remove > 0 &&
  stack.length > 0 &&
  stack.at(-1) < digit
) {
  stack.pop()
  remove--
}
```

---

### STEP 7 — INVARIANT

Sau khi xử lý một prefix của `number`:

> `stack` là lựa chọn tốt nhất theo greedy cho prefix đó với số lần xóa đã dùng.

Quan trọng nhất:

```text
stack có xu hướng không tăng từ trái sang phải
```

sau khi đã pop những digit nhỏ hơn current trong phạm vi budget xóa.

---

### STEP 8 — PATTERN

**Pattern:** Greedy + Monotonic Stack

Dấu hiệu:

- xóa `k` phần tử
- vẫn giữ thứ tự tương đối
- muốn lexicographically / numerically lớn nhất
- current tốt hơn có thể “đá” một số phần tử trước đó ra
- mỗi phần tử push/pop tối đa 1 lần

Trigger sentence:

> “Xóa k để maximize sequence → current lớn hơn top thì pop trong khi còn budget.”

---

### STEP 9 — COMPLEXITY

Mỗi digit:

```text
push 1 lần
pop tối đa 1 lần
```

Time:

```text
O(N)
```

Space:

```text
O(N)
```

---

## 3. Dry Run — 7 cột chuyển tư duy thành code

Ví dụ:

```text
number = "1924"
k = 2
```

| Unit | State trước | Action | Transition | Update answer? | Next | State sau |
|---|---|---|---|---|---|---|
| `1` | stack=[] remove=2 | push | `[1]` | no | next | `[1]` |
| `9` | `[1]`,2 | `9>1` | pop 1, remove=1 | no | recheck | `[]` |
| `9` | `[]`,1 | push 9 | `[9]` | no | next | `[9]` |
| `2` | `[9]`,1 | `2>9` false | push 2 | no | next | `[9,2]` |
| `4` | `[9,2]`,1 | `4>2` | pop 2, remove=0 | no | push | `[9,4]` |

Final:

```text
"94"
```

---

### Dry run quan trọng: số giảm dần

```text
number = "98765"
k = 2
```

Không digit nào lớn hơn top trước đó.

Sau scan:

```text
stack = 98765
remove = 2
```

Phải xóa tiếp từ cuối:

```text
987
```

---

## 4. Bộ phim hình ảnh

Hãy tưởng tượng stack là dãy chữ số mày đang xây từ trái sang phải.

```text
1
```

Tới `9`:

```text
1 [9]
```

`9` lớn hơn `1`.

Nếu còn quyền xóa:

```text
đá 1 ra
```

để `9` chiếm vị trí sớm hơn:

```text
9
```

Tới `4`, top là `2`:

```text
9 2 [4]
```

`4 > 2` → pop `2`.

Kết quả:

```text
94
```

**Câu chuyện 1 dòng**

> “Digit mới mạnh hơn top thì dùng quyền xóa để đá top yếu hơn ra, cho digit mạnh đứng sớm hơn.”

---

## 5. Code Skeleton Recall

### Bản nên nhớ

```js
function solution(number, k) {
  const stack = []
  let remove = k

  for (const digit of number) {
    while (
      remove > 0 &&
      stack.length > 0 &&
      stack.at(-1) < digit
    ) {
      stack.pop()
      remove--
    }

    stack.push(digit)
  }

  if (remove > 0) {
    stack.splice(stack.length - remove, remove)
  }

  return stack.join("")
}
```

### Bản tránh `splice`

```js
function solution(number, k) {
  const stack = []
  let remove = k

  for (const digit of number) {
    while (
      remove > 0 &&
      stack.length > 0 &&
      stack.at(-1) < digit
    ) {
      stack.pop()
      remove--
    }

    stack.push(digit)
  }

  return stack.slice(0, stack.length - remove).join("")
}
```

Nếu `remove === 0`, `slice(0, stack.length)` vẫn đúng.

---

## 6. 4 câu thần chú trước khi code

### LOOP LEVELS

```text
for digit
    while còn quyền xóa AND top < digit
        pop
        k--
    push digit
```

### RESET WHEN

> Không reset stack.

`k/remove` chỉ giảm, không tăng lại.

### INVALIDATES WHAT

```text
top < current
```

và còn budget xóa

→ top là lựa chọn tệ hơn cho vị trí bên trái → pop.

### COMMIT WHEN

Mỗi current cuối cùng đều được:

```js
stack.push(digit)
```

Sau scan, nếu còn `remove` thì commit final bằng cách cắt đúng `remove` digit ở **cuối**.

---

## 7. Trap dễ chết

### Trap 1 — Dùng `if` thay vì `while`

Ví dụ:

```text
number = 1299
```

Một `9` có thể cần pop nhiều digit trước nó.

Phải `while`.

### Trap 2 — Quên điều kiện còn `k`

Không được xóa quá số lượng yêu cầu.

```js
remove > 0
```

phải nằm trong while.

### Trap 3 — Dùng `<=` thay vì `<`

Digit bằng nhau không cần pop.

Đúng:

```js
stack.at(-1) < digit
```

### Trap 4 — Quên case còn k sau scan

Ví dụ:

```text
98765, k=2
```

Không pop lần nào trong loop.

Phải xóa từ cuối:

```text
987
```

### Trap 5 — Sort digit

Không được sort vì phải giữ thứ tự tương đối ban đầu.

### Trap 6 — Convert sang Number

`number.length` có thể tới 1,000,000.

Phải xử lý hoàn toàn bằng string/array.

---

## 8. Recall 20 giây

> **Nhận diện:** xóa đúng k phần tử, giữ nguyên thứ tự, maximize số → greedy monotonic stack.

> **State:** `stack`, `remove`.

> **Pop condition:** `remove > 0 && stack.top < current`.

> **Action:** pop + `remove--`, rồi push current.

> **Sau loop:** còn remove → cắt từ cuối.

> **Complexity:** O(N).

### Code shape

```js
const stack = []
let remove = k

for (const digit of number) {
  while (
    remove > 0 &&
    stack.length &&
    stack.at(-1) < digit
  ) {
    stack.pop()
    remove--
  }

  stack.push(digit)
}

return stack
  .slice(0, stack.length - remove)
  .join("")
```

## 🧠 Một câu phải khắc vào đầu

> **“Current lớn hơn top và còn quyền xóa thì pop top; nếu cuối cùng vẫn còn k thì cắt đuôi.”**

---

[⬆ Quay lại Navigator](#-navigator--mobile-first)


---

# Bài 17 — 다리를 지나는 트럭 (Xe tải qua cầu)

🔗 **Đề chính thức (Programmers):** https://school.programmers.co.kr/learn/courses/30/lessons/42583

**Pattern:** Queue / Time Simulation  
**Trigger:** `nhiều đối tượng đi qua tài nguyên theo thứ tự + giới hạn capacity + mất cố định T giây để rời`

---

## 1. Dịch đề tiếng Việt

Có nhiều xe tải phải đi qua một cây cầu một làn theo đúng thứ tự.

Cầu có hai giới hạn:

- tối đa `bridge_length` xe cùng ở trên cầu
- tổng trọng lượng xe trên cầu không được vượt quá `weight`

Một xe mất đúng:

```text
bridge_length giây
```

tính từ lúc lên cầu đến lúc rời cầu.

Cho:

```text
bridge_length
weight
truck_weights
```

Hãy trả về **thời gian tối thiểu** để tất cả xe đi qua cầu.

Ví dụ:

```js
bridge_length = 2
weight = 10
truck_weights = [7,4,5,6]
```

Kết quả:

```text
8
```

---

## 2. Phân tích 9 bước

### STEP 1 — CONTRACT

Ta cần mô phỏng đúng thứ tự xe.

Mỗi xe khi vào cầu sẽ có một thời điểm rời:

```text
exitTime = enterTime + bridge_length
```

### STEP 2 — BOUND

```text
bridge_length <= 10,000
truck count <= 10,000
```

Time simulation theo từng giây là đủ.

### STEP 3 — BRUTE FORCE

Có thể mô phỏng cầu bằng array độ dài `bridge_length`, mỗi giây shift một slot.

Đúng nhưng dễ tốn thao tác nếu dùng `shift()` liên tục.

### STEP 4 — BOTTLENECK

Điểm khó:

> Mỗi giây phải xử lý **xe rời cầu trước**, rồi mới xét xe mới có được vào không.

Nếu làm ngược thứ tự có thể sai capacity/weight.

### STEP 5 — STATE

```js
time
nextTruck
currentWeight
bridgeQueue
```

`bridgeQueue` lưu:

```js
{ weight, exitTime }
```

### STEP 6 — TRANSITION

Mỗi vòng:

1. tăng `time`
2. nếu xe đầu cầu có `exitTime === time` → rời cầu, trừ weight
3. nếu còn xe chờ và thêm xe đó không vượt `weight` → cho vào cầu
4. lưu `exitTime = time + bridge_length`

### STEP 7 — INVARIANT

> `currentWeight` luôn bằng tổng weight của tất cả xe hiện còn trên cầu.

Và queue cầu luôn theo thứ tự rời tăng dần.

### STEP 8 — PATTERN

**Queue simulation with timestamps**

Dấu hiệu:

- vào theo thứ tự
- tài nguyên có capacity
- item ở lại trong hệ thống đúng T đơn vị thời gian
- hỏi tổng thời gian hoàn tất

### STEP 9 — COMPLEXITY

Mỗi truck:

```text
enqueue 1 lần
dequeue 1 lần
```

Nếu dùng head pointer:

```text
O(N + total time simulation)
```

Với constraint này chạy ổn.

---

## 3. Dry Run — 7 cột chuyển tư duy thành code

```js
bridge_length = 2
weight = 10
trucks = [7,4,5,6]
```

| Time | Trước tick | Xe rời | Xe mới vào | currentWeight | Bridge sau |
|---:|---|---|---|---:|---|
| 1 | [] | none | 7 | 7 | `[7 exit@3]` |
| 2 | [7] | none | 4 không vào | 7 | `[7]` |
| 3 | [7] | 7 rời | 4 vào | 4 | `[4 exit@5]` |
| 4 | [4] | none | 5 vào | 9 | `[4,5]` |
| 5 | [4,5] | 4 rời | 6 không vào | 5 | `[5]` |
| 6 | [5] | 5 rời | 6 vào | 6 | `[6 exit@8]` |
| 7 | [6] | none | none | 6 | `[6]` |
| 8 | [6] | 6 rời | done | 0 | `[]` |

→ answer = `8`

---

## 4. Bộ phim hình ảnh

```text
TIME TICK
   ↓
TRUCK EXIT?
   ↓
REMOVE WEIGHT
   ↓
NEXT TRUCK FITS?
   ├─ YES → ENTER, set exitTime
   └─ NO  → WAIT
   ↓
NEXT SECOND
```

**Câu chuyện 1 dòng**

> “Mỗi giây dọn xe đã đến giờ xuống trước, rồi mới thử nhét xe tiếp theo lên cầu.”

---

## 5. Code Skeleton Recall

```js
function solution(bridge_length, weight, truck_weights) {
  const bridge = []
  let head = 0
  let time = 0
  let nextTruck = 0
  let currentWeight = 0

  while (
    nextTruck < truck_weights.length ||
    head < bridge.length
  ) {
    time++

    if (
      head < bridge.length &&
      bridge[head].exitTime === time
    ) {
      currentWeight -= bridge[head].weight
      head++
    }

    if (
      nextTruck < truck_weights.length &&
      currentWeight + truck_weights[nextTruck] <= weight
    ) {
      const truckWeight = truck_weights[nextTruck]

      bridge.push({
        weight: truckWeight,
        exitTime: time + bridge_length,
      })

      currentWeight += truckWeight
      nextTruck++
    }
  }

  return time
}
```

---

## 6. 4 câu thần chú trước khi code

### LOOP LEVELS

```text
while còn truck chờ OR còn truck trên cầu
    time++
    EXIT
    ENTER
```

### RESET WHEN

> Không reset `currentWeight`.

Nó chỉ cộng khi xe vào, trừ khi xe rời.

### INVALIDATES WHAT

Xe mới không được vào nếu:

```js
currentWeight + nextWeight > weight
```

### COMMIT WHEN

Xe rời khi:

```js
exitTime === time
```

Xe vào thì ngay lập tức:

```js
exitTime = time + bridge_length
```

---

## 7. Trap dễ chết

### Trap 1 — Cho xe vào trước khi xử lý xe rời

Sai thứ tự.

Đúng:

```text
EXIT trước → ENTER sau
```

### Trap 2 — Quên cập nhật `currentWeight`

Xe vào:

```js
currentWeight += truckWeight
```

Xe rời:

```js
currentWeight -= truckWeight
```

### Trap 3 — Nhầm thời gian rời

Nếu vào ở `time`:

```text
exitTime = time + bridge_length
```

### Trap 4 — Dùng `shift()` liên tục

Với JS nên dùng `head` pointer nếu muốn an toàn hiệu năng.

### Trap 5 — Chỉ loop tới khi hết truck chờ

Sai, vì truck cuối vẫn cần thời gian để rời cầu.

Phải loop đến khi:

```text
không còn truck chờ
AND
không còn truck trên cầu
```

### Trap 6 — Quên thứ tự xe là cố định

Không được chọn xe nhẹ hơn ở sau để nhét trước.

---

## 8. Recall 20 giây

> **Nhận diện:** queue + capacity + mỗi item ở hệ thống đúng T giây → time simulation.

> **State:** `time`, `nextTruck`, `currentWeight`, `bridgeQueue`.

> **Mỗi tick:** `time++ → EXIT → ENTER`.

> **Xe vào:** set `exitTime = time + bridge_length`.

> **Xe rời:** trừ `currentWeight`.

> **Stop:** hết truck chờ và bridge rỗng.

### Code shape

```js
while (
  nextTruck < trucks.length ||
  head < bridge.length
) {
  time++

  if (
    head < bridge.length &&
    bridge[head].exitTime === time
  ) {
    currentWeight -= bridge[head].weight
    head++
  }

  if (
    nextTruck < trucks.length &&
    currentWeight + trucks[nextTruck] <= weight
  ) {
    bridge.push({
      weight: trucks[nextTruck],
      exitTime: time + bridge_length,
    })

    currentWeight += trucks[nextTruck]
    nextTruck++
  }
}
```

## 🧠 Một câu phải khắc vào đầu

> **“Mỗi giây: xe đến giờ thì xuống trước, rồi mới check xe kế tiếp có đủ tải để lên không.”**

---

[⬆ Quay lại Navigator](#-navigator--mobile-first)


---

# Bài 18 — 개인정보 수집 유효기간 (Thời hạn lưu trữ thông tin cá nhân)

🔗 **Đề chính thức (Programmers):** https://school.programmers.co.kr/learn/courses/30/lessons/150370

**Pattern:** Date Parsing + Hash Map + Normalization  
**Trigger:** `mọi tháng = 28 ngày → đổi ngày thành một số duy nhất rồi so sánh`

---

## 1. Dịch đề tiếng Việt

Có nhiều thông tin cá nhân được thu thập theo các loại điều khoản khác nhau. Mỗi loại điều khoản có thời hạn lưu trữ tính theo tháng.

Nếu thông tin đã **hết hạn trước hôm nay**, nó phải bị hủy.

Ví dụ, điều khoản A có thời hạn 12 tháng. Thông tin được thu thập ngày:

```text
2021.01.05
```

thì được lưu đến hết:

```text
2022.01.04
```

và từ:

```text
2022.01.05
```

phải hủy.

Đề cho một giả định cực quan trọng:

> **Mọi tháng đều có đúng 28 ngày.**

Cho:

- `today`: ngày hôm nay
- `terms`: loại điều khoản và số tháng hiệu lực
- `privacies`: ngày thu thập + loại điều khoản

Hãy return các số thứ tự của thông tin phải hủy, theo thứ tự tăng dần.

---

## 2. Phân tích 9 bước

### STEP 1 — CONTRACT

Với mỗi privacy:

```text
expiryStart = collectedDate + termMonths
```

Nếu:

```text
today >= expiryStart
```

thì đã đến ngày phải hủy.

**Một câu chốt**

> Không tính “ngày cuối còn được giữ”; tính thẳng **ngày bắt đầu hết hạn** rồi so `today >= expiry`.

---

### STEP 2 — BOUND

```text
terms <= 20
privacies <= 100
```

Rất nhỏ.

Vấn đề không phải performance mà là **date arithmetic không được sai**.

---

### STEP 3 — BRUTE FORCE

Có thể cộng tháng thủ công:

- tăng month
- carry year
- trừ 1 ngày để tìm ngày cuối

Nhưng cực dễ lỗi.

Đề đã cố tình cho:

```text
mọi tháng = 28 ngày
```

để tránh lịch thật.

---

### STEP 4 — BOTTLENECK

Hãy biến:

```text
YYYY.MM.DD
```

thành một số ngày tuyệt đối:

```js
totalDays = year * 12 * 28 + month * 28 + day
```

Hoặc dùng `(month - 1)` cũng được miễn nhất quán.

Khi đó:

```text
+ X tháng
```

chỉ là:

```text
+ X * 28
```

Không còn xử lý year/month/day riêng.

---

### STEP 5 — STATE

Cần:

```js
termsMap
todayDays
answer
```

`termsMap`:

```text
A -> 6
B -> 12
C -> 3
```

---

### STEP 6 — TRANSITION

Parse terms:

```js
const termMap = new Map()

for (const term of terms) {
  const [type, months] = term.split(" ")
  termMap.set(type, Number(months))
}
```

Helper:

```js
const toDays = (date) => {
  const [y, m, d] = date.split(".").map(Number)
  return y * 12 * 28 + m * 28 + d
}
```

Với mỗi privacy:

```js
const [date, type] = privacy.split(" ")
const expiry = toDays(date) + termMap.get(type) * 28
```

Nếu:

```js
todayDays >= expiry
```

→ push index + 1.

---

### STEP 7 — INVARIANT

Với mọi ngày:

```text
date A < date B
```

thì:

```text
toDays(A) < toDays(B)
```

Do mọi tháng đều cùng 28 ngày, phép ánh xạ bảo toàn thứ tự thời gian.

---

### STEP 8 — PATTERN

**Pattern:** Parsing + normalization.

Dấu hiệu:

- input là string có format cố định
- cần compare / arithmetic nhiều lần
- có quy tắc đơn giản hóa domain
- tốt nhất convert representation trước

Mental model:

```text
DATE STRING
   ↓
TOTAL DAYS
   ↓
+ termMonths * 28
   ↓
COMPARE WITH TODAY
```

---

### STEP 9 — COMPLEXITY

```text
O(T + P)
```

với `T = terms.length`, `P = privacies.length`.

Space:

```text
O(T)
```

---

## 3. Dry Run — 7 cột chuyển tư duy thành code

Ví dụ:

```js
today = "2022.05.19"
terms = ["A 6", "B 12", "C 3"]
privacy = "2022.02.19 C"
```

```text
collected = toDays(2022.02.19)
expiry = collected + 3*28
```

Vì 3 tháng sau là:

```text
2022.05.19
```

Và rule là:

```text
today >= expiry
```

nên privacy này **phải hủy hôm nay**.

Đó chính là lý do ví dụ #3 bị hủy.

---

## 4. Bộ phim hình ảnh

Đừng tưởng tượng lịch.

Hãy tưởng tượng mọi ngày nằm trên một **number line**.

```text
2022.02.19
    ↓
  TOTAL DAYS
    ↓
+ 3 * 28
    ↓
EXPIRY DAY = 2022.05.19
    ↓
TODAY >= EXPIRY ?
    ↓ YES
DESTROY
```

---

## 5. Code Skeleton Recall

```js
function solution(today, terms, privacies) {
  const toDays = (date) => {
    const [year, month, day] = date.split(".").map(Number)
    return year * 12 * 28 + month * 28 + day
  }

  const termMap = new Map()

  for (const term of terms) {
    const [type, months] = term.split(" ")
    termMap.set(type, Number(months))
  }

  const todayDays = toDays(today)
  const answer = []

  for (let i = 0; i < privacies.length; i++) {
    const [date, type] = privacies[i].split(" ")

    const expiry =
      toDays(date) +
      termMap.get(type) * 28

    if (todayDays >= expiry) {
      answer.push(i + 1)
    }
  }

  return answer
}
```

---

## 6. 4 câu thần chú trước khi code

### LOOP LEVELS

```text
1 loop build termMap
1 loop scan privacies
```

### RESET WHEN

Không có state phức tạp để reset.

Mỗi privacy parse độc lập.

### INVALIDATES WHAT

Privacy hết hạn khi:

```js
todayDays >= expiry
```

### COMMIT WHEN

Ngay khi privacy hết hạn:

```js
answer.push(i + 1)
```

---

## 7. Trap dễ chết

### Trap 1 — Dùng `>` thay vì `>=`

Nếu hôm nay đúng bằng ngày bắt đầu hết hạn:

```text
phải hủy ngay hôm nay
```

Đúng:

```js
todayDays >= expiry
```

---

### Trap 2 — Trừ 1 ngày rồi lại so sai

Có 2 cách:

**Cách A — nên nhớ:**

```text
expiryStart = collected + months*28
today >= expiryStart → destroy
```

**Cách B:**

```text
lastValid = collected + months*28 - 1
today > lastValid → destroy
```

Hai cách tương đương.

Nhưng đừng trộn chúng.

---

### Trap 3 — Dùng Date của JavaScript

Không nên.

Đề dùng lịch giả:

```text
mọi tháng 28 ngày
```

JS `Date` dùng lịch thật → vừa thừa vừa dễ sai.

---

### Trap 4 — Quên `Number()`

`split()` trả string.

```js
Number(months)
```

và:

```js
.map(Number)
```

---

### Trap 5 — Index output bắt đầu từ 1

Privacy `i` phải push:

```js
i + 1
```

---

## 8. Recall 20 giây

> **Nhận diện:** date string + mọi tháng 28 ngày → normalize thành total days.

> **Map:** `type → months`.

> **Date:** `year * 12 * 28 + month * 28 + day`.

> **Expiry:** `collectedDays + months * 28`.

> **Destroy:** `todayDays >= expiry`.

> **Output:** `i + 1`.

### Code shape

```js
const toDays = (date) => {
  const [y, m, d] = date.split(".").map(Number)
  return y * 12 * 28 + m * 28 + d
}

const termMap = new Map()

for (const term of terms) {
  const [type, months] = term.split(" ")
  termMap.set(type, Number(months))
}

for (let i = 0; i < privacies.length; i++) {
  const [date, type] = privacies[i].split(" ")

  const expiry =
    toDays(date) +
    termMap.get(type) * 28

  if (todayDays >= expiry) {
    answer.push(i + 1)
  }
}
```

## 🧠 Một câu phải khắc vào đầu

> **“Lịch giả 28 ngày/tháng → đừng cộng tháng thủ công; đổi tất cả thành totalDays rồi so `today >= collected + term*28`.”**

---

[⬆ Quay lại Navigator](#-navigator--mobile-first)


---

# Bài 19 — 문자열 압축 (Nén chuỗi)

🔗 **Đề chính thức (Programmers):** https://school.programmers.co.kr/learn/courses/30/lessons/60057

**Pattern:** Brute Force over Chunk Size + String Parsing / Simulation  
**Trigger:** `n nhỏ + thử mọi độ dài block + chỉ nén các block giống nhau liên tiếp`

---

## 1. Dịch đề tiếng Việt

Ta muốn nén một chuỗi bằng cách gom các đoạn giống nhau **liên tiếp**.

Ví dụ:

```text
aabbaccc
```

nếu cắt theo đơn vị 1 ký tự:

```text
aa bb a ccc
```

sẽ nén thành:

```text
2a2ba3c
```

Nếu một block chỉ xuất hiện 1 lần thì **không ghi số 1**.

Điểm đặc biệt của bài:

> Không nhất thiết phải cắt theo 1 ký tự.

Ta được chọn một `unit >= 1`, rồi cắt chuỗi từ **đầu chuỗi** thành các block có độ dài `unit`.

Ví dụ:

```text
ababcdcdababcdcd
```

Nếu `unit = 8`:

```text
ababcdcd | ababcdcd
```

→

```text
2ababcdcd
```

là ngắn nhất.

Nếu phần cuối không đủ `unit` ký tự thì giữ nguyên phần dư.

Mục tiêu:

> thử mọi `unit` hợp lệ và return độ dài compressed nhỏ nhất.

### Giới hạn

```text
1 <= s.length <= 1000
```

---

## 2. Phân tích 9 bước

### STEP 1 — CONTRACT

Với một `unit` cố định:

1. chia chuỗi từ trái sang phải thành các block độ dài `unit`
2. chỉ các block **kề nhau giống hệt nhau** mới được gộp
3. nếu repeat count > 1:
   ```text
   length contribution = số chữ số của count + unit
   ```
4. nếu count = 1:
   ```text
   length contribution = block.length
   ```
5. phần dư cuối cứ cộng nguyên trạng

Sau đó lấy min qua mọi `unit`.

---

### STEP 2 — BOUND

```text
n <= 1000
```

Ta có thể thử:

```text
unit = 1 ... floor(n / 2)
```

Vì nếu:

```text
unit > n/2
```

thì không thể có hai full block cùng độ dài để repeat.

Trường hợp `n = 1`:

```text
answer = 1
```

---

### STEP 3 — BRUTE FORCE

Đây chính là brute force đúng:

```text
for every possible unit
    simulate compression
```

Không cần “tối ưu” bằng sliding window hay KMP.

Vì constraint nhỏ.

---

### STEP 4 — BOTTLENECK

Điểm khó không phải chọn unit.

Điểm dễ bug là:

> Khi block hiện tại khác block trước, phải commit group cũ **trước**, rồi reset state cho block mới.

Ta cần nhớ flow:

```text
prev block
count

next block
    same?
      count++
    different?
      commit prev
      prev = next
      count = 1
```

Sau loop:

```text
commit group cuối
```

---

### STEP 5 — STATE

Với mỗi `unit`:

```js
let prev = s.slice(0, unit)
let count = 1
let compressedLength = 0
```

Hoặc build string thật, nhưng chỉ cần độ dài thì tính length trực tiếp sẽ gọn hơn.

State:

- `prev`: block đang gom
- `count`: số lần liên tiếp của `prev`
- `compressedLength`: length đã commit

---

### STEP 6 — TRANSITION

Scan các block tiếp theo:

```js
for (let i = unit; i < s.length; i += unit) {
  const current = s.slice(i, i + unit)

  if (current === prev) {
    count++
  } else {
    compressedLength +=
      (count > 1 ? String(count).length : 0) +
      prev.length

    prev = current
    count = 1
  }
}
```

Sau loop phải commit group cuối:

```js
compressedLength +=
  (count > 1 ? String(count).length : 0) +
  prev.length
```

---

### STEP 7 — INVARIANT

Trong lúc scan một `unit`:

> `prev` là block của group hiện tại chưa commit.

> `count` là số block `prev` liên tiếp đã thấy.

> `compressedLength` chỉ chứa các group đã đóng trước đó.

---

### STEP 8 — PATTERN

**Pattern:** Brute Force on parameter + Run-Length Encoding over chunks.

Dấu hiệu:

- hỏi giá trị tốt nhất qua mọi “đơn vị cắt”
- parameter range nhỏ
- với mỗi parameter, mô phỏng tuyến tính
- cần gom các run liên tiếp giống nhau

Trigger sentence:

> “n nhỏ, unit là parameter hữu hạn → thử hết unit; bên trong chỉ RLE các chunk kề nhau.”

---

### STEP 9 — COMPLEXITY

Có khoảng:

```text
n/2
```

giá trị `unit`.

Mỗi unit scan toàn chuỗi.

Worst case:

```text
O(N²)
```

Với:

```text
N <= 1000
```

hoàn toàn ổn.

---

## 3. Dry Run — 7 cột chuyển tư duy thành code

Ví dụ:

```text
s = "aabbaccc"
unit = 1
```

Chunks:

```text
a a b b a c c c
```

| Unit | State trước | Action | Transition | Update answer? | Next | State sau |
|---|---|---|---|---|---|---|
| a | prev=a,count=1 | same | count=2 | no | b | a,2 |
| b | a,2 | different | commit `2a` | +2 | reset | b,1 |
| b | b,1 | same | count=2 | no | a | b,2 |
| a | b,2 | different | commit `2b` | +2 | reset | a,1 |
| c | a,1 | different | commit `a` | +1 | reset | c,1 |
| c | c,1 | same | count=2 | no | c | c,2 |
| c | c,2 | same | count=3 | no | end | c,3 |
| end | c,3 | commit | `3c` | +2 | done | total=7 |

---

### Dry run unit = 3

```text
s = "abcabcdede"
```

Chunks:

```text
abc | abc | ded | e
```

- `abc == abc` → count 2
- `ded != abc` → commit `2abc`
- `e != ded` → commit `ded`
- end → commit `e`

Compressed:

```text
2abcdede
```

Length:

```text
8
```

---

## 4. Bộ phim hình ảnh

Hãy tưởng tượng chọn một cái khuôn cắt:

```text
unit = 3
```

Sau đó máy chạy từ trái sang phải:

```text
[abc] [abc] [ded] [e]
```

Hai block đầu giống nhau:

```text
2abc
```

Gặp `ded` khác:

```text
commit 2abc
reset prev = ded
```

Cuối còn:

```text
e
```

thì gắn nguyên trạng.

**Câu chuyện 1 dòng**

> “Chọn một khuôn cắt, chạy từ trái sang phải, đếm run của các block giống nhau liên tiếp, commit khi block đổi.”

---

## 5. Code Skeleton Recall

```js
function solution(s) {
  const n = s.length

  if (n === 1) return 1

  let answer = n

  for (let unit = 1; unit <= Math.floor(n / 2); unit++) {
    let prev = s.slice(0, unit)
    let count = 1
    let compressedLength = 0

    for (let i = unit; i < n; i += unit) {
      const current = s.slice(i, i + unit)

      if (current === prev) {
        count++
      } else {
        compressedLength +=
          (count > 1 ? String(count).length : 0) +
          prev.length

        prev = current
        count = 1
      }
    }

    compressedLength +=
      (count > 1 ? String(count).length : 0) +
      prev.length

    answer = Math.min(answer, compressedLength)
  }

  return answer
}
```

---

## 6. 4 câu thần chú trước khi code

### LOOP LEVELS

```text
for unit
    init prev/count
    for i += unit
        compare current vs prev
        same → count++
        different → commit + reset
    commit last group
    min answer
```

### RESET WHEN

Khi:

```text
current !== prev
```

thì:

```js
prev = current
count = 1
```

### INVALIDATES WHAT

Không có “invalid window”.

Điểm đổi state là:

```text
block khác prev
```

→ group hiện tại kết thúc.

### COMMIT WHEN

Có 2 nơi:

1. Khi block đổi
2. Sau inner loop để commit group cuối

---

## 7. Trap dễ chết

### Trap 1 — Quên group cuối

Inner loop chỉ commit khi gặp block khác.

Group cuối phải commit sau loop.

---

### Trap 2 — Quên phần dư cuối

Ví dụ:

```text
abcabcdede
unit = 3
```

cuối có:

```text
e
```

`s.slice(i, i + unit)` vẫn lấy được block ngắn hơn, nên nếu code theo skeleton trên thì phần dư tự được tính.

---

### Trap 3 — Ghi `1` khi count = 1

Sai.

Chỉ count > 1 mới thêm số.

```js
count > 1 ? String(count).length : 0
```

---

### Trap 4 — Chỉ cộng 1 ký tự cho count

Nếu:

```text
count = 12
```

thì prefix `"12"` có length 2.

Phải:

```js
String(count).length
```

---

### Trap 5 — Cho phép cắt lệch từ giữa

Không được.

Luôn cắt từ đầu:

```text
0, unit, 2*unit, ...
```

Ví dụ #5 nhấn mạnh điều này.

---

### Trap 6 — Thử unit tới n cũng không sai logic, nhưng thừa

Chỉ cần:

```js
unit <= Math.floor(n / 2)
```

vì unit lớn hơn không thể tạo repeat từ 2 block.

---

## 8. Recall 20 giây

> **Nhận diện:** thử mọi chunk size + compress consecutive equal chunks → brute force parameter + RLE.

> **Outer:** `unit = 1..floor(n/2)`.

> **State:** `prev`, `count`, `compressedLength`.

> **Same:** `count++`.

> **Different:** commit group cũ → `prev=current`, `count=1`.

> **Sau inner loop:** commit group cuối.

> **Count prefix:** chỉ nếu `count > 1`, length là `String(count).length`.

> **Complexity:** O(N²), N≤1000 nên ổn.

### Code shape

```js
for (let unit = 1; unit <= n / 2; unit++) {
  let prev = s.slice(0, unit)
  let count = 1
  let len = 0

  for (let i = unit; i < n; i += unit) {
    const cur = s.slice(i, i + unit)

    if (cur === prev) {
      count++
    } else {
      len +=
        (count > 1 ? String(count).length : 0) +
        prev.length

      prev = cur
      count = 1
    }
  }

  len +=
    (count > 1 ? String(count).length : 0) +
    prev.length

  answer = Math.min(answer, len)
}
```

## 🧠 Một câu phải khắc vào đầu

> **“Thử từng unit; cùng block thì count++, khác block thì commit group cũ và reset; cuối loop nhớ commit lần cuối.”**

---

[⬆ Quay lại Navigator](#-navigator--mobile-first)


---

# Bài 20 — 더 맵게 (Trộn đồ cay hơn)

🔗 **Đề chính thức (Programmers):** https://school.programmers.co.kr/learn/courses/30/lessons/42626

**Pattern:** Min-Heap / Priority Queue  
**Trigger:** `lặp đi lặp lại: lấy 2 phần tử nhỏ nhất hiện tại → tạo phần tử mới → đưa ngược vào tập`

---

## 1. Dịch đề tiếng Việt

Leo muốn tất cả món ăn có chỉ số Scoville ít nhất là `K`.

Mỗi lần, Leo lấy **hai món ít cay nhất hiện tại**:

```text
first = nhỏ nhất
second = nhỏ thứ hai
```

rồi trộn:

```text
mixed = first + second * 2
```

Sau đó món mới lại được đưa vào tập thức ăn.

Lặp cho đến khi:

```text
mọi món >= K
```

Hãy trả về số lần trộn ít nhất.

Nếu không thể đạt được thì return:

```text
-1
```

Ví dụ:

```js
scoville = [1,2,3,9,10,12]
K = 7
```

Lần 1:

```text
1 + 2*2 = 5
```

Tập mới:

```text
[3,5,9,10,12]
```

Lần 2:

```text
3 + 5*2 = 13
```

Tập mới:

```text
[9,10,12,13]
```

Tất cả >= 7.

Kết quả:

```text
2
```

---

## 2. Phân tích 9 bước

### STEP 1 — CONTRACT

Mỗi vòng bắt buộc lấy:

```text
2 phần tử nhỏ nhất HIỆN TẠI
```

Không phải 2 phần tử nhỏ nhất ban đầu.

Sau khi tạo `mixed`, phải đưa nó quay lại tập.

**Một câu chốt**

> Khi mỗi vòng đều cần min hiện tại và có insert động, nghĩ ngay đến Min-Heap.

---

### STEP 2 — BOUND

```text
N <= 1,000,000
```

Nếu mỗi vòng sort lại:

```text
O(N log N) mỗi vòng
```

quá chậm.

Cần:

```text
pop min: O(log N)
push: O(log N)
peek min: O(1)
```

→ Min-Heap.

---

### STEP 3 — BRUTE FORCE

Cách ngây thơ:

```text
while min < K:
    sort array
    shift 2 phần tử
    push mixed
```

Vấn đề:

```text
sort lại liên tục
```

rất tốn.

---

### STEP 4 — BOTTLENECK

Sau mỗi lần mix:

```text
mixed
```

có thể nằm ở bất kỳ vị trí nào nếu array được sort.

Ta cần data structure duy trì:

```text
phần tử nhỏ nhất
```

sau insert/delete động.

→ Priority Queue / Min-Heap.

---

### STEP 5 — STATE

Cần:

```js
heap
count
```

Trong heap là tất cả giá trị Scoville hiện tại.

Ta chỉ cần nhìn:

```js
heap.peek()
```

để biết đã đạt mục tiêu chưa.

---

### STEP 6 — TRANSITION

Trong khi min hiện tại còn `< K`:

```js
while (heap.peek() < K) {
```

Trước tiên phải đảm bảo còn ít nhất 2 phần tử:

```js
if (heap.size() < 2) return -1
```

Sau đó:

```js
const first = heap.pop()
const second = heap.pop()

const mixed = first + second * 2

heap.push(mixed)
count++
```

---

### STEP 7 — INVARIANT

Trước mỗi vòng:

> Heap chứa chính xác toàn bộ giá trị Scoville hiện tại.

> `heap.peek()` luôn là giá trị nhỏ nhất hiện tại.

Do đó:

```text
heap.peek() >= K
```

suy ra:

```text
mọi phần tử >= K
```

không cần scan toàn heap.

---

### STEP 8 — PATTERN

**Pattern:** Priority Queue / Min-Heap.

Dấu hiệu nhận diện:

- lặp nhiều lần
- mỗi vòng lấy smallest/largest hiện tại
- xóa phần tử
- tạo phần tử mới
- insert ngược lại
- dữ liệu thay đổi động

Trigger sentence:

> “Repeatedly take current min/max + push new value → Heap.”

Các bài họ hàng:

- combine ropes
- merge files
- scheduling với min/max ưu tiên
- top K động
- Dijkstra cũng dùng min-heap, nhưng mục đích khác.

---

### STEP 9 — COMPLEXITY

Mỗi lần mix:

```text
2 pop + 1 push
```

mỗi thao tác:

```text
O(log N)
```

Tối đa khoảng `N-1` lần mix.

Tổng:

```text
O(N log N)
```

Space:

```text
O(N)
```

---

## 3. Dry Run — 7 cột chuyển tư duy thành code

```js
scoville = [1,2,3,9,10,12]
K = 7
```

| Unit | State trước | Action | Transition | Update answer? | Next | State sau |
|---|---|---|---|---|---|---|
| loop 1 | min=1 | pop 1,2 | mixed=5, push 5 | count=1 | check min | `[3,5,9,10,12]` |
| loop 2 | min=3 | pop 3,5 | mixed=13, push 13 | count=2 | check min | `[9,10,12,13]` |
| stop | min=9 | `9>=7` | done | return 2 | end | - |

---

### Dry run impossible

```js
scoville = [1,1]
K = 100
```

Mix:

```text
1 + 1*2 = 3
```

Heap:

```text
[3]
```

Min vẫn `< 100`, nhưng:

```text
size = 1
```

không còn 2 món để trộn.

→ `-1`.

---

## 4. Bộ phim hình ảnh

Hãy tưởng tượng heap là một cái máy luôn đặt món ít cay nhất lên trên cùng.

```text
        1
      /   \
     2     3
    / \   /
   9  10 12
```

Lấy:

```text
1
2
```

trộn thành:

```text
5
```

ném `5` lại vào máy.

Máy tự sắp để min mới lại lên đầu.

**Câu chuyện 1 dòng**

> “Cứ lấy hai thằng bé nhất, trộn, ném kết quả lại vào heap, nhìn min mới.”

---

## 5. Code Skeleton Recall

### MinHeap tối thiểu cho JS

```js
class MinHeap {
  constructor() {
    this.heap = []
  }

  size() {
    return this.heap.length
  }

  peek() {
    return this.heap[0]
  }

  push(value) {
    this.heap.push(value)

    let i = this.heap.length - 1

    while (i > 0) {
      const parent = Math.floor((i - 1) / 2)

      if (this.heap[parent] <= this.heap[i]) {
        break
      }

      ;[this.heap[parent], this.heap[i]] = [
        this.heap[i],
        this.heap[parent],
      ]

      i = parent
    }
  }

  pop() {
    if (this.heap.length === 1) {
      return this.heap.pop()
    }

    const root = this.heap[0]
    this.heap[0] = this.heap.pop()

    let i = 0

    while (true) {
      const left = i * 2 + 1
      const right = i * 2 + 2
      let smallest = i

      if (
        left < this.heap.length &&
        this.heap[left] < this.heap[smallest]
      ) {
        smallest = left
      }

      if (
        right < this.heap.length &&
        this.heap[right] < this.heap[smallest]
      ) {
        smallest = right
      }

      if (smallest === i) {
        break
      }

      ;[this.heap[i], this.heap[smallest]] = [
        this.heap[smallest],
        this.heap[i],
      ]

      i = smallest
    }

    return root
  }
}
```

### Solution

```js
function solution(scoville, K) {
  const heap = new MinHeap()

  for (const value of scoville) {
    heap.push(value)
  }

  let count = 0

  while (heap.peek() < K) {
    if (heap.size() < 2) {
      return -1
    }

    const first = heap.pop()
    const second = heap.pop()

    heap.push(first + second * 2)
    count++
  }

  return count
}
```

---

## 6. 4 câu thần chú trước khi code

### LOOP LEVELS

```text
build heap

while min < K
    if size < 2 → -1
    pop min
    pop second min
    mix
    push
    count++
```

### RESET WHEN

Không reset heap.

Heap là trạng thái hiện tại của toàn bộ tập thức ăn.

### INVALIDATES WHAT

Nếu:

```text
heap.peek() < K
```

nhưng:

```text
heap.size() < 2
```

→ không thể tiếp tục → `-1`.

### COMMIT WHEN

Mỗi lần mix thành công:

```js
count++
```

Và chỉ dừng khi:

```js
heap.peek() >= K
```

---

## 7. Trap dễ chết

### Trap 1 — Sort một lần rồi two pointers

Sai.

Sau mỗi mix có phần tử mới:

```text
mixed
```

cần được tái chèn đúng vị trí ưu tiên.

---

### Trap 2 — Sort lại mỗi vòng

Logic có thể đúng nhưng với:

```text
N = 1,000,000
```

rất nguy hiểm về performance.

---

### Trap 3 — Check impossible quá muộn

Nếu min < K mà heap chỉ còn 1 phần tử:

```js
return -1
```

ngay.

---

### Trap 4 — Sai công thức

Đúng:

```js
first + second * 2
```

không phải:

```js
(first + second) * 2
```

---

### Trap 5 — Check tất cả phần tử mỗi vòng

Không cần.

Nếu heap là min-heap:

```js
heap.peek() >= K
```

thì chắc chắn tất cả phần tử đều >= K.

---

### Trap 6 — Quên heap trong JS thường phải tự cài

Programmers JavaScript không có built-in `PriorityQueue`.

Cần thuộc một MinHeap tối thiểu hoặc template đã luyện.

---

## 8. Recall 20 giây

> **Nhận diện:** repeatedly take 2 current minimums + insert new value → Min-Heap.

> **State:** `heap`, `count`.

> **Stop:** `heap.peek() >= K`.

> **Impossible:** min < K nhưng `heap.size() < 2` → `-1`.

> **Transition:** `a=pop()`, `b=pop()`, `push(a + 2*b)`, `count++`.

> **Complexity:** O(N log N).

### Code shape

```js
while (heap.peek() < K) {
  if (heap.size() < 2) {
    return -1
  }

  const a = heap.pop()
  const b = heap.pop()

  heap.push(a + b * 2)
  count++
}
```

## 🧠 Một câu phải khắc vào đầu

> **“Mỗi vòng cần 2 min hiện tại và lại insert kết quả → Min-Heap; min đạt K thì tất cả đạt K.”**

---

[⬆ Quay lại Navigator](#-navigator--mobile-first)


---

# Bài 21 — 디스크 컨트롤러 (Disk Controller)

🔗 **Đề chính thức (Programmers):** https://school.programmers.co.kr/learn/courses/30/lessons/42627

**Pattern:** Sort by Request Time + Min-Heap / Priority Queue + Event Simulation  
**Trigger:** `job đến theo thời gian + chỉ chọn trong những job đã tới + chọn duration ngắn nhất + hệ thống có thể idle`

---

## 1. Dịch đề tiếng Việt

Ổ cứng chỉ xử lý **một job tại một thời điểm**.

Mỗi job có:

```text
[requestTime, duration]
```

Khi ổ cứng rảnh:

- chỉ các job đã request rồi mới được đưa vào waiting queue
- trong waiting queue, ưu tiên theo:
  1. `duration` nhỏ hơn
  2. nếu bằng nhau, `requestTime` nhỏ hơn
  3. nếu vẫn bằng nhau, `job index` nhỏ hơn

Một khi bắt đầu job thì phải chạy tới khi xong, không preempt.

Turnaround time:

```text
finishTime - requestTime
```

Mục tiêu:

> tính phần nguyên của turnaround time trung bình.

---

## 2. Phân tích 9 bước

### STEP 1 — CONTRACT

Input:

```text
jobs[i] = [requestTime, duration]
```

Cần trả về:

```text
Math.floor(
  totalTurnaround / jobs.length
)
```

### STEP 2 — BOUND

```text
N <= 500
requestTime <= 1000
duration <= 1000
```

Performance không căng, nhưng implementation phải đúng rule priority và idle gap.

### STEP 3 — BRUTE FORCE

Có thể mỗi lần disk rảnh:

- scan toàn bộ jobs chưa xử lý
- tìm các job đã tới
- chọn job ưu tiên cao nhất

Với N=500 vẫn có thể qua, nhưng code vừa rối vừa O(N²).

Heap cho control-flow rõ hơn.

### STEP 4 — BOTTLENECK

Có 2 timeline:

```text
1. jobs chưa tới
2. jobs đã tới và đang chờ
```

Ta cần:

- sort jobs theo request time để biết job nào tiếp theo sẽ tới
- heap giữ đúng waiting queue hiện tại

Điểm cực quan trọng:

> **không được push job chưa tới vào heap.**

Nếu làm vậy, heap có thể chọn một job duration ngắn dù requestTime còn ở tương lai.

---

### STEP 5 — STATE

Mỗi job giữ:

```js
{
  request,
  duration,
  index
}
```

State chính:

```js
sortedJobs
nextIndex
currentTime
totalTurnaround
completed
minHeap
```

Heap comparator đúng spec:

```text
duration
→ requestTime
→ originalIndex
```

---

### STEP 6 — TRANSITION

Loop tới khi hoàn thành hết jobs.

#### A. Đưa mọi job đã tới vào heap

```js
while (
  nextIndex < jobs.length &&
  jobs[nextIndex].request <= currentTime
) {
  heap.push(jobs[nextIndex])
  nextIndex++
}
```

#### B. Nếu heap có job

Pop job ưu tiên cao nhất:

```js
const job = heap.pop()
```

Chạy tới xong:

```js
currentTime += job.duration
```

Turnaround:

```js
totalTurnaround += currentTime - job.request
```

#### C. Nếu heap rỗng

Disk idle.

Không tick từng ms.

Jump thẳng:

```js
currentTime = jobs[nextIndex].request
```

Sau đó loop lại để push job vừa tới.

---

### STEP 7 — INVARIANT

Trước mỗi lần pop heap:

> Heap chứa **tất cả và chỉ** những job đã request nhưng chưa xử lý.

Và:

> Root heap là job có priority cao nhất theo `duration → request → index`.

---

### STEP 8 — PATTERN

**Pattern:** Event Simulation + Priority Queue.

Dấu hiệu:

- entities arrive over time
- chỉ chọn among currently available
- priority changes dynamically because new jobs arrive
- machine can become idle
- when idle, next meaningful time is next event

Trigger sentence:

> “Sort arrivals, heap available jobs, jump over idle time.”

---

### STEP 9 — COMPLEXITY

Sort:

```text
O(N log N)
```

Mỗi job push/pop heap đúng 1 lần:

```text
O(N log N)
```

Total:

```text
O(N log N)
```

Space:

```text
O(N)
```

---

## 3. Dry Run — 7 cột chuyển tư duy thành code

```js
jobs = [[0,3], [1,9], [3,5]]
```

Gắn index:

```text
0: [0,3]
1: [1,9]
2: [3,5]
```

| Time trước | Jobs mới vào heap | Heap chọn | Time sau | Turnaround thêm | Completed |
|---:|---|---|---:|---:|---:|
| 0 | job0 | job0 dur=3 | 3 | `3-0=3` | 1 |
| 3 | job1, job2 | job2 dur=5 | 8 | `8-3=5` | 2 |
| 8 | none | job1 dur=9 | 17 | `17-1=16` | 3 |

Total:

```text
3 + 5 + 16 = 24
```

Average:

```text
24 / 3 = 8
```

---

### Dry run idle gap

```js
jobs = [[5,2]]
```

Ban đầu:

```text
currentTime = 0
heap = []
```

Không có job nào request <= 0.

Heap rỗng → jump:

```text
currentTime = 5
```

Push job.

Run tới:

```text
7
```

Turnaround:

```text
7 - 5 = 2
```

---

## 4. Bộ phim hình ảnh

Hãy tưởng tượng có 2 khu vực:

```text
FUTURE JOBS
(sorted by request time)

        ↓ request <= currentTime

WAITING ROOM
(min-heap by duration/request/index)

        ↓ pop best job

DISK
(run to completion)
```

Nếu waiting room rỗng:

```text
không ngồi đếm từng ms
→ nhảy thẳng tới thời điểm job tiếp theo đến
```

---

## 5. Code Skeleton Recall

### MinHeap generic comparator

```js
class MinHeap {
  constructor(compare) {
    this.heap = []
    this.compare = compare
  }

  size() {
    return this.heap.length
  }

  push(value) {
    this.heap.push(value)
    let i = this.heap.length - 1

    while (i > 0) {
      const parent = Math.floor((i - 1) / 2)

      if (
        this.compare(
          this.heap[parent],
          this.heap[i]
        ) <= 0
      ) {
        break
      }

      ;[this.heap[parent], this.heap[i]] = [
        this.heap[i],
        this.heap[parent],
      ]

      i = parent
    }
  }

  pop() {
    if (this.heap.length === 1) {
      return this.heap.pop()
    }

    const root = this.heap[0]
    this.heap[0] = this.heap.pop()

    let i = 0

    while (true) {
      const left = i * 2 + 1
      const right = i * 2 + 2
      let best = i

      if (
        left < this.heap.length &&
        this.compare(
          this.heap[left],
          this.heap[best]
        ) < 0
      ) {
        best = left
      }

      if (
        right < this.heap.length &&
        this.compare(
          this.heap[right],
          this.heap[best]
        ) < 0
      ) {
        best = right
      }

      if (best === i) break

      ;[this.heap[i], this.heap[best]] = [
        this.heap[best],
        this.heap[i],
      ]

      i = best
    }

    return root
  }
}
```

### Solution

```js
function solution(jobs) {
  const sorted = jobs
    .map(([request, duration], index) => ({
      request,
      duration,
      index,
    }))
    .sort(
      (a, b) =>
        a.request - b.request ||
        a.index - b.index
    )

  const heap = new MinHeap(
    (a, b) =>
      a.duration - b.duration ||
      a.request - b.request ||
      a.index - b.index
  )

  let nextIndex = 0
  let currentTime = 0
  let completed = 0
  let totalTurnaround = 0

  while (completed < sorted.length) {
    while (
      nextIndex < sorted.length &&
      sorted[nextIndex].request <= currentTime
    ) {
      heap.push(sorted[nextIndex])
      nextIndex++
    }

    if (heap.size() > 0) {
      const job = heap.pop()

      currentTime += job.duration
      totalTurnaround +=
        currentTime - job.request

      completed++
    } else {
      currentTime =
        sorted[nextIndex].request
    }
  }

  return Math.floor(
    totalTurnaround / sorted.length
  )
}
```

---

## 6. 4 câu thần chú trước khi code

### LOOP LEVELS

```text
while completed < N
    while jobs arrived <= currentTime
        push heap

    if heap not empty
        pop + run + commit turnaround
    else
        jump time to next request
```

### RESET WHEN

Không reset heap.

`nextIndex` chỉ tăng.

`currentTime` chỉ tăng hoặc jump về phía trước.

### INVALIDATES WHAT

Không được đưa job vào heap nếu:

```text
requestTime > currentTime
```

Nó chưa tồn tại trong waiting queue.

### COMMIT WHEN

Khi job chạy xong:

```js
currentTime += duration
totalTurnaround +=
  currentTime - request
completed++
```

---

## 7. Trap dễ chết

### Trap 1 — Push tất cả jobs vào heap ngay từ đầu

Sai spec.

Job chưa tới không được cạnh tranh priority.

---

### Trap 2 — Comparator thiếu tie-break

Spec mới nêu rõ:

```text
duration
→ requestTime
→ job number
```

Heap comparator phải phản ánh đủ 3 tầng.

---

### Trap 3 — Tick từng ms khi idle

Không cần.

Nếu heap rỗng:

```js
currentTime = sorted[nextIndex].request
```

---

### Trap 4 — Dùng `currentTime - request` trước khi cộng duration

Turnaround tính lúc job **kết thúc**.

Phải:

```js
currentTime += duration
total += currentTime - request
```

---

### Trap 5 — Quên jobs đến đúng lúc job vừa kết thúc

Nếu job mới có:

```text
request === currentTime
```

thì phải được push vào heap **trước khi chọn job tiếp theo**.

Điều kiện đúng:

```js
request <= currentTime
```

---

### Trap 6 — Chỉ sort jobs theo duration

Sai.

Sort ngoài chỉ để stream theo request time.

Priority duration chỉ áp dụng trong heap của các job **đã tới**.

---

## 8. Recall 20 giây

> **Nhận diện:** jobs arrive over time + choose shortest among arrived → sort arrivals + min-heap.

> **Heap comparator:** `duration → request → index`.

> **Push condition:** `request <= currentTime`.

> **Run job:** `currentTime += duration`.

> **Turnaround:** `currentTime - request`.

> **Heap empty:** jump `currentTime` tới next request.

> **Complexity:** O(N log N).

### Code shape

```js
while (completed < N) {
  while (
    next < N &&
    jobs[next].request <= time
  ) {
    heap.push(jobs[next++])
  }

  if (heap.size()) {
    const job = heap.pop()

    time += job.duration
    total += time - job.request
    completed++
  } else {
    time = jobs[next].request
  }
}
```

## 🧠 Một câu phải khắc vào đầu

> **“Sort job theo lúc đến; heap chỉ chứa job đã đến; chọn duration ngắn nhất; heap rỗng thì nhảy thời gian tới event tiếp theo.”**

---

[⬆ Quay lại Navigator](#-navigator--mobile-first)

---

# Bài 22 — 피로도 (Mệt mỏi / Dungeons)

🔗 **Đề chính thức (Programmers):** https://school.programmers.co.kr/learn/courses/30/lessons/87946

**Pattern:** DFS / Backtracking / Permutation  
**Trigger:** `N cực nhỏ (<= 8) + thứ tự chọn ảnh hưởng kết quả + muốn maximize số phần tử có thể chọn`

---

## 1. Dịch đề tiếng Việt

Người chơi có một lượng **thể lực hiện tại `k`**.

Mỗi dungeon có:

```text
[minRequired, cost]
```

Trong đó:

- `minRequired`: thể lực tối thiểu phải có **trước khi vào**
- `cost`: thể lực bị trừ **sau khi hoàn thành**

Ví dụ:

```text
[80, 20]
```

nghĩa là:

- phải có ít nhất `80` thể lực mới được vào
- vào xong mất `20`

Mỗi dungeon chỉ được đi tối đa một lần.

Hãy tìm **số dungeon tối đa** có thể khám phá.

### Giới hạn quan trọng nhất

```text
1 <= dungeons.length <= 8
```

Đây chính là tín hiệu:

> **Thử các thứ tự bằng DFS / backtracking là hoàn toàn đủ nhanh.**

---

## 2. Phân tích 9 bước

### STEP 1 — CONTRACT

State hiện tại gồm:

```text
fatigue
visited
count
```

Tại mỗi bước, ta được chọn bất kỳ dungeon chưa dùng nào nếu:

```text
fatigue >= minRequired
```

Sau khi đi:

```text
nextFatigue = fatigue - cost
```

Mục tiêu:

```text
maximize count
```

---

### STEP 2 — BOUND

```text
N <= 8
```

Nếu thử mọi thứ tự:

```text
8! = 40,320
```

Rất nhỏ.

Recursion depth tối đa:

```text
8
```

→ JavaScript an toàn, không có nguy cơ stack overflow thực tế.

---

### STEP 3 — BRUTE FORCE

Brute force đúng chính là:

```text
thử mọi thứ tự dungeon
```

Nhưng ta không cần generate permutation trước.

Ta DFS trực tiếp:

```text
ở mỗi state
→ thử mọi dungeon chưa dùng và hiện tại đủ điều kiện
```

Nhánh nào không đi được thì bỏ.

---

### STEP 4 — BOTTLENECK

Không có greedy đơn giản nào đảm bảo đúng.

Ví dụ:

```text
dungeon A cần cao nhưng cost thấp
dungeon B cần thấp nhưng cost cao
```

Chọn sai thứ tự có thể làm mất cơ hội vào dungeon khác.

Do:

```text
order matters
N tiny
```

→ DFS / permutation.

---

### STEP 5 — STATE

```js
const visited = Array(dungeons.length).fill(false)
let answer = 0
```

DFS parameters:

```js
dfs(fatigue, count)
```

`visited` giữ dungeon nào đã đi.

---

### STEP 6 — TRANSITION

Trong DFS:

```js
for (let i = 0; i < dungeons.length; i++) {
```

Skip nếu đã đi:

```js
if (visited[i]) continue
```

Skip nếu không đủ thể lực tối thiểu:

```js
if (fatigue < dungeons[i][0]) continue
```

Nếu đi được:

```js
visited[i] = true

dfs(
  fatigue - dungeons[i][1],
  count + 1
)

visited[i] = false
```

Đây chính là backtracking:

```text
CHOOSE → EXPLORE → UNCHOOSE
```

---

### STEP 7 — INVARIANT

Khi gọi:

```js
dfs(fatigue, count)
```

thì:

- `fatigue` là thể lực còn lại sau đúng `count` dungeon đã đi
- `visited[i] === true` iff dungeon i đã nằm trong path hiện tại
- mọi dungeon trong path đều được đi trong một thứ tự hợp lệ

---

### STEP 8 — PATTERN

**Pattern:** DFS / Backtracking / Permutation search.

Dấu hiệu:

- N cực nhỏ: thường `<= 8`, `<= 10`
- thứ tự chọn ảnh hưởng kết quả
- mỗi item dùng tối đa một lần
- hỏi max/min qua mọi sequence
- không có greedy obvious

Trigger sentence:

> **“N <= 8 + order matters + each used once → DFS/backtracking permutation.”**

---

### STEP 9 — COMPLEXITY

Worst case mọi dungeon đều đi được:

```text
O(N!)
```

với:

```text
N <= 8
```

→ tối đa khoảng `40,320` full permutations.

Thực tế DFS có thêm các partial paths, vẫn rất nhỏ.

Space:

```text
O(N)
```

cho recursion + visited.

---

## 3. Dry Run — 7 cột chuyển tư duy thành code

```js
k = 80
dungeons = [
  [80,20],
  [50,40],
  [30,10]
]
```

Một nhánh:

| State trước | Choice | Check | Transition | Count | Backtrack |
|---|---|---|---|---:|---|
| fatigue=80 | dungeon 0 | `80>=80` | fatigue=60 | 1 | sau recursion |
| fatigue=60 | dungeon 2 | `60>=30` | fatigue=50 | 2 | sau recursion |
| fatigue=50 | dungeon 1 | `50>=50` | fatigue=10 | 3 | sau recursion |

→ `answer = 3`

Nhánh khác:

```text
0 → 1
```

sau đó fatigue = 20, không vào được dungeon 2.

Nhưng DFS không kết luận sớm từ nhánh xấu đó; nó backtrack và thử nhánh khác.

---

## 4. Bộ phim hình ảnh

Tưởng tượng đứng trước nhiều cánh cửa dungeon.

Tại mỗi state:

```text
fatigue hiện tại
↓
nhìn toàn bộ dungeon chưa đi
↓
dungeon nào đủ minRequired?
↓
chọn 1 cái
↓
visited = true
fatigue -= cost
↓
đi sâu tiếp
↓
quay lại
visited = false
```

**Câu chuyện 1 dòng**

> “Thử một dungeon → đi sâu → quay về trả lại visited → thử dungeon khác.”

---

## 5. Code Skeleton Recall

```js
function solution(k, dungeons) {
  const visited =
    Array(dungeons.length).fill(false)

  let answer = 0

  function dfs(fatigue, count) {
    answer = Math.max(answer, count)

    for (let i = 0; i < dungeons.length; i++) {
      if (visited[i]) continue

      const [required, cost] = dungeons[i]

      if (fatigue < required) continue

      visited[i] = true

      dfs(
        fatigue - cost,
        count + 1
      )

      visited[i] = false
    }
  }

  dfs(k, 0)

  return answer
}
```

---

## 6. 4 câu thần chú trước khi code

### LOOP LEVELS

```text
dfs(state)
    for every candidate
        if usable
            choose
            dfs(nextState)
            unchoose
```

### RESET WHEN

Sau khi recursion quay về:

```js
visited[i] = false
```

Đây là dòng **không được quên**.

### INVALIDATES WHAT

Candidate không hợp lệ nếu:

```js
visited[i]
```

hoặc:

```js
fatigue < required
```

### COMMIT WHEN

Mỗi state đều có thể là đáp án tốt nhất hiện tại:

```js
answer = Math.max(answer, count)
```

Không cần chờ tới leaf mới update.

---

## 7. Trap dễ chết

### Trap 1 — Greedy sort theo required hoặc cost

Không đảm bảo đúng.

Bài này cố tình có:

```text
order matters
N <= 8
```

→ brute-force thứ tự.

### Trap 2 — Trừ `required`

Sai.

`required` chỉ là điều kiện vào.

Sau khi đi phải trừ:

```js
cost
```

### Trap 3 — Quên backtrack

Sai:

```js
visited[i] = true
dfs(...)
```

mà không trả lại false.

Đúng:

```js
visited[i] = true
dfs(...)
visited[i] = false
```

### Trap 4 — Dùng `fatigue > required`

Nếu bằng đúng required vẫn được vào.

Phải:

```js
fatigue >= required
```

### Trap 5 — Generate toàn bộ permutation rồi mới check

Có thể đúng nhưng thừa code và memory.

DFS trực tiếp chỉ mở các nhánh hợp lệ sẽ sạch hơn.

### Trap 6 — Lo recursion của JS

Bài này recursion depth tối đa 8.

An toàn.

---

## 8. Recall 20 giây

> **Nhận diện:** `N <= 8`, order matters, each used once, maximize count → DFS/backtracking.

> **State:** `fatigue`, `count`, `visited`.

> **Candidate:** chưa visited và `fatigue >= required`.

> **Transition:** `dfs(fatigue - cost, count + 1)`.

> **Backtrack:** `visited[i] = false`.

> **Commit:** `answer = max(answer, count)`.

> **Complexity:** O(N!), N<=8.

### Code shape

```js
function dfs(fatigue, count) {
  answer = Math.max(answer, count)

  for (let i = 0; i < n; i++) {
    if (visited[i]) continue

    const [required, cost] = dungeons[i]
    if (fatigue < required) continue

    visited[i] = true
    dfs(fatigue - cost, count + 1)
    visited[i] = false
  }
}
```

## 🧠 Một câu phải khắc vào đầu

> **“N <= 8 + thứ tự ảnh hưởng → DFS; mỗi lựa chọn là CHOOSE → EXPLORE → UNCHOOSE.”**

---

[⬆ Quay lại INDEX](00_PCCP_FINAL_INDEX.md)

---

# Bài 23 — 타겟 넘버 (Target Number)

🔗 **Đề chính thức (Programmers):** https://school.programmers.co.kr/learn/courses/30/lessons/43165

**Pattern:** DFS / Binary Choice Tree / Exhaustive Search  
**Trigger:** `mỗi phần tử có đúng 2 lựa chọn (+ hoặc -) + n <= 20 + hỏi số cách`

---

## 1. Dịch đề tiếng Việt

Có một mảng số nguyên không âm `numbers`.

Ta phải giữ nguyên thứ tự các số, và trước mỗi số chọn một trong hai dấu:

```text
+
-
```

sao cho tổng cuối cùng bằng `target`.

Ví dụ:

```text
numbers = [1,1,1,1,1]
target = 3
```

có 5 cách.

Mục tiêu:

> return số cách gán dấu `+/-` để tạo ra `target`.

### Giới hạn quan trọng

```text
2 <= numbers.length <= 20
```

Mỗi index có 2 lựa chọn:

```text
2^20 = 1,048,576
```

→ DFS brute force hoàn toàn chạy được.

---

## 2. Phân tích 9 bước

### STEP 1 — CONTRACT

Tại index `i`:

```text
sum + numbers[i]
sum - numbers[i]
```

Khi:

```js
index === numbers.length
```

nếu:

```js
sum === target
```

thì tìm được 1 cách.

---

### STEP 2 — BOUND

```text
N <= 20
```

State tree tối đa khoảng:

```text
2^(N+1)
```

xấp xỉ 2 triệu node.

Recursion depth tối đa:

```text
20
```

→ JavaScript an toàn.

---

### STEP 3 — BRUTE FORCE

Brute force đúng:

```text
với mỗi số
    thử +
    thử -
```

Đây là binary decision tree.

Không cần permutation vì thứ tự numbers không đổi.

---

### STEP 4 — BOTTLENECK

Điểm dễ nhầm:

> Không chọn “dùng hay không dùng” số.

Mọi số đều phải dùng đúng một lần.

Ta chỉ chọn dấu:

```text
+ hoặc -
```

---

### STEP 5 — STATE

DFS state:

```js
dfs(index, sum)
```

Trong đó:

- `index`: đang xử lý tới số nào
- `sum`: tổng tạm thời

Global/local result:

```js
let count = 0
```

---

### STEP 6 — TRANSITION

Từ state:

```js
dfs(index, sum)
```

branch 1:

```js
dfs(index + 1, sum + numbers[index])
```

branch 2:

```js
dfs(index + 1, sum - numbers[index])
```

---

### STEP 7 — INVARIANT

Khi gọi:

```js
dfs(index, sum)
```

thì:

> `sum` là tổng tạo ra sau khi đã gán dấu cho đúng `index` phần tử đầu tiên.

Các phần tử từ `index` trở đi chưa được xử lý.

---

### STEP 8 — PATTERN

**Pattern:** DFS / Binary Choice Tree.

Dấu hiệu:

- mỗi bước có số lựa chọn cố định rất nhỏ
- phải thử mọi combination quyết định
- N đủ nhỏ để `2^N`
- hỏi **count number of ways**

Trigger sentence:

> **“Mỗi phần tử có 2 choice, n<=20 → DFS nhị phân.”**

---

### STEP 9 — COMPLEXITY

Time:

```text
O(2^N)
```

Space:

```text
O(N)
```

do recursion depth.

Với N=20: an toàn.

---

## 3. Dry Run — 7 cột chuyển tư duy thành code

Ví dụ nhỏ:

```js
numbers = [1, 2]
target = 1
```

Cây:

```text
dfs(0,0)
├─ +1 → dfs(1,1)
│  ├─ +2 → dfs(2,3)  ❌
│  └─ -2 → dfs(2,-1) ❌
└─ -1 → dfs(1,-1)
   ├─ +2 → dfs(2,1)  ✅ count++
   └─ -2 → dfs(2,-3) ❌
```

Kết quả:

```text
1
```

---

## 4. Bộ phim hình ảnh

Mỗi số tạo ra một ngã rẽ:

```text
          sum
         /   \
      +x       -x
      /         \
   next         next
```

Đi tới hết dãy:

```text
index === n
```

mới check:

```text
sum === target ?
```

---

## 5. Code Skeleton Recall

```js
function solution(numbers, target) {
  let count = 0

  function dfs(index, sum) {
    if (index === numbers.length) {
      if (sum === target) {
        count++
      }
      return
    }

    dfs(
      index + 1,
      sum + numbers[index]
    )

    dfs(
      index + 1,
      sum - numbers[index]
    )
  }

  dfs(0, 0)

  return count
}
```

---

## 6. 4 câu thần chú trước khi code

### LOOP LEVELS

Bài này không cần `for`.

```text
dfs(index, sum)
    branch +
    branch -
```

### RESET WHEN

Không cần `visited`.

Vì index luôn tăng và mỗi số được dùng đúng một lần theo thứ tự.

### INVALIDATES WHAT

Không có branch invalid sớm trong bản cơ bản.

Cứ đi tới:

```text
index === n
```

rồi check.

### COMMIT WHEN

Chỉ commit khi:

```js
index === numbers.length &&
sum === target
```

→ `count++`

---

## 7. Trap dễ chết

### Trap 1 — Quên base case `return`

Sau khi index == n phải return ngay.

---

### Trap 2 — Dùng `visited`

Không cần.

Khác bài Dungeons:

- Dungeons: chọn **thứ tự** dungeon → cần visited
- Target Number: thứ tự cố định → chỉ tăng index

---

### Trap 3 — Check target quá sớm

Không được thấy:

```text
sum === target
```

ở giữa chừng rồi count.

Vẫn còn số chưa dùng.

Phải check khi:

```text
index === n
```

---

### Trap 4 — Chỉ đi một branch

Mỗi số bắt buộc phải thử đủ:

```text
+
-
```

---

### Trap 5 — Nghĩ 2^20 quá lớn

```text
2^20 ≈ 1 triệu
```

là ổn.

Không cần DP cho constraint này.

---

## 8. Recall 20 giây

> **Nhận diện:** mỗi số có 2 lựa chọn +/-; n<=20; đếm số cách → DFS binary tree.

> **State:** `index`, `sum`.

> **Transition:** `+numbers[index]` và `-numbers[index]`.

> **Base:** `index === n`.

> **Commit:** `sum === target` → count++.

> **Không cần visited.**

> **Complexity:** O(2^N).

### Code shape

```js
function dfs(index, sum) {
  if (index === n) {
    if (sum === target) count++
    return
  }

  dfs(index + 1, sum + numbers[index])
  dfs(index + 1, sum - numbers[index])
}
```

## 🧠 Một câu phải khắc vào đầu

> **“Thứ tự cố định, mỗi index chỉ rẽ 2 nhánh +/−; tới cuối dãy mới check target.”**

---

[⬆ Quay lại INDEX](00_PCCP_FINAL_INDEX.md)

---

# Bài 24 — 전력망을 둘로 나누기 (Chia lưới điện)

🔗 **Đề chính thức (Programmers):** https://school.programmers.co.kr/learn/courses/30/lessons/86971

**Pattern:** Tree / Graph Traversal + Remove One Edge  
**Trigger:** `input là tree + thử bỏ đúng 1 edge + cần biết kích thước 2 component`

---

## 1. Dịch đề tiếng Việt

Có `n` cột điện được nối với nhau bằng `n - 1` dây điện và toàn bộ mạng tạo thành **một cây (tree)**.

Ta phải:

```text
cắt đúng 1 dây
```

Sau khi cắt, tree sẽ tách thành đúng:

```text
2 component
```

Mục tiêu là làm số lượng cột điện ở hai component càng gần nhau càng tốt.

Return:

```text
|size1 - size2|
```

nhỏ nhất có thể.

### Giới hạn

```text
2 <= n <= 100
wires.length = n - 1
```

Input luôn là tree.

---

## 2. Phân tích 9 bước

### STEP 1 — CONTRACT

Với mỗi dây:

```text
[u, v]
```

ta giả sử dây này bị cắt.

Sau đó:

```text
component 1 size = count
component 2 size = n - count
```

Difference:

```text
|count - (n - count)|
```

hay:

```text
|n - 2 * count|
```

Ta lấy minimum qua mọi dây.

---

### STEP 2 — BOUND

```text
n <= 100
edges = n - 1 <= 99
```

Nếu mỗi edge ta traverse cả tree:

```text
O(N)
```

Có `N-1` edge:

```text
O(N²)
```

Tối đa khoảng:

```text
100 * 100
```

quá nhẹ.

---

### STEP 3 — BRUTE FORCE

Brute force đúng chính là:

```text
for mỗi dây
    cắt dây đó
    đếm 1 component
    tính component còn lại
    update answer
```

Không cần thuật toán phức tạp hơn.

---

### STEP 4 — BOTTLENECK

Không nên mỗi vòng:

- clone toàn bộ wires
- splice edge
- rebuild adjacency

Vẫn có thể pass vì N nhỏ, nhưng dễ code lỗi và mutate.

Cách sạch hơn:

> build adjacency **một lần**, DFS nhưng khi gặp đúng edge đang "cắt" thì skip.

---

### STEP 5 — STATE

Adjacency:

```js
graph[node] = neighbors
```

Cho mỗi cut edge:

```js
cutA
cutB
```

DFS state:

```js
dfs(node)
visited
count
```

---

### STEP 6 — TRANSITION

Build graph:

```js
for (const [a, b] of wires) {
  graph[a].push(b)
  graph[b].push(a)
}
```

Với mỗi edge `[cutA, cutB]`:

- reset `visited`
- DFS từ `cutA`
- nếu transition đang đi qua chính edge bị cắt thì skip

```js
if (
  (node === cutA && next === cutB) ||
  (node === cutB && next === cutA)
) {
  continue
}
```

Đếm số node reachable:

```js
count++
```

Sau DFS:

```js
const diff = Math.abs(
  count - (n - count)
)
```

---

### STEP 7 — INVARIANT

Trong một lần thử cắt `[cutA, cutB]`:

> DFS chỉ đi qua các edge còn tồn tại.

Do input là tree, bỏ một edge sẽ tạo đúng 2 component.

Nếu DFS từ `cutA` đếm được `count` node thì component còn lại **chắc chắn** có:

```text
n - count
```

Không cần traverse component thứ hai.

---

### STEP 8 — PATTERN

**Pattern:** Tree + Remove One Edge + Count Component.

Dấu hiệu:

- input nói rõ là tree
- thử bỏ một edge
- sau khi bỏ cần biết hai phía lớn cỡ nào
- N nhỏ

Trigger sentence:

> **“Tree + remove one edge → 2 components; traverse một phía là đủ.”**

---

### STEP 9 — COMPLEXITY

Build adjacency:

```text
O(N)
```

Có `N - 1` edge cần thử.

Mỗi lần DFS tối đa:

```text
O(N)
```

Total:

```text
O(N²)
```

Space:

```text
O(N)
```

graph thực tế `O(N)` vì tree có `N-1` edge.

### JS safety

```text
n <= 100
```

Recursion depth tối đa 100.

→ an toàn cho JavaScript.

---

## 3. Dry Run — 7 cột chuyển tư duy thành code

Ví dụ:

```js
n = 4
wires = [
  [1,2],
  [2,3],
  [3,4]
]
```

Thử cắt:

```text
[2,3]
```

Tree trở thành:

```text
1 - 2    3 - 4
```

DFS từ `2`:

```text
2 → 1
```

count:

```text
2
```

Component kia:

```text
4 - 2 = 2
```

Difference:

```text
|2 - 2| = 0
```

| Cut edge | DFS start | Count phía 1 | Count phía 2 | Diff |
|---|---:|---:|---:|---:|
| `[1,2]` | 1 | 1 | 3 | 2 |
| `[2,3]` | 2 | 2 | 2 | 0 |
| `[3,4]` | 3 | 3 | 1 | 2 |

Answer:

```text
0
```

---

## 4. Bộ phim hình ảnh

Hãy tưởng tượng một cái cây điện.

Mỗi lần:

```text
chọn 1 dây
↓
dùng kéo cắt nó
↓
đứng ở một đầu dây
↓
đếm xem từ đầu đó còn đi tới được bao nhiêu node
↓
phía kia = n - count
↓
so độ lệch
```

Không cần đếm cả hai phía.

---

## 5. Code Skeleton Recall

```js
function solution(n, wires) {
  const graph =
    Array.from({ length: n + 1 }, () => [])

  for (const [a, b] of wires) {
    graph[a].push(b)
    graph[b].push(a)
  }

  let answer = Infinity

  for (const [cutA, cutB] of wires) {
    const visited =
      Array(n + 1).fill(false)

    let count = 0

    function dfs(node) {
      visited[node] = true
      count++

      for (const next of graph[node]) {
        if (visited[next]) continue

        if (
          (node === cutA && next === cutB) ||
          (node === cutB && next === cutA)
        ) {
          continue
        }

        dfs(next)
      }
    }

    dfs(cutA)

    answer = Math.min(
      answer,
      Math.abs(count - (n - count))
    )
  }

  return answer
}
```

---

## 6. 4 câu thần chú trước khi code

### LOOP LEVELS

```text
build graph once

for each edge to cut
    reset visited/count
    DFS one side while skipping cut edge
    compute diff
    update min
```

### RESET WHEN

Mỗi edge mới:

```js
visited = fresh array
count = 0
```

### INVALIDATES WHAT

Transition invalid nếu:

```text
next đã visited
```

hoặc:

```text
(node,next) chính là cut edge
```

### COMMIT WHEN

Sau khi DFS xong một phía:

```js
answer = Math.min(
  answer,
  Math.abs(count - (n - count))
)
```

---

## 7. Trap dễ chết

### Trap 1 — Quên graph là undirected

Phải push cả hai chiều:

```js
graph[a].push(b)
graph[b].push(a)
```

---

### Trap 2 — Chỉ skip một chiều của cut edge

Sai:

```js
node === cutA && next === cutB
```

chưa đủ.

Phải skip cả:

```text
A → B
B → A
```

---

### Trap 3 — Không reset visited giữa các edge

Mỗi giả thuyết cắt dây là một traversal độc lập.

Phải tạo `visited` mới.

---

### Trap 4 — Traverse cả hai component

Không cần.

Nếu một phía có `count`:

```text
phía kia = n - count
```

---

### Trap 5 — Mutate wires/graph bằng splice

Không cần và dễ làm sai iteration.

Chỉ **skip logical edge** trong DFS.

---

### Trap 6 — Quên visited vì "tree không cycle"

Tree vô hướng vẫn có edge quay lại parent:

```text
1 → 2
2 → 1
```

Không có visited thì recursion quay ngược vô hạn.

---

## 8. Recall 20 giây

> **Nhận diện:** tree + cắt đúng 1 edge + cân bằng 2 phía.

> **Outer loop:** thử từng edge.

> **Traversal:** DFS/BFS từ một đầu, skip cut edge.

> **State:** `visited`, `count`.

> **Other side:** `n - count`.

> **Commit:** `min(abs(count - (n-count)))`.

> **Complexity:** O(N²), N<=100.

### Code shape

```js
for (const [a, b] of wires) {
  visited.fill(false)
  count = 0

  dfs(a, a, b)

  answer = Math.min(
    answer,
    Math.abs(count - (n - count))
  )
}
```

## 🧠 Một câu phải khắc vào đầu

> **“Tree cắt một edge là tách đúng hai component; DFS một phía, phía còn lại = n - count.”**

---

[⬆ Quay lại INDEX](00_PCCP_FINAL_INDEX.md)

---

# Bài 25 — 요격 시스템 (Hệ thống đánh chặn)

🔗 **Đề chính thức (Programmers):** https://school.programmers.co.kr/learn/courses/30/lessons/181188

**Pattern:** Greedy Interval / Earliest Finish Point  
**Trigger:** `nhiều khoảng trên trục số + 1 điểm có thể cover nhiều khoảng + cần ít điểm nhất`

---

## 1. Dịch đề tiếng Việt

Mỗi tên lửa tấn công chiếm một **khoảng mở**:

```text
(s, e)
```

Ta có thể bắn một tên lửa đánh chặn tại một tọa độ thực `x`.

Một phát bắn sẽ chặn được mọi target mà:

```text
s < x < e
```

Vì interval là **open interval**, bắn đúng tại:

```text
x = s
```

hoặc:

```text
x = e
```

thì **không chặn được** target đó.

Mục tiêu:

> dùng ít phát bắn nhất để cover tất cả interval.

### Giới hạn

```text
1 <= targets.length <= 500,000
```

N rất lớn → cần khoảng:

```text
O(N log N)
```

---

## 2. Phân tích 9 bước

### STEP 1 — CONTRACT

Mỗi phát bắn là một điểm `x`.

Ta cần chọn ít điểm nhất sao cho mỗi interval `(s,e)` chứa ít nhất một điểm đã chọn.

Đây là bài:

```text
minimum points to stab all intervals
```

---

### STEP 2 — BOUND

```text
N <= 500,000
```

Không được:

- so từng cặp interval
- thử candidate point theo brute force
- nested loop O(N²)

Sort một lần:

```text
O(N log N)
```

rồi scan:

```text
O(N)
```

là chuẩn.

---

### STEP 3 — BRUTE FORCE

Naive:

- chọn một target
- thử nhiều điểm bắn
- xem cover được bao nhiêu
- backtrack

Không thể với 500k interval.

---

### STEP 4 — BOTTLENECK

Câu hỏi greedy:

> Nếu buộc phải bắn để cover interval hiện tại, bắn ở đâu để cơ hội cover các interval sau lớn nhất?

Đáp án:

> **càng sát end nhỏ nhất càng tốt.**

Nên sort theo:

```text
e tăng dần
```

Interval kết thúc sớm nhất là thằng "gấp" nhất.

Ta chọn một điểm ngay trước `e`.

Trong code không cần số thực `e - epsilon`; chỉ cần lưu mốc:

```js
lastEnd = e
```

và hiểu rằng phát bắn đang nằm ở:

```text
x < e, cực sát e
```

---

### STEP 5 — STATE

Sau sort theo `end`:

```js
targets.sort((a, b) => a[1] - b[1])
```

State:

```js
count
lastEnd
```

`lastEnd` đại diện cho phát bắn gần nhất được đặt **ngay trước end này**.

---

### STEP 6 — TRANSITION

Duyệt mỗi interval:

```js
for (const [start, end] of targets)
```

Nếu:

```js
start >= lastEnd
```

thì phát bắn cũ **không nằm bên trong** interval mới.

Phải bắn thêm:

```js
count++
lastEnd = end
```

Ngược lại:

```js
start < lastEnd
```

thì điểm ngay trước `lastEnd` vẫn nằm trong interval hiện tại.

Không cần bắn thêm.

---

### STEP 7 — INVARIANT

Sau khi xử lý các interval đã duyệt:

> `count` là số phát tối thiểu cần dùng cho prefix đó.

> Phát mới nhất được đặt ngay trước `lastEnd`, với `lastEnd` là end nhỏ nhất có thể của nhóm interval đang được cover chung.

Do sort theo end tăng dần, chọn điểm gần end sớm nhất không làm mất cơ hội cover interval nào mà một điểm khác cho interval hiện tại có thể cover tốt hơn ở bên phải.

---

### STEP 8 — PATTERN

**Pattern:** Greedy Interval / Earliest Finish.

Dấu hiệu:

- nhiều interval
- muốn dùng ít điểm/tài nguyên nhất để cover chúng
- một action có thể cover nhiều interval
- interval có thứ tự trái → phải

Trigger sentence:

> **“Minimum points to hit intervals → sort by end, shoot as late as possible.”**

---

### STEP 9 — COMPLEXITY

Sort:

```text
O(N log N)
```

Scan:

```text
O(N)
```

Total:

```text
O(N log N)
```

Space phụ:

```text
O(1)
```

ngoài sort implementation.

Với:

```text
N <= 500,000
```

đây là complexity phù hợp cho JavaScript.

---

## 3. Dry Run — 7 cột chuyển tư duy thành code

Input:

```js
[
  [4,5],
  [4,8],
  [10,14],
  [11,13],
  [5,12],
  [3,7],
  [1,4]
]
```

Sort theo end:

```text
(1,4)
(4,5)
(3,7)
(4,8)
(5,12)
(11,13)
(10,14)
```

Scan:

| Interval | lastEnd trước | Check | Action | count | lastEnd sau |
|---|---:|---|---|---:|---:|
| (1,4) | -∞ | new | bắn gần 4 | 1 | 4 |
| (4,5) | 4 | `4 >= 4` | bắn mới gần 5 | 2 | 5 |
| (3,7) | 5 | `3 < 5` | dùng phát cũ | 2 | 5 |
| (4,8) | 5 | `4 < 5` | dùng phát cũ | 2 | 5 |
| (5,12) | 5 | `5 >= 5` | bắn mới gần 12 | 3 | 12 |
| (11,13) | 12 | `11 < 12` | dùng phát cũ | 3 | 12 |
| (10,14) | 12 | `10 < 12` | dùng phát cũ | 3 | 12 |

Answer:

```text
3
```

---

## 4. Vì sao phải là `start >= lastEnd`?

Đây là trap quan trọng nhất của bài.

Giả sử phát cũ được đặt:

```text
ngay trước x = 4
```

Interval mới là:

```text
(4,5)
```

Phát cũ nằm ở:

```text
x < 4
```

nên **không nằm trong (4,5)**.

Vì vậy nếu:

```text
start === lastEnd
```

vẫn phải bắn mới.

Đó là lý do condition phải là:

```js
start >= lastEnd
```

không phải:

```js
start > lastEnd
```

---

## 5. Bộ phim hình ảnh

Tưởng tượng mỗi interval là một đoạn hở:

```text
(---------)
```

Mày đi từ trái sang phải theo **điểm kết thúc sớm nhất**.

Gặp interval đầu:

```text
(------e)
```

→ đặt phát bắn sát bên trái `e`.

Sau đó tất cả interval nào vẫn bắt đầu trước mốc đó:

```text
start < lastEnd
```

đều bị phát này xuyên qua.

Khi gặp interval bắt đầu từ hoặc sau mốc:

```text
start >= lastEnd
```

→ phát cũ không còn dùng được → bắn phát mới.

---

## 6. Code Skeleton Recall

```js
function solution(targets) {
  targets.sort(
    (a, b) => a[1] - b[1]
  )

  let count = 0
  let lastEnd = -Infinity

  for (const [start, end] of targets) {
    if (start >= lastEnd) {
      count++
      lastEnd = end
    }
  }

  return count
}
```

---

## 7. 4 câu thần chú trước khi code

### LOOP LEVELS

```text
sort by end

for each interval
    if previous shot cannot cover
        shoot new
```

### RESET WHEN

Không reset gì.

Chỉ cập nhật:

```js
lastEnd = end
```

khi bắn phát mới.

### INVALIDATES WHAT

Phát cũ invalid nếu:

```js
start >= lastEnd
```

Do interval mở.

### COMMIT WHEN

Khi phát cũ không cover được:

```js
count++
lastEnd = end
```

---

## 8. Trap dễ chết

### Trap 1 — Sort theo start

Không phải greedy chuẩn cho minimum stabbing points.

Phải ưu tiên interval **kết thúc sớm nhất**.

---

### Trap 2 — Dùng `start > lastEnd`

Sai vì interval mở.

Nếu:

```text
start === lastEnd
```

phát cũ nằm ngay trước `lastEnd`, không nằm trong interval mới.

Phải:

```js
start >= lastEnd
```

---

### Trap 3 — Thực sự dùng `end - 0.1`

Không cần và dễ dính precision.

Chỉ lưu:

```js
lastEnd = end
```

và encode open-interval logic bằng condition.

---

### Trap 4 — Mỗi interval bắn một phát

Không tối ưu.

Một phát có thể cover nhiều interval overlap.

---

### Trap 5 — Nested overlap checking

N tới 500,000.

Phải sort + scan.

---

## 9. Recall 20 giây

> **Nhận diện:** minimum points hit all intervals → greedy interval.

> **Sort:** theo `end` tăng.

> **Shot:** conceptual point ngay trước `end`.

> **New shot condition:** `start >= lastEnd`.

> **Commit:** `count++`, `lastEnd = end`.

> **Complexity:** O(N log N).

### Code shape

```js
targets.sort((a, b) => a[1] - b[1])

let answer = 0
let lastEnd = -Infinity

for (const [s, e] of targets) {
  if (s >= lastEnd) {
    answer++
    lastEnd = e
  }
}

return answer
```

## 🧠 Một câu phải khắc vào đầu

> **“Interval stabbing: sort end tăng, đặt phát sát end; open interval nên `start >= lastEnd` thì phải bắn mới.”**

---

[⬆ Quay lại INDEX](00_PCCP_FINAL_INDEX.md)

---

# Bài 26 — 입국심사 (Kiểm tra nhập cảnh)

🔗 **Đề chính thức (Programmers):** https://school.programmers.co.kr/learn/courses/30/lessons/43238

**Pattern:** Binary Search on Answer  
**Trigger:** `tìm thời gian nhỏ nhất thỏa điều kiện + nếu time X đủ thì mọi time lớn hơn cũng đủ`

---

## 1. Dịch đề tiếng Việt

Có `n` người đang chờ nhập cảnh.

Mỗi nhân viên kiểm tra có tốc độ khác nhau:

```text
times[i] = số phút để nhân viên i xử lý 1 người
```

Mỗi quầy chỉ xử lý một người tại một thời điểm.

Mục tiêu:

> tìm **thời gian nhỏ nhất** để xử lý xong ít nhất `n` người.

### Giới hạn

```text
1 <= n <= 1,000,000,000
1 <= times[i] <= 1,000,000,000
1 <= times.length <= 100,000
```

Đáp án có thể lên tới:

```text
1e9 * 1e9 = 1e18
```

→ JavaScript `Number` không còn integer-safe.

**Bản recall thi thật dùng BigInt.**

---

## 2. Phân tích 9 bước

### STEP 1 — CONTRACT

Ta không mô phỏng từng người.

Thay vào đó hỏi:

> Nếu cho tổng cộng `T` phút, các quầy có thể xử lý được bao nhiêu người?

Một quầy mất `time` phút/người thì trong `T` phút xử lý được:

```text
floor(T / time)
```

Tổng:

```text
sum floor(T / times[i])
```

Nếu tổng >= n:

```text
T là feasible
```

---

### STEP 2 — BOUND

Ta cần search trên đáp án thời gian.

Lower bound:

```text
1
```

Upper bound an toàn:

```text
max(times) * n
```

vì kể cả chỉ dùng quầy chậm nhất, cuối cùng vẫn xử lý xong.

Nhưng để upper bound chặt hơn có thể dùng:

```text
min(times) * n
```

vì chỉ cần quầy nhanh nhất làm hết cũng đủ.

Ta dùng:

```js
right = minTime * n
```

---

### STEP 3 — BRUTE FORCE

Sai:

```text
thử T = 1,2,3,4,...
```

vì answer có thể tới `1e18`.

Sai khác:

- mô phỏng từng người
- priority queue từng lần quầy rảnh

`n` tới 1e9 → không thể.

---

### STEP 4 — BOTTLENECK

Search space thời gian cực lớn.

Nhưng predicate:

```text
canProcess(T) = tổng số người xử lý được trong T phút >= n ?
```

có tính đơn điệu:

```text
false false false ... true true true
```

Một khi `T` đủ thì mọi thời gian lớn hơn cũng đủ.

→ Binary Search on Answer.

---

### STEP 5 — STATE

```js
let left
let right
let answer
```

Mỗi vòng:

```js
mid
processed
```

Tất cả dùng:

```js
BigInt
```

---

### STEP 6 — TRANSITION

Mid:

```js
const mid = (left + right) / 2n
```

Count:

```js
let processed = 0n

for (const time of bigTimes) {
  processed += mid / time

  if (processed >= people) {
    break
  }
}
```

Nếu feasible:

```js
answer = mid
right = mid - 1n
```

Vì ta cần **minimum feasible**.

Nếu chưa đủ:

```js
left = mid + 1n
```

---

### STEP 7 — INVARIANT

Binary search luôn duy trì:

```text
đáp án thật nằm trong [left, right] hoặc đã được lưu trong answer
```

Khi `mid` feasible:

> `mid` có thể là đáp án, nhưng còn phải tìm xem có thời gian nhỏ hơn cũng feasible không.

→ đi trái.

Khi `mid` infeasible:

> mọi thời gian <= mid cũng infeasible.

→ đi phải.

---

### STEP 8 — PATTERN

**Pattern:** Binary Search on Answer / First Feasible.

Dấu hiệu:

- hỏi min/max một giá trị
- answer space có thứ tự
- viết được `feasible(x)`
- feasible là monotonic

Trigger sentence:

> **“Min thời gian + kiểm được trong T làm đủ chưa + đủ rồi thì T lớn hơn cũng đủ → Binary Search on Answer.”**

---

### STEP 9 — COMPLEXITY

Mỗi predicate scan tối đa:

```text
M = times.length <= 100,000
```

Số vòng binary search:

```text
O(log answer)
```

Với answer <= 1e18:

```text
~60 vòng
```

Total:

```text
O(M log answer)
```

Khoảng:

```text
100,000 * 60 = 6,000,000
```

rất ổn.

Space:

```text
O(M)
```

nếu convert times sang BigInt.

---

## 3. Dry Run — 7 cột chuyển tư duy thành code

```js
n = 6
times = [7, 10]
```

Ta hỏi:

```text
T = 28
```

Số người xử lý được:

```text
28 / 7 = 4
28 / 10 = 2
total = 6
```

→ feasible.

Còn:

```text
T = 27
```

```text
27 / 7 = 3
27 / 10 = 2
total = 5
```

→ infeasible.

Vậy answer:

```text
28
```

---

## 4. Bộ phim hình ảnh

Đừng tưởng tượng từng người xếp hàng.

Hãy tưởng tượng thanh thời gian:

```text
0 ------------------------------ T
```

Rồi mỗi quầy tự hỏi:

```text
trong T phút tao xử lý được bao nhiêu người?
```

Ví dụ quầy 7 phút:

```text
floor(T / 7)
```

Cộng tất cả lại.

Nếu đủ `n` người:

```text
T có thể
```

→ thử giảm T.

Nếu chưa đủ:

```text
T quá nhỏ
```

→ tăng T.

---

## 5. Code Skeleton Recall — BigInt safe

```js
function solution(n, times) {
  const people = BigInt(n)

  const bigTimes =
    times.map(BigInt)

  let minTime = bigTimes[0]

  for (const time of bigTimes) {
    if (time < minTime) {
      minTime = time
    }
  }

  let left = 1n
  let right = minTime * people
  let answer = right

  while (left <= right) {
    const mid =
      (left + right) / 2n

    let processed = 0n

    for (const time of bigTimes) {
      processed += mid / time

      if (processed >= people) {
        break
      }
    }

    if (processed >= people) {
      answer = mid
      right = mid - 1n
    } else {
      left = mid + 1n
    }
  }

  return answer
}
```

---

## 6. 4 câu thần chú trước khi code

### LOOP LEVELS

```text
while left <= right
    mid
    scan all inspectors → processed
    feasible?
        save answer + go left
    else
        go right
```

### RESET WHEN

Mỗi mid mới:

```js
processed = 0n
```

### INVALIDATES WHAT

Nếu:

```js
processed >= people
```

thì predicate đã xác định là true.

Có thể `break` sớm để tránh cộng thừa và tiết kiệm thời gian.

### COMMIT WHEN

Khi feasible:

```js
answer = mid
right = mid - 1n
```

Vì đây là:

```text
FIRST / MINIMUM FEASIBLE
```

---

## 7. Trap dễ chết

### Trap 1 — Dùng Number

Nguy hiểm.

Worst case answer:

```text
1e18
```

Trong khi:

```text
Number.MAX_SAFE_INTEGER ≈ 9e15
```

→ mất chính xác integer.

**Dùng BigInt.**

---

### Trap 2 — Mix Number với BigInt

Sai:

```js
1n + 1
```

sẽ throw.

Phải đồng bộ:

```js
1n
2n
BigInt(n)
BigInt(time)
```

---

### Trap 3 — Binary search sai hướng

Ta tìm **minimum feasible**.

Nếu feasible:

```js
right = mid - 1n
```

không phải đi phải.

---

### Trap 4 — Predicate sai

Đúng:

```js
processed += mid / time
```

BigInt division tự floor.

Không phải:

```text
time / mid
```

---

### Trap 5 — Mô phỏng từng người bằng heap

`n` tới 1e9.

Không được.

---

### Trap 6 — Upper bound quá nhỏ

Phải chắc chắn upper bound feasible.

Safe:

```js
minTime * people
```

vì quầy nhanh nhất một mình cũng xử lý được n người trong thời gian đó.

---

## 8. Recall 20 giây

> **Nhận diện:** minimum time + `feasible(T)` monotonic → Binary Search on Answer.

> **Predicate:** `sum(T / time[i]) >= n`.

> **Search:** first feasible.

> **Feasible:** save mid, go left.

> **Infeasible:** go right.

> **JS:** dùng BigInt vì answer có thể tới 1e18.

> **Complexity:** O(M log answer).

### Code shape

```js
let left = 1n
let right = minTime * people
let answer = right

while (left <= right) {
  const mid = (left + right) / 2n

  let done = 0n

  for (const t of times) {
    done += mid / t
    if (done >= people) break
  }

  if (done >= people) {
    answer = mid
    right = mid - 1n
  } else {
    left = mid + 1n
  }
}
```

## 🧠 Một câu phải khắc vào đầu

> **“Min answer + monotonic predicate → first feasible; JS gặp 1e18 thì BigInt.”**

---

[⬆ Quay lại INDEX](00_PCCP_FINAL_INDEX.md)

---

# Bài 27 — 게임 맵 최단거리 (Đường ngắn nhất bản đồ game)

🔗 **Đề chính thức (Programmers):** https://school.programmers.co.kr/learn/courses/30/lessons/1844

**Pattern:** BFS Grid / Unweighted Shortest Path  
**Trigger:** `grid + đi 4 hướng + mỗi bước cost = 1 + cần shortest path`

---

## 1. Dịch đề tiếng Việt

Ta có một bản đồ `n x m`:

```text
1 = ô đi được
0 = tường
```

Nhân vật bắt đầu ở:

```text
(0, 0)
```

và cần tới:

```text
(n - 1, m - 1)
```

Mỗi bước chỉ được đi:

```text
lên / xuống / trái / phải
```

Mỗi lần di chuyển sang một ô kề tốn đúng:

```text
1 bước
```

Hãy trả về **số ô trên đường đi ngắn nhất**, tính cả ô bắt đầu và ô đích.

Nếu không thể tới đích:

```text
return -1
```

---

## 2. Phân tích 9 bước

### STEP 1 — CONTRACT

State của một node trong graph:

```text
(row, col)
```

Transition:

```text
4 ô kề
```

Điều kiện hợp lệ:

- trong boundary
- `maps[nr][nc] === 1`
- chưa visited

Goal:

```text
row === n - 1 && col === m - 1
```

---

### STEP 2 — BOUND

```text
1 <= n,m <= 100
```

Tối đa:

```text
10,000 ô
```

BFS mỗi ô enqueue tối đa 1 lần:

```text
O(n*m)
```

rất nhẹ.

---

### STEP 3 — BRUTE FORCE

DFS có thể tìm được đường đi, nhưng không đảm bảo đường đầu tiên là shortest.

Nếu enumerate mọi path thì cực dư.

Vì mỗi edge đều có cost 1:

> BFS chính là shortest path chuẩn.

---

### STEP 4 — BOTTLENECK

Ta cần tránh:

```text
đi vòng / enqueue cùng một ô nhiều lần
```

Do đó phải mark visited **ngay khi enqueue**, không phải chờ dequeue.

Nếu mark muộn, cùng một ô có thể bị nhiều parent đẩy vào queue.

---

### STEP 5 — STATE

Ta có thể lưu riêng:

```js
dist[row][col]
```

hoặc tận dụng `maps` để ghi distance.

Để recall rõ ràng, dùng `dist`:

```js
const dist = Array.from(
  { length: n },
  () => Array(m).fill(0)
)
```

Start:

```js
dist[0][0] = 1
```

Queue:

```js
[[0,0]]
```

và:

```js
let head = 0
```

---

### STEP 6 — TRANSITION

BFS:

```js
while (head < queue.length) {
  const [r, c] = queue[head++]

  for (const [dr, dc] of dirs) {
    const nr = r + dr
    const nc = c + dc
```

Check boundary.

Skip wall.

Skip visited:

```js
if (dist[nr][nc] !== 0) continue
```

Mark **trước khi enqueue**:

```js
dist[nr][nc] = dist[r][c] + 1
queue.push([nr, nc])
```

---

### STEP 7 — INVARIANT

Khi một ô được enqueue lần đầu:

> `dist[row][col]` đã là khoảng cách ngắn nhất từ start tới ô đó.

Vì BFS xử lý theo từng layer khoảng cách:

```text
1 bước
2 bước
3 bước
...
```

Nên không cần relax lại như Dijkstra.

---

### STEP 8 — PATTERN

**Pattern:** BFS trên grid / shortest path khi mọi edge có cùng cost.

Dấu hiệu:

- grid
- 4 hoặc 8 hướng
- mỗi bước cost bằng nhau
- hỏi minimum moves / shortest distance

Trigger sentence:

> **“Unweighted shortest path → BFS.”**

---

### STEP 9 — COMPLEXITY

Mỗi ô enqueue tối đa một lần:

```text
O(n*m)
```

Mỗi ô check tối đa 4 neighbors:

```text
O(4*n*m) = O(n*m)
```

Space:

```text
O(n*m)
```

cho queue + dist.

### JS safety

Không dùng:

```js
queue.shift()
```

lặp nhiều lần.

Dùng:

```js
let head = 0
queue[head++]
```

để queue O(1) amortized.

---

## 3. Dry Run — 7 cột chuyển tư duy thành code

Ví dụ mini:

```text
1 1 0
0 1 1
0 0 1
```

Start:

```text
(0,0), dist=1
```

BFS:

| Pop | Neighbor hợp lệ | Dist mới | Queue |
|---|---|---:|---|
| (0,0) | (0,1) | 2 | [(0,1)] |
| (0,1) | (1,1) | 3 | [(1,1)] |
| (1,1) | (1,2) | 4 | [(1,2)] |
| (1,2) | (2,2) | 5 | [(2,2)] |

Answer:

```text
5
```

---

## 4. Bộ phim hình ảnh

BFS giống như đổ nước từ ô start.

```text
layer 1: start
layer 2: các ô cách 1 bước
layer 3: các ô cách 2 bước
...
```

Nước lan đều theo mọi hướng.

Ô đích được chạm lần đầu chính là shortest path.

---

## 5. Code Skeleton Recall

```js
function solution(maps) {
  const n = maps.length
  const m = maps[0].length

  const dist = Array.from(
    { length: n },
    () => Array(m).fill(0)
  )

  const dirs = [
    [1, 0],
    [-1, 0],
    [0, 1],
    [0, -1],
  ]

  const queue = [[0, 0]]
  let head = 0

  dist[0][0] = 1

  while (head < queue.length) {
    const [r, c] = queue[head++]

    for (const [dr, dc] of dirs) {
      const nr = r + dr
      const nc = c + dc

      if (
        nr < 0 ||
        nr >= n ||
        nc < 0 ||
        nc >= m
      ) {
        continue
      }

      if (maps[nr][nc] === 0) {
        continue
      }

      if (dist[nr][nc] !== 0) {
        continue
      }

      dist[nr][nc] =
        dist[r][c] + 1

      queue.push([nr, nc])
    }
  }

  return dist[n - 1][m - 1] || -1
}
```

---

## 6. 4 câu thần chú trước khi code

### LOOP LEVELS

```text
while queue not exhausted
    pop by head
    for 4 directions
        validate
        mark visited/dist
        enqueue
```

### RESET WHEN

Không reset gì trong một BFS.

Nếu bài có nhiều phase BFS khác nhau thì phải reset visited/dist theo phase.

### INVALIDATES WHAT

Neighbor invalid nếu:

```text
out of bounds
wall
already visited
```

### COMMIT WHEN

Khi discover neighbor:

```js
dist[nr][nc] =
  dist[r][c] + 1
```

và mark ngay trước enqueue.

---

## 7. Trap dễ chết

### Trap 1 — Dùng DFS để tìm shortest

DFS không đảm bảo shortest trong unweighted graph.

---

### Trap 2 — `queue.shift()`

Có thể gây O(N²) behavior do reindex array.

Dùng head pointer.

---

### Trap 3 — Mark visited khi dequeue

Sai kiểu performance / duplicate queue.

Phải mark khi enqueue.

---

### Trap 4 — Quên start distance = 1

Đề đếm số ô đi qua, tính cả start.

Phải:

```js
dist[0][0] = 1
```

---

### Trap 5 — Quên unreachable

Nếu:

```js
dist[n - 1][m - 1] === 0
```

return:

```text
-1
```

---

### Trap 6 — Nhầm row/col boundary

```text
row ∈ [0, n)
col ∈ [0, m)
```

---

## 8. Recall 20 giây

> **Nhận diện:** grid + shortest + mỗi move cost 1 → BFS.

> **State:** `(row,col)` + distance.

> **Queue:** array + `head`.

> **Mark:** ngay khi enqueue.

> **Transition:** 4 directions.

> **Goal:** bottom-right.

> **Unreachable:** -1.

> **Complexity:** O(n*m).

### Code shape

```js
const queue = [[0,0]]
let head = 0
dist[0][0] = 1

while (head < queue.length) {
  const [r,c] = queue[head++]

  for (const [dr,dc] of dirs) {
    const nr = r + dr
    const nc = c + dc

    if (invalid) continue
    if (wall) continue
    if (visited) continue

    dist[nr][nc] = dist[r][c] + 1
    queue.push([nr,nc])
  }
}
```

## 🧠 Một câu phải khắc vào đầu

> **“Grid shortest + mỗi bước cost 1 → BFS; mark ngay khi enqueue; queue dùng head.”**

---

[⬆ Quay lại INDEX](00_PCCP_FINAL_INDEX.md)

---

# Bài 28 — 미로 탈출 (Thoát mê cung)

🔗 **Đề chính thức (Programmers):** https://school.programmers.co.kr/learn/courses/30/lessons/159993

**Pattern:** BFS Grid — Two Phases  
**Trigger:** `phải đi qua checkpoint bắt buộc trước rồi mới tới đích → shortest(S→L) + shortest(L→E)`

---

## 1. Dịch đề tiếng Việt

Ta có một mê cung dạng grid gồm các ký tự:

```text
S = Start
E = Exit
L = Lever
O = đường đi
X = tường
```

Muốn thoát mê cung bắt buộc phải:

```text
S → L → E
```

Ta phải tới lever `L` trước để kéo cần, sau đó mới được tính là có thể thoát qua `E`.

Nhưng lưu ý cực quan trọng:

> **Trước khi kéo lever, ô `E` vẫn có thể đi xuyên qua bình thường.**

Mỗi bước sang 1 ô kề 4 hướng tốn:

```text
1 giây
```

Return thời gian nhỏ nhất để:

```text
S → L → E
```

Nếu không thể tới `L`, hoặc từ `L` không thể tới `E`:

```text
return -1
```

---

## 2. Phân tích 9 bước

### STEP 1 — CONTRACT

Bài toán thật sự là tổng của 2 shortest path độc lập:

```text
dist(S, L) + dist(L, E)
```

Nếu một trong hai bằng unreachable:

```text
-1
```

thì answer = `-1`.

---

### STEP 2 — BOUND

```text
rows <= 100
cols <= 100
```

Tối đa:

```text
10,000 ô
```

Một BFS:

```text
O(R*C)
```

Hai BFS:

```text
O(R*C)
```

vì constant 2 bỏ qua.

---

### STEP 3 — BRUTE FORCE

Không cần DFS enumerate mọi path.

Mỗi bước có cost bằng nhau:

```text
1
```

→ BFS là shortest path chuẩn.

---

### STEP 4 — BOTTLENECK

Điểm dễ chết không nằm ở BFS, mà nằm ở **state reset giữa hai phase**.

Phase 1:

```text
S → L
```

Phase 2:

```text
L → E
```

Nếu reuse visited của phase 1 thì phase 2 có thể bị block sai.

→ mỗi BFS phải có visited/dist riêng.

---

### STEP 5 — STATE

Ta viết helper:

```js
bfs(start, target)
```

State trong helper:

```text
queue
head
visited/dist
```

Và cần biết tọa độ:

```text
S
L
E
```

---

### STEP 6 — TRANSITION

Trong BFS:

```text
pop current
→ thử 4 hướng
→ out of bounds? skip
→ X? skip
→ visited? skip
→ mark + enqueue
```

Quan trọng:

```text
S, E, L, O đều là ô đi được
```

Chỉ:

```text
X
```

là tường.

---

### STEP 7 — INVARIANT

Trong mỗi BFS:

> Lần đầu một ô được enqueue là ta đã tìm được shortest distance tới ô đó.

Hai phase độc lập nên:

```text
visited phase 1
```

không được ảnh hưởng:

```text
visited phase 2
```

---

### STEP 8 — PATTERN

**Pattern:** BFS multiple phases / mandatory checkpoint.

Dấu hiệu:

- shortest path trên grid
- phải ghé qua checkpoint bắt buộc
- mọi edge cost = 1

Trigger sentence:

> **“Shortest path qua checkpoint bắt buộc → tách thành các BFS liên tiếp.”**

---

### STEP 9 — COMPLEXITY

Tìm S/L/E:

```text
O(R*C)
```

Hai BFS:

```text
2 * O(R*C)
```

Total:

```text
O(R*C)
```

Space:

```text
O(R*C)
```

### JS safety

Queue dùng:

```js
let head = 0
queue[head++]
```

Không dùng `shift()` lặp.

---

## 3. Dry Run — 7 cột chuyển tư duy thành code

Ví dụ:

```js
maps = [
  "SOOOL",
  "XXXXO",
  "OOOOO",
  "OXXXX",
  "OOOOE"
]
```

Phase 1:

```text
S → L = 4
```

Phase 2:

```text
L → E = 12
```

Total:

```text
4 + 12 = 16
```

| Phase | Start | Target | Result |
|---|---|---|---:|
| 1 | S | L | 4 |
| 2 | L | E | 12 |
| Total | - | - | 16 |

Nếu phase 1 fail:

```text
S không tới được L
```

→ return `-1` ngay.

Nếu phase 1 ok nhưng phase 2 fail:

```text
L không tới được E
```

→ return `-1`.

---

## 4. Bộ phim hình ảnh

Đừng nghĩ là một BFS có state lever phức tạp.

Hãy chia phim thành 2 cảnh:

```text
CẢNH 1
S ~~~~~> L

RESET visited

CẢNH 2
L ~~~~~> E
```

Sau đó:

```text
answer = scene1 + scene2
```

---

## 5. Code Skeleton Recall

```js
function solution(maps) {
  const rows = maps.length
  const cols = maps[0].length

  let start
  let lever
  let exit

  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      if (maps[r][c] === "S") start = [r, c]
      if (maps[r][c] === "L") lever = [r, c]
      if (maps[r][c] === "E") exit = [r, c]
    }
  }

  const dirs = [
    [1, 0],
    [-1, 0],
    [0, 1],
    [0, -1],
  ]

  function bfs(from, to) {
    const dist = Array.from(
      { length: rows },
      () => Array(cols).fill(-1)
    )

    const queue = [from]
    let head = 0

    const [sr, sc] = from
    dist[sr][sc] = 0

    while (head < queue.length) {
      const [r, c] = queue[head++]

      if (r === to[0] && c === to[1]) {
        return dist[r][c]
      }

      for (const [dr, dc] of dirs) {
        const nr = r + dr
        const nc = c + dc

        if (
          nr < 0 ||
          nr >= rows ||
          nc < 0 ||
          nc >= cols
        ) {
          continue
        }

        if (maps[nr][nc] === "X") continue
        if (dist[nr][nc] !== -1) continue

        dist[nr][nc] = dist[r][c] + 1
        queue.push([nr, nc])
      }
    }

    return -1
  }

  const toLever = bfs(start, lever)
  if (toLever === -1) return -1

  const toExit = bfs(lever, exit)
  if (toExit === -1) return -1

  return toLever + toExit
}
```

---

## 6. 4 câu thần chú trước khi code

### LOOP LEVELS

```text
find S/L/E

bfs(S,L)
if fail → -1

bfs(L,E)
if fail → -1

return sum
```

### RESET WHEN

Giữa hai phase:

```text
RESET visited/dist
RESET queue/head
```

Đây là trap chính.

### INVALIDATES WHAT

Neighbor invalid nếu:

```text
out of bounds
X
visited trong phase hiện tại
```

Không invalid `E` ở phase 1.

### COMMIT WHEN

Khi BFS chạm target:

```js
return dist[r][c]
```

Cuối cùng:

```js
return toLever + toExit
```

---

## 7. Trap dễ chết

### Trap 1 — Block E trước khi kéo lever

Sai.

Đề nói rõ:

> chưa kéo lever vẫn được đi qua ô E.

Chỉ `X` là không đi được.

---

### Trap 2 — Không reset visited giữa 2 BFS

Sai.

Một ô đi qua ở phase 1 hoàn toàn có thể phải đi lại ở phase 2.

---

### Trap 3 — Dùng một BFS rồi dừng khi gặp E trước L

Sai goal.

Goal phase 1 là:

```text
L
```

không phải E.

---

### Trap 4 — Dùng queue.shift()

Không cần.

Dùng head pointer.

---

### Trap 5 — Cộng distance theo kiểu bài Game Map

Bài này hỏi:

```text
thời gian di chuyển
```

nên start distance = 0.

Khác Bài 27 là đề đếm **số ô trên path**, nên start dist = 1.

---

## 8. Recall 20 giây

> **Nhận diện:** shortest path phải qua checkpoint L → BFS 2 phase.

> **Phase 1:** S → L.

> **RESET.**

> **Phase 2:** L → E.

> **Walkable:** S/E/L/O; chỉ X là wall.

> **Fail bất kỳ phase nào:** -1.

> **Queue:** head pointer.

> **Complexity:** O(R*C).

### Code shape

```js
const a = bfs(S, L)
if (a === -1) return -1

const b = bfs(L, E)
if (b === -1) return -1

return a + b
```

## 🧠 Một câu phải khắc vào đầu

> **“Checkpoint bắt buộc → chia shortest path thành nhiều BFS; mỗi BFS reset visited.”**

---

[⬆ Quay lại INDEX](00_PCCP_FINAL_INDEX.md)

---

# Bài 29 — 네트워크 (Mạng lưới)

🔗 **Đề chính thức (Programmers):** https://school.programmers.co.kr/learn/courses/30/lessons/43162

**Pattern:** Connected Components / DFS or BFS  
**Trigger:** `graph có nhiều cụm rời nhau + hỏi có bao nhiêu nhóm liên thông`

---

## 1. Dịch đề tiếng Việt

Có `n` máy tính, đánh số:

```text
0 ... n-1
```

`computers[i][j] === 1` nghĩa là:

```text
máy i kết nối trực tiếp với máy j
```

Nếu:

```text
A ↔ B
B ↔ C
```

thì A và C cũng được coi là cùng một network dù không nối trực tiếp.

Mục tiêu:

> đếm số **network độc lập**, tức số **connected components** của graph.

---

## 2. Phân tích 9 bước

### STEP 1 — CONTRACT

Mỗi computer là một node.

Hai node có edge nếu:

```js
computers[i][j] === 1
```

Mỗi lần bắt đầu traversal từ một node chưa visited:

```text
ta vừa phát hiện một component mới
```

→ `count++`

Sau đó DFS/BFS để mark toàn bộ component đó.

---

### STEP 2 — BOUND

```text
n <= 200
```

Input là adjacency matrix `n x n`.

Với mỗi node, scan toàn bộ row để tìm neighbor:

```text
O(N)
```

Toàn bộ traversal:

```text
O(N²)
```

Với N=200 thì cực nhẹ.

---

### STEP 3 — BRUTE FORCE

Không cần thử mọi cặp node để suy network thủ công.

Graph traversal đã làm đúng việc đó:

```text
start ở 1 node
→ lan ra mọi node reachable
```

---

### STEP 4 — BOTTLENECK

Điểm lõi là:

> **count component ở outer loop, không count node.**

Mỗi lần gặp:

```js
if (!visited[i])
```

thì đó là một component mới.

Sau khi DFS/BFS xong, toàn bộ node trong component đó đã visited.

---

### STEP 5 — STATE

Ta cần:

```js
const visited = Array(n).fill(false)
let count = 0
```

DFS state:

```js
dfs(node)
```

---

### STEP 6 — TRANSITION

Outer loop:

```js
for (let i = 0; i < n; i++) {
  if (visited[i]) continue

  count++
  dfs(i)
}
```

DFS:

```js
visited[node] = true

for (let next = 0; next < n; next++) {
  if (computers[node][next] !== 1) continue
  if (visited[next]) continue

  dfs(next)
}
```

---

### STEP 7 — INVARIANT

Sau khi `dfs(start)` kết thúc:

> tất cả computer thuộc cùng network với `start` đã được mark visited.

Do đó outer loop sẽ không count component đó lần nữa.

---

### STEP 8 — PATTERN

**Pattern:** Connected Components.

Dấu hiệu:

- graph có thể không connected
- hỏi có bao nhiêu nhóm / cụm / network / islands
- cần đếm số vùng liên thông

Trigger sentence:

> **“Mỗi node chưa visited ở outer loop = một component mới.”**

---

### STEP 9 — COMPLEXITY

Adjacency matrix:

```text
O(N²)
```

Space:

```text
O(N)
```

cho visited + recursion stack.

### JS safety

```text
N <= 200
```

Recursion depth tối đa 200.

→ an toàn.

---

## 3. Dry Run — 7 cột chuyển tư duy thành code

Input:

```js
n = 3
computers = [
  [1,1,0],
  [1,1,0],
  [0,0,1]
]
```

Start outer loop:

| i | visited trước | Action | count | Sau DFS |
|---:|---|---|---:|---|
| 0 | false | component mới → dfs(0) | 1 | 0,1 visited |
| 1 | true | skip | 1 | giữ nguyên |
| 2 | false | component mới → dfs(2) | 2 | 2 visited |

Answer:

```text
2
```

---

## 4. Bộ phim hình ảnh

Tưởng tượng các computer là các hòn đảo người đứng trên đó nối bằng cầu.

Mày đi từ computer 0:

```text
0 → các node nối với 0
→ các node nối tiếp nữa
→ đi cho tới hết cụm
```

Xong quay lại outer loop.

Gặp node nào chưa từng đặt chân tới:

```text
đó là một hòn đảo/network mới
```

→ `count++`.

---

## 5. Code Skeleton Recall — DFS

```js
function solution(n, computers) {
  const visited = Array(n).fill(false)

  function dfs(node) {
    visited[node] = true

    for (let next = 0; next < n; next++) {
      if (computers[node][next] !== 1) {
        continue
      }

      if (visited[next]) {
        continue
      }

      dfs(next)
    }
  }

  let answer = 0

  for (let i = 0; i < n; i++) {
    if (visited[i]) continue

    answer++
    dfs(i)
  }

  return answer
}
```

---

## 6. BFS version để nhận dạng tương đương

```js
function bfs(start) {
  const queue = [start]
  let head = 0

  visited[start] = true

  while (head < queue.length) {
    const node = queue[head++]

    for (let next = 0; next < n; next++) {
      if (computers[node][next] !== 1) continue
      if (visited[next]) continue

      visited[next] = true
      queue.push(next)
    }
  }
}
```

DFS hay BFS đều đúng vì bài chỉ cần traverse component, không cần shortest path.

---

## 7. 4 câu thần chú trước khi code

### LOOP LEVELS

```text
for every node
    if already visited → skip

    answer++
    traverse entire component
```

### RESET WHEN

Không reset visited giữa các component.

`visited` phải sống xuyên suốt toàn bài để nhớ component nào đã xử lý.

### INVALIDATES WHAT

Neighbor invalid nếu:

```text
không có edge
hoặc đã visited
```

### COMMIT WHEN

Commit component count ở:

```js
if (!visited[i]) {
  answer++
  dfs(i)
}
```

Không count trong DFS.

---

## 8. Trap dễ chết

### Trap 1 — Count mỗi lần dfs recursion

Sai.

Ta cần count **component**, không phải node.

Chỉ count ở outer loop khi gặp node chưa visited.

---

### Trap 2 — Reset visited mỗi component

Sai.

Nếu reset thì component cũ sẽ bị count lại.

---

### Trap 3 — Bỏ visited vì matrix có diagonal 1

`computers[i][i] = 1`.

Không visited thì node sẽ tự gọi lại chính nó / cycle.

---

### Trap 4 — Nghĩ chỉ direct connection mới cùng network

Sai.

Connected component tính cả kết nối gián tiếp.

---

### Trap 5 — Nhầm với shortest path BFS

Bài này không hỏi distance.

DFS đơn giản là đủ.

---

## 9. Recall 20 giây

> **Nhận diện:** hỏi số network/cụm liên thông → Connected Components.

> **Outer loop:** gặp node chưa visited → `answer++`.

> **Traversal:** DFS/BFS mark hết component đó.

> **State:** `visited`.

> **Matrix neighbor:** `computers[node][next] === 1`.

> **Complexity:** O(N²).

### Code shape

```js
for (let i = 0; i < n; i++) {
  if (visited[i]) continue

  answer++
  dfs(i)
}
```

## 🧠 Một câu phải khắc vào đầu

> **“Component count nằm ở outer loop: gặp node chưa visited → +1 rồi flood-fill cả cụm.”**

---

[⬆ Quay lại INDEX](00_PCCP_FINAL_INDEX.md)

---

# Bài 30 — 단어 변환 (Chuyển đổi từ)

🔗 **Đề chính thức (Programmers):** https://school.programmers.co.kr/learn/courses/30/lessons/43163

**Pattern:** Implicit Graph + BFS Shortest Path  
**Trigger:** `state là word + rule tự tạo cạnh + mỗi lần đổi 1 bước + cần minimum steps`

---

## 1. Dịch đề tiếng Việt

Có:

```text
begin
target
words
```

Quy tắc:

1. Mỗi lần chỉ được đổi **đúng 1 ký tự**.
2. Sau khi đổi, từ mới phải nằm trong `words`.

Ví dụ:

```text
hit → hot → dot → dog → cog
```

cần 4 bước.

Mục tiêu:

> tìm số bước ít nhất để đổi `begin` thành `target`.

Nếu không thể:

```text
return 0
```

---

## 2. Phân tích 9 bước

### STEP 1 — CONTRACT

Mỗi word là một node.

Giữa hai word có edge nếu:

```text
chúng khác đúng 1 ký tự
```

Mỗi edge có cost:

```text
1
```

Ta cần shortest path từ:

```text
begin
```

đến:

```text
target
```

→ BFS.

---

### STEP 2 — BOUND

```text
words.length <= 50
word.length <= 10
```

Nếu từ mỗi current word ta scan toàn bộ words và so từng ký tự:

```text
O(N² * L)
```

Tối đa khoảng:

```text
50 * 50 * 10 = 25,000
```

quá nhẹ.

Không cần prebuild graph phức tạp.

---

### STEP 3 — BRUTE FORCE

DFS có thể thử path, nhưng không đảm bảo path đầu tiên là shortest.

Vì mỗi transformation cost 1:

```text
BFS = shortest path
```

---

### STEP 4 — BOTTLENECK

Điểm đặc biệt là graph **không được cho sẵn**.

Ta phải tự xác định:

```text
current word có thể đi sang word nào?
```

Rule:

```text
khác đúng 1 ký tự
```

Đó là **implicit graph**.

---

### STEP 5 — STATE

Queue state:

```js
[word, steps]
```

Visited:

```js
const visited = Array(words.length).fill(false)
```

Có thể visited theo index vì `words` không duplicate.

---

### STEP 6 — TRANSITION

Helper:

```js
function canTransform(a, b) {
  let diff = 0

  for (let i = 0; i < a.length; i++) {
    if (a[i] !== b[i]) {
      diff++

      if (diff > 1) {
        return false
      }
    }
  }

  return diff === 1
}
```

BFS:

```text
pop current
→ scan all words chưa visited
→ nếu khác đúng 1 ký tự
→ mark visited
→ enqueue với steps+1
```

---

### STEP 7 — INVARIANT

Khi một word được enqueue lần đầu:

> số `steps` đi cùng nó là shortest distance từ begin tới word đó.

Vì mọi transformation cost bằng 1.

---

### STEP 8 — PATTERN

**Pattern:** Implicit Graph + BFS.

Dấu hiệu:

- không có adjacency list/matrix
- đề cho một **rule chuyển trạng thái**
- mỗi transition cost như nhau
- hỏi minimum number of transitions

Trigger sentence:

> **“Không có graph sẵn nhưng có rule tạo neighbor + mỗi bước cost 1 → BFS trên implicit graph.”**

---

### STEP 9 — COMPLEXITY

Có tối đa `N` word.

Mỗi word pop ra có thể scan `N` candidates.

Mỗi comparison tốn `L`.

```text
O(N² * L)
```

Với:

```text
N <= 50
L <= 10
```

→ rất nhỏ.

Space:

```text
O(N)
```

---

## 3. Dry Run — 7 cột chuyển tư duy thành code

```js
begin = "hit"
target = "cog"

words = [
  "hot",
  "dot",
  "dog",
  "lot",
  "log",
  "cog"
]
```

BFS:

```text
hit
↓
hot          step 1
↓
dot / lot    step 2
↓
dog / log    step 3
↓
cog          step 4
```

Lần đầu gặp:

```text
cog
```

→ answer = 4.

---

## 4. Bộ phim hình ảnh

Mỗi word là một căn phòng.

Không có bản đồ nối phòng sẵn.

Mỗi lần đứng ở một phòng:

```text
current
```

mày nhìn toàn bộ `words` và hỏi:

```text
word nào khác current đúng 1 ký tự?
```

Những word đó là phòng kề.

BFS lan theo layer:

```text
1 lần đổi
2 lần đổi
3 lần đổi
...
```

Target xuất hiện lần đầu = shortest.

---

## 5. Code Skeleton Recall

```js
function solution(begin, target, words) {
  if (!words.includes(target)) {
    return 0
  }

  function canTransform(a, b) {
    let diff = 0

    for (let i = 0; i < a.length; i++) {
      if (a[i] !== b[i]) {
        diff++

        if (diff > 1) {
          return false
        }
      }
    }

    return diff === 1
  }

  const visited =
    Array(words.length).fill(false)

  const queue = [[begin, 0]]
  let head = 0

  while (head < queue.length) {
    const [current, steps] =
      queue[head++]

    if (current === target) {
      return steps
    }

    for (let i = 0; i < words.length; i++) {
      if (visited[i]) continue

      if (!canTransform(current, words[i])) {
        continue
      }

      visited[i] = true

      queue.push([
        words[i],
        steps + 1
      ])
    }
  }

  return 0
}
```

---

## 6. 4 câu thần chú trước khi code

### LOOP LEVELS

```text
while queue not exhausted
    pop current
    for every word
        if unvisited
        if differs exactly 1 char
            mark
            enqueue steps+1
```

### RESET WHEN

Không reset visited trong BFS.

### INVALIDATES WHAT

Candidate invalid nếu:

```text
đã visited
hoặc khác không đúng 1 ký tự
```

### COMMIT WHEN

Khi:

```js
current === target
```

return ngay `steps`.

---

## 7. Trap dễ chết

### Trap 1 — target không có trong words

Theo rule chỉ được đổi thành từ trong `words`.

Nếu target không tồn tại:

```js
return 0
```

ngay.

---

### Trap 2 — Cho phép khác 0 ký tự

Sai.

Edge chỉ tồn tại khi:

```text
diff === 1
```

không phải `<= 1`.

---

### Trap 3 — DFS rồi lấy path đầu tiên

Không đảm bảo shortest.

BFS.

---

### Trap 4 — Prebuild graph quá phức tạp

N chỉ 50.

Scan toàn bộ words trực tiếp trong BFS vừa sạch vừa an toàn.

---

### Trap 5 — Mark visited khi dequeue

Có thể enqueue cùng một word nhiều lần.

Phải mark ngay khi enqueue.

---

### Trap 6 — Dùng queue.shift()

Không cần.

Dùng head pointer.

---

## 8. Recall 20 giây

> **Nhận diện:** rule tạo neighbor + min transitions → implicit graph BFS.

> **Node:** word.

> **Edge:** khác đúng 1 ký tự.

> **Queue state:** `[word, steps]`.

> **Visited:** word/index mark khi enqueue.

> **Target absent:** return 0.

> **Complexity:** O(N²L).

### Code shape

```js
queue = [[begin, 0]]

while (head < queue.length) {
  const [cur, step] = queue[head++]

  if (cur === target) {
    return step
  }

  for (each word) {
    if (visited) continue
    if (diff(cur, word) !== 1) continue

    visited = true
    queue.push([word, step + 1])
  }
}
```

## 🧠 Một câu phải khắc vào đầu

> **“Graph không cho sẵn thì tự định nghĩa neighbor; mỗi step cost 1 và hỏi min → BFS.”**

---

[⬆ Quay lại INDEX](00_PCCP_FINAL_INDEX.md)

---

# Bài 31 — 가장 먼 노드 (Node xa nhất)

🔗 **Đề chính thức (Programmers):** https://school.programmers.co.kr/learn/courses/30/lessons/49189

**Pattern:** BFS Graph / Distance Layers  
**Trigger:** `graph vô hướng + mọi edge cost = 1 + cần shortest distance từ 1 tới mọi node`

---

## 1. Dịch đề tiếng Việt

Có một graph gồm `n` node, đánh số:

```text
1 ... n
```

Ta cần tìm:

> có bao nhiêu node nằm **xa node 1 nhất**, trong đó “xa” được tính bằng **số edge của shortest path** từ node 1 tới node đó.

Input:

```text
vertex = [[a,b], ...]
```

mỗi `[a,b]` là một edge hai chiều.

Return:

```text
số node có shortest distance lớn nhất từ node 1
```

---

## 2. Phân tích 9 bước

### STEP 1 — CONTRACT

Ta cần biết:

```text
dist[1 → node]
```

cho mọi node.

Sau đó:

```text
maxDistance = max(dist)
answer = số node có dist === maxDistance
```

---

### STEP 2 — BOUND

```text
n <= 20,000
edges <= 50,000
```

Phải dùng:

```text
adjacency list
```

Không dùng adjacency matrix vì:

```text
20,000² = 400,000,000 ô
```

quá lớn.

BFS adjacency list:

```text
O(N + E)
```

---

### STEP 3 — BRUTE FORCE

Sai:

```text
từ node 1 chạy shortest path riêng tới từng node
```

BFS một lần đã cho shortest distance tới tất cả node.

---

### STEP 4 — BOTTLENECK

Mọi edge đều có weight:

```text
1
```

nên BFS theo layer:

```text
dist = 0
dist = 1
dist = 2
...
```

Lần đầu tới node là shortest.

Không cần Dijkstra.

---

### STEP 5 — STATE

Adjacency:

```js
const graph =
  Array.from({ length: n + 1 }, () => [])
```

Distance:

```js
const dist = Array(n + 1).fill(-1)
```

Queue:

```js
const queue = [1]
let head = 0
```

Start:

```js
dist[1] = 0
```

---

### STEP 6 — TRANSITION

Build graph hai chiều:

```js
for (const [a,b] of edge) {
  graph[a].push(b)
  graph[b].push(a)
}
```

BFS:

```js
while (head < queue.length) {
  const node = queue[head++]

  for (const next of graph[node]) {
    if (dist[next] !== -1) continue

    dist[next] = dist[node] + 1
    queue.push(next)
  }
}
```

Sau BFS:

```js
const maxDistance = Math.max(...dist.slice(1))
```

Nhưng với N=20,000 thì spread vẫn thường ổn, song recall thi chắc tay hơn là scan loop:

```js
let maxDistance = 0
for (let i=1; i<=n; i++) {
  maxDistance = Math.max(maxDistance, dist[i])
}
```

Rồi count.

---

### STEP 7 — INVARIANT

Khi một node được enqueue lần đầu:

> `dist[node]` là shortest distance từ node 1 tới node đó.

BFS xử lý theo increasing distance layer.

---

### STEP 8 — PATTERN

**Pattern:** BFS shortest path in unweighted graph.

Dấu hiệu:

- graph
- edge hai chiều / vô hướng
- mọi edge cost bằng nhau
- hỏi shortest distance / level từ một source

Trigger sentence:

> **“Unweighted graph + shortest distance từ một source → BFS.”**

---

### STEP 9 — COMPLEXITY

Build graph:

```text
O(E)
```

BFS:

```text
O(N + E)
```

Final scan:

```text
O(N)
```

Total:

```text
O(N + E)
```

Space:

```text
O(N + E)
```

### JS safety

Không dùng:

```js
queue.shift()
```

Dùng head pointer.

Adjacency list bắt buộc với N=20,000.

---

## 3. Dry Run

Ví dụ:

```js
n = 6
vertex = [
  [3,6],
  [4,3],
  [3,2],
  [1,3],
  [1,2],
  [2,4],
  [5,2]
]
```

BFS từ 1:

```text
dist[1] = 0

layer 1:
2, 3

layer 2:
4, 5, 6
```

Distance:

```text
1 → 0
2 → 1
3 → 1
4 → 2
5 → 2
6 → 2
```

Max:

```text
2
```

Có 3 node:

```text
4,5,6
```

→ answer = 3.

---

## 4. Bộ phim hình ảnh

Tưởng tượng node 1 phát sóng:

```text
vòng 0: node 1
vòng 1: hàng xóm của 1
vòng 2: hàng xóm chưa thăm của vòng 1
...
```

Vòng xa nhất chính là layer cuối có node.

Ta chỉ cần đếm số node ở layer đó.

---

## 5. Code Skeleton Recall

```js
function solution(n, edge) {
  const graph =
    Array.from({ length: n + 1 }, () => [])

  for (const [a, b] of edge) {
    graph[a].push(b)
    graph[b].push(a)
  }

  const dist =
    Array(n + 1).fill(-1)

  const queue = [1]
  let head = 0

  dist[1] = 0

  while (head < queue.length) {
    const node = queue[head++]

    for (const next of graph[node]) {
      if (dist[next] !== -1) {
        continue
      }

      dist[next] = dist[node] + 1
      queue.push(next)
    }
  }

  let maxDistance = 0

  for (let i = 1; i <= n; i++) {
    if (dist[i] > maxDistance) {
      maxDistance = dist[i]
    }
  }

  let answer = 0

  for (let i = 1; i <= n; i++) {
    if (dist[i] === maxDistance) {
      answer++
    }
  }

  return answer
}
```

---

## 6. 4 câu thần chú trước khi code

### LOOP LEVELS

```text
build graph

BFS from 1
    pop
    for neighbors
        if unvisited
            dist = parent + 1
            enqueue

scan max
scan count
```

### RESET WHEN

Không reset distance.

Một BFS duy nhất từ source 1.

### INVALIDATES WHAT

Neighbor invalid nếu:

```text
đã có dist != -1
```

### COMMIT WHEN

Khi discover:

```js
dist[next] = dist[node] + 1
```

Cuối cùng mới commit answer bằng count của `maxDistance`.

---

## 7. Trap dễ chết

### Trap 1 — Dùng adjacency matrix

N tới 20,000.

Không nên.

Dùng adjacency list.

---

### Trap 2 — Dùng Dijkstra

Không cần.

Edge cost đồng đều = 1.

BFS đủ.

---

### Trap 3 — queue.shift()

Không dùng cho queue lớn.

Head pointer.

---

### Trap 4 — Mark visited quá muộn

`dist[next] = ...` ngay khi enqueue.

---

### Trap 5 — Đếm node xa nhất trong lúc BFS nhưng update lộn

Cách ít lỗi nhất:

```text
BFS xong → tìm max → count
```

Đừng tối ưu state khi chưa cần.

---

## 8. Recall 20 giây

> **Nhận diện:** graph unweighted + distance từ node 1 → BFS.

> **Graph:** adjacency list 2 chiều.

> **State:** `dist[node]`.

> **Queue:** array + head.

> **Transition:** `dist[next] = dist[cur] + 1`.

> **Cuối:** max dist → count số node bằng max.

> **Complexity:** O(N+E).

### Code shape

```js
dist[1] = 0
queue = [1]

while (head < queue.length) {
  cur = queue[head++]

  for (next of graph[cur]) {
    if (dist[next] !== -1) continue

    dist[next] = dist[cur] + 1
    queue.push(next)
  }
}
```

## 🧠 Một câu phải khắc vào đầu

> **“Unweighted graph → BFS một lần từ source cho shortest distance tới tất cả node; cuối cùng lấy layer xa nhất.”**

---

[⬆ Quay lại INDEX](00_PCCP_FINAL_INDEX.md)

---

# Bài 32 — 배달 (Giao hàng)

🔗 **Đề chính thức (Programmers):** https://school.programmers.co.kr/learn/courses/30/lessons/12978

**Pattern:** Dijkstra / Weighted Shortest Path  
**Trigger:** `graph + edge weight khác nhau + cần shortest distance từ 1 tới mọi node`

---

## 1. Dịch đề tiếng Việt

Có `N` thị trấn, đánh số:

```text
1 ... N
```

Các thị trấn nối với nhau bằng đường hai chiều.

Mỗi road:

```js
[a, b, cost]
```

nghĩa là:

```text
a ↔ b
```

và đi qua road đó tốn:

```text
cost
```

Nhà hàng nằm ở town `1`.

Ta cần đếm số town có thể giao hàng trong thời gian:

```text
<= K
```

Nói cách khác:

> đếm số node có **shortest weighted distance từ node 1 <= K**.

---

## 2. Phân tích 9 bước

### STEP 1 — CONTRACT

Ta cần shortest distance:

```text
dist[1 → town]
```

nhưng edge có weight khác nhau.

Không thể chỉ đếm số edge.

---

### STEP 2 — BOUND

```text
N <= 50
road.length <= 2000
```

Dijkstra:

```text
O((N + E) log N)
```

quá nhẹ.

---

### STEP 3 — BRUTE FORCE

Sai:

```text
thử mọi path
```

Có thể cycle và số path bùng nổ.

Sai khác:

```text
BFS theo số edge
```

vì:

```text
1 edge nặng 100
```

có thể tệ hơn:

```text
3 edge tổng 3
```

---

### STEP 4 — BOTTLENECK

Khác Bài 31:

```text
Bài 31:
mọi edge cost = 1
→ BFS

Bài 32:
edge cost khác nhau
→ Dijkstra
```

Ta luôn muốn xử lý node có:

```text
distance nhỏ nhất hiện tại
```

→ Min-Heap.

---

### STEP 5 — STATE

Adjacency list:

```js
graph[node] = [
  [next, cost],
  ...
]
```

Distance:

```js
dist[node]
```

Heap entry:

```js
[distance, node]
```

Start:

```js
dist[1] = 0
heap.push([0, 1])
```

---

### STEP 6 — TRANSITION

Pop:

```js
const [currentDist, node] = heap.pop()
```

Nếu stale:

```js
if (currentDist > dist[node]) {
  continue
}
```

Relax mỗi edge:

```js
const nextDist =
  currentDist + cost

if (nextDist < dist[next]) {
  dist[next] = nextDist
  heap.push([nextDist, next])
}
```

---

### STEP 7 — INVARIANT

`dist[x]` luôn là:

> khoảng cách tốt nhất đã biết hiện tại từ node 1 tới x.

Khi pop heap entry có:

```js
currentDist === dist[node]
```

thì đó là candidate tốt nhất hiện tại để relax neighbors.

Stale entry cũ phải bỏ qua.

---

### STEP 8 — PATTERN

**Pattern:** Dijkstra.

Dấu hiệu:

- graph
- edge weight không âm
- cost khác nhau
- shortest distance từ một source

Trigger sentence:

> **“Weighted graph + non-negative edges + shortest path → Dijkstra.”**

---

### STEP 9 — COMPLEXITY

Adjacency list:

```text
O(E)
```

Dijkstra:

```text
O((N + E) log N)
```

Final count:

```text
O(N)
```

Space:

```text
O(N + E)
```

---

## 3. Parallel edge — trap riêng của bài này

Có thể có nhiều road giữa cùng hai town:

```text
1 ↔ 2 cost 5
1 ↔ 2 cost 2
```

Không sao cả.

Cứ add cả hai vào adjacency list:

```js
graph[a].push([b, cost])
graph[b].push([a, cost])
```

Dijkstra tự relax đường tốt hơn.

Không cần dedupe trước.

---

## 4. Dry Run

Ví dụ:

```js
N = 5
K = 3
```

Giả sử sau Dijkstra:

```text
dist[1] = 0
dist[2] = 1
dist[3] = 4
dist[4] = 2
dist[5] = 3
```

Town deliver được:

```text
1,2,4,5
```

vì:

```text
dist <= 3
```

→ answer = 4.

---

## 5. Bộ phim hình ảnh

Tưởng tượng mỗi town có một tờ giấy ghi:

```text
best distance known
```

Ban đầu:

```text
town 1 = 0
các town khác = Infinity
```

Heap luôn lấy town rẻ nhất hiện tại ra.

Từ town đó:

```text
thử đi sang neighbor
```

Nếu tìm được đường ngắn hơn:

```text
update dist
push candidate mới vào heap
```

---

## 6. Min-Heap dùng cho Dijkstra

```js
class MinHeap {
  constructor() {
    this.heap = []
  }

  size() {
    return this.heap.length
  }

  push(value) {
    const heap = this.heap
    heap.push(value)

    let i = heap.length - 1

    while (i > 0) {
      const parent =
        Math.floor((i - 1) / 2)

      if (heap[parent][0] <= heap[i][0]) {
        break
      }

      ;[heap[parent], heap[i]] =
        [heap[i], heap[parent]]

      i = parent
    }
  }

  pop() {
    const heap = this.heap

    if (heap.length === 1) {
      return heap.pop()
    }

    const root = heap[0]
    heap[0] = heap.pop()

    let i = 0

    while (true) {
      let smallest = i
      const left = i * 2 + 1
      const right = i * 2 + 2

      if (
        left < heap.length &&
        heap[left][0] < heap[smallest][0]
      ) {
        smallest = left
      }

      if (
        right < heap.length &&
        heap[right][0] < heap[smallest][0]
      ) {
        smallest = right
      }

      if (smallest === i) {
        break
      }

      ;[heap[i], heap[smallest]] =
        [heap[smallest], heap[i]]

      i = smallest
    }

    return root
  }
}
```

---

## 7. Code Skeleton Recall

```js
function solution(N, road, K) {
  const graph =
    Array.from({ length: N + 1 }, () => [])

  for (const [a, b, cost] of road) {
    graph[a].push([b, cost])
    graph[b].push([a, cost])
  }

  const dist =
    Array(N + 1).fill(Infinity)

  const heap = new MinHeap()

  dist[1] = 0
  heap.push([0, 1])

  while (heap.size() > 0) {
    const [currentDist, node] =
      heap.pop()

    if (currentDist > dist[node]) {
      continue
    }

    for (const [next, cost] of graph[node]) {
      const nextDist =
        currentDist + cost

      if (nextDist >= dist[next]) {
        continue
      }

      dist[next] = nextDist
      heap.push([nextDist, next])
    }
  }

  let answer = 0

  for (let town = 1; town <= N; town++) {
    if (dist[town] <= K) {
      answer++
    }
  }

  return answer
}
```

---

## 8. 4 câu thần chú trước khi code

### LOOP LEVELS

```text
build weighted graph

while heap not empty
    pop min-distance state
    stale? skip

    for each edge
        calculate nextDist
        if better
            update
            push
```

### RESET WHEN

Không reset dist.

Một source duy nhất:

```text
town 1
```

### INVALIDATES WHAT

Heap state invalid nếu stale:

```js
currentDist > dist[node]
```

Relax invalid nếu:

```js
nextDist >= dist[next]
```

### COMMIT WHEN

Khi tìm được shorter path:

```js
dist[next] = nextDist
heap.push([nextDist, next])
```

---

## 9. Trap dễ chết

### Trap 1 — Dùng BFS

Sai vì edge weights khác nhau.

---

### Trap 2 — Không check stale heap entry

Một node có thể được push nhiều lần.

Entry cũ phải skip:

```js
if (currentDist > dist[node]) continue
```

---

### Trap 3 — Quên road hai chiều

Phải add:

```js
a → b
b → a
```

---

### Trap 4 — Parallel edges

Có thể có nhiều road cùng cặp node.

Đừng overwrite.

Add hết; Dijkstra tự chọn đường tốt hơn.

---

### Trap 5 — Đếm `< K` thay vì `<= K`

Đề là giao trong thời gian không vượt quá K.

Phải:

```js
dist[town] <= K
```

---

## 10. Recall 20 giây

> **Nhận diện:** weighted graph + shortest → Dijkstra.

> **State:** `dist[node]`.

> **PQ:** min by distance.

> **Pop stale:** skip.

> **Relax:** nếu `current + weight < dist[next]`.

> **Graph:** undirected, parallel edges okay.

> **Cuối:** count `dist <= K`.

> **Complexity:** O((N+E)logN).

### Code shape

```js
while (heap.size()) {
  const [d, node] = heap.pop()

  if (d > dist[node]) continue

  for (const [next, w] of graph[node]) {
    const nd = d + w

    if (nd >= dist[next]) continue

    dist[next] = nd
    heap.push([nd, next])
  }
}
```

## 🧠 Một câu phải khắc vào đầu

> **“BFS chỉ khi edge cost bằng nhau; weighted non-negative thì Dijkstra = pop min → stale skip → relax.”**

---

[⬆ Quay lại INDEX](00_PCCP_FINAL_INDEX.md)

---

# Bài 33 — 정수 삼각형 (Tam giác số nguyên)

🔗 **Đề chính thức (Programmers):** https://school.programmers.co.kr/learn/courses/30/lessons/43105

**Pattern:** Dynamic Programming / Triangle DP  
**Trigger:** `mỗi state phụ thuộc vào 1–2 state ở hàng trước + hỏi max tổng đường đi`

---

## 1. Dịch đề tiếng Việt

Có một tam giác số nguyên.

Ta đi từ đỉnh xuống đáy.

Từ ô:

```text
triangle[row][col]
```

chỉ được đi xuống:

```text
(row + 1, col)
```

hoặc:

```text
(row + 1, col + 1)
```

Mục tiêu:

> tìm tổng lớn nhất có thể đạt được từ đỉnh tới một ô ở hàng cuối.

---

## 2. Phân tích 9 bước

### STEP 1 — CONTRACT

Mỗi ô có thể nhận từ tối đa 2 parent:

```text
parent trái  = dp[row - 1][col - 1]
parent phải = dp[row - 1][col]
```

State:

```text
dp[row][col] = tổng lớn nhất để đi tới ô này
```

---

### STEP 2 — BOUND

Height:

```text
<= 500
```

Số ô tổng cộng xấp xỉ:

```text
500 * 501 / 2
≈ 125,000
```

DP O(N²) rất nhẹ.

---

### STEP 3 — BRUTE FORCE

Mỗi tầng có thể rẽ trái/phải.

Số path tăng gần:

```text
2^(height-1)
```

Height 500 → không thể enumerate.

---

### STEP 4 — BOTTLENECK

Nhiều path khác nhau có thể hội tụ vào cùng một ô.

Ta không cần nhớ toàn bộ path.

Chỉ cần nhớ:

> tổng tốt nhất đã tới ô đó là bao nhiêu.

Đó chính là DP.

---

### STEP 5 — STATE

Có 2 cách:

```text
1. dp 2D riêng
2. mutate triangle thành dp
```

Bản thi gọn có thể mutate copy/triangle.

Để recall rõ, dùng:

```js
const dp = triangle.map(row => [...row])
```

Base:

```js
dp[0][0] = triangle[0][0]
```

---

### STEP 6 — TRANSITION

Với mỗi ô `(row,col)`:

```text
bestParent = max(
  dp[row-1][col-1] nếu tồn tại,
  dp[row-1][col]   nếu tồn tại
)
```

Sau đó:

```js
dp[row][col] =
  triangle[row][col] + bestParent
```

Code tránh if rối bằng:

```js
const leftParent =
  col > 0
    ? dp[row - 1][col - 1]
    : -Infinity

const rightParent =
  col < row
    ? dp[row - 1][col]
    : -Infinity
```

---

### STEP 7 — INVARIANT

Sau khi xử lý xong hàng `row`:

> mọi `dp[row][col]` đều là tổng lớn nhất có thể tới đúng ô đó.

Vì mỗi ô chỉ có tối đa 2 parent hợp lệ.

---

### STEP 8 — PATTERN

**Pattern:** DP trên DAG/layered grid.

Dấu hiệu:

- đi theo một chiều
- state hiện tại phụ thuộc vài state trước
- nhiều đường hội tụ
- hỏi min/max/count ways

Trigger sentence:

> **“Nhiều path hội tụ vào cùng state → lưu best answer của state đó.”**

---

### STEP 9 — COMPLEXITY

Số ô tam giác:

```text
O(H²)
```

Mỗi ô xử lý O(1).

Total:

```text
O(H²)
```

Space:

```text
O(H²)
```

Có thể tối ưu O(H), nhưng không cần cho recall thi.

---

## 3. Dry Run

Input:

```js
[
  [7],
  [3,8],
  [8,1,0],
  [2,7,4,4],
  [4,5,2,6,5]
]
```

DP:

```text
7

10   15

18   16   15

20   25   20   19

24   30   27   26   24
```

Hàng cuối max:

```text
30
```

---

## 4. Bộ phim hình ảnh

Mỗi ô hỏi đúng một câu:

```text
“Trong hai ông bố phía trên,
ông nào mang tổng lớn hơn?”
```

Rồi:

```text
bestParent + giá trị hiện tại
```

Hai mép tam giác chỉ có 1 parent.

---

## 5. Code Skeleton Recall

```js
function solution(triangle) {
  const dp = triangle.map(
    row => [...row]
  )

  for (
    let row = 1;
    row < triangle.length;
    row++
  ) {
    for (
      let col = 0;
      col < triangle[row].length;
      col++
    ) {
      const leftParent =
        col > 0
          ? dp[row - 1][col - 1]
          : -Infinity

      const rightParent =
        col < row
          ? dp[row - 1][col]
          : -Infinity

      dp[row][col] =
        triangle[row][col] +
        Math.max(
          leftParent,
          rightParent
        )
    }
  }

  let answer = 0
  const lastRow =
    dp[dp.length - 1]

  for (const value of lastRow) {
    answer = Math.max(
      answer,
      value
    )
  }

  return answer
}
```

---

## 6. Code shape ngắn hơn — mutate DP trực tiếp

```js
function solution(triangle) {
  for (let row = 1; row < triangle.length; row++) {
    for (let col = 0; col < triangle[row].length; col++) {
      const left =
        col > 0
          ? triangle[row - 1][col - 1]
          : -Infinity

      const right =
        col < row
          ? triangle[row - 1][col]
          : -Infinity

      triangle[row][col] +=
        Math.max(left, right)
    }
  }

  return Math.max(
    ...triangle[triangle.length - 1]
  )
}
```

Với row cuối tối đa 500 phần tử, spread ở đây an toàn.

---

## 7. 4 câu thần chú trước khi code

### LOOP LEVELS

```text
for row từ 1
    for col trong row
        lấy max của 2 parent hợp lệ
        cộng current
```

### RESET WHEN

Không reset.

DP tích lũy từ trên xuống.

### INVALIDATES WHAT

Parent invalid nếu vượt mép tam giác.

Dùng:

```text
-Infinity
```

cho parent không tồn tại.

### COMMIT WHEN

Ngay tại mỗi ô:

```js
dp[row][col] =
  value + max(parent1, parent2)
```

Cuối cùng lấy max hàng cuối.

---

## 8. Trap dễ chết

### Trap 1 — DFS brute force

Height 500.

Không enumerate path.

---

### Trap 2 — Mép trái / mép phải

Mép trái chỉ có parent:

```text
[row-1][0]
```

Mép phải chỉ có parent:

```text
[row-1][col-1]
```

---

### Trap 3 — Lấy max toàn bộ triangle

Sai.

Đường đi phải kết thúc ở đáy.

Answer là max ở:

```text
last row
```

---

### Trap 4 — Update sai thứ tự nếu dùng 1D DP

Nếu tối ưu 1D phải rất cẩn thận direction update.

Ngày trước thi thì bản 2D/mutate triangle dễ nhớ và ít lỗi hơn.

---

## 9. Recall 20 giây

> **Nhận diện:** nhiều path hội tụ vào cùng ô → DP.

> **State:** `dp[r][c] = max sum tới ô này`.

> **Transition:** current + max(2 parent).

> **Base:** đỉnh.

> **Boundary:** parent ngoài tam giác = invalid.

> **Answer:** max hàng cuối.

> **Complexity:** O(H²).

### Code shape

```js
for (let r = 1; r < H; r++) {
  for (let c = 0; c <= r; c++) {
    dp[r][c] = triangle[r][c] +
      Math.max(
        c > 0 ? dp[r-1][c-1] : -Infinity,
        c < r ? dp[r-1][c] : -Infinity
      )
  }
}
```

## 🧠 Một câu phải khắc vào đầu

> **“DP triangle: mỗi ô = value hiện tại + best của tối đa 2 parent; answer ở hàng cuối.”**

---

[⬆ Quay lại INDEX](00_PCCP_FINAL_INDEX.md)

---

# Bài 34 — 등굣길 (Đường đến trường)

🔗 **Đề chính thức (Programmers):** https://school.programmers.co.kr/learn/courses/30/lessons/42898

**Pattern:** Grid DP / Count Paths + Obstacles + Modulo  
**Trigger:** `chỉ đi phải/xuống + đếm số cách + có ô cấm`

---

## 1. Dịch đề tiếng Việt

Có một grid kích thước:

```text
m x n
```

Trong đó:

```text
m = số cột
n = số hàng
```

Nhà ở:

```text
(1,1)
```

Trường ở:

```text
(m,n)
```

Chỉ được đi:

```text
sang phải
hoặc
xuống dưới
```

Một số ô bị ngập (`puddles`) và không được đi qua.

Cần trả về:

> số đường đi ngắn nhất từ nhà tới trường, modulo `1,000,000,007`.

Vì chỉ được đi phải/xuống nên mọi đường từ start tới end đều có cùng số bước:

```text
(m-1) + (n-1)
```

Nên bài thực chất là **đếm số path hợp lệ**.

---

## 2. Phân tích 9 bước

### STEP 1 — CONTRACT

State:

```text
dp[row][col]
=
số cách đi từ nhà tới ô này
```

Transition:

```text
dp[row][col]
=
dp[row-1][col]
+
dp[row][col-1]
```

nếu ô hiện tại không phải puddle.

---

### STEP 2 — BOUND

```text
m,n <= 100
```

Grid tối đa:

```text
10,000 ô
```

DP O(m*n) rất nhẹ.

---

### STEP 3 — BRUTE FORCE

DFS enumerate mọi path có thể bùng nổ theo tổ hợp.

Không cần vì số cách tới một ô chỉ phụ thuộc:

```text
ô trên
+
ô trái
```

---

### STEP 4 — BOTTLENECK

Điểm dễ sai nhất:

> `puddles` cho tọa độ theo `(x,y)`.

Ví dụ:

```js
[2, 3]
```

nghĩa là:

```text
column = 2
row = 3
```

Nhưng trong array:

```js
dp[row][col]
```

nên phải mark:

```js
blocked[3][2] = true
```

Nếu dùng 1-based DP thì rất sạch.

---

### STEP 5 — STATE

Dùng 1-based để khớp đề:

```js
const dp =
  Array.from(
    { length: n + 1 },
    () => Array(m + 1).fill(0)
  )
```

Blocked:

```js
const blocked =
  Array.from(
    { length: n + 1 },
    () => Array(m + 1).fill(false)
  )
```

Base:

```js
dp[1][1] = 1
```

---

### STEP 6 — TRANSITION

Mark puddles:

```js
for (const [x, y] of puddles) {
  blocked[y][x] = true
}
```

Loop:

```js
for (let row = 1; row <= n; row++) {
  for (let col = 1; col <= m; col++) {
```

Nếu start thì skip vì đã set 1.

Nếu blocked:

```js
continue
```

Transition:

```js
const fromTop =
  row > 1 ? dp[row - 1][col] : 0

const fromLeft =
  col > 1 ? dp[row][col - 1] : 0

dp[row][col] =
  (fromTop + fromLeft) % MOD
```

---

### STEP 7 — INVARIANT

Sau khi xử lý ô `(row,col)`:

> `dp[row][col]` đúng bằng số path hợp lệ từ start tới ô đó modulo MOD.

Vì chỉ có đúng 2 cách đi vào một ô:

```text
từ trên xuống
hoặc
từ trái sang
```

---

### STEP 8 — PATTERN

**Pattern:** Grid DP count ways.

Dấu hiệu:

- grid
- chỉ move theo vài hướng cố định
- hỏi số cách
- state tới ô hiện tại phụ thuộc vài ô trước
- có obstacles

Trigger sentence:

> **“Count paths trên grid, move phải/xuống → current = top + left.”**

---

### STEP 9 — COMPLEXITY

Loop grid:

```text
O(n*m)
```

Space:

```text
O(n*m)
```

Với 100x100 quá nhẹ.

---

## 3. Dry Run

Ví dụ:

```js
m = 4
n = 3
puddles = [[2,2]]
```

Grid DP 1-based:

```text
start = (1,1)
puddle = (2,2)
```

Bảng số cách:

```text
1  1  1  1
1  X  1  2
1  1  2  4
```

Answer:

```text
4
```

---

## 4. Bộ phim hình ảnh

Mỗi ô hỏi:

```text
“Có bao nhiêu cách tới tao?”
```

Câu trả lời:

```text
cách từ trên
+
cách từ trái
```

Nếu ô bị ngập:

```text
0 cách
```

và không truyền path qua đó.

---

## 5. Code Skeleton Recall

```js
function solution(m, n, puddles) {
  const MOD = 1_000_000_007

  const blocked = Array.from(
    { length: n + 1 },
    () => Array(m + 1).fill(false)
  )

  for (const [x, y] of puddles) {
    blocked[y][x] = true
  }

  const dp = Array.from(
    { length: n + 1 },
    () => Array(m + 1).fill(0)
  )

  dp[1][1] = 1

  for (let row = 1; row <= n; row++) {
    for (let col = 1; col <= m; col++) {
      if (row === 1 && col === 1) {
        continue
      }

      if (blocked[row][col]) {
        continue
      }

      const fromTop =
        row > 1
          ? dp[row - 1][col]
          : 0

      const fromLeft =
        col > 1
          ? dp[row][col - 1]
          : 0

      dp[row][col] =
        (fromTop + fromLeft) % MOD
    }
  }

  return dp[n][m]
}
```

---

## 6. 4 câu thần chú trước khi code

### LOOP LEVELS

```text
mark puddles

dp[1][1] = 1

for row 1..n
    for col 1..m
        start? skip
        blocked? skip
        dp = top + left
```

### RESET WHEN

Không reset.

DP build một lần theo row-major order.

### INVALIDATES WHAT

Ô hiện tại invalid nếu:

```text
blocked
```

Path từ ngoài grid:

```text
0
```

### COMMIT WHEN

Ngay tại ô:

```js
dp[row][col] =
  (top + left) % MOD
```

---

## 7. Trap dễ chết

### Trap 1 — Nhầm m,n với row,col

Đề:

```text
m = width = columns
n = height = rows
```

DP:

```js
dp[n + 1][m + 1]
```

---

### Trap 2 — Nhầm puddle [x,y]

Đề cho:

```text
[x, y]
```

Array dùng:

```text
[row][col]
```

nên:

```js
blocked[y][x] = true
```

---

### Trap 3 — Quên modulo

Phải modulo mỗi update:

```js
(top + left) % MOD
```

---

### Trap 4 — Set puddle = 0 nhưng lại update tiếp

Nếu blocked thì:

```js
continue
```

không transition.

---

### Trap 5 — Base case start

Phải:

```js
dp[1][1] = 1
```

Nếu quên thì mọi ô sau đều 0.

---

## 8. Recall 20 giây

> **Nhận diện:** grid count paths + right/down → DP.

> **State:** `dp[r][c] = số cách tới ô`.

> **Transition:** top + left.

> **Obstacle:** blocked → 0 / skip.

> **Base:** dp[1][1] = 1.

> **Coordinate trap:** puddles `[x,y]` → `blocked[y][x]`.

> **Answer:** dp[n][m].

> **Complexity:** O(n*m).

### Code shape

```js
for (const [x, y] of puddles) {
  blocked[y][x] = true
}

dp[1][1] = 1

for (let r = 1; r <= n; r++) {
  for (let c = 1; c <= m; c++) {
    if (r === 1 && c === 1) continue
    if (blocked[r][c]) continue

    dp[r][c] =
      ((r > 1 ? dp[r-1][c] : 0) +
       (c > 1 ? dp[r][c-1] : 0)) % MOD
  }
}
```

## 🧠 Một câu phải khắc vào đầu

> **“Grid count paths: current = top + left; puddles [x,y] phải đảo thành [row=y][col=x].”**

---

[⬆ Quay lại INDEX](00_PCCP_FINAL_INDEX.md)

---

# Bài 35 — 두 큐 합 같게 만들기 (Làm tổng hai queue bằng nhau)

🔗 **Đề chính thức (Programmers):** https://school.programmers.co.kr/learn/courses/30/lessons/118667

**Pattern:** Two Pointers / Queue Simulation / Circular Window  
**Trigger:** `hai queue + chỉ được pop front rồi push sang queue kia + cần cân bằng tổng`

---

## 1. Dịch đề tiếng Việt

Có hai queue cùng độ dài.

Một operation:

```text
chọn một queue
→ pop phần tử đầu
→ push phần tử đó vào cuối queue kia
```

Ta cần:

> số operation nhỏ nhất để tổng hai queue bằng nhau.

Nếu không thể:

```text
return -1
```

---

## 2. Phân tích 9 bước

### STEP 1 — CONTRACT

Gọi:

```text
sum1 = tổng queue1
sum2 = tổng queue2
```

Nếu hai queue bằng tổng thì mỗi queue phải có:

```text
target = (sum1 + sum2) / 2
```

Nếu total lẻ:

```text
không thể
```

→ return `-1`.

---

### STEP 2 — BOUND + JS NUMERIC SAFETY

```text
length mỗi queue <= 300,000
value <= 1e9
```

Tổng tối đa:

```text
600,000 * 1e9 = 6e14
```

Trong khi:

```text
Number.MAX_SAFE_INTEGER ≈ 9e15
```

→ **JavaScript Number an toàn** cho toàn bộ phép cộng/trừ ở bài này.

Không cần BigInt.

---

### STEP 3 — BRUTE FORCE

Không được dùng:

```js
queue.shift()
```

lặp hàng trăm nghìn lần vì reindex array có thể rất tốn.

Cũng không cần thử mọi chuỗi move.

Do tất cả phần tử đều dương, mỗi bước điều chỉnh tổng bị ép theo một hướng.

---

### STEP 4 — BOTTLENECK

Nếu:

```text
sum1 > target
```

thì queue1 đang quá nặng.

Muốn giảm sum1, operation hợp lý duy nhất là:

```text
pop front queue1 → queue2
```

Nếu:

```text
sum1 < target
```

thì phải lấy front queue2 sang queue1.

Vì mọi value > 0 nên đây chính là greedy/two-pointer deterministic.

---

### STEP 5 — STATE

Ghép thứ tự ban đầu:

```js
const arr = [...queue1, ...queue2]
```

Xem queue1 hiện tại như một đoạn liên tiếp trên vòng tròn `arr`.

Ban đầu:

```text
left = 0
right = queue1.length
```

Window:

```text
arr[left ... right-1]
```

chính là queue1.

`right` và `left` chỉ tăng; đọc phần tử bằng:

```js
arr[index % arr.length]
```

---

### STEP 6 — TRANSITION

Nếu queue1 quá nặng:

```js
sum1 -= arr[left % totalLength]
left++
```

Tương đương:

```text
queue1 pop front → queue2 push back
```

Nếu queue1 quá nhẹ:

```js
sum1 += arr[right % totalLength]
right++
```

Tương đương:

```text
queue2 pop front → queue1 push back
```

Mỗi lần pointer tăng = 1 operation.

---

### STEP 7 — INVARIANT

Ở mọi thời điểm:

> đoạn circular `[left, right)` biểu diễn chính xác các phần tử hiện đang nằm trong queue1 theo đúng thứ tự.

Và:

```text
sum1 = tổng của đoạn đó
```

Do chỉ move front sang back nên global cyclic order của các phần tử không thay đổi.

---

### STEP 8 — PATTERN

**Pattern:** Two pointers trên circular sequence.

Dấu hiệu:

- queue operation chỉ move front → back queue kia
- values dương
- mục tiêu là điều chỉnh một tổng tới target
- nếu sum quá lớn thì bắt buộc shrink trái
- nếu sum quá nhỏ thì bắt buộc expand phải

Trigger sentence:

> **“Queue front-to-back + positive values + target sum → biến queue thành circular window rồi two pointers.”**

---

### STEP 9 — COMPLEXITY

Mỗi operation chỉ tăng một pointer.

Ta chỉ cần duyệt hữu hạn số state; dùng bound bảo thủ:

```text
4 * n operations
```

Nếu sau một vòng đầy đủ của cả hai pointer mà không đạt target thì trạng thái bắt đầu lặp theo chu kỳ và không có lời giải mới.

Time:

```text
O(n)
```

Space:

```text
O(n)
```

cho mảng ghép.

---

## 3. Dry Run

```js
queue1 = [3,2,7,2]
queue2 = [4,6,5,1]
```

```text
sum1 = 14
sum2 = 16
target = 15
```

### Step 1

```text
14 < 15
```

Lấy front queue2 = `4` sang queue1:

```text
sum1 = 18
operations = 1
```

### Step 2

```text
18 > 15
```

Lấy front queue1 = `3` sang queue2:

```text
sum1 = 15
operations = 2
```

Answer:

```text
2
```

---

## 4. Bộ phim hình ảnh

Đừng tưởng tượng hai array bị `shift/push` liên tục.

Hãy tưởng tượng một vòng tròn:

```text
3 2 7 2 | 4 6 5 1 | 3 2 7 2 | ...
^         ^
left      right
```

Queue1 chính là đoạn nằm giữa hai pointer.

Nếu tổng quá lớn:

```text
left →
```

Nếu tổng quá nhỏ:

```text
right →
```

---

## 5. Code Skeleton Recall — JS safe

```js
function solution(queue1, queue2) {
  const n = queue1.length

  let sum1 = 0
  let sum2 = 0

  for (const value of queue1) {
    sum1 += value
  }

  for (const value of queue2) {
    sum2 += value
  }

  const total = sum1 + sum2

  if (total % 2 !== 0) {
    return -1
  }

  const target = total / 2

  if (sum1 === target) {
    return 0
  }

  const arr = queue1.concat(queue2)
  const length = arr.length

  let left = 0
  let right = n
  let operations = 0

  const limit = 4 * n

  while (operations < limit) {
    if (sum1 === target) {
      return operations
    }

    if (sum1 > target) {
      sum1 -= arr[left % length]
      left++
    } else {
      sum1 += arr[right % length]
      right++
    }

    operations++
  }

  return sum1 === target
    ? operations
    : -1
}
```

---

## 6. Vì sao greedy này cho minimum operations?

Tại một state:

### Nếu `sum1 > target`

Muốn giảm tổng queue1 thì chỉ có một loại operation hữu ích:

```text
pop front queue1
```

Move từ queue2 sang queue1 chỉ làm sum1 tăng thêm vì value dương.

### Nếu `sum1 < target`

Muốn tăng sum1 thì chỉ có:

```text
pop front queue2 → queue1
```

Move ngược lại chỉ làm sum1 nhỏ hơn.

Nên mỗi bước gần như bị ép; không có nhánh lựa chọn để brute-force.

---

## 7. 4 câu thần chú trước khi code

### LOOP LEVELS

```text
calculate sums
target = total/2

while under bound
    sum == target? return ops
    sum > target? move left
    sum < target? move right
```

### RESET WHEN

Không reset pointer.

`left` và `right` chỉ tăng.

### INVALIDATES WHAT

Ngay đầu:

```text
total odd → impossible
```

Sau khi vượt đủ state bound mà vẫn chưa hit target:

```text
-1
```

### COMMIT WHEN

Mỗi pointer move:

```text
operations++
```

Khi:

```js
sum1 === target
```

return ngay.

---

## 8. Trap dễ chết

### Trap 1 — `shift()`

N tới 300,000.

Không dùng queue shift liên tục.

---

### Trap 2 — Chỉ check `sum1 === sum2`

Có thể, nhưng recall tốt hơn là tính một target cố định:

```js
target = total / 2
```

---

### Trap 3 — Total lẻ

Nếu total odd:

```text
không thể chia đôi
```

return `-1`.

---

### Trap 4 — Dùng BigInt vô ích

Bài này max sum chỉ khoảng:

```text
6e14
```

vẫn integer-safe trong JS Number.

---

### Trap 5 — Không có termination bound

Case impossible có thể loop vòng tròn mãi.

Phải có giới hạn số pointer moves.

---

## 9. Recall 20 giây

> **Nhận diện:** move front giữa 2 queue + positive values + equal sum → circular two pointers.

> **Target:** `(sum1+sum2)/2`.

> **Odd total:** -1.

> **sum1 > target:** pop q1 → `left++`.

> **sum1 < target:** pop q2 → `right++`.

> **Không shift():** dùng pointer + modulo.

> **JS Number:** safe vì max sum ≈ 6e14.

> **Complexity:** O(n).

### Code shape

```js
while (ops < 4 * n) {
  if (sum1 === target) return ops

  if (sum1 > target) {
    sum1 -= arr[left % len]
    left++
  } else {
    sum1 += arr[right % len]
    right++
  }

  ops++
}
```

## 🧠 Một câu phải khắc vào đầu

> **“Hai queue này thực chất là một circular window: sum lớn thì left++, sum nhỏ thì right++.”**

---

[⬆ Quay lại INDEX](00_PCCP_FINAL_INDEX.md)

---

# Bài 36 — 숫자 변환하기 (Biến đổi số)

🔗 **Đề chính thức (Programmers):** https://school.programmers.co.kr/learn/courses/30/lessons/154538

**Pattern:** BFS on State Space / Shortest Operations  
**Trigger:** `state là một số + mỗi operation cost = 1 + hỏi minimum operations`

---

## 1. Dịch đề tiếng Việt

Ta muốn biến số tự nhiên `x` thành `y`.

Mỗi lần được chọn đúng một operation:

```text
x + n
x * 2
x * 3
```

Mỗi operation tính là:

```text
1 bước
```

Mục tiêu:

> tìm số operation ít nhất để biến `x` thành `y`.

Nếu không thể:

```text
return -1
```

---

## 2. Phân tích 9 bước

### STEP 1 — CONTRACT

Mỗi giá trị number là một state.

Từ state `value`, neighbors là:

```text
value + n
value * 2
value * 3
```

Mọi transition đều cost:

```text
1
```

→ shortest number of operations = BFS.

---

### STEP 2 — BOUND

```text
1 <= x <= y <= 1,000,000
```

Mọi operation đều làm số tăng.

Do đó nếu:

```text
next > y
```

thì không bao giờ quay lại y được.

→ không enqueue.

Visited tối đa:

```text
y + 1
```

≈ 1 triệu state.

JS vẫn ổn.

---

### STEP 3 — BRUTE FORCE

DFS có thể tạo 3 nhánh mỗi bước:

```text
3^depth
```

rất nhanh bùng nổ.

BFS + visited tránh xét lại cùng state.

---

### STEP 4 — BOTTLENECK

Ta cần:

> **minimum số operation**

và tất cả transition cost bằng nhau.

Đó là dấu hiệu BFS chuẩn.

---

### STEP 5 — STATE

Queue state có thể là:

```js
[value, steps]
```

Visited:

```js
const visited =
  Array(y + 1).fill(false)
```

Start:

```js
queue = [[x, 0]]
visited[x] = true
```

---

### STEP 6 — TRANSITION

Từ current:

```js
const nextValues = [
  current + n,
  current * 2,
  current * 3,
]
```

Mỗi next:

```text
> y → skip
visited → skip
else mark + enqueue
```

---

### STEP 7 — INVARIANT

Khi một number được enqueue lần đầu:

> số `steps` đi cùng nó là minimum operations để đi từ x tới number đó.

BFS đi theo layer:

```text
0 operations
1 operation
2 operations
...
```

---

### STEP 8 — PATTERN

**Pattern:** BFS on state transformation.

Dấu hiệu:

- state không nhất thiết là graph node có sẵn
- đề cho vài operation để sinh state mới
- mỗi operation cost như nhau
- hỏi minimum operations

Trigger sentence:

> **“Rule sinh state + mỗi bước cost 1 + hỏi min → BFS.”**

---

### STEP 9 — COMPLEXITY

Mỗi integer từ x tới y visited tối đa một lần.

Mỗi state sinh tối đa 3 neighbors.

Time:

```text
O(y - x + 1)
```

Space:

```text
O(y)
```

Worst case:

```text
~1,000,001
```

vẫn ổn.

---

## 3. Dry Run

Ví dụ:

```js
x = 10
y = 40
n = 5
```

BFS:

```text
step 0:
10

step 1:
15, 20, 30

step 2:
...
40
```

Có path:

```text
10 → 20 → 40
```

→ answer = 2.

---

## 4. Bộ phim hình ảnh

Tưởng tượng từ `x` mọc ra 3 cành:

```text
+n
*2
*3
```

BFS lan theo số operation:

```text
layer 0 = x
layer 1 = các số đạt sau 1 operation
layer 2 = các số đạt sau 2 operations
...
```

Lần đầu chạm `y` = minimum.

---

## 5. Code Skeleton Recall

```js
function solution(x, y, n) {
  if (x === y) {
    return 0
  }

  const visited =
    Array(y + 1).fill(false)

  const queue = [[x, 0]]
  let head = 0

  visited[x] = true

  while (head < queue.length) {
    const [current, steps] =
      queue[head++]

    const nextValues = [
      current + n,
      current * 2,
      current * 3,
    ]

    for (const next of nextValues) {
      if (next > y) {
        continue
      }

      if (visited[next]) {
        continue
      }

      if (next === y) {
        return steps + 1
      }

      visited[next] = true
      queue.push([
        next,
        steps + 1
      ])
    }
  }

  return -1
}
```

---

## 6. 4 câu thần chú trước khi code

### LOOP LEVELS

```text
queue BFS
    pop current
    generate 3 next states
        > y? skip
        visited? skip
        target? return
        mark + enqueue
```

### RESET WHEN

Không reset visited.

Một BFS duy nhất.

### INVALIDATES WHAT

State invalid nếu:

```text
next > y
hoặc đã visited
```

### COMMIT WHEN

Mark visited ngay trước enqueue:

```js
visited[next] = true
```

Khi hit target:

```js
return steps + 1
```

---

## 7. Trap dễ chết

### Trap 1 — Không bound `next > y`

Vì operation chỉ tăng, đi quá y là vô ích.

---

### Trap 2 — DFS rồi lấy path đầu tiên

Không đảm bảo minimum.

---

### Trap 3 — Không visited

Một state có thể tới từ nhiều path khác nhau.

Phải dedupe.

---

### Trap 4 — Mark visited khi dequeue

Có thể enqueue duplicate state nhiều lần.

Mark khi enqueue.

---

### Trap 5 — Quên case x === y

Constraints cho phép:

```text
x == y
```

Answer phải:

```text
0
```

---

## 8. Recall 20 giây

> **Nhận diện:** min operations + mỗi op cost 1 → BFS.

> **State:** current number.

> **Neighbors:** `+n`, `*2`, `*3`.

> **Bound:** `next <= y`.

> **Visited:** mark khi enqueue.

> **Hit y:** return steps+1.

> **Fail:** -1.

> **Complexity:** O(y).

### Code shape

```js
queue = [[x,0]]
visited[x] = true

while (head < queue.length) {
  const [cur, step] = queue[head++]

  for (const next of [
    cur + n,
    cur * 2,
    cur * 3
  ]) {
    if (next > y) continue
    if (visited[next]) continue

    if (next === y) {
      return step + 1
    }

    visited[next] = true
    queue.push([next, step + 1])
  }
}
```

## 🧠 Một câu phải khắc vào đầu

> **“Min operations + mỗi operation cost 1 → BFS; operation chỉ tăng thì bound ở y.”**

---

[⬆ Quay lại INDEX](00_PCCP_FINAL_INDEX.md)
