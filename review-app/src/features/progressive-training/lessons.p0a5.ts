import { defineSixLevelLesson } from "./lessonFactory";
import type { ProgressiveLesson, TransferChallenge } from "./types";

const heapClass = `class BinaryHeap {
  constructor(compare) { this.data = []; this.compare = compare; }
  get size() { return this.data.length; }
  peek() { return this.data[0]; }
  push(value) {
    const heap = this.data;
    heap.push(value);
    let child = heap.length - 1;
    while (child > 0) {
      const parent = Math.floor((child - 1) / 2);
      if (this.compare(heap[parent], heap[child]) <= 0) break;
      [heap[parent], heap[child]] = [heap[child], heap[parent]];
      child = parent;
    }
  }
  pop() {
    const heap = this.data;
    if (!heap.length) return undefined;
    const root = heap[0];
    const last = heap.pop();
    if (heap.length) {
      heap[0] = last;
      let parent = 0;
      while (true) {
        const left = parent * 2 + 1;
        const right = left + 1;
        let best = parent;
        if (left < heap.length && this.compare(heap[left], heap[best]) < 0) best = left;
        if (right < heap.length && this.compare(heap[right], heap[best]) < 0) best = right;
        if (best === parent) break;
        [heap[parent], heap[best]] = [heap[best], heap[parent]];
        parent = best;
      }
    }
    return root;
  }
}`;

const scovilleSolution = `${heapClass}
function minimumScovilleMixes(scoville, target) {
  const heap = new BinaryHeap((a, b) => a - b);
  for (const value of scoville) heap.push(value);
  let mixes = 0;
  while (heap.size && heap.peek() < target) {
    if (heap.size < 2) return -1;
    const least = heap.pop();
    const second = heap.pop();
    heap.push(least + second * 2);
    mixes += 1;
  }
  return mixes;
}`;

const scovilleTests = [
  { label: "official sample", expression: "minimumScovilleMixes([1,2,3,9,10,12],7)", expected: "2" },
  { label: "already enough", expression: "minimumScovilleMixes([7,8],7)", expected: "0" },
  { label: "impossible singleton", expression: "minimumScovilleMixes([1],7)", expected: "-1" },
  { label: "duplicate minima", expression: "minimumScovilleMixes([1,1,1],5)", expected: "2" },
];

const maxHeapSolution = `${heapClass}
function popDescending(values) {
  const heap = new BinaryHeap((a, b) => b - a);
  for (const value of values) heap.push(value);
  const answer = [];
  while (heap.size) answer.push(heap.pop());
  return answer;
}`;

const mergeCostSolution = `${heapClass}
function minimumMergeCost(values) {
  const heap = new BinaryHeap((a, b) => a - b);
  for (const value of values) heap.push(value);
  let cost = 0;
  while (heap.size > 1) {
    const merged = heap.pop() + heap.pop();
    cost += merged;
    heap.push(merged);
  }
  return cost;
}`;

