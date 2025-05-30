import React, { useState, useEffect, useCallback } from "react";
import { Avatar, Button, Layout, Typography, Select } from "antd";
import { useNavigate, useLocation } from "react-router-dom";
import GlobalSearch from "../../global-search/global-search";
import { QuickSearch } from "../../quick-search/quick-search";
import { GoogleLogin } from "@react-oauth/google";
import { handleLoginSuccess, handleLogout } from "../../../libs/apis/auth-api";
import { updateUserLanguage } from "../../../libs/apis/users-api";
import { useUser } from "../../../context/user.context";
import { DarkModeSwitch } from "react-toggle-dark-mode";
import { Particles, initParticlesEngine } from "@tsparticles/react";
import { loadSlim } from "@tsparticles/slim";
import { useTranslation } from "../../../hooks/useTranslation";

const { Text } = Typography;

// Reusable particles component
const ParticleBackground = ({
  id,
  isMobile,
}: {
  id: string;
  isMobile: boolean;
}) => {
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
            distance: 150,
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
            value: isMobile ? 15 : 120,
          },
          opacity: {
            value: 0.8,
          },
          size: {
            value: { min: 2, max: 5 },
          },
        },
        detectRetina: true,
        background: {
          color: "transparent",
        },
        interactivity: {
          events: {
            onHover: {
              enable: false,
            },
            onClick: {
              enable: false,
            },
          },
        },
      }}
    />
  );
};

// Language options matching backend enum
const languageOptions = [
  { value: "en", label: "English" },
  { value: "es", label: "Español" },
  // { value: "fr", label: "Français" },
  // { value: "de", label: "Deutsch" },
  // { value: "it", label: "Italiano" },
  // { value: "nl", label: "Nederlands" },
  // { value: "pt", label: "Português" },
  // { value: "ru", label: "Русский" },
  { value: "zh", label: "中文" },
  { value: "ja", label: "日本語" },
  { value: "ko", label: "한국어" },
  { value: "ar", label: "العربية" },
  // { value: "hi", label: "हिन्दी" },
  { value: "bg", label: "Български" },
];

export const Header: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { user, setUser } = useUser();
  const [init, setInit] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  const { t, changeLanguage, currentLanguage } = useTranslation();

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

  // Initialize tsParticles
  useEffect(() => {
    initParticlesEngine(async (engine) => {
      await loadSlim(engine);
    }).then(() => {
      setInit(true);
    });
  }, []);

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
        ...headerStyle,
        background: isDarkMode
          ? undefined
          : "linear-gradient(135deg, #ffe7ba, #fff1e6)",
      }}
    >
      {/* Particle Background - fewer particles on mobile */}
      {init && (
        <div
          className="absolute"
          style={{
            width: "100%",
            height: "100%",
            top: 0,
            left: 0,
            bottom: 0,
            right: 0,
            overflow: "hidden",
            pointerEvents: "none",
          }}
        >
          <ParticleBackground id="tsparticles-header" isMobile={isMobile} />
        </div>
      )}
      <div className="relative z-10 w-full flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        {/* Left Section: Logo + Theme Switch on mobile */}
        <div className="flex flex-col w-full sm:flex-row sm:items-center sm:gap-5">
          {/* Mobile: GONEXT + Switch inline */}
          <div className="flex justify-between sm:hidden w-full items-center">
            <div
              style={goldmanStyle}
              className="cursor-pointer"
              onClick={() => navigate("/")}
            >
              {t("header.title")}
            </div>
            <div className="flex items-center gap-2">
              <Select
                defaultValue={currentLanguage}
                style={{ width: 80 }}
                onChange={handleLanguageChange}
                options={languageOptions}
                size="small"
              />
              <DarkModeSwitch
                checked={isDarkMode}
                onChange={toggleDarkMode}
                size={25}
              />
            </div>
          </div>

          {/* Desktop: GONEXT only (dark switch is in right section) */}
          <div
            className="hidden sm:block cursor-pointer"
            style={goldmanStyle}
            onClick={() => navigate("/")}
          >
            {t("header.title")}
          </div>

          {/* Global Search and Quick Search */}
          {location.pathname !== "/" && (
            <div className="flex flex-col sm:flex-row sm:items-center w-full sm:gap-3 mt-2 sm:mt-0">
              <div className="w-full sm:max-w-[600px]">
                <GlobalSearch />
              </div>
              <span className="hidden sm:inline-block mx-2 whitespace-nowrap">
                {t("common.or")}
              </span>
              <div className="hidden sm:block">
                <QuickSearch />
              </div>
            </div>
          )}
        </div>

        {/* Right Section: Theme (desktop only) & Auth */}
        <div className="hidden sm:flex items-center gap-3">
          <Select
            defaultValue={currentLanguage}
            style={{ width: 100 }}
            onChange={handleLanguageChange}
            options={languageOptions}
          />
          <DarkModeSwitch
            checked={isDarkMode}
            onChange={toggleDarkMode}
            size={25}
          />

          {/* Auth (optional) */}
          {/* {user ? (
            <Button size="large" onClick={onLogout} className="cool-button">
              <div className="flex gap-3 items-center h-full">
                {user.picture && <Avatar src={user.picture} size={30} />}
                <span>{t('common.logout')}</span>
              </div>
            </Button>
          ) : (
            <GoogleLogin
              onSuccess={onLoginSuccess}
              theme={"outline"}
              text={undefined}
              useOneTap
              shape="circle"
              onError={onLoginError}
            />
          )} */}
        </div>
      </div>
    </Layout.Header>
  );
};

const headerStyle: React.CSSProperties = {
  height: "auto", // allow height to grow
  display: "flex",
  alignItems: "center",
  boxShadow: "0px 2px 8px rgba(0, 0, 0, 0.1)",
  padding: "10px 20px",
  position: "relative",
  overflow: "hidden",
};

const goldmanStyle: React.CSSProperties = {
  fontFamily: '"Goldman", serif',
  fontWeight: 400,
  fontStyle: "normal",
  fontSize: "3rem",
};

export default Header;
