import { Navigate, Outlet, useLocation } from "react-router-dom";

import { useAuthStore } from "../store/authStore";
import { ROUTES } from "../config/routes.config";

export const ProtectedRoute = () => {
  const { isAuthenticated } = useAuthStore();
  const location = useLocation();

  if (!isAuthenticated) {
    return <Navigate to={ROUTES.HOME} state={{ from: location }} replace />;
  }

  return <Outlet />;
};
