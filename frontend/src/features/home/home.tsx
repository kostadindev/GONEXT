import React from "react";
import {
  Typography,
  Steps,
  Carousel,
  ConfigProvider,
  theme as antdTheme,
} from "antd";
import {
  RobotOutlined,
  SmileOutlined,
  SolutionOutlined,
} from "@ant-design/icons";
import GlobalSearch from "../global-search/global-search";
import { QuickSearch } from "../quick-search/quick-search";

const { Title, Paragraph } = Typography;

const HomePage: React.FC = () => {
  const stepsItems = [
    { title: "Search", icon: <SolutionOutlined /> },
    { title: "Ask AI", icon: <RobotOutlined /> },
    { title: "Win", icon: <SmileOutlined /> },
  ];

  return (
    <ConfigProvider
      theme={{
        algorithm: antdTheme.defaultAlgorithm, // Force light mode
        token: {
          colorPrimary: "#e89a3c",
        },
      }}
    >
      <div className="flex flex-col items-center w-full text-gray-800 bg-white">
        {/* Hero Section */}
        <section className="w-full h-screen flex flex-col justify-center items-center px-6 text-black text-center bg-[linear-gradient(45deg,_#ffd8bf,_#ffe7ba,_#fff)]">
          <Title className="!text-5xl sm:!text-4xl font-bold">
            Your Game Companion Powered by AI
          </Title>
          <Paragraph className="text-lg sm:text-xl max-w-1xl mt-4">
            Instantly analyze players, strategies, and match conditions with
            real-time data and personalized insights.
          </Paragraph>
          <div className="mt-10 flex flex-wrap justify-center gap-6">
            <GlobalSearch />
            <QuickSearch />
          </div>
        </section>

        {/* How It Works */}
        {/* How It Works */}
        <section className="w-full py-20 px-6 bg-[#f0f2f5] text-center text-black">
          <Title level={2}>How It Works</Title>
          <Paragraph className="max-w-2xl mx-auto text-lg mb-12">
            Get smarter with every match. Here’s what the AI can do:
          </Paragraph>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-10 max-w-5xl mx-auto">
            {[
              {
                title: "Search",
                icon: <SolutionOutlined />,
                desc: "Start by entering a player or game name. Instantly access relevant data and historical performance.",
                color: "bg-orange-100 text-orange-600",
              },
              {
                title: "Ask AI",
                icon: <RobotOutlined />,
                desc: "Ask for insights, predictions, or strategy tips. The AI delivers contextual advice on demand.",
                color: "bg-blue-100 text-blue-600",
              },
              {
                title: "Win",
                icon: <SmileOutlined />,
                desc: "Use your new knowledge to outplay opponents. Climb ranks and track your improvement over time.",
                color: "bg-green-100 text-green-600",
              },
            ].map(({ title, icon, desc, color }) => (
              <div
                key={title}
                className="flex flex-col items-center text-center bg-white p-6 rounded-xl shadow hover:shadow-md transition-shadow duration-300"
              >
                <div className={`text-4xl p-4 rounded-full mb-4 ${color}`}>
                  {icon}
                </div>
                <h3 className="text-xl font-semibold mb-2">{title}</h3>
                <p className="text-gray-700">{desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Carousel / Product Demo */}
        <section className="w-full py-20 px-6 bg-white text-center text-black">
          <Title level={2}>Live Preview</Title>
          <Paragraph className="max-w-2xl mx-auto text-lg mb-10">
            Here's what you can expect when using our AI-powered match
            assistant.
          </Paragraph>
          <div className="w-full max-w-4xl mx-auto">
            <Carousel
              autoplay
              dots
              className="rounded-lg shadow-md overflow-hidden"
            >
              {[0, 1, 2].map((index) => (
                <div
                  key={index}
                  className="h-[60vh] bg-white flex justify-center items-center"
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
        </section>

        {/* AI Smarts Section */}
        <section className="w-full py-20 px-6 text-center text-black bg-[linear-gradient(120deg,_#fff2e8,_#ffd8bf)]">
          <Title level={2}>Why It’s Smart</Title>
          <div className="max-w-3xl mx-auto grid grid-cols-1 sm:grid-cols-3 gap-6 text-left mt-10">
            {[
              {
                title: "Player Intelligence",
                desc: "Access in-depth player stats, match history, and real-time performance.",
              },
              {
                title: "Game Context",
                desc: "Get insights into builds, team comps, and lane matchups—all AI analyzed.",
              },
              {
                title: "Winning Tips",
                desc: "Get suggestions for item builds, rotations, and team fights tailored to you.",
              },
            ].map(({ title, desc }) => (
              <div key={title} className="p-6 bg-white rounded-xl shadow">
                <Title level={4}>{title}</Title>
                <Paragraph>{desc}</Paragraph>
              </div>
            ))}
          </div>
        </section>

        {/* Use Cases Section */}
        <section className="w-full py-20 px-6 bg-white text-center text-black">
          <Title level={2}>How Players Use It</Title>
          <div className="max-w-4xl mx-auto grid grid-cols-1 sm:grid-cols-2 gap-8 mt-10 text-left">
            <div className="p-6 border-l-4 border-blue-600">
              <Title level={4}>Midlane Domination</Title>
              <Paragraph>
                Learn opponent tendencies, get counter-pick suggestions, and
                itemize like a pro.
              </Paragraph>
            </div>
            <div className="p-6 border-l-4 border-green-600">
              <Title level={4}>Jungle Pathing AI</Title>
              <Paragraph>
                AI analyzes where and when to gank, and predicts enemy jungle
                movements.
              </Paragraph>
            </div>
            <div className="p-6 border-l-4 border-red-600">
              <Title level={4}>Support Vision Coach</Title>
              <Paragraph>
                Know optimal ward placements and track the enemy support’s
                roaming patterns.
              </Paragraph>
            </div>
            <div className="p-6 border-l-4 border-purple-600">
              <Title level={4}>Climb Smarter</Title>
              <Paragraph>
                Post-match analysis shows where you lost tempo, mispositioned,
                or could’ve snowballed.
              </Paragraph>
            </div>
          </div>
        </section>

        <section className="w-full py-20 px-6 text-black text-center bg-[linear-gradient(135deg,_#ffe7ba,_#fff1e6)]  ">
          <Title className="!text-3xl sm:!text-4xl">Ready to Win More?</Title>
          <Paragraph className="text-lg max-w-xl mx-auto mb-6">
            Get AI-powered insights before and during your games. It's like
            having a coach by your side.
          </Paragraph>
          <div className="flex justify-center gap-4">
            <GlobalSearch />
            <QuickSearch />
          </div>
        </section>
      </div>
    </ConfigProvider>
  );
};

export default HomePage;
