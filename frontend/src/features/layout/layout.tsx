import { Layout } from "antd";
import { Sidebar } from "./sidebar/sidebar";
import { Header } from "./header/header";
import { Body } from "./body/body";

const { Footer } = Layout;

function AppLayout() {
  return (
    <Layout className="min-h-screen">
      <Sidebar />
      <Layout>
        <Header />
        <Body />
        <Footer />
      </Layout>
    </Layout>
  );
}

export default AppLayout;
