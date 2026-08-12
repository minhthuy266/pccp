class NumericHeap {
  constructor(compare) {
    this.values = [];
    this.compare = compare;
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
      if (this.compare(heap[parent], heap[child]) <= 0) break;
      [heap[parent], heap[child]] = [heap[child], heap[parent]];
      child = parent;
    }
  }
  pop() {
    const heap = this.values;
    if (heap.length === 0) return undefined;
    if (heap.length === 1) return heap.pop();
    const root = heap[0];
    heap[0] = heap.pop();
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
    return root;
  }
}

function doublePriorityQueue(operations) {
  const minHeap = new NumericHeap((a, b) => a.value - b.value);
  const maxHeap = new NumericHeap((a, b) => b.value - a.value);
  const alive = [];
  let liveCount = 0;
  let nextId = 0;

  function clean(heap) {
    while (heap.size > 0 && !alive[heap.peek().id]) heap.pop();
  }

  for (const operation of operations) {
    const [command, rawValue] = operation.split(" ");
    const value = Number(rawValue);

    if (command === "I") {
      const entry = { value, id: nextId++ };
      alive[entry.id] = true;
      minHeap.push(entry);
      maxHeap.push(entry);
      liveCount++;
      continue;
    }

    if (liveCount === 0) continue;
    const heap = value === 1 ? maxHeap : minHeap;
    clean(heap);
    const removed = heap.pop();
    alive[removed.id] = false;
    liveCount--;
  }

  if (liveCount === 0) return [0, 0];
  clean(minHeap);
  clean(maxHeap);
  return [maxHeap.peek().value, minHeap.peek().value];
}

module.exports = { NumericHeap, doublePriorityQueue };
