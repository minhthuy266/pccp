import { defineSixLevelLesson } from "./lessonFactory";
import type { ProgressiveLesson, TransferChallenge } from "./types";

const multisetSolution = `function sameMultiset(left, right) {
  if (left.length !== right.length) return false;
  const counts = new Map();
  for (const value of left) counts.set(value, (counts.get(value) ?? 0) + 1);
  for (const value of right) {
    if (!counts.has(value)) return false;
    const next = counts.get(value) - 1;
    if (next === 0) counts.delete(value);
    else counts.set(value, next);
  }
  return counts.size === 0;
}`;

const multisetTests = [
  { label: "same values different order", expression: "sameMultiset([1,2,2],[2,1,2])", expected: "true" },
  { label: "multiplicity differs", expression: "sameMultiset([1,1,2],[1,2,2])", expected: "false" },
  { label: "empty", expression: "sameMultiset([],[])", expected: "true" },
  { label: "falsy keys", expression: `sameMultiset([0,false,""],["",0,false])`, expected: "true" },
  { label: "missing value", expression: `sameMultiset(["a","b"],["a","c"])`, expected: "false" },
];

const stableUniqueSolution = `function stableUnique(values) {
  const seen = new Set(), result = [];
  for (const value of values) {
    if (seen.has(value)) continue;
    seen.add(value);
    result.push(value);
  }
  return result;
}`;

const groupingSolution = `function groupIdsByCategory(records) {
  const groups = new Map();
  for (const record of records) {
    if (!groups.has(record.category)) groups.set(record.category, []);
    groups.get(record.category).push(record.id);
  }
  return [...groups.entries()];
}`;

const firstIndexSolution = `function firstIndexForQueries(values, queries) {
  const first = new Map();
  for (let index = 0; index < values.length; index++) {
    if (!first.has(values[index])) first.set(values[index], index);
  }
  return queries.map((value) => first.has(value) ? first.get(value) : -1);
}`;

const multisetChallenges: TransferChallenge[] = [
  { kind: "DEBUG", id: "debug-set-loses-multiplicity", title: "Debug Set làm mất multiplicity", change: "Set chỉ giữ membership; hai mảng có cùng distinct values vẫn có thể khác số lần xuất hiện.", functionSignature: "sameMultiset(left, right)", starterCode: `function sameMultiset(left, right) {
  if (left.length !== right.length) return false;
  const a = new Set(left), b = new Set(right);
  return a.size === b.size && [...a].every((value) => b.has(value));
}`, solution: multisetSolution, tests: multisetTests },
  { kind: "DEBUG", id: "debug-zero-key-cleanup", title: "Debug quên xóa count bằng zero", change: "Contract dùng Map.size làm invariant hoàn tất; key đã cân bằng phải bị delete.", functionSignature: "sameMultiset(left, right)", starterCode: multisetSolution.replace("if (next === 0) counts.delete(value);\n    else counts.set(value, next);", "counts.set(value, next);"), solution: multisetSolution, tests: multisetTests },
  { kind: "VARIANT", id: "variant-stable-set", title: "Frequency Map → Set dedupe ổn định", change: "Output không cần multiplicity; giữ lần xuất hiện đầu nên Set là representation đúng.", functionSignature: "stableUnique(values)", starterCode: `function stableUnique(values) {
  // keep first occurrence order
}`, solution: stableUniqueSolution, tests: [
    { label: "duplicates", expression: "stableUnique([3,1,3,2,1])", expected: "[3,1,2]" },
    { label: "falsy", expression: `stableUnique([0,false,0,"",false])`, expected: `[0,false,""]` },
    { label: "empty", expression: "stableUnique([])", expected: "[]" },
  ] },
  { kind: "VARIANT", id: "variant-grouping", title: "Frequency scalar → grouping buckets", change: "Map value đổi từ count thành array độc lập; mỗi record append vào đúng key.", functionSignature: "groupIdsByCategory(records)", starterCode: `function groupIdsByCategory(records) {
  // Map category -> independent id bucket
}`, solution: groupingSolution, tests: [
    { label: "interleaved", expression: `groupIdsByCategory([{category:"A",id:1},{category:"B",id:2},{category:"A",id:3}])`, expected: `[["A",[1,3]],["B",[2]]]` },
    { label: "independent buckets", expression: `groupIdsByCategory([{category:"x",id:"a"},{category:"y",id:"b"}])`, expected: `[["x",["a"]],["y",["b"]]]` },
    { label: "empty", expression: "groupIdsByCategory([])", expected: "[]" },
  ] },
  { kind: "VARIANT", id: "variant-inverse-lookup", title: "Count → first-index lookup", change: "Map value đổi thành first index; duplicate sau không được overwrite giá trị đầu.", functionSignature: "firstIndexForQueries(values, queries)", starterCode: `function firstIndexForQueries(values, queries) {
  // build value -> first index, answer missing with -1
}`, solution: firstIndexSolution, tests: [
    { label: "first duplicate", expression: `firstIndexForQueries(["a","b","a"],["a","b","c"])`, expected: "[0,1,-1]" },
    { label: "falsy key", expression: "firstIndexForQueries([0,1,0],[0,2])", expected: "[0,-1]" },
    { label: "empty queries", expression: "firstIndexForQueries([1,2],[])", expected: "[]" },
  ] },
];

