import { Menu } from "antd";
import Sider from "antd/es/layout/Sider";
import { useState } from "react";
import {
  ContactsOutlined,
  DesktopOutlined,
  HomeOutlined,
  SettingOutlined,
  TeamOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { useNavigate } from "react-router-dom";

function getItem(label: any, key: any, icon?: any, children?: any) {
  return {
    key,
    icon,
    children,
    label,
  };
}

const items = [
  getItem("Home", "0", <HomeOutlined />),
  getItem("In Game Analytics", "1", <DesktopOutlined />),
  getItem("Drafting Tool", "2", <TeamOutlined />),
  getItem("Player Analytics", "3", <UserOutlined />),
  getItem("Settings", "5", <SettingOutlined />),
  getItem("About", "4", <ContactsOutlined />),
];

export const Sidebar = () => {
  const [collapsed, setCollapsed] = useState(true);
  const navigate = useNavigate();

  const handleMenuClick = (key: string) => {
    if (key === "1") {
      const summoner = localStorage.getItem("latestSummoner");
      const tagline = localStorage.getItem("latestTagline");
      if (summoner && tagline) {
        navigate(`/${"NA"}/${summoner}/${tagline}/in-game`);
      } else {
        alert("No summoner data found. Please perform a search first.");
      }
    } else if (key === "4") {
      navigate("/about-us");
    }
  };

  return (
    <Sider
      collapsible
      collapsed={collapsed}
      width="calc(max(12vw, 280px))"
      onCollapse={(value) => setCollapsed(value)}
    >
      <div className="demo-logo-vertical" />
      <Menu
        theme="dark"
        defaultSelectedKeys={["1"]}
        mode="inline"
        items={items}
        onClick={({ key }) => handleMenuClick(key)}
      />
    </Sider>
  );
};
