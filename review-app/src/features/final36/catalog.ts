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

export const final36Lessons = parseFinal36Lessons(Object.values(lessonModules), indexMarkdown);
export const final36LessonByOrder = new Map(final36Lessons.map((lesson) => [lesson.order, lesson]));

