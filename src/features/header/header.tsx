import { Layout, theme } from "antd";

import GlobalSearch from "../global-search/global-search";

export const Header = () => {
  const {
    token: { colorBgContainer },
  } = theme.useToken();

  return (
    <Layout.Header
      style={{
        background: colorBgContainer,
        height: "80px",
      }}
      className="flex"
    >
      <GlobalSearch />
    </Layout.Header>
  );
};
