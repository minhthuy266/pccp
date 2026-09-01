import { defineSixLevelLesson } from "./lessonFactory";
import type { ProgressiveLesson, TransferChallenge } from "./types";

const timeSolution = `function moveVideo(videoLen, pos, opStart, opEnd, commands) {
  const toSeconds = (text) => {
    const [mm, ss] = text.split(":").map(Number);
    return mm * 60 + ss;
  };
  const toTime = (total) => {
    const mm = String(Math.floor(total / 60)).padStart(2, "0");
    const ss = String(total % 60).padStart(2, "0");
    return mm + ":" + ss;
  };
  const videoSeconds = toSeconds(videoLen);
  const opStartSeconds = toSeconds(opStart);
  const opEndSeconds = toSeconds(opEnd);
  let current = toSeconds(pos);
  const skipOpening = (value) => opStartSeconds <= value && value <= opEndSeconds ? opEndSeconds : value;
  current = skipOpening(current);
  for (const command of commands) {
    current = command === "prev" ? Math.max(0, current - 10) : Math.min(videoSeconds, current + 10);
    current = skipOpening(current);
  }
  return toTime(current);
}`;

const timeTests = [
  { label: "ordinary commands", expression: `moveVideo("34:33", "13:00", "00:55", "02:55", ["next", "prev"])`, expected: `"13:00"` },
  { label: "initial opening skip", expression: `moveVideo("10:00", "01:30", "01:00", "02:00", [])`, expected: `"02:00"` },
  { label: "closed endpoint after command", expression: `moveVideo("10:00", "02:10", "02:20", "02:30", ["next"])`, expected: `"02:30"` },
  { label: "clamp at zero", expression: `moveVideo("10:00", "00:05", "03:00", "04:00", ["prev"])`, expected: `"00:00"` },
];

const hmsSolution = `function addSecondsHms(text, delta) {
  const [hh, mm, ss] = text.split(":").map(Number);
  const total = Math.max(0, hh * 3600 + mm * 60 + ss + delta);
  const nextHh = String(Math.floor(total / 3600)).padStart(2, "0");
  const nextMm = String(Math.floor(total % 3600 / 60)).padStart(2, "0");
  const nextSs = String(total % 60).padStart(2, "0");
  return nextHh + ":" + nextMm + ":" + nextSs;
}`;

const timeChallenges: TransferChallenge[] = [
  { kind: "DEBUG", id: "debug-initial-skip", title: "Debug thiếu initial normalization", change: "Starter chỉ skip opening sau command, nên input bắt đầu trong opening bị sai.", functionSignature: "moveVideo(videoLen, pos, opStart, opEnd, commands)", starterCode: timeSolution.replace("  current = skipOpening(current);\n  for", "  for"), solution: timeSolution, tests: timeTests },
  { kind: "DEBUG", id: "debug-closed-endpoint", title: "Debug interval endpoint", change: "Opening là đoạn đóng; starter dùng strict comparison và bỏ sót hai endpoint.", functionSignature: "moveVideo(videoLen, pos, opStart, opEnd, commands)", starterCode: timeSolution.replace("opStartSeconds <= value && value <= opEndSeconds", "opStartSeconds < value && value < opEndSeconds"), solution: timeSolution, tests: timeTests },
  { kind: "VARIANT", id: "variant-hhmmss", title: "mm:ss → hh:mm:ss", change: "Representation thêm giờ; arithmetic vẫn chỉ dùng tổng giây.", functionSignature: "addSecondsHms(text, delta)", starterCode: `function addSecondsHms(text, delta) {\n  // parse canonical seconds, apply delta, format hh:mm:ss\n}`, solution: hmsSolution, tests: [
    { label: "cross hour", expression: `addSecondsHms("00:59:55", 10)`, expected: `"01:00:05"` },
    { label: "clamp zero", expression: `addSecondsHms("00:00:03", -10)`, expected: `"00:00:00"` },
    { label: "multiple hours", expression: `addSecondsHms("12:34:56", 4)`, expected: `"12:35:00"` },
  ] },
  { kind: "VARIANT", id: "variant-half-open", title: "Closed → half-open interval", change: "End không còn thuộc interval: [start,end).", functionSignature: "isInsideHalfOpen(position, start, end)", starterCode: `function isInsideHalfOpen(position, start, end) {\n  return start <= position && position <= end;\n}`, solution: `function isInsideHalfOpen(position, start, end) {\n  return start <= position && position < end;\n}`, tests: [
    { label: "inside", expression: "isInsideHalfOpen(5, 3, 8)", expected: "true" },
    { label: "start included", expression: "isInsideHalfOpen(3, 3, 8)", expected: "true" },
    { label: "end excluded", expression: "isInsideHalfOpen(8, 3, 8)", expected: "false" },
    { label: "outside", expression: "isInsideHalfOpen(9, 3, 8)", expected: "false" },
  ] },
];