const scovilleChallenges: TransferChallenge[] = [
  {
    kind: "DEBUG", id: "debug-missing-reinsert", title: "Debug pop nhưng không reinsert",
    change: "Sau khi trộn, multiset mới phải chứa món combined; nếu không invariant của heap state bị mất.", functionSignature: "minimumScovilleMixes(scoville, target)",
    starterCode: scovilleSolution.replace("heap.push(least + second * 2);", "// missing reinsert of the mixed value"), solution: scovilleSolution, tests: scovilleTests,
  },
  {
    kind: "DEBUG", id: "debug-second-child", title: "Debug lấy heap[1] làm minimum thứ hai",
    change: "Sau pop đầu, heap phải restore rồi pop root lần nữa; child index 1 không luôn là minimum kế tiếp.", functionSignature: "minimumScovilleMixes(scoville, target)",
    starterCode: scovilleSolution.replace("const second = heap.pop();", "const second = heap.data[1];"), solution: scovilleSolution, tests: scovilleTests,
  },
  {
    kind: "VARIANT", id: "variant-max-heap", title: "Min heap → max heap",
    change: "Giữ nguyên push/pop mechanics, chỉ đảo comparator để root là maximum.", functionSignature: "popDescending(values)",
    starterCode: "function popDescending(values) {\n  // generic heap with reversed comparator\n}", solution: maxHeapSolution,
    tests: [
      { label: "duplicates", expression: "popDescending([3,1,4,1,5])", expected: "[5,4,3,1,1]" },
      { label: "negative", expression: "popDescending([-2,0,-1])", expected: "[0,-1,-2]" },
      { label: "empty", expression: "popDescending([])", expected: "[]" },
    ],
  },
  {
    kind: "VARIANT", id: "variant-optimal-merge", title: "Threshold transform → optimal merge cost",
    change: "Vẫn pop hai minimum và reinsert tổng, nhưng cộng từng merged value vào total cost.", functionSignature: "minimumMergeCost(values)",
    starterCode: "function minimumMergeCost(values) {\n  // repeatedly merge two minima\n}", solution: mergeCostSolution,
    tests: [
      { label: "classic", expression: "minimumMergeCost([1,2,3,4])", expected: "19" },
      { label: "single", expression: "minimumMergeCost([7])", expected: "0" },
      { label: "duplicates", expression: "minimumMergeCost([2,2,2])", expected: "10" },
    ],
  },
];

const hallSolution = `${heapClass}
function hallOfFame(k, scores) {
  if (k <= 0) return [];
  const hall = new BinaryHeap((a, b) => a - b);
  const answer = [];
  for (const score of scores) {
    hall.push(score);
    if (hall.size > k) hall.pop();
    answer.push(hall.peek());
  }
  return answer;
}`;

const hallTests = [
  { label: "official sample", expression: "hallOfFame(3,[10,100,20,150,1,100,200])", expected: "[10,10,10,20,20,100,100]" },
  { label: "fewer than k", expression: "hallOfFame(5,[7,3,9])", expected: "[7,3,3]" },
  { label: "duplicates", expression: "hallOfFame(2,[5,5,4,6])", expected: "[5,5,5,5]" },
  { label: "zero capacity", expression: "hallOfFame(0,[1,2])", expected: "[]" },
];

const topKSolution = `${heapClass}
function topKLargest(values, k) {
  if (k <= 0) return [];
  const heap = new BinaryHeap((a, b) => a - b);
  for (const value of values) {
    heap.push(value);
    if (heap.size > k) heap.pop();
  }
  const answer = [];
  while (heap.size) answer.push(heap.pop());
  return answer.reverse();
}`;

const frequentSolution = `${heapClass}
function topKFrequent(values, k) {
  if (k <= 0) return [];
  const counts = new Map();
  for (const value of values) counts.set(value, (counts.get(value) ?? 0) + 1);
  const heap = new BinaryHeap((a, b) => a.count - b.count || b.value - a.value);
  for (const [value, count] of counts) {
    heap.push({ value, count });
    if (heap.size > k) heap.pop();
  }
  const answer = [];
  while (heap.size) answer.push(heap.pop());
  return answer.sort((a, b) => b.count - a.count || a.value - b.value).map((item) => item.value);
}`;

