import React, { useState, useEffect } from "react";
import { Select } from "antd";
import { DarkModeSwitch } from "react-toggle-dark-mode";
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
  const [isDarkMode, setDarkMode] = useState<boolean>(
    localStorage.getItem("theme") === "dark" || false
  );

  useEffect(() => {
    if (user) {
      const theme = user?.theme || "light";
      if (isDarkMode !== (theme === "dark")) {
        setDarkMode(theme === "dark");
      }
      localStorage.setItem("llm", user.llm || LLMOptions.GEMINI_FLASH);
      localStorage.setItem("language", user.language || "en");
      localStorage.setItem("theme", isDarkMode ? "dark" : "light");
    }
  }, [user, isDarkMode]);

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

  const toggleDarkMode = async (checked: boolean) => {
    setDarkMode(checked);
    const theme = checked ? "dark" : "light";
    try {
      const updatedUser = await updateUserTheme(theme);
      setUser(updatedUser);
    } catch (error) {
      console.error("Error updating theme:", error);
    }
  };

  return (
    <>
      {user && (
        <div style={switchContainerStyle}>
          <DarkModeSwitch
            checked={isDarkMode}
            onChange={toggleDarkMode}
            size={25}
          />
        </div>
      )}

      <Select
        value={selectedLanguage}
        onChange={handleLanguageChange}
        style={{ width: 120 }}
        size="large"
        options={[
          { label: "English", value: "en" },
          { label: "Korean", value: "ko" },
          { label: "Chinese", value: "zh" },
          { label: "Spanish", value: "es" },
          { label: "Bulgarian", value: "bg" },
        ]}
      />

      <Select
        value={selectedModel}
        onChange={handleModelChange}
        style={{ width: 175 }}
        size="large"
        options={[
          { label: "Gemini 1.5 Flash", value: LLMOptions.GEMINI_FLASH },
          { label: "GPT-4o Mini", value: LLMOptions.GPT_MINI },
          { label: "GPT-4o", value: LLMOptions.GPT },
        ]}
      />
    </>
  );
};

const switchContainerStyle: React.CSSProperties = {
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  padding: "8px",
};

export default UserPreferences;
