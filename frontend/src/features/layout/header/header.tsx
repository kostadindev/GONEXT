import React, { useState, useEffect } from "react";
import { Avatar, Button, Layout } from "antd";
import GlobalSearch from "../../global-search/global-search";
import { QuickSearch } from "../../quick-search/quick-search";
import { GoogleLogin } from "@react-oauth/google";
import { jwtDecode } from "jwt-decode";
import axios from "axios";
import Cookies from "js-cookie";

interface DecodedToken {
  name: string;
  picture: string;
  [key: string]: any;
}

export const Header: React.FC = () => {
  const [user, setUser] = useState<DecodedToken | null>(null);
  const [token, setToken] = useState<string | null>(
    Cookies.get("token") || null
  );

  useEffect(() => {
    if (token) {
      try {
        const decoded: DecodedToken = jwtDecode(token);
        setUser(decoded);
      } catch (error) {
        console.error("Error decoding token:", error);
      }
    }
  }, [token]);

  const handleLoginSuccess = (credentialResponse: any) => {
    const token = credentialResponse.credential;
    setToken(token);
    Cookies.set("token", token, { expires: 1 }); // Expires in 1 day

    try {
      const decoded: DecodedToken = jwtDecode(token);
      setUser(decoded);
      console.log("Login Success:", credentialResponse);
      console.log("Decoded Token:", decoded);
    } catch (error) {
      console.error("Error decoding token:", error);
    }
  };

  const handleLoginError = () => {
    console.log("Login Failed");
  };

  const handleLogout = () => {
    setUser(null);
    setToken(null);
    Cookies.remove("token");
    console.log("Logged out");
  };

  const fetchProtectedData = async () => {
    try {
      const response = await axios.get("http://localhost:8000/protected", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log("Protected data:", response.data);
    } catch (error) {
      console.error("Error fetching protected data:", error);
    }
  };

  return (
    <Layout.Header style={headerStyle}>
      <div className="flex items-center gap-5">
        <GlobalSearch />
        <span>or</span>
        <QuickSearch />
        {/* <div
          key="fetchData"
          onClick={fetchProtectedData}
          style={{ cursor: "pointer" }}
        >
          Fetch Protected Data
        </div> */}
      </div>
      <div className="flex items-center gap-3">
        {user ? (
          <>
            <Button
              type="primary"
              size="large"
              shape="round"
              onClick={handleLogout}
            >
              <div className="flex gap-3 items-center h-full">
                {user.picture && <Avatar src={user.picture} size={30} />}
                <span>Log out</span>
              </div>
            </Button>
          </>
        ) : (
          <GoogleLogin
            onSuccess={handleLoginSuccess}
            theme="filled_blue"
            text={undefined}
            useOneTap
            shape="circle"
            onError={handleLoginError}
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
