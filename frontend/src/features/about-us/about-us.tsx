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

type TeamMember = {
  name: string;
  title: string;
  description: string;
  image: string;
  github?: string;
  linkedin?: string;
  email?: string;
  website?: string;
};

const AboutUs: React.FC = () => {
  const teamMembers: TeamMember[] = [
    {
      name: "Kostadin Devedzhiev",
      title: "Founder | ML | API | UI",
      description:
        "Kostadin is a visionary leader with expertise in machine learning, API development, and UI design. He drives innovation and excellence in our projects.",
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

  const emailStyle = {
    // color: "#1890ff",
    fontSize: "16px",
    marginTop: "10px",
  };

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
        className="text-center mb-10 mx-auto"
        style={{ maxWidth: "500px", textAlign: "center" }}
      >
        <Title level={2} style={{ marginBottom: "16px" }}>
          Meet the Team
        </Title>
        <Paragraph type="secondary" style={{ fontSize: "16px" }}>
          Our team operates from New York City.
        </Paragraph>
      </div>

      <Row gutter={[24, 24]} style={{ flex: 1, maxWidth: "1000px" }}>
        {teamMembers.map((member, index) => (
          <Col span={24} key={index}>
            <Card
              hoverable
              style={{
                borderRadius: "8px",
                overflow: "hidden",
                marginBottom: "20px",
                padding: "20px",
              }}
            >
              <Row gutter={[16, 16]} align="middle">
                {index % 2 === 0 ? (
                  <>
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
                      <Title level={5}>{member.name}</Title>
                      <Text type="secondary">{member.title}</Text>
                      <Paragraph style={{ marginTop: "10px" }}>
                        {member.description}
                      </Paragraph>
                      {member.email && (
                        <Paragraph style={emailStyle}>
                          <a
                            href={`mailto:${member.email}`}
                            style={{ fontStyle: "italic"}}
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
                              target="_blank"
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
                              href={member.linkedin}
                              target="_blank"
                              icon={<LinkedinFilled />}
                            />
                          </Tooltip>
                        )}
                        {member.github && (
                          <Tooltip title="GitHub">
                            <Button
                              shape="circle"
                              type="text"
                              href={member.github}
                              target="_blank"
                              icon={<GithubFilled />}
                            />
                          </Tooltip>
                        )}
                      </div>
                    </Col>
                  </>
                ) : (
                  <>
                    <Col xs={24} md={16}>
                      <Title level={5}>{member.name}</Title>
                      <Text type="secondary">{member.title}</Text>
                      <Paragraph style={{ marginTop: "10px" }}>
                        {member.description}
                      </Paragraph>
                      {member.email && (
                        <Paragraph style={emailStyle}>
                          <MailFilled style={{ marginRight: "8px" }} />
                          {member.email}
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
                              target="_blank"
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
                              href={member.linkedin}
                              target="_blank"
                              icon={<LinkedinFilled />}
                            />
                          </Tooltip>
                        )}
                        {member.github && (
                          <Tooltip title="GitHub">
                            <Button
                              shape="circle"
                              type="text"
                              href={member.github}
                              target="_blank"
                              icon={<GithubFilled />}
                            />
                          </Tooltip>
                        )}
                      </div>
                    </Col>
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
                  </>
                )}
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
          Interested in Contributing?
        </Title>
        <Paragraph type="secondary" style={{ fontSize: "16px" }}>
          As an open-source project, we’re always looking for talented
          individuals to help us. If you’re passionate about innovation and
          creating impactful solutions, we’d love to hear from you!
        </Paragraph>
        <Tooltip title="Email us">
          <Button
            href="mailto:kostadin.g.devedzhiev@gmail.com"
            style={{ margin: "16px 8px" }}
            icon={<MailOutlined />}
          >
            Apply Here
          </Button>
        </Tooltip>
        <Tooltip title="View on GitHub">
          <Button
            href="https://github.com/kostadindev/gonext"
            target="_blank"
            icon={<GithubOutlined />}
            style={{ margin: "16px 8px" }}
          >
            gonext UI
          </Button>
        </Tooltip>
        <Tooltip title="View on GitHub">
          <Button
            href="https://github.com/kostadindev/gonext-ml"
            target="_blank"
            icon={<GithubOutlined />}
            style={{ margin: "16px 8px" }}
          >
            gonext ML
          </Button>
        </Tooltip>
      </div>
    </div>
  );
};

export default AboutUs;
