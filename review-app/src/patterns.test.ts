import { describe, expect, it } from "vitest";
import { familyByLesson, patternFamilies } from "./patterns";

describe("pattern family catalog", () => {
  it("loads all 24 canonical families and maps all 67 lessons", () => {
    expect(patternFamilies).toHaveLength(24);
    expect(familyByLesson.size).toBe(67);
    expect(patternFamilies.every((family) => family.markdown && family.drills && family.lessonIds.length)).toBe(true);
  });
});
