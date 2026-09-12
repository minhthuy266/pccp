import indexMarkdown from "../../../../PCCP_FINAL_GIT_BAI36_WITH_TEMPLATES/00_PCCP_FINAL_INDEX.md?raw";

const lessonModules = import.meta.glob(
  "../../../../PCCP_FINAL_GIT_BAI36_WITH_TEMPLATES/{01_SIMULATION_STRING,02_HASH_SORTING_GREEDY,03_STACK_QUEUE_MONOTONIC,04_TWO_POINTERS_WINDOW,05_HEAP_PRIORITY_QUEUE,06_DFS_BRUTE_FORCE_BACKTRACKING,07_GRAPH_TREE_GREEDY,08_BINARY_SEARCH_ON_ANSWER,09_BFS_GRAPH,10_DP}.md",
  { query: "?raw", import: "default", eager: true },
) as Record<string, string>;

export type Final36Lesson = {
  order: number;
  title: string;
  vietnameseTitle: string;
  officialUrl: string;
  pattern: string;
  coreFlow: string;
  trap: string;
  statement: string;
  code: string;
};

type RecallRow = Pick<Final36Lesson, "pattern" | "coreFlow" | "trap">;

function cleanInline(value: string) {
  return value.trim().replaceAll("`", "");
}

function parseRecallRows(markdown: string) {
  const rows = new Map<number, RecallRow>();

  for (const line of markdown.split("\n")) {
    const cells = line.split("|").slice(1, -1).map(cleanInline);
    if (cells.length !== 5 || !/^\d+$/.test(cells[0])) continue;
    rows.set(Number(cells[0]), {
      pattern: cells[2],
      coreFlow: cells[3],
      trap: cells[4],
    });
  }

  return rows;
}

function vietnameseTitle(title: string) {
  const parenthesized = [...title.matchAll(/\(([^()]*)\)/g)].at(-1)?.[1];
  if (parenthesized) return parenthesized;
  return title.replace(/^[^A-Za-zÀ-ỹĐđ]+/, "").trim();
}

