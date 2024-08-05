import React from "react";
import { Avatar, Button, Layout } from "antd";
import GlobalSearch from "../../global-search/global-search";
import { QuickSearch } from "../../quick-search/quick-search";
import { GoogleLogin } from "@react-oauth/google";
import { handleLoginSuccess, handleLogout } from "../../../libs/apis/auth-api";
import { useUser } from "../../../context/user.context";

export const Header: React.FC = () => {
  const { user, setUser } = useUser();

  const onLoginSuccess = async (credentialResponse: any) => {
    const token = credentialResponse.credential;
    const user = await handleLoginSuccess(token);
    setUser(user);
  };

  const onLoginError = () => {
    console.log("Login Failed");
  };

  const onLogout = async () => {
    await handleLogout();
    setUser(null);
  };

  return (
    <Layout.Header style={headerStyle}>
      <div className="flex items-center gap-5">
        <GlobalSearch />
        <span>or</span>
        <QuickSearch />
      </div>
      <div className="flex items-center gap-3">
        {user ? (
          <>
            <Button
              type="primary"
              size="large"
              shape="round"
              onClick={onLogout}
            >
              <div className="flex gap-3 items-center h-full">
                {user.picture && <Avatar src={user.picture} size={30} />}
                <span>Log out</span>
              </div>
            </Button>
          </>
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
};
