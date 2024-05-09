import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Placeholder } from "../../filler-content";
import ErrorPage from "../error-page";
import { ActiveGame } from "../../active-game/active-game";

const router = createBrowserRouter([
  {
    path: "/",
    element: <div>Hello world!</div>,
    errorElement: <ErrorPage />,
  },
  {
    path: "/placeholder",
    element: <Placeholder />,
  },
  {
    path: "/:region/:summoner/:tagline/in-game",
    element: <ActiveGame />,
  },
]);

export const Body = () => {
  return <RouterProvider router={router} />;
};
