# Crosswalk danh mục đề PCCP công khai legacy

[← Master Navigator](../PCCP_700_MASTER_NAVIGATOR.md) · [Bank official hiện hành](../PCCP_OFFICIAL_PRACTICE_BANK.csv) · [Chuẩn thành thạo notebook](00_MASTERY_STANDARD.md)

> **Vai trò hiện hành:** đây chỉ là bảng đổi mã `Pxx` legacy sang ID `OFxxx`. Nó không phải tracker coverage, không tự quyết định thứ tự học và không phải entrypoint. Luôn bắt đầu ở Master Navigator.

## Snapshot hiện hành — 15/08/2026

- Bank có 69 ID `OF`: `OF001..OF061` đang mở và `OF062..OF069` là past-paper `RESERVED_MOCK`.
- Sáu bài reserve `SR001..SR006` cùng 61 bài OF đang mở tạo thành **67/67 official lesson** hiện hành.
- Toàn bộ **32** dòng luyện tập legacy `P17..P48` đã map sang lesson `OF` được chứng nhận.
- Tám dòng `P01..P08` map sang `OF062..OF069`; chỉ mở theo unlock rule mà Navigator chỉ định.
- `P09..P16` là placeholder của cấu trúc cũ, đã nghỉ hưu và không phải ID canonical hiện hành.

Con số **67/67** là coverage của toàn bộ lớp official lesson, không chỉ 32 dòng legacy trong bảng dưới. Nguồn máy đọc là [`PCCP_OFFICIAL_PRACTICE_BANK.csv`](../PCCP_OFFICIAL_PRACTICE_BANK.csv) và [`PCCP_OFFICIAL_SYLLABUS_RESERVE.csv`](../PCCP_OFFICIAL_SYLLABUS_RESERVE.csv); trạng thái live được xác nhận bởi `npm run check:lessons` và `npm run check:notebook-integration`.

## Trạng thái dùng trong crosswalk

| Trạng thái | Nghĩa chính xác |
| --- | --- |
| `LESSON-CERTIFIED` | Có lesson 18 section, link official, implementation executable, test theo ID và qua lesson audit. Đây là chứng nhận nội dung repo, không phải bằng chứng người học đã tự giải được. |
| `RESERVED-MOCK` | Bài past paper đã định danh nhưng bị khóa để giữ giá trị mock; không mở lesson/solution trực tiếp từ catalog. |
| `RETIRED-ID` | Placeholder legacy không còn tham gia bank, plan hoặc coverage hiện hành. |

## P01–P08 — past paper bị khóa

| Legacy ID | Đề | ID hiện hành | Trạng thái | Điều hướng |
| --- | --- | --- | --- | --- |
| P01 | Băng bó | OF062 | `RESERVED-MOCK` | [Mở theo Navigator](../PCCP_700_MASTER_NAVIGATOR.md) |
| P02 | Khai thác dầu | OF063 | `RESERVED-MOCK` | [Mở theo Navigator](../PCCP_700_MASTER_NAVIGATOR.md) |
| P03 | Đồng hồ analog | OF064 | `RESERVED-MOCK` | [Mở theo Navigator](../PCCP_700_MASTER_NAVIGATOR.md) |
| P04 | Di chuyển xe kéo | OF065 | `RESERVED-MOCK` | [Mở theo Navigator](../PCCP_700_MASTER_NAVIGATOR.md) |
| P05 | Trình phát video | OF066 | `RESERVED-MOCK` | [Mở theo Navigator](../PCCP_700_MASTER_NAVIGATOR.md) |
| P06 | Thử thách game xếp hình | OF067 | `RESERVED-MOCK` | [Mở theo Navigator](../PCCP_700_MASTER_NAVIGATOR.md) |
| P07 | Tìm nguy cơ va chạm | OF068 | `RESERVED-MOCK` | [Mở theo Navigator](../PCCP_700_MASTER_NAVIGATOR.md) |
| P08 | Khôi phục biểu thức | OF069 | `RESERVED-MOCK` | [Mở theo Navigator](../PCCP_700_MASTER_NAVIGATOR.md) |

## P17–P48 — lesson đã được chứng nhận

