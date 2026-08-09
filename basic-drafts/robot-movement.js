function moveRobotWithIndependentChecks(command) {
  // Bước 1: Khởi tạo tọa độ, hướng nhìn và bảng dịch chuyển.
  // Bước 2: Đọc từng lệnh bằng các điều kiện độc lập.
  // Bước 3: Cập nhật vị trí/hướng rồi trả về tọa độ cuối.
  let x = 0;
  let y = 0;

  // 0: Bắc, 1: Đông, 2: Nam, 3: Tây
  let direction = 0;

  const dx = [0, 1, 0, -1];
  const dy = [1, 0, -1, 0];

  for (const currentCommand of command) {
    if (currentCommand === "R") {
      direction = (direction + 1) % 4;
    }

    if (currentCommand === "L") {
      direction = (direction + 3) % 4;
    }

    if (currentCommand === "G") {
      x += dx[direction];
      y += dy[direction];
    }

    if (currentCommand === "B") {
      x -= dx[direction];
      y -= dy[direction];
    }
  }

  return [x, y];
}

// console.log(solution("GRGLGRG")); // [2, 2]

function moveRobotWithElseIf(command) {
  // Bước 1: Khởi tạo trạng thái robot.
  // Bước 2: Dùng chuỗi if/else if để mỗi lệnh chỉ đi vào một nhánh.
  // Bước 3: Trả về tọa độ sau khi xử lý hết lệnh.
  let x = 0;
  let y = 0;
  let direction = 0;

  const dx = [0, 1, 0, -1];
  const dy = [1, 0, -1, 0];

  for (const currentCommand of command) {
    if (currentCommand === "R") {
      direction = (direction + 1) % 4;
    } else if (currentCommand === "L") {
      direction = (direction + 3) % 4;
    } else if (currentCommand === "G") {
      x += dx[direction];
      y += dy[direction];
    } else if (currentCommand == "B") {
      x -= dx[direction];
      y -= dy[direction];
    }
  }

  return [x, y];
}

const moveRobotWithDirectionTable = (commands) => {
  // Bước 1: Biểu diễn bốn hướng bằng chỉ số 0 đến 3.
  // Bước 2: Xoay hoặc cộng/trừ vector hướng theo từng command.
  // Bước 3: Trả về vị trí cuối cùng.
  let x = 0;
  let y = 0;
  let direction = 0;

  const dx = [0, 1, 0, -1];
  const dy = [1, 0, -1, 0];

  for (const command of commands) {
    if (command === "R") {
      direction = (direction + 1) % 4;
    } else if (command === "L") {
      direction = (direction + 3) % 4;
    } else if (command === "G") {
      x = x + dx[direction];
      y = y + dy[direction];
    } else if (command === "B") {
      x = x - dx[direction];
      y = y - dy[direction];
    }
  }

  return [x, y];
};
