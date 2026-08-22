import { useCallback, useEffect, useRef, useState } from "react";
import type { User } from "@supabase/supabase-js";
import { cloudConfigured, supabase } from "./supabase";
import { syncReviewStore } from "./sync";

export type SyncStatus = "disabled" | "signed_out" | "syncing" | "synced" | "error";

export function useCloudSync(onMerged: () => void) {
  const [user, setUser] = useState<User | null>(null);
  const [status, setStatus] = useState<SyncStatus>(cloudConfigured ? "signed_out" : "disabled");
  const [message, setMessage] = useState("");
  const userRef = useRef<User | null>(null);
  const running = useRef(false);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const syncNow = useCallback(async () => {
    const activeUser = userRef.current;
    if (!activeUser || running.current) return;
    running.current = true; setStatus("syncing"); setMessage("");
    try { await syncReviewStore(activeUser.id); setStatus("synced"); onMerged(); }
    catch (error) { setStatus("error"); setMessage(error instanceof Error ? error.message : "Không thể đồng bộ"); }
    finally { running.current = false; }
  }, [onMerged]);

  useEffect(() => {
    if (!supabase) return;
    const acceptUser = (next: User | null) => {
      userRef.current = next; setUser(next); setStatus(next ? "syncing" : "signed_out");
      if (next) setTimeout(() => { void syncNow(); }, 0);
    };
    void supabase.auth.getSession().then(({ data }) => acceptUser(data.session?.user ?? null));
    const { data } = supabase.auth.onAuthStateChange((_event, session) => acceptUser(session?.user ?? null));
    const changed = () => {
      if (!userRef.current) return;
      if (timer.current) clearTimeout(timer.current);
      timer.current = setTimeout(() => { void syncNow(); }, 1200);
    };
    window.addEventListener("pccp-store-change", changed);
    return () => { data.subscription.unsubscribe(); window.removeEventListener("pccp-store-change", changed); if (timer.current) clearTimeout(timer.current); };
  }, [syncNow]);

  const sendMagicLink = async (email: string) => {
    if (!supabase) throw new Error("Supabase chưa được cấu hình");
    const redirect = `${window.location.origin}${window.location.pathname}`;
    const { error } = await supabase.auth.signInWithOtp({ email, options: { emailRedirectTo: redirect } });
    if (error) throw error;
    setMessage("Đã gửi link đăng nhập. Kiểm tra email của bạn.");
  };
  const signOut = async () => { if (supabase) await supabase.auth.signOut(); };
  return { configured: cloudConfigured, user, status, message, setMessage, sendMagicLink, signOut, syncNow };
}
