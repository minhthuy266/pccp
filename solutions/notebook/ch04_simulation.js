function simulateRegister(initial, commands) {
  let value = initial;
  for (const [type, operand = 0] of commands) {
    if (type === "ADD") value += operand;
    else if (type === "MULTIPLY") value *= operand;
    else if (type === "SET") value = operand;
    else throw new RangeError(`Unknown command: ${type}`);
  }
  return value;
}

const MOVE = { U: [-1, 0], D: [1, 0], L: [0, -1], R: [0, 1] };

function walkGrid(rows, cols, start, commands, blocked = new Set()) {
  let [row, col] = start;
  for (const command of commands) {
    const delta = MOVE[command];
    if (!delta) throw new RangeError(`Unknown direction: ${command}`);
    const nextRow = row + delta[0], nextCol = col + delta[1];
    const valid = nextRow >= 0 && nextRow < rows && nextCol >= 0 && nextCol < cols && !blocked.has(`${nextRow},${nextCol}`);
    if (valid) { row = nextRow; col = nextCol; }
  }
  return [row, col];
}

function parseClock(text) {
  const match = /^(\d{2}):(\d{2})$/.exec(text);
  if (!match || Number(match[2]) >= 60) throw new RangeError("Expected mm:ss");
  return Number(match[1]) * 60 + Number(match[2]);
}

function formatClock(totalSeconds) {
  const normalized = ((totalSeconds % 3600) + 3600) % 3600;
  const minutes = Math.floor(normalized / 60), seconds = normalized % 60;
  return `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;
}

function shiftClock(text, deltaSeconds) { return formatClock(parseClock(text) + deltaSeconds); }

function commitUniqueTargets(currentPositions, proposedPositions) {
  if (currentPositions.length !== proposedPositions.length) throw new RangeError("Position arrays must align");
  const frequency = new Map();
  for (const position of proposedPositions) {
    const key = position.join(",");
    frequency.set(key, (frequency.get(key) ?? 0) + 1);
  }
  return proposedPositions.map((position, index) => frequency.get(position.join(",")) === 1 ? [...position] : [...currentPositions[index]]);
}

function processInventory(initialEntries, events) {
  const stock = new Map(initialEntries), rejected = [];
  for (let index = 0; index < events.length; index++) {
    const [type, item, amount] = events[index];
    const current = stock.get(item) ?? 0;
    if (!Number.isInteger(amount) || amount < 0) throw new RangeError("Amount must be a non-negative integer");
    if (type === "PUT") stock.set(item, current + amount);
    else if (type === "TAKE" && current >= amount) stock.set(item, current - amount);
    else if (type === "TAKE") rejected.push(index);
    else throw new RangeError(`Unknown inventory event: ${type}`);
  }
  return { stock, rejected };
}

module.exports = { commitUniqueTargets, processInventory, shiftClock, simulateRegister, walkGrid };
