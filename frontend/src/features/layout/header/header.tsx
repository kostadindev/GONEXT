import React, { useState } from "react";
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
    user?.llm || LLMOptions.GEMINI_FLASH
  );

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

  const handleModelChange = async (value: string) => {
    setSelectedModel(value);

    // Update the LLM preference in the backend
    try {
      await updateUserLLM(value);
      notification.success({
        message: "LLM Updated",
        description: `Your LLM model has been successfully updated to ${value}.`,
      });

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
              { label: "GPT Mini", value: LLMOptions.GPT_MINI },
              { label: "Gemini Flash", value: LLMOptions.GEMINI_FLASH },
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
