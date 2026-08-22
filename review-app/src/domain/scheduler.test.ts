import { describe, expect, it } from "vitest";
import { dueLessons, suggestedNew } from "./scheduler";
import type { Lesson, ReviewStore } from "../types";

const lesson = (id: string, pattern = "other") => ({ id, title: id, pattern, problem: "x", recall1: "", blueprint: "", recall2: "", recall3: "", explanation: "", solution: "", sourcePath: "", warnings: [] }) satisfies Lesson;
const store: ReviewStore = { version: 1, lessons: {
  OF001: { lessonId: "OF001", draftAnalysis: {}, draftCode: "", history: [{ grade: "A", reviewedAt: "", dueAt: "2026-08-20", durationSeconds: 1, revealedHints: [], errors: [], note: "" }] },
  OF002: { lessonId: "OF002", draftAnalysis: {}, draftCode: "", history: [{ grade: "D", reviewedAt: "", dueAt: "2026-08-22", durationSeconds: 1, revealedHints: [], errors: [], note: "" }] },
  OF003: { lessonId: "OF003", draftAnalysis: {}, draftCode: "", history: [{ grade: "B", reviewedAt: "", dueAt: "2026-08-22", durationSeconds: 1, revealedHints: [], errors: [], note: "" }] },
} };

it("orders overdue first, then weaker grades", () => {
  expect(dueLessons([lesson("OF003"), lesson("OF002"), lesson("OF001")], store, "2026-08-22").map((x) => x.id)).toEqual(["OF001", "OF002", "OF003"]);
});

it("suggests at most three new foundational lessons", () => {
  const result = suggestedNew([lesson("OF004", "heap"), lesson("OF005", "array scan"), lesson("OF006", "map"), lesson("OF007", "stack")], store);
  expect(result).toHaveLength(3);
  expect(result[0].id).toBe("OF005");
});
