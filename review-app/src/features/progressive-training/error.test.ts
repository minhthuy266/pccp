import { describe, expect, it } from "vitest";
import { trainingErrorMessage } from "./error";

describe("progressive training Supabase errors", () => {
  it("turns a missing-table PostgREST object into an actionable migration message", () => {
    expect(trainingErrorMessage({ code: "PGRST205", message: "Could not find the table" }, "fallback"))
      .toContain("20260901000000_create_progressive_training.sql");
  });
  it("turns a missing six-level RPC into an actionable migration and cache message", () => {
    expect(trainingErrorMessage({
      code: "PGRST202",
      message: "Could not find the function public.record_progressive_training_attempt_v2(p_answer_payload) in the schema cache",
    }, "fallback")).toContain("20260901010000_upgrade_progressive_six_levels.sql");
    expect(trainingErrorMessage({
      code: "PGRST202",
      message: "Could not find the function public.record_progressive_training_attempt_v2(p_answer_payload) in the schema cache",
    }, "fallback")).toContain("reload schema");
  });
  it("preserves unknown Supabase messages and codes", () => {
    expect(trainingErrorMessage({ code: "42501", message: "permission denied" }, "fallback")).toBe("permission denied (42501)");
  });
});
