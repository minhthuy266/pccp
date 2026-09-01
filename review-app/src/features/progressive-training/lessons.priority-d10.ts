import { defineSixLevelLesson } from "./lessonFactory";
import type { ProgressiveLesson, TransferChallenge } from "./types";

const targetNumberSolution = `function targetNumberWays(numbers, target) {
  function dfs(index, sum) {
    if (index === numbers.length) return sum === target ? 1 : 0;
    const plus = dfs(index + 1, sum + numbers[index]);
    const minus = dfs(index + 1, sum - numbers[index]);
    return plus + minus;
  }
  return dfs(0, 0);
}`;

const targetNumberTests = [
  { label: "official sample", expression: "targetNumberWays([1,1,1,1,1],3)", expected: "5" },
  { label: "mixed values", expression: "targetNumberWays([4,1,2,1],4)", expected: "2" },
  { label: "zero target", expression: "targetNumberWays([1,1],0)", expected: "2" },
  { label: "negative target", expression: "targetNumberWays([2],-2)", expected: "1" },
];

const takeSkipVariant = `function optionalTargetWays(numbers, target) {
  function dfs(index, sum) {
    if (index === numbers.length) return sum === target ? 1 : 0;
    return dfs(index + 1, sum) + dfs(index + 1, sum + numbers[index]);
  }
  return dfs(0, 0);
}`;

const closestVariant = `function minimumSignedDifference(numbers, target) {
  function dfs(index, sum) {
    if (index === numbers.length) return Math.abs(sum - target);
    return Math.min(dfs(index + 1, sum + numbers[index]), dfs(index + 1, sum - numbers[index]));
  }
  return dfs(0, 0);
}`;

const targetChallenges: TransferChallenge[] = [
  { kind: "DEBUG", id: "debug-early-base", title: "Debug base case dừng sớm", change: "Starter kiểm leaf trước khi dùng số cuối.", functionSignature: "targetNumberWays(numbers, target)", starterCode: targetNumberSolution.replace("index === numbers.length", "index === numbers.length - 1"), solution: targetNumberSolution, tests: targetNumberTests },
  { kind: "DEBUG", id: "debug-missing-minus", title: "Debug thiếu nhánh trừ", change: "Starter gọi nhánh cộng hai lần, nên cây lựa chọn không đầy đủ.", functionSignature: "targetNumberWays(numbers, target)", starterCode: targetNumberSolution.replace("sum - numbers[index]", "sum + numbers[index]"), solution: targetNumberSolution, tests: targetNumberTests },
  { kind: "VARIANT", id: "variant-optional", title: "Bắt buộc ± → optional take/skip", change: "Mỗi số có thể bỏ hoặc lấy dương; choice set và transition đổi thật.", functionSignature: "optionalTargetWays(numbers, target)", starterCode: `function optionalTargetWays(numbers, target) {\n  // mỗi index: skip hoặc take\n}`, solution: takeSkipVariant, tests: [
    { label: "two subsets", expression: "optionalTargetWays([1,2,3],3)", expected: "2" },
    { label: "empty subset", expression: "optionalTargetWays([2,4],0)", expected: "1" },
    { label: "distinct duplicate indices", expression: "optionalTargetWays([1,1,1],2)", expected: "3" },
  ] },
  { kind: "VARIANT", id: "variant-optimize", title: "Count exact → minimize difference", change: "Leaf trả quality; combine đổi từ cộng count sang Math.min.", functionSignature: "minimumSignedDifference(numbers, target)", starterCode: `function minimumSignedDifference(numbers, target) {\n  // choose +/-, minimize |sum-target| at leaves\n}`, solution: closestVariant, tests: [
    { label: "exact", expression: "minimumSignedDifference([1,2,3],0)", expected: "0" },
    { label: "closest", expression: "minimumSignedDifference([2,5],1)", expected: "2" },
    { label: "single", expression: "minimumSignedDifference([7],3)", expected: "4" },
  ] },
];

const fatigueSolution = `function maximumDungeonCount(initialFatigue, dungeons) {
  const visited = Array(dungeons.length).fill(false);
  let best = 0;
  function dfs(fatigue, cleared) {
    best = Math.max(best, cleared);
    for (let index = 0; index < dungeons.length; index++) {
      const [required, cost] = dungeons[index];
      if (visited[index] || fatigue < required) continue;
      visited[index] = true;
      dfs(fatigue - cost, cleared + 1);
      visited[index] = false;
    }
  }
  dfs(initialFatigue, 0);
  return best;
}`;

