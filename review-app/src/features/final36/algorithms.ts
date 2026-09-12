export type Final36Algorithm = {
  id: string;
  label: string;
  shortLabel: string;
  description: string;
  trigger: string;
  lessonOrders: readonly number[];
  template: string;
};

export const final36Algorithms: Final36Algorithm[] = [
  {
    id: "simulation",
    label: "Mô phỏng & Chuỗi",
    shortLabel: "Simulation",
    description: "Biến từng câu trong đề thành một bước cập nhật state theo đúng thứ tự.",
    trigger: "Nhiều command độc lập, xử lý ngày/tháng, cắt chuỗi hoặc thử từng cấu hình nhỏ.",
    lessonOrders: [1, 3, 18, 19, 39, 40, 41],
    template: `function solution(input, commands) {
  let state = initState(input)

  for (const command of commands) {
    const next = copyState(state)
    apply(next, command)

    if (isValid(next)) {
      state = next
    }
  }

  return buildAnswer(state)
}`,
  },
  {
    id: "hash",
    label: "Hash · Map · Set",
    shortLabel: "Hash",
    description: "Đổi thao tác tìm kiếm hoặc đếm lặp lại thành lookup gần O(1).",
    trigger: "Cần đếm tần suất, nhớ vị trí, kiểm tra đã tồn tại hoặc loại trùng.",
    lessonOrders: [2, 5, 6, 7, 42],
    template: `function solution(items) {
  const count = new Map()

  for (const item of items) {
    count.set(item, (count.get(item) ?? 0) + 1)
  }

  for (const [key, frequency] of count) {
    // dùng key và frequency để cập nhật answer
  }

  return answer
}`,
  },
  {
    id: "sorting",
    label: "Sắp xếp tùy biến",
    shortLabel: "Sorting",
    description: "Viết comparator thể hiện chính xác phần tử nào phải đứng trước.",
    trigger: "Thứ tự mặc định không đủ; cần ghép hai giá trị hoặc so sánh theo nhiều khóa.",
    lessonOrders: [8],
    template: `function solution(items) {
  const sorted = [...items].sort((a, b) => {
    if (prefer(a, b)) return -1
    if (prefer(b, a)) return 1
    return 0
  })

  return buildAnswer(sorted)
}`,
  },
  {
    id: "greedy",
    label: "Tham lam",
    shortLabel: "Greedy",
    description: "Chọn phương án tốt nhất ở hiện tại theo một thứ tự đã được chứng minh là tối ưu.",
    trigger: "Cần ít nhất/nhiều nhất, ghép cặp hoặc chọn điểm chặn cho các interval.",
    lessonOrders: [14, 25],
    template: `function solution(items) {
  items.sort(greedyOrder)
  let answer = 0
  let state = initialState

  for (const item of items) {
    if (!canTake(state, item)) continue
    state = take(state, item)
    answer++
  }

  return answer
}`,
  },
  {
    id: "stack",
    label: "Stack",
    shortLabel: "Stack",
    description: "Xử lý phần tử vào sau ra trước và chỉ cần so sánh với đỉnh gần nhất.",
    trigger: "Ngoặc, undo, ghép cặp liền kề hoặc trạng thái gần nhất chưa được xử lý.",
    lessonOrders: [4, 12],
    template: `function solution(values) {
  const stack = []

  for (const current of values) {
    if (stack.length && resolves(stack.at(-1), current)) {
      stack.pop()
    } else {
      stack.push(current)
    }
  }

  return buildAnswer(stack)
}`,
  },
  {
    id: "monotonic-stack",
    label: "Monotonic Stack",
    shortLabel: "Mono Stack",
    description: "Giữ stack đơn điệu; phần tử hiện tại giải quyết liên tiếp các đỉnh không còn hợp lệ.",
    trigger: "Tìm phần tử gần nhất lớn/nhỏ hơn hoặc xoá chữ số theo tham lam.",
    lessonOrders: [15, 16],
    template: `function solution(values) {
  const stack = []
  const answer = Array(values.length).fill(0)

  for (let i = 0; i < values.length; i++) {
    while (stack.length && resolves(values, stack.at(-1), i)) {
      const index = stack.pop()
      answer[index] = makeAnswer(index, i)
    }
    stack.push(i)
  }

  return answer
}`,
  },
  {
    id: "queue",
    label: "Queue & Mô phỏng sự kiện",
    shortLabel: "Queue",
    description: "Xử lý phần tử theo đúng thứ tự vào trước ra trước bằng head pointer.",
    trigger: "Tiến trình chờ, xe qua cầu, phát hành theo lô hoặc sự kiện diễn ra theo thời gian.",
    lessonOrders: [11, 13, 17],
    template: `function solution(start) {
  const queue = [start]
  let head = 0

  while (head < queue.length) {
    const current = queue[head++]

    for (const next of getNext(current)) {
      if (shouldEnqueue(next)) queue.push(next)
    }
  }

  return answer
}`,
  },
  {
    id: "two-pointers",
    label: "Two Pointers & Cửa sổ",
    shortLabel: "Two Pointers",
    description: "Duy trì một đoạn liên tiếp và chỉ cho hai biên đi tiến, không duyệt lại phần tử cũ.",
    trigger: "Mảng dương, đoạn con liên tiếp, window cố định hoặc cần cân bằng hai phía.",
    lessonOrders: [9, 10, 35],
    template: `function solution(values) {
  let left = 0
  let state = initialState

  for (let right = 0; right < values.length; right++) {
    add(values[right], state)

    while (isInvalid(state)) {
      remove(values[left], state)
      left++
    }

    if (isTarget(state)) commit(left, right)
  }

  return answer
}`,
  },
  {
    id: "heap",
    label: "Heap & Priority Queue",
    shortLabel: "Heap",
    description: "Luôn lấy phần tử ưu tiên nhất trong O(log N), kể cả khi dữ liệu mới liên tục được thêm vào.",
    trigger: "Lặp lại thao tác lấy min/max, xử lý job tốt nhất trong số job đã sẵn sàng.",
    lessonOrders: [20, 21],
    template: `class MinHeap {
  constructor(compare = (a, b) => a - b) {
    this.heap = []
    this.compare = compare
  }

  size() { return this.heap.length }
  peek() { return this.heap[0] }

  push(value) {
    const heap = this.heap
    heap.push(value)
    let i = heap.length - 1

    while (i > 0) {
      const parent = Math.floor((i - 1) / 2)
      if (this.compare(heap[parent], heap[i]) <= 0) break
      ;[heap[parent], heap[i]] = [heap[i], heap[parent]]
      i = parent
    }
  }

  pop() {
    const heap = this.heap
    if (heap.length === 1) return heap.pop()
    const root = heap[0]
    heap[0] = heap.pop()
    let i = 0

    while (true) {
      const left = i * 2 + 1
      const right = left + 1
      let best = i
      if (left < heap.length && this.compare(heap[left], heap[best]) < 0) best = left
      if (right < heap.length && this.compare(heap[right], heap[best]) < 0) best = right
      if (best === i) break
      ;[heap[i], heap[best]] = [heap[best], heap[i]]
      i = best
    }

    return root
  }
}`,
  },
  {
    id: "backtracking",
    label: "DFS & Backtracking",
    shortLabel: "Backtracking",
    description: "Thử một lựa chọn, đi sâu, rồi hoàn tác để thử nhánh kế tiếp.",
    trigger: "N nhỏ, cần thử mọi thứ tự/tổ hợp hoặc mỗi bước có vài lựa chọn độc lập.",
    lessonOrders: [22, 23],
    template: `function solution(items) {
  const used = Array(items.length).fill(false)
  let answer = 0

  function dfs(depth, state) {
    answer = Math.max(answer, evaluate(state))

    for (let i = 0; i < items.length; i++) {
      if (used[i] || !canChoose(state, items[i])) continue
      used[i] = true
      dfs(depth + 1, choose(state, items[i]))
      used[i] = false
    }
  }

  dfs(0, initialState)
  return answer
}`,
  },
  {
    id: "components",
    label: "Graph & Thành phần liên thông",
    shortLabel: "Components",
    description: "Mỗi lần gặp node chưa thăm, flood fill toàn bộ component của nó đúng một lần.",
    trigger: "Đếm vùng/nhóm, đo kích thước khối, duyệt cây hoặc tách graph theo cạnh.",
    lessonOrders: [24, 29, 37, 38],
    template: `function solution(graph) {
  const visited = Array(graph.length).fill(false)
  let components = 0

  function dfs(start) {
    const stack = [start]
    visited[start] = true

    while (stack.length) {
      const current = stack.pop()
      for (const next of graph[current]) {
        if (visited[next]) continue
        visited[next] = true
        stack.push(next)
      }
    }
  }

  for (let node = 0; node < graph.length; node++) {
    if (visited[node]) continue
    components++
    dfs(node)
  }

  return components
}`,
  },
  {
    id: "bfs",
    label: "BFS & Đường đi ngắn",
    shortLabel: "BFS",
    description: "Duyệt theo từng layer; lần đầu tới một state là số bước nhỏ nhất khi mọi cạnh cùng trọng số.",
    trigger: "Tìm số bước ít nhất trên grid/graph hoặc không gian trạng thái không trọng số.",
    lessonOrders: [27, 28, 30, 31, 36],
    template: `function bfs(start, isTarget) {
  const queue = [[start, 0]]
  const visited = new Set([key(start)])
  let head = 0

  while (head < queue.length) {
    const [current, distance] = queue[head++]
    if (isTarget(current)) return distance

    for (const next of getNext(current)) {
      const id = key(next)
      if (visited.has(id)) continue
      visited.add(id) // đánh dấu khi enqueue
      queue.push([next, distance + 1])
    }
  }

  return -1
}`,
  },
  {
    id: "dijkstra",
    label: "Dijkstra",
    shortLabel: "Dijkstra",
    description: "BFS có trọng số không âm: luôn mở rộng node đang có khoảng cách tạm thời nhỏ nhất.",
    trigger: "Shortest path nhưng cạnh có trọng số khác nhau và đều không âm.",
    lessonOrders: [32],
    template: `function dijkstra(graph, start) {
  const distance = Array(graph.length).fill(Infinity)
  const heap = new MinHeap((a, b) => a[0] - b[0])
  distance[start] = 0
  heap.push([0, start])

  while (heap.size()) {
    const [cost, current] = heap.pop()
    if (cost !== distance[current]) continue

    for (const [next, weight] of graph[current]) {
      const nextCost = cost + weight
      if (nextCost >= distance[next]) continue
      distance[next] = nextCost
      heap.push([nextCost, next])
    }
  }

  return distance
}`,
  },
  {
    id: "binary-search",
    label: "Binary Search on Answer",
    shortLabel: "Binary Search",
    description: "Nhị phân giá trị đáp án khi có predicate false…false, true…true.",
    trigger: "Hỏi giá trị nhỏ nhất/lớn nhất thỏa điều kiện và kiểm tra một đáp án nhanh hơn việc dựng đáp án.",
    lessonOrders: [26],
    template: `function solution(input) {
  let left = minimumPossible
  let right = maximumPossible

  while (left < right) {
    const mid = left + Math.floor((right - left) / 2)

    if (isFeasible(mid, input)) {
      right = mid
    } else {
      left = mid + 1
    }
  }

  return left
}`,
  },
  {
    id: "dynamic-programming",
    label: "Dynamic Programming",
    shortLabel: "DP",
    description: "Lưu kết quả bài toán con để mỗi state chỉ được tính một lần.",
    trigger: "Đáp án hiện tại phụ thuộc vài state nhỏ hơn lặp đi lặp lại; có base case và thứ tự tính rõ ràng.",
    lessonOrders: [33, 34],
    template: `function solution(input) {
  const dp = createTable(input)
  setBaseCases(dp)

  for (const state of statesInDependencyOrder(input)) {
    if (isBlocked(state)) continue
    dp[state] = combine(
      ...previousStates(state).map(prev => dp[prev])
    )
  }

  return readAnswer(dp)
}`,
  },
];

export const algorithmByLessonOrder = new Map(
  final36Algorithms.flatMap((algorithm) =>
    algorithm.lessonOrders.map((order) => [order, algorithm] as const),
  ),
);
