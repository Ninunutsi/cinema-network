import type { ReactNode } from "react";
import { QueryClientProvider } from "@tanstack/react-query";
import { useAuthBootstrap } from "../features/auth/hooks/useAuthBootstrap";
import { queryClient } from "../api/queryClient";

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