const runSolution = `function repeatedRunLetters(text) {
  const blocks = new Map();
  for (let start = 0; start < text.length; ) {
    let end = start + 1;
    while (end < text.length && text[end] === text[start]) end++;
    blocks.set(text[start], (blocks.get(text[start]) ?? 0) + 1);
    start = end;
  }
  const answer = [...blocks].filter(([, count]) => count >= 2).map(([char]) => char).sort();
  return answer.length ? answer : ["N"];
}`;

const runTests = [
  { label: "separated blocks", expression: `repeatedRunLetters("edeaaabbccd")`, expected: `["d","e"]` },
  { label: "frequency is not block count", expression: `repeatedRunLetters("aaabbb")`, expected: `["N"]` },
  { label: "final run matters", expression: `repeatedRunLetters("abcca")`, expected: `["a"]` },
  { label: "empty", expression: `repeatedRunLetters("")`, expected: `["N"]` },
];

const rleSolution = `function runLengthEncode(text) {
  const result = [];
  for (let start = 0; start < text.length; ) {
    let end = start + 1;
    while (end < text.length && text[end] === text[start]) end++;
    result.push([text[start], end - start]);
    start = end;
  }
  return result;
}`;

const longestRunSolution = `function longestRun(text) {
  let bestChar = "", bestLength = 0;
  for (let start = 0; start < text.length; ) {
    let end = start + 1;
    while (end < text.length && text[end] === text[start]) end++;
    if (end - start > bestLength) { bestChar = text[start]; bestLength = end - start; }
    start = end;
  }
  return [bestChar, bestLength];
}`;

const runChallenges: TransferChallenge[] = [
  { kind: "DEBUG", id: "debug-final-flush", title: "Debug quên final flush", change: "Starter chỉ ghi run khi gặp ký tự mới nên mất run cuối.", functionSignature: "repeatedRunLetters(text)", starterCode: `function repeatedRunLetters(text) {
  const blocks = new Map(); let start = 0;
  for (let index = 1; index < text.length; index++) {
    if (text[index] !== text[start]) { blocks.set(text[start], (blocks.get(text[start]) ?? 0) + 1); start = index; }
  }
  const answer = [...blocks].filter(([, count]) => count >= 2).map(([char]) => char).sort();
  return answer.length ? answer : ["N"];
}`, solution: runSolution, tests: runTests },
  { kind: "DEBUG", id: "debug-frequency-vs-runs", title: "Debug đếm frequency thay vì run", change: "Starter đếm số ký tự, nhưng contract hỏi số block tách biệt.", functionSignature: "repeatedRunLetters(text)", starterCode: `function repeatedRunLetters(text) {
  const count = new Map();
  for (const char of text) count.set(char, (count.get(char) ?? 0) + 1);
  const answer = [...count].filter(([, value]) => value >= 2).map(([char]) => char).sort();
  return answer.length ? answer : ["N"];
}`, solution: runSolution, tests: runTests },
  { kind: "VARIANT", id: "variant-rle", title: "Run detection → run-length encoding", change: "Output đổi từ repeated letters sang mọi [character,length] run.", functionSignature: "runLengthEncode(text)", starterCode: `function runLengthEncode(text) {\n  // scan maximal [start,end) runs\n}`, solution: rleSolution, tests: [
    { label: "mixed", expression: `runLengthEncode("aaabbc")`, expected: `[["a",3],["b",2],["c",1]]` },
    { label: "empty", expression: `runLengthEncode("")`, expected: `[]` },
    { label: "single", expression: `runLengthEncode("z")`, expected: `[["z",1]]` },
  ] },
  { kind: "VARIANT", id: "variant-longest-run", title: "Collect runs → optimize one run", change: "Output là run dài nhất; hòa giữ run xuất hiện trước.", functionSignature: "longestRun(text)", starterCode: `function longestRun(text) {\n  // return [character, length]\n}`, solution: longestRunSolution, tests: [
    { label: "longest middle", expression: `longestRun("aabbbbcc")`, expected: `["b",4]` },
    { label: "first tie", expression: `longestRun("aabb")`, expected: `["a",2]` },
    { label: "empty", expression: `longestRun("")`, expected: `["",0]` },
  ] },
];

