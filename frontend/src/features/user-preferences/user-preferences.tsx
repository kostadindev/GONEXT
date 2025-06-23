import React, { useState, useEffect } from "react";
import {
  Card,
  Select,
  Switch,
  Space,
  Typography,
  Divider,
  theme,
  Row,
  Col,
  Button,
  Tooltip,
  Badge,
  Form,
  notification,
} from "antd";
import {
  SunOutlined,
  MoonOutlined,
  GlobalOutlined,
  RobotOutlined,
  SettingOutlined,
  SaveOutlined,
  UndoOutlined,
} from "@ant-design/icons";
import { useTranslation } from "../../hooks/useTranslation";
import { updateUserLanguage, updateUserTheme } from "../../libs/apis/users-api";
import { useUser } from "../../context/user.context";

const { Title, Text, Paragraph } = Typography;
const { useToken } = theme;

// Language options with flags
const languageOptions = [
  { value: "en", label: "🇺🇸 English" },
  { value: "es", label: "🇪🇸 Español" },
  { value: "zh", label: "🇨🇳 中文" },
  { value: "ja", label: "🇯🇵 日本語" },
  { value: "ko", label: "🇰🇷 한국어" },
  { value: "ar", label: "🇸🇦 العربية" },
  { value: "bg", label: "🇧🇬 Български" },
];

// LLM model options
const modelOptions = [
  {
    value: "Gemini Flash",
    label: "Gemini Flash",
    description: "Fast and efficient for quick responses",
  },
  {
    value: "GPT-4o Mini",
    label: "GPT-4o Mini",
    description: "Balanced performance and cost",
  },
  {
    value: "GPT-4o",
    label: "GPT-4o",
    description: "Most capable model for complex tasks",
  },
];

