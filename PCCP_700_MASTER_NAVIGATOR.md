# PCCP 700+ — Master Navigator duy nhất

> Release audit: 15/08/2026 · Ngôn ngữ: JavaScript · Ngày thi người học cung cấp: 12/09/2026

**Chỉ cần bookmark file này.** Đây là file duy nhất dùng để quyết định hôm nay học gì, đọc ở đâu và làm bài nào. Mọi file khác chỉ được mở bằng link từ Navigator.

**Tiến độ lesson chuẩn 18 phần:** 67/67 bài public đã certified; 0 bài public còn lại; 8 bài mock giữ khóa. Chạy `npm run check:lessons` để lấy con số authoritative.

**Tầng transfer/biến thể:** [Pattern Families — navigator 67 bài → 24 pattern](docs/pccp-700-roadmap/pattern-families/README.md). Hoàn tất 67/67 bài được map và 24/24 family đã viết chi tiết. Chạy `npm run check:patterns` để audit coverage.

**Tầng drill sâu:** `PCCP_Algorithm_Code_Notebook/` đã đạt **89/89 `FRAMEWORK-FULL`**, nhưng có crosswalk/tên pattern có thể làm lộ hai past set. Vì vậy Navigator chỉ mở link vào thư viện này ở **D26, sau D24**. Trước đó chỉ dùng đúng chapter/lesson được giao trong bảng ngày; chạy `npm run check:notebook-integration` để audit coverage.

**Tầng kiểm tra trộn:** notebook có 8 Mixed Tests và 4 gate 120 phút, solution tách riêng, tracker, rubric và executable revealing tests. Chúng cũng chỉ unlock từ **D26**; bốn mock/past set D18–D24 vẫn đi bằng launcher khóa riêng.

Tìm nhanh:

