export const STEP_TYPES = ["PATTERN_CHOICE", "BLOCK_ORDERING", "CODE_FILL", "FULL_CODE", "VARIANT"] as const;
export const LEVEL_TYPES = ["PATTERN_BLUEPRINT", "LOGIC_ORDERING", "CODE_BLOCK_ORDERING", "BLOCK_WRITING", "FULL_RECALL", "DEBUG_VARIANT"] as const;
export type LegacyTrainingStepType = typeof STEP_TYPES[number];
export type LearningLevelType = typeof LEVEL_TYPES[number];
export type TrainingStepType = LegacyTrainingStepType | LearningLevelType;

export type CodeTestCase = { label: string; expression: string; expected: string };
export type CodeBlock = { id: string; code: string };
export type FillBlank = { id: string; label: string; accepted: string[] };

export type PatternChoiceStep = {
  type: "PATTERN_CHOICE";
  prompt: string;
  options: { id: string; label: string; explanation: string }[];
  correctOptionId: string;
};

export type BlockOrderingStep = {
  type: "BLOCK_ORDERING";
  prompt: string;
  blocks: CodeBlock[];
  correctOrder: string[];
  canonicalOnly: boolean;
  tests: CodeTestCase[];
};

export type CodeFillStep = {
  type: "CODE_FILL";
  prompt: string;
  template: string;
  blanks: FillBlank[];
};

export type FullCodeStep = {
  type: "FULL_CODE";
  prompt: string;
  starterCode: string;
  solution: string;
  tests: CodeTestCase[];
};

export type VariantChallenge = {
  id: string;
  title: string;
  change: string;
  functionSignature: string;
  starterCode: string;
  solution: string;
  tests: CodeTestCase[];
};

export type VariantStep = {
  type: "VARIANT";
  prompt: string;
  challenges: VariantChallenge[];
};

export type BlueprintField = {
  id: string;
  label: string;
  prompt: string;
  canonical: string;
  acceptedKeywords: string[][];
};

export type PatternBlueprintLevel = Omit<PatternChoiceStep, "type"> & {
  type: "PATTERN_BLUEPRINT";
  blueprint: BlueprintField[];
};

export type LogicOrderingLevel = {
  type: "LOGIC_ORDERING";
  prompt: string;
  items: { id: string; text: string }[];
  correctOrder: string[];
  canonicalOnly: boolean;
};

export type CodeBlockOrderingLevel = Omit<BlockOrderingStep, "type"> & {
  type: "CODE_BLOCK_ORDERING";
};

export type WrittenBlock = {
  id: string;
  subgoal: string;
  prompt: string;
  starterCode: string;
  canonicalCode: string;
  dependencies: string[];
};

export type BlockWritingLevel = {
  type: "BLOCK_WRITING";
  prompt: string;
  blocks: WrittenBlock[];
  tests: CodeTestCase[];
};

export type FullRecallLevel = {
  type: "FULL_RECALL";
  prompt: string;
  solution: string;
  tests: CodeTestCase[];
  hints: [string, string, string, string, string];
};

export type TransferChallenge = VariantChallenge & {
  kind: "DEBUG" | "VARIANT";
  solution: string;
};

export type DebugVariantLevel = {
  type: "DEBUG_VARIANT";
  prompt: string;
  challenges: TransferChallenge[];
};

export type LearningLevel = PatternBlueprintLevel | LogicOrderingLevel | CodeBlockOrderingLevel | BlockWritingLevel | FullRecallLevel | DebugVariantLevel;
export type LearningLevels = [PatternBlueprintLevel, LogicOrderingLevel, CodeBlockOrderingLevel, BlockWritingLevel, FullRecallLevel, DebugVariantLevel];

export type TrainingStep = PatternChoiceStep | BlockOrderingStep | CodeFillStep | FullCodeStep | VariantStep;

export type ProblemStatement = {
  statement: string;
  officialLinks: { label: string; url: string; relation: "EXACT" | "RELATED" }[];
  input: string[];
  output: string;
  examples: { input: string; output: string; explanation?: string }[];
};

export type ProgressiveLesson = {
  id: string;
  familyId: `F${string}`;
  slug: string;
  title: string;
  priority: "P0" | "P1" | "P2" | "P3";
  basePattern: string;
  description: string;
  problem?: ProblemStatement;
  constraints: string[];
  functionSignature: string;
  officialSources: string[];
  status: "ACTIVE";
  version: number;
  steps?: [PatternChoiceStep, BlockOrderingStep, CodeFillStep, FullCodeStep, VariantStep];
  levels?: LearningLevels;
};

export type TrainingDraft = {
  patternChoice?: string;
  blockOrder?: string[];
  fillAnswers?: Record<string, string>;
  fullCode?: string;
  variantCode?: Record<string, string>;
  variantPassedIds?: string[];
  blueprintAnswers?: Record<string, string>;
  logicOrder?: string[];
  codeBlockOrder?: string[];
  writtenBlocks?: Record<string, string>;
  blockWritingCode?: string;
  fullRecallCode?: string;
  transferCode?: Record<string, string>;
  transferPassedIds?: string[];
  transferAnswers?: Record<string, Record<string, string>>;
};

export type CaseResult = { label: string; passed: boolean; expected: string; actual?: string; error?: string };