const gridSolution = `function neighbors4(grid, row, col) {
  const rows = grid.length;
  if (rows === 0) return [];
  const cols = grid[0].length;
  const directions = [[-1, 0], [1, 0], [0, -1], [0, 1]];
  const result = [];
  for (const [dr, dc] of directions) {
    const nextRow = row + dr, nextCol = col + dc;
    if (nextRow < 0 || nextRow >= rows || nextCol < 0 || nextCol >= cols) continue;
    result.push([nextRow, nextCol]);
  }
  return result;
}`;

const gridTests = [
  { label: "rectangular center", expression: "neighbors4([[0,0,0],[0,0,0]], 0, 1)", expected: "[[1,1],[0,0],[0,2]]" },
  { label: "corner", expression: "neighbors4([[0,0],[0,0]], 0, 0)", expected: "[[1,0],[0,1]]" },
  { label: "single row", expression: "neighbors4([[0,0,0]], 0, 1)", expected: "[[0,0],[0,2]]" },
  { label: "empty grid", expression: "neighbors4([], 0, 0)", expected: "[]" },
];

const neighbors8Solution = `function neighbors8(grid, row, col) {
  const rows = grid.length;
  if (rows === 0) return [];
  const cols = grid[0].length, result = [];
  for (let dr = -1; dr <= 1; dr++) for (let dc = -1; dc <= 1; dc++) {
    if (dr === 0 && dc === 0) continue;
    const nr = row + dr, nc = col + dc;
    if (0 <= nr && nr < rows && 0 <= nc && nc < cols) result.push([nr, nc]);
  }
  return result;
}`;

const pathSolution = `function moveIfPathClear(grid, start, path) {
  const rows = grid.length, cols = grid[0].length;
  const origin = [...start]; let row = start[0], col = start[1];
  for (const [dr, dc] of path) {
    const nextRow = row + dr, nextCol = col + dc;
    if (nextRow < 0 || nextRow >= rows || nextCol < 0 || nextCol >= cols || grid[nextRow][nextCol] === 1) return origin;
    row = nextRow; col = nextCol;
  }
  return [row, col];
}`;

const gridChallenges: TransferChallenge[] = [
  { kind: "DEBUG", id: "debug-rectangular-cols", title: "Debug rows dùng thay cols", change: "Starter dùng grid.length cho cả hai chiều và sai trên grid chữ nhật.", functionSignature: "neighbors4(grid, row, col)", starterCode: gridSolution.replace("const cols = grid[0].length;", "const cols = grid.length;"), solution: gridSolution, tests: gridTests },
  { kind: "DEBUG", id: "debug-bounds-after-read", title: "Debug đọc cell trước bounds", change: "Starter truy cập grid[nextRow][nextCol] trước khi loại tọa độ ngoài grid.", functionSignature: "neighbors4(grid, row, col)", starterCode: `function neighbors4(grid, row, col) {
  const rows = grid.length; if (rows === 0) return []; const cols = grid[0].length;
  const result = [], directions = [[-1,0],[1,0],[0,-1],[0,1]];
  for (const [dr, dc] of directions) {
    const nextRow = row + dr, nextCol = col + dc;
    if (grid[nextRow][nextCol] !== 1 && 0 <= nextRow && nextRow < rows && 0 <= nextCol && nextCol < cols) result.push([nextRow,nextCol]);
  }
  return result;
}`, solution: gridSolution, tests: gridTests },
  { kind: "VARIANT", id: "variant-eight-neighbors", title: "4-neighbor → 8-neighbor", change: "Choices thêm bốn đường chéo nhưng vẫn loại self và check rows/cols riêng.", functionSignature: "neighbors8(grid, row, col)", starterCode: `function neighbors8(grid, row, col) {\n  // add diagonal directions\n}`, solution: neighbors8Solution, tests: [
    { label: "center", expression: "neighbors8([[0,0,0],[0,0,0],[0,0,0]],1,1).length", expected: "8" },
    { label: "corner", expression: "neighbors8([[0,0,0],[0,0,0]],0,0)", expected: "[[0,1],[1,0],[1,1]]" },
    { label: "single", expression: "neighbors8([[0]],0,0)", expected: "[]" },
  ] },
  { kind: "VARIANT", id: "variant-atomic-path", title: "Neighbors → validate-then-commit path", change: "Nếu bất kỳ bước nào invalid/blocked, output phải rollback hoàn toàn về start.", functionSignature: "moveIfPathClear(grid, start, path)", starterCode: `function moveIfPathClear(grid, start, path) {\n  // validate full candidate path; rollback invalid\n}`, solution: pathSolution, tests: [
    { label: "valid path", expression: "moveIfPathClear([[0,0,0],[0,0,0]],[0,0],[[0,1],[1,0]])", expected: "[1,1]" },
    { label: "blocked rollback", expression: "moveIfPathClear([[0,0,0],[0,1,0]],[0,0],[[0,1],[1,0]])", expected: "[0,0]" },
    { label: "bounds rollback", expression: "moveIfPathClear([[0,0]],[0,0],[[0,1],[0,1]])", expected: "[0,0]" },
  ] },
];

