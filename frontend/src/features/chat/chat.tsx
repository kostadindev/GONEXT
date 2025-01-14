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
import { sendChatMessage } from "../../libs/apis/chatbot-api";
import { Game } from "../../libs/league/league-types";
import Markdown from "markdown-to-jsx";
import MarkdownRenderer from "../markdown-renderer/markdown-renderer";

interface Message {
  content: string;
  role: "user" | "system";
}

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
    <blockquote className="border-l-4 border-blue-500 pl-4 italic text-gray-600">
      {children}
    </blockquote>
  ),
  code: ({ children }: { children: React.ReactNode }) => (
    <code className="bg-gray-100 text-red-600 px-1 py-0.5 rounded">
      {children}
    </code>
  ),
  pre: ({ children }: { children: React.ReactNode }) => (
    <pre className="bg-gray-900 text-white p-4 rounded overflow-x-auto">
      {children}
    </pre>
  ),
  a: ({ href, children }: { href: string; children: React.ReactNode }) => (
    <a href={href} className="text-blue-600 underline hover:text-blue-800">
      {children}
    </a>
  ),
};

// Updated Markdown rendering function
const renderContent = (content: string) => {
  return (
    <Markdown
      options={{
        overrides: MarkdownComponents,
      }}
    >
      {content}
    </Markdown>
  );
};

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
    let isMounted = true; // To track component mount status

    const initializeSession = async () => {
      if (game?.gameId) {
        // Start loading spinner for session fetch
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
      isMounted = false; // Clean up effect by marking the component as unmounted
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
          // Send the user's message to the chatbot API
          await addMessageToSession(sessionId, {
            content: textToSend,
            role: "user",
          });
          const botResponse = await sendChatMessage(sessionId, {
            query: textToSend,
            match: game,
          });
          await addMessageToSession(sessionId, {
            content: botResponse?.response,
            role: "system",
          });

          // Add the bot's response to the local state
          if (botResponse && botResponse.response) {
            setMessages((prevMessages) => [
              ...prevMessages,
              { content: botResponse.response, role: "system" },
            ]);
          } else {
            console.error("Invalid response from chatbot API");
          }
        } else {
          console.error("Session ID is missing");
        }
      } catch (error) {
        console.error("Error interacting with chatbot API:", error);
      } finally {
        scrollToBottom(); // Scroll to the bottom after updating messages
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
          className="flex flex-col"
          style={{ width: "50vw", height: "calc(77vh)" }}
        >
          {messages?.length === 0 && game?.gameId && !loadingSession && (
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
