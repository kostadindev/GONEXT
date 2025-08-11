import React from "react";
import { Typography, Button, Avatar } from "antd";
import { RobotFilled } from "@ant-design/icons";
import { useTranslation } from "react-i18next";

const { Title, Text } = Typography;

const DEFAULT_PROMPTS = [
  "chat.defaultPrompts.createGamePlan",
  "chat.defaultPrompts.prioritizeItems",
  "chat.defaultPrompts.laneMatchupTips",
  "chat.defaultPrompts.weakestLink",
];

interface DefaultPromptsProps {
  handleSendMessage: (message: string) => void;
}

const DefaultPrompts: React.FC<DefaultPromptsProps> = ({
  handleSendMessage,
}) => {
  const { t } = useTranslation();

  return (
    <div className="p-6 h-full flex justify-center flex-col">
      <div className="flex justify-center w-full p-10">
        <Avatar
          style={{
            marginRight: 8,
            backgroundColor: "#ffb74d",
            color: "#fff",
          }}
          size={60}
          icon={<RobotFilled />}
        />
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-3xl mx-auto w-full">
        {DEFAULT_PROMPTS.map((promptKey, index) => (
          <div key={index} className="flex justify-center">
            <Button
              className="rounded-2xl shadow-md hover:shadow-lg text-base h-20 whitespace-normal break-words w-[90%] sm:w-[85%]"
              type="default"
              onClick={() => handleSendMessage(t(promptKey))}
            >
              {t(promptKey)}
            </Button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DefaultPrompts;
