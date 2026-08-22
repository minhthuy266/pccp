import { parseLesson } from "./domain/parser";
import type { Lesson } from "./types";

const modules = import.meta.glob("../../docs/pccp-700-roadmap/official-lessons/{OF,SR}[0-9][0-9][0-9].md", {
  query: "?raw", import: "default", eager: true,
}) as Record<string, string>;

export const lessons: Lesson[] = Object.entries(modules).map(([path, markdown]) => parseLesson(markdown, path))
  .sort((a, b) => a.id.localeCompare(b.id));

if (lessons.length === 0) throw new Error("Không phát hiện lesson chính thức nào.");
if (import.meta.env.DEV) lessons.filter((lesson) => lesson.warnings.length).forEach((lesson) => {
  console.warn(`[PCCP parser] ${lesson.id}: ${lesson.warnings.join(", ")}`);
});
