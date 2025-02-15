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
      image:
        "https://media.licdn.com/dms/image/v2/D4E03AQHT-wFQ9xo1sA/profile-displayphoto-shrink_200_200/profile-displayphoto-shrink_200_200/0/1727758296269?e=1743033600&v=beta&t=u7b94xnynKeCumtQDipci8K8p9uiuIgMs_8dO9Qotdo",
      github: "https://github.com/kostadindev",
      linkedin: "https://www.linkedin.com/in/kostadin-dev/",
      email: "kostadin.g.devedzhiev@gmail.com",
      website: "https://kostadindev.github.io/",
    },
    {
      name: "Ivan Nikolov",
      title: "API | DevOps",
      image:
        "https://scontent-lga3-2.xx.fbcdn.net/v/t39.30808-6/463968694_27285182364459185_394874216162696016_n.jpg?_nc_cat=101&ccb=1-7&_nc_sid=6ee11a&_nc_ohc=amd8TTMeACAQ7kNvgFbYleM&_nc_oc=Adhsh2rsAUshCEz8iMZh26cbm3K3qPL6UnuOAMTRBdMX7FqTd1GL6k40-d5fw70Bq6Ju2fmqNLO4_VhbJbLfa2ZM&_nc_zt=23&_nc_ht=scontent-lga3-2.xx&_nc_gid=ARUAB4_vNlIN-aGXlezoqP2&oh=00_AYA2qivcv2ljXqUGH-Tn8Mj7CCe1KV0QL_z3GUd8q7kHEA&oe=67B5D74A",
      github: "https://github.com/nnivan",
    },
  ];

  return (
    <div style={{ padding: "20px 10%" }}>
      <div className="text-center mb-10 mx-auto" style={{ maxWidth: "1100px" }}>
        <Title level={2} style={{ marginBottom: "16px" }}>
          Meet the Team
        </Title>
        <Paragraph type="secondary" style={{ fontSize: "16px" }}>
          Our team operates from New York City.
        </Paragraph>
      </div>

      <Row gutter={[24, 24]} justify="center">
        {teamMembers.map((member, index) => (
          <Col xs={24} sm={12} md={8} lg={6} key={index}>
            <Card
              hoverable
              cover={
                <img
                  alt={member.name}
                  src={member.image}
                  style={{
                    height: "200px",
                    width: "200px",
                    borderRadius: "25%",
                    objectFit: "contain",
                    margin: "20px auto",
                  }}
                />
              }
              style={{
                borderRadius: "8px",
                overflow: "hidden",
                textAlign: "center",
              }}
            >
              <Card.Meta
                title={<Title level={5}>{member.name}</Title>}
                description={<Text type="secondary">{member.title}</Text>}
              />
              <div style={{ marginTop: "10px" }}>
                {member.website && (
                  <Tooltip title="Website">
                    <Button
                      shape="circle"
                      type="text"
                      target="_blank"
                      href={member.website}
                      style={{ paddingRight: "0px" }}
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
                      style={{ paddingRight: "0px" }}
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
          As an open source project we’re always looking for talented
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
