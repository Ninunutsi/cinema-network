import { Navigate, Outlet, useLocation } from "react-router-dom";

import { useAuthStore } from "../features/auth/store/authStore";
import { ROUTES } from "../config/routes.config";

export const ProtectedRoute = () => {
  const { user } = useAuthStore();
  const location = useLocation();

  if (!user) {
    return <Navigate to={ROUTES.HOME} state={{ from: location }} replace />;
  }

  return <Outlet />;
};
