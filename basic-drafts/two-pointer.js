// // Sắp xếp tăng dần
// // const ascending = [...numbers].sort((a, b) => a - b)

// const records = [
//   { score: 100, index: 1 },
//   { score: 100, index: 3 },
//   { score: 90, index: 0 },
//   { score: 90, index: 2 },
// ]

// records.sort((a, b) => {
//     if (a.score !== b.score) return b.score - a.score;
//     return a.index - b.index
// })

// console.log("RECORD", records)

// const twoSum = (sorted, target) => {
//   let left = 0;
//   let right = sorted.length - 1;

//   while (left < right) {
//     let sum = sorted[left] + sorted[right];

//     if (sum === target) return [sorted[left], sorted[right]];
//     if (sum < target) {
//       left++;
//     } else {
//       right--;
//     }
//   }

//   return null;
// };

// console.log(twoSum([2, 5, 8, 9], 7));

// function solution(values, k) {
//   // Tạo Map, left, best
//   let count = new Map()
//   let left = 0
//   let best = 0

//   for (let right = 0; right < values.length; right++) {
//     const entering = values[right]
//     const enteringOldCount = count.get(entering) ?? 0
//     count.set(entering, enteringOldCount + 1)

//     while (count.size > k) {
//       const leaving = values[left]
//       const leavingOldCount = count.get(leaving) ?? 0
//       const remaining = leavingOldCount - 1

//       if (remaining === 0) {
//         count.delete(leaving)
//       } else {
//         count.set(leaving, remaining)
//       }

//       left++
//     }

//     const currentLength = right - left + 1
//     best = Math.max(best, currentLength)
//   }

//   return best

  

//   // Cho right chạy qua mảng
//     // Lấy phần tử đi vào
//     // Tăng count

//     // Trong khi quá k loại
//       // Lấy phần tử đi ra
//       // Giảm count
//       // Hết thì delete, còn thì set
//       // Tăng left

//     // Tính độ dài và cập nhật best

//   // Trả về best
// }


// console.log(solution(['A','B','C','A','D','A'], 2))


const solutionDiscount = (want, number, discount) => {
   let answer = 0;
   const WINDOW_COUNT = 10

  for (let start = 0; start <= discount.length - WINDOW_COUNT; start++) {
    const windowCount = new Map();

    for (let day = start; day < start + WINDOW_COUNT; day++) {
      const product = discount[day]
      const oldCount = windowCount.get(product) ?? 0
      windowCount.set(product, oldCount + 1)
    }

    let isValid = true;

    for (let i = 0; i < want.length; i++) {
      const product = want[i]
      const requiredCount = number[i]
      
      const actualCount = windowCount.get(product) ?? 0

      if (actualCount !== requiredCount) {
        isValid = false
        break
      }
    }

    if (isValid) {
      answer++;
    }
  }

  return answer;
}


console.log(solutionDiscount(["banana", "apple", "rice", "pork", "pot"], [3, 2, 2, 2, 1], ["chicken", "apple", "apple", "banana", "rice", "apple", "pork", "banana", "pork", "rice", "pot", "banana", "apple", "banana"]))