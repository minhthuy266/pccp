import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";
import { ProgressiveTrainingIndex } from "./ProgressiveTrainingIndex";
import { BlockWritingView, ProblemStatementPanel, ProgressiveTrainingLesson } from "./ProgressiveTrainingLesson";
import { progressiveLessons } from "./lessons";

describe("progressive training auth gates", () => {
  it("renders the existing-account gate without creating local progress", () => {
    const html = renderToStaticMarkup(<ProgressiveTrainingIndex configured userId={undefined} />);
    expect(html).toContain("Đăng nhập để bắt đầu");
    expect(html.match(/Đăng nhập để học/g)).toHaveLength(24);
    expect(html).toContain("6 level");
    expect(html).not.toContain("5 tầng");
    expect(html).toContain("Module 1");
    expect(html).toContain("Map/Set, sorting và linear scan");
    expect(html).toContain("Grid và atomic simulation");
    expect(html).toContain("Queue và timeline simulation");
    expect(html).toContain("Cây quyết định và backtracking");
    expect(html).toContain("Heap selection, Top K và scheduling");
    expect(html).toContain("Tín hiệu nhận dạng");
    expect(html).toContain("Invariant phải giữ");
  });
  it("does not mount the authenticated lesson hook while signed out", () => {
    const html = renderToStaticMarkup(<ProgressiveTrainingLesson configured lessonId="PT-DFS-TAKE-SKIP" />);
    expect(html).toContain("Cần đăng nhập Supabase");
  });
  it("shows enough contract, input, output, constraints, and example context before state recall", () => {
    const lesson = progressiveLessons.find((item) => item.id === "PT-OF022-FATIGUE")!;
    const html = renderToStaticMarkup(<ProblemStatementPanel lesson={lesson} />);
    expect(html).toContain("Đề bài đầy đủ");
    expect(html).toContain("initialFatigue");
    expect(html).toContain("dungeons[i]");
    expect(html).toContain("Output");
    expect(html).toContain("Ví dụ");
    expect(html).toContain("80→60→50→10");
    expect(html).toContain("ĐỀ CHÍNH XÁC");
    expect(html).toContain("lessons/87946?language=javascript");
  });
  it("uses one full-code editor at level 4 and keeps blocks as a subgoal checklist", () => {
    const lesson = progressiveLessons.find((item) => item.id === "PT-DFS-TAKE-SKIP")!;
    const html = renderToStaticMarkup(<BlockWritingView
      lesson={lesson}
      draft={{}}
      update={() => undefined}
      submit={async () => true}
      help={async () => undefined}
      busy={false}
      done={false}
    />);
    expect(html).toContain("Viết trọn lời giải");
    expect(html).toContain("Checklist subgoal");
    expect(html.match(/<textarea/g)).toHaveLength(1);
    expect(html).not.toContain("Viết toàn bộ block");
  });
});
