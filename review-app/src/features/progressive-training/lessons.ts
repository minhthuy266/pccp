import { assertProgressiveLessons, type BlueprintField, type LearningLevels, type ProgressiveLesson, type TransferChallenge } from "./types";
import { p0a1Lessons } from "./lessons.p0a1";
import { p0a2Lessons } from "./lessons.p0a2";
import { p0a3Lessons } from "./lessons.p0a3";
import { priorityD10Lessons } from "./lessons.priority-d10";
import { priorityD11D12Lessons } from "./lessons.priority-d11d12";
import { progressiveProblemStatements } from "./problemStatements";

const takeSkipSolution = `function countTargetWays(numbers, target) {
  function dfs(index, sum) {
    if (index === numbers.length) return sum === target ? 1 : 0;
    const skip = dfs(index + 1, sum);
    const take = dfs(index + 1, sum + numbers[index]);
    return skip + take;
  }
  return dfs(0, 0);
}`;

const assignmentSolution = `function maximizeAssignment(scores) {
  const n = scores.length;
  const used = Array(n).fill(false);
  let best = -Infinity;

  function dfs(position, total) {
    if (position === n) {
      best = Math.max(best, total);
      return;
    }
    for (let candidate = 0; candidate < n; candidate++) {
      if (used[candidate]) continue;
      used[candidate] = true;
      dfs(position + 1, total + scores[position][candidate]);
      used[candidate] = false;
    }
  }

  dfs(0, 0);
  return best;
}`;

const takeSkipTests = [
  { label: "sample", expression: "countTargetWays([1, 2, 3], 3)", expected: "2" },
  { label: "empty choice", expression: "countTargetWays([2, 4], 0)", expected: "1" },
  { label: "duplicates are distinct indices", expression: "countTargetWays([1, 1, 1], 2)", expected: "3" },
  { label: "impossible", expression: "countTargetWays([5, 6], 4)", expected: "0" },
];

const assignmentTests = [
  { label: "greedy trap", expression: "maximizeAssignment([[9,8],[8,1]])", expected: "16" },
  { label: "three positions", expression: "maximizeAssignment([[5,1,4],[2,8,3],[6,7,9]])", expected: "22" },
  { label: "single", expression: "maximizeAssignment([[-3]])", expected: "-3" },
  { label: "all negative", expression: "maximizeAssignment([[-1,-4],[-2,-3]])", expected: "-4" },
];

const takeSkipBlueprint: BlueprintField[] = [
  { id: "STATE", label: "STATE", prompt: "Mỗi lời gọi cần giữ state nào?", canonical: "index hiện tại và tổng sum đã chọn", acceptedKeywords: [["index", "sum"], ["chỉ số", "tổng"]] },
  { id: "BASE_CASE", label: "BASE CASE", prompt: "Khi nào dừng và trả gì?", canonical: "index === numbers.length; trả 1 nếu sum === target, ngược lại 0", acceptedKeywords: [["length", "target"], ["hết", "target"]] },
  { id: "CHOICES", label: "CHOICES", prompt: "Tại mỗi index có những choice nào?", canonical: "skip current hoặc take current", acceptedKeywords: [["skip", "take"], ["bỏ", "lấy"]] },
  { id: "TRANSITION", label: "TRANSITION", prompt: "State đổi thế nào sau mỗi choice?", canonical: "đều sang index + 1; nhánh take cộng numbers[index] vào sum", acceptedKeywords: [["index + 1", "sum"], ["chỉ số", "1", "tổng"]] },
  { id: "ANSWER", label: "ANSWER", prompt: "Hai nhánh được ghép thành đáp án thế nào?", canonical: "cộng số cách của skip và take", acceptedKeywords: [["cộng", "skip", "take"], ["tổng", "hai nhánh"]] },
  { id: "INVARIANT", label: "INVARIANT", prompt: "Invariant của dfs(index, sum) là gì?", canonical: "sum là tổng choices của prefix [0,index)", acceptedKeywords: [["sum", "prefix"], ["tổng", "trước index"]] },
  { id: "COMPLEXITY", label: "COMPLEXITY", prompt: "Độ phức tạp worst-case?", canonical: "O(2^n) time, O(n) call stack", acceptedKeywords: [["2^n", "o(n)"], ["2 n", "stack"]] },
];

