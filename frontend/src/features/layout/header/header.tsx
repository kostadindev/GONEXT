import React, { useEffect, useState } from "react";
import { Avatar, Button, Layout, Select, notification, Typography } from "antd";
import { DownOutlined } from "@ant-design/icons";
import GlobalSearch from "../../global-search/global-search";
import { QuickSearch } from "../../quick-search/quick-search";
import { GoogleLogin } from "@react-oauth/google";
import { handleLoginSuccess, handleLogout } from "../../../libs/apis/auth-api";
import { useUser } from "../../../context/user.context";
import { updateUserLLM } from "../../../libs/apis/users-api";
import { LLMOptions } from "../../../libs/general/users";

const { Text } = Typography;

export const Header: React.FC = () => {
  const { user, setUser } = useUser();
  const [selectedModel, setSelectedModel] = useState<string>(
    localStorage.getItem("llm") || user?.llm || LLMOptions.GEMINI_FLASH
  );

  useEffect(() => {
    // Sync localStorage with user LLM preference on initial load
    if (user?.llm && user.llm !== localStorage.getItem("llm")) {
      localStorage.setItem("llm", user.llm);
      setSelectedModel(user.llm);
    }
  }, [user]);

  const onLoginSuccess = async (credentialResponse: any) => {
    const token = credentialResponse.credential;
    const user = await handleLoginSuccess(token);

    // Set user and sync LLM preference with localStorage
    setUser(user);
    if (user.llm) {
      localStorage.setItem("llm", user.llm);
      setSelectedModel(user.llm);
    }
  };

  const onLoginError = () => {
    console.error("Login Failed");
  };

  const onLogout = async () => {
    await handleLogout();
    setUser(null);
    localStorage.removeItem("llm"); // Clear LLM preference on logout
  };

  const handleModelChange = async (value: string) => {
    setSelectedModel(value);

    // Update the LLM preference in the backend and localStorage
    try {
      await updateUserLLM(value);
      localStorage.setItem("llm", value);

      // Update the user context if needed
      if (user) {
        setUser({ ...user, llm: value });
      }
    } catch (error) {
      console.error("Failed to update LLM:", error);
      notification.error({
        message: "Update Failed",
        description: "Unable to update the LLM model. Please try again later.",
      });
    }
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
            style={{ width: 150 }}
            size="large"
            bordered={false}
            options={[
              { label: "Gemini Flash", value: LLMOptions.GEMINI_FLASH },
              { label: "GPT Mini", value: LLMOptions.GPT_MINI },
              { label: "GPT", value: LLMOptions.GPT },
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
  alignItems: "center",
};

export default Header;
