import React from "react";
import { Layout, Row, Col, Divider, Typography } from "antd";
import {
  GithubOutlined,
  MailOutlined,
  InfoCircleOutlined,
} from "@ant-design/icons";
import { useLocation } from "react-router-dom";

export const Footer: React.FC = () => {
  const { pathname } = useLocation();
  const isLanding = pathname === "/";

  // Base footer style, with light-theme overrides on landing
  const footerStyle: React.CSSProperties = {
    textAlign: "center",
    padding: "40px 50px",
    backgroundColor: isLanding ? "#ffffff" : "transparent",
    color: isLanding ? "#000000" : undefined,
  };

  // Heading style override
  const headingStyle: React.CSSProperties = {
    marginBottom: 10,
    color: isLanding ? "#000000" : undefined,
  };

  // Link style override
  const linkStyle: React.CSSProperties = {
    color: isLanding ? "#000000" : undefined,
    textDecoration: "none",
  };

  // Small-print style
  const smallTextStyle: React.CSSProperties = {
    fontSize: "12px",
    color: isLanding ? "#666666" : "#888888",
  };

  return (
    <Layout.Footer style={footerStyle}>
      <Row justify="center" gutter={[32, 16]}>
        {/* Quick Links */}
        <Col xs={24} sm={12} md={8}>
          <h3 style={headingStyle}>Quick Links</h3>
          <p>
            <a href="/about-us" style={linkStyle}>
              <InfoCircleOutlined /> About Us
            </a>
          </p>
          <p>
            <a href="/contact" style={linkStyle}>
              <MailOutlined /> Contact
            </a>
          </p>
        </Col>

        {/* Company Info */}
        <Col xs={24} sm={12} md={8} style={{ textAlign: "center" }}>
          <Typography.Text
            strong
            style={{ color: isLanding ? "#000000" : undefined }}
          >
            GONEXT
          </Typography.Text>
          <Typography.Paragraph style={smallTextStyle}>
            GONEXT is not endorsed by Riot Games and does not reflect the views
            or opinions of Riot Games or anyone officially involved in producing
            or managing Riot Games properties. Riot Games and all associated
            properties are trademarks or registered trademarks of Riot Games,
            Inc.
          </Typography.Paragraph>
        </Col>

        {/* Social Media Links */}
        <Col xs={24} sm={12} md={8}>
          <h3 style={headingStyle}>Follow Us</h3>
          <p>
            <a
              href="https://github.com/kostadindev/gonext"
              target="_blank"
              rel="noreferrer"
              style={linkStyle}
            >
              <GithubOutlined style={{ fontSize: "18px" }} /> GitHub
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

      <p style={smallTextStyle}>
        Made with ❤️ by the <b>GONEXT</b> team.
      </p>
    </Layout.Footer>
  );
};

export default Footer;
