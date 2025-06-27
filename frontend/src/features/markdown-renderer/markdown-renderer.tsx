import React from "react";
import Markdown from "markdown-to-jsx";
import { theme } from "antd";
import {
  CodeOutlined,
  CheckCircleOutlined,
  ExclamationCircleOutlined,
} from "@ant-design/icons";

// Modern minimal tool call component
const SimpleToolCall: React.FC<{
  toolName: string;
  parameters: string;
  type: "start" | "result" | "error";
}> = ({ toolName, parameters, type }) => {
  const { useToken } = theme;
  const { token } = useToken();

  const primaryColor = "#e89a3c";

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

  const formatParameters = (params: string) => {
    try {
      const parsed = JSON.parse(params);
      return JSON.stringify(parsed);
    } catch {
      return params;
    }
  };

  return (
    <div style={getStyles()}>
      <span
        style={{
          fontWeight: 500,
          color: token.colorText,
        }}
      >
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
        <code
          style={{
            backgroundColor: token.colorBgLayout,
            padding: "2px 6px",
            borderRadius: "4px",
            fontSize: "12px",
            fontFamily: "ui-monospace, SFMono-Regular, Consolas, monospace",
            color: token.colorTextSecondary,
            border: `1px solid ${token.colorBorderSecondary}`,
            wordBreak: "break-all",
          }}
        >
          {formatParameters(parameters)}
        </code>
      </span>
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
          <Markdown key={`text-${lastIndex}`} options={{ overrides: {} }}>
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
        <Markdown key={`text-${lastIndex}`} options={{ overrides: {} }}>
          {remainingText}
        </Markdown>
      );
    }
  }

  return parts;
};

const MarkdownRenderer: React.FC<{ content: string }> = ({ content }) => {
  const { useToken } = theme;
  const { token } = useToken();

  // If no tool calls, render normal markdown
  if (!content.includes("@tool[")) {
    return (
      <div style={{ color: token.colorText }}>
        <Markdown options={{ overrides: {} }}>{content}</Markdown>
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
