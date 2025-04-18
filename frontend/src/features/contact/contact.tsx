import React from "react";
import {
  Card,
  Row,
  Col,
  Typography,
  Button,
  Tooltip,
  Space,
  Divider,
} from "antd";
import {
  GithubFilled,
  GithubOutlined,
  GlobalOutlined,
  LinkedinFilled,
  MailFilled,
  MailOutlined,
} from "@ant-design/icons";

const { Title, Text, Paragraph, Link } = Typography;

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

const Contact: React.FC = () => {
  return (
    <div style={{ padding: "40px 20px" }}>
      <Title level={2} style={{ textAlign: "center", marginBottom: "32px" }}>
        Contact Us
      </Title>

      <Row justify="center">
        <Col xs={24} md={20} lg={16}>
          <Paragraph
            style={{ fontSize: "16px", textAlign: "center", marginBottom: 40 }}
          >
            We’re here to help! Whether you have questions about our product,
            need support, or want to share feedback, please reach out. You can
            contact any of our team members directly or use our general inquiry
            channels below.
          </Paragraph>
        </Col>
      </Row>

      <Divider orientation="center">Our Team</Divider>

      <Row gutter={[24, 32]} justify="center">
        {contactPeople.map((person, index) => (
          <Col xs={24} md={20} lg={16} key={index}>
            <Card
              hoverable
              style={{
                borderRadius: 12,
                boxShadow: "0 4px 20px rgba(0, 0, 0, 0.05)",
              }}
            >
              <Row gutter={[24, 24]} align="middle">
                <Col xs={24} md={10}>
                  <img
                    alt={person.name}
                    src={person.image}
                    style={{
                      width: "100%",
                      height: "auto",
                      borderRadius: 12,
                      objectFit: "cover",
                      maxHeight: 240,
                    }}
                  />
                </Col>
                <Col xs={24} md={14}>
                  <Title level={4} style={{ marginBottom: 0 }}>
                    {person.name}
                  </Title>
                  <Text type="secondary">{person.role}</Text>
                  <Paragraph style={{ marginTop: 16, whiteSpace: "pre-line" }}>
                    {person.description}
                  </Paragraph>
                  {person.email && (
                    <Paragraph style={{ marginBottom: 10 }}>
                      <Link href={`mailto:${person.email}`}>
                        {person.email}
                      </Link>
                    </Paragraph>
                  )}
                  <Space size="middle" wrap>
                    {person.website && (
                      <Tooltip title="Website">
                        <Button
                          shape="circle"
                          icon={<GlobalOutlined />}
                          href={person.website}
                          target="_blank"
                        />
                      </Tooltip>
                    )}
                    {person.email && (
                      <Tooltip title="Email">
                        <Button
                          shape="circle"
                          icon={<MailFilled />}
                          href={`mailto:${person.email}`}
                        />
                      </Tooltip>
                    )}
                    {person.linkedin && (
                      <Tooltip title="LinkedIn">
                        <Button
                          shape="circle"
                          icon={<LinkedinFilled />}
                          href={person.linkedin}
                          target="_blank"
                        />
                      </Tooltip>
                    )}
                    {person.github && (
                      <Tooltip title="GitHub">
                        <Button
                          shape="circle"
                          icon={<GithubFilled />}
                          href={person.github}
                          target="_blank"
                        />
                      </Tooltip>
                    )}
                  </Space>
                </Col>
              </Row>
            </Card>
          </Col>
        ))}
      </Row>

      <Divider orientation="center" style={{ marginTop: 64 }}>
        General Inquiries
      </Divider>

      <Row justify="center">
        <Col xs={24} md={20} lg={16} style={{ textAlign: "center" }}>
          <Paragraph style={{ fontSize: "16px" }}>
            For general questions, partnership opportunities, or media
            inquiries, please email us at{" "}
            <Link href="mailto:info@gonext.lol">info@gonext.lol</Link>.
          </Paragraph>
          <Space size="middle" style={{ marginTop: 16 }} wrap>
            <Tooltip title="Email us">
              <Button
                type="default"
                icon={<MailOutlined />}
                href="mailto:info@gonext.lol"
              >
                Email
              </Button>
            </Tooltip>
            <Tooltip title="View UI Repo">
              <Button
                type="default"
                icon={<GithubOutlined />}
                href="https://github.com/kostadindev/gonext"
                target="_blank"
              >
                UI
              </Button>
            </Tooltip>
            <Tooltip title="View ML Repo">
              <Button
                type="default"
                icon={<GithubOutlined />}
                href="https://github.com/kostadindev/gonext-ml"
                target="_blank"
              >
                ML
              </Button>
            </Tooltip>
          </Space>
        </Col>
      </Row>
    </div>
  );
};

export default Contact;
