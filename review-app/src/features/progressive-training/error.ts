type SupabaseLikeError = { message?: unknown; code?: unknown; details?: unknown; hint?: unknown };

export function trainingErrorMessage(cause: unknown, fallback: string) {
  if (cause instanceof Error) return cause.message;
  if (cause && typeof cause === "object") {
    const error = cause as SupabaseLikeError;
    const code = typeof error.code === "string" ? error.code : "";
    const message = typeof error.message === "string" ? error.message : "";
    if (code === "PGRST205" || /could not find the table.*progressive_training/i.test(message)) {
      return "Supabase chưa có bảng Progressive Training. Hãy apply migration 20260901000000_create_progressive_training.sql rồi tải lại trang.";
    }
    if (message) return code ? `${message} (${code})` : message;
  }
  return fallback;
}
