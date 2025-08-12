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
  ConfigProvider,
  theme as antdTheme,
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

// Consistent Goldman typography like homepage
const goldmanTitleStyle = {
  fontFamily: '"Goldman", sans-serif',
  fontWeight: 500,
};

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

// Hero Section to mirror homepage aesthetics
const HeroSection: React.FC<{ title: string; description: string }> = ({
  title,
  description,
}) => {
  const sectionRef = React.useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("animate-fade-in");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => {
      if (sectionRef.current) observer.unobserve(sectionRef.current);
    };
  }, []);

  return (
    <section
      className="overflow-hidden relative bg-cover min-h-[70vh] flex items-center dot-grid"
      ref={sectionRef}
      style={{
        background:
          "radial-gradient(ellipse at 50% 48%, rgba(255,255,255,0.92) 0%, rgba(255,255,255,0.75) 22%, rgba(255,255,255,0.35) 46%, rgba(255,255,255,0.0) 60%), linear-gradient(135deg, #fffaf5 0%, #fff1e6 30%, #ffe2c6 70%, #fff 100%)",
        padding: "100px 20px 60px",
      }}
    >
      {/* Floating orbs */}
      <div
        className="orb orb--primary w-72 h-72 -top-10 -right-10"
        aria-hidden="true"
      />
      <div
        className="orb orb--accent w-56 h-56 bottom-10 left-10"
        aria-hidden="true"
      />

      {/* Organic gradient overlays */}
      <div className="absolute -top-[15%] -right-[10%] w-[60%] h-[80%] bg-gradient-to-br from-[#ffb74d]/15 via-[#ffa726]/10 to-transparent opacity-40 blur-3xl rounded-full rotate-12" />
      <div className="absolute top-[20%] -left-[5%] w-[40%] h-[60%] bg-gradient-to-tr from-[#ffa726]/20 to-transparent opacity-25 blur-3xl rounded-full -rotate-45" />

      <div className="container px-4 sm:px-6 lg:px-8 w-full">
        <div className="max-w-4xl mx-auto text-center">
          <h1
            className="text-3xl sm:text-5xl gradient-text-animated mb-4"
            style={{
              ...goldmanTitleStyle,
              fontFamily: '"Goldman", serif',
              fontWeight: 400,
            }}
          >
            {title}
          </h1>
          <p className="text-base sm:text-lg lg:text-xl text-gray-800 leading-relaxed max-w-2xl mx-auto">
            {description}
          </p>
        </div>
      </div>
    </section>
  );
};

const TeamSection: React.FC = () => {
  const sectionRef = React.useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const elements = entry.target.querySelectorAll(".fade-in-element");
            elements.forEach((el, index) => {
              setTimeout(() => {
                el.classList.add("animate-fade-in");
              }, index * 150);
            });
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => {
      if (sectionRef.current) observer.unobserve(sectionRef.current);
    };
  }, []);

  const { t } = useTranslation();

  return (
    <section className="w-full py-16 px-6 bg-white text-black" ref={sectionRef}>
      <div className="fade-in-element opacity-0 text-center mb-10">
        <Title
          level={2}
          className="!text-3xl sm:!text-4xl text-[#1e1e1e]"
          style={goldmanTitleStyle}
        >
          {t("aboutUs.team.title")}
        </Title>
      </div>

      <Row gutter={[24, 32]} justify="center" className="max-w-6xl mx-auto">
        {teamMembers.map((member, index) => (
          <Col xs={24} md={20} lg={16} key={index}>
            <div className="fade-in-element opacity-0">
              <Card
                hoverable
                className="rounded-2xl border border-gray-100 bg-white/80 backdrop-blur-md shadow-elegant transition-all duration-300 hover:shadow-xl"
                bodyStyle={{ padding: 20 }}
              >
                <Row gutter={[24, 24]} align="middle">
                  <Col xs={24} md={10}>
                    <div className="relative overflow-hidden rounded-xl border border-gray-200">
                      <img
                        src={member.image}
                        alt={member.name}
                        className="w-full h-auto object-cover max-h-64"
                        loading="lazy"
                        decoding="async"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/10 via-transparent to-transparent" />
                    </div>
                  </Col>
                  <Col xs={24} md={14}>
                    <Title level={4} style={{ marginBottom: 4 }}>
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
                    <Paragraph
                      style={{ marginTop: 16, whiteSpace: "pre-line" }}
                    >
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
                        <Tooltip title={t("social.website") || "Website"}>
                          <Button
                            shape="circle"
                            icon={<GlobalOutlined />}
                            href={member.website}
                            target="_blank"
                          />
                        </Tooltip>
                      )}
                      {member.email && (
                        <Tooltip title={t("social.email") || "Email"}>
                          <Button
                            shape="circle"
                            icon={<MailFilled />}
                            href={`mailto:${member.email}`}
                          />
                        </Tooltip>
                      )}
                      {member.linkedin && (
                        <Tooltip title={t("social.linkedin") || "LinkedIn"}>
                          <Button
                            shape="circle"
                            icon={<LinkedinFilled />}
                            href={member.linkedin}
                            target="_blank"
                          />
                        </Tooltip>
                      )}
                      {member.github && (
                        <Tooltip title={t("social.github") || "GitHub"}>
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
            </div>
          </Col>
        ))}
      </Row>
    </section>
  );
};

const ImprovementSection: React.FC = () => {
  const sectionRef = React.useRef<HTMLDivElement>(null);
  const { t } = useTranslation();

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("animate-fade-in");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => {
      if (sectionRef.current) observer.unobserve(sectionRef.current);
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative w-full py-20 px-6 text-black text-center bg-gradient-to-br from-[#ffe7ba] via-[#fff1e6] to-[#fff] opacity-0"
    >
      {/* Background decorative elements */}
      <div className="absolute -top-10 -left-10 w-72 h-72 bg-[#ffb74d]/10 rounded-full opacity-40 blur-3xl -z-10" />
      <div className="absolute bottom-0 right-0 w-64 h-64 bg-[#ffb74d]/5 rounded-full opacity-50 blur-3xl -z-10" />

      <div className="relative z-10 max-w-4xl mx-auto">
        <Title
          className="!text-3xl sm:!text-4xl tracking-tight text-[#1e1e1e] mb-6"
          style={goldmanTitleStyle}
        >
          {t("aboutUs.improvement.title")}
        </Title>
        <Paragraph className="text-lg max-w-2xl mx-auto mb-8 text-gray-800">
          {t("aboutUs.improvement.description", {
            email: "info@gonext.lol",
            interpolation: { escapeValue: false },
          })}
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
      </div>
    </section>
  );
};

const AboutUs: React.FC = () => {
  const { t } = useTranslation();

  // Animate elements on scroll similar to homepage
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("animate-fade-in");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1 }
    );

    const elements = document.querySelectorAll(".animate-on-scroll");
    elements.forEach((el) => observer.observe(el));
    return () => {
      elements.forEach((el) => observer.unobserve(el));
    };
  }, []);

  return (
    <ConfigProvider
      theme={{
        algorithm: antdTheme.defaultAlgorithm,
        token: { colorPrimary: "#ffb74d" },
      }}
    >
      <div className="w-full text-gray-800 bg-white">
        <HeroSection
          title={t("aboutUs.title")}
          description={t("aboutUs.description")}
        />
        <TeamSection />
        <ImprovementSection />
      </div>
    </ConfigProvider>
  );
};

export default AboutUs;
