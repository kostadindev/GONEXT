import { useState, useEffect } from "react";

type BreakpointConfig = {
  sm: number;
  md: number;
  lg: number;
  xl: number;
};

type Breakpoint = "xs" | "sm" | "md" | "lg" | "xl";

const defaultBreakpoints: BreakpointConfig = {
  sm: 640,
  md: 768,
  lg: 1024,
  xl: 1280,
};

export const useResponsive = (
  customBreakpoints?: Partial<BreakpointConfig>
) => {
  const breakpoints = { ...defaultBreakpoints, ...customBreakpoints };

  const [windowWidth, setWindowWidth] = useState<number>(
    typeof window !== "undefined" ? window.innerWidth : 0
  );

  const [currentBreakpoint, setCurrentBreakpoint] = useState<Breakpoint>("md");

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    if (typeof window !== "undefined") {
      window.addEventListener("resize", handleResize);
      handleResize();

      return () => {
        window.removeEventListener("resize", handleResize);
      };
    }
  }, []);

  useEffect(() => {
    if (windowWidth < breakpoints.sm) {
      setCurrentBreakpoint("xs");
    } else if (windowWidth < breakpoints.md) {
      setCurrentBreakpoint("sm");
    } else if (windowWidth < breakpoints.lg) {
      setCurrentBreakpoint("md");
    } else if (windowWidth < breakpoints.xl) {
      setCurrentBreakpoint("lg");
    } else {
      setCurrentBreakpoint("xl");
    }
  }, [windowWidth, breakpoints]);

  return {
    windowWidth,
    isMobile: windowWidth < breakpoints.md,
    isTablet: windowWidth >= breakpoints.md && windowWidth < breakpoints.lg,
    isDesktop: windowWidth >= breakpoints.lg,
    breakpoint: currentBreakpoint,
    breakpoints,
  };
};