export function assertProgressiveLessons(value: ProgressiveLesson[]) {
  const ids = new Set<string>(); const slugs = new Set<string>();
  for (const lesson of value) {
    if (!lesson.id || !lesson.slug || ids.has(lesson.id) || slugs.has(lesson.slug)) throw new Error(`Invalid or duplicate lesson: ${lesson.id}`);
    ids.add(lesson.id); slugs.add(lesson.slug);
    if (!/^F(?:0[1-9]|1\d|2[0-4])$/.test(lesson.familyId)) throw new Error(`${lesson.id} has invalid family ${lesson.familyId}`);
    if (!lesson.version || lesson.version < 1 || !lesson.officialSources.length) throw new Error(`${lesson.id} needs version and provenance`);
    if (!lesson.problem?.statement.trim() || !lesson.problem.officialLinks.length || !lesson.problem.input.length || !lesson.problem.output.trim() || !lesson.problem.examples.length) {
      throw new Error(`${lesson.id} needs a complete problem statement with official links, input, output, and examples`);
    }
    if (lesson.problem.officialLinks.some((link) => !/^https:\/\/school\.programmers\.co\.kr\//.test(link.url))) throw new Error(`${lesson.id} has a non-Programmers official link`);
    if (!lesson.levels) throw new Error(`${lesson.id} must use the six-level engine`);
    if (!lesson.steps) { assertLearningLevels(lesson.id, lesson.levels); continue; }
    const steps = lesson.steps;
    if (steps.length !== 5) throw new Error(`${lesson.id} legacy steps must have five steps`);
    steps.forEach((step, index) => {
      if (step.type !== STEP_TYPES[index]) throw new Error(`${lesson.id} step ${index + 1} must be ${STEP_TYPES[index]}`);
    });
    if (steps[0].options.filter((option) => option.id === steps[0].correctOptionId).length !== 1) {
      throw new Error(`${lesson.id} must have one valid pattern answer`);
    }
    const blockIds = steps[1].blocks.map((block) => block.id);
    const orderedIds = steps[1].correctOrder;
    if (new Set(blockIds).size !== blockIds.length) throw new Error(`${lesson.id} block IDs must be unique`);
    if (orderedIds.length !== blockIds.length || new Set(orderedIds).size !== orderedIds.length) {
      throw new Error(`${lesson.id} block order is incomplete or duplicated`);
    }
    if (orderedIds.some((id) => !blockIds.includes(id)) || blockIds.some((id) => !orderedIds.includes(id))) {
      throw new Error(`${lesson.id} block order contains unknown or missing IDs`);
    }
    if (!steps[1].tests.length) throw new Error(`${lesson.id} block ordering needs deterministic tests`);
    if (!steps[3].tests.length || steps[4].challenges.some((challenge) => !challenge.tests.length)) {
      throw new Error(`${lesson.id} code steps need tests`);
    }
    assertLearningLevels(lesson.id, lesson.levels);
  }
  return value;
}

export function assertLearningLevels(lessonId: string, levels: LearningLevels) {
  if (levels.length !== 6) throw new Error(`${lessonId} must have six learning levels`);
  levels.forEach((level, index) => {
    if (level.type !== LEVEL_TYPES[index]) throw new Error(`${lessonId} level ${index + 1} must be ${LEVEL_TYPES[index]}`);
  });
  const blueprintIds = levels[0].blueprint.map((field) => field.id);
  if (!blueprintIds.length || new Set(blueprintIds).size !== blueprintIds.length) throw new Error(`${lessonId} blueprint fields must be present and unique`);
  const logicIds = levels[1].items.map((item) => item.id);
  if (new Set(logicIds).size !== logicIds.length || levels[1].correctOrder.length !== logicIds.length || levels[1].correctOrder.some((id) => !logicIds.includes(id))) {
    throw new Error(`${lessonId} logic ordering is invalid`);
  }
  const codeIds = levels[2].blocks.map((block) => block.id);
  if (new Set(codeIds).size !== codeIds.length || levels[2].correctOrder.length !== codeIds.length || levels[2].correctOrder.some((id) => !codeIds.includes(id))) {
    throw new Error(`${lessonId} code block ordering is invalid`);
  }
  const writingIds = levels[3].blocks.map((block) => block.id);
  if (!writingIds.length || new Set(writingIds).size !== writingIds.length || levels[3].blocks.some((block) => block.dependencies.some((id) => !writingIds.includes(id)))) {
    throw new Error(`${lessonId} block writing definitions are invalid`);
  }
  if (!levels[2].tests.length || !levels[3].tests.length || !levels[4].tests.length) throw new Error(`${lessonId} executable levels need tests`);
  if (!levels[5].challenges.some((challenge) => challenge.kind === "DEBUG") || !levels[5].challenges.some((challenge) => challenge.kind === "VARIANT")) {
    throw new Error(`${lessonId} needs debug and variant challenges`);
  }
  const challengeIds = levels[5].challenges.map((challenge) => challenge.id);
  if (new Set(challengeIds).size !== challengeIds.length || levels[5].challenges.some((challenge) => !challenge.tests.length || !challenge.solution.trim())) {
    throw new Error(`${lessonId} transfer challenges need unique IDs, tests, and solutions`);
  }
  for (const suite of [levels[2].tests, levels[3].tests, levels[4].tests, ...levels[5].challenges.map((challenge) => challenge.tests)]) {
    const labels = suite.map((test) => test.label);
    if (new Set(labels).size !== labels.length) throw new Error(`${lessonId} test labels must be unique within each suite`);
  }
  const fullFunction = levels[4].solution.match(/function\s+([A-Za-z_$][\w$]*)/)?.[1];
  if (!fullFunction) throw new Error(`${lessonId} full recall solution must declare a function`);
  for (const challenge of levels[5].challenges) {
    const functionName = challenge.functionSignature.split("(")[0].trim();
    if (!new RegExp(`function\\s+${functionName}\\s*\\(`).test(challenge.solution)) throw new Error(`${lessonId}/${challenge.id} solution does not match its signature`);
  }
  return levels;
}
