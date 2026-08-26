const getParentIndex = (index) => {
  let parentIndex;

  parentIndex = Math.floor((index - 1) / 2);
  return parentIndex;
};

console.log("getParentIndex(1)", getParentIndex(6));

const swap = (heap, i, j) => {
  let temp;
  temp = heap[i];
  heap[i] = heap[j];
  heap[j] = temp;

  return [heap[i], heap[j]];
};

// const pushMinHeap = (heap, value) => {
//   // 1. Thêm value vào cuối
//   heap.push(value);

//   // 2. Lấy index cuối
//   let index = heap.length - 1;

//   // 3. Khi phần tử chưa lên gốc
//   while (index > 0) {
//     // 4. Tìm cha
//     const parentIndex = getParentIndex(index);

//     // 5. Nếu cha đã ≤ con thì dừng
//     if (heap[parentIndex] <= heap[index]) {
//       break;
//     }

//     // 6. Đổi cha và con
//     swap(heap, parentIndex, index);

//     // 7. Đi lên vị trí cha
//     index = parentIndex;
//   }

//   return heap;
// };

// const heap = [];

// pushMinHeap(heap, 7);
// pushMinHeap(heap, 4);
// pushMinHeap(heap, 9);
// pushMinHeap(heap, 2);
// pushMinHeap(heap, 6);
// pushMinHeap(heap, 8);
// pushMinHeap(heap, 5);

// console.log("SWAP", swap([7, 4], 0, 1));
// console.log("PUSH MIN HEAP", heap);

// const getLeftChildIndex = (index) => {
//   let leftIndex;
//   leftIndex = index * 2 + 1;
//   return leftIndex;
// };

// const getRightChildIndex = (index) => {
//   let rightIndex;
//   rightIndex = index * 2 + 2;
//   return rightIndex;
// };

// const popMinHeap = (heap) => {
//   // Trường hợp 1: heap rỗng
//   if (heap.length === 0) {
//     return undefined;
//   }

//   // Trường hợp 2: chỉ có một phần tử
//   if (heap.length === 1) {
//     return heap.pop();
//   }

//   // Lưu số nhỏ nhất ở gốc
//   const min = heap[0];
//   // Lấy phần tử cuối và đưa lên gốc
//   const last = heap.pop();
//   heap[0] = last;

//   // Bắt đầu bubble down từ gốc
//   let index = 0;

//   while (true) {
//     const leftIndex = getLeftChildIndex(index);

//     const rightIndex = getRightChildIndex(index);

//     // Nếu không có con trái
//     // thì chắc chắn cũng không có con phải
//     if (leftIndex >= heap.length) {
//       break;
//     }

//     // Tạm chọn con trái
//     let smallerChildIndex = leftIndex;

//     // Nếu có con phải và con phải nhỏ hơn con trái
//     if (rightIndex < heap.length && heap[rightIndex] < heap[leftIndex]) {
//       // TODO 5: chọn con phải
//       smallerChildIndex = rightIndex;
//     }

//     // Nếu cha đã nhỏ hơn hoặc bằng đứa con nhỏ hơn
//     if (heap[index] <= heap[smallerChildIndex]) {
//       break;
//     }

//     // Đổi cha với đứa con nhỏ hơn
//     // TODO 6
//     swap(heap, index, smallerChildIndex);

//     // Di chuyển xuống vị trí vừa đổi
//     // TODO 7
//     index = smallerChildIndex;
//   }

//   return min;
// };

// const heap1 = [2, 4, 5, 7, 6, 9, 8];

// const min = popMinHeap(heap1);

// console.log(min);
// // 2

// console.log(heap1);
// [4, 6, 5, 7, 8, 9]

// tạo một khuôn tên là Heap.
// class Heap {
//     // hàm tự chạy khi viết new Heap(...)
//     constructor(compare) {
//         // mỗi heap có một mảng để chứa dữ liệu.
//         this.heap = []
//         // ưu quy tắc ưu tiên
//         this.compare = compare
//     }
// }

// const minHeap = new Heap((a, b) => a - b);
// console.log(minHeap.heap); // []
// console.log(minHeap.compare(2, 7)); // -5

// class Heap {
//   constructor(compare) {
//     this.heap = [];
//     this.compare = compare;
//   }

//   get size() {
//     return this.heap.length;
//   }

//   peek() {
//     return this.heap[0];
//   }

//   swap(i, j) {
//     const temp = this.heap[i];
//     this.heap[i] = this.heap[j];
//     this.heap[j] = temp;
//   }

//   push(value) {
//     // Thêm cuối
//     this.heap.push(value);

//     // Lấy index cuối này
//     let index = this.heap.length - 1;

//     while (index > 0) {
//       const parentIndex = Math.floor((index - 1) / 2);

