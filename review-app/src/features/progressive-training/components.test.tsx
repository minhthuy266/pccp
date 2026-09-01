import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";
import { ProgressiveTrainingIndex } from "./ProgressiveTrainingIndex";
import { ProgressiveTrainingLesson } from "./ProgressiveTrainingLesson";

describe("progressive training auth gates", () => {
  it("renders the existing-account gate without creating local progress", () => {
    const html = renderToStaticMarkup(<ProgressiveTrainingIndex configured userId={undefined} />);
    expect(html).toContain("Đăng nhập để bắt đầu");
    expect(html.match(/Đăng nhập để học/g)).toHaveLength(2);
  });
  it("does not mount the authenticated lesson hook while signed out", () => {
    const html = renderToStaticMarkup(<ProgressiveTrainingLesson configured lessonId="PT-DFS-TAKE-SKIP" />);
    expect(html).toContain("Cần đăng nhập Supabase");
  });
});
