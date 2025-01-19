import React, { useState, useEffect, useCallback, ChangeEvent } from "react";
import { Button, Avatar, Spin } from "antd";
import TextArea from "antd/es/input/TextArea";
import { SendOutlined } from "@ant-design/icons";
import { OpenAIFilled } from "@ant-design/icons";
import DefaultPrompts from "./default-prompts/default-prompts";
import {
  addMessageToSession,
  getSessionByGameId,
} from "../../libs/apis/sessions-api";
import { useUser } from "../../context/user.context";
import { sendChatMessageStream } from "../../libs/apis/chatbot-api";
import { Game } from "../../libs/league/league-types";
import MarkdownRenderer from "../markdown-renderer/markdown-renderer";

interface Message {
  content: string;
  role: "user" | "system";
}

const ChatComponent: React.FC<{ game: Game | null }> = ({ game }) => {
  const { user } = useUser();
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState<string>("");
  const [loadingSession, setLoadingSession] = useState<boolean>(true);
  const [sessionId, setSessionId] = useState<string | null>(null);
  const messagesEndRef = React.useRef<HTMLDivElement>(null);

  const scrollToBottom = useCallback(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, []);

  useEffect(() => {
    let isMounted = true;

    const initializeSession = async () => {
      if (game?.gameId) {
        try {
          setLoadingSession(true);
          const session = await getSessionByGameId(game?.gameId);
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
    const textToSend = message || input;

    if (textToSend.trim()) {
      setMessages((prevMessages) => [
        ...prevMessages,
        { content: textToSend, role: "user" },
      ]);
      setInput("");

      try {
        if (sessionId) {
          await addMessageToSession(sessionId, {
            content: textToSend,
            role: "user",
          });

          // Handle the streaming response
          let partialResponse = "";
          let hasStartedSystemMessage = false;

          await sendChatMessageStream(
            sessionId,
            { query: textToSend, match: game },
            (chunk) => {
              partialResponse += chunk; // Accumulate chunks into partialResponse
              setMessages((prevMessages) => {
                const updatedMessages = [...prevMessages];

                if (!hasStartedSystemMessage) {
                  // Add an initial system message only once
                  updatedMessages.push({
                    content: "",
                    role: "system",
                  });
                  hasStartedSystemMessage = true;
                }

                // Update the last system message with the accumulated response
                const lastMessageIndex = updatedMessages.length - 1;
                updatedMessages[lastMessageIndex].content = partialResponse;

                return updatedMessages;
              });
            }
          );

          // Save the final response to the session
          await addMessageToSession(sessionId, {
            content: partialResponse,
            role: "system",
          });
        } else {
          console.error("Session ID is missing");
        }
      } catch (error) {
        console.error("Error interacting with chatbot API:", error);
      } finally {
        scrollToBottom();
      }
    }
  };

  const handleInputChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setInput(e.target.value);
  };

  const handleKeyPress = (e: any) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleSendMessage();
    }
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, scrollToBottom]);

  return (
    <div className="flex justify-center">
      <Spin spinning={loadingSession} size="large">
        <div
          className="flex flex-col"
          style={{ width: "50vw", height: "calc(77vh)" }}
        >
          {messages.length === 0 && game?.gameId && !loadingSession && (
            <DefaultPrompts handleSendMessage={handleSendMessage} />
          )}
          <div className="flex-1 overflow-auto p-4 h-full">
            {messages.map((msg, index) => (
              <div key={index} className="my-2 flex pb-4">
                {msg.role === "system" ? (
                  <Avatar style={{ marginRight: 8 }} icon={<OpenAIFilled />} />
                ) : (
                  <Avatar style={{ marginRight: 8 }} src={user?.picture} />
                )}
                <div
                  className={`inline-block p-2 px-4 rounded-lg break-words ${
                    msg.role === "user"
                      ? "text-white bg-blue-500 max-w-[calc(100%-40px)]"
                      : "text-black bg-gray-200 w-full max-w-[calc(100%-40px)]"
                  }`}
                >
                  <MarkdownRenderer content={msg.content} />
                </div>
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>
          <div className="p-1 border-gray-200 flex gap-3">
            <TextArea
              autoSize
              value={input}
              onChange={handleInputChange}
              onKeyDown={handleKeyPress}
              placeholder="Type your message here..."
              style={{ fontSize: "16px" }}
              maxLength={256}
            />
            <Button
              icon={<SendOutlined />}
              onClick={() => handleSendMessage()}
            />
          </div>
        </div>
      </Spin>
    </div>
  );
};

export default ChatComponent;
