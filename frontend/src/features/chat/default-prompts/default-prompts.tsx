import React from "react";
import { Card, Typography, Button, Avatar } from "antd";
import { InfoCircleOutlined } from "@ant-design/icons";
import { OpenAIOutlined, OpenAIFilled, SmileOutlined } from "@ant-design/icons";
const { Title, Text } = Typography;

interface PromptCardProps {
  title: string;
  description: string;
  onClick: () => void;
}

const PromptCard: React.FC<PromptCardProps> = ({
  title,
  description,
  onClick,
}) => (
  <div
    className="border rounded-2xl bg-white p-4 shadow-md hover:bg-gray-100 hover:shadow-lg transition-all duration-300 cursor-pointer"
    onClick={onClick}
  >
    <span className="text-center block mb-4 text-gray-500">{description}</span>
  </div>
);

const prompts = [
  {
    title: "Morning Routine for Productivity",
    description: "Get a detailed schedule to start your day productively.",
  },
  {
    title: "Make Me a Personal Website",
    description: "Steps and tips to create a personal website from scratch.",
  },
  {
    title: "Optimize My Workflows",
    description: "Improve and streamline your daily work processes.",
  },
  {
    title: "Learn React Best Practices",
    description: "Guidelines and tips for writing better React code.",
  },
];

const DefaultPrompts: React.FC = () => {
  const handlePromptClick = (title: string) => {
    console.log(`Prompt clicked: ${title}`);
  };

  return (
    <div className="p-6 h-full flex justify-center flex-col">
      <div className="flex justify-center w-full p-10">
        <Avatar style={{ marginRight: 8 }} size={60} icon={<OpenAIFilled />} />
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {prompts.map((prompt) => (
          <PromptCard
            key={prompt.title}
            title={prompt.title}
            description={prompt.description}
            onClick={() => handlePromptClick(prompt.title)}
          />
        ))}
      </div>
    </div>
  );
};

export default DefaultPrompts;
