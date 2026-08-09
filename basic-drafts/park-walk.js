function walkParkV1(park, routes) {
  // Bước 1: Tìm tọa độ bắt đầu S trong công viên.
  // Bước 2: Đổi mỗi route thành hướng và số bước.
  // Bước 3: Đi thử; chỉ cập nhật vị trí thật nếu cả route hợp lệ.
  const rowCount = park.length;
  const colCount = park[0].length;

  // 1. Tìm S
  let row = 0;
  let col = 0;

  for (let r = 0; r < park.length; r++) {
    for (let c = 0; c < park[0].length; c++) {
      if (park[r][c] === "S") {
        row = r;
        col = c;
      }
    }
  }

  // 2. Bảng hướng
  const directions = {
    // Mày tự điền N, E, S, W
    N: [-1, 0],
    E: [0, 1],
    S: [1, 0],
    W: [0, -1],
  };

  for (const route of routes) {
    const [op, distanceText] = route.split(" ");
    const distance = Number(distanceText);
    const [dr, dc] = directions[op];

    let nextRow = row;
    let nextCol = col;
    let isValid = true;

    for (let step = 0; step < distance; step++) {
      nextRow = nextRow + dr;
      nextCol = nextCol + dc;

      const isOutOfBounds =
        nextRow < 0 ||
        nextRow >= park.length ||
        nextCol < 0 ||
        nextCol >= park[0].length;

      if (isOutOfBounds || park[nextRow][nextCol] === "X") {
        isValid = false;
        break;
      }
    }

    if (isValid) {
      row = nextRow;
      col = nextCol;
    }
  }

  return [row, col];
}

const walkParkV2 = (park, routes) => {
  // Bước 1: Tìm điểm bắt đầu và tạo bảng bốn hướng.
  // Bước 2: Kiểm tra từng bước của mỗi route bằng vị trí tạm.
  // Bước 3: Bỏ route lỗi hoặc chấp nhận vị trí mới khi đi hết.
  const rowCount = park.length;
  const colCount = park[0].length;
  let row = 0;
  let col = 0;

  for (let r = 0; r < rowCount; r++) {
    for (let c = 0; c < colCount; c++) {
      if (park[r][c] === "S") {
        row = r;
        col = c;
      }
    }
  }

  const directions = {
    N: [-1, 0],
    E: [0, 1],
    S: [1, 0],
    W: [0, -1],
  };

  for (const route of routes) {
    // 1. Tách lệnh
    const [op, distanceText] = route.split(" ");
    const distance = Number(distanceText);
    const [dr, dc] = directions[op];

    // 2. Tạo vị trí thử
    let nextRow = row;
    let nextCol = col;
    let isValid = true;

    // 3. Đi thử từng bước
    for (let step = 0; step < distance; step++) {
      nextRow = nextRow + dr;
      nextCol = nextCol + dc;

      const isOutOfBounds =
        nextRow < 0 ||
        nextRow >= rowCount ||
        nextCol < 0 ||
        nextCol >= colCount;

      if (isOutOfBounds || park[nextRow][nextCol] === "X") {
        isValid = false;
        break;
      }
    }

    // 4. Đi hết được mới cập nhật vị trí thật
    if (isValid) {
      row = nextRow;
      col = nextCol;
    }
  }

  return [row, col];
};

const walkPark = (park, routes) => {
  // Bước 1: Quét bản đồ để tìm vị trí S.
  // Bước 2: Thử di chuyển từng route và kiểm tra biên/vật cản.
  // Bước 3: Chỉ lưu vị trí mới khi toàn bộ route hợp lệ.
  // Tìm vị trí start
  const rowCount = park.length;
  const colCount = park[0].length;
  let row = 0;
  let col = 0;

  for (let r = 0; r < rowCount; r++) {
    for (let c = 0; c < colCount; c++) {
      if (park[r][c] === "S") {
        row = r;
        col = c;
      }
    }
  }

  // Tạo bảng directions
  const directions = {
    N: [-1, 0],
    E: [0, 1],
    S: [1, 0],
    W: [0, -1],
  };

  for (const route of routes) {
    const [op, distanceText] = route.split(" ");
    let distance = Number(distanceText);

    console.log(distance);

    const [dr, dc] = directions[op];

    let nextRow = row;
    let nextCol = col;
    let isValid = true;

    for (let step = 0; step < distance; step++) {
      nextRow = nextRow + dr;
      nextCol = nextCol + dc;

      const isOutOfBounds =
        nextRow < 0 ||
        nextRow >= rowCount ||
        nextCol < 0 ||
        nextCol >= colCount;

      if (isOutOfBounds || park[nextRow][nextCol] === "X") {
        isValid = false;
        break;
      }
    }

    if (isValid) {
      row = nextRow;
      col = nextCol;
    }
  }

  return [row, col];
};

console.log(walkPark(["SOO", "OXO", "OOO"], ["E 3", "N 5"]));
