export const STEP_TYPES = ["PATTERN_CHOICE", "BLOCK_ORDERING", "CODE_FILL", "FULL_CODE", "VARIANT"] as const;
export type TrainingStepType = typeof STEP_TYPES[number];

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

export type TrainingStep = PatternChoiceStep | BlockOrderingStep | CodeFillStep | FullCodeStep | VariantStep;

export type ProgressiveLesson = {
  id: string;
  slug: string;
  title: string;
  priority: "P0" | "P1" | "P2";
  basePattern: string;
  description: string;
  constraints: string[];
  functionSignature: string;
  officialSources: string[];
  status: "ACTIVE";
  version: number;
  steps: [PatternChoiceStep, BlockOrderingStep, CodeFillStep, FullCodeStep, VariantStep];
};

export type TrainingDraft = {
  patternChoice?: string;
  blockOrder?: string[];
  fillAnswers?: Record<string, string>;
  fullCode?: string;
  variantCode?: Record<string, string>;
  variantPassedIds?: string[];
};

export type CaseResult = { label: string; passed: boolean; expected: string; actual?: string; error?: string };

export function assertProgressiveLessons(value: ProgressiveLesson[]) {
  const ids = new Set<string>();
  for (const lesson of value) {
    if (!lesson.id || !lesson.slug || ids.has(lesson.id)) throw new Error(`Invalid or duplicate lesson: ${lesson.id}`);
    ids.add(lesson.id);
    if (lesson.steps.length !== 5) throw new Error(`${lesson.id} must have five steps`);
    lesson.steps.forEach((step, index) => {
      if (step.type !== STEP_TYPES[index]) throw new Error(`${lesson.id} step ${index + 1} must be ${STEP_TYPES[index]}`);
    });
    if (lesson.steps[0].options.filter((option) => option.id === lesson.steps[0].correctOptionId).length !== 1) {
      throw new Error(`${lesson.id} must have one valid pattern answer`);
    }
    if (lesson.steps[1].correctOrder.length !== lesson.steps[1].blocks.length) throw new Error(`${lesson.id} block order is incomplete`);
    if (!lesson.steps[3].tests.length || lesson.steps[4].challenges.some((challenge) => !challenge.tests.length)) {
      throw new Error(`${lesson.id} code steps need tests`);
    }
  }
  return value;
}
