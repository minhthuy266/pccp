import type { BlockOrderingStep, BlueprintField, CaseResult, CodeFillStep, LogicOrderingLevel, PatternChoiceStep, WrittenBlock } from "./types";

type BlockOrderSpec = Omit<BlockOrderingStep, "type">;

const normalize = (value: string) => value.replace(/\s+/g, "").replace(/;$/, "");

export function checkPatternChoice(step: PatternChoiceStep, answer: string) {
  return answer === step.correctOptionId;
}

export type BlockOrderStructure = {
  valid: boolean;
  unknownIds: string[];
  duplicateIds: string[];
  missingIds: string[];
};

export type BlockOrderEvaluation = BlockOrderStructure & {
  passed: boolean;
  canonicalMatched: boolean;
  source: string;
  results: CaseResult[];
};

export function validateBlockOrderStructure(step: BlockOrderSpec, order: string[]): BlockOrderStructure {
  const known = new Set(step.blocks.map((block) => block.id));
  const seen = new Set<string>();
  const duplicateIds = new Set<string>();
  const unknownIds = new Set<string>();
  for (const id of order) {
    if (!known.has(id)) unknownIds.add(id);
    if (seen.has(id)) duplicateIds.add(id);
    seen.add(id);
  }
  const missingIds = step.blocks.map((block) => block.id).filter((id) => !seen.has(id));
  return {
    valid: order.length === step.blocks.length && unknownIds.size === 0 && duplicateIds.size === 0 && missingIds.length === 0,
    unknownIds: [...unknownIds],
    duplicateIds: [...duplicateIds],
    missingIds,
  };
}

export function assembleBlockCode(step: BlockOrderSpec, order: string[]) {
  const blocks = new Map(step.blocks.map((block) => [block.id, block.code]));
  return order.map((id) => blocks.get(id) ?? "").join("\n");
}

export async function evaluateBlockOrder(
  step: BlockOrderSpec,
  order: string[],
  execute: (source: string, cases: BlockOrderSpec["tests"]) => Promise<CaseResult[]>,
): Promise<BlockOrderEvaluation> {
  const structure = validateBlockOrderStructure(step, order);
  if (!structure.valid) return { ...structure, passed: false, canonicalMatched: false, source: "", results: [] };
  const source = assembleBlockCode(step, order);
  const results = await execute(source, step.tests);
  const canonicalMatched = order.every((id, index) => id === step.correctOrder[index]);
  return {
    ...structure,
    source,
    results,
    canonicalMatched,
    passed: results.length === step.tests.length
      && results.every((result) => result.passed)
      && (!step.canonicalOnly || canonicalMatched),
  };
}

export function checkFillAnswers(step: CodeFillStep, answers: Record<string, string>) {
  const fields = step.blanks.map((blank) => ({
    id: blank.id,
    passed: blank.accepted.some((accepted) => normalize(accepted) === normalize(answers[blank.id] ?? "")),
  }));
  return { passed: fields.every((field) => field.passed), fields };
}

const normalizeWords = (value: string) => value.toLocaleLowerCase("vi").replace(/[^\p{L}\p{N}]+/gu, " ").trim();

export function checkBlueprintAnswers(fields: BlueprintField[], answers: Record<string, string>) {
  const results = fields.map((field) => {
    const answer = normalizeWords(answers[field.id] ?? "");
    return {
      id: field.id,
      passed: answer.length > 0 && field.acceptedKeywords.some((group) => group.every((keyword) => answer.includes(normalizeWords(keyword)))),
    };
  });
  return { passed: results.every((field) => field.passed), fields: results };
}

export function validateLogicOrder(step: LogicOrderingLevel, order: string[]) {
  const ids = step.items.map((item) => item.id);
  const structure = validateOrderIds(ids, order);
  const canonicalMatched = structure.valid && order.every((id, index) => id === step.correctOrder[index]);
  return { ...structure, canonicalMatched, passed: structure.valid && (!step.canonicalOnly || canonicalMatched) };
}

function validateOrderIds(expectedIds: string[], order: string[]) {
  const known = new Set(expectedIds); const seen = new Set<string>();
  const unknownIds = new Set<string>(); const duplicateIds = new Set<string>();
  for (const id of order) { if (!known.has(id)) unknownIds.add(id); if (seen.has(id)) duplicateIds.add(id); seen.add(id); }
  const missingIds = expectedIds.filter((id) => !seen.has(id));
  return { valid: order.length === expectedIds.length && !unknownIds.size && !duplicateIds.size && !missingIds.length, unknownIds: [...unknownIds], duplicateIds: [...duplicateIds], missingIds };
}

export function assembleWrittenBlocks(blocks: WrittenBlock[], answers: Record<string, string>) {
  return blocks.map((block) => answers[block.id] ?? "").join("\n");
}
