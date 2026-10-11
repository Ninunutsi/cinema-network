import { Outlet } from "react-router-dom";
import { Header } from "@/components/template/Header";
import Footer from "@/components/template/Footer";
import { ModalManager } from "@/utils/modals/ModalManager";
import { Toaster } from "@/components/ui/sonner";

export const MainLayout = () => {
  return (
    <div className="flex min-h-svh flex-col bg-background">
      <Header />

      <main className="flex-1">
        <Outlet />
        <ModalManager />
        <Toaster theme="dark" position="bottom-right" richColors />
      </main>

      <Footer />
    </div>
  );
};
