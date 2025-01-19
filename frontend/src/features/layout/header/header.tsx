import React, { useEffect, useState } from "react";
import { Avatar, Button, Layout, Select, Typography } from "antd";
import { DownOutlined } from "@ant-design/icons";
import GlobalSearch from "../../global-search/global-search";
import { QuickSearch } from "../../quick-search/quick-search";
import { GoogleLogin } from "@react-oauth/google";
import { handleLoginSuccess, handleLogout } from "../../../libs/apis/auth-api";
import {
  updateUserLLM,
  updateUserLanguage,
  updateUserTheme,
} from "../../../libs/apis/users-api";
import { useUser } from "../../../context/user.context";
import { LLMOptions } from "../../../libs/general/users";

const { Text } = Typography;

export const Header: React.FC = () => {
  const { user, setUser } = useUser();
  const [selectedModel, setSelectedModel] = useState<string>(
    localStorage.getItem("llm") || user?.llm || LLMOptions.GEMINI_FLASH
  );
  const [selectedLanguage, setSelectedLanguage] = useState<string>(
    localStorage.getItem("language") || "en"
  );
  const [selectedTheme, setSelectedTheme] = useState<string>(
    localStorage.getItem("theme") || "light"
  );

  useEffect(() => {
    if (user) {
      localStorage.setItem("llm", user.llm || LLMOptions.GEMINI_FLASH);
      localStorage.setItem("language", user.language || "en");
      localStorage.setItem("theme", user.theme || "light");
    }
  }, [user]);

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
    localStorage.removeItem("llm");
    localStorage.removeItem("language");
    localStorage.removeItem("theme");
  };

  const handleModelChange = async (value: string) => {
    setSelectedModel(value);
    try {
      const updatedUser = await updateUserLLM(value);
      setUser(updatedUser);
    } catch (error) {
      console.error("Error updating LLM:", error);
    }
  };

  const handleLanguageChange = async (value: string) => {
    setSelectedLanguage(value);
    try {
      const updatedUser = await updateUserLanguage(value);
      setUser(updatedUser);
    } catch (error) {
      console.error("Error updating language:", error);
    }
  };

  const handleThemeChange = async (value: string) => {
    setSelectedTheme(value);
    try {
      const updatedUser = await updateUserTheme(value);
      setUser(updatedUser);
    } catch (error) {
      console.error("Error updating theme:", error);
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
        {/* Theme Selector */}
        <div style={dropdownStyle}>
          <Select
            value={selectedTheme}
            onChange={handleThemeChange}
            style={{ width: 120 }}
            size="large"
            bordered={false}
            options={[
              { label: "Light", value: "light" },
              { label: "Dark", value: "dark" },
            ]}
            suffixIcon={<DownOutlined />}
          />
        </div>

        {/* Language Selector */}
        <div style={dropdownStyle}>
          <Select
            value={selectedLanguage}
            onChange={handleLanguageChange}
            style={{ width: 120 }}
            size="large"
            bordered={false}
            options={[
              { label: "English", value: "en" },
              { label: "Korean", value: "ko" },
              { label: "Chinese", value: "zh" },
              { label: "Spanish", value: "es" },
              { label: "Bulgarian", value: "bg" },
            ]}
            suffixIcon={<DownOutlined />}
          />
        </div>

        {/* LLM Selector */}
        <div style={dropdownStyle}>
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

        {/* Authentication */}
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

const dropdownStyle: React.CSSProperties = {
  background: "#f6f8fa",
  borderRadius: "8px",
  border: "1px solid #d9d9d9",
  display: "flex",
  alignItems: "center",
};

export default Header;
