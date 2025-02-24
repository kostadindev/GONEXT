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
import { getChampionIconSrc } from "../../libs/league/league-utils";

const { Title, Text, Paragraph } = Typography;

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

const AboutUs: React.FC = () => {
  const teamMembers: TeamMember[] = [
    {
      name: "Kostadin Devedzhiev",
      title: "Founder | ML | API | UI",
      description: `Kostadin has been playing League of Legends since Season 3, achieving a peak rank of Diamond 1. He plays ADC and Jungle and his best champions are Tristana and Wukong.

Kostadin leads engineering and product at GONEXT. Prior to founding GONEXT, Kostadin was a Software Engineer at Stellar Cyber.

He is an incoming student pursuing a Master's in Computer Science, specializing in Natural Language Processing, at Columbia University in New York City.`,
      image:
        "https://media.licdn.com/dms/image/v2/D4E03AQHT-wFQ9xo1sA/profile-displayphoto-shrink_200_200/profile-displayphoto-shrink_200_200/0/1727758296269?e=1743033600&v=beta&t=u7b94xnynKeCumtQDipci8K8p9uiuIgMs_8dO9Qotdo",
      github: "https://github.com/kostadindev",
      linkedin: "https://www.linkedin.com/in/kostadin-dev/",
      email: "kostadin@gonext.lol",
      website: "https://kostadindev.github.io/",
    },
    {
      name: "Ivan Nikolov",
      title: "API | DevOps",
      description:
        "Ivan specializes in API development and DevOps practices, ensuring robust, scalable, and secure backend services.",
      image: `https://ddragon.leagueoflegends.com/cdn/img/champion/splash/MasterYi_5.jpg`,
      github: "https://github.com/nnivan",
      email: "ivan@gonext.lol",
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
        About Us
      </Title>
      <Row gutter={[24, 24]} style={{ flex: 1, maxWidth: "1000px" }}>
        <Paragraph type="secondary" style={{ fontSize: "16px" }}>
          GONEXT is a GenAI-powered assistant tailored for League of Legends
          players, delivering real-time and personalized strategies, matchups,
          synergies, and builds. By harnessing the Riot API, GONEXT retrieves
          live game data—covering both allied and enemy players—and employs
          large language models to offer context-specific guidance for every
          match.
        </Paragraph>
      </Row>
      <div style={{ maxWidth: "500px", textAlign: "center" }}>
        <Title level={2}>Meet the Team</Title>
      </div>

      <Row gutter={[24, 24]} style={{ flex: 1, maxWidth: "1000px" }}>
        {teamMembers.map((member, index) => (
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
                    alt={member.name}
                    src={member.image}
                    style={{
                      height: "200px",
                      width: "200px",
                      borderRadius: "15%",
                      objectFit: "cover",
                    }}
                  />
                </Col>
                <Col xs={24} md={16}>
                  <Title level={4}>{member.name}</Title>
                  <Text type="secondary" style={{ fontSize: "16px" }}>
                    {member.title}
                  </Text>
                  <Paragraph
                    style={{ marginTop: "10px", whiteSpace: "pre-line" }}
                  >
                    {member.description}
                  </Paragraph>
                  {member.email && (
                    <Paragraph style={emailStyle}>
                      <Typography.Link
                        href={`mailto:${member.email}`}
                        target="_blank"
                      >
                        {member.email}
                      </Typography.Link>
                    </Paragraph>
                  )}
                  <div style={{ marginTop: "10px" }}>
                    {member.website && (
                      <Tooltip title="Website">
                        <Button
                          shape="circle"
                          type="text"
                          target="_blank"
                          href={member.website}
                          icon={<GlobalOutlined />}
                        />
                      </Tooltip>
                    )}
                    {member.email && (
                      <Tooltip title="Email">
                        <Button
                          shape="circle"
                          type="text"
                          href={`mailto:${member.email}`}
                          icon={<MailFilled />}
                        />
                      </Tooltip>
                    )}
                    {member.linkedin && (
                      <Tooltip title="LinkedIn">
                        <Button
                          shape="circle"
                          type="text"
                          target="_blank"
                          href={member.linkedin}
                          icon={<LinkedinFilled />}
                        />
                      </Tooltip>
                    )}
                    {member.github && (
                      <Tooltip title="GitHub">
                        <Button
                          shape="circle"
                          type="text"
                          target="_blank"
                          href={member.github}
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
          Making GONEXT better
        </Title>
        <Paragraph type="secondary" style={{ fontSize: "16px" }}>
          Let us know what you want to see in future releases and report bugs.
          We will listen! Email us at{" "}
          <Typography.Link href={`mailto:info@gonext.lol`} target="_blank">
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
        <Tooltip title="View on GitHub">
          <Button
            href="https://github.com/kostadindev/gonext"
            target="_blank"
            icon={<GithubOutlined />}
            style={{ margin: "16px 8px" }}
          >
            UI
          </Button>
        </Tooltip>
        <Tooltip title="View on GitHub">
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

export default AboutUs;
