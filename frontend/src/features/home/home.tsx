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
        {/* Carousel Preview */}
        <section className="w-full py-20 px-6 bg-white text-center text-black">
          <Title
            level={2}
            className="!text-3xl sm:!text-4xl text-[#1e1e1e]"
            style={goldmanTitleStyle}
          >
            Preview
          </Title>
          <Paragraph className="max-w-2xl mx-auto text-lg text-gray-600 mb-10">
            Here's what you can expect when using our AI-powered match
            assistant.
          </Paragraph>
          <div className="w-full max-w-7xl mx-auto">
            <Carousel
              autoplay
              dots
              className="rounded-xl shadow-lg overflow-hidden"
            >
              {[0, 1, 2].map((index) => (
                <div key={index} className="flex justify-center items-center">
                  <img
                    src={`images/carousel/slide${index}.png`}
                    alt={`Slide ${index}`}
                    className="object-contain w-full h-full"
                  />
                </div>
              ))}
            </Carousel>
          </div>
        </section>

        {/* Why It’s Smart */}
        <section className="w-full py-20 px-6 text-center text-black bg-[linear-gradient(120deg,_#fff2e8,_#ffd8bf)]">
          <Title
            level={2}
            className="!text-3xl sm:!text-4xl text-[#1e1e1e]"
            style={goldmanTitleStyle}
          >
            Why It’s Smart
          </Title>
          <div className="max-w-3xl mx-auto grid grid-cols-1 sm:grid-cols-3 gap-6 text-left mt-10">
            {["Player Intelligence", "Game Context", "Winning Tips"].map(
              (title, i) => {
                const descriptions = [
                  "Access in-depth player stats, match history, and latest performance.",
                  "Get insights into team comps and lane matchups—all AI analyzed.",
                  "Get suggestions for item builds, rotations, and team fights tailored to you.",
                ];
                return (
                  <div key={title} className="p-6 bg-white rounded-xl shadow">
                    <Title
                      level={4}
                      className="text-lg text-[#1e1e1e]"
                      style={goldmanTitleStyle}
                    >
                      {title}
                    </Title>
                    <Paragraph className="text-gray-700 leading-snug">
                      {descriptions[i]}
                    </Paragraph>
                  </div>
                );
              }
            )}
          </div>
        </section>

        {/* Use Cases */}
        <section className="w-full py-20 px-6 bg-white text-center text-black">
          <Title
            level={2}
            className="!text-3xl sm:!text-4xl text-[#1e1e1e]"
            style={goldmanTitleStyle}
          >
            How Players Use It
          </Title>
          <div className="max-w-4xl mx-auto grid grid-cols-1 sm:grid-cols-2 gap-8 mt-10 text-left">
            {[
              "Midlane Domination",
              "Jungle Pathing AI",
              "Support Vision Coach",
              "Ask any question.",
            ].map((title, i) => {
              const data = [
                "Learn about your opponent, get matchup tips, and itemize like a pro.",
                "AI can recommend when and where to gank, predicting enemy jungle movement and capitalizing on ally synergy.",
                "Know optimal ward placements for every stage of the game.",
                "Unlike traditional in-game tools, you can ask the AI anything in natural language and get all the information you need in one place.",
              ];
              const colors = [
                "border-blue-600",
                "border-green-600",
                "border-red-600",
                "border-purple-600",
              ];
              return (
                <div key={title} className={`p-6 border-l-4 ${colors[i]}`}>
                  <Title
                    level={4}
                    className="text-lg text-[#1e1e1e] mb-2"
                    style={goldmanTitleStyle}
                  >
                    {title}
                  </Title>
                  <Paragraph className="text-gray-700 text-sm leading-relaxed">
                    {data[i]}
                  </Paragraph>
                </div>
              );
            })}
          </div>
        </section>

        {/* Final CTA */}
        <section className="w-full py-20 px-6 text-black text-center bg-[linear-gradient(135deg,_#ffe7ba,_#fff1e6)]">
          <Title
            className="!text-4xl sm:!text-5xl tracking-tight text-[#1e1e1e]"
            style={goldmanTitleStyle}
          >
            Ready to Win More?
          </Title>
          <Paragraph className="text-lg max-w-xl mx-auto mb-6 text-gray-700">
            Get AI-powered insights during your games. It's like having a coach
            by your side.
          </Paragraph>
          <div className="flex flex-col sm:flex-row justify-center gap-4 items-center w-full px-4 sm:px-0">
            <div className="w-full sm:w-auto">
              <GlobalSearch />
            </div>
            <span className="text-gray-600 font-medium">or try it out for</span>
            <div className="w-full sm:w-auto">
              <QuickSearch />
            </div>
          </div>
        </section>
      </div>
    </ConfigProvider>
  );
};

export default HomePage;
