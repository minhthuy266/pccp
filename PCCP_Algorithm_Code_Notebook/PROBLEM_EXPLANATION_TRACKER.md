# Tracker giải thích bài: audit từ đề đến code

[Chuẩn canonical](00_PROBLEM_TO_CODE_STANDARD.md) · [← Navigator](../PCCP_700_MASTER_NAVIGATOR.md)

Snapshot audit ngày 21/08/2026. **Có** chỉ được ghi khi section có nội dung, không chỉ có heading.
Official lesson là canonical cho bài public; catalog/notebook chapter là index hoặc canonical pattern,
không phải bản lời giải cạnh tranh. Các file dưới `archive` là bản lịch sử và không thuộc phạm vi sửa.

## Kết luận audit Batch 0

- Canonical entrypoint: `README → PCCP_700_MASTER_NAVIGATOR.md`.
- Canonical bài public: 67 file `official-lessons/OF001..061, SR001..006` và code executable
  `solutions/official/<ID>.js`. Notebook solutions là canonical của Practice ID nội bộ.
- Trùng lặp có chủ đích: catalog/chapter mô tả ngắn và notebook solution có thể nhắc cùng bài,
  nhưng phải link về official lesson thay vì tự nhận là full canonical.
- Trước Batch 1, official lesson thường có Contract/Bound/Brute/Bottleneck/Pattern/State/
  Transition/Invariant/Complexity/full code/dry-run nhưng thiếu **làm bằng tay, Blueprint, recall,
  bảng state-init và ma trận lỗi + test**. Vì vậy không bài nào được tự động nâng COMPLETE.
- Collection solution có nhiều Practice ID trong một file. Batch 0 ghi đủ collection để không bỏ
  sót nguồn full code; Batch 2+ phải tách từng Practice ID thành hàng khi audit nội dung tương ứng.

## Official lessons — audit từng bài

