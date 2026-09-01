import { ANALYSIS_FIELDS, type AnalysisField, type Lesson } from "../types";

type Section = { heading: string; body: string };

export const SECTION_ALIASES = {
  Contract: [/^(?:\d+\.\s*)?contract\b/i, /đề bài/i, /problem statement/i],
  Bounds: [/^(?:\d+\.\s*)?bounds?\b/i, /giới hạn/i],
  "Brute force": [/^(?:\d+\.\s*)?brute force\b/i, /vét cạn/i],
  Bottleneck: [/^(?:\d+\.\s*)?bottleneck\b/i, /nút thắt/i],
  Pattern: [/^(?:\d+\.\s*)?pattern\b/i, /mẫu thuật toán/i],
  State: [/^(?:\d+\.\s*)?state\b/i, /trạng thái/i],
  Transition: [/^(?:\d+\.\s*)?transition\b/i, /chuyển trạng thái/i],
  Invariant: [/^(?:\d+\.\s*)?invariant\b/i, /bất biến/i],
  Complexity: [/^(?:\d+\.\s*)?complexity\b/i, /độ phức tạp/i],
  solution: [/code hoàn chỉnh/i, /full solution/i, /lời giải hoàn chỉnh/i],
  blueprint: [/blueprint đủ trường/i, /blueprint từ đề/i, /code blueprint/i],
};

function sectionsOf(markdown: string): Section[] {
  const matches = [...markdown.matchAll(/^#{2,3}\s+(.+)$/gm)];
  return matches.map((match, index) => ({
    heading: match[1].trim(),
    body: markdown.slice((match.index ?? 0) + match[0].length, matches[index + 1]?.index ?? markdown.length).trim(),
  }));
}

function findSection(sections: Section[], aliases: RegExp[]) {
  return sections.find((section) => aliases.some((alias) => alias.test(section.heading)))?.body ?? "";
}

function cleanRecall(value: string) {
  return value.trim().replace(/^[-*]\s*/, "");
}

function blueprintFrom(value: string) {
  const blocks = [...value.matchAll(/^```([^\n]*)\r?\n([\s\S]*?)^```\s*$/gm)]
    .filter((match) => !match[1].trim() || match[1].trim().toLowerCase() === "text")
    .map((match) => match[2].trim());
  return blocks.find((block) => /^OUTPUT:/m.test(block)) ?? blocks[0] ?? value;
}

export function parseLesson(markdown: string, sourcePath = "unknown.md"): Lesson {
  const titleMatch = markdown.match(/^#\s+((?:OF|SR)\d{3})\s+[—-]\s+(.+)$/m);
  const id = titleMatch?.[1] ?? sourcePath.match(/(?:OF|SR)\d{3}/)?.[0] ?? "UNKNOWN";
  const title = titleMatch?.[2]?.trim() ?? id;
  const officialUrl = markdown.match(/^[-*]\s*Nguồn đề[^:]*:\s*\[[^\]]+\]\((https?:\/\/[^)]+)\)/im)?.[1] ?? "";
  const sections = sectionsOf(markdown);
  const references = Object.fromEntries(ANALYSIS_FIELDS.map((field) => [field, findSection(sections, SECTION_ALIASES[field])])) as Record<AnalysisField, string>;
  const contract = references.Contract;
  const patternBody = references.Pattern;
  const patternMeta = markdown.match(/^[-*]\s*Pattern (?:chính)?:\s*(.+)$/im)?.[1]?.trim();
  const pattern = patternMeta ?? patternBody.split("\n").find(Boolean)?.replace(/[*`]/g, "").trim() ?? "Chưa phân loại";
  const recall = (level: number) => {
    const match = markdown.match(new RegExp(`^[-*]?\\s*(?:\\*\\*)?Recall\\s*${level}[^:\\n]*:(?:\\*\\*)?\\s*(.+)$`, "im"));
    if (!match) {
      const short = sections.find((section) => /recall ngắn/i.test(section.heading))?.body ?? "";
      if (!short) return "";
      const code = short.match(/```(?:text)?\s*\n([\s\S]*?)```/i)?.[1]?.trim() ?? short;
      const quote = short.match(/^>\s*(.+)$/m)?.[1]?.trim();
      return level === 1 ? (quote ?? code.split(/\r?\n/).find((line) => line.trim()) ?? "") : level === 2 ? code : short;
    }
    const continuation: string[] = [];
    const following = markdown.slice((match.index ?? 0) + match[0].length).split(/\r?\n/).slice(1);
    for (const line of following) {
      if (!/^\s{2,}\S/.test(line)) break;
      continuation.push(line.trim());
    }
    return cleanRecall([match[1], ...continuation].join(" "));
  };
  const a17 = sections.find((section) => /A17|recall ba tầng/i.test(section.heading))?.body ?? "";
  const blueprintSection = a17 || findSection(sections, SECTION_ALIASES.blueprint) || markdown;
  const blueprintBlock = blueprintFrom(blueprintSection);
  const solutionSection = sections.findIndex((section) => SECTION_ALIASES.solution.some((alias) => alias.test(section.heading)));
  const solutionBody = solutionSection >= 0 ? sections[solutionSection].body : "";
  const solution = solutionBody.match(/```(?:js|javascript)\s*\n([\s\S]*?)```/i)?.[1]?.trim() ?? solutionBody;
  const explanation = sections
    .filter((_, index) => index !== solutionSection)
    .filter((section) => !/A17|recall ba tầng/i.test(section.heading))
    .map((section) => `## ${section.heading}\n\n${section.body}`)
    .join("\n\n");
  const lesson: Lesson = {
    id, title, pattern, officialUrl, references, problem: contract, recall1: recall(1), blueprint: blueprintBlock,
    recall2: recall(2), recall3: recall(3), explanation, solution, sourcePath, warnings: [],
  };
  for (const key of ["problem", "recall1", "blueprint", "recall2", "recall3", "solution"] as const) {
    if (!lesson[key]) lesson.warnings.push(`Thiếu phần ${key}`);
  }
  for (const field of ANALYSIS_FIELDS) if (!references[field]) lesson.warnings.push(`Thiếu reference ${field}`);
  if (!officialUrl) lesson.warnings.push("Thiếu official URL");
  return lesson;
}
