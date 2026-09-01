import { describe, expect, it } from "vitest";
import { trainingErrorMessage } from "./error";

describe("progressive training Supabase errors", () => {
  it("turns a missing-table PostgREST object into an actionable migration message", () => {
    expect(trainingErrorMessage({ code: "PGRST205", message: "Could not find the table" }, "fallback"))
      .toContain("20260901000000_create_progressive_training.sql");
  });
  it("preserves unknown Supabase messages and codes", () => {
    expect(trainingErrorMessage({ code: "42501", message: "permission denied" }, "fallback")).toBe("permission denied (42501)");
  });
});
