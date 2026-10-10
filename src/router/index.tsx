import { createBrowserRouter } from "react-router-dom";
import HomePage from "../views/HomePage/HomePage";
import MovieDetailsPage from "../views/MovieDetailsPage/MovieDetailsPage";
import { ProtectedRoute } from "./ProtectedRoute";

import NotFound from "../views/NotFound";
import { ROUTE_SEGMENTS } from "../config/routes.config";
import { MainLayout } from "../layouts/MainLayout";
import ProfilePage from "../views/ProfilePage/ProfilePage";
import SessionsPage from "../views/SessionsPage/SessionsPage";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      // Public routes
      {
        index: true,
        element: <HomePage />,
      },
      {
        path: ROUTE_SEGMENTS.SESSIONS,
        element: <SessionsPage />,
      },
      {
        path: ROUTE_SEGMENTS.MOVIE,
        element: <MovieDetailsPage />,
      },

      // Protected routes
      {
        element: <ProtectedRoute />,
        children: [
          {
            path: ROUTE_SEGMENTS.PROFILE,
            element: <ProfilePage />,
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
