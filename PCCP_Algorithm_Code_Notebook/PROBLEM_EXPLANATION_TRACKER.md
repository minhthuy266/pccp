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
| OF012 | [OF012](../docs/pccp-700-roadmap/official-lessons/OF012.md) | Có | Chưa | Có | Có | Có | Chưa | PARTIAL |
| OF013 | [OF013](../docs/pccp-700-roadmap/official-lessons/OF013.md) | Có | Chưa | Có | Có | Có | Chưa | PARTIAL |
| OF014 | [OF014](../docs/pccp-700-roadmap/official-lessons/OF014.md) | Có | Chưa | Có | Có | Có | Chưa | PARTIAL |
| OF015 | [OF015](../docs/pccp-700-roadmap/official-lessons/OF015.md) | Có | Chưa | Có | Có | Có | Chưa | PARTIAL |
| OF016 | [OF016](../docs/pccp-700-roadmap/official-lessons/OF016.md) | Có | Chưa | Có | Có | Có | Chưa | PARTIAL |
| OF017 | [OF017](../docs/pccp-700-roadmap/official-lessons/OF017.md) | Có | Chưa | Có | Có | Có | Chưa | PARTIAL |
| OF018 | [OF018](../docs/pccp-700-roadmap/official-lessons/OF018.md) | Có | Chưa | Có | Có | Có | Chưa | PARTIAL |
| OF019 | [OF019](../docs/pccp-700-roadmap/official-lessons/OF019.md) | Có | Chưa | Có | Có | Có | Chưa | PARTIAL |
| OF020 | [OF020](../docs/pccp-700-roadmap/official-lessons/OF020.md) | Có | Chưa | Có | Có | Có | Chưa | PARTIAL |
| OF021 | [OF021](../docs/pccp-700-roadmap/official-lessons/OF021.md) | Có | Chưa | Có | Có | Có | Chưa | PARTIAL |
| OF022 | [OF022](../docs/pccp-700-roadmap/official-lessons/OF022.md) | Có | Chưa | Có | Có | Có | Chưa | PARTIAL |
| OF023 | [OF023](../docs/pccp-700-roadmap/official-lessons/OF023.md) | Có | Chưa | Có | Có | Có | Chưa | PARTIAL |
| OF024 | [OF024](../docs/pccp-700-roadmap/official-lessons/OF024.md) | Có | Chưa | Có | Có | Có | Chưa | PARTIAL |
| OF025 | [OF025](../docs/pccp-700-roadmap/official-lessons/OF025.md) | Có | Có | Có | Có | Có | Có | **COMPLETE B4** |
| OF026 | [OF026](../docs/pccp-700-roadmap/official-lessons/OF026.md) | Có | Chưa | Có | Có | Có | Chưa | PARTIAL |
| OF027 | [OF027](../docs/pccp-700-roadmap/official-lessons/OF027.md) | Có | Có | Có | Có | Có | Có | **COMPLETE B2** |
| OF028 | [OF028](../docs/pccp-700-roadmap/official-lessons/OF028.md) | Có | Có | Có | Có | Có | Có | **COMPLETE B1** |
| OF029 | [OF029](../docs/pccp-700-roadmap/official-lessons/OF029.md) | Có | Chưa | Có | Có | Có | Chưa | PARTIAL |
| OF030 | [OF030](../docs/pccp-700-roadmap/official-lessons/OF030.md) | Có | Có | Có | Có | Có | Có | **COMPLETE B4** |
| OF031 | [OF031](../docs/pccp-700-roadmap/official-lessons/OF031.md) | Có | Chưa | Có | Có | Có | Chưa | PARTIAL |
| OF032 | [OF032](../docs/pccp-700-roadmap/official-lessons/OF032.md) | Có | Chưa | Có | Có | Có | Chưa | PARTIAL |
| OF033 | [OF033](../docs/pccp-700-roadmap/official-lessons/OF033.md) | Có | Chưa | Có | Có | Có | Chưa | PARTIAL |
| OF034 | [OF034](../docs/pccp-700-roadmap/official-lessons/OF034.md) | Có | Chưa | Có | Có | Có | Chưa | PARTIAL |
| OF035 | [OF035](../docs/pccp-700-roadmap/official-lessons/OF035.md) | Có | Chưa | Có | Có | Có | Chưa | PARTIAL |
| OF036 | [OF036](../docs/pccp-700-roadmap/official-lessons/OF036.md) | Có | Chưa | Có | Có | Có | Chưa | PARTIAL |
| OF037 | [OF037](../docs/pccp-700-roadmap/official-lessons/OF037.md) | Có | Chưa | Có | Có | Có | Chưa | PARTIAL |
| OF038 | [OF038](../docs/pccp-700-roadmap/official-lessons/OF038.md) | Có | Chưa | Có | Có | Có | Chưa | PARTIAL |
| OF039 | [OF039](../docs/pccp-700-roadmap/official-lessons/OF039.md) | Có | Chưa | Có | Có | Có | Chưa | PARTIAL |
| OF040 | [OF040](../docs/pccp-700-roadmap/official-lessons/OF040.md) | Có | Chưa | Có | Có | Có | Chưa | PARTIAL |
| OF041 | [OF041](../docs/pccp-700-roadmap/official-lessons/OF041.md) | Có | Chưa | Có | Có | Có | Chưa | PARTIAL |
| OF042 | [OF042](../docs/pccp-700-roadmap/official-lessons/OF042.md) | Có | Chưa | Có | Có | Có | Chưa | PARTIAL |
| OF043 | [OF043](../docs/pccp-700-roadmap/official-lessons/OF043.md) | Có | Chưa | Có | Có | Có | Chưa | PARTIAL |
| OF044 | [OF044](../docs/pccp-700-roadmap/official-lessons/OF044.md) | Có | Chưa | Có | Có | Có | Chưa | PARTIAL |
| OF045 | [OF045](../docs/pccp-700-roadmap/official-lessons/OF045.md) | Có | Chưa | Có | Có | Có | Chưa | PARTIAL |
| OF046 | [OF046](../docs/pccp-700-roadmap/official-lessons/OF046.md) | Có | Chưa | Có | Có | Có | Chưa | PARTIAL |
| OF047 | [OF047](../docs/pccp-700-roadmap/official-lessons/OF047.md) | Có | Chưa | Có | Có | Có | Chưa | PARTIAL |
| OF048 | [OF048](../docs/pccp-700-roadmap/official-lessons/OF048.md) | Có | Chưa | Có | Có | Có | Chưa | PARTIAL |
| OF049 | [OF049](../docs/pccp-700-roadmap/official-lessons/OF049.md) | Có | Chưa | Có | Có | Có | Chưa | PARTIAL |
| OF050 | [OF050](../docs/pccp-700-roadmap/official-lessons/OF050.md) | Có | Chưa | Có | Có | Có | Chưa | PARTIAL |
| OF051 | [OF051](../docs/pccp-700-roadmap/official-lessons/OF051.md) | Có | Có | Có | Có | Có | Có | **COMPLETE B2** |
| OF052 | [OF052](../docs/pccp-700-roadmap/official-lessons/OF052.md) | Có | Có | Có | Có | Có | Có | **COMPLETE B1** |
| OF053 | [OF053](../docs/pccp-700-roadmap/official-lessons/OF053.md) | Có | Có | Có | Có | Có | Có | **COMPLETE B3** |
| OF054 | [OF054](../docs/pccp-700-roadmap/official-lessons/OF054.md) | Có | Có | Có | Có | Có | Có | **COMPLETE B2** |
| OF055 | [OF055](../docs/pccp-700-roadmap/official-lessons/OF055.md) | Có | Chưa | Có | Có | Có | Chưa | PARTIAL |
| OF056 | [OF056](../docs/pccp-700-roadmap/official-lessons/OF056.md) | Có | Chưa | Có | Có | Có | Chưa | PARTIAL |
| OF057 | [OF057](../docs/pccp-700-roadmap/official-lessons/OF057.md) | Có | Có | Có | Có | Có | Có | **COMPLETE B4** |
| OF058 | [OF058](../docs/pccp-700-roadmap/official-lessons/OF058.md) | Có | Có | Có | Có | Có | Có | **COMPLETE B3** |
| OF059 | [OF059](../docs/pccp-700-roadmap/official-lessons/OF059.md) | Có | Chưa | Có | Có | Có | Chưa | PARTIAL |
| OF060 | [OF060](../docs/pccp-700-roadmap/official-lessons/OF060.md) | Có | Có | Có | Có | Có | Có | **COMPLETE B3** |
| OF061 | [OF061](../docs/pccp-700-roadmap/official-lessons/OF061.md) | Có | Có | Có | Có | Có | Có | **COMPLETE B2** |
| SR001 | [SR001](../docs/pccp-700-roadmap/official-lessons/SR001.md) | Có | Chưa | Có | Có | Có | Chưa | PARTIAL |
| SR002 | [SR002](../docs/pccp-700-roadmap/official-lessons/SR002.md) | Có | Chưa | Có | Có | Có | Chưa | PARTIAL |
| SR003 | [SR003](../docs/pccp-700-roadmap/official-lessons/SR003.md) | Có | Có | Có | Có | Có | Có | **COMPLETE B2** |
| SR004 | [SR004](../docs/pccp-700-roadmap/official-lessons/SR004.md) | Có | Có | Có | Có | Có | Có | **COMPLETE B2** |
| SR005 | [SR005](../docs/pccp-700-roadmap/official-lessons/SR005.md) | Có | Chưa | Có | Có | Có | Chưa | PARTIAL |
| SR006 | [SR006](../docs/pccp-700-roadmap/official-lessons/SR006.md) | Có | Chưa | Có | Có | Có | Chưa | PARTIAL |

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

## Backlog thật

1. Tách từng Practice ID khỏi 17 collection và đánh giá bằng chứng thay vì suy từ file.
2. Batch 6 tiếp tục Array/String/Loop; sau đó các nhóm theo Navigator.
3. Official lessons ngoài Batch 1 vẫn PARTIAL; tracker này cố ý không tuyên bố “toàn bộ hoàn thành”.
