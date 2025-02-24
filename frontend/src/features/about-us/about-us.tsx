import React from "react";
import { Card, Row, Col, Typography, Button, Tooltip } from "antd";
import {
  GithubFilled,
  GlobalOutlined,
  LinkedinFilled,
  MailFilled,
  MailOutlined,
} from "@ant-design/icons";

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
      description: `Kostadin has been playing League of Legends since Season 3, achieving a peak rank of Diamond 1. He currently leads engineering and product development at gonext.

Prior to founding gonext, Kostadin was a Software Engineer at Stellar Cyber.

He is currently pursuing a Master's in Computer Science, specializing in Natural Language Processing, at Columbia University in New York City.`,
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
      image:
        "https://scontent-lga3-2.xx.fbcdn.net/v/t39.30808-6/463968694_27285182364459185_394874216162696016_n.jpg",
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
      <div
        style={{ maxWidth: "500px", textAlign: "center", marginBottom: "40px" }}
      >
        <Title level={2}>Meet the Team</Title>
        <Paragraph type="secondary" style={{ fontSize: "16px" }}>
          Our team operates from New York City.
        </Paragraph>
      </div>

      <Row gutter={[24, 24]} style={{ flex: 1, maxWidth: "1000px" }}>
        {teamMembers.map((member, index) => (
          <Col span={24} key={index}>
            <Card hoverable style={{ borderRadius: "8px", padding: "20px" }}>
              <Row gutter={[16, 16]} align="middle">
                <Col xs={24} md={8} style={{ textAlign: "center" }}>
                  <img
                    alt={member.name}
                    src={member.image}
                    style={{
                      height: "200px",
                      width: "200px",
                      borderRadius: "25%",
                      objectFit: "contain",
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
                      <a
                        href={`mailto:${member.email}`}
                        style={{ fontStyle: "italic" }}
                      >
                        {member.email}
                      </a>
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
        style={{ textAlign: "center", paddingTop: "40px", maxWidth: "1100px" }}
      >
        <Title level={2}>Interested in Contributing?</Title>
        <Paragraph type="secondary" style={{ fontSize: "16px" }}>
          As an open-source project, we’re always looking for talented
          individuals to help us.
        </Paragraph>
        <Button
          href="mailto:kostadin.g.devedzhiev@gmail.com"
          icon={<MailOutlined />}
        >
          Apply Here
        </Button>
      </div>
    </div>
  );
};

export default AboutUs;
