import React from "react";
import { Avatar, Button, Layout, Typography } from "antd";
import { useNavigate, useLocation } from "react-router-dom";
import GlobalSearch from "../../global-search/global-search";
import { QuickSearch } from "../../quick-search/quick-search";
import { GoogleLogin } from "@react-oauth/google";
import { handleLoginSuccess, handleLogout } from "../../../libs/apis/auth-api";
import { useUser } from "../../../context/user.context";
import UserPreferences from "../../user-preferences/user-preferences";

const { Text } = Typography;

export const Header: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation(); // Get the current route
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

  return (
    <Layout.Header style={headerStyle}>
      <div style={{ display: "flex", alignItems: "center", gap: "2rem" }}>
        {/* Make the logo a clickable text */}
        <div
          style={{ ...goldmanStyle, cursor: "pointer" }}
          onClick={() => navigate("/")}
        >
          gonext
        </div>

        {/* Hide search when on home page */}
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
        <UserPreferences />

        {/* 
          Authentication:
          - If the user is logged in, show the logout button.
          - If the user is not logged in and NOT on the home page, show the sign-in button.
          - If on the home page and not logged in, show nothing.
        */}
        {user ? (
          <Button
            type="primary"
            size="large"
            onClick={onLogout}
            className="cool-button"
          >
            <div className="flex gap-3 items-center h-full">
              {user.picture && <Avatar src={user.picture} size={30} />}
              <span>Log out</span>
            </div>
          </Button>
        ) : (
          location.pathname !== "/" && (
            <GoogleLogin
              onSuccess={onLoginSuccess}
              theme="filled_blue"
              text={undefined}
              useOneTap
              shape="circle"
              onError={onLoginError}
            />
          )
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
