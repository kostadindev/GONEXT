import React, { useState } from "react";
import { Breadcrumb, Layout, theme } from "antd";
import { Sidebar } from "./features/sidebar/sidebar";
import { Body } from "./features/body/body";
import { Header } from "./features/header/header";

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
