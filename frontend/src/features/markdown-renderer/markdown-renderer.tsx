import React, { useState } from "react";
import Markdown from "markdown-to-jsx";
import { theme } from "antd";
import {
  CodeOutlined,
  CheckCircleOutlined,
  ExclamationCircleOutlined,
  DownOutlined,
  UpOutlined,
} from "@ant-design/icons";

// Custom styled components for markdown elements
const StyledHeading = ({ level, children, ...props }: any) => {
  const { useToken } = theme;
  const { token } = useToken();

  const styles = {
    1: {
      fontSize: "28px",
      fontWeight: 600,
      marginTop: "24px",
      marginBottom: "16px",
      lineHeight: 1.25,
    },
    2: {
      fontSize: "24px",
      fontWeight: 600,
      marginTop: "20px",
      marginBottom: "12px",
      lineHeight: 1.3,
    },
    3: {
      fontSize: "20px",
      fontWeight: 600,
      marginTop: "16px",
      marginBottom: "8px",
      lineHeight: 1.35,
    },
    4: {
      fontSize: "18px",
      fontWeight: 600,
      marginTop: "12px",
      marginBottom: "6px",
      lineHeight: 1.4,
    },
    5: {
      fontSize: "16px",
      fontWeight: 600,
      marginTop: "10px",
      marginBottom: "4px",
      lineHeight: 1.45,
    },
    6: {
      fontSize: "14px",
      fontWeight: 600,
      marginTop: "8px",
      marginBottom: "4px",
      lineHeight: 1.5,
    },
  };

  const Tag = `h${level}` as keyof JSX.IntrinsicElements;

  return (
    <Tag
      style={{
        ...styles[level as keyof typeof styles],
        color: token.colorText,
        borderBottom:
          level <= 2 ? `1px solid ${token.colorBorderSecondary}` : "none",
        paddingBottom: level <= 2 ? "8px" : "0",
      }}
      {...props}
    >
      {children}
    </Tag>
  );
};

const StyledParagraph = ({ children, ...props }: any) => {
  const { useToken } = theme;
  const { token } = useToken();

  return (
    <p
      style={{
        margin: "16px 0",
        lineHeight: 1.6,
        color: token.colorText,
        fontSize: "15px",
      }}
      {...props}
    >
      {children}
    </p>
  );
};

const StyledCodeBlock = ({ children, className, ...props }: any) => {
  const { useToken } = theme;
  const { token } = useToken();

  const language = className?.replace("lang-", "") || "";

  return (
    <div
      style={{
        margin: "16px 0",
        borderRadius: "8px",
        backgroundColor: token.colorFillQuaternary,
        border: `1px solid ${token.colorBorder}`,
        overflow: "hidden",
      }}
    >
      {language && (
        <div
          style={{
            padding: "8px 16px",
            backgroundColor: token.colorFillTertiary,
            borderBottom: `1px solid ${token.colorBorder}`,
            fontSize: "12px",
            color: token.colorTextSecondary,
            fontFamily:
              'ui-monospace, SFMono-Regular, "SF Mono", Monaco, Menlo, Consolas, monospace',
          }}
        >
          {language}
        </div>
      )}
      <pre
        style={{
          margin: 0,
          padding: "16px",
          overflow: "auto",
          fontSize: "14px",
          lineHeight: 1.5,
          fontFamily:
            'ui-monospace, SFMono-Regular, "SF Mono", Monaco, Menlo, Consolas, monospace',
          color: token.colorText,
          backgroundColor: "transparent",
        }}
        {...props}
      >
        <code>{children}</code>
      </pre>
    </div>
  );
};

const StyledInlineCode = ({ children, ...props }: any) => {
  const { useToken } = theme;
  const { token } = useToken();

  return (
    <code
      style={{
        backgroundColor: token.colorFillSecondary,
        color: token.colorTextSecondary,
        padding: "2px 6px",
        borderRadius: "4px",
        fontSize: "13px",
        fontFamily:
          'ui-monospace, SFMono-Regular, "SF Mono", Monaco, Menlo, Consolas, monospace',
        border: `1px solid ${token.colorBorderSecondary}`,
      }}
      {...props}
    >
      {children}
    </code>
  );
};

