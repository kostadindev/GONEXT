import React from "react";
import { Typography, Carousel, ConfigProvider, theme as antdTheme } from "antd";
import {
  RobotOutlined,
  SmileOutlined,
  SolutionOutlined,
} from "@ant-design/icons";
import GlobalSearch from "../global-search/global-search";
import { QuickSearch } from "../quick-search/quick-search";

const { Title, Paragraph } = Typography;

// Goldman font style
const goldmanTitleStyle = {
  fontFamily: '"Goldman", sans-serif',
  fontWeight: 500,
};

const HomePage: React.FC = () => {
  return (
    <ConfigProvider
      theme={{
        algorithm: antdTheme.defaultAlgorithm,
        token: {
          colorPrimary: "#e89a3c",
        },
      }}
    >
      <div className="flex flex-col items-center w-full text-gray-800 bg-white">
        {/* Hero Section */}
        <section className="relative w-full h-screen flex flex-col justify-center items-center px-6 pt-28 sm:pt-0 text-center bg-[linear-gradient(45deg,_#ffd8bf,_#ffe7ba,_#fff)] text-black">
          {/* Logo */}
          <div className="absolute top-4 left-4 sm:top-1 sm:left-6 flex items-center gap-3 z-10">
            <h1
              className="text-3xl sm:text-5xl cursor-pointer"
              style={{
                fontFamily: '"Goldman", serif',
                fontWeight: 400,
                color: "#2c2c2c",
                textShadow: "0 1px 2px rgba(255, 255, 255, 0.7)",
              }}
              onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            >
              GONEXT
            </h1>
          </div>

          <img
            src="/images/landing/monkey-poro.png"
            alt="Monkey Poro"
            className="w-[200px] sm:w-[300px] h-auto mb-6 mt-6 sm:mt-0"
          />

          <Title
            className="!text-3xl sm:!text-5xl tracking-tight text-[#1e1e1e]"
            style={goldmanTitleStyle}
          >
            Your Game Companion Powered by AI
          </Title>

          <Paragraph className="text-lg sm:text-2xl max-w-2xl mt-4 text-gray-700 leading-relaxed">
            Instantly analyze players, strategies, and match conditions with
            real-time data and personalized insights.
          </Paragraph>

          <div className="mt-10 flex flex-col items-center gap-4 w-full max-w-lg px-4 mb-12 sm:mb-0">
            <div className="w-full">
              <GlobalSearch />
            </div>
            <span className="hidden sm:inline text-gray-600 font-medium text-base sm:text-lg mt-1">
              or try it out for
            </span>
            <div className="hidden sm:block w-full">
              <QuickSearch />
            </div>
          </div>
        </section>

        {/* How It Works */}
        <section className="w-full py-20 px-6 bg-[#f0f2f5] text-center text-black">
          <Title
            level={2}
            className="!text-3xl sm:!text-4xl text-[#1e1e1e]"
            style={goldmanTitleStyle}
          >
            How It Works
          </Title>
          <Paragraph className="max-w-2xl mx-auto text-lg text-gray-600 mb-12 leading-relaxed">
            Get smarter with every match. Here’s what the AI can do:
          </Paragraph>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-10 max-w-5xl mx-auto">
            {["Search", "Ask AI", "Win"].map((title, i) => {
              const data = [
                {
                  icon: <SolutionOutlined />,
                  desc: "Start by entering a player in game. Instantly access relevant data and historical performance.",
                  color: "bg-orange-100 text-orange-600",
                },
                {
                  icon: <RobotOutlined />,
                  desc: "Ask for insights, predictions, or strategy tips. The AI delivers contextual advice on demand.",
                  color: "bg-blue-100 text-blue-600",
                },
                {
                  icon: <SmileOutlined />,
                  desc: "Use your new knowledge to outplay opponents. Climb ranks and track your improvement over time.",
                  color: "bg-green-100 text-green-600",
                },
              ];
              return (
                <div
                  key={title}
                  className="flex flex-col items-center text-center bg-white p-6 rounded-xl shadow hover:shadow-md transition-shadow duration-300"
                >
                  <div
                    className={`text-4xl p-4 rounded-full mb-4 ${data[i].color}`}
                  >
                    {data[i].icon}
                  </div>
                  <h3
                    className="text-xl font-semibold mb-2 text-[#2c2c2c]"
                    style={goldmanTitleStyle}
                  >
                    {title}
                  </h3>
                  <p className="text-gray-600 leading-snug text-sm">
                    {data[i].desc}
                  </p>
                </div>
              );
            })}
          </div>
        </section>

        {/* ... rest of the component stays unchanged ... */}
      </div>
    </ConfigProvider>
  );
};

export default HomePage;
