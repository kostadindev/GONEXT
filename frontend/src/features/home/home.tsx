import React from "react";
import { Layout, Typography, Space, Carousel, Steps } from "antd";
import GlobalSearch from "../global-search/global-search";
import { QuickSearch } from "../quick-search/quick-search";
import {
  LoadingOutlined,
  SmileOutlined,
  SolutionOutlined,
  UserOutlined,
} from "@ant-design/icons";

const { Header, Content } = Layout;
const { Title } = Typography;

const HomePage: React.FC = () => {
  return (
    <div className="w-full h-full flex flex-col justify-center items-center">
      {/* <div style={headerStyle}>
        <Carousel autoplay arrows>
          <div style={carouselItemWrapperStyle}>
            <img src="images/carousel/slide0.png" alt="" />
          </div>
          <div style={carouselItemWrapperStyle}>
            <img src="images/carousel/slide1.png" alt="" />
          </div>
          <div style={carouselItemWrapperStyle}>
            <img src="images/carousel/slide2.png" alt="" />
          </div>
          <div style={carouselItemWrapperStyle}>
            <img src="images/carousel/slide3.png" alt="" />
          </div>
        </Carousel>
      </div> */}

      <Steps
        items={[
          {
            title: "Login",
            status: "finish",
            icon: <UserOutlined />,
          },
          {
            title: "Search User in Game",
            status: "finish",
            icon: <SolutionOutlined />,
          },
          {
            title: "Ask AI Questions About the Game",
            status: "process",
            icon: <LoadingOutlined />,
          },
          {
            title: "Win",
            status: "wait",
            icon: <SmileOutlined />,
          },
        ]}
      />
      <Content style={contentStyle}>
        <div style={centeredContainerStyle}>
          <Title level={3}>Search a player in game</Title>
          <Space size="small">
            <GlobalSearch /> <span>or</span> <QuickSearch />
          </Space>
        </div>
      </Content>
    </div>
  );
};

const headerStyle: React.CSSProperties = {
  width: "50vw",
  paddingTop: "4rem",
};

const carouselItemWrapperStyle: React.CSSProperties = {
  width: "50vw",
  height: "50vh", // Match the header height
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
};

const contentStyle: React.CSSProperties = {
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
  marginTop: "2rem",
  textAlign: "center",
};

const centeredContainerStyle: React.CSSProperties = {
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  gap: "1rem",
};

export default HomePage;