const leaderboardSolution = `function sortLeaderboard(records) {
  return [...records]
    .sort((first, second) =>
      second.score - first.score ||
      first.time - second.time ||
      first.id.localeCompare(second.id))
    .map((record) => record.id);
}`;

const leaderboardTests = [
  { label: "all comparator keys", expression: `sortLeaderboard([{id:"c",score:90,time:30},{id:"a",score:100,time:50},{id:"d",score:100,time:40},{id:"b",score:100,time:40}])`, expected: `["b","d","a","c"]` },
  { label: "ascending time tie", expression: `sortLeaderboard([{id:"slow",score:5,time:9},{id:"fast",score:5,time:2}])`, expected: `["fast","slow"]` },
  { label: "lexical final tie", expression: `sortLeaderboard([{id:"z",score:1,time:1},{id:"a",score:1,time:1}])`, expected: `["a","z"]` },
  { label: "does not mutate input", expression: `(() => { const rows=[{id:"b",score:1,time:2},{id:"a",score:2,time:1}]; sortLeaderboard(rows); return rows.map(x=>x.id); })()`, expected: `["b","a"]` },
];

const numericStringSolution = `function sortNumericStrings(values) {
  return [...values].sort((first, second) =>
    Number(first) - Number(second) ||
    first.length - second.length ||
    first.localeCompare(second));
}`;

const largestNumberSolution = `function largestConcatenatedNumber(numbers) {
  const parts = numbers.map(String).sort((first, second) =>
    (second + first).localeCompare(first + second));
  return parts[0] === "0" ? "0" : parts.join("");
}`;

const leaderboardChallenges: TransferChallenge[] = [
  { kind: "DEBUG", id: "debug-boolean-comparator", title: "Debug comparator boolean", change: "JavaScript sort cần số âm/zero/dương; boolean không biểu diễn đủ hai chiều ordering.", functionSignature: "sortLeaderboard(records)", starterCode: leaderboardSolution.replace("second.score - first.score ||\n      first.time - second.time ||\n      first.id.localeCompare(second.id)", "second.score > first.score"), solution: leaderboardSolution, tests: leaderboardTests },
  { kind: "DEBUG", id: "debug-missing-ties", title: "Debug thiếu tie-break", change: "Score bằng nhau phải xét time rồi id; dựa vào input order là sai contract.", functionSignature: "sortLeaderboard(records)", starterCode: leaderboardSolution.replace("second.score - first.score ||\n      first.time - second.time ||\n      first.id.localeCompare(second.id)", "second.score - first.score"), solution: leaderboardSolution, tests: leaderboardTests },
  { kind: "VARIANT", id: "variant-normalize-before-sort", title: "Number input → numeric strings", change: "Phải normalize string sang Number cho primary key; lexical sort cho kết quả khác numeric sort.", functionSignature: "sortNumericStrings(values)", starterCode: `function sortNumericStrings(values) {
  return [...values].sort();
}`, solution: numericStringSolution, tests: [
    { label: "numeric not lexical", expression: `sortNumericStrings(["10","2","1"])`, expected: `["1","2","10"]` },
    { label: "equal numeric tie", expression: `sortNumericStrings(["02","2","002"])`, expected: `["2","02","002"]` },
    { label: "copy", expression: `(() => { const a=["2","1"]; sortNumericStrings(a); return a; })()`, expected: `["2","1"]` },
  ] },
  { kind: "VARIANT", id: "variant-concatenation-comparator", title: "Field keys → pairwise concatenation", change: "Ordering của a,b được quyết định bằng ba và ba; comparator không còn là numeric ascending/descending.", functionSignature: "largestConcatenatedNumber(numbers)", starterCode: `function largestConcatenatedNumber(numbers) {
  // compare String(b)+String(a) with String(a)+String(b)
}`, solution: largestNumberSolution, tests: [
    { label: "classic", expression: "largestConcatenatedNumber([6,10,2])", expected: `"6210"` },
    { label: "prefix trap", expression: "largestConcatenatedNumber([3,30,34,5,9])", expected: `"9534330"` },
    { label: "all zero", expression: "largestConcatenatedNumber([0,0])", expected: `"0"` },
  ] },
];

