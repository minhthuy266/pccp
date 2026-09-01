import type { BlockOrderingStep, CodeFillStep, PatternChoiceStep } from "./types";

const normalize = (value: string) => value.replace(/\s+/g, "").replace(/;$/, "");

export function checkPatternChoice(step: PatternChoiceStep, answer: string) {
  return answer === step.correctOptionId;
}

export function checkBlockOrder(step: BlockOrderingStep, order: string[]) {
  return order.length === step.correctOrder.length && order.every((id, index) => id === step.correctOrder[index]);
}

export function checkFillAnswers(step: CodeFillStep, answers: Record<string, string>) {
  const fields = step.blanks.map((blank) => ({
    id: blank.id,
    passed: blank.accepted.some((accepted) => normalize(accepted) === normalize(answers[blank.id] ?? "")),
  }));
  return { passed: fields.every((field) => field.passed), fields };
}
