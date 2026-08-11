const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");
const vm = require("node:vm");
const test = require("node:test");

const root = path.resolve(__dirname, "..");
const notebook = path.join(root, "PCCP_Algorithm_Code_Notebook");

function codeBlocks(relativePath) {
  const text = fs.readFileSync(path.join(notebook, relativePath), "utf8");
  return [...text.matchAll(/^```(?:js|javascript)\s*\n([\s\S]*?)^```\s*$/gm)]
    .map((match) => match[1]);
}

function loadDefinition(relativePath, name) {
  const block = codeBlocks(relativePath).find((source) =>
    new RegExp(`(?:function|class)\\s+${name}\\b`).test(source),
  );
  assert.ok(block, `Không tìm thấy ${name} trong ${relativePath}`);
  const context = vm.createContext({ Map, Set, Array, Number, String, Math, Error, RangeError });
  vm.runInContext(`${block}\nthis.__value = ${name};`, context);
  return context.__value;
}

function plain(value) {
  return JSON.parse(JSON.stringify(value));
}

const theory = "chapters/08_stack_queue/01_Stack_Monotonic.md";
const practiceSolutions = "solutions/08_Stack_Queue_Solutions.md";
const programmersSolutions = "solutions/08_Stack_Queue_Programmers_Solutions.md";

test("SQ-02 canonical right-resolve chọn greater/strict/value", () => {
  const solve = loadDefinition(theory, "firstMatchingOnRight");
  const actual = solve([2, 1, 3], {
    notFound: -1,
    currentResolvesTop: (current, top) => current > top,
    buildAnswer: (_previous, index, values) => values[index],
  });
  assert.deepEqual(plain(actual), [3, 3, -1]);
});

test("SQ-02 canonical left-query loại value bằng current cho previous strict greater", () => {
  const solve = loadDefinition(theory, "firstMatchingOnLeft");
  const actual = solve([3, 3, 2], {
    notFound: -1,
    topCannotAnswerCurrent: (top, current) => top <= current,
    buildAnswer: (previous) => previous,
  });
  assert.deepEqual(plain(actual), [-1, -1, 1]);
});

test("SQ-01 postfix giữ đúng thứ tự operand", () => {
  const solve = loadDefinition(practiceSolutions, "evaluatePostfix");
  assert.equal(solve(["7", "2", "-"]), 5);
});

test("SQ-03 round-robin re-enqueue job chưa xong", () => {
  const solve = loadDefinition(practiceSolutions, "roundRobin");
  assert.deepEqual(plain(solve([3, 1, 2], 1)), [1, 2, 0]);
});

test("SQ-04 circular queue wrap và reject full", () => {
  const CircularQueue = loadDefinition(practiceSolutions, "CircularQueue");
  const queue = new CircularQueue(2);
  assert.equal(queue.enqueue(1), true);
  assert.equal(queue.enqueue(2), true);
  assert.equal(queue.enqueue(3), false);
  assert.equal(queue.dequeue(), 1);
  assert.equal(queue.enqueue(3), true);
  assert.equal(queue.dequeue(), 2);
  assert.equal(queue.dequeue(), 3);
});

test("Transfer A phân vai queue command và stack undo", () => {
  const solve = loadDefinition(practiceSolutions, "committedValues");
  const commands = [
    { type: "ADD", value: 4 },
    { type: "ADD", value: 7 },
    { type: "UNDO" },
    { type: "COMMIT" },
  ];
  assert.deepEqual(plain(solve(commands)), [4]);
});

test("SQ-02 previous smaller strict dùng template left-query", () => {
  const solve = loadDefinition(practiceSolutions, "previousSmallerIndices");
  assert.deepEqual(plain(solve([2, 2, 1, 3])), [-1, -1, -1, 2]);
});

test("SQ-05 multi-source grid seed cùng distance 0", () => {
  const solve = loadDefinition(practiceSolutions, "nearestSourceDistance");
  assert.deepEqual(plain(solve([[1, 1, 1]], [[0, 0], [0, 2]])), [[0, 1, 0]]);
});

test("SQ-01 bracket matcher bắt sai nesting", () => {
  const solve = loadDefinition(practiceSolutions, "isBalanced");
  assert.equal(solve("([)]"), false);
  assert.equal(solve("([])"), true);
});

test("SQ-02 next greater distance giữ duplicate unresolved", () => {
  const solve = loadDefinition(practiceSolutions, "distanceToNextGreater");
  assert.deepEqual(plain(solve([2, 2, 3])), [2, 1, 0]);
});

test("SQ-05 BFS mark khi enqueue và trả shortest", () => {
  const solve = loadDefinition(practiceSolutions, "bfsDistances");
  assert.deepEqual(plain(solve([[1, 2], [3], [3], []], 0)), [0, 1, 1, 2]);
});

test("SQ-02 greater-or-equal chỉ đổi strictness knob", () => {
  const solve = loadDefinition(practiceSolutions, "distanceToNextGreaterOrEqual");
  assert.deepEqual(plain(solve([2, 2])), [1, 0]);
});

test("SQ-05 multi-source dedupe source", () => {
  const solve = loadDefinition(practiceSolutions, "multiSourceDistances");
  assert.deepEqual(plain(solve([[1], [0, 2], [1]], [0, 0])), [0, 1, 2]);
});

test("Transfer B rollback đảo discovery mới nhất", () => {
  const solve = loadDefinition(practiceSolutions, "bfsWithRollbackLog");
  const state = solve([[1], [0, 2], [1]], [0]);
  state.rollback(1);
  assert.deepEqual(plain(state.distance), [0, 1, -1]);
});

test("SQ-01 simplify path xử lý cascade ..", () => {
  const solve = loadDefinition(practiceSolutions, "simplifyPath");
  assert.equal(solve("/a/b/../c/.."), "/a");
});

test("SQ-03 hot potato giữ survivor ở pending head", () => {
  const solve = loadDefinition(practiceSolutions, "hotPotato");
  assert.equal(solve(["a", "b", "c"], 1), "c");
});

test("SQ-05 numeric BFS tôn trọng bound", () => {
  const solve = loadDefinition(practiceSolutions, "shortestNumberMoves");
  assert.equal(solve(5, 17, 20), 4);
});

test("SQ-P06 first smaller right flush tới cuối", () => {
  const solve = loadDefinition(programmersSolutions, "stockPriceDurations");
  assert.deepEqual(plain(solve([1, 2, 3, 2, 3])), [4, 3, 1, 1, 0]);
});

test("SQ-P07 decreasing input dùng deletion budget ở đuôi", () => {
  const solve = loadDefinition(programmersSolutions, "makeLargestNumberAfterRemoving");
  assert.equal(solve("9876", 2), "98");
});

test("SQ-P13 next greater trả value và default -1", () => {
  const solve = loadDefinition(programmersSolutions, "nextGreaterNumbers");
  assert.deepEqual(plain(solve([2, 2, 3, 1])), [3, 3, -1, -1]);
});
