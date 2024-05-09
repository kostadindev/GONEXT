import { Layout } from "antd";
import { Sidebar } from "./features/layout/sidebar/sidebar";
import { Body } from "./features/layout/body/body";
import { Header } from "./features/layout/header/header";

const { Footer } = Layout;

function App() {
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

export default App;
