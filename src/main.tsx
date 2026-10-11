import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import "./lib/tailwind/theme.css";
import { RouterProvider } from "react-router-dom";
import { router } from "./router/index.tsx";
import { AppProviders } from "./providers/AppProvider.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <AppProviders>
      <RouterProvider router={router} />
    </AppProviders>
  </StrictMode>,
);