const UserPreferences: React.FC = () => {
  const { token } = useToken();
  const { t, changeLanguage } = useTranslation();
  const { user } = useUser();
  const [form] = Form.useForm();

  // State for preferences
  const [selectedModel, setSelectedModel] = useState<string>(
    localStorage.getItem("llm") || "Gemini Flash"
  );
  const [selectedLanguage, setSelectedLanguage] = useState<string>(
    localStorage.getItem("language") || "en"
  );
  const [isDarkMode, setIsDarkMode] = useState<boolean>(
    localStorage.getItem("theme") === "dark"
  );
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);

  // Original values for reset functionality
  const [originalValues, setOriginalValues] = useState({
    model: selectedModel,
    language: selectedLanguage,
    theme: isDarkMode,
  });

  // Update local storage and track changes
  const handleModelChange = (value: string) => {
    setSelectedModel(value);
    setHasUnsavedChanges(true);
  };

  const handleLanguageChange = (value: string) => {
    setSelectedLanguage(value);
    setHasUnsavedChanges(true);
  };

  const toggleDarkMode = (checked: boolean) => {
    setIsDarkMode(checked);
    setHasUnsavedChanges(true);
  };

  // Save preferences
  const savePreferences = async () => {
    try {
      // Update localStorage
      localStorage.setItem("llm", selectedModel);
      localStorage.setItem("language", selectedLanguage);
      localStorage.setItem("theme", isDarkMode ? "dark" : "light");

      // Change language immediately
      changeLanguage(selectedLanguage);

      // Dispatch theme change event
      window.dispatchEvent(new Event("themeChanged"));
      window.dispatchEvent(new Event("languageChanged"));

      // Update backend if user is logged in
      if (user) {
        await Promise.all([
          updateUserLanguage(selectedLanguage),
          updateUserTheme(isDarkMode ? "dark" : "light"),
        ]);
      }

      // Update original values
      setOriginalValues({
        model: selectedModel,
        language: selectedLanguage,
        theme: isDarkMode,
      });

      setHasUnsavedChanges(false);

      notification.success({
        message: t("common.success"),
        description: "Preferences saved successfully",
        placement: "topRight",
      });
    } catch (error) {
      notification.error({
        message: t("common.error"),
        description: "Failed to save preferences",
        placement: "topRight",
      });
    }
  };

  // Reset to original values
  const resetPreferences = () => {
    setSelectedModel(originalValues.model);
    setSelectedLanguage(originalValues.language);
    setIsDarkMode(originalValues.theme);
    setHasUnsavedChanges(false);
  };

  // Auto-save effect for immediate theme changes
  useEffect(() => {
    localStorage.setItem("theme", isDarkMode ? "dark" : "light");
    window.dispatchEvent(new Event("themeChanged"));
  }, [isDarkMode]);

  return (
    <div style={{ maxWidth: 800, margin: "0 auto", padding: 24 }}>
      <Card
        style={{
          borderRadius: token.borderRadiusLG,
          boxShadow: token.boxShadowCard,
        }}
      >
        <Space direction="vertical" size="large" style={{ width: "100%" }}>
          {/* Header */}
          <div style={{ textAlign: "center" }}>
            <SettingOutlined
              style={{
                fontSize: 32,
                color: token.colorPrimary,
                marginBottom: 16,
              }}
            />
            <Title level={2} style={{ margin: 0 }}>
              {t("settings.title") || "User Preferences"}
            </Title>
            <Paragraph type="secondary">
              {t("settings.description") ||
                "Customize your experience with GONEXT"}
            </Paragraph>
          </div>

          <Divider />

          <Form
            form={form}
            layout="vertical"
            onValuesChange={() => setHasUnsavedChanges(true)}
          >
            {/* Theme Section */}
            <Card
              size="small"
              style={{
                backgroundColor: token.colorFillAlter,
                border: `1px solid ${token.colorBorderSecondary}`,
              }}
            >
              <Row align="middle" justify="space-between">
                <Col>
                  <Space>
                    {isDarkMode ? <MoonOutlined /> : <SunOutlined />}
                    <div>
                      <Text strong>{t("settings.theme") || "Theme"}</Text>
                      <br />
                      <Text type="secondary" style={{ fontSize: 12 }}>
                        {isDarkMode
                          ? t("settings.darkMode") || "Dark mode enabled"
                          : t("settings.lightMode") || "Light mode enabled"}
                      </Text>
                    </div>
                  </Space>
                </Col>
                <Col>
                  <Switch
                    checked={isDarkMode}
                    onChange={toggleDarkMode}
                    checkedChildren={<MoonOutlined />}
                    unCheckedChildren={<SunOutlined />}
                    style={{
                      backgroundColor: isDarkMode
                        ? token.colorPrimary
                        : undefined,
                    }}
                  />
                </Col>
              </Row>
            </Card>

            {/* Language Section */}
            <Card
              size="small"
              style={{
                backgroundColor: token.colorFillAlter,
                border: `1px solid ${token.colorBorderSecondary}`,
              }}
            >
              <Row align="middle" justify="space-between">
                <Col flex="auto">
                  <Space>
                    <GlobalOutlined />
                    <div>
                      <Text strong>{t("settings.language") || "Language"}</Text>
                      <br />
                      <Text type="secondary" style={{ fontSize: 12 }}>
                        {t("settings.languageDescription") ||
                          "Choose your preferred language"}
                      </Text>
                    </div>
                  </Space>
                </Col>
                <Col>
                  <Select
                    value={selectedLanguage}
                    onChange={handleLanguageChange}
                    options={languageOptions}
                    style={{ minWidth: 160 }}
                    popupMatchSelectWidth={false}
                  />
                </Col>
              </Row>
            </Card>

            {/* AI Model Section */}
            <Card
              size="small"
              style={{
                backgroundColor: token.colorFillAlter,
                border: `1px solid ${token.colorBorderSecondary}`,
              }}
            >
              <Row align="middle" justify="space-between">
                <Col flex="auto">
                  <Space>
                    <RobotOutlined />
                    <div>
                      <Text strong>{t("settings.aiModel") || "AI Model"}</Text>
                      <br />
                      <Text type="secondary" style={{ fontSize: 12 }}>
                        {t("settings.aiModelDescription") ||
                          "Select your preferred AI assistant"}
                      </Text>
                    </div>
                  </Space>
                </Col>
                <Col>
                  <Select
                    value={selectedModel}
                    onChange={handleModelChange}
                    style={{ minWidth: 200 }}
                    popupMatchSelectWidth={false}
                    optionRender={(option) => (
                      <div>
                        <div>{option.label}</div>
                        <Text type="secondary" style={{ fontSize: 11 }}>
                          {
                            modelOptions.find((m) => m.value === option.value)
                              ?.description
                          }
                        </Text>
                      </div>
                    )}
                  >
                    {modelOptions.map((model) => (
                      <Select.Option
                        key={model.value}
                        value={model.value}
                        title={model.description}
                      >
                        {model.label}
                      </Select.Option>
                    ))}
                  </Select>
                </Col>
              </Row>
            </Card>
          </Form>

          <Divider />

          {/* Action Buttons */}
          <Row justify="space-between" align="middle">
            <Col>
              {hasUnsavedChanges && (
                <Badge dot>
                  <Text type="warning" style={{ fontSize: 12 }}>
                    {t("settings.unsavedChanges") || "You have unsaved changes"}
                  </Text>
                </Badge>
              )}
            </Col>
            <Col>
              <Space>
                <Button
                  icon={<UndoOutlined />}
                  onClick={resetPreferences}
                  disabled={!hasUnsavedChanges}
                >
                  {t("common.reset") || "Reset"}
                </Button>
                <Button
                  type="primary"
                  icon={<SaveOutlined />}
                  onClick={savePreferences}
                  disabled={!hasUnsavedChanges}
                  style={{
                    background: hasUnsavedChanges
                      ? token.colorPrimary
                      : undefined,
                  }}
                >
                  {t("common.save") || "Save Changes"}
                </Button>
              </Space>
            </Col>
          </Row>
        </Space>
      </Card>
    </div>
  );
};

export default UserPreferences;
