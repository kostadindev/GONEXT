import React, { useState, useEffect, useCallback } from "react";
import {
  Avatar,
  Button,
  Layout,
  Typography,
  Select,
  Space,
  Dropdown,
  Switch,
  theme,
  Badge,
  Tooltip,
} from "antd";
import {
  BgColorsOutlined,
  GlobalOutlined,
  SettingOutlined,
  UserOutlined,
  MenuOutlined,
  SunOutlined,
  MoonOutlined,
} from "@ant-design/icons";
import { useNavigate, useLocation } from "react-router-dom";
import GlobalSearch from "../../global-search/global-search";
import { QuickSearch } from "../../quick-search/quick-search";
import { GoogleLogin } from "@react-oauth/google";
import { handleLoginSuccess, handleLogout } from "../../../libs/apis/auth-api";
import { updateUserLanguage } from "../../../libs/apis/users-api";
import { useUser } from "../../../context/user.context";
import { Particles, initParticlesEngine } from "@tsparticles/react";
import { loadSlim } from "@tsparticles/slim";
import { useTranslation } from "../../../hooks/useTranslation";

const { Text } = Typography;
const { useToken } = theme;

// Reusable particles component
const ParticleBackground = ({
  id,
  isMobile,
}: {
  id: string;
  isMobile: boolean;
}) => {
  const { token } = useToken();

  return (
    <Particles
      id={id}
      options={{
        fullScreen: {
          enable: false,
        },
        fpsLimit: 60,
        particles: {
          color: {
            value: "#e89a3c",
          },
          links: {
            color: "#e89a3c",
            distance: isMobile ? 100 : 150,
            enable: true,
            opacity: 0.6,
            width: 1.5,
          },
          move: {
            enable: true,
            speed: 1.5,
            direction: "none",
            random: false,
            straight: false,
            outModes: {
              default: "bounce",
              bottom: "bounce",
              left: "bounce",
              right: "bounce",
              top: "bounce",
            },
          },
          number: {
            value: isMobile ? 15 : 40,
          },
          opacity: {
            value: 0.7,
          },
          size: {
            value: { min: 1.5, max: 3.5 },
          },
        },
        detectRetina: true,
        background: {
          color: "transparent",
        },
      }}
    />
  );
};

// Language options matching backend enum
const languageOptions = [
  { value: "en", label: "🇺🇸 English" },
  { value: "es", label: "🇪🇸 Español" },
  { value: "zh", label: "🇨🇳 中文" },
  { value: "ja", label: "🇯🇵 日本語" },
  { value: "ko", label: "🇰🇷 한국어" },
  { value: "ar", label: "🇸🇦 العربية" },
  { value: "bg", label: "🇧🇬 Български" },
];

