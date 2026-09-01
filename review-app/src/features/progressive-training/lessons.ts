import { assertProgressiveLessons, type ProgressiveLesson } from "./types";

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

const lessons: ProgressiveLesson[] = [
  {
    id: "PT-DFS-TAKE-SKIP",
    slug: "dfs-take-skip-target-count",
    title: "DFS lấy/bỏ — đếm số cách đạt target",
    priority: "P0",
    basePattern: "DFS binary decision / take-skip",
    description: "Mỗi phần tử tạo đúng hai nhánh: không lấy hoặc lấy. Đếm các lá có tổng bằng target.",
    constraints: ["1 ≤ numbers.length ≤ 20", "numbers là số nguyên không âm", "Mỗi index chỉ được dùng một lần"],
    functionSignature: "countTargetWays(numbers, target)",
    officialSources: ["OF036 — Số mục tiêu", "BTD-04 — subset generation"],
    status: "ACTIVE",
    version: 1,
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
        tests: [
          { label: "sample", expression: "countTargetWays([1, 2, 3], 3)", expected: "2" },
          { label: "empty choice", expression: "countTargetWays([2, 4], 0)", expected: "1" },
          { label: "duplicates are distinct indices", expression: "countTargetWays([1, 1, 1], 2)", expected: "3" },
          { label: "impossible", expression: "countTargetWays([5, 6], 4)", expected: "0" },
        ],
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
    slug: "backtracking-assignment-max",
    title: "Backtracking phân công — tìm tổng lớn nhất",
    priority: "P0",
    basePattern: "Assignment backtracking with used[] and rollback",
    description: "Mỗi vị trí chọn đúng một ứng viên chưa dùng, cộng điểm và rollback sau khi quay lui.",
    constraints: ["scores là ma trận vuông n × n", "1 ≤ n ≤ 9", "Mỗi ứng viên chỉ được dùng một lần"],
    functionSignature: "maximizeAssignment(scores)",
    officialSources: ["M1Q2 — Đại hội thể thao", "OF022 — backtracking restore visited"],
    status: "ACTIVE",
    version: 1,
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
          { id: "close", code: "  }\n}\n}" },
        ],
        correctOrder: ["open", "setup", "dfs", "base", "loop", "choose", "close", "call"],
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
        tests: [
          { label: "greedy trap", expression: "maximizeAssignment([[9,8],[8,1]])", expected: "16" },
          { label: "three positions", expression: "maximizeAssignment([[5,1,4],[2,8,3],[6,7,9]])", expected: "22" },
          { label: "single", expression: "maximizeAssignment([[-3]])", expected: "-3" },
          { label: "all negative", expression: "maximizeAssignment([[-1,-4],[-2,-3]])", expected: "-4" },
        ],
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

export const progressiveLessons = assertProgressiveLessons(lessons);
export const progressiveLessonById = new Map(progressiveLessons.map((lesson) => [lesson.id, lesson]));
