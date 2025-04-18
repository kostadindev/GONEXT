import React from "react";
import { Typography, Button, Avatar } from "antd";
import { RobotFilled } from "@ant-design/icons";

const { Title, Text } = Typography;

const DEFAULT_PROMPTS = [
  "Give me a game plan",
  "What items should I build?",
  "How do I play my matchup?",
  "Who is their weakest player?",
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
        <Avatar
          style={{ marginRight: 8 }}
          size={60}
          icon={<RobotFilled spin />}
        />
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-xl mx-auto w-full">
        {DEFAULT_PROMPTS.map((prompt, index) => (
          <Button
            key={index}
            className="rounded-2xl shadow-md hover:shadow-lg text-base h-20 whitespace-normal break-words"
            type="default"
            onClick={() => handleSendMessage(prompt)}
            block
          >
            {prompt}
          </Button>
        ))}
      </div>
    </div>
  );
};

export default DefaultPrompts;
