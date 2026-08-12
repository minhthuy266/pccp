class Heap {
  constructor(compare = (a, b) => a - b) { this.data = []; this.compare = compare; }
  size() { return this.data.length; }
  peek() { return this.data[0]; }
  push(value) {
    this.data.push(value);
    for (let child = this.data.length - 1; child > 0;) {
      const parent = Math.floor((child - 1) / 2);
      if (this.compare(this.data[parent], this.data[child]) <= 0) break;
      [this.data[parent], this.data[child]] = [this.data[child], this.data[parent]];
      child = parent;
    }
  }
  pop() {
    if (this.data.length === 0) return undefined;
    const root = this.data[0];
    const last = this.data.pop();
    if (this.data.length > 0) {
      this.data[0] = last;
      for (let parent = 0;;) {
        let best = parent;
        const left = parent * 2 + 1, right = left + 1;
        if (left < this.data.length && this.compare(this.data[left], this.data[best]) < 0) best = left;
        if (right < this.data.length && this.compare(this.data[right], this.data[best]) < 0) best = right;
        if (best === parent) break;
        [this.data[parent], this.data[best]] = [this.data[best], this.data[parent]];
        parent = best;
      }
    }
    return root;
  }
}

function topKLargest(values, k) {
  if (k <= 0) return [];
  const heap = new Heap();
  for (const value of values) { heap.push(value); if (heap.size() > k) heap.pop(); }
  const result = [];
  while (heap.size()) result.push(heap.pop());
  return result.reverse();
}

function shortestJobOrder(jobs) {
  const ordered = jobs.map(([id, arrival, duration], index) => ({ id, arrival, duration, index }))
    .sort((a, b) => a.arrival - b.arrival || a.index - b.index);
  const ready = new Heap((a, b) => a.duration - b.duration || a.arrival - b.arrival || a.index - b.index);
  const result = [];
  let pointer = 0, time = 0;
  while (pointer < ordered.length || ready.size()) {
    if (!ready.size() && time < ordered[pointer].arrival) time = ordered[pointer].arrival;
    while (pointer < ordered.length && ordered[pointer].arrival <= time) ready.push(ordered[pointer++]);
    const job = ready.pop();
    time += job.duration;
    result.push(job.id);
  }
  return result;
}

function minimumClosedStabbingPoints(intervals) {
  const sorted = [...intervals].sort((a, b) => a[1] - b[1]);
  let point = -Infinity, count = 0;
  for (const [start, end] of sorted) if (point < start) { point = end; count++; }
  return count;
}

function minimumBoats(weights, limit) {
  const sorted = [...weights].sort((a, b) => a - b);
  let left = 0, right = sorted.length - 1, boats = 0;
  while (left <= right) {
    if (left < right && sorted[left] + sorted[right] <= limit) left++;
    right--; boats++;
  }
  return boats;
}

function chooseEngine({ dynamicPriority, overlappingSubproblems, exchangeProof }) {
  if (dynamicPriority) return "HEAP";
  if (exchangeProof) return "GREEDY";
  if (overlappingSubproblems) return "DP";
  return "SEARCH_OR_MORE_PROOF";
}

module.exports = { Heap, chooseEngine, minimumBoats, minimumClosedStabbingPoints, shortestJobOrder, topKLargest };
