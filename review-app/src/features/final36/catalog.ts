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

export const final36Lessons = [
  ...parseFinal36Lessons(Object.values(lessonModules), indexMarkdown),
  oilDrillingLesson,
];
export const final36LessonByOrder = new Map(final36Lessons.map((lesson) => [lesson.order, lesson]));
