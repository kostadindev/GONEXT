import React, { useEffect } from "react";
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

interface TeamMember {
  name: string;
  title: string;
  description: string;
  image: string;
  github?: string;
  linkedin?: string;
  email?: string;
  website?: string;
}

const teamMembers: TeamMember[] = [
  {
    name: "Kostadin Devedzhiev",
    title: "Founder | ML | API | UI | ADC",
    description: `Kostadin has been playing League of Legends since Season 3, achieving a peak rank of Diamond 1. He plays ADC and Jungle. His favorite champion is Wukong.

Kostadin leads engineering and product at GONEXT. He is a Software Engineer at Stellar Cyber.`,
    image:
      "https://ddragon.leagueoflegends.com/cdn/img/champion/splash/MonkeyKing_5.jpg",
    github: "https://github.com/kostadindev",
    linkedin: "https://www.linkedin.com/in/kostadin-dev/",
    email: "kostadin@gonext.lol",
    website: "https://kostadindev.github.io/",
  },
  {
    name: "Ivan Nikolov",
    title: "API | DevOps | Jungle",
    description:
      "Ivan specializes in API development and DevOps practices, ensuring robust, scalable, and secure backend services.",
    image:
      "https://ddragon.leagueoflegends.com/cdn/img/champion/splash/MasterYi_9.jpg",
    github: "https://github.com/nnivan",
    email: "ivan@gonext.lol",
  },
];

const AboutUs: React.FC = () => {
  const { t } = useTranslation();

  useEffect(() => {
    console.log(
      "Translation result:",
      t("aboutUs.improvement.description", { email: "info@gonext.lol" })
    );
  }, [t]);

  return (
    <div style={{ padding: "40px 20px" }}>
      <Title level={2} style={{ textAlign: "center", marginBottom: "32px" }}>
        {t("aboutUs.title")}
      </Title>

      <Row justify="center">
        <Col xs={24} md={20} lg={16}>
          <Paragraph
            style={{ fontSize: "16px", textAlign: "center", marginBottom: 40 }}
          >
            {t("aboutUs.description")}
          </Paragraph>
        </Col>
      </Row>

      <Divider orientation="center">{t("aboutUs.team.title")}</Divider>

      <Row gutter={[24, 32]} justify="center">
        {teamMembers.map((member, index) => (
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
                    src={member.image}
                    alt={member.name}
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
                    {t(
                      `aboutUs.team.members.${
                        member.name.toLowerCase().split(" ")[0]
                      }.name`
                    )}
                  </Title>
                  <Text type="secondary">
                    {t(
                      `aboutUs.team.members.${
                        member.name.toLowerCase().split(" ")[0]
                      }.title`
                    )}
                  </Text>
                  <Paragraph style={{ marginTop: 16, whiteSpace: "pre-line" }}>
                    {t(
                      `aboutUs.team.members.${
                        member.name.toLowerCase().split(" ")[0]
                      }.description`
                    )}
                  </Paragraph>
                  {member.email && (
                    <Paragraph style={{ marginBottom: 10 }}>
                      <Link href={`mailto:${member.email}`}>
                        {member.email}
                      </Link>
                    </Paragraph>
                  )}
                  <Space size="middle" wrap>
                    {member.website && (
                      <Tooltip title={t("social.website")}>
                        <Button
                          shape="circle"
                          icon={<GlobalOutlined />}
                          href={member.website}
                          target="_blank"
                        />
                      </Tooltip>
                    )}
                    {member.email && (
                      <Tooltip title={t("social.email")}>
                        <Button
                          shape="circle"
                          icon={<MailFilled />}
                          href={`mailto:${member.email}`}
                        />
                      </Tooltip>
                    )}
                    {member.linkedin && (
                      <Tooltip title={t("social.linkedin")}>
                        <Button
                          shape="circle"
                          icon={<LinkedinFilled />}
                          href={member.linkedin}
                          target="_blank"
                        />
                      </Tooltip>
                    )}
                    {member.github && (
                      <Tooltip title={t("social.github")}>
                        <Button
                          shape="circle"
                          icon={<GithubFilled />}
                          href={member.github}
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
        {t("aboutUs.improvement.title")}
      </Divider>

      <Row justify="center">
        <Col xs={24} md={20} lg={16} style={{ textAlign: "center" }}>
          <Paragraph style={{ fontSize: "16px" }}>
            {t(
              "aboutUs.improvement.description",
              { email: "info@gonext.lol" },
              { interpolation: { escapeValue: false } }
            )}
          </Paragraph>
          <Space size="middle" wrap>
            <Tooltip title={t("aboutUs.improvement.tooltips.email")}>
              <Button
                type="default"
                icon={<MailOutlined />}
                href="mailto:info@gonext.lol"
              >
                {t("aboutUs.improvement.buttons.email")}
              </Button>
            </Tooltip>
            <Tooltip title={t("aboutUs.improvement.tooltips.uiRepo")}>
              <Button
                type="default"
                icon={<GithubOutlined />}
                href="https://github.com/kostadindev/gonext"
                target="_blank"
              >
                {t("aboutUs.improvement.buttons.uiRepo")}
              </Button>
            </Tooltip>
            <Tooltip title={t("aboutUs.improvement.tooltips.mlRepo")}>
              <Button
                type="default"
                icon={<GithubOutlined />}
                href="https://github.com/kostadindev/gonext-ml"
                target="_blank"
              >
                {t("aboutUs.improvement.buttons.mlRepo")}
              </Button>
            </Tooltip>
          </Space>
        </Col>
      </Row>
    </div>
  );
};

export default AboutUs;
