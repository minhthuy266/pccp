import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

export function MarkdownPreview({ markdown }: { markdown: string }) {
  return <div className="markdown-preview">
    <ReactMarkdown
      remarkPlugins={[remarkGfm]}
      components={{
        a: ({ children, ...props }) => <a {...props} target="_blank" rel="noreferrer">{children}</a>,
        code: ({ children, className, ...props }) => <code className={className} {...props}>{children}</code>,
      }}
    >{markdown}</ReactMarkdown>
  </div>;
}
