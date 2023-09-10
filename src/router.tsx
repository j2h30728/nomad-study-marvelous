import { createBrowserRouter } from "react-router-dom";

import App from "./App";
import { Home, NotFound } from "./pages";
import Detail from "./pages/Details";

export const ROUTE_PATH = {
  ROOT: "/",
  HOME: "",
  DETAIL: "character/:id",
};

const router = createBrowserRouter([
  {
    element: <App />,
    path: ROUTE_PATH.ROOT,
    errorElement: <NotFound />,
    children: [
      {
        element: <Home />,
        path: ROUTE_PATH.HOME,
      },
      {
        element: <Detail />,
        path: ROUTE_PATH.DETAIL,
      },
    ],
  },
]);
export default router;
