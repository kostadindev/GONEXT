import { useEffect, useState } from "react";
import { Layout, Button, Typography, Row, Col, Space } from "antd";

const { Footer } = Layout;
const { Text, Link } = Typography;

const COOKIE_CONSENT_KEY = "cookieConsent";

const CookieConsentBanner = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(
    localStorage.getItem("theme") === "dark"
  );

  // Check for cookie consent on mount
  useEffect(() => {
    const consent = localStorage.getItem(COOKIE_CONSENT_KEY);
    if (!consent) {
      setIsVisible(true);
    }
  }, []);

  // Listen for theme changes
  useEffect(() => {
    const handleThemeChange = () => {
      setIsDarkMode(localStorage.getItem("theme") === "dark");
    };

    window.addEventListener("themeChanged", handleThemeChange);
    return () => window.removeEventListener("themeChanged", handleThemeChange);
  }, []);

  const handleAccept = () => {
    localStorage.setItem(COOKIE_CONSENT_KEY, "accepted");
    setIsVisible(false);
    // Optionally, initialize non-essential cookies or scripts here
  };

  const handleDecline = () => {
    localStorage.setItem(COOKIE_CONSENT_KEY, "declined");
    setIsVisible(false);
    // Optionally, disable non-essential cookies or tracking scripts here
  };

  if (!isVisible) return null;

  return (
    <Footer
      style={{
        position: "fixed",
        bottom: 0,
        width: "100%",
        padding: "16px 24px",
        boxShadow: "0 -2px 8px rgba(0, 0, 0, 0.1)",
        zIndex: 1000,
        backgroundColor: isDarkMode ? "#1f1f1f" : "#ffffff",
      }}
    >
      <Row justify="space-between" align="middle" gutter={[16, 16]}>
        <Col xs={24} sm={16}>
          <Text style={{ color: isDarkMode ? "#fff" : "#000" }}>
            We use cookies to personalize content and analyze our traffic. By
            clicking "Accept", you consent to our use of cookies. You can{" "}
            <Link href="/privacy-policy" style={{ color: "#e89a3c" }}>
              learn more
            </Link>
            .
          </Text>
        </Col>
        <Col xs={24} sm={8} style={{ textAlign: "right" }}>
          <Space>
            <Button onClick={handleDecline}>Decline</Button>
            <Button type="primary" onClick={handleAccept}>
              Accept
            </Button>
          </Space>
        </Col>
      </Row>
    </Footer>
  );
};

export default CookieConsentBanner;
