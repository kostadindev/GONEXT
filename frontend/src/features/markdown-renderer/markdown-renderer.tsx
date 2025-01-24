import React from "react";
import Markdown from "markdown-to-jsx";
import { theme } from "antd";

// Custom components for Markdown elements
const MarkdownComponents = {
  h1: ({ children }: { children: React.ReactNode }) => (
    <h1 className="text-2xl font-bold mt-4 mb-2">{children}</h1>
  ),
  h2: ({ children }: { children: React.ReactNode }) => (
    <h2 className="text-xl font-semibold mt-3 mb-2">{children}</h2>
  ),
  h3: ({ children }: { children: React.ReactNode }) => (
    <h3 className="text-lg font-medium mt-3 mb-2">{children}</h3>
  ),
  h4: ({ children }: { children: React.ReactNode }) => (
    <h4 className="text-base font-medium mt-2 mb-1">{children}</h4>
  ),
  p: ({ children }: { children: React.ReactNode }) => (
    <p className="text-base leading-relaxed mb-2">{children}</p>
  ),
  ul: ({ children }: { children: React.ReactNode }) => (
    <ul className="list-disc ml-6">{children}</ul>
  ),
  ol: ({ children }: { children: React.ReactNode }) => (
    <ol className="list-decimal ml-6">{children}</ol>
  ),
  blockquote: ({ children }: { children: React.ReactNode }) => (
    <blockquote className="border-l-4 border-blue-500 pl-4 italic">
      {children}
    </blockquote>
  ),
  code: ({ children }: { children: React.ReactNode }) => (
    <code className="px-1 py-0.5 rounded">{children}</code>
  ),
  pre: ({ children }: { children: React.ReactNode }) => (
    <pre className="p-4 rounded overflow-x-auto">{children}</pre>
  ),
  a: ({ href, children }: { href: string; children: React.ReactNode }) => (
    <a href={href} className="text-blue-600 underline hover:text-blue-800">
      {children}
    </a>
  ),
};

const MarkdownRenderer: React.FC<{ content: string }> = ({ content }) => {
  const { useToken } = theme;
  const { token } = useToken();

  const textColor = token.colorText; // Text color based on theme

  return (
    <div style={{ color: textColor }}>
      <Markdown
        options={{
          overrides: MarkdownComponents,
        }}
      >
        {content}
      </Markdown>
    </div>
  );
};

export default MarkdownRenderer;
