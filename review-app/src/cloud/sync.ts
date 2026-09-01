import type { ReviewStore } from "../types";
import type { Json } from "./database.types";
import { loadStore, mergeStores, parseStoreJson, saveStore } from "../domain/store";
import { supabase } from "./supabase";

function validRemote(data: unknown): ReviewStore | null {
  return parseStoreJson(JSON.stringify(data));
}

export async function syncReviewStore(userId: string): Promise<ReviewStore> {
  if (!supabase) throw new Error("Supabase chưa được cấu hình");
  for (let attempt = 0; attempt < 3; attempt++) {
    const local = loadStore();
    const { data: row, error: readError } = await supabase.from("review_stores")
      .select("data, revision").eq("user_id", userId).maybeSingle();
    if (readError) throw readError;
    const remote = row ? validRemote(row.data) : null;
    const merged = remote ? mergeStores(local, remote) : local;
    if (!row) {
      const { error } = await supabase.from("review_stores").insert({ user_id: userId, data: merged as unknown as Json, revision: 1 });
      if (error?.code === "23505") continue;
      if (error) throw error;
      saveStore(merged, localStorage, false);
      return merged;
    }
    const { data: updated, error } = await supabase.from("review_stores")
      .update({ data: merged as unknown as Json, revision: row.revision + 1, updated_at: new Date().toISOString() })
      .eq("user_id", userId).eq("revision", row.revision).select("revision").maybeSingle();
    if (error) throw error;
    if (!updated) continue;
    saveStore(merged, localStorage, false);
    return merged;
  }
  throw new Error("Dữ liệu cloud vừa thay đổi; hãy đồng bộ lại");
}
