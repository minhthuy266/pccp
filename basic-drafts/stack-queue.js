const stack = [];

stack.push("A"); // ["A"]
stack.push("B"); // ["A", "B"]

const top = stack[stack.length - 1]; // "B", chỉ xem
const removed = stack.pop(); // "B", xem và xóa

const isValidParentheses = (values) => {
  const stack = [];

  for (const value of values) {
    if (value === "(") {
      stack.push(value);
      continue;
    }

    if (stack.length === 0) {
      return false;
    }

    stack.pop();
  }

  return stack.length === 0;
};

console.log(isValidParentheses("(())]"));

const isValidParentheses2 = (values) => {
  const stack = [];

  for (const value of values) {
    if (value === "(") {
      stack.push(value);
      continue;
    }

    if (stack.length === 0) {
      return false;
    }

    stack.pop();
  }

  return stack.length === 0;
};

console.log(isValidParentheses2("(())"));

// QUEUE

const queue = [];
let head = 0;

queue.push("A");
queue.push("B");

const first = queue[head++];
const second = queue[head++];

const completionTimes = (durations) => {
  const queue = [...durations];
  const answer = [];
  let head = 0;
  let elapsedTime = 0;

  while (head < queue.length) {
    const duration = queue[head++];

    elapsedTime += duration;
    answer.push(elapsedTime);
  }

  return answer;
};

const solution = (numbers) => {
  const results = Array(4).fill(-1);
  const stack = [];

  for (let index = 0; index < numbers.length; index++) {
    const currentNumber = numbers[index];

    while (stack.length > 0 && currentNumber > numbers[stack.at(-1)]) {
      const waitingIndex = stack.pop();
      results[waitingIndex] = currentNumber;
    }

    stack.push(index);
  }

  return results;
};

console.log(solution([2, 3, 3, 5]));

const solution2 = (numbers) => {
  const stack = [];
  const results = Array(numbers.length).fill(-1);

  for (let index = 0; index < numbers.length; index++) {
    const currentNumber = numbers[index];

    while (stack.length > 0 && currentNumber > numbers[stack.at(-1)]) {
      let waitingIndex = stack.pop();

      results[waitingIndex] = currentNumber;
    }

    stack.push(index);
  }

  return results;
};

console.log(solution2([2, 3, 3, 5]));
