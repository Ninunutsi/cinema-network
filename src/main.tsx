import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import "./lib/tailwind/theme.css";
import { RouterProvider } from "react-router-dom";
import { router } from "./router/index.tsx";
import { AppProviders } from "./providers/AppProvider.tsx";
import { ErrorBoundary } from "./components/template/ErrorBoundary.tsx";
import { ErrorFallback } from "./components/template/ErrorFallback.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ErrorBoundary
      fallback={({ error }) => (
        <ErrorFallback error={error} onRetry={() => window.location.reload()} />
      )}
    >
      <AppProviders>
        <RouterProvider router={router} />
      </AppProviders>
    </ErrorBoundary>
  </StrictMode>,
);
