import React from "react";
import { Card, Typography, Button, Avatar } from "antd";
import { InfoCircleOutlined } from "@ant-design/icons";
import { OpenAIOutlined, OpenAIFilled, SmileOutlined } from "@ant-design/icons";

const { Title, Text } = Typography;

interface PromptCardProps {
  description: string;
  onClick: () => void;
}

const PromptCard: React.FC<PromptCardProps> = ({ description, onClick }) => (
  <div
    className="border rounded-2xl bg-white p-4 shadow-md hover:bg-gray-100 hover:shadow-lg transition-all duration-300 cursor-pointer"
    onClick={onClick}
  >
    <span className="text-center block mb-4 text-gray-500">{description}</span>
  </div>
);

const DEFAULT_PROMPTS = [
  "Get a detailed schedule to start your day productively.",
  "Steps and tips to create a personal website from scratch.",
  "Improve and streamline your daily work processes.",
  "Guidelines and tips for writing better React code.",
];

interface DefaultPromptsProps {
  handleSendMessage: (message: string) => void;
}

const DefaultPrompts: React.FC<DefaultPromptsProps> = ({
  handleSendMessage,
}) => {
  return (
    <div className="p-6 h-full flex justify-center flex-col">
      <div className="flex justify-center w-full p-10">
        <Avatar style={{ marginRight: 8 }} size={60} icon={<OpenAIFilled />} />
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {DEFAULT_PROMPTS.map((prompt) => (
          <PromptCard
            description={prompt}
            onClick={() => handleSendMessage(prompt)}
          />
        ))}
      </div>
    </div>
  );
};

export default DefaultPrompts;