const hallChallenges: TransferChallenge[] = [
  {
    kind: "DEBUG", id: "debug-top-k-boundary", title: "Debug pop tại size === k",
    change: "Heap được phép giữ đúng k item; chỉ pop khi size > k.", functionSignature: "hallOfFame(k, scores)",
    starterCode: hallSolution.replace("if (hall.size > k) hall.pop();", "if (hall.size >= k) hall.pop();"), solution: hallSolution, tests: hallTests,
  },
  {
    kind: "DEBUG", id: "debug-top-k-comparator", title: "Debug giữ K phần tử nhỏ nhất",
    change: "Muốn giữ K largest thì root phải là phần tử tệ nhất trong tập đang giữ: minimum.", functionSignature: "hallOfFame(k, scores)",
    starterCode: hallSolution.replace("(a, b) => a - b", "(a, b) => b - a"), solution: hallSolution, tests: hallTests,
  },
  {
    kind: "VARIANT", id: "variant-static-top-k", title: "Streaming boundary → Top K cuối cùng",
    change: "Giữ heap bounded K rồi pop toàn bộ và đảo thành descending output.", functionSignature: "topKLargest(values, k)",
    starterCode: "function topKLargest(values, k) {\n  // bounded min-heap\n}", solution: topKSolution,
    tests: [
      { label: "two largest", expression: "topKLargest([5,1,4,9,2],2)", expected: "[9,5]" },
      { label: "k exceeds n", expression: "topKLargest([3,1],5)", expected: "[3,1]" },
      { label: "zero", expression: "topKLargest([1],0)", expected: "[]" },
    ],
  },
  {
    kind: "VARIANT", id: "variant-top-k-frequent", title: "Numeric value → object priority",
    change: "Heap item mang value/count; comparator định nghĩa worst bằng frequency thấp rồi value lớn hơn.", functionSignature: "topKFrequent(values, k)",
    starterCode: "function topKFrequent(values, k) {\n  // frequency Map + bounded object heap\n}", solution: frequentSolution,
    tests: [
      { label: "frequency", expression: "topKFrequent([1,1,1,2,2,3],2)", expected: "[1,2]" },
      { label: "tie by value", expression: "topKFrequent([4,4,2,2,3],2)", expected: "[2,4]" },
      { label: "k exceeds distinct", expression: "topKFrequent([7,7],3)", expected: "[7]" },
    ],
  },
];

const diskSolution = `${heapClass}
function averageDiskTurnaround(jobs) {
  if (!jobs.length) return 0;
  const ordered = jobs.map(([request, duration], id) => ({ request, duration, id }))
    .sort((a, b) => a.request - b.request || a.id - b.id);
  const waiting = new BinaryHeap((a, b) => a.duration - b.duration || a.request - b.request || a.id - b.id);
  let next = 0;
  let completed = 0;
  let time = 0;
  let total = 0;
  while (completed < ordered.length) {
    if (!waiting.size && time < ordered[next].request) time = ordered[next].request;
    while (next < ordered.length && ordered[next].request <= time) waiting.push(ordered[next++]);
    const job = waiting.pop();
    time += job.duration;
    total += time - job.request;
    completed += 1;
  }
  return Math.floor(total / jobs.length);
}`;

const diskTests = [
  { label: "official sample", expression: "averageDiskTurnaround([[0,3],[1,9],[2,6]])", expected: "9" },
  { label: "jump initial idle", expression: "averageDiskTurnaround([[5,2],[6,1]])", expected: "2" },
  { label: "enqueue arrival batch", expression: "averageDiskTurnaround([[0,5],[1,4],[2,1]])", expected: "6" },
  { label: "empty", expression: "averageDiskTurnaround([])", expected: "0" },
];

const machinesSolution = `${heapClass}
function parallelMakespan(durations, machineCount) {
  if (!durations.length) return 0;
  if (machineCount <= 0) return -1;
  const machines = new BinaryHeap((a, b) => a.available - b.available || a.id - b.id);
  for (let id = 0; id < machineCount; id++) machines.push({ available: 0, id });
  let makespan = 0;
  for (const duration of durations) {
    const machine = machines.pop();
    machine.available += duration;
    makespan = Math.max(makespan, machine.available);
    machines.push(machine);
  }
  return makespan;
}`;

const priorityOrderSolution = `${heapClass}
function scheduledJobOrder(jobs) {
  const ordered = jobs.map(([id, request, priority], index) => ({ id, request, priority, index }))
    .sort((a, b) => a.request - b.request || a.index - b.index);
  const ready = new BinaryHeap((a, b) => b.priority - a.priority || a.request - b.request || a.index - b.index);
  const answer = [];
  let next = 0;
  let time = 0;
  while (answer.length < ordered.length) {
    if (!ready.size && time < ordered[next].request) time = ordered[next].request;
    while (next < ordered.length && ordered[next].request <= time) ready.push(ordered[next++]);
    const job = ready.pop();
    answer.push(job.id);
    time += 1;
  }
  return answer;
}`;