const assignmentBlueprint: BlueprintField[] = [
  { id: "STATE", label: "STATE", prompt: "Depth và accumulated state là gì?", canonical: "position, total, used[] và best", acceptedKeywords: [["position", "total", "used"], ["vị trí", "tổng", "used"]] },
  { id: "BASE_CASE", label: "BASE CASE", prompt: "Khi nào một assignment hoàn chỉnh?", canonical: "position === n; update best bằng total", acceptedKeywords: [["position", "n", "best"], ["vị trí", "n", "best"]] },
  { id: "CHOICES", label: "CHOICES", prompt: "Choice hợp lệ ở mỗi position?", canonical: "mọi candidate chưa được used", acceptedKeywords: [["candidate", "used"], ["ứng viên", "chưa dùng"]] },
  { id: "TRANSITION", label: "TRANSITION", prompt: "Choose và explore thay đổi gì?", canonical: "mark candidate, dfs(position + 1, total + score)", acceptedKeywords: [["mark", "position + 1", "total"], ["đánh dấu", "vị trí", "tổng"]] },
  { id: "RESTORE", label: "RESTORE", prompt: "State mutable phải khôi phục gì?", canonical: "used[candidate] = false ngay sau recursive call", acceptedKeywords: [["used", "false"], ["bỏ đánh dấu", "sau"]] },
  { id: "ANSWER", label: "ANSWER", prompt: "Output được tích lũy ở đâu?", canonical: "best là maximum total ở mọi lá", acceptedKeywords: [["best", "maximum"], ["best", "lớn nhất"]] },
  { id: "INVARIANT", label: "INVARIANT", prompt: "Invariant của used[]?", canonical: "used[] đúng chính xác các candidate trên path hiện tại", acceptedKeywords: [["used", "path"], ["used", "nhánh hiện tại"]] },
  { id: "COMPLEXITY", label: "COMPLEXITY", prompt: "Độ phức tạp worst-case?", canonical: "O(n!) time, O(n) recursion/state", acceptedKeywords: [["n!", "o(n)"], ["giai thừa", "stack"]] },
];

const logicByLesson: Record<string, { id: string; text: string }[]> = {
  "PT-DFS-TAKE-SKIP": [
    { id: "open", text: "Khai báo dfs(index, sum)" }, { id: "base", text: "Nếu đã xét hết index, kiểm tra sum với target" },
    { id: "skip", text: "Gọi nhánh bỏ current" }, { id: "take", text: "Gọi nhánh lấy current" },
    { id: "combine", text: "Cộng số cách của hai nhánh" }, { id: "call", text: "Gọi dfs từ index 0, sum 0 và trả đáp án" },
  ],
  "PT-BT-ASSIGNMENT": [
    { id: "setup", text: "Khởi tạo used[] và best" }, { id: "dfs", text: "Khai báo dfs(position, total)" },
    { id: "base", text: "Nếu đủ position, cập nhật best rồi return" }, { id: "loop", text: "Duyệt mọi candidate và bỏ qua candidate đã dùng" },
    { id: "choose", text: "Mark candidate" }, { id: "explore", text: "Recurse sang position tiếp theo" },
    { id: "restore", text: "Restore used[candidate]" }, { id: "call", text: "Gọi dfs ban đầu" }, { id: "answer", text: "Trả best" },
  ],
};

