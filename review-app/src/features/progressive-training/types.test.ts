import { describe, expect, it } from "vitest";
import { assertLearningLevels, LEVEL_TYPES, type LearningLevels } from "./types";

const minimalLevels = (): LearningLevels => [
  { type: "PATTERN_BLUEPRINT", prompt: "pattern", options: [{ id: "p", label: "P", explanation: "" }], correctOptionId: "p", blueprint: [{ id: "STATE", label: "State", prompt: "state?", canonical: "index", acceptedKeywords: [["index"]] }] },
  { type: "LOGIC_ORDERING", prompt: "logic", items: [{ id: "a", text: "A" }], correctOrder: ["a"], canonicalOnly: true },
  { type: "CODE_BLOCK_ORDERING", prompt: "code", blocks: [{ id: "a", code: "function solution() { return 1; }" }], correctOrder: ["a"], canonicalOnly: true, tests: [{ label: "one", expression: "solution()", expected: "1" }] },
  { type: "BLOCK_WRITING", prompt: "write", blocks: [{ id: "a", subgoal: "all", prompt: "write", starterCode: "", canonicalCode: "function solution() { return 1; }", dependencies: [] }], tests: [{ label: "one", expression: "solution()", expected: "1" }] },
  { type: "FULL_RECALL", prompt: "recall", solution: "function solution() { return 1; }", tests: [{ label: "one", expression: "solution()", expected: "1" }], hints: ["h1", "h2", "h3", "h4", "h5"] },
  { type: "DEBUG_VARIANT", prompt: "transfer", challenges: [
    { kind: "DEBUG", id: "d", title: "debug", change: "fix", functionSignature: "solution()", starterCode: "function solution() {}", solution: "function solution() { return 1; }", tests: [{ label: "one", expression: "solution()", expected: "1" }] },
    { kind: "VARIANT", id: "v", title: "variant", change: "change", functionSignature: "solution()", starterCode: "", solution: "function solution() { return 2; }", tests: [{ label: "two", expression: "solution()", expected: "2" }] },
  ] },
];

describe("six-level lesson schema", () => {
  it("requires the canonical six levels in order", () => {
    const levels = minimalLevels();
    expect(levels.map((level) => level.type)).toEqual(LEVEL_TYPES);
    expect(assertLearningLevels("test", levels)).toBe(levels);
  });
  it("rejects a transfer level without both debug and variant", () => {
    const levels = minimalLevels();
    levels[5].challenges = levels[5].challenges.filter((challenge) => challenge.kind === "DEBUG");
    expect(() => assertLearningLevels("test", levels)).toThrow("needs debug and variant");
  });
});
