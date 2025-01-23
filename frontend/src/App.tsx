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

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route element={<AppLayout />}>
      <Route path="/" element={<div></div>} errorElement={<ErrorPage />} />
      <Route path="/placeholder" element={<Placeholder />} />
      <Route
        path="/:region/:gameName/:tagLine/in-game"
        element={<ActiveGame />}
      />
      <Route path="/about-us" element={<AboutUs />} />
    </Route>
  )
);

function App() {
  return (
    <NotificationProvider>
      <UserProvider>
        <RouterProvider router={router} />
      </UserProvider>
    </NotificationProvider>
  );
}

export default App;
