import { defineSixLevelLesson } from "./lessonFactory";
import type { ProgressiveLesson, TransferChallenge } from "./types";

const collisionSolution = `function countCollisionRisks(points, routes) {
  const paths = routes.map((route) => {
    const path = [[...points[route[0] - 1]]];
    let [row, col] = path[0];
    for (let index = 1; index < route.length; index++) {
      const [targetRow, targetCol] = points[route[index] - 1];
      while (row !== targetRow) { row += Math.sign(targetRow - row); path.push([row, col]); }
      while (col !== targetCol) { col += Math.sign(targetCol - col); path.push([row, col]); }
    }
    return path;
  });
  const maxTime = Math.max(0, ...paths.map((path) => path.length));
  let risks = 0;
  for (let time = 0; time < maxTime; time++) {
    const counts = new Map();
    for (const path of paths) {
      if (time >= path.length) continue;
      const [row, col] = path[time];
      const key = row + "," + col;
      counts.set(key, (counts.get(key) ?? 0) + 1);
    }
    for (const count of counts.values()) if (count >= 2) risks++;
  }
  return risks;
}`;

const collisionTests = [
  { label: "cross at same time", expression: "countCollisionRisks([[0,0],[0,2]],[[1,2],[2,1]])", expected: "1" },
  { label: "three robots one risk", expression: "countCollisionRisks([[0,0],[0,2],[1,1],[0,1]],[[1,4],[2,4],[3,4]])", expected: "1" },
  { label: "collision at initial position", expression: "countCollisionRisks([[1,1],[1,2]],[[1,2],[1,2]])", expected: "2" },
  { label: "finished robot disappears", expression: "countCollisionRisks([[0,0],[0,1],[0,3]],[[1,2],[3,2]])", expected: "0" },
  { label: "row before column", expression: "countCollisionRisks([[0,0],[1,1],[0,2]],[[1,2],[3,1]])", expected: "0" },
];

const concurrentSolution = `function maximumConcurrentVisits(visits) {
  const events = [];
  for (const [arrival, departure] of visits) { events.push([arrival, 1], [departure, -1]); }
  events.sort((a, b) => a[0] - b[0] || a[1] - b[1]);
  let active = 0, best = 0;
  for (const [, delta] of events) { active += delta; best = Math.max(best, active); }
  return best;
}`;

const serverSolution = `function singleServerFinishTimes(arrivals, durations) {
  let freeAt = 0;
  const finishTimes = [];
  for (let index = 0; index < arrivals.length; index++) {
    freeAt = Math.max(freeAt, arrivals[index]) + durations[index];
    finishTimes.push(freeAt);
  }
  return finishTimes;
}`;

const collisionChallenges: TransferChallenge[] = [
  { kind: "DEBUG", id: "debug-count-pairs", title: "Debug đếm cặp thay vì risk cell", change: "Ba robot cùng một cell/time vẫn chỉ tạo một nguy cơ, không phải ba cặp.", functionSignature: "countCollisionRisks(points, routes)", starterCode: collisionSolution.replace("if (count >= 2) risks++;", "if (count >= 2) risks += count * (count - 1) / 2;"), solution: collisionSolution, tests: collisionTests },
  { kind: "DEBUG", id: "debug-finished-robot-stays", title: "Debug robot đã xong vẫn đứng lại", change: "Robot rời hệ thống ngay khi hoàn tất route; không pad vị trí cuối sang tick sau.", functionSignature: "countCollisionRisks(points, routes)", starterCode: collisionSolution.replace("if (time >= path.length) continue;\n      const [row, col] = path[time];", "const [row, col] = path[Math.min(time, path.length - 1)];"), solution: collisionSolution, tests: collisionTests },
  { kind: "VARIANT", id: "variant-half-open-visits", title: "Robot ticks → arrival/departure events", change: "Visit là [arrival,departure); departure tại t phải xử lý trước arrival tại t.", functionSignature: "maximumConcurrentVisits(visits)", starterCode: `function maximumConcurrentVisits(visits) {
  // event tie: departure before arrival
}`, solution: concurrentSolution, tests: [
    { label: "touching is not overlap", expression: "maximumConcurrentVisits([[1,3],[3,5]])", expected: "1" },
    { label: "nested overlap", expression: "maximumConcurrentVisits([[1,5],[2,4],[3,6]])", expected: "3" },
    { label: "empty", expression: "maximumConcurrentVisits([])", expected: "0" },
  ] },
  { kind: "VARIANT", id: "variant-single-server", title: "Batch positions → FIFO server timeline", change: "Mỗi job bắt đầu tại max(arrival,freeAt); timeline nhảy qua idle gap thay vì chạy từng giây.", functionSignature: "singleServerFinishTimes(arrivals, durations)", starterCode: `function singleServerFinishTimes(arrivals, durations) {
  // freeAt=max(freeAt,arrival)+duration
}`, solution: serverSolution, tests: [
    { label: "waiting jobs", expression: "singleServerFinishTimes([0,1,2],[3,2,1])", expected: "[3,5,6]" },
    { label: "idle jump", expression: "singleServerFinishTimes([0,10],[2,3])", expected: "[2,13]" },
    { label: "empty", expression: "singleServerFinishTimes([],[])", expected: "[]" },
  ] },
];