- [Bắt đầu ngay](#0-bắt-đầu-ngay)
- [Bản đồ navigation 69/69](#01-bản-đồ-navigation-6969)
- [Nguồn và độ tin cậy](#1-vì-sao-phạm-vi-này-đáng-tin)
- [100% syllabus PCCP](#2-100-syllabus-pccp-được-công-bố)
- [100% public course outline](#3-100-public-outline-của-khóa-luyện-pccp-chính-thức)
- [47/47 bài Algorithm Practice Kit](#4-100-algorithm-practice-kit-10-nhóm-47-bài)
- [Bài official bổ sung](#5-bài-official-bổ-sung-ngoài-kit)
- [Ma trận đóng kín syllabus](#51-ma-trận-đóng-kín-syllabus)
- [Thứ tự học D1 → D28](#6-thứ-tự-học-bắt-buộc)
- [Luật giảm tải](#7-luật-giảm-tải-đúng-mục-tiêu-700)
- [Definition of done](#8-definition-of-done)
- [Chiến thuật thi](#9-chiến-thuật-120-phút)
- [Fact và quyết định của repo](#10-source-boundary--fact-và-quyết-định-của-repo)
- [Đã có và còn thiếu gì từ Programmers](#11-resource-coverage-ledger)

## 0. Bắt đầu ngay

1. Mở [Tracker](TRACKER_PCCP_REBUILD_2026.csv), tìm dòng đầu tiên chưa có `completed_at`.
2. Quay lại bảng “Thứ tự học bắt buộc” trong file này, mở đúng dòng `Dxx` đó.
3. Đọc đúng chương/lab được link; không đọc cả handbook.
4. Mở đúng bài `OFxxx`; tự làm trước khi xem code/template.
5. Kết thúc buổi: điền kết quả thật vào Tracker và lỗi thật vào [Error Log](docs/pccp-700-roadmap/PCCP_Error_Log.csv).

Tracker được reset theo sprint khả thi 15/08 → 11/09. Nếu chưa có dòng nào ghi `completed_at`, điểm bắt đầu là **D1**. Nếu đã hoàn thành bài ở ngoài tracker, ghi kết quả/submission thật rồi dùng thời gian đó để recode hoặc repair; không tự thêm bài STRETCH.

### 0.1 Bản đồ navigation 69/69

Navigator **điều hướng đủ 69/69 ID**, nhưng lịch ngày không bắt làm cả 69 trước kỳ thi:

| Dải ID | Đi đâu từ đây? | Vai trò trong lịch |
|---|---|---|
| `OF001–OF047` | [47 dòng riêng trong Algorithm Practice Kit](#4-100-algorithm-practice-kit-10-nhóm-47-bài); mỗi dòng có link đề Programmers và lesson 18 phần | 32 CORE được chọn xuyên suốt D1–D16; các TRANSFER/STRETCH còn lại dùng khi repair hoặc sau khi CORE chắc |
| `OF048–OF061` | [14 dòng riêng trong bài official bổ sung](#5-bài-official-bổ-sung-ngoài-kit); mỗi dòng có link đề và lesson | Bổ sung các bridge còn thiếu; lịch gọi đúng bài cần thiết |
| `OF062–OF065` | [Launcher Past Set A](locked/PAST_SET_A_LAUNCH.md) | Bốn link chỉ honor-unlock ở D22 khi timer đã chạy |
| `OF066–OF069` | [Launcher Past Set B](locked/PAST_SET_B_LAUNCH.md) | Bốn link chỉ honor-unlock ở D24 khi timer đã chạy |

Con số phải hiểu đúng:

- **69/69 có đường điều hướng:** 61 bài hiện link riêng trong §4–5 + 8 bài nằm trong hai launcher khóa.
- **43/69 OF được giao ngày cụ thể:** 32 CORE + `OF054`, `OF056`, `OF059` + 8 past-paper; thêm `SR002` là String gate, thành 44 ID thực thi trong lịch.
- **26 OF không bị thiếu:** đó là 19 TRANSFER + 7 STRETCH còn lại, có direct link ở §4–5 nhưng không bị ép vào sprint 28 ngày.

Việc không lịch hóa cả 69 là quyết định tải học cho mục tiêu 700+, không phải thiếu tài liệu. Nếu hoàn tất lịch sớm, lấy bài TRANSFER/STRETCH theo root cause trong Error Log; không làm tuần tự chỉ để tăng số lượng.

Luồng cố định:

```text
MASTER NAVIGATOR
→ dòng học đầu tiên chưa completed
→ đúng mục handbook/lab
→ đúng bài official OFxxx
→ submit Programmers
→ tracker + error log
```

## 1. Vì sao phạm vi này đáng tin

### 1.1 Nguồn có quyền quyết định

| Nguồn | Nó được phép xác nhận gì? |
|---|---|
| [Trang PCCP hiện hành](https://certi.programmers.co.kr/about/pccp) | Cấu trúc, ngôn ngữ, cách thi và phạm vi hiện hành |
| [Brochure chứng chỉ chính thức](https://business.programmers.co.kr/static/business/certification_intro.pdf) | 4 câu/120 phút, syllabus, level và năng lực đánh giá |
| [Khóa luyện PCCP của Programmers](https://school.programmers.co.kr/learn/courses/14760) | Các module mà Programmers dùng để luyện PCCP và cấu trúc mock |
| [Algorithm Practice Kit](https://school.programmers.co.kr/learn/challenges?tab=algorithm_practice_kit) | 10 nhóm, 47 bài và metadata coding-test do Programmers công bố |
| [Sample hub](https://certi.programmers.co.kr/about/sample) | Điểm vào sample chính thức |
| [PCCP public past course](https://school.programmers.co.kr/learn/courses/19344) | Các câu quá khứ được Programmers công khai |
| [Khóa giải thích past paper](https://school.programmers.co.kr/learn/courses/24542) | Tài nguyên review chính thức sau khi đã tự làm |
| [Candidate Guide hiện hành](https://certi.programmers.co.kr/guide/main?tab=entrance) | Vật dụng, giờ vào phòng, pre-test và quy định môi trường thi |
| [Coding-test UI guide](https://user-guide.grepp.co/en/articles/ProgrammingCoding-Test-161a992a) | Hành vi Run Test, custom test và `Submit Code` từng bài |
| [Education hub](https://certi.programmers.co.kr/education-info/education) | Tài nguyên PCCP/PCCE do Programmers giới thiệu, gồm sách JavaScript 100 bài |

Blog/review người thi không có quyền thêm syllabus, đoán trọng số hoặc quyết định bài CORE.

### 1.2 Dữ kiện kỳ thi

Brochure công bố:

- 4 câu code trong 120 phút;
- JavaScript là ngôn ngữ được hỗ trợ;
- tổng 1.000 điểm, từ 400 là đạt;
- LV.3 là 600–749, nên mục tiêu 700 thuộc LV.3;
- LV.4 bắt đầu từ 750.

Programmers mô tả LV.3 là khả năng giải chính xác bài trung-cao, tự chọn thuật toán phù hợp để xử lý nhiều loại nhiệm vụ. Nguồn: [brochure chính thức](https://business.programmers.co.kr/static/business/certification_intro.pdf), [trang giới thiệu chứng chỉ](https://certi.programmers.co.kr/about/main).

Không có nguồn chính thức công bố “ba câu đúng = 700”, trọng số cố định từng câu hoặc taxonomy đề tương lai. Vì vậy Navigator dùng gate năng lực và mock, không quy đổi số câu sang điểm.

## 2. 100% syllabus PCCP được công bố

Đây là toàn bộ năm lớp năng lực xuất hiện trong brochure, không thêm thuật toán cộng đồng. Từ “등” trong bản tiếng Hàn tương đương “v.v.”, nên danh sách thuật toán được công bố là ví dụ phạm vi, không phải cam kết taxonomy đóng.

| Lớp official | Toàn bộ nội dung công bố | Navigator cover ở đâu? |
|---|---|---|
| 01. Basic program implementation | Viết chương trình thỏa điều kiện và yêu cầu đã cho | D1–D3, D8, D17; Handbook Ch.0, Ch.1, Ch.6, Lab 0/H |
| 02. Basic data structure/algorithm | String, Array, Greedy, Sort | D1–D5, D8, D10–D12; Handbook Ch.1–4, Ch.7–9, Lab H |
| 03. Intermediate data structure/algorithm | Stack, Queue, Deque, Hash, Binary Search, DFS, BFS | D3, D5–D7, D12–D15 |
| 04. Advanced data structure/algorithm | Graph, Tree, Heap, Dynamic Programming | D9, D11, D15–D16 |
| 05. Correct and efficient programming | Phán đoán nhanh; chọn cấu trúc/thuật toán phù hợp; viết chương trình chính xác, không lỗi và hiệu quả | Mọi gate, mock và postmortem |

Nguồn trực tiếp: [Programmers Certification Introduction, trang PCCP](https://business.programmers.co.kr/static/business/certification_intro.pdf).

Phần đối chiếu bài chính, bài chuyển giao và khe hở nằm ở [Ma trận đóng kín syllabus](#51-ma-trận-đóng-kín-syllabus). Không dùng việc “đã nhìn thấy tên thuật toán” làm bằng chứng coverage.

## 3. 100% public outline của khóa luyện PCCP chính thức

Khóa official hiện hiển thị 11 part. Course dùng Python và có phí; Navigator **không bắt mua**. Ta dùng outline của nó làm bằng chứng ưu tiên, còn học/code bằng JavaScript trong handbook này.

Nguồn: [Programmers PCCP preparation course](https://school.programmers.co.kr/learn/courses/14760).

| Part | Nội dung public đầy đủ | Navigator cover |
|---:|---|---|
| 01 | Hashing: bài giảng thuật toán/phân tích → thực hành → giải thích thực hành | D3 |
| 02 | Array implementation: bài giảng thuật toán/phân tích → thực hành → giải thích thực hành | D1–D2, D8 |
| 03 | Two pointers: bài giảng thuật toán/phân tích → thực hành → giải thích thực hành | D4–D5 |
| 04 | Sorting & Greedy: bài giảng thuật toán/phân tích → thực hành → giải thích thực hành | D4, D7, D11 |
| 05 | DFS: recursion prerequisite → duplicate-permutation prerequisite → thuật toán/phân tích → thực hành → giải thích | D10, D14 |
| 06 | BFS: level-search prerequisite → thuật toán/phân tích → thực hành → giải thích | D13–D15 |
| 07 | Graph: adjacency matrix/list prerequisite → thuật toán/phân tích → thực hành → giải thích | D11, D14–D15 |
| 08 | PCCP Practice Test 1: bốn câu | D18 Official Mock 1 |
| 09 | Review Test 1: đọc/hiểu requirement từng câu → giải thích từng câu → có mục cải thiện time complexity | D19 |
| 10 | PCCP Practice Test 2: bốn câu | D20 Official Mock 2 |
| 11 | Review Test 2: đọc/hiểu requirement từng câu → giải thích từng câu | D21 |

Khóa mô tả quy trình chính thức: học DSA → giải bài thực hành → làm practice test bốn câu → xem giải thích và vá điểm yếu. Navigator giữ chu trình đó và **tự áp timebox 120 phút**; outline khóa không phải bằng chứng rằng course có timer tích hợp.

### Nội dung syllabus không xuất hiện thành module riêng trong course

Heap, Binary Search và DP có trong syllabus/brochure nhưng không có part độc lập trong public outline trên. Vì vậy chúng vẫn bắt buộc được cover ở D9/D12/D16; không được loại chỉ vì course ưu tiên bảy module khác.

## 4. 100% Algorithm Practice Kit: 10 nhóm, 47 bài

Programmers nói Kit được tạo từ phân tích kết quả coding test, rút ra dạng thường gặp và dạng nhiều người sai. Metadata dưới đây là metadata coding-test chung của Kit, **không phải xác suất PCCP**. Nguồn: [Algorithm Practice Kit](https://school.programmers.co.kr/learn/challenges?tab=algorithm_practice_kit).

### 4.1 Hash — 5/5, tần suất cao, điểm trung bình vừa

| ID | Bài official | Vai trò 700+ |
|---|---|---|
| OF001 | [Người chưa hoàn thành](https://school.programmers.co.kr/learn/courses/30/lessons/42576?language=javascript) · [lesson 18 phần](docs/pccp-700-roadmap/official-lessons/OF001.md) | CORE |
| OF002 | [Ponketmon](https://school.programmers.co.kr/learn/courses/30/lessons/1845?language=javascript) · [lesson 18 phần](docs/pccp-700-roadmap/official-lessons/OF002.md) | TRANSFER |
| OF003 | [Danh bạ điện thoại](https://school.programmers.co.kr/learn/courses/30/lessons/42577?language=javascript) · [lesson 18 phần](docs/pccp-700-roadmap/official-lessons/OF003.md) | CORE |
| OF004 | [Trang phục](https://school.programmers.co.kr/learn/courses/30/lessons/42578?language=javascript) · [lesson 18 phần](docs/pccp-700-roadmap/official-lessons/OF004.md) | CORE |
| OF005 | [Album hay nhất](https://school.programmers.co.kr/learn/courses/30/lessons/42579?language=javascript) · [lesson 18 phần](docs/pccp-700-roadmap/official-lessons/OF005.md) | TRANSFER |

### 4.2 Stack/Queue — 6/6, tần suất vừa, điểm trung bình cao

| ID | Bài official | Vai trò 700+ |
|---|---|---|
| OF006 | [Không thích số giống nhau](https://school.programmers.co.kr/learn/courses/30/lessons/12906?language=javascript) · [lesson 18 phần](docs/pccp-700-roadmap/official-lessons/OF006.md) | TRANSFER |
| OF007 | [Phát triển tính năng](https://school.programmers.co.kr/learn/courses/30/lessons/42586?language=javascript) · [lesson 18 phần](docs/pccp-700-roadmap/official-lessons/OF007.md) | CORE |
| OF008 | [Dấu ngoặc đúng](https://school.programmers.co.kr/learn/courses/30/lessons/12909?language=javascript) · [lesson 18 phần](docs/pccp-700-roadmap/official-lessons/OF008.md) | CORE |
| OF009 | [Tiến trình](https://school.programmers.co.kr/learn/courses/30/lessons/42587?language=javascript) · [lesson 18 phần](docs/pccp-700-roadmap/official-lessons/OF009.md) | CORE |
| OF010 | [Xe tải qua cầu](https://school.programmers.co.kr/learn/courses/30/lessons/42583?language=javascript) · [lesson 18 phần](docs/pccp-700-roadmap/official-lessons/OF010.md) | CORE |
| OF011 | [Giá cổ phiếu](https://school.programmers.co.kr/learn/courses/30/lessons/42584?language=javascript) · [lesson 18 phần](docs/pccp-700-roadmap/official-lessons/OF011.md) | CORE |

### 4.3 Heap — 3/3, tần suất vừa, điểm trung bình cao

| ID | Bài official | Vai trò 700+ |
|---|---|---|
| OF012 | [Cay hơn](https://school.programmers.co.kr/learn/courses/30/lessons/42626?language=javascript) · [lesson 18 phần](docs/pccp-700-roadmap/official-lessons/OF012.md) | CORE |
| OF013 | [Bộ điều khiển đĩa](https://school.programmers.co.kr/learn/courses/30/lessons/42627?language=javascript) · [lesson 18 phần](docs/pccp-700-roadmap/official-lessons/OF013.md) | CORE |
| OF014 | [Hai hàng đợi ưu tiên](https://school.programmers.co.kr/learn/courses/30/lessons/42628?language=javascript) · [lesson 18 phần](docs/pccp-700-roadmap/official-lessons/OF014.md) | TRANSFER |

### 4.4 Sort — 3/3, tần suất cao, điểm trung bình cao

| ID | Bài official | Vai trò 700+ |
|---|---|---|
| OF015 | [Số thứ K](https://school.programmers.co.kr/learn/courses/30/lessons/42748?language=javascript) · [lesson 18 phần](docs/pccp-700-roadmap/official-lessons/OF015.md) | CORE |
| OF016 | [Số lớn nhất](https://school.programmers.co.kr/learn/courses/30/lessons/42746?language=javascript) · [lesson 18 phần](docs/pccp-700-roadmap/official-lessons/OF016.md) | CORE |
| OF017 | [H-Index](https://school.programmers.co.kr/learn/courses/30/lessons/42747?language=javascript) · [lesson 18 phần](docs/pccp-700-roadmap/official-lessons/OF017.md) | TRANSFER |

### 4.5 Exhaustive Search — 7/7, tần suất cao, điểm trung bình thấp

| ID | Bài official | Vai trò 700+ |
|---|---|---|
| OF018 | [Hình chữ nhật nhỏ nhất](https://school.programmers.co.kr/learn/courses/30/lessons/86491?language=javascript) · [lesson 18 phần](docs/pccp-700-roadmap/official-lessons/OF018.md) | TRANSFER |
| OF019 | [Thi thử](https://school.programmers.co.kr/learn/courses/30/lessons/42840?language=javascript) · [lesson 18 phần](docs/pccp-700-roadmap/official-lessons/OF019.md) | TRANSFER |
| OF020 | [Tìm số nguyên tố](https://school.programmers.co.kr/learn/courses/30/lessons/42839?language=javascript) · [lesson 18 phần](docs/pccp-700-roadmap/official-lessons/OF020.md) | TRANSFER |
| OF021 | [Thảm](https://school.programmers.co.kr/learn/courses/30/lessons/42842?language=javascript) · [lesson 18 phần](docs/pccp-700-roadmap/official-lessons/OF021.md) | TRANSFER |
| OF022 | [Độ mệt mỏi](https://school.programmers.co.kr/learn/courses/30/lessons/87946?language=javascript) · [lesson 18 phần](docs/pccp-700-roadmap/official-lessons/OF022.md) | CORE |
| OF023 | [Chia lưới điện](https://school.programmers.co.kr/learn/courses/30/lessons/86971?language=javascript) · [lesson 18 phần](docs/pccp-700-roadmap/official-lessons/OF023.md) | CORE |
| OF024 | [Từ điển nguyên âm](https://school.programmers.co.kr/learn/courses/30/lessons/84512?language=javascript) · [lesson 18 phần](docs/pccp-700-roadmap/official-lessons/OF024.md) | TRANSFER |

### 4.6 Greedy — 6/6, tần suất thấp, điểm trung bình thấp

| ID | Bài official | Vai trò 700+ |
|---|---|---|
| OF025 | [Đồng phục thể dục](https://school.programmers.co.kr/learn/courses/30/lessons/42862?language=javascript) · [lesson 18 phần](docs/pccp-700-roadmap/official-lessons/OF025.md) | TRANSFER |
| OF026 | [Cần điều khiển](https://school.programmers.co.kr/learn/courses/30/lessons/42860?language=javascript) · [lesson 18 phần](docs/pccp-700-roadmap/official-lessons/OF026.md) | STRETCH |
| OF027 | [Tạo số lớn](https://school.programmers.co.kr/learn/courses/30/lessons/42883?language=javascript) · [lesson 18 phần](docs/pccp-700-roadmap/official-lessons/OF027.md) | CORE |
| OF028 | [Xuồng cứu sinh](https://school.programmers.co.kr/learn/courses/30/lessons/42885?language=javascript) · [lesson 18 phần](docs/pccp-700-roadmap/official-lessons/OF028.md) | CORE |
| OF029 | [Nối đảo](https://school.programmers.co.kr/learn/courses/30/lessons/42861?language=javascript) · [lesson 18 phần](docs/pccp-700-roadmap/official-lessons/OF029.md) | TRANSFER |
| OF030 | [Camera kiểm soát](https://school.programmers.co.kr/learn/courses/30/lessons/42884?language=javascript) · [lesson 18 phần](docs/pccp-700-roadmap/official-lessons/OF030.md) | TRANSFER |

### 4.7 Dynamic Programming — 5/5, tần suất thấp, điểm trung bình thấp

| ID | Bài official | Vai trò 700+ |
|---|---|---|
| OF031 | [Biểu diễn bằng N](https://school.programmers.co.kr/learn/courses/30/lessons/42895?language=javascript) · [lesson 18 phần](docs/pccp-700-roadmap/official-lessons/OF031.md) | TRANSFER |
| OF032 | [Tam giác số nguyên](https://school.programmers.co.kr/learn/courses/30/lessons/43105?language=javascript) · [lesson 18 phần](docs/pccp-700-roadmap/official-lessons/OF032.md) | CORE |
| OF033 | [Đường đến trường](https://school.programmers.co.kr/learn/courses/30/lessons/42898?language=javascript) · [lesson 18 phần](docs/pccp-700-roadmap/official-lessons/OF033.md) | CORE |
| OF034 | [Số học](https://school.programmers.co.kr/learn/courses/30/lessons/1843?language=javascript) · [lesson 18 phần](docs/pccp-700-roadmap/official-lessons/OF034.md) | STRETCH |
| OF035 | [Trộm cắp](https://school.programmers.co.kr/learn/courses/30/lessons/42897?language=javascript) · [lesson 18 phần](docs/pccp-700-roadmap/official-lessons/OF035.md) | STRETCH |

### 4.8 DFS/BFS — 7/7, tần suất cao, điểm trung bình thấp

| ID | Bài official | Vai trò 700+ |
|---|---|---|
| OF036 | [Số mục tiêu](https://school.programmers.co.kr/learn/courses/30/lessons/43165?language=javascript) · [lesson 18 phần](docs/pccp-700-roadmap/official-lessons/OF036.md) | CORE |
| OF037 | [Mạng lưới](https://school.programmers.co.kr/learn/courses/30/lessons/43162?language=javascript) · [lesson 18 phần](docs/pccp-700-roadmap/official-lessons/OF037.md) | CORE |
| OF038 | [Đường ngắn nhất bản đồ game](https://school.programmers.co.kr/learn/courses/30/lessons/1844?language=javascript) · [lesson 18 phần](docs/pccp-700-roadmap/official-lessons/OF038.md) | CORE |
| OF039 | [Chuyển đổi từ](https://school.programmers.co.kr/learn/courses/30/lessons/43163?language=javascript) · [lesson 18 phần](docs/pccp-700-roadmap/official-lessons/OF039.md) | CORE |
| OF040 | [Nhặt vật phẩm](https://school.programmers.co.kr/learn/courses/30/lessons/87694?language=javascript) · [lesson 18 phần](docs/pccp-700-roadmap/official-lessons/OF040.md) | STRETCH |
| OF041 | [Hành trình du lịch](https://school.programmers.co.kr/learn/courses/30/lessons/43164?language=javascript) · [lesson 18 phần](docs/pccp-700-roadmap/official-lessons/OF041.md) | TRANSFER |
| OF042 | [Ghép mảnh puzzle](https://school.programmers.co.kr/learn/courses/30/lessons/84021?language=javascript) · [lesson 18 phần](docs/pccp-700-roadmap/official-lessons/OF042.md) | STRETCH |

### 4.9 Binary Search — 2/2, tần suất thấp, điểm trung bình thấp

| ID | Bài official | Vai trò 700+ |
|---|---|---|
| OF043 | [Kiểm tra nhập cảnh](https://school.programmers.co.kr/learn/courses/30/lessons/43238?language=javascript) · [lesson 18 phần](docs/pccp-700-roadmap/official-lessons/OF043.md) | CORE |
| OF044 | [Đá bước](https://school.programmers.co.kr/learn/courses/30/lessons/43236?language=javascript) · [lesson 18 phần](docs/pccp-700-roadmap/official-lessons/OF044.md) | STRETCH |

### 4.10 Graph — 3/3, tần suất thấp, điểm trung bình thấp

| ID | Bài official | Vai trò 700+ |
|---|---|---|
| OF045 | [Node xa nhất](https://school.programmers.co.kr/learn/courses/30/lessons/49189?language=javascript) · [lesson 18 phần](docs/pccp-700-roadmap/official-lessons/OF045.md) | CORE |
| OF046 | [Thứ hạng](https://school.programmers.co.kr/learn/courses/30/lessons/49191?language=javascript) · [lesson 18 phần](docs/pccp-700-roadmap/official-lessons/OF046.md) | TRANSFER |
| OF047 | [Đếm phòng](https://school.programmers.co.kr/learn/courses/30/lessons/49190?language=javascript) · [lesson 18 phần](docs/pccp-700-roadmap/official-lessons/OF047.md) | STRETCH |

Tổng kiểm: `5 + 6 + 3 + 3 + 7 + 6 + 5 + 7 + 2 + 3 = 47`.

`CORE/TRANSFER/STRETCH` là quyết định ôn 700+ của repo, không phải nhãn do Programmers cấp. Việc giữ đủ 47 bài bảo đảm không xóa nhóm nào của Kit; lịch không yêu cầu làm cả 47 trước khi foundation chắc.

## 5. Bài official bổ sung ngoài Kit

Kit không tự cover rõ mọi bridge của syllabus/course như parsing, matrix implementation, variable window, multi-phase BFS, Dijkstra và difference 2D. Navigator chỉ bổ sung lesson vẫn nằm trên Programmers:

| ID | Bài | Dùng để cover | Vai trò |
|---|---|---|---|
| OF048 | [Hạn lưu trữ dữ liệu cá nhân](https://school.programmers.co.kr/learn/courses/30/lessons/150370?language=javascript) · [lesson 18 phần](docs/pccp-700-roadmap/official-lessons/OF048.md) | parsing/date/hash | CORE |
| OF049 | [Dạo công viên](https://school.programmers.co.kr/learn/courses/30/lessons/172928?language=javascript) · [lesson 18 phần](docs/pccp-700-roadmap/official-lessons/OF049.md) | grid implementation | CORE |
| OF050 | [Cuộc đua chạy](https://school.programmers.co.kr/learn/courses/30/lessons/178871?language=javascript) · [lesson 18 phần](docs/pccp-700-roadmap/official-lessons/OF050.md) | array + index hash | CORE |
| OF051 | [Game gắp thú](https://school.programmers.co.kr/learn/courses/30/lessons/64061?language=javascript) · [lesson 18 phần](docs/pccp-700-roadmap/official-lessons/OF051.md) | matrix + mutation + stack | CORE |
| OF052 | [Sự kiện giảm giá](https://school.programmers.co.kr/learn/courses/30/lessons/131127?language=javascript) · [lesson 18 phần](docs/pccp-700-roadmap/official-lessons/OF052.md) | fixed window + hash | CORE |
| OF053 | [Tổng dãy con liên tiếp](https://school.programmers.co.kr/learn/courses/30/lessons/178870?language=javascript) · [lesson 18 phần](docs/pccp-700-roadmap/official-lessons/OF053.md) | positive two pointers | CORE |
| OF054 | [Làm hai queue có tổng bằng nhau](https://school.programmers.co.kr/learn/courses/30/lessons/118667?language=javascript) · [lesson 18 phần](docs/pccp-700-roadmap/official-lessons/OF054.md) | queue pointers/invariant | TRANSFER |
| OF055 | [Thoát mê cung](https://school.programmers.co.kr/learn/courses/30/lessons/159993?language=javascript) · [lesson 18 phần](docs/pccp-700-roadmap/official-lessons/OF055.md) | multi-phase BFS | CORE |
| OF056 | [Biến đổi số](https://school.programmers.co.kr/learn/courses/30/lessons/154538?language=javascript) · [lesson 18 phần](docs/pccp-700-roadmap/official-lessons/OF056.md) | BFS/DP state | TRANSFER |
| OF057 | [Hệ thống đánh chặn](https://school.programmers.co.kr/learn/courses/30/lessons/181188?language=javascript) · [lesson 18 phần](docs/pccp-700-roadmap/official-lessons/OF057.md) | interval greedy | CORE |
| OF058 | [Mua đá quý](https://school.programmers.co.kr/learn/courses/30/lessons/67258?language=javascript) · [lesson 18 phần](docs/pccp-700-roadmap/official-lessons/OF058.md) | variable window | TRANSFER |
| OF059 | [Giao hàng](https://school.programmers.co.kr/learn/courses/30/lessons/12978?language=javascript) · [lesson 18 phần](docs/pccp-700-roadmap/official-lessons/OF059.md) | Dijkstra | TRANSFER |
| OF060 | [Tòa nhà không bị phá](https://school.programmers.co.kr/learn/courses/30/lessons/92344?language=javascript) · [lesson 18 phần](docs/pccp-700-roadmap/official-lessons/OF060.md) | difference array 2D | TRANSFER |
| OF061 | [Số lớn hơn phía sau](https://school.programmers.co.kr/learn/courses/30/lessons/154539?language=javascript) · [lesson 18 phần](docs/pccp-700-roadmap/official-lessons/OF061.md) | monotonic stack transfer | TRANSFER |

OF062–OF069 là hai bộ public past paper. Chúng dùng **honor-system spoiler boundary**: raw bank vẫn tồn tại để audit nhưng không được mở trước D22/D24; Navigator không liệt kê tên/pattern.

### 5.1 Ma trận đóng kín syllabus

`OF001–OF069` là bank được điều hướng từ Navigator; **không phải cả 69 đều được giao ngày cụ thể**. Sáu bài `SR` dưới đây là **coverage reserve**, không phải sáu buổi học mới: chỉ mở khi cột “Điều kiện dùng reserve” đúng hoặc khi muốn chứng minh mình chuyển được pattern sang ngữ cảnh khác. Danh sách máy đọc được nằm tại [Official Syllabus Reserve](PCCP_OFFICIAL_SYLLABUS_RESERVE.csv).

| Thành phần official | Bài chính trong lịch | Bài chuyển giao/đối chứng official | Điều kiện dùng reserve | Trạng thái |
|---|---|---|---|---|
| Implementation | OF015, OF048–OF051 | [SR001 Cộng ma trận](https://school.programmers.co.kr/learn/courses/30/lessons/12950?language=javascript) · [lesson 18 phần](docs/pccp-700-roadmap/official-lessons/SR001.md), [SR005 Tiến độ bài tập](https://school.programmers.co.kr/learn/courses/30/lessons/176962?language=javascript) · [lesson 18 phần](docs/pccp-700-roadmap/official-lessons/SR005.md) | Sai row/col/mutation hoặc event/tie | CLOSED |
| String | OF003, OF048 | [SR002 Nén chuỗi](https://school.programmers.co.kr/learn/courses/30/lessons/60057?language=javascript) · [lesson 18 phần](docs/pccp-700-roadmap/official-lessons/SR002.md) | **Bắt buộc ở D8:** chunk/run, phần dư, long requirement và revealing tests | CLOSED bằng gate D8 |
| Array | OF015, OF028, OF049–OF053 | SR001 | Sai shape/index/nested loop | CLOSED |
| Greedy | OF027, OF028, OF057 | OF025, OF030 | Không cần reserve riêng | CLOSED |
| Sort | OF015, OF016 | OF003, OF017 | Không cần reserve riêng | CLOSED |
| Stack | OF008, OF011, OF027 | OF061, [SR003 Xoay dấu ngoặc](https://school.programmers.co.kr/learn/courses/30/lessons/76502?language=javascript) · [lesson 18 phần](docs/pccp-700-roadmap/official-lessons/SR003.md), SR005 | Chỉ nhận ra stack ở bài ngoặc đơn giản | CLOSED |
| Queue | OF007, OF009, OF010 | OF054, [SR004 Hai chồng thẻ](https://school.programmers.co.kr/learn/courses/30/lessons/159994?language=javascript) · [lesson 18 phần](docs/pccp-700-roadmap/official-lessons/SR004.md) | Còn dùng `shift()` lặp hoặc nhầm front | CLOSED |
| Deque | Template §23 + queue-pointer drills | [SR003 lesson](docs/pccp-700-roadmap/official-lessons/SR003.md) rotation; [SR004 lesson](docs/pccp-700-roadmap/official-lessons/SR004.md) two-front consumption | **SR003 bắt buộc** nếu chưa tự implement bốn phép hai đầu | CLOSED có điều kiện |
| Hash | OF001, OF003, OF004 | OF005, OF050, OF052 | Không cần reserve riêng | CLOSED |
| Binary Search | OF043 | OF044 | Không cần reserve riêng | CLOSED |
| DFS | OF022, OF036, OF037 | OF024, OF041 | Không cần reserve riêng | CLOSED |
| BFS | OF038, OF039, OF055 | OF056 | Không cần reserve riêng | CLOSED |
| Graph | OF045 | OF046, OF059, OF029 | Không cần reserve riêng | CLOSED |
| Tree | OF023 | [SR006 Bán bàn chải đa cấp](https://school.programmers.co.kr/learn/courses/30/lessons/77486?language=javascript) · [lesson 18 phần](docs/pccp-700-roadmap/official-lessons/SR006.md) | **SR006 bắt buộc** nếu chưa code parent propagation | CLOSED có điều kiện |
| Heap | OF012, OF013 | OF014 | Không cần reserve riêng | CLOSED |
| Dynamic Programming | OF032, OF033 | OF031; OF034–OF035 là stretch | Không cần reserve riêng | CLOSED |
| Correctness/efficiency | Ch.0, mọi gate/mock | proof, complexity, revealing tests, postmortem | Fail gate thì repair đúng cluster | CLOSED bằng gate |

`CLOSED` ở đây có nghĩa là **có đường học + ít nhất một bài official làm bằng chứng**, không có nghĩa đề tương lai chỉ có các pattern trên. Brochure dùng từ “v.v.”, nên không ai có thể chứng minh một danh sách hữu hạn chứa mọi biến thể đề tương lai.

## 6. Thứ tự học bắt buộc

Đây là lịch **28 ngày khả thi** từ 15/08 đến 11/09/2026. Mỗi tên bài link thẳng tới đề Programmers; `lesson` link tới phân tích 18 phần. `planned_date` trong [Tracker](TRACKER_PCCP_REBUILD_2026.csv) phải khớp bảng này. Nếu trễ, giữ CORE chưa qua và bỏ transfer trước; không đẩy mock/taper khỏi ngày đã khóa.

**Micro-review D2–D16:** đầu buổi dành 15 phút cho đúng một mục đến hạn trong [Error Log](docs/pccp-700-roadmap/PCCP_Error_Log.csv), không mở lời giải. Bài đã dùng hint hoặc WA phải có `retry_date = D+1`; nếu recall/revealing test chưa sạch thì dời `D+3`, sau lần sạch kiểm lại skeleton + test ở `D+7`. Ghi vào `actual_work`; không nhồi toàn bộ bài cũ và không lấy giờ mock để trả nợ review.

### Phase 1 — Implementation, String, hash, sort và window

| Buổi · ngày | Đọc | Làm | Qua khi |
|---|---|---|---|
| D1 · 15/08 | [Ch.0](docs/pccp-700-roadmap/PCCP_Thinking_Curriculum.md#chương-0--hệ-điều-hành-giải-bài) · [Ch.1 §1.1](docs/pccp-700-roadmap/PCCP_Thinking_Curriculum.md#11-ví-dụ-index-lớn-nhất-hòa-lấy-index-nhỏ-nhất) | [OF015 — Số thứ K](https://school.programmers.co.kr/learn/courses/30/lessons/42748?language=javascript) · [lesson](docs/pccp-700-roadmap/official-lessons/OF015.md); [OF050 — Cuộc đua chạy](https://school.programmers.co.kr/learn/courses/30/lessons/178871?language=javascript) · [lesson](docs/pccp-700-roadmap/official-lessons/OF050.md) | Baseline thật; contract/bound/complexity trước code; numeric sort không nhìn |
| D2 · 16/08 | [Ch.1 §1.2–1.4](docs/pccp-700-roadmap/PCCP_Thinking_Curriculum.md#12-matrix-luôn-tách-hàng-và-cột) · [Lab 0](docs/pccp-700-roadmap/PCCP_Thinking_Curriculum.md#lab-0--implementation-mutation-và-event-order) | [OF049 — Dạo công viên](https://school.programmers.co.kr/learn/courses/30/lessons/172928?language=javascript) · [lesson](docs/pccp-700-roadmap/official-lessons/OF049.md); [OF051 — Game gắp thú](https://school.programmers.co.kr/learn/courses/30/lessons/64061?language=javascript) · [lesson](docs/pccp-700-roadmap/official-lessons/OF051.md) | Không nhầm row/col; mutation commit đúng; test 1×N/N×1 |
| D3 · 17/08 | [Ch.2](docs/pccp-700-roadmap/PCCP_Thinking_Curriculum.md#chương-2--map-và-set-nhớ-đúng-loại-thông-tin) | [OF001 — Người chưa hoàn thành](https://school.programmers.co.kr/learn/courses/30/lessons/42576?language=javascript) · [lesson](docs/pccp-700-roadmap/official-lessons/OF001.md); [OF003 — Danh bạ điện thoại](https://school.programmers.co.kr/learn/courses/30/lessons/42577?language=javascript) · [lesson](docs/pccp-700-roadmap/official-lessons/OF003.md); [OF004 — Trang phục](https://school.programmers.co.kr/learn/courses/30/lessons/42578?language=javascript) · [lesson](docs/pccp-700-roadmap/official-lessons/OF004.md) | Map/Set đúng nghĩa; prefix/tie/multiplicity đúng |
| D4 · 18/08 | [Ch.3](docs/pccp-700-roadmap/PCCP_Thinking_Curriculum.md#chương-3--sort-comparator-và-two-pointers) | [OF016 — Số lớn nhất](https://school.programmers.co.kr/learn/courses/30/lessons/42746?language=javascript) · [lesson](docs/pccp-700-roadmap/official-lessons/OF016.md); [OF028 — Xuồng cứu sinh](https://school.programmers.co.kr/learn/courses/30/lessons/42885?language=javascript) · [lesson](docs/pccp-700-roadmap/official-lessons/OF028.md) | Comparator có proof; invariant hai pointer; không mutate input ngoài contract |
| D5 · 19/08 | [Ch.4](docs/pccp-700-roadmap/PCCP_Thinking_Curriculum.md#chương-4--prefix-sum-và-sliding-window) · [Lab A](docs/pccp-700-roadmap/PCCP_Thinking_Curriculum.md#lab-a--variable-sliding-window--frequency-map) | [OF052 — Sự kiện giảm giá](https://school.programmers.co.kr/learn/courses/30/lessons/131127?language=javascript) · [lesson](docs/pccp-700-roadmap/official-lessons/OF052.md); [OF053 — Tổng dãy con liên tiếp](https://school.programmers.co.kr/learn/courses/30/lessons/178870?language=javascript) · [lesson](docs/pccp-700-roadmap/official-lessons/OF053.md) | Fixed/variable window phân biệt được; pointer không lùi; tie đúng |

### Phase 2 — Stack, queue, String, heap, search và greedy

| Buổi · ngày | Đọc | Làm | Qua khi |
|---|---|---|---|
| D6 · 20/08 | [Ch.5 §5.1–5.3](docs/pccp-700-roadmap/PCCP_Thinking_Curriculum.md#chương-5--stack-queue-deque-và-monotonic-stack) | [OF007 — Phát triển tính năng](https://school.programmers.co.kr/learn/courses/30/lessons/42586?language=javascript) · [lesson](docs/pccp-700-roadmap/official-lessons/OF007.md); [OF008 — Dấu ngoặc đúng](https://school.programmers.co.kr/learn/courses/30/lessons/12909?language=javascript) · [lesson](docs/pccp-700-roadmap/official-lessons/OF008.md); [OF009 — Tiến trình](https://school.programmers.co.kr/learn/courses/30/lessons/42587?language=javascript) · [lesson](docs/pccp-700-roadmap/official-lessons/OF009.md) | Batch/FIFO/LIFO đúng; queue dùng head, không `shift()` lặp |
| D7 · 21/08 | [Ch.5 §5.4](docs/pccp-700-roadmap/PCCP_Thinking_Curriculum.md#54-monotonic-stack-bỏ-phần-tử-không-còn-cơ-hội) · [Lab B](docs/pccp-700-roadmap/PCCP_Thinking_Curriculum.md#lab-b--monotonic-stack-mỗi-index-chỉ-được-giải-quyết-một-lần) | [OF011 — Giá cổ phiếu](https://school.programmers.co.kr/learn/courses/30/lessons/42584?language=javascript) · [lesson](docs/pccp-700-roadmap/official-lessons/OF011.md); [OF027 — Tạo số lớn](https://school.programmers.co.kr/learn/courses/30/lessons/42883?language=javascript) · [lesson](docs/pccp-700-roadmap/official-lessons/OF027.md) | Nêu strictness/invariant; mỗi index push/pop tối đa một lần |
| D8 · 22/08 | [Ch.6](docs/pccp-700-roadmap/PCCP_Thinking_Curriculum.md#chương-6--simulation-và-event-biến-câu-chuyện-thành-state-machine) · [Lab H String/parsing](docs/pccp-700-roadmap/PCCP_Thinking_Curriculum.md#lab-h--string-và-parsing-contract-first) | [OF010 — Xe tải qua cầu](https://school.programmers.co.kr/learn/courses/30/lessons/42583?language=javascript) · [lesson](docs/pccp-700-roadmap/official-lessons/OF010.md); [OF048 — Hạn lưu trữ dữ liệu cá nhân](https://school.programmers.co.kr/learn/courses/30/lessons/150370?language=javascript) · [lesson](docs/pccp-700-roadmap/official-lessons/OF048.md); [SR002 — Nén chuỗi](https://school.programmers.co.kr/learn/courses/30/lessons/60057?language=javascript) · [lesson](docs/pccp-700-roadmap/official-lessons/SR002.md) | Qua String gate: token/chunk/run/phần dư; event tie; revealing tests |
| D9 · 23/08 | [Ch.11 §11.1](docs/pccp-700-roadmap/PCCP_Thinking_Curriculum.md#111-heap-luôn-lấy-phần-tử-tốt-nhất-hiện-tại) | [OF012 — Cay hơn](https://school.programmers.co.kr/learn/courses/30/lessons/42626?language=javascript) · [lesson](docs/pccp-700-roadmap/official-lessons/OF012.md); [OF013 — Bộ điều khiển đĩa](https://school.programmers.co.kr/learn/courses/30/lessons/42627?language=javascript) · [lesson](docs/pccp-700-roadmap/official-lessons/OF013.md) | Min-heap từ trắng; API duy nhất `heap.size`; event queue tách priority queue |
| D10 · 24/08 | [Ch.7](docs/pccp-700-roadmap/PCCP_Thinking_Curriculum.md#chương-7--brute-force-và-backtracking-duyệt-cây-quyết-định) | [OF036 — Số mục tiêu](https://school.programmers.co.kr/learn/courses/30/lessons/43165?language=javascript) · [lesson](docs/pccp-700-roadmap/official-lessons/OF036.md); [OF022 — Độ mệt mỏi](https://school.programmers.co.kr/learn/courses/30/lessons/87946?language=javascript) · [lesson](docs/pccp-700-roadmap/official-lessons/OF022.md) | Tính search space; choose/explore/unchoose; restore đúng |
| D11 · 25/08 | [Ch.10 §10.5](docs/pccp-700-roadmap/PCCP_Thinking_Curriculum.md#105-tree-traversal) · [Ch.8](docs/pccp-700-roadmap/PCCP_Thinking_Curriculum.md#chương-8--greedy-lựa-chọn-cục-bộ-cần-bằng-chứng) · [Lab E](docs/pccp-700-roadmap/PCCP_Thinking_Curriculum.md#lab-e--greedy-interval-bằng-earliest-finish) | [OF023 — Chia lưới điện](https://school.programmers.co.kr/learn/courses/30/lessons/86971?language=javascript) · [lesson](docs/pccp-700-roadmap/official-lessons/OF023.md); [OF057 — Hệ thống đánh chặn](https://school.programmers.co.kr/learn/courses/30/lessons/181188?language=javascript) · [lesson](docs/pccp-700-roadmap/official-lessons/OF057.md) | Tree không quay lại parent; interval boundary và exchange argument đúng |
| D12 · 26/08 | [Ch.9](docs/pccp-700-roadmap/PCCP_Thinking_Curriculum.md#chương-9--binary-search-on-answer) · [sáu drill Lab C](docs/pccp-700-roadmap/PCCP_Thinking_Curriculum.md#sáu-drill-predicate-bắt-buộc) | [OF043 — Kiểm tra nhập cảnh](https://school.programmers.co.kr/learn/courses/30/lessons/43238?language=javascript) · [lesson BigInt](docs/pccp-700-roadmap/official-lessons/OF043.md) | Điền đủ sáu drill; first/last feasible, bound, monotonicity và BigInt đúng |

### Phase 3 — BFS, graph, Dijkstra và DP

| Buổi · ngày | Đọc | Làm | Qua khi |
|---|---|---|---|
| D13 · 27/08 | [Ch.10 §10.1–10.2](docs/pccp-700-roadmap/PCCP_Thinking_Curriculum.md#101-mọi-bài-traversal-đều-bắt-đầu-bằng-state) · [Lab D](docs/pccp-700-roadmap/PCCP_Thinking_Curriculum.md#lab-d--multi-source-bfs) | [OF038 — Đường ngắn nhất bản đồ game](https://school.programmers.co.kr/learn/courses/30/lessons/1844?language=javascript) · [lesson](docs/pccp-700-roadmap/official-lessons/OF038.md); [OF055 — Thoát mê cung](https://school.programmers.co.kr/learn/courses/30/lessons/159993?language=javascript) · [lesson](docs/pccp-700-roadmap/official-lessons/OF055.md) | Mark lúc enqueue; reset giữa hai phase; unreachable đúng |
| D14 · 28/08 | [Ch.10 §10.3–10.4](docs/pccp-700-roadmap/PCCP_Thinking_Curriculum.md#103-dfs-cho-connected-components) · [ba state drills](docs/pccp-700-roadmap/PCCP_Thinking_Curriculum.md#ba-drill-thiết-kế-state-cho-d14) | [OF037 — Mạng lưới](https://school.programmers.co.kr/learn/courses/30/lessons/43162?language=javascript) · [lesson](docs/pccp-700-roadmap/official-lessons/OF037.md); [OF039 — Chuyển đổi từ](https://school.programmers.co.kr/learn/courses/30/lessons/43163?language=javascript) · [lesson](docs/pccp-700-roadmap/official-lessons/OF039.md) | Viết đủ node/transition/visited/goal cho ba drill; component/implicit edge đúng |
| D15 · 29/08 | [Ch.10 §10.2 BFS](docs/pccp-700-roadmap/PCCP_Thinking_Curriculum.md#102-bfs-khi-mọi-cạnh-có-cùng-cost) · [§10.6 Dijkstra](docs/pccp-700-roadmap/PCCP_Thinking_Curriculum.md#106-dijkstra-cho-cạnh-có-trọng-số-không-âm) | [OF045 — Node xa nhất](https://school.programmers.co.kr/learn/courses/30/lessons/49189?language=javascript) · [lesson](docs/pccp-700-roadmap/official-lessons/OF045.md); [OF059 — Giao hàng](https://school.programmers.co.kr/learn/courses/30/lessons/12978?language=javascript) · [lesson](docs/pccp-700-roadmap/official-lessons/OF059.md) | Phân biệt BFS/Dijkstra bằng edge cost; stale heap và parallel edge đúng |
| D16 · 30/08 | [Ch.11 §11.2–11.3](docs/pccp-700-roadmap/PCCP_Thinking_Curriculum.md#112-dp-lưu-lời-giải-bài-toán-con) · [Lab G](docs/pccp-700-roadmap/PCCP_Thinking_Curriculum.md#lab-g--grid-dp-và-thứ-tự-iteration) | [OF032 — Tam giác số nguyên](https://school.programmers.co.kr/learn/courses/30/lessons/43105?language=javascript) · [lesson](docs/pccp-700-roadmap/official-lessons/OF032.md); [OF033 — Đường đến trường](https://school.programmers.co.kr/learn/courses/30/lessons/42898?language=javascript) · [lesson](docs/pccp-700-roadmap/official-lessons/OF033.md) | Viết state/transition/base/order trước code; obstacle và hai mép đúng |
| D17 · 31/08 | Gate 120 phút, đóng tài liệu | [OF054 — Làm hai queue có tổng bằng nhau](https://school.programmers.co.kr/learn/courses/30/lessons/118667?language=javascript) · [lesson](docs/pccp-700-roadmap/official-lessons/OF054.md); [OF056 — Biến đổi số](https://school.programmers.co.kr/learn/courses/30/lessons/154538?language=javascript) · [lesson](docs/pccp-700-roadmap/official-lessons/OF056.md); bài fail lớn nhất | ≥2 timed AC; bài còn lại có state/complexity đúng; ghi tracker trước review |

### Phase 4 — Bốn mock, conversion và taper

| Buổi · ngày | Việc | Unlock/điều kiện |
|---|---|---|
| D18 · 01/09 | Free Official Mock 1 — course 15008, curriculum-timed 120 phút | Mở [mock bank](locked/OFFICIAL_MOCK_BANK.md) khi timer bắt đầu; ghi bốn dòng vào [Mock Attempts](TRACKER_PCCP_MOCK_ATTEMPTS.csv) |
| D19 · 02/09 | Postmortem Mock 1 + recode tối đa ba lỗi | Chỉ sau raw result mới mở [Post-mock analysis](locked/POST_MOCK_ANALYSIS.csv); mỗi lỗi có revealing test/prevention rule |
| D20 · 03/09 | Free Official Mock 2 — course 15009, curriculum-timed 120 phút | Mở [mock bank](locked/OFFICIAL_MOCK_BANK.md) khi timer bắt đầu; không gọi timer này là tính năng official của public course |
| D21 · 04/09 | Postmortem Mock 2 + chốt cutoff | Ghi confidence/complexity trước result; recode tối đa ba lỗi |
| D22 · 05/09 | Public Past Set A — 120 phút + chạy official pre-test nếu cửa sổ đã mở | Honor-unlock OF062–OF065 bằng [launcher A có đủ bốn link đề](locked/PAST_SET_A_LAUNCH.md); kiểm [Candidate Guide](https://certi.programmers.co.kr/guide/main?tab=entrance) |
| D23 · 06/09 | Postmortem Past A | Revealing test cho mọi WA/TLE; repair hai root cause lớn nhất |
| D24 · 07/09 | Public Past Set B — 120 phút | Honor-unlock OF066–OF069 bằng [launcher B có đủ bốn link đề](locked/PAST_SET_B_LAUNCH.md) |
| D25 · 08/09 | Postmortem Past B + calibration | Không suy điểm từ số câu; so confidence với kết quả và recode tối đa ba lỗi |
| D26 · 09/09 | Conversion/repair tối đa ba bài; lúc này mới mở [Notebook drill library](PCCP_Algorithm_Code_Notebook/README.md) | Chọn bằng [Error Log](docs/pccp-700-roadmap/PCCP_Error_Log.csv) và [Pattern Families](docs/pccp-700-roadmap/pattern-families/README.md); chỉ mở đúng pattern lỗi, không mở topic mới |
| D27 · 10/09 | Confidence set: [OF048](https://school.programmers.co.kr/learn/courses/30/lessons/150370?language=javascript) · [lesson](docs/pccp-700-roadmap/official-lessons/OF048.md), [OF008](https://school.programmers.co.kr/learn/courses/30/lessons/12909?language=javascript) · [lesson](docs/pccp-700-roadmap/official-lessons/OF008.md), [OF038](https://school.programmers.co.kr/learn/courses/30/lessons/1844?language=javascript) · [lesson](docs/pccp-700-roadmap/official-lessons/OF038.md) + official tech check | Ba bài ≤90 phút; cả confidence set + pre-test/tech check ≤180 phút; webcam/mobile camera/ID/network/charger/one-screen đã kiểm |
| D28 · 11/09 | [Final Cheat Sheet](docs/pccp-700-roadmap/PCCP_Final_Cheat_Sheet.md), [Error Log](docs/pccp-700-roadmap/PCCP_Error_Log.csv), [OF015 recall](https://school.programmers.co.kr/learn/courses/30/lessons/42748?language=javascript) ≤15 | Dừng sau 60–90 phút; cheat sheet chỉ ôn trước thi, không mang vào phòng |
| EXAM · 12/09 | 4 câu/120 phút theo [protocol duy nhất](#9-chiến-thuật-120-phút) | Vào trước deadline; A4 trắng + bút; kiểm `Submit Code` từng bài, không trông chờ auto-submit |

## 7. Luật giảm tải đúng mục tiêu 700+

Nếu thiếu thời gian, giảm theo đúng thứ tự:

1. Bỏ toàn bộ STRETCH.
2. Bỏ TRANSFER chưa được dùng làm gate/repair.
3. Giữ toàn bộ CORE của Phase 1–3.
4. Không lấy thời gian mock để bù bài lẻ.
5. Nếu cùng root cause lặp ở hai mock, dừng pattern mới và repair lỗi đó.

Không được bỏ implementation/hash/sort/window/stack/queue để cày DP/graph khó. Mục tiêu 700+ là độ chắc của foundation cộng khả năng chuyển pattern, không phải hoàn thành nhiều bài nhất.

## 8. Definition of done

Một bài chỉ được đánh dấu hoàn thành khi:

```text
Contract:
Bound / complexity budget:
Brute force:
Bottleneck:
State:
Invariant:
Transition:
Time / space complexity:
3 edge cases:
Result + hint level:
```

- Warmup: tối đa 20 phút.
- Level 2 CORE: tối đa 35 phút.
- Level 3 CORE: tối đa 50 phút.
- Nếu xem pseudocode/code: đóng lại và recode từ file trắng.
- AC sample không đủ; phải tự tạo boundary/duplicate/unreachable/tie test phù hợp.
- Lesson/module dùng tên hàm mô tả để test; khi nộp trên Programmers, entrypoint phải là `function solution(...)`. Không dán dòng `module.exports` vào editor thi.
- Bài từng cần hint/WA chỉ được coi là **ổn định** sau retry không nhìn ở D+1; nếu fail thì lặp D+3 và kiểm skeleton + revealing test ở D+7.
- Bài cụ thể chỉ tính xong sau khi submit trên Programmers.

## 9. Chiến thuật 120 phút

Đây là protocol duy nhất dùng cho gate, mock và ngày thi. Không đổi chiến thuật giữa các tài liệu.

| Phút | Hành động bắt buộc |
|---:|---|
| `0–5` | Scan đủ bốn câu; ghi constraint, complexity mục tiêu và confidence. Không mặc định câu 4 khó nhất |
| `5–25` | Khóa bài dễ nhất; nếu 10–12 phút không tạo thêm hướng/state/code hữu ích thì chuyển |
| `25–55` | Làm bài có xác suất đúng cao thứ hai; test cả case nhỏ và boundary |
| `55–90` | Làm bài phù hợp tiếp theo; bảo vệ lời giải đã có thay vì sa lầy một câu |
| `90–102` | Hoàn thiện lời giải gần đúng nhất hoặc thu phần đúng có thể kiểm chứng; không suy trọng số câu |
| `102–116` | Audit hidden case: index, empty/singleton, duplicate, tie, mutation, unreachable, precision và complexity |
| `116–120` | Chạy lại sample và kiểm trạng thái `Submit Code` của cả bốn bài |

`Run Test` chỉ chạy test hiển thị/custom test; nó không thay cho nộp bài. Mỗi câu phải được bấm `Submit Code`, và không được trông chờ hệ thống tự nộp code khi hết giờ. Nguồn: [coding-test UI guide](https://user-guide.grepp.co/en/articles/ProgrammingCoding-Test-161a992a).

### Checklist môi trường thi thật

- Trong cửa sổ từ `T−7 ngày` đến `T−1 ngày`, hoàn tất official pre-test bằng đúng máy, mạng, webcam, mobile camera và giấy tờ sẽ dùng ngày thi.
- Ngày thi có thể vào từ `T−60 phút`; hạn vào phòng là `T−20 phút`. Từ mốc cutoff `T−20`, không rời chỗ/phòng thi cho tới khi kết thúc.
- Chỉ dùng một tờ A4 trắng và bút theo Candidate Guide. Final Cheat Sheet là tài liệu ôn **trước** thi, không phải vật được mang vào thi.
- Không dùng IDE, tìm kiếm, tài liệu hay thiết bị ngoài luồng giám sát. Chuẩn bị nguồn điện, mạng dự phòng hợp lệ và không gian một màn hình từ D27.
- Lịch 12/09 trong repo là ngày người học cung cấp; kiểm lại booking, múi giờ và giấy tờ trên tài khoản chứng chỉ trước D27.

Nguồn vận hành: [Candidate Guide](https://certi.programmers.co.kr/guide/main?tab=entrance), [quy định thi](https://certi.programmers.co.kr/guide/regulation), [minimum requirements](https://user-guide.grepp.co/en/articles/Minimum-Requirements-b0a9cc7a). Nếu giao diện hiện hành khác checklist này, hướng dẫn trên tài khoản kỳ thi có quyền ưu tiên.

## 10. Source boundary — fact và quyết định của repo

| Nội dung | Loại |
|---|---|
| 4 câu, 120 phút, JavaScript, level/score | FACT chính thức |
| 5 lớp syllabus và các DSA được nêu | FACT chính thức |
| 11 part public của course | FACT chính thức |
| Kit gồm 10 nhóm/47 bài và metadata tần suất | FACT chính thức |
| CORE/TRANSFER/STRETCH | Quyết định chiến lược của repo |
| Thứ tự D1–D28 | Kế hoạch cá nhân cho mục tiêu 700+ trước 12/09 |
| Timebox 20/35/50 phút | Gate luyện tập của repo |
| Bốn mốc mock 120 phút và protocol từng phút | Thiết kế luyện tập của repo; không phải tuyên bố timer tích hợp trong public course |
| “Ba câu = 700” | Không có bằng chứng chính thức; không sử dụng |

Evidence chi tiết và giới hạn suy luận nằm tại [Official Research Audit](docs/pccp-700-roadmap/OFFICIAL_RESEARCH_AUDIT_2026-08-12.md), nhưng không cần mở file đó để học hàng ngày.

## 11. Resource coverage ledger

“Có trong repo” được chia thành ba mức, không đánh đồng:

- `INDEXED`: có URL official và metadata đủ để điều hướng.
- `BANKED`: có ID trong bank/lịch và được phân vai học.
- `LOCKED`: có URL/metadata nhưng cố ý không lộ tên/pattern/analysis trước mock.

| Tài nguyên Programmers | Tổng công khai hiện thấy | Trạng thái trong repo | Chính xác còn thiếu gì? |
|---|---:|---|---|
| Algorithm Practice Kit | 10 nhóm, 47 bài | **47/47 BANKED** (`OF001–OF047`) | Không thiếu bài Kit |
| Official public supplements được curriculum chọn | 14 bài | **14/14 BANKED** (`OF048–OF061`) | Đây là selection có chủ đích, không phải toàn kho Programmers |
| Official syllabus coverage reserve | 6 bài | **6/6 CERTIFIED** (`SR001–SR006`) | Chỉ dùng theo điều kiện; không tự động tăng lịch thêm sáu buổi |
| Public past-paper sets của curriculum | 8 bài | **8/8 BANKED + HONOR-LOCKED** (`OF062–OF069`) | Chỉ mở tên/link khi timer D22/D24 bắt đầu |
| Free Official Mock 1 — course 15008 | Public page liệt kê 4 coding exercises | **INDEXED + HONOR-LOCKED** | 120 phút là timebox curriculum áp đặt; không tuyên bố course có timer tích hợp |
| Free Official Mock 2 — course 15009 | Public page liệt kê 4 coding exercises | **INDEXED + HONOR-LOCKED** | 120 phút là timebox curriculum áp đặt; không đưa bài vào OF bank |
| Legacy course 20847 | Metadata/outline legacy không nhất quán | **OPTIONAL, INDEXED** | Chỉ dùng nếu còn full-test entrypoint; không ghép ba lesson lẻ thành một mock |
| Legacy course 20848 | Metadata/outline legacy không nhất quán | **OPTIONAL, INDEXED** | Chỉ dùng nếu còn full-test entrypoint; không dùng trong bốn mock bắt buộc |
| PCCP past-problem course 19344 | Course public hiện lộ ba lesson | **INDEXED** | Dùng official course entrypoint; không suy course có đủ mọi past question |
| Past-problem explanation course 24542 | Video giải thích miễn phí | **INDEXED, review-only** | Không mirror video; mở sau khi đã tự làm |
| Paid PCCP course 14760 | 15 coding exercises, 11 part | **OUTLINE INDEXED** | Không có nội dung paywalled nếu người học chưa mua/enroll |
| Education hub | Sách/khóa học được Programmers giới thiệu | **INDEXED, OPTIONAL** | Sách JavaScript 100 bài là nguồn drill thêm, không thay lịch CORE |
| Candidate Guide + coding-test UI guide | Quy định và thao tác thi hiện hành | **INDEXED, REQUIRED D27** | Luôn kiểm lại gần ngày thi vì vận hành có thể đổi |
| Toàn bộ kho bài Programmers ngoài Kit/PCCP selection | Rất lớn và thay đổi | **Không mirror** | Không phải curriculum PCCP; chỉ thêm nếu official evidence cho thấy coverage gap |

Nguồn kiểm chứng mock/course hiện hành: [Mock 1 — 15008](https://school.programmers.co.kr/learn/courses/15008), [Mock 2 — 15009](https://school.programmers.co.kr/learn/courses/15009), [Legacy 20847](https://school.programmers.co.kr/learn/courses/20847), [Legacy 20848](https://school.programmers.co.kr/learn/courses/20848), [past course — 19344](https://school.programmers.co.kr/learn/courses/19344), [explanation course — 24542](https://school.programmers.co.kr/learn/courses/24542), [paid course — 14760](https://school.programmers.co.kr/learn/courses/14760), [education hub](https://certi.programmers.co.kr/education-info/education).

### Kết luận coverage

- **Đủ toàn bộ Kit:** có.
- **Đủ navigation cho bank:** có, 69/69; 61 bài thường có direct đề + lesson trong §4–5, 8 past-paper nằm trong launcher honor-locked.
- **Lịch ngày có bắt làm cả 69:** không; lịch giao 43 OF có chủ đích, 26 TRANSFER/STRETCH còn lại là kho repair/đào sâu.
- **Đủ bài official để từng mục được nêu đích danh trong syllabus có primary + transfer hoặc gate thực thi:** có, cộng 6/6 coverage reserve.
- **Có đủ bốn buổi mock/past bắt buộc:** có, gồm 15008, 15009 và hai past set honor-locked; 20847/20848 chỉ là dự phòng optional.
- **Có toàn bộ nội dung mọi mock ngay trong repo:** không; một phần cố ý khóa, legacy course không expose đủ lesson ở public outline.
- **Có 15 bài của course trả phí:** không; chỉ có outline public, không vượt paywall.
- **Có mọi bài trên toàn Programmers:** không, và đó không phải mục tiêu đúng cho PCCP 700+.
- **Có thể cam kết chứa mọi dạng đề PCCP tương lai:** không; nguồn official tự dùng “v.v.” nên syllabus không phải taxonomy đóng.

Khi Programmers thêm public past set/course mới, ledger phải được cập nhật trước khi tuyên bố coverage còn đầy đủ.