const StyledBlockquote = ({ children, ...props }: any) => {
  const { useToken } = theme;
  const { token } = useToken();

  return (
    <blockquote
      style={{
        margin: "16px 0",
        padding: "12px 16px",
        borderLeft: `4px solid ${token.colorPrimary}`,
        backgroundColor: token.colorFillAlter,
        borderRadius: "0 8px 8px 0",
        color: token.colorTextSecondary,
        fontStyle: "italic",
      }}
      {...props}
    >
      {children}
    </blockquote>
  );
};

const StyledList = ({ ordered, children, ...props }: any) => {
  const { useToken } = theme;
  const { token } = useToken();

  const Tag = ordered ? "ol" : "ul";

  return (
    <Tag
      style={{
        margin: "12px 0",
        paddingLeft: "24px",
        color: token.colorText,
        lineHeight: 1.6,
      }}
      {...props}
    >
      {children}
    </Tag>
  );
};

const StyledListItem = ({ children, ...props }: any) => {
  return (
    <li
      style={{
        margin: "6px 0",
        fontSize: "15px",
      }}
      {...props}
    >
      {children}
    </li>
  );
};

const StyledLink = ({ children, ...props }: any) => {
  const { useToken } = theme;
  const { token } = useToken();

  return (
    <a
      style={{
        color: token.colorPrimary,
        textDecoration: "none",
        borderBottom: `1px solid transparent`,
        transition: "border-color 0.2s ease",
      }}
      onMouseEnter={(e) => {
        e.target.style.borderBottomColor = token.colorPrimary;
      }}
      onMouseLeave={(e) => {
        e.target.style.borderBottomColor = "transparent";
      }}
      {...props}
    >
      {children}
    </a>
  );
};

const StyledTable = ({ children, ...props }: any) => {
  const { useToken } = theme;
  const { token } = useToken();

  return (
    <div style={{ overflow: "auto", margin: "16px 0" }}>
      <table
        style={{
          width: "100%",
          borderCollapse: "collapse",
          border: `1px solid ${token.colorBorder}`,
          borderRadius: "8px",
          overflow: "hidden",
        }}
        {...props}
      >
        {children}
      </table>
    </div>
  );
};

const StyledTableHead = ({ children, ...props }: any) => {
  const { useToken } = theme;
  const { token } = useToken();

  return (
    <thead
      style={{
        backgroundColor: token.colorFillSecondary,
      }}
      {...props}
    >
      {children}
    </thead>
  );
};

const StyledTableCell = ({ children, isHeader, ...props }: any) => {
  const { useToken } = theme;
  const { token } = useToken();

  const Tag = isHeader ? "th" : "td";

  return (
    <Tag
      style={{
        padding: "12px 16px",
        border: `1px solid ${token.colorBorder}`,
        color: token.colorText,
        fontSize: "14px",
        textAlign: "left",
        fontWeight: isHeader ? 600 : 400,
      }}
      {...props}
    >
      {children}
    </Tag>
  );
};

const StyledHr = ({ ...props }: any) => {
  const { useToken } = theme;
  const { token } = useToken();

  return (
    <hr
      style={{
        margin: "24px 0",
        border: "none",
        borderTop: `1px solid ${token.colorBorderSecondary}`,
      }}
      {...props}
    />
  );
};

