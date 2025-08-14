import React, { useEffect } from "react";
import { Typography, ConfigProvider, theme as antdTheme } from "antd";
import {
  RobotOutlined,
  SmileOutlined,
  SolutionOutlined,
} from "@ant-design/icons";
import GlobalSearch from "../global-search/global-search";
import { QuickSearch } from "../quick-search/quick-search";

const { Title, Paragraph } = Typography;

// Goldman font style
const goldmanTitleStyle = {
  fontFamily: '"Goldman", sans-serif',
  fontWeight: 500,
};

// Hero Section Component
const HeroSection = () => {
  const containerRef = React.useRef<HTMLDivElement>(null);
  const imageRef = React.useRef<HTMLImageElement>(null);
  const [isMobile, setIsMobile] = React.useState(false);

  React.useEffect(() => {
    // Check if mobile on mount and when window resizes
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);

    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  React.useEffect(() => {
    // Skip effect on mobile
    if (isMobile) return;

    const handleMouseMove = (e: MouseEvent) => {
      if (!containerRef.current || !imageRef.current) return;

      const { left, top, width, height } =
        containerRef.current.getBoundingClientRect();
      const x = (e.clientX - left) / width - 0.5;
      const y = (e.clientY - top) / height - 0.5;

      imageRef.current.style.transform = `perspective(1000px) rotateY(${
        x * 2.5
      }deg) rotateX(${-y * 2.5}deg) scale3d(1.02, 1.02, 1.02)`;
    };

    const handleMouseLeave = (): void => {
      if (!imageRef.current) return;
      imageRef.current.style.transform = `perspective(1000px) rotateY(0deg) rotateX(0deg) scale3d(1, 1, 1)`;
    };

    const container = containerRef.current;
    if (container) {
      container.addEventListener("mousemove", handleMouseMove);
      container.addEventListener("mouseleave", handleMouseLeave);
    }

    return () => {
      if (container) {
        container.removeEventListener("mousemove", handleMouseMove);
        container.removeEventListener("mouseleave", handleMouseLeave);
      }
    };
  }, [isMobile]);

  React.useEffect(() => {
    // Skip parallax on mobile
    if (isMobile) return;

    const handleScroll = () => {
      const scrollY = window.scrollY;
      const elements = document.querySelectorAll(".parallax");
      elements.forEach((el) => {
        const element = el as HTMLElement;
        const speed = parseFloat(element.dataset.speed || "0.1");
        const yPos = -scrollY * speed;
        element.style.setProperty("--parallax-y", `${yPos}px`);
      });
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [isMobile]);

  return (
    <section
      className="overflow-hidden relative bg-cover min-h-screen flex items-center dot-grid"
      id="hero"
      style={{
        background:
          // Lighter center radial overlay + warm linear gradient base
          "radial-gradient(ellipse at 50% 48%, rgba(255,255,255,0.92) 0%, rgba(255,255,255,0.75) 22%, rgba(255,255,255,0.35) 46%, rgba(255,255,255,0.0) 60%), linear-gradient(135deg, #fffaf5 0%, #fff1e6 30%, #ffe2c6 70%, #fff 100%)",
        padding: isMobile ? "100px 12px 40px" : "120px 20px 60px",
      }}
    >
      {/* Floating orbs */}
      <div
        className="orb orb--primary w-80 h-80 -top-10 -right-10"
        aria-hidden="true"
      />
      <div
        className="orb orb--accent w-64 h-64 bottom-10 left-10"
        aria-hidden="true"
      />

      {/* Logo */}
      <div className="absolute top-4 left-4 sm:top-6 sm:left-6 flex items-center gap-3 z-20">
        <h1
          className="text-3xl sm:text-5xl cursor-pointer gradient-text-animated"
          style={{
            fontFamily: '"Goldman", serif',
            fontWeight: 400,
            textShadow: "0 1px 2px rgba(255, 255, 255, 0.4)",
          }}
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        >
          GONEXT
        </h1>
        {/* Removed AI Gaming Assistant chip for a cleaner header */}
      </div>

      {/* Organic background gradient overlays */}
      <div className="absolute -top-[15%] -right-[10%] w-[60%] h-[80%] bg-gradient-to-br from-[#ffb74d]/15 via-[#ffa726]/10 to-transparent opacity-40 blur-3xl rounded-full transform rotate-12" />
      <div className="absolute top-[20%] -left-[5%] w-[40%] h-[60%] bg-gradient-to-tr from-[#ffa726]/20 to-transparent opacity-25 blur-3xl rounded-full transform -rotate-45" />
      <div className="absolute bottom-[-10%] right-[10%] w-[50%] h-[50%] bg-gradient-to-tl from-[#ffb74d]/12 via-transparent to-[#ffa726]/8 opacity-30 blur-3xl rounded-full transform rotate-45" />
      <div
        className="absolute bottom-[10%] left-[15%] w-72 h-72 rounded-full blur-3xl -z-10 parallax"
        style={{
          background:
            "radial-gradient(circle, rgba(232, 154, 60, 0.08) 0%, transparent 70%)",
        }}
        data-speed="0.05"
      />
      <div className="absolute top-[40%] right-[20%] w-48 h-48 bg-gradient-to-br from-[#ff7043]/15 to-transparent opacity-20 blur-2xl rounded-full transform rotate-90" />

      <div className="container px-4 sm:px-6 lg:px-8 w-full" ref={containerRef}>
        <div className="flex flex-col items-center max-w-4xl mx-auto text-center">
          <div className="w-full max-w-xs relative mb-6">
            <div
              className="relative z-10 animate-fade-in"
              style={{ animationDelay: "0.2s" }}
            >
              <div className="relative transition-all duration-500 ease-out">
                <img
                  ref={imageRef}
                  src="/images/landing/monkey-poro.png"
                  alt="GONEXT Gaming Assistant mascot"
                  loading="lazy"
                  decoding="async"
                  className="w-full h-auto object-contain transition-transform duration-500 ease-out"
                  style={{
                    transformStyle: "preserve-3d",
                    maxWidth: "320px",
                    margin: "0 auto",
                    display: "block",
                    filter: "drop-shadow(0 5px 15px rgba(0, 0, 0, 0.1))",
                  }}
                />
              </div>
            </div>
          </div>

          <div className="w-full">
            <h2
              className="lg:text-5xl leading-tight mb-4 sm:mb-6 gradient-text-animated"
              style={{
                ...goldmanTitleStyle,
                fontFamily: '"Goldman", serif',
                fontWeight: 400,
                textShadow: "0 1px 2px rgba(255, 255, 255, 0.4)",
              }}
            >
              Intelligence for League of Legends
            </h2>

            <p
              style={{ animationDelay: "0.6s" }}
              className="text-base sm:text-lg lg:text-xl text-gray-800 mt-3 sm:mt-6 mb-6 sm:mb-8 leading-relaxed opacity-0 animate-fade-in font-normal max-w-2xl mx-auto"
            >
              Your ultimate companion that instantly breaks down game specific
              analytics and recommendations with real-time analysis and
              personalized insights. <br /> All in One — Powered by AI.
            </p>
          </div>

          <div
            className="opacity-0 animate-fade-in w-full"
            style={{ animationDelay: "0.8s" }}
          >
            <div className="space-y-4 max-w-lg mx-auto">
              <div>
                <GlobalSearch />
              </div>
              <div className="text-center">
                <span className="text-gray-700 font-medium text-sm">
                  or try it out for
                </span>
              </div>
              <div className="w-full flex flex-col items-center gap-3">
                <QuickSearch />
                {/* Removed 'No login required' text to declutter */}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

// How It Works Section Component
const HowItWorksSection = () => {
  const sectionRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const elements = entry.target.querySelectorAll(".fade-in-element");
            elements.forEach((el, index) => {
              setTimeout(() => {
                el.classList.add("animate-fade-in");
              }, index * 200);
            });
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);

  return (
    <section
      className="w-full py-20 px-6 bg-[#f8fafc] text-center text-black"
      ref={sectionRef}
    >
      <div className="fade-in-element opacity-0">
        <Title
          level={2}
          className="!text-3xl sm:!text-4xl text-[#1e1e1e]"
          style={goldmanTitleStyle}
        >
          How It Works
        </Title>
        <Paragraph className="max-w-2xl mx-auto text-lg text-gray-700 mb-12 leading-relaxed">
          Get smarter with every match. Here's what the AI can do:
        </Paragraph>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-10 max-w-5xl mx-auto">
        {["Search", "Ask AI", "Win"].map((title, i) => {
          const data = [
            {
              icon: <SolutionOutlined />,
              desc: "Start by entering a player in game. Instantly access relevant data and historical performance.",
              color: "bg-orange-100 text-orange-600",
            },
            {
              icon: <RobotOutlined />,
              desc: "Ask for insights, predictions, or strategy tips. The AI delivers contextual advice on demand.",
              color: "bg-blue-100 text-blue-600",
            },
            {
              icon: <SmileOutlined />,
              desc: "Use your new knowledge to outplay opponents. Climb ranks and track your improvement over time.",
              color: "bg-green-100 text-green-600",
            },
          ];
          return (
            <div
              key={title}
              className="flex flex-col items-center text-center bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 backdrop-blur-sm fade-in-element opacity-0 feature-card"
            >
              <div
                className={`text-4xl p-4 rounded-full mb-4 ${data[i].color}`}
              >
                {data[i].icon}
              </div>
              <h3
                className="text-xl font-semibold mb-2 text-[#2c2c2c]"
                style={goldmanTitleStyle}
              >
                {title}
              </h3>
              <p className="text-gray-700 leading-snug text-sm">
                {data[i].desc}
              </p>
            </div>
          );
        })}
      </div>
    </section>
  );
};

// Preview Section Component
const PreviewSection = () => {
  const sectionRef = React.useRef<HTMLDivElement>(null);
  const cardsContainerRef = React.useRef<HTMLDivElement>(null);
  const [activeCardIndex, setActiveCardIndex] = React.useState(0);
  const [isIntersecting, setIsIntersecting] = React.useState(false);
  const ticking = React.useRef(false);
  const lastScrollY = React.useRef(0);

  // Card styling with smooth transitions
  const cardStyle = {
    height: "70vh",
    maxHeight: "700px",
    borderRadius: "20px",
    transition:
      "transform 0.5s cubic-bezier(0.19, 1, 0.22, 1), opacity 0.5s cubic-bezier(0.19, 1, 0.22, 1)",
    willChange: "transform, opacity",
  } as React.CSSProperties;

  React.useEffect(() => {
    // Create intersection observer to detect when section is in view
    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;
        setIsIntersecting(entry.isIntersecting);
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    // Optimized scroll handler using requestAnimationFrame
    const handleScroll = () => {
      if (!ticking.current) {
        lastScrollY.current = window.scrollY;

        window.requestAnimationFrame(() => {
          if (!sectionRef.current) return;

          const sectionRect = sectionRef.current.getBoundingClientRect();
          const viewportHeight = window.innerHeight;
          const totalScrollDistance = viewportHeight * 2;

          // Calculate the scroll progress
          let progress = 0;
          if (sectionRect.top <= 0) {
            progress = Math.min(
              1,
              Math.max(0, Math.abs(sectionRect.top) / totalScrollDistance)
            );
          }

          // Determine which card should be visible based on progress
          if (progress >= 0.66) {
            setActiveCardIndex(2);
          } else if (progress >= 0.33) {
            setActiveCardIndex(1);
          } else {
            setActiveCardIndex(0);
          }

          ticking.current = false;
        });

        ticking.current = true;
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll(); // Initial calculation

    return () => {
      window.removeEventListener("scroll", handleScroll);
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);

  // Card visibility based on active index
  const isFirstCardVisible = isIntersecting;
  const isSecondCardVisible = activeCardIndex >= 1;
  const isThirdCardVisible = activeCardIndex >= 2;

  const slides = [
    {
      title: "Live Match Analysis",
      description:
        "Get real-time insights about your teammates and enemies during champion select and loading screen.",
      image: "images/carousel/slide0.png",
    },
    {
      title: "AI-Powered Chat Assistant",
      description:
        "Ask strategic questions and get personalized advice based on current match conditions.",
      image: "images/carousel/slide1.png",
    },
    {
      title: "Performance Dashboard",
      description:
        "Track your improvement with detailed analytics and AI recommendations for your gameplay.",
      image: "images/carousel/slide2.png",
    },
  ];

  return (
    <div ref={sectionRef} className="relative" style={{ height: "300vh" }}>
      <section
        className="w-full h-screen py-10 md:py-16 sticky top-0 overflow-hidden bg-white"
        id="preview"
      >
        <div className="container px-6 lg:px-8 mx-auto h-full flex flex-col">
          <div className="mb-8 md:mb-12">
            <Title
              level={2}
              className="!text-3xl sm:!text-4xl text-[#1e1e1e] mb-4 md:mb-6"
              style={goldmanTitleStyle}
            >
              Experience GONEXT
            </Title>
            <p className="text-lg text-gray-700 max-w-2xl">
              Here's what you can expect when using our AI-powered match
              assistant.
            </p>
          </div>

          <div
            ref={cardsContainerRef}
            className="relative flex-1 perspective-1000"
          >
            {slides.map((slide, index) => {
              const isVisible =
                index === 0
                  ? isFirstCardVisible
                  : index === 1
                  ? isSecondCardVisible
                  : isThirdCardVisible;
              const zIndex = 10 + index * 10;
              const scale = index === 0 ? 0.9 : index === 1 ? 0.95 : 1;
              const translateY = isVisible
                ? index === 0
                  ? "90px"
                  : index === 1
                  ? activeCardIndex === 1
                    ? "55px"
                    : "45px"
                  : activeCardIndex === 2
                  ? "15px"
                  : "0"
                : "200px";

              return (
                <div
                  key={index}
                  className={`absolute inset-0 overflow-hidden ${
                    isVisible ? "animate-card-enter" : ""
                  }`}
                  style={{
                    ...cardStyle,
                    zIndex,
                    transform: `translateY(${translateY}) scale(${
                      isVisible ? scale : 0.9
                    })`,
                    opacity: isVisible ? (index === 0 ? 0.9 : 1) : 0,
                    pointerEvents: isVisible ? "auto" : "none",
                  }}
                >
                  <div className="relative h-full rounded-xl border border-gray-200 overflow-hidden bg-gradient-to-br from-white to-gray-50 shadow-elegant">
                    {/* Full width image background */}
                    <div className="relative h-full w-full">
                      <img
                        src={slide.image}
                        alt={slide.title}
                        loading="lazy"
                        decoding="async"
                        className="absolute inset-0 w-full h-full object-contain rounded-xl"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-black/15 to-transparent rounded-xl" />

                      {/* Glass overlay text */}
                      <div className="absolute bottom-0 left-0 right-0 p-6 sm:p-8">
                        <div className="bg-white/20 backdrop-blur-md rounded-2xl p-6 border border-white/30 shadow-2xl">
                          <h3
                            className="text-xl sm:text-2xl font-bold leading-tight mb-3 text-white"
                            style={goldmanTitleStyle}
                          >
                            {slide.title}
                          </h3>
                          <p className="text-white/90 text-sm sm:text-base leading-relaxed">
                            {slide.description}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}

            {/* Pagination dots removed */}
          </div>
        </div>
      </section>
    </div>
  );
};

// Why It's Smart Section Component
const WhySmartSection = () => {
  const sectionRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
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

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);

  return (
    <section
      className="relative w-full py-20 px-6 text-center text-black bg-gradient-to-br from-[#fff2e8] via-[#ffd8bf] to-[#ffe7ba]"
      ref={sectionRef}
    >
      {/* Background decorative elements */}
      <div className="absolute -top-20 right-0 w-72 h-72 bg-[#ffb74d]/10 rounded-full opacity-60 blur-3xl -z-10" />
      <div className="absolute bottom-0 left-10 w-64 h-64 bg-[#ffb74d]/5 rounded-full opacity-70 blur-3xl -z-10" />

      <div className="relative z-10 max-w-7xl mx-auto">
        <div className="fade-in-element opacity-0">
          <Title
            level={2}
            className="!text-3xl sm:!text-4xl text-[#1e1e1e] mb-4"
            style={goldmanTitleStyle}
          >
            Why It's Smart
          </Title>
        </div>
        <div className="max-w-3xl mx-auto grid grid-cols-1 sm:grid-cols-3 gap-6 text-left mt-10">
          {["Player Intelligence", "Game Context", "Winning Tips"].map(
            (title, i) => {
              const descriptions = [
                "Access in-depth player stats, match history, and latest performance.",
                "Get insights into team comps and lane matchups—all AI analyzed.",
                "Get suggestions for item builds, rotations, and team fights tailored to you.",
              ];
              return (
                <div
                  key={title}
                  className="p-6 bg-white/90 backdrop-blur-sm rounded-xl shadow-lg border border-white/50 hover:shadow-xl transition-all duration-300 fade-in-element opacity-0"
                >
                  <Title
                    level={4}
                    className="text-lg text-[#1e1e1e]"
                    style={goldmanTitleStyle}
                  >
                    {title}
                  </Title>
                  <Paragraph className="text-gray-800 leading-snug">
                    {descriptions[i]}
                  </Paragraph>
                </div>
              );
            }
          )}
        </div>
      </div>
    </section>
  );
};

// Use Cases Section Component
const UseCasesSection = () => {
  const sectionRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const elements = entry.target.querySelectorAll(".fade-in-element");
            elements.forEach((el, index) => {
              setTimeout(() => {
                el.classList.add("animate-fade-in");
              }, index * 100);
            });
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);

  return (
    <section
      className="w-full py-20 px-6 bg-white text-center text-black"
      ref={sectionRef}
    >
      <div className="fade-in-element opacity-0">
        <Title
          level={2}
          className="!text-3xl sm:!text-4xl text-[#1e1e1e]"
          style={goldmanTitleStyle}
        >
          How Players Use It
        </Title>
      </div>
      <div className="max-w-4xl mx-auto grid grid-cols-1 sm:grid-cols-2 gap-8 mt-10 text-left">
        {[
          "Laning Phase Domination",
          "Jungle Pathing AI",
          "Support Vision Coach",
          "Ask any question",
        ].map((title, i) => {
          const data = [
            "Learn about your opponent, get matchup tips, and itemize like a pro.",
            "AI can recommend when and where to gank, predicting enemy jungle movement and capitalizing on ally synergy.",
            "Know optimal ward placements for every stage of the game.",
            "Unlike traditional in-game tools, you can ask the AI anything in natural language and get all the information you need in one place.",
          ];
          const colors = [
            "border-blue-600",
            "border-green-600",
            "border-red-600",
            "border-purple-600",
          ];
          return (
            <div
              key={title}
              className={`p-6 border-l-4 ${colors[i]} bg-white rounded-r-xl shadow-lg hover:shadow-xl transition-all duration-300 fade-in-element opacity-0`}
            >
              <Title
                level={4}
                className="text-lg text-[#1e1e1e] mb-2"
                style={goldmanTitleStyle}
              >
                {title}
              </Title>
              <Paragraph className="text-gray-800 text-sm leading-relaxed">
                {data[i]}
              </Paragraph>
            </div>
          );
        })}
      </div>
    </section>
  );
};

// Final CTA Section Component
const CTASection = () => {
  const sectionRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
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

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);

  return (
    <section className="relative w-full py-20 px-6 text-black text-center bg-gradient-to-br from-[#ffe7ba] via-[#fff1e6] to-[#fff]">
      {/* Background decorative elements */}
      <div className="absolute -top-10 -left-10 w-72 h-72 bg-[#ffb74d]/10 rounded-full opacity-40 blur-3xl -z-10" />
      <div className="absolute bottom-0 right-0 w-64 h-64 bg-[#ffb74d]/5 rounded-full opacity-50 blur-3xl -z-10" />

      <div
        ref={sectionRef}
        className="relative z-10 max-w-4xl mx-auto opacity-0"
      >
        <Title
          className="!text-4xl sm:!text-5xl tracking-tight text-[#1e1e1e] mb-6"
          style={goldmanTitleStyle}
        >
          Ready to Win More?
        </Title>
        <Paragraph className="text-lg max-w-xl mx-auto mb-8 text-gray-800">
          Get AI-powered insights during your games. It's like having a coach by
          your side.
        </Paragraph>
        <div className="flex flex-col justify-center gap-4 items-center w-full px-4 max-w-lg mx-auto">
          <div className="w-full">
            <GlobalSearch />
          </div>
          <span className="text-gray-700 font-medium">or try it out for</span>
          <div className="w-full">
            <QuickSearch />
          </div>
          {/* Removed Learn more button to reduce clutter */}
        </div>
      </div>
    </section>
  );
};

const HomePage: React.FC = () => {
  // Initialize intersection observer for animations
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
        token: {
          colorPrimary: "#ffb74d",
        },
      }}
    >
      <div className="w-full text-gray-800 bg-white">
        <HeroSection />
        <HowItWorksSection />
        <PreviewSection />
        <WhySmartSection />
        <UseCasesSection />
        <CTASection />
      </div>
    </ConfigProvider>
  );
};

export default HomePage;
