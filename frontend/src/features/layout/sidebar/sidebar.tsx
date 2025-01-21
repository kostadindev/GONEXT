import { Menu } from "antd";
import Sider from "antd/es/layout/Sider";
import { useState } from "react";
import {
  ContactsOutlined,
  DesktopOutlined,
  HomeOutlined,
  TeamOutlined,
  UserOutlined,
} from "@ant-design/icons";

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
  getItem("Our Team", "4", <ContactsOutlined />),
  // getItem("Game Analytics", "sub1", <PieChartOutlined />, [
  //   getItem("Game Overview", "3"),
  //   getItem("Infernal AI", "4"),
  // getItem("Alex", "5"),
  // ]),
  // getItem("Team", "sub2", <TeamOutlined />, [
  //   getItem("Team 1", "6"),
  //   getItem("Team 2", "8"),
  // ]),
  // getItem("Files", "9", <FileOutlined />),
];

export const Sidebar = () => {
  const [collapsed, setCollapsed] = useState(true);
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
      />
    </Sider>
  );
};
