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

const areBracketsValid = (text) => {
  const expectedOpenByClose = new Map([
    [")", "("],
    ["]", "["],
    ["}", "{"],
  ]);

  console.log("expectedOpenByClose", expectedOpenByClose);
  const stack = [];

  for (const character of text) {
    if (character === "(" || character === "[" || character === "{") {
      stack.push(character);
      continue;
    }

    const expectedOpen = expectedOpenByClose.get(character);

    console.log("stack", stack);
    console.log("expectedOpen", expectedOpen);
    const actualOpen = stack.pop();

    if (actualOpen !== expectedOpen) return false;
  }

  return stack.length === 0;
};

console.log("areBracketsValid", areBracketsValid("([)]"));

function solutionP(board, moves) {
  const basket = [];
  let removed = 0;

  for (const move of moves) {
    const col = move - 1;

    for (let row = 0; row < board.length; row++) {
      if (board[row][col] === 0) {
        continue;
      }

      const doll = board[row][col];
      board[row][col] = 0;

      const top = basket[basket.length - 1];

      if (top === doll) {
        basket.pop();
        removed += 2;
      } else {
        basket.push(doll);
      }

      break;
    }
  }

  return removed;
}

const solutionThu = (board, moves) => {
  const basket = [];
  let answer = 0;

  for (const move of moves) {
    const col = move - 1;
    for (let row = 0; row < board.length; row++) {
      if (board[row][col] === 0) {
        continue;
      }

      const doll = board[row][col];
      board[row][col] = 0;

      const top = basket[basket.length - 1];

      if (top === doll) {
        basket.pop();
        answer += 2;
      } else {
        basket.push(doll);
      }

      break;
    }
  }

  return answer;
};

console.log(
  solutionThu(
    [
      [0, 0, 0, 0, 0],
      [0, 0, 1, 0, 3],
      [0, 2, 5, 0, 1],
      [4, 2, 4, 4, 2],
      [3, 5, 1, 3, 1],
    ],
    [1, 5, 3, 5, 1, 2, 1, 4],
  ),
);

const isValidParenth = (s) => {
  let answer = true;
  const stack = [];

  for (let i = 0; i < s.length; i++) {
    if (s[i] === "(") {
      stack.push(s[i]);
    } else {
      if (stack.length === 0) {
        return false;
      }
      stack.pop();
    }
  }

  if (stack.length > 0) {
    answer = false;
  }

  return answer;
};

console.log(isValidParenth("()()[]"));


const minLength = (nums, target) => {
  let left = 0
  let sum = 0
  let best = Infinity

  for (let right = 0; right < nums.length; right++) {
    sum += right

    while (sum >= target) {

    }
  }
}

const minLengthCal = (nums, target) => {
    let left = 0
    let sum = 0
    let best = Infinity

    for (let right = 0; right < nums.length; right++) {
      sum += nums[right]

      while (sum >= target) {
        const currentLength = right - left + 1
        best =  Math.min(best, currentLength)
        sum -= nums[left]
        left++
      }
    }

    return best === Infinity ? 0 : best
}

console.log("minLengthCal", minLengthCal([2, 3, 1, 2], 5))


const minLengthArray = (nums, target) => {
  let left = 0
  let sum = 0
  let best = Infinity

  for (let right = 0; right < nums.length; right++) {
    sum += nums[right]

    while (sum >= target) {
      const currentLength = right - left + 1
      best = Math.min(best, currentLength)
      sum -= nums[left]
      left++
    }
  }

  return best
}

console.log("minLengthCal", minLengthArray([2, 3, 1, 2], 5))

const buildPrefix = (nums) => {
  const prefix = Array(nums.length + 1).fill(0)

  for (let index = 0; index < nums.length; index++) {
    prefix[index + 1] = prefix[index] + nums[index]
  }

  console.log("PREFIXX", prefix)

  return prefix
}

const rangeSum = (prefix, left, right) => {
  return prefix[right + 1] - prefix[left]
}

console.log("BUILDĐ", buildPrefix([2, 4, 6, 8]), rangeSum(buildPrefix([2, 4, 6, 8]), 1, 2))


const slidingWindow = (nums, k) => {
  let sum = 0
  let best = 0

  for (let index = 0; index < k; index++) {
    sum += nums[index]
  }

  console.log("SUMMM 1", sum)

  for (let right = k; right < nums.length; right++) {
    sum += nums[right]
    sum -= nums[right - k]
    best = Math.max(best, sum)
  }

  console.log("SUMMM 2", sum)

  return best

}

console.log("SLIDING", slidingWindow([2, 16, 11, 7], 2))


const combineSlidingWindow = (values, k) => {
  let left = 0
  let best = 0

  const count = new Map()

  for (let right = 0; right < values.length; right++) {
    const entering = values[right]

    const oldEnteringCount = count.get(entering) ?? 0

    count.set(entering, oldEnteringCount + 1);

    while (count.size > k) {
      const leaving = values[left]
      const oldLeavingCount = count.get(leaving)
      const remaining = oldLeavingCount - 1

      if (remaining === 0) {
        count.delete(leaving)
      } else {
        count.set(leaving, remaining)
      }

      left++
    }

    const currentLength = right - left + 1
    best = Math.max(best, currentLength)
  }

  console.log("COUNT", count)

  return best
}

console.log(combineSlidingWindow(['A','B','C','A','D','A'], 2))