const processSolution = `function targetProcessOrder(priorities, location) {
  const queue = priorities.map((priority, index) => ({ priority, index }));
  const counts = Array(10).fill(0);
  let highest = 0, head = 0, executed = 0;
  for (const priority of priorities) { counts[priority]++; highest = Math.max(highest, priority); }
  while (head < queue.length) {
    const process = queue[head++];
    if (process.priority < highest) { queue.push(process); continue; }
    counts[process.priority]--;
    executed++;
    while (highest > 0 && counts[highest] === 0) highest--;
    if (process.index === location) return executed;
  }
  return -1;
}`;

const processTests = [
  { label: "official shape", expression: "targetProcessOrder([2,1,3,2],2)", expected: "1" },
  { label: "duplicate identity", expression: "targetProcessOrder([2,2,2],2)", expected: "3" },
  { label: "rotations", expression: "targetProcessOrder([1,1,9,1,1,1],0)", expected: "5" },
  { label: "single", expression: "targetProcessOrder([5],0)", expected: "1" },
];

const deploySolution = `function deploymentBatches(progresses, speeds) {
  const days = progresses.map((progress, index) => Math.ceil((100 - progress) / speeds[index]));
  const batches = [];
  let head = 0;
  while (head < days.length) {
    const releaseDay = days[head];
    let count = 0;
    while (head < days.length && days[head] <= releaseDay) { head++; count++; }
    batches.push(count);
  }
  return batches;
}`;

const dequeSolution = `function processDeque(commands) {
  const values = [], output = [];
  for (const command of commands) {
    const [type, value] = command;
    if (type === "PUSH_FRONT") values.unshift(value);
    else if (type === "PUSH_BACK") values.push(value);
    else if (type === "POP_FRONT") output.push(values.length ? values.shift() : null);
    else if (type === "POP_BACK") output.push(values.length ? values.pop() : null);
  }
  return output;
}`;

const processChallenges: TransferChallenge[] = [
  { kind: "DEBUG", id: "debug-lost-original-index", title: "Debug nhận diện target bằng priority", change: "Duplicate priority bắt buộc giữ original index cùng queue item.", functionSignature: "targetProcessOrder(priorities, location)", starterCode: processSolution.replace("process.index === location", "process.priority === priorities[location]"), solution: processSolution, tests: processTests },
  { kind: "DEBUG", id: "debug-drop-reenqueue", title: "Debug làm rơi process chưa đủ priority", change: "Process thấp hơn maximum phải push về tail trước continue.", functionSignature: "targetProcessOrder(priorities, location)", starterCode: processSolution.replace("queue.push(process); continue;", "continue;"), solution: processSolution, tests: processTests },
  { kind: "VARIANT", id: "variant-fifo-batches", title: "Re-enqueue → FIFO release batches", change: "Phần tử đầu queue khóa release day; item sau hoàn tất sớm vẫn phải chờ head.", functionSignature: "deploymentBatches(progresses, speeds)", starterCode: `function deploymentBatches(progresses, speeds) {
  // logical queue with head; front locks each batch
}`, solution: deploySolution, tests: [
    { label: "official sample", expression: "deploymentBatches([93,30,55],[1,30,5])", expected: "[2,1]" },
    { label: "front delays all", expression: "deploymentBatches([20,99,93,30,55,10],[5,10,1,1,30,5])", expected: "[3,3]" },
    { label: "empty", expression: "deploymentBatches([],[])", expected: "[]" },
  ] },
  { kind: "VARIANT", id: "variant-deque-both-ends", title: "Queue một đầu → deque hai đầu", change: "Contract thêm push/pop ở cả front và back; output ghi kết quả từng pop.", functionSignature: "processDeque(commands)", starterCode: `function processDeque(commands) {
  // support both ends; empty pop returns null
}`, solution: dequeSolution, tests: [
    { label: "both ends", expression: `processDeque([["PUSH_BACK",1],["PUSH_FRONT",2],["POP_BACK"],["POP_FRONT"]])`, expected: "[1,2]" },
    { label: "empty pop", expression: `processDeque([["POP_FRONT"],["POP_BACK"]])`, expected: "[null,null]" },
    { label: "mixed", expression: `processDeque([["PUSH_BACK","a"],["PUSH_BACK","b"],["POP_FRONT"],["POP_BACK"]])`, expected: `["a","b"]` },
  ] },
];

