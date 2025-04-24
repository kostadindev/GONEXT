import { Layout } from "antd";
import { Sidebar } from "./sidebar/sidebar";
import { Header } from "./header/header";
import { Body } from "./body/body";
import { Footer } from "./footer/footer";
import { useLocation } from "react-router-dom";

function AppLayout() {
  const location = useLocation();
  const isHomePage = location.pathname === "/";

  return (
    <Layout className="min-h-screen">
      {/* <Sidebar /> */}
      <Layout>
        <Header />
        <Body />
        <Footer />
      </Layout>
    </Layout>
  );
}

export default AppLayout;
