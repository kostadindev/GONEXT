import React, { useState } from "react";
import { Avatar, Button, Layout, Typography } from "antd";
import { useNavigate, useLocation } from "react-router-dom";
import GlobalSearch from "../../global-search/global-search";
import { QuickSearch } from "../../quick-search/quick-search";
import { GoogleLogin } from "@react-oauth/google";
import { handleLoginSuccess, handleLogout } from "../../../libs/apis/auth-api";
import { useUser } from "../../../context/user.context";
import { DarkModeSwitch } from "react-toggle-dark-mode";

const { Text } = Typography;

export const Header: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { user, setUser } = useUser();

  const onLoginSuccess = async (credentialResponse: any) => {
    const token = credentialResponse.credential;
    const userData = await handleLoginSuccess(token);
    setUser(userData);
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

  // Initialize dark mode based on local storage
  const [isDarkMode, setIsDarkMode] = useState<boolean>(
    localStorage.getItem("theme") === "dark"
  );

  const toggleDarkMode = (checked: boolean) => {
    setIsDarkMode(checked);
    const newTheme = checked ? "dark" : "light";
    localStorage.setItem("theme", newTheme);
    // Dispatch a custom event to let the rest of the app know the theme has changed
    window.dispatchEvent(new Event("themeChanged"));
  };

  return (
    <Layout.Header style={headerStyle}>
      <div style={{ display: "flex", alignItems: "center", gap: "2rem" }}>
        {/* Logo */}
        <div
          style={{ ...goldmanStyle, cursor: "pointer" }}
          onClick={() => navigate("/")}
        >
          GONEXT
        </div>

        {/* Global Search and Quick Search (hidden on home) */}
        {location.pathname !== "/" && (
          <div
            style={{ display: "flex", alignItems: "center", gap: "1.25rem" }}
          >
            <GlobalSearch />
            <span>or</span>
            <QuickSearch />
          </div>
        )}
      </div>

      <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
        {/* Dark mode toggle */}
        <DarkModeSwitch
          checked={isDarkMode}
          onChange={toggleDarkMode}
          size={25}
        />

        {/* Authentication: show logout if logged in, or sign in if not */}
        {user ? (
          <Button size="large" onClick={onLogout} className="cool-button">
            <div className="flex gap-3 items-center h-full">
              {user.picture && <Avatar src={user.picture} size={30} />}
              <span>Log out</span>
            </div>
          </Button>
        ) : (
          <GoogleLogin
            onSuccess={onLoginSuccess}
            theme={isDarkMode ? "filled_black" : "outline"}
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

// Inline style for the header
const headerStyle: React.CSSProperties = {
  height: "80px",
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  boxShadow: "0px 2px 8px rgba(0, 0, 0, 0.1)",
  padding: "0 20px",
};

// Inline style for the logo
const goldmanStyle: React.CSSProperties = {
  fontFamily: '"Goldman", serif',
  fontWeight: 400,
  fontStyle: "normal",
  fontSize: "3rem",
  cursor: "pointer",
};

export default Header;
