import React from "react";
import { Typography, Button, Avatar, theme } from "antd";
import { RobotFilled, RightOutlined } from "@ant-design/icons";
import { useTranslation } from "react-i18next";

const { Title, Text } = Typography;
const { useToken } = theme;

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
  const { token } = useToken();
  const primary = token.colorPrimary;

  return (
    <div className="p-6 h-full flex justify-center flex-col animate-fade-in">
      <div className="flex justify-center w-full pb-6">
        <div
          className="rounded-full p-1 shadow-sm"
          style={{
            background: `linear-gradient(135deg, ${primary}50, ${primary}20)`,
          }}
        >
          <Avatar
            style={{
              marginRight: 0,
              backgroundColor: token.colorFillSecondary,
              color: primary,
              border: `1px solid ${token.colorBorder}`,
              boxShadow: token.boxShadowTertiary,
            }}
            size={64}
            icon={<RobotFilled />}
          />
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-3xl mx-auto w-full">
        {DEFAULT_PROMPTS.map((promptKey, index) => (
          <div key={index} className="flex">
            <Button
              block
              className="rounded-2xl text-base h-20 sm:h-24 whitespace-normal break-words px-5 group transition-all duration-200 hover:scale-[1.01]"
              type="default"
              onClick={() => handleSendMessage(t(promptKey))}
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                gap: 12,
                backgroundColor: token.colorBgElevated,
                color: token.colorText,
                border: `1px solid ${token.colorBorder}`,
                boxShadow: token.boxShadowTertiary,
              }}
              onMouseEnter={(e) => {
                const el = e.currentTarget as HTMLButtonElement;
                el.style.backgroundColor = token.colorFillSecondary;
                el.style.borderColor = primary;
              }}
              onMouseLeave={(e) => {
                const el = e.currentTarget as HTMLButtonElement;
                el.style.backgroundColor = token.colorBgElevated;
                el.style.borderColor = token.colorBorder;
              }}
            >
              <span className="text-left leading-6">{t(promptKey)}</span>
              <span
                className="rounded-full w-9 h-9 flex items-center justify-center transition-all duration-200 group-hover:translate-x-1"
                style={{
                  backgroundColor: token.colorFillQuaternary,
                  color: primary,
                  border: `1px solid ${token.colorBorderSecondary}`,
                }}
              >
                <RightOutlined />
              </span>
            </Button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DefaultPrompts;
