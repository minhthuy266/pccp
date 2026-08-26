import { useCallback, useEffect, useRef, useState } from "react";
import type { User } from "@supabase/supabase-js";
import { cloudConfigured, supabase } from "./supabase";
import { syncReviewStore } from "./sync";
import { authErrorFromHash, isSuccessfulAuthHash } from "./authCallback";

export type SyncStatus = "disabled" | "signed_out" | "syncing" | "synced" | "error";

export function useCloudSync(onMerged: () => void) {
  const [user, setUser] = useState<User | null>(null);
  const [recovering, setRecovering] = useState(false);
  const [status, setStatus] = useState<SyncStatus>(cloudConfigured ? "signed_out" : "disabled");
  const [message, setMessage] = useState(() => authErrorFromHash(window.location.hash));
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
      if (next) {
        // Supabase has consumed the tokens; remove them from the address bar and
        // return the hash to an app route without reloading the SPA.
        if (isSuccessfulAuthHash(window.location.hash)) window.history.replaceState(null, "", `${window.location.pathname}${window.location.search}#/`);
        setMessage("");
        setTimeout(() => { void syncNow(); }, 0);
      }
    };
    void supabase.auth.getSession().then(({ data, error }) => {
      if (error) { setStatus("error"); setMessage(error.message); return; }
      acceptUser(data.session?.user ?? null);
    });
    const { data } = supabase.auth.onAuthStateChange((event, session) => {
      if (event === "PASSWORD_RECOVERY") setRecovering(true);
      acceptUser(session?.user ?? null);
    });
    const changed = () => {
      if (!userRef.current) return;
      if (timer.current) clearTimeout(timer.current);
      timer.current = setTimeout(() => { void syncNow(); }, 1200);
    };
    window.addEventListener("pccp-store-change", changed);
    return () => { data.subscription.unsubscribe(); window.removeEventListener("pccp-store-change", changed); if (timer.current) clearTimeout(timer.current); };
  }, [syncNow]);

  const signIn = async (email: string, password: string) => {
    if (!supabase) throw new Error("Supabase chưa được cấu hình");
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) throw error;
  };
  const signUp = async (email: string, password: string) => {
    if (!supabase) throw new Error("Supabase chưa được cấu hình");
    const redirect = `${window.location.origin}${window.location.pathname}`;
    const { data, error } = await supabase.auth.signUp({ email, password, options: { emailRedirectTo: redirect } });
    if (error) throw error;
    if (!data.session) setMessage("Đã tạo tài khoản. Kiểm tra email để xác nhận lần đầu.");
  };
  const requestPasswordReset = async (email: string) => {
    if (!supabase) throw new Error("Supabase chưa được cấu hình");
    const redirect = `${window.location.origin}${window.location.pathname}`;
    const { error } = await supabase.auth.resetPasswordForEmail(email, { redirectTo: redirect });
    if (error) throw error;
    setMessage("Đã gửi email đặt lại mật khẩu.");
  };
  const updatePassword = async (password: string) => {
    if (!supabase) throw new Error("Supabase chưa được cấu hình");
    const { error } = await supabase.auth.updateUser({ password });
    if (error) throw error;
    setRecovering(false);
    setMessage("");
  };
  const signOut = async () => { if (supabase) await supabase.auth.signOut(); };
  return { configured: cloudConfigured, user, recovering, status, message, setMessage, signIn, signUp, requestPasswordReset, updatePassword, signOut, syncNow };
}
