import React from "react";
import { Layout, Typography, Steps, Carousel } from "antd";
import GlobalSearch from "../global-search/global-search";
import { QuickSearch } from "../quick-search/quick-search";
import {
  RobotOutlined,
  SmileOutlined,
  SolutionOutlined,
} from "@ant-design/icons";
import { GoogleLogin } from "@react-oauth/google";
import { handleLoginSuccess } from "../../libs/apis/auth-api";
import { useUser } from "../../context/user.context";

const { Content } = Layout;
const { Title, Paragraph } = Typography;

const HomePage: React.FC = () => {
  const { user, setUser } = useUser();

  const onLoginSuccess = async (credentialResponse: any) => {
    const token = credentialResponse.credential;
    const userData = await handleLoginSuccess(token);
    setUser(userData);
  };

  const onLoginError = () => {
    console.error("Login Failed");
  };

  const stepsItems = [
    {
      title: "Search Player in Game",
      status: "process",
      icon: <SolutionOutlined />,
    },
    { title: "Ask AI", status: "wait", icon: <RobotOutlined /> },
    { title: "Win", status: "wait", icon: <SmileOutlined /> },
  ];

  return (
    <div className="w-full h-full flex flex-col justify-center items-center p-4">
      {/* Header Section */}
      <div className="w-full max-w-3xl py-8 text-center">
        <Title level={3}>AI-powered In-Game Assistance and Analytics</Title>
        <Steps className="w-full" items={stepsItems as any} />
      </div>

      {/* AI Chatbot Usage Explanation */}
      <Paragraph className="text-center max-w-3xl mb-4">
        Once you've searched for a player in an active game, type any question
        about the game or players into the chat to receive AI insights. The AI
        agent has access to all visible game data, including the current match,
        players, and their histories. It can provide personalized advice such as
        optimal item builds and laning strategies tailored for this match.
      </Paragraph>

      {/* Conditional rendering: if user exists, show search; otherwise, show sign in */}
      <Content className="flex flex-col items-center mt-8 text-center w-full">
        {/* Uncomment and conditionally render GoogleLogin if needed */}
        {/* {user ? (
          <Space size="small">
            <GlobalSearch /> <span>or</span> <QuickSearch />
          </Space>
        ) : (
          <GoogleLogin
            onSuccess={onLoginSuccess}
            onError={onLoginError}
            useOneTap
          />
        )} */}
        <div className="w-full flex flex-col sm:flex-row items-center justify-center gap-5">
          <GlobalSearch />
          <span className="hidden sm:block">or</span>
          <QuickSearch />
        </div>
      </Content>

      {/* Image Carousel */}
      <div className="w-full sm:w-[50vw] pt-16">
        <Carousel autoplay arrows>
          {[0, 1, 2, 3].map((index) => (
            <div
              key={index}
              className="w-full sm:w-[50vw] h-[50vh] flex items-center justify-center"
            >
              <img
                src={`images/carousel/slide${index}.png`}
                alt={`Slide ${index}`}
                className="object-contain w-full h-full"
              />
            </div>
          ))}
        </Carousel>
      </div>
    </div>
  );
};

export default HomePage;
