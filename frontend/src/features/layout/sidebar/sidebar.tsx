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

const getItem = (label: string, key: string, icon?: JSX.Element) => ({
  key,
  icon,
  label,
});

const items = [
  getItem("Home", "0", <HomeOutlined />),
  getItem("In Game Analytics", "1", <DesktopOutlined />),
  getItem("Drafting Tool", "2", <TeamOutlined />),
  getItem("Player Analytics", "3", <UserOutlined />),
  getItem("Settings", "5", <SettingOutlined />),
  getItem("About Us", "4", <ContactsOutlined />),
];

export const Sidebar = () => {
  const [collapsed, setCollapsed] = useState(true);
  const [selectedKey, setSelectedKey] = useState<string | null>(null);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const pathToKeyMap: Record<string, string> = {
      "/in-game": "1",
      // "/drafting-tool": "2",
      "/player": "3",
      // "/settings": "5",
      "/about-us": "4",
    };

    const currentKey =
      Object.entries(pathToKeyMap).find(([path]) =>
        location.pathname.includes(path)
      )?.[1] || null;

    setSelectedKey(currentKey);
  }, [location]);

  const handleMenuClick = (key: string) => {
    switch (key) {
      case "1": {
        const summoner = localStorage.getItem("latestSummoner");
        const tagline = localStorage.getItem("latestTagline");
        if (summoner && tagline) {
          navigate(`/${"NA"}/${summoner}/${tagline}/in-game`);
        } else {
          alert("No summoner data found. Please perform a search first.");
        }
        break;
      }
      case "4":
        navigate("/about-us");
        break;
      case "0":
        navigate("/");
        break;
      case "2":
        // navigate("/drafting-tool");
        break;
      case "3":
        const summoner = localStorage.getItem("latestSummoner");
        const tagline = localStorage.getItem("latestTagline");
        if (summoner && tagline) {
          navigate(`/${"NA"}/${summoner}/${tagline}/player`);
        } else {
          alert("No summoner data found. Please perform a search first.");
        }
        break;
      case "5":
        // navigate("/settings");
        break;
      default:
        break;
    }
  };

  return (
    <Sider
      collapsible
      collapsed={collapsed}
      width="calc(max(12vw, 280px))"
      theme="light"
      onCollapse={setCollapsed}
    >
      <div className="demo-logo-vertical" />
      <Menu
        theme="light"
        selectedKeys={selectedKey ? [selectedKey] : []}
        mode="inline"
        style={{ border: "none" }}
        items={items}
        onClick={({ key }) => handleMenuClick(key)}
      />
    </Sider>
  );
};
