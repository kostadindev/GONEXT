import React, { useState, useEffect, useCallback, ChangeEvent } from "react";
import { Button, Avatar, Spin, Card, Tooltip } from "antd";
import TextArea from "antd/es/input/TextArea";
import { RobotOutlined, SendOutlined, ClearOutlined } from "@ant-design/icons";
import { OpenAIFilled } from "@ant-design/icons";
import DefaultPrompts from "./default-prompts/default-prompts";
import {
  addMessageToSession,
  getSessionByGameId,
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
            { query: textToSend, match: game, context },
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
        // Clear messages only in the UI
        setMessages([]);
        setFollowUps([]);
        // We could also implement backend clearing if needed by calling an API
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
          className="flex-1 overflow-y-auto p-4"
          ref={messageContainerRef}
          onScroll={handleScroll}
        >
          {messages.map((msg, index) => (
            <div key={index} className="my-2 flex pb-1">
              {showAvatar &&
                (msg.role === "system" ? (
                  <Avatar style={{ marginRight: 8 }} icon={<RobotOutlined />} />
                ) : (
                  <Avatar style={{ marginRight: 8 }} src={user?.picture} />
                ))}
              {msg.role === "user" ? (
                <div
                  className="inline-block p-2 px-4 rounded-lg break-words text-white"
                  style={{
                    backgroundColor: primaryColor,
                    maxWidth: showAvatar ? "calc(80% - 40px)" : "80%",
                  }}
                >
                  {msg.content}
                </div>
              ) : (
                <Card
                  className="inline-block rounded-lg shadow-md text-black w-full break-words"
                  hoverable
                  style={{
                    maxWidth: showAvatar ? "calc(100% - 40px)" : "100%",
                  }}
                >
                  <MarkdownRenderer content={msg.content} />
                </Card>
              )}
            </div>
          ))}
          {followUps.length > 0 && (
            <div className="flex flex-wrap gap-2 mt-2">
              {followUps.map((suggestion, idx) => (
                <Button key={idx} onClick={() => handleSendMessage(suggestion)}>
                  {suggestion}
                </Button>
              ))}
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>
        <div className="flex justify-center pt-2">
          <div className="p-1 flex gap-3 w-[80%]">
            <TextArea
              autoSize
              value={input}
              onChange={handleInputChange}
              onKeyDown={handleKeyPress}
              placeholder="Type your message here..."
              style={{ fontSize: "16px" }}
              maxLength={256}
              disabled={isSending}
            />
            <div className="flex gap-2">
              <Tooltip title="Send message">
                <Button
                  icon={<SendOutlined />}
                  onClick={() => handleSendMessage()}
                  disabled={isSending}
                />
              </Tooltip>
              {messages.length > 0 && (
                <Tooltip title="Clear chat history">
                  <Button
                    icon={<ClearOutlined />}
                    onClick={handleClearChat}
                    disabled={isSending}
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