const diskChallenges: TransferChallenge[] = [
  {
    kind: "DEBUG", id: "debug-single-arrival", title: "Debug chỉ enqueue một job đã tới",
    change: "Trước mỗi selection phải đưa toàn bộ request <= time vào ready heap, nên cần while chứ không phải if.", functionSignature: "averageDiskTurnaround(jobs)",
    starterCode: diskSolution.replace("while (next < ordered.length && ordered[next].request <= time) waiting.push(ordered[next++]);", "if (next < ordered.length && ordered[next].request <= time) waiting.push(ordered[next++]);"), solution: diskSolution, tests: diskTests,
  },
  {
    kind: "DEBUG", id: "debug-no-idle-jump", title: "Debug không jump khoảng idle",
    change: "Khi ready heap rỗng, time phải nhảy tới request kế tiếp trước khi pop.", functionSignature: "averageDiskTurnaround(jobs)",
    starterCode: diskSolution.replace("if (!waiting.size && time < ordered[next].request) time = ordered[next].request;", "// missing idle jump"), solution: diskSolution, tests: diskTests,
  },
  {
    kind: "VARIANT", id: "variant-resource-availability", title: "Ready-job heap → resource-availability heap",
    change: "Root là resource rảnh sớm nhất; sau assignment cập nhật available time rồi reinsert resource.", functionSignature: "parallelMakespan(durations, machineCount)",
    starterCode: "function parallelMakespan(durations, machineCount) {\n  // heap of {available,id}\n}", solution: machinesSolution,
    tests: [
      { label: "two machines", expression: "parallelMakespan([4,2,3,1],2)", expected: "5" },
      { label: "more machines", expression: "parallelMakespan([5,1],3)", expected: "5" },
      { label: "no resource", expression: "parallelMakespan([1],0)", expected: "-1" },
    ],
  },
  {
    kind: "VARIANT", id: "variant-priority-ready", title: "Shortest duration → highest priority",
    change: "Arrival sweep giữ nguyên; comparator ready heap đổi sang priority giảm, rồi request/index tăng để tie deterministic.", functionSignature: "scheduledJobOrder(jobs)",
    starterCode: "function scheduledJobOrder(jobs) {\n  // arrivals + max-priority ready heap\n}", solution: priorityOrderSolution,
    tests: [
      { label: "arrivals constrain choice", expression: "scheduledJobOrder([['a',0,1],['b',0,3],['c',1,5]])", expected: "[\"b\",\"c\",\"a\"]" },
      { label: "idle jump", expression: "scheduledJobOrder([['a',3,1],['b',5,2]])", expected: "[\"a\",\"b\"]" },
      { label: "stable tie", expression: "scheduledJobOrder([['a',0,2],['b',0,2]])", expected: "[\"a\",\"b\"]" },
    ],
  },
];