export const p0a1Lessons: ProgressiveLesson[] = [
  defineSixLevelLesson({
    id: "PT-F01-TIME-NORMALIZATION", familyId: "F01", slug: "time-normalization-video-controls", title: "Contract-first — chuẩn hóa thời gian video", priority: "P0", basePattern: "Parse once → canonical seconds → ordered transitions", description: "Chuẩn hóa mm:ss thành giây, áp lệnh và skip opening theo đúng thứ tự contract.", constraints: ["video dưới 100 phút", "commands chỉ gồm prev/next", "opening là đoạn đóng"], functionSignature: "moveVideo(videoLen, pos, opStart, opEnd, commands)", officialSources: ["B-Q1 — Trình phát video", "PCCP_ALGORITHM_CORPUS_AUDIT F01"], status: "ACTIVE", version: 1,
    pattern: { prompt: "Đề liên tục so sánh/cộng trừ mm:ss và có interval opening. Việc nền đúng nhất?", options: [
      { id: "normalize", label: "Parse một lần sang giây", explanation: "Giữ một representation canonical cho toàn bộ logic." }, { id: "string", label: "So sánh chuỗi trực tiếp", explanation: "Arithmetic và clamp dễ sai." }, { id: "events", label: "Event sorting", explanation: "Không cần sắp xếp event." }, { id: "bfs", label: "BFS theo từng giây", explanation: "Không có shortest path." },
    ], correctOptionId: "normalize" },
    blueprint: [
      { id: "STATE", label: "STATE", prompt: "State canonical?", canonical: "current/video/opening đều là số giây", acceptedKeywords: [["giây", "current"], ["seconds", "current"]] },
      { id: "TRANSITION", label: "TRANSITION", prompt: "Một command đổi state thế nào?", canonical: "prev/next ±10 rồi clamp [0,videoSeconds]", acceptedKeywords: [["10", "clamp"], ["10", "biên"]] },
      { id: "INVARIANT", label: "INVARIANT", prompt: "Sau mỗi command phải đúng gì?", canonical: "current trong video và không nằm bên trong opening", acceptedKeywords: [["current", "opening"], ["vị trí", "opening"]] },
      { id: "ANSWER", label: "ANSWER", prompt: "Khi nào format lại?", canonical: "chỉ format current sang mm:ss khi return", acceptedKeywords: [["format", "return"], ["mm:ss", "trả"]] },
      { id: "COMPLEXITY", label: "COMPLEXITY", prompt: "Complexity?", canonical: "O(commands.length) time và O(1) space", acceptedKeywords: [["commands", "o(1)"], ["lệnh", "o(1)"]] },
    ],
    logic: [
      { id: "helpers", text: "Khai báo parse/format thời gian" }, { id: "parse", text: "Parse toàn bộ input thời gian sang giây" }, { id: "skip", text: "Khai báo transition skip opening đoạn đóng" }, { id: "initial", text: "Skip opening trước command đầu" }, { id: "loop", text: "Duyệt command và clamp prev/next" }, { id: "after", text: "Skip opening sau từng command" }, { id: "return", text: "Format đúng một lần khi trả kết quả" },
    ],
    blocks: [
      { id: "open", subgoal: "Mở hàm và parse helper", code: `function moveVideo(videoLen, pos, opStart, opEnd, commands) {\n  const toSeconds = (text) => { const [mm, ss] = text.split(":").map(Number); return mm * 60 + ss; };` },
      { id: "format", subgoal: "Format helper", code: `const toTime = (total) => {\n  const mm = String(Math.floor(total / 60)).padStart(2, "0");\n  const ss = String(total % 60).padStart(2, "0");\n  return mm + ":" + ss;\n};` },
      { id: "parse", subgoal: "Parse canonical state", code: `const videoSeconds = toSeconds(videoLen);\nconst opStartSeconds = toSeconds(opStart);\nconst opEndSeconds = toSeconds(opEnd);\nlet current = toSeconds(pos);` },
      { id: "skip", subgoal: "Closed interval transition", code: `const skipOpening = (value) => opStartSeconds <= value && value <= opEndSeconds ? opEndSeconds : value;\ncurrent = skipOpening(current);` },
      { id: "loop", subgoal: "Command loop", code: `for (const command of commands) {\n  current = command === "prev" ? Math.max(0, current - 10) : Math.min(videoSeconds, current + 10);\n  current = skipOpening(current);\n}` },
      { id: "return", subgoal: "Format answer and close", code: `return toTime(current);\n}` },
    ], solution: timeSolution, tests: timeTests, challenges: timeChallenges,
  }),
  defineSixLevelLesson({
    id: "PT-F02-RUN-SCAN", familyId: "F02", slug: "linear-run-scan-repeated-blocks", title: "Linear scan — đếm block ký tự tách biệt", priority: "P0", basePattern: "Maximal [start,end) run scan", description: "Đếm số run của từng ký tự, không nhầm với tổng frequency và không mất run cuối.", constraints: ["text chỉ gồm chữ thường", "length ≤ 2600", "output sort tăng dần hoặc N"], functionSignature: "repeatedRunLetters(text)", officialSources: ["M1Q1 — Chữ cái cô lập", "PCCP_ALGORITHM_CORPUS_AUDIT F02"], status: "ACTIVE", version: 1,
    pattern: { prompt: "Đề hỏi ký tự xuất hiện thành nhiều đoạn liên tiếp tách biệt. Pattern nào?", options: [
      { id: "runs", label: "Scan maximal runs", explanation: "Mỗi [start,end) là đúng một block." }, { id: "frequency", label: "Frequency Map ký tự", explanation: "Frequency không biết các lần xuất hiện có liền nhau." }, { id: "window", label: "Sliding window", explanation: "Không có constraint window cần shrink." }, { id: "sort", label: "Sort toàn chuỗi", explanation: "Sort phá thứ tự block." },
    ], correctOptionId: "runs" },
    blueprint: [
      { id: "STATE", label: "STATE", prompt: "State của run hiện tại?", canonical: "start và end của maximal interval [start,end)", acceptedKeywords: [["start", "end"], ["đầu", "cuối"]] },
      { id: "BASE_CASE", label: "STOP", prompt: "Khi nào scan xong?", canonical: "start === text.length", acceptedKeywords: [["start", "length"], ["start", "hết"]] },
      { id: "TRANSITION", label: "TRANSITION", prompt: "Chuyển sang run sau?", canonical: "xử lý run hiện tại rồi gán start = end", acceptedKeywords: [["start", "end"], ["run", "end"]] },
      { id: "INVARIANT", label: "INVARIANT", prompt: "Prefix nào đã hoàn tất?", canonical: "prefix [0,start) đã được chia và đếm đúng mọi run", acceptedKeywords: [["prefix", "start"], ["0", "start", "run"]] },
      { id: "COMPLEXITY", label: "COMPLEXITY", prompt: "Complexity?", canonical: "O(n) scan cộng O(k log k) sort output", acceptedKeywords: [["o(n)", "sort"], ["o(n)", "k log k"]] },
    ],
    logic: [
      { id: "map", text: "Khởi tạo Map đếm số block" }, { id: "start", text: "Đặt start ở đầu run tiếp theo" }, { id: "expand", text: "Mở rộng end qua toàn bộ ký tự giống nhau" }, { id: "count", text: "Cộng một block cho ký tự tại start" }, { id: "advance", text: "Gán start = end" }, { id: "answer", text: "Lọc count ≥ 2, sort và xử lý trường hợp rỗng" },
    ],
    blocks: [
      { id: "open", subgoal: "Mở hàm và Map", code: `function repeatedRunLetters(text) {\n  const blocks = new Map();` },
      { id: "loop", subgoal: "Duyệt mọi maximal run", code: `for (let start = 0; start < text.length; ) {\n  let end = start + 1;\n  while (end < text.length && text[end] === text[start]) end++;` },
      { id: "count", subgoal: "Count run và advance", code: `blocks.set(text[start], (blocks.get(text[start]) ?? 0) + 1);\n  start = end;\n}` },
      { id: "answer", subgoal: "Lọc/sort output", code: `const answer = [...blocks].filter(([, count]) => count >= 2).map(([char]) => char).sort();\nreturn answer.length ? answer : ["N"];\n}` },
    ], solution: runSolution, tests: runTests, challenges: runChallenges,
  }),
  defineSixLevelLesson({
    id: "PT-F03-GRID-NEIGHBORS", familyId: "F03", slug: "rectangular-grid-neighbors", title: "Grid representation — bốn ô kề hợp lệ", priority: "P0", basePattern: "(row,col) + direction vectors + bounds before read", description: "Sinh bốn neighbor trên grid chữ nhật bằng rows/cols tách biệt và bounds check trước access.", constraints: ["grid chữ nhật hoặc rỗng", "row/col ban đầu hợp lệ khi grid không rỗng", "thứ tự directions cố định"], functionSignature: "neighbors4(grid, row, col)", officialSources: ["M2Q1 — Robot thực hành", "A-Q2 — Khai thác dầu", "PCCP_ALGORITHM_CORPUS_AUDIT F03"], status: "ACTIVE", version: 1,
    pattern: { prompt: "Cần sinh các ô kề trên grid có thể không vuông. Representation nào đúng?", options: [
      { id: "coordinates", label: "rows/cols + direction vectors", explanation: "Tách hai dimension và check bounds trước read." }, { id: "flatten-square", label: "Giả định grid vuông", explanation: "Sai khi rows khác cols." }, { id: "sort", label: "Sort tọa độ", explanation: "Không tạo quan hệ kề." }, { id: "recursion", label: "Recursion không state", explanation: "Vẫn cần coordinate representation." },
    ], correctOptionId: "coordinates" },
    blueprint: [
      { id: "STATE", label: "STATE", prompt: "State tọa độ?", canonical: "row và col tách biệt", acceptedKeywords: [["row", "col"], ["hàng", "cột"]] },
      { id: "CHOICES", label: "NEIGHBORS", prompt: "Bốn transition?", canonical: "directions (-1,0),(1,0),(0,-1),(0,1)", acceptedKeywords: [["-1", "1", "0"], ["trên", "dưới", "trái", "phải"]] },
      { id: "TRANSITION", label: "TRANSITION", prompt: "Tạo candidate?", canonical: "nextRow=row+dr và nextCol=col+dc", acceptedKeywords: [["row", "dr", "col", "dc"]] },
      { id: "INVARIANT", label: "INVARIANT", prompt: "Trước khi push phải đúng gì?", canonical: "0≤nextRow<rows và 0≤nextCol<cols trước mọi grid access", acceptedKeywords: [["rows", "cols", "trước"], ["bounds", "read"]] },
      { id: "COMPLEXITY", label: "COMPLEXITY", prompt: "Complexity mỗi cell?", canonical: "O(1) time và tối đa bốn outputs", acceptedKeywords: [["o(1)", "4"], ["constant", "4"]] },
    ],
    logic: [
      { id: "shape", text: "Đọc rows; xử lý grid rỗng; đọc cols riêng" }, { id: "dirs", text: "Khai báo bốn direction vectors" }, { id: "loop", text: "Tạo nextRow/nextCol cho mỗi direction" }, { id: "bounds", text: "Loại candidate ngoài rows/cols trước access" }, { id: "push", text: "Push coordinate hợp lệ theo thứ tự directions" }, { id: "return", text: "Trả danh sách neighbors" },
    ],
    blocks: [
      { id: "open", subgoal: "Shape rectangular và empty guard", code: `function neighbors4(grid, row, col) {\n  const rows = grid.length;\n  if (rows === 0) return [];\n  const cols = grid[0].length;` },
      { id: "setup", subgoal: "Directions và result", code: `const directions = [[-1, 0], [1, 0], [0, -1], [0, 1]];\nconst result = [];` },
      { id: "loop", subgoal: "Candidate coordinates", code: `for (const [dr, dc] of directions) {\n  const nextRow = row + dr, nextCol = col + dc;` },
      { id: "bounds", subgoal: "Bounds before push", code: `if (nextRow < 0 || nextRow >= rows || nextCol < 0 || nextCol >= cols) continue;\n  result.push([nextRow, nextCol]);\n}` },
      { id: "return", subgoal: "Return and close", code: `return result;\n}` },
    ], solution: gridSolution, tests: gridTests, challenges: gridChallenges,
  }),
];
