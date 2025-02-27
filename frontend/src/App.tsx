import React, { useState, useEffect } from "react";
import AppLayout from "./features/layout/layout";
import {
  Route,
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";
import ErrorPage from "./features/layout/error-page";
import { ActiveGame } from "./features/active-game/active-game";
import { Placeholder } from "./features/filler-content";
import { NotificationProvider } from "./features/notifications/notification-context";
import { UserProvider } from "./context/user.context";
import AboutUs from "./features/about-us/about-us";
import { ConfigProvider, theme, Layout } from "antd";
import { PlayerPage } from "./features/player-view/player-page";
import HomePage from "./features/home/home";
import NotFound from "./features/not-found/not-found";
import Contact from "./features/contact/contact";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route element={<AppLayout />}>
      <Route path="/" element={<HomePage />} errorElement={<ErrorPage />} />
      <Route path="/placeholder" element={<Placeholder />} />
      <Route
        path="/:region/:gameName/:tagLine/in-game"
        element={<ActiveGame />}
      />
      <Route
        path="/:region/:gameName/:tagLine/player"
        element={<PlayerPage />}
      />
      <Route path="/about-us" element={<AboutUs />} />
      <Route path="/contact" element={<Contact />} />
      {/* Catch-all 404 route */}
      <Route path="*" element={<NotFound />} />
    </Route>
  )
);

const ThemedApp = () => {
  // Initialize the theme from localStorage
  const [currentTheme, setCurrentTheme] = useState<string>(
    localStorage.getItem("theme") || "dark"
  );

  // Listen for the custom "themeChanged" event
  useEffect(() => {
    const handleThemeChange = () => {
      setCurrentTheme(localStorage.getItem("theme") || "dark");
    };

    window.addEventListener("themeChanged", handleThemeChange);
    return () => window.removeEventListener("themeChanged", handleThemeChange);
  }, []);

  return (
    <ConfigProvider
      theme={{
        algorithm:
          currentTheme === "light"
            ? theme.defaultAlgorithm
            : theme.darkAlgorithm,
        token: {
          colorPrimary: "#e89a3c",
          borderRadius: 4,
        },
        components: {
          Layout: {
            headerBg: currentTheme === "light" ? "#ffffff" : "#1f1f1f",
            headerColor: currentTheme === "light" ? "#000000" : "#ffffff",
            bodyBg: currentTheme === "light" ? "#f0f2f5" : "#121212",
            siderBg: "#fff",
          },
        },
      }}
    >
      <NotificationProvider>
        <Layout>
          <RouterProvider router={router} />
        </Layout>
      </NotificationProvider>
    </ConfigProvider>
  );
};

function App() {
  return (
    <UserProvider>
      <ThemedApp />
    </UserProvider>
  );
}

export default App;
