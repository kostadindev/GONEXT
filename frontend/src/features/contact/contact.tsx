import React from "react";
import { Card, Row, Col, Typography, Button, Tooltip } from "antd";
import {
  GithubFilled,
  GithubOutlined,
  GlobalOutlined,
  LinkedinFilled,
  MailFilled,
  MailOutlined,
} from "@ant-design/icons";

const { Title, Text, Paragraph } = Typography;

interface ContactPerson {
  name: string;
  role: string;
  description: string;
  image: string;
  email?: string;
  github?: string;
  linkedin?: string;
  website?: string;
}

const Contact: React.FC = () => {
  const contactPeople: ContactPerson[] = [
    {
      name: "Kostadin Devedzhiev",
      role: "Founder & Technical Lead",
      description: `For technical inquiries, partnerships, or feedback regarding our product, please get in touch.`,
      image:
        "https://ddragon.leagueoflegends.com/cdn/img/champion/splash/MonkeyKing_5.jpg",
      email: "kostadin@gonext.lol",
      github: "https://github.com/kostadindev",
      linkedin: "https://www.linkedin.com/in/kostadin-dev/",
      website: "https://kostadindev.github.io/",
    },
    {
      name: "Ivan Nikolov",
      role: "API & DevOps Specialist",
      description:
        "For questions about our API services or operational support, feel free to reach out.",
      image:
        "https://ddragon.leagueoflegends.com/cdn/img/champion/splash/MasterYi_9.jpg",
      email: "ivan@gonext.lol",
      github: "https://github.com/nnivan",
    },
  ];

  const emailStyle = { fontSize: "16px", marginTop: "10px" };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        minHeight: "calc(100vh - 64px)",
        padding: "20px",
      }}
    >
      <Title level={2} style={{ marginBottom: "16px" }}>
        Contact Us
      </Title>
      <Row gutter={[24, 24]} style={{ flex: 1, maxWidth: "1000px" }}>
        <Paragraph type="secondary" style={{ fontSize: "16px" }}>
          We’re here to help! Whether you have questions about our product, need
          support, or want to share feedback, please reach out. You can contact
          any of our team members directly or use our general inquiry channels
          below.
        </Paragraph>
      </Row>

      <Row gutter={[24, 24]} style={{ flex: 1, maxWidth: "1000px" }}>
        {contactPeople.map((person, index) => (
          <Col span={24} key={index}>
            <Card hoverable>
              <Row gutter={[16, 16]} align="middle">
                <Col
                  xs={24}
                  md={8}
                  style={{
                    textAlign: "center",
                    display: "flex",
                    justifyContent: "center",
                  }}
                >
                  <img
                    alt={person.name}
                    src={person.image}
                    style={{
                      height: "250px",
                      width: "400px",
                      borderRadius: "15%",
                      objectFit: "cover",
                    }}
                  />
                </Col>
                <Col xs={24} md={16}>
                  <Title level={4}>{person.name}</Title>
                  <Text type="secondary" style={{ fontSize: "16px" }}>
                    {person.role}
                  </Text>
                  <Paragraph
                    style={{ marginTop: "10px", whiteSpace: "pre-line" }}
                  >
                    {person.description}
                  </Paragraph>
                  {person.email && (
                    <Paragraph style={emailStyle}>
                      <Typography.Link
                        href={`mailto:${person.email}`}
                        target="_blank"
                      >
                        {person.email}
                      </Typography.Link>
                    </Paragraph>
                  )}
                  <div style={{ marginTop: "10px" }}>
                    {person.website && (
                      <Tooltip title="Website">
                        <Button
                          shape="circle"
                          type="text"
                          target="_blank"
                          href={person.website}
                          icon={<GlobalOutlined />}
                        />
                      </Tooltip>
                    )}
                    {person.email && (
                      <Tooltip title="Email">
                        <Button
                          shape="circle"
                          type="text"
                          href={`mailto:${person.email}`}
                          icon={<MailFilled />}
                        />
                      </Tooltip>
                    )}
                    {person.linkedin && (
                      <Tooltip title="LinkedIn">
                        <Button
                          shape="circle"
                          type="text"
                          target="_blank"
                          href={person.linkedin}
                          icon={<LinkedinFilled />}
                        />
                      </Tooltip>
                    )}
                    {person.github && (
                      <Tooltip title="GitHub">
                        <Button
                          shape="circle"
                          type="text"
                          target="_blank"
                          href={person.github}
                          icon={<GithubFilled />}
                        />
                      </Tooltip>
                    )}
                  </div>
                </Col>
              </Row>
            </Card>
          </Col>
        ))}
      </Row>

      <div
        style={{
          textAlign: "center",
          paddingTop: "20px",
          maxWidth: "1100px",
          margin: "0 auto",
        }}
      >
        <Title level={2} style={{ marginBottom: "16px" }}>
          General Inquiries
        </Title>
        <Paragraph type="secondary" style={{ fontSize: "16px" }}>
          For general questions, partnership opportunities, or media inquiries,
          please email us at{" "}
          <Typography.Link href="mailto:info@gonext.lol" target="_blank">
            info@gonext.lol
          </Typography.Link>
          .
        </Paragraph>
        <Tooltip title="Email us">
          <Button
            href="mailto:info@gonext.lol"
            style={{ margin: "16px 8px" }}
            icon={<MailOutlined />}
          >
            Email
          </Button>
        </Tooltip>
        <Tooltip title="View UI on GitHub">
          <Button
            href="https://github.com/kostadindev/gonext"
            target="_blank"
            icon={<GithubOutlined />}
            style={{ margin: "16px 8px" }}
          >
            UI
          </Button>
        </Tooltip>
        <Tooltip title="View ML on GitHub">
          <Button
            href="https://github.com/kostadindev/gonext-ml"
            target="_blank"
            icon={<GithubOutlined />}
            style={{ margin: "16px 8px" }}
          >
            ML
          </Button>
        </Tooltip>
      </div>
    </div>
  );
};

export default Contact;