// Modern minimal tool call component
const SimpleToolCall: React.FC<{
  toolName: string;
  parameters: string;
  type: "start" | "result" | "error";
}> = ({ toolName, parameters, type }) => {
  const { useToken } = theme;
  const { token } = useToken();
  const [isExpanded, setIsExpanded] = useState(false);

  const primaryColor = "#e89a3c";

  const formatParameters = (params: string) => {
    try {
      const parsed = JSON.parse(params);
      return JSON.stringify(parsed, null, 2);
    } catch {
      return params;
    }
  };

  const formattedParams = formatParameters(parameters);
  const isLongContent =
    formattedParams.length > 100 || formattedParams.includes("\n");
  const shouldShowExpandButton = isLongContent;

  const getTruncatedParams = (params: string) => {
    if (!isLongContent) return params;
    if (params.includes("\n")) {
      return params.split("\n")[0] + "...";
    }
    return params.length > 100 ? params.substring(0, 100) + "..." : params;
  };

  const getStyles = () => {
    const baseStyle = {
      border: `1px solid ${token.colorBorder}`,
      borderRadius: "8px",
      padding: "6px 8px",
      margin: "4px 0",
      backgroundColor: token.colorBgContainer,
      fontSize: "14px",
      width: "100%",
      lineHeight: "1.4",
    };

    if (type === "result") {
      return {
        ...baseStyle,
        borderColor: token.colorSuccessBorder,
        backgroundColor: token.colorSuccessBg,
      };
    }
    if (type === "error") {
      return {
        ...baseStyle,
        borderColor: token.colorErrorBorder,
        backgroundColor: token.colorErrorBg,
      };
    }
    return {
      ...baseStyle,
      borderColor: token.colorBorder,
      backgroundColor: token.colorFillAlter,
    };
  };

  const getIconColor = () => {
    if (type === "result") return token.colorSuccess;
    if (type === "error") return token.colorError;
    return primaryColor;
  };

  const getIcon = () => {
    const iconStyle = {
      color: getIconColor(),
      fontSize: "16px",
      verticalAlign: "text-top",
      marginRight: "6px",
    };
    if (type === "result") return <CheckCircleOutlined style={iconStyle} />;
    if (type === "error")
      return <ExclamationCircleOutlined style={iconStyle} />;
    return <CodeOutlined style={iconStyle} />;
  };

  const getText = () => {
    if (type === "result") return `Tool completed successfully`;
    if (type === "error") return `Tool encountered an error`;
    return `Using tool`;
  };

  return (
    <div style={getStyles()}>
      <div
        style={{
          fontWeight: 500,
          color: token.colorText,
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "flex-start",
            justifyContent: "space-between",
            width: "100%",
            gap: "8px",
          }}
        >
          <div style={{ flex: 1, minWidth: 0 }}>
            {getIcon()}
            {getText()}{" "}
            <code
              style={{
                backgroundColor: token.colorBgLayout,
                padding: "1px 4px",
                borderRadius: "4px",
                fontSize: "13px",
                fontFamily: "ui-monospace, SFMono-Regular, Consolas, monospace",
                color: token.colorTextSecondary,
              }}
            >
              {toolName}
            </code>{" "}
            with{" "}
            {!shouldShowExpandButton && (
              <code
                style={{
                  backgroundColor: token.colorBgLayout,
                  padding: "2px 6px",
                  borderRadius: "4px",
                  fontSize: "12px",
                  fontFamily:
                    "ui-monospace, SFMono-Regular, Consolas, monospace",
                  color: token.colorTextSecondary,
                  border: `1px solid ${token.colorBorderSecondary}`,
                }}
              >
                {formattedParams}
              </code>
            )}
          </div>
          {shouldShowExpandButton && (
            <button
              onClick={() => setIsExpanded(!isExpanded)}
              style={{
                background: "none",
                border: "none",
                cursor: "pointer",
                padding: "4px",
                color: token.colorTextSecondary,
                fontSize: "12px",
                display: "flex",
                alignItems: "center",
                borderRadius: "4px",
                flexShrink: 0,
              }}
              title={isExpanded ? "Collapse" : "Expand"}
            >
              {isExpanded ? <UpOutlined /> : <DownOutlined />}
            </button>
          )}
        </div>
        {shouldShowExpandButton && (
          <div style={{ marginTop: "4px", width: "100%" }}>
            <code
              style={{
                backgroundColor: token.colorBgLayout,
                padding: "4px 6px",
                borderRadius: "4px",
                fontSize: "12px",
                fontFamily: "ui-monospace, SFMono-Regular, Consolas, monospace",
                color: token.colorTextSecondary,
                border: `1px solid ${token.colorBorderSecondary}`,
                whiteSpace: isExpanded ? "pre-wrap" : "nowrap",
                overflow: isExpanded ? "visible" : "hidden",
                textOverflow: isExpanded ? "initial" : "ellipsis",
                display: "block",
                width: "100%",
                boxSizing: "border-box",
              }}
            >
              {isExpanded
                ? formattedParams
                : getTruncatedParams(formattedParams)}
            </code>
          </div>
        )}
      </div>
    </div>
  );
};