export const Header: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { user, setUser } = useUser();
  const [init, setInit] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  const { t, changeLanguage, currentLanguage } = useTranslation();
  const { token } = useToken();

  // Feature flag for particles
  const particlesEnabled = process.env.REACT_APP_ENABLE_PARTICLES === "true";

  // Check for mobile screen size
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  // Initialize tsParticles only if particles are enabled
  useEffect(() => {
    if (particlesEnabled) {
      console.log("Initializing particles engine in header...");
      initParticlesEngine(async (engine) => {
        console.log("Loading slim package for header...");
        await loadSlim(engine);
        console.log("Slim package loaded successfully for header");
      })
        .then(() => {
          setInit(true);
          console.log("Particles engine initialized successfully for header");
        })
        .catch((error) => {
          console.error(
            "Error initializing particles engine in header:",
            error
          );
        });
    }
  }, [particlesEnabled]);

  const particlesLoaded = useCallback(async (container: any) => {
    console.log("Particles container loaded", container);
  }, []);

  const onLoginSuccess = async (credentialResponse: any) => {
    const token = credentialResponse.credential;
    const userData = await handleLoginSuccess(token);
    setUser(userData);
  };

  const onLoginError = () => {
    console.error(t("auth.loginError"));
  };

  const onLogout = async () => {
    await handleLogout();
    setUser(null);
    localStorage.removeItem("llm");
    localStorage.removeItem("language");
    localStorage.removeItem("theme");
  };

  const [isDarkMode, setIsDarkMode] = useState<boolean>(
    localStorage.getItem("theme") === "dark"
  );

  const toggleDarkMode = (checked: boolean) => {
    setIsDarkMode(checked);
    const newTheme = checked ? "dark" : "light";
    localStorage.setItem("theme", newTheme);
    window.dispatchEvent(new Event("themeChanged"));
  };

  const handleLanguageChange = (value: string) => {
    changeLanguage(value);

    // Call the API to update language preference if user is logged in
    if (user) {
      updateUserLanguage(value).catch((error) => {
        console.error("Failed to update language preference:", error);
      });
    }

    // Dispatch language change event for other components to react
    window.dispatchEvent(new Event("languageChanged"));
  };

  return (
    <Layout.Header
      style={{
        background: token.colorBgContainer,
        borderBottom: `1px solid ${token.colorBorderSecondary}`,
        padding: "0 24px",
        height: "auto",
        minHeight: 64,
        display: "flex",
        alignItems: "center",
        position: "sticky",
        top: 0,
        zIndex: 100,
        boxShadow: token.boxShadowTertiary,
      }}
    >
      {/* Particle Background */}
      {particlesEnabled && init && (
        <div
          style={{
            position: "absolute",
            width: "100%",
            height: "100%",
            top: 0,
            left: 0,
            bottom: 0,
            right: 0,
            overflow: "hidden",
            pointerEvents: "none",
            opacity: 0.8, // Increased opacity for better visibility
            zIndex: 1, // Ensure particles are behind content but visible
          }}
        >
          <ParticleBackground id="tsparticles-header" isMobile={isMobile} />
        </div>
      )}

      <div style={{ position: "relative", zIndex: 10, width: "100%" }}>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            width: "100%",
            gap: 24,
          }}
        >
          {/* Left Section: Brand */}
          <div
            style={goldmanStyle}
            className="cursor-pointer"
            onClick={() => navigate("/")}
          >
            {t("header.title")}
          </div>

          {/* Search Section - Only show on non-home pages */}
          {location.pathname !== "/" && !isMobile && (
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: 16,
                flex: 2,
                marginLeft: 40,
                marginRight: 40,
              }}
            >
              <div style={{ width: 600 }}>
                <GlobalSearch />
              </div>
              <Text type="secondary">{t("common.or")}</Text>
              <QuickSearch />
            </div>
          )}

          {/* Spacer to push right section to the end */}
          <div style={{ flex: 1 }} />

          {/* Right Section: Actions */}
          <Space size="middle">
            {/* Mobile search for non-home pages */}
            {location.pathname !== "/" && isMobile && (
              <Button
                type="text"
                icon={<MenuOutlined />}
                onClick={() => {
                  // Handle mobile search menu
                }}
              />
            )}

            {/* Theme Toggle */}
            <Tooltip
              title={
                isDarkMode ? t("common.theme.light") : t("common.theme.dark")
              }
            >
              <Button
                type="text"
                icon={isDarkMode ? <SunOutlined /> : <MoonOutlined />}
                onClick={() => toggleDarkMode(!isDarkMode)}
                style={{
                  borderRadius: token.borderRadiusLG,
                  border: `1px solid ${token.colorBorderSecondary}`,
                  backgroundColor: isDarkMode
                    ? token.colorBgElevated
                    : token.colorBgContainer,
                  color: isDarkMode
                    ? token.colorText
                    : token.colorTextSecondary,
                  transition: "all 0.3s ease",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  minWidth: 40,
                  height: 36,
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = isDarkMode
                    ? token.colorBgContainer
                    : token.colorBgElevated;
                  e.currentTarget.style.borderColor = token.colorPrimary;
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = isDarkMode
                    ? token.colorBgElevated
                    : token.colorBgContainer;
                  e.currentTarget.style.borderColor =
                    token.colorBorderSecondary;
                }}
              />
            </Tooltip>

            {/* Language Selector */}
            <Select
              value={currentLanguage}
              onChange={handleLanguageChange}
              options={languageOptions}
              style={{
                width: 140,
                borderRadius: token.borderRadiusLG,
                height: 36,
              }}
              size="small"
              bordered={true}
              variant="outlined"
              suffixIcon={
                <GlobalOutlined style={{ color: token.colorTextSecondary }} />
              }
              dropdownStyle={{
                borderRadius: token.borderRadiusLG,
                boxShadow: token.boxShadowSecondary,
              }}
              dropdownMatchSelectWidth={false}
              placement="bottomRight"
            />

            {/* User Section - Currently commented out but ready for use */}
            {/* {user ? (
              <Dropdown
                menu={{
                  items: [
                    {
                      key: 'profile',
                      label: t('common.profile'),
                      icon: <UserOutlined />,
                    },
                    {
                      type: 'divider',
                    },
                    {
                      key: 'logout',
                      label: t('common.logout'),
                      onClick: onLogout,
                    },
                  ],
                }}
                trigger={['click']}
              >
                <Button type="text" style={{ padding: 4 }}>
                  <Space>
                    <Avatar 
                      src={user.picture} 
                      icon={<UserOutlined />} 
                      size="small"
                    />
                    <Text>{user.name}</Text>
                  </Space>
                </Button>
              </Dropdown>
            ) : (
              <GoogleLogin
                onSuccess={onLoginSuccess}
                theme="outline"
                text={undefined}
                useOneTap
                shape="circle"
                onError={onLoginError}
              />
            )} */}
          </Space>
        </div>

        {/* Mobile search section for non-home pages */}
        {location.pathname !== "/" && isMobile && (
          <div style={{ marginTop: 16, paddingBottom: 8 }}>
            <Space direction="vertical" style={{ width: "100%" }} size="small">
              <GlobalSearch />
              <div style={{ textAlign: "center" }}>
                <Text type="secondary" style={{ fontSize: 12 }}>
                  {t("common.or")}
                </Text>
              </div>
              <QuickSearch />
            </Space>
          </div>
        )}
      </div>
    </Layout.Header>
  );
};

const goldmanStyle: React.CSSProperties = {
  fontFamily: '"Goldman", serif',
  fontWeight: 400,
  fontStyle: "normal",
  fontSize: "3rem",
};

export default Header;
