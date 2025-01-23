import { Menu } from "antd";
import Sider from "antd/es/layout/Sider";
import { useEffect, useState } from "react";
import {
  ContactsOutlined,
  DesktopOutlined,
  HomeOutlined,
  SettingOutlined,
  TeamOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { useNavigate, useLocation } from "react-router-dom";

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
  const [selectedKey, setSelectedKey] = useState("0");
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    // Map URLs to corresponding keys
    const pathToKeyMap: { [key: string]: string } = {
      "/": "0",
      "/NA/:summoner/:tagline/in-game": "1",
      "/drafting-tool": "2",
      "/player-analytics": "3",
      "/settings": "5",
      "/about-us": "4",
    };

    // Determine the selected key based on the current path
    const currentKey = Object.keys(pathToKeyMap).find((path) =>
      location.pathname.startsWith(path.replace(/:.*?\//g, ""))
    );
    setSelectedKey(currentKey || "0");
  }, [location]);

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
    } else if (key === "0") {
      navigate("/");
    } else if (key === "2") {
      navigate("/drafting-tool");
    } else if (key === "3") {
      navigate("/player-analytics");
    } else if (key === "5") {
      navigate("/settings");
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
        selectedKeys={[selectedKey]}
        mode="inline"
        items={items}
        onClick={({ key }) => handleMenuClick(key)}
      />
    </Sider>
  );
};
