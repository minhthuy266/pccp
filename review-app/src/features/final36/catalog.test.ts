import { describe, expect, it } from "vitest";
import { final36Lessons } from "./catalog";

describe("PCCP Final 36 catalog", () => {
  it("loads all 37 lessons in numerical order", () => {
    expect(final36Lessons).toHaveLength(37);
    expect(final36Lessons.map((lesson) => lesson.order)).toEqual(
      Array.from({ length: 37 }, (_, index) => index + 1),
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

