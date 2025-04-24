import React from "react";
import { Layout, Row, Col, Divider, Typography } from "antd";
import {
  GithubOutlined,
  MailOutlined,
  InfoCircleOutlined,
} from "@ant-design/icons";
import { useLocation } from "react-router-dom";
import { useTranslation } from "react-i18next";

const { Text, Paragraph } = Typography;

export const Footer: React.FC = () => {
  const { t } = useTranslation();
  const { pathname } = useLocation();
  const isLanding = pathname === "/";

  // Base footer style
  const footerStyle: React.CSSProperties = {
    textAlign: "center",
    padding: "40px 50px",
    backgroundColor: isLanding ? "#ffffff" : "transparent",
    color: isLanding ? "#000000" : undefined,
  };

  const headingStyle: React.CSSProperties = {
    marginBottom: 10,
    color: isLanding ? "#000000" : undefined,
  };

  const smallTextStyle: React.CSSProperties = {
    fontSize: "12px",
    color: isLanding ? "#666666" : "#888888",
  };

  // Tailwind classes for hover‑only primary color
  const linkClasses = `text-current transition-colors duration-200 hover:text-[#e89a3c]`;

  return (
    <Layout.Footer style={footerStyle}>
      <Row justify="center" gutter={[32, 16]}>
        {/* Quick Links */}
        <Col xs={24} sm={12} md={8}>
          <h3 style={headingStyle}>{t("footer.quickLinks")}</h3>
          <p>
            <a href="/about-us" className={linkClasses}>
              <InfoCircleOutlined /> {t("footer.aboutUs")}
            </a>
          </p>
          <p>
            <a href="/contact" className={linkClasses}>
              <MailOutlined /> {t("footer.contact")}
            </a>
          </p>
        </Col>

        {/* Company Info */}
        <Col xs={24} sm={12} md={8} style={{ textAlign: "center" }}>
          <Text strong style={{ color: isLanding ? "#000000" : undefined }}>
            GONEXT
          </Text>
          <Paragraph style={smallTextStyle}>{t("footer.disclaimer")}</Paragraph>
        </Col>

        {/* Social Media Links */}
        <Col xs={24} sm={12} md={8}>
          <h3 style={headingStyle}>{t("footer.followUs")}</h3>
          <p>
            <a
              href="https://github.com/kostadindev/gonext"
              target="_blank"
              rel="noreferrer"
              className={linkClasses}
            >
              <GithubOutlined style={{ fontSize: "18px" }} />{" "}
              {t("footer.github")}
            </a>
          </p>
        </Col>
      </Row>

      <Divider
        style={{
          margin: "15px 0",
          borderColor: isLanding ? "#e8e8e8" : undefined,
        }}
      />

      <p style={smallTextStyle}>{t("footer.madeWithLove")}</p>
    </Layout.Footer>
  );
};