| Legacy ID | Đề | ID hiện hành | Trọng tâm | Lesson |
| --- | --- | --- | --- | --- |
| P17 | Hạn lưu trữ dữ liệu cá nhân | OF048 | parsing date + hash | [OF048](../docs/pccp-700-roadmap/official-lessons/OF048.md) |
| P18 | Dạo công viên | OF049 | grid simulation | [OF049](../docs/pccp-700-roadmap/official-lessons/OF049.md) |
| P19 | Game gắp thú | OF051 | matrix + reduction stack | [OF051](../docs/pccp-700-roadmap/official-lessons/OF051.md) |
| P20 | Cuộc đua chạy | OF050 | array order + hash index | [OF050](../docs/pccp-700-roadmap/official-lessons/OF050.md) |
| P21 | Người chưa hoàn thành | OF001 | frequency map | [OF001](../docs/pccp-700-roadmap/official-lessons/OF001.md) |
| P22 | Ponketmon | OF002 | set cardinality | [OF002](../docs/pccp-700-roadmap/official-lessons/OF002.md) |
| P23 | Danh bạ điện thoại | OF003 | prefix + sort/hash | [OF003](../docs/pccp-700-roadmap/official-lessons/OF003.md) |
| P24 | Trang phục | OF004 | frequency + combinatorics | [OF004](../docs/pccp-700-roadmap/official-lessons/OF004.md) |
| P25 | Số thứ K | OF015 | slice + numeric sort + index | [OF015](../docs/pccp-700-roadmap/official-lessons/OF015.md) |
| P26 | Phát triển tính năng | OF007 | queue batching | [OF007](../docs/pccp-700-roadmap/official-lessons/OF007.md) |
| P27 | Tiến trình | OF009 | queue + priority | [OF009](../docs/pccp-700-roadmap/official-lessons/OF009.md) |
| P28 | Cay hơn | OF012 | min-heap | [OF012](../docs/pccp-700-roadmap/official-lessons/OF012.md) |
| P29 | Xuồng cứu sinh | OF028 | greedy + two pointers | [OF028](../docs/pccp-700-roadmap/official-lessons/OF028.md) |
| P30 | Số mục tiêu | OF036 | DFS choice tree | [OF036](../docs/pccp-700-roadmap/official-lessons/OF036.md) |
| P31 | Đường ngắn nhất bản đồ game | OF038 | BFS grid shortest path | [OF038](../docs/pccp-700-roadmap/official-lessons/OF038.md) |
| P32 | Sự kiện giảm giá | OF052 | fixed window + frequency | [OF052](../docs/pccp-700-roadmap/official-lessons/OF052.md) |
| P33 | Tổng dãy con liên tiếp | OF053 | positive two pointers | [OF053](../docs/pccp-700-roadmap/official-lessons/OF053.md) |
| P34 | Số lớn nhất | OF016 | custom comparator | [OF016](../docs/pccp-700-roadmap/official-lessons/OF016.md) |
| P35 | Xe tải qua cầu | OF010 | queue time/capacity | [OF010](../docs/pccp-700-roadmap/official-lessons/OF010.md) |
| P36 | Giá cổ phiếu | OF011 | monotonic stack | [OF011](../docs/pccp-700-roadmap/official-lessons/OF011.md) |
| P37 | Tạo số lớn | OF027 | greedy monotonic stack | [OF027](../docs/pccp-700-roadmap/official-lessons/OF027.md) |
| P38 | Hệ thống đánh chặn | OF057 | interval greedy | [OF057](../docs/pccp-700-roadmap/official-lessons/OF057.md) |
| P39 | Độ mệt mỏi | OF022 | backtracking | [OF022](../docs/pccp-700-roadmap/official-lessons/OF022.md) |
| P40 | Mạng lưới | OF037 | connected components | [OF037](../docs/pccp-700-roadmap/official-lessons/OF037.md) |
| P41 | Thoát mê cung | OF055 | multi-phase BFS | [OF055](../docs/pccp-700-roadmap/official-lessons/OF055.md) |
| P42 | Biến đổi số | OF056 | BFS/DP state | [OF056](../docs/pccp-700-roadmap/official-lessons/OF056.md) |
| P43 | Tam giác số nguyên | OF032 | table DP | [OF032](../docs/pccp-700-roadmap/official-lessons/OF032.md) |
| P44 | Đường đến trường | OF033 | grid DP | [OF033](../docs/pccp-700-roadmap/official-lessons/OF033.md) |
| P45 | Bộ điều khiển đĩa | OF013 | heap event scheduling | [OF013](../docs/pccp-700-roadmap/official-lessons/OF013.md) |
| P46 | Chuyển đổi từ | OF039 | implicit-graph BFS | [OF039](../docs/pccp-700-roadmap/official-lessons/OF039.md) |
| P47 | Kiểm tra nhập cảnh | OF043 | binary search on answer | [OF043](../docs/pccp-700-roadmap/official-lessons/OF043.md) |
| P48 | Node xa nhất | OF045 | graph BFS distance | [OF045](../docs/pccp-700-roadmap/official-lessons/OF045.md) |

Mọi dòng `P17..P48` trong bảng này có trạng thái `LESSON-CERTIFIED`. Tiến độ cá nhân vẫn phải ghi ở tracker được Navigator liên kết; không hạ hoặc nâng chứng nhận nội dung theo việc một người học đã làm bài hay chưa.
