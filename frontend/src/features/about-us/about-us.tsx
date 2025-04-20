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
  return (
    <div style={{ padding: "40px 20px" }}>
      <Title level={2} style={{ textAlign: "center", marginBottom: "32px" }}>
        About Us
      </Title>

      <Row justify="center">
        <Col xs={24} md={20} lg={16}>
          <Paragraph
            style={{ fontSize: "16px", textAlign: "center", marginBottom: 40 }}
          >
            <b>GONEXT</b> is a GenAI-powered assistant tailored for League of
            Legends players, delivering real-time and personalized strategies,
            matchups, synergies, and builds. By harnessing the Riot API,{" "}
            <b>GONEXT</b> retrieves live game data—covering both allied and
            enemy players—and employs large language models to offer
            context-specific guidance for every match.
          </Paragraph>
        </Col>
      </Row>

      <Divider orientation="center">Meet the Team</Divider>

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
                    {member.name}
                  </Title>
                  <Text type="secondary">{member.title}</Text>
                  <Paragraph style={{ marginTop: 16, whiteSpace: "pre-line" }}>
                    {member.description}
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
                      <Tooltip title="Website">
                        <Button
                          shape="circle"
                          icon={<GlobalOutlined />}
                          href={member.website}
                          target="_blank"
                        />
                      </Tooltip>
                    )}
                    {member.email && (
                      <Tooltip title="Email">
                        <Button
                          shape="circle"
                          icon={<MailFilled />}
                          href={`mailto:${member.email}`}
                        />
                      </Tooltip>
                    )}
                    {member.linkedin && (
                      <Tooltip title="LinkedIn">
                        <Button
                          shape="circle"
                          icon={<LinkedinFilled />}
                          href={member.linkedin}
                          target="_blank"
                        />
                      </Tooltip>
                    )}
                    {member.github && (
                      <Tooltip title="GitHub">
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
        Making GONEXT Better
      </Divider>

      <Row justify="center">
        <Col xs={24} md={20} lg={16} style={{ textAlign: "center" }}>
          <Paragraph style={{ fontSize: "16px" }}>
            Let us know what you want to see in future releases and report bugs.
            We will listen!
            <br />
            Email us at{" "}
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

export default AboutUs;
