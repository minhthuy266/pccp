export function authErrorFromHash(hash: string) {
  const params = new URLSearchParams(hash.replace(/^#/, ""));
  return params.get("error_description") || params.get("error") || "";
}

export function isSuccessfulAuthHash(hash: string) {
  const params = new URLSearchParams(hash.replace(/^#/, ""));
  return Boolean(params.get("access_token") && params.get("refresh_token"));
}