function firstCodeBlockAfter(section: string, heading: RegExp) {
  const headingMatch = heading.exec(section);
  if (!headingMatch) return "// Chưa có code trong tài liệu nguồn.";
  const afterHeading = section.slice(headingMatch.index + headingMatch[0].length);
  const headingSection = afterHeading.split(/\n## \d+\./, 1)[0];
  const blocks = [...headingSection.matchAll(/```js\s*\n([\s\S]*?)```/g)].map((match) => match[1].trim());
  const solutionIndex = blocks.findIndex((block) => /function solution\s*\(/.test(block));
  if (solutionIndex < 0) return blocks[0] ?? "// Chưa có code trong tài liệu nguồn.";
  return blocks.slice(0, solutionIndex + 1).join("\n\n");
}

export function parseFinal36Lessons(markdowns: string[], index: string): Final36Lesson[] {
  const recalls = parseRecallRows(index);
  const lessons: Final36Lesson[] = [];

  for (const markdown of markdowns) {
    const matches = [...markdown.matchAll(/^# Bài (\d+) — (.+)$/gm)];

    matches.forEach((match, matchIndex) => {
      const order = Number(match[1]);
      const title = match[2].trim();
      const start = match.index ?? 0;
      const end = matches[matchIndex + 1]?.index ?? markdown.length;
      const section = markdown.slice(start, end);
      const statement = /## 1\. Dịch đề tiếng Việt\s*\n([\s\S]*?)(?=\n## 2\.)/.exec(section)?.[1]
        .replace(/\n---\s*$/, "")
        .trim() ?? "*Chưa có đề tiếng Việt trong tài liệu nguồn.*";
      const officialUrl = /https:\/\/school\.programmers\.co\.kr\/learn\/courses\/30\/lessons\/\d+/.exec(section)?.[0] ?? "";
      const recall = recalls.get(order) ?? { pattern: "PCCP", coreFlow: "Đọc đề → chọn pattern → triển khai", trap: "Kiểm tra kỹ giới hạn và index" };
      const code = firstCodeBlockAfter(section, /^## \d+\. Code Skeleton Recall[^\n]*$/m);

      lessons.push({
        order,
        title,
        vietnameseTitle: vietnameseTitle(title),
        officialUrl,
        statement,
        code,
        ...recall,
      });
    });
  }

  return lessons.sort((a, b) => a.order - b.order);
}

const oilDrillingLesson: Final36Lesson = {
  order: 37,
  title: "석유 시추 (Loang dầu / Khai thác dầu)",
  vietnameseTitle: "Loang dầu / Khai thác dầu",
  officialUrl: "https://school.programmers.co.kr/learn/courses/30/lessons/250136",
  pattern: "Grid DFS/BFS · Connected Components",
  coreFlow: "Duyệt từng khối dầu đúng một lần → đếm kích thước và các cột khối chạm tới → cộng kích thước vào từng cột → lấy tổng lớn nhất",
  trap: "Một khối có thể chạm cùng một cột ở nhiều ô; phải dùng Set để chỉ cộng khối đó một lần cho mỗi cột. Đánh dấu visited ngay khi đưa ô vào stack.",
  statement: `Cho một khu đất hình chữ nhật được biểu diễn bởi ma trận \`land\`:

- \`land[row][col] = 1\`: ô có dầu.
- \`land[row][col] = 0\`: ô đất trống.
- Các ô dầu nối với nhau theo **bốn hướng trên, dưới, trái, phải** thuộc cùng một khối dầu.

Một mũi khoan được đặt tại đúng một cột và khoan thẳng từ trên xuống dưới. Khi mũi khoan đi qua một ô thuộc khối dầu, ta khai thác được **toàn bộ khối dầu liên thông đó**. Một khối chỉ được tính một lần dù nó chiếm nhiều ô trên cùng cột.

Hãy chọn cột đặt mũi khoan sao cho tổng lượng dầu khai thác được là lớn nhất và trả về lượng dầu đó.

### Giới hạn

- \`1 ≤ land.length ≤ 500\`.
- \`1 ≤ land[0].length ≤ 500\`.
- Mỗi ô chỉ có giá trị \`0\` hoặc \`1\`.

### Ví dụ tư duy

Nếu một khối dầu có kích thước \`8\` và chạm các cột \`1, 2, 3\`, thì cả ba cột đều được cộng thêm \`8\`. Sau khi xử lý mọi khối, đáp án là giá trị lớn nhất trong mảng tổng dầu theo cột.`,
  code: `function solution(land) {
  const rows = land.length
  const cols = land[0].length
  const oilByColumn = Array(cols).fill(0)
  const visited = Array.from(
    { length: rows },
    () => Array(cols).fill(false)
  )
  const directions = [
    [-1, 0],
    [1, 0],
    [0, -1],
    [0, 1],
  ]

  for (let row = 0; row < rows; row++) {
    for (let col = 0; col < cols; col++) {
      if (land[row][col] === 0 || visited[row][col]) continue

      let size = 0
      const touchedColumns = new Set()
      const stack = [[row, col]]
      visited[row][col] = true

      while (stack.length) {
        const [currentRow, currentCol] = stack.pop()
        size++
        touchedColumns.add(currentCol)

        for (const [dr, dc] of directions) {
          const nextRow = currentRow + dr
          const nextCol = currentCol + dc

          if (
            nextRow < 0 || nextRow >= rows ||
            nextCol < 0 || nextCol >= cols ||
            land[nextRow][nextCol] === 0 ||
            visited[nextRow][nextCol]
          ) continue

          visited[nextRow][nextCol] = true
          stack.push([nextRow, nextCol])
        }
      }

      for (const touchedCol of touchedColumns) {
        oilByColumn[touchedCol] += size
      }
    }
  }

  return Math.max(...oilByColumn)
}`,
};

const desertIslandLesson: Final36Lesson = {
  order: 38,
  title: "무인도 여행 (Du lịch đảo hoang)",
  vietnameseTitle: "Du lịch đảo hoang",
  officialUrl: "https://school.programmers.co.kr/learn/courses/30/lessons/154540",
  pattern: "Grid DFS · Connected Components",
  coreFlow: "Quét toàn bộ grid → gặp ô thức ăn chưa thăm thì DFS bốn hướng → cộng tổng của đảo → sort các tổng tăng dần",
  trap: "Giá trị thức ăn là ký tự nên phải đổi sang Number; đánh dấu visited trước khi đi tiếp; không có đảo phải trả [-1] và sort phải dùng comparator số.",
  statement: `Cho một bản đồ hình chữ nhật \`maps\`, trong đó:

- Mỗi ký tự từ \`"1"\` đến \`"9"\` là lượng thức ăn trên một ô đất.
- Ký tự \`"X"\` là biển, không thể đi qua.
- Các ô đất nối với nhau theo **bốn hướng trên, dưới, trái, phải** tạo thành một đảo.

Nếu ở lại trên một đảo, số ngày có thể sống là tổng lượng thức ăn của tất cả ô thuộc đảo đó.

Hãy tìm số ngày có thể sống trên từng đảo và trả về mảng các tổng được sắp xếp tăng dần. Nếu bản đồ không có đảo nào, trả về \`[-1]\`.

### Giới hạn

- \`3 ≤ maps.length ≤ 100\`.
- \`3 ≤ maps[i].length ≤ 100\`.
- Mỗi hàng có cùng độ dài và chỉ chứa \`X\` hoặc chữ số từ \`1\` đến \`9\`.

### Ví dụ

Với \`maps = ["X591X", "X1X5X", "X231X", "1XXX1"]\`, ba đảo có tổng thức ăn lần lượt là \`27\`, \`1\` và \`1\`. Kết quả sau khi sắp xếp là \`[1, 1, 27]\`.`,
  code: `function solution(maps) {
  const rows = maps.length
  const cols = maps[0].length
  const visited = Array.from(
    { length: rows },
    () => Array(cols).fill(false)
  )
  const directions = [
    [-1, 0],
    [0, 1],
    [1, 0],
    [0, -1],
  ]
  const answer = []

  function dfs(row, col) {
    visited[row][col] = true
    let total = Number(maps[row][col])

    for (const [dr, dc] of directions) {
      const nextRow = row + dr
      const nextCol = col + dc
      const isOutside =
        nextRow < 0 || nextRow >= rows ||
        nextCol < 0 || nextCol >= cols

      if (
        isOutside ||
        visited[nextRow][nextCol] ||
        maps[nextRow][nextCol] === "X"
      ) continue

      total += dfs(nextRow, nextCol)
    }

    return total
  }

  for (let row = 0; row < rows; row++) {
    for (let col = 0; col < cols; col++) {
      if (!visited[row][col] && maps[row][col] !== "X") {
        answer.push(dfs(row, col))
      }
    }
  }

  if (answer.length === 0) return [-1]
  return answer.sort((a, b) => a - b)
}`,
};

const videoPlayerLesson: Final36Lesson = {
  order: 39,
  title: "[PCCP 기출문제] 1번 / 동영상 재생기 (Trình phát video)",
  vietnameseTitle: "Trình phát video",
  officialUrl: "https://school.programmers.co.kr/learn/courses/30/lessons/340213",
  pattern: "Time Parsing · Simulation",
  coreFlow: "Đổi mọi mốc mm:ss sang giây → chuẩn hóa vị trí ban đầu → áp từng lệnh ±10 và clamp → sau mỗi lệnh lại bỏ qua opening",
  trap: "Đoạn opening tính cả hai đầu mút; phải skip trước command đầu tiên và sau mọi command; output luôn đúng định dạng mm:ss.",
  statement: `Một video có tổng thời lượng \`video_len\` và vị trí hiện tại \`pos\`, đều có dạng \`mm:ss\`. Video có đoạn mở đầu từ \`op_start\` đến \`op_end\`.

Mỗi phần tử trong \`commands\` là:

- \`"prev"\`: lùi 10 giây; nếu vượt đầu video thì dừng tại \`00:00\`.
- \`"next"\`: tiến 10 giây; nếu vượt cuối video thì dừng tại \`video_len\`.

Nếu vị trí ban đầu hoặc vị trí sau một lệnh nằm trong đoạn opening **tính cả hai đầu mút**, trình phát lập tức nhảy tới \`op_end\`.

Hãy xử lý các lệnh theo thứ tự và trả về vị trí cuối cùng dưới dạng \`mm:ss\`.

### Cách biểu diễn

Đổi tất cả thời gian thành tổng số giây để cộng, trừ và so sánh. Chỉ format ngược về \`mm:ss\` khi trả kết quả.`,
  code: `function solution(video_len, pos, op_start, op_end, commands) {
  const toSeconds = (time) => {
    const [minutes, seconds] = time.split(":").map(Number)
    return minutes * 60 + seconds
  }

  const toTime = (totalSeconds) => {
    const minutes = Math.floor(totalSeconds / 60)
    const seconds = totalSeconds % 60
    return [minutes, seconds]
      .map(value => String(value).padStart(2, "0"))
      .join(":")
  }

  const videoLength = toSeconds(video_len)
  const openingStart = toSeconds(op_start)
  const openingEnd = toSeconds(op_end)
  let current = toSeconds(pos)

  const skipOpening = () => {
    if (openingStart <= current && current <= openingEnd) {
      current = openingEnd
    }
  }

  skipOpening()

  for (const command of commands) {
    current = command === "prev"
      ? Math.max(0, current - 10)
      : Math.min(videoLength, current + 10)
    skipOpening()
  }

  return toTime(current)
}`,
};

const bandageLesson: Final36Lesson = {
  order: 40,
  title: "[PCCP 기출문제] 1번 / 붕대 감기 (Băng bó)",
  vietnameseTitle: "Băng bó",
  officialUrl: "https://school.programmers.co.kr/learn/courses/30/lessons/250137",
  pattern: "Timeline · Event Simulation",
  coreFlow: "Duyệt từng giây tới đòn đánh cuối → giây bị đánh thì trừ máu và reset chuỗi → giây thường thì hồi, đủ t giây hồi thêm bonus → clamp máu",
  trap: "Không hồi ở giây bị đánh; combo reset khi bị đánh và sau bonus; clamp cả hồi thường lẫn bonus; máu ≤ 0 phải trả -1 ngay.",
  statement: `Kỹ năng băng bó được mô tả bởi \`bandage = [t, x, y]\`:

- Mỗi giây thi triển liên tục mà không bị tấn công sẽ hồi \`x\` máu.
- Nếu thi triển liên tục đủ \`t\` giây, nhân vật được hồi thêm \`y\` máu và chuỗi hồi bắt đầu lại từ 0.
- Máu sau khi hồi không bao giờ vượt quá \`health\`, là lượng máu tối đa ban đầu.

Mảng \`attacks\` chứa các cặp \`[thời điểm, sát thương]\` theo thời gian tăng dần. Tại giây có đòn đánh, nhân vật không hồi máu, bị trừ sát thương và chuỗi hồi liên tục bị reset. Nếu máu giảm xuống 0 hoặc thấp hơn, trả về \`-1\` ngay.

Sau khi xử lý hết đòn đánh cuối cùng, hãy trả về lượng máu còn lại.`,
  code: `function solution(bandage, health, attacks) {
  const [duration, healPerSecond, bonusHeal] = bandage
  const attackMap = new Map(attacks)
  const lastAttackTime = attacks.at(-1)[0]

  let currentHealth = health
  let consecutive = 0

  for (let time = 1; time <= lastAttackTime; time++) {
    if (attackMap.has(time)) {
      currentHealth -= attackMap.get(time)
      consecutive = 0

      if (currentHealth <= 0) return -1
      continue
    }

    currentHealth = Math.min(health, currentHealth + healPerSecond)
    consecutive++

    if (consecutive === duration) {
      currentHealth = Math.min(health, currentHealth + bonusHeal)
      consecutive = 0
    }
  }

  return currentHealth
}`,
};

const triangleSnailLesson: Final36Lesson = {
  order: 41,
  title: "삼각 달팽이 (Ốc sên tam giác)",
  vietnameseTitle: "Ốc sên tam giác",
  officialUrl: "https://school.programmers.co.kr/learn/courses/30/lessons/68645",
  pattern: "Cyclic Direction · Grid Simulation",
  coreFlow: "Tạo tam giác rỗng → đi theo chu kỳ xuống, phải, chéo lên-trái → độ dài mỗi đoạn giảm từ n về 1 → flat theo hàng",
  trap: "Khởi tạo row = -1 vì code move rồi mới write; đổi hướng sau cả đoạn chứ không phải sau từng ô; chỉ flat một lần ở cuối.",
  statement: `Cho số nguyên \`n\`. Trong một tam giác có chiều cao và cạnh đáy bằng \`n\`, hãy điền các số liên tiếp từ 1 theo đường xoắn ốc ngược chiều kim đồng hồ, bắt đầu từ đỉnh.

Đường đi lặp theo ba hướng:

1. Đi xuống.
2. Đi sang phải.
3. Đi chéo lên-trái.

Độ dài các đoạn lần lượt là \`n, n-1, ..., 1\`. Sau khi điền đủ \`n(n+1)/2\` ô, hãy ghép các hàng từ trên xuống dưới, mỗi hàng từ trái sang phải, thành một mảng một chiều.

### Ví dụ

- \`n = 4\` → \`[1, 2, 9, 3, 10, 8, 4, 5, 6, 7]\`.
- \`n = 5\` → \`[1, 2, 12, 3, 13, 11, 4, 14, 15, 10, 5, 6, 7, 8, 9]\`.

Giới hạn \`1 ≤ n ≤ 1.000\`, vì vậy mô phỏng mỗi ô đúng một lần là tối ưu.`,
  code: `function solution(n) {
  const triangle = Array.from(
    { length: n },
    (_, row) => Array(row + 1).fill(0)
  )
  const rowChange = [1, 0, -1]
  const columnChange = [0, 1, -1]

  let row = -1
  let column = 0
  let number = 1
  let direction = 0

  for (let length = n; length >= 1; length--) {
    for (let step = 0; step < length; step++) {
      row += rowChange[direction]
      column += columnChange[direction]
      triangle[row][column] = number++
    }
    direction = (direction + 1) % 3
  }

  return triangle.flat()
}`,
};

const pokemonLesson: Final36Lesson = {
  order: 42,
  title: "폰켓몬 (Pokémon)",
  vietnameseTitle: "Pokémon",
  officialUrl: "https://school.programmers.co.kr/learn/courses/30/lessons/1845",
  pattern: "Set · Distinct Cardinality",
  coreFlow: "Đếm số loại khác nhau bằng Set → số con được chọn cố định là N/2 → đáp án là min(số loại, N/2)",
  trap: "Đề hỏi số loại khác nhau chứ không hỏi số con; duplicate không cần đếm tần suất; không thể chọn quá N/2 loại.",
  statement: `Mảng \`nums\` chứa mã loại của \`N\` Pokémon, trong đó \`N\` luôn là số chẵn. Bạn phải chọn đúng \`N/2\` con và muốn số **loại khác nhau** trong số Pokémon đã chọn là lớn nhất.

Hãy trả về số loại Pokémon tối đa có thể chọn.

### Nhận xét

- Nếu toàn bộ mảng chỉ có \`K\` loại khác nhau và \`K ≤ N/2\`, ta có thể lấy đủ cả \`K\` loại.
- Nếu \`K > N/2\`, dù có nhiều loại đến đâu ta cũng chỉ chọn được \`N/2\` con, nên tối đa là \`N/2\` loại.

Vì vậy đáp án là \`min(K, N/2)\`, với \`K = new Set(nums).size\`.

### Ví dụ

- \`[3, 1, 2, 3]\` → chọn 2 con, có thể lấy 2 loại → kết quả \`2\`.
- \`[3, 3, 3, 2, 2, 4]\` → chọn 3 con và có đúng 3 loại → kết quả \`3\`.`,
  code: `function solution(nums) {
  const distinctKinds = new Set(nums).size
  const pickLimit = nums.length / 2

  return Math.min(distinctKinds, pickLimit)
}`,
};

export const final36Lessons = [
  ...parseFinal36Lessons(Object.values(lessonModules), indexMarkdown),
  oilDrillingLesson,
  desertIslandLesson,
  videoPlayerLesson,
  bandageLesson,
  triangleSnailLesson,
  pokemonLesson,
];
export const final36LessonByOrder = new Map(final36Lessons.map((lesson) => [lesson.order, lesson]));
