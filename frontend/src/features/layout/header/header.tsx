import React, { useState, useEffect } from "react";
import { Avatar, Button, Layout } from "antd";
import GlobalSearch from "../../global-search/global-search";
import { QuickSearch } from "../../quick-search/quick-search";
import { GoogleLogin } from "@react-oauth/google";
import {
  fetchUser,
  handleLoginSuccess,
  handleLogout,
} from "../../../libs/general/api";

interface DecodedToken {
  name: string;
  picture: string;
  [key: string]: any;
}

export const Header: React.FC = () => {
  const [user, setUser] = useState<DecodedToken | null>(null);

  useEffect(() => {
    const getUser = async () => {
      const userData = await fetchUser();
      setUser(userData);
    };

    getUser();
  }, []);

  const onLoginSuccess = async (credentialResponse: any) => {
    const token = credentialResponse.credential;
    const decoded = await handleLoginSuccess(token);
    setUser(decoded);
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