function debugChallenges(lesson: ProgressiveLesson): TransferChallenge[] {
  if (lesson.id === "PT-DFS-TAKE-SKIP") return [
    { kind: "DEBUG", id: "debug-base-boundary", title: "Debug base case off-by-one", change: "Starter dừng trước khi xử lý phần tử cuối. Sửa boundary để mọi index được quyết định.", functionSignature: lesson.functionSignature, starterCode: takeSkipSolution.replace("index === numbers.length", "index === numbers.length - 1"), solution: takeSkipSolution, tests: takeSkipTests },
    { kind: "DEBUG", id: "debug-take-transition", title: "Debug transition nhánh take", change: "Starter cộng hằng số 1 thay vì current value. Sửa transition theo đúng state.", functionSignature: lesson.functionSignature, starterCode: takeSkipSolution.replace("sum + numbers[index]", "sum + 1"), solution: takeSkipSolution, tests: takeSkipTests },
  ];
  return [
    { kind: "DEBUG", id: "debug-missing-restore", title: "Debug thiếu restore", change: "Starter giữ used[] của nhánh trước. Khôi phục mutable state ngay sau recursive call.", functionSignature: lesson.functionSignature, starterCode: assignmentSolution.replace("      used[candidate] = false;", "      // missing restore"), solution: assignmentSolution, tests: assignmentTests },
    { kind: "DEBUG", id: "debug-base-depth", title: "Debug base case sai depth", change: "Starter update best sớm một position. Sửa boundary của assignment hoàn chỉnh.", functionSignature: lesson.functionSignature, starterCode: assignmentSolution.replace("position === n", "position === n - 1"), solution: assignmentSolution, tests: assignmentTests },
  ];
}

function buildLearningLevels(lesson: ProgressiveLesson): LearningLevels {
  const legacySteps = lesson.steps!;
  const pattern = legacySteps[0]; const ordering = legacySteps[1]; const full = legacySteps[3];
  const logicItems = logicByLesson[lesson.id];
  const orderedBlocks = ordering.correctOrder.map((id) => ordering.blocks.find((block) => block.id === id)!);
  const writingBlocks = orderedBlocks.map((block, index) => ({
    id: block.id,
    subgoal: logicItems[Math.min(index, logicItems.length - 1)]?.text ?? block.id,
    prompt: `Tự viết toàn bộ block “${block.id}”; không điền một token rời.`,
    starterCode: "",
    canonicalCode: block.code,
    dependencies: index ? [orderedBlocks[index - 1].id] : [],
  }));
  const blueprint = lesson.id === "PT-DFS-TAKE-SKIP" ? takeSkipBlueprint : assignmentBlueprint;
  const variants = legacySteps[4].challenges.map((challenge): TransferChallenge => ({ ...challenge, kind: "VARIANT" }));
  return [
    { type: "PATTERN_BLUEPRINT", prompt: pattern.prompt, options: pattern.options, correctOptionId: pattern.correctOptionId, blueprint },
    { type: "LOGIC_ORDERING", prompt: "Sắp xếp subgoal tiếng Việt trước khi nhìn code.", items: logicItems, correctOrder: logicItems.map((item) => item.id), canonicalOnly: true },
    { type: "CODE_BLOCK_ORDERING", prompt: ordering.prompt, blocks: ordering.blocks, correctOrder: ordering.correctOrder, canonicalOnly: true, tests: ordering.tests },
    { type: "BLOCK_WRITING", prompt: "Viết từng block theo subgoal; hệ thống sẽ ghép source thật và chạy tests.", blocks: writingBlocks, tests: full.tests },
    { type: "FULL_RECALL", prompt: "Viết toàn bộ hàm từ trang trắng. Chỉ mở đúng mức hint thật sự cần.", solution: full.solution, tests: full.tests, hints: [lesson.basePattern, blueprint.map((field) => `${field.id}: ${field.canonical}`).join("\n"), logicItems.map((item) => item.text).join("\n"), `function ${lesson.functionSignature} {\n  // core logic\n}`, full.solution] },
    { type: "DEBUG_VARIANT", prompt: "Sửa bug thật và chuyển cùng core sang contract khác.", challenges: [...debugChallenges(lesson), ...variants] },
  ];
}

