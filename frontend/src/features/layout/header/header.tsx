import { Dropdown, Layout, theme } from "antd";
import GlobalSearch from "../../global-search/global-search";
import { QuickSearch } from "../../quick-search/quick-search";

export const Header = () => {
  const {
    token: { colorBgContainer },
  } = theme.useToken();
  return (
    <Layout.Header
      style={{
        background: colorBgContainer,
        height: "80px",
        display: "flex",
        alignItems: "center",
        gap: "20px",
      }}
    >
      <GlobalSearch />
      <span>or</span>
      <QuickSearch />
    </Layout.Header>
  );
};
