import { Button } from "antd";
import TextArea from "antd/es/input/TextArea";
import React, {
  useState,
  ChangeEvent,
  KeyboardEvent,
  useEffect,
  useRef,
} from "react";
import { SendOutlined } from "@ant-design/icons";

interface Message {
  text: string;
  sender: "user" | "bot";
}

const ChatComponent: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const handleSendMessage = () => {
    setLoading(true);
    if (input.trim()) {
      setMessages((prevMessages) => [
        ...prevMessages,
        { text: input, sender: "user" },
      ]);
      setInput("");
      setTimeout(() => {
        setMessages((prevMessages) => [
          ...prevMessages,
          { text: "This is a bot response", sender: "bot" },
        ]);
        setLoading(false);
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
    }
  };

  useEffect(() => {
    setTimeout(() => {
      if (messagesEndRef.current) {
        messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
      }
    }, 100);
  }, [messages]);

  return (
    <div className="flex justify-center">
      <div className="flex flex-col w-[800px]" style={{ height: "calc(77vh)" }}>
        <div className="flex-1 overflow-auto p-4 bg-gray-100">
          {messages.map((msg, index) => (
            <div
              key={index}
              className={`my-2 ${
                msg.sender === "user" ? "text-right" : "text-left"
              }`}
            >
              <div
                className={`inline-block p-2 rounded-lg break-words ${
                  msg.sender === "user"
                    ? "bg-blue-500 text-white max-w-[75%]"
                    : "bg-gray-300 text-black max-w-full"
                }`}
              >
                {msg.text}
              </div>
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>
        <div className="p-4 border-gray-200 flex gap-3">
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
            onClick={handleSendMessage}
          />
        </div>
      </div>
    </div>
  );
};

export default ChatComponent;