//       if (this.compare(this.heap[index], this.heap[parentIndex]) >= 0) {
//         break;
//       }

//       this.swap(index, parentIndex)

//       index = parentIndex
//     }
//   }

// //   push (value) {
// //     this.heap.push(value)

// //     let index = this.heap.length - 1

// //     while (index > 0) {
// //         const parentIndex = Math.floor((index - 1) / 2)
// //         if (this.compare(this.heap[index], this.heap[parentIndex]) >= 0) {
// //             break;
// //         }

// //         this.swap(index, parentIndex)
// //         index = parentIndex
// //     }
// //   }

// //   push (value) {
// //     // Đầu tiên phải push vào cuối đã

// //     this.heap.push(value)

// //     // Sau đó lấy index của value mới push vào

// //     let index = this.heap.length - 1

// //     // Loop đến khi index = 0 thì thôi

// //     while (index > 0) {
// //         // Lấy parent của index này
// //         let parentIndex = Math.floor((index - 1) / 2)

// //         // Nếu index >= thằng cha của nó thì không phải loop nữa
// //         if (this.compare(this.heap[index], this.heap[parentIndex]) >= 0) {
// //             break;
// //         }

// //         // ELSE đổi chỗ 2 thắng
// //         this.swap(index, parentIndex)
        
// //         // Cập nhật thằng index hiện tại, để vòng loop được tiếp tục
// //         index = parentIndex
// //     }
// //   }

// //   push (value) {
// //     // Đầu tiên phải push vào cuối đã

// //     this.heap.push(value)

// //     // Lấy index của thằng mới thêm vào này

// //     let index = this.heap.length - 1

// //     // Loop nó nhiều lần khi nó không phải index = 0 (gốc)

// //     while (index > 0) {
// //         // Lấy index của thằng parent
// //         const parentIndex = Math.floor((index - 1) / 2)

// //         // So sánh giá trị của con với giá trị của cha
// //         if (this.compare(this.heap[index], this.heap[parentIndex]) >= 0) {
// //             break;
// //         }

// //         // ELSE
// //         this.swap(index, parentIndex)

// //         index = parentIndex
// //     }
// //   }


//   pop () {
//     // Nếu this.heap.length === 0 thì trả về undefined
//     if (this.heap.length === 0) return undefined

//     // Nếu Heap có đúng 1 phần tử thì xóa và trả về phần tử đó
//     if (this.heap.length === 1) return this.heap.pop()

//     // Lưu GIÁ TRỊ ở gốc vào biến top. Đây là kết quả sẽ trả về cuối cùng
//     let top = this.heap[0]
    
//     // Xóa phần tử cuối rồi đưa phần tử cuối đó lên thay gốc
//     let last = this.heap.pop()
//     this.heap[0] = last
    
//     // Bắt đầu xét từ index = 0
//     let index = 0
    
//     while (true) {
//        const leftIndex = (index * 2) + 1
//        const rightIndex = (index * 2) + 2

//        let bestIndex = index

//        if (leftIndex < this.heap.length && this.compare(this.heap[leftIndex], this.heap[bestIndex]) < 0) {
//             bestIndex = leftIndex
//        }

//         if (rightIndex < this.heap.length && this.compare(this.heap[rightIndex], this.heap[bestIndex]) < 0) {
//             bestIndex = rightIndex
//         }

//         if (bestIndex === index) {
//             break;
//         }

//         this.swap(index, bestIndex)
//         index = bestIndex
//     }
    
//     // Lặp liên tục:
//         // Tìm index con trái và con phải

//         // Ban đầu chọn index hiện tại là tốt nhất

//         // Nếu tồn tại con trái và con trái tốt hơn
//         // thì chọn index con trái

//         // Nếu tồn tại con phải và con phải tốt hơn
//         // phần tử đang được chọn
//         // thì chọn index con phải

//         // Nếu index hiện tại vẫn tốt nhất
//         // thì dừng vòng lặp

//         // Nếu một đứa con tốt hơn
//         // thì đổi index hiện tại với index đứa con đó

//         // Cập nhật index thành index đứa con vừa đổi
//         // để tiếp tục đi xuống

//     // Trả về top
//     return top
//   }

//   pop () {
//     if (this.heap.length === 0) return undefined

//     if (this.heap.length === 1) return this.heap.pop()

//     const top = this.heap[0]
//     const last = this.heap.pop()

//     this.heap[0] = last
//     let index = 0

//     while (true) {
//         const leftIndex = index * 2 + 1
//         const rightIndex = index * 2 + 2
//         let bestIndex = index

//         if (leftIndex < this.heap.length && this.compare(this.heap[leftIndex], this.heap[bestIndex]) < 0) {
//             bestIndex = leftIndex
//         }

