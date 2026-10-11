import {
  isRouteErrorResponse,
  useNavigate,
  useRouteError,
} from "react-router-dom";
import { ErrorFallback } from "@/components/template/ErrorFallback";

export const RouteErrorPage = () => {
  const error = useRouteError();
  const navigate = useNavigate();

  if (isRouteErrorResponse(error) && error.status === 404) {
    return <p className="p-10 text-center text-white">Page not found.</p>;
  }

  return (
    <main className="min-h-screen bg-background">
      <ErrorFallback
        error={error}
        onRetry={() => window.location.reload()}
        onClose={() => navigate("/", { replace: true })}
      />
    </main>
  );
};
