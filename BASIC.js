const solution = (array1, array2) => {
    const sumArray = []

    for(let row = 0; row < array1.length; row++) {
        sumArray[row] = []

        for(let col = 0; col < array1[row].length; col++) {
            sumArray[row][col] = array1[row][col] + array2[row][col]
        }
    }

    return sumArray
}

console.log(solution([[1, 2], [2, 3]], [[3, 4], [5, 6]]))


// 1. Duyệt ma trận
// for(let row = 0; row < matrix.length; row++) {
//     for(let col = 0; col < matrix[row].length; col++){
//         console.log(matrix[row][col])
//     }
// }

// Câu 1

// Duyệt và in toàn bộ phần tử:

// const matrix = [
//     [1, 2, 3],
//     [4, 5, 6]
// ]

const printMatrix = (matrix) => {
    let sum = 0
    for(let row = 0; row < matrix.length; row++) {
        for(let col = 0; col < matrix[row].length; col++) {
            console.log(matrix[row][col])
            sum = sum + matrix[row][col]
        }
    }
    
    console.log(sum)
    return sum
}

printMatrix([[1, 2, 3], [4, 5, 6]])


// Câu 3

// Tạo ma trận mới trong đó mỗi phần tử được nhân đôi:

// [
//     [2, 4, 6],
//     [8, 10, 12]
// ]

const multipleMatrix = (matrix) => {
    let newMatrix = []

    for(let row = 0; row < matrix.length; row++) {
        newMatrix[row] = []

        for(let col = 0; col < matrix[row].length; col++) {
            newMatrix[row][col] = 2 * matrix[row][col]
        }
    }

    return newMatrix
}

console.log(multipleMatrix([[1, 2], [2, 3]]))


const addTenMatrix = (matrix) => {
    let newMatrix = []

    for(let row = 0; row < matrix.length; row++){
        newMatrix[row] = []

        for(let col = 0; col < matrix[row].length; col++) {
            newMatrix[row][col] = matrix[row][col] + 10
        }
    }

    return newMatrix;
}

console.log(addTenMatrix([[1, 2], [2, 3]]))

const solutionTriangle = (n) => {
    const triangle = []

    for(let row = 0; row < n; row++) {
        triangle[row] = Array(row + 1).fill(0)
    }

    let row = -1
    let col = 0
    let number = 1

    for(let direction = 0; direction < n; direction++) {
        const moveCount = n - direction

        for(let step = 0; step < moveCount; step++) {
            if(direction % 3 === 0) {
                row++
            } else if(direction % 3 === 1) {
                col++
            } else if(direction % 3 === 2) {
                row--
                col--
            }

            triangle[row][col] = number

            number++
        }
    }

    return triangle
}

console.log(solutionTriangle(4))


const twoSum = (nums, target) => {
    const map = new Map()

    for(let i = 0; i < nums.length; i++){
        const current = nums[i]
        const needed = target - nums[i]

        if(map.has(needed)) {
            return [map.get(needed), i]
        }

        map.set(current, i);
    }

    return []
}

console.log("TWO SUM", twoSum([2,5,6,8], 7))

// [2, 5, 11, 15]

const twoSumPointer = (array, target) => {
    let left = 0
    let right = array.length - 1

    while(left < right) {
        let sum = array[left] + array[right]

        if(sum === target){
            return [left, right]
        }

        if(sum < target) {
            left++
        } else {
            right--
        }
    }

    return []
}

console.log("TWO SUM POINTER", twoSumPointer([2, 5, 11, 15], 17))

const twoSumValue = (array, target) => {
    const map = new Map()

    for(let i = 0; i < array.length; i++) {
        const current = array[i]
        const needed = target - current

        if(map.has(needed)) {
            return [map.get(needed), current]
        }

        map.set(current, array[i])
    }

    return []
}

console.log("TWO SUM", twoSumValue([2,5,6,8], 10))

const hasTwoSum = (array, target) => {
    const set = new Set()

    for(let i = 0; i < array.length; i++){
        const current = array[i]
        const needed = target - current

        if(set.has(needed)) {
            return true
        }

        set.add(current)

    }

    return false;
}

console.log("TWO SUM", hasTwoSum([2,5,6,8], 10))

const removeDuplicate = (array) => {
  const set = new Set(array);
  const newArray = [...set];

  return newArray;
};

console.log(
  "REMOVE DUPLICATE",
  removeDuplicate([1, 2, 4, 5, 5, 10, 10])
);

const removeDuplicatePointer = (array) => {
    let write = 0
    for(let read = 1; read < array.length; read++) {
        if(array[read] !== array[write]) {
            write++
            array[write] = array[read]
        }
    }
    
    return array.slice(0, write + 1);
}

console.log(
  "REMOVE DUPLICATE",
  removeDuplicatePointer([1, 2, 4, 5, 5, 10, 10])
);


// [0, 1, 0, 3, 12]

const solutionNew = (n) => {
    const triangle = Array.from({length: n}, (_, row) => Array(row + 1).fill(0))
    
    const dr = [1, 0, -1]
    const dc = [0, 1, -1]

    let row = -1
    let col = 0
    let number = 1
    let direction = 0


    for(let segmentLength = n; segmentLength > 0; segmentLength--){
        for(let step = 0; step < segmentLength; step++) {
            row = row + dr[direction]
            col = col + dc[direction]

            triangle[row][col] = number++
        }

        direction = (direction + 1) % 3;
    }

    console.log("=======", triangle.flat())

    return triangle.flat();
}

solutionNew(4)