| Problem ID | File canonical | Có 9 bước | Có Blueprint | Có brute force | Có code đầy đủ | Có dry run | Có recall | Status |
| --- | --- | ---: | ---: | ---: | ---: | ---: | ---: | --- |
| OF001 | [OF001](../docs/pccp-700-roadmap/official-lessons/OF001.md) | Có | Có | Có | Có | Có | Có | **COMPLETE B5** |
| OF002 | [OF002](../docs/pccp-700-roadmap/official-lessons/OF002.md) | Có | Có | Có | Có | Có | Có | **COMPLETE B5** |
| OF003 | [OF003](../docs/pccp-700-roadmap/official-lessons/OF003.md) | Có | Có | Có | Có | Có | Có | **COMPLETE B5** |
| OF004 | [OF004](../docs/pccp-700-roadmap/official-lessons/OF004.md) | Có | Có | Có | Có | Có | Có | **COMPLETE B5** |
| OF005 | [OF005](../docs/pccp-700-roadmap/official-lessons/OF005.md) | Có | Có | Có | Có | Có | Có | **COMPLETE B5** |
| OF006 | [OF006](../docs/pccp-700-roadmap/official-lessons/OF006.md) | Có | Có | Có | Có | Có | Có | **COMPLETE B2** |
| OF007 | [OF007](../docs/pccp-700-roadmap/official-lessons/OF007.md) | Có | Có | Có | Có | Có | Có | **COMPLETE B1** |
| OF008 | [OF008](../docs/pccp-700-roadmap/official-lessons/OF008.md) | Có | Có | Có | Có | Có | Có | **COMPLETE B1** |
| OF009 | [OF009](../docs/pccp-700-roadmap/official-lessons/OF009.md) | Có | Có | Có | Có | Có | Có | **COMPLETE B1** |
| OF010 | [OF010](../docs/pccp-700-roadmap/official-lessons/OF010.md) | Có | Có | Có | Có | Có | Có | **COMPLETE B2** |
| OF011 | [OF011](../docs/pccp-700-roadmap/official-lessons/OF011.md) | Có | Có | Có | Có | Có | Có | **COMPLETE B1** |
| OF012 | [OF012](../docs/pccp-700-roadmap/official-lessons/OF012.md) | Có | Có | Có | Có | Có | Có | **COMPLETE B12** |
| OF013 | [OF013](../docs/pccp-700-roadmap/official-lessons/OF013.md) | Có | Có | Có | Có | Có | Có | **COMPLETE B12** |
| OF014 | [OF014](../docs/pccp-700-roadmap/official-lessons/OF014.md) | Có | Có | Có | Có | Có | Có | **COMPLETE B12** |
| OF015 | [OF015](../docs/pccp-700-roadmap/official-lessons/OF015.md) | Có | Có | Có | Có | Có | Có | **COMPLETE B9** |
| OF016 | [OF016](../docs/pccp-700-roadmap/official-lessons/OF016.md) | Có | Có | Có | Có | Có | Có | **COMPLETE B9** |
| OF017 | [OF017](../docs/pccp-700-roadmap/official-lessons/OF017.md) | Có | Có | Có | Có | Có | Có | **COMPLETE B9** |
| OF018 | [OF018](../docs/pccp-700-roadmap/official-lessons/OF018.md) | Có | Có | Có | Có | Có | Có | **COMPLETE B9** |
| OF019 | [OF019](../docs/pccp-700-roadmap/official-lessons/OF019.md) | Có | Chưa | Có | Có | Có | Chưa | PARTIAL |
| OF020 | [OF020](../docs/pccp-700-roadmap/official-lessons/OF020.md) | Có | Có | Có | Có | Có | Có | **COMPLETE B13** |
| OF021 | [OF021](../docs/pccp-700-roadmap/official-lessons/OF021.md) | Có | Chưa | Có | Có | Có | Chưa | PARTIAL |
| OF022 | [OF022](../docs/pccp-700-roadmap/official-lessons/OF022.md) | Có | Có | Có | Có | Có | Có | **COMPLETE B13** |
| OF023 | [OF023](../docs/pccp-700-roadmap/official-lessons/OF023.md) | Có | Có | Có | Có | Có | Có | **COMPLETE B11** |
| OF024 | [OF024](../docs/pccp-700-roadmap/official-lessons/OF024.md) | Có | Có | Có | Có | Có | Có | **COMPLETE B11** |
| OF025 | [OF025](../docs/pccp-700-roadmap/official-lessons/OF025.md) | Có | Có | Có | Có | Có | Có | **COMPLETE B4** |
| OF026 | [OF026](../docs/pccp-700-roadmap/official-lessons/OF026.md) | Có | Chưa | Có | Có | Có | Chưa | PARTIAL |
| OF027 | [OF027](../docs/pccp-700-roadmap/official-lessons/OF027.md) | Có | Có | Có | Có | Có | Có | **COMPLETE B2** |
| OF028 | [OF028](../docs/pccp-700-roadmap/official-lessons/OF028.md) | Có | Có | Có | Có | Có | Có | **COMPLETE B1** |
| OF029 | [OF029](../docs/pccp-700-roadmap/official-lessons/OF029.md) | Có | Chưa | Có | Có | Có | Chưa | PARTIAL |
| OF030 | [OF030](../docs/pccp-700-roadmap/official-lessons/OF030.md) | Có | Có | Có | Có | Có | Có | **COMPLETE B4** |
| OF031 | [OF031](../docs/pccp-700-roadmap/official-lessons/OF031.md) | Có | Có | Có | Có | Có | Có | **COMPLETE B13** |
| OF032 | [OF032](../docs/pccp-700-roadmap/official-lessons/OF032.md) | Có | Có | Có | Có | Có | Có | **COMPLETE B13** |
| OF033 | [OF033](../docs/pccp-700-roadmap/official-lessons/OF033.md) | Có | Có | Có | Có | Có | Có | **COMPLETE B13** |
| OF034 | [OF034](../docs/pccp-700-roadmap/official-lessons/OF034.md) | Có | Có | Có | Có | Có | Có | **COMPLETE B13** |
| OF035 | [OF035](../docs/pccp-700-roadmap/official-lessons/OF035.md) | Có | Có | Có | Có | Có | Có | **COMPLETE B13** |
| OF036 | [OF036](../docs/pccp-700-roadmap/official-lessons/OF036.md) | Có | Có | Có | Có | Có | Có | **COMPLETE B13** |
| OF037 | [OF037](../docs/pccp-700-roadmap/official-lessons/OF037.md) | Có | Có | Có | Có | Có | Có | **COMPLETE B11** |
| OF038 | [OF038](../docs/pccp-700-roadmap/official-lessons/OF038.md) | Có | Có | Có | Có | Có | Có | **COMPLETE B11** |
| OF039 | [OF039](../docs/pccp-700-roadmap/official-lessons/OF039.md) | Có | Có | Có | Có | Có | Có | **COMPLETE B11** |
| OF040 | [OF040](../docs/pccp-700-roadmap/official-lessons/OF040.md) | Có | Có | Có | Có | Có | Có | **COMPLETE B11** |
| OF041 | [OF041](../docs/pccp-700-roadmap/official-lessons/OF041.md) | Có | Chưa | Có | Có | Có | Chưa | PARTIAL |
| OF042 | [OF042](../docs/pccp-700-roadmap/official-lessons/OF042.md) | Có | Có | Có | Có | Có | Có | **COMPLETE B11** |
| OF043 | [OF043](../docs/pccp-700-roadmap/official-lessons/OF043.md) | Có | Có | Có | Có | Có | Có | **COMPLETE B10** |
| OF044 | [OF044](../docs/pccp-700-roadmap/official-lessons/OF044.md) | Có | Có | Có | Có | Có | Có | **COMPLETE B10** |
| OF045 | [OF045](../docs/pccp-700-roadmap/official-lessons/OF045.md) | Có | Chưa | Có | Có | Có | Chưa | PARTIAL |
| OF046 | [OF046](../docs/pccp-700-roadmap/official-lessons/OF046.md) | Có | Chưa | Có | Có | Có | Chưa | PARTIAL |
| OF047 | [OF047](../docs/pccp-700-roadmap/official-lessons/OF047.md) | Có | Chưa | Có | Có | Có | Chưa | PARTIAL |
| OF048 | [OF048](../docs/pccp-700-roadmap/official-lessons/OF048.md) | Có | Có | Có | Có | Có | Có | **COMPLETE B8** |
| OF049 | [OF049](../docs/pccp-700-roadmap/official-lessons/OF049.md) | Có | Có | Có | Có | Có | Có | **COMPLETE B8** |
| OF050 | [OF050](../docs/pccp-700-roadmap/official-lessons/OF050.md) | Có | Có | Có | Có | Có | Có | **COMPLETE B8** |
| OF051 | [OF051](../docs/pccp-700-roadmap/official-lessons/OF051.md) | Có | Có | Có | Có | Có | Có | **COMPLETE B2** |
| OF052 | [OF052](../docs/pccp-700-roadmap/official-lessons/OF052.md) | Có | Có | Có | Có | Có | Có | **COMPLETE B1** |
| OF053 | [OF053](../docs/pccp-700-roadmap/official-lessons/OF053.md) | Có | Có | Có | Có | Có | Có | **COMPLETE B3** |
| OF054 | [OF054](../docs/pccp-700-roadmap/official-lessons/OF054.md) | Có | Có | Có | Có | Có | Có | **COMPLETE B2** |
| OF055 | [OF055](../docs/pccp-700-roadmap/official-lessons/OF055.md) | Có | Có | Có | Có | Có | Có | **COMPLETE B11** |
| OF056 | [OF056](../docs/pccp-700-roadmap/official-lessons/OF056.md) | Có | Có | Có | Có | Có | Có | **COMPLETE B11** |
| OF057 | [OF057](../docs/pccp-700-roadmap/official-lessons/OF057.md) | Có | Có | Có | Có | Có | Có | **COMPLETE B4** |
| OF058 | [OF058](../docs/pccp-700-roadmap/official-lessons/OF058.md) | Có | Có | Có | Có | Có | Có | **COMPLETE B3** |
| OF059 | [OF059](../docs/pccp-700-roadmap/official-lessons/OF059.md) | Có | Chưa | Có | Có | Có | Chưa | PARTIAL |
| OF060 | [OF060](../docs/pccp-700-roadmap/official-lessons/OF060.md) | Có | Có | Có | Có | Có | Có | **COMPLETE B3** |
| OF061 | [OF061](../docs/pccp-700-roadmap/official-lessons/OF061.md) | Có | Có | Có | Có | Có | Có | **COMPLETE B2** |
| SR001 | [SR001](../docs/pccp-700-roadmap/official-lessons/SR001.md) | Có | Có | Có | Có | Có | Có | **COMPLETE B7** |
| SR002 | [SR002](../docs/pccp-700-roadmap/official-lessons/SR002.md) | Có | Có | Có | Có | Có | Có | **COMPLETE B6** |
| SR003 | [SR003](../docs/pccp-700-roadmap/official-lessons/SR003.md) | Có | Có | Có | Có | Có | Có | **COMPLETE B2** |
| SR004 | [SR004](../docs/pccp-700-roadmap/official-lessons/SR004.md) | Có | Có | Có | Có | Có | Có | **COMPLETE B2** |
| SR005 | [SR005](../docs/pccp-700-roadmap/official-lessons/SR005.md) | Có | Có | Có | Có | Có | Có | **COMPLETE B8** |
| SR006 | [SR006](../docs/pccp-700-roadmap/official-lessons/SR006.md) | Có | Có | Có | Có | Có | Có | **COMPLETE B11** |

