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
  <Card
    className="rounded-2xl shadow-md hover:shadow-lg cursor-pointer flex items-center justify-center"
    styles={{
      body: {
        padding: "8px",
      },
    }}
    hoverable
    onClick={onClick}
  >
    {description}
  </Card>
);

const DEFAULT_PROMPTS = [
  "Give me a game plan",
  "What items should I build?",
  "How do I play my matchup?",
  "Who is their best and weakest player?",
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
        {DEFAULT_PROMPTS.map((prompt, index) => (
          <PromptCard
            key={index}
            description={prompt}
            onClick={() => handleSendMessage(prompt)}
          />
        ))}
      </div>
    </div>
  );
};

export default DefaultPrompts;
