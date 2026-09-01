import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { describe, expect, it } from "vitest";

const sql = readFileSync(resolve(process.cwd(), "supabase/migrations/20260901000000_create_progressive_training.sql"), "utf8");

describe("progressive training migration security", () => {
  it("enables RLS, revokes anon, and scopes every client policy to auth.uid", () => {
    expect(sql).toContain("progressive_training_progress enable row level security");
    expect(sql).toContain("progressive_training_attempts enable row level security");
    expect(sql.match(/revoke all on table/g)).toHaveLength(2);
    expect(sql.match(/\(select auth\.uid\(\)\) = user_id/g)?.length).toBeGreaterThanOrEqual(5);
  });
  it("uses an authenticated idempotent transactional RPC", () => {
    expect(sql).toContain("active_user uuid := auth.uid()");
    expect(sql).toContain("on conflict (id) do nothing");
    expect(sql).toContain("security invoker");
    expect(sql).toContain("to authenticated");
    expect(sql).toContain("save_progressive_training_draft");
    expect(sql).toContain("greatest(progressive_training_progress.current_step, excluded.current_step)");
  });
});
