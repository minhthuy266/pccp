class MinHeap {
  constructor(values = []) {
    this.values = [];
    for (const value of values) this.push(value);
  }

  get size() {
    return this.values.length;
  }

  peek() {
    return this.values[0];
  }

  push(value) {
    const heap = this.values;
    heap.push(value);
    let child = heap.length - 1;

    while (child > 0) {
      const parent = Math.floor((child - 1) / 2);
      if (heap[parent] <= heap[child]) break;
      [heap[parent], heap[child]] = [heap[child], heap[parent]];
      child = parent;
    }
  }

  pop() {
    const heap = this.values;
    if (heap.length === 0) return undefined;
    if (heap.length === 1) return heap.pop();

    const minimum = heap[0];
    heap[0] = heap.pop();
    let parent = 0;

    while (true) {
      const left = parent * 2 + 1;
      const right = left + 1;
      let smallest = parent;

      if (left < heap.length && heap[left] < heap[smallest]) smallest = left;
      if (right < heap.length && heap[right] < heap[smallest]) smallest = right;
      if (smallest === parent) break;

      [heap[parent], heap[smallest]] = [heap[smallest], heap[parent]];
      parent = smallest;
    }

    return minimum;
  }
}

function minimumScovilleMixes(scoville, target) {
  const heap = new MinHeap(scoville);
  let mixes = 0;

  while (heap.size > 0 && heap.peek() < target) {
    if (heap.size < 2) return -1;
    const least = heap.pop();
    const secondLeast = heap.pop();
    heap.push(least + secondLeast * 2);
    mixes++;
  }

  return mixes;
}

module.exports = { MinHeap, minimumScovilleMixes };
