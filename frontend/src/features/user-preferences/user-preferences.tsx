import React, { useState, useEffect } from "react";
import { DarkModeSwitch } from "react-toggle-dark-mode";

const UserPreferences: React.FC = () => {
  // Use local storage values, or fallback to default values
  const [selectedModel, setSelectedModel] = useState<string>(
    localStorage.getItem("llm") || "Gemini Flash"
  );
  const [selectedLanguage, setSelectedLanguage] = useState<string>(
    localStorage.getItem("language") || "en"
  );
  const [isDarkMode, setDarkMode] = useState<boolean>(
    localStorage.getItem("theme") === "dark"
  );

  // Update local storage whenever these values change
  useEffect(() => {
    localStorage.setItem("llm", selectedModel);
    localStorage.setItem("language", selectedLanguage);
    localStorage.setItem("theme", isDarkMode ? "dark" : "light");
  }, [selectedModel, selectedLanguage, isDarkMode]);

  // Handlers update state and, via useEffect, update local storage.
  const handleModelChange = (value: string) => {
    setSelectedModel(value);
  };

  const handleLanguageChange = (value: string) => {
    setSelectedLanguage(value);
  };

  const toggleDarkMode = (checked: boolean) => {
    setDarkMode(checked);
  };

  return (
    <>
      <div style={switchContainerStyle}>
        <DarkModeSwitch
          checked={isDarkMode}
          onChange={toggleDarkMode}
          size={25}
        />
      </div>
      {/* Uncomment the following sections if you wish to include the selects for language and model */}
      {/*
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
          { label: "Gemini Flash", value: "Gemini Flash" },
          { label: "GPT-4o Mini", value: "GPT-4o Mini" },
          { label: "GPT-4o", value: "GPT-4o" },
        ]}
      />
      */}
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