## Notebook solution collections — inventory không đánh đồng với hoàn thành

| Problem ID | File canonical | Có 9 bước | Có Blueprint | Có brute force | Có code đầy đủ | Có dry run | Có recall | Status |
| --- | --- | ---: | ---: | ---: | ---: | ---: | ---: | --- |
| SOL-01-Array-String-Loop | [collection](solutions/01_Array_String_Loop_Solutions.md) | Chưa audit từng bài | Chưa | Có/tuỳ tầng | Có/tuỳ tầng | Có/tuỳ tầng | Có/tuỳ tầng | PARTIAL — cần tách hàng ở Batch 2+ |
| SOL-02-Matrix | [collection](solutions/02_Matrix_Solutions.md) | Chưa audit từng bài | Chưa | Có/tuỳ tầng | Có/tuỳ tầng | Có/tuỳ tầng | Có/tuỳ tầng | PARTIAL — cần tách hàng ở Batch 2+ |
| SOL-03-Map-Set | [collection](solutions/03_Map_Set_Solutions.md) | Chưa audit từng bài | Chưa | Có/tuỳ tầng | Có/tuỳ tầng | Có/tuỳ tầng | Có/tuỳ tầng | PARTIAL — cần tách hàng ở Batch 2+ |
| SOL-03-Map-Set-Programmers | [collection](solutions/03_Map_Set_Programmers_Solutions.md) | Chưa audit từng bài | Chưa | Có/tuỳ tầng | Có/tuỳ tầng | Có/tuỳ tầng | Có/tuỳ tầng | PARTIAL — cần tách hàng ở Batch 2+ |
| SOL-04-Simulation | [collection](solutions/04_Simulation_Solutions.md) | Chưa audit từng bài | Chưa | Có/tuỳ tầng | Có/tuỳ tầng | Có/tuỳ tầng | Có/tuỳ tầng | PARTIAL — cần tách hàng ở Batch 2+ |
| SOL-04-Simulation-PCCP | [collection](solutions/04_Simulation_PCCP_Solutions.md) | Chưa audit từng bài | Chưa | Có/tuỳ tầng | Có/tuỳ tầng | Có/tuỳ tầng | Có/tuỳ tầng | PARTIAL — cần tách hàng ở Batch 2+ |
| SOL-05-Sorting | [collection](solutions/05_Sorting_Solutions.md) | Chưa audit từng bài | Chưa | Có/tuỳ tầng | Có/tuỳ tầng | Có/tuỳ tầng | Có/tuỳ tầng | PARTIAL — cần tách hàng ở Batch 2+ |
| SOL-06-Two-Pointers | [collection](solutions/06_Two_Pointers_Solutions.md) | Chưa audit từng bài | Chưa | Có/tuỳ tầng | Có/tuỳ tầng | Có/tuỳ tầng | Có/tuỳ tầng | PARTIAL — cần tách hàng ở Batch 2+ |
| SOL-07-Sliding-Window-Prefix-Sum | [collection](solutions/07_Sliding_Window_Prefix_Sum_Solutions.md) | Chưa audit từng bài | Chưa | Có/tuỳ tầng | Có/tuỳ tầng | Có/tuỳ tầng | Có/tuỳ tầng | PARTIAL — cần tách hàng ở Batch 2+ |
| SOL-08-Stack-Queue | [collection](solutions/08_Stack_Queue_Solutions.md) | Chưa audit từng bài | Chưa | Có/tuỳ tầng | Có/tuỳ tầng | Có/tuỳ tầng | Có/tuỳ tầng | PARTIAL — cần tách hàng ở Batch 2+ |
| SOL-08-Stack-Queue-Programmers | [collection](solutions/08_Stack_Queue_Programmers_Solutions.md) | Chưa audit từng bài | Chưa | Có/tuỳ tầng | Có/tuỳ tầng | Có/tuỳ tầng | Có/tuỳ tầng | PARTIAL — cần tách hàng ở Batch 2+ |
| SOL-09-Binary-Search | [collection](solutions/09_Binary_Search_Solutions.md) | Chưa audit từng bài | Chưa | Có/tuỳ tầng | Có/tuỳ tầng | Có/tuỳ tầng | Có/tuỳ tầng | PARTIAL — cần tách hàng ở Batch 2+ |
| SOL-10-BFS-DFS | [collection](solutions/10_BFS_DFS_Solutions.md) | Chưa audit từng bài | Chưa | Có/tuỳ tầng | Có/tuỳ tầng | Có/tuỳ tầng | Có/tuỳ tầng | PARTIAL — cần tách hàng ở Batch 2+ |
| SOL-11-Heap-Greedy | [collection](solutions/11_Heap_Greedy_Solutions.md) | Chưa audit từng bài | Chưa | Có/tuỳ tầng | Có/tuỳ tầng | Có/tuỳ tầng | Có/tuỳ tầng | PARTIAL — cần tách hàng ở Batch 2+ |
| SOL-12-Backtracking-DP-Basic | [collection](solutions/12_Backtracking_DP_Basic_Solutions.md) | Chưa audit từng bài | Chưa | Có/tuỳ tầng | Có/tuỳ tầng | Có/tuỳ tầng | Có/tuỳ tầng | PARTIAL — cần tách hàng ở Batch 2+ |
| SOL-13-Advanced-Graph | [collection](solutions/13_Advanced_Graph_Solutions.md) | Chưa audit từng bài | Chưa | Có/tuỳ tầng | Có/tuỳ tầng | Có/tuỳ tầng | Có/tuỳ tầng | PARTIAL — cần tách hàng ở Batch 2+ |
| SOL-90-Mixed-Pattern-Tests | [collection](solutions/90_Mixed_Pattern_Tests_Solutions.md) | Chưa audit từng bài | Chưa | Có/tuỳ tầng | Có/tuỳ tầng | Có/tuỳ tầng | Có/tuỳ tầng | PARTIAL — cần tách hàng ở Batch 2+ |

