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

  const [isDarkMode, setIsDarkMode] = useState<boolean>(
    localStorage.getItem("theme") !== "light"
  );

  const toggleDarkMode = (checked: boolean) => {
    setIsDarkMode(checked);
    const newTheme = checked ? "dark" : "light";
    localStorage.setItem("theme", newTheme);
    window.dispatchEvent(new Event("themeChanged"));
  };

  return (
    <Layout.Header style={headerStyle}>
      <div className="w-full flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        {/* Left Section: Logo + Theme Switch on mobile */}
        <div className="flex flex-col w-full sm:flex-row sm:items-center sm:gap-5">
          {/* Mobile: GONEXT + Switch inline */}
          <div className="flex justify-between sm:hidden w-full items-center">
            <div
              style={goldmanStyle}
              className="cursor-pointer"
              onClick={() => navigate("/")}
            >
              GONEXT
            </div>
            <DarkModeSwitch
              checked={isDarkMode}
              onChange={toggleDarkMode}
              size={25}
            />
          </div>

          {/* Desktop: GONEXT only (dark switch is in right section) */}
          <div
            className="hidden sm:block cursor-pointer"
            style={goldmanStyle}
            onClick={() => navigate("/")}
          >
            GONEXT
          </div>

          {/* Global Search and Quick Search */}
          {location.pathname !== "/" && (
            <div className="flex flex-col sm:flex-row sm:items-center w-full sm:gap-3 mt-2 sm:mt-0">
              <div className="w-full sm:max-w-[600px]">
                <GlobalSearch />
              </div>
              <span className="hidden sm:inline-block mx-2 whitespace-nowrap">
                or
              </span>
              <div className="hidden sm:block">
                <QuickSearch />
              </div>
            </div>
          )}
        </div>

        {/* Right Section: Theme (desktop only) & Auth */}
        <div className="hidden sm:flex items-center gap-3">
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
                <span>Log out</span>
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
};

const goldmanStyle: React.CSSProperties = {
  fontFamily: '"Goldman", serif',
  fontWeight: 400,
  fontStyle: "normal",
  fontSize: "3rem",
};

export default Header;
