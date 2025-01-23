import React from "react";
import { Card, Row, Col, Typography, Button } from "antd";

const { Title, Text } = Typography;

type TeamMember = {
  name: string;
  title: string;
  image: string;
  link: string;
};

const AboutUs: React.FC = () => {
  const teamMembers: TeamMember[] = [
    {
      name: "Kostadin Devedzhiev",
      title: "Founder | ML",
      image: "/profile-photos/kostadin.jpg",
      link: "https://kostadindev.github.io/",
    },
    {
      name: "Ivan Nikolov",
      title: "Backend | DevOps",
      image:
        "https://scontent-lga3-2.xx.fbcdn.net/v/t39.30808-6/463968694_27285182364459185_394874216162696016_n.jpg?_nc_cat=101&ccb=1-7&_nc_sid=6ee11a&_nc_ohc=jeMA9FNu3wUQ7kNvgGomv9-&_nc_zt=23&_nc_ht=scontent-lga3-2.xx&_nc_gid=ADJN9tIISQ6-sj7Ecix0AOi&oh=00_AYCKMdO-LOfrVY1lXH-6_ITzdXFSYTW5lBjRm2levWqjuA&oe=679865CA",
      link: "https://www.facebook.com/profile.php?id=100001823682092",
    },
    {
      name: "Nicholas Bruhnev",
      title: "UI | UX",
      image:
        "https://media.licdn.com/dms/image/v2/C4E03AQEPzvNce2yw-g/profile-displayphoto-shrink_800_800/profile-displayphoto-shrink_800_800/0/1643814080655?e=1743033600&v=beta&t=WPSZ8ecHRbYyjFhF8D3DFxundPdRHESHqOkK6w46dvg",
      link: "https://www.linkedin.com/in/nick-bruhnev/",
    },
    {
      name: "Nikola Polihronov",
      title: "PM | UI",
      image:
        "https://media.licdn.com/dms/image/v2/D4D03AQECzDuJVxACiw/profile-displayphoto-shrink_800_800/profile-displayphoto-shrink_800_800/0/1698224514318?e=1743033600&v=beta&t=R8naXMpH4zDE0jsKk6VYRFH2etIIpPl7BqgLXfaqG6c",
      link: "https://www.linkedin.com/in/nikola-p-811891279/overlay/photo/",
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
              <div style={{ marginTop: "16px" }}>
                <Button type="primary" href={member.link} target="_blank">
                  Read Bio
                </Button>
              </div>
            </Card>
          </Col>
        ))}
      </Row>

      {/* New Section: Interested in Joining? */}
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
        <Button
          type="primary"
          href="mailto:kostadin.g.devedzhiev@gmail.com"
          style={{ marginTop: "16px" }}
        >
          Apply Here
        </Button>
      </div>
    </div>
  );
};

export default AboutUs;
