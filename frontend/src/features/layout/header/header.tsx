import React, { useState } from "react";
import { Avatar, Button, Layout, Select, Space, Typography } from "antd";
import { DownOutlined } from "@ant-design/icons";
import GlobalSearch from "../../global-search/global-search";
import { QuickSearch } from "../../quick-search/quick-search";
import { GoogleLogin } from "@react-oauth/google";
import { handleLoginSuccess, handleLogout } from "../../../libs/apis/auth-api";
import { useUser } from "../../../context/user.context";

const { Text } = Typography;

export const Header: React.FC = () => {
  const { user, setUser } = useUser();
  const [selectedModel, setSelectedModel] = useState<string>(user || "Gemini");

  const onLoginSuccess = async (credentialResponse: any) => {
    const token = credentialResponse.credential;
    const user = await handleLoginSuccess(token);
    setUser(user);
  };

  const onLoginError = () => {
    console.error("Login Failed");
  };

  const onLogout = async () => {
    await handleLogout();
    setUser(null);
  };

  const handleModelChange = (value: string) => {
    setSelectedModel(value);
    console.log("Selected model:", value);
  };

  return (
    <Layout.Header style={headerStyle}>
      <div className="flex items-center gap-5">
        <GlobalSearch />
        <span>or</span>
        <QuickSearch />
      </div>
      <div className="flex items-center gap-4">
        {/* LLM Selector */}
        <div style={llmSelectorStyle}>
          <Select
            value={selectedModel}
            onChange={handleModelChange}
            style={{ width: 100 }}
            size="large"
            bordered={false}
            options={[
              { label: "Gemini", value: "Gemini" },
              { label: "GPT", value: "GPT" },
            ]}
            suffixIcon={<DownOutlined />}
          />
        </div>

        {/* User Authentication */}
        {user ? (
          <Button
            type="primary"
            size="large"
            shape="round"
            onClick={onLogout}
            className="cool-button"
          >
            <div className="flex gap-3 items-center h-full">
              {user.picture && <Avatar src={user.picture} size={30} />}
              <span>Log out</span>
            </div>
          </Button>
        ) : (
          <GoogleLogin
            onSuccess={onLoginSuccess}
            theme="filled_blue"
            text={undefined}
            useOneTap
            shape="circle"
            onError={onLoginError}
          />
        )}
      </div>
    </Layout.Header>
  );
};

const headerStyle: React.CSSProperties = {
  background: "#FFF",
  height: "80px",
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  boxShadow: "0px 2px 8px rgba(0, 0, 0, 0.1)",
  padding: "0 20px",
};

const llmSelectorStyle: React.CSSProperties = {
  background: "#f6f8fa",
  borderRadius: "8px",
  border: "1px solid #d9d9d9",
  display: "flex",
  // padding: "4px 0",
  alignItems: "center",
};

export default Header;