const fatigueTests = [
  { label: "official sample", expression: "maximumDungeonCount(80,[[80,20],[50,40],[30,10]])", expected: "3" },
  { label: "none feasible", expression: "maximumDungeonCount(10,[[20,5],[30,1]])", expected: "0" },
  { label: "required equality", expression: "maximumDungeonCount(10,[[10,10]])", expected: "1" },
  { label: "order changes feasibility", expression: "maximumDungeonCount(80,[[80,10],[70,40],[30,10]])", expected: "3" },
];

const orderVariant = `function generateDungeonOrders(count) {
  const visited = Array(count).fill(false), path = [], result = [];
  function dfs() {
    if (path.length === count) { result.push([...path]); return; }
    for (let index = 0; index < count; index++) {
      if (visited[index]) continue;
      visited[index] = true; path.push(index); dfs(); path.pop(); visited[index] = false;
    }
  }
  dfs();
  return result;
}`;

const rewardVariant = `function maximumDungeonReward(initialFatigue, dungeons) {
  const visited = Array(dungeons.length).fill(false);
  let best = 0;
  function dfs(fatigue, reward) {
    best = Math.max(best, reward);
    for (let index = 0; index < dungeons.length; index++) {
      const [required, cost, gain] = dungeons[index];
      if (visited[index] || fatigue < required) continue;
      visited[index] = true;
      dfs(fatigue - cost, reward + gain);
      visited[index] = false;
    }
  }
  dfs(initialFatigue, 0);
  return best;
}`;

const fatigueChallenges: TransferChallenge[] = [
  { kind: "DEBUG", id: "debug-restore", title: "Debug quên restore visited", change: "Sibling branch nhìn thấy state bẩn từ branch trước.", functionSignature: "maximumDungeonCount(initialFatigue, dungeons)", starterCode: fatigueSolution.replace("      visited[index] = false;", "      // missing restore"), solution: fatigueSolution, tests: fatigueTests },
  { kind: "DEBUG", id: "debug-cost-contract", title: "Debug trừ required thay vì cost", change: "required chỉ là guard; fatigue phải giảm theo cost.", functionSignature: "maximumDungeonCount(initialFatigue, dungeons)", starterCode: fatigueSolution.replace("fatigue - cost", "fatigue - required"), solution: fatigueSolution, tests: fatigueTests },
  { kind: "VARIANT", id: "variant-all-orders", title: "Feasible maximize → enumerate permutations", change: "Bỏ fatigue/pruning; base phải lưu full path và restore thêm path.", functionSignature: "generateDungeonOrders(count)", starterCode: `function generateDungeonOrders(count) {\n  // enumerate every index permutation\n}`, solution: orderVariant, tests: [
    { label: "two", expression: "generateDungeonOrders(2)", expected: "[[0,1],[1,0]]" },
    { label: "three count", expression: "generateDungeonOrders(3).length", expected: "6" },
    { label: "zero", expression: "generateDungeonOrders(0)", expected: "[[]]" },
  ] },
  { kind: "VARIANT", id: "variant-reward", title: "Max count → max reward", change: "Dungeon thêm gain; answer update theo reward, không theo cleared depth.", functionSignature: "maximumDungeonReward(initialFatigue, dungeons)", starterCode: `function maximumDungeonReward(initialFatigue, dungeons) {\n  // [required,cost,gain], maximize total gain\n}`, solution: rewardVariant, tests: [
    { label: "reward beats count", expression: "maximumDungeonReward(50,[[50,40,100],[30,10,5],[20,10,5]])", expected: "100" },
    { label: "combined rewards", expression: "maximumDungeonReward(80,[[80,20,4],[50,40,9],[30,10,3]])", expected: "16" },
    { label: "none", expression: "maximumDungeonReward(5,[[10,1,99]])", expected: "0" },
  ] },
];