// Process content and convert tool calls directly to JSX
const processContent = (content: string): React.ReactNode[] => {
  const toolCallRegex = /@tool\[([^\]]+)\]\{\s*"([^"]*(?:\\"[^"]*)*)"\s*\}/g;
  const parts: React.ReactNode[] = [];
  let lastIndex = 0;
  let match;

  while ((match = toolCallRegex.exec(content)) !== null) {
    // Add text before the tool call
    if (match.index > lastIndex) {
      const textBefore = content.slice(lastIndex, match.index);
      if (textBefore.trim()) {
        parts.push(
          <Markdown key={`text-${lastIndex}`} options={markdownOptions}>
            {textBefore}
          </Markdown>
        );
      }
    }

    // Process the tool call
    const [, toolNameWithType, parameters] = match;
    let type: "start" | "result" | "error" = "start";
    let toolName = toolNameWithType;

    if (toolNameWithType.endsWith(".result")) {
      type = "result";
      toolName = toolNameWithType.replace(".result", "");
    } else if (toolNameWithType.endsWith(".error")) {
      type = "error";
      toolName = toolNameWithType.replace(".error", "");
    }

    parts.push(
      <SimpleToolCall
        key={`tool-${match.index}`}
        toolName={toolName}
        parameters={parameters}
        type={type}
      />
    );

    lastIndex = match.index + match[0].length;
  }

  // Add remaining text
  if (lastIndex < content.length) {
    const remainingText = content.slice(lastIndex);
    if (remainingText.trim()) {
      parts.push(
        <Markdown key={`text-${lastIndex}`} options={markdownOptions}>
          {remainingText}
        </Markdown>
      );
    }
  }

  return parts;
};

// Markdown options with custom components
const markdownOptions = {
  overrides: {
    h1: { component: StyledHeading, props: { level: 1 } },
    h2: { component: StyledHeading, props: { level: 2 } },
    h3: { component: StyledHeading, props: { level: 3 } },
    h4: { component: StyledHeading, props: { level: 4 } },
    h5: { component: StyledHeading, props: { level: 5 } },
    h6: { component: StyledHeading, props: { level: 6 } },
    p: { component: StyledParagraph },
    pre: { component: StyledCodeBlock },
    code: { component: StyledInlineCode },
    blockquote: { component: StyledBlockquote },
    ul: { component: StyledList, props: { ordered: false } },
    ol: { component: StyledList, props: { ordered: true } },
    li: { component: StyledListItem },
    a: { component: StyledLink },
    table: { component: StyledTable },
    thead: { component: StyledTableHead },
    th: { component: StyledTableCell, props: { isHeader: true } },
    td: { component: StyledTableCell, props: { isHeader: false } },
    hr: { component: StyledHr },
  },
};

const MarkdownRenderer: React.FC<{ content: string }> = ({ content }) => {
  const { useToken } = theme;
  const { token } = useToken();

  // If no tool calls, render normal markdown
  if (!content.includes("@tool[")) {
    return (
      <div style={{ color: token.colorText }}>
        <Markdown options={markdownOptions}>{content}</Markdown>
      </div>
    );
  }

  // Process content with tool calls
  const processedParts = processContent(content);

  return (
    <div style={{ color: token.colorText }}>
      {processedParts.map((part, index) => (
        <div key={index}>{part}</div>
      ))}
    </div>
  );
};

export default MarkdownRenderer;