const combinationSolution = `function chooseK(items, k) {
  const result = [], path = [];
  function dfs(start) {
    if (path.length === k) { result.push([...path]); return; }
    for (let index = start; index < items.length; index++) {
      path.push(items[index]);
      dfs(index + 1);
      path.pop();
    }
  }
  dfs(0);
  return result;
}`;

const combinationTests = [
  { label: "choose two", expression: "chooseK([1,2,3],2)", expected: "[[1,2],[1,3],[2,3]]" },
  { label: "zero choice", expression: "chooseK([1,2],0)", expected: "[[]]" },
  { label: "all items", expression: `chooseK(["a","b"],2)`, expected: `[["a","b"]]` },
  { label: "too many", expression: "chooseK([1],2)", expected: "[]" },
];

const targetCombinationSolution = `function chooseKWithTarget(numbers, k, target) {
  const result = [], path = [];
  function dfs(start, sum) {
    if (path.length === k) { if (sum === target) result.push([...path]); return; }
    for (let index = start; index < numbers.length; index++) {
      path.push(numbers[index]); dfs(index + 1, sum + numbers[index]); path.pop();
    }
  }
  dfs(0, 0);
  return result;
}`;

const repetitionSolution = `function chooseWithRepetition(items, k) {
  const result = [], path = [];
  function dfs(start) {
    if (path.length === k) { result.push([...path]); return; }
    for (let index = start; index < items.length; index++) {
      path.push(items[index]); dfs(index); path.pop();
    }
  }
  dfs(0);
  return result;
}`;

const combinationChallenges: TransferChallenge[] = [
  { kind: "DEBUG", id: "debug-reuse-index", title: "Debug recurse từ cùng index", change: "Combination không lặp phải chuyển sang index+1; dùng index sẽ tái sử dụng occurrence.", functionSignature: "chooseK(items, k)", starterCode: combinationSolution.replace("dfs(index + 1);", "dfs(index);"), solution: combinationSolution, tests: combinationTests },
  { kind: "DEBUG", id: "debug-early-base", title: "Debug base case thiếu một choice", change: "Chỉ emit khi path.length đúng bằng k.", functionSignature: "chooseK(items, k)", starterCode: combinationSolution.replace("path.length === k", "path.length === k - 1"), solution: combinationSolution, tests: combinationTests },
  { kind: "VARIANT", id: "variant-target-filter", title: "Enumerate all → fixed-size target sum", change: "State thêm running sum; chỉ emit leaf size k có sum đúng target.", functionSignature: "chooseKWithTarget(numbers, k, target)", starterCode: `function chooseKWithTarget(numbers, k, target) {
  // combination start-index + running sum
}`, solution: targetCombinationSolution, tests: [
    { label: "two matches", expression: "chooseKWithTarget([1,2,3,4],2,5)", expected: "[[1,4],[2,3]]" },
    { label: "none", expression: "chooseKWithTarget([2,4],1,3)", expected: "[]" },
    { label: "zero", expression: "chooseKWithTarget([1],0,0)", expected: "[[]]" },
  ] },
  { kind: "VARIANT", id: "variant-with-repetition", title: "Không lặp → cho phép lặp", change: "Sibling vẫn tăng index, nhưng child recurse từ index để current item được chọn lại.", functionSignature: "chooseWithRepetition(items, k)", starterCode: `function chooseWithRepetition(items, k) {
  // nondecreasing indices; child may reuse current index
}`, solution: repetitionSolution, tests: [
    { label: "two from two", expression: "chooseWithRepetition([1,2],2)", expected: "[[1,1],[1,2],[2,2]]" },
    { label: "one", expression: `chooseWithRepetition(["x","y"],1)`, expected: `[["x"],["y"]]` },
    { label: "zero", expression: "chooseWithRepetition([1,2],0)", expected: "[[]]" },
  ] },
];

