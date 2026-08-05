const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");
const test = require("node:test");
const vm = require("node:vm");

const notebookRoot = path.join(__dirname, "..", "PCCP_Algorithm_Code_Notebook");
const practice = fs.readFileSync(
  path.join(
    notebookRoot,
    "chapters",
    "08_stack_queue",
    "03_Practice_Ladder.md",
  ),
  "utf8",
);
const solutions = fs.readFileSync(
  path.join(notebookRoot, "solutions", "08_Stack_Queue_Solutions.md"),
  "utf8",
);

const idPattern = /S08-(?:[RFLPCVT]\d{2}|M01\.\d)/g;
const practiceIds = new Set(practice.match(idPattern));
const solutionIds = new Set(
  [...solutions.matchAll(/^### (S08-(?:[RFLPCVT]\d{2}|M01\.\d))\b/gm)].map(
    (match) => match[1],
  ),
);

const context = vm.createContext({ console });
for (const match of solutions.matchAll(/```js\n([\s\S]*?)```/g)) {
  vm.runInContext(match[1], context);
}

const evaluate = (expression) => vm.runInContext(expression, context);
const plain = (value) => JSON.parse(JSON.stringify(value));

test("Chapter 08 practice and solution contracts stay aligned", () => {
  assert.deepEqual([...solutionIds].sort(), [...practiceIds].sort());
  assert.equal(solutionIds.size, 32);

  const sections = solutions.split(/(?=^### S08-)/m).slice(1);
  assert.equal(sections.length, 32);
  for (const section of sections) {
    const id = section.match(/^### (S08-[^ `]+)/)[1];
    for (const marker of ["invariant", "trace", "complexity", "trap"]) {
      assert.match(
        section.toLowerCase(),
        new RegExp(marker),
        `${id} lacks ${marker}`,
      );
    }
    if (/^S08-(?:[LPCVT]|M)/.test(id)) {
      assert.match(section, /```js\n/, `${id} lacks self-contained JavaScript`);
    }
  }
});

test("stack, monotonic-stack and queue behaviors", () => {
  assert.equal(evaluate(`isBalanced('([{}])')`), true);
  assert.equal(evaluate(`isBalanced('([)]')`), false);
  assert.equal(evaluate(`evaluatePostfix(['5', '2', '-'])`), 3);
  assert.deepEqual(
    plain(evaluate(`distanceToNextGreater([2, 1, 3])`)),
    [2, 1, 0],
  );
  assert.deepEqual(
    plain(evaluate(`distanceToNextGreaterOrEqual([2, 2])`)),
    [1, 0],
  );
  assert.deepEqual(
    plain(evaluate(`previousSmallerIndices([3, 1, 2])`)),
    [-1, -1, 1],
  );
  assert.deepEqual(plain(evaluate(`roundRobin([3, 1], 2)`)), [1, 0]);
});

test("circular queues preserve FIFO across wrap and overwrite", () => {
  assert.equal(
    evaluate(`{
      const queue = new CircularQueue(1);
      queue.enqueue(7) && !queue.enqueue(8) &&
        queue.dequeue() === 7 && queue.dequeue() === undefined;
    }`),
    true,
  );
  assert.deepEqual(
    plain(
      evaluate(`{
        const queue = new CircularQueue(3);
        queue.enqueue(1); queue.enqueue(2); queue.enqueue(3);
        queue.dequeue(); queue.enqueue(4);
        [queue.dequeue(), queue.dequeue(), queue.dequeue()];
      }`),
    ),
    [2, 3, 4],
  );
  assert.deepEqual(
    plain(
      evaluate(`{
        const queue = new OverwritingCircularQueue(2);
        queue.enqueue(1); queue.enqueue(2); queue.enqueue(3);
        [queue.dequeue(), queue.dequeue()];
      }`),
    ),
    [2, 3],
  );
});

test("BFS, transfer tests and mini-tests cover revealing cases", () => {
  assert.deepEqual(
    plain(evaluate(`bfsDistances([[1, 2], [3], [3], []], 0)`)),
    [0, 1, 1, 2],
  );
  assert.deepEqual(
    plain(
      evaluate(`multiSourceDistances([[1], [0, 2], [1, 3], [2]], [0, 3, 3])`),
    ),
    [0, 1, 1, 0],
  );
  assert.deepEqual(
    plain(
      evaluate(`committedValues([
        {type: 'ADD', value: 1}, {type: 'ADD', value: 2},
        {type: 'UNDO'}, {type: 'COMMIT'}
      ])`),
    ),
    [1],
  );
  assert.deepEqual(
    plain(evaluate(`nearestSourceDistance([[1, 1], [1, 1]], [[0, 0]])`)),
    [
      [0, 1],
      [1, 2],
    ],
  );
  assert.equal(evaluate(`simplifyPath('/a/./b/../c')`), "/a/c");
  assert.equal(evaluate(`shortestNumberMoves(5, 17, 20)`), 4);
  assert.equal(
    evaluate(`{
      const result = bfsWithRollbackLog([[1], [0, 2], [1]], [0]);
      result.rollback(1);
      result.distance[2] === -1;
    }`),
    true,
  );
});
