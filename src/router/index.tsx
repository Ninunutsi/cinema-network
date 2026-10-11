import { createBrowserRouter } from "react-router-dom";
import HomePage from "../views/HomePage/HomePage";
import { ProtectedRoute } from "./ProtectedRoute";
import NotFound from "../views/NotFound";
import { ROUTE_SEGMENTS } from "../config/routes.config";
import { MainLayout } from "../layouts/MainLayout";
import { RouteErrorPage } from "./RouteErrorPage";

const page = <T extends { default: React.ComponentType }>(
  load: () => Promise<T>,
) => ({
  lazy: async () => ({ Component: (await load()).default }),
});

export const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    errorElement: <RouteErrorPage />,
    children: [
      {
        index: true,
        element: <HomePage />,
      },
      {
        path: ROUTE_SEGMENTS.SESSIONS,
        ...page(() => import("../views/SessionsPage/SessionsPage")),
      },
      {
        path: ROUTE_SEGMENTS.MOVIE,
        ...page(() => import("../views/MovieDetailsPage/MovieDetailsPage")),
      },
      {
        element: <ProtectedRoute />,
        children: [
          {
            path: ROUTE_SEGMENTS.PROFILE,
            ...page(() => import("../views/ProfilePage/ProfilePage")),
          },
        ],
      },
    ],
  },
  {
    path: "*",
    element: <NotFound />,
  },
]);
