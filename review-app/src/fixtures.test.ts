import { describe, expect, it } from "vitest";
import { adaptFixtureExpression, fixtureForLesson } from "./fixtures";
import { patternFamilies } from "./patterns";

describe("official browser fixtures", () => {
  it("extracts representative tests from the certified Node suites", () => {
    expect(fixtureForLesson("OF050")?.expression).toContain("finalRunningOrder");
    expect(fixtureForLesson("OF050")?.expected).toContain("mumu");
    expect(fixtureForLesson("OF039")?.expression).toContain("differsByOneCharacter");
  });
  it("adapts the canonical call to the learner function name", () => {
    expect(adaptFixtureExpression("solve([1, 2])", "solution")).toBe("solution([1, 2])");
  });
  it("provides at least one certified fixture for every public lesson", () => {
    const ids = patternFamilies.flatMap((family) => family.lessonIds);
    expect(ids.filter((id) => !fixtureForLesson(id))).toEqual([]);
  });
});
