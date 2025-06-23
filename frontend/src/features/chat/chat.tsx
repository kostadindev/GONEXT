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
    <div className="flex justify-center pt-5">
      <div
        className="flex flex-col w-[100%] min-w-[500px]"
        style={{ height: height }}
      >
        {messages.length === 0 && !loadingSession && (
          <DefaultPrompts handleSendMessage={handleSendMessage} />
        )}
        <div
          className="flex-1 overflow-y-auto p-4 space-y-4"
          ref={messageContainerRef}
          onScroll={handleScroll}
        >
          {messages.map((msg, index) => (
            <div key={index} className="flex items-start gap-3 justify-start">
              {/* Avatar for system messages (left side) */}
              {showAvatar && msg.role === "system" && (
                <div className="flex-shrink-0">
                  <Avatar
                    size={36}
                    icon={<RobotOutlined />}
                    className="shadow-md border-2"
                    style={{
                      backgroundColor: token.colorFillTertiary,
                      color: primaryColor,
                      borderColor: token.colorBgContainer,
                    }}
                  />
                </div>
              )}

              {/* Avatar for user messages (left side) */}
              {showAvatar && msg.role === "user" && (
                <div className="flex-shrink-0">
                  <Avatar
                    size={36}
                    src={user?.picture}
                    className="shadow-md border-2"
                    style={{
                      backgroundColor: primaryColor,
                      borderColor: token.colorBgContainer,
                    }}
                  >
                    {user?.name?.charAt(0)?.toUpperCase()}
                  </Avatar>
                </div>
              )}

              {/* Message content */}
              <div className="flex flex-col items-start">
                {msg.role === "user" ? (
                  <div
                    className="inline-block p-3 px-4 rounded-2xl break-words text-white shadow-lg transition-all duration-200 hover:shadow-xl"
                    style={{
                      background: `linear-gradient(135deg, ${primaryColor} 0%, ${primaryColor}dd 100%)`,
                      maxWidth: showAvatar ? "calc(70% - 40px)" : "70%",
                      minWidth: "60px",
                    }}
                  >
                    {msg.content}
                  </div>
                ) : (
                  <Card
                    className="w-full rounded-2xl shadow-lg transition-all duration-200 hover:shadow-xl"
                    style={{
                      borderRadius: "16px",
                      minHeight: msg.content.trim() === "" ? "80px" : "auto",
                      // background: `linear-gradient(135deg, ${primaryColor}08 0%, ${primaryColor}05 100%)`,
                      // borderColor: `${primaryColor}20`,
                    }}
                    bodyStyle={{
                      padding: "20px",
                      borderRadius: "16px",
                      minHeight: msg.content.trim() === "" ? "40px" : "auto",
                      display: "flex",
                      alignItems:
                        msg.content.trim() === "" ? "center" : "flex-start",
                    }}
                  >
                    {msg.content.trim() === "" ? (
                      <div
                        className="flex items-center gap-2 w-full"
                        style={{ color: token.colorTextTertiary }}
                      >
                        <div className="animate-pulse flex gap-1">
                          <div
                            className="w-2 h-2 rounded-full animate-bounce"
                            style={{
                              backgroundColor: token.colorTextQuaternary,
                            }}
                          ></div>
                          <div
                            className="w-2 h-2 rounded-full animate-bounce"
                            style={{
                              backgroundColor: token.colorTextQuaternary,
                              animationDelay: "0.1s",
                            }}
                          ></div>
                          <div
                            className="w-2 h-2 rounded-full animate-bounce"
                            style={{
                              backgroundColor: token.colorTextQuaternary,
                              animationDelay: "0.2s",
                            }}
                          ></div>
                        </div>
                        <span className="text-sm">AI is thinking...</span>
                      </div>
                    ) : (
                      <MarkdownRenderer content={msg.content} />
                    )}
                  </Card>
                )}

                {/* Timestamp could go here */}
                <div
                  className="text-xs mt-1 px-2"
                  style={{ color: token.colorTextQuaternary }}
                >
                  {/* Add timestamp if needed */}
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

        <div className="flex justify-center pt-2 pb-2">
          <div
            className="p-3 flex gap-3 w-[85%] rounded-2xl shadow-md transition-all duration-200"
            style={{
              backgroundColor: token.colorBgContainer,
              border: `1px solid ${
                isInputFocused ? primaryColor : token.colorBorder
              }`,
              boxShadow: isInputFocused
                ? `0 0 0 2px ${primaryColor}20`
                : undefined,
            }}
          >
            <TextArea
              autoSize={{ minRows: 1, maxRows: 4 }}
              value={input}
              onChange={handleInputChange}
              onKeyDown={handleKeyPress}
              onFocus={() => setIsInputFocused(true)}
              onBlur={() => setIsInputFocused(false)}
              onMouseEnter={() => setIsInputFocused(true)}
              onMouseLeave={() => setIsInputFocused(false)}
              placeholder="Type your message here..."
              className="border-0 resize-none focus:ring-0 focus:border-0"
              style={{
                fontSize: "16px",
                boxShadow: "none",
                backgroundColor: "transparent",
              }}
              maxLength={256}
              disabled={isSending}
            />
            <div className="flex gap-2 items-end">
              <Tooltip title="Send message">
                <Button
                  type="primary"
                  shape="circle"
                  icon={<SendOutlined />}
                  onClick={() => handleSendMessage()}
                  disabled={isSending || !input.trim()}
                  className="shadow-md hover:shadow-lg transition-all duration-200"
                  style={{
                    backgroundColor: input.trim() ? primaryColor : undefined,
                    borderColor: input.trim() ? primaryColor : undefined,
                  }}
                />
              </Tooltip>
              {messages.length > 0 && (
                <Tooltip title="Clear chat history">
                  <Button
                    shape="circle"
                    icon={<ClearOutlined />}
                    onClick={handleClearChat}
                    disabled={isSending}
                    className="shadow-md hover:shadow-lg transition-all duration-200"
                    style={{
                      borderColor: token.colorBorder,
                      color: token.colorTextTertiary,
                    }}
                  />
                </Tooltip>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatComponent;
