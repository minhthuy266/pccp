import type { BlueprintField, CodeTestCase, ProgressiveLesson, TransferChallenge } from "./types";

type LessonBlock = { id: string; code: string; subgoal: string };
type LessonConfig = Omit<ProgressiveLesson, "levels" | "steps"> & {
  pattern: { prompt: string; options: { id: string; label: string; explanation: string }[]; correctOptionId: string };
  blueprint: BlueprintField[];
  logic: { id: string; text: string }[];
  blocks: LessonBlock[];
  solution: string;
  tests: CodeTestCase[];
  challenges: TransferChallenge[];
};

export function defineSixLevelLesson(config: LessonConfig): ProgressiveLesson {
  const { pattern, blueprint, logic, blocks, solution, tests, challenges, ...metadata } = config;
  const correctOrder = blocks.map((block) => block.id);
  return {
    ...metadata,
    levels: [
      { type: "PATTERN_BLUEPRINT", ...pattern, blueprint },
      { type: "LOGIC_ORDERING", prompt: "Sắp xếp subgoal tiếng Việt trước khi nhìn code.", items: logic, correctOrder: logic.map((item) => item.id), canonicalOnly: true },
      { type: "CODE_BLOCK_ORDERING", prompt: "Sắp xếp các block thành JavaScript đúng scope và đúng contract.", blocks: blocks.map(({ id, code }) => ({ id, code })), correctOrder, canonicalOnly: true, tests },
      { type: "BLOCK_WRITING", prompt: "Tự viết từng block theo subgoal; source ghép phải pass toàn bộ tests.", blocks: blocks.map((block, index) => ({ id: block.id, subgoal: block.subgoal, prompt: `Viết toàn bộ block “${block.id}”.`, starterCode: "", canonicalCode: block.code, dependencies: index ? [blocks[index - 1].id] : [] })), tests },
      { type: "FULL_RECALL", prompt: "Viết full code từ trang trắng, không có skeleton mặc định.", solution, tests, hints: [metadata.basePattern, blueprint.map((field) => `${field.id}: ${field.canonical}`).join("\n"), logic.map((item) => item.text).join("\n"), `function ${metadata.functionSignature} {\n  // core logic\n}`, solution] },
      { type: "DEBUG_VARIANT", prompt: "Sửa bug thật và chuyển core sang contract khác.", challenges },
    ],
  };
}