const robotSolution = `function simulatePracticeRobot(command) {
  const directions = [[0, 1], [1, 0], [0, -1], [-1, 0]];
  let x = 0, y = 0, direction = 0;
  for (const token of command) {
    if (token === "R") direction = (direction + 1) % 4;
    else if (token === "L") direction = (direction + 3) % 4;
    else if (token === "G") {
      x += directions[direction][0];
      y += directions[direction][1];
    } else if (token === "B") {
      x -= directions[direction][0];
      y -= directions[direction][1];
    }
  }
  return [x, y];
}`;

const robotTests = [
  { label: "forward", expression: `simulatePracticeRobot("G")`, expected: "[0,1]" },
  { label: "left wrap", expression: `simulatePracticeRobot("LG")`, expected: "[-1,0]" },
  { label: "square returns origin", expression: `simulatePracticeRobot("GRGRGRG")`, expected: "[0,0]" },
  { label: "backward is opposite", expression: `simulatePracticeRobot("GB")`, expected: "[0,0]" },
  { label: "empty", expression: `simulatePracticeRobot("")`, expected: "[0,0]" },
];

const boundedRobotSolution = `function moveBoundedRobot(rows, cols, start, commands) {
  let row = start[0], col = start[1];
  const delta = { U: [-1, 0], D: [1, 0], L: [0, -1], R: [0, 1] };
  for (const token of commands) {
    const [dr, dc] = delta[token];
    const nextRow = row + dr, nextCol = col + dc;
    if (nextRow < 0 || nextRow >= rows || nextCol < 0 || nextCol >= cols) continue;
    row = nextRow; col = nextCol;
  }
  return [row, col];
}`;

const inventorySolution = `function applyInventoryEvents(initialStock, events) {
  let stock = initialStock;
  for (const [type, amount] of events) {
    if (type === "RESTOCK") stock += amount;
    else if (type === "CONSUME" && amount <= stock) stock -= amount;
  }
  return stock;
}`;

const robotChallenges: TransferChallenge[] = [
  { kind: "DEBUG", id: "debug-left-negative-modulo", title: "Debug modulo âm khi quay trái", change: "JavaScript -1 % 4 vẫn là -1; dùng +3 trước %4 để direction luôn trong 0..3.", functionSignature: "simulatePracticeRobot(command)", starterCode: robotSolution.replace("(direction + 3) % 4", "(direction - 1) % 4"), solution: robotSolution, tests: robotTests },
  { kind: "DEBUG", id: "debug-backward-sign", title: "Debug backward đi cùng chiều", change: "B phải trừ direction vector; starter cộng như G.", functionSignature: "simulatePracticeRobot(command)", starterCode: robotSolution.replace("x -= directions[direction][0];\n      y -= directions[direction][1];", "x += directions[direction][0];\n      y += directions[direction][1];"), solution: robotSolution, tests: robotTests },
  { kind: "VARIANT", id: "variant-bounded-validate-commit", title: "Vô hạn → grid có boundary", change: "Mỗi move phải tạo candidate, validate bounds rồi mới commit; move invalid bị bỏ qua.", functionSignature: "moveBoundedRobot(rows, cols, start, commands)", starterCode: `function moveBoundedRobot(rows, cols, start, commands) {
  // candidate -> validate -> commit
}`, solution: boundedRobotSolution, tests: [
    { label: "valid moves", expression: `moveBoundedRobot(3,3,[1,1],"UR")`, expected: "[0,2]" },
    { label: "invalid ignored", expression: `moveBoundedRobot(2,2,[0,0],"ULDR")`, expected: "[1,1]" },
    { label: "single cell", expression: `moveBoundedRobot(1,1,[0,0],"UDLR")`, expected: "[0,0]" },
  ] },
  { kind: "VARIANT", id: "variant-inventory-transaction", title: "Robot state → inventory transaction", change: "State đổi sang stock; CONSUME chỉ commit nếu đủ tài nguyên, event invalid không được làm stock âm.", functionSignature: "applyInventoryEvents(initialStock, events)", starterCode: `function applyInventoryEvents(initialStock, events) {
  // validate CONSUME before mutating stock
}`, solution: inventorySolution, tests: [
    { label: "ordered events", expression: `applyInventoryEvents(5,[["CONSUME",3],["RESTOCK",4],["CONSUME",5]])`, expected: "1" },
    { label: "invalid consume no mutation", expression: `applyInventoryEvents(2,[["CONSUME",3],["RESTOCK",1]])`, expected: "3" },
    { label: "equality valid", expression: `applyInventoryEvents(4,[["CONSUME",4]])`, expected: "0" },
  ] },
];

