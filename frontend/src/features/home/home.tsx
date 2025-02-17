import React from "react";
import { Layout, Typography, Space, Steps, Carousel } from "antd";
import GlobalSearch from "../global-search/global-search";
import { QuickSearch } from "../quick-search/quick-search";
import {
  LoadingOutlined,
  SmileOutlined,
  SolutionOutlined,
  UserOutlined,
} from "@ant-design/icons";

const { Content } = Layout;
const { Title, Paragraph } = Typography;

const HomePage: React.FC = () => {
  return (
    <div className="w-full h-full flex flex-col justify-center items-center">
      {/* Header Section */}
      <div className="w-full max-w-[50%] py-8 text-center">
        <Title level={3}>AI-powered In-Game Assistance and Analytics</Title>
        <Steps
          className="w-full"
          items={[
            { title: "Login", status: "finish", icon: <UserOutlined /> },
            {
              title: "Search Player in Game",
              status: "process",
              icon: <LoadingOutlined />,
            },
            { title: "Ask AI", status: "wait", icon: <SolutionOutlined /> },
            { title: "Win", status: "wait", icon: <SmileOutlined /> },
          ]}
        />
      </div>

      {/* AI Chatbot Usage Explanation */}
      <Paragraph className="text-center max-w-[50%] mb-4">
        Once you've searched for a player in an active game, type any question
        about the game or players into the chat to receive AI insights. The AI
        agent has access to all visible game data, including the current match,
        players, and their histories. It can provide personalized advice such as
        optimal item builds and laning strategies tailored for this match.
      </Paragraph>

      {/* Search Options */}
      <Content className="flex flex-col items-center mt-8 text-center">
        <Space size="small">
          <GlobalSearch /> <span>or</span> <QuickSearch />
        </Space>
      </Content>

      {/* Image Carousel */}
      <div className="w-[50vw] pt-16">
        <Carousel autoplay arrows>
          {[0, 1, 2, 3].map((index) => (
            <div
              key={index}
              className="w-[50vw] h-[50vh] flex items-center justify-center"
            >
              <img
                src={`images/carousel/slide${index}.png`}
                alt={`Slide ${index}`}
              />
            </div>
          ))}
        </Carousel>
      </div>
    </div>
  );
};

export default HomePage;
