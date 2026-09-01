import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { describe, expect, it } from "vitest";

const sql = readFileSync(resolve(process.cwd(), "supabase/migrations/20260901000000_create_progressive_training.sql"), "utf8");
const sixLevelSql = readFileSync(resolve(process.cwd(), "supabase/migrations/20260901010000_upgrade_progressive_six_levels.sql"), "utf8");
const schemaReloadSql = readFileSync(resolve(process.cwd(), "supabase/migrations/20260901020000_reload_progressive_rpc_schema.sql"), "utf8");

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

describe("six-level progressive training migration", () => {
  it("expands progress to six levels without deleting legacy rows", () => {
    expect(sixLevelSql).toContain("current_step between 1 and 6");
    expect(sixLevelSql).toContain("array[1, 2, 3, 4, 5, 6]");
    expect(sixLevelSql).toContain("add column if not exists full_recall_passed");
    expect(sixLevelSql).toContain("add column if not exists debug_passed");
    expect(sixLevelSql).toContain("first_full_recall_at");
    expect(sixLevelSql).toContain("pattern→L1, block ordering→L2+L3");
    expect(sixLevelSql).toContain("mastery_level = 'MASTERED' then 'TRANSFER_READY'");
    expect(sixLevelSql).not.toMatch(/delete\s+from|drop\s+table/i);
  });
  it("accepts both legacy attempts and all canonical six-level attempt types", () => {
    for (const type of ["PATTERN_CHOICE", "BLOCK_ORDERING", "CODE_FILL", "FULL_CODE", "VARIANT", "PATTERN_BLUEPRINT", "LOGIC_ORDERING", "CODE_BLOCK_ORDERING", "BLOCK_WRITING", "FULL_RECALL", "DEBUG_VARIANT"]) {
      expect(sixLevelSql).toContain(`'${type}'`);
    }
    expect(sixLevelSql).toContain("record_progressive_training_attempt_v2");
    expect(sixLevelSql).toContain("on conflict (id) do nothing");
    expect(sixLevelSql).toContain("first_recall::date < current_date");
    expect(sixLevelSql).toContain("next_mastery := 'TRANSFER_READY'");
    expect(sixLevelSql).toContain("notify pgrst, 'reload schema'");
    expect(schemaReloadSql).toContain("notify pgrst, 'reload schema'");
  });
});