export const p0a5Lessons: ProgressiveLesson[] = [
  defineSixLevelLesson({
    id: "PT-F15-SCOVILLE-HEAP", familyId: "F15", slug: "min-heap-repeated-transform", title: "Min-heap — trộn hai minimum", priority: "P0",
    basePattern: "Heap root + pop/pop/reinsert", description: "Lặp lấy hai độ cay nhỏ nhất, trộn theo công thức rồi đưa kết quả trở lại đến khi minimum đạt target.",
    constraints: ["scoville chứa số không âm", "mỗi vòng bắt buộc lấy hai minimum", "combined = least + 2*second", "impossible trả -1"],
    functionSignature: "minimumScovilleMixes(scoville, target)", officialSources: ["OF012 — Cay hơn", "PCCP Thinking Curriculum Ch.11"], status: "ACTIVE", version: 1,
    pattern: { prompt: "Liên tục cần hai minimum và chèn value mới. Chọn cấu trúc.", options: [
      { id: "heap", label: "Min-heap", explanation: "Peek/pop minimum và reinsert đều hiệu quả." },
      { id: "sort", label: "Sort lại mỗi vòng", explanation: "Đúng brute force nhưng lặp sort quá tốn." },
      { id: "queue", label: "FIFO queue", explanation: "Front không đảm bảo minimum sau reinsert." },
      { id: "stack", label: "Stack", explanation: "LIFO không biểu diễn priority." },
    ], correctOptionId: "heap" },
    blueprint: [
      { id: "STATE", label: "STATE", prompt: "State?", canonical: "min-heap chứa đúng multiset hiện tại và mixes", acceptedKeywords: [["min-heap", "mixes"], ["heap", "multiset"]] },
      { id: "HEAP", label: "HEAP INVARIANT", prompt: "Root đúng vì sao?", canonical: "parent priority <= child nên root là minimum global", acceptedKeywords: [["parent", "child", "minimum"], ["root", "nhỏ nhất"]] },
      { id: "STOP", label: "STOP", prompt: "Dừng/impossible?", canonical: "peek>=target thì xong; peek<target và size<2 thì -1", acceptedKeywords: [["peek", "target", "size"], ["2", "-1"]] },
      { id: "TRANSITION", label: "TRANSITION", prompt: "Một vòng?", canonical: "pop hai minimum, push least+2*second, tăng mixes", acceptedKeywords: [["pop", "2", "push"], ["hai", "minimum", "trộn"]] },
      { id: "INVARIANT", label: "MAIN INVARIANT", prompt: "Heap đại diện gì?", canonical: "đúng multiset sau mixes thao tác", acceptedKeywords: [["multiset", "mixes"], ["sau", "trộn"]] },
      { id: "COMPLEXITY", label: "COMPLEXITY", prompt: "Complexity?", canonical: "O(n log n) time, O(n) space", acceptedKeywords: [["n log n", "o(n)"], ["log", "heap"]] },
    ],
    logic: [
      { id: "heap", text: "Cài binary heap theo comparator" }, { id: "seed", text: "Push toàn bộ scoville vào min-heap" },
      { id: "stop", text: "Trong khi root dưới target, kiểm tra còn đủ hai item" }, { id: "pop", text: "Pop hai minimum sau mỗi lần restore heap" },
      { id: "reinsert", text: "Tính combined, push lại và tăng mixes" }, { id: "return", text: "Trả mixes khi root đã đạt target" },
    ],
    blocks: [
      { id: "heap", subgoal: "Cài generic binary heap đúng comparator", code: heapClass },
      { id: "seed", subgoal: "Khởi tạo min-heap từ input", code: `function minimumScovilleMixes(scoville,target) {\n const heap=new BinaryHeap((a,b)=>a-b);\n for (const value of scoville) heap.push(value);\n let mixes=0;` },
      { id: "loop", subgoal: "Pop hai minimum rồi reinsert combined", code: `while (heap.size&&heap.peek()<target) {\n if (heap.size<2) return -1;\n const least=heap.pop(),second=heap.pop();\n heap.push(least+second*2); mixes++;\n}` },
      { id: "return", subgoal: "Trả số lần trộn", code: `return mixes;\n}` },
    ], solution: scovilleSolution, tests: scovilleTests, challenges: scovilleChallenges,
  }),
  defineSixLevelLesson({
    id: "PT-F15-BOUNDED-TOP-K", familyId: "F15", slug: "bounded-min-heap-top-k", title: "Bounded heap — Hall of Fame Top K", priority: "P0",
    basePattern: "Keep K best; root is current worst", description: "Sau mỗi score, giữ tối đa K score lớn nhất và trả minimum hiện tại của Hall of Fame.",
    constraints: ["k là capacity", "scores được xử lý streaming theo ngày", "duplicate score được giữ", "không sort lại toàn prefix mỗi ngày"],
    functionSignature: "hallOfFame(k, scores)", officialSources: ["Programmers 138477 — Hall of Fame (1)", "PCCP corpus F15 Top K"], status: "ACTIVE", version: 1,
    pattern: { prompt: "Cần giữ K giá trị tốt nhất của prefix và biết boundary sau mỗi item. Cấu trúc?", options: [
      { id: "bounded", label: "Min-heap size K", explanation: "Root là worst trong K best, dễ replace." },
      { id: "max", label: "Max-heap size K", explanation: "Root là best nên khó loại worst." },
      { id: "sort", label: "Sort mọi prefix", explanation: "Lặp lại công việc không cần thiết." },
      { id: "set", label: "Set", explanation: "Làm mất duplicate và không có order statistic." },
    ], correctOptionId: "bounded" },
    blueprint: [
      { id: "STATE", label: "STATE", prompt: "State?", canonical: "min-heap hall chứa tối đa K score lớn nhất đã thấy", acceptedKeywords: [["min-heap", "k", "lớn nhất"], ["heap", "top k"]] },
      { id: "BOUNDARY", label: "BOUNDARY", prompt: "Root mang nghĩa gì?", canonical: "minimum trong K best, tức threshold hiện tại", acceptedKeywords: [["minimum", "k"], ["root", "threshold"]] },
      { id: "TRANSITION", label: "TRANSITION", prompt: "Mỗi score?", canonical: "push score; nếu size>K thì pop root", acceptedKeywords: [["push", "size", "pop"], ["lớn hơn", "k"]] },
      { id: "OUTPUT", label: "OUTPUT", prompt: "Mỗi ngày ghi gì?", canonical: "hall.peek sau khi enforce capacity", acceptedKeywords: [["peek", "sau"], ["root", "mỗi ngày"]] },
      { id: "INVARIANT", label: "INVARIANT", prompt: "Heap giữ gì?", canonical: "đúng min(K,prefix length) score lớn nhất của prefix", acceptedKeywords: [["prefix", "k", "lớn nhất"], ["top k", "đã thấy"]] },
      { id: "COMPLEXITY", label: "COMPLEXITY", prompt: "Complexity?", canonical: "O(n log K) time và O(K) space", acceptedKeywords: [["n log k", "o(k)"], ["log k", "space"]] },
    ],
    logic: [
      { id: "heap", text: "Cài min-heap để root là worst của tập đang giữ" }, { id: "guard", text: "Nếu K không dương, trả mảng rỗng" },
      { id: "push", text: "Push score của ngày hiện tại" }, { id: "bound", text: "Nếu size vượt K, pop đúng một root" },
      { id: "record", text: "Ghi peek sau khi capacity đã hợp lệ" }, { id: "return", text: "Trả toàn bộ daily boundaries" },
    ],
    blocks: [
      { id: "heap", subgoal: "Cài generic binary heap", code: heapClass },
      { id: "setup", subgoal: "Guard K và tạo bounded min-heap", code: `function hallOfFame(k,scores) {\n if (k<=0) return [];\n const hall=new BinaryHeap((a,b)=>a-b),answer=[];` },
      { id: "stream", subgoal: "Push, trim và record boundary mỗi ngày", code: `for (const score of scores) {\n hall.push(score);\n if (hall.size>k) hall.pop();\n answer.push(hall.peek());\n}` },
      { id: "return", subgoal: "Trả daily boundaries", code: `return answer;\n}` },
    ], solution: hallSolution, tests: hallTests, challenges: hallChallenges,
  }),
  defineSixLevelLesson({
    id: "PT-F15-EVENT-HEAP-SCHEDULING", familyId: "F15", slug: "event-ready-heap-scheduling", title: "Event + heap — Bộ điều khiển đĩa", priority: "P0",
    basePattern: "Sorted arrivals + ready heap + idle jump", description: "Nạp mọi job đã request, chọn duration ngắn nhất và tính floor average turnaround.",
    constraints: ["job=[request,duration]", "một disk, non-preemptive", "chỉ job request<=time được chọn", "turnaround=completion-request"],
    functionSignature: "averageDiskTurnaround(jobs)", officialSources: ["OF013 — Bộ điều khiển đĩa", "PCCP Thinking Curriculum Ch.11"], status: "ACTIVE", version: 1,
    pattern: { prompt: "Arrival order và selection priority khác nhau. Chọn state tổ hợp.", options: [
      { id: "event-heap", label: "Sorted events + ready heap", explanation: "Pointer xử lý arrival; heap xử lý selection." },
      { id: "fifo", label: "FIFO queue", explanation: "Không chọn được shortest duration trong waiting." },
      { id: "static", label: "Đưa mọi job vào heap ngay", explanation: "Sẽ chọn job chưa request." },
      { id: "ticks", label: "Mô phỏng từng tick", explanation: "Lãng phí khoảng idle và không giải quyết priority." },
    ], correctOptionId: "event-heap" },
    blueprint: [
      { id: "STATE", label: "STATE", prompt: "State?", canonical: "ordered arrivals, next pointer, ready heap, time, total, completed", acceptedKeywords: [["next", "heap", "time"], ["pointer", "ready", "total"]] },
      { id: "READY", label: "READY INVARIANT", prompt: "Heap chứa gì?", canonical: "mọi job request<=time chưa xử lý và không chứa future job", acceptedKeywords: [["request", "time", "chưa"], ["arrived", "future"]] },
      { id: "IDLE", label: "IDLE", prompt: "Heap rỗng?", canonical: "jump time tới next request", acceptedKeywords: [["jump", "next", "request"], ["nhảy", "thời gian"]] },
      { id: "BATCH", label: "ARRIVAL BATCH", prompt: "Nạp bao nhiêu?", canonical: "while request<=time, enqueue toàn bộ eligible jobs", acceptedKeywords: [["while", "request", "time"], ["toàn bộ", "đã đến"]] },
      { id: "TRANSITION", label: "TRANSITION", prompt: "Sau pop?", canonical: "time+=duration; total+=time-request; completed++", acceptedKeywords: [["duration", "time-request", "completed"], ["turnaround", "completion"]] },
      { id: "COMPLEXITY", label: "COMPLEXITY", prompt: "Complexity?", canonical: "O(n log n) time và O(n) space", acceptedKeywords: [["n log n", "o(n)"], ["sort", "heap"]] },
    ],
    logic: [
      { id: "heap", text: "Cài heap object theo duration/request/id" }, { id: "sort", text: "Sort arrivals và khởi tạo pointer/time/total" },
      { id: "jump", text: "Nếu ready rỗng, jump tới request kế" }, { id: "batch", text: "Nạp toàn bộ job request <= time" },
      { id: "run", text: "Pop shortest job và tiến time tới completion" }, { id: "total", text: "Cộng turnaround, tăng completed" },
      { id: "return", text: "Trả floor average sau mọi job" },
    ],
    blocks: [
      { id: "heap", subgoal: "Cài heap hỗ trợ object comparator", code: heapClass },
      { id: "setup", subgoal: "Sort arrivals và tạo ready heap/state", code: `function averageDiskTurnaround(jobs) {\n if (!jobs.length) return 0;\n const ordered=jobs.map(([request,duration],id)=>({request,duration,id})).sort((a,b)=>a.request-b.request||a.id-b.id);\n const waiting=new BinaryHeap((a,b)=>a.duration-b.duration||a.request-b.request||a.id-b.id);\n let next=0,completed=0,time=0,total=0;` },
      { id: "events", subgoal: "Jump idle và enqueue toàn bộ arrival batch", code: `while (completed<ordered.length) {\n if (!waiting.size&&time<ordered[next].request) time=ordered[next].request;\n while (next<ordered.length&&ordered[next].request<=time) waiting.push(ordered[next++]);` },
      { id: "run", subgoal: "Chọn ready job, advance và cộng turnaround", code: `const job=waiting.pop();\ntime+=job.duration; total+=time-job.request; completed++;\n}` },
      { id: "return", subgoal: "Trả floor average", code: `return Math.floor(total/jobs.length);\n}` },
    ], solution: diskSolution, tests: diskTests, challenges: diskChallenges,
  }),
];