const lessons: ProgressiveLesson[] = [
  {
    id: "PT-DFS-TAKE-SKIP",
    familyId: "F11",
    slug: "dfs-take-skip-target-count",
    title: "DFS lấy/bỏ — đếm số cách đạt target",
    priority: "P0",
    basePattern: "DFS binary decision / take-skip",
    description: "Mỗi phần tử tạo đúng hai nhánh: không lấy hoặc lấy. Đếm các lá có tổng bằng target.",
    constraints: ["1 ≤ numbers.length ≤ 20", "numbers là số nguyên không âm", "Mỗi index chỉ được dùng một lần"],
    functionSignature: "countTargetWays(numbers, target)",
    officialSources: ["OF036 — Số mục tiêu", "BTD-04 — subset generation"],
    status: "ACTIVE",
    version: 2,
    steps: [
      {
        type: "PATTERN_CHOICE",
        prompt: "Mỗi số được dùng tối đa một lần; cần đếm số tập con có tổng đúng target. Dạng nền phù hợp nhất là gì?",
        options: [
          { id: "take-skip", label: "DFS lấy/bỏ theo index", explanation: "Mỗi index sinh hai nhánh độc lập." },
          { id: "permutation", label: "Sinh permutation", explanation: "Permutation phân biệt thứ tự, trong khi bài này không cần." },
          { id: "sliding-window", label: "Sliding window", explanation: "Window chỉ xét đoạn liên tiếp." },
          { id: "greedy", label: "Greedy chọn số lớn", explanation: "Không có lựa chọn cục bộ chứng minh được." },
        ],
        correctOptionId: "take-skip",
      },
      {
        type: "BLOCK_ORDERING",
        prompt: "Sắp xếp các block để state đi từ index hiện tại tới hai nhánh và cộng kết quả.",
        blocks: [
          { id: "return", code: "return dfs(0, 0);" },
          { id: "take", code: "const take = dfs(index + 1, sum + numbers[index]);" },
          { id: "open", code: "function countTargetWays(numbers, target) {\n  function dfs(index, sum) {" },
          { id: "combine", code: "return skip + take;\n  }" },
          { id: "base", code: "if (index === numbers.length) return sum === target ? 1 : 0;" },
          { id: "skip", code: "const skip = dfs(index + 1, sum);" },
          { id: "close", code: "}" },
        ],
        correctOrder: ["open", "base", "skip", "take", "combine", "return", "close"],
        canonicalOnly: true,
        tests: takeSkipTests,
      },
      {
        type: "CODE_FILL",
        prompt: "Điền đúng base case và hai transition. Không cần viết lại phần khung.",
        template: `function countTargetWays(numbers, target) {
  function dfs(index, sum) {
    if (index === numbers.length) return /* base */;
    const skip = /* skip */;
    const take = /* take */;
    return skip + take;
  }
  return dfs(0, 0);
}`,
        blanks: [
          { id: "base", label: "Giá trị trả ở lá", accepted: ["sum === target ? 1 : 0", "sum===target?1:0"] },
          { id: "skip", label: "Nhánh không lấy", accepted: ["dfs(index + 1, sum)"] },
          { id: "take", label: "Nhánh lấy current", accepted: ["dfs(index + 1, sum + numbers[index])"] },
        ],
      },
      {
        type: "FULL_CODE",
        prompt: "Tự viết toàn bộ hàm từ signature. Cần pass tất cả test, không chỉ sample.",
        starterCode: "function countTargetWays(numbers, target) {\n  // Viết DFS take/skip từ trí nhớ\n}",
        solution: takeSkipSolution,
        tests: takeSkipTests,
      },
      {
        type: "VARIANT",
        prompt: "Sửa transition/base/update thật sự cho cả hai biến thể; không chỉ giải thích bằng chữ.",
        challenges: [
          {
            id: "plus-minus",
            title: "Lấy/bỏ → cộng/trừ",
            change: "Mỗi index bắt buộc chọn dấu + hoặc -, không còn nhánh skip.",
            functionSignature: "plusMinusWays(numbers, target)",
            starterCode: takeSkipSolution.replace("countTargetWays", "plusMinusWays"),
            solution: `function plusMinusWays(numbers, target) {
  function dfs(index, sum) {
    if (index === numbers.length) return sum === target ? 1 : 0;
    return dfs(index + 1, sum + numbers[index]) + dfs(index + 1, sum - numbers[index]);
  }
  return dfs(0, 0);
}`,
            tests: [
              { label: "official shape", expression: "plusMinusWays([1,1,1,1,1], 3)", expected: "5" },
              { label: "zero creates two signs", expression: "plusMinusWays([0,0], 0)", expected: "4" },
              { label: "negative target", expression: "plusMinusWays([2,1], -1)", expected: "1" },
            ],
          },
          {
            id: "best-under-target",
            title: "Đếm cách → tổng lớn nhất không vượt target",
            change: "Output từ count thành best value; lá không hợp lệ trả -Infinity.",
            functionSignature: "bestSumAtMost(numbers, target)",
            starterCode: takeSkipSolution.replace("countTargetWays", "bestSumAtMost"),
            solution: `function bestSumAtMost(numbers, target) {
  function dfs(index, sum) {
    if (index === numbers.length) return sum <= target ? sum : -Infinity;
    return Math.max(dfs(index + 1, sum), dfs(index + 1, sum + numbers[index]));
  }
  return dfs(0, 0);
}`,
            tests: [
              { label: "exact is best", expression: "bestSumAtMost([6,4,3], 10)", expected: "10" },
              { label: "closest below", expression: "bestSumAtMost([8,5,4], 10)", expected: "9" },
              { label: "empty subset", expression: "bestSumAtMost([5,7], 3)", expected: "0" },
            ],
          },
        ],
      },
    ],
  },
  {
    id: "PT-BT-ASSIGNMENT",
    familyId: "F11",
    slug: "backtracking-assignment-max",
    title: "Backtracking phân công — tìm tổng lớn nhất",
    priority: "P0",
    basePattern: "Assignment backtracking with used[] and rollback",
    description: "Mỗi vị trí chọn đúng một ứng viên chưa dùng, cộng điểm và rollback sau khi quay lui.",
    constraints: ["scores là ma trận vuông n × n", "1 ≤ n ≤ 9", "Mỗi ứng viên chỉ được dùng một lần"],
    functionSignature: "maximizeAssignment(scores)",
    officialSources: ["M1Q2 — Đại hội thể thao", "OF022 — backtracking restore visited"],
    status: "ACTIVE",
    version: 2,
    steps: [
      {
        type: "PATTERN_CHOICE",
        prompt: "Có n vị trí và n ứng viên. Mỗi vị trí chọn một ứng viên khác nhau để tổng điểm lớn nhất. Chọn dạng nền.",
        options: [
          { id: "assignment", label: "Backtracking assignment", explanation: "Depth là vị trí, used[] giữ ứng viên đã chọn." },
          { id: "take-skip", label: "DFS lấy/bỏ", explanation: "Lấy/bỏ không tự đảm bảo mỗi vị trí có đúng một ứng viên." },
          { id: "bfs", label: "BFS shortest path", explanation: "Không có shortest unweighted state." },
          { id: "heap", label: "Greedy bằng heap", explanation: "Best ứng viên cục bộ có thể phá lựa chọn của vị trí sau." },
        ],
        correctOptionId: "assignment",
      },
      {
        type: "BLOCK_ORDERING",
        prompt: "Sắp xếp block, đặc biệt chú ý mark → recurse → rollback.",
        blocks: [
          { id: "setup", code: "const n = scores.length;\nconst used = Array(n).fill(false);\nlet best = -Infinity;" },
          { id: "call", code: "dfs(0, 0);\nreturn best;" },
          { id: "choose", code: "used[candidate] = true;\ndfs(position + 1, total + scores[position][candidate]);\nused[candidate] = false;" },
          { id: "open", code: "function maximizeAssignment(scores) {" },
          { id: "loop", code: "for (let candidate = 0; candidate < n; candidate++) {\n  if (used[candidate]) continue;" },
          { id: "base", code: "if (position === n) {\n  best = Math.max(best, total);\n  return;\n}" },
          { id: "dfs", code: "function dfs(position, total) {" },
          { id: "close-loop", code: "}" },
          { id: "close-dfs", code: "}" },
          { id: "close", code: "}" },
        ],
        correctOrder: ["open", "setup", "dfs", "base", "loop", "choose", "close-loop", "close-dfs", "call", "close"],
        canonicalOnly: true,
        tests: assignmentTests,
      },
      {
        type: "CODE_FILL",
        prompt: "Điền condition, update và rollback tạo invariant mỗi ứng viên dùng tối đa một lần.",
        template: `function maximizeAssignment(scores) {
  const n = scores.length;
  const used = Array(n).fill(false);
  let best = -Infinity;
  function dfs(position, total) {
    if (position === n) { /* update best */; return; }
    for (let candidate = 0; candidate < n; candidate++) {
      if (/* already used */) continue;
      /* mark */;
      dfs(position + 1, total + scores[position][candidate]);
      /* rollback */;
    }
  }
  dfs(0, 0);
  return best;
}`,
        blanks: [
          { id: "best", label: "Update best", accepted: ["best = Math.max(best, total)"] },
          { id: "used", label: "Check đã dùng", accepted: ["used[candidate]"] },
          { id: "mark", label: "Mark trước recurse", accepted: ["used[candidate] = true"] },
          { id: "rollback", label: "Rollback sau recurse", accepted: ["used[candidate] = false"] },
        ],
      },
      {
        type: "FULL_CODE",
        prompt: "Tự viết toàn bộ assignment backtracking và pass test có greedy trap.",
        starterCode: "function maximizeAssignment(scores) {\n  // DFS theo position, nhớ rollback used[]\n}",
        solution: assignmentSolution,
        tests: assignmentTests,
      },
      {
        type: "VARIANT",
        prompt: "Chuyển cùng family sang sinh permutation và đổi objective max thành min.",
        challenges: [
          {
            id: "permutation",
            title: "Phân công → permutation",
            change: "Bỏ score/total/best; lưu path khi depth bằng n. Input được giả định distinct.",
            functionSignature: "generatePermutations(items)",
            starterCode: assignmentSolution.replace("maximizeAssignment", "generatePermutations"),
            solution: `function generatePermutations(items) {
  const used = Array(items.length).fill(false);
  const path = [], result = [];
  function dfs() {
    if (path.length === items.length) { result.push([...path]); return; }
    for (let index = 0; index < items.length; index++) {
      if (used[index]) continue;
      used[index] = true; path.push(items[index]);
      dfs();
      path.pop(); used[index] = false;
    }
  }
  dfs();
  return result;
}`,
            tests: [
              { label: "two items", expression: "generatePermutations([1,2])", expected: "[[1,2],[2,1]]" },
              { label: "three count", expression: "generatePermutations(['a','b','c']).length", expected: "6" },
              { label: "empty permutation", expression: "generatePermutations([])", expected: "[[]]" },
            ],
          },
          {
            id: "minimum-assignment",
            title: "Phân công max → phân công min",
            change: "Đổi identity và update objective; traversal/used/rollback giữ nguyên.",
            functionSignature: "minimizeAssignment(costs)",
            starterCode: assignmentSolution.replace("maximizeAssignment", "minimizeAssignment").replaceAll("scores", "costs"),
            solution: `function minimizeAssignment(costs) {
  const n = costs.length;
  const used = Array(n).fill(false);
  let best = Infinity;
  function dfs(position, total) {
    if (position === n) { best = Math.min(best, total); return; }
    for (let candidate = 0; candidate < n; candidate++) {
      if (used[candidate]) continue;
      used[candidate] = true;
      dfs(position + 1, total + costs[position][candidate]);
      used[candidate] = false;
    }
  }
  dfs(0, 0);
  return best;
}`,
            tests: [
              { label: "two positions", expression: "minimizeAssignment([[9,2],[3,8]])", expected: "5" },
              { label: "three positions", expression: "minimizeAssignment([[4,1,3],[2,0,5],[3,2,2]])", expected: "5" },
              { label: "single", expression: "minimizeAssignment([[7]])", expected: "7" },
            ],
          },
        ],
      },
    ],
  },
];

const upgradedLegacyLessons = lessons.map((lesson) => ({ ...lesson, version: 3, levels: buildLearningLevels(lesson) }));
const lessonInventory = [...p0a1Lessons, ...p0a2Lessons, ...p0a3Lessons, ...priorityD10Lessons, ...priorityD11D12Lessons, ...upgradedLegacyLessons]
  .map((lesson) => ({ ...lesson, problem: progressiveProblemStatements[lesson.id] }));
export const progressiveLessons = assertProgressiveLessons(lessonInventory);
export const progressiveLessonById = new Map(progressiveLessons.map((lesson) => [lesson.id, lesson]));
