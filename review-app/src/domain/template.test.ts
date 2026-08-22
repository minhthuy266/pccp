import { describe, expect, it } from "vitest";
import { templateMastered, templateQueue, templateSkeleton } from "./template";
import type { Lesson, ReviewRecord, ReviewStore } from "../types";

const attempt = (day: string, transferPassed = false, skeletonUsed = false): ReviewRecord => ({
  reviewedAt: `${day}T08:00:00.000Z`, dueAt: day, grade: "A", durationSeconds: 60,
  revealedHints: [], errors: [], note: "", practiceMode: "TEMPLATE",
  templateAssessment: { rating: "FLUENT", compared: true, skeletonUsed, transferPassed },
});

describe("template drill", () => {
  it("keeps control structure but masks implementation runs", () => {
    const skeleton = templateSkeleton("function solve(items) {\n  const seen = new Set();\n  for (const item of items) {\n    seen.add(item);\n  }\n  return seen.size;\n}");
    expect(skeleton).toContain("function solve(items)");
    expect(skeleton).toContain("for (const item of items)");
    expect(skeleton).toContain("TODO");
    expect(skeleton).not.toContain("seen.add(item)");
  });

  it("requires three clean fluent days and one transfer pass", () => {
    expect(templateMastered([attempt("2026-08-20"), attempt("2026-08-21"), attempt("2026-08-22", true)])).toBe(true);
    expect(templateMastered([attempt("2026-08-20"), attempt("2026-08-20"), attempt("2026-08-22", true)])).toBe(false);
    expect(templateMastered([attempt("2026-08-20", true, true), attempt("2026-08-21"), attempt("2026-08-22")])).toBe(false);
  });

  it("does not queue a newly learned template until the next day", () => {
    const lesson = { id: "OF001" } as Lesson;
    const learned = { ...attempt("2026-08-22"), practiceMode: "LEARN" as const };
    const store = { version: 1, lessons: { OF001: { lessonId: "OF001", draftAnalysis: {}, draftCode: "", history: [learned] } } } satisfies ReviewStore;
    expect(templateQueue([lesson], store, "2026-08-22")).toEqual([]);
    expect(templateQueue([lesson], store, "2026-08-23")).toEqual([lesson]);
  });
});
