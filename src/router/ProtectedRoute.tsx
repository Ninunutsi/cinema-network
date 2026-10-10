import { Navigate, Outlet, useLocation } from "react-router-dom";

import { ROUTES } from "../config/routes.config";
import { useAuthStore } from "../features/auth/authStore";

export const ProtectedRoute = () => {
  const { user } = useAuthStore();
  const location = useLocation();

  if (!user) {
    return <Navigate to={ROUTES.HOME} state={{ from: location }} replace />;
  }

  return <Outlet />;
};
