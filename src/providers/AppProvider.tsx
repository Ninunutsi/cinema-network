import type { ReactNode } from "react";
import { QueryClientProvider } from "@tanstack/react-query";

import { queryClient } from "../api/queryClient";
import { useAuthBootstrap } from "../features/auth/useAuthBootstrap";

function AuthBootstrap() {
  useAuthBootstrap();
  return null;
}

export function AppProviders({ children }: { children: ReactNode }) {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthBootstrap />
      {children}
    </QueryClientProvider>
  );
}
