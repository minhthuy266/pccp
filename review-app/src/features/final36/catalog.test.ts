import { describe, expect, it } from "vitest";
import { final36Lessons } from "./catalog";
import { algorithmByLessonOrder, final36Algorithms } from "./algorithms";

describe("PCCP Final 36 catalog", () => {
  it("loads all 42 lessons in numerical order", () => {
    expect(final36Lessons).toHaveLength(42);
    expect(final36Lessons.map((lesson) => lesson.order)).toEqual(
      Array.from({ length: 42 }, (_, index) => index + 1),
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

  it("assigns every lesson to exactly one algorithm with a recall template", () => {
    const assignedOrders = final36Algorithms.flatMap((algorithm) => [...algorithm.lessonOrders]);
    expect(assignedOrders).toHaveLength(42);
    expect(new Set(assignedOrders).size).toBe(42);
    expect([...assignedOrders].sort((a, b) => a - b)).toEqual(
      Array.from({ length: 42 }, (_, index) => index + 1),
    );

    for (const lesson of final36Lessons) {
      expect(algorithmByLessonOrder.has(lesson.order), `algorithm ${lesson.order}`).toBe(true);
    }
    for (const algorithm of final36Algorithms) {
      expect(algorithm.template.length, algorithm.label).toBeGreaterThan(120);
      expect(algorithm.description.length, algorithm.label).toBeGreaterThan(30);
    }
  });

  it("includes a runnable desert-island solution", () => {
    const lesson = final36Lessons.find((item) => item.order === 38)!;
    const solve = Function(`${lesson.code}; return solution`)() as (maps: string[]) => number[];

    expect(lesson.officialUrl).toContain("/154540");
    expect(solve(["X591X", "X1X5X", "X231X", "1XXX1"])).toEqual([1, 1, 27]);
    expect(solve(["XXX", "XXX", "XXX"])).toEqual([-1]);
  });

  it("runs the three lessons added from the solved list", () => {
    const solutionFor = (order: number) => {
      const lesson = final36Lessons.find((item) => item.order === order)!;
      return Function(`${lesson.code}; return solution`)();
    };

    expect(solutionFor(39)("01:00", "00:05", "00:10", "00:20", ["next", "next"])).toBe("00:30");
    expect(solutionFor(40)([5, 1, 5], 30, [[2, 10], [9, 15], [10, 5], [11, 5]])).toBe(5);
    expect(solutionFor(41)(4)).toEqual([1, 2, 9, 3, 10, 8, 4, 5, 6, 7]);
  });

  it("covers every problem from the supplied solved list", () => {
    const solvedProblemIds = [
      340213, 250137, 181188, 178871, 178870,
      172928, 159993, 154540, 154538, 150370,
      131127, 118667, 87946, 86971, 68645,
      64061, 60057, 49189, 43238, 43165,
    ];
    const catalogIds = new Set(final36Lessons.map((lesson) =>
      Number(/\/lessons\/(\d+)/.exec(lesson.officialUrl)?.[1]),
    ));

    expect(solvedProblemIds.filter((id) => !catalogIds.has(id))).toEqual([]);
  });

  it("covers every problem from the second supplied solved list", () => {
    const solvedProblemIds = [
      1844, 43163, 43162, 43105, 42898, 42885, 42883,
      42748, 42746, 42627, 42626, 42587, 42586, 42584,
      42583, 42578, 42577, 42576, 12978, 12909, 1845,
    ];
    const catalogIds = new Set(final36Lessons.map((lesson) =>
      Number(/\/lessons\/(\d+)/.exec(lesson.officialUrl)?.[1]),
    ));

    expect(solvedProblemIds.filter((id) => !catalogIds.has(id))).toEqual([]);
  });

  it("includes a runnable Pokémon solution", () => {
    const lesson = final36Lessons.find((item) => item.order === 42)!;
    const solve = Function(`${lesson.code}; return solution`)() as (nums: number[]) => number;

    expect(solve([3, 1, 2, 3])).toBe(2);
    expect(solve([3, 3, 3, 2, 2, 4])).toBe(3);
    expect(solve([1, 1])).toBe(1);
  });
});
