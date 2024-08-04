import { Button, Avatar } from "antd";
import TextArea from "antd/es/input/TextArea";
import React, {
  useState,
  ChangeEvent,
  KeyboardEvent,
  useEffect,
  useRef,
  useCallback,
} from "react";
import { SendOutlined } from "@ant-design/icons";
import { OpenAIFilled } from "@ant-design/icons";
import DefaultPrompts from "./default-prompts/default-prompts";
import {
  createSession,
  addMessageToSession,
} from "../../libs/apis/sessions-api";

interface Message {
  content: string;
  role: "user" | "system";
}

const ChatComponent: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [sessionId, setSessionId] = useState<string | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const hasInitialized = useRef(false);

  const scrollToBottom = useCallback(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, []);

  useEffect(() => {
    const initializeSession = async () => {
      if (!hasInitialized.current) {
        hasInitialized.current = true;
        const newSession = await createSession({ name: "New Session" });
        if (newSession) {
          setSessionId(newSession._id);
        }
      }
    };
    initializeSession();
  }, []);

  const handleSendMessage = async (message?: string) => {
    setLoading(true);
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
        setLoading(false);
        scrollToBottom();

        if (sessionId) {
          await addMessageToSession(sessionId, {
            content: botResponse,
            role: "system",
          });
        }
      }, 800);
    } else {
      setLoading(false);
    }
  };

  const handleInputChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setInput(e.target.value);
  };

  const handleKeyPress = (e: KeyboardEvent<HTMLTextAreaElement>) => {
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
      <div className="flex flex-col w-[800px]" style={{ height: "calc(77vh)" }}>
        {messages?.length === 0 && (
          <DefaultPrompts handleSendMessage={handleSendMessage} />
        )}
        <div className="flex-1 overflow-auto p-4 h-full">
          {messages.map((msg, index) => (
            <div key={index} className={"my-2 flex pb-4"}>
              {msg.role === "system" ? (
                <Avatar style={{ marginRight: 8 }} icon={<OpenAIFilled />} />
              ) : (
                <Avatar style={{ marginRight: 8 }} src={""} />
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
            loading={loading}
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
    </div>
  );
};

export default ChatComponent;
