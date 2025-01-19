import React, { useState, useEffect } from "react";
import { Select } from "antd";
import { DownOutlined } from "@ant-design/icons";
import { useUser } from "../../context/user.context";
import {
  updateUserLLM,
  updateUserLanguage,
  updateUserTheme,
} from "../../libs/apis/users-api";
import { LLMOptions } from "../../libs/general/users";

const UserPreferences: React.FC = () => {
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
    <>
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
    </>
  );
};

const dropdownStyle: React.CSSProperties = {
  background: "#f6f8fa",
  borderRadius: "8px",
  border: "1px solid #d9d9d9",
  display: "flex",
  alignItems: "center",
};

export default UserPreferences;
