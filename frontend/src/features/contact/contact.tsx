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
import { useTranslation } from "../../hooks/useTranslation";

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
    role: "contact.team.roles.founder",
    description: "contact.team.descriptions.technical",
    image:
      "https://ddragon.leagueoflegends.com/cdn/img/champion/splash/MonkeyKing_5.jpg",
    email: "kostadin@gonext.lol",
    github: "https://github.com/kostadindev",
    linkedin: "https://www.linkedin.com/in/kostadin-dev/",
    website: "https://kostadindev.github.io/",
  },
  {
    name: "Ivan Nikolov",
    role: "contact.team.roles.apiSpecialist",
    description: "contact.team.descriptions.api",
    image:
      "https://ddragon.leagueoflegends.com/cdn/img/champion/splash/MasterYi_9.jpg",
    email: "ivan@gonext.lol",
    github: "https://github.com/nnivan",
  },
];

const Contact: React.FC = () => {
  const { t } = useTranslation();

  return (
    <div style={{ padding: "40px 20px" }}>
      <Title level={2} style={{ textAlign: "center", marginBottom: "32px" }}>
        {t("contact.title")}
      </Title>

      <Row justify="center">
        <Col xs={24} md={20} lg={16}>
          <Paragraph
            style={{ fontSize: "16px", textAlign: "center", marginBottom: 40 }}
          >
            {t("contact.description")}
          </Paragraph>
        </Col>
      </Row>

      <Divider orientation="center">{t("contact.team.title")}</Divider>

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
                  <Text type="secondary">{t(person.role)}</Text>
                  <Paragraph style={{ marginTop: 16, whiteSpace: "pre-line" }}>
                    {t(person.description)}
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
                      <Tooltip title={t("contact.social.website")}>
                        <Button
                          shape="circle"
                          icon={<GlobalOutlined />}
                          href={person.website}
                          target="_blank"
                        />
                      </Tooltip>
                    )}
                    {person.email && (
                      <Tooltip title={t("contact.social.email")}>
                        <Button
                          shape="circle"
                          icon={<MailFilled />}
                          href={`mailto:${person.email}`}
                        />
                      </Tooltip>
                    )}
                    {person.linkedin && (
                      <Tooltip title={t("contact.social.linkedin")}>
                        <Button
                          shape="circle"
                          icon={<LinkedinFilled />}
                          href={person.linkedin}
                          target="_blank"
                        />
                      </Tooltip>
                    )}
                    {person.github && (
                      <Tooltip title={t("contact.social.github")}>
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
        {t("contact.generalInquiries.title")}
      </Divider>

      <Row justify="center">
        <Col xs={24} md={20} lg={16} style={{ textAlign: "center" }}>
          <Paragraph style={{ fontSize: "16px" }}>
            {t("contact.generalInquiries.description", {
              email: "info@gonext.lol",
            })}
          </Paragraph>
          <Space size="middle" style={{ marginTop: 16 }} wrap>
            <Tooltip title={t("contact.generalInquiries.tooltips.email")}>
              <Button
                type="default"
                icon={<MailOutlined />}
                href="mailto:info@gonext.lol"
              >
                {t("contact.generalInquiries.buttons.email")}
              </Button>
            </Tooltip>
            <Tooltip title={t("contact.generalInquiries.tooltips.uiRepo")}>
              <Button
                type="default"
                icon={<GithubOutlined />}
                href="https://github.com/kostadindev/gonext"
                target="_blank"
              >
                {t("contact.generalInquiries.buttons.uiRepo")}
              </Button>
            </Tooltip>
            <Tooltip title={t("contact.generalInquiries.tooltips.mlRepo")}>
              <Button
                type="default"
                icon={<GithubOutlined />}
                href="https://github.com/kostadindev/gonext-ml"
                target="_blank"
              >
                {t("contact.generalInquiries.buttons.mlRepo")}
              </Button>
            </Tooltip>
          </Space>
        </Col>
      </Row>
    </div>
  );
};

export default Contact;
