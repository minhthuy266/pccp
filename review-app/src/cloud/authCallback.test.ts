import { describe, expect, it } from "vitest";
import { authErrorFromHash, isSuccessfulAuthHash } from "./authCallback";

describe("Supabase auth callback", () => {
  it("recognises an implicit magic-link callback", () => {
    expect(isSuccessfulAuthHash("#access_token=access&refresh_token=refresh&type=magiclink")).toBe(true);
  });

  it("does not mistake an app route for an auth callback", () => {
    expect(isSuccessfulAuthHash("#/practice/OF050")).toBe(false);
  });

  it("extracts a readable callback error", () => {
    expect(authErrorFromHash("#error=access_denied&error_description=Email+link+is+invalid+or+has+expired")).toBe("Email link is invalid or has expired");
  });
});