## Batch 1

Các bài public ưu tiên: OF007, OF008, OF009, OF011, OF028, OF052. Bốn lesson pattern
`B1-PREFIX`, `B1-FIXED-WINDOW`, `B1-VARIABLE-MAP`, `B1-SUBARRAY-K` được theo dõi tại
[Batch 1 problem-to-code lab](chapters/07_prefix_window/05_Batch1_Problem_To_Code_Lab.md).

| Problem ID | File canonical | Có 9 bước | Có Blueprint | Có brute force | Có code đầy đủ | Có dry run | Có recall | Status |
| --- | --- | ---: | ---: | ---: | ---: | ---: | ---: | --- |
| B1-PREFIX | [lab § B1-PREFIX](chapters/07_prefix_window/05_Batch1_Problem_To_Code_Lab.md#b1-prefix--nhiều-truy-vấn-tổng-đoạn) | Có | Có | Có | Có | Có | Có | **COMPLETE B1** |
| B1-FIXED-WINDOW | [lab § B1-FIXED-WINDOW](chapters/07_prefix_window/05_Batch1_Problem_To_Code_Lab.md#b1-fixed-window--tổng-mọi-cửa-sổ-dài-k) | Có | Có | Có | Có | Có | Có | **COMPLETE B1** |
| B1-VARIABLE-MAP | [lab § B1-VARIABLE-MAP](chapters/07_prefix_window/05_Batch1_Problem_To_Code_Lab.md#b1-variable-map--đoạn-ngắn-nhất-chứa-mọi-loại) | Có | Có | Có | Có | Có | Có | **COMPLETE B1** |
| B1-SUBARRAY-K | [lab § B1-SUBARRAY-K](chapters/07_prefix_window/05_Batch1_Problem_To_Code_Lab.md#b1-subarray-k--đếm-đoạn-liên-tiếp-tổng-bằng-k) | Có | Có | Có | Có | Có | Có | **COMPLETE B1** |

Kết quả Batch 1: **10/10 bài/dạng COMPLETE** sau đọc tay theo standard; code official vẫn được
audit hành vi bởi test hiện có. Các official lesson ngoài danh sách trên chưa được nâng status.

## Batch 2 — Stack/Queue (COMPLETE)

- **Đã hoàn thành thật:** OF006 Không thích số giống nhau, OF010 Xe tải qua cầu, OF051 Game
  gắp thú, OF054 Làm hai queue có tổng bằng nhau, OF061 Số lớn hơn phía sau, SR003 Xoay dấu
  ngoặc, OF027 Tạo số lớn và SR004 Hai chồng thẻ. Tám bài được nâng trực tiếp trong official
  lesson canonical, gồm code tối ưu tách transition dễ đọc.

| Problem ID | File canonical | Có 9 bước | Blueprint | Brute force | Full code | Dry run | Recall | Status |
| --- | --- | ---: | ---: | ---: | ---: | ---: | ---: | --- |
| SQ-P09 | [Xóa cặp liền nhau](solutions/08_Stack_Queue_Programmers_Solutions.md#sq-p09--xóa-cặp-liền-nhau) | Có | Có | Có | Có | Có | Có | **COMPLETE B2** |
| SQ-P11 | [Hộp hàng](solutions/08_Stack_Queue_Programmers_Solutions.md#sq-p11--hộp-hàng) | Có | Có | Có | Có | Có | Có | **COMPLETE B2** |

Kết quả Batch 2: **13/13 bài Stack/Queue Kit** đã có canonical đầy đủ: P01..P08 và P10/P12/P13
map vào official lesson đã COMPLETE; P09/P11 hoàn thiện trực tiếp trong solution collection.
Các entry `SQ-B01..B08`, `SQ-C01` là BFS/graph nên được owner bởi batch BFS/DFS, không dùng để
giữ Batch Stack/Queue ở trạng thái mở. Practice nội bộ `S08-*` dùng canonical pattern SQ-01..05
đã FRAMEWORK-FULL; các tầng recognition/fill không bị giả vờ là full solution.

## Batch 3 — Sliding Window/Prefix Sum (COMPLETE)

- Bốn deep lab B1-PREFIX, B1-FIXED-WINDOW, B1-VARIABLE-MAP, B1-SUBARRAY-K đã COMPLETE.
- OF052 fixed frequency window đã COMPLETE B1; OF053 positive variable window, OF058 cover Map
  và OF060 difference 2D đã được nâng trực tiếp và đánh dấu COMPLETE B3.
- Canonical pattern `PRE-01..05`, `SW-01..06` đã FRAMEWORK-FULL; Practice Ladder giữ đúng tầng
  R/F/L/P/C/V/M, không ép đáp án nhận dạng ngắn thành một “full solution” giả.
- Kết quả: các engine chính của chapter đã đủ cầu nối brute → bottleneck → state → transition →
  invariant → code; Batch kế tiếp là Two Pointers/Greedy.

## Batch 4 — Two Pointers/Greedy (COMPLETE)

- Canonical patterns `TP-01..06` đã FRAMEWORK-FULL và có Practice/Solution/Test tương ứng.
- OF028 extreme pairing đã COMPLETE B1; OF053 positive two pointers đã COMPLETE B3.
- OF025 neighbor greedy, OF030 closed interval stabbing và OF057 open interval stabbing đã được
  nâng đầy đủ trong batch này, gồm brute force, exchange invariant, Blueprint và revealing tests.
- Contrast `<`/`<=` giữa interval mở/đóng được giữ ở hai canonical lesson riêng; không gom thành
  mẹo đổi dấu thiếu proof. Batch kế tiếp là Map/Set.

## Batch 5 — Map/Set (COMPLETE)

- Canonical patterns `MAP-01..14` đã FRAMEWORK-FULL và có Practice/Solution/Test tương ứng.
- Toàn bộ Hash Kit public `OF001..OF005` đã được nâng trực tiếp: frequency multiset, Set
  cardinality, prefix adjacency, product rule và group-level/item-level ordering.
- Mỗi lesson có làm tay, brute force executable, bottleneck, bảng state/init, Blueprint,
  invariant, revealing tests và recall ba tầng; OF005 tách rõ hai Map phải cập nhật đồng bộ.
- Contrast Set presence / Map multiplicity / Map aggregate+group được giữ riêng theo contract.
  Batch kế tiếp là Array/String/Loop.

## Batch 6 — Array/String/Loop (COMPLETE)

- Canonical patterns `ARR-01..07` đã FRAMEWORK-FULL và có Practice/Solution/Test tương ứng.
- OF006, transfer cho run liên tiếp, đã COMPLETE B2; khoảng trống owner còn lại là SR002
  chunk compression và đã được nâng đầy đủ trong batch này.
- SR002 nay tách rõ outer enumeration với inner run state, có brute force dựng string,
  bảng state/init, Blueprint, final-flush invariant và test cho phần dư/count hai chữ số.
- OF015, SR001 và OF049 không bị kéo vào batch này: chúng thuộc Sorting, Matrix và Simulation.
  Batch kế tiếp là Matrix.

## Batch 7 — Matrix (COMPLETE)

- Canonical patterns `MAT-01..05` đã FRAMEWORK-FULL và có Practice/Solution/Test tương ứng.
- SR001 matrix addition là official owner trực tiếp còn thiếu và đã được nâng đầy đủ: brute
  force tối ưu theo lower bound, bảng state/init, Blueprint và invariant hai tầng row/column.
- Code canonical bỏ callback lồng viết tắt, dựng `resultRow` mới mỗi hàng để làm rõ shape,
  non-mutation và independence của row references.
- Revealing tests phủ `1×N`, `N×1`, số âm/zero, input không mutate và lỗi `.fill([])` alias.
  OF049 được giữ cho batch Simulation vì matrix chỉ là representation, validate-then-commit
  mới là engine quyết định. Batch kế tiếp là Simulation.

## Batch 8 — Simulation (COMPLETE)

- Canonical patterns `SIM-01..05` đã FRAMEWORK-FULL; OF051 được kế thừa từ Batch 2.
- OF048, OF049, OF050 và SR005 đã được nâng đầy đủ theo bốn state engine: normalize scalar,
  validate-then-commit, array/inverse-Map invariant và event simulation + preemption stack.
- Mỗi lesson có làm tay, brute force executable, bảng state/init, Blueprint, invariant,
  revealing tests và recall; code OF050/SR005 tách callback rút gọn để lộ transition.
- Tests mới khóa exclusive date boundary, rectangular rollback, repeated calling/immutable input
  và một khoảng rảnh resume nhiều task. OF062 vẫn giữ khóa reserved mock đúng Navigator.
  Batch kế tiếp là Sorting.

## Batch 9 — Sorting (COMPLETE)

- Canonical patterns `SORT-01..05` đã FRAMEWORK-FULL.
- OF015..OF018 đã được nâng đầy đủ: numeric slice/rank, concatenation comparator,
  descending rank boundary và local orientation normalization.
- Code OF015/OF016 tách callback rút gọn; tests khóa lexicographic-vs-numeric, prefix token,
  equality boundary, all-zero collapse, input mutation và orientation counterexample.
- Batch kế tiếp là Binary Search.

## Batch 10 — Binary Search (COMPLETE)

- Canonical patterns `BS-01..05` đã FRAMEWORK-FULL.
- OF043 và OF044 đã được nâng đầy đủ cho hai convention đối xứng: first feasible minimum time
  và last feasible maximum gap qua first false.
- OF043 khóa invariant `high` luôn feasible, cutoff predicate và arithmetic BigInt tới `10^18`;
  OF044 khóa greedy removal, destination sentinel và input không mutate.
- Mỗi lesson có làm tay, brute force executable, bảng state/init, Blueprint, chứng minh invariant,
  revealing tests và recall. Batch kế tiếp là BFS/DFS/Graph.

## Batch 11 — Graph Traversal/Tree (COMPLETE)

- Canonical patterns `BFS-01..07` và `TREE-01` đã FRAMEWORK-FULL.
- OF023, OF024, OF037–OF040, OF042, OF055, OF056 và SR006 đã được nâng đầy đủ; OF022/OF036
  được giữ đúng owner Backtracking, OF041 đúng owner Advanced Graph.
- Nhóm core khóa outer component traversal, preorder lexical, shortest unweighted và parent-chain
  propagation; nhóm transfer khóa implicit neighbor, coordinate scale, canonical shape và BFS hai phase.
- Mỗi lesson có làm tay, brute force executable, bảng state/init, Blueprint, invariant, revealing
  tests và recall. Batch kế tiếp là Heap/Scheduling.

## Batch 12 — Heap/Scheduling (COMPLETE)

- Canonical patterns `HG-01..05` đã FRAMEWORK-FULL; greedy interval/extreme pairing được kế thừa
  từ Batch 4, nên batch này tập trung đúng ba owner heap còn PARTIAL.
- OF012–OF014 đã được nâng đầy đủ cho min-heap, event sweep + shortest-job heap và dual heap lazy
  deletion; code tách các transition bubble, eligibility, clean stale và live-count rõ ràng.
- Tests khóa duplicate occurrence, impossible state, job tương lai chưa eligible, idle jump, input
  không mutate, delete empty và stale root cuối. Batch kế tiếp là Backtracking/DP.

## Batch 13 — Backtracking/DP (COMPLETE)

- Canonical patterns `BTD-01..08` đã FRAMEWORK-FULL.
- OF020, OF022 và OF036 khóa ba decision tree khác nhau: partial permutation + output Set,
  permutation có feasibility/restore và fixed binary choice theo index.
- OF031–OF035 khóa Set-DP theo resource, bottom-up cell DP, grid count, interval min/max và circular
  case split; mỗi lesson chỉ rõ state nào được gộp và dependency order.
- Tests mới phủ leading zero/duplicate occurrence, restore, path-count base, negative DP, exact-count
  concatenation và endpoint conflict. Batch kế tiếp là Advanced Graph.

## Backlog thật

1. Tách từng Practice ID khỏi 17 collection và đánh giá bằng chứng thay vì suy từ file.
2. Batch 14 tiếp tục Advanced Graph; sau đó hardening các lesson còn lại.
3. Official lessons ngoài Batch 1 vẫn PARTIAL; tracker này cố ý không tuyên bố “toàn bộ hoàn thành”.
