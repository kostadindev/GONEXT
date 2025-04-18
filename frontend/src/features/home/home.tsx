import React from "react";
import { Layout, Typography, Steps, Carousel } from "antd";
import {
  RobotOutlined,
  SmileOutlined,
  SolutionOutlined,
} from "@ant-design/icons";
import GlobalSearch from "../global-search/global-search";
import { QuickSearch } from "../quick-search/quick-search";

const { Content } = Layout;
const { Title, Paragraph } = Typography;

const HomePage: React.FC = () => {
  const stepsItems = [
    { title: "Search Player", icon: <SolutionOutlined /> },
    { title: "Ask AI", icon: <RobotOutlined /> },
    { title: "Win", icon: <SmileOutlined /> },
  ];

  return (
    <div className="min-h-screen w-full bg-gray-50 flex flex-col items-center text-gray-800">
      {/* Hero Section */}
      <section className="w-full max-w-5xl px-6 pt-20 pb-10 text-center">
        <Title level={4} className="!text-4xl sm:!text-4xl !leading-tight mb-4">
          Dominate Your Game with AI Insights
        </Title>
        <Paragraph className="text-lg sm:text-xl max-w-3xl mx-auto">
          Real-time match intelligence and personalized strategy tips. Instantly
          analyze players, draft plans, and win more games.
        </Paragraph>

        {/* Search Tools Always Visible */}
        <div className="mt-8 flex justify-center flex-wrap gap-6">
          <GlobalSearch />
          <QuickSearch />
        </div>
      </section>

      {/* Steps Section */}
      <section className="w-full max-w-4xl px-6 mb-10">
        <Steps current={0} items={stepsItems} responsive />
      </section>

      {/* Image Carousel */}
      <section className="w-full max-w-4xl px-6 mb-16">
        <Carousel
          autoplay
          dots
          className="rounded-xl shadow-lg overflow-hidden"
        >
          {[0, 1, 2, 3].map((index) => (
            <div
              key={index}
              className="h-[50vh] bg-black flex justify-center items-center"
            >
              <img
                src={`images/carousel/slide${index}.png`}
                alt={`Slide ${index}`}
                className="object-contain w-full h-full"
              />
            </div>
          ))}
        </Carousel>
      </section>

      {/* Final CTA Section */}
      <section className="w-full max-w-3xl px-6 text-center mb-16">
        <Title level={3} className="!text-2xl">
          Start Exploring Matches
        </Title>
        <Paragraph>
          Use AI to uncover win conditions, item builds, lane matchups and
          more—all in real time.
        </Paragraph>
      </section>
    </div>
  );
};

export default HomePage;
