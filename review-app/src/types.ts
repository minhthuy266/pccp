export type Grade = "A" | "B" | "C" | "D";
export const ANALYSIS_FIELDS = ["Contract", "Bounds", "Brute force", "Bottleneck", "Pattern", "State", "Transition", "Invariant", "Complexity"] as const;
export type AnalysisField = typeof ANALYSIS_FIELDS[number];
export type AssessmentStatus = "CORRECT" | "PARTIAL" | "WRONG";
export type PracticeMode = "LEARN" | "FULL" | "CODE_ONLY" | "TEMPLATE";
export type TemplateRating = "FLUENT" | "HESITANT" | "FAILED";
export interface TemplateAssessment {
  rating: TemplateRating;
  skeletonUsed: boolean;
  compared: boolean;
  transferPassed: boolean;
  transferPromptId?: string;
  transferAnswer?: string;
}
export interface PatternReviewRecord {
  reviewedAt: string;
  rating: TemplateRating;
  answers: { signals: string; core: string; variations: string };
}
export interface CodeEvidence {
  codeCompleted: boolean;
  examplesRun: boolean;
  officialPassed: boolean;
  edgeCasesChecked: boolean;
}
export interface FieldAssessment {
  status: AssessmentStatus;
  correctionNote: string;
  learnerAnswer: string;
}
export type ErrorCategory =
  | "RECOGNITION" | "STATE" | "INIT" | "LOOP" | "CONDITION"
  | "UPDATE" | "ORDER" | "INDEX" | "JAVASCRIPT";

export interface ReviewRecord {
  reviewedAt: string;
  dueAt: string;
  grade: Grade;
  durationSeconds: number;
  revealedHints: string[];
  errors: ErrorCategory[];
  note: string;
  analysisAnswers?: Partial<Record<AnalysisField, string>>;
  analysisAssessment?: Partial<Record<AnalysisField, FieldAssessment>>;
  practiceMode?: PracticeMode;
  codeEvidence?: CodeEvidence;
  masteryEligible?: boolean;
  firstStudy?: boolean;
  templateAssessment?: TemplateAssessment;
  templateAttempt?: string;
}

export interface LessonProgress {
  lessonId: string;
  draftAnalysis: Record<string, string>;
  draftCode: string;
  history: ReviewRecord[];
  updatedAt?: string;
}

export interface ReviewStore { version: 1; lessons: Record<string, LessonProgress>; patterns?: Record<string, PatternReviewRecord[]> }

export interface Lesson {
  id: string;
  title: string;
  pattern: string;
  officialUrl: string;
  references: Record<AnalysisField, string>;
  problem: string;
  recall1: string;
  blueprint: string;
  recall2: string;
  recall3: string;
  explanation: string;
  solution: string;
  sourcePath: string;
  warnings: string[];
}
