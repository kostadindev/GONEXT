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

interface Message {
  content: string;
  role: "user" | "system";
}

const ChatComponent: React.FC<{ gameId: number }> = ({ gameId }) => {
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
    let isMounted = true; // To track component mount status

    const initializeSession = async () => {
      if (gameId) {
        // Start loading spinner for session fetch
        try {
          setLoadingSession(true);
          const session = await getSessionByGameId(gameId);
          if (session && isMounted) {
            setSessionId(session._id);
            setMessages(session.messages || []);
          }
        } catch (error) {
          console.error("Failed to fetch session:", error);
        } finally {
          setLoadingSession(false);
        }
      }
    };

    initializeSession();

    return () => {
      isMounted = false; // Clean up effect by marking the component as unmounted
    };
  }, [gameId]);

  const handleSendMessage = async (message?: string) => {
    const textToSend = message || input;

    if (textToSend.trim()) {
      setMessages((prevMessages) => [
        ...prevMessages,
        { content: textToSend, role: "user" },
      ]);
      setInput("");

      if (sessionId) {
        await addMessageToSession(sessionId, {
          content: textToSend,
          role: "user",
        });
      }

      setTimeout(async () => {
        const botResponse = "This is a bot response"; // Replace this with actual bot logic
        setMessages((prevMessages) => [
          ...prevMessages,
          { content: botResponse, role: "system" },
        ]);
        scrollToBottom();

        if (sessionId) {
          await addMessageToSession(sessionId, {
            content: botResponse,
            role: "system",
          });
        }
      }, 800);
    }
  };

  const handleInputChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setInput(e.target.value);
  };

  const handleKeyPress = (e: any) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleSendMessage();
      scrollToBottom();
    }
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, scrollToBottom]);

  return (
    <div className="flex justify-center">
      <Spin spinning={loadingSession} size="large">
        <div
          className="flex flex-col w-[800px]"
          style={{ height: "calc(77vh)" }}
        >
          {messages?.length === 0 && gameId && !loadingSession && (
            <DefaultPrompts handleSendMessage={handleSendMessage} />
          )}
          <div className="flex-1 overflow-auto p-4 h-full">
            {messages.map((msg, index) => (
              <div key={index} className={"my-2 flex pb-4"}>
                {msg.role === "system" ? (
                  <Avatar style={{ marginRight: 8 }} icon={<OpenAIFilled />} />
                ) : (
                  <Avatar
                    style={{ marginRight: 8 }}
                    src={user?.picture} // Use user's picture
                  />
                )}

                <div
                  className={`inline-block p-2 rounded-lg break-words ${
                    msg.role === "user"
                      ? "text-white bg-blue-500 max-w-[calc(100%-40px)]"
                      : "text-black max-w-[calc(100%-40px)]"
                  }`}
                >
                  {msg.content}
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
              onClick={() => {
                handleSendMessage();
              }}
            />
          </div>
          <span className="flex justify-center text-gray-500">
            Infernal AI may display inaccurate info, including about statistics,
            so double-check its responses.
          </span>
        </div>
      </Spin>
    </div>
  );
};

export default ChatComponent;
