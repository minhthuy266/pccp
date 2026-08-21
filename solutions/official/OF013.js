class JobMinHeap {
  constructor() {
    this.values = [];
  }
  get size() {
    return this.values.length;
  }
  compare(first, second) {
    return first.duration - second.duration || first.request - second.request;
  }
  push(job) {
    const heap = this.values;
    heap.push(job);
    let child = heap.length - 1;
    while (child > 0) {
      const parent = Math.floor((child - 1) / 2);
      if (this.compare(heap[parent], heap[child]) <= 0) {
        break;
      }
      [heap[parent], heap[child]] = [heap[child], heap[parent]];
      child = parent;
    }
  }
  pop() {
    const heap = this.values;
    if (heap.length === 1) {
      return heap.pop();
    }
    const minimum = heap[0];
    heap[0] = heap.pop();
    let parent = 0;
    while (true) {
      const left = parent * 2 + 1;
      const right = left + 1;
      let smallest = parent;
      if (left < heap.length && this.compare(heap[left], heap[smallest]) < 0) {
        smallest = left;
      }
      if (right < heap.length && this.compare(heap[right], heap[smallest]) < 0) {
        smallest = right;
      }
      if (smallest === parent) {
        break;
      }
      [heap[parent], heap[smallest]] = [heap[smallest], heap[parent]];
      parent = smallest;
    }
    return minimum;
  }
}

function averageDiskTurnaround(jobs) {
  const ordered = jobs
    .map(([request, duration]) => ({ request, duration }))
    .sort((a, b) => a.request - b.request);
  const waiting = new JobMinHeap();
  let next = 0;
  let completed = 0;
  let time = 0;
  let totalTurnaround = 0;

  while (completed < ordered.length) {
    if (waiting.size === 0 && next < ordered.length && time < ordered[next].request) {
      time = ordered[next].request;
    }

    while (next < ordered.length && ordered[next].request <= time) {
      waiting.push(ordered[next]);
      next += 1;
    }

    const job = waiting.pop();
    time += job.duration;
    totalTurnaround += time - job.request;
    completed += 1;
  }

  return Math.floor(totalTurnaround / jobs.length);
}

module.exports = { JobMinHeap, averageDiskTurnaround };
