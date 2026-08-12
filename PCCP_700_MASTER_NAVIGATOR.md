# PCCP 700+ — Master Navigator duy nhất

> Cập nhật: 12/08/2026 · Ngôn ngữ: JavaScript · Ngày thi mục tiêu: 12/09/2026

**Chỉ cần bookmark file này.** Đây là file duy nhất dùng để quyết định hôm nay học gì, đọc ở đâu và làm bài nào. Mọi file khác chỉ được mở bằng link từ Navigator.

**Tiến độ lesson chuẩn 18 phần:** 67/67 bài public đã certified; 0 bài public còn lại; 8 bài mock giữ khóa. Chạy `npm run check:lessons` để lấy con số authoritative.

**Tầng transfer/biến thể:** [Pattern Families — navigator 67 bài → 24 pattern](docs/pccp-700-roadmap/pattern-families/README.md). Hoàn tất 67/67 bài được map và 24/24 family đã viết chi tiết. Chạy `npm run check:patterns` để audit coverage.

Tìm nhanh:

- [Bắt đầu ngay](#0-bắt-đầu-ngay)
- [Nguồn và độ tin cậy](#1-vì-sao-phạm-vi-này-đáng-tin)
- [100% syllabus PCCP](#2-100-syllabus-pccp-được-công-bố)
- [100% public course outline](#3-100-public-outline-của-khóa-luyện-pccp-chính-thức)
- [47/47 bài Algorithm Practice Kit](#4-100-algorithm-practice-kit-10-nhóm-47-bài)
- [Bài official bổ sung](#5-bài-official-bổ-sung-ngoài-kit)
- [Ma trận đóng kín syllabus](#51-ma-trận-đóng-kín-syllabus)
- [Thứ tự học D1 → D37](#6-thứ-tự-học-bắt-buộc)
- [Luật giảm tải](#7-luật-giảm-tải-đúng-mục-tiêu-700)
- [Definition of done](#8-definition-of-done)
- [Chiến thuật thi](#9-chiến-thuật-120-phút)
- [Fact và quyết định của repo](#10-source-boundary--fact-và-quyết-định-của-repo)
- [Đã có và còn thiếu gì từ Programmers](#11-resource-coverage-ledger)

## 0. Bắt đầu ngay

1. Mở [Tracker](TRACKER_PCCP_REBUILD_2026.csv), tìm dòng đầu tiên chưa có `completed_at`.
2. Quay lại bảng “Thứ tự học bắt buộc” trong file này, mở đúng dòng `Dxx/Rxx` đó.
3. Đọc đúng chương/lab được link; không đọc cả handbook.
4. Mở đúng bài `OFxxx`; tự làm trước khi xem code/template.
5. Kết thúc buổi: điền kết quả thật vào Tracker và lỗi thật vào [Error Log](docs/pccp-700-roadmap/PCCP_Error_Log.csv).

Tracker hiện chưa có dòng nào ghi `completed_at`, nên theo dữ liệu canonical, điểm bắt đầu là **D1**. Nếu mày đã hoàn thành D1–D9 ở ngoài tracker, hãy ghi lại bằng chứng thực tế trước; không tự nhảy tới D10 chỉ vì ngày lịch là 12/08.

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
| 01. Basic program implementation | Viết chương trình thỏa điều kiện và yêu cầu đã cho | D1–D2, D7, D10–D11; Handbook Ch.0, Ch.1, Ch.6, Lab 0 |
| 02. Basic data structure/algorithm | String, Array, Greedy, Sort | D1–D6, D12–D13; Handbook Ch.1–4, Ch.7–8 |
| 03. Intermediate data structure/algorithm | Stack, Queue, Deque, Hash, Binary Search, DFS, BFS | D3–D4, D8–D9, D12, D14, D16–D18 |
| 04. Advanced data structure/algorithm | Graph, Tree, Heap, Dynamic Programming | D17, D19–D21 |
| 05. Correct and efficient programming | Phán đoán nhanh; chọn cấu trúc/thuật toán phù hợp; viết chương trình chính xác, không lỗi và hiệu quả | Mọi gate, mock và postmortem |

Nguồn trực tiếp: [Programmers Certification Introduction, trang PCCP](https://business.programmers.co.kr/static/business/certification_intro.pdf).

Phần đối chiếu bài chính, bài chuyển giao và khe hở nằm ở [Ma trận đóng kín syllabus](#51-ma-trận-đóng-kín-syllabus). Không dùng việc “đã nhìn thấy tên thuật toán” làm bằng chứng coverage.

## 3. 100% public outline của khóa luyện PCCP chính thức

Khóa official hiện hiển thị 11 part. Course dùng Python và có phí; Navigator **không bắt mua**. Ta dùng outline của nó làm bằng chứng ưu tiên, còn học/code bằng JavaScript trong handbook này.

Nguồn: [Programmers PCCP preparation course](https://school.programmers.co.kr/learn/courses/14760).

| Part | Nội dung public đầy đủ | Navigator cover |
|---:|---|---|
| 01 | Hashing: bài giảng thuật toán/phân tích → thực hành → giải thích thực hành | D3–D4 |
| 02 | Array implementation: bài giảng thuật toán/phân tích → thực hành → giải thích thực hành | D1–D2, D7, D10–D11 |
| 03 | Two pointers: bài giảng thuật toán/phân tích → thực hành → giải thích thực hành | D5–D6 |
| 04 | Sorting & Greedy: bài giảng thuật toán/phân tích → thực hành → giải thích thực hành | D4–D5, D13 |
| 05 | DFS: recursion prerequisite → duplicate-permutation prerequisite → thuật toán/phân tích → thực hành → giải thích | D12, D17–D18 |
| 06 | BFS: level-search prerequisite → thuật toán/phân tích → thực hành → giải thích | D16, D18–D19 |
| 07 | Graph: adjacency matrix/list prerequisite → thuật toán/phân tích → thực hành → giải thích | D17–D19 |
| 08 | PCCP Practice Test 1: bốn câu | D23 Official Mock 1 |
| 09 | Review Test 1: đọc/hiểu requirement từng câu → giải thích từng câu → có mục cải thiện time complexity | D24–D26 |
| 10 | PCCP Practice Test 2: bốn câu | D27 Official Mock 2 |
| 11 | Review Test 2: đọc/hiểu requirement từng câu → giải thích từng câu | D28 |

Khóa mô tả quy trình chính thức: học DSA → giải bài thực hành → làm mock 4 câu/120 phút → xem giải thích và vá điểm yếu. Navigator giữ đúng chu trình này.

### Nội dung syllabus không xuất hiện thành module riêng trong course

Heap, Binary Search và DP có trong syllabus/brochure nhưng không có part độc lập trong public outline trên. Vì vậy chúng vẫn bắt buộc được cover ở D9/D14/D20–D21; không được loại chỉ vì course ưu tiên bảy module khác.

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

OF062–OF069 là hai bộ public past paper. Chúng bị khóa đến D29/D31 nên không liệt kê tên ở Navigator để tránh spoiler.

### 5.1 Ma trận đóng kín syllabus

`OF001–OF069` là bank nằm trong lịch. Sáu bài `SR` dưới đây là **coverage reserve**, không phải sáu buổi học mới: chỉ mở khi cột “Điều kiện dùng reserve” đúng hoặc khi muốn chứng minh mình chuyển được pattern sang ngữ cảnh khác. Danh sách máy đọc được nằm tại [Official Syllabus Reserve](PCCP_OFFICIAL_SYLLABUS_RESERVE.csv).

| Thành phần official | Bài chính trong lịch | Bài chuyển giao/đối chứng official | Điều kiện dùng reserve | Trạng thái |
|---|---|---|---|---|
| Implementation | OF015, OF048–OF051 | [SR001 Cộng ma trận](https://school.programmers.co.kr/learn/courses/30/lessons/12950?language=javascript) · [lesson 18 phần](docs/pccp-700-roadmap/official-lessons/SR001.md), [SR005 Tiến độ bài tập](https://school.programmers.co.kr/learn/courses/30/lessons/176962?language=javascript) · [lesson 18 phần](docs/pccp-700-roadmap/official-lessons/SR005.md) | Sai row/col/mutation hoặc event/tie | CLOSED |
| String | OF003, OF048 | [SR002 Nén chuỗi](https://school.programmers.co.kr/learn/courses/30/lessons/60057?language=javascript) · [lesson 18 phần](docs/pccp-700-roadmap/official-lessons/SR002.md) | Chưa từng code compression từ trắng | CLOSED |
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

Mỗi dòng là một buổi. Link “Đọc” trỏ thẳng handbook; `OFxxx` trỏ tới bảng bài ở trên hoặc bank. Không học theo ngày lịch nếu buổi trước chưa hoàn thành.

### Phase 1 — Implementation, hash, sort, window

| Buổi | Đọc | Làm | Qua khi |
|---|---|---|---|
| D1 | [Ch.0 §0.1–0.3; Ch.1 §1.1](docs/pccp-700-roadmap/PCCP_Thinking_Curriculum.md#chương-0--hệ-điều-hành-giải-bài) | OF015 | Contract/bound/complexity trước code; numeric sort không nhìn |
| D2 | [Ch.1 §1.2–1.4 + Lab 0](docs/pccp-700-roadmap/PCCP_Thinking_Curriculum.md#lab-0--implementation-mutation-và-event-order) | OF049, OF051 | Không nhầm row/col; mutation `=` đúng; test 1×N/N×1 |
| D3 | [Ch.2](docs/pccp-700-roadmap/PCCP_Thinking_Curriculum.md#chương-2--map-và-set-nhớ-đúng-loại-thông-tin) | OF001, OF002 | Chọn đúng Map/Set; frequency từ trắng |
| D4 | [Ch.3 §3.1–3.2](docs/pccp-700-roadmap/PCCP_Thinking_Curriculum.md#chương-3--sort-comparator-và-two-pointers) | OF003, OF004 | Comparator/key và complexity đúng |
| D5 | [Ch.3 §3.3–3.5](docs/pccp-700-roadmap/PCCP_Thinking_Curriculum.md#33-two-pointers-trên-array-đã-sort) | OF028, OF016 | Nói invariant pointer và counterexample greedy sai |
| D6 | [Ch.4 + Lab A](docs/pccp-700-roadmap/PCCP_Thinking_Curriculum.md#lab-a--variable-sliding-window--frequency-map) | OF052, OF053 | Phân biệt prefix/fixed/variable window; chứng minh pointer không lùi |
| D7 | Ôn Ch.1–4, không đọc mới | OF015, OF050 + một bài fail | ≥2/3 AC; bài mới ≤25 phút; không tra syntax |

### Phase 2 — Stack, queue, simulation, search và greedy

| Buổi | Đọc | Làm | Qua khi |
|---|---|---|---|
| D8 | [Ch.5 §5.1–5.3](docs/pccp-700-roadmap/PCCP_Thinking_Curriculum.md#chương-5--stack-queue-deque-và-monotonic-stack) | OF009 + recode OF051 | FIFO/LIFO đúng; queue không `shift()` lặp |
| D9 | [Ch.5 §5.4 + Ch.11 §11.1 + Lab B](docs/pccp-700-roadmap/PCCP_Thinking_Curriculum.md#lab-b--monotonic-stack-mỗi-index-chỉ-được-giải-quyết-một-lần) | OF011, OF012 | Nêu invariant; min-heap code/smoke test được |
| D10 | [Ch.6 §6.1–6.3](docs/pccp-700-roadmap/PCCP_Thinking_Curriculum.md#chương-6--simulation-và-event-biến-câu-chuyện-thành-state-machine) | OF010, OF019 | Tách state/event/transition/stop; nhảy event khi cần |
| D11 | Ch.6 §6.4–6.6 | OF048, OF049 | Event tie, parsing và revealing boundary test đúng |
| D12 | [Ch.7](docs/pccp-700-roadmap/PCCP_Thinking_Curriculum.md#chương-7--brute-force-và-backtracking-duyệt-cây-quyết-định) | OF036, OF022 | Tính search space; choose/explore/unchoose và restore đúng |
| D13 | [Ch.8 + Lab E](docs/pccp-700-roadmap/PCCP_Thinking_Curriculum.md#lab-e--greedy-interval-bằng-earliest-finish) | OF028, OF057 | Có exchange argument/counterexample, không nói “trông hợp lý” |
| D14 | [Ch.9 + Lab C](docs/pccp-700-roadmap/PCCP_Thinking_Curriculum.md#lab-c--binary-search-on-answer-tìm-first-feasible) | OF043 + 6 drill predicate | Chứng minh predicate, bound, first true; không bitwise midpoint |
| D15 | Gate 120 phút, không đọc mới | OF003, OF054, OF056 | Easy ≤20 phút; ≥2 AC; complexity đúng |
| R15 | Chỉ đọc cluster fail | Tối đa 2 bài repair | Timed AC hoặc ghi gate còn fail |

### Phase 3 — BFS, graph, tree, DP và heap integration

| Buổi | Đọc | Làm | Qua khi |
|---|---|---|---|
| D16 | [Ch.10 §10.1–10.2 + Lab D](docs/pccp-700-roadmap/PCCP_Thinking_Curriculum.md#lab-d--multi-source-bfs) | OF038, OF055 | Mark lúc enqueue; multi-phase/unreachable đúng |
| D17 | Ch.10 §10.3, §10.5 | OF037, OF023 | Component/tree không quay lại parent |
| D18 | Ch.10 §10.4 | OF039 + 3 drill state | State key đủ chiều; transition hợp lệ |
| D19 | Ch.10 §10.5–10.6 | OF045, OF059 | Phân biệt BFS với Dijkstra |
| D20 | [Ch.11 §11.2–11.3 + Lab G](docs/pccp-700-roadmap/PCCP_Thinking_Curriculum.md#lab-g--grid-dp-và-thứ-tự-iteration) | OF032, OF033 | Viết state/transition/base/order trước code |
| D21 | Ch.11 §11.1, §11.4 | OF013 + recode OF012 | Event queue và priority queue tách đúng |
| D22 | Foundation Gate 120 phút | OF005, OF024, OF046 + bài lỗi nhất | ≥2 AC; hướng/complexity đúng cho bài tiếp |
| R22 | Error log + đúng cluster fail | Tối đa 2 bài repair | Qua lại foundation gate trước mock |

### Phase 4 — Mock, conversion và taper

| Buổi | Việc | Unlock/điều kiện |
|---|---|---|
| D23 | Official Mock 1 — 120 phút | Mở [mock bank](locked/OFFICIAL_MOCK_BANK.md) khi timer bắt đầu |
| D24 | Postmortem + recode tối đa 3 bài | Chỉ sau khi ghi raw result |
| D25 | Vá hai cluster yếu nhất | Chọn CORE/TRANSFER theo error log |
| D26 | Speed ladder OF048 ≤15, OF003 ≤35, OF038 ≤35 | Đạt cả ba hoặc ghi gate fail |
| D27 | Official Mock 2 — 120 phút | Mở đúng URL khi timer bắt đầu |
| D28 | Postmortem + recode tối đa 3 bài | Chốt cutoff/chuyển bài |
| D29 | Public Past Set A — 120 phút | Unlock OF062–OF065 đúng lúc timer |
| D30 | Postmortem Past A | Revealing test cho mọi WA/TLE |
| R30 | Consolidation buffer | Không học pattern mới |
| D31 | Public Past Set B — 120 phút | Unlock OF066–OF069 đúng lúc timer |
| D32 | Review/recode Past B | Giảm thời gian ≥20% hoặc ghi nguyên nhân |
| D33 | OF001 ≤15, OF028 ≤35, OF055 ≤35 | Xong trong 85 phút |
| D34 | Legacy Official Test A — 120 phút | Unlock course 20847 đúng lúc timer |
| D35 | Postmortem cuối + 5 template từ trắng | Chốt 3 rủi ro cuối |
| D36 | OF015 ≤15, OF009 ≤35, OF033 ≤45 + tech check | Không học thêm topic |
| D37 | [Final Cheat Sheet](docs/pccp-700-roadmap/PCCP_Final_Cheat_Sheet.md), error log, một easy ≤20 | Dừng sau 60–90 phút |
| EXAM | 4 câu/120 phút | Không học bài mới |

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
- Bài cụ thể chỉ tính xong sau khi submit trên Programmers.

## 9. Chiến thuật 120 phút

1. `0–5`: scan đủ bốn câu; ghi constraint, complexity mục tiêu và confidence.
2. `5–25`: khóa bài dễ nhất.
3. `25–90`: làm hai bài phù hợp nhất; đổi nếu 12–15 phút không có tiến triển hữu ích.
4. `90–105`: hoàn thiện bài gần AC nhất.
5. `105–120`: audit index, empty/singleton, duplicate, tie, mutation, precision và complexity.

Không mặc định câu 4 khó nhất. Không suy điểm từ số câu “tưởng đã làm được”.

## 10. Source boundary — fact và quyết định của repo

| Nội dung | Loại |
|---|---|
| 4 câu, 120 phút, JavaScript, level/score | FACT chính thức |
| 5 lớp syllabus và các DSA được nêu | FACT chính thức |
| 11 part public của course | FACT chính thức |
| Kit gồm 10 nhóm/47 bài và metadata tần suất | FACT chính thức |
| CORE/TRANSFER/STRETCH | Quyết định chiến lược của repo |
| Thứ tự D1–D37 | Kế hoạch cá nhân cho mục tiêu 700+ trước 12/09 |
| Timebox 20/35/50 phút | Gate luyện tập của repo |
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
| Public past-paper sets của curriculum | 8 bài | **8/8 BANKED + LOCKED** (`OF062–OF069`) | Không mở tên/link trước D29/D31 |
| Free Official Mock 1 — course 15008 | 4 coding exercises | **INDEXED + LOCKED** | Không đưa vào OF bank để bảo vệ unseen mock |
| Free Official Mock 2 — course 15009 | 4 coding exercises | **INDEXED + LOCKED** | Không đưa vào OF bank để bảo vệ unseen mock |
| Legacy Mock 1 — course 20847 | Trang báo 4 coding exercises | **INDEXED + LOCKED** | Public outline hiện chỉ lộ ba lesson; phải chạy từ course test entrypoint |
| Legacy Mock 2 — course 20848 | Trang báo 4 coding exercises | **INDEXED + LOCKED** | Public outline hiện chỉ lộ ba lesson; phải chạy từ course test entrypoint |
| PCCP past-problem course 19344 | Course public hiện lộ ba lesson | **INDEXED** | Dùng official course entrypoint; không suy course có đủ mọi past question |
| Past-problem explanation course 24542 | Video giải thích miễn phí | **INDEXED, review-only** | Không mirror video; mở sau khi đã tự làm |
| Paid PCCP course 14760 | 15 coding exercises, 11 part | **OUTLINE INDEXED** | Không có nội dung paywalled nếu người học chưa mua/enroll |
| Toàn bộ kho bài Programmers ngoài Kit/PCCP selection | Rất lớn và thay đổi | **Không mirror** | Không phải curriculum PCCP; chỉ thêm nếu official evidence cho thấy coverage gap |

Nguồn kiểm chứng mock/course hiện hành: [Mock 1 — 15008](https://school.programmers.co.kr/learn/courses/15008), [Mock 2 — 15009](https://school.programmers.co.kr/learn/courses/15009), [Legacy Mock 1 — 20847](https://school.programmers.co.kr/learn/courses/20847), [Legacy Mock 2 — 20848](https://school.programmers.co.kr/learn/courses/20848), [past course — 19344](https://school.programmers.co.kr/learn/courses/19344), [explanation course — 24542](https://school.programmers.co.kr/learn/courses/24542), [paid course — 14760](https://school.programmers.co.kr/learn/courses/14760).

### Kết luận coverage

- **Đủ toàn bộ Kit:** có.
- **Đủ các bài bank bắt buộc/transfer/stretch của lịch:** có, 69/69.
- **Đủ bài official để từng mục được nêu đích danh trong syllabus có primary + transfer hoặc gate thực thi:** có, cộng 6/6 coverage reserve.
- **Có đủ entrypoint mock miễn phí đã tìm thấy:** có, gồm 15008, 15009, 20847, 20848.
- **Có toàn bộ nội dung mọi mock ngay trong repo:** không; một phần cố ý khóa, legacy course không expose đủ lesson ở public outline.
- **Có 15 bài của course trả phí:** không; chỉ có outline public, không vượt paywall.
- **Có mọi bài trên toàn Programmers:** không, và đó không phải mục tiêu đúng cho PCCP 700+.
- **Có thể cam kết chứa mọi dạng đề PCCP tương lai:** không; nguồn official tự dùng “v.v.” nên syllabus không phải taxonomy đóng.

Khi Programmers thêm public past set/course mới, ledger phải được cập nhật trước khi tuyên bố coverage còn đầy đủ.
