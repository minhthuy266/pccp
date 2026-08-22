import { useRef, useState, type KeyboardEvent } from "react";
import { editCode, formatJavaScriptIndentation } from "../domain/editor";

const PLACEHOLDER = `function solution(...) {
  // Tự dựng lại từ trí nhớ
}`;

export function CodeEditor({ value, onChange }: { value: string; onChange: (value: string) => void }) {
  const textarea = useRef<HTMLTextAreaElement>(null);
  const [scrollTop, setScrollTop] = useState(0);
  const lineCount = Math.max(1, value.split("\n").length);
  const applySelection = (start: number, end: number) => requestAnimationFrame(() => textarea.current?.setSelectionRange(start, end));
  const onKeyDown = (event: KeyboardEvent<HTMLTextAreaElement>) => {
    const target = event.currentTarget;
    const edit = editCode(value, target.selectionStart, target.selectionEnd, event.key, event.shiftKey);
    if (!edit) return;
    event.preventDefault();
    onChange(edit.value);
    applySelection(edit.selectionStart, edit.selectionEnd);
  };
  const format = () => {
    const formatted = formatJavaScriptIndentation(value);
    onChange(formatted);
    applySelection(formatted.length, formatted.length);
  };
  return <div className="code-editor">
    <div className="editor-toolbar"><span>JavaScript của bạn</span><span className="editor-shortcuts">Tab thụt lề · Enter tự indent · tự đóng ngoặc</span><button type="button" className="secondary" disabled={!value.trim()} onClick={format}>Chuẩn hóa thụt lề</button></div>
    <div className="editor-shell">
      <pre aria-hidden="true" className="line-numbers" style={{ transform: `translateY(-${scrollTop}px)` }}>{Array.from({ length: lineCount }, (_, index) => index + 1).join("\n")}</pre>
      <textarea ref={textarea} aria-label="JavaScript của bạn" wrap="off" spellCheck={false} value={value} onChange={(event) => onChange(event.target.value)} onKeyDown={onKeyDown} onScroll={(event) => setScrollTop(event.currentTarget.scrollTop)} placeholder={PLACEHOLDER} />
    </div>
  </div>;
}
