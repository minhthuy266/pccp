import coverageRaw from "../../docs/pccp-700-roadmap/pattern-families/PATTERN_COVERAGE.csv?raw";

const modules = import.meta.glob("../../docs/pccp-700-roadmap/pattern-families/PF[0-9][0-9]_*.md", {
  query: "?raw", import: "default", eager: true,
}) as Record<string, string>;

export interface PatternFamily {
  id: string;
  title: string;
  markdown: string;
  lessonIds: string[];
  roles: Record<string, string>;
  drills: string;
}

const coverage = coverageRaw.trim().split(/\r?\n/).slice(1).map((line) => {
  const [lessonId, patternId, , role] = line.split(",");
  return { lessonId, patternId, role };
});

export const patternFamilies: PatternFamily[] = Object.values(modules).map((markdown) => {
  const heading = markdown.match(/^#\s+(PF\d{2})\s+[—-]\s+(.+)$/m);
  const id = heading?.[1] ?? "UNKNOWN";
  const title = heading?.[2]?.trim() ?? id;
  const rows = coverage.filter((row) => row.patternId === id);
  const drills = markdown.match(/^##\s+8\.[^\n]*\n([\s\S]*?)(?=^##\s+9\.)/m)?.[1]?.trim() ?? "";
  return { id, title, markdown, drills, lessonIds: rows.map((row) => row.lessonId), roles: Object.fromEntries(rows.map((row) => [row.lessonId, row.role])) };
}).sort((a, b) => a.id.localeCompare(b.id));

export const familyByLesson = new Map(patternFamilies.flatMap((family) => family.lessonIds.map((id) => [id, family] as const)));
