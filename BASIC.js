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