export const p0a3Lessons: ProgressiveLesson[] = [
  defineSixLevelLesson({
    id: "PT-F07-COLLISION-TIMELINE", familyId: "F07", slug: "timeline-collision-risk-batches", title: "Timeline — Tìm nguy cơ va chạm", priority: "P0", basePattern: "Generate per-agent timeline → group same time → count conflicts", description: "Sinh path theo rule row trước column, group vị trí của robot còn active theo từng tick và đếm mỗi collision cell đúng một lần.", constraints: ["point/robot/route đều nhỏ đủ sinh path", "robot đi row trước rồi column", "robot biến mất ngay khi xong route"], functionSignature: "countCollisionRisks(points, routes)", officialSources: ["B-Q3 — Tìm nguy cơ va chạm", "PCCP_ALGORITHM_CORPUS_AUDIT F07"], status: "ACTIVE", version: 1,
    pattern: { prompt: "Nhiều robot di chuyển đồng thời; collision chỉ có nghĩa khi cùng cell và cùng tick. Pattern?", options: [
      { id: "time-batch", label: "Time-batch simulation", explanation: "Group toàn bộ state theo cùng time trước khi resolve conflict." }, { id: "each-pair", label: "So từng cặp path", explanation: "Dễ đếm ba robot thành nhiều risk và khó quản lý lifetime." }, { id: "bfs", label: "BFS", explanation: "Route và movement order đã cố định." }, { id: "set-only", label: "Một Set toàn thời gian", explanation: "Gộp mất chiều time." },
    ], correctOptionId: "time-batch" },
    blueprint: [
      { id: "STATE", label: "STATE", prompt: "State cần sinh?", canonical: "path[robot][time] là position hoặc inactive", acceptedKeywords: [["robot", "time", "position"], ["path", "tick"]] },
      { id: "TRANSITION", label: "TRANSITION", prompt: "Đi tới waypoint?", canonical: "đổi row từng bước trước, rồi đổi column", acceptedKeywords: [["row", "trước", "column"], ["row", "then", "column"]] },
      { id: "BATCH", label: "BATCH", prompt: "Resolve một tick?", canonical: "Map coordinate key -> active robot count", acceptedKeywords: [["map", "coordinate", "count"], ["tọa độ", "đếm"]] },
      { id: "ANSWER", label: "ANSWER", prompt: "Ba robot cùng cell tính mấy?", canonical: "một risk cho mỗi cell/time có count >= 2", acceptedKeywords: [["một", "cell", "time"], ["count", ">= 2"]] },
      { id: "LIFETIME", label: "LIFETIME", prompt: "Robot hoàn tất?", canonical: "inactive ngay sau tick cuối, không giữ position", acceptedKeywords: [["inactive", "tick cuối"], ["biến mất", "xong"]] },
      { id: "COMPLEXITY", label: "COMPLEXITY", prompt: "Complexity?", canonical: "O(total path steps) time/space", acceptedKeywords: [["total", "path", "steps"], ["tổng", "bước"]] },
    ],
    logic: [{ id: "paths", text: "Sinh path cho từng route theo row rồi column" }, { id: "time", text: "Duyệt từng time tới path dài nhất" }, { id: "active", text: "Chỉ lấy robot còn active tại time" }, { id: "group", text: "Group coordinate bằng Map count" }, { id: "risk", text: "Mỗi key count>=2 cộng đúng một risk" }, { id: "return", text: "Trả tổng risk qua mọi tick" }],
    blocks: [
      { id: "paths", subgoal: "Build all paths", code: `function countCollisionRisks(points, routes) {\n  const paths = routes.map((route) => {\n    const path = [[...points[route[0] - 1]]];\n    let [row, col] = path[0];\n    for (let i = 1; i < route.length; i++) {\n      const [tr, tc] = points[route[i] - 1];\n      while (row !== tr) { row += Math.sign(tr-row); path.push([row,col]); }\n      while (col !== tc) { col += Math.sign(tc-col); path.push([row,col]); }\n    }\n    return path;\n  });` },
      { id: "time", subgoal: "Open time batches", code: `const maxTime = Math.max(0, ...paths.map((path) => path.length));\nlet risks = 0;\nfor (let time = 0; time < maxTime; time++) {\n  const counts = new Map();` },
      { id: "group", subgoal: "Group active positions", code: `for (const path of paths) {\n  if (time >= path.length) continue;\n  const [row,col] = path[time];\n  const key = row + "," + col;\n  counts.set(key, (counts.get(key) ?? 0) + 1);\n}` },
      { id: "risk", subgoal: "Count risks and close", code: `for (const count of counts.values()) if (count >= 2) risks++;\n}` },
      { id: "return", subgoal: "Return", code: `return risks;\n}` },
    ], solution: collisionSolution, tests: collisionTests, challenges: collisionChallenges,
  }),
  defineSixLevelLesson({
    id: "PT-F09-QUEUE-HEAD", familyId: "F09", slug: "queue-head-process-reenqueue", title: "Queue head — Tiến trình", priority: "P0", basePattern: "Logical queue = array + head; re-enqueue preserves metadata", description: "Dequeue bằng head, re-enqueue process chưa đủ priority và giữ original index để trả đúng execution order.", constraints: ["priority trong 1..9", "duplicate priority được phép", "không dùng shift trong main queue loop"], functionSignature: "targetProcessOrder(priorities, location)", officialSources: ["OF009 — Programmers 42587", "PCCP Thinking Curriculum Ch.5"], status: "ACTIVE", version: 1,
    pattern: { prompt: "Front item có thể bị đưa về tail và identity phải sống qua nhiều vòng. Representation?", options: [
      { id: "array-head", label: "Array + head + metadata", explanation: "head dequeue O(1), push re-enqueue và original index đi cùng item." }, { id: "shift", label: "Array.shift mỗi vòng", explanation: "Dịch lại array và có thể gần O(n²)." }, { id: "stack", label: "Stack", explanation: "LIFO sai FIFO contract." }, { id: "sort-once", label: "Sort priority một lần", explanation: "Mất FIFO trong các priority bằng nhau." },
    ], correctOptionId: "array-head" },
    blueprint: [
      { id: "STATE", label: "STATE", prompt: "Queue item?", canonical: "{priority, original index}, head, counts, highest, executed", acceptedKeywords: [["priority", "index", "head"], ["counts", "highest", "executed"]] },
      { id: "DEQUEUE", label: "DEQUEUE", prompt: "Lấy front?", canonical: "process=queue[head++] không shift", acceptedKeywords: [["queue", "head++"], ["không", "shift"]] },
      { id: "REENQUEUE", label: "REENQUEUE", prompt: "Priority thấp hơn max?", canonical: "push nguyên process về tail; frequency không đổi", acceptedKeywords: [["push", "tail", "không đổi"], ["reenqueue", "frequency"]] },
      { id: "EXECUTE", label: "EXECUTE", prompt: "Khi execute?", canonical: "decrement count, increment executed, lower highest", acceptedKeywords: [["decrement", "executed", "highest"], ["giảm", "tăng", "max"]] },
      { id: "INVARIANT", label: "INVARIANT", prompt: "Logical queue?", canonical: "queue[head..end) chứa đúng process chưa execute theo FIFO hiện tại", acceptedKeywords: [["head", "end", "fifo"], ["chưa", "execute"]] },
      { id: "COMPLEXITY", label: "COMPLEXITY", prompt: "Queue operations?", canonical: "O(1) dequeue/push amortized bằng head index", acceptedKeywords: [["o(1)", "head"], ["dequeue", "push"]] },
    ],
    logic: [{ id: "build", text: "Build queue item kèm original index và priority counts" }, { id: "dequeue", text: "Đọc queue[head] rồi tăng head" }, { id: "rotate", text: "Nếu thấp hơn highest, push lại tail" }, { id: "execute", text: "Ngược lại execute và cập nhật frequency/highest" }, { id: "target", text: "Chỉ sau execute mới check original index" }, { id: "fallback", text: "Return -1 nếu queue cạn" }],
    blocks: [
      { id: "open", subgoal: "Build queue/counts", code: `function targetProcessOrder(priorities, location) {\n  const queue = priorities.map((priority,index) => ({priority,index}));\n  const counts = Array(10).fill(0);\n  let highest=0, head=0, executed=0;\n  for (const priority of priorities) { counts[priority]++; highest=Math.max(highest,priority); }` },
      { id: "loop", subgoal: "Logical dequeue and rotate", code: `while (head < queue.length) {\n  const process = queue[head++];\n  if (process.priority < highest) { queue.push(process); continue; }` },
      { id: "execute", subgoal: "Execute and update max", code: `counts[process.priority]--;\n  executed++;\n  while (highest > 0 && counts[highest] === 0) highest--;` },
      { id: "target", subgoal: "Target check and close loop", code: `if (process.index === location) return executed;\n}` },
      { id: "return", subgoal: "Fallback", code: `return -1;\n}` },
    ], solution: processSolution, tests: processTests, challenges: processChallenges,
  }),
  defineSixLevelLesson({
    id: "PT-F11-COMBINATION", familyId: "F11", slug: "combination-start-index", title: "Combination — chọn k không xét thứ tự", priority: "P0", basePattern: "Backtracking path + monotone start index", description: "Sinh mọi cách chọn đúng k item theo input order; start index loại permutation trùng và path được restore sau mỗi branch.", constraints: ["items được coi là distinct theo index", "không tái sử dụng index", "k có thể bằng 0 hoặc lớn hơn n"], functionSignature: "chooseK(items, k)", officialSources: ["BTD-01 — combination", "OF020 — permutation contrast"], status: "ACTIVE", version: 1,
    pattern: { prompt: "Chọn đúng k index, [a,b] và [b,a] là cùng một selection. Skeleton?", options: [
      { id: "start-index", label: "DFS với start index", explanation: "Child chỉ xét index lớn hơn nên mỗi combination sinh một lần." }, { id: "permutation", label: "visited[] mọi index", explanation: "Sinh cả các order khác nhau." }, { id: "take-reuse", label: "Recurse cùng index", explanation: "Cho phép dùng lại occurrence trái contract." }, { id: "greedy", label: "Chọn k item đầu", explanation: "Không enumerate mọi selection." },
    ], correctOptionId: "start-index" },
    blueprint: [
      { id: "STATE", label: "STATE", prompt: "State recursion?", canonical: "start index, path và result", acceptedKeywords: [["start", "path", "result"], ["index", "nhánh"]] },
      { id: "BASE_CASE", label: "BASE CASE", prompt: "Emit khi nào?", canonical: "path.length === k; push clone path rồi return", acceptedKeywords: [["length", "k", "clone"], ["đủ", "k", "copy"]] },
      { id: "CHOICES", label: "CHOICES", prompt: "Candidate range?", canonical: "mọi index từ start tới items.length-1", acceptedKeywords: [["start", "items.length"], ["index", "start"]] },
      { id: "TRANSITION", label: "TRANSITION", prompt: "Child start?", canonical: "push item rồi dfs(index+1)", acceptedKeywords: [["push", "index+1"], ["index", "1"]] },
      { id: "RESTORE", label: "RESTORE", prompt: "Unchoose?", canonical: "path.pop ngay sau recursive call", acceptedKeywords: [["path.pop", "sau"], ["pop", "recurse"]] },
      { id: "COMPLEXITY", label: "COMPLEXITY", prompt: "Output-sensitive complexity?", canonical: "O(C(n,k)*k) để materialize output, O(k) stack/path", acceptedKeywords: [["c(n,k)", "k"], ["combination", "k"]] },
    ],
    logic: [{ id: "setup", text: "Khởi tạo result/path" }, { id: "dfs", text: "Khai báo dfs(start)" }, { id: "base", text: "Đủ k thì clone path và return" }, { id: "loop", text: "Duyệt candidate từ start" }, { id: "choose", text: "Push current item" }, { id: "explore", text: "Recurse từ index+1" }, { id: "restore", text: "Pop trước sibling tiếp theo" }, { id: "return", text: "Gọi dfs(0) và trả result" }],
    blocks: [
      { id: "open", subgoal: "State and dfs", code: `function chooseK(items, k) {\n  const result=[], path=[];\n  function dfs(start) {` },
      { id: "base", subgoal: "Emit full combination", code: `if (path.length === k) { result.push([...path]); return; }` },
      { id: "loop", subgoal: "Choose/explore/restore", code: `for (let index=start; index<items.length; index++) {\n  path.push(items[index]);\n  dfs(index+1);\n  path.pop();\n}` },
      { id: "call", subgoal: "Close dfs and initial call", code: `}\ndfs(0);` },
      { id: "return", subgoal: "Return and close", code: `return result;\n}` },
    ], solution: combinationSolution, tests: combinationTests, challenges: combinationChallenges,
  }),
];