//         if (rightIndex < this.heap.length && this.compare(this.heap[rightIndex], this.heap[bestIndex]) < 0) {
//             bestIndex = rightIndex
//         }

//         if (bestIndex === index) {
//             break;
//         }

//         this.swap(index, bestIndex)
//         index = bestIndex

//     }



//     return top
//   }
// }

// const heapNew = new Heap((a, b) => a - b);

// console.log(heapNew.size); // 0

// heapNew.push(7);
// heapNew.push(4);
// heapNew.push(9);
// heapNew.push(2);
// heapNew.push(6);
// heapNew.push(8);
// heapNew.push(5);

// console.log(heapNew.size); // 1
// console.log(heapNew.peek()); // 7

// // heapNew.swap(0, 1);

// console.log(heapNew.heap); // [4, 7]

// const heapPop = new Heap((a, b) => a - b);

// [7, 4, 9, 2, 6, 8, 5].forEach(
//   value => heapPop.push(value)
// );

// console.log(heapPop.pop());  // 2
// console.log(heapPop.peek()); // 4

// console.log(heapPop.pop());  // 4
// console.log(heapPop.peek()); // 5

class MinHeap {
        constructor (compare) {
            this.heap = []
            this.compare = compare
        }

        get size() {
            return this.heap.length
        }

        peek() {
            return this.heap[0]
        }

        swap(i, j) {
            let temp = this.heap[i]
            this.heap[i] = this.heap[j]
            this.heap[j] = temp
        }

        push (value) {
            this.heap.push(value)
            let index = this.heap.length - 1
            
            while (index > 0) {
                let parentIndex = Math.floor((index - 1) / 2)

                if (this.compare(this.heap[index], this.heap[parentIndex]) >= 0) {
                    break;
                }

                this.swap(index, parentIndex)
                index = parentIndex
            }
        }

        pop() {
          if (this.heap.length === 0) return undefined

          if (this.heap.length === 1) return this.heap.pop()

          const top = this.heap[0]
          let last = this.heap.pop()

          this.heap[0] = last
          let index = 0

          while (true) {
            const leftIndex = index * 2 + 1
            const rightIndex = index * 2 + 2

            let bestIndex = index

            if (leftIndex < this.heap.length && this.compare(this.heap[leftIndex], this.heap[bestIndex]) < 0) {
              bestIndex = leftIndex
            }

            if (rightIndex < this.heap.length && this.compare(this.heap[rightIndex], this.heap[bestIndex]) < 0) {
              bestIndex = rightIndex
            }

            if (bestIndex === index) {
              break;
            }

            this.swap(index, bestIndex)
            index = bestIndex
          }


          return top
        }
    }

const solutionCay = (scoville, k) => {
    const newHeap = new MinHeap((a, b) => (a - b))

    for (const item of scoville) {
      newHeap.push(item)
    }

    let count = 0

    while (newHeap.peek() < k) {
      if (newHeap.size < 2) {
        return -1
      }

      const first = newHeap.pop()
      const second = newHeap.pop()

      const mixed = first + second * 2
      newHeap.push(mixed)
      count++
    }

    return count

    newHeap.push(7)
    newHeap.push(4)
    newHeap.push(2)
    newHeap.push(1)

    console.log("MIN HEAP", newHeap)

    newHeap.pop()
    console.log("MIN HEAP", newHeap)

    newHeap.pop()
    console.log("MIN HEAP", newHeap)
}

console.log("======", solutionCay([[1, 2, 3, 9, 10, 12]], 8))

const solutionJob = (jobs) => {
  let answer = 0

  const mappedJobs = jobs.map(([request, duration], index) => {
    return (
      {
        request,
        duration,
        index
      }
    )
  })

  const sortedJobs = mappedJobs.sort((a, b) => a.request - b.request)

  console.log("++++++", mappedJobs, sortedJobs)

  const heap = new MinHeap((a, b) => {
    if (a.duration !== b.duration) {
      return a.duration - b.duration
    }

    if (a.request !== b.request) {
      return a.request - b.request
    }

    return a.index - b.index
  })

  let currentTime = 0
  let nextIndex = 0
  let completedCount = 0

  while (completedCount < sortedJobs.length) {
    while (nextIndex < sortedJobs.length && sortedJobs[nextIndex].request <= currentTime) {
      heap.push(sortedJobs[nextIndex])
      nextIndex++
    }

    if (heap.size === 0) {
      currentTime = sortedJobs[nextIndex].request
      continue;
    }

    const job = heap.pop()

    currentTime += job.duration
    answer += currentTime - job.request
    completedCount++
  }

  answer = Math.floor(answer / jobs.length)


  return answer

}

console.log("solutionJob", solutionJob([[0, 3], [1, 9], [3, 5]]))