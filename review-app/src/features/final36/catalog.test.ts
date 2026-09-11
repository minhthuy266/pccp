import { describe, expect, it } from "vitest";
import { final36Lessons } from "./catalog";

describe("PCCP Final 36 catalog", () => {
  it("loads exactly 36 lessons in numerical order", () => {
    expect(final36Lessons).toHaveLength(36);
    expect(final36Lessons.map((lesson) => lesson.order)).toEqual(
      Array.from({ length: 36 }, (_, index) => index + 1),
    );
  });

  it("provides Vietnamese statements, official links, summaries and complete code", () => {
    for (const lesson of final36Lessons) {
      expect(lesson.statement.length, `statement ${lesson.order}`).toBeGreaterThan(120);
      expect(lesson.officialUrl, `official URL ${lesson.order}`).toMatch(
        /^https:\/\/school\.programmers\.co\.kr\/learn\/courses\/30\/lessons\/\d+$/,
      );
      expect(lesson.coreFlow.length, `summary ${lesson.order}`).toBeGreaterThan(10);
      expect(lesson.code, `code ${lesson.order}`).toMatch(/function solution\s*\(/);
    }
  });
});


