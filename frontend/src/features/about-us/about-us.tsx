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

const { Title, Text } = Typography;

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
      title: "Founder | ML",
      image: "/profile-photos/kostadin.jpg",
      github: "https://github.com/kostadindev",
      linkedin: "https://www.linkedin.com/in/kostadin-dev/",
      email: "kostadin.g.devedzhiev@gmail.com",
      website: "https://kostadindev.github.io/",
    },
    {
      name: "Ivan Nikolov",
      title: "Backend | DevOps",
      image:
        "https://scontent-lga3-2.xx.fbcdn.net/v/t39.30808-6/463968694_27285182364459185_394874216162696016_n.jpg?_nc_cat=101&ccb=1-7&_nc_sid=6ee11a&_nc_ohc=jeMA9FNu3wUQ7kNvgGomv9-&_nc_zt=23&_nc_ht=scontent-lga3-2.xx&_nc_gid=ADJN9tIISQ6-sj7Ecix0AOi&oh=00_AYCKMdO-LOfrVY1lXH-6_ITzdXFSYTW5lBjRm2levWqjuA&oe=679865CA",
      github: "https://github.com/nnivan",
    },
    {
      name: "Nicholas Bruhnev",
      title: "UI | UX",
      image:
        "https://media.licdn.com/dms/image/v2/C4E03AQEPzvNce2yw-g/profile-displayphoto-shrink_800_800/profile-displayphoto-shrink_800_800/0/1643814080655?e=1743033600&v=beta&t=WPSZ8ecHRbYyjFhF8D3DFxundPdRHESHqOkK6w46dvg",
      linkedin: "https://www.linkedin.com/in/nick-bruhnev/",
      github: "https://github.com/nickpeterb",
    },
    {
      name: "Nikola Polihronov",
      title: "PM | UI",
      image:
        "https://media.licdn.com/dms/image/v2/D4D03AQECzDuJVxACiw/profile-displayphoto-shrink_800_800/profile-displayphoto-shrink_800_800/0/1698224514318?e=1743033600&v=beta&t=R8naXMpH4zDE0jsKk6VYRFH2etIIpPl7BqgLXfaqG6c",
      linkedin: "https://www.linkedin.com/in/nikola-p-811891279/",
      github: "https://github.com/Polihronos",
    },
  ];

  return (
    <div style={{ backgroundColor: "#f5f5f5", padding: "20px 10%" }}>
      <div className="text-center mb-10 mx-auto" style={{ maxWidth: "1100px" }}>
        <h2 className="text-2xl md:text-3xl font-bold mb-4">Meet the Team</h2>
        <p className="text-gray-600 text-sm sm:text-base md:text-lg">
          Our team operates from New York, USA, and Sofia, Bulgaria, combining
          expertise in machine learning, backend development, DevOps, UI/UX
          design, and project management. With diverse perspectives and a shared
          passion for innovation, we work together to develop impactful
          solutions that empower gamers worldwide.
        </p>
      </div>

      <Row gutter={[24, 24]}>
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
                    borderRadius: "50%",
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
                description={<Text>{member.title}</Text>}
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
        <h2 className="text-2xl md:text-3xl font-bold mb-4">
          Interested in Contributing?
        </h2>
        <p className="text-gray-600 text-sm sm:text-base md:text-lg">
          As an open source project we’re always looking for talented
          individuals to help us. If you’re passionate about innovation and
          creating impactful solutions, we’d love to hear from you!
        </p>
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
