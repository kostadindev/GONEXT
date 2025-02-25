import { Layout, Row, Col, Divider, Typography } from "antd";
import {
  TwitterOutlined,
  LinkedinOutlined,
  DiscordOutlined,
  GithubOutlined,
  MailOutlined,
  FileTextOutlined,
  InfoCircleOutlined,
} from "@ant-design/icons";

export const Footer = () => {
  return (
    <Layout.Footer
      style={{
        textAlign: "center",
        padding: "40px 50px",
        backgroundColor: "transparent",
      }}
    >
      <Row justify="center" gutter={[32, 16]}>
        {/* Quick Links */}
        <Col xs={24} sm={12} md={8}>
          <h3 style={{ marginBottom: 10 }}>Quick Links</h3>
          <p>
            <a href="/about-us">
              <InfoCircleOutlined /> About Us
            </a>
          </p>
          <p>
            <a href="/about-us">
              <MailOutlined /> Contact
            </a>
          </p>
          <p>
            <a href="/privacy">
              <FileTextOutlined /> Privacy Policy
            </a>
          </p>
          <p>
            <a href="/terms">
              <FileTextOutlined /> Terms of Service
            </a>
          </p>
        </Col>

        {/* Company Info */}
        <Col xs={24} sm={12} md={8} style={{ textAlign: "center" }}>
          <Typography.Text strong>GONEXT</Typography.Text> ©{" "}
          {new Date().getFullYear()}. All rights reserved.
          <Typography.Paragraph style={{ fontSize: "12px", color: "#666" }}>
            GONEXT is not endorsed by Riot Games and does not reflect the views
            or opinions of Riot Games or anyone officially involved in producing
            or managing Riot Games properties. Riot Games and all associated
            properties are trademarks or registered trademarks of Riot Games,
            Inc.
          </Typography.Paragraph>
        </Col>

        {/* Social Media Links */}
        <Col xs={24} sm={12} md={8}>
          <h3 style={{ marginBottom: 10 }}>Follow Us</h3>
          <p>
            <a
              href="https://discord.gg/yourinvite"
              target="_blank"
              rel="noreferrer"
            >
              <DiscordOutlined style={{ fontSize: "18px", color: "#5865F2" }} />{" "}
              Discord
            </a>
          </p>
          <p>
            <a
              href="https://www.linkedin.com/company/yourcompany"
              target="_blank"
              rel="noreferrer"
            >
              <LinkedinOutlined
                style={{ fontSize: "18px", color: "#0077B5" }}
              />{" "}
              LinkedIn
            </a>
          </p>
          <p>
            <a
              href="https://github.com/kostadindev/gonext"
              target="_blank"
              rel="noreferrer"
            >
              <GithubOutlined style={{ fontSize: "18px" }} /> GitHub
            </a>
          </p>
        </Col>
      </Row>

      <Divider style={{ margin: "15px 0" }} />

      <p style={{ fontSize: "12px", color: "#888" }}>
        Made with ❤️ by the <b>GONEXT</b> team.
      </p>
    </Layout.Footer>
  );
};