export const priorityD10Lessons: ProgressiveLesson[] = [
  defineSixLevelLesson({
    id: "PT-OF036-TARGET-NUMBER", familyId: "F11", slug: "of036-target-number-plus-minus", title: "OF036 — Số mục tiêu: DFS cộng/trừ", priority: "P0", basePattern: "Binary DFS choice tree (+ / -)", description: "Dùng mọi số đúng một lần; mỗi level chọn dấu cộng hoặc trừ và đếm leaf đạt target.", constraints: ["numbers.length nhỏ đủ O(2^n)", "giữ nguyên thứ tự", "mọi số bắt buộc được dùng"], functionSignature: "targetNumberWays(numbers, target)", officialSources: ["OF036 — Programmers 43165", "PCCP Thinking Curriculum Ch.7 §7.2"], status: "ACTIVE", version: 1,
    pattern: { prompt: "Mỗi số bắt buộc nhận dấu + hoặc -, cần đếm số biểu thức đạt target. Pattern?", options: [
      { id: "plus-minus", label: "DFS cây ± theo index", explanation: "Mỗi depth có đúng hai choices và dùng số kế tiếp." }, { id: "take-skip", label: "Take/skip subset", explanation: "Skip không tồn tại trong contract." }, { id: "permutation", label: "Permutation visited[]", explanation: "Thứ tự bị cố định, không cần visited." }, { id: "dp-greedy", label: "Greedy dấu gần target", explanation: "Không có local choice luôn đúng." },
    ], correctOptionId: "plus-minus" },
    blueprint: [
      { id: "STATE", label: "STATE", prompt: "State tối thiểu?", canonical: "index và partial sum", acceptedKeywords: [["index", "sum"], ["chỉ số", "tổng"]] },
      { id: "BASE_CASE", label: "BASE CASE", prompt: "Leaf khi nào và trả gì?", canonical: "index === numbers.length; trả 1 nếu sum === target, ngược lại 0", acceptedKeywords: [["length", "target"], ["hết", "target"]] },
      { id: "CHOICES", label: "CHOICES", prompt: "Hai choices?", canonical: "+numbers[index] và -numbers[index]", acceptedKeywords: [["+", "-", "numbers"]] },
      { id: "TRANSITION", label: "TRANSITION", prompt: "State chuyển thế nào?", canonical: "cả hai nhánh tăng index + 1 và đổi sum theo dấu", acceptedKeywords: [["index + 1", "sum"], ["index", "1", "tổng"]] },
      { id: "INVARIANT", label: "INVARIANT", prompt: "Ý nghĩa dfs(index,sum)?", canonical: "sum là tổng đúng của index quyết định dấu trong prefix", acceptedKeywords: [["sum", "prefix"], ["tổng", "index"]] },
      { id: "COMPLEXITY", label: "COMPLEXITY", prompt: "Search space?", canonical: "O(2^n) time và O(n) stack", acceptedKeywords: [["2^n", "o(n)"], ["2 n", "stack"]] },
    ],
    logic: [
      { id: "dfs", text: "Khai báo dfs(index,sum)" }, { id: "base", text: "Chỉ kiểm target sau khi đã dùng hết số" }, { id: "plus", text: "Explore nhánh cộng current" }, { id: "minus", text: "Explore nhánh trừ current" }, { id: "combine", text: "Cộng số cách của hai nhánh" }, { id: "call", text: "Gọi dfs(0,0) và trả kết quả" },
    ],
    blocks: [
      { id: "open", subgoal: "Mở outer và dfs", code: `function targetNumberWays(numbers, target) {\n  function dfs(index, sum) {` },
      { id: "base", subgoal: "Leaf base case", code: `if (index === numbers.length) return sum === target ? 1 : 0;` },
      { id: "branches", subgoal: "Hai transition ±", code: `const plus = dfs(index + 1, sum + numbers[index]);\nconst minus = dfs(index + 1, sum - numbers[index]);` },
      { id: "combine", subgoal: "Combine và đóng dfs", code: `return plus + minus;\n}` },
      { id: "call", subgoal: "Initial call và close", code: `return dfs(0, 0);\n}` },
    ], solution: targetNumberSolution, tests: targetNumberTests, challenges: targetChallenges,
  }),
  defineSixLevelLesson({
    id: "PT-OF022-FATIGUE", familyId: "F11", slug: "of022-fatigue-backtracking", title: "OF022 — Độ mệt mỏi: choose/explore/unchoose", priority: "P0", basePattern: "Permutation backtracking + feasibility pruning + restore", description: "Chọn dungeon chưa dùng và đủ fatigue, recurse với cost, rồi restore visited để tối đa số dungeon.", constraints: ["n rất nhỏ, cho phép O(n!)", "mỗi dungeon tối đa một lần", "required là guard, cost là update"], functionSignature: "maximumDungeonCount(initialFatigue, dungeons)", officialSources: ["OF022 — Programmers 87946", "PCCP Thinking Curriculum Ch.7 §7.3"], status: "ACTIVE", version: 1,
    pattern: { prompt: "Được đổi thứ tự dungeon, mỗi dungeon dùng một lần và feasibility phụ thuộc fatigue hiện tại. Pattern?", options: [
      { id: "permutation", label: "Backtracking visited + restore", explanation: "Choice order ảnh hưởng feasibility; bound nhỏ." }, { id: "greedy", label: "Greedy cost nhỏ nhất", explanation: "Không có proof và có counterexample." }, { id: "take-skip", label: "Take/skip theo index cố định", explanation: "Bỏ mất các order khác nhau." }, { id: "bfs", label: "BFS shortest path", explanation: "Objective không phải shortest unweighted." },
    ], correctOptionId: "permutation" },
    blueprint: [
      { id: "STATE", label: "STATE", prompt: "State sống?", canonical: "fatigue, cleared, visited[] và best", acceptedKeywords: [["fatigue", "cleared", "visited"], ["mệt mỏi", "visited", "best"]] },
      { id: "BASE_CASE", label: "ANSWER UPDATE", prompt: "Best cập nhật ở đâu?", canonical: "update best ở mọi dfs node vì có thể hết choice sớm", acceptedKeywords: [["best", "mọi"], ["best", "node"]] },
      { id: "CHOICES", label: "CHOICES", prompt: "Candidate hợp lệ?", canonical: "dungeon chưa visited và fatigue >= required", acceptedKeywords: [["visited", "fatigue", "required"]] },
      { id: "TRANSITION", label: "TRANSITION", prompt: "Explore state?", canonical: "dfs(fatigue - cost, cleared + 1)", acceptedKeywords: [["fatigue", "cost", "cleared"]] },
      { id: "RESTORE", label: "RESTORE", prompt: "Unchoose?", canonical: "visited[index] = false ngay sau recurse", acceptedKeywords: [["visited", "false"], ["restore", "visited"]] },
      { id: "INVARIANT", label: "INVARIANT", prompt: "visited có nghĩa gì?", canonical: "visited đúng chính xác dungeon trên path hiện tại", acceptedKeywords: [["visited", "path"], ["visited", "nhánh"]] },
      { id: "COMPLEXITY", label: "COMPLEXITY", prompt: "Worst case?", canonical: "O(n!) time và O(n) recursion/visited", acceptedKeywords: [["n!", "o(n)"], ["giai thừa", "stack"]] },
    ],
    logic: [
      { id: "setup", text: "Khởi tạo visited[] và best" }, { id: "dfs", text: "Khai báo dfs(fatigue,cleared)" }, { id: "best", text: "Update best ở mọi node" }, { id: "loop", text: "Duyệt dungeon chưa dùng và đủ required" }, { id: "choose", text: "Mark visited" }, { id: "explore", text: "Recurse với fatigue-cost và cleared+1" }, { id: "restore", text: "Restore visited" }, { id: "call", text: "Gọi dfs ban đầu và trả best" },
    ],
    blocks: [
      { id: "open", subgoal: "Outer state", code: `function maximumDungeonCount(initialFatigue, dungeons) {\n  const visited = Array(dungeons.length).fill(false);\n  let best = 0;` },
      { id: "dfs", subgoal: "DFS và answer update", code: `function dfs(fatigue, cleared) {\n  best = Math.max(best, cleared);` },
      { id: "loop", subgoal: "Choices và guard", code: `for (let index = 0; index < dungeons.length; index++) {\n  const [required, cost] = dungeons[index];\n  if (visited[index] || fatigue < required) continue;` },
      { id: "branch", subgoal: "Choose explore restore", code: `visited[index] = true;\n  dfs(fatigue - cost, cleared + 1);\n  visited[index] = false;\n}\n}` },
      { id: "call", subgoal: "Initial call and return", code: `dfs(initialFatigue, 0);\nreturn best;\n}` },
    ], solution: fatigueSolution, tests: fatigueTests, challenges: fatigueChallenges,
  }),
];
