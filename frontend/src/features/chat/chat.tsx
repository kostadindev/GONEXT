import React, { useState, useEffect, useCallback, ChangeEvent } from "react";
import { Button, Avatar, Spin, Card, Tooltip } from "antd";
import TextArea from "antd/es/input/TextArea";
import { RobotOutlined, SendOutlined, ClearOutlined } from "@ant-design/icons";
import { OpenAIFilled } from "@ant-design/icons";
import DefaultPrompts from "./default-prompts/default-prompts";
import {
  addMessageToSession,
  getSessionByGameId,
  clearSessionMessages,
} from "../../libs/apis/sessions-api";
import { useUser } from "../../context/user.context";
import {
  sendChatMessageStream,
  getFollowUpSuggestions,
} from "../../libs/apis/chatbot-api";
import { Game } from "../../libs/league/league-types";
import MarkdownRenderer from "../markdown-renderer/markdown-renderer";
import { theme } from "antd";

const { useToken } = theme;

interface Message {
  content: string;
  role: "user" | "system";
}

interface ChatContext {
  game?: Game;
  history?: any;
}

const ChatComponent: React.FC<{
  game: Game | null;
  height: string;
  showAvatar?: boolean;
  context?: ChatContext;
}> = ({ game, height, showAvatar = true, context = {} }) => {
  const { user } = useUser();
  const { token } = useToken();
  const primaryColor = token.colorPrimary;

  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState<string>("");
  const [loadingSession, setLoadingSession] = useState<boolean>(true);
  const [isSending, setIsSending] = useState<boolean>(false);
  const [isUserScrolling, setIsUserScrolling] = useState<boolean>(false);
  const [sessionId, setSessionId] = useState<string | null>(null);
  const [followUps, setFollowUps] = useState<string[]>([]);
  const [isInputFocused, setIsInputFocused] = useState<boolean>(false);

  // Get current language from localStorage
  const [currentLanguage, setCurrentLanguage] = useState<string>(
    localStorage.getItem("language") || "en"
  );

  const messagesEndRef = React.useRef<HTMLDivElement>(null);
  const messageContainerRef = React.useRef<HTMLDivElement>(null);
  const textAreaRef = React.useRef<any>(null);

  const scrollToBottom = useCallback(() => {
    if (messageContainerRef.current) {
      messageContainerRef.current.scrollTo({
        top: messageContainerRef.current.scrollHeight,
        behavior: "smooth",
      });
    }
  }, []);

  const handleScroll = useCallback(() => {
    if (messageContainerRef.current) {
      const { scrollTop, scrollHeight, clientHeight } =
        messageContainerRef.current;
      const isAtBottom = scrollTop + clientHeight >= scrollHeight - 50;
      setIsUserScrolling(!isAtBottom);
    }
  }, []);

  useEffect(() => {
    let isMounted = true;

    const initializeSession = async () => {
      if (game?.gameId) {
        try {
          setLoadingSession(true);
          const session = await getSessionByGameId(game.gameId);
          if (session && isMounted) {
            setSessionId(session._id);
            setMessages(session.messages || []);
          }
        } catch (error) {
          console.error("Failed to fetch session:", error);
        } finally {
          setLoadingSession(false);
        }
      } else {
        setLoadingSession(false);
      }
    };

    initializeSession();
    return () => {
      isMounted = false;
    };
  }, [game]);

  // Listen for language changes
  useEffect(() => {
    const handleLanguageChange = () => {
      setCurrentLanguage(localStorage.getItem("language") || "en");
    };

    window.addEventListener("languageChanged", handleLanguageChange);
    return () => {
      window.removeEventListener("languageChanged", handleLanguageChange);
    };
  }, []);

  const handleSendMessage = async (message?: string) => {
    if (isSending) return;

    const textToSend = message || input;

    if (textToSend.trim()) {
      setMessages((prevMessages) => [
        ...prevMessages,
        { content: textToSend, role: "user" },
      ]);
      setInput("");
      setIsSending(true);
      setFollowUps([]);
      console.log("Sending message:", textToSend, sessionId);

      try {
        if (sessionId) {
          await addMessageToSession(sessionId, {
            content: textToSend,
            role: "user",
          });

          let partialResponse = "";
          let systemMessageIndex = -1;

          setMessages((prevMessages: any) => {
            const updatedMessages = [
              ...prevMessages,
              { content: "", role: "system" },
            ];
            systemMessageIndex = updatedMessages.length - 1;
            return updatedMessages;
          });

          await sendChatMessageStream(
            sessionId,
            {
              query: textToSend,
              match: game,
              context,
              language: currentLanguage,
            },
            (chunk) => {
              partialResponse += chunk;
              setMessages((prevMessages) => {
                const updatedMessages = [...prevMessages];
                if (
                  systemMessageIndex >= 0 &&
                  updatedMessages[systemMessageIndex]?.role === "system"
                ) {
                  updatedMessages[systemMessageIndex].content = partialResponse;
                }
                return updatedMessages;
              });
            }
          );

          await addMessageToSession(sessionId, {
            content: partialResponse,
            role: "system",
          });

          try {
            const suggestions = await getFollowUpSuggestions(sessionId, {
              messages: [
                ...messages,
                { content: textToSend, role: "user" },
                { content: partialResponse, role: "system" },
              ],
              match: game,
              context,
              language: currentLanguage,
            });
            setFollowUps(suggestions);
          } catch (err) {
            console.warn("Failed to load follow-up suggestions:", err);
          }
        } else {
          console.error("Session ID is missing");
        }
      } catch (error) {
        console.error("Error interacting with chatbot API:", error);
      } finally {
        setIsSending(false);
        scrollToBottom();
      }
    }
  };

  const handleInputChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setInput(e.target.value);
  };

  const handleKeyPress = (e: any) => {
    if (e.key === "Enter" && !isSending) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  useEffect(() => {
    if (!isUserScrolling) {
      scrollToBottom();
    }
  }, [messages, scrollToBottom, isUserScrolling]);

  useEffect(() => {
    if (followUps.length > 0 && !isUserScrolling) {
      scrollToBottom();
    }
  }, [followUps, scrollToBottom, isUserScrolling]);

  const handleClearChat = async () => {
    if (sessionId) {
      try {
        // Clear messages in the UI
        setMessages([]);
        setFollowUps([]);
        // Clear messages in MongoDB
        await clearSessionMessages(sessionId);
      } catch (error) {
        console.error("Error clearing chat:", error);
      }
    }
  };

  return (
    <div className="flex justify-center pt-6">
      <div
        className="flex flex-col w-[100%] min-w-[500px] max-w-[900px]"
        style={{ height: height }}
      >
        {messages.length === 0 && !loadingSession && (
          <DefaultPrompts handleSendMessage={handleSendMessage} />
        )}
        <div
          className="flex-1 overflow-y-auto px-6 py-4 space-y-6 relative"
          ref={messageContainerRef}
          onScroll={handleScroll}
          style={{
            background: `radial-gradient(circle at 50% 0%, ${token.colorPrimary}02 0%, transparent 50%)`,
          }}
        >
          {messages.map((msg, index) => (
            <div key={index} className="group relative">
              <div className="flex items-start gap-4 justify-start py-2">
                {/* Avatar for system messages (left side) */}
                {showAvatar && msg.role === "system" && (
                  <div className="flex-shrink-0 mt-1">
                    <Avatar
                      size={32}
                      icon={<RobotOutlined />}
                      className="shadow-sm transition-all duration-200 group-hover:shadow-md"
                      style={{
                        backgroundColor: token.colorFillTertiary,
                        color: primaryColor,
                        border: `1px solid ${token.colorBorder}`,
                      }}
                    />
                  </div>
                )}

                {/* Avatar for user messages (left side) */}
                {showAvatar && msg.role === "user" && (
                  <div className="flex-shrink-0 mt-1">
                    <Avatar
                      size={32}
                      src={user?.picture}
                      className="shadow-sm transition-all duration-200 group-hover:shadow-md"
                      style={{
                        backgroundColor: primaryColor,
                        border: `1px solid ${token.colorBorder}`,
                      }}
                    >
                      {user?.name?.charAt(0)?.toUpperCase()}
                    </Avatar>
                  </div>
                )}

                {/* Message content */}
                <div className="flex flex-col flex-1 min-w-0">
                  {msg.role === "user" ? (
                    <div
                      className="inline-block py-3 px-4 rounded-2xl break-words text-white shadow-sm transition-all duration-200 hover:shadow-md self-end max-w-[80%]"
                      style={{
                        background: `linear-gradient(135deg, ${primaryColor} 0%, ${primaryColor}dd 100%)`,
                        fontSize: "14px",
                        lineHeight: "1.5",
                      }}
                    >
                      {msg.content}
                    </div>
                  ) : (
                    <div className="w-full">
                      {msg.content.trim() === "" ? (
                        <div
                          className="flex items-center gap-3 py-3"
                          style={{ color: token.colorTextTertiary }}
                        >
                          <div className="flex gap-1">
                            <div
                              className="w-2 h-2 rounded-full animate-bounce"
                              style={{
                                backgroundColor: primaryColor,
                                opacity: 0.6,
                              }}
                            ></div>
                            <div
                              className="w-2 h-2 rounded-full animate-bounce"
                              style={{
                                backgroundColor: primaryColor,
                                opacity: 0.6,
                                animationDelay: "0.15s",
                              }}
                            ></div>
                            <div
                              className="w-2 h-2 rounded-full animate-bounce"
                              style={{
                                backgroundColor: primaryColor,
                                opacity: 0.6,
                                animationDelay: "0.3s",
                              }}
                            ></div>
                          </div>
                          <span
                            className="text-sm font-medium"
                            style={{ color: token.colorTextSecondary }}
                          >
                            Thinking...
                          </span>
                        </div>
                      ) : (
                        <div
                          className="py-2 prose prose-sm max-w-none"
                          style={{
                            fontSize: "14px",
                            lineHeight: "1.6",
                            color: token.colorText,
                          }}
                        >
                          <MarkdownRenderer content={msg.content} />
                        </div>
                      )}
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}

          {/* Follow-up suggestions */}
          {followUps.length > 0 && (
            <div className="mt-3 mb-2">
              <div
                className="text-sm mb-3 font-medium"
                style={{ color: token.colorTextTertiary }}
              >
                Suggested follow-ups:
              </div>
              <div className="flex flex-col gap-2">
                {followUps.map((suggestion, idx) => (
                  <div
                    key={idx}
                    onClick={() => handleSendMessage(suggestion)}
                    className="group cursor-pointer p-3 rounded-lg transition-all duration-200 hover:shadow-sm"
                    style={{
                      backgroundColor: token.colorFillTertiary,
                      border: `1px solid ${token.colorBorder}`,
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.backgroundColor =
                        token.colorFillSecondary;
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.backgroundColor =
                        token.colorFillTertiary;
                    }}
                  >
                    <div className="flex items-center gap-2">
                      <div
                        className="w-2 h-2 rounded-full flex-shrink-0"
                        style={{ backgroundColor: primaryColor }}
                      />
                      <span
                        className="text-sm leading-relaxed transition-colors"
                        style={{ color: token.colorText }}
                      >
                        {suggestion}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        <div className="flex justify-center px-6 pt-4 pb-6">
          <div className="w-full max-w-[700px] relative">
            <div
              className="flex gap-3 p-4 rounded-2xl shadow-sm transition-all duration-300 backdrop-blur-sm cursor-text"
              style={{
                backgroundColor: token.colorBgElevated,
                border: `1px solid ${
                  isInputFocused
                    ? primaryColor + "60"
                    : token.colorBorderSecondary
                }`,
                boxShadow: isInputFocused
                  ? `0 8px 25px -8px ${primaryColor}30, 0 0 0 1px ${primaryColor}20`
                  : "0 2px 8px rgba(0,0,0,0.06)",
              }}
              onClick={() => {
                if (textAreaRef.current && !isSending) {
                  textAreaRef.current.focus();
                }
              }}
            >
              <TextArea
                ref={textAreaRef}
                autoSize={{ minRows: 1, maxRows: 4 }}
                value={input}
                onChange={handleInputChange}
                onKeyDown={handleKeyPress}
                onFocus={() => setIsInputFocused(true)}
                onBlur={() => setIsInputFocused(false)}
                placeholder="Ask me anything about this match..."
                className="border-0 resize-none focus:ring-0 focus:border-0 placeholder:font-normal"
                style={{
                  fontSize: "15px",
                  lineHeight: "1.5",
                  boxShadow: "none",
                  backgroundColor: "transparent",
                  color: token.colorText,
                }}
                maxLength={512}
                disabled={isSending}
              />
              <div className="flex gap-2 items-end">
                <Tooltip title="Send message" placement="top">
                  <Button
                    type="primary"
                    shape="circle"
                    icon={<SendOutlined />}
                    onClick={() => handleSendMessage()}
                    disabled={isSending || !input.trim()}
                    size="large"
                    className="shadow-sm hover:shadow-md transition-all duration-200 hover:scale-105"
                    style={{
                      backgroundColor: input.trim()
                        ? primaryColor
                        : token.colorFillTertiary,
                      borderColor: input.trim()
                        ? primaryColor
                        : token.colorBorder,
                      color: input.trim() ? "white" : token.colorTextQuaternary,
                      width: "44px",
                      height: "44px",
                    }}
                  />
                </Tooltip>
                {messages.length > 0 && (
                  <Tooltip title="Clear conversation" placement="top">
                    <Button
                      shape="circle"
                      icon={<ClearOutlined />}
                      onClick={handleClearChat}
                      disabled={isSending}
                      size="large"
                      className="shadow-sm hover:shadow-md transition-all duration-200 hover:scale-105"
                      style={{
                        borderColor: token.colorBorderSecondary,
                        color: token.colorTextTertiary,
                        backgroundColor: token.colorFillQuaternary,
                        width: "44px",
                        height: "44px",
                      }}
                    />
                  </Tooltip>
                )}
              </div>
            </div>

            {/* Character count indicator */}
            {input.length > 400 && (
              <div
                className="absolute -bottom-5 right-2 text-xs transition-opacity duration-200"
                style={{
                  color:
                    input.length > 480
                      ? token.colorError
                      : token.colorTextTertiary,
                }}
              >
                {input.length}/512
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatComponent;