export const p0a2Lessons: ProgressiveLesson[] = [
  defineSixLevelLesson({
    id: "PT-F04-FREQUENCY-MULTISET", familyId: "F04", slug: "map-frequency-multiset", title: "Map/Set — multiset và lookup contract", priority: "P0", basePattern: "Map key → semantic state; Set for membership only", description: "Đếm multiplicity bằng Map, decrement/delete đúng invariant rồi transfer sang Set, grouping và first-index lookup.", constraints: ["keys có thể là primitive falsy", "duplicate có ý nghĩa", "không sort/mutate input"], functionSignature: "sameMultiset(left, right)", officialSources: ["M1Q1 — Chữ cái cô lập", "PCCP_ALGORITHM_CORPUS_AUDIT F04"], status: "ACTIVE", version: 1,
    pattern: { prompt: "Hai array phải bằng nhau cả value lẫn multiplicity, không quan tâm order. Representation?", options: [
      { id: "frequency-map", label: "Frequency Map", explanation: "Key giữ value, Map value giữ số bản sao chưa ghép." }, { id: "set", label: "Hai Set", explanation: "Set làm mất multiplicity." }, { id: "object-truthy", label: "Object + truthy check", explanation: "Falsy/prototype và semantic missing dễ sai." }, { id: "two-pointer", label: "Two pointers input gốc", explanation: "Input chưa sort và không được mutate." },
    ], correctOptionId: "frequency-map" },
    blueprint: [
      { id: "STATE", label: "STATE", prompt: "Map lưu gì?", canonical: "value -> số bản sao left chưa được match", acceptedKeywords: [["value", "count"], ["giá trị", "số"]] },
      { id: "BUILD", label: "BUILD", prompt: "Khởi tạo count?", canonical: "counts.set(value, (counts.get(value) ?? 0) + 1)", acceptedKeywords: [["get", "0", "1"], ["count", "1"]] },
      { id: "GUARD", label: "GUARD", prompt: "Right value invalid khi nào?", canonical: "counts.has(value) là false", acceptedKeywords: [["has", "false"], ["không", "key"]] },
      { id: "TRANSITION", label: "TRANSITION", prompt: "Consume một bản sao?", canonical: "decrement; nếu về zero thì delete key", acceptedKeywords: [["decrement", "delete"], ["giảm", "xóa"]] },
      { id: "INVARIANT", label: "INVARIANT", prompt: "Sau prefix right?", canonical: "Map chứa chính xác multiplicity left còn unmatched", acceptedKeywords: [["map", "unmatched"], ["còn", "chưa ghép"]] },
      { id: "COMPLEXITY", label: "COMPLEXITY", prompt: "Complexity?", canonical: "O(n) expected time và O(k) space", acceptedKeywords: [["o(n)", "o(k)"], ["n", "k"]] },
    ],
    logic: [{ id: "length", text: "Reject length khác nhau" }, { id: "build", text: "Build frequency Map từ left" }, { id: "scan", text: "Scan từng right value" }, { id: "guard", text: "Reject nếu key không còn" }, { id: "consume", text: "Giảm count và delete zero" }, { id: "return", text: "Map rỗng nghĩa là match hết" }],
    blocks: [
      { id: "open", subgoal: "Outer and length guard", code: `function sameMultiset(left, right) {\n  if (left.length !== right.length) return false;\n  const counts = new Map();` },
      { id: "build", subgoal: "Build counts", code: `for (const value of left) counts.set(value, (counts.get(value) ?? 0) + 1);` },
      { id: "consume", subgoal: "Consume right", code: `for (const value of right) {\n  if (!counts.has(value)) return false;\n  const next = counts.get(value) - 1;\n  if (next === 0) counts.delete(value);\n  else counts.set(value, next);\n}` },
      { id: "return", subgoal: "Return invariant", code: `return counts.size === 0;\n}` },
    ], solution: multisetSolution, tests: multisetTests, challenges: multisetChallenges,
  }),
  defineSixLevelLesson({
    id: "PT-F05-MULTIKEY-SORT", familyId: "F05", slug: "sorting-multikey-comparator", title: "Sorting — comparator nhiều khóa", priority: "P0", basePattern: "Normalize → copy → numeric comparator → explicit tie-breaks", description: "Sort leaderboard theo score giảm, time tăng, id lexical; comparator luôn trả số và không mutate input.", constraints: ["score/time là Number", "id là string duy nhất", "không đổi thứ tự records gốc"], functionSignature: "sortLeaderboard(records)", officialSources: ["M1Q1 — output sorting", "PCCP_ALGORITHM_CORPUS_AUDIT F05"], status: "ACTIVE", version: 1,
    pattern: { prompt: "Nhiều record cần order theo ba key có chiều khác nhau. Contract code nào đúng?", options: [
      { id: "numeric-chain", label: "Comparator số + tie chain", explanation: "Mỗi key chỉ chạy khi key trước bằng nhau." }, { id: "boolean", label: "Comparator trả boolean", explanation: "Không biểu diễn được negative/zero/positive." }, { id: "default-sort", label: "Default sort", explanation: "Object/string lexical không theo contract." }, { id: "three-independent", label: "Sort ba lần tùy ý", explanation: "Dễ đảo priority và phụ thuộc stability." },
    ], correctOptionId: "numeric-chain" },
    blueprint: [
      { id: "ORDER", label: "ORDER", prompt: "Priority keys?", canonical: "score descending, time ascending, id lexical ascending", acceptedKeywords: [["score", "descending", "time", "ascending"], ["score", "giảm", "time", "tăng"]] },
      { id: "COMPARATOR", label: "COMPARATOR", prompt: "Comparator trả gì?", canonical: "số âm/0/dương, không trả boolean", acceptedKeywords: [["âm", "0", "dương"], ["negative", "zero", "positive"]] },
      { id: "TIE", label: "TIE", prompt: "Ghép keys?", canonical: "score difference || time difference || localeCompare id", acceptedKeywords: [["score", "time", "id"], ["||", "localecompare"]] },
      { id: "MUTATION", label: "MUTATION", prompt: "Giữ input?", canonical: "copy records bằng spread trước sort", acceptedKeywords: [["copy", "spread"], ["sao chép", "sort"]] },
      { id: "OUTPUT", label: "OUTPUT", prompt: "Output?", canonical: "map sorted records thành mảng id", acceptedKeywords: [["map", "id"]] },
      { id: "COMPLEXITY", label: "COMPLEXITY", prompt: "Complexity?", canonical: "O(n log n) time và O(n) copy/output", acceptedKeywords: [["n log n", "o(n)"]] },
    ],
    logic: [{ id: "copy", text: "Copy records trước sort" }, { id: "score", text: "So score descending" }, { id: "time", text: "Nếu hòa, so time ascending" }, { id: "id", text: "Nếu vẫn hòa, so id lexical" }, { id: "map", text: "Map kết quả thành ids" }],
    blocks: [
      { id: "open", subgoal: "Copy and sort", code: `function sortLeaderboard(records) {\n  return [...records].sort((first, second) =>` },
      { id: "keys", subgoal: "Comparator keys", code: `second.score - first.score ||\n    first.time - second.time ||\n    first.id.localeCompare(second.id))` },
      { id: "output", subgoal: "Map output and close", code: `.map((record) => record.id);\n}` },
    ], solution: leaderboardSolution, tests: leaderboardTests, challenges: leaderboardChallenges,
  }),
  defineSixLevelLesson({
    id: "PT-F06-ATOMIC-ROBOT", familyId: "F06", slug: "atomic-state-machine-practice-robot", title: "Atomic simulation — Robot thực hành", priority: "P0", basePattern: "Read event → choose transition → validate → commit", description: "Mỗi command R/L/G/B là một transition tuần tự trên (x,y,direction); giữ đúng modulo và dấu forward/backward.", constraints: ["robot bắt đầu tại (0,0), hướng +y", "R/L quay 90°, G/B đi một ô", "command được xử lý từ trái sang phải"], functionSignature: "simulatePracticeRobot(command)", officialSources: ["M2Q1 — Robot thực hành", "PCCP_ALGORITHM_CORPUS_AUDIT F06"], status: "ACTIVE", version: 1,
    pattern: { prompt: "Chuỗi command mutate position/direction theo thứ tự. Pattern?", options: [
      { id: "state-machine", label: "State-machine simulation", explanation: "Mỗi token đọc state hiện tại và commit đúng một transition." }, { id: "frequency", label: "Đếm số command", explanation: "Order của rotate và move làm kết quả khác nhau." }, { id: "bfs", label: "BFS", explanation: "Không tìm shortest path; command đã cố định." }, { id: "sort-events", label: "Sort command", explanation: "Đổi order phá contract." },
    ], correctOptionId: "state-machine" },
    blueprint: [
      { id: "STATE", label: "STATE", prompt: "State sống?", canonical: "x, y và direction trong 0..3", acceptedKeywords: [["x", "y", "direction"], ["tọa độ", "hướng"]] },
      { id: "REPRESENTATION", label: "REPRESENTATION", prompt: "Directions?", canonical: "[north,east,south,west] = [[0,1],[1,0],[0,-1],[-1,0]]", acceptedKeywords: [["north", "east", "south", "west"], ["0,1", "1,0"]] },
      { id: "ROTATE", label: "ROTATE", prompt: "R/L transition?", canonical: "R=(d+1)%4; L=(d+3)%4", acceptedKeywords: [["+1", "+3", "%4"], ["r", "l", "4"]] },
      { id: "MOVE", label: "MOVE", prompt: "G/B transition?", canonical: "G cộng direction vector; B trừ vector", acceptedKeywords: [["g", "cộng", "b", "trừ"], ["add", "subtract", "vector"]] },
      { id: "INVARIANT", label: "INVARIANT", prompt: "Sau mỗi token?", canonical: "position/direction là kết quả đúng của toàn prefix command", acceptedKeywords: [["prefix", "command"], ["toàn bộ", "lệnh"]] },
      { id: "COMPLEXITY", label: "COMPLEXITY", prompt: "Complexity?", canonical: "O(command.length) time, O(1) state", acceptedKeywords: [["command", "o(1)"], ["n", "o(1)"]] },
    ],
    logic: [{ id: "state", text: "Khởi tạo origin, north và direction vectors" }, { id: "scan", text: "Đọc command từ trái sang phải" }, { id: "rotate", text: "R/L chỉ update direction" }, { id: "forward", text: "G cộng vector hiện tại" }, { id: "backward", text: "B trừ vector hiện tại" }, { id: "return", text: "Trả [x,y] sau toàn bộ prefix" }],
    blocks: [
      { id: "open", subgoal: "State and directions", code: `function simulatePracticeRobot(command) {\n  const directions = [[0,1],[1,0],[0,-1],[-1,0]];\n  let x = 0, y = 0, direction = 0;` },
      { id: "loop", subgoal: "Scan and rotate", code: `for (const token of command) {\n  if (token === "R") direction = (direction + 1) % 4;\n  else if (token === "L") direction = (direction + 3) % 4;` },
      { id: "move", subgoal: "Forward/backward", code: `else if (token === "G") { x += directions[direction][0]; y += directions[direction][1]; }\n  else if (token === "B") { x -= directions[direction][0]; y -= directions[direction][1]; }\n}` },
      { id: "return", subgoal: "Return and close", code: `return [x, y];\n}` },
    ], solution: robotSolution, tests: robotTests, challenges: robotChallenges,
  }),
];
