export type Json = string | number | boolean | null | { [key: string]: Json | undefined } | Json[];

export type ReviewStoreRow = {
  user_id: string;
  data: Json;
  revision: number;
  updated_at: string;
};

export type ProgressiveTrainingProgressRow = {
  user_id: string;
  lesson_id: string;
  lesson_version: number;
  current_step: number;
  completed_steps: number[];
  mastery_level: "NEW" | "LEARNING" | "BLOCK_RECALL" | "ASSISTED_RECALL" | "FULL_RECALL" | "TRANSFER_READY" | "MASTERED" | "PRACTICING";
  full_code_passed: boolean;
  full_recall_passed: boolean;
  debug_passed: boolean;
  variant_passed: boolean;
  first_full_recall_at: string | null;
  viewed_solution: boolean;
  hint_level_used: number;
  attempt_count: number;
  draft_answers: Json;
  last_reviewed_at: string | null;
  next_review_at: string | null;
  created_at: string;
  updated_at: string;
};

export type Database = {
  public: {
    Tables: {
      review_stores: {
        Row: ReviewStoreRow;
        Insert: Partial<Omit<ReviewStoreRow, "user_id">> & Pick<ReviewStoreRow, "user_id" | "data">;
        Update: Partial<Omit<ReviewStoreRow, "user_id">>;
        Relationships: [];
      };
      progressive_training_progress: {
        Row: ProgressiveTrainingProgressRow;
        Insert: Partial<Omit<ProgressiveTrainingProgressRow, "user_id" | "lesson_id">> & Pick<ProgressiveTrainingProgressRow, "user_id" | "lesson_id">;
        Update: Partial<Omit<ProgressiveTrainingProgressRow, "user_id" | "lesson_id">>;
        Relationships: [];
      };
      progressive_training_attempts: {
        Row: {
          id: string; user_id: string; lesson_id: string; lesson_version: number;
          step_type: string; answer_payload: Json; passed: boolean; test_results: Json;
          hint_level_used: number; duration_ms: number; created_at: string;
        };
        Insert: {
          id: string; user_id: string; lesson_id: string; lesson_version: number;
          step_type: string; answer_payload?: Json; passed: boolean; test_results?: Json;
          hint_level_used?: number; duration_ms?: number; created_at?: string;
        };
        Update: never;
        Relationships: [];
      };
    };
    Views: Record<string, never>;
    Functions: {
      record_progressive_training_attempt: {
        Args: {
          p_attempt_id: string; p_lesson_id: string; p_lesson_version: number;
          p_step_type: string; p_answer_payload: Json; p_passed: boolean;
          p_test_results: Json; p_hint_level_used: number; p_duration_ms: number;
          p_current_step: number; p_completed_steps: number[];
          p_full_code_passed: boolean; p_variant_passed: boolean;
          p_viewed_solution: boolean; p_draft_answers: Json;
          p_next_review_at?: string | null;
        };
        Returns: ProgressiveTrainingProgressRow;
      };
      record_progressive_training_attempt_v2: {
        Args: {
          p_attempt_id: string; p_lesson_id: string; p_lesson_version: number;
          p_step_type: string; p_answer_payload: Json; p_passed: boolean;
          p_test_results: Json; p_hint_level_used: number; p_duration_ms: number;
          p_current_level: number; p_completed_levels: number[];
          p_full_recall_passed: boolean; p_debug_passed: boolean; p_variant_passed: boolean;
          p_viewed_solution: boolean; p_draft_answers: Json;
        };
        Returns: ProgressiveTrainingProgressRow;
      };
      save_progressive_training_draft: {
        Args: {
          p_lesson_id: string; p_lesson_version: number; p_draft_answers: Json;
          p_hint_level_used?: number; p_viewed_solution?: boolean;
        };
        Returns: ProgressiveTrainingProgressRow;
      };
    };
    Enums: Record<string, never>;
    CompositeTypes: Record<string, never>;
  };
};
